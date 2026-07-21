function showOutput(tab, text) {
    const outputEl = $('output-text');
    const errorEl = $('error-text');

    if (tab === 'OUTPUT') {
        outputEl.textContent = text;
        switchTab('output');
    } else if (tab === 'ERROR') {
        errorEl.textContent = text;
        switchTab('error');
    } else if (tab === 'SYSTEM') {
        const sysOutput = $('output-text');
        sysOutput.textContent = text;
        switchTab('output');
        errorEl.textContent = 'No errors.';
    }
}

function showError(text) {
    const errorEl = $('error-text');
    errorEl.textContent = text;
    switchTab('error');
}

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.output-tab');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(function (t) {
        t.classList.toggle('active', t.dataset.tab === tabId);
    });

    panes.forEach(function (p) {
        p.classList.toggle('active', p.id === 'tab-' + tabId);
    });
}

function showLoading(text) {
    const el = $('loading-indicator');
    el.textContent = text || 'Simulating...';
    el.classList.remove('hidden');
}

function hideLoading() {
    const el = $('loading-indicator');
    el.classList.add('hidden');
}

function setButtonLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
        btn.disabled = true;
        btn.dataset.originalText = btn.innerHTML;
        btn.innerHTML = '<span class="spinner"></span>';
    } else {
        btn.disabled = false;
        if (btn.dataset.originalText) {
            btn.innerHTML = btn.dataset.originalText;
        }
    }
}

function showModal(title, message, customContent) {
    const overlay = $('modal-overlay');
    const titleEl = $('modal-title');
    const messageEl = $('modal-message');
    const actionArea = $('modal-action-area');
    const okBtn = $('modal-ok');

    titleEl.textContent = title;
    messageEl.textContent = message;
    actionArea.innerHTML = '';

    if (customContent) {
        customContent(actionArea);
    }

    overlay.classList.remove('hidden');

    function closeModal() {
        overlay.classList.add('hidden');
    }

    $('modal-close').onclick = closeModal;
    okBtn.onclick = closeModal;
    overlay.onclick = function (e) {
        if (e.target === overlay) closeModal();
    };
}

function registerToolbarEvents() {
    $('btn-run').addEventListener('click', executeRun);
    $('btn-debug').addEventListener('click', executeDebug);
    $('btn-stop').addEventListener('click', stopExecution);
    $('btn-beautify').addEventListener('click', executeBeautify);
    $('btn-share').addEventListener('click', executeShare);
    $('btn-download').addEventListener('click', executeDownload);

    document.querySelectorAll('.output-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
            switchTab(this.dataset.tab);
        });
    });

    if (window.innerWidth <= 768) {
        const langPanel = $('language-panel');
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'action-btn';
        toggleBtn.innerHTML = '<span class="btn-icon">☰</span><span class="btn-label">LANG</span>';
        toggleBtn.style.borderColor = 'var(--text3)';
        toggleBtn.addEventListener('click', function () {
            langPanel.classList.toggle('open');
        });

        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            headerRight.prepend(toggleBtn);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    registerToolbarEvents();
    initEditor();
});
