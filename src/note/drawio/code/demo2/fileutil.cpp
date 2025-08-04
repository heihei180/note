#include "fileutil.h"
#include <iostream>
#include <windows.h>
#include <tchar.h>
#include <iomanip>
#include <fstream>




using namespace std;
fileutil::fileutil()
{
fileQueue = std::setw();
}

void fileutil::fileWatcher()
{
    DWORD cbBytes;
    char file_name[MAX_PATH];
    char file_rename[MAX_PATH];
    char notify[1024];
    int count = 0;
    TCHAR dir[] = L"D:\\tmp\\test1";

    HANDLE dirHandle = CreateFile(dir,
        GENERIC_READ | GENERIC_WRITE | FILE_LIST_DIRECTORY,
        FILE_SHARE_READ | FILE_SHARE_WRITE,
        NULL,
        OPEN_EXISTING,
        FILE_FLAG_BACKUP_SEMANTICS,
        NULL);

    if (dirHandle == INVALID_HANDLE_VALUE)
    {
        cout << "error" + GetLastError() << endl;
        return; // 添加return来终止函数
    }

    memset(notify, 0, sizeof(notify));
    FILE_NOTIFY_INFORMATION* pnotify = (FILE_NOTIFY_INFORMATION*)notify;

    cout << "Start Monitor..." << endl;

    while (true)
    {
        if (ReadDirectoryChangesW(dirHandle, &notify, 1024, true,
            FILE_NOTIFY_CHANGE_FILE_NAME | FILE_NOTIFY_CHANGE_DIR_NAME | FILE_NOTIFY_CHANGE_SIZE,
            &cbBytes, NULL, NULL))
        {
            if (pnotify->FileName)
            {
                memset(file_name, 0, sizeof(file_name));
                WideCharToMultiByte(CP_ACP, 0, pnotify->FileName, pnotify->FileNameLength / 2, file_name, sizeof(file_name) - 1, NULL, NULL);
            }

            if (pnotify->NextEntryOffset != 0 && (pnotify->FileNameLength > 0 && pnotify->FileNameLength < MAX_PATH))
            {
                PFILE_NOTIFY_INFORMATION p = (PFILE_NOTIFY_INFORMATION)((char*)pnotify + pnotify->NextEntryOffset);
                memset(file_rename, 0, sizeof(file_rename));
                WideCharToMultiByte(CP_ACP, 0, p->FileName, p->FileNameLength / 2, file_rename, sizeof(file_rename) - 1, NULL, NULL);
            }

            switch (pnotify->Action)
            {
            case FILE_ACTION_ADDED:
                fileQueue.insert(file_name); // 将文件名添加到队列
                count++;
                cout << "count  = " << count << endl;
                cout << setw(5) << "file add:" << setw(5) << file_name << endl;
                break;

            case FILE_ACTION_MODIFIED:
                cout << "file modified:" << setw(5) << file_name << endl;
                break;

            case FILE_ACTION_REMOVED:
                fileQueue.erase(file_name); // 文件被删除，从队列中移除
                count++;
                cout << count << setw(5) << "file removed:" << setw(5) << file_name << endl;
                break;

            case FILE_ACTION_RENAMED_OLD_NAME:
                fileQueue.erase(file_name); // 重命名时，移除旧文件名
                fileQueue.insert(file_rename); // 添加新文件名
                cout << "file renamed:" << setw(5) << file_name << "->" << file_rename << endl;
                break;

            default:
                cout << "Unknown command!" << endl;
            }
        }
    }

    CloseHandle(dirHandle);
}



//void fileutil::copyFilesToBackup(const std::string& backupDir) {
//    for (const auto& file : fileQueue) {
//        std::filesystem::path sourcePath = file;
//        std::filesystem::path destPath = backupDir;
//        destPath /= sourcePath.filename();

//        try {
//            std::filesystem::copy_file(sourcePath, destPath, std::filesystem::copy_options::overwrite_existing);
//            cout << "Copied: " << sourcePath << " to " << destPath << endl;
//        }
//        catch (const std::filesystem::filesystem_error& e) {
//            cout << "Error copying file: " << e.what() << endl;
//        }
//    }
//}
