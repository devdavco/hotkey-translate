// Keyboard shortcuts: ask the content script of the active tab to act
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: command === 'translate-selection' ? 'translate' : 'speak'
      });
    }
  });
});

// Messages from the content script
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'openTranslateUrl') {
    const url = `https://translate.google.com/?sl=${request.sourceLang}&tl=${request.targetLang}&text=${encodeURIComponent(request.text)}&op=translate`;
    chrome.tabs.create({ url: url });
  }

  if (request.action === 'playAudio') {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&client=tw-ob&tl=${request.ttsLang}&q=${encodeURIComponent(request.text)}&textlen=${request.text.length}`;
    chrome.tabs.create({ url: url, active: true });
  }
});
