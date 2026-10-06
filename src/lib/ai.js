// Ansari AI on Groq (OpenAI-compatible API), called straight from the browser.
// Note: the API key ships in the site's JavaScript, so anyone can read it.
// Use a dedicated key on the free plan so the worst case is hitting rate limits.
const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const MAX_HISTORY = 12; // past messages sent with each question (keeps requests small)

let chatPromise;

export function createChat() {
  if (!chatPromise) chatPromise = init().catch((err) => { chatPromise = undefined; throw err; });
  return chatPromise;
}

async function init() {
  const apiKey = import.meta.env.PUBLIC_GROQ_API_KEY;
  if (!apiKey) throw new Error('not-configured');
  const model = import.meta.env.PUBLIC_GROQ_MODEL || 'llama-3.3-70b-versatile';

  const res = await fetch('/knowledge.json');
  if (!res.ok) throw new Error('knowledge-missing');
  const { prompt } = await res.json();

  const history = [];

  return {
    // Same shape the chat widget already uses: { stream } yielding chunks with .text()
    async sendMessageStream(text) {
      history.push({ role: 'user', content: text });
      const messages = [{ role: 'system', content: prompt }, ...history.slice(-MAX_HISTORY)];

      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model, messages, stream: true, temperature: 0.4, max_tokens: 700 }),
      });

      if (!response.ok || !response.body) {
        history.pop();
        const detail = await response.text().catch(() => '');
        if (response.status === 429) throw new Error('rate-limited');
        if (response.status === 401) throw new Error('bad-key');
        throw new Error(`groq-${response.status}: ${detail.slice(0, 300)}`);
      }

      async function* stream() {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let full = '';
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            let nl;
            while ((nl = buffer.indexOf('\n')) >= 0) {
              const line = buffer.slice(0, nl).trim();
              buffer = buffer.slice(nl + 1);
              if (!line.startsWith('data:')) continue;
              const data = line.slice(5).trim();
              if (data === '[DONE]') return;
              try {
                const delta = JSON.parse(data).choices?.[0]?.delta?.content;
                if (delta) {
                  full += delta;
                  yield { text: () => delta };
                }
              } catch {
                // ignore keep-alive or partial lines
              }
            }
          }
        } finally {
          if (full) history.push({ role: 'assistant', content: full });
          else history.pop();
        }
      }

      return { stream: stream() };
    },
  };
}