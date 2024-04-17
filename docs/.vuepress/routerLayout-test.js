const fs = require("fs");
const path = require("path");

function resolve(dir) {
    return path.resolve(__dirname, dir);
}

function getDirectoryTreeSync(dirPath, parentDir = "") {
    console.log("file path:", dirPath); // 打印传入的路径
    const tempPath = resolve(dirPath);
    if (parentDir.trim().length === 0)
        parentDir = path.join("/",path.basename(tempPath), "/")
    console.log("temp Path:", tempPath); // 打印解析后的绝对路径

    const files = fs.readdirSync(tempPath);
    const children = files
        .map((file) => {
            const filePath = path.join(tempPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                // 如果是目录，递归获取子目录的树结构
                return getDirectoryTreeSync(filePath, path.join(parentDir, path.basename(file)));
            } else {
                let ext = path.extname(file);

                if ('.md' === ext){
                    // 如果是文件，返回文件名（不包括扩展名）
                    let fileNameAndPath = path.basename(file, path.extname(file));
                    // 处理readme 文件
                    if (fileNameAndPath.toLowerCase() === 'readme') {
                        fileNameAndPath = ''
                    }
                    if (!parentDir.endsWith("\\") && !parentDir.endsWith("/")) {
                        fileNameAndPath = parentDir + "/" + fileNameAndPath;
                    } else {
                        fileNameAndPath = parentDir + fileNameAndPath;
                    }
                    fileNameAndPath = fileNameAndPath.replace(/\\/g, "/")

                    // 处理 以 readme 结尾的字符串
                    if (/readme$/i.test(fileNameAndPath)) {
                        fileNameAndPath = fileNameAndPath.replace(/readme/ig, "");
                    }
                    return fileNameAndPath;
                }

            }
        })
        .filter((item) => item !== undefined);


    // 如果没有子目录或文件，返回null
    if (children.length === 0) {
        return null;
    }

    // 返回当前目录的树形结构
    return {
        title: path.basename(parentDir || dirPath), // 使用parentDir（如果存在）或dirPath的basename作为title
        children,
    };
}

function buildTree(dir) {
    // console.log("====dir ======", dir);

    // let result = JSON.stringify(getDirectoryTreeSync(dir));
    // let result = getDirectoryTreeSync(dir);
    // console.log("====== result =====", result);
    // 不想再改了，js 实在不行，就这么办吧
    return [getDirectoryTreeSync(dir)][0]?.children;
}

buildTree("../guide");


module.exports = buildTree;
