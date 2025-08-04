#include "worker.h"
#include <QDebug>
#include "fileutil.h"

Worker::Worker()
{

    qDebug() << "构造work";
}

void Worker::run()
{
   fileutil fu;
   fu.fileWatcher();
}
