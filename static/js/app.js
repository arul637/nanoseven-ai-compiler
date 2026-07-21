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

  registerCompletions();
  bindUI();
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
      }
    });
  });

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
    } else {
      const out = data.output || '';
      const colored = colorizeOutput(out);
      setOutputContent('output', colored);

      if (isErrorOutput(out)) {
        setOutputContent('error', '<span class="line-error">' + escapeHtml(out) + '</span>');
        switchTab('error');
      } else {
        setOutputContent('error', '<span class="line-info">No errors detected.</span>');
        switchTab('output');
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
