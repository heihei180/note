#ifndef WORKER_H
#define WORKER_H

#include <QThread>
#include <QDebug>
#include <QObject>

class Worker : public QThread
{
    Q_OBJECT
public:
    Worker();
protected:
    void run() override;
};

#endif // WORKER_H
