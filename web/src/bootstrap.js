/**
 * Marks the document with the UI bundle id for debugging / future analytics hooks.
 * Loaded first from main.jsx so it runs before React mounts.
 */

const APP_SHELL_ID = "proposal-writer-agent";

export function getAppShellId() {
  return APP_SHELL_ID;
}

/** @returns {HTMLElement} */
export function getMountRoot() {
  return document.getElementById("root");
}

if (typeof document !== "undefined") {
  document.documentElement.dataset.uplizdUiShell = APP_SHELL_ID;
}
