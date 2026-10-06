import { useCallback, useEffect, useRef, useState } from 'react';
import { RichText } from './rich.jsx';

const MAX_QUESTIONS = 20;
const MAX_LENGTH = 500;

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export default function ChatWidget({ avatar, email, name = 'Ansari AI', suggestions = [] }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const chatRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const fabRef = useRef(null);
  const asked = useRef(0);
  const busyRef = useRef(false);

  const fail = useCallback(
    (kind) => {
      const text =
        kind === 'not-configured'
          ? `The AI chat isn't switched on yet. Email Thameem at ${email} instead.`
          : kind === 'limit'
            ? `That's the question limit for this visit. Email Thameem at ${email} to keep talking.`
            : kind === 'rate-limited'
              ? `${name} is getting a lot of questions right now. Try again in a minute, or email ${email}.`
              : `The assistant couldn't answer just now. Try again in a moment, or email ${email}.`;
      setMessages((m) => [...m.filter((x) => !(x.role === 'ai' && !x.text)), { role: 'error', text }]);
    },
    [email, name],
  );

  const send = useCallback(
    async (raw) => {
      const text = raw.trim().slice(0, MAX_LENGTH);
      if (!text || busyRef.current) return;
      if (asked.current >= MAX_QUESTIONS) return fail('limit');
      asked.current += 1;
      busyRef.current = true;
      setBusy(true);
      setInput('');
      setMessages((m) => [...m, { role: 'user', text }, { role: 'ai', text: '' }]);
      try {
        if (!chatRef.current) {
          const { createChat } = await import('../../lib/ai.js');
          chatRef.current = await createChat();
        }
        const result = await chatRef.current.sendMessageStream(text);
        let acc = '';
        for await (const chunk of result.stream) {
          acc += chunk.text();
          const snapshot = acc;
          setMessages((m) => [...m.slice(0, -1), { role: 'ai', text: snapshot }]);
        }
        if (!acc) fail('error');
      } catch (err) {
        console.error('[chat]', err);
        fail(['not-configured', 'rate-limited'].includes(err?.message) ? err.message : 'error');
      } finally {
        busyRef.current = false;
        setBusy(false);
        inputRef.current?.focus();
      }
    },
    [fail],
  );

  const openChat = useCallback(
    (question) => {
      setOpen(true);
      if (question) setTimeout(() => send(question), 60);
    },
    [send],
  );

  // Other parts of the page open the chat with: window.dispatchEvent(new CustomEvent('chat:open', { detail: { q } }))
  useEffect(() => {
    const onOpen = (e) => openChat(e.detail?.q);
    const onClick = (e) => {
      const trigger = e.target.closest?.('[data-open-chat]');
      if (trigger) { e.preventDefault(); openChat(trigger.getAttribute('data-question') || ''); }
    };
    window.addEventListener('chat:open', onOpen);
    document.addEventListener('click', onClick);
    if (window.__pendingChat !== undefined) { openChat(window.__pendingChat); delete window.__pendingChat; }
    window.__chatReady = true;
    return () => {
      window.removeEventListener('chat:open', onOpen);
      document.removeEventListener('click', onClick);
    };
  }, [openChat]);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const close = () => { setOpen(false); setTimeout(() => fabRef.current?.focus(), 0); };
  const last = messages[messages.length - 1];

  return (
    <>
      <button ref={fabRef} className="chat-fab" type="button" onClick={() => openChat()} hidden={open} aria-label={`Chat with ${name}`}>
        <img src={avatar} alt="" width="64" height="64" />
        <span className={`chat-fab-label${messages.length ? '' : ' hint'}`} aria-hidden="true">Chat with {name}</span>
      </button>

      {open && (
        <section className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <header className="chat-head">
            <img src={avatar} alt="" width="40" height="40" />
            <p id="chat-title">
              {name}
              <small>Answers questions about Thameem's work</small>
            </p>
            <button className="icon-btn" type="button" onClick={close} aria-label="Close chat"><CloseIcon /></button>
          </header>

          <div className="chat-log" ref={logRef} aria-live="polite">
            {messages.length === 0 && (
              <>
                <div className="msg msg-ai">
                  <p>Hi, I'm {name}. Ask me about Thameem's projects, skills, certifications or experience.</p>
                </div>
                <div className="chat-suggest">
                  {suggestions.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)}>{s}</button>
                  ))}
                </div>
              </>
            )}
            {messages.map((m, i) =>
              m.role === 'ai' && !m.text ? null : (
                <div key={i} className={`msg msg-${m.role}`}>
                  {m.role === 'ai' ? <RichText text={m.text} /> : <p>{m.text}</p>}
                </div>
              ),
            )}
            {busy && last?.role === 'ai' && !last.text && (
              <div className="msg msg-ai msg-typing" aria-label="Assistant is typing"><i /><i /><i /></div>
            )}
          </div>

          <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <label htmlFor="chat-input" className="sr-only">Your question</label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, availability…"
              maxLength={MAX_LENGTH}
              autoComplete="off"
            />
            <button className="icon-btn" type="submit" disabled={busy || !input.trim()} aria-label="Send question"><SendIcon /></button>
          </form>
          <p className="chat-foot">AI answers can be wrong. Powered by Groq.</p>
        </section>
      )}
    </>
  );
}