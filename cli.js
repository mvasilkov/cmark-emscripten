#!/usr/bin/env node

const stdin = require('get-stdin')

const cmark = require('./cmark-emscripten')

function run() {
    if (process.argv.length > 2) {
        if (process.argv[2] == '--version') {
            console.log(cmark.cmarkVersionString())
            return
        }
    }

    stdin().then(a => {
        const res = cmark.markdownToHtml(a)
        if (res) console.log(res)
    })
}

// if __name__ == __main__
if (require.main === module) {
    run()
}
