from flask import Flask, jsonify, render_template, request

from ai_service import beautify_code, run_code
from config import LANGUAGES, MAX_CODE_SIZE

app = Flask(__name__)


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
    try:
        output = run_code(
            language=data["language"],
            code=data["code"],
            stdin_input=data.get("input", ""),
        )
        return jsonify({"output": output})
    except Exception as e:
        return jsonify({"error": str(e)}), 502


@app.route("/api/beautify", methods=["POST"])
def api_beautify():
    data = request.get_json()
    err = validate(data)
    if err:
        return jsonify({"error": err}), 400
    try:
        output = beautify_code(
            language=data["language"],
            code=data["code"],
        )
        return jsonify({"output": output})
    except Exception as e:
        return jsonify({"error": str(e)}), 502


@app.route("/api/share", methods=["POST"])
def api_share():
    data = request.get_json()
    err = validate(data)
    if err:
        return jsonify({"error": err}), 400
    return jsonify({"language": data["language"], "app": "Nano AI Compiler"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
