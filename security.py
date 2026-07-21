from flask import request, jsonify
from config import config
from logger import logger


class SecurityValidator:
    def validate_request_size(self):
        content_length = request.content_length or 0
        if content_length > config.max_request_size:
            logger.warning(f"Request too large: {content_length} bytes")
            return False, "Request too large"
        return True, None

    def validate_code_length(self, code):
        if len(code) > config.max_code_length:
            logger.warning(f"Code too long: {len(code)} characters")
            return False, f"Source code exceeds maximum length of {config.max_code_length} characters"
        return True, None

    def validate_language(self, language, language_manager):
        if not language or not language_manager.validate(language):
            logger.warning(f"Invalid language: {language}")
            return False, f"Unsupported language: {language}"
        return True, None

    def validate_json_request(self):
        if not request.is_json:
            return False, "Request must be JSON"
        data = request.get_json(silent=True)
        if data is None:
            return False, "Invalid JSON in request body"
        return True, data

    def sanitize_output(self, response_data):
        if isinstance(response_data, dict):
            return {
                k: self.sanitize_output(v) for k, v in response_data.items()
                if not k.startswith("_") and k not in ("api_key", "secret", "token", "password")
            }
        if isinstance(response_data, list):
            return [self.sanitize_output(item) for item in response_data]
        return response_data


security_validator = SecurityValidator()
