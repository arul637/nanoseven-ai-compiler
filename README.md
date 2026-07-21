# Nano AI Compiler

A minimalistic, AI-powered online code compiler that simulates code execution using local Ollama models. Instead of running code on real hardware, Nano AI Compiler sends source code to a large language model (llama3.1:8b) which simulates the expected output safely.

## How It Works

Nano AI Compiler never executes user code. It uses no `exec`, `eval`, `compile`, `subprocess`, `os.system`, Docker containers, VMs, or real compilers/interpreters. Every operation is simulated by AI:

- **Code execution** — The AI predicts program output and full compiler/runtime errors
- **Beautification** — The AI formats code without changing logic
- **Code analysis** — Detailed explanation with line-by-line breakdown for PDF export
- **Dangerous operations** (filesystem, shell, network) — Safely simulated without accessing the host

Prompt templates are stored in `prompts/` as plain text files, making them easy to customize.

## Prerequisites

### Install Ollama

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh
```

### Pull the Model

```bash
ollama pull llama3.1:8b
```

Ollama must be running on `http://localhost:11434` before starting the application.

## Installation

```bash
cd nano-ai-compiler
pip install -r requirements.txt
```

## Running

```bash
python app.py
```

Open http://localhost:5000 in your browser.

Make sure Ollama is running:

```bash
ollama serve
```

## Supported Languages

Python, JavaScript, TypeScript, C, C++, Java, C#, Go, Rust, PHP, Ruby, Kotlin, Swift, Bash, SQL, HTML, CSS

## Features

- **RUN** — Simulate code execution; shows output and full error messages (compiler errors, stack traces) for C, Java, Python, etc.
- **STOP** — Cancel active AI request with AbortController
- **SHARE** — Copy code and language info to clipboard
- **DOWNLOAD** — Generate a PDF with source code + detailed AI explanation
- **BEAUTIFY** — AI-powered code formatting (no markdown wrapping, no extra comments)
- **Monaco Editor** — Professional code editor with custom nano-dark theme
- **Language-aware autocomplete** — Keywords and snippets for 17 languages
- **Output/Error tabs** — Separate views for output and error messages with copy buttons
- **Language dropdown** — Top-right select menu, editor takes full width
- **Zero execution risk** — No user code ever runs on your machine

## Project Structure

```
nano-ai-compiler/
├── app.py              # Flask routes only
├── config.py           # Configuration constants
├── prompts/            # Prompt templates for Ollama
│   ├── run.txt         #   Code execution simulation
│   ├── beautify.txt    #   Code formatting
│   └── explain.txt     #   Code explanation for PDF
├── requirements.txt
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── app.js
```

## Security Model

| Risk | Mitigation |
|------|-----------|
| Code execution | No exec/eval/compile/subprocess/os.system |
| Container escape | No Docker, VMs, or sandbox environments |
| File system access | All file operations are AI-simulated |
| Network access | Simulated by the model; no real connections |
| Data persistence | No database; no logs of user code stored |

The application runs HTTP requests only to the local Ollama API. User code is processed exclusively by the AI model.

## Limitations

- Output quality depends on the model's understanding of the language
- Complex or highly system-dependent code may produce inaccurate results
- Long-running simulations may time out (60s default)
- Requires a local Ollama instance with the llama3.1:8b model
- AI-generated output may occasionally include hallucinations or incorrect behavior
- Not suitable for production code validation or security-critical analysis

## Tech Stack

- **Backend:** Flask (Python)
- **Frontend:** Vanilla JavaScript, CSS
- **Editor:** Monaco Editor (CDN)
- **AI:** Ollama (local) + llama3.1:8b
- **PDF:** fpdf2
- **Dependencies:** Flask, fpdf2
