/*
The lines before the chrome.webNavigation listeners are processed when the Manifest.json is loaded in Firefox.
If you click the About:Debugging->This Firefox->Inspect button, the Firefox debugging tool window appears, switches to the Console tab and shows the console.log message below.

These lines of code, run everytime you click the About:Debugging->This Firefox->Reload button or load the manifest.json file for the first time.
console.log("The ClaAppName background.js file has loaded!");
const ClaAppName = chrome.runtime.connectNative("claappname");
const Message = `The ClaAppName background.js file has loaded!`;
ClaAppName.postMessage(Message);

The ClaAppName.clw:Message('Glo:CurrentPID = ' & Glo:CurrentPID) will appear and act as a breakpoint, in which to then load the Clarion Debugger and attach to the running process to aid with debugging.
*/

console.log("The ClaAppName background.js file has loaded!");
// /* 
const ClaAppName = chrome.runtime.connectNative("claappname");
const Message = `The ClaAppName background.js file has loaded!`;
ClaAppName.postMessage(Message);
// */
chrome.webNavigation.onCreatedNavigationTarget.addListener((details) => 
{
    console.log("The ClaAppName background.js onCreatedNavigationTarget event");
    const bsvClaAppName = chrome.runtime.connectNative("claappname");
    const bsvMessage = `onCreatedNavigationTarget sourceFrameId=${details.sourceFrameId},processId=${details.processId},sourceTabId=${details.sourceTabId},tabId=${details.tabId},timeStamp=${details.timeStamp},url=${details.url},windowId=${details.windowId}`;
    bsvClaAppName.postMessage(bsvMessage) 
});

chrome.webNavigation.onBeforeNavigate.addListener((details) =>
{
    console.log("The ClaAppName background.js onBeforeNavigate event");
    const bsvClaAppName = chrome.runtime.connectNative("claappname");
    const bsvMessage = `onBeforeNavigate tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage) 
});

chrome.webNavigation.onCommitted.addListener((details) => 
{
    console.log("The ClaAppName background.js onCommitted event");
    const bsvClaAppName = chrome.runtime.connectNative("claappname");
    const bsvMessage = `onCommitted documentId=${details.documentId},parentDocumentId=${details.parentDocumentId},documentLifecycle=${details.documentLifecycle},tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentFrameId},frameType=${details.frameType},timeStamp=${details.timeStamp},transitionType=${details.transitionType},transitionQualifiers=${details.transitionQualifiers}`;
    bsvClaAppName.postMessage(bsvMessage) 
});


chrome.webNavigation.onDOMContentLoaded.addListener((details) => 
{
    console.log("The ClaAppName background.js onDOMContentLoaded event");
    const bsvClaAppName = chrome.runtime.connectNative("claappname");
    const bsvMessage = `onDOMContentLoaded tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage) 
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => 
{
    console.log("The ClaAppName background.js onHistoryStateUpdated event");
    const bsvClaAppName = chrome.runtime.connectNative("claappname");
    const bsvMessage = `onHistoryStateUpdated tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp},transitionType=${details.transitionType},transitionQualifiers=${details.transitionQualifiers}`;
    bsvClaAppName.postMessage(bsvMessage) 
}); 

chrome.webNavigation.onReferenceFragmentUpdated.addListener((details) => 
{
    console.log("The ClaAppName background.js onReferenceFragmentUpdated event");
    const bsvClaAppName = chrome.runtime.connectNative("claappname");
    const bsvMessage = `onReferenceFragmentUpdated tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp},transitionType=${details.transitionType},transitionQualifiers=${details.transitionQualifiers}`;
    bsvClaAppName.postMessage(bsvMessage) 
}); 

chrome.webNavigation.onCompleted.addListener((details) => 
{
    console.log("The ClaAppName background.js onCompleted event");
    const bsvClaAppName = chrome.runtime.connectNative("claappname");
    const bsvMessage = `onCompleted tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp}`;
    bsvClaAppName.postMessage(bsvMessage) 
}); 


chrome.webNavigation.onErrorOccurred.addListener((details) => 
{
    console.log("The ClaAppName background.js onErrorOccurred event");
    const bsvClaAppName = chrome.runtime.connectNative("claappname");
    const bsvMessage = `onErrorOccurred tabId=${details.tabId},url=${details.url},processId=${details.processId},frameId=${details.frameId},parentFrameId=${details.parentframeId},timeStamp=${details.timeStamp},error=${details.error}`;
    bsvClaAppName.postMessage(bsvMessage) 
}); 


