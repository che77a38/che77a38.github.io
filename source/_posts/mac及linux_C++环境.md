---
title: mac及linux C++环境配置
tags: C++
categories: 技术


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

| 功能                               | 快捷键              |
| ---------------------------------- | ------------------- |
| 转到文件                           | command+p           |
| 命令面板                           | F1                  |
| 打开/跳转到终端                    | ctrl+·              |
| 变量统一重命名                     | F2                  |
| 开关侧边栏                         | command+b           |
| 转到定义处                         | F12                 |
| 代码格式化                         | shift+alt+f         |
| 当前行下方插入一行                 | command+enter       |
| 当前行上方插入一行                 | command+shift+enter |
| 定义处缩略图(只看一眼而不跳转过去) | alt+F12             |
| 删除当前行光标右侧所有的字符       | command+delete      |
| 多光标同时输入                     | alt+左键            |
| 同时选中所有匹配                   | command+shift+L     |
| 回到上一个光标操作                 | command+U           |
| 整个项目中查找                     | command+shift+F     |
| 全屏                               | F11                 |
| 字体和窗口大小调整                 | command+“+/-”       |
| 撤销                               | command+z           |
| 恢复撤销                           | command+shift+z     |
| 单步步过                           | F10                 |
| 单步步入                           | F11                 |

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

安装好开发环境后，当输入make命令时，会在当前目录下找makefile文件来执行。

**为什么要学习makefile**

- linux下C/C++编程 makefile应用广泛
- 编译移植开源项目，大部分开源项目都基于makefile，学会makefile才能够调试编译过程中的问题
- 手写makefile太过于繁琐，自动生成的makefile不易于配置，学习本门课程便携自动化makefile，以后新项目只需要includemakefile头文件
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
| -llibrary        | （library表示具体库的名字）在编译链接文件时，增加一个额外的库，库名为liblibrary.so |
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

## GDB调试器

- GDB（GUN Debugger）是一个用来调试C/C++程序的功能强大的调试器，是LINUX系统开发C/C++最常用的调试器

- 程序员可以使用GDB来跟踪程序中的错误，从而减少程序员的工作量

- Linux开发C/C++一定要熟悉GDB

- VSCode是通过调用GDB调试器来实现C/C++的调试工作的

  Windows系统中，常用的集成开发环境（IDE),如VS,VC等，它们内部已经嵌套了相应的调试器

### GDB主要功能

- 设置断点（断点可以是条件表达式）
- 使程序在指定的代码行上暂停执行，便于观察
- 单步执行程序，便于调试
- 查看程序中变量值的变化
- 动态改变程序的执行环境
- 分析崩溃程序产生的core文件

### 常用调试命令参数

调试开始：执行`gdb [exefilename]`，进入gdb调试程序，其中exefilename为要调试的可执行文件名

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

1. 编译程序时需要加上-g，之后才能用gdb进行调试：`gcc -g main.c -o main`
2. 回车键：重复上一命令

## makefile基本格式

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

![image-20211224202502589](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112242025323.png)

**makefile文件主要包含了5部分内容**：

1. **显示规则**。说明了如何生成一个或多个目标文件。由makefile文件的创作者指出，包括要生成的文件，文件的依赖文件，生成的命令
2. **隐式规则**。由于make有自动推导的功能，所以隐式的规则可以比较粗糙地简略书写makefile文件，这是由make所支持的。
3. **变量定义**。在makefile文件中要定义一系列的变量，变量一般都是字符串，这与C语言中的宏有些类似。当makefile文件执行时，其中的变量都会扩展到相应的引用上。
4. **文件指示**。其中包含3个部分，（1）在一个makefile文件中引用另一个makefile文件；（2）根据某些情况指定makefile文件中的有效部分；（3）定义一个多行的命令
5. **注释**。makefile文件中只有行注释，其注释用“#”字符。如果要在makefile文件中使用“#”字符，可以用反斜框进行转义，如:"\\#"

## makefile中的变量

主要有以下4种

1. 系统自带变量
2. 手动定义变量
3. make传递变量
4. 自动推理参数设置

GUN的make很强大，它可以自动推导文件以及文件依赖关系后面的命令，于是我们就没必要去在每一个[.o]文件后都写上类似的命令，因为，我们的make会自动识别，并自己推导命令。只要make看到一个[.o]文件，它就会自动的把[.c]文件加在依赖关系中，**如果make找到一个whatever.o，那么whatever.c，就会是whatever.o的依赖文件。并且gcc -c whatever.c也会被推导出来**

正是因为强大的自动推导功能，因此依赖项写成.o文件后，就可以一条命令搞定整个编译过程

**makefile中常见预定义变量**

![image-20211224164553549](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112241646051.png)

p.s.CXXFLAGS=-I../inc		表示头文件的路径在当前源文件的父文件夹中的inc文件夹中

**在makefile中变量的用法**：$(变量名)

![image-20211224204554371](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112242045930.png)

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

## makefile的常见函数

- wildcard函数    当前目录下匹配模式的文件    例如：src=$(wildcard *.c)

- notdir函数    去除路径    例如：$(notdir $src)

- patsubst函数    模式匹配替换    例如：$(patsubst%.c,%.o,$src)

  ​    等价于$(src:.c=.o)

- shell函数    执行shell命令    例如$(shell ls -d */)

```makefile
#生成的目标文件名
TARGET=main
#可以设定CXX(库可以直接加在这句中，如下list库，-g表示调试也可以加在这句中)
#CXX=g++ -g -llist
#依赖文件.o(自己写的)
SRCS=$(WILDCARD *.cpp)
#上面与下面同理
#SRCS=$(shell ls *.cpp)
#下面的可以遍历所有子目录中的.cpp
#SRCS=$(shell find ./ -name '*.cpp')
OBJS=$(SRC:.cpp=.o)
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

# cmake学习

- CMake是一个跨平台的安装编译工具，可以用简单的语句来描述所有平台的安装(编译过程)。
- CMake可以说已经成为大部分C++开源项目标配

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

  语法：include_directories([AFTER | BEFORE] [SYSTEM] dir1 dir2 ...)

  ```cmake
  将/usr/include/myincludefolder 和 ./include 添加到头文件搜索路径
  include_directories(/usr/include/myincludefolder ./include)
  ```

- **`Link_directories`**==向工程添加多个特定的**库文件搜索路径**---》相当于指定g++编译器的-L参数

  语法：link_directories(dir1 dir2 ...)

  ```cmake
  #将/usr/lib/mylibfolder 和 ./lib 添加到库文件搜索路径
  link_directories(/usr/lib/mylibfolder ./lib)
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

  语法：target_link_libraries(target library1<debug | optimized> library2...)

  ```cmake
  #将hello动态库文件链接到可执行文件main
  target_link_libraries(main hello)
  ```

- **`add_subdirectory`**==向当前工程添加存放源文件的子目录，并可以**指定中间二进制和目标二进制存放的位置**

  语法：add_subdirectory(source_dir [binary_dir] [EXCLUDE_FROM_ALL])

  ```cmake
  #添加src子目录，src中需有一个CMakeLists.txt
  add_subdirectory(src)
  ```

- **`Aux_source_directory`**==发现一个目录下**所有的源代码文件并将列表存储在一个变量中**，这个指令临时被用来自动构建源文件列表

  语法：aux_source_directory(dir VARIABLE)

  ```cmake
  #定义SRC变量，其值为当前目录下所有的源代码文件
  aux_source_directory(. SRC)
  #编译SRC变量所代表的的源代码文件，生成main可执行文件
  add_executable(main ${SRC})
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

cmake tools是让vs code支持cmake的插件

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

![image-20220117153415398](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202201171534397.png)

红色框中是原有的文件，紫色框中的是内部构建生成的,可以看到非常乱

外部构建后（还未执行`make`）如图：

![image-20220117155157081](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202201171551365.png)

cmake的产物都放到build文件夹下了，整洁了很多 ，如果之后执行`make`，生成的可执行文件也会在build文件夹下

### 多目录工程-直接编译

项目结构如下：

![image-20220117162108450](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202201171621715.png)

CMakeLists.txt如下：

```cmake
cmake_minimum_required(VERSION 3.0)

project(TESTCMAKE)

INCLUDE_DIRECTORIES(include)

add_executable(main_cmake main.cpp src/tool.cpp)
```

操作如下：

![image-20220117162245705](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202201171622366.png)

`make`后结构如下：

![image-20220117162516558](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202201171625167.png)

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

![image-20220119163310314](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202201191633093.png)

**【超级重点】：必须在编辑框显示源文件的情况下点击这个按钮**

![image-20220119201327676](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202201192013927.png)

**CodeLLDB（用来debug，解决Catalina不支持lldb调试问题）**

**Mac在更新到Catalina后不再支持lldb调试**,即C++(GDB/LLDB)无效，因此下载CodeLLDB插件，也因此上图选择LLDB按钮。

![image-20220119201249218](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202201192012644.png)

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

![](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112071513124.png)

![image-20211207151102904](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112071511344.png)

[git学习网站]: https://learngitbranching.js.org/?locale=zh_CN

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

![image-20211207131020235](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112071310206.png)

## 上传指令

1. 初始化git数据库：git init

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

2. 查询当前状态：git status

3. 将有修改的档案加入到索引（暂存区）：git add .

4. 将索引档案变成一个更新(COMMIT):git commit -m "修改内容的描述"

5. 观察commit历史记录：git log

6. 下载远程数据库：git clone 数据库网址

7. 更新远程数据库：git push origin master

```c
//上传步骤
git add .//添加当前目录的所有文件到暂存区
git commit -m "修改内容的描述"
git push <远程主机名> <本地分支名>:<远程分支名>
//如果本地分支名与远程分支名相同，则可以省略冒号：
git push <远程主机名> <本地分支名>
```

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
- HEAD：当下的版本位置
- origin：默认远程储存库
- 回到某个版本内容：git  checkout commit编号
- 返回最新的版本：git checkout master(分支名称)

```c
git log//查看当前所有的commit编号
git checkout 想回到的commit节点的哈希值//返回到指定哈希值的commit节点
//Git 对哈希的处理很智能。你只需要提供能够唯一标识提交记录节点的前几个字符即可
```

![image-20211209200758510](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112092007970.png)

commit编号就是个哈希值

![image-20211209202104826](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112092021609.png)

git checkout commit编号与直接在上图左侧双击commit行均为使得文件恢复到与commit时的样子，二者效果一致。

### 还原技巧

![src=http___upload-images.jianshu.io_upload_images_4311354-6a4562939fec66c0.png&refer=http___upload-images.jianshu](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112101443772.jpeg)

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

![image-20211210151213508](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112101512015.png)![image-20211210151908657](https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112101519242.png)

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

<img src="https://gitee.com/ZEROKO14/blog-img/raw/master/img/202112071856448.png" alt="image-20211207185614938" style="zoom:25%;" />

新建-创建本地仓库的意思就是 git init

新建-添加已经存在的本地仓库：已经git init的文件夹添加进SourceTree





