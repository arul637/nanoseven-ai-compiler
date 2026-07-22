import os

def load_env(env_path=".env"):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    full_path = os.path.join(base_dir, env_path)
    if os.path.exists(full_path):
        with open(full_path, "r") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    key, val = line.split("=", 1)
                    val_str = val.strip().strip("'\"")
                    os.environ[key.strip()] = val_str

load_env()

API_URL = os.environ.get("API_URL", "https://integrate.api.nvidia.com/v1")
API_KEY = os.environ.get("API_KEY", "duplicate api key")
API_KEY_RUN = os.environ.get("API_KEY_RUN", API_KEY)
API_KEY_BUG = os.environ.get("API_KEY_BUG", API_KEY)
API_KEY_COMPLEXITY = os.environ.get("API_KEY_COMPLEXITY", API_KEY)
API_KEY_CHALLENGE = os.environ.get("API_KEY_CHALLENGE", API_KEY)
API_KEY_SECURITY = os.environ.get("API_KEY_SECURITY", API_KEY)
API_KEY_ERROR_FIX = os.environ.get("API_KEY_ERROR_FIX", API_KEY)
MODEL = os.environ.get("MODEL", "google/gemma-2-2b-it")
TIMEOUT = int(os.environ.get("TIMEOUT", "120"))

HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "5002"))

LANGUAGES = [
    "Python", "JavaScript", "TypeScript", "C", "C++", "Java", "C#",
    "Go", "Rust", "PHP", "Ruby", "Kotlin", "Swift", "Bash", "SQL",
    "HTML", "CSS"
]

EXTENSIONS = {
    "Python": "py", "JavaScript": "js", "TypeScript": "ts",
    "C": "c", "C++": "cpp", "Java": "java", "C#": "cs",
    "Go": "go", "Rust": "rs", "PHP": "php", "Ruby": "rb",
    "Kotlin": "kt", "Swift": "swift", "Bash": "sh", "SQL": "sql",
    "HTML": "html", "CSS": "css"
}

MONACO_LANG = {
    "Python": "python", "JavaScript": "javascript", "TypeScript": "typescript",
    "C": "c", "C++": "cpp", "Java": "java", "C#": "csharp",
    "Go": "go", "Rust": "rust", "PHP": "php", "Ruby": "ruby",
    "Kotlin": "kotlin", "Swift": "swift", "Bash": "shell", "SQL": "sql",
    "HTML": "html", "CSS": "css"
}
