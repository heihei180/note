#include "worker.h"
#include <QDebug>
#include "fileutil.h"

Worker::Worker()
{


}

void Worker::run()
{
    FileUtil f;
    f.fileWatcher();
}
