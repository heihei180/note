#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include "FolderWatcher.h"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    bool validFolderSelected();
    /**
     * @brief validFolderExist
     * @param path
     * @return 校验给定的目录是否存在？
     */
    bool validFolderExist(QString path);
    ~MainWindow();

private slots:
    void on_pushButtonSourceFolderSelect_clicked();

    void on_pushButtonDestFolderSelect_clicked();

    void on_pushButtonStartListener_clicked();

    void on_pushButton_StopListener_clicked();
    void onFileChanged(const QString &path);
    void onDirectoryChanged(const QString &path);

private:
    Ui::MainWindow *ui;
    FolderWatcher *folderWatcher;
};

#endif // MAINWINDOW_H
