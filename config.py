import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY not set in .env file")

GROQ_MODEL = "openai/gpt-oss-20b"
TIMEOUT = 60
MAX_CODE_SIZE = 50000
MAX_OUTPUT_SIZE = 50000

HOST = '0.0.0.0'
PORT = 5001

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
