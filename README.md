# Browser Extension Plugin for Clarion App Communication

Essentially two ways for a Browser Extension Plugin (BEP) to communicate with a Clarion app.

Connectionless Messaging

Persistent Connection Messaging


### Connectionless Messaging
BEP loads a Clarion app for every required Browser event, sends a message, responds where applicable and closes down the Clarion app, if its not already closed down itself.

To reduce workstation cpu load, the Clarion app would ideally be a handcoded project, rather than an AppGen app because of the overhead of the builtins that ship as default in AppGen apps.

The Console window which is created and then immediately hidden for each Browser message sent can cause flickering on slower less powerful workstations.

Using StdIn StdOut Anonymous pipes can eliminate the Console window flicker problem. 



### Persistent Connection Messaging
BEP loads a Clarion app for every instance of the Browser, regardless of number of browser tabs open in the Browser instance and regardless of the Browser events on every browser tab, sends a message, responds where applicable, with the Clarion app left running until the Browser instance closes down or the Clarion app closes itself down.

The Clarion app does not have to be so optimised and lightweight, making AppGen apps viable options without affecting workstation CPU workloads unnecessarily.

Can also be further extended by being a Proxy to a single Clarion app instance including a Service for the duration of the User's desktop session or machine session.

The Console window which is hidden immediately after creation can cause a flicker which is more acceptible because it only happens once per each Browser instance.

Using StdIn StdOut Anonymous pipes can eliminate the Console window flicker problem.


[FireFox Add Extension Plugin](Add-Extension-Firefox.md)
[Chrome Add Extension Plugin](Add-Extension-Chrome.md)
[Edge Add Extension Plugin](Add-Extension-Edge.md)


[Minimal Connectionless Messaging Browser Extension Plugin](Minimal-Connectionless-Messaging-Browser-Extension-Plugin.md)

[Minimal Persistent Connection Messaging Browser Extension Plugin](Minimal-Persistent-Connection-Messaging-Browser-Extension-Plugin.md)




