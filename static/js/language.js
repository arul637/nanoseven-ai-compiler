const LANGUAGE_COLORS = {
    python: '#2764F4',
    c: '#555555',
    cpp: '#00599C',
    java: '#ED600A',
    javascript: '#EAA004',
    typescript: '#3178C6',
    go: '#00ADD8',
    rust: '#DEA584',
    php: '#777BB4',
    ruby: '#CC342D',
    kotlin: '#7F52FF',
    swift: '#F05138',
    cs: '#178600',
    bash: '#4EAA25',
    sql: '#E38C00',
    html: '#E34F26',
    css: '#1572B6',
};

function loadLanguages() {
    fetch('/api/languages')
        .then(function (r) { return r.json(); })
        .then(function (data) {
            if (data.success) {
                AppState.languages = data.languages;
                const map = {};
                data.languages.forEach(function (lang) {
                    map[lang.identifier] = lang;
                });
                AppState.languageMap = map;
                populateLanguageSelect(data.languages);
                populateLanguageList(data.languages);
            }
        })
        .catch(function (err) {
            console.error('Failed to load languages:', err);
        });
}

function populateLanguageSelect(languages) {
    const select = $('language-select');
    select.innerHTML = '';
    languages.forEach(function (lang) {
        const opt = document.createElement('option');
        opt.value = lang.identifier;
        opt.textContent = lang.display_name;
        select.appendChild(opt);
    });
    select.value = 'python';
    select.addEventListener('change', function () {
        switchLanguage(this.value);
    });
}

function populateLanguageList(languages) {
    const list = $('language-list');
    list.innerHTML = '';
    languages.forEach(function (lang) {
        const item = document.createElement('div');
        item.className = 'lang-item' + (lang.identifier === 'python' ? ' active' : '');
        item.dataset.lang = lang.identifier;

        const dot = document.createElement('span');
        dot.className = 'lang-dot';
        dot.style.background = LANGUAGE_COLORS[lang.identifier] || '#888';
        item.appendChild(dot);

        const name = document.createElement('span');
        name.textContent = lang.display_name;
        item.appendChild(name);

        item.addEventListener('click', function () {
            switchLanguage(lang.identifier);
        });

        list.appendChild(item);
    });
}

function switchLanguage(langId) {
    if (AppState.currentLanguage === langId) return;

    AppState.currentLanguage = langId;

    const select = $('language-select');
    if (select) select.value = langId;

    const items = document.querySelectorAll('.lang-item');
    items.forEach(function (item) {
        item.classList.toggle('active', item.dataset.lang === langId);
    });

    const lang = AppState.languageMap[langId];
    if (lang) {
        if (getEditorValue().trim() === '' || confirmSwitchLanguage()) {
            setEditorValue(lang.starter_code);
        }
        setEditorLanguage(lang.editor_id || langId);
    }

    if (window.innerWidth <= 768) {
        $('language-panel').classList.remove('open');
    }
}

function confirmSwitchLanguage() {
    return true;
}

function filterLanguages(query) {
    const items = document.querySelectorAll('.lang-item');
    const q = query.toLowerCase();
    items.forEach(function (item) {
        const name = item.textContent.toLowerCase();
        item.style.display = name.includes(q) ? 'flex' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    loadLanguages();

    const searchInput = $('lang-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            filterLanguages(this.value);
        });
    }
});
