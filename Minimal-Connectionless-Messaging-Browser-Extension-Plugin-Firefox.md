# Minimal-Connectionless-Messaging-Browser-Extension-Plugin

A Minimal example of a Connectionless Messaging Browser Extension Plugin.

### Browser Extension Plugin Files

Store the files listed below in a folder for testing purposes. Once uploaded to a Browser's Addon store, these files are managed and stored by the Browser automatically.

eg ```c:\MyBrowserExtensionForClarion\v1\```


    ├── Manifest.json
        ├── background.js
        ├── content_script.js
        ├── Clarion_AppName.manifest
        

### Manifest.json


[Firefox Manifest.json documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

[Chrome Manifest.json documentation](https://developer.chrome.com/docs/extensions/reference/manifest)

[Edge Manifest.json documentation](https://learn.microsoft.com/en-us/microsoft-edge/extensions/getting-started/manifest-format?tabs=v2)


Every Browser Extension Plugin (BEP) needs a manifest.json file. This file contains metadata providing information about your extension like name, version and controls the functionality you browser can use with the supplied javascript and html files.

Minimal Required Information:

| Key | Value | Description |
| --- | --- | --- | 
| [manifest_version](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/manifest_version) | 2 or 3 | Currently, you can only specify version 2 or version 3 |
| [name](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/name) | "My Minimal Browser Extension Plugin" | This is used to identify the extension in the browser's user interface and on sites like https://addons.mozilla.org, https://chromewebstore.google.com & https://microsoftedge.microsoft.com/addons |
| [version](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/version) | n.n.n.n | The version string consists of 1 to 4 numbers separated by dots, for example, 1.2.3.4. Non-zero numbers must not include a leading zero. For example, 2.01 is not allowed; however, 0.2, 2.0.1, and 2.10 are allowed. |

Additional Required Information:

| Key | Value | Description |
| --- | --- | --- | 
| [description](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/description) | "A description of your browser extension plugin goes here" | A short description of the extension, intended for display in the browser's user interface upto 132 characters |
| [background](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background) | filename.js | Use the background key to include one or more background scripts, a background page, or a Service worker in your extension. |
| [permissions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions) | [click here for options](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#api_permissions) | Use the permissions key to request special powers for your extension. This key is an array of strings, and each string is a request for a permission. | 
| [content_scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_scripts) | filename.js | Instructs the browser to load content scripts into web pages whose URL matches a pattern. |
| Firefox Only [browser_specific_settings](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings) | guid:{0339088b-ba1a-44dd-baee-da8de84e222d} or name@domainname | must either match the pattern ```/^\{[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\}$/i``` or ```/^[a-z0-9-._]*@[a-z0-9-._]+$/i```. |
| Firefox Only [applications](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings) | guid:{0339088b-ba1a-44dd-baee-da8de84e222d} or name@domainname | "applications" is now deprecated and replaced by "browser_specific_settings" shown above. |

### background.js


```
browser.webNavigation
```
Is a WebExtension API that lets the script monitor and respond to [webNavigation events](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation)


The lifecycle of webNavigation events in order....
```
browser.webNavigation.onCreatedNavigationTarget ! When a new tab or window is created for navigation.
browser.webNavigation.onBeforeNavigate ! Fired before navigation starts.
browser.webNavigation.onCommitted ! Fired when the browser commits to loading a new document.
browser.webNavigation.onDOMContentLoaded
browser.webNavigation.onHistoryStateUpdated ! Fired when the page used the history API to update the URL displayed in the browser's location bar. 
browser.webNavigation.onReferenceFragmentUpdated ! Fired if the fragment identifier for a page is changed. For example, if a page implements a table of contents using fragments, and the user clicks an entry in the table of contents, this event fires.
browser.webNavigation.onCompleted
```

Can be fired at any time during the webNavigation lifecycle of events. Its the Browser level navigation UI, unlike [webRequest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest) which are event listeners for the lifecycle of events making an HTTP request, which includes websocket requests on ws:// and wss://. 

```
browser.webNavigation.onErrorOccurred
```

Functions which can be added to the above webNavigation events.
```
addListener(listener)
removeListener(listener)
hasListener(listener)
```

```
const MyBlockScopedInitialisedVariable = Object/Array/Function/Property/Value/Method

```
```const``` declares a Block Scoped Variable (BSV) that can not be reassigned. BSV is a variable only accessible inside the curly brace {} block.

It must be intialised at the time of declaration.

The value it holds can be an object, array, function, a property, value or method.

```
const Message = `text ${details.tabID}`
```
The ```${...}``` syntax is how expressions are embedded, evaluated and expanded to a value inside a template literal, which is defined using back ticks. This can help provide insight into the values of variables and properties which can be passed to the native Communication app.

```
.postMessage()
```

Is a method that safely sends Cross Origin (CORS stands for Cross-Origin Resource Sharing) communication between window objects. 

```
browser.webNavigation.onBeforeNavigate.addListener((details) => 
    {
    const MyBlockScopedInitialisedVariable = browser.runtime.connectNative("Clarion_AppName"); // "Name" must match "Clarion_AppName.manifest"
    const message = `onBeforeNavigate ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    MyBlockScopedInitialisedVariable.postMessage(message); // if app expects raw string
    }
);