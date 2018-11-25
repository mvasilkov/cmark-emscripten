/* This file is part of the pastechan project.
 * https://github.com/mvasilkov/pastechan
 * Copyright (c) 2018 Mark Vasilkov (https://github.com/mvasilkov)
 * License: MIT */
'use strict'

const utf8 = require('./utf8')

let cmark_markdown_to_html, cmark_version, cmark_version_string

const wait = new Promise(done => {
    require('./libcmark')().then(Module => {
        if (!Module.usingWasm) {
            throw Error('Not good')
        }

        cmark_markdown_to_html = Module.cwrap('cmark_markdown_to_html', 'string', ['string', 'number', 'number'])
        cmark_version = Module.cwrap('cmark_version', 'number', null)
        cmark_version_string = Module.cwrap('cmark_version_string', 'string', null)

        done()
    })
})

exports.OPT_DEFAULT = 0
exports.OPT_SOURCEPOS = (1 << 1)
exports.OPT_HARDBREAKS = (1 << 2)
exports.OPT_SAFE = (1 << 3)
exports.OPT_NOBREAKS = (1 << 4)
exports.OPT_NORMALIZE = (1 << 8)
exports.OPT_VALIDATE_UTF8 = (1 << 9)
exports.OPT_SMART = (1 << 10)

exports.toHTML = function toHTML(a, options = 0) {
    return wait.then(() => cmark_markdown_to_html(a, utf8.lengthBytesUTF8(a), options))
}

exports.version = function version() {
    return wait.then(function () {
        /* Python: tuple(cmark_version().to_bytes(3, byteorder='big')) */
        const a = cmark_version()
        return [
            a >> 16 & 255, // major
            a >> 8 & 255, // minor
            a & 255, // patchlevel
        ]
    })
}

exports.versionString = function versionString() {
    return wait.then(() => cmark_version_string())
}
