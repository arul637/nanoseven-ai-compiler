import json
import traceback
from config import config
from logger import logger
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from prompt_engine import prompt_engine
from language_manager import language_manager
from response_parser import RunResponse, DebugResponse, AutocompleteResponse, BeautifyResponse, ErrorResponse


class AIEngine:
    def __init__(self):
        self._model = None
        self._initialize_model()

    def _initialize_model(self):
        try:
            self._model = ChatGoogleGenerativeAI(
                model=config.gemini_model,
                google_api_key=config.gemini_api_key,
                temperature=config.gemini_temperature,
                max_output_tokens=config.gemini_max_output_tokens,
                timeout=config.ai_timeout,
            )
            logger.info(f"Gemini model initialized: {config.gemini_model}")
        except Exception as e:
            logger.error(f"Failed to initialize Gemini model: {str(e)}")
            self._model = None

    def _get_ai_context(self, language):
        return language_manager.get_ai_context(language)

    def _safe_parse_json(self, text):
        text = text.strip()
        if text.startswith("```"):
            lines = text.split("\n")
            start = 0
            for i, line in enumerate(lines):
                if line.strip().startswith("```"):
                    start = i + 1
                    break
            end = len(lines)
            for i in range(len(lines) - 1, -1, -1):
                if lines[i].strip().startswith("```"):
                    end = i
                    break
            text = "\n".join(lines[start:end])
        try:
            return json.loads(text.strip())
        except json.JSONDecodeError:
            try:
                start = text.find("{")
                end = text.rfind("}") + 1
                if start >= 0 and end > start:
                    return json.loads(text[start:end])
            except (json.JSONDecodeError, ValueError):
                pass
            return None

    def _safe_invoke(self, prompt, default_response):
        if not self._model:
            logger.error("Gemini model not initialized")
            return default_response
        try:
            response = self._model.invoke(prompt)
            parsed = self._safe_parse_json(response.content)
            if parsed is None:
                logger.error(f"Failed to parse AI response as JSON: {response.content[:200]}")
                return default_response
            return parsed
        except Exception as e:
            logger.error(f"AI invocation failed: {str(e)}\n{traceback.format_exc()}")
            return default_response

    def simulate_execution(self, language, code):
        try:
            lang_obj = language_manager.get_language(language)
            if not lang_obj:
                return ErrorResponse(error=f"Unsupported language: {language}").to_dict()

            prompt_template = prompt_engine.build_run_prompt(language, code, lang_obj.ai_context)
            prompt = prompt_template.invoke({
                "language": language,
                "code": code,
                "language_context": lang_obj.ai_context,
            })

            default_response = RunResponse(
                success=False,
                language=language,
                stdout="",
                stderr="AI simulation failed to generate output",
                error_type="SimulationError",
                error_message="The AI model could not simulate this program's behavior",
            ).to_dict()

            result = self._safe_invoke(prompt, default_response)

            validated = RunResponse(
                success=result.get("success", False),
                language=result.get("language", language),
                stdout=result.get("stdout", ""),
                stderr=result.get("stderr", ""),
                variables=result.get("variables", {}),
                execution_steps=result.get("execution_steps", []),
                error_type=result.get("error_type"),
                error_message=result.get("error_message"),
                simulation=True,
            )
            return validated.to_dict()

        except Exception as e:
            logger.error(f"simulate_execution error: {str(e)}\n{traceback.format_exc()}")
            return ErrorResponse(error="Internal simulation error").to_dict()

    def simulate_debugging(self, language, code):
        try:
            lang_obj = language_manager.get_language(language)
            if not lang_obj:
                return ErrorResponse(error=f"Unsupported language: {language}").to_dict()

            prompt_template = prompt_engine.build_debug_prompt(language, code, lang_obj.ai_context)
            prompt = prompt_template.invoke({
                "language": language,
                "code": code,
                "language_context": lang_obj.ai_context,
            })

            default_response = DebugResponse(
                success=False,
                language=language,
                stdout="",
                stderr="AI debug simulation failed",
                error_type="SimulationError",
                error_message="The AI model could not simulate debugging for this program",
            ).to_dict()

            result = self._safe_invoke(prompt, default_response)

            steps = result.get("execution_steps", [])
            if steps and isinstance(steps[0], dict):
                pass
            elif steps and isinstance(steps[0], str):
                steps = [{"line": i + 1, "action": s, "variables": {}, "output": None} for i, s in enumerate(steps)]

            validated = DebugResponse(
                success=result.get("success", False),
                language=result.get("language", language),
                stdout=result.get("stdout", ""),
                stderr=result.get("stderr", ""),
                variables=result.get("variables", {}),
                execution_steps=steps,
                call_stack=result.get("call_stack", []),
                error_type=result.get("error_type"),
                error_message=result.get("error_message"),
                simulation=True,
            )
            return validated.to_dict()

        except Exception as e:
            logger.error(f"simulate_debugging error: {str(e)}\n{traceback.format_exc()}")
            return ErrorResponse(error="Internal debug simulation error").to_dict()

    def generate_completion(self, language, code, cursor_position):
        try:
            lang_obj = language_manager.get_language(language)
            if not lang_obj:
                return AutocompleteResponse(success=False, completion="").to_dict()

            context_start = max(0, cursor_position - 2000)
            context_code = code[context_start:cursor_position]

            prompt_template = prompt_engine.build_autocomplete_prompt(language, context_code, cursor_position, lang_obj.ai_context)
            prompt = prompt_template.invoke({
                "language": language,
                "code": context_code,
                "cursor_position": cursor_position,
                "language_context": lang_obj.ai_context,
            })

            default_response = AutocompleteResponse(
                success=False,
                completion="",
            ).to_dict()

            result = self._safe_invoke(prompt, default_response)

            validated = AutocompleteResponse(
                success=result.get("success", False),
                completion=result.get("completion", ""),
                simulation=True,
            )
            return validated.to_dict()

        except Exception as e:
            logger.error(f"generate_completion error: {str(e)}\n{traceback.format_exc()}")
            return AutocompleteResponse(success=False, completion="").to_dict()

    def beautify_code(self, language, code):
        try:
            lang_obj = language_manager.get_language(language)
            if not lang_obj:
                return ErrorResponse(error=f"Unsupported language: {language}").to_dict()

            prompt_template = prompt_engine.build_beautify_prompt(language, code, lang_obj.ai_context)
            prompt = prompt_template.invoke({
                "language": language,
                "code": code,
                "language_context": lang_obj.ai_context,
            })

            default_response = BeautifyResponse(
                success=False,
                code=code,
            ).to_dict()

            result = self._safe_invoke(prompt, default_response)

            validated = BeautifyResponse(
                success=result.get("success", False),
                code=result.get("code", code),
                simulation=True,
            )
            return validated.to_dict()

        except Exception as e:
            logger.error(f"beautify_code error: {str(e)}\n{traceback.format_exc()}")
            return BeautifyResponse(success=False, code=code).to_dict()


ai_engine = AIEngine()
