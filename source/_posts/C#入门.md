---
title: C#入门
tags: C#
categories: 技术
mathjax: true
abbrlink: 3961b9aa
---

C# 又称“C Sharp”，是微软发布的一种简单、安全、稳定、通用的面向对象编程语言。

<!-- more -->

C# 是从 C/C++ 衍生出来的，它在继承 C/C++强大功能的同时，抛弃了 C/C++ 的一些复杂特性。C# 还和 Java 非常类似，仅仅在一些细节上有差别。

C# 运行在 .NET Framework 上，借助 C# 可以开发不同类型的应用程序：

- 桌面应用程序；
- 网络应用程序；
- 分布式应用程序；
- Web 服务应用程序；
- 数据库应用程序等。

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404090813099.png"  />

# .NET Framework

.NET Framework 主要由四个部分构成，如下所示：

- 公共语言运行库（CLR）；
- 框架类库（FCL）；
- 核心语言（WinForms、ASP.NET 和 ADO.NET）；
- 其他模块（WCF、WPF、WF、Card Space、LINQ、Entity Framework、Parallel LINQ、Task Parallel Library 等）。



![4-220I0133321X5](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202403192327412.png)

## CLR：公共语言运行库

CLR 全称为“Common Language Runtime”，它为 .NET 应用程序提供了一个托管的代码执行环境（类似 Java 中的虚拟机），是整个 .NET 框架的核心。实际上 CLR 是驻留在内存里的一段代码，负责程序执行期间的代码管理工作，例如内存管理、线程管理、安全管理、远程管理、即时编译等。

- Base Class Library Support（基础类库）：一个类库，为 .NET 应用程序提供了一些类；
- Thread Support（线程支持）：用来管理多线程应用程序的并行执行；
- COM Marshaler（COM 封送处理程序）：提供 COM 对象与应用程序之间的通信；
- Type Checker（类型检查器）：检查应用程序中使用的类型，并验证它们是否与 CLR 提供的标准类型匹配；
- Code Manager（代码管理器）：在程序运行时管理代码；
- Garbage Collector（垃圾回收器）：释放未使用的内存，并将其分配给新的应用程序；
- Exception Handler（异常管理器）：在程序运行时处理异常，避免应用程序运行失败；
- Class Loader（类加载器）：在运行时加载所有的类。

## FCL：框架类库

FCL 全称为“Framework Class Library”，它是一个标准库，其中包含了成千上万个类，主要用于**构建应用程序**。FCL 的核心是 BCL（Base Class Library：基础类库），BCL 提供了 FCL 的基本功能。FCL 的基本组成如下所示：

## WinForms

WinForms 是 Windows Forms 的简称，它是一种 .NET Framework 的**智能客户端技术**，用来开发可以在电脑中运行的应用程序，经常使用的记事本就是使用 WinForms 技术开发的。

## ASP.NET

ASP.NET 是一个微软设计和开发的 Web 框架，于 2002 年 1 月首次发布，ASP.NET 中完美的集成了 HTML、CSS 和 JavaScript。可以使用 ASP.NET 来**开发网站、Web 应用程序和 Web 服务**。

## ADO.NET

ADO.NET 一个是 .Net Framework 的模块，由可用于连接、检索、插入和删除数据的类组成，主要用来开发能够与 SQL Server、Oracle 等**数据库进行交互**的应用程序。

## WPF

WPF 全称为“Windows Presentation Foundation”，是微软推出的**基于 Windows 的用户界面框架**，主要用来设计 Windows 应用程序的用户界面。WPF 以前也叫“Avalon”，集成在 .NET Framework 中，2006 发布的 .NET Framework 3.0 是最早支持 WPF 的。

## WCF

WCF 全称为“Windows Communication Foundation”，是由微软开发的支持数据通信的应用程序框架，中文翻译为 Windows 通讯开发平台。与 WPF 相同，WCF 最早也是集成在 .NET Framework 3.0 中，WCP、WPF 和 WF 被统称为新一代 Windows 操作系统以及 WinFX（Windows Vista 的托管代码编程模型）的三个重大应用程序开发类库。

WCF 整合了 Windows 通讯中的 .net Remoting、WebService、Socket 机制，并融合了 HTTP 和 FTP 的相关技术，因此尤其适合 **Windows 平台上分布式应用的开发**。

## WF

WF 全称为“Windows Workflow Foundation”，是微软提供的一项技术，其中提供 API、进程内工作流引擎和可重新托管的设计器，用来将长时间运行的进程实现为 .NET 应用程序中的工作流。

## LINQ

LINQ 技术在 2007 年跟随 .NET Framework 3.5 一同发布，其全称为“Language Integrated Query”，是微软的一项技术，**新增了一种自然查询的 SQL 语法**到 .NET Framework 的编程语言中，当前支持 C# 以及 Visual Basic .NET 语言。

## Entity Framework

Entity Framework 是一个基于 ORM 的开源框架，可以和使用 .NET 对象的数据库一起使用。它可以**减轻程序员在处理数据库方面的工作，是微软推荐使用的处理数据库的技术**。

## Parallel LINQ

Parallel LINQ 也叫 PLINQ，是对 LINQ 技术的并行实现，PLINQ 将 LINQ 语法的简洁和可靠性与并行编程的强大功能结合在一起，大大提高了使用 LINQ 时的运行速度。

# 开发环境搭建

## mac版

[完整参考此处](https://www.bilibili.com/read/cv19486819)

1. [下载.net链接](https://dotnet.microsoft.com/zh-cn/download)  , `dotnet -info`查看是否安装完成
2. vscode安装C# Dev Kit 和 C#拓展
3. `dotnet new console -o 新项目文件夹路径` 到新项目去

p.s. `launch.json`中添加 `"console": "integratedTerminal",`设置输出到终端

**编译命令**

```shell
#项目目录下
#编译发布版
dotnet build -c Release 
#编译调试版
dotnet build -c Debug
#使用dotnet build实际上调用的是C#编译器(csc)

#查看已安装的nuget包依赖项
dotnet list package
#添加 NuGet 包。
dotnet add package	
#删除 NuGet 包。
dotnet remove package	
```

在Mac上使用NuGet时，您通常会使用dotnet命令行工具来执行NuGet操作。dotnet命令行工具是.NET Core的官方命令行工具，用于构建、运行和管理.NET应用程序。通过dotnet命令行工具，您可以使用NuGet来添加、删除和更新项目的依赖项。

1、列出Nuget本地的路径

```
dotnet nuget locals all --list
```

2、使用dotnet命令安装引用Nuget包

```
dotnet add package NLog
```

3、安装引用指版本使用-v

```
dotnet add package NLog -v 4.6.7
```

4、使用特定源安装引用Nuget包

```
dotnet add package Microsoft.AspNetCore.StaticFiles -s https://dotnet.myget.org/F/dotnet-core/api/v3/index.json
```

注意：执行命令的目录是要安装的项目的.csproj文件位置

5、指定项目.csproj文件位置

```
dotnet add ToDo.csproj package NLog -v 1.0.0
```

### vscode Nuget Package Manager扩展插件

在VSCode的扩展插件中，搜索并且安装Nuget Package Manager扩展插件

使用ctrl + shift + p或者ctrl + p（mac下将ctrl替换成cmd）

输入> nuget ，在下拉框中选择>Nuget Package Manager:Add Package

输入需要安装的包名（不需要完整的包名，可以模糊搜索），进行搜索

[mac配置c#开发环境更详细的参考](https://www.cnblogs.com/springsnow/p/12882696.html)

# C#概述

C# 之所以能称为一门被广泛应用的编程语言，原因有以下几点：

- C# 是一种现代的通用的编程语言；
- C# 是面向对象的；
- C# 是面向组件的；
- C# 简单易学；
- C# 是一种结构化语言；
- 使用 C# 开发效率很高；
- C# 可以在各种计算机平台上进行编译；(相对于 Java 的“一次编写，到处运行”，C# 的跨平台性可能稍显不足。)
- C# 是 .Net Framework 的一部分。

以下是 C# 的一些重要功能的列表：

- 布尔条件；
- 自动垃圾回收；
- 标准库；
- 组件版本；
- 属性和事件；
- 委托和时间管理；
- 易于使用的泛型；
- 索引器；
- 条件编译；
- 简单的多线程；
- LINQ 和 Lambda 表达式；
- 集成 Windows。

借助 C# 编程语言，可以开发不同类型且安全可靠的应用程序，例如：

- 桌面应用程序；
- 网络应用程序；
- 分布式应用程序；
- Web 服务应用程序；
- 数据库应用程序等。

> C# 中的关键字是编译器预先定义好的一些单词，也可以称为保留字或者保留标识符，这些关键字对编译器有特殊的意义，不能用作标识符。但是，如果您非要使用的话也不是没有办法，只需要在关键字前面加上`@`前缀即可，例如`@if`就是一个有效的标识符，而`if`则是一个关键字。
>
> 在 C# 中，有些关键字在代码的上下文中具有特殊的意义，例如 get 和 set，这样的关键字被称为上下文关键字（contextual keywords）。一般来说，C# 语言中新增的关键字都会作为上下文关键字，这样可以避免影响到使用旧版语言编写的 C# 程序。
>
> 下图列出了 C# 中的保留关键字（Reserved Keywords）和上下文关键字（Contextual Keywords）
>
> <img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202403201322738.png" alt="image-20240320132236392" style="zoom:67%;" />

# 数据类型

C# 语言中内置了一些基本的数据类型，数据类型用来指定程序中变量可以存储的数据的类型，C# 中的数据类型可以大致分为三类：

- 值类型（Value types）；
- 引用类型（References types）；
- 指针类型（Pointer types）。

> 在C#中,不需要像C++中函数传参的时候考虑应该用引用传递还是值传递,因为:
>
> 在C#中，传递对象时的行为取决于该对象的类型。值类型和引用类型
>
> - **值类型**：当你传递一个值类型的变量时，C#默认进行值复制，也就是说，函数内部得到的是原始变量的一个副本，对这个副本的修改不会影响到原始变量。但是，你可以使用`ref`或`out`关键字来按引用传递值类型，这样函数内部对参数的修改会影响到原始变量。
> - **引用类型**：当你传递一个引用类型的变量时，C#默认进行引用传递，也就是说，函数内部得到的是原始对象的引用，对这个引用的修改会影响到原始对象。但是，如果你修改了引用本身（即让它指向一个新的对象），这个修改不会影响到原始变量，因为这个修改只改变了函数内部的引用，而没有改变原始变量的引用。

## 值类型

C# 中的值类型是从 `System.ValueType` 类中派生出来的，对于值类型的变量可以直接为其分配一个具体的值。当声明一个值类型的变量时，系统会自动分配一块儿内存区域用来存储这个变量的值，需要注意的是，变量所占内存的大小会根据系统的不同而有所变化。

C# 中的值类型有很多，如下表所示：

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202403201325933.png" alt="image-20240320132506645" style="zoom: 67%;" />

## 引用类型

用类型的变量中并不存储实际的数据值，而是存储的对数据（对象）的引用，换句话说就是，引用类型的变量中存储的是数据在内存中的位置。当多个变量都引用同一个内存地址时，如果其中一个变量改变了内存中数据的值，那么所有引用这个内存地址的变量的值都会改变。

C# 中内置的引用类型包括 

- Object（对象）
- Dynamic（动态）
- string（字符串）

### 对象类型（Object）

对象类型是 C# 通用类型系统（Common Type System：CTS）中所有数据类型的最终基类，Object 是 System.Object 类的别名。任何类型的值都可以分配给对象类型，但是在分配值之前，需要对类型进行转换。

> 将值类型转换为对象类型的过程被称为“装箱”，反之将对象类型转换为值类型的过程则被称为“拆箱”。注意，只有经过装箱的数据才能进行拆箱。

**类型检查在编译时进行的**

### 动态类型（Dynamic）

您可以在动态类型的变量中存储任何类型的值，这些变量的类型检查是在程序运行时进行的。动态类型的声明语法如下所示：

`dynamic <variable_name> = value;`

例如：

`dynamic d = 20;`

类型检查在**程序运行时进行的**。

### 字符串类型（String）

字符串类型的变量允许您将一个字符串赋值给这个变量，字符串类型需要通过 String 类来创建，String 类是 System.String 类的别名，它是从对象（Object）类型中派生的。在 C# 中有两种定义字符串类型的方式，分别是使用`" "`和`@" "`。

```cpp
//使用引号的声明方式
String str = "http://helloworld/";
//使用 @ 加引号的声明形式
@"http://helloworld/";
```

使用`@" "`形式声明的字符串称为“逐字字符串”，逐字字符串会将转义字符`\`当作普通字符对待，例如`string str = @"C:\Windows";`等价于`string str = "C:\\Windows";`。

另外，在`@" "`形式声明的字符串中可以任意使用换行，换行符及缩进空格等都会计算在字符串的长度之中。

## 指针类型

C# 语言中的指针是一个变量，也称为定位器或指示符，其中可以存储另一种类型的内存地址。C# 中的指针与 C 或 C++ 中的指针具有相同的功能。

# 变量

变量可以理解为是程序可以操作的内存区域的名称，在 C# 中每个变量都有自己特定的类型，这个类型确定了变量所占内存的大小、布局、取值范围以及可以对该变量执行的操作。

可以将变量当作一种通过符号（变量名）表示某个内存区域的方法，变量的值可以更改，并且可以多次重复使用。C# 中的基本变量类型可以归纳为以下几种：

| 类型             | 示例                                                     |
| ---------------- | -------------------------------------------------------- |
| 整型（整数类型） | sbyte、byte、short、ushort、int、uint、long、ulong、char |
| 浮点型           | float、double                                            |
| 十进制类型       | decimal                                                  |
| 布尔型           | true、false                                              |
| 空类型           | 可为空值的数据类型                                       |

```c#
using System;
namespace helloworld{
    class Program {
        static void Main(string[] args) {
            int a, b;
            Console.WriteLine("请输入第一个数字：");
            a = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("请输入第二个数字：");
            b = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("{0}+{1}={2}", a, b, a+b);
        }
    }
}
```

因为使用 Console.ReadLine() 接收的数据是字符串格式的，所以使用 Convert.ToInt32() 函数来将用户输入的数据转换为 int 类型。

C#中的表达式非

- 左值表达式 Lvalues
- 右值表达式 Rvalues

## C#可空类型

在 C# 1.x 的版本中，一个值类型的变量是不可以被赋值为 null（空值）的，否则会产生异常。而在 C# 2.0 中，新增了一个 nullable 类型，可以使用 nullable 类型定义包含 null 值的数据，例如，您可以在 nullable <Int32>（可为空的 int32 类型）类型的变量中存储 -2147483648 到 2147483647 之间的任何值或者 null。同样，您可以在 nullable <bool>（可为空的 bool 类型）类型的变量中存储 true、false 或 null。声明可空类型的语法如下：

`data_type? variable_name = null;`

其中，`data_type` 为要声明的数据类型，后面紧跟一个问号；`variable_name` 则为变量的名称。

```c#
using System;

namespace helloworld
{
    class Demo
    {
        static void Main(string[] args){
            int? num1;
            int? num2 = 123;
            num1 = null;
        
            double? num3 = new double?();
            double? num4 = 3.1415926;
            bool? boolval = null;

            // 输出这些值
            Console.WriteLine("num1 = {0} \r\n num2 = {1} \r\n num3 = {2} \r\n num4 = {3} \r\n boolval = {4}", num1, num2, num3, num4, boolval);
            Console.ReadLine();
        }
    }
}
// num1 =
// num2 = 123
// num3 =
// num4 = 3.1415926
// boolval =
```

## Null 合并运算符（??）

在 C# 中 Null 合并运算符用于定义可空类型和引用类型的默认值。如果此运算符的左操作数不为 null，那么运算符将返回左操作数，否则返回右操作数。例如表达式`a??b`中，如果 a 不为空，那么表达式的值则为 a，反之则为 b。

需要注意的是，Null 合并运算符左右两边操作数的**类型必须相同，或者右操作数的类型可以隐式的转换为左操作数的类型**，否则将编译错误。

`num3 = num1 ?? 321;`

# 类型转换

## 隐式类型转换

一种数据类型（类型 A），只要其取值范围完全包含在另一种数据类型（类型 B）的取值范围内，那么类型 A 就可以隐式转换为类型 B。基于这一特性，C# 的隐式类型转换不会导致数据丢失。

## 显示类型转换

显式类型转换也叫强制类型转换，这种转换需要使用`(type)value`的形式或者预定义函数显式的完成，显式转换需要用户明确的指定要转换的类型，而且在转换的过程中可能会造成数据丢失

C# 中还提供了一系列内置的类型转换方法，如下表所示：

| 方法       | 描述                                           |
| ---------- | ---------------------------------------------- |
| ToBoolean  | 将类型转换为布尔型                             |
| ToByte     | 将类型转换为字节类型                           |
| ToChar     | 将类型转换为单个 Unicode 字符类型              |
| ToDateTime | 将类型（整数或字符串类型）转换为日期时间的结构 |
| ToDecimal  | 将浮点型或整数类型转换为十进制类型             |
| ToDouble   | 将类型转换为双精度浮点型                       |
| ToInt16    | 将类型转换为 16 位整数类型                     |
| ToInt32    | 将类型转换为 32 位整数类型                     |
| ToInt64    | 将类型转换为 64 位整数类型                     |
| ToSbyte    | 将类型转换为有符号字节类型                     |
| ToSingle   | 将类型转换为小浮点数类型                       |
| ToString   | 将类型转换为字符串类型                         |
| ToType     | 将类型转换为指定类型                           |
| ToUInt16   | 将类型转换为 16 位无符号整数类型               |
| ToUInt32   | 将类型转换为 32 位无符号整数类型               |
| ToUInt64   | 将类型转换为 64 位无符号整数类型               |

例子:

```c#
using System;

namespace helloworld{
    class StringConversion {
        static void Main(string[] args) {
            int i = 75;
            float f = 53.005;
            double d = 2345.7652;
            bool b = true;

            Console.WriteLine(i.ToString());
            Console.WriteLine(f.ToString());
            Console.WriteLine(d.ToString());
            Console.WriteLine(b.ToString());
            Console.ReadKey();
        }
    }
}
//75
//53.005
//2345.7652
//True
```

# 运算符优先级

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202403211231239.png" alt="image-20240321123105179" style="zoom: 67%;" />

# C# foreach循环

除了前面介绍的几种循环语句外，C# 同样也支持 foreach 循环，使用 foreach 可以遍历数组或者集合对象中的每一个元素，其语法格式如下：

```c#
foreach(数据类型 变量名 in 数组或集合对象){
    语句块;
}
```

# C#函数/方法

格式如下:

```c#
Access_Specifier Return_Type FunctionName(Parameter List)
{
   Function_Body
   Return_Statement
}
//需要注意的是，访问权限修饰符是可以省略,省略后默认为private
```

## 静态函数

C# 中的静态函数指的是，在一个类中使用 static 修饰的函数，调用静态函数比调用普通函数要简单很多，只需要函数名即可：

```c#
using System;
namespace helloworld
{
    class Demo
    {
        static void Main(string[] args){
            string msg = Output("http://helloworld/");   // 调用类中的静态函数
            Console.WriteLine(msg);
        }
        /*
         * 定义一个函数，该函数可以接收一个字符串参数，
         * 并返回一个字符串
         */
        static string Output(string message){
            string str = "欢迎访问：" + message;
            return str;
        }
    }
}
```

# C#封装



C# 中的访问权限修饰符有以下几种：

- public：公共的，所有对象都可以访问，但是需要引用命名空间；
- private：私有的，类的内部才可以访问；
- internal：内部的，同一个程序集的对象可以访问，程序集就是命名空间；
- protected：受保护的，类的内部或类的父类和子类中可以访问；
- Protected internal：protected 和 internal 的并集，符合任意一条都可以访问。

# C#值传递,引用传递,输出传递

| 方式     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| 值传递   | 值传递会复制参数的实际值并赋值给函数的形式参数，实参和形参使用的是两个不同内存位置中的值，当形参的值发生改变时，不会影响实参的值，从而保证了实参数据的安全 |
| 引用传递 | 引用传递会复制参数的内存位置并传递给形式参数，当形参的值发生改变时，同时也会改变实参的值 |
| 输出传递 | 输出传递可以一次返回多个值                                   |

## 引用传递

在 C# 中，需要使用 `ref` 关键字来使用引用传递

```c#
public void Func(ref int val){
            val *= val;
            Console.WriteLine("函数内部的值：{0}", val);
        }
Obj.Func(ref val);
```

## 输出传递

使用 return 语句可以从函数中返回一个值，但是使用输出传递则可以从函数中一次性返回多个值。输出传递与引用传递相似，不同之处在于输出传递是将数据从函数中传输出来而不是传输到函数中。

在 C# 中，需要使用 `out` 关键字来使用输出传递，下面通过示例来演示一下：

```c#
public void getValue(out int x){
            int temp = 11;
            x = temp;
            x *= x;
        }
 Obj.getValue(out val);
```

# C# Array数组

```c#
int[] array1 = new int[10]                // 初始化一个长度为 10 的整型数组
double[] array2 = new double[5]    // 初始化一个长度为 5 的浮点型数组

//不指定长度赋值
double[] arr1 = {96.5, 98.0, 99.5, 90.0};
int[] arr2 = {1, 2, 3, 4, 5, 6, 7, 8, 9};
double[] arr1 = new double[]{96.5, 98.0, 99.5, 90.0};
int[] arr2 = new int[]{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
//指定长度赋值
double[] arr1 = new double[4]{96.5, 98.0, 99.5, 90.0};
int[] arr2 = new int[10]{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
```

## 二维数组

可以使用`arr[i, j]`的形式来访问二维数组中的每个元素，其中 arr 为数组的名称，而 i 和 j 则是数组元素的索引，类似于表格中的行和列。

```c#
//初始化二维数组
// 第一种方式
int[,] arr = new int[3,4]{
    {0, 1, 2, 3},
    {4, 5, 6, 7},
    {8, 9, 10, 11}
};
// 第二种方式
int[,] arr = new int[,]{
    {0, 1, 2, 3},
    {4, 5, 6, 7},
    {8, 9, 10, 11}
};
// 第三种方式
int[,] arr = {
    {0, 1, 2, 3},
    {4, 5, 6, 7},
    {8, 9, 10, 11}
};

//访问二维数组中的元素
int a = arr[1, 0];
```

## 交错数组

C# 中的交错数组其实就是**元素为数组的数组**，换句话说就是交错数组中的每个元素都可以是维度和大小不同的数组，所以有时交错数组也被称为“数组的数组”。

```C#
//定义并初始化
int[][] jaggedArray = new int[3][]; // 定义一个交错数组
jaggedArray[0] = new int[5];        // 对数组的第一个元素初始化
jaggedArray[1] = new int[4];        // 对数组的第二个元素初始化
jaggedArray[2] = new int[2];        // 对数组的第三个元素初始化

int[][] jaggedArray = new int[][]{
    new int[] {1, 2, 3, 4, 5},
    new int[] {6, 7, 8, 9},
    new int[] {10, 11}
};
//还可以简写为:
int[][] jaggedArray = {
    new int[] {1, 2, 3, 4, 5},
    new int[] {6, 7, 8, 9},
    new int[] {10, 11}
};
```

定义一个交错数组,并遍历数组中的内容

```c#
using System;

namespace helloworld
{
    class Demo
    {
        static void Main(string[] args){
            int[][] arr = new int[3][]{  
                new int[]{31, 22, 16, 88},
                new int[]{21, 54, 6, 77, 98, 52},
                new int[]{112, 25}
            };
            // 遍历数组
            for(int i = 0; i < arr.Length; i++){
                for(int j = 0; j < arr[i].Length; j++){
                    Console.Write(arr[i][j]+" ");
                }
                Console.WriteLine();
            }
            Console.ReadLine();
        }
    }
}
```

## 交错数组和多维数组

交错数组中的元素不仅可以是一维数组，还可以是多维数组，例如下面的代码中定义了一个包含三个二维数组元素的一维交错数组：

```c#
int[][,] jaggedArray = new int[3][,]
{
    new int[,] {
        {1, 1},
        {2, 3}
    },
    new int[,] {
        {5, 8},
        {13, 21},
        {34, 55}
    },
    new int[,] {
        {89, 144},
        {233, 377},
        {610, 987}
    }
};
//访问
int a = jaggedArray[1][1,1]     // 变量 a 的值为 21
int b = jaggedArray[2][0,0]     // 变量 b 的值为 89
```

## 参数数组

某些情况下，在定义函数时可能并不能提前确定参数的数量，这时可以使用 C# 提供的参数数组，参数数组通常用于为函数传递未知数量的参数。

若要使用参数数组，则需要利用 `params` 关键字，语法格式如下：

`访问权限修饰符 返回值类型 函数名(params 类型名称[] 数组名称)`

> 使用参数数组时，既可以直接为函数传递一个数组作为参数，也可以使用`函数名(参数1, 参数2, ..., 参数n)`的形式传递若干个具体的值作为参数。

```c#
 public string getSum(params int[] arr){
            int sum = 0;
            string str = "";
            foreach(int i in arr){
                sum += i;
                str += "+ " + i + " ";
            }
            str = str.Trim('+');
            str += "= "+sum;
            return str;
        }
//调用方式1
string str = Obj.getSum(1, 2, 3, 4, 5, 6);
//调用方式2
int[] arr = {2, 4, 6, 8, 10};
string str2 = Obj.getSum(arr);
```

## C# Array类

Array 类是 C# 中所有数组的基类，其中提供了一系列用来处理数组的操作，例如对数组元素进行排序、搜索数组中指定的元素等。

Array 类中提供了一系列属性，通过这些属性可以获取数组的各种信息。Array 类中的常用属性如下表所示：

### 属性

| 属性           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| IsFixedSize    | 检查数组是否具有固定大小                                     |
| IsReadOnly     | 检查数组是否为只读                                           |
| IsSynchronized | 检查是否同步对数组的访问（线程安全）                         |
| Length         | 获取数组中**所有维度中元素的总数**                           |
| LongLength     | 获取数组中所有维数中元素的总数，并返回一个 64 位整数         |
| Rank           | 获取数组的秩（维数），例如一维数组返回 1，二维数组返回 2，依次类推 |
| SyncRoot       | 用来**获取一个对象，该对象可以用于同步对数组的访问**         |

### 方法

| 方法                       | 描述                                                         |
| -------------------------- | ------------------------------------------------------------ |
| Clear(Array, Int32, Int32) | 将数组中指定范围内的元素设置为该元素所属类型的默认值         |
| Copy(Array, Array, Int32)  | 从第一个元素开始拷贝数组中指定长度的元素，并将其粘贴到另一个数组中（从第一个元素开始粘贴），使用 32 位整数来指定要拷贝的长度 |
| CopyTo(Array, Int32)       | 从指定的目标数组索引处开始，将当前一维数组的所有元素复制到指定的一维数组中，索引使用 32 位整数指定 |
| GetLength                  | 获取数组指定维度中的元素数，并返回一个 32 位整数             |
| GetLongLength              | 获取数组指定维度中的元素数，并返回一个 64 位整数             |
| GetLowerBound              | 获取数组中指定维度第一个元素的索引                           |
| GetType                    | 获取当前实例的类型（继承自 Object ）                         |
| GetUpperBound              | 获取数组中指定维度最后一个元素的索引                         |
| GetValue(Int32)            | 获取一维数组中指定位置的值                                   |
| IndexOf(Array, Object)     | 在一个一维数组中搜索指定对象，并返回其首个匹配项的索引       |
| Reverse(Array)             | 反转整个一维数组中元素的顺序                                 |
| SetValue(Object, Int32)    | 设置一维数组中指定元素的值                                   |
| Sort(Array)                | 对一维数组中的元素排序                                       |
| ToString()                 | 返回一个表示当前对象的字符串（继承自 Object）                |

如果想要了解有关 Array 类中的属性和方法的详细介绍，可以查阅 C# 的[官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.array?view=netcore-3.1#properties)。

```c#
using System;

namespace helloworld
{
    class Demo
    {
        static void Main(string[] args) 
        { 
            // 创建一个数组并赋值 
            int[] arr = new int[6] {15, 33, 29, 55, 10, 11 }; 
            // 创建一个空数组
            int[] arr2 = new int[6]; 
            // 获取数组的长度
            Console.WriteLine("数组 arr 的长度为："+arr.Length); 
            // 为数组排序
            Array.Sort(arr); 
            Console.Write("排序后的数组 arr 为："); 
            // 打印排序后的 arr
            PrintArray(arr); 
            // 查找数组元素的索引
            Console.WriteLine("\n数组 arr 中值为 29 的元素的索引为："+Array.IndexOf(arr,29)); 
            // 拷贝 arr 到 arr2 
            Array.Copy(arr, arr2, arr.Length); 
            Console.Write("打印数组 arr2："); 
            // 打印数组 arr2 
            PrintArray(arr2); 
            Array.Reverse(arr); 
            Console.Write("\n反序排列数组 arr： "); 
            PrintArray(arr); 
        } 
        // 遍历数组元素
        static void PrintArray(int[] arr) 
        { 
            foreach (Object elem in arr) 
            { 
                Console.Write(elem+" "); 
            } 
        } 
    }
}
```

# C# String字符串

在 C# 中，string（或 String）关键字是 System.String 类的别名，其中提供了定义字符串以及操作字符串的一系列方法，下面就来详细介绍一下。

```c#
// 使用 System.String.Empty 定义一个空字符串
string str2 = System.String.Empty;
```

## 属性

| 属性         | 描述                                           |
| ------------ | ---------------------------------------------- |
| Chars[Int32] | 获取指定字符在字符串中的位置                   |
| Length       | 获取当前 String 对象中的字符数（字符串的长度） |

## 方法

| 方法                                | 描述                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| Clone()                             | 返回对此 String 实例的引用                                   |
| Compare(String, String)             | 比较两个指定的 String 对象，并返回一个指示二者在排序顺序中的相对位置的整数 |
| CompareOrdinal(String, String)      | 通过比较每个字符串中的字符，来比较两个字符串是否相等         |
| CompareTo(String)                   | 将一个字符串与另一个字符串进行比较                           |
| Concat(String, String)              | 连接两个指定的字符串                                         |
| Contains(String)                    | 判断一个字符串中是否包含零一个字符串                         |
| Copy(String)                        | 将字符串的值复制一份，并赋值给另一个字符串                   |
| CopyTo(Int32, Char[], Int32, Int32) | 从字符串中复制指定数量的字符到一个字符数组中                 |
| EndsWith(String)                    | 用来判断字符串是否以指定的字符串结尾                         |
| Equals(String, String)              | 判断两个字符串是否相等                                       |
| Format(String, Object)              | 将字符串格式化为指定的字符串表示形式                         |
| GetEnumerator()                     | 返回一个可以循环访问此字符串中的每个字符的对象               |
| GetHashCode()                       | 返回该字符串的哈希代码                                       |
| GetType()                           | 获取当前实例的类型                                           |
| GetTypeCode()                       | 返回字符串的类型代码                                         |
| IndexOf(String)                     | 返回字符在字符串中的首次出现的索引位置，索引从零开始         |
| Insert(Int32, String)               | 在字符串的指定位置插入另一个字符串，并返回新形成的字符串     |
| Intern(String)                      | 返回指定字符串的内存地址(返回的是引用)                       |
| IsInterned(String)                  | 返回指定字符串的内存地址(返回的是[可能为空](#C#可空类型)的引用) |
| IsNormalized()                      | 判断此字符串是否符合 Unicode 标准                            |
| IsNullOrEmpty(String)               | 判断指定的字符串是否为空（null）或空字符串（""）             |
| IsNullOrWhiteSpace(String)          | 判断指定的字符串是否为 null、空或仅由空白字符组成            |
| Join(String, String[])              | 串联字符串数组中的所有元素，并将每个元素使用指定的分隔符分隔开 |
| LastIndexOf(Char)                   | 获取某个字符在字符串中最后一次出现的位置                     |
| LastIndexOfAny(Char[])              | 获取一个或多个字符在字符串中最后一次出现的位置               |
| Normalize()                         | 返回一个新字符串，新字符串与原字符串的值相等，但其二进制表示形式符合 Unicode 标准 |
| PadLeft(Int32)                      | 返回一个指定长度的新字符串，新字符串通过在原字符串左侧填充空格来达到指定的长度，从而实现右对齐 |
| PadRight(Int32)                     | 返回一个指定长度的新字符串，新字符串通过在原字符串右侧填充空格来达到指定的长度，从而实现左对齐 |
| Remove(Int32)                       | 返回一个指定长度的新字符串，将字符串中超出长度以外的部分全部删除 |
| Replace(String, String)             | 使用指定字符替换字符串中的某个字符，并返回新形成的字符串     |
| Split(Char[])                       | 按照某个分隔符将一个字符串拆分成一个[字符串数组](#ArrayList动态数组),返回分割后的字符串数组 |
| StartsWith(String)                  | 判断字符串是否使用指定的字符串开头                           |
| Substring(Int32)                    | 从指定的位置截取字符串                                       |
| ToCharArray()                       | 将字符串中的字符复制到 Unicode 字符数组                      |
| ToLower()                           | 将字符串中的字母转换为小写的形式                             |
| ToLowerInvariant()                  | 使用固定区域性的大小写规则将字符串转换为小写的形式           |
| ToString()                          | 将其它数据类型转换为字符串类型                               |
| ToUpper()                           | 将字符串中的字母转换为大写形式                               |
| Trim()                              | 删除字符串首尾的空白字符                                     |
| TrimEnd(Char[])                     | 删除字符串尾部的空白字符                                     |
| TrimStart(Char[])                   | 删除字符串首部的空白字符                                     |

上表中只列举了一些 String 类中常用方法，可以通过查阅 C# 的[官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.string?view=netcore-3.1#methods)来了解 String 类中的全部的方法介绍。

# C# struct结构体

在 C# 中，结构体也被称为结构类型（“structure type”或“struct type”），它是一种可封装数据和相关功能的值类型，在语法上结构体与类（class）非常相似，它们都可以用来封装数据，并且都可以包含成员属性和成员方法。

```c#
struct Books {
    public string title;
    public string author;
    public string subject;
    public int book_id;
};
```

在设计结构体时有以下几点需要注意：

- 不能为结构体声明无参数的构造函数，因为每个结构体中都已经默认创建了一个隐式的、无参数的构造函数；
- 不能在声明成员属性时对它们进行初始化，静态属性和常量除外；
- 结构体的构造函数必须初始化该结构体中的所有成员属性；
- 结构体不能从其他类或结构体中继承，也不能作为类的基础类型，但是结构类型可以实现接口；
- 不能在结构体中声明析构函数。

**C# 中的结构体与 C/C++ 中的结构体有很大的不同**，在 C# 中结构体具有以下功能：

- 结构体中可以具有方法、字段、索引、属性、运算符方法和事件；
- 结构体中可以定义构造函数，但不能定义析构函数，需要注意的是，定义的构造函数不能没有参数，因为**没有参数的构造函数是 C# 默认自动定义的，而且不能更改**；
- 与类不同，结构体不能继承其他结构体或类；
- 结构体不能用作其他结构体或类的基础结构；
- 一种结构体可以实现一个或多个接口；
- **结构体成员不能被设定为 abstract、virtual 或 protected；**
- 与类不同，结构体可以不用 New 操作符来实例化，当使用 New 操作符来实例化结构体时会自动调用结构体中的构造函数；
- 如果不使用 New 操作符来实例化结构体，结构体对象中的字段将保持未分配状态，并且在所有字段初始化之前无法使用该结构体实例。

**类和结构体的主要区别**：

- 类是引用类型，结构体是值类型；
- 结构体不支持继承，但可以实现接口；
- 结构体中不能声明默认的构造函数。

> **类是引用类型，结构体是值类型；**
>
> 在C#中，结构体是值类型，意味着当你创建一个结构体的实例时，实际上在内存中存储的是该实例的实际数据。当你将一个结构体赋值给另一个变量或作为参数传递时，会复制整个结构体的数据。相比之下，类是引用类型，意味着当你创建一个类的实例时，内存中存储的是对该实例的引用，而不是实际数据。当你将一个类的实例赋值给另一个变量或作为参数传递时，实际上是传递了对同一个对象的引用，而不是对象的副本。

# C# enum枚举类型

枚举类型（也可以称为“枚举器”）由一组具有独立标识符（名称）的整数类型常量构成，在 C# 中枚举类型不仅可以在类或结构体的内部声明，也可以在类或结构体的外部声明，默认情况下枚举类型中成员的默认值是从 0 开始的，然后逐一递增。

在 C# 中可以使用 enum 关键字来声明枚举类型，语法格式如下所示：

```c#
enum enum_name{
  enumeration list;
}
```

在使用枚举类型时有以下几点需要注意：

- 枚举类型中不能定义方法；
- 枚举类型具有固定的常量集；
- 枚举类型可提高类型的安全性；
- 枚举类型可以遍历。

默认情况下，枚举类型中的每个成员都为 int 类型，它们的值从零开始，并按定义顺序依次递增。但是也可以显式的为每个枚举类型的成员赋值，如下所示

```c#
enum ErrorCode
{
    None,
    Unknown,
    ConnectionLost = 100,
    OutlierReading = 200
}
```

**遍历枚举**

```c#
//使用 GetValues()  遍历枚举类型中的所有成员：
namespace helloworld
{
    class Demo
    {
        enum Season {
            winter = 10,
            spring,
            summer = 15,
            autumn
        };
        static void Main(string[] args) 
        {
            foreach(Season i in Enum.GetValues(typeof(Season))){
                Console.WriteLine("{0} = {1}", i, (int)i);
            }
            Console.ReadKey();
        }
    }
}
//winter = 10
//spring = 11
//summer = 15
//autumn = 16

//使用 GetNames() 遍历枚举类型中的所有成员：
namespace helloworld
{
    class Demo
    {
        enum Season {
            winter = 10,
            spring,
            summer = 15,
            autumn
        };
        static void Main(string[] args) 
        {
            foreach(String s in Enum.GetNames(typeof(Season))){
                Console.WriteLine(s);
            }
            Console.ReadKey();
        }
    }
}
//winter
//spring
//summer
//autumn
```

# C# class类

类的定义语法格式:

```c#
<access specifier> class class_name
{
    // 成员属性
    <access specifier> <data type> variable1;
    <access specifier> <data type> variable2;
    ...
    <access specifier> <data type> variableN;
    // 成员函数/成员方法
    <access specifier> <return type> method1(parameter_list)
    {
        // 函数体
    }
    <access specifier> <return type> method2(parameter_list)
    {
        // 函数体
    }
    ...
    <access specifier> <return type> methodN(parameter_list)
    {
        // 函数体
    }
}
```

语法说明如下：

- `<access specifier>` 为访问权限修饰符，用来指定类或类中成员的访问规则，可以忽略不写，如果没有指定，则使用默认的访问权限修饰符，类的默认访问权限修饰符是 internal，类中成员的默认访问权限修饰符是 private；
- `class_name` 为类的名称；
- `<data type>` 为数据类型，用来指定成员属性的数据类型；
- `variable1、variable2` 等为成员属性的名称，类似于变量名；
- `<return type>` 为返回值类型，用来指定成员函数的返回值类型；
- `method1、method2` 等为成员函数的名称。

## 对象

类和对象是不同的概念，类决定了对象的类型，但不是对象本身。另外，类是在开发阶段创建的，而对象则是在程序运行期间创建的。可以将对象看作是基于类创建的实体，所以对象也可以称为类的实例。

想要创建一个类的实例需要使用 new 关键字: 

```c#
Student Object = new Student();

//类是引用类型
//虽然也可以像创建普通变量那样只创建一个 Student 类型的变量，而不使用 new 关键字实例化 Student 这个类
Student Object2;
//不过不建议使用这样的写法，因为此时的 Object2 只是一个 Student 类型的普通变量，它并没有被赋值，所以不能使用 Object2 来访问对象中的属性和方法。如果非要使用 Object2 的话，则可以将一个已经创建的对象赋值给它
Student Object3 = new Student();
Student Object2 = Object3;
//Object2 和 Object3 指向同一个 Student 对象，因此使用 Object3 对 Student 对象的任何操作也会影响到 Object2
```

## 构造函数

C# 中的构造函数有三种：

- 实例构造函数；
- 静态构造函数；
- 私有构造函数。

### 实例构造函数

构造函数是类中特殊的成员函数，它的名称与它所在类的名称相同，并且没有返回值。当使用 new 关键字创建类的对象时，可以使用实例构造函数来创建和初始化类中的任意成员属性

只要创建 Person 类的对象，就会调用类中的实例构造函数

```c#
public class Person{
    private string name;
    private int age;
    public Person(string n, int a)
    {
        name = n;
        age = a;
    }
    // 类中剩余的成员
}
//调用类中的实例构造函数
Person P = new Person("张三", 18);
```

如果没有为类显式的创建构造函数，那么 C# 将会为这个类隐式的创建一个没有参数的构造函数（无参数构造函数），这个无参的构造函数会在实例化对象时为类中的成员属性设置默认值（关于 C# 中类型的默认值可以查阅《[值类型](#值类型)》一节）。在结构体中也是如此，如果没有为结构体创建构造函数，那么 C# 将隐式的创建一个无参数的构造函数，用来将每个字段初始化为其默认值。

### 静态构造函数

静态构造函数用于初始化类中的静态数据或执行仅需执行一次的特定操作。静态构造函数将在**创建第一个实例或引用类中的静态成员之前自动调用**

静态构造函数具有以下特性：

- 静态构造函数不使用访问权限修饰符修饰或不具有参数；
- 类或结构体中只能具有一个静态构造函数；
- 静态构造函数不能继承或重载；
- 静态构造函数不能直接调用，仅可以由公共语言运行时 (CLR) 调用；
- 用户无法控制程序中静态构造函数的执行时间；
- 在创建第一个实例或引用任何静态成员之前，将自动调用静态构造函数以初始化类；
- 静态构造函数会在实例构造函数之前运行。

```c#
using System;

namespace helloworld
{
    class Demo
    {
        public static int num = 0;
        // 构造函数
        Demo(){
            num = 1;
        }
        // 静态构造函数
        static Demo(){
            num = 2;
        }
        static void Main(string[] args) 
        {
            Console.WriteLine("num = {0}", num);
            Demo Obj = new Demo();
            Console.WriteLine("num = {0}", num);
            Console.Read();
        }
    }
}
//当执行上面程序时，会首先执行public static int num = 0，接着执行类中的静态构造函数，此时 num = 2，然后执行 Main 函数里面的内容，此时打印 num 的值为 2，接着初始化 Demo 类，这时会执行类中的构造函数，此时 num 会重新赋值为 1，所以上例的运行结果如下所示：
//num = 2
//num = 1
```

### 私有构造函数

私有构造函数是一种特殊的实例构造函数，**通常用在只包含静态成员的类中**。如果一个类中具有一个或多个私有构造函数而没有公共构造函数的话，那么其他类（除嵌套类外）则无法创建该类的实例。

> 对于一些类并不需要实例化就用这种方式防止实例化

```c#
class NLog
{
    // 私有构造函数
    private NLog() { }
    public static double e = Math.E;  //2.71828...
}
```

上例中定义了一个空的私有构造函数，这么做的好处就是空构造函数可阻止自动生成无参数构造函数。需要注意的是，如果不对构造函数使用访问权限修饰符，则默认它为私有构造函数。

## 析构函数

与《[构造函数](#构造函数)》类似，C# 中的析构函数（也被称作“终结器”）同样是类中的一个特殊成员函数，主要用于在垃圾回收器回收类实例时执行一些必要的清理操作。

C# 中的析构函数具有以下特点：

- 析构函数只能在类中定义，不能用于结构体；
- 一个类中只能定义一个析构函数；
- 析构函数不能继承或重载；
- 析构函数没有返回值；
- 析构函数是自动调用的，不能手动调用；
- 析构函数不能使用访问权限修饰符修饰，也不能包含参数。

析构函数的名称同样与类名相同，不过需要在名称的前面加上一个波浪号`~`作为前缀，如下所示：

```c#
class Car
{
  ~Car() // 析构函数
  {

  }
}
```

注意：**析构函数不能对外公开**，所以我们不能在析构函数上应用任何访问权限修饰符。

## C# this关键字

 C# 中，可以使用 this 关键字来表示当前对象，日常开发中我们可以使用 this 关键字来访问类中的成员属性以及函数。不仅如此 this 关键字还有一些其它的用法

1. 使用 this 表示当前类的对象

2. 使用 this 关键字串联构造函数

   ```c#
   public class Test
       {
           public Test()
           {
               Console.WriteLine("无参构造函数");
           }
           // 这里的 this()代表无参构造函数 Test()
   　　      // 先执行 Test()，后执行 Test(string text)
           public Test(string text) : this() //此处
           {
               Console.WriteLine(text);
               Console.WriteLine("实例构造函数");
           }
       }
   ```

3. 使用 this 关键字作为类的索引器

   ```c#
   //可以理解为c++重载operator[]函数
   public class Test
       {
           int Temp0;
           int Temp1;
           public int this[int index]
           {
               get
               {
                   return (0 == index) ? Temp0 : Temp1;
               }
       
               set
               {
                   if (0==index)
                       Temp0 = value;//注意这个value也是关键字
                   else
                       Temp1 = value;
               }
           }
   ```

4. 使用 this 关键字作为原始类型的扩展方法

   > 扩展方法是对现有类型功能的一种补充，但这种补充并非改变原始类型的行为，而是为它们添加新的行为，使其看起来像是类型本身就具有这些方法

   ```c#
   class Demo
       {
           static void Main(string[] args) 
           {
               string str = "你好世界";
               string newstr = str.ExpandString();//调用拓展方法
               Console.WriteLine(newstr);
           }
       }
       public static class Test
       {
           public static string ExpandString(this string name)//定义给string类型的拓展方法
           {
               return name+" hello world";
           }
       }
   //上述代码中,ExpandString是一个拓展方法,它拓展了string类型,使其看起来拥有将字符串转换为标题格式的功能.这里的`this string name`就表示这个方法是拓展string类型的,调用时如同直接在`string`对象上调用该方法一样
   ```

   C#的扩展方法并**不适用于原始类型**，而是适用于任何用户自定义类型或.NET Framework内建的引用类型（如`string`）。原始类型如`int`、`double`等不支持扩展方法。

## C# 静态成员

在 C# 中，我们可以使用 static 关键字声明属于类型本身而不是属于特定对象的静态成员，因此不需要使用对象来访问静态成员。在类、接口和结构体中可以使用 static 关键字修饰变量、函数、构造函数、类、属性、运算符和事件。

> 注意：**索引器和析构函数不能是静态的**。

若在定义某个成员时使用 static 关键字，则表示该类仅存在此成员的一个实例，也就是说当我们将一个类的成员声明为静态成员时，无论创建多少个该类的对象，静态成员只会被创建一次，这个静态成员会被所有对象共享。

### 静态属性

使用 static 定义的成员属性称为“静态属性”，静态属性可以直接通过`类名.属性名`的形式直接访问，不需要事先创建类的实例。静态属性不仅可以使用成员函数来初始化，还可以直接在类外进行初始化。

### 静态函数

除了可以定义静态属性外，static 关键字还可以用来定义成员函数，使用 static 定义的成员函数称为“静态函数”，静态函数只能访问静态属性

### C# 静态类

C#中的静态类是一种特殊的类，它具备以下几个显著特征：

1. **静态成员限定**：静态类只能包含静态成员（字段、属性、方法、事件和嵌套类型），不能包含实例成员（非静态字段、非静态方法等）。这意味着你不能在静态类中定义构造函数，因为构造函数总是与实例关联的。
2. **不可实例化**：由于静态类仅包含静态成员，所以不能使用`new`关键字创建该类的实例。也就是说，静态类不能有实例生命周期，因为它不是为了创建对象而设计的。
3. **静态构造函数**：尽管静态类不能有实例构造函数，但可以有一个静态构造函数，它在第一次访问该类的任何静态成员之前自动调用，并且在整个程序中只调用一次。静态构造函数用于初始化静态类的静态数据成员或者执行必要的静态资源初始化。
4. **单一实例和全局可见性**：静态类的所有成员都是全局共享的，意味着对静态成员的任何更改都会影响到整个应用程序的所有使用者。
5. **密封性**：静态类在概念上类似于密封的抽象类，因为它既不能被继承也不能被实例化，仅仅作为一个组织相关静态成员的容器。
6. **编译时常量**：静态类常用于封装与类层次结构无关的全局常量、工具方法或服务，这些内容在整个应用程序域中只需要一份拷贝即可。
7. **加载时机**：.NET Framework公共语言运行库（CLR）会在加载包含静态类的程序集时自动加载此类及其成员。

总结来说，C#静态类的主要目的是组织和管理那些不需要与类实例关联的、全局可用的功能和数据。

## C# 继承

C# 中只支持单继承，也就是说一个派生类只能继承一个基类

```c#
class 派生类 : 基类{
    ... ...
}
```

> **所有的C#类都隐式继承自`System.Object`类，该类提供了这些可以被子类重写的方法。**

### C# 接口

> 对应C++中的纯虚基类

接口可以看作是一个约定，其中定义了类或结构体继承接口后需要实现功能，接口的特点如下所示：

- 接口是一个引用类型，通过接口可以实现多重继承；
- 接口中只能声明"抽象"成员，所以不能直接对接口进行实例化；
- 接口中可以包含方法、属性、事件、索引器等成员；
- 接口名称一般习惯使用字母“I”作为开头（不是必须的，不这样声明也可以）；
- 接口中成员的访问权限默认为 public，所以我们在定义接口时不用再为接口成员指定任何访问权限修饰符，否则编译器会报错；
- 在声明接口成员的时候，不能为接口成员编写具体的可执行代码，也就是说，只要在定义成员时指明成员的名称和参数就可以了；
- 接口一旦被实现（被一个类继承），派生类就必须实现接口中的所有成员，除非派生类本身也是抽象类。

在 C# 中声明接口需要使用 interface 关键字，语法结构如下所示：

```c#
public interface InterfaceName{
  returnType funcName1(type parameterList);
  returnType funcName2(type parameterList);
  ... ...
}
```

其中，InterfaceName 为接口名称，returnType 为返回值类型，funcName 为成员函数的名称，parameterList 为参数列表。

在 C# 中，一个接口可以继承另一个接口，例如可以使用接口 1 继承接口 2，当用某个类来实现接口 1 时，必须同时实现接口 1 和接口 2 中的所有成员，下面通过一个示例来演示一下：

```c#
using System;

namespace helloworld
{
    public interface IParentInterface
    {
        void ParentInterfaceMethod();
    }

    public interface IMyInterface : IParentInterface
    {
        void MethodToImplement();
    }
    class Demo : IMyInterface
    {
        static void Main(string[] args) 
        {
            Demo demo = new Demo();
            demo.MethodToImplement();
            demo.ParentInterfaceMethod();
        }
        public void MethodToImplement(){
            Console.WriteLine("实现 IMyInterface 接口中的 MethodToImplement 函数");
        }
        public void ParentInterfaceMethod(){
            Console.WriteLine("实现 IParentInterface 接口中的 ParentInterfaceMethod 函数");
        }
    }
}
//实现 IMyInterface 接口中的 MethodToImplement 函数
//实现 IParentInterface 接口中的 ParentInterfaceMethod 函数
```

### 接口实现的多重继承

与单继承相反，多重继承则是指一个类可以同时继承多个基类，C# 并不支持多重继承，但是可以借助接口来实现多重继承

```c#
using System;
namespace helloworld
{
    class Demo
    {
        static void Main(string[] args) 
        {
            Rectangle oblong = new Rectangle();
            oblong.setWidth(3);
            oblong.setHeight(4);
            int area = oblong.getArea();
            int girth = oblong.getGirth();
            Console.WriteLine("长方形的面积为：{0}", area);
            Console.WriteLine("长方形的周长为：{0}", girth);
        }
    }
    // 基类
    class Shape{
        protected int width, height;
        public void setWidth(int w){
            width = w;
        }
        public void setHeight(int h){
            height = h;
        }
    }
    // 定义接口
    public interface Perimeter{
        int getGirth();
    }
    // 派生类
    class Rectangle : Shape, Perimeter{
        public int getArea(){
            return width*height;
        }
        public int getGirth(){
            return (width+height)*2;
        }
    }
}
```

### 接口实现的泛型数据结构实例

```c#
List<IEquipment> equipmentList = new List<IEquipment>();
```

在C#中，接口是一种抽象类型，无法直接实例化。在这种情况下， `List<IEquipment> `并不是实例化了一个接口，而是实例化了一个**泛型列表**，该列表可以存储实现了 `IEquipment `接口的类的实例。因为接口可以被类实现，所以你可以将实现了 `IEquipment `接口的类的实例添加到 `equipmentList `。

但要注意:**只有接口中定义的方法和属性才能被List对象访问**

## C# 多态

在 C# 中具有两种类型的多态：

- 编译时多态：通过 C# 中的方法重载和运算符重载来实现编译时多态，也称为静态绑定或早期绑定；
- 运行时多态：通过方法重载实现的运行时多态，也称为动态绑定或后期绑定。

### 编译时多态

在编译期间将函数与对象链接的机制称为早期绑定，也称为静态绑定。C# 提供了两种技术来实现编译时多态，分别是函数重载和运算符重载

#### 函数重载

在同一个作用域中，可以定义多个同名的函数，但是这些函数彼此之间必须有所差异，比如参数个数不同或参数类型不同等等，**返回值类型不同除外**。

#### 运算符重载

C# 中支持运算符重载，所谓运算符重载就是我们可以使用自定义类型来重新定义 C# 中大多数运算符的功能。运算符重载需要通过 operator 关键字后跟运算符的形式来定义的，我们可以将被重新定义的运算符看作是具有特殊名称的函数，与其他函数一样，该函数也有返回值类型和参数列表，如下例所示：

```c#
// 重载 + 运算符，把两个 Box 对象相加
public static Box operator+ (Box b, Box c)
{
   	 Box box = new Box();
     box.length = b.length + c.length;
     box.breadth = b.breadth + c.breadth;
     box.height = b.height + c.height;
     return box;
 }
```

##### 可重载与不可重载的运算符

| 运算符                                                       | 可重载性                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `+、-、!、~、++、--`                                         | 这些一元运算符可以进行重载                                   |
| `+、-、*、/、%、&、|、^、<<、>>、=、!=、<、>、<=、>=`        | 这些二元运算符可以进行重载，需要注意的是某些运算符必须成对重载 |
| `&&、||`                                                     | 无法重载逻辑运算符                                           |
| `(type)var_name`                                             | 强制类型转换运算符不能重载                                   |
| `+=、-=、*=、/=、%=、&=、|=、^=、<<=、>>=`                   | 复合赋值运算符不能显式重载。 但在重载二元运算符时，也会隐式重载相应的复合赋值运算符，例如重载了`+`运算符也会隐式的重载`+=` |
| `^、=、.、?.、?  : 、??、??=、..、->、=>、as、await、checked、unchecked、default、delegate、is、nameof、new、sizeof、stackalloc、switch、typeof` | 这些运算符无法进行重载                                       |

> 注意：比较运算符必须成对重载，也就是说，如果重载一对运算符中的任意一个，则另一个运算符也必须重载。比如`==`和`!=`运算符、`<`和`>`运算符、`<=`和`>=`运算符。

演示如下:

```c#
using System;

namespace helloworld
{
    class Box
    {
        private double length;      // 长度
        private double breadth;     // 宽度
        private double height;      // 高度

        public double getVolume()
        {
            return length * breadth * height;
        }
        public void setLength( double len )
        {
            length = len;
        }

        public void setBreadth( double bre )
        {
            breadth = bre;
        }

        public void setHeight( double hei )
        {
            height = hei;
        }
        // 重载 + 运算符来把两个 Box 对象相加
        public static Box operator+ (Box b, Box c)
        {
            Box box = new Box();
            box.length = b.length + c.length;
            box.breadth = b.breadth + c.breadth;
            box.height = b.height + c.height;
            return box;
        }

        public static bool operator== (Box lhs, Box rhs)
        {
            bool status = false;
            if (lhs.length == rhs.length && lhs.height == rhs.height && lhs.breadth == rhs.breadth)
            {
                status = true;
            }
            return status;
        }
        public static bool operator!= (Box lhs, Box rhs)
        {
            bool status = false;
            if (lhs.length != rhs.length || lhs.height != rhs.height || lhs.breadth != rhs.breadth)
            {
                status = true;
            }
            return status;
        }
        public override bool Equals(object o)
        {
            if(o==null) return false;
            if(GetType() != o.GetType()) return false;
            return true;
        }
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
        public static bool operator <(Box lhs, Box rhs)
        {
            bool status = false;
            if (lhs.length < rhs.length && lhs.height < rhs.height && lhs.breadth < rhs.breadth)
            {
                status = true;
            }
            return status;
        }

        public static bool operator >(Box lhs, Box rhs)
        {
            bool status = false;
            if (lhs.length > rhs.length && lhs.height > rhs.height && lhs.breadth > rhs.breadth)
            {
                status = true;
            }
            return status;
        }

        public static bool operator <=(Box lhs, Box rhs)
        {
            bool status = false;
            if (lhs.length <= rhs.length && lhs.height <= rhs.height && lhs.breadth <= rhs.breadth)
            {
                status = true;
            }
            return status;
        }

        public static bool operator >=(Box lhs, Box rhs)
        {
            bool status = false;
            if (lhs.length >= rhs.length && lhs.height >= rhs.height && lhs.breadth >= rhs.breadth)
            {
                status = true;
            }
            return status;
        }
        public override string ToString()
        {
            return String.Format("({0}, {1}, {2})", length, breadth, height);
        }
    }
    class Demo
    {
        static void Main(string[] args) 
        {
            Box Box1 = new Box();          // 声明 Box1，类型为 Box
            Box Box2 = new Box();          // 声明 Box2，类型为 Box
            Box Box3 = new Box();          // 声明 Box3，类型为 Box
            Box Box4 = new Box();
            double volume = 0.0;   // 体积

            // Box1 详述
            Box1.setLength(6.0);
            Box1.setBreadth(7.0);
            Box1.setHeight(5.0);

            // Box2 详述
            Box2.setLength(12.0);
            Box2.setBreadth(13.0);
            Box2.setHeight(10.0);

            // 使用重载的 ToString() 显示两个盒子
            Console.WriteLine("Box1： {0}", Box1.ToString());
            Console.WriteLine("Box2： {0}", Box2.ToString());
          
            // Box1 的体积
            volume = Box1.getVolume();
            Console.WriteLine("Box1 的体积： {0}", volume);

            // Box2 的体积
            volume = Box2.getVolume();
            Console.WriteLine("Box2 的体积： {0}", volume);

            // 把两个对象相加
            Box3 = Box1 + Box2;
            Console.WriteLine("Box3： {0}", Box3.ToString());
            // Box3 的体积
            volume = Box3.getVolume();
            Console.WriteLine("Box3 的体积： {0}", volume);

            //comparing the boxes
            if (Box1 > Box2)
                Console.WriteLine("Box1 大于 Box2");
            else
                Console.WriteLine("Box1 不大于 Box2");
            if (Box1 < Box2)
                Console.WriteLine("Box1 小于 Box2");
            else
                Console.WriteLine("Box1 不小于 Box2");
            if (Box1 >= Box2)
                Console.WriteLine("Box1 大于等于 Box2");
            else
                Console.WriteLine("Box1 不大于等于 Box2");
            if (Box1 <= Box2)
                Console.WriteLine("Box1 小于等于 Box2");
            else
                Console.WriteLine("Box1 不小于等于 Box2");
            if (Box1 != Box2)
                Console.WriteLine("Box1 不等于 Box2");
            else
                Console.WriteLine("Box1 等于 Box2");
            Box4 = Box3;
            if (Box3 == Box4)
                Console.WriteLine("Box3 等于 Box4");
            else
                Console.WriteLine("Box3 不等于 Box4");

            Console.ReadKey();
        }
    }
}
//Box1： (6, 7, 5)
//Box2： (12, 13, 10)
//Box1 的体积： 210
//Box2 的体积： 1560
//Box3： (18, 20, 15)
//Box3 的体积： 5400
//Box1 不大于 Box2
//Box1 小于 Box2
//Box1 不大于等于 Box2
//Box1 小于等于 Box2
//Box1 不等于 Box2
//Box3 等于 Box4 等于 Box4
```

### 运行时多态

C# 允许您使用 abstract 关键字来创建抽象类，抽象类用于实现部分接口。另外，抽象类包含抽象方法，可以在派生类中实现。

下面列举了一些有关抽象类的规则：

- 不能创建一个抽象类的实例；
- 不能在一个抽象类外部声明抽象方法；
- 通过在类定义时使用 sealed 关键字，可以将类声明为密封类，密封类不能被继承，因此抽象类中不能声明密封类。

```c#
using System;
namespace helloworld
{
    abstract class Shape{
        public abstract int area();
    }
    class Rectangle : Shape{
        private int width, height;
        public Rectangle(int w, int h){
            width = w;
            height = h;
        }
        public override int area(){//覆写抽象类中的抽象方法
            return (width * height);
        }
    }
    class Demo
    {
        static void Main(string[] args) 
        {          
          	Shape r = new Rectangle(12,15);
            //Rectangle r = new Rectangle(12,15); //都可以
            double a = r.area();
            Console.WriteLine("长方形的面积为： {0}",a);
            Console.ReadKey();
        }
    }
}
//运行结果如下:
//长方形的面积为： 180
```

# C# namespace：命名空间

在 C# 中，可以将命名空间看作是一个范围，用来标注命名空间中成员的归属，一个命名空间中类与另一个命名空间中同名的类互不冲突，但在同一个命名空间中类的名称必须是唯一的。

> 在一个简单的 C# 程序中，假如我们要输出某些数据，就需要使用`System.Console.WriteLine()`，其中 System 就是命名空间，而 Console 是类的名字，WriteLine 则是具体要使用方法。也就是说，如果要访问某个命名空间中的类，我们需要使用`namespacename.classname.funcname()`的形式。当然也可以使用 using 关键字来引用需要的命名空间，例如`using System`，这样我们就可以直接使用`Console.WriteLine()`来输出指定的数据了。

在 C# 中定义命名空间需要使用 namespace 关键字，语法格式如下：

```c#
namespace namespaceName{
    // 命名空间中的代码
}
//调用指定命名空间下的成员,需要使用
namespaceName.className.funcName()
```

### using关键字

using 关键字用来引用指定的命名空间，它可以告诉编译器后面的代码中我们需要用到某个命名空间。例如我们在程序中需要使用到 System 命名空间，只需要在程序的开始使用`using System`引用该命名空间即可，这时我们在使用 System 命名空间下的类时就可以将`System.`省略，例如`Console.WriteLine();`。

```c#
using System;
using First;
using Second;

namespace helloworld
{
    class Demo
    {
        static void Main(string[] args) 
        {
            firstClass first = new firstClass();
            secondClass second = new secondClass();
            first.sayHello();//签名相同的函数,要指明哪个命名空间中的函数
            second.sayHello();
        }
    }
}

namespace First{
    public class firstClass{
        public void sayHello(){
            System.Console.WriteLine("First 命名空间下 demoClass 类中的 sayHello 函数");
        }
    }
}

namespace Second{
    public class secondClass{
        public void sayHello(){
            System.Console.WriteLine("Second 命名空间下 demoClass 类中的 sayHello 函数");
        }
    }
}
```

命名空间可以嵌套使用，也就是说我们可以在一个命名空间中再定义一个或几个命名空间，如下所示：

```c#
namespace namespaceName1{
  // namespaceName1 下的代码
  namespace namespaceName2{
    // namespaceName2 下的代码
  }
}
```

您可以使用点`.`运算符来访问嵌套的命名空间成员，例如`namespaceName1.namespaceName2`

# C# 预处理器指令

预处理指令的作用主要是向编译器发出指令，以便在程序编译开始之前对信息进行一些预处理操作。在 C# 中，预处理器指令均以`#`开头，并且预处理器指令之前只能出现空格不能出现任何代码。另外，预处理器指令不是语句，因此它们不需要以分号`;`结尾。

在 C# 中，预处理指令用于帮助条件编译。**不同于 C 和 C++ 中的指令，在 C# 中不能使用这些指令来创建宏**，而且预处理器指令必须是一行中唯一的代码，不能掺杂其它。

## C# 中的预处理器指令

| 预处理器指令 | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| #define      | 用于定义一系列字符，可以将这些字符称为符号                   |
| #undef       | 用于取消一个已定义符号                                       |
| #if          | 用于测试符号是否为真                                         |
| #else        | 用于创建复合条件指令，与 #if 一起使用                        |
| #elif        | 用于创建复合条件指令                                         |
| #endif       | 指定一个条件指令的结束                                       |
| #line        | 用于修改编译器的行数以及（可选地）输出错误和警告的文件名     |
| #error       | 用于在代码的指定位置生成一个错误                             |
| #warning     | 用于在代码的指定位置生成一级警告                             |
| #region      | 用于在使用 Visual Studio Code Editor 的大纲特性时，指定一个可展开或折叠的代码块 |
| #endregion   | 用于标识 #region 块的结束                                    |

## #define 预处理器

\#define 预处理器指令用来创建符号常量，这个符号可以作为传递给 #if 指令的表达式，表达式将返回 true。#define 的语法格式如下：

`#define symbol`

```c#
#define PI
using System;

namespace helloworld
{
    class Demo
    {
        static void Main(string[] args) 
        {
            #if (PI)
                Console.WriteLine("PI 已定义");
            #else
                Console.WriteLine("PI 未定义");
            #endif
            Console.ReadKey();
        }
    }
}
//PI 已定义
```

## 条件指令

您可以使用 #if 来创建条件指令，条件指令可以用于测试一个或多个符号的值是否为 true 。如果符号的值为 true，那么编译器将评估 #if 指令和下一个指令之间的所有代码。在语法上 #if 预处理器语句与 C# 中的 if 条件判断语句比较相似，如下所示：

```c#
#if symbol_1
    // 要执行的代码
#elif symbol_2
    // 要执行的代码
#else
    // 要执行的代码
#endif
//symbol 是要测试的符号的名称
```

条件指令中仅可以使用运算符`==`（相等）和`!=`（不相等）来测试布尔值 true 或 false，例如 true 表示已定义该符号。另外，还可以使用`&& (and)`、`|| (or)`和`! (not)`运算符来同时测试多个符号，以及使用括号对符号和运算符分组。

# C# 正则表达式

> 正则表达式是一种匹配输入文本的模式，可以用于解析和验证给定文本以及模式之间是否匹配，模式可以包含运算符、字符字面值或结构。

参考[[正则表达式]]

## Regex类

Regex 类用于使用一个正则表达式，下表中列出了 Regex 类中一些常用的方法：

| 方法                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `public bool IsMatch( string input )`                        | 指示 Regex 构造函数中指定的正则表达式是否在指定的输入字符串中找到匹配项 |
| `public bool IsMatch( string input, int startat )`           | 指示 Regex 构造函数中指定的正则表达式是否在指定的输入字符串中找到匹配项，从字符串中指定的位置开始查找 |
| `public static bool IsMatch( string input, string pattern )` | 指示指定的正则表达式是否在指定的输入字符串中找到匹配项       |
| `public MatchCollection Matches( string input )`             | 在指定的输入字符串中搜索正则表达式的所有匹配项               |
| `public string Replace( string input, string replacement )`  | 在指定的输入字符串中，把所有匹配正则表达式模式的所有匹配的字符串替换为指定的替换字符串 |
| `public string[] Split( string input )`                      | 把输入字符串分割为子字符串数组，根据在 Regex 构造函数中指定的正则表达式模式定义的位置进行分割 |

# C# 异常

在 C# 中，异常是在程序运行出错时引发的，例如以一个数字除以零，所有异常都派生自 System.Exception 类。异常处理则是处理运行时错误的过程，使用异常处理可以使程序在发生错误时保持正常运行。

C# 中的异常处理基于四个关键字构建，分别是 try、catch、finally 和 throw。

- try：try 语句块中通常用来存放容易出现异常的代码，其后面紧跟一个或多个 catch 语句块；
- catch：catch 语句块用来捕获 try 语句块中的出现的异常；
- finally：finally 语句块用于执行特定的语句，不管异常是否被抛出都会执行；
- throw：throw 用来抛出一个异常。

```c#
try{
   // 引起异常的语句
}catch( ExceptionName e1 ){
   // 错误处理代码
}catch( ExceptionName e2 ){
   // 错误处理代码
}
...
catch( ExceptionName eN ){
   // 错误处理代码
}finally{
   // 要执行的语句
}
```

## C#中的异常类

C# 中的异常类主要是从 System.Exception 类派生的，比如 System.ApplicationException 和 System.SystemException 两个异常类就是从 System.Exception 类派生的。

- System.ApplicationException 类支持由程序产生的异常，因此我们自定义的异常都应继承此类；
- System.SystemException 类是所有系统预定义异常的基类。

下表中列举了一些从 Sytem.SystemException 类派生的预定义异常类：

| 异常类                            | 描述                                         |
| --------------------------------- | -------------------------------------------- |
| System.IO.IOException             | 处理 I/O 错误                                |
| System.IndexOutOfRangeException   | 处理当方法引用超出范围的数组索引时产生的错误 |
| System.ArrayTypeMismatchException | 处理当数组类型不匹配时产生的错误             |
| System.NullReferenceException     | 处理引用一个空对象时产生的错误               |
| System.DivideByZeroException      | 处理当除以零时产生的错误                     |
| System.InvalidCastException       | 处理在类型转换期间产生的错误                 |
| System.OutOfMemoryException       | 处理空闲内存不足产生的错误                   |
| System.StackOverflowException     | 处理栈溢出产生的错误                         |

## 自定义异常类

除了可以使用系统预定义的异常类外，我们还可以自行定义异常类，自定义的异常类都应继承 System.ApplicationException 类。下面通过示例来演示一下自定义异常类的使用：

```c#
using System;

namespace helloworld
{
    class Demo
    {
        static void Main(string[] args) 
        {
            TestUserDefinedException test = new TestUserDefinedException();
            try{
                test.validate(12);
            }catch(InvalidAgeException e){
                Console.WriteLine("InvalidAgeException: {0}", e);
            }
            Console.WriteLine("其它代码");
        }
    }
}
public class InvalidAgeException : ApplicationException
{
   public InvalidAgeException (string message): base(message)
   {
   }
}
public class TestUserDefinedException
{
   public void validate(int age)
   {
      if(age < 18)
      {
         throw (new InvalidAgeException("Sorry, Age must be greater than 18"));
      }
   }
}
//InvalidAgeException: InvalidAgeException: Sorry, Age must be greater than 18
//   在 TestUserDefinedException.validate(Int32 age)
//   在 helloworld.Demo.Main(String[] args)
//其它代码
```

## 抛出异常

如果异常是直接或间接派生自 System.Exception 类，则可以在 catch 语句块中使用 throw 语句抛出该异常，所谓抛出异常这里可以理解为重新引发该异常。throw 语句的语法格式如下所示：

```cpp
catch(Exception e) {
  ...
  Throw e
}
```

# C# 文件读写

> 文件是存储在磁盘中的具有特定名称和目录路径的数据集合，当我们使用程序对文件进行读取或写入时，程序会将文件以数据流（简称流）的形式读入内存中。我们可以将流看作是通过通信路径传递的字节序列，流主要分为输入流和输出流，输入流主要用于从文件读取数据（读操作），输出流主要用于向文件中写入数据（写操作）。

## C# 中的 I/O 类

System.IO 命名空间中包含了各种用于文件操作的类，例如文件的创建、删除、读取、写入等等。如下表中所示：

| I/O 类         | 描述                                           |
| -------------- | ---------------------------------------------- |
| BinaryReader   | 从二进制流中读取原始数据                       |
| BinaryWriter   | 以二进制格式写入原始数据                       |
| BufferedStream | 临时存储字节流                                 |
| Directory      | 对目录进行复制、移动、重命名、创建和删除等操作 |
| DirectoryInfo  | 用于对目录执行操作                             |
| DriveInfo      | 获取驱动器的信息                               |
| File           | 对文件进行操作                                 |
| FileInfo       | 用于对文件执行操作                             |
| FileStream     | 用于文件中任何位置的读写                       |
| MemoryStream   | 用于随机访问存储在内存中的数据流               |
| Path           | 对路径信息执行操作                             |
| StreamReader   | 用于从字节流中读取字符                         |
| StreamWriter   | 用于向一个流中写入字符                         |
| StringReader   | 用于从字符串缓冲区读取数据                     |
| StringWriter   | 用于向字符串缓冲区写入数据                     |

## FileStream 类

FileStream 类在 System.IO 命名空间下，使用它可以读取、写入和关闭文件。创建 FileStream 类对象的语法格式如下所示：

```C#
FileStream <object_name> = new FileStream(<file_name>, <FileMode Enumerator>, <FileAccess Enumerator>, <FileShare Enumerator>);
//例子:
FileStream F = new FileStream("sample.txt", FileMode.Open, FileAccess.Read, FileShare.Read);
```

参数说明如下：

- object_name：创建的对象名称；
- file_name：文件的路径（包含文件名在内）；
- FileMode：枚举类型，用来设定文件的打开方式，可选值如下：
  - Append：打开一个已有的文件，并将光标放置在文件的末尾。如果文件不存在，则创建文件；
  - Create：创建一个新的文件，如果文件已存在，则将旧文件删除，然后创建新文件；
  - CreateNew：创建一个新的文件，如果文件已存在，则抛出异常；
  - Open：打开一个已有的文件，如果文件不存在，则抛出异常；
  - OpenOrCreate：打开一个已有的文件，如果文件不存在，则创建一个新的文件并打开；
  - Truncate：打开一个已有的文件，然后将文件清空（删除原有内容），如果文件不存在，则抛出异常。
- FileAccess：枚举类型，用来**设置文件的存取**，可选值有 Read、ReadWrite 和 Write；
- FileShare：枚举类型，用来**设置文件的权限**，可选值如下：
  - Inheritable：允许子进程继承文件句柄，Win32 不直接支持此功能；
  - None：在文件关闭前拒绝共享当前文件，打开该文件的任何请求（由此进程或另一进程发出的请求）都将失败；
  - Read：允许随后打开文件读取，如果未指定此标志，则文件关闭前，任何打开该文件以进行读取的请求都将失败，需要注意的是，即使指定了此标志，仍需要附加权限才能够访问该文件；
  - ReadWrite：允许随后打开文件读取或写入，如果未指定此标志，则文件关闭前，任何打开该文件以进行读取或写入的请求都将失败，需要注意的是，即使指定了此标志，仍需要附加权限才能够访问该文件；
  - Write：允许随后打开文件写入，如果未指定此标志，则文件关闭前，任何打开该文件以进行写入的请求都将失败，需要注意的是，即使指定了此标志，仍可能需要附加权限才能够访问该文件；
  - Delete：允许随后删除文件。

### FileStream 类中的常用方法

| 方法                        | 描述                                                       |
| --------------------------- | ---------------------------------------------------------- |
| Close()                     | 关闭当前流并释放与之关联的所有资源（如套接字和文件句柄）   |
| CopyTo(Stream)              | 从当前流中读取字节并将其写入到另一流中                     |
| Dispose()                   | 释放由 Stream 使用的所有资源                               |
| Equals(Object)              | 判断指定对象是否等于当前对象                               |
| Finalize()                  | 确保垃圾回收器回收 FileStream 时释放资源并执行其他清理操作 |
| Flush()                     | 清除此流的缓冲区，使得所有缓冲数据都写入到文件中           |
| GetHashCode()               | 默认哈希函数                                               |
| GetType()                   | 获取当前实例的 Type                                        |
| Lock(Int64, Int64)          | 防止其他进程读取或写入 FileStream                          |
| Read(Byte[], Int32, Int32)  | 从流中读取字节块并将该数据写入给定缓冲区中                 |
| ReadByte()                  | 从文件中读取一个字节，并将读取位置提升一个字节             |
| ToString()                  | 返回表示当前对象的字符串                                   |
| Unlock(Int64, Int64)        | 允许其他进程访问以前锁定的某个文件的全部或部分             |
| Write(Byte[], Int32, Int32) | 将字节块写入文件流                                         |
| WriteByte(Byte)             | 将一个字节写入文件流中的当前位置                           |

```c#
using System;
using System.IO;

namespace c.biancheng.net
{
    class Demo
    {
        static void Main(string[] args) 
        {
            FileStream file = new FileStream("test.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite);

            for(int i = 0; i < 20; i++){
                file.WriteByte((byte)i);
            }
            file.Position = 0;

            for(int i = 0; i < 20; i++){
                Console.Write(file.ReadByte() + " ");
            }
            file.Close();
            Console.ReadKey();
        }
    }
}
```

`FileStream` 是一个较低级别的类，是直接操作文件的字节流的，无论是读取还是写入都是基于字节的,它适用于需要对原始二进制数据进行精确控制的场合，例如读写图像、音频、自定义格式的数据文件等。但如果需要更复杂的数据读取写入操作,那么应该考虑下面的两种方式

- [二进制文件读写](#二进制文件读写)  用于各种数据类型的二进制读写
- [文本文件的读写](#文本文件的读写)  用于文本的读写

#### 二进制文件读写

C# 中的 **BinaryReader** 和 **BinaryWriter** 类可以用于二进制文件的读写。

##### BinaryReader

BinaryReader 类用于从文件读取二进制数据，类中的常用方法如下所示：

| 方法                                       | 描述                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| public override void Close()               | 关闭 BinaryReader 对象和基础流                               |
| public virtual int Read()                  | 从基础流中读取字符，并根据所使用的编码和从流中读取的特定字符，将流的当前位置前移 |
| public virtual bool ReadBoolean()          | 从当前流中读取一个布尔值，并将流的当前位置前移一个字节       |
| public virtual byte ReadByte()             | 从当前流中读取下一个字节，并将流的当前位置前移一个字节       |
| public virtual byte[] ReadBytes(int count) | 从当前流中读取指定数目的字节到一个字节数组中，并将流的当前位置前移指定数目的字节 |
| public virtual char ReadChar()             | 从当前流中读取下一个字节，并把流的当前位置按照所使用的编码和从流中读取的指定的字符往前移 |
| public virtual char[] ReadChars(int count) | 从当前流中读取指定数目的字符，并以字符数组的形式返回数据，并把流的当前位置按照所使用的编码和从流中读取的指定的字符往前移 |
| public virtual double ReadDouble()         | 从当前流中读取一个 8 字节浮点值，并把流的当前位置前移八个字节 |
| public virtual int ReadInt32()             | 从当前流中读取一个 4 字节有符号整数，并把流的当前位置前移四个字节 |
| public virtual string ReadString()         | 从当前流中读取一个字符串，字符串以长度作为前缀，同时编码为一个七位的整数 |

完整的方法列表查阅 [C# 的官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.io.binaryreader)。

##### BinaryWriter

BinaryWriter 类用于向文件写入二进制数据，类中的常用方法如下表所示：

| 方法                                                   | 描述                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| public override void Close()                           | 关闭 BinaryWriter 对象和基础流                               |
| public virtual void Flush()                            | 清理当前编写器的所有缓冲区，使得所有缓冲数据写入基础设备     |
| public virtual long Seek(int offset,SeekOrigin origin) | 设置当前流中的位置                                           |
| public virtual void Write(bool value)                  | 将一个字节的布尔值写入到当前流中，0 表示 false，1 表示 true  |
| public virtual void Write(byte value)                  | 将一个无符号字节写入到当前流中，并把流的位置前移一个字节     |
| public virtual void Write(byte[] buffer)               | 将一个字节数组写入到基础流中                                 |
| public virtual void Write(char ch)                     | 将一个 Unicode 字符写入到当前流中，并把流的当前位置按照所使用的编码和要写入到流中的指定字符往前移 |
| public virtual void Write(char[] chars)                | 将一个字符数组写入到当前流中，并把流的当前位置按照所使用的编码和要写入到流中的指定字符往前移 |
| public virtual void Write(double value)                | 将一个 8 字节浮点值写入到当前流中，并把流位置前移八个字节    |
| public virtual void Write(int value)                   | 将一个 4 字节有符号整数写入到当前流中，并把流位置前移四个字节 |
| public virtual void Write(string value)                | 将一个有长度前缀的字符串按 BinaryWriter 的当前编码写如到流中，并把流的当前位置按照所使用的编码和要写入到流中的指定字符往前移 |


完整的方法列表请查阅 [C# 的官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.io.binarywriter)。

```c#
BinaryWriter bw;
BinaryReader br;
int i = 25;
double d = 3.14157;
bool b = true;
string s = "你好世界";
// 创建文件
try{
    bw = new BinaryWriter(new FileStream("mydata", FileMode.Create));
}catch (IOException e){
    Console.WriteLine(e.Message + "\n 文件创建失败！");
    return;
}
// 写入文件
try{
    bw.Write(i);
    bw.Write(d);
    bw.Write(b);
    bw.Write(s);
}catch (IOException e){
    Console.WriteLine(e.Message + "\n 文件写入失败！");
}
bw.Close();
// 读取文件
try{
    br = new BinaryReader(new FileStream("mydata", FileMode.Open));
}catch (IOException e){
    Console.WriteLine(e.Message + "\n 文件打开失败！");
    return;
}
try{
    i = br.ReadInt32();
    Console.WriteLine("Integer data: {0}", i);
    d = br.ReadDouble();
    Console.WriteLine("Double data: {0}", d);
    b = br.ReadBoolean();
    Console.WriteLine("Boolean data: {0}", b);
    s = br.ReadString();
    Console.WriteLine("String data: {0}", s);
}catch (IOException e){
    Console.WriteLine(e.Message + "\n 文件读取失败！.");
}
br.Close();
```

#### 文本文件的读写

System.IO 命名空间下的 **StreamReader** 和 **StreamWriter** 类可以用于文本文件的数据读写。这些类继承自抽象基类 Stream，Stream 类提供了对文件流读写的功能。

##### StreamReader

StreamReader 类继承自抽象基类 TextReader，用来从文件中读取一系列字符，下表列出了 StreamReader 类中一些常用的方法：

| 方法                         | 描述                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| public override void Close() | 关闭 StreamReader 对象和基础流，并释放任何与之相关的系统资源 |
| public override int Peek()   | 返回下一个可用的字符，但不使用它                             |
| public override int Read()   | 从输入流中读取下一个字符，并把字符位置往前移一个字符         |

完整的方法列表，可以访问 [C# 的官网文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.io.streamreader)。

```c#
// 创建 StreamReader 类的对象
StreamReader file = new StreamReader("test.txt");
string line;
// 从文件中读取内容
while((line = file.ReadLine()) != null){
    Console.WriteLine(line);
}
file.Close();
```

##### StreamWriter

StreamWriter 类同样继承自抽象类 TextWriter，用来向文件中写入一系列字符，下表列出了 StreamWriter 类中一些常用的方法：

| 方法                                     | 描述                                            |
| ---------------------------------------- | ----------------------------------------------- |
| public override void Close()             | 关闭当前的 StreamWriter 对象和基础流            |
| public override void Flush()             | 清理当前所有的缓冲区，使所有缓冲数据写入基础流  |
| public virtual void Write(bool value)    | 将布尔值的文本表示形式写入文本流                |
| public override void Write(char value)   | 将一个字符写入流                                |
| public virtual void Write(decimal value) | 将一个小数值的文本表示形式写入文本流            |
| public virtual void Write(double value)  | 将一个 8 字节浮点值的文本表示形式写入文本流     |
| public virtual void Write(int value)     | 将一个 4 字节有符号整数的文本表示形式写入文本流 |
| public override void Write(string value) | 将一个字符串写入文本流                          |
| public virtual void WriteLine()          | 将行结束符写入文本流                            |


完整的方法列表查阅 [C# 的官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.io.streamwriter)。

```c#
// 要写入文件中的数据
string[] str = new string[]{
    "你好世界",
    "hello world",
    "C#"
};
// 创建 StreamWriter 类的对象
StreamWriter file = new StreamWriter("demo.txt");
// 将数组中的数据写入文件
foreach(string s in str){
    file.WriteLine(s);
}
file.Close();
```

# C# 目录操作

## DirectoryInfo

DirectoryInfo 类派生自 FileSystemInfo 类，其中提供了各种用于创建、移动、浏览目录和子目录的方法。需要注意的是，该类不能被继承。

**常用属性**

| 属性           | 描述                               |
| -------------- | ---------------------------------- |
| Attributes     | 获取当前文件或目录的属性           |
| CreationTime   | 获取当前文件或目录的创建时间       |
| Exists         | 获取一个表示目录是否存在的布尔值   |
| Extension      | 获取表示文件存在的字符串           |
| FullName       | 获取目录或文件的完整路径           |
| LastAccessTime | 获取当前文件或目录最后被访问的时间 |
| Name           | 获取该 DirectoryInfo 实例的名称    |

**常用方法**

| 方法                                                 | 描述                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| public void Create()                                 | 创建一个目录                                                 |
| public DirectoryInfo CreateSubdirectory(string path) | 在指定的路径上创建子目录，指定的路径可以是相对于 DirectoryInfo 类的实例的路径 |
| public override void Delete()                        | 如果为空的，则删除该 DirectoryInfo                           |
| public DirectoryInfo[] GetDirectories()              | 返回当前目录的子目录                                         |
| public FileInfo[] GetFiles()                         | 从当前目录返回文件列表                                       |

完整的方法以及属性介绍，查阅 [C# 官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.io.directoryinfo)。

```c#
//获取当前目录文件列表
// 创建一个 DirectoryInfo 对象
DirectoryInfo mydir = new DirectoryInfo(@"./");
// 获取目录中的文件以及它们的名称和大小
FileInfo[] f = mydir.GetFiles();
foreach (FileInfo file in f)
{
    Console.WriteLine("文件名称：{0} 大小：{1}", file.Name, file.Length);
}
Console.ReadKey();
```

# C# 文件操作

## FileInfo

FileInfo 类派生自 FileSystemInfo 类，其中提供了用于创建、复制、删除、移动、打开文件的属性和方法。与 DirectoryInfo 类相同，FileInfo 类也不能被继承。

**常用属性**

| 属性           | 描述                             |
| -------------- | -------------------------------- |
| Attributes     | 获取当前文件的属性               |
| CreationTime   | 获取当前文件的创建时间           |
| Directory      | 获取文件所属目录的一个实例       |
| Exists         | 获取一个表示文件是否存在的布尔值 |
| Extension      | 获取表示文件存在的字符串         |
| FullName       | 获取文件的完整路径               |
| LastAccessTime | 获取当前文件最后被访问的时间     |
| LastWriteTime  | 获取文件最后被写入的时间         |
| Length         | 获取当前文件的大小，以字节为单位 |
| Name           | 获取文件的名称                   |

**常用方法**

| 方法                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| public StreamWriter AppendText()                             | 创建一个 StreamWriter，追加文本到由 FileInfo 的实例表示的文件中 |
| public FileStream Create()                                   | 创建一个文件                                                 |
| public override void Delete()                                | 永久删除一个文件                                             |
| public void MoveTo(string destFileName)                      | 移动一个指定的文件到一个新的位置，提供选项来指定新的文件名   |
| public FileStream Open(FileMode mode)                        | 以指定的模式打开一个文件                                     |
| public FileStream Open(FileMode mode,FileAccess access)      | 以指定的模式，使用 read、write 或 read/write 访问，来打开一个文件 |
| public FileStream Open(FileMode mode,FileAccess access,FileShare share) | 以指定的模式，使用 read、write 或 read/write 访问，以及指定的分享选项，来打开一个文件 |
| public FileStream OpenRead()                                 | 创建一个只读的 FileStream                                    |
| public FileStream OpenWrite()                                | 创建一个只写的 FileStream                                    |

完整的方法以及属性介绍，查阅 [C# 官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.io.fileinfo)

# C# 特性

特性（Attribute）是一种用于在程序运行时传递各种元素（例如类、方法、结构、枚举等）**行为信息的声明性代码**。使用特性可以将元数据（例如编译器指令、注释、描述、方法和类等信息）添加到程序中。.Net Framework 提供了两种类型的特性，分别是

- [预定义特性](#预定义特性)
- [自定义特性](#自定义特性)

在 C# 中，特性具有以下属性：

- 使用特性可以向程序中添加元数据，元数据是指程序中各种元素的相关信息，所有 .NET 程序中都包含一组指定的元数据；
- 可以将一个或多个特性应用于整个程序、模块或者较小的程序元素（例如类和属性）中；
- 特性可以像方法和属性一样接受自变量；
- 程序可使用反射来检查自己的元数据或其他程序中的元数据。

## 预定义特性

.Net Framework 中提供了三个预定义的属性：

- [AttributeUsage](#AttributeUsage)
- [Conditional](#Conditional)
- [Obsolete](#Obsolete)

### AttributeUsage

预定义特性 AttributeUsage 用来描述如何使用自定义特性类，其中定义了可以应用特性的项目类型。AttributeUsage 的语法格式如下：

```c#
[AttributeUsage (
   validon,
   AllowMultiple = allowmultiple,
   Inherited = inherited
)]

//如:
[AttributeUsage(AttributeTargets.Class |
AttributeTargets.Constructor |
AttributeTargets.Field |
AttributeTargets.Method |
AttributeTargets.Property,
AllowMultiple = true)]
```

参数说明如下：

- 参数 validon 用来定义特性可被放置的语言元素。它是枚举器 AttributeTargets 的值的组合。默认值是 AttributeTargets.All；
- 参数 allowmultiple（可选参数）用来为该特性的 AllowMultiple 属性（property）提供一个布尔值，默认值为 false（单用的），如果为 true，则该特性是多用的；
- 参数 inherited（可选参数）用来为该特性的 Inherited 属性（property）提供一个布尔值，默认为 false（不被继承），如果为 true，则该特性可被派生类继承。

```c#
class Demo
{
  //该特性允许使用别名?来取代Help
	[CommandLineSwitchAlias("?")]
  public bool Help
  {
			//...
  }
  
  //该特性指出Out是一个必要参数
	[CommandLineSwitchRequired]
  public string Out
  {
    	//...
	}

}

```



### Conditional

预定义特性 Conditional 用来标记一个方法，它的执行依赖于指定的预处理标识符。根据该特性值的不同，在编译时会起到不同的效果，例如当值为 Debug 或 Trace 时，会在调试代码时显示变量的值。

预定义特性 Conditional 的语法格式如下：

```c#
[Conditional(
  conditionalSymbol
)]

//如:
[Conditional("DEBUG")]
```

案例

```c#
#define DEBUG
using System;
using System.Diagnostics;

namespace c.biancheng.net
{
    class Demo
    {
        static void function1()
        {
            Myclass.Message("Function1 函数");
            function2();
        }
        static void function2()
        {
            Myclass.Message("Function2 函数");
        }
        static void Main(string[] args) 
        {
            Myclass.Message("Main 函数");
            function1();
            Console.ReadKey();
        }
    }
    public class Myclass
    {
        [Conditional("DEBUG")]
        public static void Message(string msg)
        {
            Console.WriteLine(msg);
        }
    }
}
```

这个代码中，`[Conditional("DEBUG")]` 特性作用于 `Myclass.Message` 方法，它告诉编译器该方法的执行应取决于预处理器符号 `DEBUG` 是否被定义。在代码顶部，有一个预处理器指令 `#define DEBUG`，这意味着在编译阶段，`DEBUG` 符号被定义。当 `Message` 方法前面加上 `[Conditional("DEBUG")]` 特性时，意味着在调试版本（即 `DEBUG` 符号被定义时）编译代码时，`Message` 方法会被正常编译并执行。而**在发布版本（即 `DEBUG` 符号未定义时），编译器将会移除所有对该方法的调用，就像这些调用从未存在过一样**。这样一来，当你在发布版中运行这段代码时，`Myclass.Message` 方法不会输出任何消息，因为它在编译阶段就被优化掉了。而在调试版中运行时，你将看到所有的消息打印出来。这种方法常用于插入调试代码，以便在调试阶段辅助追踪程序流程，而不影响最终发布产品的性能或体积。

### Obsolete

预定义特性 Obsolete 用来标记不应被使用的程序，您可以使用它来通知编译器放弃某个目标元素。例如当您需要使用一个新方法来替代类中的某个旧方法时，就可以使用该特性将旧方法标记为 obsolete（过时的）并来输出一条消息，来提示我们应该使用新方法代替旧方法。

预定义特性 Obsolete 的语法格式如下：

```C#
//两种任选一种
[Obsolete (
  message
)]

[Obsolete (
  message,
  iserror
)]
```

语法说明如下：

- 参数 `message` 是一个字符串，用来描述项目为什么过时以及应该使用什么替代；
- 参数 `iserror` 是一个布尔值，默认值是 false（编译器会生成一个警告），如果设置为 true，那么编译器会把该项目的当作一个错误。

```c#
using System;
namespace c.biancheng.net
{
    class Demo
    {
        [Obsolete("OldMethod 已弃用，请改用 NewMethod", true)]
        static void OldMethod()
        {
          Console.WriteLine("已弃用的函数");
        }
        static void NewMethod()
        {
          Console.WriteLine("新定义的函数");
        }
        static void Main(string[] args) 
        {
            OldMethod();
        }
    }
}
//demo.cs(18,10): error CS0619: “c.biancheng.net.Demo.OldMethod()”已过时:“OldMethod 已弃用，请改用 NewMethod”
```

## 自定义特性

.Net Framework 允许您创建自定义特性，自定义特性不仅可以用于存储声明性的信息，还可以在运行时被检索。创建并使用自定义特性可以分为四个步骤：

- 声明自定义特性；
- 构建自定义特性；
- 在目标程序上应用自定义特性；
- 通过反射访问特性。

最后一步涉及编写一个简单的程序来读取元数据以便查找各种符号。元数据是有关数据或用于描述其他数据信息的数据。该程序应在运行时使用反射来访问属性

### 声明自定义属性

自定义特性应该继承 System.Attribute 类，如下所示：

```c#
// 一个自定义特性 BugFix 被赋给类及其成员
[AttributeUsage(
   AttributeTargets.Class |
   AttributeTargets.Constructor |
   AttributeTargets.Field |
   AttributeTargets.Method |
   AttributeTargets.Property,
   AllowMultiple = true)]

public class DeBugInfo : System.Attribute
//声明了一个名为 DeBugInfo 的自定义属性
```

### 构建自定义特性

让我们构建一个名为 DeBugInfo 的自定义特性，该特性可以存储下面列举的调试信息：

- bug 的代码编号；
- 该 bug 的开发人员名字；
- 上次审查代码的日期；
- 一个存储了开发人员标记的字符串消息。


DeBugInfo 类中带有三个用于存储前三个信息的私有属性（property）和一个用于存储消息的公有属性（public）。所以 bug 编号、开发人员名字和审查日期将是 DeBugInfo 类的必需的定位（ positional）参数，而消息则是一个可选的命名（named）参数。

每个特性都至少有一个构造函数，而且定位（ positional）参数需要通过构造函数传递

```c#
// 一个自定义特性 BugFix 被赋给类及其成员
[AttributeUsage(AttributeTargets.Class |
AttributeTargets.Constructor |
AttributeTargets.Field |
AttributeTargets.Method |
AttributeTargets.Property,
AllowMultiple = true)]

public class DeBugInfo : System.Attribute
{
  private int bugNo;
  private string developer;
  private string lastReview;
  public string message;

  public DeBugInfo(int bg, string dev, string d)
  {
      this.bugNo = bg;
      this.developer = dev;
      this.lastReview = d;
  }

  public int BugNo
  {
      get
      {
          return bugNo;
      }
  }
  public string Developer
  {
      get
      {
          return developer;
      }
  }
  public string LastReview
  {
      get
      {
          return lastReview;
      }
  }
  public string Message
  {
      get
      {
          return message;
      }
      set
      {
          message = value;
      }
  }
}
```

### 应用自定义特性

通过把特性放置在紧挨着它的目标上面来应用该特性

```c#
using System;

namespace c.biancheng.net
{
    class Demo
    {
        static void Main(string[] args) 
        {
            Rectangle rec = new Rectangle(12, 15);
            rec.Display();
        }
    }

    [DeBugInfo(45, "Zara Ali", "12/8/2012", Message = "返回值类型不匹配")]
    [DeBugInfo(49, "Nuha Ali", "10/10/2012", Message = "未使用变量")]
    class Rectangle
    {
        // 成员变量
        protected double length;
        protected double width;
        public Rectangle(double l, double w)
        {
            length = l;
            width = w;
        }
        [DeBugInfo(55, "Zara Ali", "19/10/2012",
        Message = "返回值类型不匹配")]
        public double GetArea()
        {
            return length * width;
        }
        [DeBugInfo(56, "Zara Ali", "19/10/2012")]
        public void Display()
        {
            Console.WriteLine("Length: {0}", length);
            Console.WriteLine("Width: {0}", width);
            Console.WriteLine("Area: {0}", GetArea());
        }
    }
    // 一个自定义特性 BugFix 被赋给类及其成员
    [AttributeUsage(AttributeTargets.Class |
    AttributeTargets.Constructor |
    AttributeTargets.Field |
    AttributeTargets.Method |
    AttributeTargets.Property,
    AllowMultiple = true)]

    public class DeBugInfo : System.Attribute
    {
        private int bugNo;
        private string developer;
        private string lastReview;
        public string message;

        public DeBugInfo(int bg, string dev, string d)
        {
            this.bugNo = bg;
            this.developer = dev;
            this.lastReview = d;
        }

        public int BugNo
        {
            get
            {
                return bugNo;
            }
        }
        public string Developer
        {
            get
            {
                return developer;
            }
        }
        public string LastReview
        {
            get
            {
                return lastReview;
            }
        }
        public string Message
        {
            get
            {
                return message;
            }
            set
            {
                message = value;
            }
        }
    }
}
/*
Length: 12
Width: 15
Area: 180
*/
```

通过把特性放置在紧挨着它的目标上面来应用该特性

> `DeBugInfo` 是一个自定义特性（Attribute），它主要用于记录与调试和错误修复相关的信息,这些信息并不是直接参与到程序的运行逻辑中，而是在编译后的元数据中保存，可以通过反射在运行时读取这些信息。这段代码中并未提供如何在运行时读取并利用这些自定义特性所携带的信息。要真正发挥其作用，通常还需要额外编写代码，通过反射API来提取和展示这些元数据。

# C# 属性

属性（Property）是类（class）、结构体(struct)和接口（interface）的成员，类或结构体中的成员变量称为字段，属性是字段的扩展，使用访问器（accessors）可以读写私有字段的值。

属性没有确切的内存位置，但具有可读写或计算的访问器。例如有一个名为 Student 的类，其中包含 age、name 和 code 三个私有字段，我们不能在类的范围以外直接访问这些字段，但是可以访问这些私有字段的属性。

> 在C#中，属性提供了一种封装类字段并公开对其访问的方式。属性允许您定义对类成员的访问方法，这样您可以控制对类的数据的访问方式。通过属性，您可以实现对类的字段的读取和写入操作，并在必要时执行其他逻辑（比如验证输入或触发事件）。属性使代码更易读，更易维护，并提供了一种更安全的方式来访问类的数据。

## 访问器

属性访问器有两种，分别是 get 属性访问器和 set 属性访问器。其中 get 访问器用来返回属性的值，set 访问器用来为属性设置新值。在声明访问器时可以仅声明其中一个，也可以两个访问器同时声明，如下例所示：

```c#
// 声明 string 类型的 Code 属性
public string Code {
   get {
      return code;
   }
   set {
      code = value;
   }
}

// 声明 string 类型的 Name 属性
public string Name {
   get {
      return name;
   }
   set {
      name = value;
   }
}

// 声明 int 类型的 Age 属性
public int Age {
   get {
      return age;
   }
   set {
      age = value;
   }
}
//学生信息: 编号 = 001, 姓名 = Zara, 年龄 = 9
//学生信息: 编号 = 001, 姓名 = Zara, 年龄 = 10
```

## 抽象属性

抽象类中可以拥有抽象属性，这些属性会在派生类中实现，下面就通过一个示例来演示一下：

```C#
using System;

namespace c.biancheng.net
{
    class Demo
    {
        static void Main(string[] args) 
        {
            // 创建一个新的 Student 对象
            Student s = new Student();

            // 设置 student 的 code、name 和 age
            s.Code = "001";
            s.Name = "Zara";
            s.Age = 9;
            Console.WriteLine("学生信息: {0}", s);
            // 增加年龄
            s.Age += 1;
            Console.WriteLine("学生信息: {0}", s);
            Console.ReadKey();
        }
    }
    public abstract class Person
    {
        public abstract string Name
        {
            get;
            set;
        }
        public abstract int Age
        {
            get;
            set;
        }
    }
    class Student
    {
        private string code = "N.A";
        private string name = "not known";
        private int age = 0;

        // 声明类型为 string 的 Code 属性
        public string Code
        {
            get
            {
                return code;
            }
            set
            {
                code = value;
            }
        }

        // 声明类型为 string 的 Name 属性
        public string Name
        {
            get
            {
                return name;
            }
            set
            {
                name = value;
            }
        }

        // 声明类型为 int 的 Age 属性
        public int Age
        {
            get
            {
                return age;
            }
            set
            {
                age = value;
            }
        }
        public override string ToString()
        {
            return "编号 = " + Code +", 姓名 = " + Name + ", 年龄 = " + Age;
        }
    }
}
//学生信息: 编号 = 001, 姓名 = Zara, 年龄 = 9
//学生信息: 编号 = 001, 姓名 = Zara, 年龄 = 10
```

# C# 索引器

索引器（英文名：Indexer）是类中的一个特殊成员，它能够让对象以类似数组的形式来操作，使程序看起来更为直观，更容易编写。索引器与[属性](#C# 属性)类似，在定义索引器时同样会用到 get 和 set 访问器，不同的是，访问属性不需要提供参数而访问索引器则需要提供相应的参数。

C# 中属性的定义需要提供属性名称，而索引器则不需要具体名称，而是使用 this 关键字来定义，语法格式如下：

```c#
索引器类型 this[int index]
{
  // get 访问器
  get
  {  
    // 返回 index 指定的值
  }

  // set 访问器
  set
  {
    // 设置 index 指定的值
  }
}
```

索引器的使用

```c#
using System;

namespace c.biancheng.net
{
    class Demo
    {
        static void Main(string[] args){
            Demo names = new Demo();
            names[0] = "C语言中文网";
            names[1] = "http://c.biancheng.net/";
            names[2] = "C#教程";
            names[3] = "索引器";
            for ( int i = 0; i < Demo.size; i++ ){
                Console.WriteLine(names[i]);
            }
            Console.ReadKey();
        }

        static public int size = 10;
        private string[] namelist = new string[size];
        public Demo(){
            for (int i = 0; i < size; i++)
                namelist[i] = "NULL";
        }
        public string this[int index]{//索引器定义
            get{
                string tmp;

                if( index >= 0 && index <= size-1 ){
                    tmp = namelist[index];
                }else{
                    tmp = "";
                }

                return ( tmp );
            }
            set{
                if( index >= 0 && index <= size-1 ){
                    namelist[index] = value;
                }
            }
        }
    }
}
```

## 索引器重载

索引器可以被重载，而且在声明索引器时也可以带有多个参数，每个参数可以是不同的类型。另外，索引器中的索引不必是整数，也可以是其他类型，例如字符串类型。

```c#
using System;

namespace c.biancheng.net
{
    class Demo
    {
        static void Main(string[] args){
            Demo names = new Demo();
            names[0] = "C语言中文网";
            names[1] = "http://c.biancheng.net/";
            names[2] = "C#教程";
            names[3] = "索引器";
            // 使用带有 int 参数的第一个索引器
            for (int i = 0; i < Demo.size; i++){
                Console.WriteLine(names[i]);
            }
            // 使用带有 string 参数的第二个索引器
            Console.WriteLine("“C#教程”的索引为：{0}",names["C#教程"]);
            Console.ReadKey();
        }

        static public int size = 10;
        private string[] namelist = new string[size];
        public Demo(){
            for (int i = 0; i < size; i++)
                namelist[i] = "NULL";
        }
        public string this[int index]{
            get{
                string tmp;

                if( index >= 0 && index <= size-1 ){
                    tmp = namelist[index];
                }else{
                    tmp = "";
                }

                return ( tmp );
            }
            set{
                if( index >= 0 && index <= size-1 ){
                    namelist[index] = value;
                }
            }
        }
        public int this[string name]{
            get{
                int index = 0;
                while(index < size){
                    if(namelist[index] == name){
                        return index;
                    }
                    index++;
                }
                return index;
            }
        }
    }
}
```

# C# 委托

C# 中的委托（Delegate）类似于 C 或 C++ 中的函数指针，是一种引用类型，表示对具有特定参数列表和返回类型的方法的引用。委托特别适用于实现事件和回调方法，所有的委托都派生自 System.Delegate 类。在实例化委托时，可以将委托的实例与具有相同返回值类型的方法相关联，这样就可以通过委托来调用方法。另外，使用委托还可以将方法作为参数传递给其他方法，

委托具有以下特点：

- 委托类似于 C/C++ 中的函数指针，但委托是完全面向对象的。另外，C++ 中的指针会记住函数，而委托则是同时封装对象实例和方法；
- 委托允许将方法作为参数进行传递；
- 委托可用于定义回调方法；
- 委托可以链接在一起，例如可以对一个事件调用多个方法；
- 方法不必与委托类型完全匹配；
- C# 2.0 版引入了 匿名函数 的概念，可以将代码块作为参数（而不是单独定义的方法）进行传递。C# 3.0 引入了 Lambda 表达式，利用它们可以更简练地编写内联代码块。匿名方法和 Lambda 表达式都可编译为委托类型，这些功能现在统称为匿名函数。

## 声明委托

声明委托需要使用 delegate 关键字，语法格式如下：

`delegate <return type> delegate-name(<parameter list>)`

其中 `return type` 为返回值类型，`delegate-name` 为委托的名称，`parameter list` 为参数列表。

> 提示：委托可以引用与委托具有相同签名的方法，也就是说委托在声明时即确定了委托可以引用的方法。

## 实例化委托

委托一旦声明，想要使用就必须使用 new 关键字来创建委托的对象，同时将其与特定的方法关联。如下例所示：

```c#
public delegate void printString(string s);           // 声明一个委托
...
printString ps1 = new printString(WriteToScreen);    // 实例化委托对象并将其与 WriteToScreen 方法关联
printString ps2 = new printString(WriteToFile);      // 实例化委托对象并将其与 WriteToFile 方法关联
```

委托案例

```c#
using System;

delegate int NumberChanger(int n);      // 定义委托
namespace c.biancheng.net
{
    class Demo
    {
        static int num = 10;
        public static int AddNum(int p){//被委托的函数
            num += p;
            return num;
        }

        public static int MultNum(int q){//被委托的函数
            num *= q;
            return num;
        }
        public static int getNum(){
            return num;
        }
        static void Main(string[] args){
            // 创建委托实例
            NumberChanger nc1 = new NumberChanger(AddNum);//实例化委托
            NumberChanger nc2 = new NumberChanger(MultNum);//实例化委托
            // 使用委托对象调用方法
            nc1(25);//使用委托
            Console.WriteLine("num 的值为: {0}", getNum());
            nc2(5);//使用委托
            Console.WriteLine("num 的值为: {0}", getNum());
            Console.ReadKey();
        }
    }
}
```

## 多播委托（合并委托）

委托对象有一个非常有用的属性，那就是可以通过使用`+`运算符将多个对象分配给一个委托实例，同时还可以使用`-`运算符从委托中移除已分配的对象，当委托被调用时会依次调用列表中的委托。委托的这个属性被称为委托的多播，也可称为组播，利用委托的这个属性，您可以创建一个调用委托时要调用的方法列表。

注意：仅可合并类型相同的委托。

> 所有委托都支持单一回调(换言之,多重性(multiplicity)等于1).然而,一个委托变量可以引用一系列委托,在这一系列委托中,每个委托都顺序指向一个后续的委托,从而形成了一个委托链,或者称为多播委托(multicast delegate).使用**多播委托**,可以通过一个方法对象来调用一个方法链,创建变量来引用

```c#
using System;

delegate int NumberChanger(int n);      // 定义委托
namespace c.biancheng.net
{
    class Demo
    {
        static int num = 10;
        public static int AddNum(int p){
            num += p;
            return num;
        }

        public static int MultNum(int q){
            num *= q;
            return num;
        }
        public static int getNum(){
            return num;
        }
        static void Main(string[] args){
            // 创建委托实例
            NumberChanger nc;
            NumberChanger nc1 = new NumberChanger(AddNum);
            NumberChanger nc2 = new NumberChanger(MultNum);
            nc = nc1;
            nc += nc2;
            // 调用多播
            nc(5);
            Console.WriteLine("num 的值为: {0}", getNum());
            Console.ReadKey();
        }
    }
}
//num 的值为: 75
```

> 自我理解:相当于C++指针,但比指针多了一个组合功能,可以让一个委托为好几个不同的委托的组合

打印案例

```c#
//定义一个委托 printString，我们使用这个委托来调用两个方法，第一个把字符串打印到控制台，第二个把字符串打印到文件
using System;
using System.IO;

namespace c.biancheng.net
{
    class Demo
    {
        static FileStream fs;
        static StreamWriter sw;
        // 委托声明
        public delegate void printString(string s);

        // 该方法打印到控制台
        public static void WriteToScreen(string str){
            Console.WriteLine("The String is: {0}", str);
        }
        // 该方法打印到文件
        public static void WriteToFile(string s){
            fs = new FileStream("./message.txt", FileMode.Append, FileAccess.Write);
            sw = new StreamWriter(fs);
            sw.WriteLine(s);
            sw.Flush();
            sw.Close();
            fs.Close();
        }
        // 该方法把委托作为参数，并使用它调用方法
        public static void sendString(printString ps)
        {
            ps("C语言中文网");
        }
        static void Main(string[] args){
            printString ps1 = new printString(WriteToScreen);
            printString ps2 = new printString(WriteToFile);
            sendString(ps1);
            sendString(ps2);
            Console.ReadKey();
        }
    }
}
```

# C# 事件

在 C# 中，事件（Event）可以看作是用户的一系列操作，例如点击键盘的某个按键、单击/移动鼠标等，当事件发生时我们可以针对事件做出一系列的响应，例如退出程序、记录日志等等。**C# 中线程之间的通信就是使用事件机制实现的**。

> 在C#中，事件是一种特殊的委托，它**允许类对象通知其他类对象发生的特定动作**。在C++中，你可以使用回调函数来实现类似的功能，但是事件在C#中提供了更强大和更易于使用的机制来实现类似的行为。

**事件需要在类中声明和触发，并通过委托与事件处理程序关联**。**事件可以分为发布器和订阅器两个部分，其中发布器是一个包含事件和委托的对象，事件和委托之间的联系也定义在这个类中，发布器类的对象可以触发事件，并使用委托通知其他的对象；订阅器则是一个接收事件并提供事件处理程序的对象，发布器类中的委托调用订阅器类中的方法（事件处理程序）。**

有关事件我们需要注意以下几点：

- 发布器确定何时触发事件，订阅器确定对事件作出何种响应；
- 一个事件可以拥有多个订阅器，同时订阅器也可以处理来自多个发布器的事件；
- 没有订阅器的事件永远也不会触发；
- 事件通常用于定义针对用户的操作，例如单击某个按钮；
- 如果事件拥有多个订阅器，当事件被触发时会同步调用所有的事件处理程序；
- 在 .NET 类库中，事件基于 EventHandler 委托和 EventArgs 基类。

若要在类中声明一个事件，首先需要为该事件声明一个委托类型，例如：

`public delegate void delegate_name(string status);`

然后使用 event 关键字来声明事件本身，如下所示：

```c#
// 基于上面的委托定义事件
public event delegate_name event_name;
```

上例中定义了一个名为 delegate_name 和名为 event_name 的事件，当事件触发的时侯会调用委托。

```c#
using System;

namespace c.biancheng.net
{
    class Demo
    {
        static void Main(string[] args){
            PublisherDemo e = new PublisherDemo(); /* 实例发布器类*/
            SubscriberDemo v = new SubscriberDemo(); /* 实例订阅器类 */
            e.MyEvent += new PublisherDemo.MyEntrust( v.printf );
            e.SetValue("C语言中文网");
        }
    }
    /***********发布器类***********/
    public class PublisherDemo{
        private string value;

        public delegate void MyEntrust(string str);

        public event MyEntrust MyEvent;

        public void SetValue( string s ){
            value = s;
            MyEvent(value);     // 触发事件
        }
    }

    /***********订阅器类***********/
    public class SubscriberDemo{
        public void printf(string str){
            Console.WriteLine(str);
        }
    }
}
```

## 注意点

A事件添加B事件,B事件添加A事件,会产生事件循环

# C# 集合

C# 中的集合类（Collection）是专门用于数据存储和检索的类，类中提供了对栈（stack）、队列（queue）、列表（list）和哈希表（hash table）的支持。大多数集合类都实现了相同的接口。

集合类的用途多种多样，例如可以动态的为元素分配内存、根据索引访问列表项等等，这些类创建 Object 类的对象集合，Object 类是 C# 中所有数据类型的基类。

| 类                                            | 描述和用法                                                   |
| --------------------------------------------- | ------------------------------------------------------------ |
| [动态数组（ArrayList）](#ArrayList动态数组)   | 动态数组表示可被单独索引的对象的有序集合。 动态数组基本上与数组相似，唯一不同的是动态数组可以使用索引在指定的位置添加和移除项目，动态数组会自动重新调整自身的大小。 另外，动态数组也允许在列表中进行动态内存分配、增加、搜索、排序等等。 |
| [哈希表（Hashtable）](#Hashtable哈希表)       | 哈希表可以使用键来访问集合中的元素。 哈希表中的每一项都由一个键/值对组成，键用于访问集合中的指定项。 |
| [排序列表（SortedList）](#SortedList排序列表) | 排序列表是数组和哈希表的组合，可以使用键或索引来访问列表中的各项。 排序列表中包含一个可使用键或索引访问各项的列表，如果您使用索引访问各项，则它是一个动态数组，如果您使用键访问各项，则它就是一个哈希表。 另外，排序列表中的各项总是按键值进行排序的。 |
| [堆栈（Stack）](#Stack堆栈)                   | 堆栈代表了一个后进先出的对象集合。 当您需要对各项进行后进先出的访问时，则可以使用堆栈。为堆栈中添加一项称为推入项目，从堆栈中移除一项称为弹出项目。 |
| [队列（Queue）](#Queue队列)                   | 队列代表了一个先进先出的对象集合。 当您需要对各项进行先进先出的访问时，则可以使用队列。为队列中添加项目称为入队，为队列中移除项目称为出队。 |
| [点阵列（BitArray）](#BitArray点阵列)         | 点阵列代表了一个使用 1 和 0 来表示的二进制数组。 当您需要存储比特位，但是事先不知道具体位数时，则可以使用点阵列。可以使用整型索引从点阵列集合中访问各项，索引从零开始。 |

## ArrayList动态数组

在 C# 中，动态数组（`ArrayList`）代表了可被单独索引的对象的有序集合。动态数组基本上可以代替数组，唯一与数组不同的是，动态数组可以使用索引在指定的位置添加和移除指定的项目，动态数组会自动重新调整自身的大小。另外，动态数组允许在列表中进行动态内存分配、增加、搜索、排序等操作。

| 属性           | 描述                                   |
| -------------- | -------------------------------------- |
| Capacity       | 获取或设置动态数组中可以包含的元素个数 |
| Count          | 获取动态数组中实际包含的元素个数       |
| IsFixedSize    | 判断动态数组是否具有固定大小           |
| IsReadOnly     | 判断动态数组是否只读                   |
| IsSynchronized | 判断访问动态数组是否同步（线程安全）   |
| Item[Int32]    | 获取或设置指定索引处的元素             |
| SyncRoot       | 获取一个对象用于同步访问动态数组       |

| 方法名                                                    | 描述                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| public virtual int Add(object value)                      | 将对象添加到动态数组的末尾                                   |
| public virtual void AddRange(ICollection c)               | 将 ICollection 的元素添加到动态数组的末尾                    |
| public virtual void Clear()                               | 从动态数组中移除所有的元素                                   |
| public virtual bool Contains(object item)                 | 判断某个元素是否在动态数组中                                 |
| public virtual ArrayList GetRange(int index, int count)   | 返回一个动态数组，表示源动态数组中元素的子集                 |
| public virtual int IndexOf(object)                        | 搜索整个动态数组，并返回对象在动态数组中第一次出现的索引，索引从零开始 |
| public virtual void Insert(int index, object value)       | 在动态数组的指定索引处插入一个元素                           |
| public virtual void InsertRange(int index, ICollection c) | 在动态数组的指定索引处插入某个集合的元素                     |
| public virtual void Remove(object obj)                    | 从动态数组中移除指定的对象                                   |
| public virtual void RemoveAt(int index)                   | 移除动态数组中指定索引处的元素                               |
| public virtual void RemoveRange(int index, int count)     | 从动态数组中移除某个范围的元素                               |
| public virtual void Reverse()                             | 逆转动态数组中元素的顺序                                     |
| public virtual void SetRange(int index, ICollection c)    | 复制某个集合的元素到动态数组中某个范围的元素上               |
| public virtual void Sort()                                | 对动态数组中的元素进行排序                                   |
| public virtual void TrimToSize()                          | 将容量设置为动态数组中元素的实际个数                         |

关于 ArrayList 类中的完整属性和方法介绍，可以查阅 [C# 官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.arraylist?view=net-5.0#properties)。

存double案例:

```c#
using System;
using System.Collections;

class Program
{
    static void Main()
    {
        ArrayList arrayList = new ArrayList();

        // 添加double类型数据到ArrayList
        double number1 = 3.14;
        double number2 = 5.67;
        arrayList.Add(number1);
        arrayList.Add(number2);

        // 遍历ArrayList并输出double类型数据
        foreach (object obj in arrayList)
        {
            if (obj is double)
            {
                double num = (double)obj;
                Console.WriteLine(num);
            }
        }
    }
}
```

## Hashtable哈希表

在 C# 中，Hashtable（哈希表） 类表示根据键的哈希代码进行组织的键（key）/值（value）对的集合，可以使用键来访问集合中的元素。也就是说当您需要使用键来访问指定元素时，可以选择使用哈希表。

| 属性        | 描述                                       |
| ----------- | ------------------------------------------ |
| Count       | 获取哈希表中包含的键值对的个数             |
| IsFixedSize | 获取一个值，用来表示哈希表是否具有固定大小 |
| IsReadOnly  | 获取一个值，用来表示哈希表是否只读         |
| Item        | 获取或设置与指定键关联的值                 |
| Keys        | 获取一个 ICollection，其中包含哈希表中的键 |
| Values      | 获取一个 ICollection，其中包含哈希表中的值 |

| 方法名                                            | 描述                                     |
| ------------------------------------------------- | ---------------------------------------- |
| public virtual void Add(object key, object value) | 向哈希表中添加一个带有指定的键和值的元素 |
| public virtual void Clear()                       | 从哈希表中移除所有的元素                 |
| public virtual bool ContainsKey(object key)       | 判断哈希表是否包含指定的键               |
| public virtual bool ContainsValue(object value)   | 判断哈希表是否包含指定的值               |
| public virtual void Remove(object key)            | 从哈希表中移除带有指定的键的元素         |

关于 Hashtable 类中的完整属性和方法介绍，可以查阅 [C# 官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.hashtable?view=net-5.0#properties)。

## SortedList排序列表

在 C# 中，SortedList 类用来表示键/值对的集合，这些键/值对按照键值进行排序，并且可以通过键或索引访问集合中的各个项。

我们可以将排序列表看作是数组和哈希表的组合，其中包含了可以使用键或索引访问各项的列表。如果您使用索引访问各项，那么它就是一个动态数组（ArrayList），如果您使用键访问各项，那么它就是一个哈希表（Hashtable）。另外，集合中的各项总是按键值进行排序。

| 属性        | 描述                                 |
| ----------- | ------------------------------------ |
| Capacity    | 获取或设置排序列表中可包含的元素个数 |
| Count       | 获取排序列表中的元素个数             |
| IsFixedSize | 判断排序列表是否具有固定大小         |
| IsReadOnly  | 判断排序列表是否只读                 |
| Item        | 获取或设置排序列表中指定键所关联的值 |
| Keys        | 获取一个包含排序列表中所有键的集合   |
| Values      | 获取一个包含排序列表中所有值的集合   |

| 方法名                                            | 描述                                               |
| ------------------------------------------------- | -------------------------------------------------- |
| public virtual void Add(object key, object value) | 向排序列表中添加一个带有指定的键和值的元素         |
| public virtual void Clear()                       | 从排序列表中移除所有的元素                         |
| public virtual bool ContainsKey(object key)       | 判断排序列表中是否包含指定的键                     |
| public virtual bool ContainsValue(object value)   | 判断排序列表中是否包含指定的值                     |
| public virtual object GetByIndex(int index)       | 获取排序列表中指定索引处的值                       |
| public virtual object GetKey(int index)           | 获取排序列表中指定索引处的键                       |
| public virtual IList GetKeyList()                 | 获取排序列表中的键                                 |
| public virtual IList GetValueList()               | 获取排序列表中的值                                 |
| public virtual int IndexOfKey(object key)         | 返回排序列表中指定键的索引，索引从零开始           |
| public virtual int IndexOfValue(object value)     | 返回排序列表中指定值第一次出现的索引，索引从零开始 |
| public virtual void Remove(object key)            | 从排序列表中移除带有指定键的元素                   |
| public virtual void RemoveAt(int index)           | 移除排序列表中指定索引处的元素                     |
| public virtual void TrimToSize()                  | 将排序列表的容量设置为排序列表中元素的实际个数     |

关于 SortedList 类中的完整属性和方法介绍，可以查阅 [C# 官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.generic.sortedlist-2?view=net-5.0#properties)。

## Stack堆栈

在 C# 中，堆栈（Stack）类表示一个**后进先出**的对象集合，当您需要对项目进行后进先出的访问时，则可以使用堆栈。向堆栈中添加元素称为推入元素，从堆栈中移除元素称为弹出元素。

| 属性           | 描述                                 |
| -------------- | ------------------------------------ |
| Count          | 获取堆栈中包含的元素个数             |
| IsSynchronized | 判断是否同步对堆栈的访问（线程安全） |
| SyncRoot       | 获取可用于同步对堆栈访问的对象       |

| 方法名                                   | 描述                             |
| ---------------------------------------- | -------------------------------- |
| public virtual void Clear()              | 从堆栈中移除所有的元素           |
| public virtual bool Contains(object obj) | 判断某个元素是否在堆栈中         |
| public virtual object Peek()             | 返回在堆栈顶部的对象，但不移除它 |
| public virtual object Pop()              | 移除并返回在堆栈顶部的对象       |
| public virtual void Push(object obj)     | 向堆栈顶部添加一个对象           |
| public virtual object[] ToArray()        | 复制堆栈到一个新的数组中         |

关于 Stack 类中的完整属性和方法介绍，可以查阅 [C# 官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.stack?view=net-5.0#properties)。

## Queue队列

在 C# 中，队列（Queue 类）与[堆栈](#Stack堆栈)类似，它代表了一个**先进先出**的对象集合，当您需要对项目进行先进先出访问时，则可以使用队列。向队列中添加元素称为入队（enqueue），从堆栈中移除元素称为出队（deque）。

| 属性           | 描述                                 |
| -------------- | ------------------------------------ |
| Count          | 获取队列中包含的元素个数             |
| IsSynchronized | 判断是否同步对队列的访问（线程安全） |
| SyncRoot       | 获取可用于同步对队列访问的对象       |

| 方法名                                   | 描述                                   |
| ---------------------------------------- | -------------------------------------- |
| public virtual void Clear()              | 从队列中移除所有的元素                 |
| public virtual bool Contains(object obj) | 判断某个元素是否在队列中               |
| public virtual object Dequeue()          | 移除并返回在队列开头的对象             |
| public virtual void Enqueue(object obj)  | 向队列的末尾处添加一个对象             |
| public virtual object[] ToArray()        | 复制队列到一个新的数组中               |
| public virtual void TrimToSize()         | 将队列的容量设置为队列中元素的实际个数 |

## BitArray点阵列

在 C# 中，BitArray 类用来管理一个紧凑型的位值数组，数组中的值均为布尔类型，其中 true（1）表示此位为开启，false（0）表示此位为关闭。

当您需要存储位（英文名“bit”数据存储的最小单位，也可称为比特），但事先又不知道具体位数时，就可以使用点阵列。当需要访问点阵列中的元素时，可以使用整型索引从点阵列中访问指定元素，索引从零开始。

| 属性       | 描述                           |
| ---------- | ------------------------------ |
| Count      | 获取点阵列中包含的元素个数     |
| IsReadOnly | 判断 点阵列是否只读            |
| Item       | 获取或设置点阵列中指定位置的值 |
| Length     | 获取或设置点阵列中的元素个数   |

| 方法名                                 | 描述                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| public BitArray And(BitArray value)    | 对当前的点阵列中的元素和指定点阵列中相对应的元素执行按位与操作 |
| public bool Get(int index)             | 获取点阵列中指定位置的位值                                   |
| public BitArray Not()                  | 反转当前点阵列中所有位的值，即将 true 设置为 false，将 false 设置为 true |
| public BitArray Or(BitArray value)     | 对当前点阵列中的元素和指定点阵列中的相对应的元素执行按位或操作 |
| public void Set(int index, bool value) | 把点阵列中指定位置的位设置为指定的值                         |
| public void SetAll(bool value)         | 把点阵列中的所有位设置为指定的值                             |
| public BitArray Xor(BitArray value)    | 对当前点阵列中的元素和指定点阵列中的相对应的元素执行按位异或操作 |

关于 BitArray 类中的完整属性和方法介绍，可以查阅 [C# 官方文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.bitarray?view=net-5.0#properties)。

# C# 泛型

在 C# 中，泛型（Generic）是一种规范，它允许我们使用占位符来定义类和方法，编译器会在编译时将这些占位符替换为指定的类型，利用泛型的这一特性我们可以定义为

- 通用类（泛型类）

- 通用方法（泛型方法）

定义通用类需要使用尖括号`<>`，这里的尖括号用于将类或方法声明为泛型。

> 可以将泛型看作是一种增强程序功能的技术，泛型类和泛型方法兼具可重用性、类型安全性和效率，这是非泛型类和非泛型方法无法实现的。泛型通常与集合以及作用于集合的方法一起使用，System.Collections.Generic 命名空间下就包含几个基于泛型的集合类。下面总结了一些关于泛型的特性：
>
> - 使用泛型类型可以最大限度地重用代码、保护类型的安全性以及提高性能；
> - 泛型最常见的用途是创建集合类；
> - .NET 类库在 System.Collections.Generic 命名空间中包含几个新的泛型集合类，您可以使用这些类来代替 System.Collections 中的集合类；
> - 您可以创建自己的**泛型接口、泛型类、泛型方法、泛型事件和泛型委托**；
> - 您也可以对泛型类进行约束以访问特定数据类型的方法；
> - 在**泛型数据类型中所用类型的信息可在运行时通过使用反射来获取**。

## 泛型类

```c#
class GenericClass<T>{
  // 泛型方法
  public GenericClass(T msg){
    Console.WriteLine(msg);
  }
}
class Demo
{
  static void Main(string[] args){
    GenericClass<string> str_gen = new GenericClass<string>("C语言中文网");
    GenericClass<int> int_gen = new GenericClass<int>(1234567);
    GenericClass<char> char_gen = new GenericClass<char>('C');
    Console.ReadKey();
  }
}
```

## 泛型方法

```c#
using System;
using System.Collections.Generic;
class Demo
{
  static void Swap<T>(ref T lhs, ref T rhs)
  {
    T temp;
    temp = lhs;
    lhs = rhs;
    rhs = temp;
  }
  static void Main(string[] args)
  {
    int a, b;
    char c, d;
    a = 10;
    b = 20;
    c = 'I';
    d = 'V';
    // 在交换之前显示值
    Console.WriteLine("调用 swap 之前的 Int 值:");
    Console.WriteLine("a = {0}, b = {1}", a, b);
    Console.WriteLine("调用 swap 之前的字符值:");
    Console.WriteLine("c = {0}, d = {1}", c, d);
    // 调用 swap
    Swap<int>(ref a, ref b);
    Swap<char>(ref c, ref d);
    // 在交换之后显示值
    Console.WriteLine("调用 swap 之后的 Int 值:");
    Console.WriteLine("a = {0}, b = {1}", a, b);
    Console.WriteLine("调用 swap 之后的字符值:");
    Console.WriteLine("c = {0}, d = {1}", c, d);
    Console.ReadKey();
  }
}
```

## 泛型委托

`delegate T NumberChanger<T>(T n);`

```c#
class Demo
{
  delegate T NumberChanger<T>(T n);
  static int num = 10;
  public static int AddNum(int p){
    num += p;
    return num;
  }
  public static int MultNum(int q){
    num *= q;
    return num;
  }
  public static int getNum(){
    return num;
  }
  static void Main(string[] args){
    // 创建委托实例
    NumberChanger<int> nc1 = new NumberChanger<int>(AddNum);
    NumberChanger<int> nc2 = new NumberChanger<int>(MultNum);
    // 使用委托对象调用方法
    nc1(25);
    Console.WriteLine("Num 的值为: {0}", getNum());
    nc2(5);
    Console.WriteLine("Num 的值为: {0}", getNum());
    Console.ReadKey();
  }
}
```

# C# 匿名函数/方法

在 C# 中，可以将匿名函数简单的理解为没有名称只有函数主体的函数。匿名函数提供了一种将代码块作为委托参数传递的技术，它是一个“内联”语句或表达式，可在任何需要委托类型的地方使用。匿名函数可以用来初始化命名委托或传递命名委托作为方法参数。

> 无需在匿名函数中指定返回类型，返回值类型是从方法体内的 return 语句推断出来的。

名函数是通过使用 delegate 关键字创建的委托实例来声明的

```c#
delegate void NumberChanger(int n);
...
//匿名函数传递给了nc委托
NumberChanger nc = delegate(int x)
{
    Console.WriteLine("Anonymous Method: {0}", x);
};

//作为对比,查看命名函数实例化委托(假设这个命名函数名为xxx)
//NumberChanger nc = new NumberChanger(xxx);
```

委托可以通过匿名函数调用，也可以通过普通有名称的函数调用，只需要向委托对象中传递相应的方法参数即可。注意，**匿名函数的主体后面需要使用`;`结尾**。

### C# new Action的方式定义匿名函数

在C#中，Action是一种代表**不返回值的委托类型**。它可以用来定义一个接受零个到多个参数的方法，并且不返回任何值。下面是一个示例，演示了如何使用C#中的new Action来定义一个没有参数的方法：

```c#
using System;

class Program
{
    static void Main()
    {
        Action myAction = () => Console.WriteLine("Hello, Action!");
        myAction();
    }
}
```

可以使用   `Action<T1, T2, ...>`   来定义一个带有多个参数的委托。以下是一个示例：

```c#
Action<int, string> myAction = (num, str) =>
{
    Console.WriteLine($"Number: {num}, String: {str}");
};

myAction(10, "Hello");
//可以直接整合到一块,一步到位调用
new Action<int, string>(
	(num, str) => { 
 			Console.WriteLine($"Number: {num}, String: 	{str}"); 
}
)(10,"hello world!");
```

定义了一个带有两个参数（一个整数和一个字符串）的   Action   委托，并创建了一个匿名函数来输出这两个参数的值。

# C# 指针变量与unsafe

为了保持类型的安全性，默认情况下 C# 是不支持指针的，但是如果使用 unsafe 关键字来修饰类或类中的成员，这样的类或类中成员就会被视为不安全代码，C# 允许在不安全代码中使用指针变量。在公共语言运行时 (CLR) 中，不安全代码是指无法验证的代码，不安全代码不一定是危险的，只是 CLR 无法验证该代码的安全性。因此 CLR 仅会执行信任程序集中包含的不安全代码。

## 指针变量

在 C# 中，指针同样是一个变量，但是它的值是另一个变量的内存地址，在使用指针之前我们同样需要先声明指针，声明指针的语法格式如下所示：

| 示例      | 说明                         |
| --------- | ---------------------------- |
| int* p    | p 是指向整数的指针           |
| double* p | p 是指向双精度数的指针       |
| float* p  | p 是指向浮点数的指针         |
| int** p   | p 是指向整数的指针的指针     |
| int*[] p  | p 是指向整数的指针的一维数组 |
| char* p   | p 是指向字符的指针           |
| void* p   | p 是指向未知类型的指针       |

```c#
class Demo
{
  static unsafe void Main(string[] args)
  {
    double f = 3.1415;
    double* p = &f;
    Console.WriteLine("数据的内容是: {0} ",  f);
    Console.WriteLine("数据在内存中的地址是: {0}",  (int)p);
    Console.ReadKey();
  }
}
```

> 提示：在编译上述代码时需要在编译命令中添加`-unsafe`，例如`csc -unsafe demo.cs`。

在 C# 中，我们可以使用 `ToString()` 来获取指针变量所指向的数据的值

```c#
class Demo
{
  public static void Main()
  {
    unsafe
    {
      int var = 123456;
      int* p = &var;
      Console.WriteLine("变量 var 的值为: {0} " , var);
      Console.WriteLine("指针 p 指向的值为: {0} " , p->ToString());
      Console.WriteLine("指针 p 的值为: {0} " , (int)p);
    }
    Console.ReadKey();
  }
}
```

**使用指针访问数组元素**

在 C# 中，数组和指向该数组且与数组名称相同的指针是不同的数据类型，例如`int* p`和`int[] p`就是不同的数据类型。您可以增加指针变量 p 的值，因为它在内存中不是固定的，但数组地址在内存中是固定的，因此您不能增加数组 p 的值。如果您需要使用指针变量访问数组数据，使用 fixed 关键字来固定指针。下面通过示例演示一下：

> 在C#中，固定语句（fixed statement）通常用于与非托管代码进行交互。非托管代码是指直接操作内存或者由其他语言编写的代码，通常不受C#垃圾回收器的管理。当你需要将C#中的托管对象传递给非托管代码时，必须确保这些对象在内存中不会被移动，因为非托管代码可能会持有指向这些对象的指针。通过使用固定语句，你可以确保在固定块内的对象不会被垃圾回收器移动，从而保证非托管代码能够正确地访问这些对象的内存位置。
>
> C#中的垃圾回收器是自动管理的，它负责在程序运行时检测和回收不再被程序使用的内存。垃圾回收器使用一种叫做"标记-清除"的算法来确定哪些内存块是可以回收的。当垃圾回收器检测到某个对象不再被引用时，它会将其标记为可回收，并在适当的时机清除这些对象以释放内存。这种自动内存管理机制让开发人员不必手动管理内存，减少了内存泄漏和其他内存相关的问题。

```c#
class Demo
{
  public unsafe static void Main()
  {
    int[]  list = {10, 100, 200};
    fixed(int *ptr = list)//fixed!!!
      /* 显示指针中数组地址 */
      for ( int i = 0; i < 3; i++)
      {
        Console.WriteLine("list[{0}] 的内存地址为：{1}",i,(int)(ptr + i));
        Console.WriteLine("list[{0}] 的值为：{1}", i, *(ptr + i));
      }
    Console.ReadKey();
  }
}
```

## 编译不安全代码

为了编译不安全代码，在编译时必须使用`unsafe`命令，例如编译包含不安全代码的 demo.cs 程序的命令如下所示：

`csc /unsafe demo.cs`
或
`csc -unsafe demo.cs`

如果您使用的是 Visual Studio，那么您需要在项目属性中启用不安全代码，具体步骤如下：

- 通过双击资源管理器（Solution Explorer）中的属性（properties）节点，打开项目属性（project properties）；
- 点击 Build 标签页；
- 选择选项“Allow unsafe code”。

# C# 多线程

多线程就是多个线程同时工作的过程，我们可以将线程看作是程序的执行路径，每个线程都定义了一个独特的控制流，用来完成特定的任务。如果您的应用程序涉及到复杂且耗时的操作，那么使用多线程来执行是非常有益的。使用多线程可以节省 CPU 资源，同时提高应用程序的执行效率，例如现代操作系统对并发编程的实现就用到了多线程。到目前为止我们编写的示例程序都是单线程的应用程序，这样的应用程序一次只能执行一个任务。

## 线程生命周期

线程生命周期开始于我们创建 `System.Threading.Thread` 类对象的时候，当线程被终止或完成执行时生命周期终止。

下面列出了线程生命周期中的各种状态：

- 未启动状态：当线程实例被创建但 Start 方法未被调用时的状况；
- 就绪状态：当线程准备好运行并等待 CPU 周期时的状况；
- 不可运行状态：下面的几种情况下线程是不可运行的：
  - 已经调用 Sleep 方法；
  - 已经调用 Wait 方法；
  - 通过 I/O 操作阻塞。
- 死亡状态：当线程已完成执行或已中止时的状况。

## 主线程

在 C# 中，System.Threading.Thread 类用于处理线程，它允许在多线程应用程序中创建和访问各个线程。在多线程中执行的第一个线程称为主线程，当 C# 程序开始执行时，将自动创建主线程，而使用 Thread 类创建的线程则称为子线程，您可以使用 Thread 类的 CurrentThread 属性访问线程。下面通过示例程序演示主线程的执行：

```c#
using System;
using System.Threading;
class Demo
{
  static void Main(string[] args)
  {
    Thread th = Thread.CurrentThread;
    th.Name = "主线程";
    Console.WriteLine("这是{0}", th.Name);
    Console.ReadKey();
  }
}
//输出:这是主线程
```

## Thread 类

| 属性               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| CurrentContext     | 获取线程正在执行的上下文                                     |
| CurrentCulture     | 获取或设置当前线程的区域性                                   |
| CurrentPrincipal   | 获取或设置线程的当前负责人（对基于角色的安全性而言）         |
| CurrentThread      | 获取当前正在运行的线程                                       |
| CurrentUICulture   | 获取或设置资源管理器使用的当前区域性以便在运行时查找区域性特定的资源 |
| ExecutionContext   | 获取一个 ExecutionContext 对象，该对象包含有关当前线程的各种上下文的信息 |
| IsAlive            | 获取当前线程的执行状态                                       |
| IsBackground       | 获取或设置一个值，该值表示某个线程是否为后台线程             |
| IsThreadPoolThread | 获取线程是否属于托管线程池                                   |
| ManagedThreadId    | 获取当前托管线程的唯一标识符                                 |
| Name               | 获取或设置线程的名称                                         |
| Priority           | 获取或设置线程的调度优先级                                   |
| ThreadState        | 获取当前线程的状态                                           |

| 方法名                                                       | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| public void Abort()                                          | 在调用此方法的线程上引发 ThreadAbortException，以终止此线程  |
| public static LocalDataStoreSlot AllocateDataSlot()          | 在所有的线程上分配未命名的数据槽，为了获得更好的性能，请改用以 ThreadStaticAttribute 特性标记的字段 |
| public static LocalDataStoreSlot AllocateNamedDataSlot(string name) | 在所有线程上分配已命名的数据槽，为了获得更好的性能，请改用以 ThreadStaticAttribute 特性标记的字段 |
| public static void BeginCriticalRegion()                     | 通知主机执行将要进入一个代码区域，在该代码区域内线程中止或未经处理的异常的影响可能会危害应用程序域中的其他任务 |
| public static void BeginThreadAffinity()                     | 通知主机托管代码将要执行依赖于当前物理操作系统线程的标识指令 |
| public static void EndCriticalRegion()                       | 通知主机执行将要进入一个代码区域，在该代码区域内线程中止或未经处理的异常仅影响当前任务 |
| public static void EndThreadAffinity()                       | 通知主机托管代码已执行完依赖于当前物理操作系统线程的标识指令 |
| public static void FreeNamedDataSlot(string name)            | 为进程中的所有线程消除名称与数据槽之间的关联。为了获得更好的性能，请改用以 ThreadStaticAttribute 特性标记的字段 |
| public static Object GetData(LocalDataStoreSlot slot)        | 检索当前线程中指定的值。为了获得更好的性能，请改用以 ThreadStaticAttribute 特性标记的字段 |
| public static AppDomain GetDomain()                          | 返回当前线程运行的域                                         |
| public static AppDomain GetDomainID()                        | 返回应用程序域的唯一标识符                                   |
| public static LocalDataStoreSlot GetNamedDataSlot(string name) | 查找已命名的数据槽。为了获得更好的性能，请改用以 ThreadStaticAttribute 特性标记的字段 |
| public void Interrupt()                                      | 中断处于 WaitSleepJoin 状态的线程                            |
| public void Join()                                           | 在继续执行标准的 COM 和 SendMessage 消息泵处理期间，阻塞调用线程，直到某个线程终止为止。此方法有不同的重载形式 |
| public static void MemoryBarrier()                           | 按如下方式同步内存访问：执行当前线程的处理器在对指令重新排序时不能采用先执行 MemoryBarrier 调用之后的内存存取，再执行 MemoryBarrier 调用之前的内存存取的方式 |
| public static void ResetAbort()                              | 取消为当前线程请求的 Abort                                   |
| public static void SetData(LocalDataStoreSlot slot, Object data) | 在当前正在运行的线程上的指定槽中为此线程的当前域设置数据。为了获得更好的性能，请改用以 ThreadStaticAttribute 特性标记的字段 |
| public void Start()                                          | 开始一个线程                                                 |
| public static void Sleep(int millisecondsTimeout)            | 让线程暂停一段时间                                           |
| public static void SpinWait(int iterations)                  | 让线程等待一段时间，时间长短由 iterations 参数定义           |
| public static byte VolatileRead(ref byte address) public static double VolatileRead(ref double address) public static int VolatileRead(ref int address) public static Object VolatileRead(ref Object address) | 读取字段值。无论处理器的数目或处理器缓存状态如何，该值都是由计算机处理器写入的最新值 |
| public static void VolatileWrite(ref byte address, byte value) public static void VolatileWrite(ref double address, double value) public static void VolatileWrite(ref int address, int value) public static void VolatileWrite(ref Object address, Object value) | 立即向字段中写入一个值，并使该值对计算机中的所有处理器都可见 |
| public static bool Yield()                                   | 终止当前正在调用的线程并执行另一个准备运行的线程（由操作系统选择将要执行的另一个线程） |

## 创建线程

C# 是通过扩展 Thread 类来创建线程的，然后使用扩展的 Thread 类调用 Start() 方法开始执行子线程

```c#
using System;
using System.Threading;
class Demo
{
  public static void CallToChildThread()
  {
    Console.WriteLine("执行子线程");
  }

  static void Main(string[] args)
  {
    ThreadStart childref = new ThreadStart(CallToChildThread);//这行代码定义了一个 ThreadStart 委托(该委托不支持返回值也不支持传参)类型的变量 childref ，它指向一个名为 CallToChildThread 的方法。
    Console.WriteLine("在 Main 函数中创建子线程");
    Thread childThread = new Thread(childref);//这行代码创建了一个新的线程对象 childThread ，并将之前定义的委托 childref 作为参数传递给线程对象。
    childThread.Start();//启动了子线程
    Thread.Sleep(2000);
    childThread.Abort();//中止子线程(m1 mac上不支持该函数)
    Console.ReadKey();
  }
}
```

## C# BackgroundWorker

以下是一个简单的示例，演示如何使用BackgroundWorker在C#中执行异步操作：

```c#
using System;
using System.ComponentModel;
using System.Threading;

class Program
{
    static BackgroundWorker backgroundWorker = new BackgroundWorker();

    static void Main()
    {
        backgroundWorker.DoWork += DoWork;
        backgroundWorker.ProgressChanged += ProgressChanged;
        backgroundWorker.RunWorkerCompleted += RunWorkerCompleted;
        backgroundWorker.WorkerReportsProgress = true;
        backgroundWorker.RunWorkerAsync();

        Console.WriteLine("Main thread is not blocked!");

        Console.ReadLine();
    }

    static void DoWork(object sender, DoWorkEventArgs e)
    {
        for (int i = 0; i <= 100; i++)
        {
            Thread.Sleep(100); // 模拟耗时操作

            // 报告进度
            backgroundWorker.ReportProgress(i);
        }
    }

    static void ProgressChanged(object sender, ProgressChangedEventArgs e)
    {
        Console.WriteLine($"Progress: {e.ProgressPercentage}%");
    }

    static void RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
    {
        Console.WriteLine("Async operation completed!");
    }
}
```

在这个示例中，BackgroundWorker在后台线程中执行一个简单的计数操作，每次递增并报告进度。主线程不会被阻塞，可以继续执行其他操作。

> 与Thread的区别:
>
> - BackgroundWorker是一个**高级别的组件**，封装了在后台执行操作的细节，使得在UI线程上执行操作和在后台线程上执行操作更加容易。它提供了事件来报告进度和完成状态，并且可以在UI线程中方便地更新UI元素。 
> - Thread是一个更底层的多线程类，可以更灵活地控制线程的创建和管理。但是使用Thread需要手动处理线程的生命周期、线程同步和异常处理等问题，相对复杂一些。

## C# 异步编程模型

C# 中的 [Async](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/async) 和 [Await](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/await) 关键字是异步编程的核心。 通过这两个关键字，可以使用 .NET Framework、.NET Core 或 Windows 运行时中的资源，轻松创建异步方法（几乎与创建同步方法一样轻松）。 

- `async`：将方法标记为异步方法，表示该方法可能包含异步操作。

  最终是否采用异步执行(是否真使用了多线程)，**不决定于是否用`await`方式调用这个方法，而决定于这个方法内部，是否有`await`方式的调用。**

- `await`：用于等待一个异步操作完成的结果，然后继续执行下面的代码。`await`只能在`async`方法内部使用。

  在异步中，`await`表达的意思是：当前线程/方法中，`await`引导的方法出结果前，跳出当前线程/方法，从调用当前线程/方法的位置，去执行其它可能执行的线程/方法，并在引导的方法出结果后，把运行点拉回到当前位置继续执行；直到遇到下一个`await`，或线程/方法完成返回，跳回去刚才外部最后执行的位置继续执行。

  在通过await函数时,会等待函数执行完才回来继续执行下一句代码,但如果不通过await执行一个内含await的async函数,那么程序才是真正异步执行(存在子线程执行的情况)

> **要真正使用多线程的异步:**
>
> - **被调用函数被async标记,被调用函数内部使用了await**
>
> - **调用被调用函数的时候没写await,才是真正使用多线程的异步**
>
>   如果使用了await方式调用被调用函数,那么实际上只是堵塞而已

**使用async关键字标记的函数通常需要返回一个下面类型的结果**

- `Task`类型: 表示异步操作完成后不返回任何结果
- `Task<T>` 类型：表示异步操作完成后返回一个T类型的值。
- `void` 类型：通常用于事件处理程序等异步操作中，表示异步操作完成后不返回任何结果，但可能通过事件或其他机制通知调用方。

**命名规范**: 命名异步方法时，可以在方法名后面加上`Async`后缀，以明确表示它是一个异步方法，例如`DownloadDataAsync`。

```c#
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        await DownloadWebsiteAsync();
        Console.WriteLine("下载完成！");
    }

    static async Task DownloadWebsiteAsync()
    {
        using (HttpClient client = new HttpClient())
        {
            string website = "https://www.example.com";
            string content = await client.GetStringAsync(website);
            Console.WriteLine("下载内容长度：" + content.Length);
        }
    }
}

```

`Main`方法和`DownloadWebsiteAsync`方法都被标记为`async`，在`DownloadWebsiteAsync`方法内部，通过`await`等待`GetStringAsync`方法的异步操作完成。这样，程序能够在等待异步操作的同时，继续执行其他代码，提高了程序的并发性和响应性。

**执行流程**

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404091349756.png" alt="image-20240409134922876" style="zoom: 33%;" /><img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404091354182.png" alt="image-20240409135449649" style="zoom:25%;" />

这个代码，执行时是这样的：顺序执行1、2、3，进到`func1`，执行9、10，到10时，有`await`，所以跳出，执行4、5、6。而6是一个长时等待，在等待的过程中，`func1`的10运行完成，运行点跳回10，执行11并结束方法，再回到6等待，结束等待后继续执行7、8结束。

```c#
//输出为
Async proccess - start
Async proccess - enter Func1
Func1 proccess - start
Async proccess - out Func1
Async proccess - done
Func1 proccess - end
Main proccess - done
```

## Invoke与BeginInvoke

可以参考[c#窗口ui线程防堵塞](#c#窗口ui线程防堵塞),参考特定于Windows窗体控件的线程安全方法,使用方式类似

### Delegate.Invoke

Delegate.Invoke是同步的方法，会卡住调用它的UI线程。

```c#
public delegate void TestDelegateInvoke();

private void DelegateInvokeMethod()
{
        Thread.Sleep(5000);
}

private void btn_DelegateInvoke_Click(object sender , EventArgs e)
{
        TestDelegateInvoke testDelegate = new TestDelegateInvoke(DelegateInvokeMethod);
        testDelegate.Invoke();
  			//testDelegate();跟这样没什么区别
}
```

`Delegate.Invoke`是用于委托的通用调用，而`Control.Invoke`是一个特定于Windows窗体控件的线程安全方法，用于跨线程操作界面元素。如果你不需要处理多线程的UI更新，那么你可能不会使用到`Control.Invoke`。

### Delegate.BeginInvoke

在C#中，委托提供了`BeginInvoke`方法来启动委托的异步执行。这是.NET Framework中实现异步编程的早期方式之一（在`Task`并发模型出现之前）。通过委托的`BeginInvoke`方法，您可以在另一个线程上异步执行委托指向的方法，而不会阻塞当前线程。

简单案例

```c#
// 定义委托
public delegate int BinaryOperation(int x, int y);

// 委托指向的方法
public int Add(int x, int y)
{
    return x + y;
}

// 异步执行委托
BinaryOperation op = new BinaryOperation(Add);
IAsyncResult asyncResult = op.BeginInvoke(2, 3, null, null);

// 在这里可以执行其他工作...

// 等待异步操作完成并获取结果
int result = op.EndInvoke(asyncResult);
```

尽管委托的Invoke和BeginInvoke方法仍然可用，但在新的开发中，通常建议使用[基于Task的模式](#C# 异步编程模型)，因为它提供了更简单、更可靠的异步编程体验。

在这个示例中，我们定义了一个名为`BinaryOperation`的委托，它接受两个`int`参数并返回一个`int`结果。接着，我们创建了这个委托的实例`op`并将其与`Add`方法绑定。然后，我们使用`BeginInvoke`来异步调用这个委托。

`BeginInvoke`方法的参数与委托的签名相匹配，外加两个额外的参数：一个是`AsyncCallback`委托，用于指定一个回调方法，另一个是一个`object`类型的状态对象。在这个示例中，我们没有使用回调，所以传递了`null`。

当异步执行完成后，可以通过调用委托的`EndInvoke`方法来获取结果。`EndInvoke`方法接受一个`IAsyncResult`接口作为参数，这个参数是`BeginInvoke`方法返回的。

# C# 锁

## c#读写锁

**ReaderWriterLock**是C#中用于同步访问共享资源的机制。它允许多个线程同时进行读取操作，但只允许一个线程进行写入操作。这种锁定机制提高了在读取操作远远多于写入操作的场景下的性能。

- **ReaderWriterLock**适用于读多写少、写持续时间短的场景，提高了并发读的效率，写入时会阻塞所有读锁 。
- 它解决了并发读的性能问题，大大提高了数据并发访问的性能，只有在写入时才会阻塞所有读锁 。
- 在多线程环境下，选择合适的锁机制非常重要，ReaderWriterLock是一种在多读少写场景下非常高效的选择。

缺点:

1. **不支持递归锁**：`ReaderWriterLock` 不支持递归锁，这意味着在同一个线程持有锁时，不允许再次获取锁。这可能在某些情况下导致不便，特别是在需要递归锁的情况下。
2. **性能相对较慢**：相对于一些其他锁的类型，如 `Monitor`，`ReaderWriterLock` 可能在某些情况下速度较慢。有性能测试表明，`ReaderWriterLockSlim` 比 `ReaderWriterLock` 更快一倍，但它也有自己的限制。
3. **复杂性和潜在死锁**：使用 `ReaderWriterLock` 可能引入额外的复杂性，需要谨慎使用，因为不正确的使用锁可能导致死锁和性能问题。需要仔细考虑何时以及如何使用这种锁，以确保安全性和性能。
4. **可能导致写饥饿**：如果写操作频繁，读操作也频繁，那么写操作可能会一直等待，因为每次有读锁的线程时，写操作都无法获取写锁。

> ReaderWriterLock 类：定义支持单个写线程和多个读线程的锁。
>
> ReaderWriterLockSlim 类：表示用于管理资源访问的锁定状态，可实现多线程读取或进行独占式写入访问。

### ReaderWriterLockSlim

| 方法                                  | 说明                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| **EnterReadLock**()                   | 尝试进入读取模式锁定状态。                                   |
| EnterUpgradeableReadLock()            | 尝试进入可升级模式读锁定状态。(锁升级指的是从**读锁升级为写锁**) |
| **EnterWriteLock**()                  | 尝试进入写入模式锁定状态。(可升级模式的读锁也使用这个函数升级) |
| **ExitReadLock**()                    | 减少读取模式的递归计数，并在生成的计数为 0（零）时退出读取模式。 |
| ExitUpgradeableReadLock()             | 减少可升级模式的递归计数，并在生成的计数为 0（零）时退出可升级模式。 |
| **ExitWriteLock**()                   | 减少写入模式的递归计数，并在生成的计数为 0（零）时退出写入模式。 |
| TryEnterReadLock(Int32)               | 尝试进入读取模式锁定状态，可以选择整数超时时间。             |
| TryEnterReadLock(TimeSpan)            | 尝试进入读取模式锁定状态，可以选择超时时间。                 |
| TryEnterUpgradeableReadLock(Int32)    | 尝试进入可升级模式锁定状态，可以选择超时时间。               |
| TryEnterUpgradeableReadLock(TimeSpan) | 尝试进入可升级模式锁定状态，可以选择超时时间。               |
| TryEnterWriteLock(Int32)              | 尝试进入写入模式锁定状态，可以选择超时时间。                 |
| TryEnterWriteLock(TimeSpan)           | 尝试进入写入模式锁定状态，可以选择超时时间。                 |

```c#
static int lockTarget = 0;
static  ReaderWriterLockSlim rwLock= new ReaderWriterLockSlim();
static void threadWriteFunc()
{
  while(true)
  {
    Thread.Sleep(1000);
    try
    {
      rwLock.EnterUpgradeableReadLock();
      if (lockTarget > 10)
      {
        rwLock.EnterWriteLock();
        Console.WriteLine(Thread.CurrentThread.ManagedThreadId + ">>get write lock");
        lockTarget--;
        rwLock.ExitWriteLock();
      }
      rwLock.ExitUpgradeableReadLock();
    }
    finally
    {
      if(rwLock.IsWriteLockHeld)
        rwLock.ExitWriteLock();
      if(rwLock.IsUpgradeableReadLockHeld)
        rwLock.ExitUpgradeableReadLock();
    }
  }
}
```

可以参考一个标准做法:

```c#
// 写入操作，先以可升级读锁开始
rwLock.EnterUpgradeableReadLock();
try
{
    // 检查是否需要写入
    if (需要写入的条件)
    {
        // 升级到写锁
        rwLock.EnterWriteLock();
        try
        {
            // 执行写入操作
        }
        finally
        {
            rwLock.ExitWriteLock();
        }
    }
}
finally
{
    rwLock.ExitUpgradeableReadLock();
}
```

可以加上超时机制

### ReaderWriterLock

大多数情况下都是推荐 [ReaderWriterLockSlim](#ReaderWriterLockSlim) 的，而且两者的使用方法十分接近。

| 方法                                | 说明                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| AcquireReaderLock(Int32)            | 使用一个 Int32 超时值获取读线程锁。                          |
| AcquireReaderLock(TimeSpan)         | 使用一个 TimeSpan 超时值获取读线程锁。                       |
| AcquireWriterLock(Int32)            | 使用一个 Int32 超时值获取写线程锁。                          |
| AcquireWriterLock(TimeSpan)         | 使用一个 TimeSpan 超时值获取写线程锁。                       |
| AnyWritersSince(Int32)              | 指示获取序列号之后是否已将写线程锁授予某个线程。             |
| DowngradeFromWriterLock(LockCookie) | 将线程的锁状态还原为调用 UpgradeToWriterLock(Int32) 前的状态。 |
| ReleaseLock()                       | 释放锁，不管线程获取锁的次数如何。                           |
| ReleaseReaderLock()                 | 减少锁计数。                                                 |
| ReleaseWriterLock()                 | 减少写线程锁上的锁计数。                                     |
| RestoreLock(LockCookie)             | 将线程的锁状态还原为调用 ReleaseLock() 前的状态。            |
| UpgradeToWriterLock(Int32)          | 使用一个 Int32 超时值将读线程锁升级为写线程锁。              |
| UpgradeToWriterLock(TimeSpan)       | 使用一个 `TimeSpan` 超时值将读线程锁升级为写线程锁。         |

# C# 手动垃圾回收

在.NET的环境中，托管的资源都将由.NET的垃圾回收机制来释放，而一些非托管的资源则需要程序员手动地将它们释放。.NET提供了主动和被动两种释放非托管资源的方式，即

- IDisposable接口的Dispose方法
- 类型自己的Finalize方法。

任何带有非托管资源的类型，都有必要实现IDisposable的Dispose方法，并且在使用完这些类型后需要手动地调用对象的Dispose方法来释放对象中的非托管资源。

如果类型正确地实现了Finalize方法，那么即使不调用Dispose方法，非托管资源也最终会被释放，但那时资源已经被很长时间无谓地占据了。

> `using `语句用于**管理非托管资源（如文件句柄、数据库连接等）的释放**

`using`语句的作用就是提供了一个高效的调用对象Dispose方法的方式。对于任何IDisposable接口的类型，都可以使用using语句，而对于那些没有实现IDisposable接口的类型，使用using语句会导致一个编译错误。

```c#
using(StreamWriter sw= new StreamWriter())
{
    // 中间处理逻辑
}
```

using语句一开始定义了一个StreamWriter的对象，之后在整个语句块中都可以使用sw，在using语句块结束的时候，sw的Dispose方法将会被自动调用。using语句不仅免除了程序员输入Dispose调用的代码，它还**提供了机制保证Dispose方法被调用，无论using语句块顺利执行结束，还是抛出了一个异常**。下面的代码演示了using的这一保护机制。

```c#
using System;

namespace usingDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                // 使用using
                using (MyDispose md = new MyDispose())
                {
                    md.DoWork();
                    // 抛出一个异常来测试using
                    throw new Exception("抛出一个异常");
                }
            }
            catch
            {

            }
            finally
            {
                Console.ReadKey();
            }
        }
    }

    /// <summary>
    /// 继承自IDisposable接口，仅仅用来做测试，不使用任何非托管资源
    /// </summary>
    public class MyDispose : IDisposable
    {
        public void Dispose()
        {
            Console.WriteLine("Dispose方法被调用");
        }
        public void DoWork()
        {
            Console.WriteLine("做了很多工作");
        }
    }
}
//输出:
//做了很多工作
//Dispose方法被调用
```

事实上，C#编译器为using语句自动添加了try/finally块，所以Dispose方法能够保证被调用到，所以如下两段代码经过编译后内容将完全一致：

```c#
using (MyDispose md = new MyDispose())
{
      md.DoWork();
}
//与下面完全一致
MyDispose md;
try
{
    md = new MyDispose();
    md.DoWork();
}
finally
{
    md.Dispose();
}
```

> 应该注意一点使用using时常犯的错误，那就是千万不要试图在using语句块外初始化对象
>
> ```c#
> MyDispose md = new MyDispose();
> using (md)
> {
>     md.DoWork();
> }
> ```

# C#中的代码块

```c#
#region xxxxxx
  //代码
#endregion
```

这样就形成了可以折叠的代码块

# visual studio开发环境相关

## 官方组件

[类设计器参考](https://blog.csdn.net/u014361280/article/details/116428050)

可以图形化查看类结构

## 插件相关

下载插件位置:visual studio菜单中-拓展-管理拓展-Visual Studio Marketplace

### 简易插件

- Viasfora 括号颜色配对
- VSColorOutput  输出栏多颜色显示
- [CodeNav 代码导航](https://marketplace.visualstudio.com/items?itemName=SamirBoulema.CodeNav)

### CodeRush

[插件CodeRush下载地址](https://marketplace.visualstudio.com/items?itemName=DevExpress.CodeRushforRoslyn)

1. Code Template Expansion   按下空格  代码模板展开

   ```c#
   ps//->按下空格   
   //转换为如下:
   public string xxxxxx{
   	get{return xxxx;}
     set{xxxxx=value;}
   }
   ```

2. Tab键可以在跳到选中目标的下一个引用

3. 拼写检查

4. 调试可视化   可直接在复合表达式上看到他的值

5. 一键选择嵌入功能  允许选中部分代码,通过按如下键一键用下面框架包裹住选中代码 (默认未启用)

   - `b` 尖括号
   - `c` try/catch块
   - `f` try/finally块
   - `t` try/catch/finally块

6. 大写键+空格添加修饰符 (默认未启用)

### CodeGeeX

ai补全+聊天插件

[插件网页](https://codegeex.cn/)

优势:

- Visual studio可用
- 有免费版

## windows下vs的NuGet包管理器

通过nuGet可以很方便的安装第三方库

在Visual Studio中使用NuGet包的步骤如下：

1. **安装NuGet包管理器**：在Visual Studio中，选择“工具”>“扩展与更新”，然后搜索并安装NuGet
2. **打开NuGet包管理器**：在解决方案管理器中，右键点击项目，然后选择“管理NuGet程序包”
3. **搜索并安装NuGet包**：在NuGet包管理器中，选择nuget.org作为包源。在“浏览”选项卡中，搜索你需要的包（例如Newtonsoft.Json），在列表中选择它，然后选择“安装”
4. **使用NuGet包**：安装NuGet包后，可以在代码中通过`using `语句引用它，其中``是你正在使用的包的名称。创建引用后，就可以通过API调用包

**在命令行中使用NuGet的步骤如下：**

1. **下载并安装NuGet CLI**：[你可以从nuget.org下载NuGet CLI](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe)。将nuget.exe文件保存到合适的目录，并确保该目录位于PATH环境变量中
2. **打开命令行窗口**：你可以通过在Windows上按Win+R并输入cmd，或在Mac/Linux上打开终端来打开命令行窗口
3. **运行NuGet命令**：在命令行窗口中，你可以运行nuget并后跟你想要执行的命令和相应的选项。例如，你可以运行`nuget help pack`来查看pack命令的帮助信息

**以下是一些常用的NuGet CLI命令**

- `nuget install <packageID>`：安装指定的NuGet包。
- `nuget restore`：还原项目的依赖项。
- `nuget push <packageID>`：将包发布到包源。
- `nuget delete <packageID>`：从包源中删除或取消列出包。
- `nuget list`：显示来自给定源的包。

## windows下的winget

### win商店下载方式

要在 Windows 11 或 10 上安裝 Windows 包管理器，請使用以下步驟：

1. [打開應用程序安裝程序頁面](https://www.microsoft.com/en-us/p/app-installer/9nblggh4nns1#activetab=pivot:overviewtab)。
2. 單擊**獲取**按鈕。
3. 單擊**打開 Microsoft Store**按鈕。
4. 單擊**更新**按鈕。

### GitHub下载方式

在[下载地址](https://github.com/microsoft/winget-cli/releases)点击msixbundle后缀文件,下载安装后即可

## vs相关设置

### vs生成注释

`工具-选项-C#-高级-为///生成XML文档注释`打上勾

# 项目结构

## winForm项目结构

- App.config  应用配置

- Form1.cs  源码文件(窗口) 双击打开界面设计器(右键可以选择查看源码还是设计器)

  - Form1.Designer.cs   源码文件(界面设计)

    在定义Form1类的时候含有一个关键字**partial**，这里就不得不说C#语言设计一个重要的特性了，能作为大多数人开发上位机的首选，C#有一个特性就是设计的时候**界面与后台分离，但是类名相同**

  - Form1.resx   资源文件

- Program.cs   Main入口所在的源码文件

- 引用  项目依赖的一些系统库

- Properties   通常包含一些项目的配置和属性信息，用于管理项目的设置和行为

  - Assemblylnfo.cs   应用程序发布时的一些属性设置,版本号,属性,版权之类的
  - 其余两个文件是工具自动生成的一些设置文件
  - Resources.resx
  - Settings.settings

# C#语法主要版本迭代

1. C# 1.0：最初的C#版本，包含了基本的面向对象编程特性，如类、接口、继承、多态等。

2. C# 2.0：引入了泛型、迭代器、匿名方法等新特性，提高了代码的灵活性和可读性。

3. C# 3.0：引入了LINQ（Language Integrated Query）特性，使查询数据变得更加简洁和直观。(统一查询语法)

4. C# 4.0：引入了动态类型（dynamic）、命名参数、可选参数等新特性，增强了语言的灵活性。

5. C# 5.0：引入了异步编程模型（async/await），使异步操作更加简单和直观。

6. C# 6.0：引入了自动属性初始化、表达式体成员、字符串插值等新特性，提高了开发效率。

7. C# 7.0：引入了元组、模式匹配、局部函数等新特性，增强了语言的表达能力和功能性。

8. C# 8.0：引入了nullable引用类型、异步序列等新特性，提高了代码的安全性和可靠性。

# 与C++的相互调用关系

- Platform Invocation Services (P/Invoke)
- 创建C++/CLI封装器来实现。
- P/Invoke允许您在C#代码中调用原生C++函数，而C++/CLI是一种混合语言，可以让您在同一个项目中同时使用C#和C++代码。

其实差别就两种:

- **非托管方式（P/Invoke）**：适用于已有C++ DLL且不打算修改其源码，仅需C#调用其C兼容接口的情况。简单快捷，无需额外工具链支持，但需要处理数据类型转换和内存管理问题。
- **托管方式（C++/CLI）**：适用于愿意调整C++代码以支持.NET框架，追求更紧密集成和更易用性的场景。C#可以直接使用封装好的托管类，但可能增加项目复杂度，需要维护C++/CLI中间层。

## 非托管方式调用（P/Invoke）

这种情况是不需要修改C++的DLL的

c#调用C++开发的DLL

如果是C++编写的dll,如,该函数:

```cpp
#include <vector>
extern "C" {
    __declspec(dllexport) void ProcessVector(int[] arr,int size) {
        // 这里是函数的实现，处理传入的整型数组
    }
}
```

可以直接使用下面的方式对接:

```c#
using System;
using System.Runtime.InteropServices;

public class CppWrapper
{
    [DllImport("YourCppLibrary.dll")]
    public static extern void ProcessVector(vector<int> arr);

    public void ProcessVectorWrapper(int[] vec,int vecSize)
    {
        ProcessVector(vec,vecSize);
    }
}
```

要使用DllImport,必须使用`using System.Runtime.InteropServices;`

在C#通过P/Invoke（平台调用）调用C++ DLL时，数据类型转换和内存管理是需要特别关注的两个方面

### 数据类型转换

#### 基本类型转换

- **数值类型**：C#与C++的基本整数和浮点数类型通常有一一对应关系，如`int`、`long`、`float`、`double`等。在定义P/Invoke函数签名时，使用对应的C#类型即可。
- **字符与字符串**：
  - `char`：C++的`char`通常对应C#的`byte`或`char`（取决于是否区分字节和字符）。
  - `wchar_t`：C++的宽字符（`wchar_t`）通常对应C#的`char`（在.NET Core 3.0及更高版本中，`.NET`默认使用UTF-8编码，因此宽字符可能需要转换为字符串）。
  - `std::string` / `std::wstring`：C++的字符串类通常需要转换为C风格的字符串（以`\0`结尾的字符数组）才能通过P/Invoke传递。在C#端使用`MarshalAsAttribute`指定为`UnmanagedType.LPStr`（对于ANSI字符串）或`UnmanagedType.LPWStr`（对于Unicode字符串）。返回字符串时，通常C++函数会返回指向缓冲区的指针，C#需要负责释放该内存（见内存管理部分）。

#### 结构体与枚举

- **结构体**：如果C++ DLL中定义了结构体供C#使用，需要在C#中创建对应的结构体类，并使用`StructLayout(LayoutKind.Sequential)`（或`Explicit`)、`FieldOffset`等特性确保布局与C++端一致。对于嵌套结构体和数组成员，同样需要正确处理。
- **枚举**：C++的枚举类型可以映射为C#的枚举类型，注意保持枚举值的对应关系，并指定适当的底层类型（如`int`、`uint`等）。

#### **特殊类型**

- **指针与句柄**：C++的原始指针通常映射为C#的`IntPtr`类型。对于需要传递或返回的句柄（如Windows API中的`HANDLE`），也通常使用`IntPtr`。
- **数组**：C++数组可以通过固定大小的C#数组、`IntPtr`结合长度参数，或者使用`Marshal.Copy`等方法进行传递。

C++标准库中的容器（如`std::vector`)通常包含复杂的内部结构，如动态分配的内存、迭代器、容量信息等，这些都不适合直接通过P/Invoke传递给C#。然而，有几种方法可以间接地在C#与C++之间交换`std::vector`所存储的数据

#### 传递容器

通过P/Invoke从C++ DLL向C#传递容器数据时，通常不会直接传递容器本身，而是传递**容器内容（如通过[数组](#通过数组传递容器内容)、[连续内存块](#通过连续内存块传递内容)或[自定义数据结构](#使用自定义数据结构)）**。在C#端，将接收到的数据转换为相应的C#集合类（如`List<T>`）后使用

##### 通过数组传递容器内容

```cpp
extern "C" __declspec(dllexport)
   void GetDynamicArray(int* outputArray, int& arraySize)
   {
       std::vector<int> vec = ...; // 动态长度数组

       arraySize = vec.size();
       memcpy(outputArray, vec.data(), arraySize * sizeof(int));
   }
```

```c#
 [DllImport("MyCppDll.dll", CallingConvention = CallingConvention.Cdecl)]
   private static extern void GetDynamicArray(out int[] outputArray, out int arraySize);
```

拿vector来举例:

vector->`int* 指针,int& 长度`--进入C#->`int[] 数组,int& 长度`->List

##### 通过连续内存块传递内容

1. C++端将动态长度数组序列化为字节数组，并提供一个函数返回该数组的指针和长度。

2. C#端接收字节数组和长度，然后在C#中反序列化。

   示例：

```cpp
extern "C" __declspec(dllexport)
   void GetDynamicArraySerialized(char* outputBuffer, int& bufferSize)
   {
       std::vector<std::string> vec = ...; // 动态长度数组

       // 序列化vec到outputBuffer中，记录所需的bufferSize
       // ...
   }
```

```c#
[DllImport("MyCppDll.dll", CallingConvention = CallingConvention.Cdecl)]
   private static extern void GetDynamicArraySerialized(byte[] outputBuffer, out int bufferSize);
```

##### 使用自定义数据结构

- 定义一个包含动态长度数组数据的自定义结构体，包括数据缓冲区和长度信息。
- C++端提供函数填充该结构体。
- C#端声明对应的结构体，并解析结构体中的数据。

### **内存管理**

#### **手动管理**

- **堆内存分配**：当C++ DLL函数返回指向堆上分配的内存的指针时，C#需要负责释放该内存。通常通过`Marshal.FreeCoTaskMem`或`Marshal.FreeHGlobal`函数释放。务必确保释放时机正确，避免内存泄漏。
- **字符串缓冲区**：如前所述，C++返回的字符串缓冲区通常需要C#释放。可以使用`Marshal.PtrToStringAnsi`、`Marshal.PtrToStringUni`等方法将指针转换为托管字符串，同时释放原始内存。

#### **自动管理**

- **使用`out`或`ref`参数**：对于简单的数据类型或结构体，可以使用`out`或`ref`参数让C#自动管理内存。这样，C++函数可以直接修改传入的变量，而无需返回新分配的内存。
- **内联缓冲区**：对于小尺寸的字符串或数据，可以考虑在C#结构体中预留内联缓冲区，并使用`MarshalAsAttribute`指定为`UnmanagedType.ByValArray`。这样，C++函数可以直接写入缓冲区，避免额外分配内存。

#### **COM接口与智能指针**

- **COM接口**：如果C++ DLL提供了COM接口，C#可以直接通过`System.Runtime.InteropServices.ComImport`、`Guid`属性等创建COM对象代理，内存管理由COM机制自动处理。
- **智能指针**：如果C++ DLL使用C++11或更高版本的智能指针（如`std::unique_ptr`、`std::shared_ptr`），则需要设计合适的接口让C#能够安全地使用这些智能指针所管理的对象，可能涉及原始指针与智能指针的互操作。

### **最佳实践**

- **遵循约定**：确保C++ DLL导出函数遵循特定的调用约定（如`__stdcall`或`__cdecl`），并在C#的`DllImport`属性中指定正确的`CallingConvention`。
- **错误处理**：定义并文档化C++ DLL函数返回错误代码的方式，C#端应检查并妥善处理这些错误。
- **性能优化**：对于频繁调用或大数据量传输的情况，考虑使用`unsafe`代码、`fixed`语句、预分配的缓冲区等手段提高效率，但需谨慎处理以避免内存安全问题。

### 原理

平台调用依赖于元数据在运行时查找导出的函数并封送其参数。下图显示了这一过程。

对非托管 DLL 函数的“平台调用”调用

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405161955269.png" alt="image-20240516195540536" style="zoom: 67%;" />

## 使用自动化工具生成P/Invoke代码

有一些工具可以帮助自动生成P/Invoke函数声明和相关的类型定义，减少手动编写的工作量。例如：

- [**SWIG**](#SWIG)（Simplified Wrapper and Interface Generator）：跨语言开发工具，可以生成C#（以及其他多种语言）绑定代码，封装C++库。需要编写SWIG接口文件描述C++接口，然后通过SWIG生成C#绑定代码。
- [**ClangSharp.PInvokeGenerator**](#ClangSharp.PInvokeGenerator)：基于Clang的工具，可以从C/C++头文件生成C# P/Invoke绑定代码。支持自动处理数据类型转换和内存管理。

使用这些工具，您只需提供C++头文件或接口描述，工具会自动生成对应的C# P/Invoke代码。然后在C#项目中引用生成的代码文件，即可调用C++ DLL函数。

> 总的说，SWIG和ClangSharp.PInvokeGenerator都是用于简化C#调用C++代码过程的工具，它们通过自动化的方式生成封装代码，大大减轻了手动编写P/Invoke绑定的工作量。SWIG具有更广泛的语言支持和丰富的定制化选项，而ClangSharp.PInvokeGenerator则依托于Clang编译器，提供了精准的类型映射和对现代C++特性的良好支持。
>
> 各自最大优势
>
> - SWIG  广泛语言支持
> - ClangSharp.PInvokeGenerator  对于使用现代C++特性的库，尤其是模板、C++11及以后标准特性丰富的库，ClangSharp.PInvokeGenerator可能由于其精准的类型映射和对最新C++标准的良好支持，成为更合适的选择

### SWIG

SWIG是一个广泛使用的跨语言接口生成器，它能够自动将C/C++代码包装成其他多种高级编程语言（包括C#）可以调用的形式。SWIG通过解析C/C++头文件（或者用户提供的接口文件），生成对应的封装代码，使得原生C/C++函数、类和数据结构可以被非C/C++语言（如C#）透明地调用。

**主要特点与功能**：

1. **广泛的语言支持**：SWIG除了支持C#外，还支持许多其他语言，如Python、Java、JavaScript、Perl、Ruby、PHP、Lua等，使得同一套C/C++代码可以轻松地为多个平台和编程环境提供接口。
2. **自动类型映射**：SWIG能够识别C/C++的基本类型、结构体、枚举、类等，并自动映射到目标语言的等价类型。对于复杂类型，SWIG还可以生成必要的适配器代码以保证类型兼容性。
3. **智能指针支持**：SWIG可以处理C++中的智能指针（如`std::shared_ptr`、`std::unique_ptr`），在生成的C#接口中提供适当的生命周期管理。
4. **成员函数封装**：对于C++类的成员函数，SWIG会生成对应的代理方法，使C#代码可以直接调用这些方法，如同在C#中操作本地对象。
5. **模板支持**：SWIG能够处理部分C++模板，并生成特定实例化的代码。对于模板类或函数，可能需要在SWIG接口文件中显式实例化。
6. **扩展性与定制化**：SWIG提供了丰富的预处理器指令和宏系统，允许用户自定义类型映射规则、控制代码生成细节、添加额外的包装逻辑等。

**使用流程**：

1. **编写SWIG接口文件**（`.i` 文件）：定义需要导出的C/C++接口，包括头文件包含、模块定义、类型映射规则等。可以使用 `%include` 指令包含C/C++头文件。
2. **运行SWIG**：使用SWIG命令行工具，指定接口文件和目标语言（如`-csharp`），生成对应的接口代码。
3. **编译生成的代码**：SWIG生成的C#代码通常包括两个部分：C#接口库（`.cs` 文件）和C++包装代码（`.cpp` 文件）。需要分别编译这两个部分：C#接口库编译成DLL或NET Assembly，C++包装代码与原生C++库一起编译链接。
4. **在C#项目中引用**：将生成的C#接口库添加为C#项目的引用，即可在C#代码中直接调用原生C++函数和类。

### ClangSharp.PInvokeGenerator

ClangSharp.PInvokeGenerator是基于Clang编译器前端的一个工具，用于从C/C++头文件生成C# P/Invoke绑定代码。它利用Clang的完整C/C++语法解析能力，提供精确的类型映射和函数签名生成。

**主要特点与功能**：

1. **基于Clang**：得益于Clang强大的C/C++解析能力，ClangSharp.PInvokeGenerator能够准确处理复杂的C/C++特性，包括模板、宏、内联函数、C++11及以上标准的新特性等。
2. **精准类型映射**：ClangSharp.PInvokeGenerator根据C/C++类型生成对应的C# P/Invoke类型，包括指针、引用、数组、结构体、枚举、模板实例等，并处理C++特有的类型修饰符（const、volatile、restrict等）。
3. **函数签名生成**：生成符合C# P/Invoke规范的函数声明，包括名称修饰、参数传递规则、返回值处理等，确保C#代码能够正确调用C++函数。
4. **支持C++标准库容器**：对于C++标准库容器（如`std::vector`、`std::string`等），ClangSharp.PInvokeGenerator可以生成适配器代码，使得C#能够以接近原生的方式使用这些容器。
5. **代码注释保留**：ClangSharp.PInvokeGenerator在生成C#代码时，尽可能保留C++源码中的注释，有助于C#开发者理解封装的C++接口。

**使用流程**：

1. **安装ClangSharp.PInvokeGenerator**：通常通过NuGet包管理器将ClangSharp.PInvokeGenerator工具包添加到项目中。
2. **配置项目**：在项目中指定要解析的C/C++头文件路径，以及生成的C#代码输出路径。
3. **运行生成**：调用ClangSharp.PInvokeGenerator提供的API或命令行工具，指定头文件和输出选项，生成C# P/Invoke绑定代码。
4. **集成到C#项目**：将生成的C#代码（通常是`.cs`文件）添加到C#项目中，同时确保项目引用了必要的C++ DLL。C#代码现在可以直接调用C++函数。

## 托管方式调用（CLR/C++/CLI）

**如果愿意修改C++ DLL以支持.NET框架**，可以创建一个混合模式（Managed/Unmanaged）的C++/CLI DLL，它既包含原生C++代码，又包含托管C++代码，可以直接被C#项目引用。这种方法适用于需要深度集成C++功能，或者希望C++代码能更方便地使用.NET类库的情况。

1. **创建C++/CLI项目**：

   - 使用Visual Studio创建一个C++/CLI类库项目。

2. **封装原生C++代码**：

   - 在C++/CLI项目中，编写托管类（使用`.NET`命名空间和关键字如`ref class`），并在其内部封装对原生C++代码的调用。例如：

     ```cpp
      #pragma once
     
      using namespace System;
     
      public ref class ManagedWrapper
      {
      public:
          ManagedWrapper();
          ~ManagedWrapper();
     
          int Add(int a, int b);
          String^ Say(String^ str);
      };
     
      // .cpp文件中实现托管类的方法，调用原生C++代码
      ManagedWrapper::ManagedWrapper() {}
      ManagedWrapper::~ManagedWrapper() {}
     
      int ManagedWrapper::Add(int a, int b)
      {
          return a + b; // 假设这里实际调用了原生C++代码
      }
     
      String^ ManagedWrapper::Say(String^ str)
      {
          return str; // 同样，这里实际应调用原生C++代码
      }
     ```

3. **编译并生成C++/CLI DLL**：

   - 编译C++/CLI项目，生成`.dll`文件。由于这个DLL现在包含托管代码，它可以被C#项目直接引用。

4. **在C#项目中引用C++/CLI DLL**：

   - 在C#项目中添加对C++/CLI DLL的引用，如同引用其他托管DLL一样。然后直接实例化并使用其中的托管类：

# C#窗口的基本逻辑

[C#串口通信测试小工具教程](#https://blog.csdn.net/ba_wang_mao/article/details/113642066)

> - **事件源（EventSource）**：描述人机交互中事件的来源，通常是一些控件；
> - **事件（ActionEvent）**：事件源产生的交互内容，比如按下按钮；
> - **事件处理**：这部分也在C++中被叫做回调函数，当事件发生时用来处理事件；
>
> 这部分在单片机中也是如此，中断源产生中断，然后进入中断服务函数进行响应；

和qt非常像

## 容器控件Panel

Panel是容器控件，是一些小控件的容器池，用来给控件进行大致分组，要注意容器是一个虚拟的，只会在设计的时候出现，不会显示在设计完成的界面上，这里我们将整个界面分为6个容器池，如图：

## 文本标签控件（Lable）

用于显示一些文本，但是不可被编辑；改变其显示内容有两种方法：一是直接在属性面板修改“Text”的值，二是通过代码修改其属性，见如下代码；另外，可以修改Font属性修改其显示字体及大小，这里我们选择微软雅黑，12号字体；

```
label1.Text = "串口";    //设置label的Text属性值
```

## 下拉组合框控件（ComboBox）

用来显示下拉列表；通常有两种模式

两种模式通过设置DropDownStyle属性选择

- DropDown模式，既可以选择下拉项，也可以选择直接编辑
- DropDownList模式，只能从下拉列表中选择

```c#
private void Form1_Load(object sender, EventArgs e)
{
  int i;
  //单个添加for (i = 300; i <= 38400; i = i*2)
  {
    comboBox2.Items.Add(i.ToString());  //添加波特率列表
  }

  //批量添加波特率列表
  string[] baud = { "43000","56000","57600","115200","128000","230400","256000","460800" }; 
  comboBox2.Items.AddRange(baud);

  //设置默认值
  comboBox1.Text = "COM1";
  comboBox2.Text = "115200";
  comboBox3.Text = "8";
  comboBox4.Text = "None";
  comboBox5.Text = "1";
}
```

## 按钮控件（Button）

略

## 文本框控件（TextBox）

TextBox控件与label控件不同的是，文本框控件的内容可以由用户修改，这也满足我们的发送文本框需求

需要多行显示,设置:其Multiline属性为true

TextBox的方法中最多的是APPendText方法，它的作用是将新的文本数据从末尾处追加至TextBox中，那么当TextBox一直追加文本后就会带来本身长度不够而无法显示全部文本的问题，此时我们需要使能TextBox的纵向滚动条来跟踪显示最新文本，所以我们将TextBox的属性ScrollBars的值设置为Vertical即可；

## C#中的窗体事件驱动

`new EventHandler`是C#中用于创建事件处理程序委托实例的语法。在C#中，事件处理程序委托是一种特殊的委托类型，用于表示事件处理程序的方法签名。EventHandler是.NET Framework中预定义的委托类型，用于处理不包含数据的事件。

当您使用`new EventHandler`语法时，您正在实例化一个EventHandler委托，并指定事件处理程序的方法作为参数。在这种情况下，您需要指定事件处理程序方法的签名，即接受两个参数：一个object类型的sender参数和一个EventArgs类型的e参数。

下面是一个示例，演示如何使用`new EventHandler`语法创建事件处理程序委托实例：

```csharp
// 定义事件处理程序方法
void MyEventHandler(object sender, EventArgs e)
{
    // 事件处理程序逻辑
}

// 创建事件处理程序委托实例
EventHandler eventHandler = new EventHandler(MyEventHandler);
```

在上面的示例中，我们首先定义了一个名为MyEventHandler的事件处理程序方法，然后使用`new EventHandler`语法创建了一个EventHandler委托实例，将MyEventHandler方法作为参数传递给该委托实例。这样就创建了一个用于处理不包含数据的事件的事件处理程序委托实例。

## c#窗口ui线程防堵塞

在 Windows 窗体程序中，UI 组件（比如文本框、按钮等）是不安全的线程资源。这意味着，只能在创建 UI 组件的线程（通常是主线程或 UI 线程）上对这些组件进行操作。当从非 UI 线程（如串口接收事件处理线程）尝试访问 UI 组件时，就必须使用某种同步方法来确保操作的安全性。

Invoke 是委托类型的[实例方法](https://so.csdn.net/so/search?q=实例方法&spm=1001.2101.3001.7020)，用于调用委托所引用的方法。委托是一种类型，它允许我们将方法作为参数传递并存储在字段或属性中。当委托实例被调用时，它会调用与之关联的方法。可以使用 += 运算符将一个方法添加到委托中，使用 -= 运算符将其从委托中删除。

在具体使用上，委托被定义为一个类实例，其具有与特定方法签名匹配的方法。每个委托实例都与一个特定方法绑定，并且可以通过委托实例调用该方法。 

**使用event修饰的委托，就变成了事件，在类外部是不能把该委托当做方法直接调用的，这就是用不用event的区别。** 

### Invoke/BeginInvoke

`Invoke` 方法是一个同步方法，它可以将一个操作的执行权转交给 UI 线程。这样做可以避免因为多线程访问同一个 UI 组件而引起的竞争条件或冲突。`Invoke` 方法接受一个委托（Delegate）作为参数，**该委托指向将要在 UI 线程上执行的方法**。

**Invoke方式**，**这种方式专门被用于解决从不是创建控件的线程访问控件**

首先说下，Invoke和BeginInvoke的使用有两种情况：

`control.Invoke(参数delegate)`方法:在拥有此控件的基础窗口句柄的线程上**同步**执行指定的委托。

`control.BeginInvoke(参数delegate)`方法:在创建控件的基础句柄所在线程上**异步**执行指定委托。

Invoke的含义是：在拥有此控件的基础窗口句柄的现呈上同步执行指定的委托（同步）
BeginInvoke的含义是：在创建控件的基础句柄所在线程上异步执行的委托（异步）

1. Invoke() 调用时，Invoke会阻止当前主线程的运行，等到 Invoke() 方法返回才继续执行后面的代码，表现出“同步”的概念。
2. BeginInvoke() 调用时，当前线程会启用线程池中的某个线程来执行此方法，BeginInvoke不会阻止当前主线程的运行，而是等当前主线程做完事情之后再执行BeginInvoke中的代码内容，表现出“异步”的概念。在想获取 BeginInvoke() 执行完毕后的结果时，调用EndInvoke() 方法来获取。而这两个方法中执行的是一个委托。

> **使用场景**：
>
> - 当您需要立即更新UI并且不介意等待时，使用`Invoke`。
> - 当您不需要立即知道操作结果，并且不希望阻塞当前线程时，使用`BeginInvoke`。
>
> **返回值和异常**：
>
> - `Invoke`可以返回值，并且如果委托中引发异常，它将被传递回调用线程。
> - `BeginInvoke`不能直接返回值，如果委托中引发异常，它将不会传递回调用线程。

#### Control.Invoke

Control的Invoke一般用于解决跨线程访问的问题，比如你想操作一个按钮button,你就要用button.Invoke,你想操作一个文本label,你就要用label.Invoke.但是大家会发现很麻烦，如果我既然想操作button,又操作label,能不能写在一起呢？有没有更简单的方法呢？

其实主窗体使一个Form,Form自然也是继承了Control的，所以Form也有Invoke的方法，如果你想省点事，就可以直接调用Form.Invoke,这就是常见的`this.Invoke.`

为什么有的Invoke前面啥都没有?其实前面是this,只不过省略了.

对于Control 的Invoke ,更标准的用法是先加判断，再调用

```c#
if(this.InvokeRequired)
{
  this.Invoke(...);
}
```

> InvokeRequired是Control的一个属性
>
> 获取一个值，该值指示调用方在对控件进行方法调用时是否必须调用 Invoke 方法，因为调用方位于创建控件所在的线程以外的线程中。如果控件的 Handle 是在与调用线程不同的线程上创建的（说明您必须通过 Invoke 方法对控件进行调用），则为 true；否则为 false。

`Invoke`方法接受两个参数：一个委托和一个对象数组。委托定义了要在UI线程上执行的操作，对象数组则提供了传递给委托的参数。

> 与之对比的,在MFC和QT中防止UI线程卡住的方法分别如下:
>
> - MFC  PostMessage`或`SendMessage
>
>   - QT   **信号和槽机制**
>

## 隐式控件

运行于后台的，用户看不见，更不能直接控制，所以也成为组件，接下来我们添加最主要的串口组件；

### 串口组件（SerialPort）

这种隐式控件添加后位于设计器下面 ，串口常用的属性有两个，一个是端口号（PortName），一个是波特率（BaudRate），当然还有数据位，停止位，奇偶校验位等；串口打开与关闭都有接口可以直接调用，串口同时还有一个IsOpen属性，IsOpen为true表示串口已经打开，IsOpen为flase则表示串口已经关闭。

> SerialPort类是相当容易上手的。在进行串口通讯时，一般的流程是设置通讯端口号及波特率、数据位、停止位和校验位，再打开端口连接，发送数据，接收数据，最后关闭端口连接这样几个步骤。
>
> 

添加了串口组件后，我们就可以通过它来获取电脑当前端口，并添加到可选列表中

```c#
//获取电脑当前可用串口并添加到选项列表中
comboBox1.Items.AddRange(System.IO.Ports.SerialPort.GetPortNames());
```

#### 编辑串口通信逻辑

##### 开关串口

首先，我们先来控制打开/关闭串口，大致思路是：当按下打开串口按钮后，将设置值传送到串口控件的属性中，然后打开串口，按钮显示关闭串口，再次按下时，串口关闭，显示打开按钮；

> 　在这个过程中，要注意一点，当我们点击打开按钮时，会发生一些我们编程时无法处理的事件，比如硬件串口没有连接，串口打开的过程中硬件突然断开，这些被称之为**异常**，针对这些异常，**C#也有try..catch处理机制，在try中放置可能产生异常的代码，比如打开串口，在catch中捕捉异常进行处理**。

```c#
//打开串口按钮
private void button1_Click(object sender, EventArgs e)        {
  try
  {
    //将可能产生异常的代码放置在try块中
    //根据当前串口属性来判断是否打开
    if (serialPort1.IsOpen)
    {
      //串口已经处于打开状态
      serialPort1.Close();    //关闭串口
      button1.Text = "打开串口";
      button1.BackColor = Color.ForestGreen;
      comboBox1.Enabled = true;
      comboBox2.Enabled = true;
      comboBox3.Enabled = true;
      comboBox4.Enabled = true;
      comboBox5.Enabled = true;
      textBox_receive.Text = "";  //清空接收区
      textBox_send.Text = "";     //清空发送区
    }
    else
    {
      //串口已经处于关闭状态，则设置好串口属性后打开
      comboBox1.Enabled = false;
      comboBox2.Enabled = false;
      comboBox3.Enabled = false;
      comboBox4.Enabled = false;
      comboBox5.Enabled = false;
      serialPort1.PortName = comboBox1.Text;
      serialPort1.BaudRate = Convert.ToInt32(comboBox2.Text);
      serialPort1.DataBits = Convert.ToInt16(comboBox3.Text);

      if (comboBox4.Text.Equals("None"))
        serialPort1.Parity = System.IO.Ports.Parity.None;
      else if(comboBox4.Text.Equals("Odd"))
        serialPort1.Parity = System.IO.Ports.Parity.Odd;
      else if (comboBox4.Text.Equals("Even"))
        serialPort1.Parity = System.IO.Ports.Parity.Even;
      else if (comboBox4.Text.Equals("Mark"))
        serialPort1.Parity = System.IO.Ports.Parity.Mark;
      else if (comboBox4.Text.Equals("Space"))
        serialPort1.Parity = System.IO.Ports.Parity.Space;

      if (comboBox5.Text.Equals("1"))
        serialPort1.StopBits = System.IO.Ports.StopBits.One;
      else if (comboBox5.Text.Equals("1.5"))
        serialPort1.StopBits = System.IO.Ports.StopBits.OnePointFive;
      else if (comboBox5.Text.Equals("2"))
        serialPort1.StopBits = System.IO.Ports.StopBits.Two;

      serialPort1.Open();     //打开串口
      button1.Text = "关闭串口";
      button1.BackColor = Color.Firebrick;
    }
  }
  catch (Exception ex)
  {
    //捕获可能发生的异常并进行处理

    //捕获到异常，创建一个新的对象，之前的不可以再用
    serialPort1 = new System.IO.Ports.SerialPort();
    //刷新COM口选项
    comboBox1.Items.Clear();
    comboBox1.Items.AddRange(System.IO.Ports.SerialPort.GetPortNames());
    //响铃并显示异常给用户
    System.Media.SystemSounds.Beep.Play();
    button1.Text = "打开串口";
    button1.BackColor = Color.ForestGreen;
    MessageBox.Show(ex.Message);
    comboBox1.Enabled = true;
    comboBox2.Enabled = true;
    comboBox3.Enabled = true;
    comboBox4.Enabled = true;
    comboBox5.Enabled = true;
  }
}
```

##### 发送和接收串口

###### 串口发送

　　串口发送有两种方法，一种是字符串发送WriteLine，一种是Write（），可以发送一个字符串或者16进制发送（见下篇），其中字符串发送WriteLine默认已经在末尾添加换行符；

```cs
private void button2_Click(object sender, EventArgs e)
        {
            try
            {
                //首先判断串口是否开启
                if (serialPort1.IsOpen)
                {
                    //串口处于开启状态，将发送区文本发送
                    serialPort1.Write(textBox_send.Text);
                }
            }
            catch (Exception ex)
            {
                //捕获到异常，创建一个新的对象，之前的不可以再用
                serialPort1 = new System.IO.Ports.SerialPort();
                //刷新COM口选项
                comboBox1.Items.Clear();
                comboBox1.Items.AddRange(System.IO.Ports.SerialPort.GetPortNames());
                //响铃并显示异常给用户
                System.Media.SystemSounds.Beep.Play();
                button1.Text = "打开串口";
                button1.BackColor = Color.ForestGreen;
                MessageBox.Show(ex.Message);
                comboBox1.Enabled = true;
                comboBox2.Enabled = true;
                comboBox3.Enabled = true;
                comboBox4.Enabled = true;
                comboBox5.Enabled = true;
            }
        }
```

###### 串口接受

> 在SerialPort类中有DataReceived事件，当串口的读缓存有数据到达时则触发DataReceived事件，其中SerialPort.ReceivedBytesThreshold属性决定了当串口读缓存中数据多少个时才触发DataReceived事件，默认为1。
> 另外，SerialPort.DataReceived事件运行比较特殊，其运行在辅线程，不能与主线程中的显示数据控件直接进行数据传输，必须用间接的方式实现。

使用串口接收之前要先为串口注册一个Receive事件，相当于单片机中的串口接收中断，然后在中断内部对缓冲区的数据进行读取

```c#
//串口接收事件处理
 private void SerialPort1_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
 {
 }
```

串口接收也有两种方法，一种是16进制方式读（下篇介绍），一种是字符串方式读，在刚刚生成的代码中编写，如下：

```c#
//串口接收事件处理
private void SerialPort1_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
{
  try
  {
    //因为要访问UI资源，所以需要使用Invoke方式同步ui
    this.Invoke((EventHandler)(delegate
                               {
                                 textBox_receive.AppendText(serialPort1.ReadExisting());
                               }
                              )
               );

  }
  catch (Exception ex)
  {
    //响铃并显示异常给用户
    System.Media.SystemSounds.Beep.Play();
    MessageBox.Show(ex.Message);

  }
}

//上面是整体读=================
//下面是按字节租步读=================
//串口接收事件处理
private void SerialPort1_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
{
  int num = serialPort1.BytesToRead;      //获取接收缓冲区中的字节数
  byte[] received_buf = new byte[num];    //声明一个大小为num的字节数据用于存放读出的byte型数据

  receive_count += num;                   //接收字节计数变量增加nun
  serialPort1.Read(received_buf,0,num);   //读取接收缓冲区中num个字节到byte数组中

  //接第二步中的代码
  sb.Clear();     //防止出错,首先清空字符串构造器
  //遍历数组进行字符串转化及拼接
  foreach (byte b in received_buf)
  {
    sb.Append(b.ToString());
  }
  try
  {
    //因为要访问UI资源，所以需要使用Invoke方式同步ui
    Invoke((EventHandler)(delegate
                          {
                            textBox_receive.AppendText(sb.ToString());
                            label7.Text = "Rx:" + receive_count.ToString() + "Bytes";
                          }
                         )
          );
  }
  //代码省略}
```

# USB通信技术

在Windows上，最早用VB语言开发，后来由于C++的发展，采用MFC开发，近几年，微软发布了基于.NET框架的面向对象语言C#，更加稳定安全，再配合微软强大的VS进行开发，效率奇高；

另外，如果想要在Linux上跨平台运行，可以选用Qt；如果想要更加丰富好看的数据显示界面，可以选用Labview开发；

> 在C#中，可以使用.NET Framework提供的SerialPort类来进行SerialPort类来进行串口通信，通过该类可以实现与USB串口设备的通信。另外，也可以使用第三方库（如HidLibrary、UsbLibrary等）来简化USB通信的操作。这些库提供了更高级别的接口和封装，使得USB通信更加方便和易用。
>
> C++中，可以使用操作系统提供的USB库（如libusb）或者第三方库（如WinUSB、libusb-win32等）来进行USB通信。通过这些库，可以实现USB设备的枚举、数据传输和控制等操作。开发者需要编写相应的代码来配置USB设备、发送和接收数据等。
>
> USB是一种通用的、高速的、双向的串行总线标准，用于连接计算机和外部设备。USB接口支持多种设备类型（如存储设备、打印机、键盘、鼠标等）和高速数据传输，具有热插拔、即插即用等特点。USB通信是基于主从设备的通信模式，通过USB协议栈进行通信。
>
> 传统的串口通信技术（如RS-232串口）是一种较老的串行通信接口标准，通常用于连接计算机和外部设备。RS-232串口通信速度较低，通常用于较简单的数据传输和控制应用。RS-232通信是基于点对点的通信模式，通过串口通信协议（如UART）进行通信。

通信流程如下:

1. 打开USB设备
2. 发送数据
3. 接受数据
4. 关闭USB设备

根据USB规范的规定,所有USB设别都有供应商ID(VID)和产品识别码(PID),主机通过不同的VID和PID来区别不同的设备

[附一个使用C#获取USB设备信息的代码](https://www.cnblogs.com/Kconnie/p/4675156.html)

## 如何查看设别的VID和PID

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404101430715.png)

windows是通过设备接口类的GUID来区分设备是什么类型的

[常用设备接口类GUID参考](https://blog.csdn.net/jhqin/article/details/6775321)

比如

```json
HID：         "{4D1E55B2-F16F-11CF-88CB-001111000030}";
USB_DEVICE：  "{A5DCBF10-6530-11D2-901F-00C04FB951ED}";
COMPORT：     "{86E0D1E0-8089-11D0-9CE4-08003E301F73}"
```

根据设备接口类的GUID=>获取对应的设备列表=>再通过VID和GUID去设备列表中匹配对应的设备=>获取设备的路径=>通过路径打开设备进行通信

```C#
using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
 
namespace TPCL.USB
{
    class UsbDevice
    {
        #region MyRegion
        private FileStream DeviceIo = null; //异步IO流
        private bool is_open = false;
        private IntPtr device = new IntPtr(-1);
 
        private const int MAX_USB_DEVICES = 64;
        private static IntPtr INVALID_HANDLE_VALUE = new IntPtr(-1);
        //常用设备接口类GUID
        private const string HidGuid = "{4D1E55B2-F16F-11CF-88CB-001111000030}";
        private const string UsbDevGuid = "{A5DCBF10-6530-11D2-901F-00C04FB951ED}";
        private const string UsbComPort = "{86E0D1E0-8089-11D0-9CE4-08003E301F73}";
 
        public static void GetAllUsbDevice(ref List<string> UsbDeviceList)
        {
            UsbDeviceList.Clear();
            Guid guid = Guid.Parse(UsbDevGuid);
            IntPtr deviceInfoSet = SetupDiGetClassDevs(ref guid, 0, IntPtr.Zero, DIGCF.DIGCF_PRESENT | DIGCF.DIGCF_DEVICEINTERFACE);
            if (deviceInfoSet != IntPtr.Zero)
            {
                SP_DEVICE_INTERFACE_DATA interfaceInfo = new SP_DEVICE_INTERFACE_DATA();
                interfaceInfo.cbSize = Marshal.SizeOf(interfaceInfo);
                for (uint index = 0; index < 64; index++)
                {
                    if (SetupDiEnumDeviceInterfaces(deviceInfoSet, IntPtr.Zero, ref guid, index, ref interfaceInfo))
                    {
                        // 取得接口详细信息:第一次读取错误,但可以取得信息缓冲区的大小
                        int buffsize = 0;
                        SetupDiGetDeviceInterfaceDetail(deviceInfoSet, ref interfaceInfo, IntPtr.Zero, buffsize, ref buffsize, null);
                        //构建接收缓冲
                        IntPtr pDetail = Marshal.AllocHGlobal(buffsize);
                        SP_DEVICE_INTERFACE_DETAIL_DATA detail = new SP_DEVICE_INTERFACE_DETAIL_DATA();
                        //detail.cbSize = Marshal.SizeOf(typeof(SP_DEVICE_INTERFACE_DETAIL_DATA));
                        if (IntPtr.Size == 8)
                            detail.cbSize = 8;  // for 64 bit operating systems
                        else
                            detail.cbSize = 4 + Marshal.SystemDefaultCharSize; // for 32 bit operating systems
                        Marshal.StructureToPtr(detail, pDetail, false);
                        if (SetupDiGetDeviceInterfaceDetail(deviceInfoSet, ref interfaceInfo, pDetail, buffsize, ref buffsize, null))
                        {
                            UsbDeviceList.Add(Marshal.PtrToStringAuto((IntPtr)((int)pDetail + 4)));
                        }
                        //
                        Marshal.FreeHGlobal(pDetail);
                    }
                }
            }
            SetupDiDestroyDeviceInfoList(deviceInfoSet);
        }
 
        public int OpenUsbDevice(UInt16 vID, UInt16 pID)
        {
            List<string> deviceList = new List<string>();
            GetAllUsbDevice(ref deviceList);
            if (deviceList.Count == 0)
                return 0;
 
            string VID = string.Format("{0:X4}", vID);
            string PID = string.Format("{0:X4}", pID);
 
            foreach (string item in deviceList)
            {
                if (item.ToLower().Contains(VID.ToLower()) && item.ToLower().Contains(PID.ToLower())) //指定设备
                {
                    Debug.WriteLine(item);
                    if (is_open == false)
                    {
                        device = CreateFile(item, DESIREDACCESS.GENERIC_READ | DESIREDACCESS.GENERIC_WRITE,
                                        0, 0, CREATIONDISPOSITION.OPEN_EXISTING, 0x40000000, 0);
 
                        if (device != INVALID_HANDLE_VALUE)
                        {
                            Debug.WriteLine("open");
                            DeviceIo = new FileStream(new SafeFileHandle(device, false), FileAccess.ReadWrite,40,true);
                            //DeviceIo = new FileStream(new SafeFileHandle(device, false), FileAccess.ReadWrite);
                            this.is_open = true;
                            return 1;
                        }
                        CloseHandle(device);
                    }
                }
            }
            return 0;
        }
 
        public void CloseDevice()
        {
            if (is_open == true)
            {
                is_open = false;
                DeviceIo.Close();
                CloseHandle(device);
            }
        }
 
        public void Send(string dataString)
        {
            if (DeviceIo == null)
            {
                Debug.WriteLine("USB Device not open");
                return;
            }
            byte[] data = Encoding.GetEncoding("GBK").GetBytes(dataString); //打印机支持GBK中文
                                                                            // byte[] data = System.Text.Encoding.ASCII.GetBytes(dataString);
            DeviceIo.Write(data, 0, data.Length);
        }
 
        public void Read()
        {
            //DeviceIo.Read
        }
 
        public bool GetDeviceState()
        {
            return is_open;
        }
 
        #endregion
 
        #region Win32_api
        public enum DIGCF
        {
            DIGCF_DEFAULT = 0x00000001,         //只返回与系统默认设备相关的设备。
            DIGCF_PRESENT = 0x00000002,         //只返回当前存在的设备。
            DIGCF_ALLCLASSES = 0x00000004,      //返回所有已安装的设备。如果这个标志设置了，ClassGuid参数将被忽略
            DIGCF_PROFILE = 0x00000008,         //只返回当前硬件配置文件中的设备。
            DIGCF_DEVICEINTERFACE = 0x00000010  //返回所有支持的设备。
        }
 
        /// <summary>
        /// 接口数据定义
        /// </summary>
        public struct SP_DEVICE_INTERFACE_DATA
        {
            public int cbSize;
            public Guid interfaceClassGuid;
            public int flags;
            public int reserved;
        }
        /// <summary>
        /// 定义设备实例，该实例是设备信息集的成员
        /// </summary>
        public class SP_DEVINFO_DATA
        {
            public int cbSize = Marshal.SizeOf(typeof(SP_DEVINFO_DATA));
            public Guid classGuid = Guid.Empty; // temp
            public int devInst = 0; // dumy
            public int reserved = 0;
        }
 
        internal struct SP_DEVICE_INTERFACE_DETAIL_DATA
        {
            internal int cbSize;
            internal short devicePath;
        }
 
        /// <summary>
        /// 获取USB-HID设备的设备接口类GUID，即{4D1E55B2-F16F-11CF-88CB-001111000030}
        /// </summary>
        /// <param name="HidGuid"></param>
        [DllImport("hid.dll")]
        private static extern void HidD_GetHidGuid(ref Guid HidGuid);
 
        /// <summary>
        /// 获取对应GUID的设备信息集(句柄)
        /// </summary>
        /// <param name="ClassGuid">设备设置类或设备接口类的guid</param>
        /// <param name="Enumerator">指向以空结尾的字符串的指针，该字符串提供PNP枚举器或PNP设备实例标识符的名称</param>
        /// <param name="HwndParent">用于用户界面的顶级窗口的句柄</param>
        /// <param name="Flags">一个变量，指定用于筛选添加到设备信息集中的设备信息元素的控制选项。</param>
        /// <returns>设备信息集的句柄</returns>
        [DllImport("setupapi.dll", SetLastError = true)]
        private static extern IntPtr SetupDiGetClassDevs(ref Guid ClassGuid, uint Enumerator, IntPtr HwndParent, DIGCF Flags);
 
        /// <summary>
        /// 根据句柄，枚举设备信息集中包含的设备接口。
        /// </summary>
        /// <param name="deviceInfoSet"></param>
        /// <param name="deviceInfoData"></param>
        /// <param name="interfaceClassGuid"></param>
        /// <param name="memberIndex"></param>
        /// <param name="deviceInterfaceData"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern Boolean SetupDiEnumDeviceInterfaces(IntPtr deviceInfoSet, IntPtr deviceInfoData, ref Guid interfaceClassGuid, UInt32 memberIndex, ref SP_DEVICE_INTERFACE_DATA deviceInterfaceData);
 
        /// <summary>
        /// 获取接口详细信息，在第一次主要是读取缓存信息,第二次获取详细信息(必须调用两次)
        /// </summary>
        /// <param name="deviceInfoSet">指向设备信息集的指针，它包含了所要接收信息的接口。该句柄通常由SetupDiGetClassDevs函数返回。</param>
        /// <param name="deviceInterfaceData">返回数据</param>
        /// <param name="deviceInterfaceDetailData"></param>
        /// <param name="deviceInterfaceDetailDataSize"></param>
        /// <param name="requiredSize"></param>
        /// <param name="deviceInfoData"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll", SetLastError = true, CharSet = CharSet.Auto)]
        private static extern bool SetupDiGetDeviceInterfaceDetail(IntPtr deviceInfoSet, ref SP_DEVICE_INTERFACE_DATA deviceInterfaceData, IntPtr deviceInterfaceDetailData, int deviceInterfaceDetailDataSize, ref int requiredSize, SP_DEVINFO_DATA deviceInfoData);
 
        /// <summary>
        /// 删除设备信息并释放内存。
        /// </summary>
        /// <param name="HIDInfoSet"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern Boolean SetupDiDestroyDeviceInfoList(IntPtr deviceInfoSet);
        #endregion
 
        #region Open_Device
        /// <summary>
        /// 访问权限
        /// </summary>
        static class DESIREDACCESS
        {
            public const uint GENERIC_READ = 0x80000000;
            public const uint GENERIC_WRITE = 0x40000000;
            public const uint GENERIC_EXECUTE = 0x20000000;
            public const uint GENERIC_ALL = 0x10000000;
        }
        /// <summary>
        /// 如何创建
        /// </summary>
        static class CREATIONDISPOSITION
        {
            public const uint CREATE_NEW = 1;
            public const uint CREATE_ALWAYS = 2;
            public const uint OPEN_EXISTING = 3;
            public const uint OPEN_ALWAYS = 4;
            public const uint TRUNCATE_EXISTING = 5;
        }
 
        /// <summary>
        /// 
        /// </summary>
        /// <param name="lpFileName">普通文件名或设备文件名</param>
        /// <param name="desiredAccess">访问模式（写/读） GENERIC_READ、GENERIC_WRITE </param>
        /// <param name="shareMode">共享模式</param>
        /// <param name="securityAttributes">指向安全属性的指针</param>
        /// <param name="creationDisposition">如何创建</param>
        /// <param name="flagsAndAttributes">文件属性</param>
        /// <param name="templateFile">用于复制文件句柄</param>
        /// <returns></returns>
        [DllImport("kernel32.dll", SetLastError = true)]
        private static extern IntPtr CreateFile(string lpFileName, uint desiredAccess, uint shareMode, uint securityAttributes, uint creationDisposition, uint flagsAndAttributes, uint templateFile);
 
        /// <summary>
        /// 关闭
        /// </summary>
        /// <param name="hObject">Handle to an open object</param>
        /// <returns></returns>
        [DllImport("kernel32.dll")]
        private static extern int CloseHandle(IntPtr hObject);
 
        #endregion
    }
}
```

## 串口通信

在.NET Framework 2.0中提供了 SerialPort 类，该类主要实现串口数据通信等。

### SerialPort类

#### 常用属性

| 名称                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| BaseStream             | 获取 SerialPort 对象的基础 Stream 对象                       |
| BaudRate               | 获取或设置串行波特率                                         |
| BreakState             | 获取或设置中断信号状态                                       |
| BytesToRead            | 获取接收缓冲区中数据的字节数                                 |
| BytesToWrite           | 获取发送缓冲区中数据的字节数                                 |
| CDHolding              | 获取端口的载波检测行的状态                                   |
| CtsHolding             | 获取“可以发送”行的状态                                       |
| DataBits               | 获取或设置每个字节的标准数据位长度                           |
| DiscardNull            | 获取或设置一个值，该值指示 Null 字节在端口和接收缓冲区之间传输时是否被忽略 |
| DsrHolding             | 获取数据设置就绪 (DSR) 信号的状态                            |
| DtrEnable              | 获取或设置一个值，该值在串行通信过程中启用数据终端就绪 (DTR) 信号 |
| Encoding               | 获取或设置传输前后文本转换的字节编码                         |
| Handshake              | 获取或设置串行端口数据传输的握手协议                         |
| IsOpen                 | 获取一个值，该值指示 SerialPort 对象的打开或关闭状态         |
| NewLine                | 获取或设置用于解释 ReadLine( )和 WriteLine( )方法调用结束的值 |
| Parity                 | 获取或设置奇偶校验检查协议                                   |
| ParityReplace          | 获取或设置一个字节，该字节在发生奇偶校验错误时替换数据流中的无效字节 |
| PortName               | 获取或设置通信端口，包括但不限于所有可用的 COM 端口          |
| ReadBufferSize         | 获取或设置 SerialPort 输入缓冲区的大小                       |
| ReadTimeout            | 获取或设置读取操作未完成时发生超时之前的毫秒数               |
| ReceivedBytesThreshold | 获取或设置 DataReceived 事件发生前内部输入缓冲区中的字节数   |
| RtsEnable              | 获取或设置一个值，该值指示在串行通信中是否启用请求发送 (RTS) 信号 |
| StopBits               | 获取或设置每个字节的标准停止位数                             |
| WriteBufferSize        | 获取或设置串行端口输出缓冲区的大小                           |
| WriteTimeout           | 获取或设置写入操作未完成时发生超时之前的毫秒数               |

#### 常用方法

| 方法名称  | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| Close     | 关闭端口连接，将 IsOpen 属性设置为 False，并释放内部 Stream 对象 |
| Open      | 打开一个新的串行端口连接                                     |
| Read      | 从 SerialPort 输入缓冲区中读取                               |
| ReadByte  | 从 SerialPort 输入缓冲区中同步读取一个字节                   |
| ReadChar  | 从 SerialPort 输入缓冲区中同步读取一个字符                   |
| ReadLine  | 一直读取到输入缓冲区中的 NewLine 值                          |
| ReadTo    | 一直读取到输入缓冲区中指定 value 的字符串                    |
| Write     | 已重载。将数据写入串行端口输出缓冲区                         |
| WriteLine | 将指定的字符串和 NewLine 值写入输出缓冲区                    |

### 下位机与上位机间串口通信

处理思想:

一般情况下，当下位机高速发送应答数据时，串口接收到的数据不会是一个完整应答数据，而是多个应答数据的混合集，因此当你以单一应答数据来解析收到的数据时往往会发现应答数据格式不正确，在界面上的表现就是“没有收到数据”。

另外把收到的原始字节数组解析为程序能读懂的数据也是一项费时费力的事情，因此会出现“高速收，低速埋”的矛盾。但是，如果只让串口执行“收”，而辅助线程执行“埋”，那么就有效的解决了这个矛盾，即使下位机发的速度再高，系统也能抗得住。

为了实现这个思想,可以有如下设计:

1. 数据接收与处理分离

- **串口接收线程**：专责监听串口，并将接收到的数据累积在一个共享的缓冲区中。这个线程只负责数据的接收，不做任何处理，以保证数据能够尽快从串口被读取出来，避免丢失数据。
- **数据处理线程**：负责从共享缓冲区读取数据，并进行解析和处理。处理完的数据可以进一步用于更新UI、存储或进行其他操作。

2. 线程安全的共享缓冲区

因为数据接收和处理是由不同的线程并发执行的，共享缓冲区必须是线程安全的。可以使用锁（如C#中的`lock`语句）来同步对缓冲区的访问，或者使用线程安全的集合（如`ConcurrentQueue<T>`）来自动管理同步。

3. 数据的边界识别与完整性保证

由于接收到的数据可能是多个应答数据的混合集，数据处理线程需要能够正确识别每个独立应答数据的边界。这通常需要根据具体的应答数据格式来设计解析算法，例如，通过特定的起始字节、结束字节、长度字段或校验和来识别和验证数据的完整性。

#### 开发步骤概述

1. **设计共享缓冲区**：选择或实现一个线程安全的数据结构来作为共享缓冲区，用于存储从串口接收到的原始数据。
2. **实现串口接收线程**：
   - 连续监听串口。
   - 将接收到的数据追加到共享缓冲区。
   - 使用最小的处理，确保高效接收。
3. **实现数据处理线程**：
   - 循环从共享缓冲区读取数据。
   - 识别和提取完整的应答数据。
   - 对每个完整应答数据进行解析和处理。
4. **同步机制**：确保对共享缓冲区的访问是线程安全的，可以通过锁或线程安全的集合来实现。
5. **错误处理与异常管理**：添加必要的错误处理和异常管理机制，以确保系统的鲁棒性。

采用这种多线程的设计方案，可以有效地解决接收和处理速度不匹配的问题，提高系统对高速串口数据流的处理能力。

# C# DLL开发

## 创建DLL

在VS中创建项目选择类库

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404110918454.png)

封装成DLL时程序集名字要跟程序里的 namespace 命名一致，如下图，否则应用DLL时无法引用成功

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404110919193.png)

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404110919595.png)

## C#中调用该DLL

1. 把DLL放在项目文件夹的bin目录的Debug目录下
2. 点击项目里的引用添加DLL

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404110921263.png)

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404110921865.png)



![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404110921865.png)

添加完后可以在引用里看到DLL

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404110921757.png)

使用using包含进去,并调用dll中的函数

```c#
using myDLL;

Class1 test = new Class1(); //新建类
int a = test.add(1,2); //调用DLL的函数
Console.WriteLine(" a = " + a);//查看调用结果
```

> C#封装的DLL是非标准的DLL（托管类），不可以用 DllImport 调用，DllImport是用来调用标准类（非托管类）的，这类DLL一般是用C++写的

## DLL中自定义窗口

项目上右键添加-添加-新建项-窗体(Windows 窗体)

```c#
using System.Windows.Forms;

namespace testDll
{
    public class Class1
    {
        public static void ShowWindow()
        {
            Form1 form = new Form1();
            form.Text = "Hello from DLL";
            MessageBox.Show("Hello from DLL");//弹消息框
            //form.Show();//非模态弹自定义窗口
            form.ShowDialog();//模态弹自定义窗口窗口
        }
    }
    
}
```

# NuGet程序包管理器

开发过程中几乎不可避免地要使用第三方包，当然可以不用包管理器。对于开源的项目可以直接引用源文件，预先构建好了的库也可以直接引用dll。但是用nuget之类的包管理器可以**更方便地进行管理，比如最基本的安装、更新、卸载功能可以直接通过命令行或者IDE来操作。**

**常用的包管理工具**

- Linux：apt、yum
- Javascript：npm
- Java：Maven、Gradle
- Python：pip

[NuGet](https://www.nuget.org/)是.NET平台上的包管理器，可以帮助开发者轻松地安装、更新和卸载第三方库和工具。

NuGet可以提高项目的开发效率和质量，因为它可以让开发者复用已有的优秀的代码，而不需要自己从头编写或者手动管理依赖关系。

## **NuGet使用方式**

- [NuGet CLI](NuGet CLI)
- [VS图形界面](VS图形界面)
  (推荐)VS命令行【程序包管理器控制台】

### NuGet CLI

安装前要先查看当前包是否支持自己的项目框架(如下)

![NuGet程序包管理器_管理工具](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404271028370.webp)

查看安装命令，复制到命令行执行

![NuGet程序包管理器_asp.net_02](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404271028512.webp)

```shell
#大致语法
#下面命令可以直接在终端中运行
#安装：
Install-Package XXX -Version 指定版本。
#卸载：
UnInstall-Package XXX
#更新到最新版：
Update-Package XXX
```

### VS图形界面

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404271031608.webp" alt="NuGet程序包管理器_管理工具_05" style="zoom: 50%;" />

# C# 合并程序集

我们有多种工具可以将程序[集合](https://so.csdn.net/so/search?q=集合&spm=1001.2101.3001.7020)并成为一个。比如 ILMerge、Mono.Merge。前者不可定制、运行缓慢、消耗资源（不过好消息是现在开源了）；后者已被弃用、不受支持且基于旧版本的 Mono.Cecil。

用来替代它们的 ILRepack，使用 ILRepack 来合并程序集。

## ILRepack

il-repack 是一款开源的 .NET 类库重打包工具，它能够将多个 DLL 文件合并成一个单一的 DLL 或 EXE 文件。这在处理依赖性复杂的问题时非常有用，并且可以提高应用程序的部署效率。

> 以帮助开发者解决以下问题：
>
> - 将多个类库合并为一个文件，减少部署所需的文件数量。
> - 合并类库中的类型冲突。il-repack 可以自动解决这些冲突，并确保程序正常运行。
> - 支持 .NET Framework 和 .NET Core。
> - 支持 Windows、Linux 和 macOS 操作系统。
>
> 此外，il-repack 还具有以下特点：
>
> - 易于使用：只需要在命令行中输入简单的指令即可完成操作。
> - 高效：il-repack 使用 IL 指令进行操作，因此速度非常快。
> - 灵活：支持自定义输出目录和输出文件名。

使用 ILRepack 来合并程序集使用方式

```shell
PM> NuGet\Install-Package ILRepack -Version 2.0.31
```

项目根目录下出现的`packages\ILRepack.2.0.31\tools`下会出现ILRepack.exe

使用类似这样的命令

```shell
#将dll1.dll和dll2.dll以及dll3.dll(以dll1.dll为主)合并为一个output.dll
./ILRepack.exe /out:output.dll /target:library dll1.dll dll2.dll dll3.dll
```

比如说如果`dll3.dll`还依赖`dll4.dll`,将`dll4.dll`一起拉进来合成dll

# C# 单元测试

## 为什么要使用单元测试？

- 大大节约了测试和修改的时间，有效且便于测试各种情况。
- 能快速定位bug（每一个测试用例都是具有针对性）。
- 能使开发人员重新审视需求和功能的设计（难以单元测试的代码，就需要重新设计）。
- 强迫开发者以调用者而不是实现者的角度来设计代码，利于代码之间的解耦。
- 自动化的单元测试能保证回归测试的有效执行。
- 使代码可以放心修改和重构。
- 测试用例，可作为开发文档使用（测试即文档）。
- 测试用例永久保存，支持随时测试。

对于我个人来说，主要是防止自己犯低级错误的，同时也方便修改（BUG修复）而不引入新的问题。可以放心大胆的重构。简言之，这个简单有效的技术就是为了令代码变得更加完美。

c#常用单元测试框架：MSTest (Visual Studio官方)、XUnit 和 NUnit。

1. MS Test为微软产品，集成在Visual Studio 2008+工具中。
2. NUnit为.Net开源测试框架（采用C#开发），广泛用于.Net平台的单元测试和回归测试中，官方网址([www.nunit.org](http://www.nunit.org/))。
3. XUnit.Net为NUnit的改进版。





## mock技术

在进行单元测试时，如果函数依赖于许多资源而不仅仅是参数，可以考虑使用mocking技术。Mocking是一种在单元测试中模拟依赖项的技术，以确保测试的独立性和可靠性。通过使用mocking框架或手动创建模拟对象，您可以模拟函数所依赖的资源，从而使测试更加可控和可靠。这样，您就可以专注于测试函数的逻辑而不必担心外部资源的影响。希望这可以帮助您进行函数的单元测试。

## 自动生成单元测试

vs自带的单元测试生成:IntelliTest   vs企业版才支持

 
