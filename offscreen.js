// Hidden page that plays audio, because service workers cannot use <audio>
let audio = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target !== 'offscreen' || message.action !== 'play') {
    return;
  }

  if (audio) audio.pause();
  audio = new Audio(message.url);

  // play() rejects if the audio fails to load or to start
  audio.play()
    .then(() => sendResponse({ ok: true }))
    .catch(() => sendResponse({ ok: false }));

  return true; // keep the channel open for the async response
});
