console.log("The ClaAppName background.js file has loaded!");

browser.webNavigation.onCreatedNavigationTarget((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("claappname");
    const bsvMessage = `onCreatedNavigationTarget sourceFrameId=${details.sourceFrameId},processId=${details.processId},sourceTabId=${details.sourceTabId},tabId=${details.tabId},timeStamp=${details.timeStamp},url=${details.url},windowId=${details.windowId}`;
    bsvClaAppName.postMessage(bsvMessage); 
});   

browser.webNavigation.onBeforeNavigate((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("claappname");
    const bsvMessage = `onBeforeNavigate tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage); 
});

browser.webNavigation.onCommitted((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("claappname");
    const bsvMessage = `onCommitted documentId=${details.documentId},parentDocumentId=${details.parentDocumentId},documentLifecycle=${details.documentLifecycle},tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentFrameId},frameType=${details.frameType},timeStamp=${details.timeStamp},transitionType=${details.transitionType},transitionQualifiers=${details.transitionQualifiers}`;
    bsvClaAppName.postMessage(bsvMessage); 
}); 

browser.webNavigation.onDOMContentLoaded((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("claappname");
    const bsvMessage = `onDOMContentLoaded tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage); 
});

browser.webNavigation.onHistoryStateUpdated((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("claappname");
    const bsvMessage = `onHistoryStateUpdated tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp},transitionType=${details.transitionType},transitionQualifiers=${details.transitionQualifiers}`;
    bsvClaAppName.postMessage(bsvMessage); 
}); 

browser.webNavigation.onReferenceFragmentUpdated((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("claappname");
    const bsvMessage = `onReferenceFragmentUpdated tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp},transitionType=${details.transitionType},transitionQualifiers=${details.transitionQualifiers}`;
    bsvClaAppName.postMessage(bsvMessage); 
}); 

browser.webNavigation.onCompleted((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("claappname");
    const bsvMessage = `onCompleted tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage); 
}); 


browser.webNavigation.onErrorOccurred((details) => 
{
    const bsvClaAppName = browser.runtime.connectNative("claappname");
    const bsvMessage = `onErrorOccurred tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp},error=${details.error}`;
    bsvClaAppName.postMessage(bsvMessage); 
}); 


