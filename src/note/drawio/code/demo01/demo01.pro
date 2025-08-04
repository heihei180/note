#-------------------------------------------------
#
# Project created by QtCreator 2024-04-29T21:32:29
#
#-------------------------------------------------

# 支持的库
QT       += core gui

# 版本支持
greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

# 项目名称
TARGET = demo01
# 使用的模板 = 应用程序
TEMPLATE = app

# The following define makes your compiler emit warnings if you use
# any feature of Qt which has been marked as deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
# 定义的宏
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if you use deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

# 指定项目的所有源文件
SOURCES += \
        main.cpp \
        mainwindow.cpp
# 头文件
HEADERS += \
        mainwindow.h
# 界面文件
FORMS += \
        mainwindow.ui
