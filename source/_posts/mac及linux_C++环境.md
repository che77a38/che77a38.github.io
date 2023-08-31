---
title: mac及linux C++环境配置
tags: C++
categories: 技术
mathjax: true

---

mac及linux C++环境配置

<!-- more -->

[m1 mac电脑的vs code配置方法]: https://www.bilibili.com/read/cv13768776
[linux命令大全]: https://www.linuxcool.com/

[vs code代码片段设置]: https://blog.csdn.net/Peerless__/article/details/110386388

**linux系统介绍**

- 什么是linux系统？
- linux是开源的操作系统

**多用户多任务**

windows属于：单用户，多任务。

Linux属于：多用户，多任务

# vscode快捷键

| 功能                               | 快捷键                   |
| ---------------------------------- | ------------------------ |
| 转到文件                           | command+p                |
| 命令面板                           | F1                       |
| 打开/跳转到终端                    | ctrl+`                   |
| 变量统一重命名                     | F2                       |
| 开关侧边栏                         | command+b                |
| 转到定义处                         | F12                      |
| 代码格式化                         | command+K 然后 command+F |
| 当前行下方插入一行                 | command+enter            |
| 当前行上方插入一行                 | command+shift+enter      |
| 定义处缩略图(只看一眼而不跳转过去) | alt+F12                  |
| 删除当前行光标右侧所有的字符       | command+delete           |
| 多光标同时输入                     | alt+左键                 |
| 同时选中所有匹配                   | command+shift+L          |
| 回到上一个光标操作                 | command+U                |
| 整个项目中查找                     | command+shift+F          |
| 全屏                               | F11                      |
| 字体和窗口大小调整                 | command+“+/-”            |
| 撤销                               | command+z                |
| 恢复撤销                           | command+shift+z          |
| 单步步过                           | F10                      |
| 单步步入                           | F11                      |
| 选中当前行                         | command+L                |
| 返回上一个标签页                   | ctrl+"-"                 |

# makeFile学习

ubuntu下的开发环境安装

```shell
apt-get update #更新安装源
apt-get install g++ #安装gcc和c++的开发库
apt-get install gdb #安装调试工具
apt-get install make
apt-get install openssh-server #远程连接工具
apt-get install vim #编辑工具
```

安装好开发环境后，当输入make命令时，会在当前目录下找makefile或Makefile文件来执行。

**为什么要学习makefile**

- linux下C/C++编程 makefile应用广泛
- 编译移植开源项目，大部分开源项目都基于makefile，学会makefile才能够调试编译过程中的问题
- 手写makefile太过于繁琐，自动生成的makefile不易于配置，学习本门课程便携自动化makefile，以后新项目只需要include makefile头文件
- 学习makefile理解大型项目怎么分布编译的

目标

1. 从零开始学会写第一个makefile编译Linux项目
2. 能够掌握makefile原理，能够灵活应用
3. 学会makefile变量，函数，shell实战方法
4. 学会便携执行程序，动态库，静态库的makefile
5. 学会通过一个makefile编译所有的项目
6. 学会编写安装和卸载makefile
7. 学会使用makefile自动生成启动和停止脚本

## 编译器相关

**什么是编译器**

是一个根据源代码生成机器码的程序。

| 厂商 | C     | C++     | Fortran  |
| ---- | ----- | ------- | -------- |
| GNU  | gcc   | g++     | gfortran |
| LLVM | clang | clang++ | flang    |

**一个源代码经过**

1. 预处理  Preprocessing
2. 编译 Compilation（源码生成汇编语言，针对的是单文件）
3. 汇编 Assembly（汇编语言生成二进制代码，针对的是单文件）
4. 链接 Linking（多文件之间的关系整合起来，找不到就会报错）
5. 运行

- 在windows下，链接是找的lib文件，运行时找的dll文件
- 在linux下，链接和运行找的都是so文件

**gcc常用选项**

| 选项             | 含义                                                         |
| ---------------- | ------------------------------------------------------------ |
| -c               | 仅对源文件进行编译，不链接生成可执行文件。在对源文件进行查错时，或只需产生目标文件时可以使用该选项 |
| -g[gdb]          | 生成调试信息，在可执行文件中加入调试信息，方便进行程序的调试。如果使用中括号中的选项，表示加入gdb拓展的调试信息，方便使用gdb来进行调试 |
| -o[0或1或2或3或] | 对生成的代码使用优化，中括号中的部分为优化级别，缺省的情况为2级优化，0为不进行优化。注意，采用更高级的优化并不一定得到效率更高的代码。 |
| -Idir            | （dir表示具体的路径）在编译源程序时增加一个**搜素头文件的额外目录**--dir，即include增加一个搜索的额外目录（可以设置多个） |
| -Ldir            | （dir表示具体的路径）在编译源文件时增加一个**搜索库文件(动态库或静态库)的额外目录**--dir（可以设置多个） |
| -llibrary        | （library表示具体库的名字）在编译链接文件时，增加一个额外的库，库名为liblibrary.so(即此处写的名字是要去前缀和后缀的) |
| -w               | 禁止所有警告                                                 |
| -Wwarning        | （warning表示具体的取值）允许产生warning类型的警告，warning可以是：main，unused等很多取值，最常用是-Wall，表示产生所有警告。如果warning取值为error，其含义是将所有警告作为错误（error)，即出现警告就停止编译。 |

**gcc编译动态链接库**

- -fPIC 编译选项  产生位置无关代码(PIC),一般创建共享库时用到。在x86上，PIC的代码的符号引用都是通过ebx进行操作的
- -shared 产生动态链接库

例如

```shell
g++ -shared -fPIC mylib.cpp -o libmylib.so#编译动态链接库
g++ test.cpp -Imylib -L/root/cpp
```

**静态库编译**

linux中的静态库是.a后缀

```shell
ar -crv libmylib.a mylib.o
```

参数讲解：

- -c 不显示创建
- -v 显示过程
- -r 创建静态库

## 编译时相关文件查找顺序

**头文件顺序**

Linux中，以`include<”fileName.suffix“>`为例，编译时：

**首先检索文件的当前路径；如果没有，再检索标准路径**

1. 先搜索当前目录
2. 然后搜索`-I`指定的目录
3. 再搜索gcc的环境变量`CPLUS_INCLUDE_PATH`（C程序使用的是`C_INCLUDE_PATH`）
4. 最后搜索gcc的内定目录(即上述的**标准路径**)

**库文件顺序**

可以查看Linux基础以及系统编程**专题中的**Linux如何查找动态库**部分

## GDB调试器

- GDB（GUN Debugger）是一个用来调试C/C++程序的功能强大的调试器，是LINUX系统开发C/C++最常用的调试器

- 程序员可以使用GDB来跟踪程序中的错误，从而减少程序员的工作量

- Linux开发C/C++一定要熟悉GDB

- VSCode是通过调用GDB调试器来实现C/C++的调试工作的

  Windows系统中，常用的集成开发环境（IDE),如VS,VC等，它们内部已经嵌套了相应的调试器

GDB调试器只适合单线程程序调试,多线程调试,还是使用日志打印方式更靠谱

### GDB主要功能

- 设置断点（断点可以是条件表达式）

- 使程序在指定的代码行上暂停执行，便于观察

- 单步执行程序，便于调试

- 查看程序中变量值的变化

- 动态改变程序的执行环境

- 分析崩溃程序产生的core文件

  [如何设置开启core文件的产生](https://blog.csdn.net/lichao201005/article/details/128451612)

### 常用调试命令参数

调试开始：执行`gdb [exefilename]`，进入gdb调试程序，其中exefilename为要调试的可执行文件名,`gdb [exefilename] [core文件]`可以用于分析core,查看错误产生的位置等信息

```bash
##以下命令后括号内为命令的简化使用，比如run(r),直接输入命令r就代表命令run

$(gdb)help(h)		#查看命令帮助，具体命令查询在gdb中输入help+命令

$(gdb)run(r)		#重新开始运行文件 (run-text:加载文本文件，run-bin:加载二进制文件)

$(gdb)start		  #单步执行，运行程序，停在第一行执行语句

$(gdb)list(l)		#查看源代码(list，查看当前断下位置附近的代码 list-n，从第n行开始查看代码，list+函数名：查看具体函数)

$(gdb)set				#设置变量的值

$(gdb)next(n)		#单步调试（逐过程，函数直接执行）

$(gdb)step(s)		#单步调试（逐语句，跳入自定义函数内部执行）

$(gdb)backtrace(bt)   #查看函数的调用的栈帧和层级关系

$(gdb)frame(f)	#切换函数的栈帧

$(gdb)info(i)   #查看函数内部局部变量的数值

$(gdb)finish		#结束当前函数，返回到函数调用点

$(gdb)continue(c)		  #继续运行

$(gdb)print(p)	#打印值及地址(例如p x  表示打印名为x的变量)

$(gdb)quit(q)		#退出gdb

$(gdb)break+num(b)		#在第num行设置断点

$(gdb)info breakpoints(i b) #查看当前设置的所有断点

$(gdb)delete breakpoints num(d)	#删除第num个断点

$(gdb)display		#追踪查看具体变量值

$(gdb)undisplay #取消追踪观察变量

$(gdb)watch			#被设置观察点的变量发生修改时，打印显示

$(gdb)i watch		#显示观察点

$(gdb)enable breakpoints  #启用断点

$(gdb)disable breakpoints #禁用断点

$(gdb)x					#查看内存x/20xw 显示20个单元，16进制，4字节每单元

$(gdb)run argv[1] argv[2]  #调试时命令行传参

$(gdb)set follow-fork-mode child#Makefile项目管理：选择跟踪父子进程（fork（））
```

Tips:

1. 编译程序时需要加上`-g`，之后才能用gdb进行调试：`gcc -g main.c -o main`

   如果不加-g,将看不见程序的函数名,变量名,所代替的全是运行时的内存地址

2. 回车键：重复上一命令

#### list显示代码命令详解

简写: `l`

- `list linenum`：打印第linenum行的上下文内容.

- `list function`：显示函数名为function的函数的源程序。

- `list`： 显示当前行后面的源程序。

- `list -`：显示当前文件开始处的源程序。

- `list file:linenum`: 显示file文件下第n行

- `list file:function`: 显示file文件的函数名为function的函数的源程序

  一般是打印当前行的上5行和下5行, 如果显示函数是是上2行下8行, 默认是10行, 当然, 你也可以定制显示的范围, 使用下面命令可以设置一次显示源程序的行数。

- `set listsize count`：设置一次显示源代码的行数。         

- `show listsize`：   查看当前listsize的设置。

#### break设置断点命令详解

简写: `b`

##### 简单断点--当前文件

- `b 10` 在源程序第10行设置断点
- `b func` 设置断点,在func函数入口处

##### 多文件设置断点

- `b filename:linenum` 在源文件filename的linenum行处停止
- `b filename:function` 在源文件filename的function函数的入口处停止

##### 查询所有断点

`info break`  (info可简写为 `i`)    所以可以直接写 `i b`

##### 条件断点

if关键词,后跟断点条件.如: `b test.c:8 if intValue == 5`

##### 维护断点

- `delete [range...]` 删除指定的断点, 其简写命令为`d`。

  - 如果不指定断点号, 则表示删除所有的断点。range表示断点号的范围（如：3-7）。
    - 删除某个断点: `delete num`
    - 删除多个断点: `delete num1 num2  ...`
    - 删除连续的多个断点: `delete m-n`
    - 删除所有断点: `delete`
  - 比删除更好的一种方法是disable停止点, disable了的停止点, GDB不会删除, 当你还需要时, enable即可, 就好像回收站一样。

- `disable [range...]` 使指定断点无效, 简写命令是`dis`。

  如果什么都不指定, 表示disable所有的停止点。

  - 使一个断点无效/有效: `disable num`
  - 使多个断点无效有效: `disable num1 num2 ...`
  - 使多个连续的断点无效有效: `disable m-n`
  - 使所有断点无效有效: `disable`

- `enable [range...]` 使无效断点生效, 简写命令是`ena`。如果什么都不指定, 表示enable所有的停止点。

  - 使一个断点无效/有效: `enable num`
  - 使多个断点无效有效: `enable num1 num2 ...`
  - 使多个连续的断点无效有效: `enable m-n`
  - 使所有断点无效有效: `disable/enable`

##### 调试代码

- `run/r` 运行程序   `start`运行程序,停在第一行执行语句
- `next/n` 单步步过
- `step/s` 单步步入
- `finish` 退出进入的函数
- `until/u` 在一个循环体内单步跟踪时,该命令可以运行程序直到退出循环体
- `continue/c` 继续运行程序(若有断点,则跳到下一个断点)

##### 显示运行中信息

- `print/p  变量名/&变量(变量的地址)` 查看运行时变量的值

**自动显示变量的值**

你可以设置一些自动显示的变量, 当程序停住时, 或是在你单步跟踪时, 这些变量会自动显示。相关的GDB命令是display。

- **display** 变量名
- `info display` -- 查看display设置的自动显示的信息。
- `undisplay num`（info display时显示的编号）
- `delete display dnums …` 或 `undisplay dnums …`  -- 删除自动显示, dnums意为所设置好了的自动显式的编号。如果要同时删除几个, 编号可以用空格分隔, 如果要删除一个范围内的编号, 可以用减号表示（如：2-5）
  - 删除某个自动显示: `undisplay num` 或者`delete display num`
  - 删除多个: `delete display num1 num2`
  - 删除一个范围: `delete display m-n`
- `disable display dnums…`
  - 使一个自动显示无效: `disable display num`
  - 使多个自动显示无效: `delete display num1 num2`
  - 使一个范围的自动显示无效: `delete display m-n`
- `enable display dnums…`
  - 使一个自动显示有效: `enable display num`
  - 使多个自动显示有效: `enable display num1 num2`
  - 使一个范围的自动显示有效: `enable display m-n`
- disable和enalbe不删除自动显示的设置, 而只是让其失效和恢复。

**查看变量的类型**

- `ptype width` --查看变量width的类型

  type = double

**改变变量的值**

可以使用 `set var` 命令来告诉GDB,width不是你GDB的参数,而是程序的变量名,如: `set var width = 47`

在你改变程序变量取值时,最好都使用`set var` 格式的GDB命令

## makefile基本格式

```c
目标: 依赖
(tab)命令//必须是tab,不能是空格
```

- 目标:要生成的目标
- 依赖:目标文件由哪些文件生成
- 命令:通过执行该命令由依赖文件生成目标

```makefile
目标...: 依赖...
    命令1#注意每条命令前必须有且仅有一个 tab 保持缩进，这是语法要求（此处要注意vscode编写的话要把tab键切换成4空格给关掉）
    命令2
    ...
```

Makefile 文件默认只生成第一个目标文件即完成编译，但是我们可以通过 “ALL” 指定需要生成的目标文件。通常会把ALL也设置为伪目标

**makefile文件中tab开头的表示他是命令，命令开头有一些可选项可填入**：

- 开头加上@，表示该命令执行的时候，不显示命令本身
- 开头加上-，表示该命令执行失败也依然会执行后续命令。

**最基础的makefile文件**

```makefile
#当前目录下有first_make.cpp;second.cpp;second.h
first_make:first_make.cpp second.cpp #目标文件：依赖文件
	g++ first_make.cpp second.cpp -o first_make -lpthread#-l表示添加某个库，因为使用到了pthread库
```

**makefile工作流程**

![image-20211224202502589](https://raw.githubusercontent.com/che77a38/blogImage/main/202112242025323.png)

![捕获](https://raw.githubusercontent.com/che77a38/blogImage2/main/202206051153723.jpeg)

**makefile文件主要包含了5部分内容**：

1. **显示规则**。说明了如何生成一个或多个目标文件。由makefile文件的创作者指出，包括要生成的文件，文件的依赖文件，生成的命令
2. **隐式规则**。由于make有自动推导的功能，所以隐式的规则可以比较粗糙地简略书写makefile文件，这是由make所支持的。
3. **变量定义**。在makefile文件中要定义一系列的变量，变量一般都是字符串，这与C语言中的宏有些类似。当makefile文件执行时，其中的变量都会扩展到相应的引用上。
4. **文件指示**。其中包含3个部分，（1）在一个makefile文件中引用另一个makefile文件；（2）根据某些情况指定makefile文件中的有效部分；（3）定义一个多行的命令
5. **注释**。makefile文件中只有行注释，其注释用“#”字符。如果要在makefile文件中使用“#”字符，可以用反斜框进行转义，如:"\\#"

## makefile中的变量

类似于C语言的宏定义

```C
如:下面是变量的定义和使用
foo = abc			// 定义变量并赋值
bar = $(foo)		// 使用变量, $(变量名)
```

主要有以下4种

1. 系统自带变量
2. 手动定义变量
3. make传递变量
4. 自动推理参数设置

GUN的make很强大，它可以自动推导文件以及文件依赖关系后面的命令，于是我们就没必要去在每一个[.o]文件后都写上类似的命令，因为，我们的make会自动识别，并自己推导命令。只要make看到一个[.o]文件，它就会自动的把[.c]文件加在依赖关系中，**如果make找到一个whatever.o，那么whatever.c，就会是whatever.o的依赖文件。并且gcc -c whatever.c也会被推导出来**

**正是因为强大的[自动推导功能]，因此依赖项写成.o文件后，就可以一条命令搞定整个编译过程**

**makefile中常见预定义变量**

![image-20211224164553549](https://raw.githubusercontent.com/che77a38/blogImage/main/202112241646051.png)

p.s.CXXFLAGS=-I../inc		表示头文件的路径在当前源文件的父文件夹中的inc文件夹中

**在makefile中变量的用法**：`$(变量名)`

**自动变量**

**自动变量**(下面表格的变量)只能在规则中的命令使用

![image-20211224204554371](https://raw.githubusercontent.com/che77a38/blogImage/main/202112242045930.png)

$(@D)是目标文件的目录，$(@F)是目标文件，

**手动定义变量**的方法：
$$
变量名=存的值（仅第一次有效）
$$

$$
变量名：=存的值（已经定义了变量，修改用这个）
$$


```makefile
#生成的目标文件名
TARGET=main
#依赖文件.o(自己写的)
OBJS=test.o main.o
#依赖文件，加入的头文件
LIBS=-lpthread
#头文件所在目录
CXXFLAGS:=-I../inc
#目标项：依赖项
$(TARGET):$(OBJS)
	$(CXX) $^ -o $@ $(LIBS)
	
#目标项clean
clean:
	$(RM) $(TARGET) $(OBJS)

#标识伪目标
.PHONY:clean
```

生成动态库

```makefile
#生成的目标文件名
TARGET=libfunc.so
#依赖文件.o(自己写的)
OBJS=func.o
#依赖文件，加入的头文件
LIBS=-lpthread
#头文件所在目录
CXXFLAGS=-I../inc -fPIC
$(TARGET):$(OBJS)
	$(CXX) -shared $^ -o $@ $(LIBS)
	
#目标项clean
clean:
	$(RM) $(TARGET) $(OBJS)

#标识伪目标
.PHONY:clean
```

联合动态库编译文件test

```shell
#生成的目标文件名
TARGET=test
#依赖文件.o(自己写的)
OBJS=test.o
#头文件所在目录
CXXFLAGS=-I../inc
#库文件所在路径
LDFLAGS=-L../lib
#具体引用了哪些库
LIBS=-lmylib -lpthread
$(TARGET):$(OBJS)
	$(CXX) -shared $^ -o $@ $(LIBS)
	
#目标项clean
clean:
	$(RM) $(TARGET) $(OBJS)

#标识伪目标
.PHONY:clean
```

上面所有案例都有个问题：一旦新增源文件,就要修改OBJS=......

有没有一劳永逸的方法，不需要修改makefile就能适应呢。

## 模式规则

要求至少在规则的目标定义中要包含'%','%'表示一个或多个,在依赖条件中同样可以使用'%',依赖条件中的取值取决于其目标:

如下:

![捕获](https://raw.githubusercontent.com/che77a38/blogImage2/main/202206051342850.jpeg)

## makefile的清理操作

用途:清除编译生成的中间.o文件和最终目标文件

`make clean` 命令 同于执行此操作

但是如果当前目录下有同名clean文件,则不执行clean对应的命令,解决方案是 **伪目标声明**

`.PHONY:clean` 声明目标为伪目标之后,makefile将不会检查该目标是否存在或者该目标是否需要更新,不检查直接调用对应的命令.

`rm -f` 强制执行,比如若要删除的文件不存在,使用 `-f` 不会报错

## makefile命令中的特殊符号

-  `-` 表示即使此条命令出错,make也会继续执行后续的命令.  如: `-rm main.o`
-  `@`不显示命令本身,只显示结果.  如:`@echo clean done`

**\[注意]**: `~/`这样的路径在makefile的命令中不可使用,取而代之可以这样: `$(HOME)/`

## make命令的参数

- `make` **默认执行第一个出现的目标**,可通过 `make dest(dest表示其他目标)`指定要执行的目标
- `make -f 文件名`制定一个makefile文件来执行  如:`make -f mainmak`指定要执行的makefile文件名为mainmak
- 在**测试makefile时**，应先使用`-n`参数，检查无误再执行。(只显示命令,但不真正执行)

## makefile的常见函数

所有函数都有返回值

- wildcard函数    当前目录下匹配模式的文件    例如：src=$(wildcard *.c)

- notdir函数    去除路径    例如：$(notdir $src)

- patsubst函数    模式匹配替换    例如：$(patsubst%.c,%.o,$src)

  ​    等价于$(src:.c=.o)  意思是把src的所有.c后缀的文件名换成.o后缀文件

- shell函数    执行shell命令    例如$(shell ls -d */)

```makefile
#生成的目标文件名
TARGET=main
#可以设定CXX(库可以直接加在这句中，如下list库，-g表示调试也可以加在这句中)
#CXX=g++ -g -llist
#依赖文件.o(自己写的)
SRCS=$(wildcard *.cpp)
#上面与下面同理
#SRCS=$(shell ls *.cpp)
#下面的可以遍历所有子目录中的.cpp
#SRCS=$(shell find ./ -name '*.cpp')
OBJS=$(SRCS:.cpp=.o)
#依赖文件，加入的头文件
LIBS=-lpthread
#头文件所在目录
CXXFLAGS:=-I../inc
#目标项：依赖项
$(TARGET):$(OBJS)
	$(CXX) $^ -o $@ $(LIBS)
	
#目标项clean
clean:
	$(RM) $(TARGET) $(OBJS)

#标识伪目标
.PHONY:clean

```

到这里makefile中只在需要添加新的库的时候，在LIBS=-lpthread后面添加链接库

**别人项目中的makefile编写参考**

```makefile
.SUFFIXES: .c .o .lo

COMPILE = $(CC) -g -Wall -O -D_FILE_OFFSET_BITS=64 -DDEBUG
INC_PATH = -I/usr/local/include
LIB_PATH = -L/usr/local/lib -lfdfsclient -lfastcommon -lserverframe
TARGET_PATH = $(TARGET_PREFIX)/bin

#SHARED_OBJS = common_func.o dfs_func.o
SHARED_OBJS = common_func.o dfs_func_pc.o

ALL_OBJS = $(SHARED_OBJS)

ALL_PRGS = gen_files test_upload test_download test_delete combine_result

all: $(ALL_OBJS) $(ALL_PRGS)
.o:
	$(COMPILE) -o $@ $<  $(SHARED_OBJS) $(LIB_PATH) $(INC_PATH)
.c:
	$(COMPILE) -o $@ $<  $(SHARED_OBJS) $(LIB_PATH) $(INC_PATH)
.c.o:
	$(COMPILE) -c -o $@ $<  $(INC_PATH)
.c.lo:
	$(COMPILE) -c -fPIC -o $@ $<  $(INC_PATH)
install:
	mkdir -p $(TARGET_PATH)
	cp -f $(ALL_PRGS) $(TARGET_PATH)
clean:
	rm -f $(ALL_OBJS) $(ALL_PRGS)
```

> 这个Makefile文件可以用来编译和链接一些测试程序，例如test_upload、test_download、test_delete等。您可以运行 `make all` 来编译所有程序，运行 `make install` 来安装所有程序，运行 `make clean` 来清理所有生成的文件。

# cmake学习

> [CMake 是一个开源的跨平台自动化构建系统，用来管理软件构建的过程，不依赖于某特定编译器，可以支持多层目录、多个应用程序和多个函数库。它用配置文件控制构建过程（build process）的方式和 Unix 的 make 相似，只是 CMake 的配置文件取名为 CMakeLists.txt。CMake 并不直接构建出最终的软件，而是产生标准的构建文件（如 Unix 的 Makefile 或 Windows Visual C++ 的 projects/workspaces），然后再依一般的构建方式使用](https://zhuanlan.zhihu.com/p/149337776)

- CMake是一个**跨平台**的安装编译工具，可以用简单的语句来描述所有平台的安装(编译过程)。
- CMake可以说已经成为大部分C++开源项目标配(事实标准)

## 语法特性介绍

**基本语法格式：指令(参数1 参数2...)**

- 参数使用括弧括起
- 参数之间使用**空格**或**分号**分开

**指令是大小写无关的，参数和变量是大小写相关的**

```cmake
set(HELLO hello.cpp)
add_executable(hello main.cpp hello.cpp)
ADD_EXECUTABLE(hello main.cpp ${HELLO})
```

**变量使用 ${}方式取值，但是在IF控制语句中是直接使用变量名**

## 重要指令

- **`cmake_minimum_required`**==指定CMake的**最小版本要求**

  语法：cmake_minimum_required(VERSION versionNumber [FATAL_ERROR])

  ```cmake
  #CMakezz最小版本要求为2.8.3
  cmake_minimum_required(VERSION 2.8.3)
  ```

- **`project`**==**定义工程名称**，并可指定工程支持的语言

  语法：project(projectname [CXX] [C] [Java])

  ```cmake
  #指定工程名为HELLOWORLD 
  project(HELLOWORLD)
  ```

- **`set`**==显式的**定义变量**

  语法：set(VAR [VALUE] [CACHE TYPE DOCSTRING [FORCE]])

  ```cmake
  #定义SRC变量，其值为main.cpp hello.cpp
  set(SRC sayhello.cpp hello.cpp)
  ```

- **`Include_directories`**==向工程添加多个特定的**头文件搜索路径**---》相当于指定g++编译器的-I参数

  要放在add_executable前面

  语法：`include_directories([AFTER | BEFORE] [SYSTEM] dir1 dir2 ...)`

  ```cmake
  将/usr/include/myincludefolder 和 ./include 添加到头文件搜索路径
  include_directories(/usr/include/myincludefolder ./include)
  ```

- **`Link_directories`**==向工程添加多个特定的**库文件搜索路径**---》相当于指定g++编译器的-L参数

  要放在add_executable前面

  语法：`link_directories(dir1 dir2 ...)`

  ```cmake
  #将/usr/lib/mylibfolder 和 ./lib 添加到库文件搜索路径
  link_directories(/usr/lib/mylibfolder ./lib)
  #windows下会自动解析路径下的Debug或Release目录
  ```

- **`add_library`**==**生成库文件**

  语法：add_library(libname [SHARED | STATIC | MODULE] [EXCLUDE_FROM_ALL]  source1 source2 ... sourceN)

  ```cmake
  #通过变量SRC生成libhello.so共享库
  add_library(hello SHARED ${SRC})
  #SHARED表示动态库，STATIC表示静态库
  ```

- **`Add_compile_options`**==**添加编译参数**

  语法：add_compile_options(<option> ...)'

  ```cmake
  #添加编译参数 -Wall -std=c++11 -o2
  add_compile_options(-Wall -std=c++11 -o2)
  ```

- **`Add_executable`**==**生成可执行文件**

  语法：add_library(exename source1 source2 ... sourceN)

  ```cmake
  #编译main.cpp生成可执行文件main
  add_executable(main main.cpp)
  ```

- **`Target_link_libraries`**==为target**添加需要链接的共享库**---》相当于指定g++编译器-l参数

  放在add_executable后面

  语法：`target_link_libraries(target library1<debug | optimized> library2...)`

  ```cmake
  #将hello动态库文件链接到可执行文件main
  target_link_libraries(main hello)
  #此处无论是linux，mac，windows中，hello不需要写前面的lib和后面的后缀
  ```

- **`add_subdirectory`**==向当前工程添加存放源文件的子目录，并可以**指定中间二进制和目标二进制存放的位置**

  语法：add_subdirectory(source_dir [binary_dir] [EXCLUDE_FROM_ALL])

  ```cmake
  #添加src子目录，src中需有一个CMakeLists.txt
  add_subdirectory(src)
  ```

- **`Aux_source_directory`**==发现一个目录下**所有的源文件并将列表存储在一个变量中**，这个指令临时被用来自动构建源文件列表(多个该指令可以**累加**找到的源文件到变量中)

  语法：`aux_source_directory(dir VARIABLE)`

  ```cmake
  #定义SRC变量，其值为当前目录下所有的源代码文件
  aux_source_directory(. SRC)
  #编译SRC变量所代表的的源代码文件，生成main可执行文件
  add_executable(main ${SRC})
  ```
  
  自动查找头文件可以通过下面命令实现
  
  `FILE (GLOB H_FILE "${INCLUDE_PATH}/*.h*")`
  
  含义为将`${INCLUDE_PATH}/*.h*`匹配的文件放到H_FILE变量中
  
- add_definitions

  用于向 C/C++ 编译器添加预处理器定义

  语法:`add_definitions("-DDEFINITION1 -DDEFINITION2")`
  
  ```cmake
  add_definitions(-Dxlog_STATIC) #传递宏给项目,宏的默认值为1
  ```

## CMake常用变量

- `CMAKE_C_FLAGS`  gcc编译选项

- `CMAKE_CXX_FLAGS`  g++编译选项

  ```cmake
  #在CMAKE_CXX_FLAGS编译选项后追加-std=c++11
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
  ```

- `CMAKE_BUILD_TYPE`  编译类型（Debug，Release）

  ```CMAKE
  #设定编译类型为debug，调试时需要选择debug
  set(CMAKE_BUILD_TYPE Debug)
  #设定编译类型为release，调试时需要选择release
  set(CMAKE_BUILD_TYPE Release)
  ```

- `CMAKE_BINARY_DIR` / `PROJECT_BINARY_DIR` / `<projectname>_BINARY_DIR`

  1. 这三个变量指代的内容是一致的
  2. 如果是in source build，指的就是工程顶层目录
  3. 如果是Out-of-source编译，指的是工程编译发生的目录
  4. PROJECT_BINARY_DIR跟其他指令稍有区别，不过现在，你可以理解为他们是一致的

- `CMAKE_SOURCE_DIR` / `PROJECT_SOURCE_DIR` / `<projectname>_SOURCE_DIR`

  1. 这三个变量指代的内容是一致的，不论采用何种编译方式，都是工程顶层目录
  2. 也就是在in source build时，他跟CMAKE_BINARY_DIR等变量一致
  3. PROJECT_SOURCE_DIR跟其他指令稍有区别，不过现在，你可以理解为他们是一致的

- `CMAKE_C_COMPILER`  指定C编译器

- `CMAKE_CXX_COMPILER`  指定C++编译器

- `EXECUTABLE_OUTPUT_PATH`  可执行文件输出的存放路径

- `LIBRARY_OUTPUT_PATH`  库文件输出的存放路径

- `CMAKE_VERBOSE_MAKEFILE` 开关显示详细的生成指令  ON/OFF

- `CMAKE_CURRENT_LIST_DIR`当前正在执行的CMakeLists.txt文件所在的目录的路径

## CMAKE编译工程

CMake目录结构：项目主目录存在一个CMakeLists.txt文件

### 两种方式设置编译规则

1. 包含源文件的子文件夹**包含**CMakeLists.txt文件，主目录的CMakeLists.txt通过add_subdirectory添加子目录即可
2. 包含源文件的子文件夹**未包含**CMakeLists.txt文件，子目录编译规则体现在主目录的CMakeLists.txt中

### 编译流程

1. 手动编写CMakeLists.txt
2. 执行命令`cmake PATH`生成Makefile(PATH是顶层CMakeLists.txt所在的目录)
3. 执行命令`make`进行编译

p.s.  vs code有一个叫cmake的拓展，可以支持智能补全cmake指令与直接生成CMakeLists.txt模板文件

`cmake tools`是让vs code支持cmake的插件

### 两种构建方式

- **内部构建**(in_source build):不推荐使用

  内部构建会在同级目录下产生一大堆中间文件，这些中间文件并不是我们最终所需要的，和工程源文件放在一起会显得杂乱无章

  ```cmake
  ##内部构建
  #在当前目录下，编译本目录的CMakeLists.txt，生成Makefile和其他文件
  cmake .
  #执行make命令，生成target
  make
  ```

- **外部构建**(out_of_source build):推荐使用

  将编译输出文件与源文件放到不同目录中

  ```cmake
  ##外部构建
  # 1. 在当前目录下，创建build文件夹
  mkdir build
  # 2. 进入到build文件夹（一般默认该文件夹都叫build）
  cd build
  # 3. 编译上级目录的CMakeLists.txt，生成Makefile和其他文件。也可以在上级目录的情况下，直接cmake -B ./build
  cmake ..
  # 4. 执行make命令，生成target
  make 
  ```

## 【实战】CMake代码实践

### 最小的CMake工程

```cmake
cmake_minimum_required(VERSION 3.0)
project(HELLOWORLD)
add_executable(helloWorld_cmake helloworld.cpp)
```

[内外部构建操作差别]: #两种构建方式

内部构建后（还未执行`make`）如图：

![image-20220117153415398](https://raw.githubusercontent.com/che77a38/blogImage/main/202201171534397.png)

红色框中是原有的文件，紫色框中的是内部构建生成的,可以看到非常乱

外部构建后（还未执行`make`）如图：

![image-20220117155157081](https://raw.githubusercontent.com/che77a38/blogImage/main/202201171551365.png)

cmake的产物都放到build文件夹下了，整洁了很多 ，如果之后执行`make`，生成的可执行文件也会在build文件夹下

### 多目录工程-直接编译

项目结构如下：

![image-20220117162108450](https://raw.githubusercontent.com/che77a38/blogImage/main/202201171621715.png)

CMakeLists.txt如下：

```cmake
cmake_minimum_required(VERSION 3.0)

project(TESTCMAKE)

INCLUDE_DIRECTORIES(include)

add_executable(main_cmake main.cpp src/tool.cpp)
```

操作如下：

![image-20220117162245705](https://raw.githubusercontent.com/che77a38/blogImage/main/202201171622366.png)

`make`后结构如下：

![image-20220117162516558](https://raw.githubusercontent.com/che77a38/blogImage/main/202201171625167.png)

下面两个等同于`cd build;cmake .`

```shell
#在build上级目录
#配置项目
cmake -S . -B build
#构建项目
cmake --build build
```

## vscode配合cmake进行调试

1. 合理设置项目目录
2. 编写项目源文件
3. 编写CMakeLists.txt构建项目编译规则
4. 使用外部构建，手动编译CMake项目
5. 配置VSCode的json文件并调试项目

CMakeLists.txt编写如下：

```cmake
cmake_minimum_required(VERSION 3.0)

project(TESTCMAKE)

##添加C++11支持及其他选项
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -g -O2 -Wall")

#调成debug模式
#set(CMAKE_BUILD_TYPE "DEBUG")

INCLUDE_DIRECTORIES(${CMAKE_SOURCE_DIR}/include)

#add_compile_options(-g)

aux_source_directory(./src SRC)

aux_source_directory(. SRC_MAIN)

add_executable(main_cmake ${SRC_MAIN} ${SRC})
```

- -Wall    选项意思是编译后显示所有警告。
- -O2    在这一级别GCC将会提供所有支持的优化，但这其中并不包括以空间换时间的优化手段，例如编译器不会使用循环展开和函数内联。和-O相比，该选项进一步加快了编译时间和生成代码的性能。

点击下面图片位置，创建json文件

![image-20220119163310314](https://raw.githubusercontent.com/che77a38/blogImage/main/202201191633093.png)

**【超级重点】：必须在编辑框显示源文件的情况下点击这个按钮**

![image-20220119201327676](https://raw.githubusercontent.com/che77a38/blogImage/main/202201192013927.png)

**CodeLLDB（用来debug，解决Catalina不支持lldb调试问题）**

**Mac在更新到Catalina后不再支持lldb调试**,即C++(GDB/LLDB)无效，因此下载CodeLLDB插件，也因此上图选择LLDB按钮。

![image-20220119201249218](https://raw.githubusercontent.com/che77a38/blogImage/main/202201192012644.png)

**红框中设置为生成的可执行文件的路径**

然后直接按F5就可以调试运行

如果想每次调试前自动编译项目，可以配合cmake，在.vscode文件夹下新建tasks.json文件，将下面json复制进去：

```json
{
    "version": "2.0.0",
    "options": {
        "cwd": "${workspaceFolder}/build" 
    },
    "tasks": [
        {
            "type": "shell",
            "label": "cmake",
            "command": "cmake",
            "args": [
                ".."
            ]
                
        },
        {
            "label": "make",
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "command": "make",
            "args": [

            ]
        },
        {
            "label": "Build",
            "dependsOrder": "sequence",
            "dependsOn": [
                "cmake",
                "make"
            ]
        }
    ],
}
```

上面json文件就相当于每次调试前执行如下代码：

```shell
#相当于在这个${workspaceFolder}/build路径下执行如下代码
cmake ..
make
```

这样的好处在于每次调试前保证调试的是最新的可执行文件。

## cmake进阶

在使用CMake组织工程时，如果我们需要依赖某个库文件，需要完成以下步骤：

1. 查找库文件（find_package命令）
2. 判断是否找到库文件（XXX_FOUND标记），并包含头文件（include_directories命令）
3. 链接库文件到目标（target_link_libraries命令）

例如：

```cmake
#查找OpenCV是否安装
find_package(OpenCV REQUIRED core highgui imgproc imgcodecs)
if (OPENCV_FOUND)
    message(STATUS "找到OpenCV:\"${OpenCV_INCLUDE_DIRS}\",ENABLE_OPENCV宏已打开")
    message(STATUS "找到OpenCV:\"${OpenCV_LIBS}\"")
    include_directories(${OpenCV_INCLUDE_DIRS})
    add_definitions(-DENABLE_OPENCV)
    list(APPEND LINK_LIB_LIST ${OpenCV_LIBS})
endif (OPENCV_FOUND)
```

[cmake更全面详细的说法]: https://blog.csdn.net/samxx8/article/details/108332076

## 现代CMAKE

现代cmake的完全体:cmake版本3.15及以上











# 终端指令学习

## 基本指令

| Windows | Macos/linux | 功能                       |
| ------- | ----------- | :------------------------- |
| cd      | cd          | 前往文件夹                 |
| cd      | pwd         | 取得目前所在路径           |
| dir     | ls          | 查看当前目录的文件和文件夹 |
| mkdir   | mkdir       | 新建文件夹                 |
| 无指令  | touch       | 新建文件                   |
| copy    | cp          | 复制文件                   |
| move    | mv          | 移动文件                   |
| del     | rm          | 删除文件                   |
| cls     | clear       | 清除画面上的显示           |

[win部分特殊终端命令](#win终端命令相关)

## homebrew常用命令

安装软件：`brew install xxx`
卸载软件：`brew uninstall xxx`
搜索软件：`brew search xxx`
更新软件：`brew upgrade xxx`
查看列表：`brew list`
更新brew：`brew update`
清理所有包的旧版本：`brew cleanup`
清理指定包的旧版本：`brew cleanup $FORMULA`
查看可清理的旧版本包，不执行实际操作：`brew cleanup -n`

[更详细的命令]: https://blog.csdn.net/weixin_44280688/article/details/93391279

# git一图流

![](https://raw.githubusercontent.com/che77a38/blogImage/main/202112071513124.png)

![image-20211207151102904](https://raw.githubusercontent.com/che77a38/blogImage/main/202112071511344.png)

[git学习网站]: https://learngitbranching.js.org/?locale=zh_CN

# git详解

## Git与svn对比

**SVN（Subversion）**是集中式版本控制系统，版本库是集中放在中央服务器的，而干活的时候，用的都是自己的电脑，所以首先要从中央服务器哪里得到最新的版本，然后干活，干完后，需要把自己做完的活推送到中央服务器。集中式版本控制系统是必须联网才能工作，如果在局域网还可以，带宽够大，速度够快，如果在互联网下，如果网速慢的话，就郁闷了。
下图就是标准的集中式版本控制工具管理方式：

![image-20230103162133191](https://raw.githubusercontent.com/che77a38/blogImage2/main/202301031621539.png)

集中管理方式在一定程度上看到其他开发人员在干什么，而管理员也可以很轻松掌握每个人的开发权限。
但是相较于其优点而言，集中式版本控制工具缺点很明显：

- 服务器单点故障
- 容错性差

**Git**

Git是分布式版本控制系统，那么它就没有中央服务器的，每个人的电脑就是一个完整的版本库，这样，工作的时候就不需要联网了，因为版本都是在自己的电脑上。既然每个人的电脑都有一个完整的版本库，那多个人如何协作呢？比如说自己在电脑上改了文件A，其他人也在电脑上改了文件A，这时，你们两之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。
下图就是分布式版本控制工具管理方式：

![image-20230103162249584](https://raw.githubusercontent.com/che77a38/blogImage2/main/202301031623438.png)

## git工作流程

1. 从远程仓库中克隆 Git 资源作为本地仓库。
2. 从本地仓库中checkout代码然后进行代码修改
3. 在提交前先将代码提交到暂存区。
4. 提交修改。提交到本地仓库。本地仓库中保存修改的各个历史版本。
5. 在修改完成后，需要和团队成员共享代码时，可以将代码push到远程仓库。

下图展示了 Git 的工作流程：

![image-20230104113924564](https://raw.githubusercontent.com/che77a38/blogImage2/main/202301041139883.png)

## Git安装

下载地址：https://git-scm.com/download

## 关键词理解

> 在初始化git版本库之后会生成一个隐藏的文件 .git ，可以将该文件理解为 git 的版本库 `repository`，而我们自己建立的项目文件夹即工作区 `working directory` , 在 `.git` 文件夹里面还有很多文件，其中有一个 `index` 文 件 就是暂存区也可以叫做 `stage` , git 还为我们自动生成了一个分支 `master` 以及指向该分支的指针`head` ,如下图

![image-20230112111626807](https://raw.githubusercontent.com/che77a38/blogImage2/main/202301121117166.png)

- **工作区**: 存储项目文件的目录, 版本库需要创建到工作区中

- **版本库**: 创建出的隐藏目录 `.git`

  - **`stage`** - 暂存区
     当往工作区中添加了新文件之后, 需要将工作区文件添加到暂存区

  - **`master`** - 主分支

    默认只有这一个, 进行版本管理
    `HEAD` - 操作master分支的指针

  - 暂存区和分支的关系

    当暂存区的文件内容发送变化, 需要将其提交的master分支
    只有提交之后才会形成一个节点(一个版本)

> 可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

## 使用git管理文件

使用`git help git关键词`可以查询git关键词的作用

### 创建版本库

什么是版本库呢？版本库又名仓库，英文名`repository`，你可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。由于git是分布式版本管理工具，所以git在不需要联网的情况下也具有完整的版本管理能力。

在要使用git管理的目录中点击右键中选择Git Bash来启动,创建仓库执行命令：**`git init`**

版本库创建成功，会在此目录下创建一个`.git`的隐藏目录

- **版本库**：`.git`目录就是版本库，将来文件都需要保存到版本库中。
- **工作目录**：包含`.git`目录的目录，也就是.git目录的上一级目录就是工作目录。只有工作目录中的文件才能保存到版本库中。

### 添加暂存区并提交

添加新文件到暂存区并提交

1. 添加改动到暂存区  `git add .`(`.`表示所有变动)
2. 暂存区提交到分支  `git commit -m '注释'`  

第一次使用git执行commit之前需要设定个人资料,[点击跳转参考](#设定个人资料)

### 还原修改

还原的本质 :  **将工作区中修改的文件还原成想要的提交的版本**

还原有三种情况

- 只是修改了文件，没有任何 git 操作

  ```shell
  git checkout -- aaa.html // 指定还原`aaa.html`文件
  
  git checkout -- * // 还原所有文件
  ```

- 修改了文件，并提交到暂存区（即：编辑之后，进行`git add` 但没有 `git commit -m "留言xxx"`）

  ```shell
  git log --oneline            #只显示提交ID和提交信息的第一行,可省略
  
  git reset HEAD               // 回退到当前版本
  
  git checkout -- aaa.html
  ```

- 修改了文件，并提交到仓库区（即：编辑之后，进行`git add` 并且 `git commit -m "留言xxx"`）

  ```shell
  git log --oneline    #只显示提交ID和提交信息的第一行,可省略
  
  git reset HEAD^     // 回退到上一个版本，注意看HEAD后面有个^ HEAD^是回退到上个版本 HEAD^^是回退到上上个版本HEAD~数字 是回退到数字个版本
  
  git checkout -- aaa.html
  ```

前两种情况使用了还原功能后,修改内容就丢失了,无法找回.原因是真正保存下来的其实是每次提交的状态

**另外有一种更常用的还原:**

**`git restore 文件名`** : 撤消工作区的修改返回到**最近一次`add`(缓存区)的版本**或者**最近一次`commit`(当前版本库)的版本**

`git restore --stage <file>`和`git restore <file>`两个命令的区别

- 对于`git restore <file>`命令，会撤销文件的修改，使文件恢复到暂存区或当前版本库（取决于文件在修改前的状态）；
- 对于`git restore --staged <file>`命令，把文件从暂存区撤回到工作区，保留文件最后一次修改的内容；

### 查看相关信息

- **`git log`**  查看版本库中提交的各个节点信息
- **`git status`**  查看当前状态(修改了什么,追踪了什么(暂存)还未提交),还可以查看是否同步了远程仓库的最新内容

### 对比修改内容

- [未暂存的修改](#查看未暂存修改)
- [已暂存的修改](#查看已暂存的修改)

**git diff的重点**

> 文件的流转方向是由工作区创建，`add`进入暂存区，`commit`进入仓库。

- **`git diff`** 比较暂存区与工作区文件的区别。
- **`git diff --cached`** 比较仓库(版本库)与暂存区文件的区别。

#### 对比未暂存修改

此时比较的是: **已暂存（`staged`）和 已追踪未暂存（`modified`） 之间的修改部分。**
此时执行 **`git status`** 查看文件状态,**`git diff`**,显示内容如下

```bash
#此时 hello.txt 中已经有一行内容了，内容为hello world，我们将其改为了hello
$ git status
On branch master
No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   hello.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   hello.txt


$ git diff
diff --git a/hello.txt b/hello.txt
index 95d09f2..b6fc4c6 100644
--- a/hello.txt
+++ b/hello.txt
@@ -1 +1 @@
-hello world
 No newline at end of file
+hello
 No newline at end of file
#文件名后面 + 和 - 的数量是这个提交造成的更改中增删的项
```

#### 对比已暂存修改

此时比较的是: **提交至仓库的版本 和 暂存区文件 之间的修改部分**。

**`git diff --cached`** 命令

> 注意：`--staged` 和 `--cached` 是同义词
> `git diff --cached` 等于 `git diff --staged`

```bash
#hello.txt 的内容为 hello。此时我们修改内容为 hi
$ git add hello.txt

$ git diff --cached
diff --git a/hello.txt b/hello.txt
index b6fc4c6..32f95c0 100644
--- a/hello.txt
+++ b/hello.txt
@@ -1 +1 @@
-hello
 No newline at end of file
+hi
 No newline at end of file
```

#### 对比本地与远程仓库的区别

**`git diff 本地仓库名 远程仓库名/远程分支名`** (远程与本地顺序可颠倒)

如: `git diff master origin/master`

### 添加忽略列表

有些文件或文件夹不需要git追踪,因此可以将他们添加到忽略列表

> 一般库文件和可执行文件,不需要git追踪

需要在项目根目录新建**`.gitignore`**文件（也就是与.git文件夹同级）
文件中写上忽悠的文件或文件夹，例如：

```txt
.vs
npoi.fast/bin
npoi.fast/obj
npoi.fast.test/bin
npoi.fast.test/obj
```

如果要忽略的文件或文件夹**已提交过**，请使用命令`git rm -r --cached filename   `   (其中filename换成文件或文件夹名，如上述`.vs`或`npoi.fast/bin`)

> 已经添加至 git 仓库的文件（`commit` 后的），是不能被 `.gitignore` 文件所影响的，需要先 `git rm --cached` 让其脱离 git 仓库。`git rm --cached` 后还需要`commit`

### 删除相关 

 `git rm`   等同于    `rm`  +   `git add`

`git rm --cached`会保留原文件,只删除对文件的追踪状态,常用于已提交后添加忽略的情况

### 与远程仓库交互

在线代码托管平台:   [Github](https://github.com)    [码云](https://gitee.com)  等等

![image-20211207131020235](https://raw.githubusercontent.com/che77a38/blogImage/main/202112071310206.png)

#### 本地同步到远程

[本地库上传到远程库参考](#上传指令)   

**[注意]   上传到远程库最稳妥的方式是push之前先pull**

#### 远程同步到本地

远程库下载到本地库:   **`git clone ssh链接或https链接`**

远程库更新到本地库:  **`git pull <远程主机名> <远程分支名>:<本地分支名>`**       (将`<远程主机名>`的`<远程分支名>`分支拉取过来，与`<本地分支名>`分支合并)

> `git pull`  等同于  `git fetch` + `git merge`    (`git fetch`是把远程仓库的内容下载到本地作为一个本地的子分支)

克隆`clone`和拉取`pull`的**区别**

- 本地仓库还没有的时候使用克隆
- 本地仓库已经存在了,从远程仓库下载文件使用拉取

[fetch,pull,clone详解点击跳转](https://blog.csdn.net/qq_43530326/article/details/123311067)

- fetch使用格式: `git fetch <repositoryUrl>` 
- merge使用格式: `git merge <需要合并到当前分支的目标分支名>`

**推送本地仓库文件到远程仓库注意**

- 如果远程仓库没有任何分支,可以将本地仓库直接推送到远程仓库,不会报错;

- 若远程仓库有master分支,则本地仓库推送master分支的时候会报错

  **解决方法**:首先优先将远程仓库的文件"获取"(`fetch`)到本地仓库,将自动在本地仓库建立了默认名字为**`FETCH_HEAD`**的子分支,然后将该子分支合并到master主分支(可能需要[解决冲突](#解决冲突)),最后再执行推送操作(`push`)就可以了

**注意: fetch指令生成的`FETCH_HEAD`子分支无法用`git branch`查看到**

[rebase指令详解跳转](https://blog.csdn.net/weixin_42310154/article/details/119004977)  (不推荐使用)

### SSH协议配置

除了`https`协议连接,还可以使用`ssh`协议进行连接

加密的方式是非对称加密,需要生成一对密钥

- 客户端拿私钥
- github服务器拿公钥

#### 生成SSH协议密钥对

生产秘钥对的命令:  **`ssh-keygen -t rsa`**   (rsa为非对称加密算法)

也可以`ssh-keygen -t rsa -C "这里输入生成的sshkey的名称"`

将生成`id_rsa`(私钥)和`id_ras.pub`(公钥)

#### 公钥添加到 github 账户

**github中设置公钥:**  点击`头像`-`Settings`-`SSH and GPG keys`-`New SSH keys`中起个题目并且填入`id_ras.pub`中的key,最后点击`Add SSH key`

#### SSH协议私钥设置到本地

```shell
ssh-agent bash
ssh-add ~/.ssh/id_rsa # 这里如果文件名被改过要写你自己定义的文件名  (~/.ssh/id_rsa为私钥文件路径)
```

返回如下结果表示设置成功:

```shell
Identity added: id_rsa (your_email@example.com)
```

#### 测试SSH协议连接

```shell
#输入:
	#github
ssh -T git@github.com
	#码云
ssh -T git@gitee.com
#返回:
The authenticity of host 'github.com (20.205.243.166)' can't be established.
ECDSA key fingerprint is SHA256:p2QAMXNIC1TJYWeIOttrVc98/R1BUFWu3/LiyKgUfQM.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
#输入:
yse
#返回:
Warning: Permanently added 'github.com,20.205.243.166' (ECDSA) to the list of known hosts.
Hi xxxxxx You've successfully authenticated, but GitHub does not provide shell access.
#如果 xxxxxx 是github用户名,表示ssh链接成功
```

> **配置 git的push&pull 使用 SSH协议 连接**
>
> 在仓库中输入`git remote -v`查看当前使用的是什么协议,如果以git开头表示SSH协议,下面是使用https协议返回的结果:
>
> ```shell
> origin  https://xxxxx.git (fetch)
> origin  https://xxxxx.git (push)
> ```
>
> 输入 **`git remote set-url origin git@github.com:xxxxx.git`** 修改https协议为SSH协议,`git@github.com:xxxxx.git`取自github库
>
> 接下来使用push&pull就是使用的SSH协议

### 分支操作

git中默认只有一个分支:`master`

如果创建了分支,各个分支都是独立的,互不影响的

![image-20230130173124159](https://raw.githubusercontent.com/che77a38/blogImage2/main/202301301731761.png)

> **当前所在的分支，其实是由 `HEAD` 决定的**

| 命令名称 | 作用 |
| --- | --- |
| **`git branch 分支名`** | 创建本地分支 |
| **`git branch`** | 查看本地有哪些分支 |
| **`git branch -d 分支名`** | 删除本地分支 |
| `git push <主机名> -d <分支名>` | 删除远程分支，主机名不填默认是origin |
| `git branch -v` | 查看本地分支+上次提交的信息 |
| `git branch -vv` | 查看本地分支+上次提交的信息+本地和远程分支的关系 |
| `git branch -vv -a` | 查看本地分支+上次提交的信息+本地和远程分支的关系+远程分支（如果不想显示提交的信息，也可以去掉-vv参数） |
| `git branch -r` | 只查看远程分支 |
| **`git checkout 分支名`** | 切换本地分支 |
| `git checkout -b 分支名` | 创建本地分支并切换 |
| **`git merge 分支名`** | 把指定的分支合并到当前分支上 |
| `git branch -m 旧分支名 新分支名` | 修改本地分支名称 |
| `git merge --abort` | 回到解决合并冲突之前的状态 |
| `git branch -f 分支名1 分支名2` | 更新分支1以指向分支2 |
| `git branch -B 分支名1 分支名2` | 更新分支1以指向分支2并且切换到分支1 |

##### 解决冲突

[跳转参考解决冲突具体代码操作](#远程同步到本地)

合并中有冲突的数据会显示为如下格式:

```c
<<<<<<< HEAD
hello, git!!! master test!
=======
hello, git!!!hot-fix test!
>>>>>>> hot-fix
```

上面的HEAD分支的内容和下面hot-fix分支的内容,该处有冲突,需要手动**解决冲突**后再提交

# git常用指令

## 常用环境设定

```
//编辑器更换：
git config --global core.editor "code --wait"
//git缩写：
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.ci commit
```

查看所有config的设定

- Mac：~/.gitconfig
- Win:C:\\Users\\$USER

### git版本查看

```
git --version
```

### 设定个人资料

```c
//输入姓名
git config --global user.name "gon"
//输入个人的email
git config --global user.email "gonsakon@gmail.com"
//查询git设定内容
git config --list
```

## 基本指令架构

![image-20211207131020235](https://raw.githubusercontent.com/che77a38/blogImage/main/202112071310206.png)

## 上传指令

1. 初始化git数据库：`git init`

   文件夹中多出一个.git文件夹，表明该文件夹已经生成了git数据库了（需要显示隐藏文件才能显示出来）

   ```c
   //macOS下打开隐藏文件显示
   defaults write com.apple.finder AppleShowAllFiles TRUE
   // 默认显示苹果所有文件 true
   killall Finder// 这一步相当于确定
   //关闭隐藏文件显示
   defaults write com.apple.finder AppleShowAllFiles FALSE
   killall Finder // 这样就恢复成初始状态了
     
   //也可以在访答中键入command+shift+.
   ```

2. 查询当前状态：`git status`

3. 将有修改的档案加入到索引（暂存区）：`git add .`

4. 将索引档案变成一个更新(COMMIT):`git commit -m "修改内容的描述"`

5. 观察commit历史记录：`git log`

6. 下载远程数据库：`git clone 数据库网址`

7. 更新远程数据库：`git push origin master`

```c
//上传步骤
git add .//添加当前目录的所有文件到暂存区
git commit -m "修改内容的描述"
git push <远程主机名> <本地分支名>:<远程分支名>
//如果本地分支名与远程分支名相同，则可以省略冒号：
git push <远程主机名> <本地分支名>
git push --force <远程主机名> <本地分支名>:<远程分支名>//强制推送,不管任何事
```

**[注意]   最好的方式是push之前先pull**

### 远程储存库操作

- 注册远程储存库origins名称对应远程储存库网址：git remote add origin 远程储存库网址（origin是自己取的远程储存库名字，怎么取都可以）
- 更新资料到远程master分支：git push -u origin master（-u可以省略）

```c
//上传到已经存在的远程储存库
git remote add 自己取的名字 远程数据库的git的url//注册远程储存库名称对应远程储存库网址
git push -u 自己取的名字 master（-u可以省略）
```

## git版本控制

### git版本细节

- branch：分支，默认分支叫master
- HEAD：当下的本地版本位置
- origin：默认远程储存库
- 回到某个版本内容：git  checkout commit编号
- 返回最新的版本：git checkout master(分支名称)

```c
git log//查看当前所有的commit编号
git checkout 想回到的commit节点的哈希值//返回到指定哈希值的commit节点
//Git 对哈希的处理很智能。你只需要提供能够唯一标识提交记录节点的前几个字符即可
```

![image-20211209200758510](https://raw.githubusercontent.com/che77a38/blogImage/main/202112092007970.png)

commit编号就是个哈希值

![image-20211209202104826](https://raw.githubusercontent.com/che77a38/blogImage/main/202112092021609.png)

git checkout commit编号与直接在上图左侧双击commit行均为使得文件恢复到与commit时的样子，二者效果一致。

### 还原技巧

![src=http___upload-images.jianshu.io_upload_images_4311354-6a4562939fec66c0.png&refer=http___upload-images.jianshu](https://raw.githubusercontent.com/che77a38/blogImage/main/202112101443772.jpeg)

**Untracked:表示未跟踪的**

#### 未跟踪情况下

新建文件的时候，清空未跟踪的内容：

- 显示此次清除的未跟踪内容：git clean -n
- 强制清除未跟踪内容：git clean -f

还原工作目录上已更改的内容：

```c
git checkout -- <file文件名>//将该文件已更改的内容还原
git checkout .//所有更改内容还原
```

#### 已跟踪情况下

`git reset` 通过把分支记录回退几个提交记录来实现撤销改动。你可以将这想象成“改写历史”。`git reset` 向上移动分支，原来指向的提交记录就跟从来没有提交过一样。

已经加入到暂存区的改动，退回到未加入缓存区状态：**git reset HEAD**

git reset head^^,两个^表示返回两个commit记录的节点转为未跟踪状态，多少^表示多少个commit记录节点。

`git reset` 很方便，但是这种“改写历史”的方法对大家一起使用的**远程分支是无效**的,取而代之的是git revert xxx

![image-20211210151213508](https://raw.githubusercontent.com/che77a38/blogImage/main/202112101512015.png)![image-20211210151908657](https://raw.githubusercontent.com/che77a38/blogImage/main/202112101519242.png)

### Git分支(branch)

**为什么要用分支？**

- 多人协作时，不可能都在master
- 可以让master都是正式版资料，可以开分支来做测试或开发，让这些流程不影响正式主机分支

```c
git branch 分支名//新建分支
git branch//查看当前有多少个分支
git checkout 分支名//切换到别的分支
git branch -d "分支名称"//删除分支，-D是强制删除
//如果你想创建一个新的分支同时切换到新创建的分支的话，可以通过 git checkout -b <your-branch-name> 来实现。
git merge 合并的分支名//提交新节点为合并分支，快转
git merge 要合并的分支名 --no-ff //合并分支，非快转

```



 **相对移动**

- 使用`^`向上移动1个提交记录
- 使用`~<num>`向上移动多个提交记录，如`~3`

可以直接使用 `-f` 选项让分支指向另一个提交。例如:

```
git branch -f main HEAD~3
```

上面的命令会将 main 分支强制指向 HEAD 的第 3 级父提交。





# git和github

- **Git**：一个分散式版本控制软件，可以由它产生一个储存库（git Repository）
- **Github**：支持git程序编程存取和远程托管储存库的平台服务

### 热门远程储存库

- **Github**：拥有GitHube Pages功能，可拥有私人数据库，免费方案是3人以下
- **Bitbucket**：可拥有私人数据库，免费方案是五人以下团队
- **GitLab**：自架Git服务器，有提供web视觉化管理界面，常用语企业内部开发







# 图形化git管理软件

SourceTree

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/202112071856448.png" alt="image-20211207185614938" style="zoom:25%;" />

新建-创建本地仓库的意思就是 git init

新建-添加已经存在的本地仓库：已经git init的文件夹添加进SourceTree



# win终端命令相关

[基本指令参考](#终端指令学习)

## 终端命令重命名

终端输入`$profile`查对应终端的配置文件所在,没有就自行新建

打开文件输入,格式:

```js
function 别名 { 需要替代的命令，可以包含空格 }
或者
function 名称 { 需要替代的命令，可以包含空格 }
Set-Alias 别名 名称
```

如:

```js
function sshLinux{
	ssh 'kylin@192.168.10.88' $args
}
Set-Alias sshlinux sshLinux
```

保存后重启power shell就可以使用别名了

## powershell新建文件命令

powershell基本指令大多与linux一致,但无touch命令

```powershell
 fsutil file creatnew 新建文件名 0
```

# 工具命令

##  ssh

ssh远程连接   `ssh 用户名@ip地址或域名`  

## scp

从服务器上下载文件   `scp username@servername:/path/filename /var/www/local_dir（本地目录）`

加上 `-r` 的参数才可以传目录

例如`scp root@192.168.0.101:/var/www/test.txt`  把192.168.0.101上的/var/www/test.txt 的文件下载到/var/www/local_dir（本地目录）

 上传本地文件到服务器  `scp /path/filename username@servername:/path   `

例如`scp /var/www/test.php  root@192.168.0.101:/var/www/`  把本机/var/www/目录下的test.php文件上传到192.168.0.101这台服务器上的/var/www/目录中

如果上传下载的是整个目录,`scp`后加 `-r` 

某些较新的系统scp命令默认使用SFTP协议来传输文件,但老系统却不支持sftp,此时使用`-O`使得scp变回传统传输行为

**sftp**

使用和scp类似,但功能更多

比如:SFTP支持断点续传，SCP则不能

# 代码调试

 **`打断点`**

- 集成开发环境IDE 
- gdb

**`printf`**    适用于有调试终端的情况

 **`写log日志`**    当应用程序没有终端的时候

- 应用程序发布了, 通过日志文件记录程序的工作状态

  ​	写日志有级别
  ​			级别越低写的日志越多
  ​			级别越高写的日志越少

# IDE相关tips

在用vs调试的时候: 若看到**无法解析的外部符号**就是没有函数的实现, 应该是没有连接到库

## vs开发linux项目

新建项目-跨平台-Linux-空项目

### VS远程开发

工具-选项-跨平台-连接管理器-添加(主机名填写ip,端口22,填写用户名与密码)-连接

项目属性页-配置属性-常规  中:

- 远程生成计算机选择上面添加的
- 远程生成根目录
- 远程生成项目目录

## vscode远程开发

Vscode 安装 `remote development`插件

安装后打开远程资源管理器,设置为ssh target,点击+号键,添加ssh目标.

右键ssh目标选择连接,输入密码,开始远程开发

### vscode配置C++调试

1. 编译的时候需要加`-g`选项,才会附带调试需要的信息

2. 点击左侧菜单栏中的`运行和调试`中的创建`launch.json文件`,如下图(非红圈)

   <img src="https://raw.githubusercontent.com/che77a38/blogImage2/main/202302192059807.png" alt="image-20230219205902832" style="zoom:25%;" />

   点击后会在项目根目录下生成`.vscode/launch.json`文件

3. 

## code runner配置

Code Runner默认运行是在输出端，是不能进行编辑输入的，所以我们要将其改到终端运行，打开VS Code设置，找到Run In Terminal配置处，将其勾选住，也可在设置的配置文件settings.json文件里添加"code-runner.runInTerminal": true配置，保存，我们再通过Code Runner运行，就可以在终端中运行了，可以在上面进行输入了。

## windows下的vscode终端乱码

VSCode 默认是 utf-8 编码，而在中国地区下的 Windows 的 cmd 默认是 GBK 编码,因此需要配置vscode终端为utf-8编码

通过`chcp` 命令查看代码页编号，

- `936` 对应 `GBK2312`
- `65001` 对应 `UTF-8`

文件-首选项-设置,点击右上角`打开设置(json)`,添加如下代码:

```json
"terminal.integrated.profiles.windows": {
    "Command Prompt": {
        "path": "C:\\Windows\\System32\\cmd.exe",
        "args": ["-NoExit", "/K", "chcp 65001 > nul"]
    },
    "PowerShell": {
        "source": "PowerShell",
        "args": ["-NoExit", "/C", "chcp 65001"]
    }
},
"terminal.integrated.defaultProfile.windows": "Command Prompt"
```

将以上配置添加在settings.json里最外层的{}里即可(注意！！！，如果{}里之前有内容记得要在最后一行加上一个英文逗号，之后再把配置复制进去)

## vscode的配置文件

安装并配置好C/C++插件后

- 编译的话配置`tasks.json`
- 【调试】启动的话配置`launch.json`

### tasks.json

**终端-配置任务**  生成tasks.json文件

下面为用clang++配置的任务,也可以改成调用make,cmake等构建工具

```cpp
{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "cppbuild",
			"label": "m1Mac单文件生成任务",
			"command": "/usr/bin/clang++",
			"args": [
				"-std=c++17",
				"-fcolor-diagnostics",
				"-fansi-escape-codes",
				"-g",
				"${file}",//此处为需要编译的源文件
				"-o",
				"${fileDirname}/${fileBasenameNoExtension}"
			],
			"options": {
				"cwd": "${fileDirname}"
			},
			"problemMatcher": [
				"$gcc"
			],
			"group": "build",
			"detail": "编译器: /usr/bin/clang++"
		}
	]
}
```

配置好以后使用 **终端-运行生成任务** 来调用该tasks.json配置的任务

### launch.json

**运行-添加配置**  生成launch.json文件(生成的launch文件中可以进一步点击`添加配置`按钮生成小模版)

launch.json参考如下:

```json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    "version": "0.2.0",
    "configurations": [
        {
            "name": "g++ - 生成和调试活动文件",// 配置名称，将会在启动配置的下拉菜单中显示
            "type": "cppdbg",// 配置类型，这里只能为cppdbg
            "request": "launch",// 请求配置类型，可以为launch（启动）或attach（附加）
            "program": "/home/hewei/桌面/课程七讲_源码/Class_7/build/my_cmake_exe",// 将要进行调试的程序的路径
            "args": [],// 程序调试时传递给程序的命令行参数，一般设为空即可
            "stopAtEntry": false, // 设为true时程序将暂停在程序入口处，我一般设置为true
            "cwd": "${fileDirname}",// 调试程序时的工作目录
            "environment": [],// （环境变量？）
            "externalConsole": false,// 调试时是否显示控制台窗口，一般设置为true显示控制台
            "MIMode": "gdb",// 指定连接的调试器，可以为gdb或lldb。但目前lldb在windows下没有预编译好的版本。
            // 用处未知，模板如此
            "setupCommands": [
                {
                    "description": "为 gdb 启用整齐打印",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                },
                {
                    "description": "将反汇编风格设置为 Intel",
                    "text": "-gdb-set disassembly-flavor intel",
                    "ignoreFailures": true
                }
            ],
            // 调试会话开始前执行的任务，一般为编译程序。与tasks.json的label相对应
            //"preLaunchTask": "C/C++: g++ bulid active file",
            "miDebuggerPath": "/usr/bin/gdb"// 调试器路径，Windows下后缀不能省略，Linux下则去掉
        }
    ]
}
```

[vscode其他配置文件细节参考跳转](https://blog.csdn.net/weixin_43687811/article/details/122744673)

[参考2](https://lzyws739307453.blog.csdn.net/article/details/123605259)

#### 案例

m1 mac上的launch.json案例

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(lldb) 启动",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}",
            "args": ["-std=c++17"],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "lldb"
        }

    ]
}
```

设置好后,点击调试按钮进行调试

# 代理相关

## 代理模式

- 系统代理

  将数据交给本地http/socks服务的系统代理,GFW可以判断得到是vpn链接发起请求,由于其处于灰色地带,正规途径有需要,因此会放行,但特殊时期可能阻断

  问题:并非所有软件都遵循系统代理,除去浏览器,绝大部分软件都不会走系统代理,甚至连设置代理的地方都没有,行为完全取决于软件开发者.并且系统代理一般都是http代理而非socks5,http代理不支持udp,游戏等流量无法代理

- TUN/TAP代理(最常用)

  使用虚拟网卡接管系统全局流量的tun/tap代理

  主流模式,手机默认就是这种模式,软路由接管全家科学上网也是同样的原理(称为透明代理)

  问题:我们使用的ss,vmess,trojan等主流的翻墙协议都无法封装网络层的数据包,比如tun模式,ping谷歌的话,返回假延迟,因为上述协议无法代理网络层的icmp协议

- 真VPN代理

  能封装网络层数据包,只有能封装网络层数据包,才能实现异地组网,内网穿透,才能称为真正的VPN
  
  软件一般是用WireGuard,可以正常ping外网地址
  
  问题:并非为翻墙而生,只是对数据进行加密顺便实现了翻墙功能,他的流量清晰明了地写着它就是VPN的流量.而且vpn分流很不方便.因此不推荐用来科学上网
  
  ![image-20230722105912700](https://raw.githubusercontent.com/che77a38/blogImage2/main/202307221059694.png)

SS协议  --减少GFW重放攻击->  SSR协议(带伪装插件的SS协议)

SSR协议

> DNS泄露:clsh使用了ip规则进行分流的情况下,访问谷歌之前必须先得到谷歌的ip地址,于是clash发起dns请求,dns如果是明文的,那么当你要到谷歌ip的时候,马上给其他服务器发了一堆加密数据,该行为特征,鬼都知道你在干啥.再比如:网飞客户端偷偷发一个dns请求,权威dns服务器记载的这个dns请求的上游dns服务器所在地就会和代理服务器的上游dns服务器所在地不是一个地区,以此判定你在使用vpn工具
>
> DNS泄露的本质原因:在代理的情况下,本地发出了dns请求,而这可能仅仅是为了获得ip匹配clash规则中的ip分流规则,实际上真正的dns解析依旧会在远程代理服务器上进行.
>
> 解决方案:fake-ip模式:[当我们使用Fake-IP模式时（openclash运行在路由器上），浏览器请求dns解析，dns解析请求被clash截获，clash立刻返回一个Fake IP给浏览器，浏览器根据ip发起连接，请求被clash拦截，clash根据fake ip在自己的映射表中反查出域名，再用域名去走代理，代理服务器解析dns。](https://www.hughh.top/posts/soft-routing-guide-3/)[3](https://www.hughh.top/posts/soft-routing-guide-3/)[ 这样客户端响应速度加快，浏览体验更加顺畅，减轻网页加载时间过长的情况。](https://github.com/vernesong/OpenClash/wiki/常规设置)[4](https://github.com/vernesong/OpenClash/wiki/常规设置)



软件层面  v2rayN -> shadowsocks -> 

## DNS分流



## UDP穿透篇
