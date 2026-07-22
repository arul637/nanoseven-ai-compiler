import re
from language_manager import language_manager


class LocalAutocompleteEngine:
    def __init__(self):
        self._word_pattern = re.compile(r'[a-zA-Z_][a-zA-Z0-9_]*$')
        self._dot_pattern = re.compile(r'([a-zA-Z_][a-zA-Z0-9_]*)\.$')
        self._import_pattern = re.compile(r'^\s*(from\s+(\w+)\s+)?import\s+(\w*)$', re.MULTILINE)

    def get_suggestions(self, language, code, cursor_position):
        suggestions = []
        lang = language_manager.get_language(language)
        if not lang:
            return suggestions

        line_start = code.rfind('\n', 0, cursor_position) + 1
        current_line = code[line_start:cursor_position]

        dot_match = self._dot_pattern.search(current_line)
        if dot_match:
            obj_name = dot_match.group(1)
            suggestions = self._get_dot_suggestions(lang, code, obj_name)
            return suggestions

        word_match = self._word_pattern.search(current_line)
        if word_match:
            prefix = word_match.group(0)
            suggestions = self._get_prefix_suggestions(lang, code, prefix)
            return suggestions

        return suggestions

    def _get_dot_suggestions(self, lang, code, obj_name):
        suggestions = []
        obj_type = self._infer_type(code, obj_name)
        if obj_type == "list":
            suggestions = ["append()", "extend()", "insert()", "remove()", "pop()",
                           "clear()", "index()", "count()", "sort()", "reverse()", "copy()"]
        elif obj_type == "str":
            suggestions = ["upper()", "lower()", "strip()", "split()", "join()", "replace()",
                           "find()", "index()", "startswith()", "endswith()", "format()",
                           "count()", "capitalize()", "title()", "swapcase()"]
        elif obj_type == "dict":
            suggestions = ["keys()", "values()", "items()", "get()", "pop()", "update()",
                           "clear()", "copy()", "fromkeys()", "setdefault()"]
        return suggestions

    def _infer_type(self, code, var_name):
        patterns = [
            (r'{}\s*=\s*\[.*?\]'.format(re.escape(var_name)), "list"),
            (r'{}\s*=\s*\'.*?\''.format(re.escape(var_name)), "str"),
            (r'{}\s*=\s*\".*?\"'.format(re.escape(var_name)), "str"),
            (r'{}\s*=\s*\{{.*?\}}'.format(re.escape(var_name)), "dict"),
            (r'{}\s*=\s*\(.*?\)'.format(re.escape(var_name)), "tuple"),
            (r'{}\s*=\s*set\(.*?\)'.format(re.escape(var_name)), "set"),
            (r'{}\s*=\s*list\(.*?\)'.format(re.escape(var_name)), "list"),
            (r'{}\s*=\s*dict\(.*?\)'.format(re.escape(var_name)), "dict"),
            (r'{}\s*=\s*str\(.*?\)'.format(re.escape(var_name)), "str"),
        ]
        for pattern, typ in patterns:
            if re.search(pattern, code, re.MULTILINE):
                return typ
        return None

    def _get_prefix_suggestions(self, lang, code, prefix):
        suggestions = []

        for keyword in lang.keywords:
            if keyword.lower().startswith(prefix.lower()):
                suggestions.append(keyword)

        for builtin in lang.builtins:
            if builtin.lower().startswith(prefix.lower()):
                suggestions.append(builtin)

        var_pattern = re.compile(r'^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=', re.MULTILINE)
        for match in var_pattern.finditer(code):
            var_name = match.group(1)
            if var_name.startswith(prefix) and var_name != prefix:
                suggestions.append(var_name)

        func_pattern = re.compile(r'^\s*def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(', re.MULTILINE)
        for match in func_pattern.finditer(code):
            func_name = match.group(1)
            if func_name.startswith(prefix) and func_name != prefix:
                suggestions.append(f"{func_name}()")

        class_pattern = re.compile(r'^\s*class\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*', re.MULTILINE)
        for match in class_pattern.finditer(code):
            class_name = match.group(1)
            if class_name.startswith(prefix) and class_name != prefix:
                suggestions.append(class_name)

        for snippet_name in lang.snippets:
            if snippet_name.startswith(prefix):
                suggestions.append(snippet_name)

        for std_lib in lang.std_libs:
            if std_lib.startswith(prefix):
                suggestions.append(std_lib)

        suggestions = list(dict.fromkeys(suggestions))
        suggestions.sort()
        return suggestions[:20]


local_autocomplete = LocalAutocompleteEngine()
