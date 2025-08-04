/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.9.6
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QTextBrowser>
#include <QtWidgets/QToolBar>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QPushButton *pushButtonStartListener;
    QPushButton *pushButton_StopListener;
    QWidget *layoutWidget;
    QVBoxLayout *verticalLayout;
    QPushButton *pushButtonSourceFolderSelect;
    QPushButton *pushButtonDestFolderSelect;
    QWidget *layoutWidget1;
    QVBoxLayout *verticalLayout_2;
    QLineEdit *lineEditSourceFolderPath;
    QLineEdit *lineEditDestFolderPath;
    QWidget *layoutWidget2;
    QVBoxLayout *verticalLayout_3;
    QLabel *label;
    QLabel *label_2;
    QTextBrowser *textBrowser;
    QMenuBar *menuBar;
    QToolBar *mainToolBar;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QStringLiteral("MainWindow"));
        MainWindow->resize(605, 499);
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        pushButtonStartListener = new QPushButton(centralWidget);
        pushButtonStartListener->setObjectName(QStringLiteral("pushButtonStartListener"));
        pushButtonStartListener->setGeometry(QRect(150, 100, 91, 31));
        pushButton_StopListener = new QPushButton(centralWidget);
        pushButton_StopListener->setObjectName(QStringLiteral("pushButton_StopListener"));
        pushButton_StopListener->setGeometry(QRect(310, 100, 91, 31));
        layoutWidget = new QWidget(centralWidget);
        layoutWidget->setObjectName(QStringLiteral("layoutWidget"));
        layoutWidget->setGeometry(QRect(490, 30, 94, 61));
        verticalLayout = new QVBoxLayout(layoutWidget);
        verticalLayout->setSpacing(6);
        verticalLayout->setContentsMargins(11, 11, 11, 11);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        verticalLayout->setContentsMargins(0, 0, 0, 0);
        pushButtonSourceFolderSelect = new QPushButton(layoutWidget);
        pushButtonSourceFolderSelect->setObjectName(QStringLiteral("pushButtonSourceFolderSelect"));

        verticalLayout->addWidget(pushButtonSourceFolderSelect);

        pushButtonDestFolderSelect = new QPushButton(layoutWidget);
        pushButtonDestFolderSelect->setObjectName(QStringLiteral("pushButtonDestFolderSelect"));

        verticalLayout->addWidget(pushButtonDestFolderSelect);

        layoutWidget1 = new QWidget(centralWidget);
        layoutWidget1->setObjectName(QStringLiteral("layoutWidget1"));
        layoutWidget1->setGeometry(QRect(90, 30, 391, 61));
        verticalLayout_2 = new QVBoxLayout(layoutWidget1);
        verticalLayout_2->setSpacing(6);
        verticalLayout_2->setContentsMargins(11, 11, 11, 11);
        verticalLayout_2->setObjectName(QStringLiteral("verticalLayout_2"));
        verticalLayout_2->setContentsMargins(0, 0, 0, 0);
        lineEditSourceFolderPath = new QLineEdit(layoutWidget1);
        lineEditSourceFolderPath->setObjectName(QStringLiteral("lineEditSourceFolderPath"));

        verticalLayout_2->addWidget(lineEditSourceFolderPath);

        lineEditDestFolderPath = new QLineEdit(layoutWidget1);
        lineEditDestFolderPath->setObjectName(QStringLiteral("lineEditDestFolderPath"));

        verticalLayout_2->addWidget(lineEditDestFolderPath);

        layoutWidget2 = new QWidget(centralWidget);
        layoutWidget2->setObjectName(QStringLiteral("layoutWidget2"));
        layoutWidget2->setGeometry(QRect(20, 30, 62, 61));
        verticalLayout_3 = new QVBoxLayout(layoutWidget2);
        verticalLayout_3->setSpacing(6);
        verticalLayout_3->setContentsMargins(11, 11, 11, 11);
        verticalLayout_3->setObjectName(QStringLiteral("verticalLayout_3"));
        verticalLayout_3->setContentsMargins(0, 0, 0, 0);
        label = new QLabel(layoutWidget2);
        label->setObjectName(QStringLiteral("label"));

        verticalLayout_3->addWidget(label);

        label_2 = new QLabel(layoutWidget2);
        label_2->setObjectName(QStringLiteral("label_2"));

        verticalLayout_3->addWidget(label_2);

        textBrowser = new QTextBrowser(centralWidget);
        textBrowser->setObjectName(QStringLiteral("textBrowser"));
        textBrowser->setGeometry(QRect(20, 140, 561, 301));
        MainWindow->setCentralWidget(centralWidget);
        menuBar = new QMenuBar(MainWindow);
        menuBar->setObjectName(QStringLiteral("menuBar"));
        menuBar->setGeometry(QRect(0, 0, 605, 23));
        MainWindow->setMenuBar(menuBar);
        mainToolBar = new QToolBar(MainWindow);
        mainToolBar->setObjectName(QStringLiteral("mainToolBar"));
        MainWindow->addToolBar(Qt::TopToolBarArea, mainToolBar);
        statusBar = new QStatusBar(MainWindow);
        statusBar->setObjectName(QStringLiteral("statusBar"));
        MainWindow->setStatusBar(statusBar);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "\346\226\207\344\273\266\345\220\214\346\255\245\345\212\251\346\211\213", Q_NULLPTR));
        pushButtonStartListener->setText(QApplication::translate("MainWindow", "\345\274\200\345\247\213\347\233\221\345\220\254", Q_NULLPTR));
        pushButton_StopListener->setText(QApplication::translate("MainWindow", "\345\201\234\346\255\242\347\233\221\345\220\254", Q_NULLPTR));
        pushButtonSourceFolderSelect->setText(QApplication::translate("MainWindow", "\351\200\211\346\213\251\346\272\220\346\226\207\344\273\266\345\244\271", Q_NULLPTR));
        pushButtonDestFolderSelect->setText(QApplication::translate("MainWindow", "\351\200\211\346\213\251\347\233\256\346\240\207\346\226\207\344\273\266\345\244\271", Q_NULLPTR));
        label->setText(QApplication::translate("MainWindow", "\346\272\220\346\226\207\344\273\266\345\244\271", Q_NULLPTR));
        label_2->setText(QApplication::translate("MainWindow", "\347\233\256\346\240\207\346\226\207\344\273\266\345\244\271", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
