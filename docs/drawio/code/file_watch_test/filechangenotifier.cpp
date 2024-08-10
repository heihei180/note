#include "FileChangeNotifier.h"
#include <iostream>
#include <string>
#include <thread>
#include <chrono>

// 文件变化处理函数
void FileChangeNotifier::OnFileChange(DWORD dwAction, const std::wstring& wszFileName)
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

FileChangeNotifier::FileChangeNotifier(const std::wstring& folderPath, QObject *parent)
    : QThread(parent), m_folderPath(folderPath), m_hDir(INVALID_HANDLE_VALUE), m_pBuf(nullptr), m_dwBytesReturned(0)
{
}

FileChangeNotifier::~FileChangeNotifier()
{
    if (m_hDir != INVALID_HANDLE_VALUE)
    {
        CloseHandle(m_hDir);
    }
    delete[] m_pBuf;
}

void FileChangeNotifier::run()
{
    m_hDir = CreateFileW(m_folderPath.c_str(),
                         FILE_LIST_DIRECTORY,
                         FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE,
                         NULL,
                         OPEN_EXISTING,
                         FILE_FLAG_BACKUP_SEMANTICS | FILE_FLAG_OVERLAPPED,
                         NULL);

    if (m_hDir == INVALID_HANDLE_VALUE)
    {
        std::wcerr << L"Error opening directory." << std::endl;
        return;
    }

    const DWORD cBufferSize = 1024 * 64; // 64KB buffer
    m_pBuf = new char[cBufferSize];
    m_dwBytesReturned = 0;
    OVERLAPPED m_ol = { 0 };

    while (true)
    {
        if (!ReadDirectoryChangesW(
            m_hDir,       // handle to directory
            m_pBuf,       // buffer for results
            cBufferSize,  // size of buffer
            TRUE,         // monitoring the subdirectories
            FILE_NOTIFY_CHANGE_FILE_NAME |
            FILE_NOTIFY_CHANGE_DIR_NAME |
            FILE_NOTIFY_CHANGE_LAST_WRITE |
            FILE_NOTIFY_CHANGE_SIZE |
            FILE_NOTIFY_CHANGE_CREATION |
            FILE_NOTIFY_CHANGE_SECURITY,
            &m_dwBytesReturned, // bytes returned
            &m_ol,        // overlapped structure
            NULL))        // completion routine
        {
            if (GetLastError() != ERROR_OPERATION_ABORTED)
            {
                std::wcerr << L"Error in ReadDirectoryChangesW" << std::endl;
                break;
            }
        }

        // 处理文件变化
        PFILE_NOTIFY_INFORMATION pNotifyInfo = (PFILE_NOTIFY_INFORMATION)m_pBuf;
        do
        {
            std::wstring wszFileName(pNotifyInfo->FileName, pNotifyInfo->FileNameLength / sizeof(WCHAR));
            emit fileChanged(wszFileName, pNotifyInfo->Action);

            pNotifyInfo = (PFILE_NOTIFY_INFORMATION)((char*)pNotifyInfo + pNotifyInfo->NextEntryOffset);
        } while (pNotifyInfo);

        // 等待变化发生
        Sleep(100); // 100 ms delay to avoid high CPU usage
    }

    delete[] m_pBuf;
    CloseHandle(m_hDir);
}
