---
title: C++基础
tags: C++
categories: 技术
mathjax: true
---



# C++概述

> “c++”中的++来自于c语言中的递增运算符++，该运算符将变量加1。c++起初也叫”c with class”.通过名称表明，c++是对C的扩展，因此c++是c语言的超集，这意味着任何有效的c程序都是有效的c++程序。c++程序可以使用已有的c程序库。

<!-- more -->

**库**是编程模块的集合，可以在程序中调用它们。库对很多常见的编程问题提供了可靠的解决方法，因此可以节省程序员大量的时间和工作量。
$$
c++=c+泛型编程+面向对象
$$
c++融合了3种不同的编程方式:

1. c语言代表的过程性语言.
2. c++在c语言基础上添加的类代表的面向对象语言.
3. c++模板支持的泛型编程。

## 可移植性和标准

程序是否可移植性有两个问题需要解决。第一是硬件，针对特定硬件编程的程序是不可移植的。第二，语言的实现

为了兼容需要制定标准

新特性标准排序：（时间排序）

1. c++98     已有的c++特性+异常+运行阶段类型识别(RTTI)+模板+标准模板库(STL)
2. c++11
3. c++14
4. c++17

 `对于传统的结构化语言，我们向来没有太多的疑惑，函数调用那么自然而明显，只是从程序的某一个地点调到另一个地点去执行。但是对于面向对象(OO)语言，我们疑惑就会很多。其原因就是c++编译器为我们程序员做了太多隐藏的工作：构造函数，析构函数、虚函数、继承、多态....有时候它为我们合成出一些额外的函数,有时候它又偷偷在我们写的函数里，放进更多的操作。有时候也会给我们的对象里放进一些奇妙的东西，使得我们sizeof的时候结果可我们预期不一样。`

## 简单的c++程序

```cpp
#include<iostream>
using namespace std;

int main(){	
	cout << "hello world" << endl;
    //endl--end line表示刷新缓冲区并且换行
	return EXIT_SUCCESS;
}
```

## **注意：**

### c++头文件为什么没有.h？

在c语言中头文件使用扩展名.h,将其作为一种通过名称标识文件类型的简单方式。但是c++得用法改变了，c++头文件没有扩展名。但是有些c语言的头文件被转换为c++的头文件，这些文件被重新命名，丢掉了扩展名.h(使之成为c++风格头文件)，并在文件名称前面加上前缀c(表明来自c语言)。例如c++版本的math.h为cmath.

`由于C使用不同的扩展名来表示不同文件类型，因此用一些特殊的扩展名(如hpp或hxx)表示c++的头文件也是可以的，ANSI/IOS标准委员会也认为是可以的，但是关键问题是用哪个比较好，最后一致同意不适用任何扩展名。`

| 头文件类型  | 约定               | 示例       | 说明                                        |
| ----------- | ------------------ | ---------- | ------------------------------------------- |
| c++旧式风格 | 以.h结尾           | iostream.h | c++程序可用                                 |
| c旧式风格   | 以.h结尾           | math.h     | c/c++程序可用                               |
| c++新式风格 | 无扩展名           | iostream   | c++程序可用，使用namespace std              |
| 转换后的c   | 加上前缀c,无扩展名 | cmath      | c++程序可用，可使用非c特性，如namespace std |

### using namespace std 是什么?

namespace是指标识符的各种可见范围。命名空间用关键字namespace 来定义。命名空间是C++的一种机制，用来把单个标识符下的大量有逻辑联系的程序实体组合到一起。此标识符作为此组群的名字。

## 面向过程思想

> 面向过程是一种以过程为中心的编程思想。
>
> 通过分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以了。

**面向过程编程思想的核心**：功能分解，自顶向下，逐层细化（程序=数据结构+算法）。

**面向过程编程语言存在的主要缺点**是不符合人的思维习惯，而是要用计算机的思维方式去处理问题，而且面向过程编程语言重用性低，维护困难。

## 面向对象思想

> ***面向对象编程***（Object-Oriented Programming）简称 OOP 技术，是开发计算机应用程序的一种新方法、新思想。过去的面向过程编程常常会导致所有的代码都包含在几个模块中，使程序难以阅读和维护。在做一些修改时常常牵一动百，使以后的开发和维护难以为继。而使用 OOP 技术，常常要使用许多代码模块，每个模块都只提供特定的功能，它们是彼此独立的，这样就增大了代码重用的几率，更加有利于软件的开发、维护和升级。

在面向对象中，**算法与数据结构被看做是一个整体，称作对象**，现实世界中任何类的对象都具有一定的属性和操作，也总能用数据结构与算法两者合一地来描述，所以可以用下面的等式来定义对象和程序：
$$
对象 = 算法 + 数据结构
$$

$$
程序 = 对象 + 对象 + ……
$$

**面向对象编程思想的核心：应对变化，提高复用。**

### 面向对象三大特性

#### [**封装特性**](#类的封装)

> 把客观事物封装成抽象的类，**并且类可以把自己的数据和方法只让可信的类或者对象操作，对不可信的进行信息隐藏。**

类将成员变量和成员函数封装在类的内部，根据需要设置访问权限，通过成员函数管理内部状态。

#### [**继承特性**](#继承)

> 继承所表达的是类之间相关的关系，这种关系使得**对象可以继承另外一类对象的特征和能力**。

继承的作用：避免公用代码的重复开发，减少代码和数据冗余。

#### [**多态特性**](#多态)

> 多态性可以简单地概括为“一个接口，多种方法”，字面意思为多种形态。**程序在运行时才决定调用的函数**，它是面向对象编程领域的**核心概念**。

# C++对C的扩展

## ::作用域运算符

```cpp
//全局变量
int a = 10;
void test(){
	//局部变量
	int a = 20;
	//全局a被隐藏
	cout << "a:" << a << endl;
}
```

通常情况下，如果有两个同名变量，一个是全局变量，另一个是局部变量，那么局部变量在其作用域内具有较高的优先权，它将屏蔽全局变量。

```cpp
//全局变量
int a = 10;
//1. 局部变量和全局变量同名
void test(){
	int a = 20;
	//打印局部变量a
	cout << "局部变量a:" << a << endl;
	//打印全局变量a
	cout << "全局变量a:" << ::a << endl;
}
```

这个例子可以看出，**作用域运算符**可以用来解决局部变量与全局变量的重名问题，即在局部变量的作用域内，可用::对被屏蔽的同名的全局变量进行访问。

## 名字控制

> 创建名字是程序设计过程中一项最基本的活动，当一个项目很大时，它会不可避免地包含大量名字。c++允许我们对名字的产生和名字的可见性进行控制。
>
> 我们之前在学习c语言可以通过static关键字来使得名字只得在本编译单元内可见，在c++中我们将通过一种通过命名空间来控制对名字的访问。

### C++命名空间(namespace)

作用:解决命名冲突

> 在c++中，名称（name）可以是符号常量、变量、函数、结构、枚举、类和对象等等。工程越大，名称互相冲突性的可能性越大。另外使用多个厂商的类库时，也可能导致名称冲突。为了避免，在大规模程序的设计中，以及在程序员使用各种各样的C++库时，这些标识符的命名发生冲突，标准C++引入关键字namespace（命名空间/名字空间/名称空间），可以更好地控制标识符的作用域。

### 命名空间使用语法

1. 命名空间用途：解决名称冲突
2. 命名空间下可以存放：变量，函数，结构体，类...
3. 命名空间必须要声明在全局作用域
4. 命名空间可以嵌套命名空间
5. 命名空间是开放的，可以随时将新成员添加到命名空间下
6. 命名空间是可以匿名的

#### 创建一个命名空间:

```cpp
namespace A{
	int a = 10;
}
namespace B{
	int a = 20;
}
```

命名空间只能全局范围内定义（***以下错误写法***）

```cpp
void test(){
	namespace A{
		int a = 10;
	}
	namespace B{
		int a = 20;
	}
}
```

命名空间可嵌套命名空间

```cpp
namespace A{
	int a = 10;
	namespace B{
		int a = 20;
	}
}
```

命名空间是开放的，即可以随时把新的成员加入已有的命名空间中

```cpp
namespace A{
	int a = 10;
}

namespace A{
	void func(){
		cout << "hello namespace!" << endl;
	}
}
```

声明和实现可分离

```cpp
#pragma once

namespace MySpace{
	void func1();
	void func2(int param);
}
```

```cpp
void MySpace::func1(){
	cout << "MySpace::func1" << endl;
}
void MySpace::func2(int param){
	cout << "MySpace::func2 : " << param << endl;
}
```

无名命名空间，意味着命名空间中的标识符只能在本文件内访问，相当于给这个标识符加上了static，使得其可以作为内部连接

```cpp
namespace{
	
	int a = 10;
	void func(){ cout << "hello namespace" << endl; }
}
void test(){
	cout << "a : " << a << endl;
    cout << "a : " << ::a << endl;//这两个都可以访问
	func();
}
```

命名空间别名

```cpp
namespace veryLongName{
	
	int a = 10;
	void func(){ cout << "hello namespace" << endl; }
}

void test(){
	namespace shortName = veryLongName;
	cout << "veryLongName::a : " << shortName::a << endl;
	veryLongName::func();
	shortName::func();
}
```

### using声明

using声明可使得指定的标识符可用。

```cpp
namespace A{
	int paramA = 20;
	int paramB = 30;
	void funcA(){ cout << "hello funcA" << endl; }
	void funcB(){ cout << "hello funcA" << endl; }
}

void test(){
	//1. 通过命名空间域运算符
	cout << A::paramA << endl;
	A::funcA();
	//2. using声明
	using A::paramA;
	using A::funcA;
	cout << paramA << endl;
	//cout << paramB << endl; //不可直接访问
	funcA();
	//3. 同名冲突
	//int paramA = 20; //相同作用域注意同名冲突
}
```

using声明碰到函数重载

```cpp
namespace A{
	void func(){}
	void func(int x){}
	int  func(int x,int y){}
}
void test(){
	using A::func;
	func();
	func(10);
	func(10, 20);
}
```

如果命名空间包含一组用相同名字重载的函数，using声明就声明了**这个重载函数的所有集合**。

### using编译指令

using编译指令使整个命名空间标识符可用.

```cpp
namespace A{
	int paramA = 20;
	int paramB = 30;
	void funcA(){ cout << "hello funcA" << endl; }
	void funcB(){ cout << "hello funcB" << endl; }
}

void test01(){
	using namespace A;
	cout << paramA << endl;
	cout << paramB << endl;
	funcA();
	funcB();

	//不会产生二义性
	int paramA = 30;
	cout << paramA << endl;
}

namespace B{
	int paramA = 20;
	int paramB = 30;
	void funcA(){ cout << "hello funcA" << endl; }
	void funcB(){ cout << "hello funcB" << endl; }
}

void test02(){
	using namespace A;
	using namespace B;
	//二义性产生，不知道调用A还是B的paramA
	//cout << paramA << endl;
}
```

**理解注意点**：

1. using声明和普通声明在一个作用域同时存在，会报错。但using编译指令和普通声明在一个作用域同时存在时，优先普通声明，若不存在普通声明，此时才使用使用的命名空间中的声明。
2. 没有普通声明下，两个using编译指令会报错

***注意：使用using声明或using编译指令会增加命名冲突的可能性。也就是说，如果有名称空间，并在代码中使用作用域解析运算符，则不会出现二义性。***

我们刚讲的一些东西一开始会觉得难一些，这些东西以后还是挺常用，只要理解了它们的工作机理，使用它们非常简单。

需要记住的关键问题是当引入一个全局的using编译指令时，就为该文件打开了该命名空间，它不会影响任何其他的文件，所以可以在每一个实现文件中调整对命名空间的控制。比如，如果发现某一个实现文件中有太多的using指令而产生的命名冲突，就要对该文件做个简单的改变，通过明确的限定或者using声明来消除名字冲突，这样不需要修改其他的实现文件。

## C++对C语言的增强以及扩展

### 全局变量检测增强

```cpp
int a = 10; //赋值，当做定义
int a; //没有赋值，当做声明

int main(){
	printf("a:%d\n",a);
	return EXIT_SUCCESS;
}
```

此代码在c++下编译失败,在c下编译通过.

### 函数检测增强

```cpp
//i没有写类型，可以是任意类型
int fun1(i){
	printf("%d\n", i);
	return 0;
}
//i没有写类型，可以是任意类型
int fun2(i){
	printf("%s\n", i);
	return 0;
}
//没有写参数，代表可以传任何类型的实参
int fun3(){ 
	printf("fun33333333333333333\n");
	return 0;
}

//C语言，如果函数没有参数，建议写void，代表没有参数
int fun4(void){
	printf("fun4444444444444\n");
	return 0;
}

g(){
}

int main(){

	fun1(10);
	fun2("abc");
	fun3(1, 2, "abc");
	printf("g = %d\n", g());

	return 0;
}
```

以上c代码c编译器编译可通过，c++编译器无法编译通过。

- 在C语言中，int fun() 表示返回值为int，接受任意参数的函数，int fun(void) 表示返回值为int的无参函数。(汇编本质并没有区别，编译器也不会报错，都是接受任意参数)
- 在C++ 中，int fun() 和int fun(void) 具有相同的意义，都表示返回值为int的无参函数。

### 类型转换检测增强

在C++，不同类型的变量一般是不能直接赋值的，需要相应的强转。

```cpp
typedef enum COLOR{ GREEN, RED, YELLOW } color;
int main(){

	color mycolor = GREEN;
	mycolor = 10;
	printf("mycolor:%d\n", mycolor);
	char* p = malloc(10);
	return EXIT_SUCCESS;
}
```

以上c代码c编译器编译可通过，c++编译器无法编译通过。

### struct增强

- c中定义结构体变量需要加上struct关键字，c++不需要。
- c中的结构体只能定义成员变量，不能定义成员函数。c++即可以定义成员变量，也可以定义成员函数。

```cpp
//1. 结构体中即可以定义成员变量，也可以定义成员函数
struct Student{
	string mName;
	int mAge;
	void setName(string name){ mName = name; }
	void setAge(int age){ mAge = age; }
	void showStudent(){
		cout << "Name:" << mName << " Age:" << mAge << endl;
	}
};

//2. c++中定义结构体变量不需要加struct关键字
void test01(){
	Student student;
	student.setName("John");
	student.setAge(20);
	student.showStudent();
}
```



### bool数据类型扩展

标准c++的bool类型有两种内建的常量true(转换为整数1)和false(转换为整数0)表示状态。这三个名字都是关键字。

- bool类型只有两个值，true(1值)，false(0值)
- bool类型占1个字节大小
- 给bool类型赋值时，非0值会自动转换为true(1),0值会自动转换false(0)

```cpp
	void test()
{	cout << sizeof(false) << endl; //为1，//bool类型占一个字节大小
	bool flag = true; // c语言中没有这种类型
	flag = 100; //给bool类型赋值时，非0值会自动转换为true(1),0值会自动转换false(0)
}
```



### 三目运算符增强

- c语言三目运算表达式返回值为数据值，为右值，不能赋值。

```cpp
	int a = 10;
	int b = 20;
	printf("ret:%d\n", a > b ? a : b);
	//思考一个问题，(a > b ? a : b) 三目运算表达式返回的是什么？
	
	//(a > b ? a : b) = 100;
	//返回的是右值
```

- c++语言三目运算表达式返回值为变量本身(引用)，为左值，可以赋值。

```cpp
	int a = 10;
	int b = 20;
	printf("ret:%d\n", a > b ? a : b);
	//思考一个问题，(a > b ? a : b) 三目运算表达式返回的是什么？

	cout << "b:" << b << endl;
	cout << (a > b ? a : b) << endl;//返回的是20
	//返回的是左值，变量的引用
	(a > b ? a : b) = 100;//返回的是左值，变量的引用
	cout << "b:" << b << endl;
```

 **C语言中*(a > b ? &a :& b)等价于 C++中(a > b ? a : b)**

####  ***[左值和右值概念]***

  在c++中可以放在赋值操作符左边的是左值，可以放到赋值操作符右面的是右值。

  有些变量即可以当左值，也可以当右值。

  左值为Lvalue，L代表Location，表示内存可以寻址，可以赋值。

  右值为Rvalue，R代表Read,就是可以知道它的值。

  比如:int temp = 10; temp在内存中有地址，10没有，但是可以Read到它的值。

**理解：**

**左值**引用。编译器对他做的操作是“自动提领”，就是自动加个*操作。所以左值引用更像一个常量指针，int *const，它和常量指针唯一的区别就在于他不用每次都让我们自己写*了，除此以外真的没什么区别。

```asm
  int a=1;
010913BE  mov     dword ptr [a],1  
   int b=1;
010913C5  mov     dword ptr [b],1  
   int c=a+b;
010913CC  mov     eax,dword ptr [a]  
010913CF  add     eax,dword ptr [b]  
010913D2  mov     dword ptr [c],eax  
```

在这里a+b就是一个**右值**，它是活在寄存器里的一个值，他在内存里根本没有存在的位置，你无法对它取地址，这就是个右值。

### C/C++中const的区别

#### C中的const

常量的引进是在c++早期版本中，当时标准C规范正在制定。那时，尽管C委员会决定在C中引入const,但是，他们c中的const理解为”一个不能改变的普通变量”，也就是认为const应该是一个只读变量，既然是变量那么就会给const分配内存，**const修饰全局变量时默认是外部链接属性**。

```c
const int arrSize = 10;
int arr[arrSize];
```

看似是一件合理的编码，但是这将得出一个错误。 因为arrSize占用某块内存，所以C编译器不知道它在编译时的值是多少？

#### C++中的const

***在c++中，一个const不一定创建内存空间，而在c中，一个const总是需要一块内存空间。***

在c++中，是否为const常量分配内存空间**依赖于如何使用**。一般说来，如果一个const仅仅用来把一个名字用一个值代替(就像使用#define一样)，那么该存储局空间就不必创建。

**如果存储空间没有分配内存的话，在进行完数据类型检查后，为了代码更加有效，值也许会折叠到代码中。**

不过，取一个const地址, 或者把它定义为extern,则会为该const创建内存空间。

 在c++中，出现在所有函数之外的const作用于整个文件(也就是说它在该文件外不可见)，默认为内部连接，c++中其他的标识符一般默认为外部连接。

#### C/C++中const异同总结

##### 链接属性区别

1. C语言默认外部链接（编译前自动加extern）
2. C++默认内部链接（想要外部链接需要手动加extern）

`当c语言两个文件中都有const int a的时候，编译器会报重定义的错误。而在c++中，则不会，因为c++中的const默认是内部连接的。如果想让c++中的const具有外部连接，必须显示声明为: extern const int a = 10;`

##### 修改区别

1. C语言中const全局部变量直接修改编译失败，间接修改编译通过，但由于存储在只读数据段，运行失败
2. C语言中const局部变量直接修改编译失败。但可以通过指针间接修改。
3. C++中const全局变量与c一样
4. C++中const局部变量直接修改编译失败，若分配了变量内存的话，可以通过指针间接修改，若未分配内存，则指针修改仅仅修改了一个临时内存空间中的值， 对原值不影响。

##### C++中const分配内存的情况

1. 对于基础数据类型，也就是const int b = 10这种，编译器会把它放到符号表中，不分配内存，当对其取地址时，会分配临时内存。（无法间接修改原值）

   ```cpp
   const int b=10;
   int *p=(int*)&b;
   *p=20;
   cout<<"b="<<b<<endl;//显示为10，修改后无变化
   ```

2. 使用普通变量初始化const变量（可以间接修改原值）

   ```cpp
   int a=10;
   const int b=a;
   int *p=(int*)&b;
   *p=20;
   cout<<"b="<<b<<endl;//修改成功
   ```

3. 自定义数据类型（可以间接修改原值）

   ```cpp
   const Person p;
   Person* pp=(Person*)&p;
   pp->name="test";//修改成功
   ```

**当上面未分配const变量内存的情况下，此时该const变量可以作为数组定义括号中的数值**

```cpp
const int a=10;
int c[a];//编译通过

int a=10;
const int b=a;
int c[b];//编译不通过，错误显示：表达式必须含有常量值
```

**在支持c99标准的编译器中，可以使用变量定义数组。**(2019VS都不支持完整的C99)

## 尽量以const替换#define

在旧版本C中，如果想建立一个常量，必须使用预处理器

```c
#define MAX 1024;
```

我们定义的宏MAX从未被编译器看到过，因为在预处理阶段，所有的MAX已经被替换为了1024，于是MAX并没有将其加入到符号表中。但我们使用这个常量获得一个编译错误信息时，可能会带来一些困惑，因为这个信息可能会提到1024，但是并没有提到MAX.如果MAX被定义在一个不是你写的头文件中，你可能并不知道1024代表什么，也许解决这个问题要花费很长时间。

解决办法就是用一个常量替换上面的宏。

const int max= 1024;

const和#define区别总结:

1. const有类型，可进行编译器类型安全检查。#define无类型，不可进行类型检查.
2. const有作用域，而#define不重视作用域(虽然#undef A  可卸载宏常量A)，默认定义处到文件结尾.如果定义在指定作用域下有效的常量，那么#define就不能用。

宏常量不可以有命名空间

```cpp
namespace MySpace {
#define num 1024
}
void test() {
	//cout << MySpace::NUM << endl; //错误
	//int num = 100; //命名冲突
	cout << num << endl;
}
```

## ***引用(reference)***

### 引用基本用法

***引用是c++对c的重要扩充。***在c/c++中指针的作用基本都是一样的，但是c++增加了另外一种给函数传递地址的途径，这就是按引用传递(pass-by-reference)，它也存在于其他一些编程语言中，并不是c++的发明。

1. 变量名实质上是一段连续内存空间的别名，是一个标号(门牌号)
2. 程序中通过变量来申请并命名内存空间
3. 通过变量的名字可以使用存储空间

**对一段连续的内存空间只能取一个别名吗？**

c++中新增了引用的概念，引用可以作为一个已定义变量的别名。

**基本语法:** 
$$
Type\&\  ref = val;
$$
注意事项：

1. &在此不是求地址运算，而是起标识作用。
2. 类型标识符是指目标变量的类型
3. 必须在声明引用变量时进行初始化。
4. 引用初始化之后不能改变。
5. 不能有NULL引用。必须确保引用是和一块合法的存储单元关联。
6. **可以建立对数组的引用**。

```cpp
	//1. 建立数组引用方法一
	typedef int ArrRef[10];
	int arr[10];
	ArrRef& aRef = arr;
	for (int i = 0; i < 10;i ++){
		aRef[i] = i+1;
	}
	for (int i = 0; i < 10;i++){
		cout << arr[i] << " ";
	}
	cout << endl;
	//2. 建立数组引用方法二
	int(&f)[10] = arr;
	for (int i = 0; i < 10; i++){
		f[i] = i+10;
	}
	for (int i = 0; i < 10; i++){
		cout << arr[i] << " ";
	}
	cout << endl;
```

### 函数中的引用

最常见看见引用的地方是在函数参数和返回值中。当引用被用作函数参数的时，在函数内对任何引用的修改，将对还函数外的参数产生改变。当然，可以通过传递一个指针来做相同的事情，但引用具有更清晰的语法。

如果从函数中返回一个引用，必须像从函数中返回一个指针一样对待。当函数返回值时，引用关联的内存一定要存在。

#### 引用做参数

```cpp
//值传递
void ValueSwap(int m,int n){
	int temp = m;
	m = n;
	n = temp;
}
//地址传递
void PointerSwap(int* m,int* n){
	int temp = *m;
	*m = *n;
	*n = temp;
}
//引用传递
void ReferenceSwap(int& m,int& n){
	int temp = m;
	m = n;
	n = temp;
}
void test(){
	int a = 10;
	int b = 20;
	//值传递
	ValueSwap(a, b);
	cout << "a:" << a << " b:" << b << endl;
	//地址传递
	PointerSwap(&a, &b);
	cout << "a:" << a << " b:" << b << endl;
	//引用传递
	ReferenceSwap(a, b);
	cout << "a:" << a << " b:" << b << endl;
}
```

通过引用参数产生的效果同按地址传递是一样的。引用的语法更清楚简单：	

1. 函数调用时传递的实参不必加“&”符 
2. 在被调函数中不必在参数前加“*”符

引用作为其它变量的别名而存在，因此在一些场合可以代替指针。C++主张用引用传递取代地址传递的方式，因为引用语法容易且不易出错。

#### 引用做返回值

1. 不能返回局部变量的引用。
2. 函数当左值，必须返回引用。

```cpp
//返回局部变量引用
int& TestFun01(){
	int a = 10; //局部变量
	return a;
}
//返回静态变量引用
int& TestFunc02(){	
	static int a = 20;
	cout << "static int a : " << a << endl;
	return a;
}
int main(){
	//不能返回局部变量的引用
	int& ret01 = TestFun01();
	//如果函数做左值，那么必须返回引用
	TestFunc02();
	TestFunc02() = 100;
	TestFunc02();

	return EXIT_SUCCESS;
}
```

### 引用的本质

***引用的本质在c++内部实现是一个指针常量.***

```cpp
Type& ref = val; // Type* const ref = &val;
```

c++编译器在编译过程中使用常指针作为引用的内部实现，因此引用所占用的空间大小与指针相同，只是这个过程是编译器内部实现，用户不可见。

原理：

```cpp
//发现是引用，转换为 int* const ref = &a;
void testFunc(int& ref){
	ref = 100; // ref是引用，转换为*ref = 100
}
int main(){
	int a = 10;
	int& aRef = a; //自动转换为 int* const aRef = &a;这也能说明引用为什么必须初始化
	aRef = 20; //内部发现aRef是引用，自动帮我们转换为: *aRef = 20;
	cout << "a:" << a << endl;
	cout << "aRef:" << aRef << endl;
	testFunc(a);
	return EXIT_SUCCESS;
}
```

### 指针引用

在c语言中如果想改变一个指针的指向而不是它所指向的内容，函数声明可能这样:

```
void fun(int**);
```

给指针变量取一个别名。

```cpp
Type* pointer = NULL;  
Type*& = pointer;
```

对于c++中的引用，语法清晰多了。函数参数变成指针的引用，用不着取得指针的地址。

### 常量引用

常量引用的定义格式:

```cpp
const Type& ref = val;
```

常量引用注意：

1. 字面量不能赋给引用，但是可以赋给const引用（编译器自动给创建临时空间）
2. const修饰的引用，不能修改。

```cpp
void test01(){
	int a = 100;
	const int& aRef = a; //此时aRef就是a
	//aRef = 200; 不能修改aRef的值
	a = 200; //OK
	cout << "a:" << a << endl;
	cout << "aRef:" << aRef << endl;
}
void test02(){
	//不能把一个字面量赋给引用
	//int& ref = 100;
	//但是可以把一个字面量赋给常引用（编译器自动给创建临时空间）
	const int& ref = 100; //int temp = 200; const int& ret = temp;
    //常引用可以通过指针间接修改
    int* p=(int*)&ref;
    *p=200;//OK
    //把上面引用的修改流程改成指针参考如下：
    int temp=100;
    const int* const pp=&temp;
    int* ppp=pp;
    *ppp=200;
    
}
```

***[const引用使用场景]***

 常量引用主要用在函数的形参，尤其是类的拷贝/复制构造函数。

将函数的形参定义为常量引用的好处:

- 引用不产生新的变量，减少形参与实参传递时的开销。
- 由于引用可能导致实参随形参改变而改变，将其定义为常量引用可以消除这种副作用。

```cpp
//const int& param防止函数中意外修改数据
void ShowVal(const int& param){
	cout << "param:" << param << endl;
}
```

  **如果希望实参随着形参的改变而改变，那么使用一般的引用，如果不希望实参随着形参改变，那么使用常引用。**

## 内联函数(inline function)

### 内联函数的引出

c++从c中继承的一个重要特征就是效率。假如c++的效率明显低于c的效率，那么就会有很大的一批程序员不去使用c++了。

在c中我们经常把一些短并且执行频繁的计算写成宏，而不是函数，这样做的理由是为了执行效率，宏可以避免函数调用的开销，这些都由预处理来完成。

但是在c++出现之后，使用预处理宏会出现两个问题：

- 第一个在c中也会出现，宏看起来像一个函数调用，但是会有隐藏一些难以发现的错误。
- 第二个问题是c++特有的，预处理器不允许访问类的成员，也就是说预处理器宏不能用作类类的成员函数。

```cpp
#define COMPARE(x,y) ((x) < (y) ? (x) : (y))
int Compare(int x,int y){
	return x < y ? x : y;
}
void test02(){
	int a = 1;
	int b = 3;
	//cout << "COMPARE(++a, b):" << COMPARE(++a, b) << endl; // 3 因为展开成了((++a) < (b) ? (++a) : (b)),a自加了两次
	cout << "Compare(int x,int y):" << Compare(++a, b) << endl; //2
}
```

为了保持预处理宏的效率又增加安全性，而且还能像一般成员函数那样可以在类里访问自如，c++引入了内联函数(inline function).

内联函数为了继承宏函数的效率，没有函数调用时开销，然后又可以像普通函数那样，可以进行参数，返回值类型的安全检查，又可以作为成员函数。

**注意**: 编译器将会检查函数参数列表使用是否正确，并返回值(进行必要的转换)。这些事预处理器无法完成的。

### 内联函数基本概念

在c++中，预定义宏的概念是用内联函数来实现的，而***内联函数本身也是一个真正的函数***。内联函数具有普通函数的所有行为。唯一不同之处在于内联函数会在适当的地方像预定义宏一样展开，所以不需要函数调用的开销。因此应该不使用宏，使用内联函数。

在普通函数(非成员函数)函数前面加上inline关键字使之成为内联函数。但是必须注意**必须函数体和声明结合在一起，否则编译器将它作为普通函数来对待。**（**即在函数声明和实现同时加入关键字inline才被称为内联**）

```cpp
//下面不是内联
inline void func(int a);
void func(int a){};
//下面是内联
inline int func(int a){return ++;}
//下面是内联
inline void func(int a);
inline void func(int a){};
```

内联函数的确占用空间，但是内联函数相对于普通函数的优势只是省去了函数调用时候的压栈，跳转，返回的开销。我们可以理解为内联函数是以***空间换时间***。

**任何在类内部定义的函数自动成为内联函数。**

### 内联函数和编译器

> 内联函数并不是何时何地都有效，为了理解内联函数何时有效，应该要知道编译器碰到内联函数会怎么处理？
>
> 对于任何类型的函数，编译器会将函数类型(包括函数名字，参数类型，返回值类型)放入到符号表中。同样，当编译器看到内联函数，并且对内联函数体进行分析没有发现错误时，也会将内联函数放入符号表。
>
> 当调用一个内联函数的时候，编译器首先确保传入参数类型是正确匹配的，或者如果类型不正完全匹配，但是可以将其转换为正确类型，并且返回值在目标表达式里匹配正确类型，或者可以转换为目标类型，内联函数就会直接替换函数调用，这就消除了函数调用的开销。假如内联函数是成员函数，对象this指针也会被放入合适位置。
>
> 类型检查和类型转换、包括在合适位置放入对象this指针这些都是预处理器不能完成的。

但是c++内联编译会有一些限制，以下情况编译器可能考虑不会将函数进行内联编译：

- 不能存在任何形式的循环语句
- 不能存在过多的条件判断语句
- 函数体不能过于庞大
- 不能对函数进行取址操作

***内联仅仅只是给编译器一个建议，编译器不一定会接受这种建议，如果你没有将函数声明为内联函数，那么编译器也可能将此函数做内联编译。一个好的编译器将会内联小的、简单的函数。***

## 函数的默认参数

c++在声明函数原型的时可为一个或者多个参数指定默认(缺省)的参数值，当函数调用的时候如果没有指定这个值，编译器会自动用默认值代替。

```cpp
void TestFunc01(int a = 10, int b = 20){
	cout << "a + b  = " << a + b << endl;
}
//注意点:
//1. 形参b设置默认参数值，那么后面位置的形参c也需要设置默认参数
void TestFunc02(int a,int b = 10,int c = 10){}
//2. 如果函数声明和函数定义分开，函数声明设置了默认参数，函数定义不能再设置默认参数
//如下情况编译报错
//void TestFunc04(int a,int b = 10,int c = 10);//声明
//void TestFunc04(int a,int b = 10,int c = 10){};//定义
void TestFunc03(int a = 0,int b = 0);
void TestFunc03(int a, int b){}

int main(){
	//1.如果没有传参数，那么使用默认参数
	TestFunc01();
	//2. 如果传一个参数，那么第二个参数使用默认参数
	TestFunc01(100);
	//3. 如果传入两个参数，那么两个参数都使用我们传入的参数
	TestFunc01(100, 200);

	return EXIT_SUCCESS;
}
```

***注意点：***

- 函数的默认参数从左向右，如果一个参数设置了默认参数，那么这个参数之后的参数都必须设置默认参数。
- 如果函数声明和函数定义分开写，函数声明和函数定义不能同时设置默认参数（和上面内联知识点正好相反，内联要求声明和定义都要加inline）。

## 函数的占位参数

```cpp
void TestFunc01(int a,int b,int){
	//函数内部无法使用占位参数
	cout << "a + b = " << a + b << endl;
}
//占位参数也可以设置默认值
void TestFunc02(int a, int b, int = 20){
	//函数内部依旧无法使用占位参数
	cout << "a + b = " << a + b << endl;
}
int main(){

	//错误调用，占位参数也是参数，必须传参数
	//TestFunc01(10,20); 
	//正确调用
	TestFunc01(10,20,30);
	//正确调用
	TestFunc02(10,20);
	//正确调用
	TestFunc02(10, 20, 30);

	return EXIT_SUCCESS;
}
```

c++在声明函数时，可以设置占位参数。占位参数只有参数类型声明，而没有参数名声明。一般情况下，在函数体内部无法使用占位参数。

**占位符功能作用:**暂时基本没用，什么时候用，在后面我们要讲的操作符重载的后置++要用到这个.

## ***函数重载(overload)***

*****

$$
能使名字方便使用，是任何程序设计语言的一个重要特征！
$$

*****

同一个函数名在不同场景下可以具有不同的含义。

> 在传统c语言中，函数名必须是唯一的，程序中不允许出现同名的函数。在c++中是允许出现同名的函数，这种现象称为函数重载。
>
> 函数重载的目的就是为了方便的使用函数名。
>
> 函数重载并不复杂，等大家学完就会明白什么时候需要用到他们，以及是如何编译，链接的。

### 函数重载基本语法

***实现函数重载的条件：***

- 同一个作用域
- 参数个数不同
- 参数类型不同
- 参数顺序不同

```cpp
//1. 函数重载条件
namespace A{
	void MyFunc(){ cout << "无参数!" << endl; }
	void MyFunc(int a){ cout << "a: " << a << endl; }
	void MyFunc(string b){ cout << "b: " << b << endl; }
	void MyFunc(int a, string b){ cout << "a: " << a << " b:" << b << endl;}
    void MyFunc(string b, int a){cout << "a: " << a << " b:" << b << endl;}
}
//2.返回值不作为函数重载依据
namespace B{
	void MyFunc(string b, int a){}
	//int MyFunc(string b, int a){} //无法重载仅按返回值区分的函数
}
```

```cpp
void myFunc(int a)
{
	cout<<"myFunc(int a)"<<endl;
}
void myFunc(int& a)
{
	cout<<"myFunc(int a)"<<endl;
}
void myFunc(const int& a)
{
	cout<<"myFunc(int a)"<<endl;
}
void main()
{
    int a=0;
    //myFunc(a);//虽然上面三个函数可以作为重载同时存在，但这里调用会产生二义性，因此会报错。
}
```

***注意:*** 函数重载和默认参数一起使用，需要额外注意二义性问题的产生。

```cpp
void MyFunc(string b){
	cout << "b: " << b << endl;
}
//函数重载碰上默认参数
void MyFunc(string b, int a = 10){
	cout << "a: " << a << " b:" << b << endl;
}

int main(){
	MyFunc("hello"); //这时，两个函数都能匹配调用，产生二义性，这是尤其要注意的！！！
	return 0;
}
```

> **为什么函数返回值不作为重载条件呢？**
>
> 当编译器能从上下文中确定唯一的函数的时，如int ret = func(),这个当然是没有问题的。然而，我们在编写程序过程中可以忽略他的返回值。那么这个时候,一个函数为
>
> void func(int x);另一个为int func(int x); 当我们直接调用func(10),这个时候编译器就不确定调用那个函数。所以在c++中禁止使用返回值作为重载的条件。

### 函数重载实现原理

> 编译器为了实现函数重载，也是默认为我们做了一些幕后的工作，编译器用不同的参数类型来修饰不同的函数名，比如void func(); 编译器可能会将函数名修饰成_func，当编译器碰到void func(int x),编译器可能将函数名修饰为_func_int,当编译器碰到void func(int x,char c),编译器可能会将函数名修饰为_func_int_char我这里使用”可能”这个字眼是因为编译器如何修饰重载的函数名称并没有一个统一的标准，所以不同的编译器可能会产生不同的内部名。
>

 以下三个函数在linux下生成的编译之后的函数名为:

```cpp
void func(){}
void func(int x){}
void func(int x,char y){}
_Z4funcv //v 代表void,无参数
_Z4funci //i 代表参数为int类型
_Z4funcic //i 代表第一个参数为int类型，第二个参数为char类型
```

### ***extern “C”浅析***

在linux下测试

```cpp
c函数: void MyFunc(){} ,被编译成函数: MyFunc
c++函数: void MyFunc(){},被编译成函数: _Z6Myfuncv
```

通过这个测试，由于c++中需要支持函数重载，所以c和c++中对同一个函数经过编译后生成的函数名是不相同的，这就导致了一个问题，如果在c++中调用一个使用c语言编写模块中的某个函数，那么c++是根据c++的名称修饰方式来查找并链接这个函数，那么就会发生链接错误，以上例，c++中调用MyFunc函数，在链接阶段会去找Z6Myfuncv，结果是没有找到的，因为这个MyFunc函数是c语言编写的，生成的符号是MyFunc。

那么如果我想在c++调用c的函数怎么办？

extern "C"的主要作用就是为了实现c++代码能够调用其他c语言代码。加上extern "C"后，这部分代码编译器按c语言的方式进行***编译***和***链接***，而不是按c++的方式。

例如如下情况，C++需要调用c语言函数：

```c
//test.h--头文件
void show();//解决方案2：将这句替换为extern "C" void show();

//test.c--c语言源文件
#include "test.h"
#include <stdio.h>
void show()
{
    printf("你好\r\n");
}
//main.cpp--c++源文件
#include <iostream>
using namespace std;
#include "test.h"//解决方案1：将这句替换为extern "C" void show();
void main()
{
    show();//F5报错显示:未解析的外部命令。
}
```

#### 终极解决方案：

**作用**：能区分C和C++的调用针对性加或不加extern "C"，并且省去每个函数都要加extern "C"的麻烦

***MyModule.h***

```cpp
#ifndef MYMODULE_H
#define MYMODULE_H

#include<stdio.h>

#if __cplusplus//这句的意思是"如果是C++引入的话"（这句的目的是为了让该c文件头文件中的函数在C++也能跑起来）
extern "C"{
#endif

	void func1();
	int func2(int a,int b);

#if __cplusplus
}
#endif

#endif
```

***MyModule.c***

```cpp
#include"MyModule.h"

void func1(){
	printf("hello world!");
}
int func2(int a, int b){
	return a + b;
}
```

## 类和对象

***C和C++中struct区别***

- c语言struct只有变量，而c++语言struct 既有变量，也有函数
- c语言中struct中的成员变量不能赋初值，C++中的struct中的成员变量可以

### 类的封装

> 把事物的属性和行为表示出来，那么就可以抽象出来这个事物。

#### 封装:

1. 把变量（属性）和函数（操作）合成一个整体，封装在一个类中
2. 对变量和函数进行访问控制

#### 访问权限

1. 在类的内部(作用域范围内)，没有访问权限之分，所有成员可以相互访问
2. 在类的外部(作用域范围外)，访问权限才有意义：public，private，protected
3. 在类的外部，只有public修饰的成员才能被访问，在没有涉及继承与派生时，		private和protected是同等级的，外部不允许访问

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps45.jpg)

 ***[C++中struct和class的区别?]***

 class默认访问权限为private,struct默认访问权限为public.

#### 尽量将成员变量设置为private

1.  可赋予客户端访问数据的一致性。

   如果成员变量不是public，客户端唯一能够访问对象的方法就是通过成员函数。如果类中所有public权限的成员都是函数，客户在访问类成员时只会默认访问函数，不需要考虑访问的成员需不需要添加(),这就省下了许多搔首弄耳的时间。

2.  可细微划分访问控制

   使用成员函数可使得我们对变量的控制处理更加精细。如果我们让所有的成员变量为public，每个人都可以读写它。如果我们设置为private，我们可以实现“不准访问”、“只读访问”、“读写访问”，甚至你可以写出“只写访问”。

### 对象的构造和析构

***构造函数***和***析构函数***，这两个函数将会被编译器自动调用，完成对象初始化和对象清理工作。

***无论你是否喜欢，对象的初始化和清理工作是编译器强制我们要做的事情，即使你不提供初始化操作和清理操作，编译器也会给你增加默认的操作，只是这个默认初始化操作不会做任何事，所以编写类就应该顺便提供初始化函数。***

#### 构造函数和析构函数

构造函数主要作用在于创建对象时为对象的成员属性赋值，构造函数由编译器自动调用，无须手动调用。

析构函数主要用于对象***销毁前***系统自动调用，执行一些清理工作(例如成员变量有存堆区指针，那么堆区空间由析构函数中释放最合适了)。

**构造函数语法：**

- 构造函数函数名和类名相同，没有返回值，不能有void，但可以有参数,可以重载。
- ClassName(){}

**析构函数语法：**

- 析构函数函数名是在类名前面加”~”组成,没有返回值，不能有void,不能有参数，不能重载。
- `~ClassName(){}`

##### 构造函数的分类及调用

- 按参数类型：
  1. 无参构造函数
  2. 有参构造函数
- 按类型分类：
  1. 普通构造函数
  2. 拷贝构造函数(复制构造函数)

```cpp
class Person{
public:
	Person(){
		cout << "no param constructor!" << endl;
		mAge = 0;
	}
	//有参构造函数
	Person(int age){
		cout << "1 param constructor!" << endl;
		mAge = age;
	}
	//拷贝构造函数(复制构造函数) 使用另一个对象初始化本对象
	Person(const Person& person){
		cout << "copy constructor!" << endl;
		mAge = person.mAge;
	}
	//打印年龄
	void PrintPerson(){
		cout << "Age:" << mAge << endl;
	}
private:
	int mAge;
};
```

无参构造调用方式注意点：（**重点**）

- 正确方式：`Person person1;`
- 错误方式：`Person person1();`//会被误认为是函数声明

有参构造调用方法如下

1. `Person person01(100);`
2. `Person person02(person01);`
3. `Person person03 = Person(300);`
4. `Person person04 = 100;(不推荐)`
5. `Person person05 = person04;`

```cpp
//1. 无参构造调用方式
void test01(){
	
	//调用无参构造函数
	Person person1; 
	person1.PrintPerson();

	//无参构造函数错误调用方式
	//Person person2();！原因是会被编译器看成返回值为Person的名为person2的函数声明。！
	//person2.PrintPerson();
}
//2. 调用有参构造函数
void test02(){
	
	//第一种 括号法，最常用
	Person person01(100);
	person01.PrintPerson();

	//调用拷贝构造函数
	Person person02(person01);
	person02.PrintPerson();

	//第二种 匿名对象(显示调用构造函数)
	Person(200); //匿名对象，没有名字的对象

	Person person03 = Person(300);
	person03.PrintPerson();

	//注意: 使用匿名对象初始化判断调用哪一个构造函数，要看匿名对象的参数类型
	Person person06(Person(400)); //等价于 Person person06 = Person(400);
	person06.PrintPerson();

	//第三种 =号法 隐式转换
	Person person04 = 100; //Person person04 =  Person(100)
	person04.PrintPerson();

	//调用拷贝构造
	Person person05 = person04; //Person person05 =  Person(person04)
	person05.PrintPerson();
}
```

##### **[注意事项1]**

除了匿名构造外，其他情况析构都是在作用域尾执行。

```cpp
//匿名构造情况
{
	Person(19);//构造函数中打印调用构造函数
	cout<<分割线<<endl;
}
/*以上输出为:
调用构造函数
调用析构函数
分割线
*/
//原因为:编译器看到Person(19);这种情况的时候，执行完构造后会立即调用析构函数。
//其他情况
{
    Person p=Person(19);
    cout<<分割线<<endl;
}
/*以上输出为:
调用构造函数
分割线
调用析构函数
*/
```

##### **[注意事项2]**

***b为A的实例化对象,A a = A(b) 和 A(b)的区别？***

  当A(b) 有变量来接的时候，那么编译器认为他是一个匿名对象，当没有变量来接的时候，编译器认为你A(b) 等价于 A b.

拷贝构造函数初始化匿名对象汇编层面上实际并没有调用拷贝构造函数，而是调用的无参构造函数。（避免这种用法）

```cpp
Person p;//正常调用无参构造函数的方法
Person(p);//上下这两行含义完全相等,若上下同时存在会产生编译错误:p重定义
```

##### [注意事项3]

不存在参数类实例本身的构造函数，即不存在如下构造函数：

```cpp
Person(Person person)
	{
		m_age = person.m_age;
		cout << "Person构造成功" << endl;
	}
```

报错显示:"Person" 的复制构造函数不能带有 "Person" 类型的参数

从理解上来看，上面代码段中的参数传参为值传递，而在C++中，类对象的值传递本质上调用的就是拷贝构造函数，则会产生一个无限递归，因此必须要报错。(下面调用时机处是对这个理解的更深理解)

#### 析构函数的调用时机

- 对象在栈上，生命周期结束的时候系统会自动调用析构函数。
- 对象在堆上，系统不会自动调用析构函数，必须见到delete。

1. 对象生命周期结束，被销毁时；
2. 主动调用delete ；
3. 对象i是对象o的成员，o的析构函数被调用时，对象i的析构函数也被调用。

**如果是new的对象，即使离开了作用域也会一直存在，必须主动delete，否则只有在结束程序时才会执行析构。**(虽然离开了作用域，但用new动态开辟空间的对象是不会析构的，你可以观察任务管理器，看到内存一直在上升。但你在其他地方确无法使用a所开辟的空间，因为a这个指针是保存在栈上的，当离开作用域后就自动析构(或者说自动消失了)，但它所在分配空间是分配在堆上的，只有主动析构或程序结束，才会释放空间，也就是丢失了这块空间的地址，无法操作这块空间了 。)

对不是new的对象的析构函数和return打断点，可以发现是**先返回值后调用析构函数**。

[显示调用析构函数不但不会带来任何好处，还会造成很多奇怪、难以分析的问题](https://blog.csdn.net/m0_37185283/article/details/78723981)

1. 手动析构 == 调用函数
2. 自动析构 == 调用函数同时销毁本身，后一个行为由系统完成，用户不能参与

> 我们构造对象，往往都是在一段语句体中，比如函数，判断，循环，还有就直接被一对“{}”包含的语句体。这个对象在语句体中被创建，在语句体结束的时候被销毁。问题就在于，这样的对象在生命周期中是**存在于栈上的**。也就是说，如何管理，是系统完成而程序员不能控制的。所以，即使我们调用了析构，在对象生命周期结束后，系统仍然会再调用一次析构函数，将其在栈上销毁，实现真正的析构。所以，如果我们在析构函数中有清除堆数据的语句，调用两次意味着第二次会试图清理已经被清理过了的，根本不再存在的数据！这是件会导致运行时错误的问题，并且在编译的时候不会告诉你！

##### 显示调用析构带来的后果

1. 显式调用的时候，析构函数相当于的一个**普通的成员函数**；
2. 编译器隐式调用析构函数，如分配了堆内存，显式调用析构的话引起重复**释放堆内存的异常**；
3. 把一个对象看作占用了部分栈内存，占用了部分堆内存（如果申请了的话），这样便于理解这个问题，系统隐式调用析构函数的时候，会加入释放栈内存的动作（而堆内存则由用户手工的释放）；用户显式调用析构函数的时候，只是单纯执行析构函数内的语句，**不会释放栈内存，也不会摧毁对象**。



#### 拷贝构造函数的调用时机

- 对象以值传递的方式传给函数参数
- 函数局部对象以值传递的方式从函数返回(vs debug模式下调用一次拷贝构造，qt不调用任何构造)
- 用一个对象初始化另一个对象

```cpp
class Person{
public:
	Person(){
		cout << "no param contructor!" << endl;
		mAge = 10;
	}
	Person(int age){
		cout << "param constructor!" << endl;
		mAge = age;
	}
	Person(const Person& person){
		cout << "copy constructor!" << endl;
		mAge = person.mAge;
	}
	~Person(){
		cout << "destructor!" << endl;
	}
public:
	int mAge;
};
//1. 旧对象初始化新对象
void main(){

	Person p(10);
	Person p3 = p; // 相当于Person p3 = Person(p);
}

```

```cpp
//2. 传递的参数是普通对象，函数参数也是普通对象，传递将会调用拷贝构造
void doBussiness(Person p){}

void main(){
	Person p(10);
	doBussiness(p);
}


```

输出结果:

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20201228113351913.png" alt="image-20201228113351913"  />

```cpp
//3. 函数返回局部对象
Person MyBusiness(){
	Person p(10);
	cout << "局部p:" << (int*)&p << endl;
	return p;
}
void main(){
	//vs release、qt下没有调用拷贝构造函数
	//vs debug下调用一次拷贝构造函数
	Person p = MyBusiness();
	cout << "局部p:" << (int*)&p << endl;
}
```

debug下生成：

![image-20201228113453490](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20201228113453490.png)

release下生成：

![image-20201228113744991](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20201228113744991.png)

***[上面结果说明:]***

  编译器存在一种对返回值的优化技术,**RVO(Return Value Optimization)**.在vs debug模式下并没有进行这种优化，所以函数MyBusiness中创建p对象，调用了一次构造函数，当编译器发现你要返回这个局部的对象时，编译器通过调用拷贝构造生成一个临时Person对象返回，然后调用p的析构函数。

  我们从常理来分析的话，这个匿名对象和这个局部的p对象是相同的两个对象，那么如果能直接返回p对象，就会省去一个拷贝构造和一个析构函数的开销，在程序中一个对象的拷贝也是非常耗时的，如果减少这种拷贝和析构的次数，那么从另一个角度来说，也是编译器对程序执行效率上进行了优化。

  所以在这里，编译器偷偷帮我们做了一层优化：

  当我们这样去调用: `Person p = MyBusiness();`

  编译器偷偷将我们的代码更改为:

```cpp
 void MyBussiness(Person& _result){
       _result.X:X(); //调用Person默认构造函数
       //.....对_result进行处理
       return;
   }
int main(){
   Person p; //这里只分配空间，不初始化
   MyBussiness(p);
}
```

理解上就是编译器编译发布版本的时候直接改成了**类对象的引用传递**

【重点理解】

```cpp
#include"iostream"
using namespace std;

/*
结论1：函数的返回值是一个匿名对象时，会调用匿名对象的拷贝函数
结论2：有关匿名对象的去和留：
如果用匿名对象 初始化 另一个同类型的对象 匿名对象被接收				   不会调用析构函数
如果用匿名对象 赋值给 另一个同类型的对象（已经初始化：默认或者有参数） 匿名对象被析构
*/

class Test06
{
public:
	Test06() {
		a = b = 0;
		cout << "默认构造函数" << endl;
	}

	Test06(int a, int b) {
		this->a = a;
		this->b = b;
		cout << "有参数构造函数" << endl;
	}

	Test06(const Test06& obj) {//拷贝/复制构造函数：用一个对象初始化另一个对象			
		a = obj.a; b = obj.b;
		cout << "拷贝/复制构造函数" << endl;
	}

	~Test06() {
		cout << "析构函数" << endl;
	}
public:
	Test06& operator=(const Test06& obj) {
		a = obj.a; b = obj.b;
		cout << "重载=操作符" << endl;
		return *this;
	}
	void printT() {
		cout << "a = " << a << endl;
		cout << "b = " << b << endl;
	}
protected:
private:
	int a;
	int b;
};

//如果函数返回值是一个对象，建议用对象直接接收
Test06 getTest() {
	Test06 c(1, 2);		//有参构造函数
	return c;			//拷贝构造函数
						//析构c	
}

void objectShow06() {
	//匿名对象被接收，t1不调用默认构造函数 ,不调用析构，节约内存，提高速度
	Test06 t1 = getTest();//t1如何被构造的呢？？？===》函数返回值的拷贝构造

	Test06 t2;		//默认构造函数
	t2 = getTest(); //匿名对象赋值给新对象，析构匿名对象
					//重载=操作符
	t1.printT();
	t2.printT();
	//析构t2
	//析构t1
}

int main() {

	objectShow06();

	system("pause");
	return 0;
}

```

输出结果为:

![image-20201230151324082](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20201230151324082.png)

#### 构造函数自动生成规则

- 默认情况下，c++编译器至少为我们写的类增加4个函数
  1. 默认构造函数(无参，函数体为空)
  2. 默认析构函数(无参，函数体为空)
  3. 默认拷贝构造函数，对类中非静态成员属性简单值拷贝
  4. 赋值运算符重载，operator=()函数。(定义时的=运算符调用的是拷贝构造之外，之后的=运算符调用的都是operator=()函数)
- 如果用户定义拷贝构造函数，c++不会再提供任何默认构造函数
- 如果用户定义了普通构造(非拷贝)，c++不在提供默认无参构造，但是会提供默认拷贝构造

#### 深拷贝和浅拷贝

##### 浅拷贝

同一类型的对象之间可以赋值，使得两个对象的成员变量的值相同，两个对象仍然是独立的两个对象，这种情况被称为***浅拷贝.***

一般情况下，浅拷贝没有任何副作用，但是当类中有指针，并且指针指向动态分配的内存空间，析构函数做了动态内存释放的处理，会导致内存问题。

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps1.jpg)

##### 深拷贝

当类中有指针，并且此指针有动态分配空间，析构函数做了释放处理，往往需要自定义拷贝构造函数，自行给指针动态分配空间，深拷贝。

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps2.jpg)

```cpp
class Person{
public:
	Person(char* name,int age){
		pName = (char*)malloc(strlen(name) + 1);
		strcpy(pName,name);
		mAge = age;
	}
	//增加拷贝构造函数
	Person(const Person& person){
		pName = (char*)malloc(strlen(person.pName) + 1);
		strcpy(pName, person.pName);
		mAge = person.mAge;
	}
	~Person(){
		if (pName != NULL){
			free(pName);
		}
	}
private:
	char* pName;
	int mAge;
};

void test(){
	Person p1("Edward",30);
	//用对象p1初始化对象p2,调用c++提供的默认拷贝构造函数
	Person p2 = p1;
}
```

#### explicit关键字

c++提供了[关键字](http://baike.baidu.com/view/390935.htm)explicit(字面意思：更清晰的)，禁止通过[构造函数](http://baike.baidu.com/view/5411414.htm)的隐式转换方式来构造对象。

- explicit**常**用于修饰构造函数,防止隐式转化调用构造函数产生的误解。
- **常**针对单参数的构造函数(或者除了第一个参数外其余参数都有默认值的多参构造)而言。

```cpp
class Test
{
public:
	char ch;
	int num=0;
	explicit  Test(char ch)
	{
		this->ch = ch;
		num = 1;
	}
};
void main() {
	//Test test1='b';//这里报错显示：不存在从char转换到Test的适当构造函数。
    Test test1('b');//没问题
}
```

上面例子可看出：explicit就是禁止用隐式方式来构造对象

```cpp
class Test
{
public:
	char ch;
	int num=0;

	Test(char ch)
	{
		this->ch = ch;
		num = 1;
	}
	Test(int num)
	{
		this->num = num;
		ch = 'a';
	}
};

void main() {
	cout << "...情况" << endl;
	Test test1='b';
	cout << test1.ch <<"  "<< test1.num << endl;
	Test test2=65;
	cout << test2.ch << "  " << test2.num << endl;
	Test test3 ('c');
	cout << test3.ch << "  " << test3.num << endl;
	Test test4 (66);
	cout << test4.ch << "  " << test4.num << endl;
}

```

各种情况的输出效果：

![image-20201228152115809](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20201228152115809.png)![image-20201228152153312](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20201228152153312.png)![image-20201228152220005](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20201228152220005.png)

#### 初始化列表

构造函数和其他函数不同，除了有名字，参数列表，函数体之外还有初始化列表。

```cpp
class Person{
public:
#if 0
	//传统方式初始化
	Person(int a,int b,int c){
		mA = a;
		mB = b;
		mC = c;
	}
#endif
	//初始化列表方式初始化
	Person(int a, int b, int c):mA(a),mB(b),mC(c){}
private:
	int mA;
	int mB;
	int mC;
};
```

***注意：***初始化成员列表(参数列表)只能在构造函数使用。

### 类对象作为成员

在类中定义的数据成员一般都是基本的数据类型。但是类中的成员也可以是对象，叫做***对象成员***。

> C++中对对象的初始化是非常重要的操作，当创建一个对象的时候，c++编译器必须确保调用了所有子对象的构造函数。如果所有的子对象有默认构造函数，编译器可以自动调用他们。但是如果子对象没有默认的构造函数，或者想指定调用某个构造函数怎么办？
>
> **那么是否可以在类的构造函数直接调用子类的属性完成初始化呢？但是如果子类的成员属性是私有的，我们是没有办法访问并完成初始化的。**
>
> **解决办法非常简单：对于子类调用构造函数，c++为此提供了专门的语法，即构造函数初始化列表。**
>
> 当调用构造函数时，首先按各对象成员在类**定义中的顺序（和参数列表的顺序无关）**依次调用它们的构造函数，对这些对象初始化，最后再调用本身的函数体。也就是说，**先调用对象成员的构造函数，再调用本身的构造函数。**
>
> 析构函数和构造函数调用顺序相反，先构造，后析构。

```cpp
//汽车类
class Car{
public:
	Car(){
		cout << "Car 默认构造函数!" << endl;
		mName = "大众汽车";
	}
	Car(string name){
		cout << "Car 带参数构造函数!" << endl;
		mName = name;
	}
	~Car(){
		cout << "Car 析构函数!" << endl;
	}
public:
	string mName;
};

//拖拉机
class Tractor{
public:
	Tractor(){
		cout << "Tractor 默认构造函数!" << endl;
		mName = "爬土坡专用拖拉机";
	}
	Tractor(string name){
		cout << "Tractor 带参数构造函数!" << endl;
		mName = name;
	}
	~Tractor(){
		cout << "Tractor 析构函数!" << endl;
	}
public:
	string mName;
};

//人类
class Person{
public:
#if 1
	//类mCar不存在合适的构造函数
	Person(string name){
		mName = name;
	}
#else
	//初始化列表可以指定调用构造函数
	Person(string carName, string tracName, string name) : mTractor(tracName), mCar(carName), mName(name){
		cout << "Person 构造函数!" << endl;
	}
#endif
	
	void GoWorkByCar(){
		cout << mName << "开着" << mCar.mName << "去上班!" << endl;
	}
	void GoWorkByTractor(){
		cout << mName << "开着" << mTractor.mName << "去上班!" << endl;
	}
	~Person(){
		cout << "Person 析构函数!" << endl;
	}
private:
	string mName;
	Car mCar;
	Tractor mTractor;
};

void test(){
	//Person person("宝马", "东风拖拉机", "赵四");
	Person person("刘能");
	person.GoWorkByCar();
	person.GoWorkByTractor();
}
```

输出结果:

![image-20201228143347961](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20201228143347961.png)

### 动态对象创建

当创建一个c++对象时会发生两件事:

1. 为对象分配内存
2. 调用构造函数来初始化那块内存

第一步我们能保证实现，需要我们确保第二步一定能发生。c++强迫我们这么做是因为使用未初始化的对象是程序出错的一个重要原因。

#### C动态分配内存方法

为了在运行时动态分配内存，c在他的标准库中提供了一些函数,malloc以及它的变种calloc和realloc,释放内存的free,这些函数是有效的、但是原始的，需要程序员理解和小心使用。为了使用c的动态内存分配函数在堆上创建一个类的实例，我们必须这样做:

```cpp
class Person{
public:
	Person(){
		mAge = 20;
		pName = (char*)malloc(strlen("john")+1);
		strcpy(pName, "john");
	}
	void Init(){
		mAge = 20;
		pName = (char*)malloc(strlen("john")+1);
		strcpy(pName, "john");
	}
	void Clean(){
		if (pName != NULL){
			free(pName);
		}
	}
public:
	int mAge;
	char* pName;
};
int main(){

	//分配内存
	Person* person = (Person*)malloc(sizeof(Person));
	if(person == NULL){
		return 0;
	}
	//调用初始化函数
	person->Init();
	//清理对象
	person->Clean();
	//释放person对象
	free(person);

	return EXIT_SUCCESS;
}
```

***问题在于：***

1. 程序员必须确定对象的长度。
2. malloc返回一个void*指针，c++不允许将void*赋值给其他任何指针，必须强转。
3. malloc可能申请内存失败，所以必须判断返回值来确保内存分配成功。
4. 用户在使用对象之前必须记住对他初始化，构造函数不能显示调用初始化(构造函数是由编译器调用)，用户有可能忘记调用初始化函数。

c的动态内存分配函数太复杂，容易令人混淆，是不可接受的，c++中我们推荐使用运算符new 和 delete.

##### **new operator**

[new运算符详解]: https://blog.csdn.net/growth_path_/article/details/83927810

C++中解决动态内存分配的方案是**把创建一个对象所需要的操作都结合在一个称为new的运算符里**。当用new创建一个对象时，它就在堆里为对象分配内存并调用构造函数完成初始化。

```cpp
Person* person = new Person;
//相当于:
Person* person = (Person*)malloc(sizeof(Person));
	if(person == NULL){
		return 0;
	}
person->Init(); //构造函数
```

New操作符能确定在调用构造函数初始化之前内存分配是成功的，所有不用显式确定调用是否成功。

现在我们发现在堆里创建对象的过程变得简单了，只需要一个简单的表达式，它带有**内置的长度计算、类型转换和安全检查**。这样在堆创建一个对象和在栈里创建对象一样简单。

###### malloc和new的区别

1. malloc和free属于库函数，new和delete属于运算符
2. malloc不会调用构造函数，new会调用构造函数
3. malloc返回void* C++下要强转，new返回创建的对象的指针

#####  **delete operator**

new表达式的反面是delete表达式。**delete表达式先调用析构函数，然后释放内存。**正如new表达式返回一个指向对象的指针一样，delete需要一个对象的地址。

delete只适用于由new创建的对象。

**如果使用一个由malloc或者calloc或者realloc创建的对象使用delete,这个行为是未定义的。**因为大多数new和delete的实现机制都使用了malloc和free,所以很可能没有调用析构函数就释放了内存。

如果正在删除的对象的指针是NULL,将不发生任何事，因此建议在删除指针后，立即把指针赋值为NULL，以免对它删除两次，对一些对象删除两次可能会产生某些问题。

```cpp
class Person{
public:
	Person(){
		cout << "无参构造函数!" << endl;
		pName = (char*)malloc(strlen("undefined") + 1);
		strcpy(pName, "undefined");
		mAge = 0;
	}
	Person(char* name, int age){
		cout << "有参构造函数!" << endl;
		pName = (char*)malloc(strlen(name) + 1);
		strcpy(pName, name);
		mAge = age;
	}
	void ShowPerson(){
		cout << "Name:" << pName << " Age:" << mAge << endl;
	}
	~Person(){
		cout << "析构函数!" << endl;
		if (pName != NULL){
			delete pName;
			pName = NULL;
		}
	}
public:
	char* pName;
	int mAge;
};

void test(){
	Person* person1 = new Person;
	Person* person2 = new Person("John",33);

	person1->ShowPerson();
	person2->ShowPerson();

	delete person1;
    person1=NULL;//delete不会置空指针
	delete person2;
     person2=NULL;
}
```



##### 用于数组的new和delete

使用new和delete在堆上创建数组非常容易。

```cpp
//创建字符数组
char* pStr = new char[100];
//创建整型数组
int* pArr1 = new int[100]; 
//创建整型数组并初始化
int* pArr2 = new int[10]{ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

//释放数组内存
delete[] pStr;
delete[] pArr1;
delete[] pArr2;
```

当创建一个对象数组的时候，必须对数组中的每一个对象调用构造函数，**一般来说**除了在栈上可以聚合初始化，必须提供一个默认的构造函数。

```cpp
class Person{
public:
	Person(){
		pName = (char*)malloc(strlen("undefined") + 1);
		strcpy(pName, "undefined");
		mAge = 0;
	}
	Person(char* name, int age){
		pName = (char*)malloc(sizeof(name));
		strcpy(pName, name);
		mAge = age;
	}
	~Person(){
		if (pName != NULL){
			delete pName;
		}
	}
public:
	char* pName;
	int mAge;
};

void test(){
	//栈聚合初始化
	Person person[] = { Person("john", 20), Person("Smith", 22) };
	cout << person[1].pName << endl;
    //创建堆上对象调用有参构造函数
    Test* test1 = new Test('a');
    //创建堆上对象调用无参构造函数
    Test* test1 = new Test();
    //创建堆上对象数组必须提供默认构造函数
	Person* workers = new Person[20];
}
```

以下代码可以不强制在堆中生成数组对象时候类必须有默认构造函数（即不能是自己实现了有参数构造函数却没实现无参构造函数的情况）。

```cpp
Person* workers = new Person[2]{Person("john", 20), Person("Smith", 22)};
```

但是以上代码在部分编译器不支持（VS2015支持）。所以为了兼容性，最好提供一个默认构造函数，并且不使用上面语法。

##### **[注意]**

delete void*可能会出错

如果对一个void*指针执行delete操作，**这将可能成为一个程序错误，除非指针指向的内容是非常简单的，因为它将不执行析构函数**.以下代码未调用析构函数，导致可用内存减少。

```cpp
class Person{
public:
	Person(char* name, int age){
		pName = (char*)malloc(sizeof(name));
		strcpy(pName,name);
		mAge = age;
	}
	~Person(){
		if (pName != NULL){
			delete pName;
		}
	}
public:
	char* pName;
	int mAge;
};

void test(){
	void* person = new Person("john",20);//这里写void*将导致下面的delete不执行析构函数
	delete person;
}
```

因此，**不要用void*去接受new出来的对象，利用void\*无法调用析构函数**。

##### 使用new和delete采用相同形式

```cpp
	Person* person = new Person[10];
	delete person;
```

以上代码有什么问题吗？(vs下直接中断、qt下析构函数调用一次)

使用了new也搭配使用了delete，问题在于Person有10个对象，那么其他9个对象可能没有调用析构函数，也就是说其他9个对象可能删除不完全，因为它们的析构函数没有被调用。

我们现在清楚使用new的时候发生了两件事: 一、分配内存；二、调用构造函数，那么调用delete的时候也有两件事：一、析构函数；二、释放内存。

那么刚才我们那段代码最大的问题在于：person指针指向的内存中到底有多少个对象，因为这个决定应该有多少个析构函数应该被调用。换句话说，person指针指向的是一个单一的对象还是一个数组对象，由于单一对象和数组对象的内存布局是不同的。更明确的说，数组所用的内存通常还包括“数组大小记录”，使得delete的时候知道应该调用几次析构函数。单一对象的话就没有这个记录。单一对象和数组对象的内存布局可理解为下图:

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps3.jpg)

本图只是为了说明，编译器不一定如此实现，但是很多编译器是这样做的。

当我们使用一个delete的时候，我们必须让delete知道指针指向的内存空间中是否存在一个“数组大小记录”的办法就是我们告诉它。当我们使用delete[]，那么delete就知道是一个对象数组，从而清楚应该调用几次析构函数。

***结论:***

  **如果在new表达式中使用[]，必须在相应的delete表达式中也使用[].如果在new表达式中不使用[], 一定不要在相应的delete表达式中使用[].**



### 嵌套类和局部类

1. 嵌套类（在一个类中定义另一个类）：

   在C++语言中，**嵌套类**（nested class）其实与外围类没有什么太强的依赖关系 ，往往是因为外围类需要使用嵌套类对象作为底层实现，并且该嵌套类只用于外围类的实现，且同时可以对用户隐藏该底层实现时才使用嵌套类。（即作用总结：**访问控制，限定嵌套类只能由这个类访问。**）

2. 局部类：在一个函数中定义另一个类

## 静态成员（static）

> **对static静态的理解**
>
> 术语“static”有一段不同寻常的历史。起初，C引入关键字static是为了表示退出一个块后依然存在的局部变量。在这种情况下，术语"static"是有意义的：变量一直存在，当再次进入该块时仍然存在。随后，static在C中有了第二种含义，表示不能被其他文件访问的全局变量和函数。为了避免引入一个新的关键字，关键字static被重用了。最后，C++第三次重用了这个关键字，与前面赋予的含义完全不一样，这里将其解释为：属于类且不属于类对象的变量和函数。这个含义和Java相同。

### 静态成员变量

在一个类中，若将一个成员变量声明为static，这种成员称为静态成员变量。与一般的数据成员不同，无论建立了多少个对象，都只有一个静态数据的拷贝。静态成员变量，属于某个类，所有对象共享。 

静态变量，是在编译阶段就分配空间，**对象还没有创建时，就已经分配空间。**

- ***静态成员变量必须在类中声明，在类外定义******。***
- ***静态数据成员不属于某个对象，编译阶段就分配内存，在为对象分配空间中不包括静态成员所占空间。***
- ***静态数据成员可以通过类名或者对象名来引用（两种访问方式）。***
- ***也有访问权限***

```cpp
class Person{
public:
	//类的静态成员属性
	static int sNum;
private:
	static int sOther;
};

//类外初始化，初始化时不加static
int Person::sNum = 0;//这种类外定义方式看起来是在类外，但其实还是算类内，即这种可无视private权限
int Person::sOther = 0;
int main(){


	//1. 通过类名直接访问
	Person::sNum = 100;
	cout << "Person::sNum:" << Person::sNum << endl;

	//2. 通过对象访问
	Person p1, p2;
	p1.sNum = 200;

	cout << "p1.sNum:" << p1.sNum << endl;
	cout << "p2.sNum:" << p2.sNum << endl;

	//3. 静态成员也有访问权限，类外不能访问私有成员
	//cout << "Person::sOther:" << Person::sOther << endl;
	Person p3;
	//cout << "p3.sOther:" << p3.sOther << endl;

	system("pause");
	return EXIT_SUCCESS;
}
```

**【注意】**由于静态空间的申请和初始化都在main之前，因此可以利用静态成员的类外定义来在main之前执行一些代码：

```cpp
int  testfunc()
{
    //main前执行的代码
	cout << "我在main外哦！" << endl;
	return 1;
}
class test
{
	static int a;
};
int test::a = testfunc();
```



### 静态成员函数

在类定义中，前面有static说明的成员函数称为静态成员函数。静态成员函数使用方式和静态变量一样，同样在对象没有创建前，即可通过类名调用。静态成员函数主要为了访问静态变量，但是，不能访问普通成员变量。

**静态成员函数的意义：不在于信息共享，数据沟通，而在于管理静态数据成员，完成对静态数据成员的封装。**

- **静态成员函数只能访问静态变量，不能访问普通成员变量**
- 静态成员函数的使用和静态成员变量一样可以通过类或者对象访问
- 静态成员函数也有访问权限
- 普通成员函数可访问静态成员变量、也可以访问非经常成员变量

```cpp
class Person{
public:
	//普通成员函数可以访问static和non-static成员属性
	void changeParam1(int param){
		mParam = param;
		sNum = param;
	}
	//静态成员函数只能访问static成员属性
	static void changeParam2(int param){
		//mParam = param; //无法访问
		sNum = param;
	}
private:
	static void changeParam3(int param){
		//mParam = param; //无法访问
		sNum = param;
	}
public:
	int mParam;
	static int sNum;
};

//静态成员属性类外初始化
int Person::sNum = 0;

int main(){

	//1. 类名直接调用
	Person::changeParam2(100);

	//2. 通过对象调用
	Person p;
	p.changeParam2(200);

	//3. 静态成员函数也有访问权限
	//Person::changeParam3(100); //类外无法访问私有静态成员函数
	//Person p1;
	//p1.changeParam3(200);
	return EXIT_SUCCESS;
}
```

**【注意】**

静态成员函数不属于任何一个类对象，没有this指针，而非静态成员必须随类对象的产生而产生，所以静态成员函数”看不见”非静态成员，自然也就不能访问了
但是如果静态成员函数通过引用一个对象，是可以直接访问私有成员的，也体现了它成员函数的特权。

### const静态成员属性

如果一个类的成员，既要实现共享，又要实现不可改变，那就用 static const 修饰。***定义静态const数据成员时，最好在类内部初始化***。

```cpp
class Person{
public:
	//static const int mShare = 10;
	const static int mShare = 10; //只读区，不可修改
};
int main(){

	cout << Person::mShare << endl;
	//Person::mShare = 20;

	return EXIT_SUCCESS;
}
```

### 静态成员实现单例模式

单例模式是一种常用的软件设计模式。在它的核心结构中只包含一个被称为单例的特殊类。**通过单例模式可以保证系统中一个类只有一个实例而且该实例易于外界访问**，从而方便对实例个数的控制并节约系统资源。如果希望在系统中某个类的对象只能存在一个，单例模式是最好的解决方案。

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps1.png)

Singleton（单例）：在单例类的内部实现只生成一个实例，同时它提供一个静态的getInstance()工厂方法，让客户可以访问它的唯一实例；为了防止在外部对其实例化，将其默认构造函数和拷贝构造函数设计为私有；在单例类内部定义了一个Singleton类型的静态对象，作为外部共享的唯一实例。

关键点：

1. 私有化默认构造函数，拷贝构造函数，唯一实例指针
2. 对外提供getInstance接口，将指针返回

用单例模式，模拟公司员工使用打印机场景，打印机可以打印员工要输出的内容，并且可以累积打印机使用次数，案例如下：

```cpp
class Printer{
public:
	static Printer* getInstance(){ return pPrinter;}
	void PrintText(string text){
		cout << "打印内容:" << text << endl;
		cout << "已打印次数:" << mTimes << endl;
		cout << "--------------" << endl;
		mTimes++;
	}
private:
	Printer(){ mTimes = 0; }
	Printer(const Printer&){}
private:
	static Printer* pPrinter;
	int mTimes;
};

Printer* Printer::pPrinter = new Printer;

void test(){
	Printer* printer = Printer::getInstance();
	printer->PrintText("离职报告!");
	printer->PrintText("入职合同!");
	printer->PrintText("提交代码!");
}
```

## C++面向对象模型初探

### 成员变量和函数的存储

- c++中的***非静态数据成员***直接内含在类对象中，就像c struct一样。
- 成员函数(member function)虽然内含在class声明之内，却不出现在对象空间中。
- 每一个非内联成员函数(non-inline member function)只会诞生一份函数实例.
- 空类的sizeof结果为1
- 只有类中的非静态成员才真正占用对象空间，他们也要内存对齐（和结构体一样）

### this指针

#### this指针工作原理

通过上例我们知道，c++的数据和操作也是分开存储，并且每一个非内联成员函数(non-inline member function)只会诞生一份函数实例，也就是说多个同类型的对象会共用一块代码

那么问题是：这一块代码是如何区分那个对象调用自己的呢？

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps29.jpg)

c++规定，this指针是隐含在对象成员函数内的一种指针。当一个对象被创建后，它的每一个成员函数都含有一个系统自动生成的隐含参数指针this，用以传入这个对象的地址，也就是说虽然我们没有写上this指针，编译器在编译的时候也是会加上的。因此this也称为“指向本对象的指针”，this指针并不是对象的一部分，不会影响sizeof(对象)的结果。

 　this指针是C++实现封装的一种机制，它将对象和该对象调用的成员函数连接在一起，在外部看来，每一个对象都拥有自己的函数成员。一般情况下，并不写this，而是让系统进行默认设置。
$$
this指针永远指向当前对象。
$$
成员函数通过this指针即可知道操作的是那个对象的数据。**This指针是一种隐含指针，它隐含于每个类的非静态成员函数中。**This指针无需定义，直接使用即可。

***c++编译器对普通成员函数的内部处理的理解图***

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps59.jpg)

####  this指针的使用

- 当形参和成员变量同名时，可用this指针来区分(实际开发一般类中命名规范为m_xxx表示member_xxx避开命名冲突)
- 在类的非静态成员函数中返回对象本身，可使用return *this.

`p.s.   *this为对象本身`

**【重点理解】**this案例：(内含链式编程思想)

```cpp

class Test
{
public:
	int num;
	Test()
	{
		num = 0;
	}
	Test& plusNum(int num)//返回引用
	{
		this->num += num;
		return *this;//返回对象本身
	}
};

void main() {
	Test t1;
	t1.plusNum(10);
	cout << t1.num << endl;
	t1.plusNum(10).plusNum(10).plusNum(10);//链式编程思想
	cout << t1.num << endl;
}
```

![image-20201230145442591](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20201230145442591.png)

若将plusNum的返回值改成值传递:

```cpp
Test plusNum(int num)//返回对象
	{
		this->num += num;
		return *this;//返回对象本身
	}
```

则

```cpp
void main() {
	Test t1;
	t1.plusNum(10);
	cout << t1.num << endl;
	t1.plusNum(10).plusNum(10).plusNum(10);//链式编程思想
	cout << t1.num << endl;
}
```

结果为：

![image-20201230145558329](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20201230145558329.png)

理解：对象的值赋值就是调用拷贝构造函数,从返回**引用**改成返回**值**后，实际上调用的是拷贝构造函数来生成了一个匿名对象,该匿名对象又调用plusNum函数返回值又因为调用拷贝构造函数生成另一个匿名对象...最终实际上，t1只进行了一次plusNum(10)，后面的每次plusNum都是针对每次拷贝构造函数生成的匿名对象而非t1。

这里额外提一下，**函数千万不要返回局部对象的引用或指针**，因为该指针指向的空间已经被释放了，该指针为悬垂指针(指向曾经存在的对象，但该对象已经不再存在了，此类指针称为垂悬指针)

#### 空指针访问成员函数

如果成员函数中没有用到this指针(直接用成员变量内部也会用到this指针)，可以用空指针调用成员函数

可以给成员函数的this加判断，防止别人用空指针访问成员函数，如下：

```cpp
class Test
{
public:
    void myTest()
    {
        if(this==NULL)//防止别人用空指针访问成员函数
            return;
	}
};
```

### 常量关键词(const)

`以下所有强调的直接修改对应的间接修改指的是通过指针来间接修改（可否间接修改参考之前const部分的内容）`

#### const修饰成员函数

- 用const修饰的成员函数时，const修饰this指针指向的内存区域，**常量成员函数体内不可以直接修改本类中的任何普通成员变量。**
- 当成员变量类型符前用mutable（意思：可变的）修饰时例外。

定义方式：

```cpp
void 函数名() const;
```

功能：常成员函数可以**访问**常对象中的数据成员，但仍然不允许修改没有mutable修饰的常对象中数据成员的值。

**[注意]**汇编本质就是函数传参的第一个参数改成了const，因此重写函数时候需要写上这个函数后的const

####  const修饰对象(常对象)

作用：使常对象中所有没有mutable修饰的成员变量不可直接修改

两种定义方式：

```cpp
类名   const   对象名(实参列表);
const   类名   对象名(实参列表);
```

注意：

- 常对象不能调用该对象的非const型的成员函数（除了构造函数和析构函数）。
- 常对象可访问 const 或非 const 数据成员，不能直接修改，除非成员用mutable修饰

**【个人理解】**

常函数的本质是把本来由编译器暗中传入普通函数的**类型名* const  this**在常函数中传入为**const  类型名* const  this**。加多的const使this指向的内存不可直接修改了。

常对象的本质就是编译器限制对象调用普通成员函数，只能调用常函数。

【个人问题】mutable关键词实现原理?

### 友元

类的主要特点之一是**数据隐藏**，即类的私有成员无法在类的外部(作用域之外)访问。但是，有时候需要在类的外部访问类的私有成员，怎么办？

解决方法是使用友元函数，**友元函数是一种特权函数，c++允许这个特权函数访问私有成员。**

#### 友元语法

- friend关键字只出现在声明处
- 其他类、类成员函数、全局函数都可声明为友元
- **友元函数不是类的成员，不带this指针**
- 友元函数可访问对象任意成员属性，包括私有属性
- 若Ａ类是Ｂ类的友元类，则Ａ类的所有成员函数都是Ｂ类的友元函数

```cpp
class Building;
//友元类
class MyFriend{
public:
	//友元成员函数
	void LookAtBedRoom(Building& building);
	void PlayInBedRoom(Building& building);
};
class Building{
	//全局函数做友元函数
	friend void CleanBedRoom(Building& building);
#if 0
	//成员函数做友元函数
	friend void MyFriend::LookAtBedRoom(Building& building);
	friend void MyFriend::PlayInBedRoom(Building& building);
#else	
	//友元类
	friend class MyFriend;
#endif
public:
	Building();
public:
	string mSittingRoom;
private:
	string mBedroom;
};

void MyFriend::LookAtBedRoom(Building& building){
	cout << "我的朋友参观" << building.mBedroom << endl;
}
void MyFriend::PlayInBedRoom(Building& building){
	cout << "我的朋友玩耍在" << building.mBedroom << endl;
}

//友元全局函数
void CleanBedRoom(Building& building){
	cout << "友元全局函数访问" << building.mBedroom << endl;
}

Building::Building(){
	this->mSittingRoom = "客厅";
	this->mBedroom = "卧室";
}

int main(){

	Building building;
	MyFriend myfriend;

	CleanBedRoom(building);
	myfriend.LookAtBedRoom(building);
	myfriend.PlayInBedRoom(building);

	system("pause");
	return EXIT_SUCCESS;
}
```

 ***[友元类注意]***

1. 友元关系不能被继承。
2. 友元关系是单向的，类A是类B的朋友，但类B不一定是类A的朋友。
3. 友元关系不具有传递性。类B是类A的朋友，类C是类B的朋友，但类C不一定是类A的朋友。
4. **static和friend不能同时存在，简单的说friend static声明全局函数时, friend会默认函数为extern的, 和后面的static冲突. static friend违法标准规定friend声明前不能加存储类型关键字的规定.**

***c++是纯面向对象的吗？***

如果一个类被声明为friend,意味着它不是这个类的成员函数，却可以修改这个类的私有成员，而且必须列在类的定义中，因此他是一个特权函数。c++不是完全的面向对象语言，而只是一个混合产品。增加friend关键字只是用来解决一些实际问题，这也说明这种语言是不纯的。毕竟c++设计的目的是为了实用性，而不是追求理想的抽象。

**尽量使用成员函数，除非不得已的情况下才使用友元函数。**

**什么时候使用友元函数：**

1. 运算符重载的某些场合需要使用友元。
2. 两个类要共享数据的时候

综合训练（动态数组类）

`省略...`

### 运算符重载

运算符重载，就是对已有的运算符重新进行定义，[赋予](http://baike.baidu.com/view/483609.htm)其另一种功能，以适应不同的数据类型。

$$
本质上，运算符重载(operator overloading)只是一种”语法上的方便”,也就是它只是另一种函数调用的方式。
$$
在c++中，可以定义一个处理类的新运算符。这种定义很像一个普通的函数定义，只是**函数的名字由关键字operator及其紧跟的运算符组成**。差别仅此而已。它像任何其他函数一样也是一个函数，当编译器遇到适当的模式时，就会调用这个函数。

#### ***基本语法：***

定义重载的运算符就像定义函数，只是该函数的名字是operator@,这里的@代表了被重载的运算符。函数的参数中参数个数取决于两个因素。

- 运算符是一元(一个参数)的还是二元(两个参数)；
- 运算符被定义为全局函数(对于一元是一个参数，对于二元是两个参数)还是成员函数(对于一元没有参数，对于二元是一个参数-此时该类的对象用作左耳参数)

> 有些人很容易滥用运算符重载。它确实是一个有趣的工具。但是应该注意，它仅仅是一种语法上的方便而已，是另外一种函数调用的方式。从这个角度来看，只有在能使涉及类的代码更易写，尤其是**更易读时(请记住，读代码的机会比我们写代码多多了)才有理由重载运算符**。如果不是这样，就改用其他更易用，更易读的方式。
>
>   对于运算符重载，另外一个常见的反应是恐慌：突然之间，C运算符的含义变得不同寻常了，一切都变了，所有C代码的功能都要改变！并非如此，**对于内置的数据类型的表达式的的运算符是不可能改变的**。（例如想重载int类型数据的+号）

#### 可重载的运算符

几乎C中所有的运算符都可以重载，但运算符重载的使用时相当受限制的。特别是**不能使用C中当前没有意义的运算符**(例如用\*\*求幂)**不能改变运算符优先级**，**不能改变运算符的参数个数**。这样的限制有意义，否则，所有这些行为产生的运算符只会混淆而不是澄清寓语意。

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps32.jpg)

#### 加号运算符重载

对于内置的数据类型，编译器知道如何进行运算，但是对于自定义的数据类型，编译器不知道如何运算。

**实现加号运算符重载的两种方式:**

1. 成员函数

   ```cpp
   class Test
   {
   public:
       int a;
       int b;
       Test()
   	{
   		a = 0; 
   		b = 0;
   	}
       Test operator+(Test& test)//必须返回的是类本身，因为返回的是局部对象t，会调用拷贝构造函数(如果返回void的话就不能实现链式编程思路)
       {
           Test t;
           t.a+=a+test.a;
           t.b+=b+test.b;
           return t;
       }
   };
   ```

   两种调用方式：

   - t1.operator+(t2);
   - t1+t2;

2. 全局函数

   ```cpp
   class Test
   {
   public:
       int a;
       int b;
       Test()
   	{
   		a = 0; 
   		b = 0;
   	}
   };
    Test operator+(Test& test1,Test& tes2)//必须返回的是类本身，因为返回的是局部对象t，会调用拷贝构造函数
       {
           Test t;
           t.a+=test1.a+tes2.a;
           t.b+=test1.b+tes2.b;
           return t;
       }
   
   ```

   两种调用方式：

   - operator+(t1,t2);
   - t1+t2;

**【注意】**

全局方式和成员函数方式同时存在的时候不能用t1+t2的形式调用，因为具有二义性，编译器分不清

![image-20210108170757184](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210108170757184.png)

#### 左移运算符<<重载

对于自定义数据类型，不能直接用"cout<<自定义对象"来输出，需要重载左移运算符<<

利用成员函数重载，无法实现让cout在左侧，因此我们不用成员函数重载

##### 成员函数方式重载左移运算符：

```cpp
class Test
{
public:
	int a;
	int b;
	ostream& operator<<(ostream& out)//ostream&换成void则不可以链式编程。out处写cout也可以，只是起个别名而已，和cout的名称一样也可以
	{
		out <<"a为"<< a<<"\tb为" << b;
        return out;
	}
};
```

两种调用方式:

1. t1 << cout;（**此处cout在右边，因此用成员函数来重载左移运算符的方式并不好**）
2. t1.operator<<(cout);

##### 全局函数方式重载左移运算符

```cpp
class Test
{
public:
	int a;
	int b;
};
ostream& operator<<(ostream& out, Test& t)
{
	out << "a为" << t.a << "\tb为" << t.b;
	return out;
}
```

两种调用方式:

1. operator<<(cout,t1);
2. cout<<t1;

因此基本都是采用全局函数方式重载左移运算符。

因为是全局函数，所以访问类中私有数据要权限，解决方案：

1. 将左移运算符全局重载函数设置为对应类的友元函数
2. 给每个需要显示的私有变量设置公有的getXXX()函数

#### 自增自减(++/--)运算符重载

> 重载的++和--运算符有点让人不知所措，因为我们总是希望能根据它们出现在所作用对象的前面还是后面来调用不同的函数。解决办法很简单，例如**当编译器看到++a(前置++)，它就调用operator++(a),当编译器看到a++（后置++），它就会去调用operator++(a,int).**
>

```cpp
class Complex{
	friend ostream& operator<<(ostream& os,Complex& complex){
		os << "A:" << complex.mA << " B:" << complex.mB << endl;
		return os;
	}
public:
	Complex(){
		mA = 0;
		mB = 0;
	}
	//重载前置++
	Complex& operator++(){
		mA++;
		mB++;
		return *this;
	}
	//重载后置++
	Complex operator++(int){	
		Complex temp;
		temp.mA = this->mA;
		temp.mB = this->mB;
		mA++;
		mB++;
		return temp;
	}
	//前置--
	Complex& operator--(){
		mA--;
		mB--;
		return *this;
	}
	//后置--
	Complex operator--(int){
		Complex temp;
		temp.mA = mA;
		temp.mB = mB;
		mA--;
		mB--;
		return temp;
	}
	void ShowComplex(){
		cout << "A:" << mA << " B:" << mB << endl;
	}
private:
	int mA;
	int mB;
};

void test(){
	Complex complex;
	complex++;
	cout << complex;
	++complex;
	cout << complex;

	Complex ret = complex++;
	cout << ret;
	cout << complex;

	cout << "------" << endl;
	ret--;
	--ret;
	cout << "ret:" << ret;
	complex--;
	--complex;
	cout << "complex:" << complex;
}
```

总结：

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps53.jpg)

`p.s.	T表示任意类型`

解读:

**如果定义了++c，也要定义c++**，递增操作符比较麻烦，因为他们都有前缀和后缀形式，而两种语义略有不同。重载operator++和operator--时应该模仿他们对应的内置操作符。

对于++和--而言，后置形式是先返回，然后对象++或者--，返回的是对象的原值。前置形式，对象先++或--，返回当前对象，返回的是新对象。其标准形式为上图

------

**【注意】**

调用代码时候，要**优先使用前缀形式**，除非确实需要后缀形式返回的原值，前缀和后缀形式语义上是等价的，输入工作量也相当，只是效率经常会略高一些，由于**前缀形式少创建了一个临时对象**。

------

**【注意】**

**对于标准数据类型：前置可以嵌套多个前置，而后置只能一次。**

重复嵌套后置递增或递减会报错，如下图：

![image-20210108172108584](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210108172108584.png)

而对于我们上面自己实现的前后置重载，后置可以嵌套多层而没有语法错误，但是从第二次开始，运算的结果就已经存在临时对象中而不影响最初的对象。因此**多次嵌套后置递增或递减也是没有意义的，要避免这样使用。**

------

#### 指针运算符(*、->)重载

这里为了描述指针运算符重载，引入智能指针的概念。

**智能指针**

- 用途：托管new出来的对象的释放，让其自动帮忙在声明周期结束时候释放堆区对象
- 设计smartPoint智能指针类别，内部维护Person*new出来的对象的指针，在析构的时候释放堆区new出来的person对象。
- 重载(*、->)，直接通过智能指针对象重载后的指针运算符(*、->)，操作原对象的成员函数。

案例如下：

```cpp
class Person{
public:
	Person(int param){
		this->mParam = param;
	}
	void PrintPerson(){
		cout << "Param:" << mParam << endl;
	}
private:
	int mParam;
};

class SmartPointer{
public:
	SmartPointer(Person* person){
		this->pPerson = person;
	}
	//重载指针的->、*操作符
	Person* operator->(){
		return pPerson;
	}
	Person& operator*(){//这里必须返回引用是因为，如果返回Person的话会调用拷贝构造函数，创建一个新的临时对象返回。
		return *pPerson;
	}
	~SmartPointer(){
		if (pPerson != NULL){
			delete pPerson;
		}
	}
public:
	Person* pPerson;
};

void test01(){
	
	//Person* person = new Person(100);
	//如果忘记释放，那么就会造成内存泄漏

	SmartPointer pointer(new Person(100));//智能指针对象因为在堆区创建，所以声明周期结束时候会自动调用智能指针的析构函数，而智能指针的析构函数中写好了对新建的Person类对象的delete。因此我们用智能指针创建堆区上的Person对象时候，不需要自己手动delete。
    
	//直接通过智能指针操作Person类的成员函数
    pointer->PrintPerson();
    (*pointer).PrintPerson();
}
```

**指针运算符(*、->)重载必须是成员函数** 

【注意】两种一样的调用形式对比：

```cpp
 pointer->PrintPerson();//pointer.operator->()->PrintPerson();（1号）
 (*pointer).PrintPerson();//pointer.operator*().PrintPerson();
```

**对于->重载的理解，编译器会自动对pointer调用->重载函数再接->解析；**

【注意】

上诉案例中的智能指针并不存在什么实际价值，因为每个类都要专门写对应的智能指针去处理，特别麻烦，在实际生产中还是自动手动调用delete释放。

#### 赋值运算符=重载

必须是成员函数

```cpp
class Test
{
public:
    int a;
};
void main()
{
    Test t1;
    t1.a=2;
    Test t2=t1;//调用的是拷贝构造函数（不自己写默认浅拷贝）
    t2=t1;//调用的是赋值运算符重载函数（不自己写默认浅拷贝）
}
```

即**只有定义时候的=运算符调用的是拷贝构造函数。**

默认提供的赋值运算符重载是**浅拷贝**。若类有用到堆区空间，应该实现成**深拷贝**。

```cpp
class Person{
public:
	Person(char* name,int id, int age){
		this->pName = new char[strlen(name) + 1];
		strcpy(this->pName, name);
		this->mID = id;
		this->mAge = age;
	}
	//重载赋值运算符
	Person& operator=(const Person& person){//返回本身的引用是为了链式编程，同时也必须是返回Person的引用，如果返回Person，难么系统实际上是调用了拷贝构造函数生成了一个临时对象来返回，那么链式编程中的下一次就是这个临时对象调用这个赋值运算符重载函数，函数内中的释放堆空间的操作就就释放的是临时对象中指针指向的堆空间，而很显然，原本要释放的堆空间却没有释放，并且遗失了他的指针。因此势必内存泄露。

		//注意:由于当前对象已经创建完毕，那么就有可能pName指向堆内存
		//这个时候如果直接赋值，会导致内存没有及时释放，因此要先释放之前的堆空间
		if (this->pName != NULL){
			delete[] this->pName;
		}

		this->pName = new char[strlen(person.pName) + 1];
		strcpy(this->pName,person.pName);
		this->mID = person.mID;
		this->mAge = person.mAge;
		return *this;//返回(Person&)person这个实际上更符合整形链式赋值的汇编流程
	}
	//析构函数
	~Person(){
		if (this->pName != NULL){
			delete[] this->pName;
		}
	}
private:
	char* pName;
	int mID;
	int mAge;
};
```

两种调用方式:

1. person1=person2;
2. person1.operator=(person2);

理解链式调用赋值运算符=重载函数

person1=person2=person3;

类比如下代码：

```cpp
int a=3,b,c;
c=b=a;//先把a的值赋给b，再把b的值赋给c,从右向左
```

因此person1=person2=person3;也是先调用person2=person3，然后person1=person3。

**【重点】上面案例代码中对于赋值运算符重载的返回值类型的解读**

#### 下标运算符[]重载

实现访问数组时候利用[]访问元素

必须是成员函数

```cpp
//类内
int& operator[](int index)//返回引用的目的是为了可以返回左值来修改里面的值
{
    return this.pAddress[index];
}
```

#### 关系运算符重载

对于自定义数据类型，编译器不知道如何进行比较

```cpp
//类内
bool operator==(Person& p)
{
    //...
}
bool operator!=(Person& p)
{
    //...
}
//全局省略了，懒得写了
```

#### 函数调用运算符()重载

- 重载()
- 使用时候很像函数调用，因此称为**仿函数**
- 仿函数返回值和参数个数都不固定，很灵活
- **函数调用运算符必须是成员函数**（只有当左操作数是一个基本类型对象时，才重载为全局函数）
- 使用情景：后面STL中大量用到！

```cpp
//类中
T operator()(/*多少个参数都可以*/)
{
    //...
}
```

两种调用方式:

```cpp
对象();
对象.operator()(/* 参数列表 */);
```

**【注意】**

```cpp
cout << MyAdd()(1,1) << endl;//MyAdd()是匿名函数对象,后面的括号表示匿名对象调用函数运算符重载函数  特点：当前行执行完立即释放
```

#### 不要重载&&、||

不能重载operator&& 和 operator|| 的原因是：**无法在这两种情况下实现内置操作符的完整语义。**

 **内置版本版本特殊之处在于**：内置版本的&&和||首先计算左边的表达式，如果这完全能够决定结果，就无需计算右边的表达式了--而且能够保证不需要。我们都已经习惯这种方便的特性了。

内置版本和重载后结果不一致的案例：

```cpp
class Complex{
public:
	Complex(int flag){
		this->flag = flag;
	}
	Complex& operator+=(Complex& complex){
		this->flag = this->flag + complex.flag;
		return *this;
	}
	bool operator&&(Complex& complex){
		return this->flag && complex.flag;
	}
public:
	int flag;
};
int main(){

	Complex complex1(0);  //flag 0 
	Complex complex2(1);  //flag 1

	//原来情况，应该从左往右运算，左边为假，则退出运算，结果为假
	//这边却是，先运算（complex1+complex2），导致，complex1的flag变为complex1+complex2的值， complex1.a = 1
	// 1 && 1
	//complex1.operator&&(complex1.operator+=(complex2))
	if (complex1 && (complex1 += complex2)){   
		cout << "真!" << endl;
	}
	else{
		cout << "假!" << endl;
	}

	return EXIT_SUCCESS;
}
```

根据内置&&的执行顺序，我们发现这个案例中执行顺序并不是从左向右，而是先右后左，这就是不满足我们习惯的特性了。由于complex1 ***+=*** complex2先执行，导致complex1 本身发生了变化，初始值是0，现在经过+=运算变成1,1 && 1输出了真。(内置版本应该输出的是假)

#### 运算符重载总结

- =, [], () 和 -> 操作符只能通过成员函数进行重载 
- << 和 >>只能通过全局函数配合友元函数进行重载 
- 不要重载 && 和 || 操作符，因为无法实现短路规则

常规建议：

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps64.jpg)

##### 附录：运算符和结合性

| ***优先级*** | ***运算符*** | ***名称或含义*** | ***使用形式***           | ***结合方向*** | ***说明*** |
| ------------ | ------------ | ---------------- | ------------------------ | -------------- | ---------- |
| ***1***      | ***[]***     | 数组下标         | 数组名[常量表达式]       | 左到右         | --         |
|              | ***()***     | 圆括号           | (表达式）/函数名(形参表) |                | --         |
|              | ***.***      | 成员选择（对象） | 对象.成员名              |                | --         |
|              | ***->***     | 成员选择（指针） | 对象指针->成员名         |                | --         |
|              |              |                  |                          |                |            |
| ***2***      | ***-***      | 负号运算符       | -表达式                  | 右到左         | 单目运算符 |
|              | ***~***      | 按位取反运算符   | ~表达式                  |                |            |
|              | ***++***     | 自增运算符       | ++变量名/变量名++        |                |            |
|              | ***--***     | 自减运算符       | --变量名/变量名--        |                |            |
|              | *******      | 取值运算符       | *指针变量                |                |            |
|              | ***&***      | 取地址运算符     | &变量名                  |                |            |
|              | ***!***      | 逻辑非运算符     | !表达式                  |                |            |
|              | ***(类型)*** | 强制类型转换     | (数据类型)表达式         |                | --         |
|              | ***sizeof*** | 长度运算符       | sizeof(表达式)           |                | --         |
|              |              |                  |                          |                |            |
| ***3***      | ***/***      | 除               | 表达式/表达式            | 左到右         | 双目运算符 |
|              | *******      | 乘               | 表达式*表达式            |                |            |
|              | ***%***      | 余数（取模）     | 整型表达式%整型表达式    |                |            |
| ***4***      | ***+***      | 加               | 表达式+表达式            | 左到右         | 双目运算符 |
|              | ***-***      | 减               | 表达式-表达式            |                |            |
| ***5***      | ***<<***     | 左移             | 变量<<表达式             | 左到右         | 双目运算符 |
|              | ***>>***     | 右移             | 变量>>表达式             |                |            |
|              |              |                  |                          |                |            |
| ***6***      | ***>***      | 大于             | 表达式>表达式            | 左到右         | 双目运算符 |
|              | ***>=***     | 大于等于         | 表达式>=表达式           |                |            |
|              | ***<***      | 小于             | 表达式<表达式            |                |            |
|              | ***<=***     | 小于等于         | 表达式<=表达式           |                |            |
| ***7***      | ***==***     | 等于             | 表达式==表达式           | 左到右         | 双目运算符 |
|              | ***！=***    | 不等于           | 表达式!= 表达式          |                |            |
|              |              |                  |                          |                |            |
| ***8***      | ***&***      | 按位与           | 表达式&表达式            | 左到右         | 双目运算符 |
| ***9***      | ***^***      | 按位异或         | 表达式^表达式            | 左到右         | 双目运算符 |
| ***10***     | ***\|***     | 按位或           | 表达式\|表达式           | 左到右         | 双目运算符 |
| ***11***     | ***&&***     | 逻辑与           | 表达式&&表达式           | 左到右         | 双目运算符 |
| ***12***     | ***\|\|***   | 逻辑或           | 表达式\|\|表达式         | 左到右         | 双目运算符 |
|              |              |                  |                          |                |            |
| ***13***     | ***?:***     | 条件运算符       | 表达式1?表达式2: 表达式3 | 右到左         | 三目运算符 |
|              |              |                  |                          |                |            |
| ***14***     | ***=***      | 赋值运算符       | 变量=表达式              | 右到左         | --         |
|              | ***/=***     | 除后赋值         | 变量/=表达式             |                | --         |
|              | ***=***      | 乘后赋值         | 变量*=表达式             |                | --         |
|              | ***%=***     | 取模后赋值       | 变量%=表达式             |                | --         |
|              | ***+=***     | 加后赋值         | 变量+=表达式             |                | --         |
|              | ***-=***     | 减后赋值         | 变量-=表达式             |                | --         |
|              | ***<<=***    | 左移后赋值       | 变量<<=表达式            |                | --         |
|              | ***>>=***    | 右移后赋值       | 变量>>=表达式            |                | --         |
|              | ***&=***     | 按位与后赋值     | 变量&=表达式             |                | --         |
|              | ***^=***     | 按位异或后赋值   | 变量^=表达式             |                | --         |
|              | ***\|=***    | 按位或后赋值     | 变量\|=表达式            |                | --         |
|              |              |                  |                          |                |            |
| ***15***     | ***，***     | 逗号运算符       | 表达式,表达式,…          | 左到右         | --         |



### 继承

#### **继承基本概念**

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps27.jpg)

> c++最重要的特征是**代码重用**，通过继承机制可以利用已有的数据类型来定义新的数据类型，新的类不仅拥有旧类的成员，还拥有新定义的成员。
>
> 一个B类继承于A类，或称从类A派生类B。这样的话，类A成为基类（父类）， 类B成为派生类（子类）。

派生类中的**成员，包含两大部分**：

- 一类是**从基类继承**过来的，一类是**自己增加**的成员。
- 从基类继承过过来的表现其**共性**，而新增的成员体现了其**个性**。

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps55.png)

***定义格式：***

```cpp
   Class 派生类名 :  继承方式 基类名{
         //派生类新增的数据成员和成员函数
   }
```

三种继承方式：

- public：公有继承
- private：私有继承
- protected：保护继承

从继承源上分： 

- 单继承：指每个派生类只直接继承了一个基类的特征
- 多继承：指多个基类派生出一个派生类的继承关系,多继承的派生类直接继承了不止一个基类的特征

#### 派生类访问控制

派生类继承基类，**派生类拥有基类中全部成员变量和成员方法（除了构造和析构之外的成员方法）**，但是在派生类中，继承的成员并不一定能直接访问，**不同的继承方式会导致不同的访问权限**。

派生类的访问权限规则如下：

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps75.jpg)![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps128.jpg)

**继承中的对象模型**

- 父类中私有属性，子类是继承下去了，只不过由编译器给隐藏了，访问不到

- 可以利用开发人员工具查看对象模型

  1. vs2015的位置：C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Visual Studio 2015\Visual Studio Tools\VS2015 开发人员命令提示.exe

  2. 跳转到项目路径下

  3. 查看对象模型：cl /d1 reportSingleClassLayout类名 文件名(注意：reportSingleClassLayout和类名之间没有空格)

  4. ```cpp
     class Father
     {
     	int m_A;
     	char m_B;
     };
     
     class Son:public Father
     {
     	int m_C;
     };
     ```

     

  5. ![image-20210118121802527](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210118121802527.png)



#### 继承中的构造和析构

- **先调用父类构造，再调用自身类中其他对象成员构造，再调用自身构造**，析构的顺序与构造相反
- 利用**初始化列表语法，显示调用父类中的其他构造函数**（不用初始化列表显示调用的情况下，系统默认调用无参构造函数）
- 父类中的**构造，析构，拷贝构造，operator=** 不会被子类继承下去的（在继承的过程中，如果没有创建这些函数，编译器会自动生成它们。）

***继承与对象嵌套混搭的构造和析构***

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps36.jpg)



#### 继承中同名成员的处理方法

- 当子类成员和父类成员同名时，子类依然从父类继承同名成员
- 如果子类有成员和父类同名，子类访问其成员默认访问子类的成员(本作用域，**就近原则**)
- 在子类**通过作用域::进行同名成员区分**(在派生类中使用基类的同名成员，显示使用类名限定符)

继承中的同名成员函数要**【注意】**：

**任何时候重新定义基类中的一个重载函数，在子类的父类中所有重载版本都将被自动隐藏**，可以利用作用域显示指定调用

#### 继承中的静态成员特性

处理方式和非静态成员一致

只不过调用方式有两种

1. 通过对象
2. 通过类名（如：Son::Base::m_A,访问子类Son中父类作用域下的m_A静态成员变量）

#### 多继承

我们可以从一个类继承，我们也可以能同时从多个类继承，这就是多继承。但是由于多继承是非常受争议的，从多个类继承可能会导致函数、变量等同名导致较多的歧义。

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps41.jpg)

多继承会带来一些二义性的问题， 如果两个基类中有同名的函数或者变量，那么通过派生类对象去访问这个函数或变量时就不能明确到底调用从基类1继承的版本还是从基类2继承的版本？

解决方法就是显示指定调用那个基类的版本。

#### 菱形继承和虚继承

两个派生类继承同一个基类而又有某个类同时继承者两个派生类，这种继承被称为菱形继承，或者钻石型继承。

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps63.png)

这种继承所带来的问题：草泥马继承自动物的函数和数据**继承了两份**，其实我们应该清楚，这份数据我们**只需要一份**就可以，并且还伴随二义性问题。

对于这种菱形继承所带来的两个问题，c++为我们提供了一种方式，采用**虚基类**。

**作用：**编译器帮我们做了一些幕后工作，使得这种菱形问题在继承时候能**只继承一份数据**，并且也解决了二义性的问题。使模型变成了Base1和 Base2 Derived三个类对象共享了一份BigBase数据。

##### 虚继承实现原理

```cpp
class BigBase {
public:
	BigBase() { mParam = 0; }
	void func() { cout << "BigBase::func" << endl; }
public: int mParam;
};
#if 0 //虚继承
class Base1 : virtual public BigBase {};
class Base2 : virtual public BigBase {};
#else //普通继承
class Base1 : public BigBase {};
class Base2 : public BigBase {};
#endif
class Derived : public Base1, public Base2 {};
```

结果如下：

|           | 普通继承                                                     | 虚继承                                                       |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| BigBase： | ![image-20210119112607731](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210119112607731.png) | ![image-20210119112604027](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210119112604027.png) |
| Base1：   | ![image-20210119112457172](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210119112457172.png) | ![image-20210119112527908](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210119112527908.png) |
| Base2：   | ![image-20210119112436034](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210119112436034.png) | ![image-20210119112410840](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210119112410840.png) |
| Derived： | ![image-20210119112255936](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210119112255936.png) | ![image-20210119112329474](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210119112329474.png) |

- BigBase 菱形最顶层的类，内存布局图没有发生改变。
- Base1和Base2通过虚继承的方式派生自BigBase,这两个对象的布局图中可以看出编译器为我们的对象中增加了一个vbptr (virtual base pointer),vbptr指向了一张表，这张表保存了当前的虚指针相对于虚基类的首地址的偏移量。
- Derived派生于Base1和Base2,继承了两个基类的vbptr指针，并调整了vbptr与虚基类的首地址的偏移量。

当使用虚继承时，在继承体系中无论被继承多少次，**对象内存模型中均只会出现一个虚基类的子对象**（这和多继承是完全不同的）

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120153202392.png" alt="image-20210120153202392" style="zoom: 67%;" />

D的存储结构：

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120153036533.png" alt="image-20210120153036533" style="zoom:50%;" />

指针访问Derived类中Base2虚表中的偏移量4，代码如下:

```cpp
Derived d;
cout<<*((int*)*((int*)&d+1)+1)<<endl;
```

![image-20210119115528168](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210119115528168.png)

虚继承只能解决具备公共祖先的多继承所带来的二义性问题，不能解决没有公共祖先的多继承的.

工程开发中真正意义上的多继承是几乎不被使用，因为**多重继承带来的代码复杂性远多于其带来的便利**，**多重继承对代码维护性上的影响是灾难性的**，在设计方法上，**任何多继承都可以用单继承代替**。

##### 虚基类的构造函数

**最派生类**：继承结构中建立对象时所指定的类；

最派生类的构造函数的成员**初始化列表中必须给出对虚基类的构造函数的调用**，如果未列出，则相应的虚基类**必须有缺省构造函数**；

若A是虚基类,且没有缺省构造函数，则必须如下写明A()初始化列表

![image-20210120154101261](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120154101261.png)

p.s.如果不是虚基类，调用父类非默认构造函数只需要传入父类，而如果祖先中有虚基类，那么初始化列表中必须有虚基类。

单个虚基类的案例：

```cpp
class A
{
public:
	A(int a)
	{
		this->a = a;
		cout<<"A构造函数"<<endl;
	}
	int a;
};

class B: virtual public A
{
public:
	B(int a,int b):A(a)
	{
		this->b = b;
		cout<<"B构造函数"<<endl;
	}
	int b;
};

class C : virtual public A
{
public:
	C(int a, int c) :A(a)
	{
		this->c = c;
		cout << "C构造函数" << endl;
	}
	int c;
};

class DD : public C,public B
{
public:
	DD(int a,int b,int c,int d) :B(a,b), C(a,c),A(a)
	{
		this->c = c;
		cout << "DD构造函数" << endl;
	}
	int d;
};

int main() {
	DD d(1, 2, 3, 4);
	return 0;
}
```

输出结果为：

![image-20210120160100338](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120160100338.png)

p.s.**虚基类构造函数永远先于非虚基类构造函数执行**

d对象的内存布局图如下：

![image-20210120160156859](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120160156859.png)

多个虚基类案例：

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120161329374.png" style="zoom: 67%;" />

```cpp
class A
{
public:
	A(int a)
	{
		this->a = a;
		cout<<"A构造函数"<<endl;
	}
	int a;
};

class B: virtual public A
{
public:
	B(int a,int b):A(a)
	{
		this->b = b;
		cout<<"B构造函数"<<endl;
	}
	int b;
};

class C : virtual public A
{
public:
	C(int a, int c) :A(a)
	{
		this->c = c;
		cout << "C构造函数" << endl;
	}
	int c;
};

class DD : public C,virtual public B
{
public:
	DD(int a,int b,int c,int d) :B(a, b),C(a, c),A(a)
	{
		this->c = c;
		cout << "DD构造函数" << endl;
	}
	int d;
};

class EE :virtual public B
{
public:
	EE(int a, int b, int e) :B(a, b), A(a)
	{
		this->e = e;
		cout << "EE构造函数" << endl;
	}
	int e;
};
class FF :public EE, public DD
{
public:

	FF(int a, int b, int e, int d,int f):A(a),B(a,b),EE(a,b,e),DD(a,b,c,d)//有多个虚基类，则多个虚基类都要写进初始化列表，除非有缺省构造函数
	{
		this->f = f;
		cout << "FF构造函数" << endl;
	}
	int f;
};
int main() {
	FF f(1, 2, 3, 4,5);
	return 0;
}
```

![image-20210120161412297](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120161412297.png)

内存布局分析：

![image-20210120164422842](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120164422842.png)

`因开发人员命令提示工具问题，单字母类名与多同字母类名同等看待`

| 类名 |                           内存布局                           |
| :--: | :----------------------------------------------------------: |
| AAA  | ![image-20210120164914264](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120164914264.png) |
|  BB  | ![image-20210120164927251](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120164927251.png) |
|  CC  | ![image-20210120164944123](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120164944123.png) |
|  DD  | ![image-20210120165007699](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120165007699.png) |
|  EE  | ![image-20210120165156147](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120165156147.png) |
|  FF  | ![image-20210120165232831](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120165232831.png) |



### 多态

**多态**是面向对象程序设计语言中**数据抽象**和**继承**之外的**第三个基本特征**。

**多态性**(polymorphism)提供**接口与具体实现之间**的另一层**隔离**

![image-20210120170500049](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120170500049.png)

静态多态：运算符重载和函数重载

动态多态条件：

1. 先有继承关系
2. 父类中有虚函数，子类重写父类中的虚函数
3. 父类的指针或引用指向子类的对象

静态多态和动态多态的区别：就是函数地址是早绑定(**静态联编**)还是晚绑定(**动态联编**)。

> 如果函数的调用，在编译阶段就可以确定函数的调用地址，并产生代码，就是静态多态(编译时多态)，就是说地址是早绑定的。而如果函数的调用地址不能编译不能在编译期间确定，而需要在运行时才能决定，这这就属于晚绑定(动态多态,运行时多态)。

**重写(覆盖)**：是指**派生类中存在重新定义的函数**。其函数名，参数列表，返回值类型，所有都必须同基类中被重写的函数一致。**只有函数体不同**（花括号内），派生类调用时会调用派生类的重写函数，不会调用被重写函数。**重写的基类中被重写的函数必须有virtual修饰**。

动态多态案例：

```cpp
class Animal
{
public:
	virtual void sleep()//虚函数，代表其可被子类重写实现运行时多态
	{
		cout<<"动物在睡觉"<<endl;
	}
};

class Cat:public Animal
{
public:
	void sleep()//重写父类函数
	{
		cout << "猫猫在睡觉" << endl;
	}
};

class Dog :public Animal
{
public:
	void sleep()//重写父类函数
	{
		cout << "狗狗在睡觉" << endl;
	}
};

void Sleep(Animal& animal)//重载
{
	animal.sleep();
}

int main() {
	Animal a;
	Dog d;
	Cat c;
	Sleep(a);
	Sleep(d);
	Sleep(c);
	return 0;
}
```

![image-20210120172342123](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120172342123.png)

若把Animal类中sleep函数前的virtual去掉，结果如下：

![image-20210120172425758](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120172425758.png)

则不能实现运行时多态

#### 动态多态原理

##### 原理详解

###### 向上类型转换及问题

***若上面代码未用虚函数，则运行结果如上图***

***问题抛出:*** 我们给Sleep函数传入的对象是dog和cat，输出的结果却是动物在睡觉。

把函数体与函数调用相联系称为**绑定**(捆绑，binding)

`当绑定在程序运行之前(由编译器和连接器)完成时，称为**早绑定(early binding).**C语言中只有一种函数调用方式，就是早绑定。`

上面的问题就是由于早绑定引起的，因为编译器在只有Animal地址时并不知道要调用的正确函数。编译***是根据指向对象的指针或引用的类型***来选择函数调用。这个时候由于sleep的参数类型是Animal&,编译器确定了应该调用的sleep是Animal::sleep的，而不是真正传入的对象Dog::sleep。

------

***分割线中小插曲***

> p.s.C++允许用父类的指针或引用指向子类的对象，但不强制类型转换的情况下，父类指针或引用是访问不到子类新增的成员的（编译器决定）

```cpp
class MyClass
{
public:
	int var;
	virtual void fun() {};
};

class MyClassA:public MyClass
{
public:
	int varA;
	virtual void fun() {};
	virtual void funA() {};
};
```

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210121154910794.png" alt="image-20210121154910794" style="zoom:80%;" /><img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210121155023822.png" alt="image-20210121155023822" style="zoom: 80%;" />

> 任何妄图使用父类指针或引用想调用子类中的未覆盖父类的成员函数的行为均被编译器视为非法，但实际上可以通过指针的方式间接访问虚函数表来达到违反C++语义的行为

------

解决上面的问题的方法就是**迟绑定**(迟捆绑,动态绑定,运行时绑定，late binding),意味着绑定要根据对象的实际类型，发生在运行。

###### 迟绑定实现方案原理

对于特定的函数进行动态绑定，c++要求在基类中声明这个函数的时候使用virtual关键字,**动态绑定也就对virtual函数起作用.**

- 为创建一个需要动态绑定的虚成员函数，可以简单在这个函数声明前面加上virtual关键字，**定义时候不需要**.
- 如果一个函数在基类中被声明为virtual，那么在所有派生类中它都是virtual的.
- 在派生类中virtual函数的**重定义**称为**重写**(override).
- Virtual关键字只能修饰成员函数.
- **构造函数不能为虚函数**

***注意：***可以在派生类声明前使用关键字virtual(这也是无害的,建议加上,让人一看代码就知道这个函数是对父类函数进行重写的)

> 首先，我们看看编译器如何处理虚函数。当编译器发现我们的类中有虚函数的时候，编译器会创建一张虚函数表，把虚函数的函数入口地址放到虚函数表中，并且在类中秘密增加一个指针，这个指针就是vpointer(缩写vptr)，这个指针是指向对象的虚函数表。在多态调用的时候，根据vptr指针，找到虚函数表来实现动态绑定。
>
> 在编译阶段，编译器秘密增加了一个vptr指针，但是此时vptr指针并没有初始化指向虚函数表(vtable),什么时候vptr才会指向虚函数表？在对象构建的时候，也就是在对象初始化调用构造函数的时候。编译器首先默认会在我们所编写的每一个构造函数中，增加一些vptr指针初始化的代码。如果没有提供构造函数，编译器会提供默认的构造函数，那么就会在默认构造函数里做此项工作，初始化vptr指针，使之指向本对象的虚函数表。
>
> 起初，子类继承基类，子类继承了基类的vptr指针，这个vptr指针是指向基类虚函数表，当子类调用构造函数，使得子类的vptr指针指向了子类的虚函数表。

当子类无重写基类虚函数时:

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps56.png)<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/wps58.jpg" alt="img" style="zoom:67%;" />

当子类重写基类虚函数时:

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps193.png)<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/wps88.jpg" alt="img" style="zoom:67%;" />

没用虚函数的情况：

```cpp
class A
{
 public:
 	void Test(){cout<<"A \n"<<endl;}   
    void Test1(){cout<<"A1 \n"<<endl;}   
};
class B:public A
{
 public:
    void Test(){cout<<"B \n"<<endl;}   
    void Test1(){cout<<"B1 \n"<<endl;}   
};
void Fun(A* p)
{
    p->Test1();
    //mov ecx,[ebp+8]     //fun第一个参数（实际上是对象b的首地址）传进ecx作为this指针
    //call 08314B5h(A::Test1)    //因此调用的永远是A::Test1()
}
void main()
{
    B b;
    Fun(&b);//传参：对象b的首地址
}
```

使用虚函数的情况：

```cpp
class A
{
 public:
 	virtual void Test(){cout<<"A \n"<<endl;}   
    virtual void Test1(){cout<<"A1 \n"<<endl;}   
};
class B:public A
{
 public:
    virtual void Test(){cout<<"B \n"<<endl;}   
    virtual void Test1(){cout<<"B1 \n"<<endl;}   
};
void Fun(A* p)
{
    p->Test1();
    //mov eax,dword ptr [ebp+8]  //将第一个参数（即b对象首地址）放进eax
	//mov edx,dword ptr [eax]    //将对象首地址指向的第一个成员（即b对应的虚函数表首地址）放进edx中
	//mov ecx,dword ptr [ebp+8]  //将b对象首地址放进ecx作为this指针
	//mov eax,dword ptr [edx+4]  //将虚函数表首地址+4中存的Test1()函数地址放进eax中
	//call eax  			    //所以调用的函数实现了运行时多态

}
void main()
{
    B b;
    Fun(&b);//传参：对象b的首地址
}
```







#### 内存布局详解

- 当父类写了虚函数后，类内部的结构发生了改变，多了**vfptr（虚函数表指针），指向vftable（虚函数表）**
- 虚函数表内部记录着**虚函数的入口地址**
- 当父类指针或引用指向子类对象，发生多态，调用的时候是从虚函数表中找函数入口地址

加了虚函数指针后，内存布局：

上面运行多态

|  类名  |                         对象内存布局                         |
| :----: | :----------------------------------------------------------: |
| Animal | ![image-20210120174254340](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120174254340.png) |
|  Cat   | ![image-20210120174344137](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120174344137.png) |
|  Dog   | ![image-20210120174326827](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120174326827.png) |

案例中用父类指针手动调用子类函数

```cpp
Dog d;
Animal* p = &d;
((void(*)())*(int*)*(int*)(p))();
//((void(*)())*(int*)*(int*)(&d))();//一样
//***注意***函数指针也要必须调用约定一致才可成功，此处成功只是刚好一致而已。
//形如如下的指定了调用约定的函数指针变量
//int (__cdecl *pFun)(int,int);
```

![image-20210120175133996](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120175133996.png)

![image-20210120175103635](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120175103635.png)

##### 单继承中虚函数

在单继承形式下，子类的完全获得父类的虚函数表和数据。子类如果重写了父类的虚函数（如fun），就会把虚函数表原本fun对应的记录（内容MyClass::fun）覆盖为新的函数地址（内容MyClassA::fun），否则继续保持原本的函数地址记录。如果子类定义了新的虚函数，虚函数表内会追加一条记录，记录该函数的地址（如MyClassA::funA）。

```cpp
class Animal
{
public:
	virtual void sleep()
	{
		cout<<"动物在睡觉"<<endl;
	}
	virtual void play()
	{
		cout << "动物在玩耍" << endl;
	}
};

class Cat:public Animal
{
public:
	void sleep()//重写父类函数
	{
		cout << "猫猫在睡觉" << endl;
	}
	virtual void doSomething()//Cat新增的虚函数
	{
		cout<<"猫猫在做某事"<<endl;
	}
};
```

|  类名  |                           内存布局                           |
| :----: | :----------------------------------------------------------: |
| Animal | ![image-20210120222934600](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120222934600.png) |
|  Cat   | ![image-20210120224045504](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120224045504.png) |

```cpp
MyClass*pc=new MyClassA;
pc->fun();//2
```

编译器在处理第二条语句时，发现这是一个多态的调用，那么就会按照如下对虚函数的多态访问机制调用函数fun。
$$
*(this指针+调整量)[虚函数在vftable内的偏移]()
$$

##### 多重继承中的虚函数

```cpp
class MyClass
{
	int var;
	virtual void fun() {};
};

class MyClassA:public MyClass
{
	int varA;
	virtual void fun() {};
	virtual void funA() {};
};

class MyClassB:public MyClass
{
	int varB;
	virtual void fun() {};
	virtual void funB() {};
};

class MyClassC :public MyClassB, public MyClassA
{
	int varC;
	virtual void funB() {};
	virtual void funC() {};
};
```

图解上面代码：

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120230828691.png" alt="image-20210120230828691" style="zoom:80%;" />

MyClassC对象空间布局如下：

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120231043689.png" alt="image-20210120231043689" style="zoom:80%;" />![image-20210120231101348](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120231101348.png)

【重点解读】

和单重继承类似，多重继承时MyClassC会把**所有的父类全部按序包含在自身内部**。而且**每一个父类都对应一个单独的虚函数表**。

**多重继承下，子类不再具有自身的虚函数表，它的虚函数表与第一个父类的虚函数表合并了**。同样的，如果子类重写了任意父类的虚函数，都会覆盖对应的函数地址记录。**如果MyClassC重写了fun函数（两个父类都有该函数），那么两个虚函数表的记录都需要被覆盖**！

------

##### 多重继承中同时存在虚继承和虚函数

上面案例修改为如下：

```cpp
class MyClassA:virtual public MyClass
class MyClassB:virtual public MyClass
class MyClassC:public MyClassA,public MyClassB

//由于虚继承的本身语义，MyClassC内必须重写fun函数，因此我们需要再重写fun函数。
```

虚继承的引入把对象的模型变得十分复杂，除了每个基类（MyClassA和MyClassB）和公共基类（MyClass）的虚函数表指针需要记录外，每个虚拟继承了MyClass的父类还需要记录一个虚基类表vbtable的指针vbptr。

![image-20210120233032009](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120233032009.png)![image-20210120234600438](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210120234600438.png)



虚基类表每项记录了**被继承的虚基类子对象相对于虚基类表指针的偏移量**。比如MyClassA的虚基类表第二项记录值为24，正是MyClass::vfptr相对于MyClassA::vbptr的偏移量，同理MyClassB的虚基类表第二项记录值12也正是MyClass::vfptr相对于MyClassA::vbptr的偏移量。

和虚函数表不同的是，**虚基类表的第一项记录着当前子对象相对与虚基类表指针的偏移**。MyClassA和MyClassB子对象内的虚表指针都是存储在相对于自身的4字节偏移处，因此该值是-4。假定MyClassA和MyClassC或者MyClassB内没有定义新的虚函数，即不会产生虚函数表，那么虚基类表第一项字段的值应该是0。

通过以上的对象组织形式，编译器解决了公共虚基类的多份拷贝的问题。通过每个父类的虚基类表指针，都能找到被公共使用的虚基类的子对象的位置，并依次访问虚基类子对象的数据。至于虚基类定义的虚函数，它和其他的虚函数的访问形式相同，本例中，如果使用虚基类指针MyClass*pc访问MyClassC对象的fun，将会被转化为如下形式：
$$
*(pc+28)[0]()
$$
通过以上的描述，我们基本认清了C++的对象模型。尤其是在多重、虚拟继承下的复杂结构。通过这些真实的例子，使得我们认清C++内class的本质

【注意】

指针的位置和基类成员在派生类成员中的内存布局是不确定的，也就是说标准里面没有规定int a必须要放在最后，只不过g++编译器的实现而已。**c++标准大概只规定了这套机制的原理，至于具体的实现，比如各成员的排放顺序和优化，由各个编译器厂商自己定**

###### 多继承中的虚表内存布局

1. 当有多个虚函数表时，虚函数表的结果是0，代表没有下一个虚函数表
2. 非末尾的其他虚函数表由什么代表结束在不同操作系统中不一样，代表有下一个虚函数表
3. 父类中没有，而子类中有的虚函数，都填入第一个虚函数表中

【注意】vs在打印对象虚函数表的时候，只打印最上层基类声明的虚函数。

即，虚函数表显示不全，需要用监视或内存窗口手动显示虚表的所有内容



#### 多态的实际开发意义

- 多态的好处
  1. 代码可读性强
  2. 组织结构清晰
  3. 扩展性强

面向对象程序设计原则**【开闭原则】**：对扩展进行开放，对修改进行关闭

解释：**开闭原则**含义是说一个软件实体应该通过扩展来实现变化，而不是通过修改已有的代码来实现变化的。

原因：没有修改底层模块，代码改变量少，可以有效的防止风险的扩散。

开闭原则实现方法就是**多态**

- 开闭原则的好处：
  1. 提高复用性
  2. 提高维护性
  3. 提高拓展性

未采用开闭原则案例：

```cpp
//计算器
class Caculator{
public:
	void setA(int a){
		this->mA = a;
	}
	void setB(int b){
		this->mB = b;
	}
	void setOperator(string oper){
		this->mOperator = oper;
	}
	int getResult(){
		
		if (this->mOperator == "+"){
			return mA + mB;
		}
		else if (this->mOperator == "-"){
			return mA - mB;
		}
		else if (this->mOperator == "*"){
			return mA * mB;
		}
		else if (this->mOperator == "/"){
			return mA / mB;
		}
	}
private:
	int mA;
	int mB;
	string mOperator;
};
```

这种程序不利于扩展，维护困难，如果修改功能或者扩展功能需要在源代码基础上修改

面向对象程序设计一个基本原则:开闭原则(对修改关闭，对扩展开放)

```cpp
//抽象基类
class AbstractCaculator{
public:
	void setA(int a){
		this->mA = a;
	}
	virtual void setB(int b){
		this->mB = b;
	}
	virtual int getResult() = 0;
protected:
	int mA;
	int mB;
	string mOperator;
};

//加法计算器
class PlusCaculator : public AbstractCaculator{
public:
	virtual int getResult(){
		return mA + mB;
	}
};

//减法计算器
class MinusCaculator : public AbstractCaculator{
public:
	virtual int getResult(){
		return mA - mB;
	}
};

//乘法计算器
class MultipliesCaculator : public AbstractCaculator{
public:
	virtual int getResult(){
		return mA * mB;
	}
};

void DoBussiness(AbstractCaculator* caculator){
	int a = 10;
	int b = 20;
	caculator->setA(a);
	caculator->setB(b);
	cout << "计算结果：" << caculator->getResult() << endl;
	delete caculator;
}
```

多态的案例：

```cpp
class Cpu
{
public:
	virtual void work()=0;
};

class Gpu
{
public:
	virtual void work() = 0;
};
class Memory
{
public:
	virtual void work() = 0;
};

class Computer
{
	Cpu* cpu;
	Gpu* gpu;
	Memory* mem;
public:
	Computer(Cpu* c, Gpu* g, Memory* m) :cpu(c), gpu(g), mem(m)
	{

	}
	void doWork()
	{
		cpu->work();
		gpu->work();
		mem->work();
	}
	~Computer()
	{
		if (cpu)
		{
			delete cpu;
			cpu = NULL;
		}
		if (gpu)
		{
			delete gpu;
			gpu = NULL;
		}
		if (mem)
		{
			delete mem;
			mem = NULL;
		}
	}
};
class 华硕cpu:public Cpu
{
	void work()
	{
		cout<<"华硕处理器已就绪"<<endl;
	}
};

class GTX1080:public Gpu
{
	void work()
	{
		cout<<"GTX1080显卡已就绪"<<endl;
	}
};

class 金士顿内存条 :public Memory
{
	void work()
	{
		cout<<"金士顿内存条已就绪"<<endl;
	}
};

void main()
{
	华硕cpu* pcpu=new 华硕cpu;
	GTX1080* pgpu=new GTX1080;
	金士顿内存条* pmem=new 金士顿内存条;
	Computer myComputer(pcpu, pgpu, pmem);
	myComputer.doWork();
}
```



#### 纯虚函数和抽象类

> 在设计时，常常希望基类仅仅作为其派生类的一个接口。这就是说，仅想对基类进行向上类型转换，使用它的接口，而**不希望用户实际的创建一个基类的对象**。同时创建一个纯虚函数允许接口中放置成员原函数，而不一定要提供一段可能对这个函数毫无意义的代码。

为了上面的目的，可以在基类中加入至少一个纯虚函数(pure virtual function),使得基类称为抽象类(abstract class).

- 纯虚函数使用关键字virtual，并在其后面加上=0。**如果试图去实例化一个抽象类，编译器则会阻止这种操作。**

  ```cpp
  virtual 返回类型 函数名()=0;
  ```

- 当**继承一个抽象类的时候，必须实现所有的纯虚函数，否则由抽象类派生的类也是一个抽象类**。

- Virtual void fun() = 0;告诉编译器在vftable中为函数保留一个位置，但在**这个特定位置不放地址**。

**建立公共接口目的**是为了将子类公共的操作抽象出来，可以**通过一个公共接口来操纵一组类，且这个公共接口不需要事先实现**(或者不需要完全实现)。

案例如下：

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps25.jpg)

```cpp
//抽象制作饮品
class AbstractDrinking{
public:
	//烧水
	virtual void Boil() = 0;
	//冲泡
	virtual void Brew() = 0;
	//倒入杯中
	virtual void PourInCup() = 0;
	//加入辅料
	virtual void PutSomething() = 0;
	//规定流程
	void MakeDrink(){
		Boil();
		Brew();
		PourInCup();
		PutSomething();
	}
};

//制作咖啡
class Coffee : public AbstractDrinking{
public:
	//烧水
	virtual void Boil(){
		cout << "煮农夫山泉!" << endl;
	}
	//冲泡
	virtual void Brew(){
		cout << "冲泡咖啡!" << endl;
	}
	//倒入杯中
	virtual void PourInCup(){
		cout << "将咖啡倒入杯中!" << endl;
	}
	//加入辅料
	virtual void PutSomething(){
		cout << "加入牛奶!" << endl;
	}
};

//制作茶水
class Tea : public AbstractDrinking{
public:
	//烧水
	virtual void Boil(){
		cout << "煮自来水!" << endl;
	}
	//冲泡
	virtual void Brew(){
		cout << "冲泡茶叶!" << endl;
	}
	//倒入杯中
	virtual void PourInCup(){
		cout << "将茶水倒入杯中!" << endl;
	}
	//加入辅料
	virtual void PutSomething(){
		cout << "加入食盐!" << endl;
	}
};

//业务函数
void DoBussiness(AbstractDrinking* drink){
	drink->MakeDrink();
	delete drink;
}

void test(){
	DoBussiness(new Coffee);
	cout << "--------------" << endl;
	DoBussiness(new Tea);
}
```

###### 纯虚函数和多继承

多继承带来了一些争议，但是接口继承可以说一种毫无争议的运用了。

**绝大数面向对象语言都不支持多继承，但是绝大数面向对象对象语言都支持接口的概念**，c++中没有接口的概念，但是可以**通过纯虚函数实现接口**。
$$
接口类中只有函数原型定义，没有任何数据定义。
$$
多重继承接口不会带来二义性和复杂性问题。接口类只是一个功能声明，并不是功能实现，子类需要根据功能说明定义功能实现。

#### 虚析构和纯虚析构

**虚析构函数和纯虚构函数**都是为了解决[基类](http://baike.baidu.com/view/535539.htm)的[指针](http://baike.baidu.com/view/159417.htm)指向派生类对象，并用基类的指针删除派生类对象产生的“只调用了基类的析构函数而没有调用派生类的析构函数”的问题

```cpp
#include <iostream>
using namespace std;

class A
{
private:
    /* data */
public:
    A(/* args */)
    {
        std::cout << "A 构造" << std::endl;
    }
    ~A()
    {
        std::cout << "A 析构" << std::endl;
    }
};

class B : public A
{
private:
    /* data */
public:
    B(/* args */)
    {
        std::cout << "B 构造" << std::endl;
    }
    ~B()
    {
        std::cout << "B 析构" << std::endl;
    }
};

int main(int argc, char *argv[])
{
    A *a = new B;
    delete a;
    return 0;
}
```

返回结果为:

```
A 构造
B 构造
A 析构
//可见:只调用了基类的析构函数而没有调用派生类的析构函数
```

如果在A的析构函数定义前加virtual,结果为

```
A 构造
B 构造
B 析构
A 析构
```

**纯虚析构函数**

纯虚析构函数在c++中是合法的，但是在使用的时候有一个额外的限制：**必须在类外为纯虚析构函数提供一个函数体**。

```cpp
//非纯虚析构函数
class A{
public:
	virtual ~A();
};

A::~A(){}//类内与类外定义都行

//纯析构函数
class B{
public:
	virtual ~B() = 0;
};

B::~B(){}

void test(){
	A a; //A类不是抽象类，可以实例化对象
	B b; //B类是抽象类，不可以实例化对象
}
```

![image-20210121171549279](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210121171549279.png)

如果类的目的不是为了实现多态，作为基类来使用，就不要声明虚析构函数，反之，则应该为类声明虚析构函数。

#### 重写 重载 重定义 区别

- 重载，同一作用域的同名函数
  1. 同一个作用域
  2. 参数个数，参数顺序，参数类型不同
  3. 和函数返回值，没有关系
  4. const也可以作为重载条件  //do(const Teacher& t){}  do(Teacher& t)
- 重定义（隐藏）
  1. 有继承
  2. 子类（派生类）重新定义父类（基类）的同名成员（非virtual函数）
  3. 子类隐藏父类所有同名重载函数，可以用作用域显式调用
- 重写（覆盖）
  1. 有继承
  2. 子类（派生类）重写父类（基类）的virtual函数
  3. 函数返回值，函数名字，函数参数，必须和基类中的虚函数一致

## 模板

### 函数模板

c++提供了函数模板(function template.)所谓函数模板，***实际上是建立一个通用函数，其函数类型和形参类型不具体制定，用一个虚拟的类型来代表。这个通用函数就成为函数模板。***凡是函数体相同的函数都可以用这个模板代替，不必定义多个函数，只需在模板中定义一次即可。在调用函数时系统会根据实参的类型来取代模板中的虚拟类型，从而实现不同函数的功能。

- c++提供两种模板机制:***函数模板***和***类模板***

$$
模板用于表达逻辑结构相同，但具体数据元素类型不同的数据对象的通用行为
$$

目的：***用模板是为了实现泛型，可以减轻编程的工作量，增强函数的重用性。***

- 格式：

  ```cpp
  template<typename T>
  template<class T>//上下两种完全一样，T是自定义通用数据类型名称
  ```

- 两种使用方式:
  1. **自动类型推导**  ---  通过参数必须要推导出一致的T才可以使用
  2. **显示指定类型**  ---  mySwap\<int>(a,b);

下面是实现对通用基本数据类型数组进行排序的案例：

```cpp
//通用模板实现数据交换
template<class T >
void mySwap(T& a,T& b)
{
	T temp = a;
	a = b;
	b = temp;
}


//模板实现通用类型快速排序方法(由小到大)
template<class T >
void sort(T array[], int length)
{
	for (int i = 0; i < length; i++)
	{
		int min = i;
		for (int j = i+1; j < length; j++)
		{
			if (array[j]<array[min])
			{
				min = j;
			}
		}
		if (i!=min)
		{
			mySwap(array[i], array[min]);
		}
	}
}
```

#### 函数模板和普通函数区别

- 函数模板**如果使用自动类型推导，是不可以发生隐式类型转换的**，可以使用显示指定类型方式调用函数模板，此时可以发生隐式类型转换
- 普通函数，可以发生隐式类型转换

```cpp
//函数模板
template<class T>
T MyPlus(T a, T b){
	T ret = a + b;
	return ret;
}

//普通函数
int MyPlus(int a,char b){
	int ret = a + b;
	return ret;
}

void test02(){

	int a = 10;
	char b = 'a';

	//调用函数模板，严格匹配类型
	MyPlus(a, a);
	MyPlus(b, b);
	//调用普通函数
	MyPlus(a, b);
	//调用普通函数  普通函数可以隐式类型转换
	MyPlus(b, a);

	//结论：
	//函数模板如果使用自动类型推导，不允许自动类型转换，必须严格匹配类型
	//普通函数可以进行自动类型转换
}
```

#### 函数模板和普通函数的调用规则

- 若函数模板和普通函数都可以调用，那么**优先调用普通函数**，若想强制调用函数模板，可以使用**空模板**参数列表

  ```cpp
  myPrint<>(a,b);//空模板
  ```

- 函数模板也可以发生重载（肯定呀，本质上就是编译器帮你把所有用到的各种类型都写了)

- 若函数模板**能产生更好的匹配（不用隐式转换的情况），那么优先使用函数模板**

```cpp
//函数模板
template<class T>
T MyPlus(T a, T b){
	T ret = a + b;
	return ret;
}

//普通函数
int MyPlus(int a, int b){
	int ret = a + b;
	return ret;
}

void test03(){
	int a = 10;
	int b = 20;
	char c = 'a';
	char d = 'b';
	//如果函数模板和普通函数都能匹配，c++编译器优先考虑普通函数
	cout << MyPlus(a, b) << endl;
	//如果我必须要调用函数模板,那么怎么办?
	cout << MyPlus<>(a, b) << endl;
	//此时普通函数也可以匹配，因为普通函数可以自动类型转换
	//但是此时函数模板能够有更好的匹配
	//如果函数模板可以产生一个更好的匹配，那么选择模板
	cout << MyPlus(c,d);
}

//函数模板重载
template<class T>
T MyPlus(T a, T b, T c){
	T ret = a + b + c;
	return ret;
}

void test04(){

	int a = 10;
	int b = 20;
	int c = 30;
	cout << MyPlus(a, b, c) << endl;
	//如果函数模板和普通函数都能匹配，c++编译器优先考虑普通函数
}
```

#### 函数模板机制原理剖析

***函数模板机制结论：***

- 编译器并不是把函数模板处理成能够处理任何类型的函数,只是基本数据类型
- 函数模板通过具体类型产生不同的函数
- **两次编译，在声明的地方对模板代码本身进行编译(语法检测)，在调用的地方对参数替换后的代码进行编译（产生不同的函数）**（这也就是模板的分文件特殊化的原因）

#### 函数模板具体化

上面提到模板并不是真实的通用，对于自定义的数据类型，可以使用具体化技术，实现对自定义数据类型的特殊使用。

格式如下：

```cpp
template<> bool myCompare(Person &a,Person &b);
```

案例：

```cpp
class Person
{
public:
	Person(string name, int age)
	{
		this->mName = name;
		this->mAge = age;
	}
	string mName;
	int mAge;
};

//普通交换函数
template <class T>
void mySwap(T &a,T &b)
{
	T temp = a;
	a = b; 
	b = temp;
}
//第三代具体化，显示具体化的原型和定意思以template<>开头，并通过名称来指出类型
//具体化优先于常规模板
template<>void  mySwap<Person>(Person &p1, Person &p2)
{
	string nameTemp;
	int ageTemp;

	nameTemp = p1.mName;
	p1.mName = p2.mName;
	p2.mName = nameTemp;

	ageTemp = p1.mAge;
	p1.mAge = p2.mAge;
	p2.mAge = ageTemp;

}
```

[成员模板函数不能为虚函数，同时也不能有默认参数](https://www.cnblogs.com/yyxt/p/5090942.html)

函数模板的分文件编写与类模板分文件编写一致，参考下面类模板分文件编写章节

### 类模板

- 类模板和函数模板的区别

  1. 类模板不可以使用自动类型推导，**只能用显示指定类型**

     ```cpp
     Person<string,int> p;
     //Person p;//错误
     ```

  2. 类模板中，**可以有默认参数**（函数模板不可以有）

     ```cpp
     template<class T,class T2=int>
     ```

**类模板中的成员函数，并不是一开始就创建的，而是在运行阶段确定出T的数据类型才去创建**

```cpp
class AA
{
public:
	void doSomething1()
	{
		cout<<"我是aa"<<endl;
	}
};

class BB
{
public:
	void doSomething2()
	{
		cout << "我是bb" << endl;
	}
};

template<class T>
class Test
{
public:
	T t;
	void fun1()
	{
		t.doSomething1();
	}
	void fun2()
	{
		t.doSomething2();
	}
};


void main()
{
	Test<BB> t;
	//t.fun1();//有这句话才报错
	t.fun2();
	Test<AA> t2;
	t2.fun1();
	//t2.fun2();//有这句话才报错
    //因此类模板中的成员函数，并不是一开始就创建的，而是在运行阶段确定出T的数据类型才去创建，此时有问题才报错。
}
```

#### 类模板做函数参数

- 三种方式
  1. 指定传入类型

  2. 参数模板化
  3. 整个类模板化

```cpp
  template<class T1,class T2>
  class Test
  {
  public:
  	T1 t1;
  	T2 t2;
  	Test(T1 t1,T2 t2)
  	{
  		this->t1 = t1;
  		this->t2 = t2;
  	}
  	void doWork()
  	{
  		cout<<"T1类型为"<<typeid(T1).name()<< endl; //typeid(T1).name()查看T1的数据类型	
           cout <<"T2类型为"<<typeid(T2).name() <<endl;
  	}
  };
  
  
  void fun1(Test<string,int> &t)//指定函数参数的传入类型，要求传入的参数必须是Test<string,int>类型
  {
  	cout<<"t1为"<<t.t1<<endl;
  	cout<<"t2为"<<t.t2<<endl;
  }
  
  template<class T1,class T2>//参数模板化，将参数模板化，可自动类型推导或显式指定类型
  void fun2(Test<T1, T2> &t)
  {
  	cout << "t1为" << t.t1 << endl;
  	cout << "t2为" << t.t2 << endl;
  }
  
  template<class T>//将整个类模板化，可自动类型推导或显式指定类型
  void fun3(T &t)
  {
  	cout << "t1为" << t.t1 << endl;
  	cout << "t2为" << t.t2 << endl;
  }
  
  void main()
  {
  	Test <string,int>test("hello", 100);
  	test.doWork();
  	fun1(test);
      //自动推导和类型转换
  	fun2(test); //fun2 < string, int >(test);
  	fun3(test); //fun3<Test <string, int>>(test);
  }
```

####   类模板和派生

两种情况如下：

##### 类模板派生普通类

```cpp
//类模板
template<class T>
class MyClass{
public:
	MyClass(T property){
		this->mProperty = property;
	}
public:
	T mProperty;
};

//子类实例化的时候需要具体化的父类，子类需要知道父类的具体类型是什么样的
//这样c++编译器才能知道给子类分配多少内存

//普通派生类
class SubClass : public MyClass<int>{
public:
	SubClass(int b) : MyClass<int>(20){
		this->mB = b;
	}
public:
	int mB;
};
```

##### 类模板派生类模板

```cpp
//父类类模板
template<class T>
class Base
{
	T m;
};
template<class T，class T2>
class Child2 : public Base<T2>  
{
public:
	T mParam;
};

void test02()
{
	Child2<int> d2;
}
```

本质上是一样的。

##### 类模板中的成员函数类外实现

写法如下：

```cpp
template<class T1, class T2>
class Person{
public:
	Person(T1 name, T2 age);
	void showPerson();

public:
	T1 mName;
	T2 mAge;
};
/*
直接这样写会报错，应该用下面写法，此时编译器并不知道具体是哪个类的该函数，因为要传this指针，所以必须知道实际上是什么类（模板类是一系列类的集合），因此必须指明
Person::Person(T1 name, T2 age){
	this->mName = name;
	this->mAge = age;
}
*/

//类外实现
template<class T1, class T2>
Person<T1, T2>::Person(T1 name, T2 age){
	this->mName = name;
	this->mAge = age;
}

template<class T1, class T2>
void Person<T1, T2>::showPerson(){
	cout << "Name:" << this->mName << " Age:" << this->mAge << endl;
}

void test()
{
	Person<string, int> p("Obama", 20);
	p.showPerson();
}

int main(){
	test();
	system("pause");
	return EXIT_SUCCESS;
}
```

上述代码中如果不按照这个格式写，会报错如下：

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210128165130414.png" alt="image-20210128165130414" style="zoom: 80%;" /><img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210128165515868.png" alt="image-20210128165515868" style="zoom:80%;" />

##### 类模板的分文件编写

类模板中的成员函数，不会一开始就创建，因此导致分文件编写时，连接不到函数的实现，出现**无法解析的外部命令错误**。

qt编译器可以顺利通过编译并执行，但是在Linux和vs编辑器下如果只包含头文件，那么会报错链接错误，需要包含cpp文件，但是如果类模板中有友元类，那么编译失败！

- 原因：
  1. 类模板需要二次编译，在出现模板的地方编译一次，在调用模板的地方再次编译
  2. C++编译规则为独立编译（编译器编译源码 逐个编译单元编译的）

- 两种解决方式：

  1. 直接包含.cpp文件（不推荐）
  2. 将.cpp文件后缀名改为.hpp(其实本质就是将类声明和实现写到同一个文件中)（调用的时候include的是hpp）
  

`函数模板的分文件编写与类模板分文件编写一致`

Person.h

```cpp
#pragma once

template<class T1,class T2>
class Person{
public:
	Person(T1 name,T2 age);
	void ShowPerson();
public:
	T1 mName;
	T2 mAge;
};
#include "Person.cpp"//！！！！！！！！
```

Person.cpp

```cpp
template<class T1, class T2>
Person<T1, T2>::Person(T1 name, T2 age){
	this->mName = name;
	this->mAge = age;
}

template<class T1, class T2>
void Person<T1, T2>::ShowPerson(){
	cout << "Name:" << this->mName << " Age:" << this->mAge << endl;
}
```

main.cpp

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include<iostream>
using namespace std;
#include<string>
#include"Person.hpp"

//模板二次编译
//编译器编译源码 逐个编译单元编译的

int main(){
	Person<string, int> p("Obama", 20);
	p.ShowPerson();
	system("pause");
	return EXIT_SUCCESS;
}
```

##### 类模板和静态成员

直接看案例：

```cpp
template<class T >
class TEST
{
public:
	T a;
	static T b;
};
template<class T >
T TEST<T>::b = 3;
```

##### 类模板中的友元函数

1. 友元函数在类中声明时，函数名后接<>表示函数模板要到类外找。
2. 也可以友元函数直接写成函数模板

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include<iostream>
using namespace std;
#include <string>
//声明Person<class T1, class T2> ，方便2号位置的函数模板声明
template<class T1, class T2> 
class Person;
//声明PrintPerson2<class T1, class T2>函数模板是存在，此处为2号位置
template<class T1, class T2> 
void PrintPerson2(Person<T1, T2>& p);

//友元函数在类内实现
template<class T1, class T2>
class Person{
	//1. 友元函数在类内实现
	friend void PrintPerson(Person<T1, T2>& p){
		cout << "Name:" << p.mName << " Age:" << p.mAge << endl;
	}

	//2.友元函数类外实现（此处并非友元函数模板，而是模板类中的友元函数）
	//告诉编译器这个函数模板是存在，此处为3号位置，之前的2号位置用于声明此处存在，编译器本来看到这里会去找普通的友元函数，因为他没有template，但因为有了空的<>，编译器看到才会去找下面的函数模板。
	friend void PrintPerson2<>(Person<T1, T2>& p);

	//3. 类模板碰到友元函数模板
	template<class U1, class U2>
	friend void PrintPerson(Person<U1, U2>& p);

public:
	Person(T1 name, T2 age){
		this->mName = name;
		this->mAge = age;
	}
	void showPerson(){
		cout << "Name:" << this->mName << " Age:" << this->mAge << endl;
	}
private:
	T1 mName;
	T2 mAge;
};

void test01()
{
	Person <string, int>p("Jerry", 20);
	PrintPerson(p);
}


// 类模板碰到友元函数
//友元函数类外实现  加上<>空参数列表，告诉编译去匹配函数模板
template<class T1 , class T2>
void PrintPerson2(Person<T1, T2>& p)
{
	cout << "Name2:" << p.mName << " Age2:" << p.mAge << endl;
}

//函数模板的方式
template<class T1 , class T2>
void PrintPerson(Person<T1, T2>& p)
{
	cout << "Name:" << p.mName << " Age:" << p.mAge << endl;
}

void  test02()
{
	Person <string, int>p("Jerry", 20);
	PrintPerson2(p);   //不写可以编译通过，写了之后，会找PrintPerson2的普通函数调用，因为写了普通函数PrintPerson2的声明	
}

int main(){

	//test01();
	test02();
	system("pause");
	return EXIT_SUCCESS;
}
```

设计一个动态数组模板类(MyArray),完成对不同类型元素的管理：（重点案例）(其中涉及到内存泄露检测)

##### 动态数组模板类(内含检测堆是否释放完全的方法)

###### 头文件dynamicArray.h

```cpp
#pragma once
#ifdef _DEBUG
#define New   new(_NORMAL_BLOCK, __FILE__, __LINE__)
#endif
#include <iostream>
using namespace std;


template<class T>
class DynamicArray
{
	T* pArray=NULL;
	int mCapacity;
	int msize=0;
public:
	DynamicArray();

	DynamicArray(int capacity);

	DynamicArray(const DynamicArray<T>& dynamicArray);

	DynamicArray(T* t, int num);

	~DynamicArray();

	DynamicArray<T>& operator=(const DynamicArray<T>& dynamicArray);

	DynamicArray<T> operator+(const DynamicArray<T>& dynamicArray);//不改变原来的拼接

	friend ostream& operator<<<>(ostream& cout, const DynamicArray<T>& dynamicArray);
	//template<class T>//------------------------------------------------------------------------1
	//friend ostream& operator<<(ostream& cout, const DynamicArray<T>& dynamicArray);//-----------2（写1,2行表示用函数模板的方式，这样也可以，就不用写<>了）

	T& operator[](int index);

	DynamicArray<T>& append_DynamicArray(const DynamicArray<T> dynamicArray);//改变原来的拼接

	DynamicArray<T>& insert_DynamicArray(int pos,T data);//插入

	DynamicArray<T>& delete_DynamicArray(int pos);//删除

	DynamicArray<T>& clear_DynamicArray();//清空

	DynamicArray<T>& Push_back_DynamicArray(T data);//数据推入栈顶

	DynamicArray<T>& Pop_back_DynamicArray();//弹出栈顶数据

	T& Top_back_DynamicArray();

	int getLength();//获取长度

	int GetCapacity();//获取容量
};
```

###### 源文件dynamicArray.hpp

```cpp
#include "dynamicArray.h"
#include <string.h>
template<class T>
DynamicArray<T>::DynamicArray()
{
	mCapacity = 5;
	pArray = New T[mCapacity];
	//cout<<"New一个"<<pArray<<endl;
}

template<class T>
DynamicArray<T>::DynamicArray(int capacity)
{
	mCapacity = capacity;
	pArray = New T[mCapacity];// 如果T是对象，那么这个对象必须提供默认的构造函数
	//cout << "New一个" << pArray << endl;
}

template<class T>
DynamicArray<T>::DynamicArray(const DynamicArray<T>& dynamicArray)
{
	mCapacity = dynamicArray.mCapacity;
	msize = dynamicArray.msize;
	pArray = New T[mCapacity];
	//cout << "New一个" << pArray << endl;
	memcpy(pArray, dynamicArray.pArray, sizeof(T)*mCapacity);
}

template<class T>
DynamicArray<T>::DynamicArray(T* t, int num)
{
	mCapacity = num;
	msize = num;
	pArray = New T[mCapacity];
	//cout << "New一个" << pArray << endl;
	memcpy(pArray, t, sizeof(T)*mCapacity);
}

template<class T>
DynamicArray<T>::~DynamicArray()
{
	if (pArray)
	{
		//cout << "delete一个" << pArray << endl;
		delete[] pArray;
		pArray = NULL;
	}
}

template<class T>
DynamicArray<T>& DynamicArray<T>::operator=(const DynamicArray<T>& dynamicArray)
{
	//如果有原内存空间删除原内存空间
	if (pArray)
	{
		delete[] pArray;
		pArray = NULL;//是否有必要存疑
	}
	mCapacity = dynamicArray.mCapacity;
	pArray = New T[mCapacity];
	//cout << sizeof(T)*mCapacity << endl;
	memcpy(pArray, dynamicArray.pArray, sizeof(T)*mCapacity);
	msize = dynamicArray.msize;
	return (DynamicArray<T>&)dynamicArray;
}

template<class T>
DynamicArray<T> DynamicArray<T>::operator+(const DynamicArray<T>& dynamicArray)
{
	DynamicArray<T> tmpArray(msize +dynamicArray.msize);
	tmpArray.msize = msize + dynamicArray.msize;
	memcpy(tmpArray.pArray, pArray, sizeof(T)*msize);
	memcpy(tmpArray.pArray+msize, dynamicArray.pArray, sizeof(T)*dynamicArray.msize);
	return tmpArray;
}

template<class T>
T & DynamicArray<T>::operator[](int index)
{
	// TODO: 在此处插入 return 语句
	return pArray[index];
}



template<class T>
DynamicArray<T>& DynamicArray<T>::append_DynamicArray(const DynamicArray<T> dynamicArray)
{
	//查看容量是够足够拼接,不够的话就扩容
	if (mCapacity<msize+dynamicArray.msize)
	{
		mCapacity = msize + dynamicArray.msize;
		T* oldpArray = pArray;
		pArray = New T[mCapacity];
		memcpy(pArray, oldpArray, sizeof(T)*msize);
		delete[] oldpArray;
	}
	memcpy(pArray+msize, dynamicArray.pArray, sizeof(T)*dynamicArray.msize);
	msize += dynamicArray.msize;
	return *this;
}


template<class T>
DynamicArray<T>& DynamicArray<T>::insert_DynamicArray(int pos, T data)
{
	if (pos>msize)
	{
		pos = msize;
	}
	if (pos<0)
	{
		pos = 0;
	}
	if (msize==mCapacity)//需要扩容
	{
		mCapacity++;
		T* oldPArray = pArray;
		pArray = New T[mCapacity];
		memcpy(pArray,oldPArray,sizeof(T)*pos);
		pArray[pos] = data;
		memcpy(pArray + pos + 1, oldPArray + pos, sizeof(T)*(msize - pos));
		msize++;
		delete[] oldPArray;
	}
	else
	{
		memmove(pArray+pos+1, pArray+pos, sizeof(T)*(msize - pos));
		pArray[pos] = data;
		msize++;
	}
	return *this;
}

template<class T>
DynamicArray<T>& DynamicArray<T>::delete_DynamicArray(int pos)
{
	if (pos >= msize)
	{
		pos = msize-1;
	}
	if (pos < 0)
	{
		pos = 0;
	}
	memmove(pArray + pos, pArray + pos + 1,sizeof(T)*(msize - pos - 1));//memcpy不能处理重叠位置的挪移，要用memmove
	msize--;
	return *this;
}

template<class T>
DynamicArray<T>& DynamicArray<T>::clear_DynamicArray()
{
	msize = 0;
	return *this;
}

template<class T>
DynamicArray<T>& DynamicArray<T>::Push_back_DynamicArray(T data)
{
	if (msize == mCapacity)//需要扩容
	{
		mCapacity++;
		T* oldPArray = pArray;
		pArray = New T[mCapacity];
		memcpy(pArray, oldPArray, sizeof(T)*msize);
		pArray[msize] = data;
		msize++;
		delete[] oldPArray;
	}
	else
	{
		pArray[msize] = data;
		msize++;
	}
	return *this;
}

template<class T>
DynamicArray<T>& DynamicArray<T>::Pop_back_DynamicArray()
{
	if (this->msize == 0)
	{
		return *this;
	}
	msize--;
	return *this;
}

template<class T>
T & DynamicArray<T>::Top_back_DynamicArray()
{
	return pArray[msize - 1];
}

template<class T>
int DynamicArray<T>::getLength()
{
	return msize;
}

template<class T>
int DynamicArray<T>::GetCapacity()
{
	return mCapacity;
}

template<class T>
ostream& operator<<(ostream& cout, const DynamicArray<T>& dynamicArray)
{
	for (int i = 0; i < dynamicArray.msize; i++)
	{
		cout << dynamicArray.pArray[i] << " ";
	}
	return cout;
}

```

###### main文件main.cpp

```cpp
#include <iostream>
using namespace std;
#include "dynamicArray.hpp"
//下面用于定位内存泄露位置

#ifdef _DEBUG
#define New   new(_NORMAL_BLOCK, __FILE__, __LINE__)
#endif

#define CRTDBG_MAP_ALLOC  
#include <stdlib.h>  
#include <crtdbg.h> 
#include <string>


//用Person类来测试动态数组模板类
class Person
{
	char* mName;
	int mAge;
public:
	Person(){
		cout << "无参构造" << this << endl; 
		mName = New char[20]{0};
		mAge = 0;
	}//必须提供默认构造函数，才能供dynamicArray构造Person
	~Person(){
		cout<<"析构"<<mName<<this<<endl;
		if (mName)
		{
			delete[] mName;
			mName = NULL;
		}
	}
	Person(Person& p)
	{
		mName = New char[20]{ 0 };
		mAge=p.mAge ;
		memcpy(mName,p.mName,strlen(p.mName)+1);
		cout<<"拷贝构造"<<mName<<this<<endl;
	}
	Person& operator=(Person& p)
	{
		mAge = p.mAge;
		memcpy(mName, p.mName, strlen(p.mName) + 1);
		cout << "等于号赋值" << mName << this << endl;
		return p;
	}
	Person(char* name,int age)
	{
		mName = New char[20]{ 0 };
		memcpy(mName, name, strlen(name)+1);
		mAge = age;
		cout << "有参构造" << mName << this << endl;
	}
	friend ostream& operator<<(ostream& cout, Person& p)//必须提供默认构造函数，才能供dynamicArray输出显示
	{
		cout << "年龄：" << p.mAge << "  名称：" << p.mName<<endl;
		return cout;
	}
};



void intDynamicArrayTest()
{
	int a[5] = { 5,4,3,2,1 };
	int b[5] = { 1,2,3,4,5 };
	DynamicArray<int> dynamicArray(b, 5);
	DynamicArray<int> dynamicArray1(a, 5);
	//dynamicArray.insert_DynamicArray(10, 9).insert_DynamicArray(10, 10);
	dynamicArray.delete_DynamicArray(10).delete_DynamicArray(10);
	cout<< dynamicArray <<endl;
	cout << dynamicArray1 << endl;

}

void personDynamicArrayTest()
{
	Person p1("小明", 16);
	Person p2("小黑", 22);
	Person p3("小红", 18);
	Person p4("小白", 20);
	DynamicArray<Person> dynamicArray;
	cout << dynamicArray << endl;
	/*dynamicArray.insert_DynamicArray(0, p4);
	cout << dynamicArray << endl;*/

}


int main()
{
	intDynamicArrayTest();
	personDynamicArrayTest();
	_CrtDumpMemoryLeaks();//用于检测内存泄露，必须放在此处,开辟test函数的目的是为了当test函数执行完后，该释放的内存早该释放了，此时才可以在这里测试是否有内存泄露
	return 0;
}
```

**【重点】**memmove用于拷贝字节，如果目标区域和源区域有重叠的话，memmove能够保证源串在被覆盖之前将重叠区域的字节拷贝到目标区域中，但复制后源内容会被更改。但是当目标区域与源区域没有重叠则和memcpy函数功能相同。

**【重点】**（**崩溃的调试定位问题技巧**）崩溃的时候在弹出的对话框按相应按钮进入调试，按Alt+7键查看Call Stack即“调用堆栈”里面从上到下列出的对应从里层到外层的函数调用历史。双击某一行可将光标定位到此次调用的源代码或汇编指令处，看不懂时双击下一行，直到能看懂为止。



## 类型转换

### 静态类型转换(static_cast)

语法：static_cast<目标变量>(原变量/原对象)

1. 允许内置数据类型转换
2. 允许**父子之间**的指针或引用的转换(上行转换是安全的，下行转换是不安全的,但都允许)

```cpp
//无继承关系指针转换
void test04(){
	
	Animal* animal01 = NULL;
	Other* other01 = NULL;

	//转换失败
	//Animal* animal02 = static_cast<Animal*>(other01);
}
```

### 动态类型转换(dynamic_cast)

语法：dynamic_cast<目标变量>(原变量/原对象)

1. 不允许内置数据类型转换
2. 允许**父子之间**指针或引用的**上行转换**
   - 但若发生**多态，总是安全的**,下行转换在多态的情况下也可以用dynamic_cast转换

总结：将一切不安全的情况扼杀于萌芽

```cpp
//继承关系指针
void test01(){

	Animal* animal01 = NULL;
	Dog* dog01 = new Dog;

	//子类指针转换成父类指针 可以
	Animal* animal02 = dynamic_cast<Animal*>(dog01);
	animal02->ShowName();
	//父类指针转换成子类指针 不可以
	//Dog* dog02 = dynamic_cast<Dog*>(animal01);
}
```

```cpp
//多态
void test02(){
	Animal* animal01 = new Dog;//Animal内含虚函数，并且Dog重写了Animal中那虚函数
	//父类指针转换成子类指针本不可以，但因为是多态，所以可以
	Dog* dog01 = dynamic_cast<Dog*>(animal01);
}
```

### 常量转换(const_cast)

作用：**该运算符用来修改指针或引用类型的const属性**

1. **常量指针被转化成非常量指针**或**非常量指针被转化成常量指针**，并且仍然指向原来的对象；
2. **常量引用被转换成非常量引用**或**非常量引用被转换成常量引用**,并且仍然指向原来的对象；

***注意:***不能直接对非指针和非引用的变量使用const_cast操作符去直接移除它的const.

```cpp
//常量指针
void test01(){
	
	const int* p = NULL;
	int* np = const_cast<int*>(p);//常量指针被转化成非常量指针

	int* pp = NULL;
	const int* npp = const_cast<const int*>(pp);//非常量指针被转化成常量指针

	const int a = 10;  //不能对非指针或非引用进行转换
	//int b = const_cast<int>(a); }

//常量引用
void test02(){

int num = 10;
	int & refNum = num;
	const int& refNum2 = const_cast<const int&>(refNum);//非常量引用被转换成常量引用
}
```

### 重新解释转换(reinterpret_cast)

这是最不安全的一种转换机制，最有可能出问题，同时也最自由,**什么都可以转**。

理解：等同于C语言的强制类型转换

```cpp
int a=10;//int转int*
int* p=reinterpret_cast<int*>(a);

Base* base=NULL;//无继承关系指针转换
Other* other=reinterpret_cast<Other*>(base);
```

## 异常

### 异常的基本概念

> Bjarne Stroustrup说：提供异常的基本目的就是为了处理上面的问题。基本思想是：让一个函数在发现了自己无法处理的错误时抛出（throw）一个异常，然后它的（直接或者间接）调用者能够处理这个问题。也就是《C++ primer》中说的：将问题检测和问题处理相分离。 
>
> 一种思想：在所有支持异常处理的编程语言中（例如java），要认识到的一个思想：在异常处理过程中，由问题检测代码可以抛出一个对象给问题处理代码，通过这个对象的类型和内容，实际上完成了两个部分的通信，通信的内容是“出现了什么错误”。当然，各种语言对异常的具体实现有着或多或少的区别，但是这个通信的思想是不变的。

***一句话：异常处理就是处理程序中的错误。所谓错误是指在程序运行的过程中发生的一些异常事件（如：除0溢出，数组下标越界，所要读取的文件不存在,空指针，内存不足等等）。***

- C语言中的异常处理(C++中仍然可以)

  1. 使用整型的返回值标识错误

  2. 使用errno宏（可以简单的理解为一个全局整型变量）去记录错误。（可用perror输出）

- 上述方法的两个缺陷
  1. 返回值意义不一致问题，例如0表示错误还是1表示错误
  2. 函数的返回值只有一个，虽然可以通过指针或引用来返回另外的值，但这样就会令你的程序晦涩难懂

#### c++异常机制相比C语言异常处理的优势?

- 函数的返回值可以忽略，但异常不可忽略。如果程序出现异常，但是没有被捕获，程序就会终止，这多少会促使程序员开发出来的程序更健壮一点。而如果使用C语言的error宏或者函数返回值，调用者都有可能忘记检查，从而没有对错误进行处理，结果造成程序莫名其面的终止或出现错误的结果。
- 整型返回值没有任何语义信息。而异常却包含语义信息，有时你从类名就能够体现出来。
- 整型返回值缺乏相关的上下文信息。异常作为一个类，可以拥有自己的成员，这些成员就可以传递足够的信息。
- 异常处理可以在调用跳级。这是一个代码编写时的问题：假设在有多个函数的调用栈中出现了某个错误，使用整型返回码要求你在每一级函数中都要进行处理。而使用异常处理的栈展开机制，只需要在一处进行处理就可以了，不需要每级函数都处理。

C异常机制缺陷案例：

```c
//如果判断返回值，那么返回值是错误码还是结果？
//如果不判断返回值，那么b==0时候，程序结果已经不正确
//A写的代码
int A_MyDivide(int a,int b){
	if (b == 0){
		return -1;
	}

	return a / b;
}

//B写的代码
int B_MyDivide(int a,int b){

	int ba = a + 100;
	int bb = b;

	int ret = A_MyDivide(ba, bb);  //由于B没有处理异常，导致B结果运算错误

	return ret;
}

//C写的代码
int C_MyDivide(){

	int a = 10;
	int b = 0;

	int ret = B_MyDivide(a, b); //更严重的是，由于B没有继续抛出异常，导致C的代码没有办法捕获异常
	if (ret == -1){
		return -1;
	}
	else{
		return ret;
	}
}

//所以,我们希望：
//1.异常应该捕获，如果你捕获，可以，那么异常必须继续抛给上层函数,你不处理，不代表你的上层不处理
//2.这个例子，异常没有捕获的结果就是运行结果错的一塌糊涂，结果未知，未知的结果程序没有必要执行下去
```

### 异常基本语法

异常的关键词：**try    catch    throw**

- 若有异常则通过throw操作创建一个异常对象或变量并抛出，**throw类似return会结束当前函数**。
- 将可能抛出异常的程序段放到try块之中。
- catch如果想捕获其他类型，catch(...)
- 如果在try段执行期间没有引起异常，那么跟在try后面的catch字句就不会执行。
- catch子句会根据出现的先后顺序被检查，匹配的catch语句捕获并处理异常(或继续抛出异常)
- 异常必须有函数进行处理，如果匹配的处理未找到，则运行函数terminate将自动被调用，其缺省功能调用abort终止程序。
- 处理不了的异常，可以在catch的最后一个分支，使用throw，向上抛。
- 异常可以是自定义类型

```cpp
int A_MyDivide(int a, int b){
	if (b == 0){
		throw 0;
	}

	return a / b;
}

//B写的代码 B写代码比较粗心，忘记处理异常
int B_MyDivide(int a, int b){

	int ba = a;
	int bb = b;

	int ret = A_MyDivide(ba, bb) + 100;  //由于B没有处理异常，导致B结果运算错误

	return ret;
}

//C写的代码
int C_MyDivide(){

	int a = 10;
	int b = 0;

	int ret = 0;

//没有处理异常，程序直接中断执行
#if 1 
	ret = B_MyDivide(a, b);

//处理异常
#else 
	try{
		ret = B_MyDivide(a, b); //更严重的是，由于B没有继续抛出异常，导致C的代码没有办法捕获异常
	}
	catch (int e){
		cout << "C_MyDivide Call B_MyDivide 除数为:" << e << endl;
	}
#endif
	
	return ret;
}

int main(){

	C_MyDivide();

	system("pause");
	return EXIT_SUCCESS;
}
```

c++异常处理使得**异常的引发和异常的处理不必在一个函数中**，这样底层的函数可以着重解决具体问题，而不必过多的考虑异常的处理。**上层调用者可以在适当的位置设计对不同类型异常的处理**。

#### 异常严格类型匹配

***捕捉方式是通过严格类型匹配***。(即不存在隐式类型转换)

```cpp
class MyException//自定义异常
{
    public:
    void printError()
    {
		cout<<"我自己的异常"<<endl;
    }
}

void TestFunction(){
	
	cout << "开始抛出异常..." << endl;
	//throw 10; //抛出int类型异常
	//throw 'a'; //抛出char类型异常
	//throw "abcd"; //抛出char*类型异常
    //throw MyException();//抛出MyException的匿名对象
	string ex = "string exception!";
	throw ex;

}

int main(){

	try{
		TestFunction();
	}
	catch (int){
		cout << "抛出Int类型异常!" << endl;
	}
	catch (char){
		cout << "抛出Char类型异常!" << endl;
	}
	catch (char*){
		cout << "抛出Char*类型异常!" << endl;
	}
    catch(MyException e)//捕获自定义异常对象
    {
		e.printError();
    }
	catch (string){
		cout << "抛出string类型异常!" << endl;
	}
	//捕获所有异常
	catch (...){
		cout << "抛出其他类型异常!" << endl;
	}


	system("pause");
	return EXIT_SUCCESS;
}
```

#### 栈解旋(unwinding)

异常被抛出后，从进入try块起，到异常被抛掷前，这期间在栈上构造的所有对象，都会被自动析构。析构的顺序与构造的顺序相反，这一过程称为栈的解旋(unwinding).

```cpp
class Person{
public:
	Person(string name){
		mName = name;
		cout << mName << "对象被创建!" << endl;
	}
	~Person(){
		cout << mName << "对象被析构!" << endl;
	}
public:
	string mName;
};

void TestFunction(){
	
	Person p1("aaa");
	Person p2("bbb");
	Person p3("ccc");

	//抛出异常
	throw 10;
    cout<<"此句未输出"<<endl;//此句未输出
}

int main(){

	try{
		TestFunction();
	}
	catch (...){
		cout << "异常被捕获!" << endl;
	}

	system("pause");
	return EXIT_SUCCESS;
}
```

![image-20210302140505545](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210302140505545.png)

### 异常接口声明

- 可以在函数声明中列出可能抛出异常的所有类型,即限定抛出异常的类型

  ```cpp
  void func() throw(A,B,C);//这个函数func能够且只能抛出类型A,B,C及其子类型的异常。
  ```

- 如果在函数声明中没有包含异常接口声明，则此函数可以抛任何类型的异常

- 一个不抛任何类型异常的函数可声明为:void func() throw(),代表不允许抛出异常

- 如果一个函数抛出了它的异常接口声明所不允许抛出的异常,unexcepted函数会被调用，该函数默认行为调用terminate函数中断程序。

```cpp
//可抛出所有类型异常
void TestFunction01(){
	throw 10;
}

//只能抛出int char char*类型异常
void TestFunction02() throw(int,char,char*){
	string exception = "error!";
	throw exception;
}

//不能抛出任何类型异常
void TestFunction03() throw(){
	throw 10;
}

int main(){

	try{
		//TestFunction01();
		//TestFunction02();//运行中断，报错
		//TestFunction03();//运行中断，报错
	}
	catch (...){
		cout << "捕获异常!" << endl;
	}
	
	system("pause");
    return EXIT_SUCCESS;
}
```

分别在qt vs linux下做测试! 

- Qt and Linux 正确!
- vs2015接口声明不影响使用，但不能正常发挥限制异常抛出类型的作用

### 异常变量生命周期

```cpp
class MyException
{
public:
	MyException()
	{
		cout<<"默认构造函数"<<endl;
	}
	MyException(MyException& e)
	{
		cout<<"拷贝构造函数"<<endl;
	}
	~MyException()
	{
		cout<<"析构函数"<<endl;
	}
};


void TestFunction()
{
	throw MyException();//《《《修改位1》》》对应不同输出结果
	
}

int main() {

	try {
		TestFunction();
	}
	catch (MyException e) {//《《《修改位2》》》对应不同输出结果
		cout << "异常被捕获!" << endl;
	}
    catch (...) {
		cout << "其他异常被捕获!" << endl;
	}

	system("pause");
	return EXIT_SUCCESS;
}

```

1. 《修改位1》是throw MyException();      《修改位2》是 catch(MyException e);

   **调用拷贝构造函数，效率低**

   ![image-20210302150222651](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210302150222651.png)

2. 《修改位1》是throw MyException();       《修改位2》是catch(MyException& e);

   **只调用默认构造函数，效率高，推荐**

   ![image-20210302150136700](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210302150136700.png)

3. 《修改位1》是throw &MyException();       《修改位2》是catch(MyException* e);

   **对象会提前释放掉，不能再非法操作**

   ![image-20210302150025665](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210302150025665.png)

   显然3的情况：在catch中调用e的函数会报错，因为MyException已被析构

**总结，引用方式最佳推荐**

### 异常的多态使用

1. 提供基类异常类BaseException，内含纯虚函数virtual void printError()=0;
2. 空指针异常类和越界异常类继承BaseException
3. 重写virtual void printError()函数
4. 测试：利用父类引用指向子类对象

```cpp
//越界异常
class OutOfRangeException : public BaseException{
public:
	virtual void printError(){
		cout << "越界异常!" << endl;
	}
};

void doWork(){

	throw NullPointerException();
}

void test()
{
	try{
		doWork();
	}
	catch (BaseException& ex){
		ex.printError();
	}
}
```

### C++标准异常库

#### 标准库介绍

标准库中也提供了很多的异常类，它们是通过类继承组织起来的。异常类继承层级结构图如下：

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps21.jpg)

`每个类所在的头文件在图下方标识出来。(颜色对应其头文件)`

***标准异常类的成员：***

1. 在上述继承体系中，每个类都有提供了构造函数、复制构造函数、和赋值操作符重载。
2. logic_error类及其子类、runtime_error类及其子类，它们的构造函数是接受一个string类型的形式参数，用于异常信息的描述
3. 所有的异常类都有一个what()方法，返回const char* 类型（C风格字符串）的值，描述异常信息。

***标准异常类的具体描述：***

| 异常名称          | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| exception         | 所有标准异常类的父类                                         |
| bad_alloc         | 当operator new and operator new[]，请求分配内存失败时        |
| bad_exception     | 这是个特殊的异常，如果函数的异常抛出列表里声明了bad_exception异常，当函数内部抛出了异常抛出列表中没有的异常，这是调用的unexpected函数中若抛出异常，不论什么类型，都会被替换为bad_exception类型 |
| bad_typeid        | 使用typeid操作符，操作一个NULL指针，而该指针是带有虚函数的类，这时抛出bad_typeid异常 |
| bad_cast          | 使用dynamic_cast转换引用失败的时候                           |
| ios_base::failure | io操作过程出现错误                                           |
| logic_error       | 逻辑错误，可以在运行前检测的错误                             |
| runtime_error     | 运行时错误，仅在运行时才可以检测的错误                       |

***logic_error的子类：***

| 异常名称         | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| length_error     | 试图生成一个超出该类型最大长度的对象时，例如vector的resize操作 |
| domain_error     | 参数的值域错误，主要用在数学函数中。例如使用一个负值调用只能操作非负数的函数 |
| out_of_range     | 超出有效范围                                                 |
| invalid_argument | 参数不合适。在标准库中，当利用string对象构造bitset时，而string中的字符不是’0’或’1’的时候，抛出该异常 |

***runtime_error的子类：***

| 异常名称         | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| range_error      | 计算结果超出了有意义的值域范围                               |
| overflow_error   | 算术计算上溢                                                 |
| underflow_error  | 算术计算下溢                                                 |
| invalid_argument | 参数不合适。在标准库中，当利用string对象构造bitset时，而string中的字符不是’0’或’1’的时候，抛出该异常 |

案例如下：

```cpp
#include<stdexcept>
class Person{
public:
	Person(int age){
		if (age < 0 || age > 150){
			throw out_of_range("年龄应该在0-150岁之间!");//实际使用的时候，往往是不需要自己抛异常的，比如STL容器会自动抛异常，开发者只需要处理异常就可以了
		}
	}
public:
	int mAge;
};
int main(){
	try{
		Person p(151);
	}
	catch (out_of_range& ex){
		cout << ex.what() << endl;
	}	
	system("pause");
	return EXIT_SUCCESS;
}
```

####  编写自己的异常类

1. 标准库中的异常是有限的；
2. 在自己的异常类中，可以添加自己的信息。（标准库中的异常类值允许设置一个用来描述异常的字符串）。

##### 如何编写自己的异常类？

1. **建议自己的异常类要继承标准异常类**。因为C++中可以抛出任何类型的异常，所以我们的异常类可以不继承自标准异常，但是这样可能会导致程序混乱，尤其是当我们多人协同开发时。
2. 当继承标准异常类时，**应该重载父类的what函数和虚析构函数**。
3. 因为栈展开的过程中，要复制异常类型，那么要根据你在类中添加的成员考虑是否提供自己的复制构造函数。

```cpp
//自定义异常类
class MyOutOfRange:public exception
{
public:
	MyOutOfRange(const string  errorInfo)
	{
		this->m_Error = errorInfo;
	}

	MyOutOfRange(const char * errorInfo)
	{
        //const char*可以隐式类型转换为string，反之不可以
		this->m_Error =  errorInfo;
	}

	virtual  ~MyOutOfRange()
	{
	
	}
	virtual const char *  what() const//基类中有这个const，则重写时候必须写const
	{
        //string转换为const char*，用c_str()函数
		return this->m_Error.c_str() ;
	}
	string m_Error;
};
class Person
{
public:
	Person(int age)
	{
		if (age <= 0 || age > 150)
		{
			//抛出异常 越界
			//cout << "越界" << endl;
			//throw  out_of_range("年龄必须在0~150之间");

			//throw length_error("长度异常");
			throw MyOutOfRange(("我的异常 年龄必须在0~150之间"));
		}
		else
		{
			this->m_Age = age;
		}
		
	}

	int m_Age;
};


void test01()
{
	try
	{
		Person p(151);
	}
	catch ( out_of_range & e )
	{
		cout << e.what() << endl;
	}
	catch (length_error & e)
	{
		cout << e.what() << endl;
	}
	catch (MyOutOfRange e)
	{
		cout << e.what() << endl;
	}
}
```

## C++输入和输出流

### 流的概念和流类库的结构

程序的输入指的是从输入文件将数据传送给程序，程序的输出指的是从程序将数据传送给输出文件。

C++输入输出包含以下三个方面的内容：

1. 对系统指定的标准设备的输入和输出。即从键盘输入数据，输出到显示器屏幕。这种输入输出称为标准的输入输出，简称标准I/O。

2. 以外存磁盘文件为对象进行输入和输出，即从磁盘文件输入数据，数据输出到磁盘文件。以外存文件为对象的输入输出称为文件的输入输出，简称文件I/O。

3. 对内存中指定的空间进行输入和输出。通常指定一个字符数组作为存储空间(实际上可以利用该空间存储任何信息)。这种输入和输出称为字符串输入输出，简称串I/O。

   ​	

   C++编译系统提供了用于输入输出的iostream类库。iostream这个单词是由3个部 分组成的，即i-o-stream，意为输入输出流。在iostream类库中包含许多用于输入输出的 类。常用的见表

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps54.jpg)

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps86.jpg)

ios是抽象基类，由它派生出istream类和ostream类，两个类名中第1个字母i和o分别代表输入(input)和输出(output)。 istream类支持输入操作，ostream类支持输出操作， iostream类支持输入输出操作。iostream类是从istream类和ostream类通过多重继承而派生的类。其继承层次见上图表示。

C++对文件的输入输出需要用ifstrcam和ofstream类，两个类名中第1个字母i和o分别代表输入和输出，第2个字母f代表文件 (file)。ifstream支持对文件的输入操作， ofstream支持对文件的输出操作。类ifstream继承了类istream，类ofstream继承了类ostream，类fstream继承了 类iostream。见图 

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps117.jpg)

I/O类库中还有其他一些类，但是对于一般用户来说，以上这些已能满足需要了。

### 与iostream类库有关的头文件

iostream类库中不同的类的声明被放在不同的头文件中，用户在自己的程序中用#include命令包含了有关的头文件就相当于在本程序中声明了所需 要用到的类。可以换 —种说法：头文件是程序与类库的接口，iostream类库的接口分别由不同的头文件来实现。常用的有

- iostream  包含了对输入输出流进行操作所需的基本信息。
- fstream  用于用户管理的文件的I/O操作。
- strstream  用于字符串流I/O。
- stdiostream  用于混合使用C和C + +的I/O机制时，例如想将C程序转变为C++程序。
- iomanip  在使用格式化I/O时应包含此头文件。

### 在iostream头文件中定义的流对象

在 iostream 头文件中定义的类有 ios，istream，ostream，iostream，istream 等。

在iostream头文件中不仅定义了有关的类，还定义了4种流对象，

| ***对象*** | ***含义*** | ***对应设备*** | ***对应的类***     | ***c语言中相应的标准文件*** |
| ---------- | ---------- | -------------- | ------------------ | --------------------------- |
| cin        | 标准输入流 | 键盘           | istream_withassign | stdin                       |
| cout       | 标准输出流 | 屏幕           | ostream_withassign | stdout                      |
| cerr       | 标准错误流 | 屏幕           | ostream_withassign | stderr                      |
| clog       | 标准日志流 | 屏幕           | ostream_withassign | stderr                      |

在iostream头文件中定义以上4个流对象用以下的形式（以cout为例）：
  ostream cout ( stdout);
	在定义cout为ostream流类对象时，把标准输出设备stdout作为参数，这样它就与标准输出设备(显示器)联系起来，如果有
  cout <<3;
就会在显示器的屏幕上输出3。

##### **在iostream头文件中重载运算符**

“<<”和“>>”本来在C++中是被定义为左位移运算符和右位移运算符的，由于在iostream头文件中对它们进行了重载， 使它们能用作标准类型数据的输入和输出运算符。所以，在用它们的程序中必须用#include命令把iostream包含到程序中。

```cpp
#include <iostream>
```

1. \>\>a表示将数据放入a对象中。
2. \<\<a表示将a对象中存储的数据拿出。

### 标准I/O流

标准I/O对象:cin，cout，cerr，clog

#### cout流对象

cout是console output的缩写，意为在控制台（终端显示器）的输出。强调几点。

1. cout不是C++预定义的关键字，它是ostream流类的对象，在iostream中定义。 顾名思义，流是流动的数据，cout流是流向显示器的数据。cout流中的数据是用流插入运算符“<<”顺序加入的。如果有:
    cout<<"I "<<"study C++ "<<"very hard. << “hello world !";
    
    按顺序将字符串"I ", "study C++ ", "very hard."插人到cout流中，cout就将它们送到显示器，在显示器上输出字符串"I study C++ very hard."。cout流是容纳数据的载体，它并不是一个运算符。人们关心的是cout流中的内容，也就是向显示器输出什么。
    
2. 用“cout<<”输出基本类型的数据时，可以不必考虑数据是什么类型，系统会判断数据的类型，并根据其类型选择调用与之匹配的运算符重载函数。这个过程都是自动的，用户不必干预。如果在C语言中用prinf函数输出不同类型的数据，必须分别指定相应的输出格式符，十分麻烦，而且容易出错。C++的I/O机制对用户来说，显然是方便而安全的。

3. cout流在内存中对应开辟了一个缓冲区，用来存放流中的数据，当向cout流插人一个endl时，不论缓冲区是否已满，都立即输出流中所有数据，然后插入一个换行符， 并刷新流（清空缓冲区）。注意如果插人一个换行符”\n“（如cout<<a<<"\n"），则只输出和换行，而不刷新cout 流(但并不是所有编译系统都体现出这一区别）。

4. 在iostream中只对"<<"和">>"运算符用于标准类型数据的输入输出进行了重载，但未对用户声明的类型数据的输入输出进行重载。如果用户声明了新的类型，并希望用"<<"和">>"运算符对其进行输入输出，按照重运算符重载来做。

#### cerr流对象

**cerr流对象是标准错误流，cerr流已被指定为与显示器关联**。cerr的 作用是向标准错误设备(standard error device)输出有关出错信息。cerr与标准输出流cout的作用和用法差不多。但有一点不同：cout流通常是传送到显示器输出，但也可以被重定向输出到磁盘文件，而cerr流中的信息只能在显示器输出。当调试程序时，往往不希望程序运行时的出错信息被送到其他文件，而要求在显示器上及时输出，这时 应该用cerr。cerr流中的信息是用户根据需要指定的。

#### clog流对象

clog流对象也是标准日志流，它是console log的缩写。它的作用和cerr相同，都是在终端显示器上显示出错误信息。区别：cerr是不经过缓冲区，直接向显示器上输出有关信息，而clog中的信息存放在缓冲区中，缓冲区满后或遇endl时向显示器输出。

**缓冲区的概念:**

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps20.jpg)

### 标准输入流

标准输入流对象cin，重点掌握的函数

- cin.get() //一次只能读取一个字符
- cin.get(一个参数) //读一个字符
- cin.get(两个参数) //可以读字符串
- cin.getline()//读字符串
- cin.ignore()//忽略，默认忽略1个，若填入参数n代表忽略n个字符
- cin.peek()//偷窥，从缓冲区只看不取
- cin.putback()//放回，放回缓冲区队列头
- cin.fail()//标志位
- cin.clear()//标志位复位为0(用来更改cin的状态标示符的)
- cin.sync()//用来清除缓存区的数据流(vs2015环境下不能使用，尽量用cin.ignore替代)

**【重点注意】cin.clear和cin.fail的区别**

```cpp
int main()
{
 int a;
 cout<<"输入一个字母:"<<endl;
 cin>>a;  //int型变量中放了char型数据,failbit置1
 cout<<"cin.fail()="<<cin.fail()<<endl;    //输出1

 //cin.clear();
 //cin.sync();
 cout<<"输入一个数字:"<<endl;    //由于failbit值为1,输入流不能正常工作
 cin>>a;                         //故此处的输入无效
 cout<<a<<endl;                  //输出不确定值

 cin.clear();                    //此处用cin.clear()流标志复位
 //cin.sync();
 cout<<"cin.fail()="<<cin.fail()<<endl;        //此处failbit已为0

 cout<<"输入一个数字:"<<endl;
 //但刚才输入的字符并没有从流中清除,所以cin>>a又把那个字符放入a中,流输入流又不能正常工作
 cin>>a;
 cout<<a<<endl; //输出不确定值
 cout<<"cin.fail()="<<cin.fail()<<endl;    //在此处failbit又为1

 cin.clear();            //再次修复输入流
 cin.ignore();            //取走刚才流中的字符
 cout<<"输入一个数字:"<<endl;    //再次接收用记输入,这次输入数字,正常输出了
 cin>>a;
 cout<<"a="<<a<<endl;
 //现在再看一下输入流的failbit
 cout<<"cin.fail()="<<cin.fail()<<endl;//输出0,表明输入流已恢复正常
 return 0;
}
```

**【重点注意】cin.get和cin.getline的区别**

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210310173521606.png" alt="image-20210310173521606" style="zoom:80%;" /><img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210310173332264.png" alt="image-20210310173332264" style="zoom:80%;" />

- cin.get：遇换行符结束读取,**换行符遗留在缓冲区**,所以要处理。
- cin.getline：已读取了size-1个字符或遇到了文件尾或遇到了分隔符结束读取，若遇到换行符结束读取，丢弃换行符(换行符不在缓冲区也不被buf取走，而是直接丢掉)。

**【重点注意】cin.ignore和cin.sync的区别**

1. cin.ignore(a,ch)

   从输入流（cin）中提取字符，提取的字符被忽略（ignore），不被使用。每抛弃一个字符，它都要计数和比较字符：如果计数值达到a或者被抛弃的字符是ch，则cin.ignore()函数执行终止；否则，它继续等待。

   它的一个常用功能就是用来清除以回车结束的输入缓冲区的内容，消除上一次输入对下一次输入的影响。

   比如可以这么用：

   cin.ignore(1024,'\n')，通常把第一个参数设置得足够大，这样实际上总是只有第二个参数'\n'起作用，所以这一句就是把回车（包括回车）之前的所以字符从输入缓冲（流）中清除出去。

2. cin.sync()

   sync()的作用就是清除输入缓冲区。成功时返回0，失败时badbit会置位，函数返回-1.
   另外，对于绑定了输出的输入流，调用sync()，还会刷新输出缓冲区。

【重点注意】实践得知，vs2015下，sync并不能清空输入缓冲区，因此用ignore替代

```cpp
cin.ignore(std::numeric_limits<int>::max(), '\n');//把第一个参数设置得足够大，这样实际上总是只有第二个参数'\n'起作用，所以这一句就是把回车（包括回车）之前的所以字符从输入缓冲（流）中清除出去，用此来达到清空数据流的操作；这样就能吃掉一大段了，但理论上依旧不能保证吃掉一行
/*===============注意====================
需要把max用括号括起来避免和windows定义的宏混淆
(std::numeric_limits<double>::max)()
因为Windef.h中定义了
#ifndef max
#define max(a,b)            (((a) > (b)) ? (a) : (b))
#endif
所以会产生编译错误=======================*/
//cin.ignore(1,EOF);
```

程序执行时有一个标志变量来标志输入的异常状态，其中有三位标志位分别用来标志三种异常信息，他们分别是：failbit，eofbit，badbit。这三个标志位在标志变量中是这样分配的：

![image-20210311154555574](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210311154555574.png)

ios类定义了这四个常量badbit, eofbit, failbit, goodbit，其实这四个标志常量就是取对应标志位的掩码，也即输入的四种异常情况！

1. ios::badbit  001  输入（输出）流出现致命错误，不可挽回 
2. ios::eofbit  010  已经到达文件尾
3. ios::failbit  100  输入（输出）流出现非致命错误，可挽回
4. ios::goodbit  000  流状态完全正常, 各异常标志位都为0

可以用输出语句来验证这几个常量的值：

```cpp
cout << ios:: failbit << endl;
cout << ios:: eofbit << endl;
cout << ios:: badbit << endl;
cout << ios:: goodbit << endl;
```

【注意】cin>>与cin.getline的返回值相同

当读取不匹配类型的值或EOF时会造成流错误而返回NULL。（只有goodbit才会返回非NULL）

------

其他函数讲解：

```cpp
//cin.get
void test01(){
#if 0
	char ch = cin.get();
	cout << ch << endl;

	cin.get(ch);
	cout << ch << endl;


	//链式编程
	char char1, char2, char3, char4;
	cin.get(char1).get(char2).get(char3).get(char4);

	cout << char1 << " " << char2 << "" << char3 <<  " " << char4 << " ";
#endif

	char buf[1024] = { 0 };
	//cin.get(buf.1024);
	cin.getline(buf,1024);
	cout << buf;
}

//cin.ignore
void test02(){

	char buf[1024] = { 0 };
	cin.ignore(2); //忽略缓冲区当前字符
	cin.get(buf,1024);
	cout << buf << endl;
}

//cin.putback 将数据放回缓冲区
void test03(){

	//从缓冲区取走一个字符
	char ch = cin.get();
	cout << "从缓冲区取走的字符:" << ch << endl;
	//将数据再放回缓冲区
	cin.putback(ch);
	char buf[1024] = { 0 };
	cin.get(buf,1024);
	cout << buf << endl;

}

//cin.peek 偷窥
void test04(){
	
	//偷窥下缓冲区的数据
	char ch = cin.peek();
	cout << "偷窥缓冲区数据:" << ch << endl;
	char buf[1024] = { 0 };
	cin.get(buf, 1024);
	cout << buf << endl;
}

//练习  作业 使用cin.get和putback完成类似功能
void test05(){
	
	cout << "请输入一个数字或者字符串:" << endl;
	char ch = cin.peek();
	if(ch >= '0' && ch <= '9'){
		int number;
		cin >> number;
		cout << "数字:" << number << endl;
	}
	else{
		char buf[64] = { 0 };
		cin.getline(buf, 64);
		cout << "字符串:" <<  buf << endl;
	}
}
```

### 标准输出流

1. cout.flush() //刷新缓冲区 Linux下有效
2. cout.put() //向缓冲区写字符
3. cout.write() //从buff中向缓冲区写num个字节到当前输出流中。

```cpp
//cout.flush 刷新缓冲区，linux下有效
void test01(){	
	cout << "hello world";
	//刷新缓冲区
	cout.flush(); 
}

//cout.put 输出一个字符
void test02(){
	cout.put('a');
	//链式编程
	cout.put('h').put('e').put('l');
}

//cout.write 输出字符串 buf,输出多少个
void test03(){
	//char* str = "hello world!";
	//cout.write(str, strlen(str));
	char* str = "*************";
	for (int i = 1; i <= strlen(str); i ++){
		cout.write(str, i);
		cout << endl;
	}
	for (int i = strlen(str); i > 0; i --){
		cout.write(str, i);
		cout << endl;
	}
}
```

#### 格式化输出

在输出数据时，为简便起见，往往不指定输出的格式，由系统根据数据的类型采取默认的格式，但有时希望数据按指定的格式输出，如要求以十六进制或八进制形式输出一个整数，对输出的小数只保留两位小数等。有两种方法可以达到此目的。

1. 使用控制符的方法；
2. 使用流对象的有关成员函数。

##### 使用流对象的有关成员函数

通过调用流对象cout中用于控制输出格式的成员函数来控制输出格式。用于控制输出格式的常用的成员函数如下：

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps30.jpg)

流成员函数setf和控制符setiosflags括号中的参数表示格式状态，它是通过格式标志来指定的。格式标志在类ios中被定义为枚举值。因此在引用这些格式标志时要在前面加上类名ios和域运算符“::”。格式标志见表13.5。

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps89.jpg)

##### 控制符格式化输出

C++提供了在输入输出流中使用的控制符(有的书中称为操纵符)。(需要iomanip头文件)

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps109.jpg)

```cpp
//通过流成员函数
void test01(){
	
	int number = 99;
	cout.width(20);
	cout.fill('*');
	cout.setf(ios::left);
	cout.unsetf(ios::dec); //卸载十进制
	cout.setf(ios::hex);
	cout.setf(ios::showbase);
	cout.unsetf(ios::hex);
	cout.setf(ios::oct);
	cout << number << endl;

}

//使用控制符
void test02(){

	int number = 99;
	cout << setw(20)
		<< setfill('~')
		<< setiosflags(ios::showbase)
		<< setiosflags(ios::left)
		<< hex
		<< number
		<< endl;

}
```

##### 对程序的几点说明(注意点)

1. **成员函数width(n)和控制符setw(n)只对其后的第一个输出项有效。**(之后依然按按系统默认的域宽输出)

   如果要求在输出数据时都按指定的同一域宽n输出，不能只调用一次width(n)， 而必须在输出每一项前都调用一次width(n)

2. 在表13.5中的输出格式状态分为5组，每一组中同时只能选用一种（例如dec、hex和oct中只能选一，它们是互相排斥的）。在用成员函数setf和 控制符setiosflags设置输出格式状态后，如果想改设置为同组的另一状态，应当调用成员函数unsetf（对应于成员函数self）或 resetiosflags（对应于控制符setiosflags），先终止原来设置的状态。然后再设置其他状态，大家可以从本程序中看到这点。程序在开始虽然没有用成员函数self和控制符setiosflags设置用dec输出格式状态，但系统默认指定为dec，因此要改变为hex或oct，也应当先 用unsetf 函数终止原来设置。**若未终止格式就设置别的格式，设置的格式均不起作用**，系统依然以未终止格式输出。

3. 用setf 函数设置格式状态时，可以包含两个或多个格式标志，由于这些格式标志在ios类中被定义为枚举值，每一个格式标志以一个二进位代表，因此可**以用位或运算符“|”组合多个格式标志**。如：

   ```cpp
     cout.setf(ios::internal I ios::showpos);  //包含两个状态标志，用"|"组合
   ```

4. 可以看到：对输出格式的控制，既可以用控制符，也可以用cout流的有关成员函数，二者的作用是相同的。控制符是在头文件iomanip中定义的，因此**用控制符时，必须包含iomanip头文件**。cout流的成员函数是在头文件iostream 中定义的，因此只需包含头文件iostream，不必包含iomanip。许多程序人员感到使用控制符方便简单，可以在一个cout输出语句中连续使用多种控制符。

### 文件读写

头文件：\<fstream\>

#### 文件流类和文件流对象

输入输出是以系统指定的标准设备（输入设备为键盘，输出设备为显示器）为对象的。在实际应用中，常以磁盘文件作为对象。即从磁盘文件读取数据，将数据输出到磁盘文件。

和文件有关系的输入输出类主要在fstream.h这个头文件中被定义，在这个头文件中主要被定义了三个类，由这三个类控制对文件的各种输入输出操作，他们分别是ifstream、ofstream、fstream，其中fstream类是由iostream类派生而来，他们之间的继承关系见下图所示：

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps24.jpg)（图中打错了，应该是fstream）

由于文件设备并不像显示器屏幕与键盘那样是标准默认设备，所以它在fstream头文件中是没有像cout那样预先定义的全局对象，所以我们必须自己定义一个该类的对象。ifstream类，它是从istream类派生的，用来支持从磁盘文件的输入。ofstream类，它是从ostream类派生的，用来支持向磁盘文件的输出。

fstream类，它是从iostream类派生的，用来支持对磁盘文件的输入输出。

#### C++打开文件

所谓打开(open)文件是一种形象的说法，如同打开房门就可以进入房间活动一样。 打开文件是指在文件读写之前做必要的准备工作，包括：

1. 为文件流对象和指定的磁盘文件建立关联，以便使文件流流向指定的磁盘文件。
2. 指定文件的工作方式，如：该文件是作为输入文件还是输出文件，是ASCII文件还是二进制文件等。

以上工作可以通过两种不同的方法实现:

1. 调用文件流的成员函数open。如

   ```cpp
   ofstream outfile;  //定义ofstream类(输出文件流类)对象outfile
   outfile.open("f1.dat",ios::out);  //使文件流与f1.dat文件建立关联
   ```

   第2行是调用输出文件流的成员函数open打开磁盘文件f1.dat，并指定它为输出文件，文件流对象outfile将向磁盘文件f1.dat输出数据。ios::out是I/O模式的一种，表示以输出方式打开一个文件。或者简单地说，此时f1.dat是一个输出文件，接收从内存输出的数据。

   磁盘文件名可以包括路径，如"c:\\new\\f1.dat"，如缺省路径，则默认为当前目录下的文件。

2. 在定义文件流对象时指定参数

   在声明文件流类时定义了带参数的构造函数，其中包含了打开磁盘文件的功能。因此，可以在定义文件流对象时指定参数，调用文件流类的构造函数来实现打开文件的功能。

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/wps95.jpg)

几点说明：

1. 新版本的I/O类库中不提供ios::nocreate和ios::noreplace。
2. 每一个打开的文件都有一个文件指针，该指针的初始位置由I/O方式指定，每次读写都从文件指针的当前位置开始。每读入一个字节，指针就后移一个字节。当文件指针移到最后，就会遇到文件结束EOF（文件结束符也占一个字节，其值为-1)，此时流对象的成员函数eof的值为非0值(一般设为1)，表示文件结束了。
3. 可以用“位或”运算符“|”对输入输出方式进行组合，如表13.6中最后3行所示那样。还可以举出下面一些例子：
     ios::in | ios:: noreplace  //打开一个输入文件，若文件不存在则返回打开失败的信息
     ios::app | ios::nocreate  //打开一个输出文件，在文件尾接着写数据，若文件不存在，则返回打开失败的信息
     ios::out l ios::noreplace  //打开一个新文件作为输出文件，如果文件已存在则返回打开失败的信息
     ios::in l ios::out I ios::binary  //打开一个二进制文件，可读可写
   但不能组合互相排斥的方式，如 ios::nocreate l ios::noreplace。
4. 如果打开操作失败，open函数的返回值为0(假)，如果是用调用构造函数的方式打开文件的，则流对象的值为0。可以据此测试打开是否成功。如
     if(outfile.open("f1.bat", ios::app) ==0)
       cout <<"open error";
   或
     if( !outfile.open("f1.bat", ios::app) )
       cout <<"open error";

#### C++关闭文件

在对已打开的磁盘文件的读写操作完成后，应关闭该文件。关闭文件用成员函数close。如：outfile.close( );  //将输出文件流所关联的磁盘文件关闭
**所谓关闭，实际上是解除该磁盘文件与文件流的关联，原来设置的工作方式也失效，这样，就不能再通过文件流对该文件进行输入或输出。**此时可以将文件流与其他磁盘文件建立关联，通过文件流对新的文件进行输入或输出。如:

```cpp
 outfile.open("f2.dat",ios::app|ios::nocreate);//(文件路径，打开方式)
```

此时文件流outfile与f2.dat建立关联，并指定了f2.dat的工作方式。

#### C++对ASCII文件的读写操作

如果文件的每一个字节中均以ASCII代码形式存放数据,即一个字节存放一个字符,这个文件就是ASCII文件(或称字符文件)。程序可以从ASCII文件中读入若干个字符,也可以向它输出一些字符。

1. 用流插入运算符“<<”和流提取运算符“>>”输入输出标准类型的数据。“<<”和“ >>”都巳在iostream中被重载为能用于ostream和istream类对象的标准类型的输入输出。由于ifstream和 ofstream分别是ostream和istream类的派生类；因此它们从ostream和istream类继承了公用的重载函数，所以在对磁盘文件的操作中，可以通过文件流对象和流插入运算符“<<”及 流提取运算符“>>”实现对磁盘 文件的读写，如同用cin、cout和<<、>>对标准设备进行读写一样。

2. 用文件流的put、get、geiline等成员函数进行字符的输入输出，：用C++流成员函数put输出单个字符、C++ get()函数读入一个字符和C++ getline()函数读入一行字符。

```cpp
int main(){
	char* sourceFileName = "./source.txt";
	char* targetFileName = "./target.txt";
	//创建文件输入流对象
	ifstream ism(sourceFileName, ios::in);
	//创建文件输出流对象
	ofstream osm(targetFileName,ios::out);
	if (!ism){
		cout << "文件打开失败!" << endl;
	}
	while (!ism.eof()){
		char buf[1024] = { 0 };
		ism.getline(buf,1024);
		cout << buf << endl;
		osm << buf << endl;
	}
	//关闭文件流对象
	ism.close();
	osm.close();
	system("pause");
	return EXIT_SUCCESS;
}
```

##### 4种ASCII读写方式

```cpp
//打开文件
ifs.open("./test.txt",ios::in);
if(!ifs.is_open())//判断文件是否打开成功
{
    cout<<"文件打开失败"<<endl;
    return;
}
//第一种方式
char buf[1024]={0};
while(ifs>>buf)
{
    cout<<buf<<endl;
}
//第二种方式
char buf[1024]={0};
while(ifs.getline(buf,sizeof(buf)))
{
    cout<<buf<<endl;
}
//第三种方式
string buf;
while(getline(ifs,buf))//全局getline函数，需要<string>头文件
{
    cout<<buf<<endl;
}
//第四种方式
char c;
while((c=ifs.get())!=EOF)
{
    cout<<c;
}

//关闭文件
ifs.close();
```

【注意】全局getline和ifstream流对象中的getline的区别

1. ifstream的对象ifs中存在**ifs.getline(读到哪个buf，读多少num)函数**
2. 此外还存在一个全局函数（需要<string>头文件）**getline(从哪读ifs,读到哪buf（string类型）,分隔符[可选项])**

【注意】

```cpp
//将文件指针移动到文件开头（file为文件流对象）
file.clear(std::ios::goodbit);//清空好坏标志位
file.seekg(std::ios::beg);//将光标回到文件头
```

#### C++对二进制文件的读写操作

二进制文件不是以ASCII代码存放数据的，它将内存中数据存储形式不加转换地传送到磁盘文件，因此它又称为内存数据的映像文件。因为文件中的信息不是字符数据，而是字节中的二进制形式的信息，因此它又称为字节文件。

对二进制文件的操作也需要先打开文件，用完后要关闭文件。在打开时要用ios::binary指定为以二进制形式传送和存储。二进制文件除了可以作为输入文件或输出文件外,还**可以是既能输入又能输出的文件**。这是和ASCII文件不同的地方。

#### 用成员函数read和write读写二进制文件

对二进制文件的读写主要用istream类的成员函数read和write来实现。这两个成员函数的原型为

```cpp
istream& read(char *buffer,int len);
ostream& write(const char * buffer,int len);
```


字符指针buffer指向内存中一段存储空间。len是读写的字节数。调用的方式为：

```cpp
  a. write(p1,50);
  b. read(p2,30);
```


上面第一行中的a是输出文件流对象，write函数将字符指针p1所给出的地址开始的50个字节的内容不加转换地写到磁盘文件中。在第二行中，b是输入文件流对象，read 函数从b所关联的磁盘文件中，读入30个字节(或遇EOF结束），存放在字符指针p2所指的一段空间内。

```cpp
class Person{
public:
	Person(char* name,int age){
		strcpy(this->mName, name);
		this->mAge = age;
	}
public:
	char mName[64];
	int mAge;
};

int main(){

	char* fileName = "person.txt";
	//二进制模式读写文件
	//创建文件对象输出流
	ofstream osm(fileName, ios::out | ios::binary);

	Person p1("John",33);
	Person p2("Edward", 34);

	//Person对象写入文件
	osm.write((const char*)&p1,sizeof(Person));
	osm.write((const char*)&p2, sizeof(Person));

	//关闭文件输出流
	osm.close();

	//从文件中读取对象数组
	ifstream ism(fileName, ios::in | ios::binary);
	if (!ism){
		cout << "打开失败!" << endl;
	}
	
	Person p3;
	Person p4;

	ism.read((char*)&p3, sizeof(Person));
	ism.read((char*)&p4, sizeof(Person));

	cout << "Name:" << p3.mName << " Age:" << p3.mAge << endl;
	cout << "Age:" << p4.mName << " Age:" << p4.mAge << endl;

	//关闭文件输入流
	ism.close();

	system("pause");
	return EXIT_SUCCESS;
}
```

# UML类图

> 面向对象设计主要就是使用UML的类图，类图用于描述系统中所包含的类以及它们之间的相互关系，帮助人们简化对系统的理解，它是系统分析和设计阶段的重要产物，也是系统编码和测试的重要模型依据。

## 类的UML画法

类（Class）封装了数据和行为，是面向对象的重要组成部分，它是具有相同属性、操作、关系的对象集合的总称。在系统中，每个类都具有一定的职责，职责指的是类要完成什么样子的功能，要承担什么样子的义务。一个类可以有多种职责，但是设计得好的类一般只有一种职责。

<img src="https://raw.githubusercontent.com/che77a38/blogImage2/main/202302041632811.png" style="zoom:50%;" />

- 看到该图分为三层：**最顶层的为类名，中间层的为属性，最底层的为方法。**
- 属性的表示方式为：`【可见性】【属性名称】：【类型】={缺省值，可选}`
- 方法的表示方式为：`【可见性】【方法名称】（【参数列表】）：【类型】`
- 可见性都是一样的，`-`表示`private`、`+`表示`public`、`#`表示`protected`。

### 关系画法总结

![image-20230217164335569](https://raw.githubusercontent.com/che77a38/blogImage2/main/202302171643671.png)

- [继承关系](#继承关系) --> 带空心三角形的实线
- [关联关系](#关联关系) --> 箭头线
- [聚合关系](#聚合关系) --> 带空心菱形的箭头线
- [组合关系](#组合关系) --> 带实心菱形的箭头线
- [依赖关系](#依赖关系) --> 带箭头的虚线

### 继承关系

> 继承也叫作泛化（`Generalization`），用于描述父子类之间的关系，父类又称为基类或者超类，子类又称作派生类。在UML中，泛化关系用**带空心三角形的实线**来表示。

#### 普通继承关系

<img src="https://raw.githubusercontent.com/che77a38/blogImage2/main/202302061342649.png" style="zoom:50%;" />

#### 抽象继承关系

比方说我想实现一个链表（`Link`），插入（`insert`）与删除（`remove`）动作我想让子类去实现，链表本身只实现统计链表中元素个数的动作（`count`），然后有一个子类单向链表（`OneWayLink`）去实现父类没有实现的动作，UML类图为：

<img src="https://raw.githubusercontent.com/che77a38/blogImage2/main/202302061359977.png" style="zoom:50%;" />

在UML中，抽象类无论类名还是抽象方法名，都以**斜体**的方式表示，因为这也是一种继承关系，所以子类与父类通过带空心三角形的实线来联系。

### 关联关系

> 关联（Assocition）关系是类与类之间最常见的一种关系，它是一种结构化的关系，表示一类对象与另一类
> 对象之间有联系，如汽车和轮胎、师傅和徒弟、班级和学生等。在UML类图中，用**箭头线**连接有关联关系的对
> 象所对应的类，在C++中通常将一个类的对象作为另一个类的成员变量。关联关系分**单向关联、双向关联、**
> **自关联**

#### 单向关联关系

<img src="https://raw.githubusercontent.com/che77a38/blogImage2/main/202302061403919.png" style="zoom:50%;" />

#### 双向关联关系

默认情况下的关联都是双向的，比如顾客（`Customer`）购买商品（`Product`），反之，卖出去的商品总是与某个顾客与之相关联，这就是双向关联。类图如下:

<img src="https://raw.githubusercontent.com/che77a38/blogImage2/main/202302061403640.png" style="zoom:50%;" />

#### 自关联关系

自关联，指的就是对象中的属性为对象本身，这在链表中非常常见，单向链表Node中会维护一个它的前驱Node，双向链表Node中会维护一个它的前驱Node和一个它的后继Node。就以单向链表为例，UML类图为:

<img src="https://raw.githubusercontent.com/che77a38/blogImage2/main/202302061403687.png" style="zoom:50%;" />

### 聚合关系

> 聚合（Aggregation）关系表示整体与部分的关系。在聚合关系中，成员对象是整体的一部分，但是成员对象可以脱离整体对象独立存在。在UML中，聚合关系用带**空心菱形的箭头线**表示

如汽车（`Car`）与引擎（`Engine`）、轮胎（`Wheel`）、车灯（`Light`），类图 表示为：

<img src="https://raw.githubusercontent.com/che77a38/blogImage2/main/202302061413313.png" style="zoom:50%;" />

代码实现聚合关系，成员对象通常以构造方法、Setter方法的方式注入到整体对象之中。

### 组合关系

> 组合（Composition）关系也表示的是一种整体和部分的关系，但是在组合关系中整体对象可以控制成员对象的生命周期，一旦整体对象不存在，成员对象也不存在，整体对象和成员对象之间具有同生共死的关系。在UML中组合关系用**带实心菱形的**箭头线表示。

比如人的头（Head）和嘴巴（Mouth）、鼻子（Nose），嘴巴和鼻子是头的组成部分之一，一旦头没了，嘴巴也没了，因此头和嘴巴、鼻子是组合关系，类图表示为:

<img src="https://raw.githubusercontent.com/che77a38/blogImage2/main/202302061425886.png" style="zoom:50%;" />

代码实现组合关系，**通常在整体类的构造方法中直接实例化成员类**，因为组合关系的整体和部分是**共生关系**，如果通过外部注入，那么即使整体不存在，那么部分还是存在的，这就相当于变成了一种聚合关系了

### 依赖关系

> 依赖（Dependency）关系是一种使用关系，特定事物的改变有可能会影响到使用该事物的其他事物，在需要表示一个事物使用另一个事物时使用依赖关系，大多数情况下依赖关系体现在某个类的方法使用另一个类的对象作为参数。在UML中，依赖关系用**带箭头的虚线**表示，由依赖的一方指向被依赖的一方。

比如，驾驶员（`Driver`）开车，Driver类的drive()方法将车（`Car`）的对象作为一个参数传递，以便在drive()方法中能够调用car的move()方法，且驾驶员的drive()方法依赖车的move()方法，因此也可以说Driver依赖Car，类图为：

<img src="https://raw.githubusercontent.com/che77a38/blogImage2/main/202302061428737.png" style="zoom:50%;" />

依赖关系通常通过**三种方式**来实现：

- 将一个类的对象作为另一个类中方法的参数
-  在一个类的方法中将另一个类的对象作为其对象的局部变量
-  在一个类的方法中调用另一个类的静态方法

## 关联、聚合、组合之间的区别

**`关联`**和**`聚合`**的区别主要在于语义上：**关联的两个对象之间一般是平等的，聚合则一般是不平等的**。

**`聚合`**和**`组合`**的区别则在语义和实现上都有差别：**组合的两个对象之间生命周期有很大的关联，被组合的对象在组合对象创建的同时或者创建之后创建，在组合对象销毁之前销毁，一般来说被组合对象不能脱离组合对象独立存在，而且也只能属于一个组合对象(可以理解成使用栈空间)；聚合则不一样，被聚合的对象可以属于多个聚合对象**

实际应用中，三种关系其实没有区分得这么清楚，不需要把细节扣得这么细，合理利用对象之间的关系给出设计方案即可。

[关系画法总结跳转](#关系画法总结)

[绘制uml类图的网址跳转](https://app.diagrams.net/)

# 将C源代码封装成C++类代码

1. 将宏定义--->常量const
   - 主要是整形和字符串
   - 一些连续的整形值可以定义成枚举类型
2. 宏函数
   - 简单的宏函数可以改写成[内联函数](#内联函数的引出)
   - 如果比较复杂,可以改写成类的成员函数
3. 若成员函数都用到了某个变量,可以将这个变量设置为类的成员变量
4. 通过类的访问控制权限控制
   - 一般只有public成员可以对外界访问,不被外界访问的可以设置成private成员或者protect成员

# 内存泄露检测知识点(调试技巧注意点篇)

[超级重点]: https://blog.csdn.net/windows_nt/article/details/8652191
[进阶]: https://bbs.2cto.com/read.php?tid=263708&amp;page=1&amp;_360safeparam=28243218

**【重点】**（**崩溃的调试定位问题技巧**）崩溃的时候在弹出的对话框按相应按钮进入调试，按Alt+7键查看Call Stack即“调用堆栈”里面从上到下列出的对应从里层到外层的函数调用历史。双击某一行可将光标定位到此次调用的源代码或汇编指令处，看不懂时双击下一行，直到能看懂为止。

# VC编译选项“基本运行时检查”的作用

[详细介绍见链接]: https://blog.csdn.net/aqtata/article/details/106156275

