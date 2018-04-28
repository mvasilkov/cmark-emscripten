interface MarkdownToHtmlOptions {
    default?: boolean
    sourcepos?: boolean
    hardbreaks?: boolean
    safe?: boolean
    nobreaks?: boolean
    normalize?: boolean
    validateUTF8?: boolean
    smart?: boolean
}

type CmarkVersion = [number, number, number]

declare function markdownToHtml(a: string, options?: MarkdownToHtmlOptions): string

declare function cmarkVersion(): CmarkVersion

declare function cmarkVersionString(): string
