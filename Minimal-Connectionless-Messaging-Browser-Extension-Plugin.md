# Minimal-Connectionless-Messaging-Browser-Extension-Plugin

A Minimal example of a Connectionless Messaging Browser Extension Plugin.

### Browser Extension Plugin Files

Store the files listed below in a folder for testing purposes. Once uploaded to a Browser's Addon store, these files are managed and stored by the Browser automatically. These files are explicitly required for the Browser Extension Plugin addon. 

eg ```c:\MyBrowserExtensionUsingClarion\v1\```


    ├── Manifest.json
        ├── background.js
        ├── content_script.js
        ├── Clarion_AppName.manifest
        ├── Clarion_AppName.exe

To load the Browser Extension Plugin for testing purposes.
``` 
Type 'about:debugging' into Omnibox (address box) -> Click 'This Firefox' -> Click 'Load Temporary Add-on...' -> Navigate to 'C:\MyBrowserExtensionUsingClarion\v1\' and select 'manifest.json'.
```


### Manifest.json


[Firefox Manifest.json documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

[Chrome Manifest.json documentation](https://developer.chrome.com/docs/extensions/reference/manifest)

[Edge Manifest.json documentation](https://learn.microsoft.com/en-us/microsoft-edge/extensions/getting-started/manifest-format?tabs=v2)


Every Browser Extension Plugin (BEP) needs a manifest.json file. This file contains metadata providing information about your extension like name, version and controls the functionality the browser can use with the supplied javascript (and html files).

Minimal Required Information for a manifest.json file:

| Key | Value | Description |
| --- | --- | --- | 
| [manifest_version](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/manifest_version) | 2 or 3 | Currently, you can only specify version 2 (deprecated) or version 3 |
| [name](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/name) | "My 45 Character Browser Extension Plugin Name" | Identify the extension in the browser's user interface and on sites like https://addons.mozilla.org (50char max), https://chromewebstore.google.com (75 char max) & https://microsoftedge.microsoft.com/addons (45 char max). |
| [version](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/version) | n.n.n.n | The version string consists of 1 to 4 numbers separated by dots, for example, 1.2.3.4. Non-zero numbers must not include a leading zero. For example, 2.01 is not allowed; however, 0.2, 2.0.1, and 2.10 are allowed. |

Additional Required Information for a Clarion app to use NativeCommunication aka [Native Messaging](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging):

| Key | Value | Description |
| --- | --- | --- | 
| [description](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/description) | "A 132 char max description of your browser extension plugin goes here" | A short description of the extension, intended for display in the browser's user interface upto 132 characters. |
| [background](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background) | filename.js | Use the background key to include one or more background scripts, a background page, or a Manifest V3 background tasks 'Service worker' in your extension. |
| [permissions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions) | [click here for options](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#api_permissions) | Use the permissions key to request special powers for your extension. This key is an array of strings, and each string is a request for a permission to a WebExtension API like [DevTools](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/devtools_page). | 
| [content_scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_scripts) | filename.js | Instructs the browser to load content scripts into web pages whose URL matches a pattern. |
| Firefox Only [browser_specific_settings](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings) | guid:{0339088b-ba1a-44dd-baee-da8de84e222d} or name@domainname | must either match the pattern ```/^\{[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\}$/i``` or ```/^[a-z0-9-._]*@[a-z0-9-._]+$/i```. |
| Firefox Only [applications](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings) | guid:{0339088b-ba1a-44dd-baee-da8de84e222d} or name@domainname | "applications" is now deprecated and replaced by "browser_specific_settings" shown above. |

[Complete Firefox manifest.json file for download](Firefox/manifest.json)

### background.js


```
browser.webNavigation
```
Is a WebExtension API that lets the script monitor and respond to [webNavigation events](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation). Its the Browser level navigation UI, unlike [webRequest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest) which are event listeners for the lifecycle of events making an HTTP request, which includes websocket requests on ws:// and wss://. 

This webNavigation API needs to have the "webNavigation" permission in the manifest.json file.


The lifecycle of webNavigation events in order....
```
browser.webNavigation.onCreatedNavigationTarget ! Fired when a new tab or window is created for navigation.
browser.webNavigation.onBeforeNavigate ! Fired before navigation starts.
browser.webNavigation.onCommitted ! Fired when the browser commits to loading a new document.
browser.webNavigation.onDOMContentLoaded ! Fired when the document is loaded and parsed, and the DOM (Document Object Model) is fully constructed, but linked resources such as images, stylesheets and subframes may not yet be loaded.
browser.webNavigation.onHistoryStateUpdated ! Fired when the page used the history API to update the URL displayed in the browser's location bar. 
browser.webNavigation.onReferenceFragmentUpdated ! Fired if the fragment identifier for a page is changed. For example, if a page implements a table of contents using fragments, and the user clicks an entry in the table of contents, this event fires.
browser.webNavigation.onCompleted ! Fired when a document, including the resources it refers to, is completely loaded and initialized.

browser.webNavigation.onErrorOccurred ! Fired at any time during the webNavigation lifecycle of events when an error occurs.
```

Functions which can be added to the above webNavigation events.
```
addListener(listener,filter) ! Adds a listener to this event.
removeListener(listener,filter) ! Stop listening to this event. The listener argument is the listener to remove.
hasListener(listener,filter) ! Check whether listener is registered for this event. Returns true if it is listening, false otherwise.
```

```listener``` is the object name that receives the ```details``` object properties linked to the Web Extension api WebNavigation when the event fires.
```filter``` is an object that restricts the listener to specific URLs or patterns. eg defined before the WebNavigation event listener, this will trigger only when pages from 'example.com' or domains starting with 'developer' match the webNavigation event function listener.

```
const filter = {
  url: [
    { hostContains: "example.com" },
    { hostPrefix: "developer" }
  ]
};
```


[onCreatedNavigationTarget details object](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/onCreatedNavigationTarget#details)

[onBeforeNavigate details object](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/onBeforeNavigate#details)

[onCommitted details object](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/onCommitted#details)

[onDOMContentLoaded details object](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/onDOMContentLoaded#details)

[onHistoryStateUpdated details object](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/onHistoryStateUpdated#details)

[onReferenceFragmentUpdated details object](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/onReferenceFragmentUpdated#details)

[onCompleted details object](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/onCompleted#details)

[onErrorOccurred details object](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/onErrorOccurred#details)


```
const MyBlockScopedInitialisedVariable = Object/Array/Function/Property/Value/Method

```
```const``` declares a Block Scoped Variable (BSV) that can not be reassigned. BSV is a variable only accessible inside the curly brace {} block.

It must be intialised at the time of declaration.

The value it holds can be an object, array, function, a property, value or method.

```
const Message = `text ${details.tabID}`
```
The ```${...}``` syntax is how expressions are embedded, evaluated and expanded to a value inside a template literal, which is defined using back ticks. This can help provide "debugging" insight and control into the values of variables and properties which can be passed to the nativeCommunication linked Clarion app, instead of using ```console.log("Text:", variable);``` which displays messages and values in the Webbrowser's F12 console tab, or using the ```alert("Text:" + variable + "more text!");``` popup message box.


```
.postMessage()
```

```postMessage``` is a method that safely sends Cross Origin communication between window objects and thus bypasses the CORS (Cross-Origin Resource Sharing) setting which is enforced by browsers to protect users from unauthorized cross-origin requests. 

```
browser.webNavigation.onBeforeNavigate.addListener((details) => 
    {
    const MyBlockScopedInitialisedVariable = browser.runtime.connectNative("Clarion_AppName"); // "Clarion_AppName" must match "Clarion_AppName.manifest" and "Clarion_Appname.exe" found in the "c:\MyBrowserExtensionForClarion\v1\" folder.
    const MyMessageSentToClarionApp = `onBeforeNavigate ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    MyBlockScopedInitialisedVariable.postMessage(MyMessageSentToClarionApp); // if app expects raw string which is serialized using JSON, UTF-8 encoded and is preceded with an unsigned 32-bit value containing the message length in native byte order.
    }
);
```

[Complete Firefox Background.js file for download](Firefox/background.js)