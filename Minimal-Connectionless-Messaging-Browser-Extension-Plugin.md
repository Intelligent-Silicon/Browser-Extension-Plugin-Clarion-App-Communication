# Minimal-Connectionless-Messaging-Browser-Extension-Plugin

A Minimal example of a Connectionless Messaging Browser Extension Plugin.

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
.postMessage()
```

```postMessage``` is a method that safely sends Cross Origin communication between window objects and thus bypasses the CORS (Cross-Origin Resource Sharing) setting which is enforced by browsers to protect users from unauthorized cross-origin requests. 

```
browser.webNavigation.onBeforeNavigate.addListener((details) => 
    {
    const MyBlockScopedInitialisedVariable = browser.runtime.connectNative("Clarion_AppName"); // "Clarion_AppName" must match "Clarion_AppName.manifest" and "Clarion_Appname.exe" found in the "c:\MyBrowserExtensionForClarion\v1\" folder.
    const MyMessageSentToClarionApp = `onBeforeNavigate ${details.tabId},${details.url},${details.processId},${details.frameId},,${details.parentframeId}, ${details.timeStamp}`;
    MyBlockScopedInitialisedVariable.postMessage(MyMessageSentToClarionApp); // A raw string which is serialized using JSON, UTF-8 encoded and is preceded with an unsigned 32-bit value containing the message length in native byte order. '[Ulong][UTF-8 String]'
    }
);
```

[Complete Firefox Background.js file for download](connectionless-messaging/Firefox/background.js/background.js)

### content_script.js
A [content script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#connection-based_messaging) lets you monitor and respond to events in the context of a web page using the Web Extension APIs. Content scripts are similar to website/webpage scripts loaded using the <script> element, but require permissions to be set in the ```manifest.json``` file to access the website/webpage content.

```
browser.runtime
```
```browser.runtime``` provides information about your extension and the environment it's running on. Messaging APIs enabling you to communicate between different parts of your extension, other extensions and native applications.

```
.onMessage
```
```onMessage``` is an event for listening to the Payload Object sent using [runtime.sendMessage()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage) or [tabs.sendMessage()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage) from another part of (your) extension(s) or native application. eg listening for messages from a ```background.js``` and vice versa, or an [options page or popup](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#sidebars_popups_and_options_pages).


The Structure or Properties of ```message``` depends entirely on what the sender includes. There is no fixed schema. x1

The Structure or Properties of ```message``` depends entirely on what the sender includes. There is no fixed schema. x2 

The Structure or Properties of ```message``` depends entirely on what the sender includes. There is no fixed schema. x3

The properties sent from different Methods that send to ```.onMessage```.

[runtime.sendMessage()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage)
| Parameter | Data Type | Notes |
| --- | --- | --- |
| extensionId | String | If extensionId is omitted, the message is sent to your extension. The ID of the extension to send the message to. Include this to send the message to a different extension. |
| message | Any | An object that can be a [structured clone serialized](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities#data_cloning_algorithm) |
| options | Object | |
| includeTlsChannelId | Boolean | The TLS channel ID passed into runtime.onMessageExternal for processes that are listening for the connection event. |

[tabs.sendMessage()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage)
| Parameter | Data Type | Notes |
| --- | --- | --- |
| tabId | Integer | ID of the tab whose content scripts we want to send a message to. |
| message | Any | An object that can be serialized |
| options | Object | |
| frameId | Integer | Sends the message to a specific frame identified by frameId instead of all frames in the tab. Whether the content script is executed in all frames depends on the all_frames setting in the content_scripts section of manifest.json | 


Commonly used properties of ```message``` found across other extensions and websites, but not an exhaustive list as any developer can make up their own including [obfuscated properties](https://en.wikipedia.org/wiki/Obfuscation_(software)).

| Property | Notes |
| --- | --- |
| type | Identifies the kind of message (e.g. "ping", "getData"). |
| data | Contains the actual payload (string, object, etc.) |
| action | Alternative to type, used to describe intent. |
| url | URL being referenced or acted upon |
| content | Arbitrary content passed from sender | 

Javascript example of how ```message``` could be setup, its purely upto the developer.
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
  
Avoid creating multiple ```onMessage()``` listeners for the same type of message ```if (message.type === "showPopup")``` because the order in which multiple listeners fire is strangely not guaranteed!!! An interesting insight into the working internals.

So a better way to send messages between background scripts and content scripts is to use [connection-based messaging](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#connection-based_messaging). 

[Complete Firefox content_script.js file for download](connectionless-messaging/Firefox/content_script.js/content_script.js)


### Clarion_AppName.manifest

This is whats called an [App manifest file](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging#app_manifest). It needs to be installed alongside the Clarion app exe and match the name of the exe. eg ```ClaAppName.manifest``` must match ```ClaAppName.exe```.
The manifest file provides additional information controlling how the ClaAppName.exe communicates with the Browser. Without it, the Browser can not communicate with the Clarion app.


| Element | Value | Description |
| --- | --- | --- |
| [Name](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#native_messaging_manifests) | String | Name of the native application ClaAppName.exe which must match the name passed into runtime.connectNative() or runtime.sendNativeMessage() by the extension. |
| [Description](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#native_messaging_manifests) | String | Description of the native application. |
| [Path](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#native_messaging_manifests) | String | Path to the native application, relative to the ```ClaAppName.manifest``` file. |
| [Type](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#native_messaging_manifests) | String | Takes the value "stdio" only, which indicates that messages are received by the Clarion app using [Console window](https://learn.microsoft.com/en-us/windows/console/consoles) or [Anonymous Pipes](https://learn.microsoft.com/en-us/windows/win32/procthread/creating-a-child-process-with-redirected-input-and-output) standard input (stdin) and sent using standard output (stdout). |
| [allowed_extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#native_messaging_manifests) | String Array | An array of Browser Extension [add-on ID's](https://extensionworkshop.com/documentation/develop/extensions-and-the-add-on-id/) defined in ```browser_specific_settings``` in the ```manifest.json``` for the Browser Extension Plugin. |


[Complete Firefox ClaAppName.manifest file for download using name@domain](connectionless-messaging/Firefox/name/ClaAppName.manifest)
[Complete Firefox ClaAppName.manifest file for download using {Guid}](connectionless-messaging/Firefox/guid/ClaAppName.manifest)

### ClaAppName.exe

[Complete ClaAppName.clw using allocConsole for download](connectionless-messaging/Firefox/ClaAppName.exe/allocConsole/ClaAppName.clw)
[Complete ClaAppName.clw using Anonymous Pipes for download](connectionless-messaging/Firefox/ClaAppName.exe/pipes/ClaAppName.clw)

```
PROGRAM

OMIT('***')
 * Created with Clarion 11.0
 * User: Admin1
 * Date: 22/07/2025
 * Time: 13:10
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 ***


ISEQ:Dword						Equate(4294967295)  ! StdIn StdOut StdError
ISEQ:STD_INPUT_HANDLE       	Equate(4294967286) 	! ISEQ:Dword-10
ISEQ:STD_OUTPUT_HANDLE      	Equate(4294967285)	! ISEQ:Dword-11)
ISEQ:STD_ERROR_HANDLE           Equate(4294967284)  ! ISEQ:Dword-12)

ISEQ:File_Share_None        Equate(00h)
ISEQ:File_Share_Delete      Equate(04h)
ISEQ:File_Share_Read        Equate(01h)
ISEQ:File_Share_Write       Equate(02h)

ISEQ:File_Generic_All            Equate(010000000h)
ISEQ:File_Generic_Execute        Equate(020000000h)
ISEQ:File_Generic_Write          Equate(040000000h)
ISEQ:File_Generic_Read           Equate(080000000h)

ISEQ:File_Create_New            Equate(1)
ISEQ:File_Create_Always         Equate(2)
ISEQ:File_Open_Existing         Equate(3) ! For devices other than files, this parameter is usually set to OPEN_EXISTING.
ISEQ:File_Open_Always           Equate(4)
ISEQ:File_Truncate_Existing     Equate(5)

ISEQ:File_Attribute_Hidden          Equate(00002h)
ISEQ:File_Attribute_Archive         Equate(00020h) 
ISEQ:File_Attribute_Normal          Equate(00080h)
ISEQ:File_Attribute_Encrypted       Equate(04000h)

ISEQ:Handle                     Equate(2147483647) ! Long range -2,147,483,648 to 2,147,483,647
ISEQ:INVALID_HANDLE_VALUE       Equate(-1) ! ISEQ:Handle - 1
!Code Page Equates
ISEQ:CP_ACP			Equate(1)		! The system default Windows ANSI code page.
								! Note  This value can be different on different computers, even on the same network. It can be changed on the same computer, leading to stored data becoming irrecoverably corrupted. This value is only intended for temporary use and permanent storage should use UTF-16 or UTF-8 if possible.
ISEQ:CP_MACCP		Equate(2)		! The current system Macintosh code page.
								! Note  This value can be different on different computers, even on the same network. It can be changed on the same computer, leading to stored data becoming irrecoverably corrupted. This value is only intended for temporary use and permanent storage should use UTF-16 or UTF-8 if possible.
                                ! Note   This value is used primarily in legacy code and should not generally be needed since modern Macintosh computers use Unicode for encoding.
ISEQ:CP_OEMCP 		Equate(3)		! The current system OEM code page.
								! Note  This value can be different on different computers, even on the same network. It can be changed on the same computer, leading to stored data becoming irrecoverably corrupted. This value is only intended for temporary use and permanent storage should use UTF-16 or UTF-8 if possible.
ISEQ:CP_SYMBOL		Equate(4)		! Symbol code page (42).
ISEQ:CP_THREAD_ACP 	Equate(5)	! The Windows ANSI code page for the current thread.
								! Note  This value can be different on different computers, even on the same network. It can be changed on the same computer, leading to stored data becoming irrecoverably corrupted. This value is only intended for temporary use and permanent storage should use UTF-16 or UTF-8 if possible.
ISEQ:CP_UTF7 		Equate(6)	! UTF-7. Use this value only when forced by a 7-bit transport mechanism. Use of UTF-8 is preferred.
ISEQ:CP_UTF8        Equate(7)	! UTF-8.   

ISEQ:CSIDL_COMMON_APPDATA   Equate(35) ! C:\ProgramData or C:\Documents and Settings\All Users\Application Data

ISEQ:S_OK           Equate(0)    

ISEQ:ERROR_INVALID_USER_BUFFER      Equate(1784)    ! The supplied user buffer is not valid for the requested operation. 
ISEQ:ERROR_OPERATION_ABORTED        Equate(995)     ! The I/O operation has been aborted because of either a thread exit or an application request.
ISEQ:ERROR_NOT_ENOUGH_QUOTA         Equate(1816)    ! Not enough quota is available to process this command.


!ISDT:OverLapped     GROUP,TYPE
!InternalLow             Ulong       ! ULONG_PTR
!InternalHigh            Ulong       ! ULONG_PTR
!OffsetLow               Ulong       ! OffsetLow 32 bits ----| OffsetLow & OffsetHigh can be 
!OffsetHigh              Ulong       ! OffsetHigh 32 bits ---| a single Pointer, assuming 64bit
!hEvent                  Ulong       ! HANDLE Usually a Long, but Co-pilot suggests an unsigned aka a Ulong
!                    END

Glo:ConsoleWindowHandle    Long            
Glo:WorkingFolderPath   Cstring(1024)
Glo:CSIDL_FolderPath    Cstring(1024)
Glo:FolderFilename      Cstring(1024)
Glo:RVLong              Long
Glo:RVBool              Bool
Glo:CurrentPID          Ulong
Glo:DebuggerCommandLine Cstring(1024)

    MAP
Main        PROCEDURE()
    MODULE('api')
    !ISWA_ODS(*CSTRING cMsg),PASCAL,DLL(1),RAW,NAME('OutputDebugStringA')
    !Kernel32.dll
    ISWA_AllocConsole(),Byte,Pascal,Name('AllocConsole')
    !ISWA_CreateFileA(*Cstring,Ulong,Ulong,Long,Ulong,Ulong,Long),Long,Pascal,Name('CreateFileA')
    !ISWA_CreateFileA(Long,Ulong,Ulong,Long,Ulong,Ulong,Long),Long,Pascal,Name('CreateFileA')
    ISWA_GetConsoleWindow(),Long,Pascal,Name('GetConsoleWindow')
    ISWA_GetCurrentProcessId(Long),Ulong,Pascal,Name('GetCurrentProcessId')
    ISWA_FreeConsole(),Byte,Pascal,Name('FreeConsole')
    !ISWA_GetACP(),Ulong,Pascal,Raw,Name('GetACP')     
    !ISWA_GetCurrentProcessId(Long),Ulong,Pascal,Name('GetCurrentProcessId')
	!ISWA_GetOEMCP(),Ulong,Pascal,Raw,Name('GetOEMCP')
    ISWA_GetLastError(),Ulong,Pascal,Name('GetLastError') 
    ISWA_GetStdHandle(Ulong),Long,PASCAL,Name('GetStdHandle') !https://learn.microsoft.com/en-us/windows/console/getstdhandle
	!ISWA_MultiByteToWideChar(Ulong,Ulong,Long,Long,Long,Long),long,Pascal,Raw,Name('MultiByteToWideChar')
    ISWA_ReadFile(Ulong, *CSTRING, Ulong, Ulong, Ulong),Long,PASCAL,Name('ReadFile')  !https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-readfile
	ISWA_ReadFile(Long, Long, Ulong, Long, <Long>),Bool,PASCAL,Name('ReadFile')  !https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-readfile
	ISWA_ShowWindow(Long,Long),Bool,Pascal,Name('ShowWindow')
    !ISWA_WideCharToMultiByte(Ulong,Ulong,Long,Long,Long,Long,Long,Long),Long,Pascal,Raw,Name('WideCharToMultiByte')
    !ISWA_WriteFile(Ulong, *CSTRING, Ulong, *Ulong, Ulong),Long,PASCAL,Name('WriteFile')  !https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-writefile
    
    !Shell32.dll
    !ISWA_SHGetSpecialFolderLocation(Long, Long, Long), Long
    ISWA_SHGetFolderPathA(Long, Long, Long, Ulong, Long), Long, Pascal,Raw,Name('SHGetFolderPathA') 
    !ISWA_SHGetKnownFolderPath(Long,Ulong,Long,Long),long,Pascal,Raw,Name('SHGetKnownFolderPath')
    ISWA_SHCreateDirectoryExA(long,*Cstring,Long),Long,Pascal,Raw,Name('SHCreateDirectoryExA')
    END

    END

!region File Declaration
BrowserOutput        FILE,DRIVER('TOPSPEED'),NAME(Glo:FolderFilename),PRE(BO),CREATE,BINDABLE,THREAD !
!BrowserOutput        FILE,DRIVER('TOPSPEED'),NAME('BrowserOutput.tps'),PRE(BO),CREATE,BINDABLE,THREAD !                    
Record                   RECORD,PRE()
BrowserOutputDate           LONG                           !                     
BrowserOutputTime           LONG                           !                     
BrowserOutput_utf8          STRING(8196)                   !                     
                         END
                     END                       

!endregion


    CODE

    !Run('"C:\Clarion11\bin\Cladbne.exe"', 0) ! Loads Cladb
    Glo:CurrentPID = ISWA_GetCurrentProcessId(0)
    Message('Glo:CurrentPID = ' & Glo:CurrentPID)
    Glo:DebuggerCommandLine = '"C:\Clarion11\bin\Cladbne.exe" -p ' & Glo:CurrentPID
    !Run(Glo:DebuggerCommandLine, 0) ! Does not "appear" to work
    Glo:DebuggerCommandLine = '"C:\Clarion11\bin\Cladb.exe" -p ' & Glo:CurrentPID
    !Run(Glo:DebuggerCommandLine, 0) ! Works - Well you get the UAC prompt, but then ClaDB dissappears - Windows Defender possibly?
    !Run('"C:\Clarion11\bin\Cladbne.exe -p ' & Glo:CurrentPID & '"', 0) ! Does not "appear" to work
    !Run('"C:\Clarion11\bin\Cladbne.exe"', 0) ! Does not "appear" to work
    !Run('"C:\Clarion11\bin\Cladbne.exe" -p' & Glo:CurrentPID, 0) ! Does not "appear" to work
    Main()
    Return

Main    Procedure

Loc:CreateConsole           Bool

Loc:FreeConsole             Bool
Loc:LastErrorCode           Long
Loc:StdIn_Handle            Long
Loc:StdOut_Handle           Long
Loc:Buffer_Ansi             Cstring(8192)
Loc:Buffer_Ansi_Read_Size   Long

    Code

    Loc:CreateConsole = ISWA_AllocConsole()  !This creates a new console window 
    Loc:LastErrorCode = ISWA_GetLastError()

    IF Loc:CreateConsole = 0 and Loc:LastErrorCode
	    Message('Create Console Error = ' & Loc:LastErrorCode )
        Return 
    Else 
        Glo:ConsoleWindowHandle = ISWA_GetConsoleWindow()  ! Handle to Console Window
        Glo:RVBool = ISWA_ShowWindow(Glo:ConsoleWindowHandle,0)  ! This hides the console window, but you still get a flicker!

        Loc:StdIn_Handle    = ISWA_GetStdHandle(ISEQ:STD_INPUT_HANDLE)  ! STD_INPUT_HANDLE
        Loc:LastErrorCode   = ISWA_GetLastError()

	    IF Loc:StdIn_Handle = ISEQ:Invalid_Handle_Value and Loc:LastErrorCode
		    Message('StdIn Handle Error = ' & Loc:LastErrorCode )
            Return
        End   

        Loc:StdOut_Handle   = ISWA_GetStdHandle(ISEQ:STD_OUTPUT_HANDLE) ! STD_OUTPUT_HANDLE
        Loc:LastErrorCode   = ISWA_GetLastError()
	    If Loc:StdOut_Handle = ISEQ:Invalid_Handle_Value and Loc:LastErrorCode
		    Message('StdOut Handle Error = ' & Loc:LastErrorCode )
            Return
        End
    End            

! Characters can be read from the console input buffer by using ReadFile with a handle to console input. 
! The console mode determines the exact behavior of the ReadFile function. 
! By default, the console mode is ENABLE_LINE_INPUT, which indicates that ReadFile should read 
! until it reaches a carriage return. 
! If you press Ctrl+C, the call succeeds, but GetLastError returns ERROR_OPERATION_ABORTED. 
! For more information, see CreateFile.

    Glo:RVBool          = ISWA_ReadFile(Loc:Stdin_Handle, Address(Loc:Buffer_Ansi), -1, Address(Loc:Buffer_Ansi_Read_Size), 0)
    Loc:LastErrorCode   = ISWA_GetLastError()    
    
    Loc:FreeConsole     = ISWA_FreeConsole()
    Loc:LastErrorCode   = ISWA_GetLastError()

    IF Loc:FreeConsole = 0 and Loc:LastErrorCode
	    Return 
    End

    Glo:RVLong = ISWA_SHGetFolderPathA(0,ISEQ:CSIDL_COMMON_APPDATA,0,0,Address(Glo:CSIDL_FolderPath))
    IF Glo:CSIDL_FolderPath
        Glo:FolderFilename = Glo:CSIDL_FolderPath & '\pcwt'
        !Glo:RVBool = CreateDirectory(Glo:FolderFilename)
        !Glo:RVBool = mkdir(Glo:FolderFilename)
        Glo:RVLong = ISWA_SHCreateDirectoryExA(0,Glo:FolderFilename,0)
        IF Glo:RVLong
            IF Not (Glo:RVLong = 80 xor Glo:RVLong = 183) !ERROR_FILE_EXISTS and ERROR_ALREADY_EXISTS 
                Return
            End
        End
    Else
        Return
    End
    Glo:FolderFilename = Glo:FolderFilename &'\pcwtpipe.tps'
    Open(BrowserOutput)
    IF ErrorCode()
        IF ErrorCode() = 2
            Create(BrowserOutput)
            IF ErrorCode()
                Return
            Else
                Open(BrowserOutput)
                IF ErrorCode()
                    Return
                End
            End
        Else
            Return
        End
    End

    BO:BrowserOutputDate    = Today()
    BO:BrowserOutputTime    = Clock()
    BO:BrowserOutput_utf8   = Loc:Buffer_Ansi
    Add(BrowserOutput)
    IF ErrorCode()
        Return
    End 

    Close(BrowserOutput)
    IF ErrorCode()
        Return
    End   
```


### Windows Registry

Add an entry to the Windows Registry which is
```
PS C:\WINDOWS\system32> REG ADD "HKCU\Software\Mozilla\NativeMessagingHosts\ClaAppName" /ve /t REG_SZ /d "C:\MyBrowserExtensionUsingClarion\v1\ClaAppName.manifest" /f
```



### Firefox Temporary Extension
To load the Browser Extension Plugin for testing and debugging purposes.
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
Extension ID    0339088b-ba1a-44dd-baee-da8de84e222d@intelligentsilicon
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

When you then carryout any function in Firefox, you will see the Clarion messagebox appear showing you the message: 'Glo:CurrentPID = <PID>'. 
If the message box doesnt appear when you open a new tab or navigate to a webpage, then the ClaAppName app isnt being loaded properly.

The BEP is now ready for testing.


If you end up reading messages into ClaAppName and they are just 4 bytes in size, its a good time to close the Browser and reload it and reload the Browser Extension Plugin because Firefox has become unstable.
### Clarion Debugger

Use the method below to learn how to step in to the running ClaNameApp app after its been called by the Web Browser via the plugins.

[Call-Clarion-Debugger-from-running-App](https://github.com/Intelligent-Silicon/Call-Clarion-Debugger-from-running-App)

If you are using the ```Message('Glo:CurrentPID = ' & Glo:CurrentPID)``` to act as a psuedo breakpoint, clicking the ```reload``` button seen in the Firefox ```about:debugging``` window, will trigger a reload of the ```manifest.json``` file, and the ```background.js``` file which will then call the ```ClaNameApp``` app. This can be useful with getting familar with the process. When ready comment the javascript code out using ```/*``` and ```*/``` as seen below.

```
/*
const ClaAppName = browser.runtime.connectNative("claappname");
const Message = `The ClaAppName background.js file has loaded!`;
ClaAppName.postMessage(Message);
*/
```

Tip. If you should end up with loads of message boxes showing the ProcessID for the ClaAppName, simply unload the manifest.json file and this will kill all the message boxes in one go, but only do this after you have performed your debugging operation.
