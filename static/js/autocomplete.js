let autocompleteTimeout = null;
const AUTOCOMPLETE_DEBOUNCE = 700;

function updateAutocomplete() {
    if (autocompleteTimeout) {
        clearTimeout(autocompleteTimeout);
    }
    autocompleteTimeout = setTimeout(function () {
        requestAutocomplete();
    }, 300);
}

function requestAutocomplete() {
    const code = getEditorValue();
    const cursorPosition = getCursorPosition();
    const language = AppState.currentLanguage;

    fetch('/api/autocomplete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: language,
            code: code,
            cursor_position: cursorPosition,
        }),
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
        if (data.success && data.local && data.local.length > 0) {
            showLocalAutocomplete(data.local);
        } else if (data.success && data.ai) {
            applyAiAutocomplete(data.ai);
        } else {
            hideAutocomplete();
        }
    })
    .catch(function () {
        hideAutocomplete();
    });
}

function showLocalAutocomplete(suggestions) {
    const widget = ensureAutocompleteWidget();
    widget.innerHTML = '';
    widget.classList.add('active');

    suggestions.forEach(function (s) {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.textContent = s;
        item.addEventListener('click', function () {
            applyAutocompleteSuggestion(s);
        });
        widget.appendChild(item);
    });

    const active = widget.querySelector('.autocomplete-item');
    if (active) active.classList.add('active');

    positionAutocompleteWidget();
}

function ensureAutocompleteWidget() {
    let widget = document.querySelector('.autocomplete-widget');
    if (!widget) {
        widget = document.createElement('div');
        widget.className = 'autocomplete-widget';
        document.body.appendChild(widget);
    }
    return widget;
}

function positionAutocompleteWidget() {
    const widget = document.querySelector('.autocomplete-widget');
    if (!widget || !editorInstance) return;

    const pos = editorInstance.getPosition();
    const coords = editorInstance.getScrolledVisiblePosition(pos);
    if (!coords) return;

    const editorEl = $('editor');
    const editorRect = editorEl.getBoundingClientRect();

    widget.style.left = (editorRect.left + coords.left + 40) + 'px';
    widget.style.top = (editorRect.top + coords.top + 20) + 'px';
}

function applyAutocompleteSuggestion(text) {
    if (editorInstance) {
        const selection = editorInstance.getSelection();
        const model = editorInstance.getModel();
        const wordRange = model.getWordAtPosition(selection.getStartPosition());

        if (wordRange) {
            const range = new monaco.Range(
                wordRange.startLineNumber,
                wordRange.startColumn,
                wordRange.endLineNumber,
                wordRange.endColumn
            );
            editorInstance.executeEdits('autocomplete', [
                { range: range, text: text }
            ]);
        } else {
            editorInstance.trigger('keyboard', 'type', { text: text });
        }
        editorInstance.focus();
    }
    hideAutocomplete();
}

function applyAiAutocomplete(completion) {
    if (completion && editorInstance) {
        const pos = editorInstance.getPosition();
        editorInstance.executeEdits('ai-autocomplete', [
            {
                range: new monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column),
                text: completion,
            }
        ]);
        editorInstance.focus();
    }
}

function hideAutocomplete() {
    const widget = document.querySelector('.autocomplete-widget');
    if (widget) {
        widget.classList.remove('active');
    }
}

document.addEventListener('click', function (e) {
    if (!e.target.closest('.autocomplete-widget')) {
        hideAutocomplete();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        hideAutocomplete();
    }
});
