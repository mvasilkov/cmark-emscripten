#!/usr/bin/env python3

filename = 'libcmark.js'
originalCode = 'if(returnType==="string")ret=Pointer_stringify(ret);else'
replacementCode = ('if(returnType==="string"){var foobar=Pointer_stringify(ret);'
                   'if(ident==="cmark_markdown_to_html")_free(ret);ret=foobar}else')


def patch():
    code = open(filename, 'r', encoding='utf-8').read()
    assert code.count(originalCode) == 1
    a, b = code.split(originalCode)
    code = f'{a}{replacementCode}{b}'
    open(filename, 'w', encoding='utf-8', newline='\n').write(code)


if __name__ == '__main__':
    patch()
