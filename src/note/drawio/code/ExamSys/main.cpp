#include "logindialog.h"
#include <QApplication>

int main(int argc, char *argv[])
{

    // 应用程序
    QApplication a(argc, argv);
    // 登录窗口对象
    LoginDialog w;
    // 展示窗口
    w.show();

    // 使用对象进入消息循环
    return a.exec();
}
