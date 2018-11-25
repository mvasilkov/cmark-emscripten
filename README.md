cmark-emscripten
===

This is an [Emscripten][1] port of the C reference implementation of [CommonMark][2], [cmark][3].

[![](https://github.com/mvasilkov/cmark-emscripten/raw/webassembly/static/cmark-emscripten.png)][4]

**cmark-emscripten** can be used in Node.js and the browser.

Installation
---

```sh
yarn add cmark-emscripten
```

Usage
---

```js
const cmark = require('cmark-emscripten')

cmark.toHTML(`
What do you call a basement full of liberals?
---

*A whine cellar.*
`).then(console.log)
```

**Outputs:**

```html
<h2>What do you call a basement full of liberals?</h2>
<p><em>A whine cellar.</em></p>
```

[1]: http://emscripten.org/
[2]: http://commonmark.org/
[3]: https://github.com/commonmark/cmark
[4]: https://github.com/mvasilkov/cmark-emscripten
