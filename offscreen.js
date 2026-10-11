// Hidden page that plays audio, because service workers cannot use <audio>
let audio = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target !== 'offscreen') {
    return;
  }

  if (message.action === 'stop') {
    // Only counts as stopped if the audio was actually playing
    const playing = audio !== null && !audio.paused && !audio.ended;
    if (playing) audio.pause();
    sendResponse({ stopped: playing });
    return;
  }

  if (message.action !== 'play') {
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
