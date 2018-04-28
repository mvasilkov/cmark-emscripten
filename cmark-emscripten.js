const utf8 = require('utf8')
require('require-inject-scope')

// noinspection JSCheckFunctionSignatures
const libcmark = require(['./libcmark', { Module: { memoryInitializerPrefixURL: `${__dirname}/` } }])

const cmark_markdown_to_html = libcmark.cwrap('cmark_markdown_to_html', 'string', ['string', 'number', 'number'])
const cmark_version = libcmark.cwrap('cmark_version', 'number', null)
const cmark_version_string = libcmark.cwrap('cmark_version_string', 'string', null)

function markdownToHtml(a) {
    const len = utf8.encode(a).length
    return cmark_markdown_to_html(a, len, 0)
}

function cmarkVersion() {
    /* Python: tuple(cmark_version().to_bytes(3, byteorder='big')) */
    const a = cmark_version()
    return [
        a >> 16 & 255, // major
        a >> 8 & 255, // minor
        a & 255, // patchlevel
    ]
}

module.exports = {
    /* Private API */
    cmark_markdown_to_html,
    cmark_version,
    cmark_version_string,
    /* Public API */
    markdownToHtml,
    cmarkVersion,
    cmarkVersionString: cmark_version_string,
}
