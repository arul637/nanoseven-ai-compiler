function executeBeautify() {
    const code = getEditorValue();
    if (!code.trim()) {
        showOutput('SYSTEM', 'No code to beautify.');
        return;
    }

    setButtonLoading($('btn-beautify'), true);
    showLoading('Beautifying code...');

    const language = AppState.currentLanguage;

    fetch('/api/beautify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: language,
            code: code,
        }),
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
        if (data.success && data.code) {
            setEditorValue(data.code);
            showOutput('SYSTEM', 'Code beautified successfully.');
        } else {
            showError('Beautify failed: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(function (err) {
        showError('Network error: ' + err.message);
    })
    .finally(function () {
        setButtonLoading($('btn-beautify'), false);
        hideLoading();
    });
}
