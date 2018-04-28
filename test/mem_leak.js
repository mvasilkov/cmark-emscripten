#!/usr/bin/env node

const fs = require('fs')

const cmark = require('../cmark-emscripten')

const readme = fs.readFileSync(`${__dirname}/../README.md`, { encoding: 'utf-8' })
const longText = Array(2018).fill(readme).join('\n\n')

function memUsage() {
    const used = process.memoryUsage()
    for (let key in used) {
        console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
    }
    console.log('---')
}

let count = 0
for (let n = 0; n < 100; ++n) {
    // global.gc()
    count += cmark.markdownToHtml(longText).length
    memUsage()
}
