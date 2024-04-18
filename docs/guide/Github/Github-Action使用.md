# Github Action 初体验



这个ci文件的讲解：
```yml


name: Build and Deploy


on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: vuepress-deploy
      uses: jenkey2011/vuepress-deploy@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        TARGET_REPO: heihei180/note
        TARGET_BRANCH: gh-pages
        BUILD_SCRIPT: yarn && yarn docs:build
        BUILD_DIR: docs/.vuepress/dist

```


ai 讲解：

这是一个使用YAML格式编写的GitHub Actions工作流配置文件。名为“Build and Deploy”的工作流在对仓库进行push操作时触发。该工作流包含一个单独的任务——build-and-deploy，它在Ubuntu最新版环境中运行，并执行以下步骤：

Checkout： 使用actions/checkout@master动作，将当前代码库克隆到运行环境，以便后续步骤能够访问并处理代码。

vuepress-deploy： 使用jenkey2011/vuepress-deploy@master自定义动作，负责VuePress项目的构建与部署。该步骤涉及以下环境变量：

ACCESS_TOKEN： 存储于GitHub Secrets的ACCESS_TOKEN，用于授权访问目标仓库。这个Token应具有向目标仓库推送代码的权限。

TARGET_REPO： 目标仓库名，此处为heihei180/note。构建后的VuePress文档将部署到此仓库。

TARGET_BRANCH： 目标分支名，设定为gh-pages。构建产物将推送到此分支，以便GitHub Pages基于此分支内容托管静态网站。

BUILD_SCRIPT： 定义构建命令，此处为yarn && yarn docs:build。先通过yarn安装项目依赖，然后执行docs:build脚本（通常由VuePress项目中的package.json定义），生成静态网页。

BUILD_DIR： 指定构建输出目录，设为docs/.vuepress/dist。这是VuePress默认的构建产物目录，其中包含了生成的静态HTML、CSS、JavaScript等文件，这些文件将在部署阶段被推送到目标仓库的指定分支。

总结来说，当有人向该仓库推送代码时，此工作流会自动触发。它首先检出代码，然后使用提供的VuePress构建脚本构建项目文档，最后将构建好的静态网站部署到指定的GitHub Pages仓库（heihei180/note）和分支（gh-pages）。整个过程借助了GitHub Secrets存储的访问令牌进行安全的身份验证和授权操作。
