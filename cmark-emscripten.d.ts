declare const OPT_DEFAULT: number
declare const OPT_SOURCEPOS: number
declare const OPT_HARDBREAKS: number
declare const OPT_SAFE: number
declare const OPT_NOBREAKS: number
declare const OPT_NORMALIZE: number
declare const OPT_VALIDATE_UTF8: number
declare const OPT_SMART: number

declare function toHTML(a: string, options?: number): string

declare function version(): [number, number, number]

declare function versionString(): string
