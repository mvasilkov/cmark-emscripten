#!/usr/bin/env node

const stdin = require('get-stdin')

const cmark = require('./cmark-emscripten')

function run() {
    if (process.argv.length > 2) {
        if (process.argv[2] == '--version') {
            cmark.versionString().then(console.log)
            return
        }
    }

    stdin().then(a => {
        cmark.toHTML(a).then(b => b && console.log(b))
    })
}

if (require.main === module) {
    run()
}
