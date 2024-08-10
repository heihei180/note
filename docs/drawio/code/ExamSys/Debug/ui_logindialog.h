/********************************************************************************
** Form generated from reading UI file 'logindialog.ui'
**
** Created by: Qt User Interface Compiler version 5.9.6
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_LOGINDIALOG_H
#define UI_LOGINDIALOG_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QDialog>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>

QT_BEGIN_NAMESPACE

class Ui_LoginDialog
{
public:
    QLabel *label;
    QLabel *label_2;
    QLineEdit *account_edit;
    QLineEdit *lineEdit_password;
    QPushButton *pushButton;
    QPushButton *pushButton_cancle;
    QLabel *image_label;

    void setupUi(QDialog *LoginDialog)
    {
        if (LoginDialog->objectName().isEmpty())
            LoginDialog->setObjectName(QStringLiteral("LoginDialog"));
        LoginDialog->resize(767, 570);
        label = new QLabel(LoginDialog);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(280, 310, 54, 12));
        label_2 = new QLabel(LoginDialog);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setGeometry(QRect(280, 340, 54, 12));
        account_edit = new QLineEdit(LoginDialog);
        account_edit->setObjectName(QStringLiteral("account_edit"));
        account_edit->setGeometry(QRect(340, 310, 113, 20));
        lineEdit_password = new QLineEdit(LoginDialog);
        lineEdit_password->setObjectName(QStringLiteral("lineEdit_password"));
        lineEdit_password->setGeometry(QRect(340, 340, 113, 20));
        pushButton = new QPushButton(LoginDialog);
        pushButton->setObjectName(QStringLiteral("pushButton"));
        pushButton->setGeometry(QRect(270, 380, 75, 23));
        pushButton_cancle = new QPushButton(LoginDialog);
        pushButton_cancle->setObjectName(QStringLiteral("pushButton_cancle"));
        pushButton_cancle->setGeometry(QRect(390, 380, 75, 23));
        image_label = new QLabel(LoginDialog);
        image_label->setObjectName(QStringLiteral("image_label"));
        image_label->setGeometry(QRect(0, 0, 761, 551));
        image_label->setPixmap(QPixmap(QString::fromUtf8(":/login.png")));
        image_label->raise();
        label->raise();
        label_2->raise();
        account_edit->raise();
        lineEdit_password->raise();
        pushButton->raise();
        pushButton_cancle->raise();

        retranslateUi(LoginDialog);

        QMetaObject::connectSlotsByName(LoginDialog);
    } // setupUi

    void retranslateUi(QDialog *LoginDialog)
    {
        LoginDialog->setWindowTitle(QApplication::translate("LoginDialog", "LoginDialog", Q_NULLPTR));
        label->setText(QApplication::translate("LoginDialog", "\350\264\246\345\217\267", Q_NULLPTR));
        label_2->setText(QApplication::translate("LoginDialog", "\345\257\206\347\240\201", Q_NULLPTR));
        pushButton->setText(QApplication::translate("LoginDialog", "\347\231\273\345\275\225", Q_NULLPTR));
        pushButton_cancle->setText(QApplication::translate("LoginDialog", "\345\217\226\346\266\210", Q_NULLPTR));
        image_label->setText(QString());
    } // retranslateUi

};

namespace Ui {
    class LoginDialog: public Ui_LoginDialog {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_LOGINDIALOG_H
