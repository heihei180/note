@echo off  
setlocal enabledelayedexpansion  
  
REM 确保脚本在遇到错误时停止执行  
if "%errorlevel%" neq "0" exit /b %errorlevel%  
  
REM 生成静态文件  
npm run docs:build  
if "%errorlevel%" neq "0" exit /b %errorlevel%  
  
REM 进入生成的文件夹  
cd docs\.vuepress\dist  
if "%errorlevel%" neq "0" exit /b %errorlevel%  
  
REM 如果是发布到自定义域名  
REM echo www.example.com > CNAME  
  
REM 初始化git仓库  
git init  
if "%errorlevel%" neq "0" exit /b %errorlevel%  
  
REM 添加所有文件到git  
git add -A  
if "%errorlevel%" neq "0" exit /b %errorlevel%  
  
REM 提交更改  
git commit -m "deploy"  
if "%errorlevel%" neq "0" exit /b %errorlevel%  
  
REM 如果发布到 https://<USERNAME>.github.io  
REM git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master  
  
REM 如果发布到 https://<USERNAME>.github.io/<REPO>  
git push -f https://github.com/heihei180/note.git master:gh-pages  
if "%errorlevel%" neq "0" exit /b %errorlevel%  
  
REM 返回原来的目录  
cd ..