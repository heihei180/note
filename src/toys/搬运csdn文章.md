# 搬运CSDN文章
https://tool.lu/markdown/


将CSDN文章转换为Markdown格式，可以按照以下步骤进行，以确保转换的准确性和便捷性：

1. **进入开发人员工具界面**：
   - 在CSDN文章的网页上，你可以通过几种方式进入开发人员工具界面。例如，你可以右键点击页面上的任意位置，选择“检查”（以Google浏览器为例），或者按F12键，或者使用快捷键Ctrl+Shift+I，还可以通过浏览器设置找到“更多工具”然后选择“开发人员工具”。

2. **提取文章内容为HTML**：
   - 在开发人员工具中，找到“元素”或“Elements”标签。
   - 使用Ctrl+F快捷键查找“article_content”这个关键词。这是CSDN文章中存储主体内容的常见标签。
   - 找到对应的`div`元素后，右键点击它，选择“复制”然后选择“复制outerHTML”。这将复制包含文章内容的整个HTML代码段。

3. **使用HTML转Markdown工具**：
   - 打开一个在线的HTML转Markdown工具，例如`https://tool.lu/markdown/`或`https://html-to-markdown.com/demo`。
   - 在这些工具的界面上，找到“HTML2MD”或类似的选项，并将之前复制的outerHTML代码粘贴进去。
   - 点击转换或类似的按钮，工具将自动将HTML代码转换为Markdown格式。

4. **检查和调整Markdown内容**：
   - 转换后的Markdown内容可能会包含一些不需要的部分，例如代码块前的数字或其他样式代码。你可以使用Markdown编辑器进行检查和调整，删除或修改这些部分。
   - 特别注意，有些HTML元素可能无法直接转换为Markdown格式，例如复杂的表格或样式。在这种情况下，你可能需要手动调整Markdown内容以达到期望的效果。

5. **保存和导出Markdown文件**：
   - 在Markdown编辑器中，你可以选择保存或导出转换后的Markdown内容为一个`.md`文件。这样，你就可以在本地或其他支持Markdown的平台上查看和编辑这篇文章了。

通过以上步骤，你可以轻松地将CSDN文章转换为Markdown格式，并在需要的地方进行查看和编辑。