#include "mainwindow.h"
#include <QApplication>

#include <QDebug>
#include "worker.h"

int main(int argc, char *argv[])
{
    qDebug() <<"run here00;";
    QApplication a(argc, argv);
    MainWindow w;
    w.show();
    qDebug() <<"run here1;";


    Worker worker;
    worker.start();
    // 程序结束后 停止线程
    // Ensure the thread is stopped properly when the application ends
       a.connect(&a, &QCoreApplication::aboutToQuit, [&worker]() {
           qDebug()<<"stop......";
           worker.requestInterruption();
           worker.wait(); // Ensure the thread finishes execution
       });


    return a.exec();
}
