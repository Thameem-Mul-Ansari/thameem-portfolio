// Tiny, safe renderer for the assistant's replies: paragraphs, "- " bullets and **bold**.
// Builds React elements only, never HTML strings.
function inline(text, keyBase) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**') && p.length > 4 ? <strong key={`${keyBase}-${i}`}>{p.slice(2, -2)}</strong> : p,
  );
}

export function RichText({ text }) {
  const blocks = [];
  let list = null;
  text.split('\n').forEach((raw, i) => {
    const line = raw.trim();
    const bullet = line.match(/^[-*•]\s+(.*)/);
    if (bullet) {
      if (!list) { list = []; blocks.push({ type: 'ul', items: list, key: `ul-${i}` }); }
      list.push({ text: bullet[1], key: `li-${i}` });
      return;
    }
    list = null;
    if (line) blocks.push({ type: 'p', text: line, key: `p-${i}` });
  });
  return blocks.map((b) =>
    b.type === 'ul' ? (
      <ul key={b.key}>{b.items.map((it) => <li key={it.key}>{inline(it.text, it.key)}</li>)}</ul>
    ) : (
      <p key={b.key}>{inline(b.text, b.key)}</p>
    ),
  );
}
