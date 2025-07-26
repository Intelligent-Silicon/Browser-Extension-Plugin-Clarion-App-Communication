# Minimal-Connectionless-Messaging-Browser-Extension-Plugin

A Minimal example of a Connectionless Messaging Browser Extension Plugin and step-through for Firefox, Google Chrome & Microsoft Edge.

### Browser Extension Plugin Files

Store the files listed below in a folder for testing purposes. Once uploaded to a Browser's Addon store, these files are managed and stored by the Browser automatically. These files are explicitly required for the Browser Extension Plugin addon to work. 

eg ```c:\MyBrowserExtensionUsingClarion\v1\```


    ├── Manifest.json
        ├── background.js
        ├── content_script.js
        ├── Clarion_AppName.manifest
        ├── Clarion_AppName.exe

[Manifest.json](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#manifestjson)

[background.js](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#backgroundjs)

[content_script.js](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#content_scriptjs)

[Clarion_AppName.manifest](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#clarion_appnamemanifest)

[Clarion_AppName.exe](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#clarion_appnameexe)

[Windows Registry](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#windows-registry)

[Firefox Temporary Extension](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#firefox-temporary-extension)

[Chrome Temporary Extension](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#chrome-temporary-extension)

[Edge Temporary Extension](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#edge-temporary-extension)

[Browser Extension Plugin Testing and Debugging](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#extension-testing-and-debugging)

[Clarion Debugger](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#clarion-debugger)


### Manifest.json


[Firefox Manifest.json documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

[Chrome Manifest.json documentation](https://developer.chrome.com/docs/extensions/reference/manifest)

[Edge Manifest.json documentation](https://learn.microsoft.com/en-us/microsoft-edge/extensions/getting-started/manifest-format?tabs=v2)


Every Browser Extension Plugin (BEP) needs a manifest.json file. This file contains metadata providing information about your extension like name, version and controls the functionality the browser allows access to with the supplied javascript (and any html files).

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
| [applications](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings) (Firefox only)| guid:{0339088b-ba1a-44dd-baee-da8de84e222d} or name@domainname | "applications" is now deprecated and replaced by "browser_specific_settings" shown below, but, Firefox still supports it. |
| [browser_specific_settings](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings) (Firefox only) | guid:{0339088b-ba1a-44dd-baee-da8de84e222d} or name@domainname | must either match the pattern ```/^\{[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\}$/i``` or ```/^[a-z0-9-._]*@[a-z0-9-._]+$/i```. |


[Complete Firefox manifest.json file using applications name@domain for download](connectionless-messaging/Firefox/manifest.json/applications/name/manifest.json)

[Complete Firefox manifest.json file using applications {guid} for download](connectionless-messaging/Firefox/manifest.json/applications/guid/manifest.json)

[Complete Firefox manifest.json file using browser_specific_settings name@domain for download](connectionless-messaging/Firefox/manifest.json/browser_specific_settings/name/manifest.json)

[Complete Firefox manifest.json file using browser_specific_settings {guid} for download](connectionless-messaging/Firefox/manifest.json/browser_specific_settings/guid/manifest.json)

### background.js
A [Background Script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts) lets you monitor and respond to events in the context of the Browser using the [Firefox](https://extensionworkshop.com/documentation/develop/about-the-webextensions-api/) [Chrome](https://developer.chrome.com/docs/extensions/reference/api) [Edge](https://learn.microsoft.com/en-us/microsoft-edge/extensions/developer-guide/api-support) Web Extension API's (WEA) like navigating to a web page (WEA:webNavigation), modifying a bookmark (WEA:bookmarks) or opening a new tab (WEA:tabs). 

WEA's require permissions to be set in the ```manifest.json``` file to access their Browser events.

```
[browser|chrome].webNavigation
```

```[browser|chrome].webNavigation``` is a WebExtension API that lets the ```background.js``` script monitor and respond to [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation) [Chrome](https://developer.chrome.com/docs/extensions/reference/api/webNavigation) [Edge](https://learn.microsoft.com/en-us/microsoft-edge/extensions/developer-guide/api-support) WEA:webNavigation events. 

Firefox uses ```browser``` to access WEA's and Chrome & Edge use ```Chrome``` to access WEA's. 

WEA:webNavigation is the Browser level navigation UI, unlike [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest) [Chrome](https://developer.chrome.com/docs/extensions/reference/api/webRequest) [Edge](https://learn.microsoft.com/en-us/microsoft-edge/extensions/developer-guide/api-support) WEA:webRequest which are event listeners for the lifecycle of events making requests on ```http://``` (HyperText Transfer Protocol), ```https://``` (HyperText Transfer Protocol Secure), ```ftp://``` (File Transfer Protocol), ```file://``` (device local storage), ```ws://``` (Web Socket on http://) , ```wss://``` (Web Socket Secure on https://), and ```urn://``` (Uniform Resource Identifier (URI) using the Uniform Resource Name (URN) scheme) in order to observe & analyze traffic and to intercept, block, or modify requests in-transit. 

This WEA:webNavigation API needs to have the "webNavigation" permission in the manifest.json file.


The Firefox lifecycle of browser.webNavigation events in order....
```
browser.webNavigation.onCreatedNavigationTarget // Fired when a new tab or window is created for navigation.
browser.webNavigation.onBeforeNavigate // Fired before navigation starts.
browser.webNavigation.onCommitted // Fired when the browser commits to loading a new document.
browser.webNavigation.onDOMContentLoaded // Fired when the document is loaded and parsed, and the DOM (Document Object Model) is fully constructed, but linked resources such as images, stylesheets and subframes may not yet be loaded.
browser.webNavigation.onHistoryStateUpdated // Fired when the page used the history API to update the URL displayed in the browser's location bar. 
browser.webNavigation.onReferenceFragmentUpdated // Fired if the fragment identifier for a page is changed. For example, if a page implements a table of contents using fragments, and the user clicks an entry in the table of contents, this event fires.
browser.webNavigation.onCompleted // Fired when a document, including the resources it refers to, is completely loaded and initialized.

browser.webNavigation.onErrorOccurred // Fired at any time during the webNavigation lifecycle of events when an error occurs.
```

Functions which can be added to the above WEA:webNavigation events.
```
.addListener(listener,filter) ! Adds a listener to this event.
.removeListener(listener,filter) ! Stop listening to this event. The listener argument is the listener to remove.
.hasListener(listener,filter) ! Check whether listener is registered for this event. Returns true if it is listening, false otherwise.
```

```listener``` is the object name that receives the ```details``` object properties linked to the WEA:WebNavigation when its events fire.

```filter``` is an object that restricts the listener to specific URLs or patterns. eg defined before the WEA:WebNavigation event listener, this will trigger only when pages from 'example.com' or domains starting with 'developer' match the WEA:webNavigation event function listener.

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
The ```${...}``` syntax is how expressions are embedded, evaluated and expanded to a value inside a template literal, which is defined using back ticks. This can help provide "debugging" insight and control into the values of variables and properties which can be passed to the [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging) [Chrome](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging) [Edge](https://learn.microsoft.com/en-us/microsoft-edge/extensions/developer-guide/native-messaging) nativeMessaging linked Clarion app, instead of using ```console.log("Text:", variable);``` which displays messages and values in the Webbrowser's F12 console tab, or using the ```alert("Text:" + variable + "more text!");``` popup message box.

```
BSV.postMessage()
```

```BSV.postMessage``` is a method that safely sends Cross Origin communication between Browser objects and thus bypasses the CORS (Cross-Origin Resource Sharing) setting which is enforced by browsers to protect users from unauthorized cross-origin requests. 

```
browser.webNavigation.onBeforeNavigate.addListener((details) => 
    {
    const MyBlockScopedInitialisedVariable = browser.runtime.connectNative("Clarion_AppName"); // "Clarion_AppName" must match "Clarion_AppName.manifest" aka ClaAppName.manifest and "Clarion_Appname.exe" aka ClaAppName.exe found in the "c:\MyBrowserExtensionForClarion\v1\" folder.
    const MyMessageSentToClarionApp = `onBeforeNavigate ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    MyBlockScopedInitialisedVariable.postMessage(MyMessageSentToClarionApp); // A raw string which is serialized using JSON, UTF-8 encoded and is preceded with an unsigned 32-bit value containing the message length in native byte order. '[Ulong][UTF-8 String]'
    }
);
```

[Complete Firefox Background.js file for download](connectionless-messaging/Firefox/background.js/background.js)

### content_script.js
A [content script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#connection-based_messaging) lets you monitor and respond to events in the context of a web page using the Web Extension APIs. Content scripts are similar to website/webpage scripts loaded using the <script> element, but require permissions to be set in the ```manifest.json``` file to access the website/webpage content.

```
[browser|Chrome].runtime
```
```[browser|Chrome].runtime``` provides information about your extension and the environment it's running on. Messaging APIs enabling you to communicate between different parts of your extension, other extensions and native applications.

```
[browser|Chrome].runtime.onMessage
```
```[browser|Chrome].runtime.onMessage``` is an event for listening to the Payload Object sent using [[browser|Chrome].runtime.sendMessage()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage) or [[browser|Chrome].tabs.sendMessage()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage) from another part of (your) extension(s) or native application. eg listening for messages from a ```background.js``` and vice versa, or an [options page or popup](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#sidebars_popups_and_options_pages).


***                                                                                                                      ***
The Structure or Properties of ```message``` depends entirely on what the Sender includes. There is no fixed schema.
***                                                                                                                      ***


The properties sent from different Methods that send to ```[browser|Chrome].runtime.onMessage```.

[runtime.sendMessage()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage)
| Parameter | Data Type | Notes |
| --- | --- | --- |
| extensionId | String | If extensionId is omitted, the message is sent to your extension. The ID of the extension to send the message to. Include this to send the message to a different extension. |
| message | Any | An object that can be a [structured clone serialized](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities#data_cloning_algorithm) |
| options | Object | |
| includeTlsChannelId | Boolean | The TLS channel ID passed into ```runtime.onMessageExternal``` for processes that are listening for the connection event. |

[tabs.sendMessage()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage)
| Parameter | Data Type | Notes |
| --- | --- | --- |
| tabId | Integer | ID of the tab whose content scripts we want to send a message to. |
| message | Any | An object that can be serialized |
| options | Object | |
| frameId | Integer | Sends the message to a specific frame identified by frameId instead of all frames in the tab. Whether the content script is executed in all frames depends on the all_frames setting in the content_scripts section of manifest.json | 


Commonly used properties of the ```message``` object found across other extensions and websites, but not an exhaustive list as any developer can make up their own including [obfuscated properties](https://en.wikipedia.org/wiki/Obfuscation_(software)).

| Property | Notes |
| --- | --- |
| type | Identifies the kind of message (e.g. "ping", "getData"). |
| data | Contains the actual payload (string, object, etc.) |
| action | Alternative to type, used to describe intent. |
| url | URL being referenced or acted upon |
| content | Arbitrary content passed from sender | 

Javascript example of how the ```message``` object could be setup, its format is purely up to the developer.
```
// Sender
browser.runtime.sendMessage({
  type: "ping",
  data: "Hello from content script",
  aNotVeryObfuscatedProperty: "This is definately not obfuscated!",
});

// Listener
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);
  console.log("Type:", message.type);   // "ping"
  console.log("Data:", message.data);   // "Hello from content script"
  console.log("aNotVeryObfuscatedProperty:", message.aNotVeryObfuscatedProperty);   // "This is definately not obfuscated!"
});
```

```
if (message.type === "showPopup") { alert(`User typed or reloaded URL:\n${message.url}\n(Transition: ${message.transitionType})`) }
```
  
Avoid creating multiple ```[browser|Chrome].runtime.onMessage()``` listeners for the same type of message ```if (message.type === "showPopup")``` because the order in which multiple listeners fire is strangely not guaranteed!!! An interesting insight into the working internals of browsers.

So a better way to send messages between background scripts and content scripts is to use [Firefox connection-based messaging](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#connection-based_messaging), [Chrome Long-lived connections](https://developer.chrome.com/docs/extensions/develop/concepts/messaging#connect), [Edge Port based messaging](https://learn.microsoft.com/en-us/microsoft-edge/extensions/developer-guide/native-messaging#connecting-to-a-native-application) aka [persistent connection messaging](https://github.com/Intelligent-Silicon/Browser-Extension-Plugin-Clarion-App-Communication/tree/main?tab=readme-ov-file#persistent-connection-messaging). 

[Complete Firefox content_script.js file for download](connectionless-messaging/Firefox/content_script.js/content_script.js)


### Clarion_AppName.manifest

This is whats called a [Firefox App manifest file](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging#app_manifest), [Chrome Native Messaging Host manifest file](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging#native-messaging-host) & [Edge Native Messaging Host manifest file](https://learn.microsoft.com/en-us/microsoft-edge/extensions/developer-guide/native-messaging?tabs=v3%2Cwindows#step-2-create-your-native-messaging-host-manifest-file). 

It needs to be installed alongside the Clarion app exe and match the name of the exe. eg ```ClaAppName.manifest``` must match ```ClaAppName.exe```.

The manifest file provides additional information controlling how the ```ClaAppName.exe``` communicates with the Browser. Without it, and the [Windows Registry setting below](https://github.com/Intelligent-Silicon/Browser-Extension-Plugin-Clarion-App-Communication/blob/main/Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md#windows-registry), the Browser can not communicate with the Clarion app.


| Element | Value | Description |
| --- | --- | --- |
| [Name](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#native_messaging_manifests) | String | Name of the Clarion app Exe file "ClaAppName" which must also match the name passed into runtime.connectNative() or runtime.sendNativeMessage() by the extension. |
| [Description](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#native_messaging_manifests) | String | Description of the native application. |
| [Path](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#native_messaging_manifests) | String | Path to the native application, relative to the ```ClaAppName.manifest``` file. |
| [Type](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#native_messaging_manifests) | String | Takes the value "stdio" only, which indicates that messages are received by the Clarion app using [Console window](https://learn.microsoft.com/en-us/windows/console/consoles) or [Anonymous Pipes](https://learn.microsoft.com/en-us/windows/win32/procthread/creating-a-child-process-with-redirected-input-and-output) standard input (stdin) and sent using standard output (stdout). |
| [allowed_extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#native_messaging_manifests) | String Array | An array of Browser Extension [add-on ID's](https://extensionworkshop.com/documentation/develop/extensions-and-the-add-on-id/) defined in ```browser_specific_settings``` in the ```manifest.json``` for the Browser Extension Plugin. |


[Complete Firefox ClaAppName.manifest file using name@domain for download](connectionless-messaging/Firefox/ClaAppName.manifest/name/ClaAppName.manifest)

[Complete Firefox ClaAppName.manifest file using {guid} for download](connectionless-messaging/Firefox/ClaAppName.manifest/guid/ClaAppName.manifest)

### ClaAppName.exe

[Complete ClaAppName.clw using allocConsole for download](connectionless-messaging/ClaAppName.exe/allocConsole/ClaAppName.clw)

[Complete ClaAppName.clw using Anonymous Pipes for download](connectionless-messaging/ClaAppName.exe/pipes/ClaAppName.clw)


### Windows Registry

Whilst the clarion application manifest file can be located anywhere on the device, two registry options exist: 
 
| Browser | Registry Hive | Registry Setting Add Command | User Access |
| --- | --- | --- | --- |
| Firefox | HKLM | REG ADD "HKLM\Software\Mozilla\NativeMessagingHosts\ClaAppName" /ve /t REG_SZ /d "C:\MyBrowserExtensionUsingClarion\v1\ClaAppName.manifest" /f | All Users |
| Firefox | HKCU | REG ADD "HKCU\Software\Mozilla\NativeMessagingHosts\ClaAppName" /ve /t REG_SZ /d "C:\MyBrowserExtensionUsingClarion\v1\ClaAppName.manifest" /f | Current logged in user |
| Chrome | HKLM | REG ADD "HKLM\Software\Google\Chrome\NativeMessagingHosts\ClaAppName" /ve /t REG_SZ /d "C:\MyBrowserExtensionUsingClarion\v1\ClaAppName.manifest" /f | All Users |
| Chrome | HKCU | REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\ClaAppName" /ve /t REG_SZ /d "C:\MyBrowserExtensionUsingClarion\v1\ClaAppName.manifest" /f | Current logged in user |
| Edge | HKLM | REG ADD "HKLM\Software\Microsoft\Edge\NativeMessagingHosts\ClaAppName" /ve /t REG_SZ /d "C:\MyBrowserExtensionUsingClarion\v1\ClaAppName.manifest" /f | All Users |
| Edge | HKCU | REG ADD "HKCU\Software\Microsoft\Edge\NativeMessagingHosts\ClaAppName" /ve /t REG_SZ /d "C:\MyBrowserExtensionUsingClarion\v1\ClaAppName.manifest" /f | Current logged in user | 

HKLM for all users or HKCU for currently logged in user. 

The Browsers will scan their respective registry key's ```Firefox [HKLM|HKCU]\Software\Mozilla\NativeMessagingHosts```, ```Chrome [HKLM|HKCU]\Software\Google\Chrome\NativeMessagingHosts``` and ```Edge [HKLM|HKCU]\Software\Microsoft\Edge\NativeMessagingHosts``` looking for the Clarion app manifest file and link the ```ClaAppName.manifest``` ```allowed_extension``` to the ```manifest.json``` ```applications``` or ```browser_specific_setting``` entries.



### Firefox Temporary Extension
To load the Browser Extension Plugin for testing and debugging purposes in Firefox.
``` 
Type 'about:debugging' into Omnibox (address box) -> Click 'This Firefox' -> Click 'Load Temporary Add-on...' -> Navigate to 'C:\MyBrowserExtensionUsingClarion\v1\' and select 'manifest.json'.
```
A slightly quicker way is...
``` 
Type 'about:debugging#/runtime/this-firefox' into Omnibox (address box) -> Click 'Load Temporary Add-on...' -> Navigate to 'C:\MyBrowserExtensionUsingClarion\v1\' and select 'manifest.json'.
```

This is what the Browser Extension Plugin will look like when its installed into Firefox.

Using ```name@domain``` as the ```manifest.json applications:gecko:id``` which needs to be mirrored in ```ClaAppName.manifest allowed_extensions```.
```
ClaAppName
Location        C:/MyBrowserExtensionUsingClarion/v1/
Extension ID    ClaAppName@IntelligentSilicon
Internal UUID   {GUID}
Manifest URL    moz-extension://{Internal UUID}/manifest.json
```

Using ```{GUID}``` as the ```manifest.json applications:gecko:id``` which needs to be mirrored in ```ClaAppName.manifest allowed_extensions```.
```
ClaAppName
Location        C:/MyBrowserExtensionUsingClarion/v1/
Extension ID    {0339088b-ba1a-44dd-baee-da8de84e222d}
Internal UUID   {GUID}
Manifest URL    moz-extension://{Internal UUID}/manifest.json
```



### Chrome Temporary Extension
To load the Browser Extension Plugin for testing and debugging purposes in Chrome.

First we need to check if Google Chrome will accept V2 manifest.json Browser Extension Plugins.
```
Type 'chrome://policy' into the Omnibox (address box) -> In Chrome Policies search for 'ExtensionManifestV2Availability' -> If its visible it should have Policy Value = 2.
```

If its not visible or set to 2, run the following command in a Windows Run box, Dos Window or Powershell Window.

```
Reg Add "HKLM\SOFTWARE\Policies\Google\Chrome" /v ExtensionManifestV2Availability /t REG_DWORD /d 2 /f
``` 

Close and reload Chrome. 

Repeat the first step and you should now see it visible and set to 2.

Load the Browser Extension Plugin for Chrome.

``` 
Type 'chrome://extensions' into Omnibox (address box) -> Switch on 'Developer Mode' located in the top right if its not already on -> Click 'Load Unpack' -> Navigate to 'C:\MyBrowserExtensionUsingClarion\v1\' and click 'Select Folder'.
```
```ClaAppName``` should appear underneath 'All Extensions'. 

If there are Errors, the red text ```Errors``` button will appear. If you click this, Chrome will show you all the errors that exist and in which file they exist in.

If you click the ```Details``` button you will see information like that listed below:

```
ClaAppName
Description                 Receives WebNavigation Events
Version                     1.0
Size                        1.9 MB
ID                          ikecfikbakkedbemajecjmbadnabofel
Inspect views               No active views
Permissions                 Read your browsing history
                            Communicate with cooperating native applications
Site access                 Allow this extension to read and change all your data on websites that you visit: On all sites
Site settings               Opens in new tab
Pin to toolbar              Off
Allow in Incognito          Off
Warning: Google Chrome cannot prevent extensions from recording your browsing history. To disable this extension in Incognito mode, unselect this option.
Allow access to file URLs   On
Collect errors              On
Source                      Unpacked extension
                            Loaded from: C:\MyBrowserExtensionUsingClarion\v1
```


### Edge Temporary Extension

edge://extensions/

### Browser Extension Plugin Testing and Debugging

When you carryout any function in the browser, you should see the ClaAppName.exe messagebox appear showing you the message: 'Glo:CurrentPID = \<PID\>'. This is because its being called for every event being trapped.
 
IF the ClaAppName.exe message box doesnt appear when you open a new tab or navigate to a webpage, then ClaAppName.exe isnt being loaded properly. Time to double check.

The Browser Extension Plugin is now ready for testing...

TIP: To test the background.js script, click the ```about:debugging#/runtime/this-firefox``` ```Inspect``` button, a new window will appear which positions to the console tab, where you can see the ```background.js``` script has loaded and if the code from the beginning of ```background.js``` (seen below) has not been block-commented out ```/*``` ```*/```, will attempt to load ClaAppName.exe and send a message to it. 

```
/*
const ClaAppName = browser.runtime.connectNative("ClaAppName");
const Message = `The ClaAppName background.js file has loaded!`;
ClaAppName.postMessage(Message);
*/
``` 

This is a quick way for testing everything is setup properly.


TIP: If you end up reading messages into ClaAppName.exe and they are just 4 bytes in size, there is Clarion code to test and Return with errorcode for this situation, its a good time to close the Browser and reload it and then reload the Browser Extension Plugin again because the browser may have become unstable.

TIP: If you should end up with loads of message boxes showing the ProcessID for the ClaAppName.exe, simply unload the manifest.json file and this will kill all instances of ClaAppName.exe and their message boxes in one go without having to click OK to acknowledge each message, but only do this after you have performed your debugging operation.


### Clarion Debugger

Use the method below to learn how to step in to the running ClaNameApp app after its been called by the Web Browser via the plugins.

[Call-Clarion-Debugger-from-running-App](https://github.com/Intelligent-Silicon/Call-Clarion-Debugger-from-running-App)

If you are using the ```Message('Glo:CurrentPID = ' & Glo:CurrentPID)``` to act as a psuedo breakpoint, clicking the ```reload``` button seen in the Firefox ```about:debugging``` window, will trigger a reload of the ```manifest.json``` file, and the ```background.js``` file which will then call the ```ClaNameApp``` app. This can be useful with getting familar with the process. When ready, comment the javascript code out using ```/*``` and ```*/``` as seen below.

```
/*
const ClaAppName = browser.runtime.connectNative("claappname");
const Message = `The ClaAppName background.js file has loaded!`;
ClaAppName.postMessage(Message);
*/
```


