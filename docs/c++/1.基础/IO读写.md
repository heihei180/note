# CPP读写文件

基础类库

![image-20240421104957827](https://raw.githubusercontent.com/heihei180/temp_file/file/picgo/image-20240421104957827.png)

## 头文件

```cpp

#include <iostream>
#include <fstream>  // this head file
#include <string>


using namespace std;

```



## 写文件

```cp

// 控制台输入文字，写入到文件

void write(){

	string name;
	ofstream os; // 定义输出流对象
	os.open("out.txt", ios::app); // 打开一个文件, 追加方式， 还可以使用位操作，拼接多个操作方式
	while (true) {
		cout << "请输入name：" << endl;
		cin >> name;
		
			if (cin.eof()) {
			break;
		}

		// 写入文件
		os << name;
		os << "\n"; // 添加换行符
	}
	// 将流关闭
	os.close(); 
}
```





## 读取文件

```cpp


void readFile(){

	string name;// 用于接受读取内容的变量
	// 读流
	ifstream is;
	is.open("out.txt", ios::in);

	while (true)
	{
		is >> name;
		if ( is.eof())
		{
			cout << "读取结束" << endl;
			break;
		}
		cout << "读取到的内容是：" << name << endl;
	}
    // 将流关闭
	is.close();
}
```



## 文件操作符

```cpp
/*
	static constexpr int in         = 0x01;  读取模式
	static constexpr int out        = 0x02;	写模式
	static constexpr int ate        = 0x04;
	static constexpr int app        = 0x08;	追加摸是
	static constexpr int trunc      = 0x10;	截断文件
	static constexpr int _Nocreate  = 0x40;
	static constexpr int _Noreplace = 0x80;
	static constexpr int binary     = 0x20;	二进制文件
*/
```

具体的百度查。





# 二进制读写

上面都是文本输入输出，如何进行二进制的输入输出呢？





## 二进制文件输入













## 文件随机读写

> 和java的读取一样，指定偏移，从当前偏移读取的长度。

### seekg



![image-20240421120728393](https://raw.githubusercontent.com/heihei180/temp_file/file/picgo/image-20240421120728393.png)

### tellg



![image-20240421120916281](https://raw.githubusercontent.com/heihei180/temp_file/file/picgo/image-20240421120916281.png)





# 二进制读写和文本读写的区别？



