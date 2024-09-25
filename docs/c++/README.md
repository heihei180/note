# C++ 继承

 ![美女图片-1629700281.5043328](https://raw.githubusercontent.com/heihei180/temp_file/file/picgo/%E7%BE%8E%E5%A5%B3%E5%9B%BE%E7%89%87-1629700281.5043328.jpg)



## cpp的继承和派生



## 继承

### 定义父类

```cpp
#pragma once
#include <string>

using namespace std;

 class Person
{

public:
	Person();
	Person(string name, int age);
	~Person();

	string name;
	int age;
	string getName() const;
	int getAge() const;
};


```



**声明**

```cpp
#include "Person.h"

#include <iostream>
using namespace std;


Person::Person()
{
	cout << "创建了人类" << endl;
	this->age = 0;
	this->name = "";
}

Person::Person(string name, int age)
{
	cout << "有参数构造器创建了人类, name=" << name << endl;
	this->age = age;
	this->name = name;
}

Person::~Person()
{
	cout << "销毁了人类: name" << name << endl;
}

string Person::getName() const
{
	return name;
}

int Person::getAge() const
{
	return this->age;
}

```



### 子类 男人



```cpp
#pragma once
#include "Person.h"
class Man :
    public Person
{

public:
    Man();
    Man(string name, int age);
    ~Man();
    string gender;
    string getGender();
};

// 声明

#include "Man.h"
#include <iostream>
using namespace std;

Man::Man()
{
	cout << "man的无参构造器 " << endl;
}

Man::Man(string name, int age)
{
	cout << "man的有参构造器，name=" << name << endl;
	this->name = name;
	this->age = age;
	this->gender = "男";
}

Man::~Man()
{
	cout << "man 的析构函数被调用了, name= " << name << endl;
}

string Man::getGender()
{
	return gender;
}

```

### 子类女人

```cpp
#pragma once
#include "Person.h"
class Woman :
    public Person
{
public:
    Woman();
    Woman(string name, int age);
    ~Woman();
    string gender;
    string getGender();
};

// 声明
#include "Woman.h"
#include <iostream>
using namespace std;

Woman::Woman()
{
	cout << "Woman的无参构造器 " << endl;
}

Woman::Woman(string name, int age)
{
	cout << "Woman的有参构造器，name=" << name << endl;
	this->name = name;
	this->age = age;
	this->gender = "女";
}

Woman::~Woman()
{
	cout << "Woman 的析构函数被调用了, name= " << name << endl;
}

string Woman::getGender()
{
	return gender;
}
```





## 执行主函数

```cpp
int main(void) {

 

	//Person p1("张三", 25);
	//Person p2("李四", 28);

	//cout << "name1:" << p1.getName() << "===age:" << p1.getAge() << endl;
	//cout << "name2:" << p2.getName() << "===age:" << p2.getAge() << endl;

	cout << "============ create man ======================" << endl;
	Man m1("宋青书", 18);
	Man m2("张无忌", 16);

	cout << "男人1:" << m1.getName() << "===age:" << m1.getAge() << "==性别：" << m1.getGender() <<  endl;
	cout << "男人1:" << m2.getName() << "===age:" << m2.getAge() << "==性别：" << m2.getGender() <<  endl;
 
	cout << "============ create woman ======================" << endl;

	Woman w1("周芷若", 18);
	Woman w2("赵敏", 16);

	cout << "女人1:" << w1.getName() << "===age:" << w1.getAge() << "==性别：" << w1.getGender() << endl;
	cout << "女人2:" << w2.getName() << "===age:" << w2.getAge() << "==性别：" << w2.getGender() << endl;
	return 0;
}
```

### 打印

```cpp
============ create man ======================
创建了人类
man的有参构造器，name=宋青书
创建了人类
man的有参构造器，name=张无忌
男人1:宋青书===age:18==性别：男
男人1:张无忌===age:16==性别：男
============ create woman ======================
创建了人类
Woman的有参构造器，name=周芷若
创建了人类
Woman的有参构造器，name=赵敏
女人1:周芷若===age:18==性别：女
女人2:赵敏===age:16==性别：女
Woman 的析构函数被调用了, name= 赵敏
销毁了人类: name赵敏
Woman 的析构函数被调用了, name= 周芷若
销毁了人类: name周芷若
man 的析构函数被调用了, name= 张无忌
销毁了人类: name张无忌
man 的析构函数被调用了, name= 宋青书
销毁了人类: name宋青书

D:\code\cpp\ConsoleApplication1\Release\ConsoleApplication1.exe (进程 10988)已退出，代码为 0。
要在调试停止时自动关闭控制台，请启用“工具”->“选项”->“调试”->“调试停止时自动关闭控制台”。
按任意键关闭此窗口. . .
```



## 结论

可见，创建对象时，先执行父类的无参构造函数，在执行子类的构造函数，

销毁时，先执行子类的析构函数，在执行父类的析构函数。

> 也就是说，创建时，先创建父类，在创建子类。
>
> 销毁时，先销毁子类，再销毁父类。