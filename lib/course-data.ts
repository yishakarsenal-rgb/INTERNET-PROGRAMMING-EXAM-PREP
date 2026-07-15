export type QuizQuestion = {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export type Section = {
  id: string
  title: string
  content: string
}

export type Chapter = {
  id: string
  number: number
  title: string
  course: "IP-I" | "IP-II"
  description: string
  objectives: string[]
  sections: Section[]
  quiz: QuizQuestion[]
}

export type Course = {
  id: "IP-I" | "IP-II"
  title: string
  code: string
  description: string
  color: string
  chapters: Chapter[]
}

export const courses: Course[] = [
  {
    id: "IP-I",
    title: "Internet Programming I",
    code: "COSC 3031",
    description: "Covers the foundational technologies of the web: HTML, CSS, and JavaScript for building static and interactive web pages.",
    color: "blue",
    chapters: [
      {
        id: "ip1-ch1",
        number: 1,
        title: "Introduction to Internet Programming",
        course: "IP-I",
        description: "An overview of the Internet, web technologies, and the history of HTML and the WWW.",
        objectives: [
          "Discuss the Internet, its advantages and drawbacks, and major services",
          "Describe major web technologies: web server, browser, protocols",
          "Gather knowledge about the history of the Internet, WWW, and HTML",
          "List and describe the phases in web development",
          "Differentiate between widely used HTML editors",
        ],
        sections: [
          {
            id: "ip1-ch1-s1",
            title: "1.1 The Internet",
            content: `The **Internet** is a global network (WAN) of connected computing resources. No company owns the Internet; it is a cooperative effort governed by a system of standards and rules.

**Key facts:**
- Uses the standard Internet Protocol **TCP/IP** (Transmission Control Protocol / Internet Protocol)
- Every computer on the Internet is identified by a unique **IP Address**
- **DNS (Domain Name Server)** translates domain names (e.g., \`www.google.com\`) into IP addresses

**Advantages of the Internet:**
- Information sharing
- Communication and social networking
- Sharing of resources

**Disadvantages of the Internet:**
- Threat to personal information
- Virus attacks
- Spamming
- Cyber crime

**Intranet vs. Extranet:**
- **Intranet**: A private network within an organization that uses Internet technologies
- **Extranet**: A controlled private network that allows access to partners, vendors, or suppliers`,
          },
          {
            id: "ip1-ch1-s2",
            title: "1.2 Internet-Based Services",
            content: `Internet services are grouped into four categories:

**Communication Services:**
1. **Electronic Mail (Email)** — Protocols: POP (Post Office Protocol), IMAP (Internet Message Access Protocol), SMTP (Simple Mail Transfer Protocol)
2. **Telnet** — Used to log on to a remote computer
3. **Newsgroup** — Forum for discussions; uses NNTP (Network News Transfer Protocol)
4. **Internet Telephony (VoIP)** — Voice calls over the internet
5. **Instant Messaging** — Real-time chat (e.g., WhatsApp, Messenger)
6. **Video Conferencing** — Two-way video/audio communication

**Information Retrieval Services:**
1. **FTP (File Transfer Protocol)** — Standard protocol for file transfer between hosts
2. **Archie** — Database of public FTP sites
3. **Gopher** — Search, retrieve, and display remote documents
4. **VERONICA** — Gopher-based resource index

**Web Services:** Allow exchange of information between applications on the web using the concept of Utility Computing.

**World Wide Web (WWW):** Also called W3. Offers access to documents spread across servers containing texts, graphics, audio, video, and hyperlinks.`,
          },
          {
            id: "ip1-ch1-s3",
            title: "1.3 Basic Web Technologies",
            content: `**Website:** A collection of web pages identified by a common domain name and published on at least one web server.

**URL (Uniform Resource Locator):** A unique identifier used to locate a resource on the Internet. Components:
- **Protocol/Scheme**: \`http\`, \`https\`, \`ftp\`, \`mailto\`
- **Domain name**: e.g., \`techtarget.com\`
- **Port**: Usually hidden; port 80 is default for web
- **Path**: File location on the server, e.g., \`search/query\`
- **Query**: Parameters after \`?\`, e.g., \`?q=URL\`
- **Fragment**: Internal page anchor after \`#\`, e.g., \`#history\`

**Common Domain Extensions:**
| Extension | Meaning |
|-----------|---------|
| .com | Commercial (general use) |
| .net | Network |
| .org | Organization (non-profit) |
| .edu | Education |
| .gov | Government |

**Static vs. Dynamic Websites:**
- **Static**: Same content for all users; built with HTML/CSS/JS
- **Dynamic**: Content changes based on user, time, or database; uses server-side scripting (PHP, Node.js)

**Web Browsers:** Software that retrieves and renders HTML documents (Chrome, Firefox, Safari, Edge)
**Web Servers:** Software that serves web content (Apache, IIS, Nginx)`,
          },
          {
            id: "ip1-ch1-s4",
            title: "1.4 History of HTML & Web Development Phases",
            content: `**HTML Versions:**
| Version | Year | Key Features |
|---------|------|-------------|
| HTML 1.0 | ~1991 | Basic text and images |
| HTML 2.0 | 1995 | Forms, tables, W3C formed |
| HTML 3.2 | 1997 | CSS support, better forms |
| HTML 4.01 | 1999 | External CSS files |
| HTML5 | 2014 | Semantic tags, audio/video, geolocation |

**Web Development Phases:**
1. **Planning** — Define goals, target audience, content
2. **Design** — Wireframes, mockups, style guides
3. **Development** — HTML, CSS, JavaScript coding
4. **Testing** — Cross-browser, responsiveness
5. **Launch** — Publishing to a web server
6. **Maintenance** — Updates, bug fixes

**Types of HTML Editors:**
- **Text editors**: Notepad, VS Code, Sublime Text
- **WYSIWYG editors**: Dreamweaver (What You See Is What You Get)`,
          },
        ],
        quiz: [
          {
            id: "q1",
            question: "What does DNS stand for and what does it do?",
            options: [
              "Domain Name System — translates domain names to IP addresses",
              "Dynamic Network Service — manages dynamic websites",
              "Data Naming Standard — standardizes database naming",
              "Digital Node Server — hosts website files",
            ],
            correctIndex: 0,
            explanation: "DNS stands for Domain Name System (or Server). It translates human-readable domain names like www.google.com into machine-readable IP addresses so browsers can locate websites.",
          },
          {
            id: "q2",
            question: "Which email protocol is primarily a one-way protocol and does NOT sync emails back to the server?",
            options: ["SMTP", "IMAP", "POP", "FTP"],
            correctIndex: 2,
            explanation: "POP (Post Office Protocol) downloads emails to your local device and is primarily one-way — it does not sync back to the server. IMAP provides two-way synchronization.",
          },
          {
            id: "q3",
            question: "What is the correct URL component that follows a `?` sign?",
            options: ["Fragment", "Path", "Query parameters", "Port"],
            correctIndex: 2,
            explanation: "Query parameters follow the `?` in a URL and are used to pass data to the server. For example, in `?q=URL`, `q=URL` is a query parameter.",
          },
          {
            id: "q4",
            question: "Which version of HTML introduced semantic elements like `<header>`, `<footer>`, `<article>`, and `<section>`?",
            options: ["HTML 2.0", "HTML 3.2", "HTML 4.01", "HTML5"],
            correctIndex: 3,
            explanation: "HTML5, released for public use in 2014, introduced semantic/structural elements like <header>, <footer>, <article>, <section>, and <figure>, as well as audio/video support and geolocation.",
          },
          {
            id: "q5",
            question: "Which Internet service uses the NNTP protocol?",
            options: ["Email", "FTP", "Newsgroups", "VoIP"],
            correctIndex: 2,
            explanation: "Newsgroups use the NNTP (Network News Transfer Protocol) for Internet-based discussion forums where users share text, images, and other content.",
          },
        ],
      },
      {
        id: "ip1-ch2",
        number: 2,
        title: "HTML Basics",
        course: "IP-I",
        description: "Covers the structure of HTML documents, text formatting, lists, tables, links, forms, images, and multimedia.",
        objectives: [
          "Discuss the basic structure of an HTML document",
          "Define markup language",
          "List and describe commonly used HTML tags",
          "Differentiate between HTML elements and attributes",
          "Design layouts using table and frame tags",
        ],
        sections: [
          {
            id: "ip1-ch2-s1",
            title: "2.1 Basic Structure of an HTML File",
            content: `**HTML (HyperText Markup Language)** is the standard markup language for web pages. It is NOT a programming language — it is a **markup language** that defines the structure of content.

**Basic HTML skeleton:**
\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Page Title</title>
  </head>
  <body>
    <!-- Content goes here -->
  </body>
</html>
\`\`\`

**Key structural tags:**
| Tag | Purpose |
|-----|---------|
| \`<!DOCTYPE html>\` | Declares HTML5 document type |
| \`<html>\` | Root element of the page |
| \`<head>\` | Contains meta information (not visible) |
| \`<title>\` | Sets the browser tab title |
| \`<meta>\` | Metadata about the document |
| \`<body>\` | Visible page content |

**HTML Tag Rules:**
1. Tags are enclosed in angle brackets: \`<tag>\`
2. Most tags come in pairs: \`<p>...</p>\`
3. Some are self-closing (void): \`<br>\`, \`<hr>\`, \`<img>\`
4. Tags can have **attributes**: \`<img src="photo.jpg" alt="A photo">\`
5. Use lowercase tags (W3C recommendation)`,
          },
          {
            id: "ip1-ch2-s2",
            title: "2.2 Text Formatting & Colors",
            content: `**Heading Tags (h1–h6):**
\`\`\`html
<h1>Main Heading</h1>
<h2>Sub Heading</h2>
<h3>Sub-sub Heading</h3>
\`\`\`

**Text Formatting Tags:**
| Tag | Effect |
|-----|--------|
| \`<b>\` / \`<strong>\` | **Bold** |
| \`<i>\` / \`<em>\` | *Italic* |
| \`<u>\` | Underline |
| \`<s>\` / \`<del>\` | ~~Strikethrough~~ |
| \`<sup>\` | Superscript (x²) |
| \`<sub>\` | Subscript (H₂O) |
| \`<mark>\` | Highlighted text |
| \`<pre>\` | Preformatted text (preserves spaces) |

**Useful Tags:**
- \`<p>\` — Paragraph
- \`<br>\` — Line break
- \`<hr>\` — Horizontal rule (line)
- \`<blockquote>\` — Long quotation
- \`<abbr title="...">\` — Abbreviation with tooltip

**HTML Colors:**
Colors are defined using:
- **Hex codes**: \`#FF0000\` (red), \`#00FF00\` (green)
- **RGB values**: \`rgb(255, 0, 0)\`
- **Named colors**: \`red\`, \`blue\`, \`DarkCyan\``,
          },
          {
            id: "ip1-ch2-s3",
            title: "2.3 Lists, Tables & Links",
            content: `**Lists:**
\`\`\`html
<!-- Unordered list -->
<ul>
  <li>Item One</li>
  <li>Item Two</li>
</ul>

<!-- Ordered list -->
<ol>
  <li>First</li>
  <li>Second</li>
</ol>

<!-- Definition list -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
</dl>
\`\`\`

**Tables:**
\`\`\`html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>22</td>
  </tr>
</table>
\`\`\`
- \`<table>\` — Table container
- \`<tr>\` — Table row
- \`<th>\` — Table header cell (bold, centered)
- \`<td>\` — Table data cell
- \`colspan\` / \`rowspan\` attributes — Merge cells

**Links (Anchors):**
\`\`\`html
<!-- External link -->
<a href="https://www.google.com">Visit Google</a>

<!-- Internal link -->
<a href="about.html">About Page</a>

<!-- Email link -->
<a href="mailto:info@example.com">Email Us</a>

<!-- Link in new tab -->
<a href="https://www.google.com" target="_blank">Google</a>

<!-- Jump to section (anchor) -->
<a href="#section1">Go to Section 1</a>
<h2 id="section1">Section 1</h2>
\`\`\``,
          },
          {
            id: "ip1-ch2-s4",
            title: "2.4 Forms, Images & Multimedia",
            content: `**Forms:**
\`\`\`html
<form action="submit.php" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email">

  <input type="password" name="pwd">
  <input type="radio" name="gender" value="male"> Male
  <input type="checkbox" name="agree" value="yes"> I agree
  <select name="country">
    <option value="et">Ethiopia</option>
  </select>
  <textarea name="message" rows="4"></textarea>
  <input type="submit" value="Submit">
</form>
\`\`\`

**Images:**
\`\`\`html
<img src="photo.jpg" alt="Description" width="300" height="200">
\`\`\`
- \`src\` — Image source (URL or path)
- \`alt\` — Alternative text (accessibility)
- \`width\` / \`height\` — Dimensions

**Audio & Video (HTML5):**
\`\`\`html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>

<video controls width="640">
  <source src="video.mp4" type="video/mp4">
</video>
\`\`\``,
          },
        ],
        quiz: [
          {
            id: "q1",
            question: "Which tag is used to create a hyperlink in HTML?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correctIndex: 1,
            explanation: "The <a> (anchor) tag is used to create hyperlinks. The href attribute specifies the URL destination. Example: <a href='https://example.com'>Click here</a>",
          },
          {
            id: "q2",
            question: "What does the `alt` attribute in an `<img>` tag do?",
            options: [
              "Sets the image alignment",
              "Provides alternative text for screen readers and when image fails to load",
              "Sets the image file type",
              "Adds a tooltip on hover",
            ],
            correctIndex: 1,
            explanation: "The alt attribute provides alternative text displayed when an image cannot load and read by screen readers for accessibility. It is also important for SEO.",
          },
          {
            id: "q3",
            question: "Which HTML tag creates a table header cell (bold and centered by default)?",
            options: ["<td>", "<tr>", "<th>", "<thead>"],
            correctIndex: 2,
            explanation: "<th> (table header) creates header cells that are bold and centered by default. <td> creates regular data cells, and <tr> creates table rows.",
          },
          {
            id: "q4",
            question: "What is the correct HTML5 doctype declaration?",
            options: [
              '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">',
              "<!DOCTYPE html5>",
              "<!DOCTYPE html>",
              "<html doctype='5'>",
            ],
            correctIndex: 2,
            explanation: "HTML5 uses the simplified doctype: <!DOCTYPE html>. Previous versions required longer declarations including the DTD reference.",
          },
          {
            id: "q5",
            question: "Which input type would you use for a password field?",
            options: [
              '<input type="text">',
              '<input type="hidden">',
              '<input type="password">',
              '<input type="secure">',
            ],
            correctIndex: 2,
            explanation: '<input type="password"> creates a field where characters are masked (shown as dots/asterisks) to protect the password from being seen on screen.',
          },
        ],
      },
      {
        id: "ip1-ch3",
        number: 3,
        title: "CSS Basics",
        course: "IP-I",
        description: "Covers Cascading Style Sheets: syntax, selectors, properties, the box model, and layout techniques.",
        objectives: [
          "Discuss basic concepts of CSS and types of CSS inclusion",
          "List and describe selector types",
          "Describe properties and values of CSS",
          "Design attractive layouts using CSS",
          "Style HTML elements as professional websites do",
        ],
        sections: [
          {
            id: "ip1-ch3-s1",
            title: "3.1 CSS Basics & Advantages",
            content: `**CSS (Cascading Style Sheets)** defines rules specifying how HTML elements should look. It separates content (HTML) from presentation (CSS).

**Why CSS?**
HTML was never intended for formatting. Adding style with CSS:
- **Faster page speed** — Less code, more reuse
- **Better user experience** — Organized, readable layouts
- **Quick development** — One CSS file styles many pages
- **Easy changes** — Update one file to change the whole site
- **Device compatibility** — Responsive design for all screens

**CSS Syntax:**
\`\`\`css
selector {
  property: value;
  property: value;
}
\`\`\`
Example:
\`\`\`css
p {
  color: red;
  text-align: center;
}
\`\`\`

**Cascading Order (highest to lowest priority):**
1. Inline styles (\`style="..."\`)
2. External / Internal stylesheets
3. Browser defaults`,
          },
          {
            id: "ip1-ch3-s2",
            title: "3.2 Types of CSS Inclusion",
            content: `There are three ways to add CSS to HTML:

**1. Inline CSS** (lowest reusability):
\`\`\`html
<p style="color: red; font-size: 16px;">Hello</p>
\`\`\`

**2. Internal CSS** (inside \`<head>\`):
\`\`\`html
<head>
  <style>
    p { color: blue; }
  </style>
</head>
\`\`\`

**3. External CSS** (recommended):
\`\`\`html
<!-- In HTML file -->
<link rel="stylesheet" href="styles.css">
\`\`\`
\`\`\`css
/* styles.css */
p {
  color: green;
  font-size: 18px;
}
\`\`\`

**CSS Versions:** CSS3 is the current standard. It includes everything from CSS1 and CSS2 plus new features like animations, transitions, and flexbox.`,
          },
          {
            id: "ip1-ch3-s3",
            title: "3.3 Selectors",
            content: `**Types of CSS Selectors:**

| Selector | Syntax | Description |
|----------|--------|-------------|
| Type/Element | \`p { }\` | Selects all \`<p>\` elements |
| Class | \`.box { }\` | Selects elements with \`class="box"\` |
| ID | \`#header { }\` | Selects element with \`id="header"\` |
| Universal | \`* { }\` | Selects ALL elements |
| Descendant | \`div p { }\` | Selects \`<p>\` inside any \`<div>\` |
| Child | \`div > p { }\` | Selects direct \`<p>\` children of \`<div>\` |
| Adjacent | \`h2 + p { }\` | Selects \`<p>\` immediately after \`<h2>\` |
| Attribute | \`a[href] { }\` | Selects \`<a>\` with an \`href\` attribute |

**Pseudo-classes:**
\`\`\`css
a:hover { color: red; }       /* Mouse over link */
a:visited { color: purple; }  /* Visited link */
input:checked { }              /* Checked checkbox */
div:not(#main) { }            /* All divs except #main */
\`\`\`

**Pseudo-elements:**
\`\`\`css
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }
\`\`\`

**Naming with class and id:**
\`\`\`html
<div class="card">...</div>   <!-- class: reusable -->
<div id="navbar">...</div>    <!-- id: unique per page -->
\`\`\``,
          },
          {
            id: "ip1-ch3-s4",
            title: "3.4 CSS Properties, Units & Layout",
            content: `**Common CSS Units:**
| Unit | Description | Example |
|------|-------------|---------|
| \`px\` | Pixels (1/96th of an inch) | \`font-size: 16px\` |
| \`%\` | Relative to parent | \`width: 50%\` |
| \`em\` | Relative to parent font-size | \`padding: 1.5em\` |
| \`rem\` | Relative to root font-size | \`font-size: 1rem\` |

**Key CSS Properties:**
\`\`\`css
/* Color */
color: red;
background-color: #f0f0f0;

/* Typography */
font-family: Arial, sans-serif;
font-size: 16px;
font-weight: bold;
text-align: center;
line-height: 1.5;

/* Box Model */
width: 300px;
height: 200px;
padding: 10px 20px;   /* top/bottom, left/right */
margin: 0 auto;        /* center block element */
border: 1px solid #ccc;

/* Display */
display: block;
display: inline;
display: flex;
display: none;

/* Position */
position: relative;
position: absolute;
position: fixed;
\`\`\`

**CSS Box Model:**
Every element has: Content → Padding → Border → Margin
\`\`\`
+-----------margin----------+
|  +--------border--------+ |
|  |  +----padding-----+  | |
|  |  |    CONTENT     |  | |
|  |  +----------------+  | |
|  +------------------------+ |
+----------------------------+
\`\`\``,
          },
        ],
        quiz: [
          {
            id: "q1",
            question: "Which CSS selector targets an element with id='main'?",
            options: [".main", "#main", "main", "*main"],
            correctIndex: 1,
            explanation: "The # symbol is used for ID selectors in CSS. So #main targets the element with id='main'. The . is used for class selectors.",
          },
          {
            id: "q2",
            question: "What is the correct cascading priority order (highest to lowest)?",
            options: [
              "Browser default → Internal → Inline",
              "Inline → External/Internal → Browser default",
              "External → Inline → Browser default",
              "Internal → Inline → External",
            ],
            correctIndex: 1,
            explanation: "CSS cascading priority from highest to lowest: 1) Inline styles (style attribute), 2) External and internal stylesheets, 3) Browser defaults.",
          },
          {
            id: "q3",
            question: "Which CSS property controls the space INSIDE an element's border?",
            options: ["margin", "spacing", "padding", "border-spacing"],
            correctIndex: 2,
            explanation: "Padding is the space between an element's content and its border. Margin is the space OUTSIDE the border (between the element and neighboring elements).",
          },
          {
            id: "q4",
            question: "What does the CSS `rem` unit measure relative to?",
            options: [
              "The parent element's font size",
              "The viewport width",
              "The root (html) element's font size",
              "The current element's width",
            ],
            correctIndex: 2,
            explanation: "rem (root em) is always relative to the font-size of the root <html> element (default 16px in browsers). Unlike em, it ignores parent element sizes, making it more predictable.",
          },
          {
            id: "q5",
            question: "Which selector targets all `<a>` elements that are INSIDE a `<li>` element?",
            options: ["a + li", "a > li", "li a", "li.a"],
            correctIndex: 2,
            explanation: "The descendant selector 'li a' targets any <a> element that is a descendant (child, grandchild, etc.) of an <li>. 'li > a' would only target direct children.",
          },
        ],
      },
      {
        id: "ip1-ch4",
        number: 4,
        title: "JavaScript Basics",
        course: "IP-I",
        description: "Covers client-side scripting, JavaScript syntax, variables, data types, control flow, DOM manipulation, and event handling.",
        objectives: [
          "Define scripting language vs. programming language",
          "Understand client-side scripting and use JS",
          "Understand basic JS syntax",
          "Solve programming problems using JS",
          "Manipulate the DOM and handle user events",
        ],
        sections: [
          {
            id: "ip1-ch4-s1",
            title: "4.1 Client-Side Scripting",
            content: `**Scripting Language:** A language that does not need a compilation step — it is interpreted at runtime.

**Two types of scripting:**
| Type | Where it runs | Examples |
|------|--------------|---------|
| **Client-side** | User's browser | JavaScript |
| **Server-side** | Web server | PHP, Python, Node.js, Perl, Ruby |

**JavaScript characteristics:**
- Lightweight, powerful scripting language
- Loosely typed (no need to declare variable types)
- Originally created to communicate only with web browsers
- Now used everywhere: servers (Node.js), mobile apps, desktop apps

**The 3 layers of a web page:**
1. **HTML** — Structural layer (content)
2. **CSS** — Presentational layer (appearance)
3. **JavaScript** — Behavioral layer (interactivity)

**Adding JavaScript to a page:**
\`\`\`html
<!-- Inline -->
<button onclick="alert('Hello!')">Click Me</button>

<!-- Embedded -->
<script>
  alert('Hello World!');
</script>

<!-- External (recommended) -->
<script src="script.js"></script>
\`\`\`
Best practice: Place \`<script>\` tags just before \`</body>\` for performance.`,
          },
          {
            id: "ip1-ch4-s2",
            title: "4.2 JavaScript Syntax — Variables & Data Types",
            content: `**Variables:** Containers for storing data.
\`\`\`javascript
var name = "Alice";    // function-scoped (older)
let age = 22;          // block-scoped (modern)
const PI = 3.14;       // block-scoped, constant (modern)
\`\`\`

**Variable naming rules:**
- Must start with a letter or underscore (\`_\`)
- Can contain letters, digits, underscores
- Cannot contain spaces or special characters (\`! . , / + * = \`)
- Case-sensitive: \`myVar\` ≠ \`MyVar\`

**Data Types:**
| Type | Example | Description |
|------|---------|-------------|
| **Number** | \`42\`, \`3.14\` | Integers and floats |
| **String** | \`"Hello"\` | Text in quotes |
| **Boolean** | \`true\`, \`false\` | True/false values |
| **Null** | \`null\` | Intentionally empty |
| **Undefined** | \`undefined\` | Declared but no value |
| **Array** | \`[1, 2, 3]\` | Ordered collection |
| **Object** | \`{name: "A"}\` | Key-value pairs |

**Comments:**
\`\`\`javascript
// Single-line comment
/* Multi-line
   comment */
\`\`\``,
          },
          {
            id: "ip1-ch4-s3",
            title: "4.3 Control Flow & Operators",
            content: `**Comparison Operators:**
\`\`\`javascript
== // equal value
=== // equal value AND type (strict)
!= // not equal
> // greater than
< // less than
>= // greater than or equal
\`\`\`

**Conditional Statements:**
\`\`\`javascript
if (age >= 18) {
  console.log("Adult");
} else if (age >= 13) {
  console.log("Teenager");
} else {
  console.log("Child");
}

// Switch
switch (day) {
  case "Monday": console.log("Start of week"); break;
  case "Friday": console.log("End of week"); break;
  default: console.log("Mid week");
}
\`\`\`

**Loops:**
\`\`\`javascript
// for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while loop
let count = 0;
while (count < 5) {
  count++;
}

// forEach (arrays)
[1, 2, 3].forEach(num => console.log(num));
\`\`\``,
          },
          {
            id: "ip1-ch4-s4",
            title: "4.4 DOM Manipulation & Events",
            content: `**DOM (Document Object Model):** A tree representation of the HTML page that JavaScript can access and modify.

**Selecting elements:**
\`\`\`javascript
document.getElementById("myId")
document.querySelector(".myClass")
document.querySelectorAll("p")
\`\`\`

**Modifying elements:**
\`\`\`javascript
// Change text content
element.textContent = "New text";
element.innerHTML = "<b>Bold text</b>";

// Change styles
element.style.color = "red";
element.style.display = "none";

// Change attributes
element.setAttribute("src", "new.jpg");
element.getAttribute("href");

// Add/remove CSS classes
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("open");
\`\`\`

**Event Handlers:**
\`\`\`javascript
// Method 1: addEventListener (recommended)
button.addEventListener("click", function() {
  alert("Button clicked!");
});

// Common events
// click, dblclick, mouseover, mouseout
// keydown, keyup, keypress
// submit, change, focus, blur
// load, resize
\`\`\`

**Example — Form Validation:**
\`\`\`javascript
document.getElementById("myForm").addEventListener("submit", function(e) {
  const name = document.getElementById("name").value;
  if (name === "") {
    e.preventDefault(); // Stop form submission
    alert("Name is required!");
  }
});
\`\`\``,
          },
        ],
        quiz: [
          {
            id: "q1",
            question: "What is the difference between `==` and `===` in JavaScript?",
            options: [
              "There is no difference",
              "== checks value only; === checks both value AND type",
              "=== checks value only; == checks both value and type",
              "== is for numbers; === is for strings",
            ],
            correctIndex: 1,
            explanation: "== (loose equality) compares values after type coercion (e.g., '5' == 5 is true). === (strict equality) requires both the same value AND same type (e.g., '5' === 5 is false).",
          },
          {
            id: "q2",
            question: "Which keyword declares a block-scoped variable that CANNOT be reassigned?",
            options: ["var", "let", "const", "static"],
            correctIndex: 2,
            explanation: "const declares a block-scoped constant — the variable binding cannot be reassigned. Note: for objects/arrays declared with const, the contents can still be mutated.",
          },
          {
            id: "q3",
            question: "What does `document.getElementById('btn')` return if no element with id='btn' exists?",
            options: ["An empty string", "0", "null", "undefined"],
            correctIndex: 2,
            explanation: "getElementById returns null if no matching element is found. This is important to check before calling methods on the result to avoid 'Cannot read properties of null' errors.",
          },
          {
            id: "q4",
            question: "Which is the recommended way to place `<script>` tags for best performance?",
            options: [
              "Inside the <head> tag",
              "At the very beginning of <body>",
              "Just before the closing </body> tag",
              "After the </html> tag",
            ],
            correctIndex: 2,
            explanation: "Placing scripts just before </body> is best practice because the HTML/DOM will be fully parsed before scripts execute, and script downloading won't block page rendering.",
          },
          {
            id: "q5",
            question: "Which method adds an event listener to a DOM element?",
            options: [
              "element.on('click', fn)",
              "element.addEventListener('click', fn)",
              "element.addEvent('click', fn)",
              "element.onClick = fn",
            ],
            correctIndex: 1,
            explanation: "addEventListener() is the modern, recommended method for attaching event handlers. It allows multiple listeners on the same element for the same event type.",
          },
        ],
      },
    ],
  },
  {
    id: "IP-II",
    title: "Internet Programming II",
    code: "COSC 3032",
    description: "Covers server-side web development with PHP: fundamentals, state management (cookies & sessions), and PHP-MySQL database connectivity.",
    color: "emerald",
    chapters: [
      {
        id: "ip2-ch5",
        number: 5,
        title: "PHP Programming Fundamentals",
        course: "IP-II",
        description: "Covers PHP introduction, syntax, variables, data types, constants, and operators.",
        objectives: [
          "Understand what PHP is and its advantages",
          "Understand basic PHP syntax",
          "Declare and initialize variables and constants",
          "Know and use PHP data types",
          "Understand and use basic operator types",
        ],
        sections: [
          {
            id: "ip2-ch5-s1",
            title: "5.1 Introduction to PHP",
            content: `**PHP (Hypertext Preprocessor)** is a general-purpose server-side scripting language originally created by Rasmus Lerdorf in 1994. PHP used to stand for "Personal Home Page."

**Key facts:**
- Open source and free
- Server-side: executes on the web server
- Embedded in HTML
- Weakly/dynamically typed language
- Powers: WordPress, Facebook, Drupal, Wikipedia

**What can PHP do?**
- Create, read, write, delete files on the server
- Collect form data
- Send and receive cookies
- Add, delete, modify database data
- Encrypt data
- Control user access

**Advantages of PHP:**
1. **Open Source** — Free and large community
2. **Platform Independent** — Runs on Windows, Linux, macOS
3. **Simple and Easy** — Gentle learning curve
4. **Database Integration** — Connects easily to MySQL and others
5. **Fast** — Efficient execution, loads fast
6. **MVC Support** — Clean code architecture
7. **Security** — Built-in features to prevent SQL injection
8. **Stable** — Mature language with reliable updates`,
          },
          {
            id: "ip2-ch5-s2",
            title: "5.2 PHP Script Basic Syntax",
            content: `**Three key differences from an HTML file:**
1. PHP files must be saved with **.php** extension
2. PHP code is placed inside **\`<?php ... ?>\`** tags
3. PHP must be run through a **PHP-enabled web server**

**Basic PHP script:**
\`\`\`php
<!DOCTYPE html>
<html>
<body>

<h1>My first PHP page</h1>

<?php
echo "Hello World!";
?>

</body>
</html>
\`\`\`

**Output functions:**
\`\`\`php
echo "Hello World!";     // Can output multiple strings, no return value
print "Hello World!";    // Can output one string, returns 1
\`\`\`

**Statements** end with a semicolon \`;\`

**Comments:**
\`\`\`php
// Single-line comment
# Another single-line comment
/* Multi-line
   comment */
\`\`\`

**Case Sensitivity Rules:**
- Keywords, functions, classes: **NOT case-sensitive** (\`echo\` = \`ECHO\`)
- Variables: **CASE-SENSITIVE** (\`$color\` ≠ \`$COLOR\`)`,
          },
          {
            id: "ip2-ch5-s3",
            title: "5.3 Variables, Data Types & Constants",
            content: `**Variables in PHP:**
- Start with \`$\` sign
- Must begin with a letter or underscore
- Cannot start with a number
- Only alphanumeric characters and underscores
- Case-sensitive

\`\`\`php
<?php
$txt = "Hello World";
$x = 5;
$y = 10.5;
?>
\`\`\`

**PHP Data Types:**
| Type | Example | Description |
|------|---------|-------------|
| Integer | \`42\`, \`-10\` | Whole numbers |
| Float/Double | \`3.14\`, \`2.5e3\` | Decimal numbers |
| String | \`"Hello"\` | Text |
| Boolean | \`true\`, \`false\` | True/false |
| Array | \`array(1, 2, 3)\` | Multiple values |
| Object | \`new MyClass()\` | Instance of a class |
| NULL | \`null\` | No value |
| Resource | DB connection | External resource |

**Variable Scope:**
\`\`\`php
$globalVar = "I'm global";

function myFunction() {
  $localVar = "I'm local";        // Only inside function
  global $globalVar;               // Access global var
  static $counter = 0;            // Persists between calls
}
\`\`\`

**Superglobal Variables (available everywhere):**
- \`$_SERVER\` — Server/environment information
- \`$_GET\` — URL query parameters
- \`$_POST\` — Form POST data
- \`$_SESSION\` — Session data
- \`$_COOKIE\` — Cookie data
- \`$GLOBALS\` — All global variables`,
          },
          {
            id: "ip2-ch5-s4",
            title: "5.4 Operators in PHP",
            content: `**Arithmetic Operators:**
\`\`\`php
$a + $b   // Addition
$a - $b   // Subtraction
$a * $b   // Multiplication
$a / $b   // Division
$a % $b   // Modulus (remainder)
$a ** $b  // Exponentiation (PHP 5.6+)
\`\`\`

**Assignment Operators:**
\`\`\`php
$x = 5;     // Assign
$x += 3;    // $x = $x + 3  → 8
$x -= 2;    // $x = $x - 2  → 6
$x *= 4;    // $x = $x * 4  → 24
$x /= 6;    // $x = $x / 6  → 4
$x .= "!";  // String concatenation assign
\`\`\`

**Comparison Operators:**
\`\`\`php
$a == $b   // Equal (value only)
$a === $b  // Identical (value AND type)
$a != $b   // Not equal
$a !== $b  // Not identical
$a > $b    // Greater than
$a < $b    // Less than
\`\`\`

**Logical Operators:**
\`\`\`php
$a && $b   // AND
$a || $b   // OR
!$a        // NOT
$a and $b  // AND (lower precedence)
$a or $b   // OR (lower precedence)
\`\`\`

**String Operator:**
\`\`\`php
$greeting = "Hello" . " " . "World!";  // Concatenation (.)
$name .= " Smith";                       // Concatenation assign
\`\`\``,
          },
        ],
        quiz: [
          {
            id: "q1",
            question: "What file extension must PHP files use?",
            options: [".html", ".php", ".phps", ".phtml"],
            correctIndex: 1,
            explanation: "PHP files must be saved with a .php extension. This tells the web server to process the file through the PHP interpreter before sending the output to the browser.",
          },
          {
            id: "q2",
            question: "Which of the following is a valid PHP variable name?",
            options: ["$123var", "$my-variable", "$_myVar", "$my variable"],
            correctIndex: 2,
            explanation: "$_myVar is valid — it starts with an underscore which is allowed. $123var starts with a number (invalid), $my-variable contains a hyphen (invalid), and $my variable has a space (invalid).",
          },
          {
            id: "q3",
            question: "In PHP, variables are _____ but functions are _____.",
            options: [
              "case-sensitive; also case-sensitive",
              "case-sensitive; NOT case-sensitive",
              "NOT case-sensitive; case-sensitive",
              "NOT case-sensitive; also NOT case-sensitive",
            ],
            correctIndex: 1,
            explanation: "PHP variables ARE case-sensitive ($name ≠ $NAME). However, function names, class names, and keywords are NOT case-sensitive (echo = ECHO = Echo).",
          },
          {
            id: "q4",
            question: "Which superglobal variable contains data submitted via an HTML form using the POST method?",
            options: ["$_GET", "$_REQUEST", "$_POST", "$_FORM"],
            correctIndex: 2,
            explanation: "$_POST contains data submitted through HTML forms using method='POST'. $_GET contains data from URL query parameters. Both are superglobal arrays accessible anywhere in PHP.",
          },
          {
            id: "q5",
            question: "What is the PHP string concatenation operator?",
            options: ["+", "&", ".", "~"],
            correctIndex: 2,
            explanation: "PHP uses the dot (.) operator for string concatenation. Example: $greeting = 'Hello' . ' ' . 'World!'; The .= operator appends to an existing string.",
          },
        ],
      },
      // ---- Ch.6: State Management (Cookies & Sessions) ----
      {
        id: "ip2-ch6",
        number: 6,
        title: "State Management in PHP",
        course: "IP-II",
        description: "Covers HTTP state management in PHP: cookies for persistent client storage and sessions for server-side user state tracking.",
        objectives: [
          "Understand why HTTP is stateless and why state management is needed",
          "Create, read, and delete cookies using PHP",
          "Start and manage PHP sessions",
          "Compare cookies vs. sessions and know when to use each",
          "Implement a simple login system using sessions",
        ],
        sections: [
          {
            id: "ip2-ch6-s1",
            title: "6.1 HTTP State & Cookies",
            content: `**HTTP is stateless** — each request is independent; the server has no memory of previous requests. State management solves this problem.

**What are Cookies?**
A **cookie** is a small file (up to 4KB) stored in the **user's browser**. PHP sends it with the HTTP response header; the browser sends it back with every subsequent request.

**Setting a cookie:**
\`\`\`php
<?php
// setcookie(name, value, expiry, path, domain, secure, httponly)
setcookie("username", "Abebe", time() + 86400, "/");  // expires in 1 day
// Must be called BEFORE any HTML output
?>
\`\`\`

**Reading a cookie:**
\`\`\`php
<?php
if (isset($_COOKIE["username"])) {
    echo "Welcome back, " . $_COOKIE["username"] . "!";
} else {
    echo "First time visitor.";
}
?>
\`\`\`

**Deleting a cookie:**
\`\`\`php
<?php
// Set expiry to the past to delete
setcookie("username", "", time() - 3600, "/");
?>
\`\`\`

**Cookie properties:**
| Property | Purpose |
|----------|---------|
| \`name\` | Cookie identifier |
| \`value\` | Data to store (string) |
| \`expires\` | Unix timestamp when cookie expires (0 = session) |
| \`path\` | URL path cookie is valid for ("/") |
| \`httponly\` | True = not accessible via JavaScript (security) |
| \`secure\` | True = only sent over HTTPS |`,
          },
          {
            id: "ip2-ch6-s2",
            title: "6.2 PHP Sessions",
            content: `**What is a Session?**
A **session** stores data on the **server** and gives the browser a unique **session ID** (stored as a cookie named \`PHPSESSID\`). Sessions are more secure than cookies because data lives server-side.

**Starting a session:**
\`\`\`php
<?php
session_start();  // Must be the FIRST thing in the file
?>
\`\`\`

**Storing session data:**
\`\`\`php
<?php
session_start();
$_SESSION["username"] = "Abebe";
$_SESSION["role"]     = "admin";
$_SESSION["logged_in"] = true;
?>
\`\`\`

**Reading session data:**
\`\`\`php
<?php
session_start();

if (isset($_SESSION["logged_in"]) && $_SESSION["logged_in"] === true) {
    echo "Hello, " . $_SESSION["username"] . "! Your role: " . $_SESSION["role"];
} else {
    header("Location: login.php");
    exit();
}
?>
\`\`\`

**Destroying a session (logout):**
\`\`\`php
<?php
session_start();
session_unset();    // Remove all session variables
session_destroy();  // Destroy the session file on server
header("Location: login.php");
exit();
?>
\`\`\`

**Simple Login System Example:**
\`\`\`php
// login.php
<?php
session_start();
if ($_POST["username"] === "admin" && $_POST["password"] === "1234") {
    $_SESSION["logged_in"] = true;
    $_SESSION["username"]  = $_POST["username"];
    header("Location: dashboard.php");
} else {
    echo "Invalid credentials.";
}
?>
\`\`\`

**Cookies vs. Sessions:**
| Feature | Cookies | Sessions |
|---------|---------|---------|
| Storage location | Browser (client) | Server |
| Size limit | ~4 KB | No practical limit |
| Security | Less secure (user can modify) | More secure |
| Lifetime | Set by expiry time | Until browser closes or session_destroy() |
| Use case | Remember preferences | Login state, cart, user data |`,
          },
        ],
        quiz: [
          {
            id: "q1",
            question: "Where are PHP session variables stored?",
            options: [
              "In the user's browser as a cookie",
              "On the web server",
              "In the MySQL database",
              "In a JavaScript variable",
            ],
            correctIndex: 1,
            explanation: "PHP sessions store data on the server. Only the session ID is sent to the browser (as a cookie named PHPSESSID). The actual $_SESSION data lives in a server-side file.",
          },
          {
            id: "q2",
            question: "Which function must be called before using $_SESSION variables?",
            options: ["session_init()", "session_open()", "session_start()", "start_session()"],
            correctIndex: 2,
            explanation: "session_start() must be called at the very top of the PHP file (before any HTML output) to initialize or resume a session. Without it, $_SESSION is not available.",
          },
          {
            id: "q3",
            question: "What is the maximum size of data a cookie can store?",
            options: ["1 KB", "4 KB", "16 KB", "Unlimited"],
            correctIndex: 1,
            explanation: "Cookies are limited to approximately 4 KB of data per cookie. This is why sessions (stored on the server) are used for larger amounts of user data.",
          },
          {
            id: "q4",
            question: "To delete a cookie in PHP, you should:",
            options: [
              "Call deletecookie('name')",
              "Use unset($_COOKIE['name'])",
              "Call setcookie() with an expiry time in the past",
              "Set the cookie value to NULL",
            ],
            correctIndex: 2,
            explanation: "To delete a cookie, call setcookie() with the same name and an expiry time in the past (e.g., time() - 3600). This tells the browser to remove the cookie.",
          },
          {
            id: "q5",
            question: "Which statement about cookies vs. sessions is TRUE?",
            options: [
              "Cookies are more secure than sessions",
              "Sessions can store more data than cookies",
              "Cookies are stored on the server",
              "Sessions expire when the browser is opened",
            ],
            correctIndex: 1,
            explanation: "Sessions are stored on the server and have no practical size limit, making them suitable for large amounts of data. Cookies are stored client-side and limited to ~4 KB.",
          },
        ],
      },
      {
        id: "ip2-ch7",
        number: 7,
        title: "PHP & MySQL Database",
        course: "IP-II",
        description: "Covers relational database concepts, MySQL, PHP-MySQL connectivity, CRUD operations, and database security.",
        objectives: [
          "Understand relational database concepts",
          "Understand MySQL DBMS",
          "Write PHP code to connect to MySQL",
          "Create, alter, and delete tables in MySQL",
          "Perform CRUD operations using PHP and MySQL",
          "Secure your MySQL database",
        ],
        sections: [
          {
            id: "ip2-ch7-s1",
            title: "7.1 Relational Database Concepts",
            content: `**Relational Database:** Organizes data into **tables** (relations) with rows and columns.

**Key Terms:**
| Term | Definition |
|------|-----------|
| **Table** | A grid of rows and columns (like a spreadsheet) |
| **Column (Field)** | A category of data (Name, Age, Email) |
| **Row (Record)** | One entry in the table |
| **Primary Key** | Unique identifier for each row |
| **Foreign Key** | Key in one table that references another table's primary key |
| **Schema** | Blueprint/design of all tables in a database |

**Example — Customers table:**
| CustomerID | Name | Address | City |
|-----------|------|---------|------|
| 1 | Julie Smith | 25 Oak Street | Airport West |
| 2 | Alan Wong | 1/47 Haines Ave | Box Hill |

**Types of Relationships:**
- **One-to-One**: One row in Table A relates to one row in Table B
- **One-to-Many**: One row in Table A relates to many rows in Table B (most common, e.g., one Customer → many Orders)
- **Many-to-Many**: Requires a junction/bridge table (e.g., Books ↔ Authors)

**Database Design Tips:**
- Think about real-world objects you're modeling
- Avoid storing redundant data (causes insert/update/delete anomalies)
- Use atomic column values (one piece of info per column)
- Choose sensible keys
- Think about what queries you'll need`,
          },
          {
            id: "ip2-ch7-s2",
            title: "7.2 MySQL & SQL Basics",
            content: `**MySQL** is an open-source relational database management system (RDBMS). Used by Facebook, Twitter, YouTube, WordPress.

**XAMPP** provides MySQL + phpMyAdmin for local development.

**Creating a database:**
\`\`\`sql
CREATE DATABASE Bookstore;
\`\`\`

**Creating a table:**
\`\`\`sql
CREATE TABLE Customers (
    CustomerID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name       CHAR(50) NOT NULL,
    Address    CHAR(100) NOT NULL,
    City       CHAR(30) NOT NULL
);
\`\`\`

**INSERT — Adding data:**
\`\`\`sql
INSERT INTO Customers VALUES (NULL, 'Julie Smith', '25 Oak Street', 'Airport West');

-- Insert specific columns
INSERT INTO Customers (Name, City) VALUES ('Melissa Jones', 'Nar Nar Goon');
\`\`\`

**SELECT — Querying data:**
\`\`\`sql
SELECT * FROM Customers;
SELECT Name, City FROM Customers;
SELECT * FROM Orders WHERE CustomerID = 3;
SELECT * FROM Customers ORDER BY Name ASC;
SELECT * FROM Customers LIMIT 10;

-- JOIN
SELECT Customers.Name, Orders.Amount
FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;
\`\`\`

**UPDATE — Modifying data:**
\`\`\`sql
UPDATE Customers SET City = 'Melbourne' WHERE CustomerID = 1;
\`\`\`

**DELETE — Removing data:**
\`\`\`sql
DELETE FROM Customers WHERE CustomerID = 3;
\`\`\``,
          },
          {
            id: "ip2-ch7-s3",
            title: "7.3 PHP-MySQL Connectivity",
            content: `**Connecting to MySQL from PHP:**
\`\`\`php
<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "Bookstore";

// Create connection (MySQLi OOP style)
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully!";
?>
\`\`\`

**SELECT — Fetching data:**
\`\`\`php
$sql = "SELECT CustomerID, Name, City FROM Customers";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row["CustomerID"] . " — " . $row["Name"] . "<br>";
    }
} else {
    echo "No records found.";
}
\`\`\`

**INSERT — Adding data:**
\`\`\`php
$name = $conn->real_escape_string($_POST['name']); // Security!
$city = $conn->real_escape_string($_POST['city']);

$sql = "INSERT INTO Customers (Name, City) VALUES ('$name', '$city')";

if ($conn->query($sql) === TRUE) {
    echo "New record created!";
} else {
    echo "Error: " . $conn->error;
}
\`\`\`

**Always close the connection:**
\`\`\`php
$conn->close();
\`\`\`

**Security — Prepared Statements (prevent SQL injection):**
\`\`\`php
$stmt = $conn->prepare("INSERT INTO Customers (Name, City) VALUES (?, ?)");
$stmt->bind_param("ss", $name, $city);  // "ss" = two strings
$name = "John Doe";
$city = "Addis Ababa";
$stmt->execute();
$stmt->close();
\`\`\``,
          },
        ],
        quiz: [
          {
            id: "q1",
            question: "What is a PRIMARY KEY in a relational database?",
            options: [
              "The first column in any table",
              "A unique identifier for each row in a table",
              "A key that references another table",
              "The column used for sorting",
            ],
            correctIndex: 1,
            explanation: "A primary key uniquely identifies each row in a table — no two rows can have the same primary key value, and it cannot be NULL. It is the table's main identifier.",
          },
          {
            id: "q2",
            question: "Which SQL statement is used to retrieve data from a database?",
            options: ["GET", "FETCH", "SELECT", "RETRIEVE"],
            correctIndex: 2,
            explanation: "SELECT is the SQL command for querying and retrieving data. The basic syntax is: SELECT columns FROM table WHERE conditions ORDER BY column LIMIT n.",
          },
          {
            id: "q3",
            question: "What does `AUTO_INCREMENT` do in a MySQL table definition?",
            options: [
              "Automatically backs up the table",
              "Automatically generates a unique integer for each new row",
              "Automatically sorts the table on insert",
              "Automatically deletes old records",
            ],
            correctIndex: 1,
            explanation: "AUTO_INCREMENT automatically generates a sequential unique integer value (1, 2, 3...) for the column each time a new row is inserted. Used with primary keys.",
          },
          {
            id: "q4",
            question: "Why should you use prepared statements in PHP-MySQL interactions?",
            options: [
              "They make queries run faster",
              "They prevent SQL injection attacks",
              "They automatically format output as HTML",
              "They allow multiple database connections",
            ],
            correctIndex: 1,
            explanation: "Prepared statements separate SQL code from data, preventing SQL injection attacks where malicious input could manipulate the SQL query. They are a fundamental security best practice.",
          },
          {
            id: "q5",
            question: "In a One-to-Many relationship between Customers and Orders, where does the foreign key go?",
            options: [
              "In the Customers table",
              "In the Orders table",
              "In both tables",
              "In a separate junction table",
            ],
            correctIndex: 1,
            explanation: "In a one-to-many relationship, the foreign key goes in the 'many' side table. Since one Customer has many Orders, CustomerID (foreign key) goes in the Orders table to link each order to its customer.",
          },
        ],
      },
    ],
  },
]

export const getAllChapters = (): Chapter[] => {
  return courses.flatMap((c) => c.chapters)
}

export const getChapterById = (id: string): Chapter | undefined => {
  return getAllChapters().find((ch) => ch.id === id)
}

export const getCourseById = (id: "IP-I" | "IP-II"): Course | undefined => {
  return courses.find((c) => c.id === id)
}
