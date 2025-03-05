import { describe, expect, it } from 'vitest'

import { markdownToHtml } from './markdown-to-html'

describe('markdownToHtml', () => {
  it('should convert basic markdown to html', async () => {
    const markdown = '# Hello World'
    const html = await markdownToHtml(markdown)
    expect(html).toContain('<h1>Hello World</h1>')
  })

  it('should handle paragraphs', async () => {
    const markdown = 'This is a paragraph.\n\nThis is another paragraph.'
    const html = await markdownToHtml(markdown)
    expect(html).toContain('<p>This is a paragraph.</p>')
    expect(html).toContain('<p>This is another paragraph.</p>')
  })

  it('should handle emphasis and strong text', async () => {
    const markdown = '*italic* and **bold**'
    const html = await markdownToHtml(markdown)
    expect(html).toContain('<em>italic</em>')
    expect(html).toContain('<strong>bold</strong>')
  })

  it('should handle links', async () => {
    const markdown = '[Link text](https://example.com)'
    const html = await markdownToHtml(markdown)
    expect(html).toContain('<a href="https://example.com">Link text</a>')
  })

  it('should handle code blocks', async () => {
    const markdown = '```javascript\nconst x = 1;\n```'
    const html = await markdownToHtml(markdown)
    expect(html).toContain('<pre>')
    expect(html).toContain('<code class="language-javascript">')
    expect(html).toContain('const x = 1;')
  })

  it('should handle lists', async () => {
    const markdown = '- Item 1\n- Item 2\n- Item 3'
    const html = await markdownToHtml(markdown)
    expect(html).toContain('<ul>')
    expect(html).toContain('<li>Item 1</li>')
    expect(html).toContain('<li>Item 2</li>')
    expect(html).toContain('<li>Item 3</li>')
  })

  it('should handle GFM tables (via remark-gfm)', async () => {
    const markdown =
      '| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |'
    const html = await markdownToHtml(markdown)
    expect(html).toContain('<table>')
    expect(html).toContain('<th>Header 1</th>')
    expect(html).toContain('<th>Header 2</th>')
    expect(html).toContain('<td>Cell 1</td>')
    expect(html).toContain('<td>Cell 2</td>')
  })

  it('should preserve HTML in markdown (via rehype-raw)', async () => {
    const markdown =
      'Some text with <span class="highlight">highlighted</span> content.'
    const html = await markdownToHtml(markdown)
    expect(html).toContain('<span class="highlight">highlighted</span>')
  })
})
