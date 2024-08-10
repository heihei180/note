#ifndef FILECHANGENOTIFIERUTILS_H
#define FILECHANGENOTIFIERUTILS_H
#include <windows.h>
#include <string>
// 文件变化处理函数
void OnFileChange(DWORD dwAction, const std::wstring& wszFileName);

#endif // FILECHANGENOTIFIERUTILS_H
