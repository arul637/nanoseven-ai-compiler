const AppState = {
    currentLanguage: 'python',
    editor: null,
    languages: [],
    languageMap: {},
    isRunning: false,
    abortController: null,
    shareId: null,
};

function $(id) { return document.getElementById(id); }
