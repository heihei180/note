#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QString>
#include <QFileDialog>
#include <QMessageBox>
#include <QLineEdit>
#include <QPushButton>
#include <QDir>
#include <QDebug>
#include "folderwatcher.h"
#include <QDateTime>




MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow),
    folderWatcher (nullptr)
{

    ui->setupUi(this);
    // 启动后，默认将停止监听按钮置灰，只有开始监听后，才激活
    ui->pushButton_StopListener->setEnabled(false);
    // 禁止用户修改窗体大小
    setFixedSize(this->width(), this->height());
}

MainWindow::~MainWindow()
{
    delete ui;
}


/**
  * 绑定选择按钮，选择源文件夹的路径
 * @brief MainWindow::on_pushButtonSourceFolderSelect_clicked
 */
void MainWindow::on_pushButtonSourceFolderSelect_clicked()
{
    QString folderName = QFileDialog::getExistingDirectory(this, "选择源文件夹", "C:", QFileDialog::ShowDirsOnly | QFileDialog::DontResolveSymlinks);
    if (!folderName.isEmpty()) {
        ui->lineEditSourceFolderPath->setText(folderName);
    }
}

void MainWindow::on_pushButtonDestFolderSelect_clicked()
{
    QString folderName = QFileDialog::getExistingDirectory(this, "选择目标文件夹", "C:", QFileDialog::ShowDirsOnly | QFileDialog::DontResolveSymlinks);
    if (!folderName.isEmpty()) {
        ui->lineEditDestFolderPath->setText(folderName);
    }
}

/**
  开启监听任务，即启动程序
 * @brief MainWindow::on_pushButtonStartListener_clicked
 */
void MainWindow::on_pushButtonStartListener_clicked()
{

    int reply = QMessageBox::question(this, "启动", "开始监听文件变化，并且将修改的文件同步到目标文件中...",  QMessageBox::Yes|QMessageBox::No);
    if(reply == QMessageBox::Yes){
        // 对源文件夹和目标文件夹的路径做校验，不得为空
        bool validRes = validFolderSelected();
        if(!validRes){
            return ;
        }

        // 校验文件夹是否存在？
        if(!validFolderExist(ui->lineEditSourceFolderPath->text()) ||
                !validFolderExist(ui->lineEditDestFolderPath->text())){
            return; // 有任何一个目录不存在，就退出操作！
        }


        // 启动监听任务
//        RecursiveFileSystemWatcher rfsw(ui->lineEditSourceFolderPath->text());
        // 创建并启动 FolderWatcher
        QString directory = ui->lineEditSourceFolderPath->text();

           if (!directory.isEmpty() && QDir(directory).exists()) {
               // 创建并启动 FolderWatcher
               folderWatcher = new FolderWatcher(directory, this);  // 注意这里的文件路径
               connect(folderWatcher, &FolderWatcher::fileChanged, this, &MainWindow::onFileChanged);
               connect(folderWatcher, &FolderWatcher::directoryChanged, this, &MainWindow::onDirectoryChanged);
           } else {
               QMessageBox::warning(this, tr("警告"), tr("请输入有效的目录路径！"));
           }


        // 启动 监听后，将启动按钮置灰，并且修改字体为监听中...
        ui->pushButtonStartListener->setText("监听中···");
        ui->pushButtonStartListener->setEnabled(false);
        // 点击开始后，才将停止监听按钮激活
        ui->pushButton_StopListener->setEnabled(true);
    }
}

// 停止程序
void MainWindow::on_pushButton_StopListener_clicked()
{
    int reply = QMessageBox::question(this, "停止", "你确定要停止程序，并且停止文件监听、同步",  QMessageBox::Yes|QMessageBox::No);

    if(reply == QMessageBox::Yes){
        // 如果停止监听后，将启动监听按钮激活
        ui->pushButtonStartListener->setText("开始监听");
        ui->pushButtonStartListener->setEnabled(true);


        // 停止监听后，将停止按钮置灰
        ui->pushButton_StopListener->setEnabled(false);

        // 停止监听
       if (folderWatcher) {
           folderWatcher->deleteLater();
           folderWatcher = nullptr;
       }
    }else {
        QMessageBox::information(this, "取消","取消操作，不启动程序");
    }



}

/**
  检验 源文件夹和 目标文件夹是否选择，不能为空目录
 * @brief validFolderSelected
 * @param ui
 */
bool MainWindow::validFolderSelected(){

    // 源文件夹内容
   QString sourceFolder = ui->lineEditSourceFolderPath->text();
   if(sourceFolder.isEmpty() || sourceFolder.isNull()){
       QMessageBox::warning(this, "警告", "请选择源文件夹路径！");
              return false ;
   }
   // 目标文件夹内容
   QString destFolder = ui->lineEditDestFolderPath->text();

   if(destFolder.isEmpty() || destFolder.isNull()){
       QMessageBox::warning(this, "警告", "请选择目标文件夹路径！");
        return false ;
   }

   return true;
}

bool MainWindow::validFolderExist(QString path)
{
    QDir dir(path);
    // 使用exists()方法检查文件夹是否存在
    if (dir.exists()) {
        return true;
    } else {
        qDebug() << "文件夹不存在：" << path;
        QMessageBox::warning(this, "目录不存在", path);
        return false;
    }
}


void MainWindow::onFileChanged(const QString &path)
{
    qDebug() << "File changed:" << path;
    // 这里可以添加更多的逻辑来处理文件变化的情况
    qDebug() << "Last modified:" << QFileInfo(path).lastModified();
}

void MainWindow::onDirectoryChanged(const QString &path)
{
    qDebug() << "Directory changed:" << path;
    // 这里可以添加更多的逻辑来处理目录变化的情况
    qDebug() << "Last modified:" << QFileInfo(path).lastModified();
}
