#include <QCoreApplication>

#include "worker.h"




int main(int argc, char *argv[])
{
    QCoreApplication app(argc, argv);


//    // 启动新线程
//    Worker worker;
//    worker.start();


//    // 程序结束后 停止线程
//    // Ensure the thread is stopped properly when the application ends
//       app.connect(&app, &QCoreApplication::aboutToQuit, [&worker]() {
//           worker.requestInterruption();
//           worker.wait(); // Ensure the thread finishes execution
//       });



    // 保持程序运行
    app.exec();

    return 0;
}




