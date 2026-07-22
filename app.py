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
MAX_OUTPUT_SIZE = 4096


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


def build_prompt_with_error(template_name, language, code, error_output):
    template = load_prompt(template_name)
    lang_lower = language.lower()
    return template.format(
        language=language, language_lower=lang_lower, code=code,
        error_output=error_output
    )


def clean_output(text):
    text = re.sub(r"^```\w*\s*\n?", "", text)
    text = re.sub(r"\n```\s*$", "", text)
    text = re.sub(r"^```\n?", "", text)
    text = re.sub(r"\n```$", "", text)
    return text.strip()


def extract_json(text):
    text = clean_output(text)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    match = re.search(r"```(?:json)?\s*\n?(.*?)\n?```", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1).strip())
        except json.JSONDecodeError:
            pass
    brace_match = re.search(r"(\{.*\}|\[.*\])", text, re.DOTALL)
    if brace_match:
        try:
            return json.loads(brace_match.group(1))
        except json.JSONDecodeError:
            pass
    return None


def query_nvidia_api(prompt, api_key=None):
    if not api_key:
        api_key = API_KEY
    payload = {
        "model": MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.2,
        "top_p": 0.7,
        "max_tokens": MAX_OUTPUT_SIZE,
        "stream": False
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{API_URL}/chat/completions",
        data=data,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        },
    )
    try:
        resp = urllib.request.urlopen(req, timeout=TIMEOUT)
        result = json.loads(resp.read().decode("utf-8"))
        text = result["choices"][0]["message"]["content"].strip()
        return clean_output(text)
    except urllib.error.HTTPError as e:
        raise ConnectionError(f"NVIDIA API HTTP error: {e.code} - {e.reason}")
    except urllib.error.URLError as e:
        raise ConnectionError(f"Cannot connect to NVIDIA API at {API_URL}: {e.reason}")
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON response from NVIDIA API")
    except KeyError:
        raise ValueError("Unexpected response structure from NVIDIA API")
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

    if lang == "Python":
        import ast
        try:
            ast.parse(code)
        except SyntaxError as e:
            text_line = e.text.strip() if e.text else ""
            offset_indicator = ""
            if e.offset is not None:
                # Add spaces up to the error column offset
                offset_indicator = "\n" + " " * (e.offset + 3) + "^"
            err_msg = (
                f"  File \"<string>\", line {e.lineno}\n"
                f"    {text_line}"
                f"{offset_indicator}\n"
                f"SyntaxError: {e.msg}"
            )
            return jsonify({"output": err_msg})

    prompt = build_prompt("run.txt", lang, code, stdin_input)
    try:
        output = query_nvidia_api(prompt, api_key=API_KEY_RUN)
        return jsonify({"output": output})
    except ConnectionError as e:
        return jsonify({"error": str(e)}), 502
    except Exception as e:
        import traceback
        traceback.print_exc()
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
        output = query_nvidia_api(prompt, api_key=API_KEY_RUN)
        return jsonify({"output": output})
    except ConnectionError as e:
        return jsonify({"error": str(e)}), 502
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/share", methods=["POST"])
def api_share():
    data = request.get_json()
    err = validate(data)
    if err:
        return jsonify({"error": err}), 400
    return jsonify({"language": data["language"], "app": "Nano AI Compiler"})


@app.route("/api/analyze", methods=["POST"])
def api_analyze():
    data = request.get_json()
    err = validate(data)
    if err:
        return jsonify({"error": err}), 400
    
    lang = data["language"]
    code = data["code"]
    analysis_type = data.get("type", "")
    error_output = data.get("error_output", "")
    
    if analysis_type not in ["security", "complexity", "bug_detector", "challenge", "error_fix"]:
        return jsonify({"error": f"Invalid analysis type: {analysis_type}"}), 400
        
    key_map = {
        "security": API_KEY_SECURITY,
        "complexity": API_KEY_COMPLEXITY,
        "bug_detector": API_KEY_BUG,
        "challenge": API_KEY_CHALLENGE,
        "error_fix": API_KEY_ERROR_FIX
    }
    target_key = key_map.get(analysis_type, API_KEY)

    if analysis_type == "error_fix":
        prompt = build_prompt_with_error("error_fix.txt", lang, code, error_output)
    else:
        prompt = build_prompt(f"{analysis_type}.txt", lang, code)

    try:
        output = query_nvidia_api(prompt, api_key=target_key)
        parsed_data = extract_json(output)
        if parsed_data is not None:
            return jsonify({"data": parsed_data})
        return jsonify({
            "error": "Failed to parse AI output as JSON",
            "raw_output": output
        }), 502
    except ConnectionError as e:
        return jsonify({"error": str(e)}), 502
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host=HOST, port=PORT)
