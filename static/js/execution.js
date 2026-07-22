function executeRun() {
    if (AppState.isRunning) return;

    const code = getEditorValue();
    if (!code.trim()) {
        showOutput('OUTPUT', 'No code to simulate.');
        return;
    }

    AppState.isRunning = true;
    AppState.abortController = new AbortController();

    setButtonLoading($('btn-run'), true);
    $('btn-stop').disabled = false;
    showLoading('Simulating execution...');

    const language = AppState.currentLanguage;

    fetch('/api/run', {
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
            if (data.error_message) {
                showError(data.error_type + ': ' + data.error_message);
            }
            if (data.variables && Object.keys(data.variables).length > 0) {
                updateDebugVariables(data.variables);
            }
        } else {
            showError(data.error || 'Simulation failed');
        }
    })
    .catch(function (err) {
        if (err.name === 'AbortError') {
            showOutput('SYSTEM', 'Simulation cancelled.');
        } else {
            showError('Network error: ' + err.message);
        }
    })
    .finally(function () {
        AppState.isRunning = false;
        AppState.abortController = null;
        setButtonLoading($('btn-run'), false);
        $('btn-stop').disabled = true;
        hideLoading();
    });
}

function stopExecution() {
    if (AppState.abortController) {
        AppState.abortController.abort();
        AppState.isRunning = false;
        AppState.abortController = null;
        setButtonLoading($('btn-run'), false);
        $('btn-stop').disabled = true;
        hideLoading();
        showOutput('SYSTEM', 'Simulation stopped.');

        fetch('/api/stop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{}',
        }).catch(function () {});
    }
}
