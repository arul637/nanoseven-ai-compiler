let editorInstance = null;
let monacoReady = false;

function initEditor() {
    require(['vs/editor/editor.main'], function (monaco) {
        monacoReady = true;

        monaco.editor.defineTheme('nano-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955' },
                { token: 'keyword', foreground: '569CD6' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'number', foreground: 'B5CEA8' },
                { token: 'type', foreground: '4EC9B0' },
                { token: 'function', foreground: 'DCDCAA' },
                { token: 'variable', foreground: '9CDCFE' },
            ],
            colors: {
                'editor.background': '#000000',
                'editor.foreground': '#e0e0e0',
                'editor.lineHighlightBackground': '#0d0d0d',
                'editor.selectionBackground': '#264F78',
                'editor.inactiveSelectionBackground': '#3a3d41',
                'editorCursor.foreground': '#2764F4',
                'editorLineNumber.foreground': '#888888',
                'editorLineNumber.activeForeground': '#e0e0e0',
                'editor.selectionHighlightBackground': '#add6ff26',
                'editorBracketMatch.background': '#0d0d0d',
                'editorBracketMatch.border': '#888888',
                'editorGutter.background': '#000000',
                'editorWidget.background': '#111111',
                'editorWidget.border': '#222222',
                'input.background': '#0d0d0d',
                'input.border': '#222222',
                'input.foreground': '#e0e0e0',
                'focusBorder': '#2764F4',
                'list.hoverBackground': '#1a1a1a',
                'list.activeSelectionBackground': '#1a1a1a',
                'list.inactiveSelectionBackground': '#111111',
            }
        });

        const editorEl = $('editor');
        if (!editorEl) return;

        const lang = AppState.currentLanguage || 'python';
        const starterCode = AppState.languageMap[lang]?.starter_code || '# Write your code here\n';

        editorInstance = monaco.editor.create(editorEl, {
            value: starterCode,
            language: lang,
            theme: 'nano-dark',
            fontSize: 14,
            fontFamily: "'SF Mono', 'Fira Code', 'Consolas', 'Monaco', monospace",
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            padding: { top: 12 },
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            wordBasedSuggestions: 'currentDocument',
            snippetSuggestions: 'inline',
            tabCompletion: 'on',
            acceptSuggestionOnCommitCharacter: true,
            acceptSuggestionOnEnter: 'on',
        });

        AppState.editor = editorInstance;

        editorInstance.onDidChangeModelContent(function () {
            updateAutocomplete();
        });

        editorInstance.onDidChangeCursorPosition(function (e) {
            updateAutocomplete();
        });

        window.addEventListener('resize', function () {
            editorInstance.layout();
        });
    });
}

function getEditorValue() {
    if (editorInstance) {
        return editorInstance.getValue();
    }
    return '';
}

function setEditorValue(value) {
    if (editorInstance) {
        editorInstance.setValue(value);
    }
}

function getCursorPosition() {
    if (editorInstance) {
        const pos = editorInstance.getPosition();
        return editorInstance.getModel().getOffsetAt(pos);
    }
    return 0;
}

function setEditorLanguage(languageId) {
    if (editorInstance && monacoReady) {
        require(['vs/editor/editor.main'], function (monaco) {
            monaco.editor.setModelLanguage(editorInstance.getModel(), languageId);
        });
    }
}

function insertSnippet(snippet) {
    if (editorInstance) {
        const selection = editorInstance.getSelection();
        const id = { major: 1, minor: 1 };
        const op = {
            identifier: id,
            range: selection,
            text: snippet,
            forceMoveMarkers: true,
        };
        editorInstance.executeEdits('snippet-insert', [op]);
        editorInstance.focus();
    }
}
