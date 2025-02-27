(window.webpackJsonp=window.webpackJsonp||[]).push([[110],{424:function(t,n,s){"use strict";s.r(n);var a=s(25),i=Object(a.a)({},(function(){var t=this,n=t._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"vs2022创建-md"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vs2022创建-md"}},[t._v("#")]),t._v(" VS2022创建.md")]),t._v(" "),n("h2",{attrs:{id:"doc"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#doc"}},[t._v("#")]),t._v(" doc")]),t._v(" "),n("blockquote",[n("p",[t._v("https://learn.microsoft.com/en-us/windows/win32/learnwin32/learn-to-program-for-windows")])]),t._v(" "),n("p",[t._v("绝大多数 Windows API 由函数或组件对象模型 （COM） 接口组成。很少有 Windows API 作为 C++ 类提供。（一个值得注意的例外是 GDI+，它是 2-D 图形 API 之一。")]),t._v(" "),n("h1",{attrs:{id:"类型"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#类型"}},[t._v("#")]),t._v(" 类型")]),t._v(" "),n("p",[t._v("| Data type|\tSize|\tSigned?|\n|:--------------|:-------------|\n| BYTE |\t8 bits | \tUnsigned|\n|DWORD | 32 bits | Unsigned |\n|INT32 | \t32 bits |\tSigned|\n|INT64 | \t64 bits |\tSigned|\n|LONG | \t32 bits |\tSigned|\n|LONGLONG | \t64 bits |\tSigned|\n|UINT32 | \t32 bits |\tUnsigned|\n|UINT64 | \t64 bits |\tUnsigned|\n|ULONG | \t32 bits |\tUnsigned|\n|ULONGLONG | \t64 bits |\tUnsigned|\n|WORD | \t16 bits |\tUnsigned|")]),t._v(" "),n("h2",{attrs:{id:"布尔类型"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#布尔类型"}},[t._v("#")]),t._v(" 布尔类型")]),t._v(" "),n("p",[n("strong",[t._v("BOOL")]),t._v(" 是 int 的类型别名，不同于 C++ 的 bool 以及表示布尔值的其他类型。头文件还定义了两个用于 BOOL 的值。WinDef.h")]),t._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("#define FALSE    0 \n#define TRUE     1\n")])])]),n("p",[t._v("尽管 TRUE 有此定义，但大多数返回 BOOL 类型的函数都可以返回任何非零值来指示布尔值真值。因此，您应该始终编写以下内容：")]),t._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("// Right way.\nif (SomeFunctionThatReturnsBoolean()) \n{ \n    ...\n}\n\n// or\n\nif (SomeFunctionThatReturnsBoolean() != FALSE)\n{ \n    ...\n}\n")])])]),n("h2",{attrs:{id:"指针类型"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#指针类型"}},[t._v("#")]),t._v(" 指针类型")]),t._v(" "),n("p",[t._v("这些名称中通常包含前缀 P- 或 LP-")]),t._v(" "),n("p",[t._v("在 16 位体系结构（16 位 Windows）上，有 2 种类型的指针，P 代表“指针”，LP 代表“长指针”。需要长指针（也称为远指针）来寻址当前段之外的内存范围。保留了 LP 前缀，以便更轻松地将 16 位代码移植到 32 位 Windows。今天没有区别，这些指针类型都是等效的。避免使用这些前缀;或者，如果必须使用 P，则使用 P。")]),t._v(" "),n("h2",{attrs:{id:"win32-字符串说明"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#win32-字符串说明"}},[t._v("#")]),t._v(" win32 字符串说明")]),t._v(" "),n("p",[t._v("https://learn.microsoft.com/en-us/windows/win32/learnwin32/working-with-strings")]),t._v(" "),n("h1",{attrs:{id:"win-32-api"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#win-32-api"}},[t._v("#")]),t._v(" win 32 API")]),t._v(" "),n("p",[t._v("https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-wndclassexw")])])}),[],!1,null,null,null);n.default=i.exports}}]);