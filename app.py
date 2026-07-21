import json
import os
import re
import urllib.error
import urllib.request

from flask import Flask, jsonify, render_template, request

from config import *

app = Flask(__name__)
PROMPT_DIR = os.path.join(os.path.dirname(__file__), "prompts")

MAX_CODE_SIZE = 50000
MAX_OUTPUT_SIZE = 32000


def load_prompt(name):
    with open(os.path.join(PROMPT_DIR, name), "r") as f:
        return f.read()


def build_prompt(template_name, language, code, stdin_input=""):
    template = load_prompt(template_name)
    lang_lower = language.lower()
    if stdin_input and stdin_input.strip():
        input_section = (
            "\nUSER INPUT:\n"
            "The program prompts for user input. Simulate the program receiving "
            "these exact inputs (one per line, in order):\n"
            f"{stdin_input}\n"
            "Show prompt messages and simulate with these inputs.\n"
        )
    else:
        input_section = (
            "\nUSER INPUT:\n"
            "If the program prompts for user input, show the prompt message "
            "and simulate with a reasonable default value (e.g. \"User\" for "
            "name prompts, \"42\" for number prompts).\n"
        )
    return template.format(
        language=language, language_lower=lang_lower, code=code,
        input_section=input_section
    )


def clean_output(text):
    text = re.sub(r"^```\w*\s*\n?", "", text)
    text = re.sub(r"\n```\s*$", "", text)
    text = re.sub(r"^```\n?", "", text)
    text = re.sub(r"\n```$", "", text)
    return text.strip()


def query_ollama(prompt):
    data = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {"num_predict": MAX_OUTPUT_SIZE},
    }).encode()
    req = urllib.request.Request(
        f"{OLLAMA_URL}/api/generate",
        data=data,
        headers={"Content-Type": "application/json"},
    )
    try:
        resp = urllib.request.urlopen(req, timeout=TIMEOUT)
        result = json.loads(resp.read())
        text = result.get("response", "").strip()
        return clean_output(text)
    except urllib.error.HTTPError as e:
        raise ConnectionError(f"Ollama HTTP error: {e.code} - {e.reason}")
    except urllib.error.URLError:
        raise ConnectionError(
            "Cannot connect to Ollama at http://localhost:11434. Is it running?"
        )
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON response from Ollama")
    except Exception as e:
        raise RuntimeError(str(e))


def validate(data):
    if not data:
        return "No data provided"
    lang = data.get("language", "")
    code = data.get("code", "")
    if not lang:
        return "No language selected"
    if lang not in LANGUAGES:
        return f"Unsupported language: {lang}"
    if not code or not code.strip():
        return "No code provided"
    if len(code) > MAX_CODE_SIZE:
        return f"Code too large (max {MAX_CODE_SIZE//1000}KB)"
    return None


# ----- Routes -----

@app.route("/")
def index():
    return render_template("index.html", languages=LANGUAGES)


@app.route("/api/run", methods=["POST"])
def api_run():
    data = request.get_json()
    err = validate(data)
    if err:
        return jsonify({"error": err}), 400
    lang = data["language"]
    code = data["code"]
    stdin_input = data.get("input", "")

    prompt = build_prompt("run.txt", lang, code, stdin_input)
    try:
        output = query_ollama(prompt)
        return jsonify({"output": output})
    except ConnectionError as e:
        return jsonify({"error": str(e)}), 502
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/beautify", methods=["POST"])
def api_beautify():
    data = request.get_json()
    err = validate(data)
    if err:
        return jsonify({"error": err}), 400
    lang = data["language"]
    code = data["code"]

    prompt = build_prompt("beautify.txt", lang, code)
    try:
        output = query_ollama(prompt)
        return jsonify({"output": output})
    except ConnectionError as e:
        return jsonify({"error": str(e)}), 502
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/share", methods=["POST"])
def api_share():
    data = request.get_json()
    err = validate(data)
    if err:
        return jsonify({"error": err}), 400
    return jsonify({"language": data["language"], "app": "Nano AI Compiler"})


if __name__ == "__main__":
    app.run(debug=True, host=HOST, port=PORT)
