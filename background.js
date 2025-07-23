console.log("The background.js file has loaded!");

browser.webNavigation.onCreatedNavigationTarget((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("ClaAppName");
    const bsvMessage = `onCreatedNavigationTarget ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage); 
});   

browser.webNavigation.onBeforeNavigate((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("ClaAppName");
    const bsvMessage = `onBeforeNavigate ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage); 
});

browser.webNavigation.onCommitted((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("ClaAppName");
    const bsvMessage = `onCommitted ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage); 
}); 

browser.webNavigation.onDOMContentLoaded((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("ClaAppName");
    const bsvMessage = `onDOMContentLoaded ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage); 
});

browser.webNavigation.onHistoryStateUpdated((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("ClaAppName");
    const bsvMessage = `onHistoryStateUpdated ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage); 
}); 

browser.webNavigation.onReferenceFragmentUpdated((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("ClaAppName");
    const bsvMessage = `onReferenceFragmentUpdated ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage); 
}); 

browser.webNavigation.onCompleted((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("ClaAppName");
    const bsvMessage = `onCompleted ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage); 
}); 


browser.webNavigation.onErrorOccurred((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("ClaAppName");
    const bsvMessage = `onErrorOccurred ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage); 
}); 


