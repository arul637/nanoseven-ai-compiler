const EXTENSIONS = {
  Python: 'py', JavaScript: 'js', TypeScript: 'ts', C: 'c', 'C++': 'cpp',
  Java: 'java', 'C#': 'cs', Go: 'go', Rust: 'rs', PHP: 'php', Ruby: 'rb',
  Kotlin: 'kt', Swift: 'swift', Bash: 'sh', SQL: 'sql', HTML: 'html', CSS: 'css'
};

const MONACO_LANG = {
  Python: 'python', JavaScript: 'javascript', TypeScript: 'typescript',
  C: 'c', 'C++': 'cpp', Java: 'java', 'C#': 'csharp', Go: 'go', Rust: 'rust',
  PHP: 'php', Ruby: 'ruby', Kotlin: 'kotlin', Swift: 'swift', Bash: 'shell',
  SQL: 'sql', HTML: 'html', CSS: 'css'
};

const DEFAULTS = {
  Python: 'print("Hello, World!")',
  JavaScript: 'console.log("Hello, World!");',
  TypeScript: 'const greeting: string = "Hello, World!";\nconsole.log(greeting);',
  C: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  'C++': '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  Java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  'C#': 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  Go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  Rust: 'fn main() {\n    println!("Hello, World!");\n}',
  PHP: '<?php\necho "Hello, World!";\n?>',
  Ruby: 'puts "Hello, World!"',
  Kotlin: 'fun main() {\n    println("Hello, World!")\n}',
  Swift: 'print("Hello, World!")',
  Bash: 'echo "Hello, World!"',
  SQL: "SELECT 'Hello, World!' AS greeting;",
  HTML: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>',
  CSS: 'body {\n    font-family: sans-serif;\n    color: #333;\n}'
};

const SNIPPETS = {
  python: [
    { label: 'ifmain', insertText: 'if __name__ == "__main__":\n    ${1:pass}' },
    { label: 'def', insertText: 'def ${1:name}(${2:args}):\n    ${3:pass}' },
    { label: 'class', insertText: 'class ${1:Name}:\n    def __init__(self${2:, args}):\n        ${3:pass}' },
    { label: 'for', insertText: 'for ${1:item} in ${2:iterable}:\n    ${3:pass}' },
    { label: 'if', insertText: 'if ${1:condition}:\n    ${2:pass}' }
  ],
  javascript: [
    { label: 'log', insertText: 'console.log(${1:value});' },
    { label: 'function', insertText: 'function ${1:name}(${2:args}) {\n    ${3:}\n}' },
    { label: 'arrow', insertText: 'const ${1:name} = (${2:args}) => {\n    ${3:}\n};' },
    { label: 'for', insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n    ${3:}\n}' },
    { label: 'if', insertText: 'if (${1:condition}) {\n    ${2:}\n}' }
  ],
  typescript: [
    { label: 'log', insertText: 'console.log(${1:value});' },
    { label: 'function', insertText: 'function ${1:name}(${2:args}): ${3:void} {\n    ${4:}\n}' },
    { label: 'arrow', insertText: 'const ${1:name} = (${2:args}): ${3:void} => {\n    ${4:}\n};' },
    { label: 'interface', insertText: 'interface ${1:Name} {\n    ${2:prop}: ${3:type};\n}' }
  ],
  c: [
    { label: 'printf', insertText: 'printf("${1:%s\\\\n}", ${2:var});' },
    { label: 'for', insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n    ${3:}\n}' },
    { label: 'main', insertText: 'int main() {\n    ${1:}\n    return 0;\n}' }
  ],
  cpp: [
    { label: 'cout', insertText: 'std::cout << ${1:value} << std::endl;' },
    { label: 'for', insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n    ${3:}\n}' },
    { label: 'main', insertText: 'int main() {\n    ${1:}\n    return 0;\n}' }
  ],
  java: [
    { label: 'println', insertText: 'System.out.println(${1:value});' },
    { label: 'main', insertText: 'public static void main(String[] args) {\n    ${1:}\n}' },
    { label: 'for', insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n    ${3:}\n}' }
  ],
  csharp: [
    { label: 'cw', insertText: 'Console.WriteLine(${1:value});' },
    { label: 'main', insertText: 'static void Main(string[] args) {\n    ${1:}\n}' },
    { label: 'for', insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n    ${3:}\n}' }
  ],
  go: [
    { label: 'fmt.Println', insertText: 'fmt.Println(${1:value})' },
    { label: 'func', insertText: 'func ${1:name}(${2:args}) {\n    ${3:}\n}' },
    { label: 'for', insertText: 'for ${1:i} := 0; ${1:i} < ${2:n}; ${1:i}++ {\n    ${3:}\n}' }
  ],
  rust: [
    { label: 'println', insertText: 'println!("${1:value}");' },
    { label: 'fn', insertText: 'fn ${1:name}(${2:args}) {\n    ${3:}\n}' },
    { label: 'let', insertText: 'let ${1:var} = ${2:value};' }
  ],
  php: [
    { label: 'echo', insertText: 'echo ${1:value};' },
    { label: 'function', insertText: 'function ${1:name}(${2:args}) {\n    ${3:}\n}' },
    { label: 'foreach', insertText: 'foreach (${1:$array} as ${2:$value}) {\n    ${3:}\n}' }
  ],
  ruby: [
    { label: 'puts', insertText: 'puts ${1:value}' },
    { label: 'def', insertText: 'def ${1:name}(${2:args})\n    ${3:}\nend' },
    { label: 'each', insertText: '${1:array}.each do |${2:item}|\n    ${3:}\nend' }
  ],
  kotlin: [
    { label: 'println', insertText: 'println(${1:value})' },
    { label: 'fun', insertText: 'fun ${1:name}(${2:args}) {\n    ${3:}\n}' },
    { label: 'for', insertText: 'for (${1:item} in ${2:list}) {\n    ${3:}\n}' }
  ],
  swift: [
    { label: 'print', insertText: 'print(${1:value})' },
    { label: 'func', insertText: 'func ${1:name}(${2:args}) {\n    ${3:}\n}' },
    { label: 'for', insertText: 'for ${1:item} in ${2:array} {\n    ${3:}\n}' }
  ],
  shell: [
    { label: 'echo', insertText: 'echo ${1:value}' },
    { label: 'if', insertText: 'if [ ${1:condition} ]; then\n    ${2:}\nfi' },
    { label: 'for', insertText: 'for ${1:var} in ${2:list}; do\n    ${3:}\ndone' }
  ],
  sql: [
    { label: 'select', insertText: 'SELECT ${1:*} FROM ${2:table}${3: WHERE ${4:condition}};' },
    { label: 'insert', insertText: 'INSERT INTO ${1:table} (${2:columns}) VALUES (${3:values});' },
    { label: 'create', insertText: 'CREATE TABLE ${1:name} (\n    ${2:id} INTEGER PRIMARY KEY${3:}\n);' }
  ],
  html: [
    { label: 'html5', insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${1:Document}</title>\n</head>\n<body>\n    ${2:}\n</body>\n</html>' },
    { label: 'div', insertText: '<div${1: class="${2:}"}>\\n    ${3:}\n</div>' },
    { label: 'script', insertText: '<script>\\n    ${1:}\n</script>' }
  ],
  css: [
    { label: 'flex', insertText: 'display: flex;\njustify-content: ${1:center};\nalign-items: ${2:center};' },
    { label: 'grid', insertText: 'display: grid;\ngrid-template-columns: ${1:1fr};\ngap: ${2:16px};' },
    { label: 'media', insertText: '@media (${1:max-width}: ${2:768px}) {\n    ${3:}\n}' }
  ]
};

const KEYWORDS = {
  python: ['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield', 'print', 'range', 'len', 'int', 'float', 'str', 'list', 'dict', 'set', 'tuple', 'type', 'isinstance', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'reversed', 'open', 'input', 'super', 'self'],
  javascript: ['async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'of', 'return', 'static', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'console', 'document', 'window', 'Array', 'Object', 'String', 'Number', 'Boolean', 'null', 'undefined', 'true', 'false', 'NaN', 'Infinity', 'JSON', 'Math', 'Date', 'RegExp', 'Promise', 'Set', 'Map', 'Symbol'],
  typescript: ['async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'finally', 'for', 'function', 'if', 'implements', 'import', 'in', 'instanceof', 'interface', 'let', 'new', 'of', 'return', 'static', 'super', 'switch', 'this', 'throw', 'try', 'type', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'string', 'number', 'boolean', 'any', 'never', 'unknown', 'null', 'undefined', 'true', 'false', 'console', 'Array', 'Object', 'Promise', 'Set', 'Map'],
  c: ['auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while', 'printf', 'scanf', 'include', 'define', 'NULL', 'size_t', 'FILE', 'fopen', 'fclose', 'fprintf', 'fscanf', 'malloc', 'free', 'calloc', 'realloc'],
  cpp: ['auto', 'break', 'case', 'catch', 'char', 'class', 'const', 'constexpr', 'continue', 'default', 'delete', 'do', 'double', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable', 'namespace', 'new', 'noexcept', 'nullptr', 'operator', 'override', 'private', 'protected', 'public', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'template', 'this', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'while', 'cout', 'cin', 'endl', 'include', 'define', 'std', 'vector', 'string', 'map', 'set', 'list', 'auto', 'shared_ptr', 'unique_ptr'],
  java: ['abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while', 'true', 'false', 'null', 'String', 'System', 'Integer', 'Double', 'Boolean', 'List', 'ArrayList', 'Map', 'HashMap', 'Set', 'HashSet', 'Object', 'Exception', 'RuntimeException', 'Thread', 'Runnable'],
  csharp: ['abstract', 'as', 'base', 'bool', 'break', 'byte', 'case', 'catch', 'char', 'checked', 'class', 'const', 'continue', 'decimal', 'default', 'delegate', 'do', 'double', 'else', 'enum', 'event', 'explicit', 'extern', 'false', 'finally', 'fixed', 'float', 'for', 'foreach', 'goto', 'if', 'implicit', 'in', 'int', 'interface', 'internal', 'is', 'lock', 'long', 'namespace', 'new', 'null', 'object', 'operator', 'out', 'override', 'params', 'private', 'protected', 'public', 'readonly', 'ref', 'return', 'sbyte', 'sealed', 'short', 'sizeof', 'stackalloc', 'static', 'string', 'struct', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked', 'unsafe', 'ushort', 'using', 'var', 'virtual', 'void', 'volatile', 'while', 'Console', 'WriteLine', 'String', 'Int32', 'Double', 'Boolean', 'List', 'Dictionary', 'Exception', 'Task', 'async', 'await'],
  go: ['break', 'case', 'chan', 'const', 'continue', 'default', 'defer', 'else', 'fallthrough', 'for', 'func', 'go', 'goto', 'if', 'import', 'interface', 'map', 'package', 'range', 'return', 'select', 'struct', 'switch', 'type', 'var', 'true', 'false', 'nil', 'int', 'int8', 'int16', 'int32', 'int64', 'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'float32', 'float64', 'string', 'bool', 'byte', 'rune', 'complex64', 'complex128', 'error', 'append', 'len', 'cap', 'make', 'new', 'copy', 'close', 'delete', 'panic', 'recover', 'fmt', 'Println', 'Printf', 'Sprintf'],
  rust: ['as', 'break', 'const', 'continue', 'crate', 'else', 'enum', 'extern', 'false', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop', 'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return', 'self', 'Self', 'static', 'struct', 'super', 'trait', 'true', 'type', 'unsafe', 'use', 'where', 'while', 'async', 'await', 'dyn', 'abstract', 'become', 'box', 'do', 'final', 'macro', 'override', 'priv', 'typeof', 'unsized', 'virtual', 'yield', 'i32', 'i64', 'u32', 'u64', 'f32', 'f64', 'bool', 'char', 'String', 'str', 'Vec', 'Option', 'Result', 'Some', 'None', 'Ok', 'Err', 'print', 'println', 'format'],
  php: ['__halt_compiler', 'abstract', 'and', 'array', 'as', 'break', 'callable', 'case', 'catch', 'class', 'clone', 'const', 'continue', 'declare', 'default', 'die', 'do', 'echo', 'else', 'elseif', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 'endwhile', 'eval', 'exit', 'extends', 'final', 'finally', 'fn', 'for', 'foreach', 'function', 'global', 'goto', 'if', 'implements', 'include', 'include_once', 'instanceof', 'insteadof', 'interface', 'isset', 'list', 'match', 'namespace', 'new', 'or', 'print', 'private', 'protected', 'public', 'readonly', 'require', 'require_once', 'return', 'static', 'switch', 'throw', 'trait', 'try', 'unset', 'use', 'var', 'while', 'xor', 'yield', 'true', 'false', 'null', 'self', 'parent', 'echo', 'array', 'count', 'strlen', 'json_encode', 'json_decode', 'explode', 'implode'],
  ruby: ['BEGIN', 'END', 'alias', 'and', 'begin', 'break', 'case', 'class', 'def', 'defined?', 'do', 'else', 'elsif', 'end', 'ensure', 'false', 'for', 'if', 'in', 'module', 'next', 'nil', 'not', 'or', 'redo', 'rescue', 'retry', 'return', 'self', 'super', 'then', 'true', 'undef', 'unless', 'until', 'when', 'while', 'yield', 'puts', 'print', 'gets', 'chomp', 'each', 'map', 'select', 'reduce', 'inject', 'attr_reader', 'attr_writer', 'attr_accessor', 'require', 'include', 'extend', 'Integer', 'Float', 'String', 'Array', 'Hash', 'Symbol', 'nil?', 'empty?'],
  kotlin: ['abstract', 'actual', 'annotation', 'as', 'break', 'by', 'catch', 'class', 'companion', 'const', 'continue', 'crossinline', 'data', 'delegate', 'do', 'dynamic', 'else', 'enum', 'expect', 'external', 'false', 'field', 'file', 'final', 'finally', 'for', 'fun', 'if', 'import', 'in', 'infix', 'init', 'inline', 'inner', 'interface', 'internal', 'is', 'lateinit', 'noinline', 'null', 'object', 'open', 'operator', 'out', 'override', 'package', 'param', 'private', 'property', 'protected', 'public', 'receiver', 'reified', 'return', 'sealed', 'set', 'super', 'suspend', 'tailrec', 'this', 'throw', 'true', 'try', 'typealias', 'typeof', 'val', 'var', 'vararg', 'when', 'while', 'Int', 'Long', 'Double', 'Float', 'String', 'Boolean', 'List', 'MutableList', 'Set', 'Map', 'Array', 'println', 'print', 'readLine', 'arrayOf', 'listOf', 'setOf', 'mapOf'],
  swift: ['associatedtype', 'class', 'deinit', 'enum', 'extension', 'fileprivate', 'func', 'import', 'init', 'inout', 'internal', 'let', 'open', 'operator', 'private', 'protocol', 'public', 'rethrows', 'static', 'struct', 'subscript', 'typealias', 'var', 'break', 'case', 'continue', 'default', 'defer', 'do', 'else', 'fallthrough', 'for', 'guard', 'if', 'in', 'repeat', 'return', 'switch', 'where', 'while', 'as', 'Any', 'catch', 'false', 'is', 'nil', 'rethrows', 'super', 'self', 'Self', 'throw', 'throws', 'true', 'try', 'Int', 'Double', 'Float', 'Bool', 'String', 'Array', 'Dictionary', 'Set', 'print', 'debugPrint', 'fatalError', 'type', 'of'],
  shell: ['if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'until', 'do', 'done', 'in', 'case', 'esac', 'function', 'return', 'exit', 'break', 'continue', 'echo', 'printf', 'read', 'export', 'local', 'set', 'unset', 'shift', 'source', '.', 'cd', 'ls', 'cat', 'grep', 'sed', 'awk', 'find', 'rm', 'cp', 'mv', 'mkdir', 'chmod', 'chown', 'ps', 'kill', 'pwd', 'exec', 'eval', 'test', '[', ']]', 'true', 'false', 'declare', 'typeset'],
  sql: ['SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'ADD', 'COLUMN', 'INDEX', 'VIEW', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'FULL', 'ON', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'IS', 'NULL', 'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'EXISTS', 'UNION', 'ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'INTEGER', 'VARCHAR', 'TEXT', 'BOOLEAN', 'DATE', 'FLOAT', 'DOUBLE', 'PRECISION', 'NOT', 'NULL', 'DEFAULT', 'AUTO_INCREMENT', 'UNIQUE', 'CHECK', 'CONSTRAINT'],
  html: ['html', 'head', 'body', 'div', 'span', 'p', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'form', 'input', 'button', 'select', 'option', 'textarea', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'meta', 'link', 'script', 'style', 'title', 'DOCTYPE', 'class', 'id', 'src', 'href', 'rel', 'type', 'name', 'value', 'placeholder', 'disabled', 'readonly', 'required', 'onclick', 'onchange', 'onsubmit'],
  css: ['color', 'background', 'background-color', 'background-image', 'font', 'font-size', 'font-weight', 'font-family', 'margin', 'padding', 'border', 'border-radius', 'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height', 'display', 'flex', 'grid', 'block', 'inline', 'inline-block', 'none', 'position', 'relative', 'absolute', 'fixed', 'sticky', 'top', 'right', 'bottom', 'left', 'overflow', 'z-index', 'opacity', 'transform', 'transition', 'animation', 'box-shadow', 'text-shadow', 'text-align', 'vertical-align', 'line-height', 'letter-spacing', 'white-space', 'cursor', 'list-style', 'outline', 'filter', 'clip-path', 'justify-content', 'align-items', 'flex-direction', 'flex-wrap', 'gap', 'grid-template', 'grid-column', 'grid-row']
};

let editor;
let currentLang = 'Python';
let abortController = null;
let busy = false;

let outputBuffer = '';
let errorBuffer = '';

let activeAnalysisTab = 'security';
let cachedAnalyses = { security: null, complexity: null, bug_detector: null, challenge: null, error_fix: null };
let analysisAbortController = { security: null, complexity: null, bug_detector: null, challenge: null, error_fix: null };
let fixedCodeEditor = null;

document.addEventListener('DOMContentLoaded', init);

function init() {
  require.config({
    paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' }
  });
  require(['vs/editor/editor.main'], onMonacoReady);
}

function onMonacoReady() {
  monaco.editor.defineTheme('nano-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '888888' },
      { token: 'keyword', foreground: '2764F4' },
      { token: 'string', foreground: '1C9D4B' },
      { token: 'number', foreground: 'EAA004' },
      { token: 'type', foreground: '6A2BD8' },
      { token: 'function', foreground: 'ED600A' },
      { token: 'variable', foreground: 'e0e0e0' },
      { token: 'tag', foreground: '2764F4' },
      { token: 'attribute.name', foreground: 'ED600A' },
      { token: 'attribute.value', foreground: '1C9D4B' },
      { token: 'delimiter', foreground: '888888' }
    ],
    colors: {
      'editor.background': '#000000',
      'editor.foreground': '#e0e0e0',
      'editorLineNumber.foreground': '#222222',
      'editorLineNumber.activeForeground': '#888888',
      'editorCursor.foreground': '#2764F4',
      'editor.selectionBackground': '#2764F440',
      'editor.inactiveSelectionBackground': '#2764F420',
      'editor.lineHighlightBackground': '#0d0d0d',
      'editor.selectionHighlightBackground': '#1C9D4B20',
      'editorBracketMatch.background': '#2764F430',
      'editorBracketMatch.border': '#2764F4',
      'editorGutter.background': '#000000',
      'editorWidget.background': '#111111',
      'editorWidget.border': '#222222',
      'editorSuggestWidget.background': '#111111',
      'editorSuggestWidget.border': '#222222',
      'editorSuggestWidget.selectedBackground': '#1a1a1a',
      'editorHoverWidget.background': '#111111',
      'editorHoverWidget.border': '#222222',
      'input.background': '#0d0d0d',
      'input.border': '#222222',
      'input.foreground': '#e0e0e0',
      'focusBorder': '#2764F4',
      'list.hoverBackground': '#1a1a1a',
      'list.activeSelectionBackground': '#2764F430',
      'list.focusBackground': '#2764F420'
    }
  });

  registerFormatters();

  const el = document.getElementById('editor-container');
  editor = monaco.editor.create(el, {
    value: DEFAULTS.Python,
    language: 'python',
    theme: 'nano-dark',
    automaticLayout: true,
    fontSize: 14,
    lineNumbers: 'on',
    lineNumbersMinChars: 3,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    padding: { top: 16, bottom: 16 },
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', 'Consolas', 'Liberation Mono', monospace",
    tabSize: 4,
    renderWhitespace: 'selection',
    bracketPairColorization: { enabled: true },
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    wordWrap: 'on'
  });

  editor.onDidChangeModelContent(() => {
    // Clear cache when user edits code
    cachedAnalyses = { security: null, complexity: null, bug_detector: null, challenge: null, error_fix: null };
    updateFixButtonState(false);
  });

  registerCompletions();
  bindUI();
  updateFixButtonState(false);
}

function registerFormatters() {
  const formatters = {
    python: formatPython,
    shell: formatPython,
    ruby: formatPython,
    kotlin: formatPython,
    swift: formatPython,
    sql: formatBraceLang,
    c: formatBraceLang,
    cpp: formatBraceLang,
    java: formatBraceLang,
    csharp: formatBraceLang,
    go: formatBraceLang,
    rust: formatBraceLang,
    php: formatBraceLang,
  };

  Object.entries(formatters).forEach(([lang, fn]) => {
    monaco.languages.registerDocumentFormattingEditProvider(lang, {
      async provideDocumentFormattingEdits(model) {
        const text = model.getValue();
        const formatted = fn(text);
        if (formatted === text) return [];
        return [{ range: model.getFullModelRange(), text: formatted }];
      }
    });
  });
}

function formatPython(code) {
  const lines = code.split('\n');
  const out = [];
  const size = 4;

  const origWs = lines.map(l => {
    if (l.trim() === '') return -1;
    return l.length - l.trimStart().length;
  });

  let indent = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '') {
      out.push('');
      continue;
    }

    const s = lines[i].trimStart();

    if (/^(elif|else|except|finally)\b/.test(s)) {
      indent = Math.max(0, indent - 1);
    }

    const prevNonBlank = getPrevNonBlankIdx(lines, i);
    if (prevNonBlank !== -1 && origWs[i] < origWs[prevNonBlank]) {
      const diff = origWs[prevNonBlank] - origWs[i];
      const levels = Math.max(1, Math.round(diff / size));
      indent = Math.max(0, indent - levels);
    }

    out.push(' '.repeat(indent * size) + s);

    if (/:\s*$/.test(s) && !s.startsWith('@') && !s.startsWith('#')) {
      indent++;
    }
  }

  return out.join('\n');
}

function getPrevNonBlankIdx(lines, i) {
  for (let j = i - 1; j >= 0; j--) {
    if (lines[j].trim() !== '') return j;
  }
  return -1;
}

function formatBraceLang(code) {
  const lines = code.split('\n');
  const out = [];
  const size = 4;
  let indent = 0;

  for (let line of lines) {
    const stripped = line.trimEnd();
    if (stripped.trim() === '') {
      out.push('');
      continue;
    }
    const s = stripped.trimStart();

    let leadingClose = 0;
    for (const ch of s) {
      if (ch === '}' || ch === ']') leadingClose++;
      else break;
    }
    indent = Math.max(0, indent - leadingClose);

    out.push(' '.repeat(indent * size) + s);

    const totalOpen = (s.match(/[{(\[]/g) || []).length;
    const totalClose = (s.match(/[}\])]/g) || []).length;
    indent += totalOpen - (totalClose - leadingClose);
    indent = Math.max(0, indent);
  }
  return out.join('\n');
}

function registerCompletions() {
  const uniqueLangs = [...new Set(Object.values(MONACO_LANG))];

  uniqueLangs.forEach(lang => {
    const snippets = SNIPPETS[lang] || [];
    const keywords = KEYWORDS[lang] || [];
    if (snippets.length === 0 && keywords.length === 0) return;

    monaco.languages.registerCompletionItemProvider(lang, {
      triggerCharacters: ['.', '(', ' '],
      provideCompletionItems(model, position) {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };
        const items = [];
        keywords.forEach(kw => {
          items.push({
            label: kw,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: kw,
            range,
            sortText: '0' + kw
          });
        });
        snippets.forEach(s => {
          items.push({
            label: s.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: s.insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
            sortText: '1' + s.label
          });
        });
        return { suggestions: items };
      }
    });
  });
}

function bindUI() {
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      switch (action) {
        case 'run': runCode(); break;
        case 'stop': stopCode(); break;
        case 'download': downloadCode(); break;
        case 'beautify': beautifyCode(); break;
        case 'security': toggleAnalysisSidebar('security'); break;
        case 'complexity': toggleAnalysisSidebar('complexity'); break;
        case 'bug_detector': toggleAnalysisSidebar('bug_detector'); break;
        case 'challenge': toggleAnalysisSidebar('challenge'); break;
      }
    });
  });

  const btnFixError = document.getElementById('btnFixError');
  if (btnFixError) {
    btnFixError.addEventListener('click', () => {
      const sidebar = document.getElementById('analysis-sidebar');
      if (sidebar) {
        sidebar.classList.add('open');
        switchAnalysisTab('error_fix');
        runAnalysis('error_fix');
      }
    });
  }

  document.getElementById('langSelect').addEventListener('change', function() {
    selectLanguage(this.value);
  });

  document.querySelectorAll('.output-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      switchTab(this.dataset.tab);
    });
  });

  document.getElementById('btnCopy').addEventListener('click', copyActiveTabContent);

  document.getElementById('inputToggle').addEventListener('click', function() {
    document.getElementById('inputSection').classList.toggle('open');
  });

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, beautifyCode);

  document.getElementById('analysisCloseBtn').addEventListener('click', closeAnalysisSidebar);

  document.querySelectorAll('.sidebar-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      switchAnalysisTab(this.dataset.analysisTab);
    });
  });

  document.querySelectorAll('.btn-analyze').forEach(btn => {
    btn.addEventListener('click', function() {
      runAnalysis(this.dataset.analyze);
    });
  });

  // Mobile dropdown toggles
  document.querySelectorAll('[data-dropdown-toggle]').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdown = this.closest('.mobile-dropdown');
      const menu = dropdown.querySelector('.dropdown-menu');
      const isOpen = menu.classList.contains('open');
      document.querySelectorAll('.dropdown-menu.open').forEach(m => {
        if (m !== menu) m.classList.remove('open');
      });
      document.querySelectorAll('.mobile-dropdown.open').forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      menu.classList.toggle('open');
      dropdown.classList.toggle('open');
    });
  });

  document.addEventListener('click', function() {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.mobile-dropdown.open').forEach(d => d.classList.remove('open'));
  });

  // Sidebar toggle button
  document.getElementById('sidebarToggle').addEventListener('click', function() {
    const sidebar = document.getElementById('analysis-sidebar');
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) {
      closeAnalysisSidebar();
    } else {
      sidebar.classList.add('open');
      switchAnalysisTab(activeAnalysisTab);
    }
  });

  initResizeHandle();
}

function initResizeHandle() {
  const handle = document.getElementById('resize-handle');
  const container = document.getElementById('output-container');
  let isDragging = false;
  let startY, startHeight;

  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startHeight = container.offsetHeight;
    handle.classList.add('dragging');
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const delta = startY - e.clientY;
    const newHeight = Math.max(80, Math.min(window.innerHeight - 150, startHeight + delta));
    container.style.height = newHeight + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    handle.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });
}

function selectLanguage(lang) {
  if (busy) return;
  currentLang = lang;
  document.getElementById('langSelect').value = lang;
  const ml = MONACO_LANG[lang] || 'plaintext';
  monaco.editor.setModelLanguage(editor.getModel(), ml);
  editor.setValue(DEFAULTS[lang] || '');
  
  // Clear analysis cache on language change
  cachedAnalyses = { security: null, complexity: null, bug_detector: null, challenge: null, error_fix: null };
  ['security', 'complexity', 'bug_detector', 'challenge', 'error_fix'].forEach(tab => {
    resetAnalysisPanel(tab);
  });
  
  editor.focus();
}

function getCode() { return editor.getValue(); }
function getActiveTab() { return document.querySelector('.output-tab.active').dataset.tab; }

function setOutputContent(tab, html) {
  if (tab === 'output') outputBuffer = html;
  else errorBuffer = html;
  document.getElementById(tab + '-content').innerHTML = html;
}

function getOutputContent(tab) {
  return tab === 'output' ? outputBuffer : errorBuffer;
}

function switchTab(tab) {
  document.querySelectorAll('.output-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  document.querySelectorAll('.output-content').forEach(c => {
    c.classList.toggle('active', c.id === tab + '-content');
  });
}

function copyActiveTabContent() {
  const tab = getActiveTab();
  const content = getOutputContent(tab);
  if (!content || content.indexOf('class="line-info"') > -1) {
    showToast('Nothing to copy', 'error');
    return;
  }
  const temp = document.createElement('div');
  temp.innerHTML = content;
  const text = temp.textContent || temp.innerText || '';
  navigator.clipboard.writeText(text.trim()).then(() => {
    showToast('Copied!', 'success');
  }).catch(() => {
    showToast('Failed to copy', 'error');
  });
}

function setBusy(b) {
  busy = b;
  const dot = document.getElementById('statusDot');
  dot.className = 'status-dot' + (b ? ' busy' : '');
  document.querySelector('[data-action="stop"]').disabled = !b;
  document.querySelector('[data-action="run"]').disabled = b;
  document.querySelector('[data-action="beautify"]').disabled = b;
}

function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  clearTimeout(t._hide);
  t._hide = setTimeout(() => { t.classList.remove('show'); }, 2000);
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function colorizeOutput(text) {
  if (!text) return '<span class="line-info">[no output]</span>';
  const lines = text.split('\n');
  const result = [];
  let inErrorBlock = false;

  for (const line of lines) {
    const t = escapeHtml(line);

    if (/error|Error|ERROR|traceback|Traceback|exception|Exception|warning|Warning/.test(line)) {
      inErrorBlock = true;
      result.push('<span class="line-error">' + t + '</span>');
      continue;
    }

    if (/^(Enter |Please |Input|output|Result)/.test(line.trim())) {
      result.push('<span class="line-prompt">' + t + '</span>');
      continue;
    }

    if (/^['"A-Za-z]/.test(line.trim()) && /:\s*$/.test(line.trim())) {
      result.push('<span class="line-prompt">' + t + '</span>');
      continue;
    }

    if (/^Output|^Hello|^[0-9]/.test(line.trim())) {
      result.push('<span class="line-output">' + t + '</span>');
      continue;
    }

    if (inErrorBlock && /^\s/.test(line)) {
      result.push('<span class="line-error">' + t + '</span>');
      continue;
    }

    if (inErrorBlock && line.trim() === '') {
      result.push('');
      continue;
    }

    inErrorBlock = false;
    result.push('<span class="line-output">' + t + '</span>');
  }

  return result.join('\n');
}

function runCode() {
  if (busy) return;
  const code = getCode();
  if (!code.trim()) {
    setOutputContent('output', '<span class="line-info">No code to run.</span>');
    setOutputContent('error', '<span class="line-info">No code provided.</span>');
    switchTab('error');
    return;
  }

  // Clear analysis cache on run and reset panels to show Analyze buttons
  cachedAnalyses = { security: null, complexity: null, bug_detector: null, challenge: null, error_fix: null };
  ['security', 'complexity', 'bug_detector', 'challenge', 'error_fix'].forEach(tab => {
    resetAnalysisPanel(tab);
  });
  updateFixButtonState(false);

  const stdinVal = document.getElementById('stdinInput').value;

  setBusy(true);
  setOutputContent('output', '<span class="line-info">Simulating execution...</span>');
  setOutputContent('error', '');
  switchTab('output');

  abortController = new AbortController();

  fetch('/api/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language: currentLang, code, input: stdinVal }),
    signal: abortController.signal
  })
  .then(r => r.json())
  .then(data => {
    setBusy(false);
    if (data.error) {
      const html = '<span class="line-error">' + escapeHtml(data.error) + '</span>';
      setOutputContent('error', html);
      setOutputContent('output', html);
      switchTab('error');
      updateFixButtonState(true);
    } else {
      const out = data.output || '';
      const colored = colorizeOutput(out);
      setOutputContent('output', colored);

      if (isErrorOutput(out)) {
        setOutputContent('error', '<span class="line-error">' + escapeHtml(out) + '</span>');
        switchTab('error');
        updateFixButtonState(true);
      } else {
        setOutputContent('error', '<span class="line-info">No errors detected.</span>');
        switchTab('output');
        updateFixButtonState(false);
      }
    }
  })
  .catch(err => {
    setBusy(false);
    if (err.name === 'AbortError') {
      const msg = '<span class="line-info">Execution stopped.</span>';
      setOutputContent('output', msg);
      setOutputContent('error', msg);
    } else {
      const html = '<span class="line-error">Network error: ' + escapeHtml(err.message) + '</span>';
      setOutputContent('error', html);
      setOutputContent('output', html);
      switchTab('error');
      updateFixButtonState(true);
    }
  });
}

function isErrorOutput(text) {
  const patterns = [
    /error/i, /exception/i, /traceback/i, /failed/i,
    /undefined/, /cannot find/i, /syntax error/i,
    /compilation/i, /expected/i, /undeclared/i,
    /segmentation/i, /core dumped/i, /exit status/i,
    /collect2:/i
  ];
  return patterns.some(p => p.test(text));
}

function stopCode() {
  if (abortController) {
    abortController.abort();
    abortController = null;
  }
  
  // Cancel any ongoing analyses
  Object.keys(analysisAbortController).forEach(tab => {
    if (analysisAbortController[tab]) {
      analysisAbortController[tab].abort();
      analysisAbortController[tab] = null;
    }
  });
  
  setBusy(false);
  const msg = '<span class="line-info">Execution stopped.</span>';
  setOutputContent('output', msg);
  setOutputContent('error', msg);
  switchTab('output');
}

function downloadCode() {
  const code = getCode();
  if (!code.trim()) {
    showToast('No code to download', 'error');
    return;
  }
  const ext = EXTENSIONS[currentLang] || 'txt';
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'code.' + ext;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Downloaded code.' + ext, 'success');
}

function beautifyCode() {
  if (busy) return;
  const code = getCode();
  if (!code.trim()) {
    showToast('No code to beautify', 'error');
    return;
  }

  setOutputContent('output', '<span class="line-info">Formatting code...</span>');
  switchTab('output');

  const lang = MONACO_LANG[currentLang];
  const builtinLangs = ['javascript', 'typescript', 'css', 'html', 'json'];

  if (builtinLangs.includes(lang)) {
    const action = editor.getAction('editor.action.formatDocument');
    if (action) {
      action.run().then(() => {
        setOutputContent('output', '<span class="line-success">Code formatted.</span>');
      }).catch(() => {
        fallbackFormat(lang);
      });
      return;
    }
  }
  fallbackFormat(lang);
}

function fallbackFormat(lang) {
  const code = editor.getValue();
  let formatted;

  if (lang === 'python' || lang === 'shell' || lang === 'ruby' || lang === 'kotlin' || lang === 'swift') {
    formatted = formatPython(code);
  } else {
    formatted = formatBraceLang(code);
  }

  if (formatted !== code) {
    editor.setValue(formatted);
    setOutputContent('output', '<span class="line-success">Code formatted.</span>');
  } else {
    setOutputContent('output', '<span class="line-info">Code already well-formatted.</span>');
  }
}

// AI Analysis Sidebar Navigation & Server Interaction
function toggleAnalysisSidebar(tabName) {
  const sidebar = document.getElementById('analysis-sidebar');
  const isOpen = sidebar.classList.contains('open');
  
  if (isOpen && activeAnalysisTab === tabName) {
    closeAnalysisSidebar();
  } else {
    sidebar.classList.add('open');
    document.getElementById('sidebarToggle').classList.add('open');
    switchAnalysisTab(tabName);
  }
}

function closeAnalysisSidebar() {
  document.getElementById('analysis-sidebar').classList.remove('open');
  document.getElementById('sidebarToggle').classList.remove('open');
}

function switchAnalysisTab(tabName) {
  activeAnalysisTab = tabName;
  document.querySelectorAll('.sidebar-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.analysisTab === tabName);
  });
  document.querySelectorAll('.analysis-panel').forEach(p => {
    p.classList.toggle('active', p.id === `analysis-${tabName}`);
  });
  
  if (cachedAnalyses[tabName]) {
    renderAnalysis(tabName, cachedAnalyses[tabName]);
  } else {
    resetAnalysisPanel(tabName);
  }
}

function runAnalysis(tabName) {
  const code = getCode();
  if (!code.trim()) {
    setAnalysisPlaceholder(tabName, 'Write some code first to analyze.');
    return;
  }
  
  if (analysisAbortController[tabName]) {
    analysisAbortController[tabName].abort();
  }
  
  setAnalysisPlaceholder(tabName, 'Analyzing with AI...');
  
  analysisAbortController[tabName] = new AbortController();
  
  // Extract error details if requesting error_fix
  let errorOutput = '';
  if (tabName === 'error_fix') {
    const errContentEl = document.getElementById('error-content');
    errorOutput = errContentEl ? errContentEl.innerText : '';
  }
  
  fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      language: currentLang, 
      code, 
      type: tabName,
      error_output: errorOutput 
    }),
    signal: analysisAbortController[tabName].signal
  })
  .then(r => r.json())
  .then(data => {
    analysisAbortController[tabName] = null;
    if (data.error) {
      setAnalysisError(tabName, data.error);
    } else if (data.data) {
      cachedAnalyses[tabName] = data.data;
      renderAnalysis(tabName, data.data);
    }
  })
  .catch(err => {
    if (err.name === 'AbortError') return;
    analysisAbortController[tabName] = null;
    setAnalysisError(tabName, `Network error: ${err.message}`);
  });
}

function resetAnalysisPanel(tabName) {
  const container = document.getElementById(`analysis-${tabName}`);
  let desc = '';
  let btnClass = '';
  let btnText = '';
  
  switch (tabName) {
    case 'security':
      desc = 'Analyze your code for potential security issues.';
      btnClass = 'btn-red';
      btnText = 'Analyze Security';
      break;
    case 'complexity':
      desc = 'Analyze the time and space complexity of your algorithm.';
      btnClass = 'btn-blue';
      btnText = 'Analyze Complexity';
      break;
    case 'bug_detector':
      desc = 'Statically inspect the code for potential bugs.';
      btnClass = 'btn-orange';
      btnText = 'Detect Bugs';
      break;
    case 'challenge':
      desc = 'Generate personalized coding challenges.';
      btnClass = 'btn-green';
      btnText = 'Generate Challenge';
      break;
    case 'error_fix':
      desc = 'Statically analyze and fix bugs in your code.';
      btnClass = 'btn-orange';
      btnText = 'AI Error Fix';
      break;
  }
  
  container.innerHTML = `
    <div class="analysis-placeholder">
      <p style="margin-bottom: 12px; color: var(--text2); font-style: normal; font-weight: normal;">${escapeHtml(desc)}</p>
      <button class="btn ${btnClass} btn-analyze" data-analyze="${tabName}">${btnText}</button>
    </div>`;
  
  container.querySelector('.btn-analyze').addEventListener('click', function() {
    runAnalysis(this.dataset.analyze);
  });
}

function setAnalysisPlaceholder(tabName, text) {
  const container = document.getElementById(`analysis-${tabName}`);
  container.innerHTML = `<div class="analysis-placeholder">${escapeHtml(text)}</div>`;
}

function setAnalysisError(tabName, errorText) {
  const container = document.getElementById(`analysis-${tabName}`);
  container.innerHTML = `
    <div class="analysis-placeholder" style="border-color: var(--red); color: var(--red); background: rgba(220, 38, 37, 0.05); text-align: center;">
      ⚠️ Analysis Failed:<br><span style="font-size: 11px; margin-top: 4px; display: inline-block;">${escapeHtml(errorText)}</span>
    </div>`;
}

function updateFixButtonState(hasError) {
  const btnFix = document.getElementById('btnFixError');
  if (btnFix) {
    btnFix.style.display = hasError ? 'inline-block' : 'none';
  }
}

function renderAnalysis(tabName, data) {
  switch (tabName) {
    case 'security': renderSecurity(data); break;
    case 'complexity': renderComplexity(data); break;
    case 'bug_detector': renderBugDetector(data); break;
    case 'challenge': renderChallenge(data); break;
    case 'error_fix': renderErrorFix(data); break;
  }
}

// Rendering Templates for AI Analysis Layers
function renderSecurity(data) {
  const container = document.getElementById('analysis-security');
  if (!data || !data.issues || data.issues.length === 0) {
    container.innerHTML = `
      <div class="analysis-placeholder" style="border-color: var(--green); color: var(--green); background: rgba(28, 157, 75, 0.05);">
        🟢 No security issues detected. Code is safe!
      </div>`;
    return;
  }
  let html = '';
  data.issues.forEach(issue => {
    const sevClass = (issue.severity || 'low').toLowerCase();
    let sevEmoji = '🟢';
    if (sevClass === 'critical' || sevClass === 'high') sevEmoji = '🔴';
    else if (sevClass === 'medium') sevEmoji = '🟡';
    else if (sevClass === 'low') sevEmoji = '🔵';
    
    html += `
      <div class="analysis-card">
        <div class="analysis-card-header">
          <span class="analysis-card-title">${sevEmoji} ${escapeHtml(issue.issue)}</span>
          <span class="severity-badge ${sevClass}">${escapeHtml(issue.severity)}</span>
        </div>
        <div class="analysis-card-field">
          <span class="field-label">Reason</span>
          <div class="field-value">${escapeHtml(issue.reason)}</div>
        </div>
        <div class="analysis-card-field">
          <span class="field-label">Impact</span>
          <div class="field-value">${escapeHtml(issue.impact)}</div>
        </div>
        <div class="analysis-card-field">
          <span class="field-label">Recommendation</span>
          <div class="field-value">${escapeHtml(issue.recommendation)}</div>
        </div>
      </div>`;
  });
  container.innerHTML = html;
}

function renderComplexity(data) {
  const container = document.getElementById('analysis-complexity');
  if (!data) {
    container.innerHTML = '<div class="analysis-placeholder">Failed to retrieve complexity.</div>';
    return;
  }
  let optsHtml = '';
  if (data.optimization_suggestions && data.optimization_suggestions.length > 0) {
    optsHtml = `
      <div class="analysis-card-field" style="margin-top: 12px;">
        <span class="optimizations-title">Optimization Suggestions</span>
        <ul class="optimizations-list">
          ${data.optimization_suggestions.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
        </ul>
      </div>`;
  }
  container.innerHTML = `
    <div class="complexity-box">
      <div class="complexity-row">
        <span class="complexity-label">Time Complexity</span>
        <span class="complexity-val">${escapeHtml(data.time_complexity || 'N/A')}</span>
      </div>
      <div class="complexity-row">
        <span class="complexity-label">Space Complexity</span>
        <span class="complexity-val">${escapeHtml(data.space_complexity || 'N/A')}</span>
      </div>
      <div class="complexity-reason">
        <span class="field-label">Explanation</span>
        <div class="field-value">${escapeHtml(data.reason || '')}</div>
      </div>
      ${optsHtml}
    </div>`;
}

function renderBugDetector(data) {
  const container = document.getElementById('analysis-bug_detector');
  if (!data || !data.issues || data.issues.length === 0) {
    container.innerHTML = `
      <div class="analysis-placeholder" style="border-color: var(--green); color: var(--green); background: rgba(28, 157, 75, 0.05);">
        🟢 No bugs detected. Code looks clean!
      </div>`;
    return;
  }
  let html = '';
  data.issues.forEach(issue => {
    const lineStr = issue.line_number ? `Line ${issue.line_number}` : 'General';
    const confidenceStr = issue.confidence_score ? `Confidence: ${issue.confidence_score}%` : '';
    const sevClass = (issue.severity || 'low').toLowerCase();
    
    html += `
      <div class="bug-item">
        <div class="bug-header">
          <span class="bug-line">${lineStr}</span>
          <span class="severity-badge ${sevClass}">${escapeHtml(issue.severity)}</span>
        </div>
        <div class="bug-desc">${escapeHtml(issue.description)}</div>
        ${issue.suggested_fix ? `<div class="bug-fix">${escapeHtml(issue.suggested_fix)}</div>` : ''}
        ${confidenceStr ? `<div class="bug-confidence">${confidenceStr}</div>` : ''}
      </div>`;
  });
  container.innerHTML = html;
}

function renderChallenge(data) {
  const container = document.getElementById('analysis-challenge');
  if (!data) {
    container.innerHTML = '<div class="analysis-placeholder">Failed to retrieve challenges.</div>';
    return;
  }
  let conceptsHtml = '';
  if (data.concepts_to_learn && data.concepts_to_learn.length > 0) {
    conceptsHtml = `
      <div class="analysis-card-field" style="margin-top: 12px;">
        <span class="field-label">Concepts to Learn</span>
        <div class="field-value">${data.concepts_to_learn.map(c => `<span class="severity-badge info" style="margin-right: 4px; display: inline-block; margin-bottom: 4px;">${escapeHtml(c)}</span>`).join('')}</div>
      </div>`;
  }
  
  let stepsHtml = '';
  if (data.learning_path && data.learning_path.length > 0) {
    stepsHtml = `
      <div class="analysis-card-field" style="margin-top: 12px;">
        <span class="field-label">Learning Path</span>
        <div class="learning-path-steps">
          ${data.learning_path.map((step, idx) => `
            <div class="learning-step">
              <span class="learning-step-num">${idx + 1}</span>
              <span class="learning-step-text">${escapeHtml(step)}</span>
            </div>
          `).join('')}
        </div>
      </div>`;
  }
  
  let platformsHtml = '';
  if (data.recommended_categories && data.recommended_categories.length > 0) {
    platformsHtml = `
      <div class="analysis-card-field" style="margin-top: 12px;">
        <span class="field-label">Recommended Problem Categories</span>
        <div class="field-value" style="font-size: 11px;">
          ${data.recommended_categories.map(cat => `<div style="margin-bottom: 4px;">🎯 ${escapeHtml(cat)}</div>`).join('')}
        </div>
      </div>`;
  }
  
  container.innerHTML = `
    <div class="challenge-container">
      <div class="challenge-header-box">
        <span class="field-label">Estimated Difficulty</span>
        <span class="challenge-difficulty">${escapeHtml(data.difficulty || 'Medium')}</span>
        <div class="field-value" style="font-size: 11px; color: var(--text3); margin-top: 4px;">Estimated Time: ${escapeHtml(data.estimated_time || 'N/A')}</div>
      </div>
      <div class="challenge-box">
        <span class="challenge-title">Next Recommended Problem</span>
        <div class="challenge-desc">${escapeHtml(data.next_problem || '')}</div>
        ${conceptsHtml}
        ${stepsHtml}
        ${platformsHtml}
      </div>
    </div>`;
}

function renderErrorFix(data) {
  const container = document.getElementById('analysis-error_fix');
  if (!data) {
    container.innerHTML = '<div class="analysis-placeholder">Failed to retrieve error fixes.</div>';
    return;
  }
  
  if (data.no_errors || !data.issues || data.issues.length === 0) {
    container.innerHTML = `
      <div class="analysis-placeholder" style="border-color: var(--green); color: var(--green); background: rgba(28, 157, 75, 0.05); flex-direction: column;">
        <p style="margin-bottom: 4px; font-weight: 700; color: var(--green); font-style: normal; font-size: 13px;">✅ No significant errors detected.</p>
        <p style="font-size: 11px; color: var(--text2); font-style: normal; line-height: 1.4;">The code follows good programming practices.<br>Review completed successfully.</p>
      </div>`;
    return;
  }

  // Build the layout
  let issuesHtml = '';
  data.issues.forEach(issue => {
    const lineStr = issue.line_number ? `Line ${issue.line_number}` : 'General';
    const confidenceStr = issue.confidence_score ? `Confidence: ${issue.confidence_score}%` : '';
    const sevClass = (issue.severity || 'medium').toLowerCase();
    let sevEmoji = '🔵';
    if (sevClass === 'critical' || sevClass === 'high') sevEmoji = '🔴';
    else if (sevClass === 'medium') sevEmoji = '🟡';
    else if (sevClass === 'low') sevEmoji = '🟢';

    issuesHtml += `
      <div class="bug-item">
        <div class="bug-header">
          <span class="bug-line">${lineStr}</span>
          <span class="severity-badge ${sevClass}">${escapeHtml(issue.severity)}</span>
        </div>
        <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px; color: var(--text);">${sevEmoji} ${escapeHtml(issue.error_type || 'Error')}</div>
        <div class="bug-desc" style="margin-bottom: 4px;"><strong>Problem:</strong> ${escapeHtml(issue.description)}</div>
        <div class="bug-desc" style="margin-bottom: 4px; color: var(--text3); font-size: 11px;"><strong>Reason:</strong> ${escapeHtml(issue.reason)}</div>
        <div class="bug-fix" style="margin-top: 6px;">${escapeHtml(issue.suggested_fix)}</div>
        ${confidenceStr ? `<div class="bug-confidence" style="font-size: 9px; color: var(--text3); text-align: right; margin-top: 4px;">${confidenceStr}</div>` : ''}
      </div>`;
  });

  let changesHtml = '';
  if (data.changes_made && data.changes_made.length > 0) {
    changesHtml = `
      <div class="analysis-card">
        <span class="field-label" style="margin-bottom: 6px;">Changes Made</span>
        <ul class="optimizations-list">
          ${data.changes_made.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
        </ul>
      </div>`;
  }

  let practicesHtml = '';
  if (data.best_practices && data.best_practices.length > 0) {
    practicesHtml = `
      <div class="analysis-card">
        <span class="field-label" style="margin-bottom: 6px;">Best Practices</span>
        <ul class="optimizations-list">
          ${data.best_practices.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
        </ul>
      </div>`;
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div class="analysis-card" style="border-color: var(--orange); background: rgba(237, 96, 10, 0.03);">
        <span class="field-label" style="color: var(--orange); margin-bottom: 4px;">Error Summary</span>
        <div style="font-size: 12px; color: var(--text2); line-height: 1.4;">
          Found <strong>${data.issues.length}</strong> issue(s) in your code. Review the proposed fixes below.
        </div>
      </div>
      
      <div class="analysis-card-title" style="font-size: 10px; text-transform: uppercase; color: var(--text3); font-weight: 700; margin-bottom: -4px; letter-spacing: 0.5px;">Detected Issues</div>
      <div class="issues-list-wrap">${issuesHtml}</div>
      
      <div class="analysis-card-title" style="font-size: 10px; text-transform: uppercase; color: var(--text3); font-weight: 700; margin-bottom: -4px; letter-spacing: 0.5px;">Corrected Code</div>
      <div class="analysis-card" style="padding: 8px;">
        <div id="fixed-code-editor-container" style="height: 180px; border: 1px solid var(--bc); border-radius: 4px; overflow: hidden; background: #000; margin-bottom: 8px;"></div>
        <div style="display: flex; gap: 6px;">
          <button class="btn btn-green" id="applyFixBtn" style="flex: 1; padding: 6px 12px; font-size: 11px;">✅ Apply Fix</button>
          <button class="btn btn-copy" id="copyFixBtn" style="flex: 1; padding: 6px 12px; font-size: 11px;">📋 Copy Fixed Code</button>
        </div>
      </div>

      ${changesHtml}
      ${practicesHtml}
    </div>`;

  // Initialize read-only Monaco Editor for corrected code
  setTimeout(() => {
    const el = document.getElementById('fixed-code-editor-container');
    if (el) {
      if (fixedCodeEditor) {
        fixedCodeEditor.dispose();
      }
      const ml = MONACO_LANG[currentLang] || 'plaintext';
      let fixed = data.corrected_code || '';
      fixed = fixed.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '');
      fixedCodeEditor = monaco.editor.create(el, {
        value: fixed,
        language: ml,
        theme: 'nano-dark',
        readOnly: true,
        automaticLayout: true,
        fontSize: 12,
        lineNumbers: 'on',
        lineNumbersMinChars: 2,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontFamily: "'JetBrains Mono', monospace",
        wordWrap: 'on'
      });
    }

    // Bind Apply and Copy buttons
    document.getElementById('applyFixBtn').addEventListener('click', () => {
      if (data.corrected_code) {
        let fixed = data.corrected_code;
        fixed = fixed.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '');
        editor.setValue(fixed);
        showToast('Fix applied successfully!', 'success');
      }
    });

    document.getElementById('copyFixBtn').addEventListener('click', () => {
      if (data.corrected_code) {
        let fixed = data.corrected_code;
        fixed = fixed.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '');
        navigator.clipboard.writeText(fixed).then(() => {
          showToast('Copied fixed code!', 'success');
        }).catch(() => {
          showToast('Failed to copy', 'error');
        });
      }
    });
  }, 50);
}
