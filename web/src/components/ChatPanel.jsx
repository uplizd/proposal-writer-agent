import React, { useRef, useEffect, useState } from "react";
import Message from "./Message.jsx";
import ThinkingIndicator from "./ThinkingIndicator.jsx";

function statusLabel(status) {
  if (status === "running") return "Flow running on UPLIZD…";
  if (status === "error") return "Error — check console";
  return "Ready";
}

export default function ChatPanel({ messages, status, onSend }) {
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleSend = () => {
    if (!draft.trim() || status === "running") return;
    onSend(draft);
    setDraft("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setDraft(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="chat">
      <header className="chat-header">
        <div className="chat-header-title">Conversation</div>
        <p className="chat-header-desc">
          Discovery notes and deal context — the agent drafts proposals with ROI
          and tool integrations.
        </p>
      </header>

      <div className="chat-messages">
        {isEmpty ? (
          <div className="chat-empty">
            <div className="chat-empty-icon" aria-hidden>
              PW
            </div>
            <div className="chat-empty-title">Start a new session</div>
            <p className="chat-empty-text">
              Use a quick prompt from the sidebar or describe your prospect below.
              Shift+Enter adds a new line.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <Message key={msg.id} msg={msg} />
            ))}
            {status === "running" && <ThinkingIndicator />}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <div className="chat-composer">
        <div className="chat-composer-inner">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            value={draft}
            onChange={handleInput}
            onKeyDown={handleKey}
            placeholder="Describe the prospect or paste discovery notes…"
            rows={1}
            disabled={status === "running"}
            aria-label="Message input"
          />
          <button
            type="button"
            className="chat-send"
            onClick={handleSend}
            disabled={!draft.trim() || status === "running"}
          >
            {status === "running" ? "Running…" : "Run"}
          </button>
        </div>
      </div>

      <div className="chat-status" data-status={status}>
        <span className="chat-status-dot" aria-hidden />
        <span className="chat-status-text">{statusLabel(status)}</span>
      </div>
    </div>
  );
}
