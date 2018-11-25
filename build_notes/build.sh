#!/usr/bin/env bash
set -e

CMARK_DIR=cmark/src
BUILD_DIR=../../build_notes

(cd $CMARK_DIR && $BUILD_DIR/command_line.sh)

rm -f libcmark.{js,wasm}

(cd $CMARK_DIR && $BUILD_DIR/patch_mem_leak.py)
npx uglify-js --compress -o libcmark.js $CMARK_DIR/libcmark.js
rm $CMARK_DIR/libcmark.js

mv $CMARK_DIR/libcmark.wasm .
