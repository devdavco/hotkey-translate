import { DEFAULT_SETTINGS } from './settings.js';

const sourceSelect = document.getElementById('sourceLang');
const targetSelect = document.getElementById('targetLang');
const ttsSelect = document.getElementById('ttsLang');
const swapBtn = document.getElementById('swapBtn');
const status = document.getElementById('status');

// Load saved settings into the selects
chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
  sourceSelect.value = settings.sourceLang;
  targetSelect.value = settings.targetLang;
  ttsSelect.value = settings.ttsLang;
  updateSwapButton();
});

// Save as soon as any select changes
sourceSelect.addEventListener('change', saveSettings);
targetSelect.addEventListener('change', saveSettings);
ttsSelect.addEventListener('change', saveSettings);

swapBtn.addEventListener('click', () => {
  const oldSource = sourceSelect.value;
  sourceSelect.value = targetSelect.value;
  targetSelect.value = oldSource;
  saveSettings();
});

function saveSettings() {
  updateSwapButton();
  chrome.storage.sync.set({
    sourceLang: sourceSelect.value,
    targetLang: targetSelect.value,
    ttsLang: ttsSelect.value
  }, () => {
    status.textContent = 'Guardado';
    setTimeout(() => {
      status.textContent = '';
    }, 1500);
  });
}

// "Detect automatically" cannot be a target language
function updateSwapButton() {
  swapBtn.disabled = sourceSelect.value === 'auto';
}

// Show the real shortcuts, which the user may have changed
chrome.commands.getAll((commands) => {
  const list = document.getElementById('shortcuts');
  for (const command of commands) {
    if (command.name.startsWith('_')) continue; // skip built-in commands like _execute_action
    const item = document.createElement('li');
    const keys = document.createElement('span');
    keys.className = 'shortcut';
    keys.textContent = command.shortcut || 'Sin asignar';
    item.append(keys, ' ' + command.description);
    list.appendChild(item);
  }
});

// Links to chrome:// pages do not work from a popup, so open a tab instead
document.getElementById('shortcutsLink').addEventListener('click', (event) => {
  event.preventDefault();
  chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
});
