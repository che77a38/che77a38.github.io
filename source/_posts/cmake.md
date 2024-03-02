---
title: cmake
tags: cmake
categories: 技术
mathjax: true
abbrlink: 233853f2
date: 2020-10-23 22:51:13
---

CMake是用于构建，测试，和软件打包的**开源**跨平台工具

<!-- more -->

# Linux，Windows，和macOS系统中库的名称

## Windows

windows下的库文件（下面非必须，只是大部分开源库的习惯）

库文件包含静态库和动态库，而windows版本的静态库和动态库又各自有Release

**静态库**

- `库名.lib`是 release 模式下生成的库文件，用于发布版本；经过了优化的，并不包含调试信息
- `库名_d.lib`或`库名d.lib`是 debug 模式下生成的库文件，用于调试版本。debug 模式下生成的库文件包含了额外的**调试信息**，以方便调试程序时进行源码级别的跟踪

**动态库**

同时生成两个文件，二者是关联的    

- `库名.lib`（文件很小，不包含真正的源代码，只在编译阶段需要用到）  函数地址索引
- `库名.dll`      函数二进制代码

> 在Windows平台上编译动态链接库时，通常会生成一个.lib文件和一个.dll文件。其中，.lib文件用于编译阶段的链接，动态链接库的实际代码和数据存放在.dll文件中。因此，.lib文件只在开发环境中使用，用于指示应用程序在运行时需要加载和使用哪个动态链接库，并提供符号和函数等信息。
>
> 在发布二进制程序包时，可以不必包含.lib文件，因为用户运行程序时已经没有必要再链接动态库了。可以将.dll文件单独打包或放在系统路径或应用程序路径下，供程序运行时动态链接使用。因此，可以直接删除动态库生成的.lib文件，而保留.dll文件即可。

## Linux

linux/mac下静态库没有windows上Debug和Release的区分（LINUX包含Android，鸿蒙这种以linux为内核的系统）

- 静态库为  `lib库名.a`   如 `libxlog.a`
- 动态库为   `lib库名.so`     如 `libxlog.so`    格式： `libname.so.主版本号.次版本号.发行版本号`

使用库的时候，对静态库和动态库其实是无感的，有静态库链接静态库，有动态库链接动态库。链接什么库，主要是跟库的路径相关

## macOS

- 静态库为  `lib库名.a`   如  `libxlog.a`
- 动态库为   `lib库名.dylib`     如 `libxlog.dylib`   (注意与linux不同)

**大部分商业库在没有授权的情况下是不允许使用静态链接的，静态链接属于侵权。因为静态库看不出来用哪一个库。**

静态库：缺点：程序会比较大，会涉及版权问题，会拖慢编译速度，仅windows涉及的一个问题（如下）

​	windows中线程库的静态和动态都有Debug和Release两个版本，你的库链接了线程静态库的Debug版本，别人程序本身链接了线程静态库Release版本，还链接了你的动态库会产生冲突问题 ，不是同一个Release/Debug版本时候可能会产生冲突。因为Debug和Release版本的线程库可能有不同的实现和接口，链接时也存在不同的调试符号和优化选项，如果将一个使用Debug版本的库和一个使用Release版本的库链接在一起，可能会导致程序出现各种难以预料的错误。

优点： 不需要环境提前具备动态库

# Cmake

CMake是用于构建，测试，和软件打包的**开源**跨平台工具

**持续集成**

- 每次集成都通过自动化的制造（包括提交，发布，自动化测试）来验证，准确地发现集成错误
- 快速错误，每完成一点更新，就集成到主干，可以快速发现错误，定位错误也比较容易
- 各种不同的更新的主干，如果不经常集成，会导致集成的成本变大
- 让产品可以快速地通过，同时保持关键测试合格
- 自动化测试，只要有一个测试用例不通过就不能集成
- 集成并不能删除发现的错误，而是让它们很容易和改正

## Cmake特性

- 自动搜索可能需要的程序，库和头文件的能力
- 独立的构建目录，可以安全清理
- 创建复杂的自定义命令（例如 qt moc uic）
- 配置时选择可选组件的能力
- 从简单的文本文件（CMakeLists.txt）自动生成工作区和项目的能力
- 在静态和共态构建之间轻松切换的能力
- 在大多数平台上自动生成文件依赖项并支持并行构建
- 每个IDE都支持CMake（CMake支持几乎所有IDE）
- 使用 CMake 的软件包比任何其他系统都多

## 安装

两种安装方式

- 源码编译安装
- 二进制文件直接安装

### **源码编译安装流程**

ubuntu系统为例：

**安装编译工具和依赖库**

- `sudo apt install g++`
- `sudo apt install make` 或 `apt install ninja-build`
- `sudo apt install unzip`
- `sudo apt install libssl-dev`  （openssl是个加解密工具，这里只安装他的库）

**下载解压cmake源码并编译**

1. 下载`wget https://github.com/Kitware/CMake/releases/download/v3.23.1/cmake-3.23.1.tar.gz`
2. 解压`tar -xvf cmake-3.2 1.tar.gz`
3. `cd cmake-3.2 1`
4. 执行`./configure`生成makefile(几乎所有开源软件，如果不支持cmake都是使用这个)
5. 编译源码： `make -j32`  （`-j32`32线程编译）

**安装编译好的cmake**

安装编译好的cmake `sudo make install`   （默认安装路径在`/usr/local/share/cmake-3.23`）

**设置cmake的运行路径**

1. `vi ~/.bash_profile`
2. 文件中添加 `export PATH = /usr/local/share/cmake-3.22:$PATH`

**运行cmake查看版本** 

`cmake --version`

## 可执行程序功能

- `cmake.exe` 用于生成
- windows用`cmake-gui.exe`图形化界面，linux用`ccmake.exe`在控制台下提供一个类图形化界面
- `cpack.exe`用于打包
- `ctest.exe`用于测试

## cmake如何执行编译功能

1. **`cmake -S . -B build [-G "可以指定使用nmake/ninja/Xcode等等其他编译工具"]`**       生成编译需要的文件 ，-S表示source，源文件位置，-B表示生成的makefile，vs项目，ninja，nmake，xcode项目等文件生成的位置，指定的文件夹会自动生成(例子中是build目录)         

   **windows**下生成的是vs项目，如果想使用nmake也可以。nmake用于windows（类似make），但只能在`x64 Native Tools Command Prompt for VS 2019`程序中使用才能识别该指令

   **mac**下也可以通过`-G Xcode`指定生成xcode项目，然后可以使用`cmake --open 之前-B指定的位置` 方式用xcode打开项目。如果在执行`cmake -S . -B build -G "Xcode"`的情况下出现找不到C与C++项目，需要执行 `sudo xcode-select --switch /Applications/Xcode.app/`,就不会再报该错误；还不行就执行`cmake -S . -B build -DCMAKE_C_COMPILER=/usr/bin/clang -DCMAKE_CXX_COMPILER=/usr/bin/clang++`手动指定编译器路径，clang编译器路径使用`which clang`查询

2. **`cmake --build build --config Release [-j32]`**      通用的编译生成目标文件命令（替代统一make等的指令），build表示生成到build文件夹中，`--config`可以设置编译成Release版本或者Debug版本，`-j32`表示32线程编译

3. **`cmake --install build`**   将已经构建好的程序、库或头文件等文件安装到指定的目录下。这个命令会自动根据 `CMakeLists.txt` 文件中的指令来安排需要安装哪些文件，以及将它们复制到哪个目录下。

windows中文件名大小写不敏感，而linux中文件名大小写敏感，但是cmake做了处理，统一大小写不敏感。
$$
标准的cmake文件名：      CMakeLists.txt
$$

## 通用动态库头文件格式

由于windows中含有独有指令`__declspec(dllexport)`和`__declspec(dllimport)`，并且需要有`__declspec(dllexport)`标记的内容生成动态库时才会生成lib文件，而其他平台均不需要，因此头文件这么编写可以通用

```cpp
//xlog.h
#pragma once
//__declspec(dllexport)  导出XLog类的函数到lib文件中，不加这个的话，生成动态库的时候不会附带生成lib文件(只在windows下有效)
//xlog库文件调用 dllexport
//test_xlog调用 应该是dllimport，不然也会生成test_xlog.lib
#ifndef _WIN32 //_WIN32实际上包含win32和win64
//不是win32为空
    #define DECLSPEC_API
#else
    #ifdef xlog_STATIC//xlog_STAITC需要由cmake手动传入
        #define DECLSPEC_API
    #else
        #ifdef xlog_EXPORTS
            #define DECLSPEC_API __declspec(dllexport)//库项目调用
        #else
            #define DECLSPEC_API __declspec(dllimport)//调用库项目调用
        #endif
    #endif
#endif
class DECLSPEC_API XLog
{
private:
    /* data */
public:
    XLog(/* args */);
};
```

## CMake注释

- **括号注释**    `cmake3.0`开始引入的括号注释，格式：`#[[   注释内容   ]]`
- **行注释**   `#`行注释，一直注释到行尾

## CMake message

### 基础语法

格式：`message([mode] arg1 arg2 arg3 ...)`    **空格分隔**。输出会以**拼接参数**的形式进行输出，并在最后进行换行，例子如下：

如: `message("参数1" "参数2" "参数3" "参数4")`   输出为： `参数1参数2参数3参数4`

### 日志级别

**message用可省略的mode参数指定该内容显示的日志级别**  如： 

```cmake
message(FATAL_ERROR "test fatal_error")  #指定该日志为FATAL_ERROR日志级别，该级别会停止cmake运行和生成
message("after FATAL_ERROR")
#只会打印test fatal_error，不会打印after FATAL_ERROR
```

调用cmake时可以添加日志打印参数  **`--log-level=<ERROR|WARNING|NOTICE|STATUS|VERBOSE|DEBUG|TRACE>`**  ,不填写的话**默认为`STATUS`级别**

指定显示的日志级别为`TRACE`的例子：`cmake -S . -B build --log-level=TRACE`

日志级别由低到高的，**指定高级别会同时打印比他低的级别**。

**日志级别（由低到高）**

1. **`FATAL_ERROR`**     **停止cmake运行和生成**   打印到stderr
2. **`SEND_ERROR`**     cmake**继续运行，生成跳过**   打印到stderr
3. **`WARNING`**      包含`WARNING级别`**此处上面的级别会同时打印代码路径和行号**   打印到stderr
4. **`不设置 或者 NOTICE`**    打印到stderr     （此级别到TRACE级别不会同时打印代码路径和行号）   打印到stderr
5. **`STATUS`**   项目用户可能感兴趣的信息    **这个等级往下打印消息前会添加前缀`--`**   打印到stdout
6. **`VERBOSE`**  针对项目用户的详细信息   **从这里往下调用cmake不指定--log-level默认不显示消息**   打印到stdout
7. **`DEBUG`**   项目本身的开发人员使用的信息   打印到stdout
8. **`TRACE`**   非常低级实现细节的细粒度信息   打印到stdout

如果执行`cmake -S . -B build >log.txt`是默认把**标准输出stdout**重定向到log.txt文件

- `1` 表示 `stdout`  
- `2` 表示 `stderr`

**`cmake -S . -B build >log.txt 2>&1`** 可以同时把标准输出stdout和标准错误输出stderr重定向到log.txt，Windows/Linux/Mac通用

#### message Reporting checks查找库日志

`Reporting checks` 是一种常见的消息类型，用于报告检查的结果，例如 *检查依赖项是否满足条件* 或 *检查编译器和构建环境* 或 *报告其他构建选项和参数* 等

关键词

- **`CHECK_START`**    开始记录将要执行检查的消息
- **`CHECK_PASS`**   记录检查的成功结果
- **`CHECK_FAIL`**    记录检查的失败结果

案例：

```cmake
message(CHECK_START "查找xcpp")
#设置message消息缩进
set(CMAKE_MESSAGE_INDENT "--")
#查找库的代码
#嵌套查找
    message(CHECK_START "查找xlog")
    #查找库的代码
    message(CHECK_PASS "成功")
    #取消message消息缩进
    set(CMAKE_MESSAGE_INDENT "")
message(CHECK_FAIL "失败")
```

## cmake变量

### 设置变量

set关键字

`set(<variable>  <value>)`  将变量`<variable>`的值设置为`<value>`

如果没有指定 `value`，那么这个变量就会被撤销而不是被设置，也可以用 `unset(<variable>)`撤销变量

### 变量使用

使用方式   `${变量名}`

- 变量引用是**值替换**，如果未设置变量，返回空字符串
- 变量引用**可以嵌套**并从内向外求值
- 变量名大小写敏感
- **普通变量的作用域是自身和子目录**   p.s.子目录1中设置的变量，主目录和子目录2都无法访问

```cmake
set(VAR1 "测试变量VAR1的值")
message("VAR1=" ${VAR1})
message("\${VAR1}=${VAR1}")
set(VAR2 "VAR1")
message("\${VAR2}=${${VAR2}}")  #嵌套
unset(VAR1)   
message("\${VAR1}=${VAR1}")
#输出结果如下
VAR1=测试变量VAR1的值
${VAR1}=测试变量VAR1的值
${VAR2}=测试变量VAR1的值
${VAR1}=
```

[缓存变量跳转](#变量和缓存)

**通过变量让message输出不同的颜色**

终端的颜色格式   ：   `Esc的ASCII字符[显示方式;前景色;背景色m`  内容   `Esc的ASCII字符[m`     中间的内容会被设置为对应颜色和显示方式

 如：`\033[1;31;40m`   红色内容黑色背景     `\033[m`

| 显示方式值 | 对应的显示方式含义 |
| ---------- | ------------------ |
| 0          | 终端默认设置       |
| 1          | 高亮显示           |
| 4          | 使用下划线         |
| 5          | 闪烁               |
| 7          | 反白显示           |
| 8          | 不可见             |

```cmake
#红色：Esc[0;31m
string(ASCII 27 Esc)
set(R "${Esc}[0;31m")
#尾：Esc[m
set(E "${Esc}[m")
#高亮，蓝色字体，黑色背景
set(B "${Esc}[0;34;40m")
message("${R}红色内容${E}")
message("${B}蓝色内容${E}")
```

### cmake内建变量

- 提供信息的变量

  **`PROJECT_NAME`**   project()设置的项目名称

- 改变行为的变量

  **`BUILD_SHARED_LIBS`**  设置为ON使add_library()默认构建动态库，设置为OFF默认构建静态库

- 描述系统的变量

  **`CMAKE_SYSTEM_NAME`**   记录系统名

- 控制构建过程的变量

  **`CMAKE_COLOR_MAKEFILE`**    生成的makefile是否有自带的颜色，ON/OFF控制（默认ON）

## cmake include

```cmake
include("cmake/test_cmake.cmake")
include("cmake/test_cmake.cmake" OPTIONAL)#OPTIONAL 可选，文件不存在不会报错
include("cmake/test_cmake.cmake" OPTIONAL RESULT_CARIABLE ret)#RESULT_CARIABLE 返回值会返回到ret变量中，成功会返回导入文件的绝对路径，失败会返回NOTFOUND
```

include导入的文件本质也就是**文本替换**

## 命令构建指定项目和清理

预处理   ->  编译   ->  汇编   ->  链接   ->  运行  

`cmake --build build --target help`  可以**查看所有目标**，如下：

```shell
The following are some of the valid targets for this Makefile:
... all (the default if no target is provided)
... clean
... depend
... edit_cache
... rebuild_cache
... first_cmake
... first_cmake.o
... first_cmake.i
... first_cmake.s
```

1. `预处理`： `cmake --build build --target first_cmake.i`   
2. `编译`： `cmake --build build --target first_cmake.s`   
3. `汇编`:   `cmake --build build --target first_cmake.o`   

清理： `cmake --build build --target clean`   **通用各种编译工具的清理目标文件的清理**   

## 调试打印生成的具体指令

```cmake
#打印详细的生成指令的开关变量，默认是OFF
set(CMAKE_VERBOSE_MAKEFILE ON)     #名字里虽然包含makefile，但是其实都可以
```

`cmake --build . -v`   可以直接打印详细的生成指令，相当于临时在CMakeLists.txt中添加上面的语句

## 设置输出路径

| 输出路径         | 控制变量                       | 控制输出什么                                                 |
| ---------------- | ------------------------------ | ------------------------------------------------------------ |
| 库输出路径       | CMAKE_LIBRAR_OUTPUT_DIRECTORY  | **linux动态库.so**   (该变量在windows中是设置了也无效的)     |
| 归档输出路径     | CMAKE_ARCHIVE_OUTPUT_DIRECTORY | **windos静态库.lib**和**windows动态库地址.lib**和**linux静态库(.a)**和**静态库的PDB调试文件** |
| 执行程序输出路径 | CMAKE_RUNTIME_OUTPUT_DIRECTORY | **执行程序**和**dll动态库**和**可执行程序以动态库的PDB调试文件** |

库输出路径和归档输出路径一般设置为一个路径

```cmake
#库输出路径：
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_CURRENT_LIST_DIR}/lib")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_LIST_DIR}/lib")
#执行程序生成路径:
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_LIST_DIR}/bin")
```

待解决问题：

- 多个项目想要有不同的输出路径
- Debug和Release不同输出
- 一个项目同时要生成静态库和动态库，静态库需要传递宏`-Dxlog_STATIC`，动态库却不需要

## CMake主要语法

### if控制流程

```cmake
if(<条件>)
	<commands>
elseif(<条件>)#可选的块，可被重复
repeated
	<commands>
else()			  #可选的块
	<commands>
endif()
```

**条件**真假规则如下：

- 1,ON,YES,TRUE,Y,或非零数(包括浮点数),则为**真**
- 0,OFF,NO,FLASE,N,IGNORE,NOTFOUND,空字符串,空,或以后缀结尾-NOTFOUND则为**假**
- 非假值常量为**真**，**未定义和其他变量为假**，**环境变量总为假**
- 字符串的值是常量真则为**真**，其他带引号的字符串始终计算为**假**

if判断语句

- 一元判断

  EXISTS     COMMAND    DEFINED

  ```cmake
  if(DEFINED VAR_DEF)#判断VAR_DEF变量是否被定义
  ```

- 二元判断

  - 只能判断数字或数字字符串：EQUAL   LESS   LESS_EQUAL   GREATER  GREATER_EQUAL

  - 判断字符串(也能判断数字 )：STREQUAL   STRLESS  STRLESS_EQUAL   STRGREATER   STRGREATER_EQUAL

  - 版本比较：VERSION_EQUAL   VERSION_LESS   VERSION_LESS_EQUAL   VERSION_CREATER   VERSION_CREATER_EQUAL

  - 正则表达式匹配：MATCHES  

    ```cmake
    if("abcd" MATCHES "^[a-z]+$")#判断abcd字符串是否全是小写字母
    ```

- 存在性检查

支持使用**逻辑运算符**：与或非，**AND  OR  NOT**

> if语句的问题：
>
> - 判断语句过长
> - 无法嵌入到其他功能函数中

### 变量和缓存

缓存变量可以**持久的存在**

- 设置过后哪怕是设置语句去除也可以正常使用该缓存变量
- 缓存变量第二次修改不生效
- **普通变量的作用域是自身和子目录**，**缓存变量的作用域是全局的**
- 缓存变量最大的作用是让用户可以选择一些变量的设置

缓存变量的语法：  `set(<variable><value>...CACHE<type><docstring>[FORCE])`

FORCE表示强制修改，同一个缓存变量多次设置无效，该关键词可以让他强制修改

docstring：说明，鼠标放在项上显示的内容

type有如下几种，主要用于使得图形化界面可以提供对应的输入方式

1. `BOOL`     ON/OFF选择框
2. `FILEPATH`     文件选择
3. `PATH`     目录选择
4. `STRING`     一行字符串
5. `INTERNAL`     一行字符串不会开放给用户来设置的内部变量，图形化界面无法看到该选项

```cmake
set(VAR1 "CACHE VAR1 VALUE" CACHE STRING "cache doc")#设置缓存变量，字符串类型，说明为：cache doc
set(VAR1 "CACHE VAR1 VALUE CHANGED" CACHE STRING "cache doc")#缓存变量第二次修改不生效
message("VAR1=${VAR1}" )
set(VAR1 "CACHE VAR1 VALUE CHANGED FORECE" CACHE STRING "cache doc" FORCE)#缓存变量强制修改
message("VAR1=${VAR1}" )
#输出如下：
VAR1=CACHE VAR1 VALUE
VAR1=CACHE VAR1 VALUE CHANGED FORECE
```

大部分场景使用的都是BOOL类型，cmake提供了更简单的方式:  `option(选项的键 “说明” ON/OFF)`   如：`option(OPT1 "opt1 doc" ON)`

```cmake
set(VAR1 "CACHE VAR1 VALUE" CACHE STRING "cache doc")#设置缓存变量，字符串类型，说明为：cache doc
set(VAR_BOOL "ON" CACHE BOOL "cache doc")
set(VAR_PATH "path" CACHE PATH "cache doc")
set(VAR_FILE "file path" CACHE FILEPATH "cache doc")
option(OPT1 "opt1 doc" ON)
```

在windows中使用`cmake-gui`，如果在linux控制台下使用`ccmake`

`ccmake build`

访问缓存变量的特殊方式：  **`$CACHE{变量名}`**    用于普通变量和缓存变量同名的情况下指定访问缓存变量

#### 缓存变量覆盖策略设置

VERSION 3.21版本开始的新功能

设置cache变量覆盖策略：  **`cmake_policy(SET CMP0126 NEW/OLD)`**

- 当次政策设置为**NEW**时，set设置cache变量时不会从当前范围中删除任何同名的普通函数
- **OLD**策略，set设置cache变量时会从当前范围中删除同名普通函数

#### 命令行传递缓存变量

关键词 **`-D key=value`**

如：  `cmake -S . -B build -D PARA1=para001`

如果是用该命令对已存在的缓存变量进行修改，相当于加上了FORCE强制修改

**缓存变量的缺陷：一经设置，不强制修改的情况下无法修改，因此很容易出错**

[cmake属性也可以设置命令行传递参数给源文件](#属性分类)

#### cmake属性

属性是**作用域为目标的变量**

属性就相当于成员变量

全局属性就是一个没有缓存的全局变量

##### 属性语法

**set_property**

设置属性

语法：  方括号[]: 表示可选参数           尖括号<>: 表示必填参数

```cmake
set_property(<GLOBAL | DIRECTORY [<dir>] | TARGET [<target1>...] | SOURCE [<src1>...][DIRECTORY <dirs>...]  [TARGET_DIRECTORY <targets>...] | INSTALL[<file1>...] | TEST [<test1>...] | CACHE [<entry1>...] > 
[APPEND]#以数组的方式追加，其实就是;分隔
[APPEND_STRING]#直接追加的文本,字符串拼接
PROPERTY <name> [<value1>...]
)
```

**get_property**

获取属性

```cmake
get_property(<variable> <GLOBAL |DIRECTORY [<dir>] | TARGET <target> |SOURCE <source> [DIRECTORY <dir> |TARGET_DIRECTORY <target>] | INSTALL<file> |TEST <test> | CACHE <entry> |VARIABLE > 
PROPERTY <name>
[SET | DEFINED | BRIEF_DOCS | FULL_DOCS])
```

**define_property**

定义属性，可以设置说明.(不仅可以直接设置不存在的属性，也可以设置已有的属性)

```cmake
define_property(<GLOBAL | DIRECTORY | TARGET | SOURCE |TEST | VARIABLE | CACHED_VARI BLE>
PROPERTY <name>[INHERITED] 
[BRIEF_DOCS <brief-doc> [docs...]]
[FULL_DOCS <full-doc> [docs...]]
[INITIALIZE_FROM_VARIABLE <variable>])
```

如：

```cmake
define_property(GLOBAL PROPERTY TEST_DEF BRIEF_DOCS "brief docs")
#获取属性概要说明
get_property(var GLOBAL PROPERTY TEST_DEF BRIEF_DOCS)
message("TEST_DEF=${var}")
#输出如下：
TEST_DEF=brief docs
```

##### 属性分类

- **全局属性** 

  无缓存全局

  ```cmake
  set_property(GLOBAL PROPERTY TEST_GLOBAL "test global 001")
  set_property(GLOBAL APPEND PROPERTY TEST_GLOBAL "123" )
  get_property(var GLOBAL PROPERTY TEST_GLOBAL)#TEST_GLOBAL属性的值取到var变量中
  message("PROPERTY TEST_GLOBAL=${var}")
  #输出如下
  PROPERTY TEST_GLOBAL=test global;123
  ```

- **目录属性**

  目录属性只在当前目录有效（上级目录与下级目录均无效）

  ```cmake
  set_property(DIRECTORY . PROPERTY DIR_VAR1 "dir_var1 001")#.表示该CMakeLists.txt所处的当前目录  DIR_VAR1为属性名
  get_property(var DIRECTORY . PROPERTY DIR_VAR1)
  ```

- **文件属性**

  文件属性只在该文件存在才有效(可以访问子目录中的文件属性)

  ```cmake
  set_property(DIRECTORY main.cpp PROPERTY S1 "s1 value")#main.cpp表示源文件名  S1为属性名
  get_property(var DIRECTORY . PROPERTY S1)
  ```

  **命令行传递参数给源文件**

  **`COMPILE_DEFINITIONS`**是传递预处理变量的预置属性

  ```cmake
  set_property(SOURCE main.cpp PROPERTY COMPILE_DEFINITIONS "PARA1=1234")#编译的时候传递 -DPARA1 1234
  ```

- **目标属性**

  大部分情况下，都是使用目标属性(可以访问子目录中的目标属性)

  ```cmake
  add_executable(${PROJECT_NAME} main.cpp)
  set_property(TARGET ${PROJECT_NAME} PROPERTY TVAR "tvar1")#目标名必须是已存在的
  get_property(var TARGET ${PROJECT_NAME} PROPERTY TVAR)
  ```

  **命令行传递参数给源文件**

  ```cmake
  set_property(TARGET ${PROJECT_NAME} PROPERTY COMPILE_DEFINITIONS "PARA1=\"test_para1\"")#\表示转义符
  set_property(TARGET ${PROJECT_NAME} APPEND PROPERTY COMPILE_DEFINITIONS "PARA2=\"test_para2\"")#追加设置
  set_property(TARGET ${PROJECT_NAME} APPEND_STRING PROPERTY COMPILE_DEFINITIONS "PARA3=\"test_para3\"")#追加设置
  ```

##### 打印属性

打印属性可以用一下命令：

```cmake
get_property(var GLOBAL PROPERTY TEST_GLOBAL)
message("PROPERTY TEST_GLOBAL=${var}")
```

但也可以：**`cmake_print_properties`**

需要引入打印的模块:   **`include(CMakePrintHelpers)`**

```cmake
cmake_print_properties([TARGETS target1.. targetN]
[SOURCES source1.. sourceN] [DIRECTORIES dir1.. dirN] [TEST test1.. testN]
[CACHE_ENTRIES entry1.. entryN] PROPERTIES
prop1.. propN)
```

使用案例：

```cmake
include(CMakePrintHelpers)
cmake_print_properties(TARGETS ${PROJECT_NAME} PROPERTIES COMPILE_DEFINITIONS TVAR)#打印COMPILE_DEFINITIONS和TVAR两个属性
#输出如下：
 Properties for TARGET xlog:
   xlog.COMPILE_DEFINITIONS = "PARA1="test_para1";PARA2="test_para2";PARA3="test_para3""
   xlog.TVAR = <NOTFOUND>
```

### math数学运算

```cmake
math(EXPR <variable> "<expression>" [OUTPUT_FORMAT <format>])
#例子:
set(exp "5*(10+3)")
math(EXPR out ${exp} OUTPUT_FORMAT HEXADECIMAL)#结果存在out变量中
message("out=${out}")
#输出如下：
out=0x41
```

- 表达式支持`+ - * / % | & ^ ~ << >>`
- 结果必须是64位有符号整数
- 输出格式
  - HEXADECIMAL      十六进制
  - DECIMAL             十进制 

### string字符串处理

- 搜索和替换
- 操作
- 比较
- 哈希值
- 生成
- 与JSON交互

比较常用的有头尾去无用字符，取子串，大小写转换

**案例**

```cmake
#取出字符串"  begin test cmake string end   "中，begin和end中间的字符串,并去除两边空格转成大写打印
set(STR1 "  begin test cmake string end   ")
set(BSTR "begin")
string(FIND ${STR1} ${BSTR} bindex)#查找在字符串中begin的位置的下标存到bindex变量中
string(FIND ${STR1} "end" eindex)#查找在字符串中end的位置的下标存到eindex变量中
string(LENGTH ${BSTR} size)#获取BSTR变量中值的长度到size变量
math(EXPR bindex "${bindex}+${size}")#bindex=bindex+size
math(EXPR length "${eindex} - ${bindex}")#length = eindex-bindex
string(SUBSTRING ${STR1} ${bindex} ${length} substr)
string(STRIP ${substr} substr)#去掉头尾的空格,\t,\n,\r输出到substr变量
string(TOUPPER ${substr} substr)#转成大写存到substr中
message("substr = [${substr}]")
#输出如下：
substr = [TEST CMAKE STRING]
```

### list基础语法

### 环境变量

环境变量设置语法：  **`set(ENV{<variable>}{<value>}) `**   使用   **`$ENV{<variable>}`**

```cmake
set(ENV{MYENV} "test env value")
message("MYENV=$ENV{MYENV}")
```

环境变量特性：

- **只影响当前的CMake进程**，不影响调用CMake的进程，也不影响整个系统环境，也不影响后续构建或测试进程的环境
- 作用域是**全局**的，基本类似全局属性，但全局属性可以给图形界面加说明
- 环境变量相比属性访问更简单
- 可以直接通过 **`$ENV{<variable>}`**读取到系统的环境变量，如果对系统环境变量进行修改也只影响当前CMake进程，不会真正影响到系统环境变量   如：`message("PATH=$ENV{PATH}")`
- 无缓存,和属性一样，不会和缓存变量一样可以持久存在

### 循环语句

##### foreach

##### while

### CMake宏

### CMake函数







# 与vcpkg配合使用

[[C++基础#与CMAKE配合使用|CMake与vcpkg配合使用]]































































