#ifndef FILECHANGENOTIFIER_H
#define FILECHANGENOTIFIER_H

#include <QThread>
#include <windows.h>
#include <iostream>
#include <string>

class FileChangeNotifier : public QThread
{
    Q_OBJECT

public:
    explicit FileChangeNotifier(const std::wstring& folderPath, QObject *parent = nullptr);
    void OnFileChange(DWORD dwAction, const std::wstring& wszFileName);
    ~FileChangeNotifier();

signals:
    void fileChanged(const std::wstring& fileName, DWORD action);

protected:
    void run() override;

private:
    std::wstring m_folderPath;
    HANDLE m_hDir;
    char* m_pBuf;
    DWORD m_dwBytesReturned;
    OVERLAPPED m_ol;
};

#endif // FILECHANGENOTIFIER_H
