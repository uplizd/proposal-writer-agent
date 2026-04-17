import React from "react";

const TOOLS = [
  { label: "HubSpot CRM", color: "#BA7517" },
  { label: "Google Docs", color: "#378ADD" },
  { label: "Gmail", color: "#1D9E75" },
  { label: "Web Search", color: "#888780" },
];

const QUICK_PROMPTS = [
  "Start Proposal Writer flow for latest HubSpot deal",
  "Draft 3-tier ROI proposal for upcoming meeting",
  "Retrieve latest deal + research 2 case studies",
  "Write executive summary for SaaS prospect",
];

export default function Sidebar({ onQuickPrompt, onReset }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo" aria-hidden>
          PW
        </div>
        <h1 className="sidebar-title">Proposal Writer Agent</h1>
        <p className="sidebar-sub">Powered by UPLIZD</p>
      </div>

      <section className="sidebar-section">
        <div className="sidebar-section-label">Active tools</div>
        <div className="sidebar-tools">
          {TOOLS.map((t) => (
            <div key={t.label} className="sidebar-tool">
              <span
                className="sidebar-tool-dot"
                style={{ background: t.color }}
                aria-hidden
              />
              {t.label}
            </div>
          ))}
        </div>
      </section>

      <section className="sidebar-section">
        <div className="sidebar-section-label">Quick prompts</div>
        <div className="sidebar-chips">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              className="sidebar-chip"
              onClick={() => onQuickPrompt(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      <div className="sidebar-spacer" />

      <button type="button" className="sidebar-reset" onClick={onReset}>
        New session
      </button>
    </aside>
  );
}
