const utf8 = require('utf8')
require('require-inject-scope')

// noinspection JSCheckFunctionSignatures
const libcmark = require(['./libcmark', { Module: { memoryInitializerPrefixURL: `${__dirname}/` } }])

const cmark_markdown_to_html = libcmark.cwrap('cmark_markdown_to_html', 'string', ['string', 'number', 'number'])
const cmark_version = libcmark.cwrap('cmark_version', 'number', null)
const cmark_version_string = libcmark.cwrap('cmark_version_string', 'string', null)

const CMARK_OPT_DEFAULT = 0
const CMARK_OPT_SOURCEPOS = (1 << 1)
const CMARK_OPT_HARDBREAKS = (1 << 2)
const CMARK_OPT_SAFE = (1 << 3)
const CMARK_OPT_NOBREAKS = (1 << 4)
const CMARK_OPT_NORMALIZE = (1 << 8)
const CMARK_OPT_VALIDATE_UTF8 = (1 << 9)
const CMARK_OPT_SMART = (1 << 10)

function markdownToHtml(a, options) {
    const len = utf8.encode(a).length
    let opt = CMARK_OPT_DEFAULT
    if (options) {
        if (options.sourcepos) opt |= CMARK_OPT_SOURCEPOS
        if (options.hardbreaks) opt |= CMARK_OPT_HARDBREAKS
        if (options.safe) opt |= CMARK_OPT_SAFE
        if (options.nobreaks) opt |= CMARK_OPT_NOBREAKS
        if (options.normalize) opt |= CMARK_OPT_NORMALIZE
        if (options.validateUTF8) opt |= CMARK_OPT_VALIDATE_UTF8
        if (options.smart) opt |= CMARK_OPT_SMART
    }
    return cmark_markdown_to_html(a, len, opt)
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
