#ifndef LOGINDIALOG_H
#define LOGINDIALOG_H

#include <QDialog>

namespace Ui {
class LoginDialog; // 这是UI_LoginDialog的子类，用于描述登录窗口界面的信息
}

class LoginDialog : public QDialog
{
    // 宏、代表支持信号 槽的机制
    Q_OBJECT

public:

    // 明确指定构造器，不允许隐式转换
    explicit LoginDialog(QWidget *parent = 0);
    // 析构函数
    ~LoginDialog();

private slots:
    // 登录按钮的槽函数
    void on_pushButton_clicked();

private:
    // 指定
    Ui::LoginDialog *ui;
};

#endif // LOGINDIALOG_H
