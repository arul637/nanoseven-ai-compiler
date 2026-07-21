import re
from pathlib import Path

from langchain_groq import ChatGroq

from config import GROQ_API_KEY, GROQ_MODEL, MAX_OUTPUT_SIZE, TIMEOUT

PROMPT_DIR = Path(__file__).resolve().parent / "prompts"


def _load_prompt(name: str) -> str:
    return (PROMPT_DIR / name).read_text()


def _build_prompt(template_name: str, language: str, code: str, stdin_input: str = "") -> str:
    template = _load_prompt(template_name)
    lang_lower = language.lower()
    if stdin_input and stdin_input.strip():
        input_section = (
            "\nUSER INPUT (simulate with these, in order):\n"
            f"{stdin_input}\n"
        )
    else:
        input_section = (
            "\nUSER INPUT:\n"
            "If prompted, simulate with a reasonable default.\n"
        )
    return template.format(
        language=language, language_lower=lang_lower, code=code,
        input_section=input_section
    )


def _clean_output(text: str) -> str:
    text = re.sub(r"^```\w*\s*\n?", "", text)
    text = re.sub(r"\n```\s*$", "", text)
    text = re.sub(r"^```\n?", "", text)
    text = re.sub(r"\n```$", "", text)
    return text.strip()


def _get_llm() -> ChatGroq:
    return ChatGroq(
        model=GROQ_MODEL,
        api_key=GROQ_API_KEY, # type: ignore
        temperature=0,
        max_tokens=MAX_OUTPUT_SIZE,
        timeout=TIMEOUT,
    )


def run_code(language: str, code: str, stdin_input: str = "") -> str:
    prompt = _build_prompt("run.txt", language, code, stdin_input)
    llm = _get_llm()
    response = llm.invoke(prompt)
    return _clean_output(response.content) # type: ignore


def beautify_code(language: str, code: str) -> str:
    prompt = _build_prompt("beautify.txt", language, code)
    llm = _get_llm()
    response = llm.invoke(prompt)
    return _clean_output(response.content) # type: ignore
