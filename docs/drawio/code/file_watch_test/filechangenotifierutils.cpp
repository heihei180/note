#include "FileChangeNotifierUtils.h"
#include <iostream>
#include <windows.h>
#include <string>

void OnFileChange(DWORD dwAction, const std::wstring& wszFileName)
{
    switch (dwAction)
    {
    case FILE_ACTION_ADDED:
        std::wcout << L"File added: " << wszFileName << std::endl;
        break;
    case FILE_ACTION_REMOVED:
        std::wcout << L"File removed: " << wszFileName << std::endl;
        break;
    case FILE_ACTION_MODIFIED:
        std::wcout << L"File modified: " << wszFileName << std::endl;
        break;
    case FILE_ACTION_RENAMED_OLD_NAME:
        std::wcout << L"File renamed from: " << wszFileName << std::endl;
        break;
    case FILE_ACTION_RENAMED_NEW_NAME:
        std::wcout << L"File renamed to: " << wszFileName << std::endl;
        break;
    default:
        std::wcout << L"Unknown action: " << wszFileName << std::endl;
        break;
    }
}
