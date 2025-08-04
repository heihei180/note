#ifndef WORKER_H
#include <QThread>
#include <QDebug>
#include <QObject>
#define WORKER_H



class Worker : public QThread
{
    Q_OBJECT
public:
    Worker();
protected:
    void run() override;
};

#endif // WORKER_H
