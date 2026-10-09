const BASE = 'https://api.groq.com/openai/v1';
const ENDPOINT = `${BASE}/chat/completions`;
const MAX_HISTORY = 12; // past messages sent with each question (keeps requests small)

// Best first. The first one your key has access to wins.
const PREFERRED = [
  'openai/gpt-oss-120b'
];
// Models that are not text-chat models.
const NOT_CHAT = /whisper|tts|guard|safeguard|embed|orpheus|compound|moderation/i;

let chatPromise;

export function createChat() {
  if (!chatPromise) chatPromise = init().catch((err) => { chatPromise = undefined; throw err; });
  return chatPromise;
}

async function pickModel(apiKey, wanted) {
  try {
    const res = await fetch(`${BASE}/models`, { headers: { Authorization: `Bearer ${apiKey}` } });
    if (res.status === 401) throw new Error('bad-key');
    if (res.ok) {
      const { data = [] } = await res.json();
      const ids = data
        .filter((m) => m.active !== false && !NOT_CHAT.test(m.id))
        .map((m) => m.id);
      const chosen =
        (wanted && ids.includes(wanted) && wanted) ||
        PREFERRED.find((id) => ids.includes(id)) ||
        ids[0];
      console.info(`[chat] Using "${chosen}". Available chat models:`, ids);
      if (chosen) return chosen;
    }
  } catch (err) {
    if (err instanceof Error && err.message === 'bad-key') throw err;
    // Network hiccup while listing models: fall through to a sensible default.
  }
  return wanted || PREFERRED[2];
}

async function init() {
  const apiKey = import.meta.env.PUBLIC_GROQ_API_KEY;
  if (!apiKey) throw new Error('not-configured');

  const res = await fetch('/knowledge.json');
  if (!res.ok) throw new Error('knowledge-missing');
  const { prompt } = await res.json();

  const model = await pickModel(apiKey, import.meta.env.PUBLIC_GROQ_MODEL);
  // gpt-oss models "think" first; keep it short and hide it from the reply.
  const thinkingOptions = /gpt-oss/i.test(model)
    ? { reasoning_effort: 'low', include_reasoning: false }
    : {};

  const history = [];

  async function request(messages, extra) {
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        temperature: 0.4,
        max_tokens: 1024,
        ...extra,
      }),
    });
  }

  return {
    // Same shape the chat widget already uses: { stream } yielding chunks with .text()
    async sendMessageStream(text) {
      history.push({ role: 'user', content: text });
      const messages = [{ role: 'system', content: prompt }, ...history.slice(-MAX_HISTORY)];

      let response = await request(messages, thinkingOptions);
      // Some models reject the thinking options: retry once without them.
      if (response.status === 400 && Object.keys(thinkingOptions).length) {
        response = await request(messages, {});
      }

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