console.log("The content_script.js has loaded!");


browser.runtime.onMessage.addListener((message) => {
  if (message.type === "showPopup") {
    alert(`User typed or reloaded URL:\n${message.url}\n(Transition: ${message.transitionType})`);
  }
});
