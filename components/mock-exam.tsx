"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Menu,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  AlertTriangle,
  Clock,
} from "lucide-react";

type Question = {
  id: number;
  topic: string;
  q: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
};
const QUESTIONS: Question[] = [
  {
    id: 1,
    topic: "Internet & Protocols",
    q: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "HyperText Transport Program",
      "High Transfer Text Protocol",
      "HyperText Transmission Protocol",
    ],
    correct: 0,
  },
  {
    id: 2,
    topic: "Internet & Protocols",
    q: "Which port does HTTPS use by default?",
    options: ["80", "8080", "443", "21"],
    correct: 2,
  },
  {
    id: 3,
    topic: "Internet & Protocols",
    q: "DNS translates domain names to:",
    options: ["MAC addresses", "IP addresses", "Port numbers", "Hostnames"],
    correct: 1,
  },
  {
    id: 4,
    topic: "Internet & Protocols",
    q: "Which protocol is used to transfer files between a client and server?",
    options: ["SMTP", "HTTP", "FTP", "POP3"],
    correct: 2,
  },
  {
    id: 5,
    topic: "Internet & Protocols",
    q: "What does URL stand for?",
    options: [
      "Uniform Resource Locator",
      "Universal Reference Link",
      "Unique Resource Location",
      "Uniform Routing Language",
    ],
    correct: 0,
  },
  {
    id: 6,
    topic: "Internet & Protocols",
    q: "Which layer of TCP/IP handles end-to-end communication?",
    options: ["Network", "Application", "Transport", "Data Link"],
    correct: 2,
  },
  {
    id: 7,
    topic: "Internet & Protocols",
    q: "An IP address in IPv4 consists of how many bits?",
    options: ["16", "32", "64", "128"],
    correct: 1,
  },
  {
    id: 8,
    topic: "Internet & Protocols",
    q: "What is the role of a web server?",
    options: [
      "Compile JavaScript",
      "Store client cookies",
      "Respond to HTTP requests with web resources",
      "Manage DNS records",
    ],
    correct: 2,
  },
  {
    id: 9,
    topic: "Internet & Protocols",
    q: "HTTP is a ______ protocol.",
    options: ["stateful", "connection-oriented", "stateless", "persistent"],
    correct: 2,
  },
  {
    id: 10,
    topic: "Internet & Protocols",
    q: "Which HTTP method is used to submit form data to a server?",
    options: ["GET", "PUT", "POST", "HEAD"],
    correct: 2,
  },
  {
    id: 11,
    topic: "Internet & Protocols",
    q: "The W3C was founded by:",
    options: ["Steve Jobs", "Linus Torvalds", "Tim Berners-Lee", "Bill Gates"],
    correct: 2,
  },
  {
    id: 12,
    topic: "Internet & Protocols",
    q: "Which protocol is used to send email?",
    options: ["FTP", "SMTP", "POP3", "HTTP"],
    correct: 1,
  },
  {
    id: 13,
    topic: "Internet & Protocols",
    q: "What does ISP stand for?",
    options: [
      "Internet Service Provider",
      "Internal System Protocol",
      "Internet Software Package",
      "Integrated Server Platform",
    ],
    correct: 0,
  },
  {
    id: 14,
    topic: "Internet & Protocols",
    q: "A cookie is stored on the:",
    options: ["Web server", "Database", "Client browser", "DNS server"],
    correct: 2,
  },
  {
    id: 15,
    topic: "Internet & Protocols",
    q: "Which HTTP status code means 'Not Found'?",
    options: ["200", "301", "403", "404"],
    correct: 3,
  },

  {
    id: 16,
    topic: "HTML",
    q: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High Transfer Markup Language",
      "HyperText Modeling Language",
      "Hyperlink and Text Markup Language",
    ],
    correct: 0,
  },
  {
    id: 17,
    topic: "HTML",
    q: "Which tag defines the root of an HTML document?",
    options: ["<body>", "<head>", "<html>", "<root>"],
    correct: 2,
  },
  {
    id: 18,
    topic: "HTML",
    q: "Which tag is used to create a hyperlink?",
    options: ["<link>", "<href>", "<a>", "<nav>"],
    correct: 2,
  },
  {
    id: 19,
    topic: "HTML",
    q: "The <img> tag requires which attribute to display an image?",
    options: ["href", "data", "src", "link"],
    correct: 2,
  },
  {
    id: 20,
    topic: "HTML",
    q: "Which tag creates an unordered list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    correct: 1,
  },
  {
    id: 21,
    topic: "HTML",
    q: "Which HTML element defines the document's metadata?",
    options: ["<meta>", "<body>", "<data>", "<head>"],
    correct: 3,
  },
  {
    id: 22,
    topic: "HTML",
    q: "What is the correct HTML5 doctype declaration?",
    options: [
      "<!DOCTYPE html5>",
      "<!DOCTYPE HTML PUBLIC>",
      "<!DOCTYPE html>",
      "<DOCTYPE html>",
    ],
    correct: 2,
  },
  {
    id: 23,
    topic: "HTML",
    q: "Which tag is used for the largest heading?",
    options: ["<h6>", "<h1>", "<heading>", "<h0>"],
    correct: 1,
  },
  {
    id: 24,
    topic: "HTML",
    q: "Which form element creates a multi-line text input?",
    options: [
      "<input type='text'>",
      "<select>",
      "<textarea>",
      "<input type='area'>",
    ],
    correct: 2,
  },
  {
    id: 25,
    topic: "HTML",
    q: "The 'alt' attribute in <img> is used for:",
    options: [
      "Changing image size",
      "SEO keywords only",
      "Describing the image for accessibility",
      "Linking the image",
    ],
    correct: 2,
  },
  {
    id: 26,
    topic: "HTML",
    q: "Which tag produces bold text semantically?",
    options: ["<b>", "<bold>", "<strong>", "<em>"],
    correct: 2,
  },
  {
    id: 27,
    topic: "HTML",
    q: "Which HTML5 element is used for navigation links?",
    options: ["<menu>", "<navbar>", "<nav>", "<links>"],
    correct: 2,
  },
  {
    id: 28,
    topic: "HTML",
    q: "What does the 'action' attribute in a <form> tag specify?",
    options: [
      "The HTTP method",
      "Where form data is sent",
      "The form's CSS class",
      "The input field names",
    ],
    correct: 1,
  },
  {
    id: 29,
    topic: "HTML",
    q: "Which tag embeds a video in HTML5?",
    options: ["<media>", "<embed>", "<object>", "<video>"],
    correct: 3,
  },
  {
    id: 30,
    topic: "HTML",
    q: "Tables in HTML use which tag for a data cell?",
    options: ["<th>", "<tr>", "<td>", "<tc>"],
    correct: 2,
  },

  {
    id: 31,
    topic: "CSS",
    q: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Syntax",
      "Colorful Styling System",
    ],
    correct: 1,
  },
  {
    id: 32,
    topic: "CSS",
    q: "Which CSS property changes text color?",
    options: ["font-color", "text-color", "color", "foreground"],
    correct: 2,
  },
  {
    id: 33,
    topic: "CSS",
    q: "What is the correct syntax to select an element with id='title'?",
    options: [".title", "#title", "*title", "title"],
    correct: 1,
  },
  {
    id: 34,
    topic: "CSS",
    q: "In the CSS box model, which property creates space inside the border?",
    options: ["margin", "border", "padding", "spacing"],
    correct: 2,
  },
  {
    id: 35,
    topic: "CSS",
    q: "Which CSS display value creates a flex container?",
    options: ["block", "grid", "flex", "inline"],
    correct: 2,
  },
  {
    id: 36,
    topic: "CSS",
    q: "CSS specificity: which selector has the highest priority?",
    options: [
      "Element selector",
      "Class selector",
      "ID selector",
      "Inline style",
    ],
    correct: 3,
  },
  {
    id: 37,
    topic: "CSS",
    q: "Which CSS property controls the stacking order of elements?",
    options: ["position", "z-index", "order", "layer"],
    correct: 1,
  },
  {
    id: 38,
    topic: "CSS",
    q: "The `flex-wrap: wrap` property allows flex items to:",
    options: [
      "Shrink proportionally",
      "Overflow the container",
      "Wrap to the next line",
      "Align to the center",
    ],
    correct: 2,
  },
  {
    id: 39,
    topic: "CSS",
    q: "Which value of `position` removes an element from normal document flow?",
    options: ["static", "relative", "sticky", "absolute"],
    correct: 3,
  },
  {
    id: 40,
    topic: "CSS",
    q: "In CSS Grid, `grid-template-columns: repeat(3, 1fr)` creates:",
    options: [
      "3 rows of equal height",
      "3 columns of equal width",
      "3 cells with 1px borders",
      "3 items with fractional margins",
    ],
    correct: 1,
  },
  {
    id: 41,
    topic: "CSS",
    q: "Which CSS pseudo-class applies styles when a user hovers over an element?",
    options: [":focus", ":active", ":hover", ":visited"],
    correct: 2,
  },
  {
    id: 42,
    topic: "CSS",
    q: "Which CSS property sets the font size?",
    options: ["text-size", "font-size", "size", "text-scale"],
    correct: 1,
  },
  {
    id: 43,
    topic: "CSS",
    q: "The CSS `@media` rule is used for:",
    options: [
      "Embedding fonts",
      "Responsive design breakpoints",
      "Animations",
      "CSS variables",
    ],
    correct: 1,
  },
  {
    id: 44,
    topic: "CSS",
    q: "What does `box-sizing: border-box` do?",
    options: [
      "Adds a border to the box",
      "Includes padding and border in the element's total width",
      "Removes the margin",
      "Only affects block elements",
    ],
    correct: 1,
  },
  {
    id: 45,
    topic: "CSS",
    q: "Which CSS property makes text bold?",
    options: [
      "font-weight: bold",
      "font-style: bold",
      "text-weight: 700",
      "bold: true",
    ],
    correct: 0,
  },

  {
    id: 46,
    topic: "JavaScript",
    q: "Which keyword declares a block-scoped variable in modern JavaScript?",
    options: ["var", "let", "define", "set"],
    correct: 1,
  },
  {
    id: 47,
    topic: "JavaScript",
    q: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Document Oriented Module",
      "Dynamic Object Mapping",
    ],
    correct: 0,
  },
  {
    id: 48,
    topic: "JavaScript",
    q: "Which method selects an element by its id in JavaScript?",
    options: [
      "document.querySelector()",
      "document.getElement()",
      "document.getElementById()",
      "window.selectById()",
    ],
    correct: 2,
  },
  {
    id: 49,
    topic: "JavaScript",
    q: "What is the output of: typeof null?",
    options: ["null", "undefined", "object", "boolean"],
    correct: 2,
  },
  {
    id: 50,
    topic: "JavaScript",
    q: "Which operator checks both value and type equality?",
    options: ["==", "=", "===", "!=="],
    correct: 2,
  },
  {
    id: 51,
    topic: "JavaScript",
    q: "How do you add an event listener to a button in JavaScript?",
    options: [
      "button.on('click', fn)",
      "button.click = fn",
      "button.addEventListener('click', fn)",
      "button.addEvent('click', fn)",
    ],
    correct: 2,
  },
  {
    id: 52,
    topic: "JavaScript",
    q: "What is a closure in JavaScript?",
    options: [
      "A way to close the browser window",
      "A function that retains access to its outer scope",
      "An error handling mechanism",
      "A loop construct",
    ],
    correct: 1,
  },
  {
    id: 53,
    topic: "JavaScript",
    q: "Which array method creates a new array with elements that pass a test?",
    options: ["map()", "reduce()", "filter()", "find()"],
    correct: 2,
  },
  {
    id: 54,
    topic: "JavaScript",
    q: "What does `===` return when comparing 0 == false?",
    options: ["true", "false", "undefined", "TypeError"],
    correct: 0,
  },
  {
    id: 55,
    topic: "JavaScript",
    q: "Which built-in method converts a JSON string to a JavaScript object?",
    options: [
      "JSON.decode()",
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
    ],
    correct: 1,
  },
  {
    id: 56,
    topic: "JavaScript",
    q: "What is NaN?",
    options: [
      "A null value",
      "A special object",
      "Not a Number — result of invalid numeric operation",
      "A negative number",
    ],
    correct: 2,
  },
  {
    id: 57,
    topic: "JavaScript",
    q: "Which JS method removes the last element from an array and returns it?",
    options: ["shift()", "splice()", "pop()", "slice()"],
    correct: 2,
  },
  {
    id: 58,
    topic: "JavaScript",
    q: "An arrow function `const add = (a, b) => a + b` is equivalent to:",
    options: [
      "A constructor function",
      "A generator function",
      "A regular function expression",
      "An async function",
    ],
    correct: 2,
  },
  {
    id: 59,
    topic: "JavaScript",
    q: "What does `innerHTML` allow you to do?",
    options: [
      "Set HTTP headers",
      "Get/set the HTML inside an element",
      "Read cookies",
      "Fetch external resources",
    ],
    correct: 1,
  },
  {
    id: 60,
    topic: "JavaScript",
    q: "Which statement is used to stop a loop early?",
    options: ["stop", "exit", "return", "break"],
    correct: 3,
  },

  {
    id: 61,
    topic: "PHP",
    q: "PHP files have the default extension:",
    options: [".html", ".py", ".php", ".asp"],
    correct: 2,
  },
  {
    id: 62,
    topic: "PHP",
    q: "Which symbol denotes a variable in PHP?",
    options: ["#", "&", "$", "@"],
    correct: 2,
  },
  {
    id: 63,
    topic: "PHP",
    q: "What is the correct way to start a PHP code block?",
    options: ["<php>", "<script php>", "<?php", "<? php ?>"],
    correct: 2,
  },
  {
    id: 64,
    topic: "PHP",
    q: "Which function outputs text in PHP?",
    options: ["print_r()", "console.log()", "echo", "output()"],
    correct: 2,
  },
  {
    id: 65,
    topic: "PHP",
    q: "In PHP, which operator is used for string concatenation?",
    options: ["+", "&", ".", "||"],
    correct: 2,
  },
  {
    id: 66,
    topic: "PHP",
    q: "Which PHP function returns the length of a string?",
    options: ["len()", "count()", "strlen()", "str_length()"],
    correct: 2,
  },
  {
    id: 67,
    topic: "PHP",
    q: "How do you define a constant in PHP?",
    options: [
      "const NAME = value",
      "var NAME = value",
      "define('NAME', value)",
      "constant NAME = value",
    ],
    correct: 2,
  },
  {
    id: 68,
    topic: "PHP",
    q: "PHP variables ARE:",
    options: [
      "Case-insensitive",
      "Case-sensitive",
      "Always global",
      "Strongly typed",
    ],
    correct: 1,
  },
  {
    id: 69,
    topic: "PHP",
    q: "Which PHP data type stores true/false values?",
    options: ["Integer", "Float", "String", "Boolean"],
    correct: 3,
  },
  {
    id: 70,
    topic: "PHP",
    q: "Which superglobal contains form data sent via POST?",
    options: ["$_GET", "$_POST", "$_REQUEST", "$_FORM"],
    correct: 1,
  },
  {
    id: 71,
    topic: "PHP",
    q: "What does `isset()` check in PHP?",
    options: [
      "If a variable is an integer",
      "If a variable is set and not null",
      "If a variable is empty",
      "If a variable is a string",
    ],
    correct: 1,
  },
  {
    id: 72,
    topic: "PHP",
    q: "Which PHP function converts a string to lowercase?",
    options: ["str_lower()", "toLowerCase()", "strtolower()", "lower_case()"],
    correct: 2,
  },
  {
    id: 73,
    topic: "PHP",
    q: "What is the output of: `echo 5 + '3abc';` in PHP?",
    options: ["53abc", "Error", "8", "53"],
    correct: 2,
  },
  {
    id: 74,
    topic: "PHP",
    q: "Which loop is guaranteed to run at least once?",
    options: ["for", "foreach", "while", "do-while"],
    correct: 3,
  },
  {
    id: 75,
    topic: "PHP",
    q: "PHP function names are:",
    options: [
      "Case-sensitive",
      "Case-insensitive",
      "Cannot start with numbers",
      "Always lowercase",
    ],
    correct: 1,
  },

  {
    id: 76,
    topic: "State Management",
    q: "PHP sessions store data:",
    options: [
      "In the user's browser",
      "In a MySQL database",
      "On the web server",
      "In a JavaScript variable",
    ],
    correct: 2,
  },
  {
    id: 77,
    topic: "State Management",
    q: "Which function must be called before accessing $_SESSION?",
    options: [
      "session_open()",
      "session_init()",
      "session_start()",
      "session_create()",
    ],
    correct: 2,
  },
  {
    id: 78,
    topic: "State Management",
    q: "How is a session ID typically sent to the browser?",
    options: [
      "In the URL only",
      "As a cookie",
      "As a hidden form field",
      "Via AJAX",
    ],
    correct: 1,
  },
  {
    id: 79,
    topic: "State Management",
    q: "To destroy a PHP session, you use:",
    options: [
      "unset($_SESSION)",
      "session_close()",
      "session_destroy()",
      "delete_session()",
    ],
    correct: 2,
  },
  {
    id: 80,
    topic: "State Management",
    q: "Cookies are stored:",
    options: [
      "On the server",
      "On the client (browser)",
      "In the database",
      "In memory only",
    ],
    correct: 1,
  },
  {
    id: 81,
    topic: "State Management",
    q: "What is the maximum size of a single cookie?",
    options: ["1 KB", "4 KB", "16 KB", "Unlimited"],
    correct: 1,
  },
  {
    id: 82,
    topic: "State Management",
    q: "The `setcookie()` function must be called:",
    options: [
      "After all HTML output",
      "Before any HTML output is sent",
      "Inside a function only",
      "After session_start()",
    ],
    correct: 1,
  },
  {
    id: 83,
    topic: "State Management",
    q: "Which array holds cookie values in PHP?",
    options: ["$_SESSION", "$_COOKIE", "$_SERVER", "$_GLOBALS"],
    correct: 1,
  },
  {
    id: 84,
    topic: "State Management",
    q: "To delete a cookie in PHP:",
    options: [
      "Call deletecookie('name')",
      "Set its value to null",
      "Set setcookie() with past expiry",
      "Call unset($_COOKIE) only",
    ],
    correct: 2,
  },
  {
    id: 85,
    topic: "State Management",
    q: "Which statement about sessions vs cookies is TRUE?",
    options: [
      "Cookies are more secure than sessions",
      "Sessions can store more data than cookies",
      "Cookies are stored on the server",
      "Sessions expire when the browser opens",
    ],
    correct: 1,
  },
  {
    id: 86,
    topic: "State Management",
    q: "HTTP is described as ______, which is why sessions exist.",
    options: ["reliable", "stateless", "persistent", "encrypted"],
    correct: 1,
  },
  {
    id: 87,
    topic: "State Management",
    q: "The `httponly` flag on a cookie means:",
    options: [
      "It can only be sent over HTTP (not HTTPS)",
      "It cannot be accessed via JavaScript",
      "It only works with GET requests",
      "It is stored in the header only",
    ],
    correct: 1,
  },
  {
    id: 88,
    topic: "State Management",
    q: "What is the name of the default session cookie PHP creates?",
    options: ["PHP_SESS", "SESSID", "PHPSESSID", "PHP_SESSION"],
    correct: 2,
  },
  {
    id: 89,
    topic: "State Management",
    q: "session_unset() does what?",
    options: [
      "Destroys the session file",
      "Removes all session variables",
      "Regenerates the session ID",
      "Closes the session",
    ],
    correct: 1,
  },
  {
    id: 90,
    topic: "State Management",
    q: "If a cookie's expiry is set to `time() + 86400`, it expires in:",
    options: ["1 hour", "1 day", "1 week", "1 month"],
    correct: 1,
  },

  {
    id: 91,
    topic: "MySQL",
    q: "Which PHP function connects to a MySQL database?",
    options: [
      "db_connect()",
      "mysql_open()",
      "mysqli_connect()",
      "pdo_connect()",
    ],
    correct: 2,
  },
  {
    id: 92,
    topic: "MySQL",
    q: "Which SQL statement retrieves records from a table?",
    options: ["INSERT", "UPDATE", "DELETE", "SELECT"],
    correct: 3,
  },
  {
    id: 93,
    topic: "MySQL",
    q: "To prevent SQL injection in PHP, you should use:",
    options: [
      "addslashes()",
      "md5()",
      "Prepared statements with parameterized queries",
      "htmlspecialchars()",
    ],
    correct: 2,
  },
  {
    id: 94,
    topic: "MySQL",
    q: "Which SQL keyword filters records based on a condition?",
    options: ["HAVING", "WHERE", "LIMIT", "GROUP BY"],
    correct: 1,
  },
  {
    id: 95,
    topic: "MySQL",
    q: "A PRIMARY KEY in a database table:",
    options: [
      "Can contain duplicate values",
      "Can be NULL",
      "Uniquely identifies each row",
      "Is always an integer",
    ],
    correct: 2,
  },
  {
    id: 96,
    topic: "MySQL",
    q: "Which PHP function executes a MySQL query?",
    options: [
      "mysqli_run()",
      "mysqli_query()",
      "mysqli_execute()",
      "db_query()",
    ],
    correct: 1,
  },
  {
    id: 97,
    topic: "MySQL",
    q: "Which SQL statement adds a new record to a table?",
    options: ["ADD", "APPEND", "INSERT INTO", "CREATE"],
    correct: 2,
  },
  {
    id: 98,
    topic: "MySQL",
    q: "Which SQL clause sorts query results?",
    options: ["SORT BY", "GROUP BY", "ORDER BY", "ARRANGE BY"],
    correct: 2,
  },
  {
    id: 99,
    topic: "MySQL",
    q: "AUTO_INCREMENT in MySQL:",
    options: [
      "Duplicates the last row",
      "Automatically increases the field value for each new row",
      "Requires manual entry",
      "Only works with VARCHAR",
    ],
    correct: 1,
  },
  {
    id: 100,
    topic: "MySQL",
    q: "Which PHP function retrieves a result row as an associative array?",
    options: [
      "mysqli_fetch_row()",
      "mysqli_fetch_array()",
      "mysqli_fetch_assoc()",
      "mysqli_get_row()",
    ],
    correct: 2,
  },
];

const TOTAL_QUESTIONS = QUESTIONS.length;
const EXAM_DURATION = 60 * 60;

function CircularTimer({ secondsLeft }: { secondsLeft: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const fraction = secondsLeft / EXAM_DURATION;
  const offset = circumference * (1 - fraction);

  const color =
    fraction > 0.5 ? "#22c55e" : fraction > 0.25 ? "#f59e0b" : "#ef4444";

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
      <svg
        className="w-24 h-24 -rotate-90"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-muted/40"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.5s ease",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <span
          className="font-mono text-base font-bold text-foreground tabular-nums"
          style={{ color }}
        >
          {mm}:{ss}
        </span>
        <span className="text-xs text-muted-foreground">left</span>
      </div>
    </div>
  );
}
type ExamStatus = "idle" | "running" | "submitted" | "timeout";
export default function MockExam({
  onBack,
  onOpenSidebar,
}: {
  onBack: () => void;
  onOpenSidebar: () => void;
}) {
  const [status, setStatus] = useState<ExamStatus>("idle");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(TOTAL_QUESTIONS).fill(null),
  );
  const [flagged, setFlagged] = useState<boolean[]>(
    Array(TOTAL_QUESTIONS).fill(false),
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION);
  const [showGrid, setShowGrid] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (status === "running") {
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current!);
            setStatus("timeout");
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => stopTimer();
  }, [status, stopTimer]);

  const startExam = () => {
    setStatus("running");
    setCurrentIdx(0);
    setAnswers(Array(TOTAL_QUESTIONS).fill(null));
    setFlagged(Array(TOTAL_QUESTIONS).fill(false));
    setSelectedOption(null);
    setSecondsLeft(EXAM_DURATION);
  };

  const submitExam = useCallback(() => {
    stopTimer();
    setStatus("submitted");
  }, [stopTimer]);

  const handleSelectOption = (idx: number) => {
    if (status !== "running") return;
    setSelectedOption(idx);
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIdx] = idx;
      return updated;
    });
  };

  const jumpToQuestion = (idx: number) => {
    // save current selection
    setCurrentIdx(idx);
    setSelectedOption(answers[idx]);
    setShowGrid(false);
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const updated = [...prev];
      updated[currentIdx] = !updated[currentIdx];
      return updated;
    });
  };

  const goNext = () => {
    if (currentIdx < TOTAL_QUESTIONS - 1) {
      const next = currentIdx + 1;
      setCurrentIdx(next);
      setSelectedOption(answers[next]);
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) {
      const prev = currentIdx - 1;
      setCurrentIdx(prev);
      setSelectedOption(answers[prev]);
    }
  };

  if (status === "idle") {
    return (
      <div className="min-h-screen flex flex-col">
        <ExamHeader
          title="Mock Exam"
          onOpenSidebar={onOpenSidebar}
          onBack={onBack}
          rightSlot={null}
        />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-lg w-full space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Full Mock Exam
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                100 multiple-choice questions covering all 7 chapters of
                Internet Programming I &amp; II.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Questions", value: "100" },
                { label: "Duration", value: "60 min" },
                { label: "Topics", value: "Ch.1–7" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl border border-border/60 bg-card/60 text-center"
                >
                  <p className="text-xl font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-border/60 bg-card/60 space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground text-xs uppercase tracking-wide mb-2">
                Instructions
              </p>
              {[
                "Select the best answer for each question.",
                "You can flag questions for later review.",
                "Use the question grid to navigate freely.",
                "The timer starts as soon as you click Start.",
                "The exam auto-submits when time runs out.",
              ].map((inst, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-xs leading-relaxed">{inst}</span>
                </div>
              ))}
            </div>

            <button
              onClick={startExam}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-colors"
            >
              Start Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "submitted" || status === "timeout") {
    return (
      <ResultsScreen
        answers={answers}
        onRetake={startExam}
        onBack={onBack}
        onOpenSidebar={onOpenSidebar}
        timedOut={status === "timeout"}
      />
    );
  }

  const q = QUESTIONS[currentIdx];
  const answeredCount = answers.filter((a) => a !== null).length;
  const flaggedCount = flagged.filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col">
      <ExamHeader
        title={`Q${currentIdx + 1} / ${TOTAL_QUESTIONS}`}
        onOpenSidebar={onOpenSidebar}
        onBack={() => {
          if (confirm("Exit exam? Your progress will be lost.")) {
            stopTimer();
            onBack();
          }
        }}
        rightSlot={
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-xs text-muted-foreground">
              <span>
                {answeredCount}/{TOTAL_QUESTIONS} answered
              </span>
              {flaggedCount > 0 && (
                <span className="text-amber-400">{flaggedCount} flagged</span>
              )}
            </div>
            <CircularTimer secondsLeft={secondsLeft} />
          </div>
        }
      />

      <div className="lg:hidden flex justify-end px-4 pt-3">
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="text-xs text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors"
        >
          {showGrid ? "Hide Grid" : "Question Grid"}
        </button>
      </div>

      {showGrid && (
        <div className="lg:hidden mx-4 my-2 p-3 rounded-xl border border-border bg-card/80 backdrop-blur-md">
          <QuestionGrid
            total={TOTAL_QUESTIONS}
            currentIdx={currentIdx}
            answers={answers}
            flagged={flagged}
            onJump={jumpToQuestion}
          />
        </div>
      )}

      <div className="flex-1 flex gap-0 max-w-6xl mx-auto w-full px-4 py-6">
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
              {q.topic}
            </span>
            {flagged[currentIdx] && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 font-medium border border-amber-500/20">
                Flagged
              </span>
            )}
          </div>

          <div className="p-5 rounded-xl border border-border bg-card/70 backdrop-blur-md mb-5">
            <p className="text-sm font-medium text-foreground leading-relaxed">
              {q.q}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left text-sm transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 text-foreground shadow-sm"
                      : "border-border bg-card/60 text-foreground hover:border-primary/40 hover:bg-muted/60"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-semibold shrink-0 transition-all ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-2">
              <button
                onClick={goPrev}
                disabled={currentIdx === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>
              <button
                onClick={goNext}
                disabled={currentIdx === TOTAL_QUESTIONS - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors disabled:opacity-30"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={toggleFlag}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm transition-colors ${
                  flagged[currentIdx]
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                    : "border-border text-muted-foreground hover:text-amber-400 hover:border-amber-500/40"
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                {flagged[currentIdx] ? "Unflag" : "Flag"}
              </button>
            </div>

            <button
              onClick={() => {
                if (
                  confirm(
                    `Submit exam? You've answered ${answeredCount} of ${TOTAL_QUESTIONS} questions.`,
                  )
                ) {
                  submitExam();
                }
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors"
            >
              Submit Exam
            </button>
          </div>
        </div>

        <aside
          className="hidden lg:block w-64 shrink-0 ml-6"
          aria-label="Question navigation grid"
        >
          <div className="sticky top-24 p-4 rounded-xl border border-border bg-card/70 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Questions
              </p>
              <span className="text-xs text-muted-foreground">
                {answeredCount}/{TOTAL_QUESTIONS}
              </span>
            </div>
            <QuestionGrid
              total={TOTAL_QUESTIONS}
              currentIdx={currentIdx}
              answers={answers}
              flagged={flagged}
              onJump={jumpToQuestion}
            />
            <div className="mt-4 space-y-1.5">
              <GridLegend color="bg-primary" label="Current" />
              <GridLegend color="bg-blue-500" label="Answered" />
              <GridLegend color="bg-amber-400" label="Flagged" />
              <GridLegend color="bg-muted" label="Unanswered" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
function QuestionGrid({
  total,
  currentIdx,
  answers,
  flagged,
  onJump,
}: {
  total: number;
  currentIdx: number;
  answers: (number | null)[];
  flagged: boolean[];
  onJump: (i: number) => void;
}) {
  return (
    <div className="grid grid-cols-10 gap-1">
      {Array.from({ length: total }, (_, i) => {
        const isCurrent = i === currentIdx;
        const isAnswered = answers[i] !== null;
        const isFlagged = flagged[i];

        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            aria-label={`Question ${i + 1}${isAnswered ? " answered" : ""}${isFlagged ? " flagged" : ""}`}
            className={`w-full aspect-square rounded text-xs font-medium transition-all ${
              isCurrent
                ? "bg-primary text-primary-foreground ring-1 ring-primary ring-offset-1 ring-offset-background"
                : isFlagged
                  ? "bg-amber-400/80 text-black"
                  : isAnswered
                    ? "bg-blue-500/80 text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

function GridLegend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded ${color} shrink-0`} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
function ExamHeader({
  title,
  onOpenSidebar,
  onBack,
  rightSlot,
}: {
  title: string;
  onOpenSidebar: () => void;
  onBack: () => void;
  rightSlot: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 bg-background/50 backdrop-blur-xl border-b border-border/50 px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 className="text-sm font-semibold text-foreground flex-1">
          {title}
        </h1>
        {rightSlot}
      </div>
    </header>
  );
}
function ResultsScreen({
  answers,
  onRetake,
  onBack,
  onOpenSidebar,
  timedOut,
}: {
  answers: (number | null)[];
  onRetake: () => void;
  onBack: () => void;
  onOpenSidebar: () => void;
  timedOut: boolean;
}) {
  const score = answers.filter((ans, i) => ans === QUESTIONS[i].correct).length;
  const percent = Math.round((score / TOTAL_QUESTIONS) * 100);
  const unanswered = answers.filter((a) => a === null).length;

  const topics = Array.from(new Set(QUESTIONS.map((q) => q.topic)));
  const topicStats = topics.map((topic) => {
    const qs = QUESTIONS.filter((q) => q.topic === topic);
    const correct = qs.filter((q) => {
      const idx = q.id - 1;
      return answers[idx] === q.correct;
    }).length;
    return { topic, total: qs.length, correct };
  });

  const grade =
    percent >= 90
      ? { label: "Excellent!", color: "text-emerald-400", bg: "bg-emerald-500" }
      : percent >= 75
        ? { label: "Good Job!", color: "text-cyan-400", bg: "bg-cyan-500" }
        : percent >= 60
          ? { label: "Passing", color: "text-yellow-400", bg: "bg-yellow-500" }
          : { label: "Needs Work", color: "text-red-400", bg: "bg-red-500" };

  return (
    <div className="min-h-screen flex flex-col">
      <ExamHeader
        title="Exam Results"
        onOpenSidebar={onOpenSidebar}
        onBack={onBack}
        rightSlot={null}
      />

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 space-y-6">
        {/* timeout banner */}
        {timedOut && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">
              Time&apos;s up! The exam was auto-submitted.
            </p>
          </div>
        )}

        {/* score card */}
        <div
          className={`p-6 rounded-2xl border ${grade.bg}/15 border-current/${20} text-center`}
          style={{
            borderColor: `${grade.bg.replace("bg-", "").replace("-500", "")}`,
          }}
        >
          <div className="flex justify-center mb-4">
            <div
              className={`w-20 h-20 rounded-full ${grade.bg} flex items-center justify-center`}
            >
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <p className="text-5xl font-black text-foreground mb-1">
            {score}
            <span className="text-2xl text-muted-foreground">
              /{TOTAL_QUESTIONS}
            </span>
          </p>
          <p className={`text-xl font-bold mb-1 ${grade.color}`}>
            {grade.label}
          </p>
          <p className="text-muted-foreground text-sm">
            {percent}% correct
            {unanswered > 0 ? ` · ${unanswered} unanswered` : ""}
          </p>
        </div>

        {/* topic breakdown */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Performance by Topic
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {topicStats.map(({ topic, total, correct }) => {
              const pct = Math.round((correct / total) * 100);
              const barColor =
                pct >= 75
                  ? "bg-emerald-500"
                  : pct >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500";
              return (
                <div
                  key={topic}
                  className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-foreground truncate">
                      {topic}
                    </p>
                    <span
                      className={`text-xs font-semibold ${pct >= 75 ? "text-emerald-400" : pct >= 50 ? "text-yellow-400" : "text-red-400"}`}
                    >
                      {correct}/{total}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* answer review */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Answer Review
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {QUESTIONS.map((q, i) => {
              const userAns = answers[i];
              const isCorrect = userAns === q.correct;
              const wasSkipped = userAns === null;
              return (
                <div
                  key={q.id}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card/60"
                >
                  {wasSkipped ? (
                    <AlertTriangle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  ) : isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-snug line-clamp-2">
                      <span className="font-semibold text-muted-foreground mr-1">
                        Q{q.id}.
                      </span>
                      {q.q}
                    </p>
                    {!wasSkipped && !isCorrect && (
                      <p className="text-xs text-emerald-400 mt-0.5">
                        Correct: {q.options[q.correct]}
                      </p>
                    )}
                    {wasSkipped && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Skipped
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {q.topic.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onRetake}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Exam
          </button>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
