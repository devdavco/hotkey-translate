import { DEFAULT_SETTINGS } from './settings.js';

chrome.commands.onCommand.addListener(async (command, tab) => {
  let text;
  try {
    text = await getSelectedTextInTab(tab.id);
  } catch {
    // Pages like chrome:// or the Chrome Web Store block script injection
    showBadgeError(tab.id);
    return;
  }

  if (!text) {
    showToast(tab.id, 'No hay texto seleccionado');
    return;
  }

  const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);

  if (command === 'translate-selection') {
    const url = `https://translate.google.com/?sl=${settings.sourceLang}&tl=${settings.targetLang}&text=${encodeURIComponent(text)}&op=translate`;
    chrome.tabs.create({ url: url });
    showToast(tab.id, 'Abriendo Google Translate...');
  }

  if (command === 'speak-selection') {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&client=tw-ob&tl=${settings.ttsLang}&q=${encodeURIComponent(text)}&textlen=${text.length}`;
    chrome.tabs.create({ url: url, active: true });
    showToast(tab.id, 'Reproduciendo audio...');
  }
});

async function getSelectedTextInTab(tabId) {
  const results = await chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: getSelectedText
  });
  return results[0].result;
}

function showToast(tabId, message) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: showToastInPage,
    args: [message]
  });
}

function showBadgeError(tabId) {
  chrome.action.setBadgeText({ tabId: tabId, text: '!' });
  setTimeout(() => {
    chrome.action.setBadgeText({ tabId: tabId, text: '' });
  }, 2000);
}

// --- Functions below run inside the web page, not in the service worker ---

function getSelectedText() {
  // window.getSelection() does not see text selected inside form fields
  const el = document.activeElement;
  if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) {
    return el.value.slice(el.selectionStart, el.selectionEnd).trim();
  }
  return window.getSelection().toString().trim();
}

function showToastInPage(message) {
  const existing = document.getElementById('simple-translate-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'simple-translate-toast';
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #333;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    z-index: 2147483647;
    font-family: sans-serif;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
