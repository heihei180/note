#ifndef FOLDERWATCHER_H
#define FOLDERWATCHER_H

#include <QFileSystemWatcher>
#include <QDir>
#include <QObject>

class FolderWatcher : public QObject
{
    Q_OBJECT

public:
    explicit FolderWatcher(const QString &directory, QObject *parent = nullptr);

    void recursiveAddDirectory(const QString &dir);

signals:
    void fileChanged(const QString &path);
    void directoryChanged(const QString &path);

private slots:
    void onFileChanged(const QString &path);
    void onDirectoryChanged(const QString &path);

private:
    QFileSystemWatcher *watcher;
};

#endif // FOLDERWATCHER_H
