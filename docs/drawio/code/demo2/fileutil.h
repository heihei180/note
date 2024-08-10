#ifndef FILEUTIL_H

#define FILEUTIL_H

#include <cstring>
using namespace std;

class fileutil
{
public:
    fileutil();
    // 文件监听函数
    void fileWatcher();
//    // 拷贝函数
//    void copyFilesToBackup(const std::string& backupDir);

private:
    std::set<std::string> fileQueue;
};

#endif // FILEUTIL_H
