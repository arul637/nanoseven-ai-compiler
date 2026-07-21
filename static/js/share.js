function executeShare() {
    const code = getEditorValue();
    if (!code.trim()) {
        showModal('Share Code', 'No code to share.');
        return;
    }

    setButtonLoading($('btn-share'), true);

    fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: AppState.currentLanguage,
            code: code,
        }),
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
        if (data.success) {
            const shareUrl = window.location.origin + '/api/share/' + data.id;
            showModal('Share Code', 'Share link created!', function (container) {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'share-link-input';
                input.value = shareUrl;
                input.readOnly = true;
                container.appendChild(input);
                input.addEventListener('click', function () {
                    this.select();
                    navigator.clipboard.writeText(this.value).catch(function () {});
                });
                return container;
            });
        } else {
            showModal('Share Code', 'Failed to create share link: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(function (err) {
        showModal('Share Code', 'Network error: ' + err.message);
    })
    .finally(function () {
        setButtonLoading($('btn-share'), false);
    });
}

function loadSharedCode() {
    const path = window.location.pathname;
    const match = path.match(/^\/api\/share\/([a-f0-9]+)$/);
    if (match) {
        const shareId = match[1];
        AppState.shareId = shareId;
        fetch('/api/share/' + shareId)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (data.success) {
                    if (data.language && AppState.languageMap[data.language]) {
                        switchLanguage(data.language);
                    }
                    if (data.code) {
                        setEditorValue(data.code);
                    }
                    showOutput('SYSTEM', 'Shared code loaded successfully.');
                }
            })
            .catch(function () {});
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(loadSharedCode, 500);
});
