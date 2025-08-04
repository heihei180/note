#include "logindialog.h"
#include "ui_logindialog.h"
// c++风格的引入
#include <QMessageBox>

LoginDialog::LoginDialog(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::LoginDialog)
{

    // 初始化界面信息
    ui->setupUi(this);


    // 包含内容，设置为填充
    ui->image_label->setScaledContents(true);

    // 设置窗体的宽高,和标签的宽高一样
    this->resize(ui->image_label->width(), ui->image_label->height());

    // 设置窗口标题
    this->setWindowTitle("驾校科目一考试登录");
    this->setWindowFlags(Qt::Dialog | Qt::WindowCloseButtonHint);
}

LoginDialog::~LoginDialog()
{
    delete ui;
}

/**
 * 登录按钮的槽函数
 * 按住F2按钮，可以切换定义和声明。
 * @brief LoginDialog::on_pushButton_clicked
 */
void LoginDialog::on_pushButton_clicked()
{
    // QMessageBox::information(this,"消息框", "你点击了登录按钮");

    // 读取账号、密码

    // 正则验证 用户名、密码
    QRegExp rx("^[A-Za-z0-9]+$");
    // 匹配账号
    // 这个正则不支持中文
    // ui->account_edit->text() 获取输入框的内容
    QString uname = ui->account_edit->text();
    QString pword = ui->lineEdit_password->text();
    bool accountVerifyResult = rx.exactMatch(uname);
    bool passwdVerifyResult = rx.exactMatch(pword);

    if (uname == "admin" && pword == "admin"){
          QMessageBox::information(this,"登录成功", "欢迎admin登录！");
    }else{
        QMessageBox::warning(this,"登录失败", "账号或者密码错误");
        // 内容框的内容进行清楚
        ui->account_edit->clear();
        ui->lineEdit_password->clear();
        // 焦点进行聚焦
        ui->account_edit->setFocus();
    }


}
