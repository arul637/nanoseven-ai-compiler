function executeDebug() {
    if (AppState.isRunning) return;

    const code = getEditorValue();
    if (!code.trim()) {
        showOutput('DEBUG', 'No code to debug.');
        return;
    }

    AppState.isRunning = true;
    AppState.abortController = new AbortController();

    setButtonLoading($('btn-debug'), true);
    $('btn-stop').disabled = false;
    showLoading('Simulating debugging...');

    const language = AppState.currentLanguage;

    fetch('/api/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: language,
            code: code,
        }),
        signal: AppState.abortController.signal,
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
        if (data.success) {
            showOutput('OUTPUT', data.stdout || '(no output)');
            if (data.stderr) {
                showError(data.stderr);
            }
            renderDebugData(data);
        } else {
            showError(data.error || 'Debug simulation failed');
        }
    })
    .catch(function (err) {
        if (err.name === 'AbortError') {
            showOutput('SYSTEM', 'Debug simulation cancelled.');
        } else {
            showError('Network error: ' + err.message);
        }
    })
    .finally(function () {
        AppState.isRunning = false;
        AppState.abortController = null;
        setButtonLoading($('btn-debug'), false);
        $('btn-stop').disabled = true;
        hideLoading();
    });
}

function renderDebugData(data) {
    const stepsEl = $('debug-steps');
    const varsEl = $('debug-variables');

    if (data.execution_steps && data.execution_steps.length > 0) {
        let html = '';
        data.execution_steps.forEach(function (step) {
            if (typeof step === 'string') {
                html += step + '\n';
            } else {
                html += 'Line ' + (step.line || '?') + ': ' + (step.action || '') + '\n';
                if (step.output) {
                    html += '  → ' + step.output + '\n';
                }
            }
        });
        stepsEl.textContent = html || 'No execution steps.';
    } else {
        stepsEl.textContent = 'No execution steps.';
    }

    if (data.variables && Object.keys(data.variables).length > 0) {
        varsEl.textContent = JSON.stringify(data.variables, null, 2);
    } else {
        varsEl.textContent = 'No variables.';
    }

    switchTab('debug');
}

function updateDebugVariables(variables) {
    const varsEl = $('debug-variables');
    varsEl.textContent = JSON.stringify(variables, null, 2);
}
