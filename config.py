import os
from dotenv import load_dotenv

load_dotenv()


class ConfigError(Exception):
    pass


class Config:
    def __init__(self):
        self.flask_env = os.getenv("FLASK_ENV", "development")
        self.secret_key = os.getenv("SECRET_KEY", "change-this-secret-key")

        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        self.gemini_model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        self.gemini_temperature = float(os.getenv("GEMINI_TEMPERATURE", "0.2"))
        self.gemini_max_output_tokens = int(os.getenv("GEMINI_MAX_OUTPUT_TOKENS", "4096"))

        self.ai_timeout = int(os.getenv("AI_TIMEOUT", "60"))
        self.max_code_length = int(os.getenv("MAX_CODE_LENGTH", "20000"))
        self.max_request_size = int(os.getenv("MAX_REQUEST_SIZE", "25000"))

        self.ai_autocomplete_enabled = os.getenv("AI_AUTOCOMPLETE_ENABLED", "true").lower() == "true"
        self.ai_autocomplete_debounce = int(os.getenv("AI_AUTOCOMPLETE_DEBOUNCE", "700"))

        self._validate()

    def _validate(self):
        if not self.gemini_api_key or self.gemini_api_key == "your-gemini-api-key":
            raise ConfigError("Gemini API key is not configured. Set GEMINI_API_KEY in .env")


config = Config()
