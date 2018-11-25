#!/usr/bin/env bash
set -e

FILES=(cmark.c node.c iterator.c blocks.c inlines.c scanners.c utf8.c
	buffer.c references.c render.c man.c xml.c html.c commonmark.c latex.c
	houdini_href_e.c houdini_html_e.c houdini_html_u.c cmark_ctype.c)

emcc -O3 -s EXPORTED_FUNCTIONS="['_cmark_markdown_to_html', '_cmark_version', '_cmark_version_string', '_free']" \
	-s EXTRA_EXPORTED_RUNTIME_METHODS="['cwrap']" -s INVOKE_RUN=0 -s MODULARIZE=1 -o libcmark.js \
	-I ../build/src ${FILES[*]}

rm -f ../../libcmark.{js,wasm}
mv libcmark.wasm ../../
../../build_notes/patch_mem_leak.py
npx uglify-js --compress -o ../../libcmark.js libcmark.js
rm libcmark.js
