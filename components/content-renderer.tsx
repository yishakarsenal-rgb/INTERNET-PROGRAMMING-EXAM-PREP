"use client";

export default function ContentRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div
          key={i}
          className="my-4 rounded-xl overflow-hidden border border-border"
        >
          {lang && (
            <div className="px-4 py-1.5 bg-muted border-b border-border flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">
                {lang}
              </span>
            </div>
          )}
          <pre className="p-4 bg-muted/50 overflow-x-auto">
            <code className="text-xs font-mono text-foreground leading-relaxed whitespace-pre">
              {codeLines.join("\n")}
            </code>
          </pre>
        </div>,
      );
      i++;
      continue;
    }

    if (
      line.startsWith("|") &&
      i + 1 < lines.length &&
      lines[i + 1].startsWith("|---")
    ) {
      const headerCells = parseTableRow(line);
      i++;
      i++;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(parseTableRow(lines[i]));
        i++;
      }
      elements.push(
        <div
          key={i}
          className="my-4 overflow-x-auto rounded-xl border border-border"
        >
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {headerCells.map((cell, j) => (
                  <th
                    key={j}
                    className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                  >
                    {inlineFormat(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, ri) => (
                <tr key={ri} className="hover:bg-muted/30 transition-colors">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-2.5 text-xs text-foreground/90 leading-relaxed"
                    >
                      {inlineFormat(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // headings
    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={i} className="text-sm font-semibold text-foreground mt-5 mb-2">
          {inlineFormat(line.slice(4))}
        </h4>,
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h3
          key={i}
          className="text-base font-semibold text-foreground mt-6 mb-2"
        >
          {inlineFormat(line.slice(3))}
        </h3>,
      );
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      elements.push(
        <h2 key={i} className="text-lg font-bold text-foreground mt-6 mb-3">
          {inlineFormat(line.slice(2))}
        </h2>,
      );
      i++;
      continue;
    }

    // bullet list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="my-3 space-y-1.5 ml-4">
          {items.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
              <span>{inlineFormat(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // numbered list
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={i} className="my-3 space-y-1.5 ml-4 list-decimal list-outside">
          {items.map((item, j) => (
            <li
              key={j}
              className="text-sm text-foreground/90 leading-relaxed ml-4"
            >
              {inlineFormat(item)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }
    if (line.trim() === "") {
      i++;
      continue;
    }
    // paragraph
    elements.push(
      <p key={i} className="text-sm text-foreground/90 leading-relaxed my-2">
        {inlineFormat(line)}
      </p>,
    );
    i++;
  }

  return <div className="prose-custom">{elements}</div>;
}

function parseTableRow(line: string): string[] {
  return line
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

function inlineFormat(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-muted text-primary text-xs font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
