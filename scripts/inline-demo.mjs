import { readFileSync, writeFileSync } from 'node:fs'

// Inline the built demo into a single HTML file so it can be opened straight
// from disk (file:// blocks external ES modules).
const dir = new URL('../demo-dist/', import.meta.url)
const read = (p) => readFileSync(new URL(p, dir), 'utf8')

let html = read('index.html')

const cssHref = html.match(/href="\.\/(assets\/[^"]+\.css)"/)
if (cssHref) {
  html = html.replace(
    new RegExp(`<link[^>]*href="\\./${cssHref[1]}"[^>]*>`),
    () => `<style>\n${read(cssHref[1])}\n</style>`,
  )
}

const jsSrc = html.match(/src="\.\/(assets\/[^"]+\.js)"/)
if (jsSrc) {
  const code = read(jsSrc[1]).replace(/<\/script>/g, '<\\/script>')
  html = html.replace(
    new RegExp(`<script[^>]*src="\\./${jsSrc[1]}"[^>]*></script>`),
    () => `<script type="module">\n${code}\n</script>`,
  )
}

writeFileSync(new URL('preview.html', dir), html)
console.log('✓ demo-dist/preview.html')
