---
title: QT入门
tags: QT
categories: 技术
mathjax: true
abbrlink: '2e306159'
---

# Qt概述

## 什么是Qt

Qt是一个**跨平台**的C++**图形用户界面应用程序框架**。它为应用程序开发者提供建立艺术级图形界面所需的所有功能。它是完全面向对象的，很容易扩展，并且允许真正的组件编程。

<!-- more -->

## Qt的发展史

1991年 Qt最早由奇趣科技开发

1996年 进入商业领域，它也是目前流行的Linux桌面环境KDE的基础

2008年 奇趣科技被诺基亚公司收购，Qt称为诺基亚旗下的编程语言

2012年 Qt又被Digia公司收购

2014年4月 跨平台的集成开发环境Qt Creator3.1.0发布，同年5月20日配发了Qt5.3正式版，至此Qt实现了对iOS、Android、WP等各平台的全面支持。

当前Qt最新版本为 5.9.0(现在已经不是了)

## 支持的平台

-   Windows -- XP、Vista、Win7、Win8、Win2008、Win10

-   Uinux/X11 -- Linux、Sun Solaris、HP-UX、Compaq Tru64 UNIX、IBM AIX、SGI IRIX、FreeBSD、BSD/OS、和其他很多X11平台

-   Macintosh -- Mac OS X

-   Embedded -- 有帧缓冲支持的嵌入式Linux平台，Windows CE

## Qt版本

Qt按照不同的版本发行，分为商业版和开源版

-   商业版

> 为商业软件提供开发，他们提供传统商业软件发行版，并且提供在商业有效期内的免费升级和技术支持服务。

-   开源的LGPL版本：

> 为了开发自有而设计的开放源码软件，它提供了和商业版本同样的功能，在GNU通用公共许可下，它是免费的。

## Qt的下载与安装

### 下载地址：

<http://www.qt.io/download-open-source/>

#### Linux Host

-   [Qt 5.5.0 for Linux 32-bit (535 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-linux-x86-5.5.0.run)

-   [Qt 5.5.0 for Linux 64-bit (532 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-linux-x64-5.5.0-2.run)

-   [Qt 5.5.0 for Android (Linux 64-bit, 605 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-linux-x64-android-5.5.0-2.run)

-   [Qt 5.5.0 for Android (Linux 32-bit, 608 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-linux-x86-android-5.5.0.run)

#### OS X Host

-   [Qt 5.5.0 for Mac (588 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-mac-x64-clang-5.5.0.dmg.mirrorlist)

-   [Qt 5.5.0 for Android (Mac, 652 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-mac-x64-android-5.5.0.dmg)

-   [Qt 5.5.0 for Android and iOS (Mac, 1.7 GB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-mac-x64-android-ios-5.5.0.dmg)

#### Windows Host

-   [Qt 5.5.0 for Windows 64-bit (VS 2013, 650 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-windows-x86-msvc2013_64-5.5.0.exe)

-   [Qt 5.5.0 for Windows 32-bit (VS 2013, 633 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-windows-x86-msvc2013-5.5.0.exe)

-   [Qt 5.5.0 for Windows 32-bit (VS 2012, 587 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-windows-x86-msvc2012-5.5.0.exe)

-   [Qt 5.5.0 for Windows 32-bit (VS 2010, 585 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-windows-x86-msvc2010-5.5.0.exe)

-   [Qt 5.5.0 for Windows 32-bit (MinGW 4.9.2, 959 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-windows-x86-mingw492-5.5.0.exe)

-   [Qt 5.5.0 for Android (Windows 32-bit, 1.0 GB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-windows-x86-android-5.5.0.exe)

-   [Qt 5.5.0 for Windows RT 32-bit (621 MB)    (info)](http://download.qt.io/official_releases/qt/5.5/5.5.0/qt-opensource-windows-x86-winrt-5.5.0.exe)

### 安装

默认安装（建议组件全部选中）

-   Qt对不同的平台提供了不同版本的安装包，可根据实际情况自行下载安装，本文档使用**qt-opensource-windows-x86-mingw482_opengl-5.3.1** 版本进行讲解(mingw482
    ：UTF-8编码，中文不会乱码)

## Qt的优点

-   跨平台，几乎支持所有的平台

-   接口简单，容易上手，学习QT框架对学习其他框架有参考意义。

-   一定程度上简化了内存回收机制

-   开发效率高，能够快速的构建应用程序。

-   有很好的社区氛围，市场份额在缓慢上升。

-   可以进行嵌入式开发。

## 成功案例

-   Linux桌面环境KDE
-   WPS Office 办公软件
-   Skype 网络电话
-   Google Earth 谷歌地图
-   VLC多媒体播放器
-   VirtualBox虚拟机软件
-   ...

## QT中常用默认快捷键

| 快捷键 | 功能           |
| ------ | -------------- |
| ctrl+i | 格式化选中代码 |
|        |                |

# 创建Qt项目

## 使用向导创建

打开Qt Creator 界面选择 New Project或者选择菜单栏 【文件】-【新建文件或项目】菜单项

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps37.jpg)

弹出New Project对话框，选择Qt Widgets Application，

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps56.jpg)

选择【Choose】按钮，弹出如下对话框

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps82.jpg)

设置项目名称和路径，按照向导进行下一步，

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps125.jpg)

选择编译套件

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps145.jpg)

向导会默认添加一个继承自CMainWindow的类，可以在此修改类的名字和基类。默认的基类有QMainWindow、QWidget以及QDialog三个，我们可以选择QWidget（类似于空窗口），这里我们可以先创建一个不带UI的界面，继续下一步

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps169.jpg)

系统会默认给我们添加main.cpp、mywidget.cpp、 mywidget.h和一个.pro项目文件，点击完成，即可创建出一个Qt桌面程序。

## 手动创建

添加一个空项目

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps188.jpg)

选择【choose】进行下一步。设置项目名称和路径 ---> 选择编译套件 --> 修改类信息 --> 完成（步骤同上），生成一个空项目。在空项目中添加文件：在项目名称上单击鼠标右键弹出右键菜单，选择【添加新文件】

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps201.jpg)

弹出新建文件对话框

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps235.jpg)

在此对话框中选择要添加的类或者文件，根据向导完成文件的添加。

## .pro文件

在使用Qt向导生成的应用程序.pro文件格式如下：

```makefile
#包含的模块
QT += core gui 

#大于Qt4版本 才包含widget模块
greaterThan(QT_MAJOR_VERSION, 4): QT += widgets 

#应用程序名 生成的.exe程序名称
TARGET = QtFirst 

#模板类型 应用程序模板
TEMPLATE = app 

#源文件
SOURCES += main.cpp\ 

mywidget.cpp

#头文件
HEADERS += mywidget.h 
```

**.pro就是工程文件(project)，它是qmake自动生成的用于生产makefile的配置文件**。.pro文件的写法如下：

- 注释

  从"#"开始，到这一行结束。

-   模板变量告诉qmake为这个应用程序生成哪种makefile。下面是可供使用的选择：**TEMPLATE** = app

-   app -建立一个应用程序的makefile。这是默认值，所以如果模板没有被指定，这个将被使用。

-   lib - 建立一个库的makefile。

-   vcapp - 建立一个应用程序的VisualStudio项目文件。

-   vclib - 建立一个库的VisualStudio项目文件。

-   subdirs -这是一个特殊的模板，它可以创建一个能够进入特定目录并且为一个项目文件生成makefile并且为它调用make的makefile。

- #指定生成的应用程序名：

  **TARGET** = QtDemo

- #工程中包含的头文件

  **HEADERS** += include/painter.h

- #工程中包含的.ui设计文件

  **FORMS** += forms/painter.ui

- #工程中包含的源文件

  **SOURCES** += sources/main.cpp sources

- #工程中包含的资源文件

  **RESOURCES** += qrc/painter.qrc

- **greaterThan(QT_MAJOR_VERSION, 4): QT += widgets**

  *这条语句的含义是，如果QT_MAJOR_VERSION大于4（也就是当前使用的Qt5及更高版本）需要增加widgets模块。如果项目仅需支持Qt5，也可以直接添加"QT += widgets"一句。不过为了保持代码兼容，最好还是按照QtCreator生成的语句编写。**

  ![Qt5 模块](https://cdn.jsdelivr.net/gh/che77a38/blogImage/Qt5 模块.png)

- #配置信息

  CONFIG用来告诉qmake关于应用程序的配置信息。

  ```cpp
  CONFIG += c++11 //使用c++11的特性
  ```

  在这里使用"+="，是因为我们添加我们的配置选项到任何一个已经存在中。这样做比使用"="那样替换已经指定的所有选项更安全。

## 一个最简单的Qt应用程序

main入口函数中

```cpp
#include "widget.h"
#include <QApplication>
int main(int argc, char *argv[])
{
	QApplication a(argc, argv);
	Widget w;
	w.show();
	return a.exec();
}
```

![捕获](https://cdn.jsdelivr.net/gh/che77a38/blogImage/%E6%8D%95%E8%8E%B7.PNG)

解释：

-   Qt系统提供的标准类名声明头文件没有.h后缀

-   Qt一个类对应一个头文件，类名就是头文件名

-   QApplication应用程序类

    -   管理图形用户界面应用程序的控制流和主要设置。

    -   是Qt的整个后台管理的命脉它**包含主事件循环**，在其中来自窗口系统和其它资源的**所有事件处理和调度**。它也处理**应用程序的初始化和结束**，并且**提供对话管理**。

    -   对于任何一个使用Qt的图形用户界面应用程序，都正好存在一个QApplication 对象，而不论这个应用程序在同一时间内是不是有0、1、2或更多个窗口。

- a.exec()

  **程序进入消息循环**，等待对用户输入进行响应。这里main()把控制权转交给Qt，Qt完成事件处理工作，当应用程序退出的时候exec()的值就会返回。**在exec()中，Qt接受并处理用户和系统的事件并且把它们传递给适当的窗口部件。**

# 命名规范和QT的快捷键

![image-20210425133943997](https://cdn.jsdelivr.net/gh/che77a38/blogImage/image-20210425133943997.png)

- `alt +enter` // 自动创建类的定义

# 第一个QT（对象模型和坐标系）

## 按钮的创建

在Qt程序中，最常用的控件之一就是按钮了，首先我们来看下如何创建一个按钮

```cpp
QPushButton * btn = new QPushButton; //头文件 #include <QPushButton>

//设置父亲
btn->setParent(this);

//设置文字
btn->setText("德玛西亚");

//移动位置
btn->move(100,100);

//第二种创建
QPushButton * btn2 = new QPushButton("孙悟空",this);

//重新指定窗口大小
this->resize(600,400);

//设置窗口标题
this->setWindowTitle("第一个项目");

//限制窗口大小
this->setFixedSize(600,400);
```

上面代码中，一个按钮其实就是一个QPushButton类下的对象，如果只是创建出对象，是无法显示到窗口中的(独立显示到一个窗口中)，所以我们需要依赖一个父窗口，也就是指定一个父亲利用setParent函数即可，如果想设置按钮上显示的文字利用setText，移动按钮位置用move

对于窗口而言，我们可以修改左上角窗口的标题setWindowTitle，重新指定窗口大小：resize，或者设置固定的窗口大小setFixedSize；

## 对象模型（对象树）

在Qt中创建对象的时候会提供一个Parent对象指针，下面来解释这个parent到底是干什么的。

-   QObject是以对象树的形式组织起来的。

    -   当你创建一个QObject对象时，会看到QObject的构造函数接收一个QObject指针作为参数，这个参数就是 parent，也就是父对象指针。

> 这相当于，**在创建QObject对象时，可以提供一个其父对象，我们创建的这个QObject对象会自动添加到其父对象的children()列表。**

-   **当父对象析构的时候，这个列表中的所有对象也会被析构。（注意，这里的父对象并不是继承意义上的父类！）**

> 这种机制在 GUI 程序设计中相当有用。例如，一个按钮有一个QShortcut（快捷键）对象作为其子对象。当我们删除按钮的时候，这个快捷键理应被删除。这是合理的。

-   QWidget是能够在屏幕上显示的一切组件的父类。

    -   **QWidget继承自QObject，因此也继承了这种对象树关系。一个孩子自动地成为父组件的一个子组件**。因此，它会显示在父组件的坐标系统中，被父组件的边界剪裁。例如，当用户关闭一个对话框的时候，应用程序将其删除，那么，我们希望属于这个对话框的按钮、图标等应该一起被删除。事实就是如此，因为这些都是对话框的子组件。

    -   当然，**我们也可以自己删除子对象，它们会自动从其父对象列表中删除。**比如，当我们删除了一个工具栏时，其所在的主窗口会自动将该工具栏从其子对象列表中删除，并且自动调整屏幕显示。

Qt 引入对象树的概念，在一定程度上解决了内存问题。

-   当一个QObject对象在堆上创建的时候，Qt 会同时为其创建一个对象树。不过，**对象树中对象的顺序是没有定义**的。这意味着，销毁这些对象的顺序也是未定义的。

-   任何对象树中的 QObject对象 delete 的时候，如果这个对象有 parent，则自动将其从 parent 的children()列表中删除；如果有孩子，则自动 delete 每一个孩子。Qt 保证没有QObject会被 delete 两次，这是由析构顺序决定的。

如果QObject在栈上创建，Qt 保持同样的行为。正常情况下，这也不会发生什么问题。来看下下面的代码片段：

```cpp
{
	QWidget window;
	QPushButton quit("Quit", &window);
}
```

作为父组件的 window 和作为子组件的 quit 都是QObject的子类（事实上，它们都是QWidget的子类，而QWidget是QObject的子类）。这段代码是正确的，quit 的析构函数不会被调用两次，因为标准 C++要求，**局部对象的析构顺序应该按照其创建顺序的相反过程**。因此，这段代码在超出作用域时，会先调用 quit 的析构函数，将其从父对象 window 的子对象列表中删除，然后才会再调用 window 的析构函数。

但是，如果我们使用下面的代码：（注意：重点）

```cpp
{
	QPushButton quit("Quit");
	QWidget window;
	quit.setParent(&window);
}
```

情况又有所不同，析构顺序就有了问题。我们看到，在上面的代码中，作为父对象的 window 会首先被析构，因为它是最后一个创建的对象。在析构过程中，它会调用子对象列表中每一个对象的析构函数，也就是说， quit 此时就被析构了。然后，代码继续执行，在 window 析构之后，quit 也会被析构，因为 quit 也是一个局部变量，在超出作用域的时候当然也需要析构。但是，这时候已经是**第二次调用 quit 的析构函数**了，C++ 不允许调用两次析构函数，因此，**程序崩溃了**。

由此我们看到，Qt 的对象树机制虽然帮助我们在一定程度上解决了内存问题，但是也引入了一些值得注意的事情。这些细节在今后的开发过程中很可能时不时跳出来烦扰一下，所以，我们最好从开始就养成良好习惯，**在 Qt 中，尽量在构造的时候就指定 parent 对象**，并且大胆在堆上创建。

QT对象树的意义：**简化了内存回收机制**

*Qt*内存自动释放有两个前提条件: 1. 必须是QObject的派生类 2. 必须指定了parent对象

------

其**构造与析构顺序**如下图（重难点）（析构函数内代码与真正析构释放过程相反）

![Qt对象树](https://cdn.jsdelivr.net/gh/che77a38/blogImage/Qt%E5%AF%B9%E8%B1%A1%E6%A0%91.png)

**【注意】**widget和继承于QPushButton的mypushbutton类的析构中分别添加输出

widget.cpp

```cpp
#include "widget.h"
#include <QDebug>
#include "mypushbutton.h"

Widget::Widget(QWidget *parent)
    : QWidget(parent)
{
    mypushbutton* a=new mypushbutton();
    a->setParent(this);
    a->setText("hello");
}

Widget::~Widget()
{
    qDebug()<<"~widget";//！！！！！！！！！！！！！！
}
```

mypushbutton.cpp


```cpp
#include "mypushbutton.h"
#include <QDebug>
mypushbutton::mypushbutton(QWidget *parent) : QPushButton(parent)
{

}
mypushbutton::~mypushbutton()
{
    qDebug()<<"~mypushbutton";//！！！！！！！！！！！！
}

```

输出如下：

![image-20210425210702298](https://cdn.jsdelivr.net/gh/che77a38/blogImage/image-20210425210702298.png)

**【重点】**由此可知：**析构函数内代码的运行，是由上至下，而真正的析构释放过程是由下至上的。**

## Qt窗口坐标体系

坐标体系：

以左上角为原点（0,0），X向右增加，Y向下增加。

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps16.jpg)

对于嵌套窗口，其坐标是**相对于父窗口**来说的。

# 信号和槽机制

> 信号和槽是对象间的一种通信机制

信号槽是 Qt 框架引以为豪的机制之一。所谓信号槽，实际就是观察者模式。**当某个事件发生之后**，比如，按钮检测到自己被点击了一下，**它就会发出一个信号（signal）**。这种发出是没有目的的，类似广播。**如果有对象对这个信号感兴趣，它就会使用连接（connect）函数**，意思是，**将想要处理的信号和自己的一个函数（称为槽（slot））绑定来处理这个信号**。也就是说，**当信号发出时，被连接的槽函数会自动被回调**。这就类似观察者模式：当发生了感兴趣的事件，某一个操作就会被自动触发。

一图流：

![Qt信号和槽 ](https://cdn.jsdelivr.net/gh/che77a38/blogImage/Qt%E4%BF%A1%E5%8F%B7%E5%92%8C%E6%A7%BD%20.png)

## 系统自带的信号和槽

下面我们完成一个小功能，上面我们已经学习了按钮的创建，但是还没有体现出按钮的功能，按钮最大的功能也就是点击后触发一些事情，比如我们点击按钮，就把当前的窗口给关闭掉，那么在Qt中，这样的功能如何实现呢？

其实无法两行代码就可以搞定了，我们看下面的代码

```cpp
QPushButton * quitBtn = new QPushButton("关闭窗口",this);
connect(quitBtn,&QPushButton::clicked,this,&MyWidget::close);
```

第一行是创建一个关闭按钮，这个之前已经学过，第二行就是核心了，也就是信号槽的使用方式

connect()函数最常用的一般形式：
$$
connect(sender, signal, receiver, slot);
$$
参数解释：

-   sender：发出信号的对象

-   signal：发送对象发出的信号

-   receiver：接收信号的对象

-   slot：接收对象在接收到信号之后所需要调用的函数（槽函数）

那么系统自带的信号和槽通常如何查找呢，这个就需要利用帮助文档了，在帮助文档中比如我们上面的按钮的点击信号，在帮助文档中输入QPushButton，首先我们可以在Contents中寻找关键字 signals，信号的意思，但是我们发现并没有找到，这时候我们应该想到也许这个信号的被父类继承下来的，因此我们去他的父类QAbstractButton中就可以找到该关键字，点击signals索引到系统自带的信号有如下几个

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps39.jpg)

这里的clicked就是我们要找到，槽函数的寻找方式和信号一样，只不过他的关键字是slot。

## 自定义信号和槽

使用connect()可以让我们连接系统提供的信号和槽。但是，Qt 的信号槽机制并不仅仅是使用系统提供的那部分，还会允许我们自己设计自己的信号和槽。

下面我们看看使用 Qt 的信号槽：

```cpp
//首先定义一个学生类和老师类：
//老师类中声明信号 饿了 hungry
signals:
void hungury();
//学生类中声明槽 请客 treat
public slots:
void treat();
//在窗口中声明一个公共方法下课，这个方法的调用会触发老师饿了这个信号，而响应槽函数学生请客
void MyWidget::ClassIsOver()
{
	//发送信号
	emit teacher->hungury();
}
//学生响应了槽函数，并且打印信息
//自定义槽函数 实现
void Student::eat()
{
	qDebug() << "该吃饭了！";
}
//在窗口中连接信号槽
teacher = new Teacher(this);
student = new Student(this);
connect(teacher,&Teacher::hungury,student,&Student::treat);
//并且调用下课函数，测试打印出 "该吃饭了"
//================下面是重载版的信号和槽=============================
//自定义的信号 hungry带参数，需要提供重载的自定义信号和 自定义槽
void hungury(QString name); //自定义信号
void treat(QString name ); //自定义槽
//但是由于有两个重名的自定义信号和自定义的槽，直接连接会报错，所以需要利用函数指针来指向函数地址， 然后再再做连接
void (Teacher:: * teacherSingal)(QString) = &Teacher::hungury;
void (Student:: * studentSlot)(QString) = &Student::treat;
connect(teacher,teacherSingal,student,studentSlot);
//p.s.QString转char*是先.toUtf8()转为QByteArray类型，再.data()转为char*类型
```

**自定义信号槽需要注意的事项：**

-   **发送者和接收者都需要是QObject的子类（当然，槽函数是全局函数、Lambda 表达式等无需接收者的时候除外）；**
-   **信号和槽函数返回值是 void**
-   **信号只需要声明，不需要实现**
-   **槽函数需要声明也需要实现**
-   **槽函数是普通的成员函数，作为成员函数，会受到 public、private、protected 的影响；**
-   **使用 emit 在恰当的位置发送信号；**
-   **使用connect()函数连接信号和槽。**
-   **任何成员函数、static 函数、全局函数和 Lambda 表达式都可以作为槽函数（QT5以上才可以，QT4必须写到private slots:下）**
-   **信号槽要求信号和槽的参数一致，所谓一致，是参数类型一致。**
-   **如果信号和槽的参数不一致，允许的情况是，槽函数的参数可以比信号的少，即便如此，槽函数存在的那些参数的顺序也必须和信号的前面几个一致起来。这是因为，你可以在槽函数中选择忽略信号传来的数据（也就是槽函数的参数比信号的少）。**

## 信号和槽原理

本质上是在编译的时候做了其他处理

```cpp
//归根溯源
//slots宏实际上就是空
#define slots
//signal宏实际上就是public
#define signal public

//QT4的connect用到的SLOT和SIGNAL宏实际上就是字符串最前面加了1或者2
#ifndef QT_NO_DEBUG   //debug版
#define SLOT(a) qFlagLocation("1"#a QLOCATION)
#define SIGNAL(a) qFlagLocation("2"#a QLOCATION)
#else   //release版
#define SLOT(a) "1"#a
#define SIGNAL(a) "2"#a 
#endif
//'#'表示字符串拼接
		//QLOCATION宏:其实就是加了文件名和行号等一些调试信息
		#define QLOCATION "\0" __FILE__ ":" QT_STRINGIFY(__LINE__)

//Q_OBJECT是一些成员变量和函数
#define Q_OBJECT \
public: \
    QT_WARNING_PUSH \
    Q_OBJECT_NO_OVERRIDE_WARNING \
    static const QMetaObject staticMetaObject; \
    virtual const QMetaObject *metaObject() const; \
    virtual void *qt_metacast(const char *); \
    virtual int qt_metacall(QMetaObject::Call, int, void **); \
    QT_TR_FUNCTIONS \
private: \
    Q_OBJECT_NO_ATTRIBUTES_WARNING \
    Q_DECL_HIDDEN_STATIC_METACALL static void qt_static_metacall(QObject *, QMetaObject::Call, int, void **); \
    QT_WARNING_POP \
    struct QPrivateSignal { explicit QPrivateSignal() = default; }; \
    QT_ANNOTATE_CLASS(qt_qobject, "")
```

![image-20231122150258584](https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202311221503259.png)

### QMetaObject类

```cpp
//该类中的数据部分如下:
 struct Data { // private data
        SuperData superdata;
        const uint *stringdata;
        const uint *data;
        typedef void (*StaticMetacallFunction)(QObject *, QMetaObject::Call, int, void **);
        StaticMetacallFunction static_metacall;
        const SuperData *relatedMetaObjects;
        const QtPrivate::QMetaTypeInterface *const *metaTypes;
        void *extradata; //reserved for future use
    } d;
```

未完待续

## 信号槽的拓展

-   一个信号可以和多个槽相连

> **如果是这种情况，这些槽会一个接一个的被调用，但是它们的调用顺序是不确定的。**

-   多个信号可以连接到一个槽

> **只要任意一个信号发出，这个槽就会被调用**。

-   一个信号可以连接到另外的一个信号

> **当第一个信号发出时，第二个信号被发出。除此之外，这种信号-信号的形式和信号-槽的形式没有什么区别。**

-   槽可以被取消链接

> 这种情况并不经常出现，因为**当一个对象delete之后，Qt自动取消所有连接到这个对象上面的槽**。

-   信号槽可以断开

> 利用**disconnect**关键字是可以断开信号槽的

-   使用Lambda 表达式

> 在使用 Qt 5 的时候，能够支持 Qt 5 的编译器都是支持 Lambda 表达式的。

在连接信号和槽的时候，槽函数可以使用Lambda表达式的方式进行处理。后面我们会详细介绍什么是Lambda表达式

### 【注意】给label设置鼠标事件穿透案例

```cpp
ui->label.setAttribute(Qt::WA_TransparentForMouseEvents);
```

### 【注意】信号和槽传递自定义类型需要先注册该类型

如果是自己定义的类型如果想使用signal/slot来传递的话，则没有这么简单。直接使用的话，会产生下面这种错误：

```
QObject::connect: Cannot queue arguments of type 'TextAndNumber' (Make sure 'TextAndNumber' is registed using qRegisterMetaType().)
```

原因：当一个signal被放到队列中（queued）时，它的参数(arguments)也会被一起一起放到队列中（queued起来），这就意味着参数在被传送到slot之前需要被拷贝、存储在队列中（queue）中；为了能够在队列中存储这些参数(argument)，Qt需要去construct、destruct、copy这些对象，而为了让Qt知道怎样去作这些事情，参数的类型需要使用qRegisterMetaType来注册

```cpp
qRegisterMetaType<MyStruct>("MyStruct");
//例如：
qRegisterMetaType<QMap<QString,QMap<QString,QString>>>("QMap<QString,QMap<QString,QString>>");
```

## Qt4版本的信号槽写法

```cpp
connect(zt,SIGNAL(hungury(QString)),st,SLOT(treat(QString)));
```

这里使用了**SIGNAL和SLOT这两个宏，将两个函数名转换成了字符串**。注意到connect()函数的 signal 和 slot 都是接受字符串，一旦出现连接不成功的情况，Qt4是没有编译错误的（因为一切都是字符串，编译期是不检查字符串是否匹配），而是在运行时给出错误。这无疑会增加程序的不稳定性。

QT4写法

- 优势：参数直观
- 劣势：参数类型不做匹配检测

Qt5在语法上完全兼容Qt4，而反之是不可以的。

## connect中的Lambda表达式

[[c++基础#Lambda表达式|Lambda表达式详解跳转]]

 **【注意】Lambda和信号与槽（重点）**

1. 当进行信号和槽连接的时候，控件内部会进入一个**锁的状态**，因此不可以用Lambda表达式的引用传递来调用已连接的组件，而应该用Lambda表达式的**值传递**
2. connect函数中，如果槽函数用的是lambda表达式，那么**信号的接受者可以省略**

### 三参数版本的信号与槽

```cpp
QObject::connect(reply, &QNetworkReply::readyRead,[=](){
        QByteArray all = reply->readAll();
        qDebug()<<QString(all);
    });
```

# QMainWindow

QMainWindow是一个为用户提供主窗口程序的类，包含一个菜单栏（menu bar）、多个工具栏(tool bars)、多个锚接部件(dock widgets)、一个状态栏(status bar)及一个中心部件(central widget)，是许多应用程序的基础，如文本编辑器，图片编辑器等。

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps72.jpg)

## 菜单栏

一个主窗口最多只有一个菜单栏。位于主窗口顶部、主窗口标题栏下面。

-   创建菜单栏，通过QMainWindow类的menubar（）函数获取主窗口菜单栏指针

```cpp
QMenuBar * menuBar() const
```

-   创建菜单，调用QMenu的成员函数addMenu来添加菜单

```cpp
QAction* addMenu(QMenu * menu)
QMenu* addMenu(const QString & title)
QMenu* addMenu(const QIcon & icon, const QString & title)
```

-   创建菜单项，调用QMenu的成员函数addAction来添加菜单项

```cpp
QAction* activeAction() const
QAction* addAction(const QString & text)
QAction* addAction(const QIcon & icon, const QString & text)
QAction* addAction(const QString & text, const QObject * receiver,const char * member, const QKeySequence & shortcut = 0)
QAction* addAction(const QIcon & icon, const QString & text,const QObject * receiver, const char * member,const QKeySequence & shortcut = 0)
```

Qt 并没有专门的菜单项类，只是使用一个QAction类，抽象出公共的动作。当我们把QAction对象添加到菜单，就显示成一个菜单项，添加到工具栏，就显示成一个工具按钮。用户可以通过点击菜单项、点击工具栏按钮、点击快捷键来激活这个动作。

在ui中直接生成的action只能输入英文，因为QT会自动生成"action+输入英文"的对象名,但可以在属性表中手动改成中文内容。

**为界面添加右键菜单**

```cpp
 ui->treeWidget_salaryDistribution->setContextMenuPolicy(Qt::CustomContextMenu);//设置目录策略，否则右键无反应
//然后在ui编辑界面中，右击QTreeWidget--> Connect Signal-->选择customContextMenuRequested(QPoint)，添加slot函数。
void MainWindow::on_treeWidget_salaryDistribution_customContextMenuRequested(const QPoint &pos)
{
    QMenu *popMenu =new QMenu(this);//定义一个右键弹出菜单

           popMenu->addAction(ui->actionactionFromBankSetGuangFa);//往菜单内添加QAction   该action在前面用设计器定义了
           popMenu->addAction(ui->actionactionFromBankSetNongYe);
           popMenu->addAction(ui->actionactionFromBankSetZhaoShang);
           QAction* action=new QAction(this);
           action->setSeparator(true);//添加分割线action
           popMenu->addAction(action);
           popMenu->addAction(ui->actionactionToBankSetGuangFa);
           popMenu->addAction(ui->actionactionToBankSetNongYe);
           popMenu->addAction(ui->actionactionToBankSetZhaoShang);
           popMenu->exec(QCursor::pos());//弹出右键菜单，菜单位置为光标位置
}
```

[右键菜单点击跳转](https://www.cnblogs.com/lingluotianya/p/3642605.html)

## 工具栏

主窗口的工具栏上可以有多个工具条，通常采用一个菜单对应一个工具条的的方式，也可根据需要进行工具条的划分。

-   直接调用QMainWindow类的addToolBar（）函数获取主窗口的工具条对象，每增加一个工具条都需要调用一次该函数。

- 插入属于工具条的动作，即在工具条上添加操作。

  通过QToolBar类的addAction函数添加。

-   工具条是一个可移动的窗口，它的停靠区域由QToolBar的allowAreas决定，包括：

    -   Qt::LeftToolBarArea 停靠在左侧

    -   Qt::RightToolBarArea 停靠在右侧

    -   Qt::TopToolBarArea 停靠在顶部

    -   Qt::BottomToolBarArea 停靠在底部

    -   Qt::AllToolBarAreas 以上四个位置都可停靠

**使用setAllowedAreas（）函数指定停靠区域：**

​	setAllowedAreas（Qt::LeftToolBarArea | Qt::RightToolBarArea）

**使用setMoveable（）函数设定工具栏的可移动性：**

​	setMoveable（false）//工具条不可移动, 只能停靠在初始化的位置上（即不能操作位置）

## 状态栏

-   派生自QWidget类，使用方法与QWidget类似，QStatusBar类常用成员函数：
-   状态栏也只能最多有一个
-   状态栏无法通过ui文件拉拽放入控件

```cpp
//添加小部件
void addWidget(QWidget * widget, int stretch = 0)//左侧开始
void QStatusBar::addPermanentWidget(QWidget *widget, int stretch = 0)//右侧开始添加小部件
//插入小部件
int insertWidget(int index, QWidget * widget, int stretch = 0)
//删除小部件
void removeWidget(QWidget * widget)
```

## 铆接部件

铆接部件 QDockWidget，也称浮动窗口，可以有多个。

```cpp
QDockWidget * dock = new QDockWidget("标题",this);
addDockWidget(Qt::LeftDockWidgetArea,dock);
dock->setAllowedAreas(Qt::LeftDockWidgetArea | Qt::RightDockWidgetArea | Qt::TopDockWidgetArea); //设置区域范围(他的位置是相对核心部件而言的)
```

## 核心部件（中心部件）

除了以上几个部件，中心显示的部件都可以作为核心部件，例如一个记事本文件，可以利用QTextEdit做核心部件

```cpp
QTextEdit * edit = new QTextEdit(this);
setCentralWidget(edit);
```

## 资源文件

Qt 资源系统是一个跨平台的资源机制，用于将程序运行时所需要的资源以二进制的形式存储于可执行文件内部。如果你的程序需要加载特定的资源（图标、文本翻译等），那么，将其放置在资源文件中，就再也不需要担心这些文件的丢失。也就是说，如果你将资源以资源文件形式存储，它是会编译到可执行文件内部。

使用 Qt Creator 可以很方便地创建资源文件。我们可以在工程上点右键，选择"添加新文件..."，可以在 Qt 分类下找到"Qt 资源文件"：

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps91.jpg)

点击"选择..."按钮，打开"新建 Qt 资源文件"对话框。在这里我们输入资源文件的名字和路径：

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps110.jpg)

点击下一步，选择所需要的版本控制系统，然后直接选择完成。我们可以在 Qt Creator 的左侧文件列表中看到"资源文件"一项，也就是我们新创建的资源文件。右键res.qrc，点击用编辑的方式打开。

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps150.jpg)

右侧的编辑区有个"添加"，我们首先需要添加前缀，比如我们将前缀取名为 images。然后选中这个前缀，继续点击添加文件，可以找到我们所需添加的文件。这里，我们选择 document-open.png 文件。当我们完成操作之后，Qt Creator 应该是这样子的：

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps219.jpg)

接下来，我们还可以添加另外的前缀或者另外的文件。这取决于你的需要。当我们添加完成之后，我们可以像前面一章讲解的那样，通过使用 : 开头的路径来找到这个文件。比如，我们的前缀是 /images，文件是 document-open.png，那么就可以使用:/images/document-open.png找到这个文件。
$$
使用规则为“     ：+前缀名+（/）文件名”
$$
这么做带来的一个问题是，如果以后我们要更改文件名，比如将 docuemnt-open.png 改成 docopen.png，那么，所有使用了这个名字的路径都需要修改。所以，更好的办法是，我们给这个文件去一个"别名"，以后就以这个别名来引用这个文件。具体做法是，选中这个文件，添加别名信息：

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps237.jpg)

这样，我们可以直接使用:/images/doc-open引用到这个资源，无需关心图片的真实文件名。

如果我们使用文本编辑器打开 res.qrc 文件，就会看到一下内容：

```xml
<RCC>
	<qresource prefix="/images">
		<file alias="doc-open">document-open.png</file>
	</qresource>
	<qresource prefix="/images/fr" lang="fr">
		<file alias="doc-open">document-open-fr.png</file>
	</qresource>
</RCC>
```

我们可以对比一下，看看 Qt Creator 帮我们生成的是怎样的 qrc 文件。当我们编译工程之后，我们可以在构建目录中找到 qrc_res.cpp 文件，这就是 Qt 将我们的资源编译成了 C++ 代码。

# 对话框QDialog

## 基本概念

对话框是 GUI 程序中不可或缺的组成部分。很多不能或者不适合放入主窗口的功能组件都必须放在对话框中设置。对话框通常会是一个顶层窗口，出现在程序最上层，用于实现短期任务或者简洁的用户交互。

Qt 中使用QDialog类实现对话框。就像主窗口一样，我们通常会设计一个类继承QDialog。QDialog（及其子类，以及所有Qt::Dialog类型的类）的对于其 parent 指针都有额外的解释：**如果 parent 为 NULL，则该对话框会作为一个顶层窗口，否则则作为其父组件的子对话框（此时，其默认出现的位置是 parent 的中心）。顶层窗口与非顶层窗口的区别在于，顶层窗口在任务栏会有自己的位置，而非顶层窗口则会共享其父组件的位置。**

**对话框分为模态对话框和非模态对话框。**

- 模态对话框，就是会阻塞同一应用程序中其它窗口的输入。

  模态对话框很常见，比如"打开文件"功能。你可以尝试一下记事本的打开文件，当打开文件对话框出现时，我们是不能对除此对话框之外的窗口部分进行操作的。

-   与此相反的是非模态对话框，例如查找对话框，我们可以在显示着查找对话框的同时，继续对记事本的内容进行编辑。

## 标准对话框

所谓标准对话框，是 Qt 内置的一系列对话框，用于简化开发。事实上，有很多对话框都是通用的，比如打开文件、设置颜色、打印设置等。这些对话框在所有程序中几乎相同，因此没有必要在每一个程序中都自己实现这么一个对话框。

Qt 的内置对话框大致分为以下几类：

-   QColorDialog： 选择颜色；

-   QFileDialog： 选择文件或者目录；

-   QFontDialog： 选择字体；

-   QInputDialog： 允许用户输入一个值，并将其值返回；

-   QMessageBox： 模态对话框，用于显示信息、询问问题等；

-   QPageSetupDialog： 为打印机提供纸张相关的选项；

-   QPrintDialog： 打印机配置；

-   QPrintPreviewDialog：打印预览；

-   QProgressDialog： 显示操作过程。

## 自定义对话框

Qt 支持模态对话框和非模态对话框。

模态与非模态的实现：

-   使用QDialog::exec()实现应用程序级别的模态对话框

-   使用QDialog::open()实现窗口级别的模态对话框

-   使用QDialog::show()实现非模态对话框。

#### 模态对话框

-   Qt 有两种级别的模态对话框：

    -   应用程序级别的模态

> 当该种模态的对话框出现时，用户必须首先对对话框进行交互，直到关闭对话框，然后才能访问程序中其他的窗口。

-   窗口级别的模态

> 该模态仅仅阻塞与对话框关联的窗口，但是依然允许用户与程序中其它窗口交互。窗口级别的模态尤其适用于多窗口模式。

一般默认是应用程序级别的模态。

在下面的示例中，我们调用了exec()将对话框显示出来，因此这就是一个模态对话框。当对话框出现时，我们不能与主窗口进行任何交互，直到我们关闭了该对话框。

```cpp
QDialog dialog;
dialog.setWindowTitle(tr("Hello, dialog!"));
int ret=dialog.exec();
if(ret==QDialog::Accepted){
}
```

#### 非模态对话框

下面我们试着将exec()修改为show()，看看非模态对话框：

```cpp
QDialog dialog(this);
dialog.setWindowTitle(tr("Hello, dialog!"));
dialog.show();
```

是不是事与愿违？对话框竟然一闪而过！这是因为，**show()函数不会阻塞当前线程，对话框会显示出来，然后函数立即返回，代码继续执行。**注意，dialog 是建立在栈上的，show()函数返回，MainWindow::open()函数结束，dialog 超出作用域被析构，因此对话框消失了。知道了原因就好改了，我们将 dialog 改成堆上建立，当然就没有这个问题了：

```cpp
QDialog *dialog = new QDialog;
dialog->setWindowTitle(tr("Hello, dialog!"));
dialog->show();
```

如果你足够细心，应该发现上面的代码是有问题的：dialog 存在内存泄露！dialog 使用 new 在堆上分配空间，却一直没有 delete。解决方案也很简单：将 MainWindow 的指针赋给 dialog 即可。还记得我们前面说过的 Qt 的对象系统吗？

不过，这样做有一个问题：如果我们的对话框不是在一个界面类中出现呢？由于QWidget的 parent 必须是QWidget指针，那就限制了我们不能将一个普通的 C++ 类指针传给 Qt 对话框。另外，如果对内存占用有严格限制的话，当我们将主窗口作为 parent 时，主窗口不关闭，对话框就不会被销毁，所以会一直占用内存。在这种情景下，我们可以设置 dialog 的**WindowAttribute**：

```cpp
QDialog *dialog = new QDialog;
dialog->setAttribute(Qt::WA_DeleteOnClose);
dialog->setWindowTitle(tr("Hello, dialog!"));
dialog->show();
```

**setAttribute()函数设置对话框关闭时，自动销毁对话框。**

## 消息对话框

QMessageBox用于显示消息提示。我们一般会使用其提供的几个 static 函数：

-   显示关于对话框。

```cpp
void about(QWidget * parent, const QString & title, const QString & text)
```

> 这是一个最简单的对话框，其标题是 title，内容是 text，父窗口是 parent。对话框只有一个 OK 按钮。

- 显示关于 Qt 对话框。该对话框用于显示有关 Qt 的信息。

  ```cpp
  void aboutQt(QWidget * parent, const QString & title = QString())
  ```

- 显示严重错误对话框。

  ```cpp
  StandardButton critical(QWidget * parent,const QString & title,const QString & text,StandardButtons buttons = Ok,StandardButton defaultButton = NoButton)
  ```

  这个对话框将显示一个红色的错误符号。我们可以通过 buttons 参数指明其显示的按钮。默认情况下只有一个 Ok 按钮，我们可以使用StandardButtons类型指定多种按钮。

- 与QMessageBox::critical()类似，不同之处在于这个对话框提供一个普通信息图标。

  ```cpp
  StandardButton information(QWidget * parent,const QString & title,const QString & text,StandardButtons buttons = Ok,StandardButton defaultButton = NoButton)
  ```

- 与QMessageBox::critical ()类似，不同之处在于这个对话框提供一个问号图标，并且其显示的按钮是"是"和"否"。

  ```cpp
  StandardButton question(QWidget * parent,const QString & title,const QString & text,StandardButtons buttons = StandardButtons( Yes | No ),StandardButton defaultButton = NoButton)
  ```

- 与QMessageBox::critical()类似，不同之处在于这个对话框提供一个黄色叹号图标。

  ```cpp
  StandardButton warning(QWidget * parent,const QString & title,
  const QString & text,StandardButtons buttons = Ok,StandardButton defaultButton = NoButton)
  ```

我们可以通过下面的代码来演示下如何使用QMessageBox。

```cpp
if (QMessageBox::Yes == QMessageBox::question(this,tr("Question"), tr("Are you OK?"),QMessageBox::Yes | QMessageBox::No,QMessageBox::Yes))
{
	QMessageBox::information(this, tr("Hmmm..."),
	tr("I'm glad to hear that!"));
}
else
{
	QMessageBox::information(this, tr("Hmmm..."),
	tr("I'm sorry!"));
}
```

我们使用QMessageBox::question()来询问一个问题。

-   这个对话框的父窗口是 this。

> QMessageBox是QDialog的子类，这意味着它的初始显示位置将会是在 parent 窗口的中央。

-   第二个参数是对话框的标题。

-   第三个参数是我们想要显示的内容。

-   第四个参数是关联的按键类型，我们可以使用或运算符（|）指定对话框应该出现的按钮。比如我们希望是一个 Yes 和一个 No。

-   最后一个参数指定默认选择的按钮。

这个函数有一个返回值，用于确定用户点击的是哪一个按钮。按照我们的写法，应该很容易的看出，这是一个模态对话框，因此我们可以直接获取其返回值。

QMessageBox类的 static 函数优点是方便使用，缺点也很明显：非常不灵活。我们只能使用简单的几种形式。为了能够定制QMessageBox细节，我们必须使用QMessageBox的属性设置 API。如果我们希望制作一个询问是否保存的对话框，我们可以使用如下的代码：

```cpp
QMessageBox msgBox;
msgBox.setText(tr("The document has been modified."));
msgBox.setInformativeText(tr("Do you want to save your changes?"));
msgBox.setDetailedText(tr("Differences here..."));
msgBox.setStandardButtons(QMessageBox::Save| QMessageBox::Discard| QMessageBox::Cancel);
msgBox.setDefaultButton(QMessageBox::Save);
int ret = msgBox.exec();
switch (ret)
{
	case QMessageBox::Save:
	qDebug() << "Save document!";
	break;
	case QMessageBox::Discard:
	qDebug() << "Discard changes!";
	break;
	case QMessageBox::Cancel:
	qDebug() << "Close document!";
	break;
}
```

msgBox 是一个建立在栈上的QMessageBox实例。我们设置其主要文本信息为"The document has been modified."，informativeText 则是会在对话框中显示的简单说明文字。下面我们使用了一个detailedText，也就是详细信息，当我们点击了详细信息按钮时，对话框可以自动显示更多信息。我们自己定义的对话框的按钮有三个：保存、丢弃和取消。然后我们使用了exec()是其成为一个模态对话框，根据其返回值进行相应的操作。

## 标准文件对话框

QFileDialog，也就是文件对话框。在本节中，我们将尝试编写一个简单的文本文件编辑器，我们将使用QFileDialog来打开一个文本文件，并将修改过的文件保存到硬盘。

首先，我们需要创建一个带有文本编辑功能的窗口。借用我们前面的程序代码，应该可以很方便地完成：

```cpp
openAction = new QAction(QIcon(":/images/file-open"),tr("&Open..."), this);
openAction->setStatusTip(tr("Open an existing file"));
saveAction = new QAction(QIcon(":/images/file-save"), tr("&Save..."), this);
saveAction->setStatusTip(tr("Save a new file"));
QMenu *file = menuBar()->addMenu(tr("&File"));
file->addAction(openAction);
file->addAction(saveAction);
QToolBar *toolBar = addToolBar(tr("&File"));
toolBar->addAction(openAction);
toolBar->addAction(saveAction);
textEdit = new QTextEdit(this);
setCentralWidget(textEdit);
```

我们在菜单和工具栏添加了两个动作：打开和保存。接下来是一个QTextEdit类，这个类用于显示富文本文件。也就是说，它不仅仅用于显示文本，还可以显示图片、表格等等。不过，我们现在只用它显示纯文本文件。QMainWindow有一个setCentralWidget()函数，可以将一个组件作为窗口的中心组件，放在窗口中央显示区。显然，在一个文本编辑器中，文本编辑区就是这个中心组件，因此我们将QTextEdit作为这种组件。

我们使用connect()函数，为这两个QAction对象添加响应的动作：

```cpp
connect(openAction, &QAction::triggered,this, &MainWindow::openFile);
connect(saveAction, &QAction::triggered,this, &MainWindow::saveFile);
```

下面是最主要的openFile()和saveFile()这两个函数的代码：

```cpp
//打开文件
void MainWindow::openFile()
{
	QString path = QFileDialog::getOpenFileName(this,tr("Open File"), ".", tr("Text Files(*.txt)"));
	if(!path.isEmpty())
	{
		QFile file(path);
		if (!file.open(QIODevice::ReadOnly | QIODevice::Text))
		{
			QMessageBox::warning(this, tr("Read File"),tr("Cannot open file:\n%1").arg(path));
			return;
		}
	QTextStream in(&file);
	textEdit->setText(in.readAll());
	file.close();
	}
	else
	{
		QMessageBox::warning(this, tr("Path"),tr("You did not select any file."));
	}
}
//保存文件
void MainWindow::saveFile()
{
	QString path = QFileDialog::getSaveFileName(this,tr("Open File"), ".",tr("Text Files(*.txt)"));
	if(!path.isEmpty())
	{
		QFile file(path);
		if (!file.open(QIODevice::WriteOnly | QIODevice::Text))
		{
			QMessageBox::warning(this, tr("Write File"),tr("Cannot open file:\n%1").arg(path));
			return;
		}
		QTextStream out(&file);
		out << textEdit->toPlainText();
		file.close();
	}
	else
	{
		QMessageBox::warning(this, tr("Path"),tr("You did not select any file."));
	}
}
```

在openFile()函数中，我们使用QFileDialog::getOpenFileName()来获取需要打开的文件的路径。这个函数原型如下：

```cpp
QString getOpenFileName(QWidget * parent = 0,const QString & caption = QString(),const QString & dir = QString(),const QString & filter = QString(),QString * selectedFilter = 0,Options options = 0)
```

不过注意，它的所有参数都是可选的，因此在一定程度上说，这个函数也是简单的。这六个参数分别是：

-   parent：父窗口。

> Qt 的标准对话框提供静态函数，用于返回一个模态对话框；

-   caption：对话框标题；

-   dir：对话框打开时的默认目录

    -   "." 代表程序运行目录

    -   "/" 代表当前盘符的根目录（特指 Windows 平台；Linux 平台当然就是根目录），这个参数也可以是平台相关的，比如"C:\\\\"等；

-   filter：过滤器。

> 我们使用文件对话框可以浏览很多类型的文件，但是，很多时候我们仅希望打开特定类型的文件。比如，文本编辑器希望打开文本文件，图片浏览器希望打开图片文件。**过滤器就是用于过滤特定的后缀名**。如果我们使用"Image Files(*.jpg *.png)"，则只能显示后缀名是 jpg 或者 png 的文件。**如果需要多个过滤器，使用";;"分割**，比如"JPEG Files(*.jpg);;PNG Files(*.png)"；

-   selectedFilter：默认选择的过滤器；

-   options：对话框的一些参数设定

> 比如只显示文件夹等等，它的取值是enum QFileDialog::Option，每个选项可以使用 | 运算组合起来。

**QFileDialog::getOpenFileName()返回值是选择的文件路径。**我们将其赋值给 path。通过判断 path 是否为空，可以确定用户是否选择了某一文件。只有当用户选择了一个文件时，我们才执行下面的操作。

在saveFile()中使用的QFileDialog::getSaveFileName()也是类似的。使用这种静态函数，在 Windows、Mac OS 上面都是直接调用本地对话框，但是 Linux 上则是QFileDialog自己的模拟。这暗示了，如果你不使用这些静态函数，而是直接使用QFileDialog进行设置，那么得到的对话框很可能与系统对话框的外观不一致。这一点是需要注意的。

## 标准颜色对话框

```cpp
QColor color=QColorDialog::getColor(QT::red);//默认选择红色
qDebug() << color.red() << color.green() << color.blue();
```

## 标准字体对话框

```cpp
QFont font=QFontDialog::getFont(&flag,QFont("华文彩云",36));//flag返回是否获取成功
qDebug()<<"字体:"<<font.family().toUtf8().data()<<" 字号:"<<font.pointSize()<<" 是否加粗："<<font.bold()<<" 是否倾斜:"<<font.italic();
```

p.s.QT在工具-选项-文本编辑器-行为中，设置了文本编码的默认编码为UTF-8。在工具-选项-文本编辑器-显示勾选了Display file encoding，在编码区域右上角会显示文件编码格式。此时qdebug输出中文信息，用F5调试输出框会乱码，但用ctrl+F5直接运行则不会，不会影响程序发布

# 布局管理器

所谓 GUI 界面，归根结底，就是一堆组件的叠加。我们创建一个窗口，把按钮放上面，把图标放上面，这样就成了一个界面。在放置时，组件的位置尤其重要。我们必须要指定组件放在哪里，以便窗口能够按照我们需要的方式进行渲染。这就涉及到组件定位的机制。

**Qt 提供了两种组件定位机制：绝对定位和布局定位。**

-   绝对定位就是一种最原始的定位方法：给出这个组件的坐标和长宽值。

> 这样，Qt 就知道该把组件放在哪里以及如何设置组件的大小。但是这样做带来的一个问题是，如果用户改变了窗口大小，比如点击最大化按钮或者使用鼠标拖动窗口边缘，采用绝对定位的组件是不会有任何响应的。这也很自然，因为你并没有告诉 Qt，在窗口变化时，组件是否要更新自己以及如何更新。或者，还有更简单的方法：禁止用户改变窗口大小。但这总不是长远之计。

-   布局定位：你只要把组件放入某一种布局，布局由专门的布局管理器进行管理。当需要调整大小或者位置的时候，Qt 使用对应的布局管理器进行调整。

布局定位完美的解决了使用绝对定位的缺陷。

Qt 提供的布局中以下三种是我们最常用的：

-   QHBoxLayout：按照水平方向从左到右布局；

-   QVBoxLayout：按照竖直方向从上到下布局；

-   QGridLayout：在一个网格中进行布局，类似于 HTML 的 table；

## 系统提供的布局控件

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps61.jpg)

这4个为系统给我们提供的布局的控件，但是使用起来不是非常的灵活，这里就不详细介绍了。

## 利用widget做布局

第二种布局方式是利用控件里的widget来做布局，在Containers中

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps78.jpg)

在widget中的控件可以进行水平、垂直、栅格布局等操作，比较灵活。

再布局的同时我们需要灵活运用**弹簧**的特性让我们的布局更加的美观，下面是一个登陆窗口，利用widget可以搭建出如下登陆界面：

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps101.jpg)

# 常用控件

Qt为我们应用程序界面开发提供的一系列的控件，下面我们介绍两种最常用一些控件，所有控件的使用方法我们都可以通过帮助文档获取。

## QLabel控件使用

QLabel是我们最常用的控件之一，其功能很强大，我们可以用来显示文本，图片和动画等。

### 显示文字 （普通文本、html）

通过QLabel类的setText函数设置显示的内容:

```cpp
void setText(const QString &)
```

-   可以显示普通文本字符串

```cpp
QLable *label = new QLable;
//设置字体
QFont font;
font.setFamily("华文新魏");
font.setPointSize(20);
label->setFont(font);
label->setText("Hello, World!");
//设置位置和大小
label->setGrometry(0,0,100,100);
//移动到什么位置
label->move(60,60);
```

-   可以显示HTML格式的字符串

> 比如显示一个链接:

```cpp
QLabel * label = new QLabel(this);
label ->setText("Hello, World");
label ->setText("<h1><a href=\"https://www.baidu.com\">百度一下</a></h1>");
label ->setOpenExternalLinks(true);
```

> 其中setOpenExternalLinks()函数是用来设置用户点击链接之后是否自动打开链接，如果参数指定为true则会自动打开。

### 显示图片

可以使用QLabel的成员函数setPixmap设置图片

```cpp
void setPixmap(const QPixmap &)
```

首先定义QPixmap对象

```cpp
QPixmap pixmap;
```

然后加载图片

```cpp
pixmap.load(":/Image/boat.jpg");
```

最后将图片设置到QLabel中

```cpp
QLabel *label = new QLabel;
label.setPixmap(pixmap);
```

### 显示动画

可以使用QLabel 的成员函数setMovie加载动画，可以播放gif格式的文件

```cpp
void setMovie(QMovie * movie)
```

首先定义QMovied对象，并初始化:

```cpp
QMovie *movie = new QMovie(":/Mario.gif");
```

播放加载的动画：

```cpp
movie->start();
```

将动画设置到QLabel中：

```cpp
QLabel *label = new QLabel；
label->setMovie(movie);
```

## QLineEdit

Qt提供的单行文本编辑框。

#### 设置/获取内容

- 获取编辑框内容使用text（），函数声明如下：

  ```cpp
  QString text() const
  ```

- 设置编辑框内容

  ```cpp
  void setText(const QString &)
  ```

#### 设置显示模式

使用QLineEdit类的setEchoMode () 函数设置文本的显示模式,函数声明:

```cpp
void setEchoMode(EchoMode mode)
```

EchoMode是一个枚举类型,一共定义了四种显示模式:

-   QLineEdit::Normal 模式显示方式，按照输入的内容显示。

-   QLineEdit::NoEcho 不显示任何内容，此模式下无法看到用户的输入。

-   QLineEdit::Password 密码模式，输入的字符会根据平台转换为特殊字符。

-   QLineEdit::PasswordEchoOnEdit 编辑时显示字符否则显示字符作为密码。

另外，我们再使用QLineEdit显示文本的时候，希望在左侧留出一段空白的区域，那么，就可以使用QLineEdit给我们提供的setTextMargins函数：

```cpp
void setTextMargins(int left, int top, int right, int bottom)
```

用此函数可以指定显示的文本与输入框上下左右边界的间隔的像素数。

## QToolButton

功能：工具按钮，常用于显示图片

- toolButtonStyle设置显示图片和文件的模式
- autoRaise设置透明凸起效果

## QRadioButton

功能：单选按钮

- setChecked（true）设置默认选中

用Group Box区分单选区间

## QCheckBox

功能：复选按钮

信号：stateChanged（int）

参数int类型：

1. 0---未选中
2. 1---半选中
3. 2---选中

## QListWidget

功能：列表控件，按列表显示东西

```cpp
//创建项：
QListWidgetItem* item=new QListWidgetItem("锄禾日当午");
//将项加载到列表控件中
ui->listWidget->additem(item);
//设置对齐方式
item->setTextAlignment(QT::AlignHCenter);
//可以一次性放入所有内容
QStringList list;//QStringList等同于QList<QString>
list<<"锄禾日当午"<<"汗滴禾下土"<<"谁知盘中餐"<<"粒粒皆辛苦";
ui->listWidget->additems(list);
```

## QTreeWidget

功能：树控件，按树形显示东西

```cpp
//设置头
ui->treeWidget->setHeaderLabels(QStringList()<<"英雄"<<"英雄简介");
//创建根项目liItem
QTreeWidgetItem* liItem=new QTreeWidgetItem(QStringList()<<"力量");
//将根项目添加到树控件中
ui->treeWidget->addTopLevelItem(liItem);
//挂载子项目到根项目liItem中
QTreeWidgetItem* i1=new QTreeWidgetItem(QStringList()<<"张飞"<<"力大无比");
liItem->addChild(i1);
//treeWidget中通过treeWidget的itemWidget来访问嵌套在treeWidget中的控件
```

## QTableWidget

功能：表格控件,按表格显示东西

```cpp
//设置列数
ui->tableWidget->setColumnCount(3);
//设置水平表头
ui->tableWidget->setHorizontaliHeaderLabels(QStringList()<<"姓名"<<"性别"<<"年龄");
//设置行数
ui->tableWidget->setRowCount(5);
//设置正文
ui->tableWidget->setItem(行,列,new QTableWidgetItem("字符串"));

this->setSelectionBehavior(QAbstractItemView::SelectRows);//设置表格选中单个单元格的方式
    this->setEditTriggers(QAbstractItemView::DoubleClicked);//双击修改
    this->setSelectionMode(QAbstractItemView::SingleSelection);//单个选中和多个选中的设置
    this->verticalHeader()->setVisible(false); //隐藏列表头
    QFont font =this->horizontalHeader()->font(); //先获取字体
    font.setBold(true); //字体设置为粗体
    this->horizontalHeader()->setFont(font); //设置每一列的标题字体为粗体
    this->setAlternatingRowColors(true); // 隔行变色
    this->setPalette(QPalette(Qt::gray)); // 设置隔行变色的颜色  gray灰色
    this->setFont(QFont("song", 16));//设置字体大小
    this->setSortingEnabled(true);
    this->setFocusPolicy(Qt::NoFocus);//设置初始无焦点，防止一开始焦点为第一行导致按删除直接删除第一行

ui->tableWidget_bankInfo->resizeColumnsToContents();
            ui->tableWidget_bankInfo->resizeRowsToContents();
            ui->tableWidget_bankInfo->horizontalHeader()->setStretchLastSection(false);//必须一关一开才能实现实时变化
            ui->tableWidget_bankInfo->horizontalHeader()->setStretchLastSection(true);
```

## 其他控件

栈控件QStackedWidget

```cpp
ui->stackedWidget->setCurrentIndex(0);//切换栈显示内容
```

下拉框QComboBox

```cpp
ui->comboBox->addItem("奔驰");
//设置选中
ui->comboBox->SetCurrentIndex(2);
ui->comboBox->SetCurrentText("拖拉机");
//可以设置绑定值
ui->comboBox_excelMode->addItem("微软office",10000);
ui->comboBox_excelMode->addItem("WPS",10001);
//读取当前选中绑定值
qDebug()<<(ui->comboBox_excelMode->itemData(ui->comboBox_excelMode->currentIndex(),Qt::UserRole)).toInt();
```

还有许多Qt中控件的使用方法可参考Qt提供的帮助文档。

## 自定义控件

在搭建Qt窗口界面的时候，在一个项目中很多窗口，或者是窗口中的某个模块会被经常性的重复使用。一般遇到这种情况我们都会将这个窗口或者模块拿出来做成一个独立的窗口类，以备以后重复使用。

在使用Qt的ui文件搭建界面的时候，工具栏栏中只为我们提供了标准的窗口控件，如果我们想使用自定义控件怎么办？

**右键项目--添加新文件---选择Qt中的Qt设计师界面类，在ui文件中设计自定义控件**

也可以用代码的形式如下：

例如：我们从QWidget派生出一个类SmallWidget，实现了一个自定窗口，

```cpp
// smallwidget.h
class SmallWidget : public QWidget
{
	Q_OBJECT
public:
	explicit SmallWidget(QWidget *parent = 0);
signals:
public slots:
private:
	QSpinBox* spin;
	QSlider* slider;
};
// smallwidget.cpp
SmallWidget::SmallWidget(QWidget *parent) : QWidget(parent)
{
	spin = new QSpinBox(this);
	slider = new QSlider(Qt::Horizontal, this);
	// 创建布局对象
	QHBoxLayout* layout = new QHBoxLayout;
	// 将控件添加到布局中
	layout->addWidget(spin);
	layout->addWidget(slider);
	// 将布局设置到窗口中
	setLayout(layout);
	// 添加消息响应
	connect(spin,static_cast<void (QSpinBox::*)(int)>(&QSpinBox::valueChanged),slider, &QSlider::setValue);//因为有重载版本所以要强转为对应重载版本的指针
	connect(slider, &QSlider::valueChanged,spin, &QSpinBox::setValue);
}
```

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps44.jpg)

那么这个SmallWidget可以作为独立的窗口显示,也可以作为一个控件来使用：

打开Qt的.ui文件,因为SmallWidget是派生自Qwidget类,所以需要在ui文件中先放入一个QWidget控件, 然后再上边鼠标右键

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps23.jpg)

弹出提升窗口部件对话框

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps66.jpg)

添加要提升的类的名字,然后选择 添加

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps85.jpg)

添加之后,类名会显示到上边的列表框中,然后单击提升按钮,完成操作.

我们可以看到, 这个窗口对应的类从原来的QWidget变成了SmallWidget

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps106.jpg)

再次运行程序,这个widget_3中就能显示出我们自定义的窗口了.

# Qt消息机制和事件

## 事件（内含定时器）

事件（event）是由系统或者 Qt 本身在不同的时刻发出的。当用户按下鼠标、敲下键盘，或者是窗口需要重新绘制的时候，都会发出一个相应的事件。一些事件在对用户操作做出响应时发出，如键盘事件等；另一些事件则是由系统自动发出，如计时器事件。

在前面我们也曾经简单提到，**Qt 程序**需要在main()函数创建一个QApplication对象，然后调用它的exec()函数。这个函数就是开始 Qt 的事件循环。在执行exec()函数之后，程序将进入事件循环来监听应用程序的事件。当事件发生时，Qt 将创建一个事件对象。**Qt 中所有事件类都继承于QEvent**。在事件对象创建完毕后，Qt 将这个事件对象传递给QObject的event()函数。**event()函数并不直接处理事件，而是按照事件对象的类型分派给特定的事件处理函数**（event handler），关于这一点，会在后边详细说明。

### 9.1.1 部分鼠标事件

在所有组件的父类QWidget中，定义了很多事件处理的回调函数，如

-   keyPressEvent()
-   keyReleaseEvent()
-   EnterEvent()
-   LeaveEvent()
-   mouseDoubleClickEvent()
-   mouseMoveEvent()
-   mousePressEvent()
-   mouseReleaseEvent() 等。

这些函数都是 protected virtual 的，也就是说，我们可以在子类中重新实现这些函数。下面来看一个例子：

```cpp
class EventLabel : public QLabel
{
protected:
	void mouseMoveEvent(QMouseEvent *event);
	void mousePressEvent(QMouseEvent *event);
	void mouseReleaseEvent(QMouseEvent *event);
};
void EventLabel::mouseMoveEvent(QMouseEvent *event)
{
    //获取鼠标xy坐标，使用QMouseEvent对象的x()和y()函数
	this->setText(QString("<center><h1>Move: (%1, %2)</h1></center>").arg(QString::number(event->x()),QString::number(event->y())));
}
void EventLabel::mousePressEvent(QMouseEvent *event)
{
	this->setText(QString("<center><h1\>Press:(%1, %2)</h1></center>").arg(QString::number(event->x()),QString::number(event->y())));
}
void EventLabel::mouseReleaseEvent(QMouseEvent *event)
{
	QString msg;
	msg.sprintf("<center><h1>Release: (%d, %d)</h1></center>",
	event->x(), event->y());
	this->setText(msg);
}
int main(int argc, char *argv[])
{
	QApplication a(argc, argv);
	EventLabel *label = new EventLabel;
	label->setWindowTitle("MouseEvent Demo");
	label->resize(300, 200);
	label->show();
	return a.exec();
}
```

-   EventLabel继承了QLabel，覆盖了mousePressEvent()、mouseMoveEvent()和MouseReleaseEvent()三个函数。我们并没有添加什么功能，只是在鼠标按下（press）、鼠标移动（move）和鼠标释放（release）的时候，把当前鼠标的坐标值显示在这个Label上面。由于QLabel是支持 HTML 代码的，因此我们直接使用了 HTML 代码来格式化文字。

-   QString的arg()函数可以自动替换掉QString中出现的占位符。其占位符以 % 开始，后面是占位符的位置，例如 %1，%2 这种。

```cpp
QString("[%1, %2]").arg(x).arg(y);
```

语句将会使用x替换 %1，y替换 %2，因此，生成的QString为[x, y\]。

-   在mouseReleaseEvent()函数中，我们使用了另外一种QString的构造方法。我们使用类似 C 风格的格式化函数sprintf()来构造QString。

运行上面的代码，当我们点击了一下鼠标之后，label 上将显示鼠标当前坐标值。

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/wps130.jpg)

为什么要点击鼠标之后才能在mouseMoveEvent()函数中显示鼠标坐标值？

**这是因为QWidget中有一个mouseTracking属性，该属性用于设置是否追踪鼠标。只有鼠标被追踪时，mouseMoveEvent()才会发出。如果mouseTracking是 false（默认即是），组件在至少一次鼠标点击之后，才能够被追踪，也就是能够发出mouseMoveEvent()事件。如果mouseTracking为 true，则mouseMoveEvent()直接可以被发出。**

知道了这一点，我们就可以在main()函数中添加如下代码：

```cpp
label->setMouseTracking(true);
```

在运行程序就没有这个问题了。

### 9.1.2 定时器

定时器使用方法主要有两种

1. 定时器事件 void timerEvent(QTimerEvent *e)

   启动定时器 id1=startTimer(毫秒)

   判断具体定时器标志 e->timerId()==id1

   ```cpp
   id1=startTimer(1000);
   id2=startTimer(2000);
   
   //定时器事件
   void Widget::timerEvent(QTimerEvent *e)
   {
       if(e->timerId()==id1)
       {
           //每隔1秒让label_1数字++
           static int num=1;
           ui->label_1->setText(QString::number(num++));
   	}
        if(e->timerId()==id2)
       {
           //每隔2秒让label_2数字++
           static int num2=1;
           ui->label_2->setText(QString::number(num2++));
   	}
   }
   ```

2.  通过定时器类实现  QTimer类

   创建定时器对象 Qtimer* timer1=new QTimer(this);

   开启定时器  timer1->start(x毫秒)  每隔x毫秒会抛出一个timeout信号出来

   connect连接信号处理逻辑

   暂停定时器 timer1->stop（）

   ```cpp
   //创建定时器对象
   QTimer* timer1=new QTimer(this);
   timer1->start(500);
   connect(timer1,&QTimer::timeout,[=](){
      ui->label_1->setText(QString::number(num++)); 
   });
   ```

只触发一次的定时器

```cpp
QTimer::singleShot(500,this,[=](){//this表示谁来执行
   //定时器500毫秒后只发送一次该信号，这里填入要做什么
});
```

## event（）事件分发器

![事件分发器和事件过滤器](https://cdn.jsdelivr.net/gh/che77a38/blogImage/%E4%BA%8B%E4%BB%B6%E5%88%86%E5%8F%91%E5%99%A8%E5%92%8C%E4%BA%8B%E4%BB%B6%E8%BF%87%E6%BB%A4%E5%99%A8.png)

事件对象创建完毕后，Qt 将这个事件对象传递给QObject的event()函数。event()函数并不直接处理事件，而是将这些事件对象按照它们不同的类型，分发给不同的事件处理器（event handler）。

如上所述，**event()函数主要用于事件的分发**。所以，如果你希望在事件分发之前做一些操作，就可以重写这个event()函数了。例如，我们希望在一个QWidget组件中监听 tab 键的按下，那么就可以继承QWidget，并重写它的event()函数，来达到这个目的：

```cpp
bool CustomWidget::event(QEvent *e)
{
	if (e->type() == QEvent::KeyPress) {
		QKeyEvent *keyEvent = static_cast<QKeyEvent *>(e);
		if (keyEvent->key() == Qt::Key_Tab) {
			qDebug() << "You press tab.";
			return true;
		}
	}
	return QWidget::event(e);
}
```

CustomWidget是一个普通的QWidget子类。我们重写了它的event()函数，这个函数有一个QEvent对象作为参数，也就是需要转发的事件对象。函数返回值是 bool 类型。

-   **如果传入的事件已被识别并且处理，则需要返回 true，否则返回 false。如果返回值是 true，那么 Qt 会认为这个事件已经处理完毕，不会再将这个事件发送给其它对象，而是会继续处理事件队列中的下一事件。**

-   **在event()函数中，调用事件对象的accept()和ignore()函数是没有作用的，不会影响到事件的传播**。

我们可以通过使用QEvent::type()函数可以检查事件的实际类型，其返回值是QEvent::Type类型的枚举。我们处理过自己感兴趣的事件之后，可以直接返回 true，表示我们已经对此事件进行了处理；对于其它我们不关心的事件，则需要调用父类的event()函数继续转发，否则这个组件就只能处理我们定义的事件了。为了测试这一种情况，我们可以尝试下面的代码：

```cpp
bool CustomTextEdit::event(QEvent *e)
{
	if (e->type() == QEvent::KeyPress)
	{
		QKeyEvent *keyEvent = static_cast<QKeyEvent *>(e);
		if (keyEvent->key() == Qt::Key_Tab)
		{
			qDebug() << "You press tab.";
			return true;
		}
	}
	return false;
}
```

CustomTextEdit是QTextEdit的一个子类。我们重写了其event()函数，却没有调用父类的同名函数。这样，我们的组件就只能处理 Tab 键，再也无法输入任何文本，也不能响应其它事件，比如鼠标点击之后也不会有光标出现。这是因为我们只处理的KeyPress类型的事件，并且如果不是KeyPress事件，则直接返回 false，鼠标事件根本不会被转发，也就没有了鼠标事件。

通过查看QObject::event()的实现，我们可以理解，event()函数同前面的章节中我们所说的事件处理器有什么联系：

```cpp
//!!! Qt5
bool QObject::event(QEvent *e)
{
	switch (e->type()) {
		case QEvent::Timer:
			timerEvent((QTimerEvent*)e);
		break;
		case QEvent::ChildAdded:
		case QEvent::ChildPolished:
		case QEvent::ChildRemoved:
			childEvent((QChildEvent*)e);
		break;
		// ...
		default:
			if (e->type() >= QEvent::User) {
				customEvent(e);
				break;
			}
		return false;
	}
	return true;
}
```

这是 Qt 5 中QObject::event()函数的源代码（Qt 4 的版本也是类似的）。我们可以看到，同前面我们所说的一样，Qt 也是使用QEvent::type()判断事件类型，然后调用了特定的事件处理器。比如，如果event->type()返回值是QEvent::Timer，则调用timerEvent()函数。可以想象，QWidget::event()中一定会有如下的代码：

```cpp
switch (event->type()) {
	case QEvent::MouseMove:
		mouseMoveEvent((QMouseEvent*)event);
	break;
	// ...
}
```

事实也的确如此。timerEvent()和mouseMoveEvent()这样的函数，就是我们前面章节所说的事件处理器 event handler。也就是说，**event()函数中实际是通过事件处理器来响应一个具体的事件。这相当于event()函数将具体事件的处理"委托"给具体的事件处理器。而这些事件处理器是 protected virtual 的，因此，我们重写了某一个事件处理器，即可让 Qt 调用我们自己实现的版本。**

由此可以见，event()是一个集中处理不同类型的事件的地方。如果你不想重写一大堆事件处理器，就可以重写这个event()函数，通过QEvent::type()判断不同的事件。鉴于重写event()函数需要十分小心注意父类的同名函数的调用，一不留神就可能出现问题，所以**一般还是建议只重写事件处理器**（当然，也必须记得是不是应该调用父类的同名处理器）。这其实暗示了event()函数的另外一个作用：屏蔽掉某些不需要的事件处理器。正如我们前面的CustomTextEdit例子看到的那样，我们创建了一个只能响应 tab 键的组件。这种作用是重写事件处理器所不能实现的。

## 事件过滤器

![事件分发器和事件过滤器](https://cdn.jsdelivr.net/gh/che77a38/blogImage/事件分发器和事件过滤器.png)

有时候，对象需要查看、甚至要拦截发送到另外对象的事件。例如，对话框可能想要拦截按键事件，不让别的组件接收到；或者要修改回车键的默认处理。

通过前面的章节，我们已经知道，Qt 创建了QEvent事件对象之后，会调用QObject的event()函数处理事件的分发。显然，我们可以在event()函数中实现拦截的操作。由于event()函数是 protected 的，因此，需要继承已有类。如果组件很多，就需要重写很多个event()函数。这当然相当麻烦，更不用说重写event()函数还得小心一堆问题。好在 Qt 提供了另外一种机制来达到这一目的：事件过滤器。

QObject有一个eventFilter()函数，用于建立事件过滤器。函数原型如下：

```cpp
virtual bool QObject::eventFilter ( QObject * watched, QEvent * event );
```

这个函数正如其名字显示的那样，是一个"事件过滤器"。所谓事件过滤器，可以理解成一种过滤代码。事件过滤器会检查接收到的事件。如果这个事件是我们感兴趣的类型，就进行我们自己的处理；如果不是，就继续转发。这个函数返回一个 bool 类型，如果你想将参数 event 过滤出来，比如，**不想让它继续转发，就返回 true，否则返回 false。**事件过滤器的调用时间是目标对象（也就是参数里面的watched对象）接收到事件对象之前。也就是说，如果你在事件过滤器中停止了某个事件，那么，watched对象以及以后所有的事件过滤器根本不会知道这么一个事件。

我们来看一段简单的代码：

```cpp
class MainWindow : public QMainWindow
{
public:
	MainWindow();
protected:
	bool eventFilter(QObject *obj, QEvent *event);
private:
	QTextEdit *textEdit;
};
MainWindow::MainWindow()
{
	textEdit = new QTextEdit;
	setCentralWidget(textEdit);
	textEdit->installEventFilter(this);
}
bool MainWindow::eventFilter(QObject *obj, QEvent *event)
{
	if (obj == textEdit) {//区分哪个控件
		if (event->type() == QEvent::KeyPress) {//区分事件
			QKeyEvent *keyEvent = static_cast<QKeyEvent *>(event);
			qDebug() << "Ate key press" << keyEvent->key();
			return true;
		} else {
			return false;
		}
	} else {
		// pass the event on to the parent class
		return QMainWindow::eventFilter(obj, event);
	}
}
```

-   MainWindow是我们定义的一个类。我们重写了它的eventFilter()函数。为了过滤特定组件上的事件，首先需要判断这个对象是不是我们感兴趣的组件，然后判断这个事件的类型。在上面的代码中，我们不想让textEdit组件处理键盘按下的事件。所以，首先我们找到这个组件，如果这个事件是键盘事件，则直接返回 true，也就是过滤掉了这个事件，其他事件还是要继续处理，所以返回 false。对于其它的组件，我们并不保证是不是还有过滤器，于是最保险的办法是调用父类的函数。

-   eventFilter()函数相当于创建了过滤器，然后我们需要安装这个过滤器。安装过滤器需要调用QObject::installEventFilter()函数。函数的原型如下：

```cpp
void QObject::installEventFilter ( QObject * filterObj )
```

这个函数接受一个QObject *类型的参数。记得刚刚我们说的，eventFilter()函数是QObject的一个成员函数，因此，任意QObject都可以作为事件过滤器（问题在于，如果你没有重写eventFilter()函数，这个事件过滤器是没有任何作用的，因为默认什么都不会过滤）。已经存在的过滤器则可以通过QObject::removeEventFilter()函数移除。

-   我们可以向一个对象上面安装多个事件处理器，只要调用多次installEventFilter()函数。如果一个对象存在多个事件过滤器，那么，**最后一个安装的会第一个执行，也就是后进先执行**的顺序。

还记得我们前面的那个例子吗？我们使用event()函数处理了 Tab 键：

```cpp
bool CustomWidget::event(QEvent *e)
{
	if (e->type() == QEvent::KeyPress) {
		QKeyEvent *keyEvent = static_cast<QKeyEvent *>(e);
		if (keyEvent->key() == Qt::Key_Tab) {
			qDebug() << "You press tab.";
			return true;
		}
	}
		return QWidget::event(e);
}
```

现在，我们可以给出一个使用事件过滤器的版本：

```cpp
bool FilterObject::eventFilter(QObject *object, QEvent *event)
{
	if (object == target && event->type() == QEvent::KeyPress)
	{
		QKeyEvent *keyEvent = static_cast<QKeyEvent *>(event);
		if (keyEvent->key() == Qt::Key_Tab) {
			qDebug() << "You press tab.";
			return true;
		} else {
			return false;
		}
	}
	return false;
}
```

事件过滤器的强大之处在于，我们可以为整个应用程序添加一个事件过滤器。记得，installEventFilter()函数是QObject的函数，QApplication或者QCoreApplication对象都是QObject的子类，因此，我们可以向QApplication或者QCoreApplication添加事件过滤器。**这种全局的事件过滤器将会在所有其它特性对象的事件过滤器之前调用。尽管很强大，但这种行为会严重降低整个应用程序的事件分发效率。**因此，除非是不得不使用的情况，否则的话我们不应该这么做。

**注意，**

**事件过滤器和被安装过滤器的组件必须在同一线程，否则，过滤器将不起作用。另外，如果在安装过滤器之后，这两个组件到了不同的线程，那么，只有等到二者重新回到同一线程的时候过滤器才会有效。**

## 总结

Qt 的事件是整个 Qt 框架的核心机制之一，也比较复杂。说它复杂，更多是因为它涉及到的函数众多，而处理方法也很多，有时候让人难以选择。现在我们简单总结一下 Qt 中的事件机制。

Qt 中有很多种事件：鼠标事件、键盘事件、大小改变的事件、位置移动的事件等等。如何处理这些事件，实际有两种选择：

-   所有事件对应一个事件处理函数，在这个事件处理函数中用一个很大的分支语句进行选择，其代表作就是 win32 API 的WndProc()函数：

```cpp
LRESULT CALLBACK WndProc(HWND hWnd,
                         UINT message,
                         WPARAM wParam,
                         LPARAM lParam)
```

在这个函数中，我们需要使用switch语句，选择message参数的类型进行处理，典型代码是：

```cpp
switch(message)
{
case WM_PAINT:
	// ...
	break;
case WM_DESTROY:
	// ...
	break;
	//...
}
```

-   每一种事件对应一个事件处理函数。Qt 就是使用的这么一种机制：

    -   mouseEvent()

    -   keyPressEvent()

    -   ...

Qt 具有这么多种事件处理函数，肯定有一个地方对其进行分发，否则，Qt 怎么知道哪一种事件调用哪一个事件处理函数呢？**这个分发的函数，就是event()**。显然，当QMouseEvent产生之后，event()函数将其分发给mouseEvent()事件处理器进行处理。

event()函数会有两个问题：

-   event()函数是一个 protected 的函数，这意味着我们要想重写event()，必须继承一个已有的类。试想，**我的程序根本不想要鼠标事件，程序中所有组件都不允许处理鼠标事件，是不是我得继承所有组件**，一一重写其event()函数？protected 函数带来的另外一个问题是，如果我基于第三方库进行开发，而对方**没有提供源代码，只有一个链接库，其它都是封装好的。我怎么去继承这种库中的组件呢？**

-   event()函数的确有一定的控制，不过有时候我的需求更严格一些：我**希望那些组件根本看不到这种事件**。event()函数虽然可以拦截，但其实也是接收到了QMouseEvent对象。我连让它收都收不到。这样做的好处是，模拟一种系统根本没有那个事件的效果，所以其它组件根本不会收到这个事件，也就无需修改自己的事件处理函数。这种需求怎么办呢？

这两个问题是event()函数无法处理的。于是，Qt 提供了另外一种解决方案：事件过滤器。事件过滤器给我们一种能力，让我们能够完全移除某种事件。**事件过滤器可以安装到任意QObject类型上面，并且可以安装多个**。如果要实现全局的事件过滤器，则可以安装到QApplication或者QCoreApplication上面。这里需要注意的是，如果使用installEventFilter()函数给一个对象安装事件过滤器，那么该事件过滤器只对该对象有效，只有这个对象的事件需要先传递给事件过滤器的eventFilter()函数进行过滤，其它对象不受影响。如果给QApplication对象安装事件过滤器，那么该过滤器对程序中的每一个对象都有效，任何对象的事件都是先传给eventFilter()函数。

**事件过滤器可以解决刚刚我们提出的event()函数的两点不足：**

-   **首先，事件过滤器不是 protected 的，因此我们可以向任何QObject子类安装事件过滤器；**

-   **其次，事件过滤器在目标对象接收到事件之前进行处理，如果我们将事件过滤掉，目标对象根本不会见到这个事件。**

事实上，还有一种方法，我们没有介绍。Qt 事件的调用最终都会追溯到QCoreApplication::notify()函数，因此，最大的控制权实际上是重写QCoreApplication::notify()。这个函数的声明是：

```cpp
virtual bool QCoreApplication::notify ( QObject * receiver,QEvent * event );
```

该函数会将event发送给receiver，也就是调用receiver->event(event)，其返回值就是来自receiver的事件处理器。注意，这个函数为任意线程的任意对象的任意事件调用，因此，它不存在事件过滤器的线程的问题。不过我们并不推荐这么做，因为notify()函数只有一个，而事件过滤器要灵活得多。

**现在我们可以总结一下 Qt 的事件处理，实际上是有五个层次：**

-   重写paintEvent()、mousePressEvent()等事件处理函数。这是最普通、最简单的形式，同时功能也最简单。

-   重写event()函数。event()函数是所有对象的事件入口，QObject和QWidget中的实现，默认是把事件传递给特定的事件处理函数。

-   在特定对象上面安装事件过滤器。该过滤器仅过滤该对象接收到的事件。

-   在QCoreApplication::instance()上面安装事件过滤器。该过滤器将过滤所有对象的所有事件，因此和notify()函数一样强大，但是它更灵活，因为可以安装多个过滤器。全局的事件过滤器可以看到 disabled 组件上面发出的鼠标事件。全局过滤器有一个问题：只能用在主线程。

-   重写QCoreApplication::notify()函数。这是最强大的，和全局事件过滤器一样提供完全控制，并且不受线程的限制。但是全局范围内只能有一个被使用（因为QCoreApplication是单例的）。

## **自定义事件**

事件的分发既可以是同步的，又可以是异步的，而信号槽的回调总是同步的。并且事件可以使用过滤器

### **自定义事件的类型**

QT自定义事件需要继承QEvent。QEvent提供一个QEvent::Type类型的参数，作为自定义事件的类型值。

QEvent::Type是QEvent定义的一个枚举。需要注意的是自定义事件类型不能和已经存在的type值重复，否则会有不可预料的错误发生，因为系统会将新增加的自定义事件当做系统事件进行派发和调用。QT中，系统保留0 – 999的值，自定义事件的type要大于 999。QT定义了两个边界值：QEvent::User和QEvent::MaxUser，自定义事件的type应该在两个值的范围之间。其中，QEvent::User的值是1000，QEvent::MaxUser的值是65535。通过这两个枚举值，可以保证自定义的事件类型不会覆盖系统定义的事件类型。但并不能保证自定义事件相互之间不会被覆盖。为了避免自定义事件间的相互覆盖，QT提供了一个函数：registerEventType()，用于自定义事件的注册。

```cpp
static int QEvent::registerEventType ( int hint = -1 );
```

registerEventType函数是static的，可以使用QEvent类直接调用。函数返回值是向系统注册的新的Type类型的值。如果hint是合法的，即hint不会发生任何覆盖（系统的以及其它自定义事件的），则会直接返回这个值；否则，系统会自动分配一个合法值并返回。使用registerEventType函数即可完成type 值的指定。registerEventType函数是线程安全的，不必另外添加同步。

### **事件的发送方式**

可以在自定义事件中添加所需要的数据，然后进行事件的发送。

QT提供了两种事件发送方式：

A、非阻塞式发送

```cpp
static bool QCoreApplication::sendEvent(QObject *receiver,QEvent *event);
```

直接将event事件发送给receiver接收者，使用的是QCoreApplication::notify()函数。函数返回值就是事件处理函数的返回值。在事件被发送的时候，event对象并不会被销毁。通常会在栈上创建event对象，例如：

```cpp
QMouseEvent event(QEvent::MouseButtonPress, pos, 0, 0, 0);
QApplication::sendEvent(receiver, &event);
```

B、阻塞式发送

```cpp
static void QCoreApplication::postEvent(QObject *receiver,QEvent *event);
```

将event事件及其接收者receiver一同追加到事件队列中，函数立即返回。

**因为post事件队列会持有事件对象，并且在其post的时候将其delete掉，因此，必须在堆上创建event对象。当对象被发送之后，再试图访问event对象就会出现问题（因为post后，event对象就会被delete）。**

当控制权返回到主线程循环时，保存在事件队列中的所有事件都通过notify()函数发送出去。

事件会根据post的顺序进行处理。如果想要改变事件的处理顺序，可以考虑为其指定一个优先级。默认的优先级是Qt::NormalEventPriority。

postEvent函数是线程安全的。

```cpp
static void QCoreApplication::sendPostedEvents(QObject *receiver,int event_type);
```

sendPostedEvents函数的作用是将事件队列中的接收者为receiver，事件类似为event_type的所有事件立即发送给receiver进行处理。需要注意的是，来自窗口系统的事件并不由sendPostedEvents函数进行处理，而是processEvent()。

### 自定义事件处理函数

​    自定义事件的处理既可以定义一个自定义事件处理函数，也可以在event()函数中直接处理。

```cpp
void CustomWidget::customEvent(QEvent *event)
{
    CustomEvent *customEvent = static_cast<CustomEvent *>(event);
    // ...
}
 
bool CustomWidget::event(QEvent *event) 
{
    if (event->type() == CustomEventType) 
    {
        CustomEvent *myEvent = static_cast<CustomEvent *>(event);
        // processing...
        return true;
    }
    return QWidget::event(event);
}
```

# 绘图和绘图设备

## QPainter

Qt 的绘图系统允许使用相同的 API 在屏幕和其它打印设备上进行绘制。整个绘图系统基于QPainter，QPainterDevice和QPaintEngine三个类。

**QPainter**用来执行绘制的操作；**QPaintDevice**是一个二维空间的抽象，这个二维空间允许QPainter在其上面进行绘制，也就是QPainter工作的空间；**QPaintEngine**提供了画笔（QPainter）在不同的设备上进行绘制的统一的接口。QPaintEngine类应用于QPainter和QPaintDevice之间，通常对开发人员是透明的。除非你需要自定义一个设备，否则你是不需要关心QPaintEngine这个类的。我们可以把QPainter理解成画笔；把QPaintDevice理解成使用画笔的地方，比如纸张、屏幕等；而对于纸张、屏幕而言，肯定要使用不同的画笔绘制，为了统一使用一种画笔，我们设计了QPaintEngine类，这个类让不同的纸张、屏幕都能使用一种画笔。

下图给出了这三个类之间的层次结构:

![image-20210505145620325](https://cdn.jsdelivr.net/gh/che77a38/blogImage/image-20210505145620325.png)

上面的示意图告诉我们，**Qt 的绘图系统实际上是，使用QPainter在QPainterDevice上进行绘制，它们之间使用QPaintEngine进行通讯（也就是翻译QPainter的指令）。**

下面我们通过一个实例来介绍QPainter的使用：

```cpp
class PaintedWidget : public QWidget
{
	Q_OBJECT
public:
	PaintedWidget(QWidget *parent = 0);
protected:
	void paintEvent(QPaintEvent *);//绘图事件
}
```

注意我们重写了QWidget的paintEvent()函数。接下来就是PaintedWidget的源代码：

```cpp
PaintedWidget::PaintedWidget(QWidget *parent) :QWidget(parent)
{
	resize(800, 600);
	setWindowTitle(tr("Paint Demo\"));
}

void PaintedWidget::paintEvent(QPaintEvent *)
{
	QPainter painter(this);
	painter.drawLine(80, 100, 650, 500);
	painter.setPen(Qt::red);
	painter.drawRect(10, 10, 100, 400);
	painter.setPen(QPen(Qt::green, 5));
	painter.setBrush(Qt::blue);
	painter.drawEllipse(50, 150, 400, 200);
}
```

在构造函数中，我们仅仅设置了窗口的大小和标题。而paintEvent()函数则是绘制的代码。首先，我们在栈上创建了一个QPainter对象，也就是说，每次运行paintEvent()函数的时候，都会重建这个QPainter对象。注意，**这一点可能会引发某些细节问题**：由于我们每次重建QPainter，因此第一次运行时所设置的画笔颜色、状态等，第二次再进入这个函数时就会全部丢失。有时候我们希望保存画笔状态，就必须自己保存数据，否则的话则需要将QPainter作为类的成员变量。

QPainter接收一个QPaintDevice指针作为参数。QPaintDevice有很多子类，比如QImage，以及QWidget。注意回忆一下，QPaintDevice可以理解成要在哪里去绘制，而现在我们希望画在这个组件，因此传入的是 this 指针。

QPainter有很多以 draw 开头的函数，用于各种图形的绘制，比如这里的drawLine()，drawRect()以及drawEllipse()等。当绘制轮廓线时，使用QPainter的pen()属性。比如，我们调用了painter.setPen(Qt::red)将 pen 设置为红色，则下面绘制的矩形具有红色的轮廓线。接下来，我们将 pen 修改为绿色，5 像素宽（painter.setPen(QPen(Qt::green, 5))），又设置了画刷为蓝色。这时候再调用 draw 函数，则是具有绿色 5 像素宽轮廓线、蓝色填充的椭圆。

QPainter高级设置：

```cpp
//设置抗锯齿
painter.setRenderHint(QPainter::Antialiasing);
//移动QPaint起始点（本来默认是左上角）
painter.translate(100,0);
//保存QPaint起始点起始点位置
painter.save();
//取出QPaint起始点起始点位置、
painter.restore();
//手动调用绘图事件
update();
```

**Qt 中update()和repaint()的区别**

- **update()方法**

这种方法其实是将重绘的事件加入到Qt的事件列表中，不一定马上就会重绘得出你想要的效果。在同一时刻你要是多次调用update()，Qt会将它们自动合并为一个update()。这样的好处是不会产生闪烁。

- **repaint()方法**

这个方法是立即重绘！但是不建议经常使用，只需要在需要的特效区域调用即可。

## 绘图设备

**绘图设备是指继承QPainterDevice的子类。**Qt提供了很多这样的类，例如QPixmap、QBitmap、QImage和 QPicture。其中，

-   QPixmap专门为图像在屏幕上的显示做了优化

-   QBitmap是QPixmap的一个子类，它的色深限定为1，可以使用 QPixmap的isQBitmap()函数来确定这个QPixmap是不是一个QBitmap。

-   QImage专门为图像的像素级访问做了优化。

-   QPicture则可以记录和重现QPainter的各条命令。(此QPicture并非图片，而是类似记录和还原一个绘图流程)

### QPixmap、QBitmap、QImage

QPixmap继承了QPaintDevice，因此，你可以使用QPainter直接在上面绘制图形。QPixmap也可以接受一个字符串作为一个文件的路径来显示这个文件，比如你想在程序之中打开png、jpeg之类的文件，就可以使用 QPixmap。使用QPainter的drawPixmap()函数可以把这个文件绘制到一个QLabel、QPushButton或者其他的设备上面。**QPixmap是针对屏幕进行特殊优化的，因此，它与实际的底层显示设备息息相关。**注意，这里说的显示设备并不是硬件，而是操作系统提供的原生的绘图引擎。所以，在不同的操作系统平台下，QPixmap的显示可能会有所差别。

**QBitmap继承自QPixmap，因此具有QPixmap的所有特性，提供单色图像**。QBitmap的色深始终为1. 色深这个概念来自计算机图形学，是指用于表现颜色的二进制的位数。我们知道，计算机里面的数据都是使用二进制表示的。为了表示一种颜色，我们也会使用二进制。比如我们要表示8种颜色，需要用3个二进制位，这时我们就说色深是3. 因此，所谓色深为1，也就是使用1个二进制位表示颜色。1个位只有两种状态：0和1，因此它所表示的颜色就有两种，黑和白。所以说，**QBitmap实际上是只有黑白两色的图像数据。**

**由于QBitmap色深小，因此只占用很少的存储空间，所以适合做光标文件和笔刷。**

下面我们来看同一个图像文件在QPixmap和QBitmap下的不同表现：

```cpp
void PaintWidget::paintEvent(QPaintEvent *)
{
	QPixmap pixmap(":/Image/butterfly.png");
	QPixmap pixmap1(":/Image/butterfly1.png");
	QBitmap bitmap(":/Image/butterfly.png");
	QBitmap bitmap1(":/Image/butterfly1.png");
	QPainter painter(this);
	painter.drawPixmap(0, 0, pixmap);
	painter.drawPixmap(200, 0, pixmap1);
	painter.drawPixmap(0, 130, bitmap);
	painter.drawPixmap(200, 130, bitmap1);
}
```

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/clip_image001.png)

这里我们给出了两张png图片。butterfly1.png是没有透明色的纯白背景，而butterfly.png是具有透明色的背景。我们分别使用QPixmap和QBitmap来加载它们。注意看它们的区别：白色的背景在QBitmap中消失了，而透明色在QBitmap中转换成了黑色；其他颜色则是使用点的疏密程度来体现的。

QPixmap使用底层平台的绘制系统进行绘制，无法提供像素级别的操作，而**QImage则是使用独立于硬件的绘制系统，实际上是自己绘制自己，因此提供了像素级别的操作，并且能够在不同系统之上提供一个一致的显示形式。**

我们声明了一个QImage对象，大小是300 x 300，颜色模式是RGB32，即使用32位数值表示一个颜色的RGB值，也就是说每种颜色使用8位。然后我们对每个像素进行颜色赋值，从而构成了这个图像。我们可以把QImage想象成一个RGB颜色的二维数组，记录了每一像素的颜色。

```cpp
void PaintWidget::paintEvent(QPaintEvent *)
{
	QPainter painter(this);
	QImage image(300, 300, QImage::Format_RGB32);
	QRgb value;
	//将图片背景填充为白色
	image.fill(Qt::white);
	//改变指定区域的像素点的值
	for(int i=50; i<100; ++i)
	{
		for(int j=50; j<100; ++j)
		{
			value = qRgb(255, 0, 0); // 红色
			image.setPixel(i, j, value);
		}
	}
	//将图片绘制到窗口中
	painter.drawImage(QPoint(0, 0), image);
}
```

![image-20210505200953174](https://cdn.jsdelivr.net/gh/che77a38/blogImage/image-20210505200953174.png)

QImage与QPixmap的区别

-   QPixmap主要是用于绘图，**针对屏幕显示而最佳化设计**，QImage主要是为图像I/O、图片访问和像素修改而设计的

-   QPixmap依赖于所在的平台的绘图引擎，故例如反锯齿等一些效果在不同的平台上可能会有不同的显示效果，QImage使用Qt自身的绘图引擎，可在不同平台上具有相同的显示效果

-   由于QImage是独立于硬件的，也是一种QPaintDevice，因此我们可以在另一个线程中对其进行绘制，而不需要在GUI线程中处理，使用这一方式可以很**大幅度提高UI响应速度**。

-   QImage可通过setPixpel()和pixel()等方法直接存取指定的像素。

QImage与QPixmap之间的转换:

-   QImage转QPixmap

使用QPixmap的静态成员函数: fromImage()

```cpp
QPixmap fromImage(const QImage & image,Qt::ImageConversionFlags flags = Qt::AutoColor)
```

-   QPixmap转QImage:

使用QPixmap类的成员函数: toImage()

```cpp
QImage toImage() const
```

### QPicture

最后一个需要说明的是QPicture。**这是一个可以记录和重现QPainter命令的绘图设备。** **QPicture将QPainter的命令序列化到一个IO设备，保存为一个平台独立的文件格式。**这种格式有时候会是"元文件(meta- files)"。Qt的这种格式是二进制的，不同于某些本地的元文件，Qt的pictures文件没有内容上的限制，只要是能够被QPainter绘制的元素，不论是字体还是pixmap，或者是变换，都可以保存进一个picture中。

**QPicture是平台无关的**，因此它可以使用在多种设备之上，比如svg、pdf、ps、打印机或者屏幕。回忆下我们这里所说的QPaintDevice，实际上是说可以有QPainter绘制的对象。QPicture使用系统的分辨率，并且可以调整 QPainter来消除不同设备之间的显示差异。

如果我们要记录下QPainter的命令，首先要使用QPainter::begin()函数，将QPicture实例作为参数传递进去，以便告诉系统开始记录，记录完毕后使用QPainter::end()命令终止。代码示例如下：

```cpp
void PaintWidget::paintEvent(QPaintEvent *)
{
	QPicture pic;
	QPainter painter;
	//将图像绘制到QPicture中,并保存到文件
	painter.begin(&pic);
	painter.drawEllipse(20, 20, 100, 50);
	painter.fillRect(20, 100, 100, 100, Qt::red);
	painter.end();
	pic.save("D:\\drawing.pic");//后缀是什么都可以
	//将保存的绘图动作重新绘制到设备上
	pic.load("D:\\drawing.pic");
	painter.begin(this);
	painter.drawPicture(200, 200, pic);
	painter.end();
}
```

# 文件系统

文件操作是应用程序必不可少的部分。Qt 作为一个通用开发库，提供了跨平台的文件操作能力。Qt 通过QIODevice提供了对 I/O 设备的抽象，这些设备具有读写字节块的能力。下面是 I/O 设备的类图（Qt5）：

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage/clip_image002.png)

-   QIODevice：所有 I/O 设备类的父类，提供了字节块读写的通用操作以及基本接口；

-   QFileDevice：Qt5新增加的类，提供了有关文件操作的通用实现。

-   QFlie：访问本地文件或者嵌入资源；

-   QTemporaryFile：创建和访问本地文件系统的临时文件；

-   QBuffer：读写QbyteArray, 内存文件；

-   QProcess：运行外部程序，处理进程间通讯；

-   QAbstractSocket：所有套接字类的父类；

-   QTcpSocket：TCP协议网络数据传输；

-   QUdpSocket：传输 UDP 报文；

-   QSslSocket：使用 SSL/TLS 传输数据；

**文件系统分类:**

-   顺序访问设备:

> 是指它们的数据只能访问一遍：从头走到尾，从第一个字节开始访问，直到最后一个字节，中途不能返回去读取上一个字节，这其中，QProcess、QTcpSocket、QUdpSoctet和QSslSocket是顺序访问设备。

-   随机访问设备:

> 可以访问任意位置任意次数，还可以使用QIODevice::seek()函数来重新定位文件访问位置指针，QFile、QTemporaryFile和QBuffer是随机访问设备，

## 基本文件操作

文件操作是应用程序必不可少的部分。Qt 作为一个通用开发库，提供了跨平台的文件操作能力。在所有的 I/O 设备中，文件 I/O 是最重要的部分之一。因为我们大多数的程序依旧需要首先访问本地文件（当然，在云计算大行其道的将来，这一观点可能改变）。**QFile提供了从文件中读取和写入数据的能力。**

**我们通常会将文件路径作为参数传给QFile的构造函数。不过也可以在创建好对象最后，使用setFileName()来修改**。QFile需要使用 / 作为文件分隔符，不过，它会自动将其转换成操作系统所需要的形式。例如 C:/windows 这样的路径在 Windows 平台下同样是可以的。

QFile主要提供了有关文件的各种操作，比如打开文件、关闭文件、刷新文件等。**我们可以使用QDataStream或QTextStream类来读写文件，也可以使用QIODevice类提供的read()、readLine()、readAll()以及write()这样的函数。**值得注意的是，**有关文件本身的信息，比如文件名、文件所在目录的名字等，则是通过QFileInfo获取**，而不是自己分析文件路径字符串。

下面我们使用一段代码来看看QFile的有关操作：

```cpp
int main(int argc, char *argv[])
{
	QApplication app(argc, argv);
	QFile file("in.txt\");
	if (!file.open(QIODevice::ReadOnly | QIODevice::Text)) {
		qDebug() << "Open file failed.";
		return -1;
	} else {
        //下面可以直接用readAll取代循环readLine
		while (!file.atEnd()) {//判断文件是否读到末尾
			qDebug() << file.readLine();//读出来的类型是QByteArray类型
		}
	}
	QFileInfo info(file);
	qDebug() << info.isDir();
	qDebug() << info.isExecutable();
	qDebug() << info.baseName();
	qDebug() << info.completeBaseName();
	qDebug() << info.suffix();
	qDebug() << info.completeSuffix();
    file.close();//关闭文件对象
	return app.exec();
}
```

-   我们首先使用QFile创建了一个文件对象。

> 这个文件名字是 in.txt。如果你不知道应该把它放在哪里，可以使用QDir::currentPath()来获得应用程序执行时的当前路径。只要将这个文件放在与当前路径一致的目录下即可。

-   使用open()函数打开这个文件，打开形式是只读方式，文本格式。

> 这个类似于fopen()的 r 这样的参数。open()函数返回一个 bool 类型，如果打开失败，我们在控制台输出一段提示然后程序退出。否则，我们利用 while 循环，将每一行读到的内容输出。

-   可以使用QFileInfo info(文件路径)获取有关该文件的信息。

> QFileInfo有很多类型的函数，我们只举出一些例子。比如：

-   info.isDir()检查该文件是否是目录；
-   info.isExecutable() 检查该文件是否是可执行文件等。
-   info.baseName() 可以直接获得文件名；
-   info.completeBaseName() 获取完整的文件名
-   info.suffix() 则直接获取文件后缀名。
-   info.completeSuffix() 获取完整的文件后缀
-   info.size()文件大小
-   info.filename()文件名
-   info.filePath()文件路径
-   info.created()创建日期（返回值为QDateTime，需要使用toString函数转为自己指定的输出格式）
-   info.lastModify()修改日期（返回值为QDateTime，需要使用toString函数转为自己指定的输出格式）

```cpp
info.lastModify().toString("yyyy-MM-dd hh:mm:ss");
```

我们可以由下面的示例看到，baseName()和completeBaseName()，以及suffix()和completeSuffix()的区别：

```cpp
QFileInfo fi("/tmp/archive.tar.gz");
QString base = fi.baseName(); // base = "archive"
QString base = fi.completeBaseName(); // base = "archive.tar"
QString ext = fi.suffix(); // ext = "gz"
QString ext = fi.completeSuffix(); // ext = "tar.gz"
```

**【注意】**

QByteArray类型可以转换字符编码格式

```cpp
//如下将gbk格式的QByteArray类型对象array转换为unicode编码格式
QTextCodec* codec=TextCodec::codecForName("gbk");
codec->toUnicode(array);
```

## 二进制文件读写

**QDataStream**提供了基于QIODevice的二进制数据的序列化。数据流是一种二进制流，这种流**完全不依赖**于底层操作系统、CPU 或者字节顺序（大端或小端）。例如，在安装了 Windows 平台的 PC 上面写入的一个数据流，可以不经过任何处理，直接拿到运行了 Solaris 的 SPARC 机器上读取。由于数据流就是二进制流，因此我们也可以**直接读写没有编码的二进制数据，例如图像、视频、音频**等。

**QDataStream既能够存取 C++ 基本类型，如 int、char、short 等，也可以存取复杂的数据类型，例如自定义的类。实际上，QDataStream对于类的存储，是将复杂的类分割为很多基本单元实现的。**

结合QIODevice，QDataStream可以很方便地对文件、网络套接字等进行读写操作。我们从代码开始看起：

```cpp
QFile file("file.dat");
file.open(QIODevice::WriteOnly);
QDataStream out(&file);
out << QString("the answer is");
out << (qint32)42;
```

-   在这段代码中，我们首先打开一个名为 file.dat 的文件（注意，我们为简单起见，并没有检查文件打开是否成功，这在正式程序中是不允许的）。然后，我们将刚刚创建的file对象的指针传递给一个QDataStream实例out。类似于std::cout标准输出流，QDataStream也重载了输出重定向<\<运算符。后面的代码就很简单了：将"the answer is"和数字 42 输出到数据流。由于我们的 out 对象建立在file之上，因此相当于将问题和答案写入file。

-   需要指出一点：最好使用 Qt 整型来进行读写，比如程序中的qint32。这保证了在任意平台和任意编译器都能够有相同的行为。

如果你直接运行这段代码，你会得到一个空白的 file.dat，并没有写入任何数据。这是因为我们的file没有正常关闭。**为性能起见，数据只有在文件关闭时才会真正写入**。因此，我们必须在最后添加一行代码：

```cpp
file.close(); // 如果不想关闭文件，可以使用 file.flush();
```

接下来我们将存储到文件中的答案取出来

```cpp
QFile file("file.dat");
file.open(QIODevice::ReadOnly);
QDataStream in(&file);
QString str;
qint32 a;
in >> str >> a;
```

**唯一需要注意的是，你必须按照写入的顺序，将数据读取出来。顺序颠倒的话，程序行为是不确定的，严重时会直接造成程序崩溃。**

那么，既然QIODevice提供了read()、readLine()之类的函数，为什么还要有QDataStream呢？QDataStream同QIODevice有什么区别？区别在于，**QDataStream提供流的形式，性能上一般比直接调用原始 API 更好一些。**我们通过下面一段代码看看什么是流的形式：

```cpp
QFile file("file.dat");
file.open(QIODevice::ReadWrite);
QDataStream stream(&file);
QString str = "the answer is 42";
stream << str;
```

## 文本文件读写

上一节我们介绍了有关二进制文件的读写。二进制文件比较小巧，却不是人可读的格式。而文本文件是一种人可读的文件。为了操作这种文件，我们需要使用QTextStream类。QTextStream和QDataStream的使用类似，只不过它是操作纯文本文件的。

QTextStream会自动将 Unicode 编码同操作系统的编码进行转换，这一操作对开发人员是透明的。它也会将换行符进行转换，同样不需要自己处理。**QTextStream使用16位的QChar作为基础的数据存储单位，同样，它也支持C++标准类型，如int等。实际上，这是将这种标准类型与字符串进行了相互转换。**

QTextStream同QDataStream的使用基本一致，例如下面的代码将把"The answer is 42"写入到 file.txt 文件中：

```cpp
QFile data("file.txt");
if (data.open(QFile::WriteOnly | QIODevice::Truncate))
{
	QTextStream out(&data);
	out << "The answer is " << 42;
}
```

这里，我们在open()函数中增加了QIODevice::Truncate打开方式。我们可以从下表中看到这些打开方式的区别：

枚举值 描述

-   QIODevice::NotOpen 未打开

-   QIODevice::ReadOnly 以只读方式打开

-   QIODevice::WriteOnly 以只写方式打开

-   QIODevice::ReadWrite 以读写方式打开

-   QIODevice::Append 以追加的方式打开，

> 新增加的内容将被追加到文件末尾

-   QIODevice::Truncate 以重写的方式打开，在写入新的数据时会将原有

> 数据全部清除，游标设置在文件开头。

-   QIODevice::Text 在读取时，将行结束符转换成 \n；在写入时，

> 将行结束符转换成本地格式，例如 Win32 平台
>
> 上是 \r\\n

-   QIODevice::Unbuffered 忽略缓存

我们在这里使用了QFile::WriteOnly | QIODevice::Truncate，也就是以只写并且覆盖已有内容的形式操作文件。注意，QIODevice::Truncate会直接将文件内容清空。

虽然QTextStream的写入内容与QDataStream一致，但是读取时却会有些困难：

```cpp
QFile data("file.txt");
if (data.open(QFile::ReadOnly))
{
	QTextStream in(&data);
	QString str;
	int ans = 0;
	in >> str >> ans;
}
```

在使用QDataStream的时候，这样的代码很方便，但是使用了QTextStream时却有所不同：读出的时候，str 里面将是 The answer is 42，ans 是 0。这是因为**当使用QDataStream写入的时候，实际上会在要写入的内容前面，额外添加一个这段内容的长度值。而以文本形式写入数据，是没有数据之间的分隔的。**因此，使用文本文件时，很少会将其分割开来读取，而是使用诸如使用：

-   QTextStream::readLine() 读取一行

-   QTextStream::readAll()读取所有文本

这种函数之后再对获得的QString对象进行处理。

默认情况下，QTextStream的编码格式是 Unicode（不是UTF-8），如果我们需要使用另外的编码，可以使用：

```cpp
stream.setCodec("UTF-8");
```

这样的函数进行设置。

# QT简单的动画效果

```cpp
//创建动画对象
QPropertyAnimation *animation=new QPropertyAnimation(this,"geometry");
//设置动画时间间隔
animation->setDuration(200);
//设置起始位置
animation->setStartValue(QRect(this->x(),this->y()+10,this->width(),this->height()));
//设置结束位置
animation->setEndValue(QRect(this->x(),this->y(),this->width(),this->height()));
//设置弹起效果//意思是设置移动轨迹（帮助文档中查setEasingCurve）
animation->setEasingCurve(QEasingCurve::OutBounce);
//让动画执行（参数为设置动画停止后释放动画对象）
animation->start(QAbstractAnimation::DeleteWhenStopped);
```

[帧动画参考](https://blog.csdn.net/CSND_Ayo/article/details/70175385)

# QT添加音效

使用前提：

1. 头文件：#include <QSound>
2. 模块文件：QT+=multimedia

首先，类似图片添加进资源文件夹

```cpp
QSound* mySound=new QSound(":/res/xxx.wav",this);//音效在资源中的路径
mySound->setLoops(5);//可以设置重复多少次，设置-1表示重复无限次
mySound->play();//开始音效
```

# 优化细节

可复用的各场景间转移通过show和hide来进行，如果要毁灭只用一次的场景直接delete

各场景之间的场景转移同步位置

```cpp
this->setGeometry(chooseScene->geometry());//设置到前一个场景的同一个位置
```

# qt setData()和data()

## 简述

在GUI开发中，往往需要在界面中存储一些有用的数据，这些数据可以来自配置文件、注册表、[[数据库]]、或者是Server。

无论来自哪里，这些数据对于用户来说都是至关重要的，它们在交互过程中大部分都会被用到，例如：单击一个用户头像，显示该用户的详细信息（等级、昵称、姓名、个人说明）。

## 常见接口

Qt中，可以通过绝大部分已有的接口来存数数据、获取数据。例如：

- 存储数据
  - setData()
  - setItemData()
  - setUserData()
- 获取数据：
  - data()
  - itemData()
  - userData()

# QT多线程

在进行桌面应用程序开发的时候， 假设应用程序在某些情况下需要处理比较复杂的逻辑， 如果只有一个线程去处理，就会导致窗口卡顿，无法处理用户的相关操作。这种情况下就需要使用多线程，其中一个线程处理窗口事件，其他线程进行逻辑运算，多个线程各司其职，不仅可以提高用户体验还可以提升程序的执行效率。

在 qt 中使用了多线程，有些事项是需要额外注意的：

- 默认的线程在Qt中称之为窗口线程，也叫主线程，负责窗口事件处理或者窗口控件数据的更新
- 子线程负责后台的业务逻辑处理，子线程中不能对窗口对象做任何操作，这些事情需要交给窗口线程处理
- 主线程和子线程之间如果要进行数据的传递，需要使用Qt中的信号槽机制

## 线程类 QThread

Qt 中提供了一个线程类，通过这个类就可以创建子线程了，Qt 中一共提供了**两种创建子线程**的方式，后边会依次介绍其使用方式。先来看一下这个类中提供的一些常用 API 函数：


常用共用成员函数

```cpp
// QThread 类常用 API
// 构造函数
QThread::QThread(QObject *parent = Q_NULLPTR);
// 判断线程中的任务是不是处理完毕了
bool QThread::isFinished() const;
// 判断子线程是不是在执行任务
bool QThread::isRunning() const;

// Qt中的线程可以设置优先级
// 得到当前线程的优先级
Priority QThread::priority() const;
void QThread::setPriority(Priority priority);
优先级:
    QThread::IdlePriority		--> 最低的优先级
    QThread::LowestPriority
    QThread::LowPriority
    QThread::NormalPriority
    QThread::HighPriority
    QThread::HighestPriority
    QThread::TimeCriticalPriority
    QThread::InheritPriority    --> 最高的优先级, 默认是这个


// 退出线程, 停止底层的事件循环
// 退出线程的工作函数
void QThread::exit(int returnCode = 0);
// 调用线程退出函数之后, 线程不会马上退出因为当前任务有可能还没有完成, 调回用这个函数是
// 等待任务完成, 然后退出线程, 一般情况下会在 exit() 后边调用这个函数
bool QThread::wait(unsigned long time = ULONG_MAX);
```

信号槽

```cpp
// 和调用 exit() 效果是一样的
// 代用这个函数之后, 再调用 wait() 函数
[slot] void QThread::quit();
// 启动子线程
[slot] void QThread::start(Priority priority = InheritPriority);
// 线程退出, 可能是会马上终止线程, 一般情况下不使用这个函数
[slot] void QThread::terminate();

// 线程中执行的任务完成了, 发出该信号
// 任务函数中的处理逻辑执行完毕了
[signal] void QThread::finished();
// 开始工作之前发出这个信号, 一般不使用
[signal] void QThread::started();
```

静态函数

```cpp
// 返回一个指向管理当前执行线程的QThread的指针
[static] QThread *QThread::currentThread();
// 返回可以在系统上运行的理想线程数 == 和当前电脑的 CPU 核心数相同
[static] int QThread::idealThreadCount();
// 线程休眠函数
[static] void QThread::msleep(unsigned long msecs);	// 单位: 毫秒
[static] void QThread::sleep(unsigned long secs);	// 单位: 秒
[static] void QThread::usleep(unsigned long usecs);	// 单位: 微秒
```

任务处理函数

```cpp
// 子线程要处理什么任务, 需要写到 run() 中
[virtual protected] void QThread::run();
```

这个 run() 是一个虚函数，如果想让创建的子线程执行某个任务，需要写一个子类让其继承 QThread，并且在子类中重写父类的 run() 方法，函数体就是对应的任务处理流程。另外，这个函数是一个受保护的成员函数，不能够在类的外部调用，如果想要让线程执行这个函数中的业务流程，需要通过当前线程对象调用槽函数 start() 启动子线程，当子线程被启动，这个 run() 函数也就在线程内部被调用了。

**QThread new出来的对象的释放**

```cpp
QThread* t1=new QThread;
t1->quit();
t1->wait();
t1->deletelater();//等同于delete t1;
```

## 第一种创建子线程

### 操作步骤

1. 需要创建一个线程类的子类，让其继承 QT 中的线程类 QThread，比如:

   ```cpp
   class MyThread:public QThread
   {
       ......
   }
   ```

2. 重写父类的 run () 方法，在该函数内部编写子线程要处理的具体的业务流程

   ```cpp
   class MyThread:public QThread
   {
       ......
    protected:
       void run()
       {
           ........
       }
   }
   ```

3. 在主线程中创建子线程对象，new 一个就可以了

   ```cpp
   MyThread * subThread = new MyThread;
   ```

4. 启动子线程，调用 start () 方法

   ```cpp
   subThread->start();
   ```

`不能在类的外部调用 run () 方法启动子线程，在外部调用 start () 相当于让 run () 开始运行`

当子线程别创建出来之后，父子线程之间的通信可以通过信号槽的方式，**注意事项**:

- 在 Qt 中在**子线程中不要操作程序中的窗口类型对象**，不允许，如果操作了程序就挂了
- **只有主线程才能操作程序中的窗口对象**，默认的线程就是主线程，自己创建的就是子线程

### 示例代码

举一个简单的数数的例子，假如只有一个线程，让其一直数数，会发现数字并不会在窗口中时时更新，并且这时候如果用户使用鼠标拖动窗口，就会出现无响应的情况，使用多线程就不会出现这样的现象了。

在下面的窗口中，点击按钮开始在子线程中数数，让后通过信号槽机制将数据传递给 UI 线程，通过 UI 线程将数据更新到窗口中。

![1](https://cdn.jsdelivr.net/gh/che77a38/blogImage/1.gif)

mythread.h

```cpp
#ifndef MYTHREAD_H
#define MYTHREAD_H

#include <QThread>

class MyThread : public QThread
{
    Q_OBJECT
public:
    explicit MyThread(QObject *parent = nullptr);

protected:
    void run();

signals:
    // 自定义信号, 传递数据
    void curNumber(int num);

public slots:
};

#endif // MYTHREAD_H
```

mythread.cpp

```cpp
#include "mythread.h"
#include <QDebug>

MyThread::MyThread(QObject *parent) : QThread(parent)
{

}

void MyThread::run()
{
    qDebug() << "当前线程对象的地址: " << QThread::currentThread();

    int num = 0;
    while(1)
    {
        emit curNumber(num++);
        if(num == 10000000)
        {
            break;
        }
        QThread::usleep(1);
    }
    qDebug() << "run() 执行完毕, 子线程退出...";
}
```

mainwindow.cpp

```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "mythread.h"
#include <QDebug>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    qDebug() << "主线程对象地址:  " << QThread::currentThread();
    // 创建子线程
    MyThread* subThread = new MyThread;

    connect(subThread, &MyThread::curNumber, this, [=](int num)
    {
        ui->label->setNum(num);
    });

    connect(ui->startBtn, &QPushButton::clicked, this, [=]()
    {
        // 启动子线程
        subThread->start();
    });
}

MainWindow::~MainWindow()
{
    delete ui;
}
```

这种在程序中添加子线程的方式是非常简单的，但是也有弊端，假设要在一个子线程中处理多个任务，所有的处理逻辑都需要写到run()函数中，这样该函数中的处理逻辑就会变得非常混乱，不太容易维护。

## 第二种创建子线程的方式

### 操作步骤

Qt 提供的第二种线程的创建方式弥补了第一种方式的缺点，用起来更加灵活，但是这种方式写起来会相对复杂一些，其具体操作步骤如下：

1. 创建一个新的类，让这个类从 QObject 派生

   ```cpp
   class MyWork:public QObject
   {
       .......
   }
   ```

2. 在这个类中添加一个公共的成员函数，函数体就是我们要子线程中执行的业务逻辑

   ```cpp
   class MyWork:public QObject
   {
   public:
       .......
       // 函数名自己指定, 叫什么都可以, 参数可以根据实际需求添加
       void working();
   }
   ```

3. 在主线程中创建一个 QThread 对象，这就是子线程的对象

   ```cpp
   QThread* sub = new QThread;
   ```

4. 在主线程中创建工作的类对象（**千万不要指定给创建的对象指定父对象**）

   ```cpp
   MyWork* work = new MyWork(this);    // error
   MyWork* work = new MyWork;          // ok
   ```

5. 将 MyWork 对象移动到创建的子线程对象中，需要调用 QObject 类提供的 moveToThread() 方法

   ```cpp
   // void QObject::moveToThread(QThread *targetThread);
   // 如果给work指定了父对象, 这个函数调用就失败了
   // 提示： QObject::moveToThread: Cannot move objects with a parent
   work->moveToThread(sub);	// 移动到子线程中工作
   ```

6. 启动子线程，调用 start(), 这时候线程启动了，但是移动到线程中的对象并没有工作

7. 调用 MyWork 类对象的工作函数，让这个函数开始执行，这时候是在移动到的那个子线程中运行的

### 示例代码

假设函数处理上面在程序中数数的这个需求，具体的处理代码如下：

mywork.h

```cpp
#ifndef MYWORK_H
#define MYWORK_H

#include <QObject>

class MyWork : public QObject
{
    Q_OBJECT
public:
    explicit MyWork(QObject *parent = nullptr);

    // 工作函数
    void working();

signals:
    void curNumber(int num);

public slots:
};

#endif // MYWORK_H
```

mywork.cpp

```cpp
#include "mywork.h"
#include <QDebug>
#include <QThread>

MyWork::MyWork(QObject *parent) : QObject(parent)
{

}

void MyWork::working()
{
    qDebug() << "当前线程对象的地址: " << QThread::currentThread();

    int num = 0;
    while(1)
    {
        emit curNumber(num++);
        if(num == 10000000)
        {
            break;
        }
        QThread::usleep(1);
    }
    qDebug() << "run() 执行完毕, 子线程退出...";
}
```

mainwindow.cpp

```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QThread>
#include "mywork.h"
#include <QDebug>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    qDebug() << "主线程对象的地址: " << QThread::currentThread();

    // 创建线程对象
    QThread* sub = new QThread;
    // 创建工作的类对象
    // 千万不要指定给创建的对象指定父对象
    // 如果指定了: QObject::moveToThread: Cannot move objects with a parent
    MyWork* work = new MyWork;
    // 将工作的类对象移动到创建的子线程对象中
    work->moveToThread(sub);
    // 启动线程
    sub->start();
    // 让工作的对象开始工作, 点击开始按钮, 开始工作
    connect(ui->startBtn, &QPushButton::clicked, work, &MyWork::working);
    // 显示数据
    connect(work, &MyWork::curNumber, this, [=](int num)
    {
        ui->label->setNum(num);
    });
}

MainWindow::~MainWindow()
{
    delete ui;
}
```

使用这种多线程方式，假设有多个不相关的业务流程需要被处理，那么就可以创建多个类似于 MyWork 的类，将业务流程放多类的公共成员函数中，然后将这个业务类的实例对象移动到对应的子线程中 moveToThread() 就可以了，这样可以让编写的程序更加灵活，可读性更强，更易于维护。

## QT线程池

### 线程池的原理

我们使用线程的时候就去创建一个线程，这样实现起来非常简便，但是就会有一个问题：如果并发的线程数量很多，并且每个线程都是执行一个时间很短的任务就结束了，这样频繁创建线程就会大大降低系统的效率，因为频繁创建线程和销毁线程需要时间。

那么有没有一种办法使得线程可以复用，就是执行完一个任务，并不被销毁，而是可以继续执行其他的任务呢？

线程池是一种多线程处理形式，处理过程中将任务添加到队列，然后在创建线程后自动启动这些任务。线程池线程都是后台线程。每个线程都使用默认的堆栈大小，以默认的优先级运行，并处于多线程单元中。如果某个线程在托管代码中空闲（如正在等待某个事件）, 则线程池将插入另一个辅助线程来使所有处理器保持繁忙。如果所有线程池线程都始终保持繁忙，但队列中包含挂起的工作，则线程池将在一段时间后创建另一个辅助线程但线程的数目永远不会超过最大值。超过最大值的线程可以排队，但他们要等到其他线程完成后才启动。

在各个编程语言的语种中都有线程池的概念，并且很多语言中直接提供了线程池，作为程序猿直接使用就可以了，下面给大家介绍一下线程池的实现原理：

线程池的组成主要分为 3 个部分，这三部分配合工作就可以得到一个完整的线程池：

（1）任务队列，存储需要处理的任务，由工作的线程来处理这些任务

- 通过线程池提供的 API 函数，将一个待处理的任务添加到任务队列，或者从任务队列中删除
- 已处理的任务会被从任务队列中删除
- 线程池的使用者，也就是调用线程池函数往任务队列中添加任务的线程就是生产者线程

（2）工作的线程（任务队列任务的消费者） ，N 个

- 线程池中维护了一定数量的工作线程，他们的作用是是不停的读任务队列，从里边取出任务并处理
- 工作的线程相当于是任务队列的消费者角色，
- 如果任务队列为空，工作的线程将会被阻塞 (使用条件变量 / 信号量阻塞)
- 如果阻塞之后有了新的任务，由生产者将阻塞解除，工作线程开始工作

（3）管理者线程（不处理任务队列中的任务），1 个

- 它的任务是周期性的对任务队列中的任务数量以及处于忙状态的工作线程个数进行检测
- 当任务过多的时候，可以适当的创建一些新的工作线程
- 当任务过少的时候，可以适当的销毁一些工作的线程

![R9c00030b842edb1ae3d6a2b286e53916](https://cdn.jsdelivr.net/gh/che77a38/blogImage/R9c00030b842edb1ae3d6a2b286e53916.jpg)

### QRunnable

在 Qt 中使用线程池需要先创建任务，添加到线程池中的每一个任务都需要是一个 QRunnable 类型，因此在程序中需要创建子类继承 QRunnable 这个类，然后重写 run() 方法，在这个函数中编写要在线程池中执行的任务，并将这个子类对象传递给线程池，这样任务就可以被线程池中的某个工作的线程处理掉了。

QRunnable 类 常用函数不多，主要是设置任务对象传给线程池后，是否需要自动析构。

```cpp
// 在子类中必须要重写的函数, 里边是任务的处理流程
[pure virtual] void QRunnable::run();

// 参数设置为 true: 这个任务对象在线程池中的线程中处理完毕, 这个任务对象就会自动销毁
// 参数设置为 false: 这个任务对象在线程池中的线程中处理完毕, 对象需要程序猿手动销毁
void QRunnable::setAutoDelete(bool autoDelete);
// 获取当然任务对象的析构方式,返回true->自动析构, 返回false->手动析构
bool QRunnable::autoDelete() const;
```

创建一个要添加到线程池中的任务类，处理方式如下：

```cpp
class MyWork : public QObject, public QRunnable
{
    Q_OBJECT
public:
    explicit MyWork(QObject *parent = nullptr)
    {
        // 任务执行完毕,该对象自动销毁
        setAutoDelete(true);
    }
    ~MyWork();

    void run() override{}
}
```

在上面的示例中 MyWork 类是一个多重继承，如果需要在这个任务中使用 Qt 的信号槽机制进行数据的传递就必须继承 QObject 这个类，如果不使用信号槽传递数据就可以不继承了，只继承 QRunnable 即可。

```cpp
class MyWork :public QRunnable
{
    Q_OBJECT
public:
    explicit MyWork()
    {
        // 任务执行完毕,该对象自动销毁
        setAutoDelete(true);
    }
    ~MyWork();

    void run() override{}
}
```

### QThreadPool

Qt 中的 QThreadPool 类管理了一组 QThreads, 里边还维护了一个任务队列。QThreadPool 管理和回收各个 QThread 对象，以帮助减少使用线程的程序中的线程创建成本。每个Qt应用程序都有一个全局 QThreadPool 对象，可以通过调用 globalInstance() 来访问它。也可以单独创建一个 QThreadPool 对象使用。


线程池常用的 API 函数如下：

```cpp
// 获取和设置线程中的最大线程个数
int maxThreadCount() const;
void setMaxThreadCount(int maxThreadCount);

// 给线程池添加任务, 任务是一个 QRunnable 类型的对象
// 如果线程池中没有空闲的线程了, 任务会放到任务队列中, 等待线程处理
void QThreadPool::start(QRunnable * runnable, int priority = 0);
// 如果线程池中没有空闲的线程了, 直接返回值, 任务添加失败, 任务不会添加到任务队列中
bool QThreadPool::tryStart(QRunnable * runnable);

// 线程池中被激活的线程的个数(正在工作的线程个数)
int QThreadPool::activeThreadCount() const;

// 尝试性的将某一个任务从线程池的任务队列中删除, 如果任务已经开始执行就无法删除了
bool QThreadPool::tryTake(QRunnable *runnable);
// 将线程池中的任务队列里边没有开始处理的所有任务删除, 如果已经开始处理了就无法通过该函数删除了
void QThreadPool::clear();

// 在每个Qt应用程序中都有一个全局的线程池对象, 通过这个函数直接访问这个对象
static QThreadPool * QThreadPool::globalInstance();
```

一般情况下，我们不需要在 Qt 程序中创建线程池对象，直接使用 Qt 为每个应用程序提供的线程池全局对象即可。得到线程池对象之后，调用 start() 方法就可以将一个任务添加到线程池中，这个任务就可以被线程池内部的线程池处理掉了，**使用线程池比自己创建线程的这种多种多线程方式更加简单和易于维护。**

### 示例代码

mywork.h

```cpp
class MyWork :public QRunnable
{
    Q_OBJECT
public:
    explicit MyWork();
    ~MyWork();

    void run() override;
}
```

mywork.cpp

```cpp
MyWork::MyWork() : QRunnable()
{
    // 任务执行完毕,该对象自动销毁
    setAutoDelete(true);
}
void MyWork::run()
{
    // 业务处理代码
    ......
}
```

mainwindow.cpp

```cpp
MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    // 线程池初始化，设置最大线程池数
    QThreadPool::globalInstance()->setMaxThreadCount(4);
    // 添加任务
    MyWork* task = new MyWork;//因为设置了自动释放，所以无需自己释放
    QThreadPool::globalInstance()->start(task);    
}
```

# 接受windows原生消息处理

重写nativeEvent函数

头文件中：

```cpp
protected:
   virtual bool nativeEvent(const QByteArray &eventType, void *message, long *result);
```

源文件中

```cpp
#define MY_CLOSE_MSG  WM_USER+1
bool Dialog::nativeEvent(const QByteArray &eventType, void *message, long *result)
{
    Q_UNUSED(eventType);
         MSG *msg = static_cast<MSG*>(message);  //类型转换
         /*此处的结构也可用switch来代替*/
         if(msg->message ==MY_CLOSE_MSG )//自定义消息举例
         {
             //dosomething...
            qDebug()<<"收到目标消息";
             return false;  //返回值为false表示该事件还会继续向上传递，被其他捕获
         }
       return false;
}
```

# 添加图标

如果使用qmake来生成makefile文件，只需要在.pro中添加：

```makefile
RC_ICONS = logo.ico//logo.ico是图标名
```
# QT编码
## QT json

用到的头文件

```cpp
#include <QJsonDocument>
//磁盘上有json格式的文件 -> 读到内存(字符串) 
//json数组/json对象 -> json文档对象 ->写入磁盘(写入的字符串)

#include <QJsonArray>//解析json数组

#include <QJsonObject>//解析json对象

#include <QByteArray>

#include <QJsonValue>//将json支持的数据类型进行了封装, 得到一个QJsonValue
```

完整案例:

```cpp
#include <QCoreApplication>
#include <QLocale>
#include <QTranslator>
#include <QDebug>
#include <QJsonDocument>
#include <QJsonArray>
#include <QJsonObject>
#include <QByteArray>
#include <QJsonValue>
#include <QFile>
#include <iostream>
using namespace std;

//写QJsonObject到文件
void writeJson2File(QJsonObject json,QString filePath)
{
    //将QJsonObject转换为QJsonDocument
    QJsonDocument doc(json);
    //讲QJsonDocument对象转换为QByteArray对象
    QByteArray byteArray = doc.toJson();
    //文件操作--将byteArray写入文件
    QFile file(filePath);
    file.open(QFile::WriteOnly);
    file.write(byteArray);
    file.close();
}

//读文件到QJsonDocument
QJsonDocument readFile2Json(QString filePath)
{
    //读取json文件到解析json格式
    QFile file;
    file.setFileName(filePath);
    file.open(QFile::ReadOnly);
    QByteArray byteArrayR = file.readAll();
    //将QByteArray转换为QJsonDocument
    QJsonDocument jsonDoc = QJsonDocument::fromJson(byteArrayR);
    return jsonDoc;
}

//递归解析打印QJsonValue
void showJsonValue(QString key,QJsonValue value)
{
    if(value.isArray())
    {
        QJsonArray array = value.toArray();
        qDebug()<<key<<":[";
        for(int i=0;i<array.size();i++)
        {
            if(array[i].isBool())
                qDebug()<<array[i].toBool();
            else if(array[i].isDouble())
                qDebug()<<array[i].toDouble();
            else if(array[i].isString())
                qDebug()<<array[i].toString();
        }
        qDebug()<<"]";
    }
    else if(value.isBool())
        qDebug()<<key<<":"<<value.toBool();
    else if(value.isDouble())
        qDebug()<<key<<":"<<value.toDouble();
    else if(value.isString())
        qDebug()<<key<<":"<<value.toString();
    else if(value.isObject())
    {
        QJsonObject obj = value.toObject();
        QStringList keyLists = obj.keys();
        qDebug()<<key<<":{";
        for(int i=0;i<keyLists.size();i++)
        {
            showJsonValue(keyLists[i],obj[keyLists[i]]);
        }
        qDebug()<<"}";
    }
}

//打印QJsonDocument
void showJsonDocuemnt(QJsonDocument jsonDoc)
{
    if(jsonDoc.isObject())
    {
        //将QJsonDocument对象转换为json对象
        QJsonObject obj = jsonDoc.object();
        QStringList keyLists = obj.keys();
        for(int i=0;i<keyLists.size();i++)
        {
            QJsonValue value = obj[keyLists[i]];
            showJsonValue(keyLists[i],value);
        }

    }
    else if(jsonDoc.isArray())
    {
        QJsonArray array = jsonDoc.array();
        qDebug()<<"[";
        for(int i=0;i<array.size();i++)
        {
            qDebug()<<array[i];
        }
        qDebug()<<"]";

    }
}


int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    QTranslator translator;
    const QStringList uiLanguages = QLocale::system().uiLanguages();
    for (const QString &locale : uiLanguages) {
        const QString baseName = "test_" + QLocale(locale).name();
        if (translator.load(":/i18n/" + baseName)) {
            a.installTranslator(&translator);
            break;
        }
    }

    //创建一个json对象
    QJsonObject json;
    json.insert("name","xiaowu");
    json.insert("age",21);
    json.insert("sex","male");
    //子子对象
    QJsonObject subSubJson;
    subSubJson.insert("hello","world");
    //插入子对象
    QJsonObject subJson;
    subJson.insert("father","longji");
    subJson.insert("sister","wangjin");
    subJson.insert("mather","liwei");
    subJson.insert("begin",subSubJson);
    json.insert("family",subJson);
    //插入数组
    QJsonArray jsonArray;
    jsonArray.append(10);
    jsonArray.append("chengdu");
    jsonArray.append(10.7);
    jsonArray.append(true);
    json.insert("like",jsonArray);
    //写入磁盘
    writeJson2File(json,"test.json");
    //读取磁盘json文件
    QJsonDocument jsonDoc = readFile2Json("test.json");
    //打印jsonDoc对象
    showJsonDocuemnt(jsonDoc);
    return a.exec();
}
```

## QT的base64编码

[[加解密相关#base64编码|何为base64编码]]

使用 QByteArray 类

+ **编码**
 `QByteArray QByteArray::toBase64() const`
+ **解码**
 ` QByteArray QByteArray::fromBase64(const QByteArray &base64);`   
  - `base64`: 要解码的字符串

# QT中的类型转换

```cpp
//QString -> QByteArray
QByteArray QString::toLatin1() const; //西欧编码 iso-8859-1,不支持中文
QByteArray QString::toLocal8Bit() const; //编码格式跟随操作系统
QByteArray QString::toUtf8() const; //utf8编码
//QByteArray->QString
QString::QString(const QByteArray &ba);
//char*->QByteArray
QByteArray::QByteArray(const char* data,int size=-1);
//QByteArray -> char*
char* QByteArray::data()
//QString-> char*
不能直接转
通过QString->QByteArray->char* 
```


# QT数据库开发

## oracle数据库

[[数据库#oracle|oracle数据笔记跳转]]

![image-20230420114847356](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202304201149758.png)

使用QtCreator打开`QT根目录\Qt5.9.0\5.9\Src\qtbase\src\plugins\sqldrivers\oci\`目录下面的oci.pro

修改oci.pro文件:

```qt pro
TARGET = qsqloci

HEADERS += $$PWD/qsql_oci_p.h
SOURCES += $$PWD/qsql_oci.cpp $$PWD/main.cpp

#QMAKE_USE += oci
QMAKE_LFLAGS += G:\\oracleInstall\\bin\\oci.dll
INCLUDEPATH += G:\\oracleInstall\\oci\\include
LIBPATH += G:\\oracleInstall\\oci\\lib\\msvc

darwin:QMAKE_LFLAGS += -Wl,-flat_namespace,-U,_environ

OTHER_FILES += oci.json

PLUGIN_CLASS_NAME = QOCIDriverPlugin
include(../qsqldriverbase.pri)
```

之后再重新编译，就会发现编译通过了，这时候我们在Qt安装的根目录下面去找 “:\plugins”会发现里面有一个“ sqldrivers ”文件夹，将其复制到Qt的`c:\Qt\Qt5.9.0\5.9\mingw53_32\plugins`下
面即可

## mysql开发

将`libmysql.dll`库放到下面的目录下**`Qt5.12.0(QT根目录)\5.12.0\mingw73_64\bin`**

头文件: **`#include <QtSql>`**

qmake:`QT+=sql`

**用到的头文件**

```cpp
#include <qDebug>
//QtSql头文件包含下面头文件
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlRecord>
#include <QSqlError>
```

### 加载数据库驱动

```cpp
QCoreApplication a(argc, argv);
//查看QT支持的驱动
qDebug() << QSqlDatabase::drivers();
//输出结果为:
//("QSQLITE", "QMYSQL", "QMYSQL3", "QOCI", "QOCI8", "QODBC", "QODBC3", "QPSQL", "QPSQL7")
//加载数据库驱动
QSqlDatabase db = QSqlDatabase::addDatabase("QMYSQL");
```

### 设置账号密码

```cpp
//设置账号和密码信息使用QSqlDatabase类的成员函数:
void setHostName(const QString &host)
void setPassword(const QString &password)
void setPort(int port)
void setUserName(const QString &name)
void setDatabaseName(const QString &name)
//使用方法, 如下所示
db.setHostName("192.168.10.145"); //设置mysql主机的IP地址
db.setDatabaseName("scott"); //设置数据库名
db.setUserName("root"); //设置用户名
db.setPassword("123456"); //设置密码
//其实上面这几步就类似于登录mysql数据库需要的关键信息:
mysql -h192.168.10.145 -uroot -p123456 scott
```

### 打开数据库

函数原型
`bool QSqlDatabase::open();`

```cpp
//详情查看QT帮助手册
//使用方法, 如下所示:
if(!db.open())
{
qDebug() << "数据库操作失败";
return;
}
```

### 关闭数据库

`db.close();`

### 操作数据库

数据库操作错误打印

```cpp
QSqlError lastError = query.lastError();
qDebug() << lastError.driverText() << lastError.databaseText();
```

#### 执行select查询操作

QSqlQuery类的构造函数:
`QSqlQuery(const QString &query = QString(), QSqlDatabase db = QSqlDatabase())`

该构造函数都有默认值, 构造的时候可以不指定

##### 执行语句

两种方法

1. ```cpp
   QSqlQuery query;
   query.exec("select * from dept");
   ```

2. ```cpp
   QSqlQuery query;
   bool success;
   query.prepare("select * from dept");
   success = query.exec();
   if(!success)
   {
   qDebug() << "查询失败";
   return;
   }
   ```

##### 结果集记录数和字段数

###### 查询字段数

字段数就是查询列数

record方法

先调用QSqlQuery类的record方法:
`QSqlRecord record() const;`
然后在调用QSqlRecord类的count方法
`int QSqlRecord::count() const`

```cpp
QSqlRecord rec = query.record();
qDebug() << "查询结果字段总数为：" << rec.count();
```

###### 查询记录数

记录数就是查询行数

size方法

调用QSqlQuery类的size方法:
`int size() const`

```cpp
qDebug() << "查询结果记录总数为" << query.size()
```

##### 遍历结果集

获取每一条记录
`bool QSqlQuery::next()`
通过列的索引位置获取列的值---列的索引从0开始
`QVariant QSqlQuery::value(int index) const`
通过列名获取列的值
`QVariant value(const QString &name) const`

```cpp
while(query.next())
{
//qDebug() << query.value(0).toInt() << query.value(1).toString() << query.value(2).toString();
qDebug() << query.value("deptno").toInt() << query.value("dname").toString() <<
query.value("loc").toString();
}
```

移动指向结果集的位置指针:

`bool QSqlQuery::seek(int index, bool relative = false)`

index为编号,如`query.seek(-1);` 移动到结果集的开始位置

每次next都会使记录指针移动一次, 可以使用seek函数重置指针位置,类似于文件指针

#### 执行insert操作

##### 直接插入

```cpp
query.prepare("insert into dept values(77, 'sports', 'xiuzheng')");
success = query.exec();
if(!success)
{
QSqlError lastError = query.lastError();
qDebug() << "插入失败：" << lastError.driverText() << lastError.databaseText();
return;
}
```

直接调用exec并将sql语句作为参数也可以直接插入

```cpp
success = query.exec("insert into dept values(66, 'SALES', 'SHANGHAI')");
if(!success)
{
QSqlError lastError = query.lastError();
qDebug() << "插入失败：" << lastError.driverText() << lastError.databaseText();
return;
}
```

##### 占位符插入

使用带有占位符的sql语句, 该语句不是一个完整的sql语句,需要调用bindValue函数给占位符设置值.

```cpp
query.prepare("insert into dept values(?, ?, ?)");
//给字段设置值,字段位置索引从0开始
query.bindValue(0, 99);
query.bindValue(1, "SPORTS");
query.bindValue(2, "BEIJING");
success = query.exec();
if(!success)
{
QSqlError lastError = query.lastError();
qDebug() << "插入失败：" << lastError.driverText() << lastError.databaseText();
return;
}
```

注意占位符操作,如果bindValue函数第二个传参传单引号,不会报错,但插入的内容会变成一串数字.

#### 执行update操作

##### 直接update

直接调用execl并将sql语句作为参数执行

```cpp
success = query.exec("update dept set loc='MEIGUO' where deptno=99");
if(!success)
{
QSqlError lastError = query.lastError();
qDebug() << "update failed" << lastError.driverText() << lastError.databaseText();
return;
}
```

##### 占位符update

使用带有占位符占位符的sql语句

```cpp
query.prepare("update dept set loc=? where deptno=?");
query.bindValue(0, "JAPAN");
query.bindValue(1, 77);
success = query.exec();
if(!success)
{
QSqlError lastError = query.lastError();
qDebug() << "update failed" << lastError.driverText() << lastError.databaseText();
return;
}
```

#### 执行delete操作

##### 直接delete

直接调用execl并将sql语句作为参数执行

```cpp
query.exec("delete from dept where deptno=99");
```

##### 占位符delete

使用带有占位符的sql语句

```cpp
query.prepare("delete from dept where deptno=? or loc=?");
query.bindValue(0, 77);
query.bindValue(1, "SHANGHAI");
success = query.exec();
if(!success)
{
QSqlError lastError = query.lastError();
qDebug() << "update failed" << lastError.driverText() << lastError.databaseText();
return;
}
```

### 事务处理

- 开启事务

  `query.exec("START TRANSACTION");`

- 设置自动提交和手动提交---->默认情况下mysql是自动提交的

  `query.exec("SET AUTOCOMMIT=0");` 手动提交

  `query.exec("SET AUTOCOMMIT=1");` 自动提交

- 事务的提交和回滚操作

  `query.exec("COMMIT");`   提交
  `query.exec("ROLLBACK");`  回滚

**测试案例**

```cpp
//测试方法: 先开启一个新的事务, 并设置为手动提交, 然后插入数据, 最后回滚, 看数据是否已经插入到数据库中;然后在修改为提交, 查看数据是否已经插入到数据库中.
query.exec("START TRANSACTION");
query.exec("SET AUTOCOMMIT=0"); //手动提交
success = query.exec("insert into dept values(99, 'SALES', 'SHANGHAI')");
if(!success)
{
QSqlError lastError = query.lastError();
qDebug() << "update failed" << lastError.driverText() << lastError.databaseText();
//回滚事务
query.exec("ROLLBACK");
return;
}
//提交事务
query.exec("COMMIT");
```

## sqlite开发

SQLite（sql）是一款开源轻量级的数据库软件，不需要server(不支持远程连接)，可以集成在其他软件中，非常适合嵌入式系统的小型数据库。
Qt5以上版本可以直接使用SQLite（Qt自带驱动）。

qt中开发环境仅需要

- 头文件就可以直接进行开发`<QtSql>`.
- pro文件中添加`QT += sql`

`navicat`可以很轻易创建出sqllite数据库,每个sqllite数据库以一个文件方式存在电脑上,连接该数据库时使用`db.setDatabaseName()`指定文件路径连接文件对应的数据库

**查询案例**

```cpp
QSqlDatabase db ;
        if(QSqlDatabase::contains("qt_sql_default_connection"))
        {
            db = QSqlDatabase::database("qt_sql_default_connection");
        }
        else {
            db = QSqlDatabase::addDatabase("QSQLITE");
            db.setDatabaseName("/Users/zeroko/Documents/mysqllite");
        }
        if(!db.open())
        {
        qDebug() << "数据库操作失败";
         return -1;
        }
        qDebug()<<"数据库连接成功";
        QSqlQuery sqlquery;
        bool isSuccess =sqlquery.exec("select * from student");
        if(!isSuccess)
        {
            qDebug()<<sqlquery.lastError();
            db.close();
            return -1;
        }
        while(sqlquery.next())
        {
            int id = sqlquery.value(1).toInt();
            QString name = sqlquery.value(0).toString();
            qDebug()<<QString("id:%1 name:%2").arg(id).arg(name);
        }
        db.close();
```

更多相关代码可参考[此处](https://www.cnblogs.com/xia-weiwen/archive/2017/05/04/6806709.html)

# QT中的http

涉及到三个主要的类

- [**`QNetworkAccessManager`**](#QNetworkAccessManager)
- [**`QNetworkRequest`**](#QNetworkRequest)
- [**`QNetworkReply`**](#QNetworkReply)

> - **`QNetworkAccessManager`**类允许应用程序发送网络请求和接受网络应答
>
>   Network Access API都是围绕着一个QNetworkAccessManager对象构造的,这个对象包含着发送请求的一些通用配置和设置.它包含着代理和缓存的配置,以及和这些事物相关的一些信号,并且应答信号可以作为我们检测一个网络操作的进度.
>
>   一个QNetworkAccessManager对于一整个Qt应用程序来说已经足够了
>
> - **`QNetworkRequest`**类是Network Access API的一部分,这个类包含着在网络上发送请求的必要信息.
>
> - 一旦一个QNetworkAccessManager对象被创建了,那么应用程序就可以使用它在网络上发送请求.它提供了一组标准的函数,可以承载网络请求和一些可选的数据,并且每一个请求返回一个**`QNetworkReply`**对象.该返回的对象包含着返回的请求应带的所有数据.

## Qt中http的使用

```qmake
QT += network
```

### QNetworkAccessManager

`#include <QNetworkAccessManager>`

使用这个类进行请求的发送:get/post

```cpp
// --- get ---
QNetworkReply *QNetworkAccessManager::get(const QNetworkRequest &request);
//	-	request:连接服务器相关的信息
//	-	返回值:通过QNetworkReply类接受服务器发送回来的数据

// --- post ---
QNetworkReply *QNetworkAccessManager::post(const QNetworkRequest &request, QIODevice *data)
//	-	request:连接服务器相关的信息
//	-	data:文件指针,需要让该指针打开一个I/O设备内的数据作为请求体传递给服务器
//	这里的data参数是一个指向QIODevice的指针。QIODevice是QT中所有I/O设备的基类，包括文件、内存缓冲区、网络连接等。这意味着你可以使用任何从QIODevice派生的类（如QFile, QBuffer, QTcpSocket等）作为数据源。当你调用这个版本的post函数时，QNetworkAccessManager会从提供的QIODevice读取数据，并将这些数据作为HTTP POST请求的主体发送到服务器。这对于发送大量数据或者从网络流中直接读取数据非常有用
QNetworkReply *QNetworkAccessManager::post(const QNetworkRequest &request, const QByteArray &data)
//	-	request:连接服务器相关的信息
//	-	data:作为请求体传递给服务器的数据
//	在QT中，你可以使用QJsonDocument, QJsonObject, QJsonArray等处理json的api来创建一个JSON对象，然后使用QJsonDocument::toJson()方法将JSON对象转换为QByteArray。然后，你可以将这个QByteArray作为data参数传递给post函数
QNetworkReply *QNetworkAccessManager::post(const QNetworkRequest &request, QHttpMultiPart *multiPart)
//	-	request:连接服务器相关的信息
//	-	multiPart:带分界线的数据块(对应http协议中的multipart/form-data)
```

[[网络编程#Content-Type|Content-Type中的multipart/form-data详解跳转]]

### QNetworkRequest

[[网络编程#http协议|跳转参考http协议详解]]

储存连接服务器相关的信息,包含

- 服务器ip和端口信息
- 请求数据对应的指令
- 指定发送的post数据块的格式

```cpp
//设置url的函数
void QNetworkRequest::setUrl(const QUrl &url);
//	-	url:连接,如:http://192.168.1.100:80/login/login.html
//因为get方式提交请求,请求数据也在url中,如:http://192.168.1.100:80/login?userName=zhang3&passwd=123456

//指定发送的post数据块的格式 - 标准请求头
void QNetworkRequest::setHeader(QNetworkRequest::KnownHeaders header, const QVariant &value)
//	-	header: 请求头的key
//			QNetworkRequest::ContentTypeHeader  数据类型
//			QNetworkRequest::ContentLengthHeader	数据长度
//			QNetworkRequest::LocationHeader	重定向
//			QNetworkRequest::UserAgentHeader  身份标识
//			......
//	-	value: 请求头的值
  
//指定发送的post数据块的格式 - 自定义请求头
void QNetworkRequest::setRawHeader(const QByteArray &headerName, const QByteArray &headerValue)
//基本同上
```

### QNetworkReply

`#include <QNetworkReply>`

> 这个对象会帮助检测服务器是否有数据会发,如果有就发送信号
>
> 它继承自QIODevice类,使用它内部的函数对QNetworkReply即服务器返回的数据进行读写,类似于读文件,如:`QByteArray QIODevice::readAll();`

相关信号:

- `[signal] void QNetworkReply::finished()`
- `[signal] void QNetworkReply::error(QNetworkReply::NetworkError code)`
- `[signal] void QIODevice::readyRead()`
- ...

## 示例程序

```cpp
QNetworkAccessManager manager;
    QNetworkRequest request(QUrl("http://127.0.0.1:8080"));
    //发起请求
    QNetworkReply *reply = manager.get(request);
    //QNetworkReply *reply = manager.post(request,"{\"userName\":\"zhang3\",\"passwd\":\"123456\"}");
    QObject::connect(reply, &QNetworkReply::readyRead,[=](){
        //接收数据
        QByteArray all = reply->readAll();
        //根据字符串格式进行解析,得到原始数据
        //业务上的逻辑判断
        qDebug()<<QString(all);
    });
```





# 打包发布

1.  切成release版本进行运行

2. 将release版本生成的exe放在待发布文件夹中

3. QT的cmd中打开对应文件夹通过命令打包

   ```javascript
   windeployqt coinFilp.exe的绝对路径
   ```

4. 发布成功，此时可通过第三方工具（例如：nis edit）再进一步封装成安装包

[设置图标方法点击跳转](https://blog.csdn.net/u014546553/article/details/78741277)

# QT的一些问题

## 中文图片资源问题

 + **报错：** `No rule to make target ‘/??. png’, needed by ‘debug/qrc_Icon. Cpp’. Stop.`
 + **原因：** 资源文件中包含中文命名的图片文件。

将含有中文命名的图片文件从资源文件中移除，执行 qmake，在重新添加有中文图片的文件，再重新编译就不会出错了。  
注意如果添加含有中文命名的图片文件再**执行 qmake**，重新构建会报错。(即此时**必须直接构建**)

## mac安装qt

[参考](https://zhuanlan.zhihu.com/p/643302036)





​	
