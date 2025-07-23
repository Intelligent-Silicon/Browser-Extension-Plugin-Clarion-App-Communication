# Browser Extension Plugin for Clarion App Communication

Essentially two ways for a Browser Extension Plugin (BEP) to communicate with a Clarion app:

[Connectionless Messaging](README.md#connectionless-messaging)

[Persistent Connection Messaging](README.md#persistent-connection-messaging)


### Connectionless Messaging
BEP loads a Clarion app for each and every required Browser event, resulting in multiple instances of the Clarion app running, sends a message to the Clarion app's Console window, responds to any message from the Clarion app, closes down the Clarion app if its not already closed down itself.

To reduce workstation cpu load, the Clarion app would ideally be a handcoded project, rather than an AppGen app because of the overhead of the builtins that ship as default in AppGen apps.

The Console window which is created and then immediately hidden for each Browser message sent to the Clarion app can cause flickering on slower less powerful workstations. Windows problem.

The Clarion app's Console window can be replaced with StdIn StdOut Anonymous pipes which can eliminate the Console window flicker problem. 



### Persistent Connection Messaging
BEP loads a single Clarion app for every instance of the Browser, regardless of number of browser tabs open in the Browser instance and regardless of the Browser events on every browser tab, sends a message to the single instance Clarion app, responds where applicable, with the Clarion app left running until the Browser instance closes down or the Clarion app closes itself down. Limited to Browser instance because the Browser can run with different -profile command switches.

The Clarion app does not have to be so optimised and lightweight, making AppGen apps viable options without affecting workstation CPU workloads unnecessarily under heavy use.

Can also be further extended by being an optimised lightweight handcoded Proxy project to each Browser instance for every User logged on to the machine in turn communicating to a single Clarion app instance which can be a Service for the duration of the User's desktop session or machine session. Think Terminal Server here.

The Console window which is hidden immediately after creation can cause a flicker which is more acceptible because it only happens once per each Browser instance.

Using StdIn StdOut Anonymous pipes can eliminate the Console window flicker problem.


[FireFox Add Extension Plugin](Add-Extension-Firefox.md)
[Chrome Add Extension Plugin](Add-Extension-Chrome.md)
[Edge Add Extension Plugin](Add-Extension-Edge.md)


[Minimal Connectionless Messaging Browser Extension Plugin](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md)

[Minimal Persistent Connection Messaging Browser Extension Plugin](Minimal-Persistent-Connection-Messaging-Browser-Extension-Plugin.md)




