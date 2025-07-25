console.log("The ClaAppName content_script.js has loaded!");


browser.runtime.onMessage.addListener((message) => {
    const bsvClaAppName = browser.runtime.connectNative("claappname");
    const bsvMessage = `onMessage extensionId=${message.extensionId},tabId=${message.tabId},message.type=${message.type},message.data=${message.data},message.action=${message.action},message.url=${message.url},message.content=${message.content}`;
    bsvClaAppName.postMessage(bsvMessage); 
    
  if (message.type === "showPopup") {
    alert(`User typed or reloaded URL:\n${message.url}\n(Transition: ${message.transitionType})`);
  }
});
