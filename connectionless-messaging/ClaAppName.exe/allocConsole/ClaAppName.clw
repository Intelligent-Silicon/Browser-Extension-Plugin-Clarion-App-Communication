
  PROGRAM 
                                       
!ISEQ:Dword						Equate(4294967295)  ! StdIn StdOut StdError
ISEQ:STD_INPUT_HANDLE       	Equate(4294967285) 	! ISEQ:Dword-10
ISEQ:STD_OUTPUT_HANDLE      	Equate(4294967284)	! ISEQ:Dword-11)
!ISEQ:STD_ERROR_HANDLE           Equate(4294967283)  ! ISEQ:Dword-12)

ISEQ:INVALID_HANDLE_VALUE       Equate(-1) ! ISEQ:Handle - 1

!!Code Page Equates
ISEQ:CP_ACP			            Equate(1)		! The system default Windows ANSI code page.
!ISEQ:CP_UTF7 		            Equate(65000)	! UTF-7. Use this value only when forced by a 7-bit transport mechanism. Use of UTF-8 is preferred.
ISEQ:CP_UTF8                    Equate(65001)	! UTF-8.   
!
ISEQ:CSIDL_COMMON_APPDATA       Equate(35) ! C:\ProgramData or C:\Documents and Settings\All Users\Application Data

Glo:ConsoleWindowHandle         Long            
Glo:CSIDL_FolderPath            Cstring(1024)
Glo:FolderFilename              Cstring(1024)
Glo:RVLong                      Long
Glo:RVBool                      Bool
Glo:CurrentPID                  Ulong
Glo:ReturnValue                 Long(0)

    MAP
Main        PROCEDURE(),Long
    MODULE('api')
!    !Kernel32.dll
    ISWA_AllocConsole(),Byte,Pascal,Name('AllocConsole')
    ISWA_GetConsoleWindow(),Long,Pascal,Name('GetConsoleWindow')
    ISWA_GetCurrentProcessId(Long),Ulong,Pascal,Name('GetCurrentProcessId')
    ISWA_FreeConsole(),Byte,Pascal,Name('FreeConsole')
    ISWA_GetACP(),Ulong,Pascal,Raw,Name('GetACP')     
    ISWA_GetLastError(),Ulong,Pascal,Name('GetLastError') 
    ISWA_GetStdHandle(Ulong),Long,PASCAL,Name('GetStdHandle') !https://learn.microsoft.com/en-us/windows/console/getstdhandle
	ISWA_MultiByteToWideChar(Ulong,Ulong,Long,Long,Long,Long),long,Pascal,Raw,Name('MultiByteToWideChar')
    ISWA_ReadFile(Ulong, *CSTRING, Ulong, Ulong, Ulong),Long,PASCAL,Name('ReadFile')  !https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-readfile
	ISWA_ReadFile(Long, Long, Ulong, Long, <Long>),Bool,PASCAL,Name('ReadFile')  !https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-readfile
	ISWA_ShowWindow(Long,Long),Bool,Pascal,Name('ShowWindow')
    ISWA_WideCharToMultiByte(Ulong,Ulong,Long,Long,Long,Long,Long,Long),Long,Pascal,Raw,Name('WideCharToMultiByte')
!    !ISWA_WriteFile(Ulong, *CSTRING, Ulong, *Ulong, Ulong),Long,PASCAL,Name('WriteFile')  !https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-writefile
    
!    !Shell32.dll
    ISWA_SHGetFolderPathA(Long, Long, Long, Ulong, Long), Long, Pascal,Raw,Name('SHGetFolderPathA') 
    ISWA_SHCreateDirectoryExA(long,*Cstring,Long),Long,Pascal,Raw,Name('SHCreateDirectoryExA')
    END

    END

!region File Declaration
BrowserOutput        FILE,DRIVER('TOPSPEED'),NAME(Glo:FolderFilename),PRE(BO),CREATE,THREAD                 
Record                   RECORD,PRE()
BrowserOutputDate           LONG                                                
BrowserOutputTime           LONG                                                
BrowserOutputString         STRING(8196)                                       
                         END
                     END                       
!endregion


    CODE
    ! <ProcessID> for the Clarion Debugger 
    Glo:CurrentPID = ISWA_GetCurrentProcessId(0)
    Message('Glo:CurrentPID = ' & Glo:CurrentPID)
    ! Use this message above to halt the Clarion App when the Browser calls it.
    ! Due to Browser permission levels, open a DOS window and navigate to the Clarion\bin folder
    ! C:\Users\Admin1>cd "C:\Clarion11\bin"
    ! C:\Clarion11\bin> cladb.exe -p <ProcessID>
    ! In the Clarion Debugger, click File, File to Debug, navigate to the folder c:\MyBrowserExtensionUsingClarion\v1\
    ! Select ClaAppName.exe. 
    ! Wait until the bottom left Procedure window/pane appears, select _main
    ! Set a Breakpoint on Main(), the next line below this, then debug away until your hearts content!
       
    Glo:ReturnValue = Main()
    !Main()
    IF Glo:ReturnValue
        Message('Return Value : ' & Glo:ReturnValue )
    End
    Return !Glo:ReturnValue Throws Compiler Error Cannot RETURN value from procedure when its a Program!

Main    Procedure

Loc:CreateConsole           Bool
Loc:FreeConsole             Bool
Loc:LastErrorCode           Long
Loc:StdIn_Handle            Long
Loc:StdOut_Handle           Long
Loc:Buffer_UTF8             CString(8196)
Loc:Buffer_UTF8_Size        Long
Loc:Buffer_Wide             String(8196)
Loc:Buffer_Ansi             String(8196)

    Code

    Loc:CreateConsole       = ISWA_AllocConsole()       ! This creates a new console window
    Glo:ConsoleWindowHandle = ISWA_GetConsoleWindow()   ! This gets the handle to the Console window
    Glo:RVBool              = ISWA_ShowWindow(Glo:ConsoleWindowHandle,0)  ! This hides the console window, but you still get a flicker! 
    Loc:LastErrorCode       = ISWA_GetLastError()

    IF Loc:CreateConsole = 0 and Loc:LastErrorCode
        Glo:ReturnValue = -1
        Glo:ReturnValue = bShift(Glo:ReturnValue,-16) +  Loc:LastErrorCode
        Return bShift(Glo:ReturnValue,-16) +  Loc:LastErrorCode
    Else 
        Glo:ConsoleWindowHandle = ISWA_GetConsoleWindow()  ! Handle to Console Window

        Loc:StdIn_Handle    = ISWA_GetStdHandle(ISEQ:STD_INPUT_HANDLE)  ! STD_INPUT_HANDLE
        Loc:LastErrorCode   = ISWA_GetLastError()
	    IF Loc:StdIn_Handle = ISEQ:Invalid_Handle_Value and Loc:LastErrorCode
		    Glo:ReturnValue = -2
            Return bshift(Glo:ReturnValue,-16) + Loc:LastErrorCode
        End   

        Loc:StdOut_Handle   = ISWA_GetStdHandle(ISEQ:STD_OUTPUT_HANDLE) ! STD_OUTPUT_HANDLE
        Loc:LastErrorCode   = ISWA_GetLastError()
	    If Loc:StdOut_Handle = ISEQ:Invalid_Handle_Value and Loc:LastErrorCode
		    Glo:ReturnValue = -3
            Return bshift(Glo:ReturnValue,-16) +  Loc:LastErrorCode
        End
    End            

! Characters can be read from the console input buffer by using ReadFile with a handle to console input. 
! The console mode determines the exact behavior of the ReadFile function. 
! By default, the console mode is ENABLE_LINE_INPUT, which indicates that ReadFile should read 
! until it reaches a carriage return. 
! If you press Ctrl+C, the call succeeds, but GetLastError returns ERROR_OPERATION_ABORTED. 
! For more information, see CreateFile.

    Glo:RVBool          = ISWA_ReadFile(Loc:Stdin_Handle, Address(Loc:Buffer_UTF8), Size(Loc:Buffer_UTF8),Address(Loc:Buffer_UTF8_Size), 0) ! -1 = Null terminated string
    Loc:LastErrorCode   = ISWA_GetLastError()
    IF Glo:RVBool = 0 and Loc:LastErrorCode
        Glo:ReturnValue = -4
        Return bshift(Glo:ReturnValue,-16) +  Loc:LastErrorCode
    End
    IF Glo:RVBool and Loc:Buffer_UTF8_Size = 4
        Glo:ReturnValue = -5
        Return bshift(Glo:ReturnValue,-16) +  Loc:LastErrorCode
    End
    Loc:FreeConsole     = ISWA_FreeConsole()
    Loc:LastErrorCode   = ISWA_GetLastError()
    IF Loc:FreeConsole = 0 and Loc:LastErrorCode
	    Glo:ReturnValue = -5
        Return bshift(Glo:ReturnValue,-16) +  Loc:LastErrorCode
    End

    Glo:RVLong = ISWA_SHGetFolderPathA(0,ISEQ:CSIDL_COMMON_APPDATA,0,0,Address(Glo:CSIDL_FolderPath))
    IF Glo:CSIDL_FolderPath
        Glo:FolderFilename = Glo:CSIDL_FolderPath & '\ClaAppName'
        Glo:RVLong = ISWA_SHCreateDirectoryExA(0,Glo:FolderFilename,0)
        IF Glo:RVLong
            IF Not (Glo:RVLong = 80 xor Glo:RVLong = 183) !ERROR_FILE_EXISTS and ERROR_ALREADY_EXISTS 
                Glo:ReturnValue = -6
                Return bshift(Glo:ReturnValue,-16) +  Glo:RVLong
            End
        End
    Else
        Loc:LastErrorCode   = ISWA_GetLastError()
        Glo:ReturnValue = -7
        Return bshift(Glo:ReturnValue,-16) +  Loc:LastErrorCode
    End
    Glo:FolderFilename = Glo:FolderFilename &'\ClaAppName.tps'
    Open(BrowserOutput)
    IF ErrorCode()
        IF ErrorCode() = 2
            Create(BrowserOutput)
            IF ErrorCode()
                Glo:ReturnValue = -8
                Return bshift(Glo:ReturnValue,-16) +  ErrorCode()
            Else
                Open(BrowserOutput)
                IF ErrorCode()
                    Glo:ReturnValue = -9
                    Return bshift(Glo:ReturnValue,-16) + ErrorCode()
                End
            End
        Else
            Glo:ReturnValue = -10
            Return bshift(Glo:ReturnValue,-16) + ErrorCode()
        End
    End

    BO:BrowserOutputDate    = Today()
    BO:BrowserOutputTime    = Clock()
     
    Glo:RVLong = ISWA_MultiByteToWideChar(  ISEQ:CP_UTF8,|
                                            0,|
                                            Address(Loc:Buffer_UTF8)+4,| ! The Size is 4 bytes and precedes the Message.
                                            -1,|
                                            Address(Loc:Buffer_Wide),|
                                            Size(Loc:Buffer_Wide))

    Glo:RVLong = ISWA_WideCharToMultiByte(  ISEQ:CP_UTF8,|
                                            0,|
                                            Address(Loc:Buffer_Wide),|
                                            -1,|
                                            Address(Loc:Buffer_Ansi),|
                                            Size(Loc:Buffer_Ansi),|
                                            0,|
                                            0)

    BO:BrowserOutputString  = Loc:Buffer_Ansi
    Add(BrowserOutput)
    IF ErrorCode()
        Glo:ReturnValue = -11
        Return bshift(Glo:ReturnValue,-16) + ErrorCode()
    End 

    Close(BrowserOutput)
    IF ErrorCode()
        Glo:ReturnValue = -12
        Return bshift(Glo:ReturnValue,-16) + ErrorCode()
    End

    Return 0