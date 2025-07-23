# Minimal-Connectionless-Messaging-Browser-Extension-Plugin

A Minimal example of a Connectionless Messaging Browser Extension Plugin.

### Browser Extension Plugin Files

Store the files listed below in a folder for testing purposes. Once uploaded to a Browser's Addon store, these files are managed and stored by the Browser automatically.

eg ```c:\MyBrowserExtension\v1\```


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

