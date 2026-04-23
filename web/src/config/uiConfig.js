/**
 * Sidebar copy + integrations list (matches the Marketplace flow tooling).
 */

export const BRAND = Object.freeze({
  logoLetters: "PW",
  title: "Proposal Writer Agent",
  poweredBy: "Powered by UPLIZD",
});

/** @type {{ label: string, color: string }[]} */
export const SIDEBAR_TOOLS = Object.freeze([
  { label: "HubSpot CRM", color: "#BA7517" },
  { label: "Google Docs", color: "#378ADD" },
  { label: "Gmail", color: "#1D9E75" },
  { label: "Web Search", color: "#888780" },
]);

/** @type {readonly string[]} */
export const QUICK_PROMPTS = Object.freeze([
  "Start Proposal Writer flow for latest HubSpot deal",
  "Draft 3-tier ROI proposal for upcoming meeting",
  "Retrieve latest deal + research 2 case studies",
  "Write executive summary for SaaS prospect",
]);

export const SIDEBAR_SECTION_TOOLS = "Active tools";
export const SIDEBAR_SECTION_PROMPTS = "Quick prompts";
