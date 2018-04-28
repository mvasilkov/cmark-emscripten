#!/usr/bin/env node

const stdin = require('get-stdin')

const cmark = require('./cmark-emscripten')

stdin().then(a => {
    const res = cmark.markdownToHtml(a)
    if (res) console.log(res)
})
