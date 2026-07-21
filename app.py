from flask import Flask, render_template, request, jsonify
from config import config, ConfigError
from language_manager import language_manager
from security import security_validator
from ai_engine import ai_engine
from autocomplete_engine import local_autocomplete
from debug_engine import debug_engine
from beautifier import beautifier
from sharing import sharing_manager
from download_manager import download_manager
from response_parser import ErrorResponse
from logger import logger
import traceback

app = Flask(__name__)
app.secret_key = config.secret_key
app.config["MAX_CONTENT_LENGTH"] = config.max_request_size


@app.errorhandler(Exception)
def handle_exception(e):
    logger.error(f"Unhandled exception: {str(e)}\n{traceback.format_exc()}")
    return jsonify({"success": False, "error": "Internal server error", "simulation": True}), 500


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/languages")
def get_languages():
    try:
        langs = language_manager.get_all()
        return jsonify({"success": True, "languages": langs})
    except Exception as e:
        logger.error(f"Error fetching languages: {str(e)}")
        return jsonify({"success": False, "error": "Failed to load languages"}), 500


@app.route("/api/run", methods=["POST"])
def run_code():
    try:
        valid, data = security_validator.validate_json_request()
        if not valid:
            return jsonify(ErrorResponse(error=data).to_dict()), 400

        language = data.get("language", "").strip().lower()
        code = data.get("code", "")

        valid_lang, lang_error = security_validator.validate_language(language, language_manager)
        if not valid_lang:
            return jsonify(ErrorResponse(error=lang_error).to_dict()), 400

        valid_len, len_error = security_validator.validate_code_length(code)
        if not valid_len:
            return jsonify(ErrorResponse(error=len_error).to_dict()), 400

        result = ai_engine.simulate_execution(language, code)
        return jsonify(result)

    except Exception as e:
        logger.error(f"Run error: {str(e)}\n{traceback.format_exc()}")
        return jsonify(ErrorResponse(error="Internal server error during simulation").to_dict()), 500


@app.route("/api/debug", methods=["POST"])
def debug_code():
    try:
        valid, data = security_validator.validate_json_request()
        if not valid:
            return jsonify(ErrorResponse(error=data).to_dict()), 400

        language = data.get("language", "").strip().lower()
        code = data.get("code", "")

        valid_lang, lang_error = security_validator.validate_language(language, language_manager)
        if not valid_lang:
            return jsonify(ErrorResponse(error=lang_error).to_dict()), 400

        valid_len, len_error = security_validator.validate_code_length(code)
        if not valid_len:
            return jsonify(ErrorResponse(error=len_error).to_dict()), 400

        result = debug_engine.debug(language, code)
        return jsonify(result)

    except Exception as e:
        logger.error(f"Debug error: {str(e)}\n{traceback.format_exc()}")
        return jsonify(ErrorResponse(error="Internal server error during debug simulation").to_dict()), 500


@app.route("/api/autocomplete", methods=["POST"])
def autocomplete():
    try:
        valid, data = security_validator.validate_json_request()
        if not valid:
            return jsonify(ErrorResponse(error=data).to_dict()), 400

        language = data.get("language", "").strip().lower()
        code = data.get("code", "")
        cursor_position = data.get("cursor_position", len(code))

        valid_lang, lang_error = security_validator.validate_language(language, language_manager)
        if not valid_lang:
            return jsonify(ErrorResponse(error=lang_error).to_dict()), 400

        local_suggestions = local_autocomplete.get_suggestions(language, code, cursor_position)

        ai_completion = None
        if config.ai_autocomplete_enabled and not local_suggestions:
            ai_result = ai_engine.generate_completion(language, code, cursor_position)
            if ai_result.get("success") and ai_result.get("completion"):
                ai_completion = ai_result["completion"]

        return jsonify({
            "success": True,
            "local": local_suggestions,
            "ai": ai_completion,
            "simulation": True,
        })

    except Exception as e:
        logger.error(f"Autocomplete error: {str(e)}\n{traceback.format_exc()}")
        return jsonify(ErrorResponse(error="Internal autocomplete error").to_dict()), 500


@app.route("/api/beautify", methods=["POST"])
def beautify_code():
    try:
        valid, data = security_validator.validate_json_request()
        if not valid:
            return jsonify(ErrorResponse(error=data).to_dict()), 400

        language = data.get("language", "").strip().lower()
        code = data.get("code", "")

        valid_lang, lang_error = security_validator.validate_language(language, language_manager)
        if not valid_lang:
            return jsonify(ErrorResponse(error=lang_error).to_dict()), 400

        valid_len, len_error = security_validator.validate_code_length(code)
        if not valid_len:
            return jsonify(ErrorResponse(error=len_error).to_dict()), 400

        result = beautifier.beautify(language, code)
        return jsonify(result)

    except Exception as e:
        logger.error(f"Beautify error: {str(e)}\n{traceback.format_exc()}")
        return jsonify(ErrorResponse(error="Internal beautify error").to_dict()), 500


@app.route("/api/share", methods=["POST"])
def share_code():
    try:
        valid, data = security_validator.validate_json_request()
        if not valid:
            return jsonify(ErrorResponse(error=data).to_dict()), 400

        language = data.get("language", "").strip().lower()
        code = data.get("code", "")

        valid_lang, lang_error = security_validator.validate_language(language, language_manager)
        if not valid_lang:
            return jsonify(ErrorResponse(error=lang_error).to_dict()), 400

        result = sharing_manager.create_share(language, code)
        return jsonify(result)

    except Exception as e:
        logger.error(f"Share error: {str(e)}\n{traceback.format_exc()}")
        return jsonify(ErrorResponse(error="Internal share error").to_dict()), 500


@app.route("/api/share/<share_id>")
def get_share(share_id):
    try:
        result = sharing_manager.get_share(share_id)
        return jsonify(result)
    except Exception as e:
        logger.error(f"Get share error: {str(e)}\n{traceback.format_exc()}")
        return jsonify(ErrorResponse(error="Internal share retrieval error").to_dict()), 500


@app.route("/api/download", methods=["POST"])
def download_code():
    try:
        valid, data = security_validator.validate_json_request()
        if not valid:
            return jsonify(ErrorResponse(error=data).to_dict()), 400

        language = data.get("language", "").strip().lower()
        code = data.get("code", "")

        valid_lang, lang_error = security_validator.validate_language(language, language_manager)
        if not valid_lang:
            return jsonify(ErrorResponse(error=lang_error).to_dict()), 400

        return download_manager.create_download(language, code)

    except Exception as e:
        logger.error(f"Download error: {str(e)}\n{traceback.format_exc()}")
        return jsonify(ErrorResponse(error="Internal download error").to_dict()), 500


@app.route("/api/stop", methods=["POST"])
def stop_request():
    return jsonify({
        "success": True,
        "message": "AI request cancelled",
        "simulation": True,
    })


if __name__ == "__main__":
    try:
        logger.info("Starting Nano AI Compiler")
        logger.info(f"Model: {config.gemini_model}")
        logger.info(f"Max code length: {config.max_code_length}")
        logger.info(f"AI Autocomplete: {'enabled' if config.ai_autocomplete_enabled else 'disabled'}")
        app.run(debug=(config.flask_env == "development"), host="0.0.0.0", port=5001)
    except ConfigError as e:
        logger.error(f"Configuration error: {str(e)}")
        print(f"\nERROR: {str(e)}")
        print("Please create a .env file with your Gemini API key:")
        print("  cp .env.example .env")
        print("  Then add your GEMINI_API_KEY to .env")
    except Exception as e:
        logger.error(f"Startup error: {str(e)}\n{traceback.format_exc()}")
        print(f"\nERROR: Failed to start application: {str(e)}")
