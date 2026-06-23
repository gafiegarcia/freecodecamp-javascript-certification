# Build a Markdown to HTML Converter — captured on 2026-06-22 at 11:30

Build an app that is functionally similar to this example project. Try not to copy the example project, give it your own personal style.

Markdown is a markup language used to add formatting elements to plain-text documents. For this lab, all the HTML and CSS has been provided to you. You will use JavaScript to complete the Markdown to HTML Converter app so that it can handle the conversion of basic Markdown constructs into HTML elements.

**Note**: The final result won't be a comprehensive Markdown to HTML converter, but you can add extra functionalities to it if you would like.

**Objective**: Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories**:

1. You should have a function named `convertMarkdown` that takes no parameters.
2. The `convertMarkdown` function should use regular expressions to convert the markdown input from `#markdown-input` into HTML and should return a string containing the HTML code.
3. The `convertMarkdown` function should convert headings of level one, two, and three into the corresponding `h1`, `h2`, and `h3` elements. A heading in markdown is indicated by as many `#` character as its level followed by a space and the heading text. `#` characters should be placed at the beginning of the line: there can be spaces but no other characters before it.
4. The `convertMarkdown` function should convert bold text into `strong` elements. Bold text in markdown is indicated either by a pair of double asterisks or a pair of double underscores enclosing the text.
5. The `convertMarkdown` function should convert italic text into `em` elements. Italic text in markdown is indicated either by a pair of asterisks or a pair of underscores enclosing the text.
6. The `convertMarkdown` function should convert images into `img` elements. An image in markdown is indicated by `![alt-text](image-source)`, where `alt-text` is the value of the `alt` attribute and `image-source` is the value of the `src` attribute.
7. The `convertMarkdown` function should convert links into anchor elements. A link in markdown is indicated by `[link text](URL)`, where `link text` is the text to enclosed within the anchor tags and `URL` is the value of `href` attribute.
8. The `convertMarkdown` function should convert quotes into `blockquote` elements. A quote in markdown is indicated by a `>` followed by a space and the quote text. The `>` character should be placed at the beginning of the line: there can be spaces but no other characters before it.
9. When you input text inside `#markdown-input`, the raw HTML code returned by `convertMarkdown` should be displayed inside `#html-output`.
10. When you input text inside `#markdown-input`, the HTML code returned by `convertMarkdown` should be rendered inside `#preview`.

Note: you should work with the `input` event for this project.

Here's a table containing all the markdown that `convertMarkdown` should be able to handle and the expected HTML after conversion:

| Markdown | HTML |
| -------- | ---- |
| `# heading 1` | `<h1>heading 1</h1>` |
| `## heading 2` | `<h2>heading 2</h2>` |
| `### heading 3` | `<h3>heading 3</h3>` |
| `**bold text** or __bold text__` | `<strong>bold text</strong>` |
| `*italic text* or _italic text_` | `<em>italic text</em>` |
| `![alt-text](image-source)` | `<img alt="alt-text" src="image-source">` |
| `[link text](URL)` | `<a href="URL">link text</a>` |
| `> quote` | `<blockquote>quote</blockquote>` |

**Note**: Be sure to link your JavaScript file in your HTML.

Tests:

1. You should have a function named `convertMarkdown`.
2. When the value of `#markdown-input` is `# title 1`, `convertMarkdown()` should return `<h1>title 1</h1>`.
3. When the value of `#markdown-input` is `# title 1`, `<h1>title 1</h1>` should be displayed inside `#html-output`.
4. When the value of `#markdown-input` is `# title 1`, an `h1` element with the text of `title 1` should be appended as a child of `#preview`.
5. When the value of `#markdown-input` is `some text # title 1`, `convertMarkdown()` should not convert `# title 1` into an `h1` element.
6. When the value of `#markdown-input` is `# title 1` followed by `# alternate title` on a new line, `convertMarkdown()` should return `<h1>title 1</h1><h1>alternate title</h1>`.
7. When the value of `#markdown-input` is `## title 2`, `convertMarkdown()` should return `<h2>title 2</h2>`.
8. When the value of `#markdown-input` is `## title 2`, `<h2>title 2</h2>` should be displayed inside `#html-output`.
9. When the value of `#markdown-input` is `## title 2`, an `h2` element with the text of `title 2` should be appended as a child of `#preview`.
10. When the value of `#markdown-input` is `some text ## title 2`, `convertMarkdown()` should not convert `## title 2` into an `h2` element.
11. When the value of `#markdown-input` is `## title 2` followed by `## title 2 alt` on a new line, `convertMarkdown()` should return `<h2>title 2</h2><h2>title 2 alt</h2>`.
12. When the value of `#markdown-input` is `### title 3`, `convertMarkdown()` should return `<h3>title 3</h3>`.
13. When the value of `#markdown-input` is `### title 3`, `<h3>title 3</h3>` should be displayed inside `#html-output`.
14. When the value of `#markdown-input` is `### title 3`, an `h3` element with the text of `title 3` should be appended as a child of `#preview`.
15. When the value of `#markdown-input` is `some text ### title 3`, `convertMarkdown()` should not convert `### title 3` into an `h3` element.
16. When the value of `#markdown-input` is `### title 3` followed by `### third title` on a new line, `convertMarkdown()` should return `<h3>title 3</h3><h3>third title</h3>`.
17. When the value of `#markdown-input` is `**this is bold**`, `convertMarkdown()` should return `<strong>this is bold</strong>`.
18. When the value of `#markdown-input` is `**this is bold**`, `<strong>this is bold</strong>` should be displayed inside `#html-output`.
19. When the value of `#markdown-input` is `**this is bold**`, a `strong` element with the text of `this is bold` should be appended as a child of `#preview`.
20. When the value of `#markdown-input` is `**this is bold**` followed by `**this is also bold**` on a new line, `convertMarkdown()` should return `<strong>this is bold</strong><strong>this is also bold</strong>`.
21. When the value of `#markdown-input` is `__this is bold__`, `<strong>this is bold</strong>` should be displayed inside `#html-output`.
22. When the value of `#markdown-input` is `__this is bold__`, a `strong` element with the text of `this is bold` should be appended as a child of `#preview`.
23. When the value of `#markdown-input` is `__this is bold__` followed by `__this is also bold__` on a new line, `convertMarkdown()` should return `<strong>this is bold</strong><strong>this is also bold</strong>`.
24. When the value of `#markdown-input` is `*this is italic*`, `convertMarkdown()` should return `<em>this is italic</em>`.
25. When the value of `#markdown-input` is `*this is italic*`, `<em>this is italic</em>` should be displayed inside `#html-output`.
26. When the value of `#markdown-input` is `*this is italic*`, an `em` element with the text of `this is italic` should be appended as a child of `#preview`.
27. When the value of `#markdown-input` is `*this is italic*` followed by `*this is also italic*` on a new line, `convertMarkdown()` should return `<em>this is italic</em><em>this is also italic</em>`.
28. When the value of `#markdown-input` is `_this is italic_`, `convertMarkdown()` should return `<em>this is italic</em>`.
29. When the value of `#markdown-input` is `_this is italic_`, `<em>this is italic</em>` should be displayed inside `#html-output`.
30. When the value of `#markdown-input` is `_this is italic_`, an `em` element with the text of `this is italic` should be appended as a child of `#preview`.
31. When the value of `#markdown-input` is `_this is italic_` followed by `_this is also italic_` on a new line, `convertMarkdown()` should return `<em>this is italic</em><em>this is also italic</em>`.
32. When the value of `#markdown-input` is either `# **title 1**` or `# __title 1__`, `convertMarkdown()` should return `<h1><strong>title 1</strong></h1>`.
33. When the value of `#markdown-input` is either `# **title 1**` or `# __title 1__`, `<h1><strong>title 1</strong></h1>` should be displayed inside `#html-output`.
34. When the value of `#markdown-input` is either `# **title 1**` or `# __title 1__`, you set the inner HTML of `#preview` to `<h1><strong>title 1</strong></h1>`.
35. When the value of `#markdown-input` is `![alt-text](image-source)`, `convertMarkdown()` should return `<img alt="alt-text" src="image-source">`.
36. When the value of `#markdown-input` is `![alt-text](image-source)`, `<img alt="alt-text" src="image-source">` should be displayed inside `#html-output`.
37. When the value of `#markdown-input` is `![alt-text](image-source)`, `<img alt="alt-text" src="image-source">` should be appended as a child of `#preview`.
38. When the value of `#markdown-input` is `![alt-text](image-source)` followed by `![alt-text-2](image-source-2)` on a new line, `convertMarkdown()` should return `<img alt="alt-text" src="image-source"><img alt="alt-text-2" src="image-source-2">`.
39. When the value of `#markdown-input` is `[link text](URL)`, `convertMarkdown()` should return `<a href="URL">link text</a>`.
40. When the value of `#markdown-input` is `[link text](URL)`, `<a href="URL">link text</a>` should be displayed inside `#html-output`.
41. When the value of `#markdown-input` is `[link text](URL)`, `<a href="URL">link text</a>` should be appended as a child of `#preview`.
42. When the value of `#markdown-input` is `[link text](URL)` followed by `[link text 2](URL2)` on a new line, `convertMarkdown()` should return `<a href="URL">link text</a><a href="URL2">link text 2</a>`.
43. When the value of `#markdown-input` is `> this is a quote`, `convertMarkdown()` should return `<blockquote>this is a quote</blockquote>`.
44. When the value of `#markdown-input` is `> this is a quote`, `<blockquote>this is a quote</blockquote>` should be displayed inside `#html-output`.
45. When the value of `#markdown-input` is `> this is a quote`, `<blockquote>this is a quote</blockquote>` should be appended as a child of `#preview`.
46. When the value of `#markdown-input` is `> this is a quote` followed by `> this is another quote` on a new line, `convertMarkdown()` should return `<blockquote>this is a quote</blockquote><blockquote>this is another quote</blockquote>`.
47. When the value of `#markdown-input` is `some text > not a quote anymore`, `convertMarkdown()` should not convert `> not a quote anymore` into a `blockquote` element.
48. When the value of `#markdown-input` is `> **this is a *quote***`, `convertMarkdown()` should return `<blockquote><strong>this is a <em>quote</em></strong></blockquote>`.
49. When the value of `#markdown-input` is `> **this is a *quote***`, `<blockquote><strong>this is a <em>quote</em></strong></blockquote>` should be displayed inside `#html-output`.
50. When the value of `#markdown-input` is `> **this is a *quote***`, you should set the inner HTML of `#preview` to `<blockquote><strong>this is a <em>quote</em></strong></blockquote>`.
51. You should have only one `script` element in your HTML.
