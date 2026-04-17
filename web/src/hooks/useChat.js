import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { runFlow } from "../lib/uplizd";

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: `Hi! I'm your Proposal Writer Agent.\n\nShare discovery notes about a prospect — pain points, budget signals, team size, current tools — and I'll draft a tailored proposal with ROI justification.\n\nI can also retrieve deal details from HubSpot, research industry case studies, and export the final doc to Google Docs + PDF.`,
      ts: Date.now(),
    },
  ]);
  const [status, setStatus] = useState("idle"); // idle | running | error
  const sessionId = useRef(uuidv4());

  const send = useCallback(async (text) => {
    if (!text.trim() || status === "running") return;

    const userMsg = { id: uuidv4(), role: "user", text: text.trim(), ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setStatus("running");

    try {
      const { text: reply } = await runFlow(text.trim(), sessionId.current);
      const assistantMsg = {
        id: uuidv4(),
        role: "assistant",
        text: reply || "Flow completed — no text output returned.",
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setStatus("idle");
    } catch (err) {
      const errMsg = {
        id: uuidv4(),
        role: "error",
        text: `Error: ${err.message}`,
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, errMsg]);
      setStatus("error");
    }
  }, [status]);

  const reset = useCallback(() => {
    sessionId.current = uuidv4();
    setMessages([]);
    setStatus("idle");
  }, []);

  return { messages, status, send, reset, sessionId: sessionId.current };
}
