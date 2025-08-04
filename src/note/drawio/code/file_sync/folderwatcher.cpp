#include "FolderWatcher.h"
#include <QDebug>
#include <QDir>
#include <QStringList>
#include <qstring.h>

FolderWatcher::FolderWatcher(const QString &directory, QObject *parent)
    : QObject(parent), watcher(new QFileSystemWatcher(this))
{
    // 添加要监控的目录
    if (QDir(directory).exists()) {
        watcher->addPath(directory);
    }

    // 递归添加子目录
//    recursiveAddDirectory(directory);


    // 连接信号和槽
    connect(watcher, &QFileSystemWatcher::fileChanged, this, &FolderWatcher::onFileChanged);
    connect(watcher, &QFileSystemWatcher::directoryChanged, this, &FolderWatcher::onDirectoryChanged);



}

void FolderWatcher::recursiveAddDirectory(const QString &dir)
{
    QDir subDirs(dir);

    QStringList dirs = subDirs.entryList(QDir::Dirs | QDir::NoDotAndDotDot);
    for (const QString &dirName : dirs) {
        QString fullPath = dir + QDir::separator() + dirName;
        watcher->addPath(fullPath);
        recursiveAddDirectory(fullPath); // 递归调用以添加更深层次的子目录
    }
}

void FolderWatcher::onFileChanged(const QString &path)
{
    emit fileChanged(path);
}

void FolderWatcher::onDirectoryChanged(const QString &path)
{
    emit directoryChanged(path);
}
