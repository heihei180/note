#!/bin/bash  
# ./ry.sh start|stop|restart|status  
AppName=ruoyi-admin.jar  
  
# JVM参数  
JVM_OPTS="-Dname=$AppName -Duser.timezone=Asia/Shanghai -Xms512m -Xmx1024m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError -XX:+PrintGCDateStamps -XX:+PrintGCDetails -XX:NewRatio=1 -XX:SurvivorRatio=30 -XX:+UseParallelGC -XX:+UseParallelOldGC"  
APP_HOME=$(pwd)  
LOG_PATH="$APP_HOME/logs/$AppName.log"  
  
if [ "$1" = "" ]; then  
    echo -e "\033[0;31m 未输入操作名 \033[0m  \033[0;34m {start|stop|restart|status} \033[0m"  
    exit 1  
fi  
  
# 无需检查AppName是否为空，因为它在脚本开始处已定义  
  
function start() {  
    PID=$(ps -ef | grep java | grep $AppName | grep -v grep | awk '{print $2}')  
    if [ -n "$PID" ]; then  
        echo "$AppName is already running..."  
    else  
        nohup java $JVM_OPTS -jar $AppName > "$LOG_PATH" 2>&1 &  
        echo "Start $AppName success..."  
    fi  
}  
  
function stop() {  
    echo "Stopping $AppName..."  
    PID=""  
    query() {  
        PID=$(ps -ef | grep java | grep $AppName | grep -v grep | awk '{print $2}')  
    }  
    query  
    if [ -n "$PID" ]; then  
        kill -TERM $PID  
        echo "$AppName (pid:$PID) exiting..."  
        while [ -n "$PID" ]; do  
            sleep 1  
            query  
        done  
        echo "$AppName exited."  
    else  
        echo "$AppName already stopped."  
    fi  
}  
  
function restart() {  
    stop  
    sleep 2  
    start  
}  
  
function status() {  
    PID=$(ps -ef | grep java | grep $AppName | grep -v grep | wc -l)  
    if [ $PID -ne 0 ]; then  
        echo "$AppName is running..."  
    else  
        echo "$AppName is not running..."  
    fi  
}  
  
case $1 in  
    start)  
        start  
        ;;  
    stop)  
        stop  
        ;;  
    restart)  
        restart  
        ;;  
    status)  
        status  
        ;;  
    *)  
        echo "Usage: $0 {start|stop|restart|status}"  
        exit 1  
        ;;  
esac