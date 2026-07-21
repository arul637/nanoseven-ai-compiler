function executeDownload() {
    const code = getEditorValue();
    if (!code.trim()) {
        showModal('Download', 'No code to download.');
        return;
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/api/download';
    form.style.display = 'none';

    const langInput = document.createElement('input');
    langInput.type = 'hidden';
    langInput.name = 'language';
    langInput.value = AppState.currentLanguage;

    const codeInput = document.createElement('input');
    codeInput.type = 'hidden';
    codeInput.name = 'code';
    codeInput.value = code;

    const jsonInput = document.createElement('input');
    jsonInput.type = 'hidden';
    jsonInput.name = 'json';
    jsonInput.value = JSON.stringify({
        language: AppState.currentLanguage,
        code: code,
    });

    form.appendChild(langInput);
    form.appendChild(codeInput);
    form.appendChild(jsonInput);
    document.body.appendChild(form);

    fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: AppState.currentLanguage,
            code: code,
        }),
    })
    .then(function (r) {
        if (r.ok) {
            return r.blob();
        }
        throw new Error('Download failed');
    })
    .then(function (blob) {
        const lang = AppState.languageMap[AppState.currentLanguage];
        const ext = lang ? lang.extension : '.txt';
        const filename = 'code' + ext;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    })
    .catch(function (err) {
        showModal('Download', 'Download failed: ' + err.message);
    })
    .finally(function () {
        document.body.removeChild(form);
    });
}
