---
title: windows开发
tags: 开发
categories: 技术
mathjax: true

---

暂未完成

<!-- more -->

# Win32课程有哪些内容

1. 字符
2. 多线程
3. 线程同步
4. 窗口的本质
5. windows消息机制
6. 子窗口的使用
7. 进程
8. 内存管理
9. 文件系统
10. 内存映射
11. DLL
12. 远程注入
13. 模块隐藏
14. 进程通信
15. HOOK专题（各种类型HOOK/绕过全代码校验）

malloc在windows上的底层也是win32实现的

# 字符编码

## ANSI编码

### **原始**的ASCII编码

![4f06232eed4f93be762cd15d664b407c](https://raw.githubusercontent.com/che77a38/blogImage/main/4f06232eed4f93be762cd15d664b407c.jpeg)

![05d27497327d7264b74d178aaf312830](https://raw.githubusercontent.com/che77a38/blogImage/main/05d27497327d7264b74d178aaf312830.jpeg)

原始的ASCII码只占一个字节

### ASCII编码的拓展：GB2312（GBK）或GB2312-80

GB2312或GB2312-80：专门用来表示中文的编码

#### 实现原理：

把80~FF的表给占用了，由80~FF开头的两个字节拼在一起表示一个字符

```
中国
D6 D0 B9 FA
```

GB2312（GBK）或GB2312-80也就是ANSI编码（各国各自的编码格式统称ANSI）

#### 缺点

其他象形文字国家也是采取和我国一样的策略，所以各个国家看到的同一个编码意思不一致。

ANSI编码也就是GB2312（GBK）或GB2312-80，表示英文字符时用一个字节，表示中文字符时用两个或4个字节

## UNICODE编码

一张包含全世界所有文字的一个编码表，Unicode的编码范围是：0~0x10FFFF，可以容纳100多万个符号！

但他只是一个符号集，只规定了符号的二进制代码，却没有规定这个二进制代码应该如何存储。

### **UNICODE编码的存储方式**

#### UTF-16

UTF-16编码以16位无符号整数为单位，注意是16位为一个单位，不表示一个字符就只有16位。这个要看字符的unicode编码处于什么范围而定的，有**可能是2个字节，也可能是4个字节**。**现在机器上的unicode编码一般指的就是UTF-16。**

```
UTF-16小端存储
中国A
2D 4E FD 56 41 00

UTF-16大端存储
中国A
4E 2D 56 FD 00 41
```

![image-20210613135932861](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210613135932861.png)

上图箭头所指的没有明确说明是哪种存储方式的Unicode**实际上就是UTF-16**

优缺点：拆分解析快，浪费空间多（尤其是网络传输）

#### UTF-8

一种变长的存储方案

网络传输火起来的编码格式     

| Unicode符号集 | UTF-8(x表示Unicode符号集)           |
| ------------- | ----------------------------------- |
| 0~7F          | 0xxxxxxx                            |
| 80~7FF        | 110xxxxx 10xxxxxx                   |
| 800~FFFF      | 1110xxxx 10xxxxxx 10xxxxxx          |
| 10000~10FFFF  | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx |

因此占用1~4个字节都有可能

```
A中
41             	E4           	B8           	AD
0(100 0001)    	1110 (0100)		10(11 1000)		10(10 1101)
100 0001		0100			1110    0010	1101
4	1			4				E		2		D
A				中
```

数据大部分是英文字符的话采用UTF-8比较好，中文多的话采用UTF-16比较好

优缺点：拆分解析慢，但节省空间（尤其是网络传输）

#### UTF-32

任何元素都是4个字节为单位。

```
A					中
41 00 00 00			 2D 4E 00 00 
```

### BOM字节顺序标识

Byte Order Mark

文本文件的起始位置存这几个字节来表示当前文件采用什么格式存储

| 存储格式             | BOM         |
| -------------------- | ----------- |
| UTF-8                | EF BB BF    |
| UTF-16LE（小端存储） | FF FE       |
| UTF-16BE（大端存储） | FE FF       |
| UTF-32LE             | FF FE 00 00 |
| UTF-32BE             | 00 00 FE FF |

添加BOM头

```cpp
std::ofstream ofs("d:\\Temp\\test.txt"); //文件是utf8编码
char c1 = 0xEF;// 仿utf-8 BOM头  三字节
char c2 = 0xBB;
char c3 = 0xBF;
ofs << c1 << c2 << c3;
```

QT中添加BOM头提供了封装好的函数

```cpp
QTextStream out(&data);
out.setCodec("UTF-8");
out.setGenerateByteOrderMark(true);
```

## C语言中的宽字符

### 宽字符类型

- char：多字节字符类型
- wchar_t：宽字符类型

```cpp
char szStr[]="中国";//使用的是ANSI编码 D6 D0 B9 FA 00 (一个字节的零表示结尾)
wchar_t sezStr[]=L"中国";//使用的是UTF-16编码 2D 4E FD 56 00 00(两个字节的0表示结尾)
//L的意思是让编译器存储该字符串的时候按照UTF-16来存储，也可以设置编译器选项设置默认存储格式为UTF-16，就不需要写这个L了
```

### 字符常用函数

使用的函数版本根据编码不同也被提供了两套

| 多字节字符函数 | 宽字符函数 | 作用             |
| -------------- | ---------- | ---------------- |
| printf         | wprintf    | 打印到控制台函数 |
| strlen         | wcslen     | 获取长度         |
| strcpy         | wcscpy     | 字符串复制       |
| strcat         | wcscat     | 字符串拼接       |
| strcmp         | wcscmp     | 字符串比较       |
| strstr         | wcsstr     | 字符串查找功能   |

===

下面是Windows定义的一组字符串函数，这些函数用来计算字符串长度、复制字符串、连接字符串和比较字符串：

```cpp
ILength = lstrlen (pString) ;
        
pString = lstrcpy (pString1, pString2) ;
        
pString = lstrcpyn (pString1, pString2, iCount) ;
        
pString = lstrcat (pString1, pString2) ;
        
iComp = lstrcmp (pString1, pString2) ;
        
iComp = lstrcmpi (pString1, pString2) ;
        
```

这些函数与C链接库中对应的函数功能相同。如果定义了UNICODE标识符，那么这些函数将接受宽字符串，否则只接受常规字符串。宽字符串版的lstrlenW函数可在Windows 98中执行。



# win32的API

主要是存放在C：/IWINDOWS/system32和C：/IWINDOWS/SysWow64 下面的所有dll

SysWow64 存的是32位dll，而system32存的是64位DLL

几个重要的DLL：

1. Kernel32.dll：最核心的功能模块，比如管理内存，进程和线程相关的函数等。
2. User32.dll：是Windows用户界面相关应用程序接口，如创建窗口和发送消息等。
3. GDI32.dll：全程是Graphical Device Interface（图形设备接口），包含用于画图和显示文本的函数。

使用win32的api只需要包含头文件：#include<windows.h>

# win32的类型

 LPCSTR -> CONST CHAR \*->const char\*

看起来很复杂但其实只是起的别名

| 原类型          | windows.h起的别名 | 指针别名   |
| --------------- | ----------------- | ---------- |
| byte            | BYTE              | PBYTE      |
| word            | WORD              | PWORD      |
| dword           | DWORD             | PDWORD     |
| char(ANSI)      | CHAR              | PCHAR/PSTR |
| unsigned char   | UCHAR             | PUCHAR     |
| short           | SHORT             | PSHORT     |
| unsigned short  | USHORT            | PUSHORT    |
| int             | INT               | PINT       |
| unsigned int    | UINT              | PUINT      |
| bool            | BOOL              |            |
| wchar_t(UTF-16) | WCHAR             | PWSTR      |

# WIN32中使用字符串

字符类型：

```cpp
CHAR szStr[]="中国";
WCHAR sezStr[]=L"中国";
TCHAR stzStr[]=TEXT("中国");//这种方式只要修改项目设置，就可以全部修改ASCII和宽字符
```

字符串指针：

```cpp
PSTR pszStr="中国";
PWSTR pwszStr=L"中国";
PTSTR ptszStr=TEXT("中国");
```

由于windows的底层全是unicode，所以unicode性能更好。

编程的时候推荐，函数用宏，类型用PTSTR和TCHAR，字符串用TEXT，项目设置为unicode。

[宽字符串和窄字符串的转换]: https://blog.csdn.net/blpluto/article/details/5755320



# 进程

进程提供程序所需的资源，如：数据，代码等等

**进程内存空间的地址划分**

| 分区                 | X86 32位Windows       |
| -------------------- | --------------------- |
| 空指针赋值区(前64KB) | 0x00000000~0x0000FFFF |
| 用户模式区           | 0x00010000~0x7FFEFFFF |
| 64KB禁入区(后64KB)   | 0x7FFF0000~0x7FFFFFFF |
| 内核                 | 0x80000000~0xFFFFFFFF |

每个进程的内核部分其实是同一份

![image-20210615121702693](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210615121702693.png)

## 进程的创建

任何进程都是别的进程创建的（第一个进程是操作系统内核创建的）

`当我们双击运行的时候，实际上是explorer.exe调用了CreateProcess函数帮我们创建了进程`

**进程的创建过程**

1. 映射EXE文件

2. 创建内核对象EPROCESS

3. 映射系统DLL（ntdll.dll）

4. 创建线程内核对象ETHREAD

5. 系统启动线程

   ​		映射DLL（ntdll.LdrInitializeThunk）

   ​		线程开始执行

**对抗点：**映射DLL之前注入DLL，映射DLL之前替换整个进程等等

创建进程的同时也创建了线程。

![image-20210615134439052](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210615134439052.png)

## CreateProcess函数

```cpp
//返回值表示是否创建成功
BOOL CreateProcessA(
  LPCSTR                lpApplicationName,//全路径对象名称
  LPSTR                 lpCommandLine,//命令行参数
  LPSECURITY_ATTRIBUTES lpProcessAttributes,//安全属性结构体指针，是否可继承进程句柄
  LPSECURITY_ATTRIBUTES lpThreadAttributes,//安全属性结构体指针，是否可继承线程句柄
  BOOL                  bInheritHandles,//是否继承父进程的句柄表
  DWORD                 dwCreationFlags,//创建标志（可以指定是否开新的控制台，是否挂起启动等等）
  LPVOID                lpEnvironment,//进程环境变量（填空就好，没什么用）
  LPCSTR                lpCurrentDirectory,//工作目录，即进程工作路径
  LPSTARTUPINFOA        lpStartupInfo,//[IN参数]启动信息结构体指针(必填)
  LPPROCESS_INFORMATION lpProcessInformation//[OUT参数]进程信息结构体
);
BOOL CreateProcessW(
  LPCWSTR               lpApplicationName,
  LPWSTR                lpCommandLine,
  LPSECURITY_ATTRIBUTES lpProcessAttributes,
  LPSECURITY_ATTRIBUTES lpThreadAttributes,
  BOOL                  bInheritHandles,
  DWORD                 dwCreationFlags,
  LPVOID                lpEnvironment,
  LPCWSTR               lpCurrentDirectory,
  LPSTARTUPINFOW        lpStartupInfo,
  LPPROCESS_INFORMATION lpProcessInformation
);
```

**dwCreationFlags字段设置挂起启动的意义**：

1. 映射EXE文件

2. 创建内核对象EPROCESS

3. 映射系统DLL（ntdll.dll）

4. 创建线程内核对象ETHREAD

5. 如果是挂起的方式启动

   ​		。。。（为所欲为，比如提前注入）

6. 恢复以后再继续执行（ResumeThread函数恢复）

   ​		映射DLL（ntdll.LdrInitializeThunk）

   ​		线程开始执行

### LPSTARTUPINFO结构体指针指向的结构体

```cpp
typedef struct _STARTUPINFOA {
  DWORD  cb;//存当前结构体的大小，目的是为了以后程序的拓展(必填)
  LPSTR  lpReserved;//保留，置为NULL
  LPSTR  lpDesktop;//指定一个字符串，包括该进程的桌面名或窗口位置名
  LPSTR  lpTitle;//指定控制台进程创建的新控制台窗口标题
  DWORD  dwX;//指定新窗口左上角的x和y偏移量（以像素为单位）
  DWORD  dwY;
  DWORD  dwXSize;//指定新窗口的宽度和高度
  DWORD  dwYSize;
  DWORD  dwXCountChars;//指定新窗口的屏幕缓冲区的宽度和高度
  DWORD  dwYCountChars;
  DWORD  dwFillAttribute;//指定新窗口的初始文字和背景颜色
  DWORD  dwFlags;//创建窗口标志
  WORD   wShowWindow;//新窗口的显示状态
  WORD   cbReserved2;//保留，必须置为0
  LPBYTE lpReserved2;//保留，必须置为NULL
  HANDLE hStdInput;//指定一个句柄，该句柄用作进程的标准输入句柄
  HANDLE hStdOutput;//指定一个句柄，该句柄用作进程的标准输出句柄
  HANDLE hStdError;//指定一个句柄，句柄用作进程的标准错误句柄
} STARTUPINFOA, *LPSTARTUPINFOA;
typedef struct _STARTUPINFOW {
  DWORD  cb;
  LPWSTR lpReserved;
  LPWSTR lpDesktop;
  LPWSTR lpTitle;
  DWORD  dwX;
  DWORD  dwY;
  DWORD  dwXSize;
  DWORD  dwYSize;
  DWORD  dwXCountChars;
  DWORD  dwYCountChars;
  DWORD  dwFillAttribute;
  DWORD  dwFlags;
  WORD   wShowWindow;
  WORD   cbReserved2;
  LPBYTE lpReserved2;
  HANDLE hStdInput;
  HANDLE hStdOutput;
  HANDLE hStdError;
} STARTUPINFOW, *LPSTARTUPINFOW;
```

**对抗点**：\_STARTUPINFOA如果由explorer.exe创建的进程填写的和由调试器创建，在不作处理的情况下，给\_STARTUPINFOA填写的不一致，(explorer.exe 使用 shell32 中 ShellExecute 的来运行程序, ShellExecute 会清不用的值)（ollydbg 会向 STARTUPINFO 中的  dwFlags 设置 STARTF_FORCEOFFFEEDBACK,而 explorer 不会）

### LPPROCESS_INFORMATION结构体指针指向的结构体

```cpp
typedef struct _PROCESS_INFORMATION {
  HANDLE hProcess;//进程句柄
  HANDLE hThread;//线程句柄
  DWORD  dwProcessId;//进程ID
  DWORD  dwThreadId;//线程ID
} PROCESS_INFORMATION, *PPROCESS_INFORMATION, *LPPROCESS_INFORMATION;
```

### LPSECURITY_ATTRIBUTES结构体指针指向的结构体

```cpp
typedef struct _SECURITY_ATTRIBUTES {
  DWORD  nLength;//该结构体的长度（必填）
  LPVOID lpSecurityDescriptor;//指向一个安全描述符结构体的指针，表明当前内核对象，哪个用户能访问（写代码时不需要关注，因为不设置的时候，默认表示安全设置与父进程一样）
  BOOL   bInheritHandle;//当前内核对象是否允许继承（重点）决定了后面有张图中父进程句柄表中的字段是0还是1，允许被继承填1，不允许填0
} SECURITY_ATTRIBUTES, *PSECURITY_ATTRIBUTES, *LPSECURITY_ATTRIBUTES;
```

如果bInheritHandle填的是不允许被继承，那么不需要填写这个字段，直接整个_SECURITY_ATTRIBUTES结构体字段填NULL就可以了，表明不被继承。即父进程句柄表中字段为0。

**创建进程案例**

```cpp
BOOL CreateChildProcess(PTCHAR szChildProcssName,PTCHAR szCommandLine)
{
    STARTUPINFO si;
	PROCESS_INFORMATION pi;
	ZeroMemory(&pi,sizeof(pi));
	ZeroMemory(&pi,sizeof(si));
	si.cb=sizeof(si);//必填
	//创建进程，返回成功与失败
	if(!CreateProcess(
    	szChildProcssName,//对象名称
        szCommandLine,//命令行
        NULL,//不继承进程句柄
        NULL,//不继承线程句柄
        FALSE,//不继承父进程的句柄表
        0,//没有创建标志
        NULL,//使用父进程环境变量
        NULL,//使用父进程工作路径作为当前进程工作路径
        &si,//_STARTUPINFOW结构体详细信息
	    &pi)//LPPROCESS_INFORMATION结构体详细信息
      )
    {
        printf("创建子进程失败,错误：%d\n",GetLastError());
        return FALSE;
    }
    //释放句柄
    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);
    return TRUE;
}
```

`WIN32的部分api是通过GetLastError()获取错误原因和返回值。`

## main函数的参数

```cpp
void main(int argc,char* argv[])
{
	//argc是命令行参数的个数，argv是存命令行参数的指针。
}
```

# 句柄表（与上一章紧密相连）

## 内核对象

像进程，线程，文件，互斥体，事件等在内核都有一个对应的结构体，这些结构体由内核负责管理。我们管这样的对象叫做内核对象。

![image-20210615144439614](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210615144439614.png)

内核对象有如下：

- Access token
- Communications device
- Console input
- Console screen buffer
- Event    事件
- File    文件
- File mapping    文件映射
- I/O completion port
- Job
- Mailslot
- Memory resource notification
- Mutex    互斥体
- Named pipe    命名管道
- Pipe    管道
- Process    进程
- Semaphore    信号量
- Thread    线程
- Transaction
- Waitable timer

内核对象的共同特征，其对应创建函数中有安全描述符，即LPSECURITY_ATTRIBUTES参数。

### **如何管理内核对象**

![image-20210615144902520](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210615144902520.png)

内核结构的地址一定是大于0x80000000的，属于内核区，如果应用层访问内核区的地址将**直接蓝屏**。为了避免这种情况，不能直接暴露内核地址给应用层，从根源上解决这种隐患。**句柄表**就是为了不直接暴露内核地址做的隔离层。

## 句柄表

### **每一个进程都有一个句柄表**

只有进程内核对象才有句柄表

![image-20210615145614061](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210615145614061.png)

**句柄表**：通过句柄表访问内核对象，而不直接通过内核地址。蓝色表格中的编号就是句柄，即**应用层通过进程中的句柄表中的句柄访问内核对象**。

**句柄**：当前进程私有的一个内核对象的索引

句柄就是一道防火墙，隔离应用层和内核层，防止应用层直接访问内核层地址。

**句柄就是应用层访问内核对象的安全方式**

------

### **多进程共享一个内核对象**

![image-20210615150920853](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210615150920853.png)

上图可知，**句柄的值只针对当前进程才有意义**

A上面的2表示计数器，两个进程的句柄表都记录了A的句柄，所以计数器为2。closeHandle关闭句柄，**只有当计数器变为0了，才能真正地释放该内核对象**

**线程内核对象释放**有一点例外：要真正释放一个线程内核对象，必须线程执行结束并且关闭所有该线程句柄，才能真正释放该线程内核对象。

**进程里的唯一线程被释放了，进程才真正被释放。**

### 句柄可以被继承

![image-20210615155616437](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210615155616437.png)

父进程的句柄表中绿色表格部分表示**该句柄是否可以被子进程继承**。

**创建子进程的bInheritHandles参数如果指定了true，表示该子进程继承父进程的句柄表，但只能继承绿色表格部分为1的句柄**。

![image-20210615162232666](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210615162232666.png)

总结，多进程共享内核对象的方式：

1. 通过函数（例：OpenProcess）来得到对应内核对象句柄。
2. 通过继承（设置继承与否相关等属性后，直接通过命令行参数传句柄具体值）

### WIN32中句柄的种类

1. HANDLE 指向内核对象的句柄
2. HWND 指向窗口的句柄
3. HDC 指向设备上下文的句柄
4. HINSTANCE 指向模块的句柄
5. ......(H开头的都是句柄)

# 进程ID与线程ID

操作系统有一张**全局句柄表**，里面包含了所有进程和线程，**进程ID和线程ID**就是这张表中的句柄

![image-20210615163527181](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210615163527181.png)

进程ID和线程ID是全局的，可以**跨进程**的。ID是**唯一**的，不同时存在重复的。

# 线程

**线程独享各自的栈**，堆是各个线程可以共享的

- 线程和进程的区别

  **从内存上**：进程创建时会被分配地址空间，并且包含以下几种内存空间：堆区、栈区、代码区、全局变量区。

  ​				  线程创建时会分配线程的私有栈，包括：维护参数和局部变量线程栈区，程序计数器（维护线程挂起再运行），寄存器集合等。

  ​				  线程共享进程中除了线程上下文外的所有内存空间，包括（文件、系统资源等）

  **从效率上**：进程包含线程，并且拥有更多的数据结构需要维护。所以切换或者创建，进程的效率要慢于线程。

  **安全性上**：进程间有独立的地址空间，安全性较好；线程间虽然有私有的栈区，当理论上只要知道栈帧地址即可修改其他线程的变量。

## 创建线程

1. 线程是附属在进程上的**执行实体**，是代码的执行流程。
2. 一个进程可以包含多个线程，但一个进程至少要包含一个线程。

```cpp
//返回值为线程句柄
HANDLE CreateThread(
  LPSECURITY_ATTRIBUTES   lpThreadAttributes,//安全属性，决定是否可被继承
  SIZE_T                  dwStackSize,//初始堆栈（0表示系统默认）
  LPTHREAD_START_ROUTINE  lpStartAddress,//线程回调函数
  __drv_aliasesMem LPVOID lpParameter,//线程回调函数的参数
  DWORD                   dwCreationFlags,//创建线程的标识，0表示立即执行，CREATE_SUSPENDED表示挂起
  LPDWORD                 lpThreadId//[out]返回线程id，不接受填NULL
);
```

上文句柄表中内核对象部分有提到：要真正释放一个线程内核对象，必须线程执行结束并且关闭所有该线程句柄，才能真正释放该线程内核对象。

即**线程释放**的两个条件

- 打开句柄计数为0
- 线程执行结束

所以如果创建的线程后续不需要使用句柄再操作该线程，则可以直接创建线程后马上CloseHandle。线程正常执行，线程执行结束后系统释放线程内核对象。

### 创建线程的各种方法

1） Create/EndThread是Win32方法开始/结束一个线程
2） _beginthreadx/_endthreadex是C RunTime方式开始/结束一个线程
3） AfxBeginThread是在MFC中开始/结束一个线程 

#### C++11之前

是用_beginthreadex创建线程，内部实现是调用CreareThread，但一般不推荐直接使用CreateThread，因为前者做了许多安全保护的工作。

```cpp
unsigned long _beginthread(
  void(_cdecl *start_address)(void *), //声明为void (*start_address)(void *)形式
  unsigned stack_size, //是线程堆栈大小，一般默认为0
  void *arglist //向线程传递的参数，一般为结构体
);
 
unsigned long _beginthreadex( //推荐使用
  void *security,    //安全属性，NULL表示默认安全性
  unsigned stack_size, //是线程堆栈大小，一般默认为0
  unsigned(_stdcall  *start_address)(void *),    //声明为unsigned(*start_address)(void *)形式
  void *argilist,    //向线程传递的参数，一般为结构体
  unsigned initflag, //新线程的初始状态，0表示立即执行，CREATE_SUSPEND表示创建后挂起（可用ResumeThread唤醒）。
  unsigned *thrdaddr //该变量存放线程标识符，它是CreateThread函数中的线程ID。
); //创建成功条件下的将线程句柄转化为unsigned long型返回，创建失败条件下返回0
```

#### C++11之后

#### thread　（thread.h中）

使用方式：所有可执行的对象都可以放入thread中，包括，全局函数、类的成员函数、lambda表达式等。

**略**

## 线程回调函数

```cpp
DWORD WINAPI ThreadProc(
  _In_ LPVOID lpParameter
);
```

不一定 要按照上面的格式定义现线程回调函数，只要填入CreateThread的时候进行强制转换一下。

**线程传参要注意：**因为传的是指针，**必须保证该指针指向的变量的生命周期在线程使用完该变量之后结束**

除了线程传参外，**全局变量线程函数是可以直接使用的。**

向线程函数传递变量：

1. 线程参数
2. 全局变量

## 线程控制

### 让线程停下

让当前线程停下来

```cpp
Sleep()
```

挂起别的线程，即线程挂起计数++

```cpp
SuspendThread(线程句柄)
```

恢复线程挂起计数,即线程挂起计数--

```cpp
ResumeThread()
```

**线程挂起计数为0，线程才会真正恢复执行**

### 等待线程结束

线程的四种状态：

1. 新建状态（New）：刚被创建
2. 准备状态（Runnable）：加载所需的所有资源，等待CPU
3. 运行状态（Running）：被CPU执行
4. 挂起状态（Blocked）：阻塞，等待唤醒

#### WaitForSingleObject()

```cpp
//当前线程阻塞状态，等待指定对象状态发生变更（执行完毕也属于状态发生变更）或超时间隔结束才继续执行。
DWORD WaitForSingleObject(
  HANDLE hHandle,//什么内核对象句柄都可以
  DWORD  dwMilliseconds//超时时间，最多等多久，INFINITE表示等无限久
);
```

#### WaitForMultipleObjects();

```cpp
DWORD WaitForMultipleObjects(
  DWORD        nCount,//等几个内核对象
  const HANDLE *lpHandles,//内核对象指针，什么内核对象句柄都可以
  BOOL         bWaitAll,//等待模式，1表示等所有对象状态变更，0表示等任一个对象状态变更
  DWORD        dwMilliseconds//超时时间，最多等多久，INFINITE表示等无限久
);
```

#### GetExitCodeThread()

```cpp
//获取线程回调函数的返回结果
//返回值：函数成功，则返回值非零。失败为零
BOOL GetExitCodeThread(
  HANDLE  hThread,//线程句柄
  LPDWORD lpExitCode//[out]存返回结果的指针
);
```

### 线程上下文

**CONTEXT结构体**

```cpp
//64位
typedef struct DECLSPEC_ALIGN(16) _CONTEXT {

    //
    // Register parameter home addresses.
    //
    // N.B. These fields are for convience - they could be used to extend the
    //      context record in the future.
    //

    DWORD64 P1Home;
    DWORD64 P2Home;
    DWORD64 P3Home;
    DWORD64 P4Home;
    DWORD64 P5Home;
    DWORD64 P6Home;

    //
    // Control flags.
    //

    DWORD ContextFlags;
    DWORD MxCsr;

    //
    // Segment Registers and processor flags.
    //

    WORD   SegCs;
    WORD   SegDs;
    WORD   SegEs;
    WORD   SegFs;
    WORD   SegGs;
    WORD   SegSs;
    DWORD EFlags;

    //
    // Debug registers
    //

    DWORD64 Dr0;
    DWORD64 Dr1;
    DWORD64 Dr2;
    DWORD64 Dr3;
    DWORD64 Dr6;
    DWORD64 Dr7;

    //
    // Integer registers.
    //

    DWORD64 Rax;
    DWORD64 Rcx;
    DWORD64 Rdx;
    DWORD64 Rbx;
    DWORD64 Rsp;
    DWORD64 Rbp;
    DWORD64 Rsi;
    DWORD64 Rdi;
    DWORD64 R8;
    DWORD64 R9;
    DWORD64 R10;
    DWORD64 R11;
    DWORD64 R12;
    DWORD64 R13;
    DWORD64 R14;
    DWORD64 R15;

    //
    // Program counter.
    //

    DWORD64 Rip;

    //
    // Floating point state.
    //

    union {
        XMM_SAVE_AREA32 FltSave;
        struct {
            M128A Header[2];
            M128A Legacy[8];
            M128A Xmm0;
            M128A Xmm1;
            M128A Xmm2;
            M128A Xmm3;
            M128A Xmm4;
            M128A Xmm5;
            M128A Xmm6;
            M128A Xmm7;
            M128A Xmm8;
            M128A Xmm9;
            M128A Xmm10;
            M128A Xmm11;
            M128A Xmm12;
            M128A Xmm13;
            M128A Xmm14;
            M128A Xmm15;
        } DUMMYSTRUCTNAME;
    } DUMMYUNIONNAME;

    //
    // Vector registers.
    //

    M128A VectorRegister[26];
    DWORD64 VectorControl;

    //
    // Special debug control registers.
    //

    DWORD64 DebugControl;
    DWORD64 LastBranchToRip;
    DWORD64 LastBranchFromRip;
    DWORD64 LastExceptionToRip;
    DWORD64 LastExceptionFromRip;
} CONTEXT, *PCONTEXT;

//32位
typedef struct _WOW64_CONTEXT {

    //
    // The flags values within this flag control the contents of
    // a CONTEXT record.
    //
    // If the context record is used as an input parameter, then
    // for each portion of the context record controlled by a flag
    // whose value is set, it is assumed that that portion of the
    // context record contains valid context. If the context record
    // is being used to modify a threads context, then only that
    // portion of the threads context will be modified.
    //
    // If the context record is used as an IN OUT parameter to capture
    // the context of a thread, then only those portions of the thread's
    // context corresponding to set flags will be returned.
    //
    // The context record is never used as an OUT only parameter.
    //

    DWORD ContextFlags;//在查询的时候需要设置该字段，表示查询哪些其他的CONTEXT结构字段。

    //
    // This section is specified/returned if CONTEXT_DEBUG_REGISTERS is
    // set in ContextFlags.  Note that CONTEXT_DEBUG_REGISTERS is NOT
    // included in CONTEXT_FULL.
    //

    DWORD   Dr0;
    DWORD   Dr1;
    DWORD   Dr2;
    DWORD   Dr3;
    DWORD   Dr6;
    DWORD   Dr7;

    //
    // This section is specified/returned if the
    // ContextFlags word contians the flag CONTEXT_FLOATING_POINT.
    //

    WOW64_FLOATING_SAVE_AREA FloatSave;

    //
    // This section is specified/returned if the
    // ContextFlags word contians the flag CONTEXT_SEGMENTS.
    //

    DWORD   SegGs;
    DWORD   SegFs;
    DWORD   SegEs;
    DWORD   SegDs;

    //
    // This section is specified/returned if the
    // ContextFlags word contians the flag CONTEXT_INTEGER.
    //

    DWORD   Edi;
    DWORD   Esi;
    DWORD   Ebx;
    DWORD   Edx;
    DWORD   Ecx;
    DWORD   Eax;

    //
    // This section is specified/returned if the
    // ContextFlags word contians the flag CONTEXT_CONTROL.
    //

    DWORD   Ebp;
    DWORD   Eip;
    DWORD   SegCs;              // MUST BE SANITIZED
    DWORD   EFlags;             // MUST BE SANITIZED
    DWORD   Esp;
    DWORD   SegSs;

    //
    // This section is specified/returned if the ContextFlags word
    // contains the flag CONTEXT_EXTENDED_REGISTERS.
    // The format and contexts are processor specific
    //

    BYTE    ExtendedRegisters[WOW64_MAXIMUM_SUPPORTED_EXTENSION];

} WOW64_CONTEXT;
```

获取线程上下文

```cpp
BOOL GetThreadContext(
  HANDLE    hThread,//线程句柄
  LPCONTEXT lpContext//[out]用于接受返回上下文结构体对象的指针
);
```

设置线程上下文

```cpp
BOOL SetThreadContext(
  HANDLE        hThread,//线程句柄
  const CONTEXT *lpContext//上下文结构体对象的指针，用于设置
);
```

**单核多线程**的实现原理就是保存当前线程上下文，读取待切换的线程的上下文，继续执行那个线程。

## 线程安全问题

每个线程都有自己的栈，而局部变量是存储在栈中的，这就意味着每个线程都有一份自己的“局部变量”，如果线程仅仅使用“局部变量”那么就不存在线程安全问题。

那如果多个线程共用一个全局变量（或者堆空间）呢？

**多线程修改同一个内存地址会产生线程安全问题**！

单核多线程也是同样存在这个问题，因为cpu时间片随机分配，在线程回调函数的任意进行状态下，cpu都可能切换线程。即无法保证线程回调函数是一个整体接一个整体。下图表现出来就是cpu会执行图内上面的线程函数的某一句，就可能突然跳到图内下面的线程函数的某一句。

如下两个线程函数：全局变量存剩余票数

![image-20210619181855365](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210619181855365.png)

产生的问题如下：

![image-20210619182205646](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210619182205646.png)

解决方法：

要使两个线程函数，必须某个线程函数执行完，另一个线程函数才可以开始执行。

我们把涉及多线程修改的变量设置为**临界资源**

访问临界资源的那段代码称为**临界区**

**临界区能保证，一次只能有一个线程执行临界区的代码（原子操作）**。

原子操作：不会被线程调度机制打断的操作；这种操作一旦开始，就一直运行到结束，中间不会有任何 context switch （切换到另一个线程）。

### 临界区之线程锁的代码实现

线程锁是实现临界区的其中一种方式。

1. 创建全局结构体变量

   ```cpp
   CRITICAL_SECTION cs;//可以把它理解成一个全局令牌，用于区分临界资源是否被占用。
   ```

2. 初始化全局结构体变量

   ```cpp
   InitializeCriticalSection(&cs);
   ```

3. 实现临界区

   ```cpp
   EnterCriticalSection(&cs);
   	//临界区
   LeaveCriticalSection(&cs);
   ```

原理图：

![image-20210619190656121](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210619190656121.png)

真正的原理如何实现的参考**内核笔记**

# 互斥体

![image-20210619190048156](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210619190048156.png)

内核级临界资源怎么办？

要既可以A进程中的X线程可以访问，又要进程b中的y线程可以访问，同时还必须线程安全

![image-20210619190359223](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210619190359223.png)

互斥体是内核对象。

互斥体就是类比于线程锁中的令牌，只是线程锁图中的令牌是应用层令牌，而互斥体是内核层令牌，所以可以实现跨进程访问。

## 创建互斥体

```cpp
//创建和打开互斥体都是该函数
HANDLE CreateMutexA(
  LPSECURITY_ATTRIBUTES lpMutexAttributes,//安全属性，表示是否可以被子进程继承句柄
  BOOL                  bInitialOwner,//初始有无信号，信号表示其他线程的wait是否会阻塞，无信号表示其他线程会阻塞，有信号表示其他线程不阻塞。true表示初始无信号即其他线程会阻塞，false表示初始有信号即其他线程不阻塞。；下面有详解
  LPCSTR                lpName//内核互斥体的名字，随便起的
);
HANDLE CreateMutexW(
  LPSECURITY_ATTRIBUTES lpMutexAttributes,
  BOOL                  bInitialOwner,
  LPCWSTR               lpName
);
```

### bInitialOwner参数

互斥对象是一个内核对象，这个内核对象中有两个特殊的域，一个是用来保存哪个线程当前正拥有这个互斥对象，另一个域是一个递归计数器。当互斥对象的用来保存线程ID的域为0时，表示这个互斥对象没有被任何线程拥有，换句话说，任何一个进程中的线程调用wait函数时，都会马上返回，并将自己的线程ID设置到互斥对象的这个域当中和设置递归计数器的值为1，这时候，如果有其他的线程调用wait等待这个互斥对象时，那么这个线程就会被挂起，直到这个互斥对象用来保存线程ID的域为0时为止。这里面有一个特殊情况，就是，**在调用wait函数等待互斥对象时，如果系统发现调用wait的线程ID和互斥对象中保存的线程ID相等，则会马上返回而不是挂起等待**，这时候，返回的同时，系统会让互斥对象的递归计数器加1。

1. 若为TRUE，互斥器对象内部会**记录创建它的线程的线程ID号**并将递归计数设置为1，由于该线程ID非零，所以互斥器处于未触发状态，表示互斥器为创建线程拥有，此时Mutex的状态是无信号的，其他线程中的WaitForSingleObject都将堵塞。
2. 若为FALSE，那么互斥量对象内部的线程ID号将设置为NULL，递归计数设置为0，这意味互斥器不为任何线程占用，处于触发状态。
   也就是说，只有当递归计数为0时，该互斥器才属于触发状态，即：解锁。

深入理解bInitialOwner参数：

> 使用`bInitialOwner=TRUE` ，互斥锁创建者会自动获取互斥锁。 然后，当您调用`WaitForSingleObject` ，它*再次*获取了互斥锁。 由于win32互斥锁是递归互斥锁，因此每次获取互斥锁时都必须释放一次 - 因此初始创建者需要两次`ReleaseMutex`调用（但是每个其他线程只能释放一次！） 
>
>  您可以通过不使用`bInitialOwner`或通过跳过*第一个循环*上的`WaitForSingleObject`来避免这种`bInitialOwner` ，只有在`GetLastError() != ERROR_ALREADY_EXISTS`才有。 如果选择后者，则需要在`CreateMutex`之前调用`SetLastError(0)`来清除错误代码。 
>
>  如果您只需要`bInitialOwner`进行某种初始设置，如果在进入公共循环之前删除互斥锁，它将简化您的代码。 否则，我强烈建议不要使用`bInitialOwner` ，除非你有令人信服的理由这样做。 

```cpp
HANDLE hMutex = CreateMutex(NULL, false, TEXT("1"));
WaitForSingleObject(hMutex, INFINITE);
//上面两句代码与下面代码在创建时候是一样的，都会阻塞其他wait的线程；使用时候下面代码填true和false是没有意义的，含义都是打开互斥体
HANDLE hMutex = CreateMutex(NULL, true, TEXT("1"));
```

**销毁 当程序不再需要互斥锁时，要减少它的句柄使用计数让系统有机会摧毁他。 **

```cpp
CloseHandle(hMutex);
```

### **互斥体方式实现临界区代码**

```cpp
//创建一个互斥体
HANDLE  g_hMutex=CreateMutex(NULL,FALSE,"XYZ");
//获取令牌
WaitForSingleObject(g_hMutex,INFINITE);
//这里面的代码实现原子操作===========
for(int i=0;i<10;i++)
{
    Sleep(1000);
    printf("A进程的x线程：%d\n",i);
}
//=================================
//释放令牌
ReleaseMutex(g_hMutex);
```

### 互斥体实现临界区与线程锁实现临界区的区别

1. 线程锁只能用于单个进程间的线程控制
2. 互斥体可以设定等待超时，但线程锁不能
3. 线程意外终结时，**互斥体可以避免无限等待**
4. 互斥体效率没有线程锁高（仅仅需要在一个进程控制原子操作的话还是用线程锁）

**线程意外终结时会自动释放互斥体！**

### **互斥体可以用于实现只能实例化一个进程**

命名互斥锁 如果CreateMutex函数的第三个参数传入一个字符串，那么所创建的锁就是命名的。当一个命名的锁被创建出来以后，当前进程和其他进程如果试图创建相同名字的锁，CreateMutex会返回原来那把锁的句柄，并且GetLastError函数会返回ERROR_ALREADY_EXISTS。这个特点可以使一个程序在同一时刻最多运行一个实例。

```cpp
//创建一个互斥体
HANDLE hMutex=CreateMutexA(NULL,FALSE,"防止多开");
if(hMutex)
{
    if(GetLastError()==ERROR_ALREADY_EXISTS)//代表之前已经存在了一个进程了
	{
    	CloseHandle(hMutex);
        return 0;
	}
}
else//程序创建失败
{
    CloseHandle(hMutex);
    return 0;
}
//程序开始点
```

# 事件

内核对象，事件。

```cpp
//创建或打开事件
HANDLE CreateEventA(
  LPSECURITY_ATTRIBUTES lpEventAttributes,//安全属性
  BOOL                  bManualReset,//true表示通知类型，false表示互斥
  BOOL                  bInitialState,//false：初始没信号：wait会阻塞；true：初始有信号：wait会继续执行
  LPCSTR                lpName//给Event起个名字，方便跨进程打开
);
HANDLE CreateEventW(
  LPSECURITY_ATTRIBUTES lpEventAttributes,
  BOOL                  bManualReset,
  BOOL                  bInitialState,
  LPCWSTR               lpName
);
```

两种事件对象（bManualReset）：

1. true：该函数将创建一个手动重置事件对象，这需要使用 ResetEvent函数将事件状态设置为无信号。就是说只要调用了SetEvent函数就可以通过无数个wait
2. false：则该函数创建一个自动重置事件对象，系统会在释放单个等待线程后自动将事件状态重置为无信号状态。也就实现了互斥效果，SetEvent一次只能通过一个wait

## 设置事件有无信号

```cpp
//SetEvent会让cpu分出去时间片（体现不是很直观）
//SetEvent后被唤醒的线程优先级被提升所以会先执行，执行完了它所应有的时间片之后，优先级会被降低，然后其他线程就有机会执行了。
//将指定的事件对象设置为有信号状态。有信号，就是通知其他线程wait可以解除阻塞了
BOOL SetEvent(
  HANDLE hEvent
);
//将指定的事件对象设置为无信号状态
BOOL ResetEvent(
  HANDLE hEvent
);
```

## 线程同步

1. 线程互斥
2. 线程同步

### 线程互斥

对于共享的进程系统资源，在各单个线程访问时的排他性。当有若干个线程都要使用某一共享资源时，任何时刻最多只允许一个线程去使用，其他要使用该资源的线程必须等待，直到占用资源者释放该资源。

### 线程同步

线程之间所具有的一种制约关系，一个线程的执行依赖另一个线程的消息，当没有得到另一个线程的消息时应等待，直到消息到达时才被唤醒
$$
同步=互斥+有序
$$

### **伪同步与真同步的区别（重点）**

经典案例：生产者与消费者案例：通过以下代码也能实现伪同步

```cpp
//生产者与消费者真同步案例(互斥体实现)
int g_time = 10;//生产10次
int g_Number = 0;//生产者将他置1表示生产成功，消费者将他置0表示消费掉了。
HANDLE g_hMutex=NULL;

void thread1()//生产者
{
	int current = 0;//当前生产个数
	for (int i = 0; i < g_time; i++)
	{
		WaitForSingleObject(g_hMutex, INFINITE);//互斥区
		if (g_Number==0)
		{
			g_Number = 1;
			printf("生产者线程生产第%d个\r\n",++current);
		}
		else
		{
			printf("==============\r\n");//1处
			i--;
		}
		ReleaseMutex(g_hMutex);
	}
}
void thread2()//消费者
{
	int current = 0;//当前消费个数
	for (int i = 0; i < g_time; i++)
	{
		WaitForSingleObject(g_hMutex, INFINITE);//互斥区
		if (g_Number == 1)
		{
			g_Number=0;
			printf("消费者线程消费第%d个\r\n", ++current);
		}
		else
		{
			printf("==============\r\n");//2处
			i--;
		}
		ReleaseMutex(g_hMutex);
	}
}

void main()
{
	g_hMutex = CreateMutex(NULL, false, NULL);
	cout << "g_hMutex：" << g_hMutex << endl;
	HANDLE threadHandleArray[2];
	threadHandleArray[0] = CreateThread(NULL, 0, (LPTHREAD_START_ROUTINE)thread1, NULL, 0, NULL);
	threadHandleArray[1] = CreateThread(NULL, 0, (LPTHREAD_START_ROUTINE)thread2, NULL, 0, NULL);

	WaitForMultipleObjects(2, threadHandleArray, true, INFINITE);
	printf("测试结束\r\n");
}
```

打印结果：

![image-20210623173443224](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210623173443224.png)

但其实并非真同步，只是显示出来是同步。实际上损耗了cpu很多性能（消耗了更多cpu时间片），上面代码1处和2处会打印很多========，之所以没打印可能是新系统优化好了。但要真正实现同步还是不能靠上面代码，而应该是下面的代码：

```cpp
//生产者与消费者真同步案例(事件实现)
int g_time = 10;//生产10次
int g_Number = 0;//生产者将他置1表示生产成功，消费者将他置0表示消费掉了。
HANDLE g_hEvent =NULL;

void thread1()//生产者
{
	int current = 0;//当前生产个数
	for (int i = 0; i < g_time; i++)
	{
		WaitForSingleObject(g_hEvent, INFINITE);//互斥区
		if (g_Number == 0)
		{
			g_Number = 1;
			printf("生产者线程生产第%d个\r\n", ++current);
		}
		else
		{
			printf("==============\r\n");
			i--;
		}
        //其实真同步直接用下面代码顶替上面if else就可以了。
		/*g_Number = 1;
		printf("生产者线程生产第%d个\r\n", ++current);*/
		SetEvent(g_hEvent);
	}
}
void thread2()//消费者
{
	int current = 0;//当前消费个数
	for (int i = 0; i < g_time; i++)
	{
		WaitForSingleObject(g_hEvent, INFINITE);//互斥区
		if (g_Number == 1)
		{
			g_Number=0;
			printf("消费者线程消费第%d个\r\n", ++current);
		}
		else
		{
			printf("==============\r\n");
			i--;
		}
        //其实真同步直接用下面代码顶替上面if else就可以了。
		/*g_Number = 0;
		printf("消费者线程消费第%d个\r\n", ++current);*/
		SetEvent(g_hEvent);
	}
}


void main()
{
	g_hEvent = CreateEvent(NULL, false,true,NULL);
	HANDLE threadHandleArray[2];
	threadHandleArray[0] = CreateThread(NULL, 0, (LPTHREAD_START_ROUTINE)thread1, NULL, 0, NULL);
	threadHandleArray[1] = CreateThread(NULL, 0, (LPTHREAD_START_ROUTINE)thread2, NULL, 0, NULL);

	WaitForMultipleObjects(2, threadHandleArray, true, INFINITE);
	printf("测试结束\r\n");
}
```

打印结果：

![image-20210623175414083](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210623175414083.png)

虽然结果都一样，但使用事件的才是真同步！

正是因为SetEvent后被唤醒的线程优先级会被提升，所以事件才能保证执行顺序，而互斥体ReleaseMutex后可能下次cpu时间片还是分到当前线程执行。

【总结】**互斥体无法实现真正的同步，事件才可以实现真正的同步**。

# 窗口

![image-20210623183240740](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210623183240740.png)

高2G是内核空间，多进程公用，里面有很多系统模块。

其中和窗口最相关的主要是两个系统模块：

![image-20210623183337829](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210623183337829.png)

kernel32.dll只是一个接口，它真正调用的是ntoskrnl.exe的模块，user32.dll和gdi32.dll也只是win32k.sys的内核模块的接口

GUI 图形用户接口 就是使用user32.dll 表示使用别人已经绘制好的组件。

GDI 图形设备接口  就是使用gdi32.dll 表示自己绘制。

## HWND窗口句柄

HWND是窗口的句柄

并且HWND是**全局**的索引

桌面的窗口句柄是NULL。

获取窗口句柄的方法有三种

- 使用FindWindow函数获取指定窗口句柄
- 获取所有顶层窗口以及它们的子窗口
  - 使用`EnumWindows`和`EnumChildWindows`函数以及相对的回调函数`EnumWindowsProc`和`EnumChildWindowsProc`获取所有顶层窗口以及它们的子窗口
  - 使用`GetDesktopWindow`和`GetNextWindow`函数得到所有的子窗口

获取窗口句柄代码如下:

```c
HWND findWindowOneByOne(char* windowName)
{
	HWND hd = GetDesktopWindow();        //得到桌面窗口
	hd = GetWindow(hd, GW_CHILD);        //得到屏幕上第一个子窗口
	char s[200] = { 0 };
	int num = 1;
	while (hd != NULL)                    //循环得到所有的子窗口
	{
		memset(s, 0, 200);
		GetWindowText(hd, s, 200);
		//cout << num++ << ": " << s <<": "<<hd << endl;//遍历打印所有标题和窗口句柄
		if (strcmp(s, windowName) == 0)
			return hd;
		hd = GetNextWindow(hd, GW_HWNDNEXT);
	}
	return 0;
}
```

## GDI  图形设备接口

Graphics Device Interface

1. 设备对象（HWID）
2. DC（设备上下文，Device Contexts）
3. 图形对象

| 图像对象        | 作用                                               |
| --------------- | -------------------------------------------------- |
| 画笔（Pen）     | 影响线条，包括颜色，粗细，虚实，箭头形状等         |
| 画刷（Brushes） | 影响对形状，区域等操作，如使用的颜色，是否有阴影等 |
| 字体（Fonts）   | 影响文字输出的字体                                 |
| 位图（Bitmaps） | 影响位图创建，位图操作和保存等                     |

我们绘图的时候，首先是在设备上下文画的，就是一块内存，然后把内存中画好的形状直接打印到设备对象上，也就是窗口句柄上。

```cpp
HWND hwnd;
HDC hdc;//设备上下文的句柄
HPEN hpen;//画笔句柄
HBRUSH hBrush;//画刷句柄
//===设备对象，画在哪
hwnd=(HWND)0x000E0244;//某窗口句柄
//===获取设备对象上下文 DC
hdc=GetDC(hwnd);
//===图形对象，画什么,画线，所以使用Pen,PS_SOLID实线,线的宽度为5,颜色为RGB(0xFF,00,00),RGB是个宏
hpen=CreatePen(PS_SOLID,5,RGB(0xFF,00,00));
//直接用系统提供的其他画刷
hBrush=(HBRUSH)GetStockObject(DC_BRUSH);
//===关联图形对象和设备上下文,如果不关联，调用的是默认的笔，每种图像对象都存在对应的默认款。
//===SelectObject返回的是原来默认的图像对象的句柄
SelectObject(hdc,hpen);
//关联画刷
SelectObject(hdc,hBrush);
//===实际的绘制操作
//画线  从哪画到哪
MoveToEx(hdc,0,400,NULL);
LineTo(hdc,400,400);
//DC_BRUSH可以通过下面函数设置颜色
SetDCBrushColor(hdc,RGB(0xFF,0xFF,00));
//画矩形
Rectangle(hdc,0,0,100,100);
//===释放资源
DeleteObject(hpen);
DeleteObject(hBrush);//GetStockObject获得的图像对象可以不用删，但删了也没坏处
ReleaseDC(hwnd,hdc);
//get对象release  create对象delete
```

上面H开头的类型全是句柄，所谓句柄就是隔离用户层和内核层的工具，其真正所在都在零环。

## 消息队列

- Q：什么是消息？
- A：当我们点击鼠标的时候，或者当我们按下键盘的时候，操作系统都要把这些动作记录下来，存储到一个结构体中，这个结构体就是**消息**。

每个窗口都是在内核层有一个结构体记录了一切信息，供操作系统索引。

**每个线程只有一个消息队列**

![image-20210627131449985](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210627131449985.png)

操作系统先捕获到我们的键盘鼠标操作，然后**根据每个窗口在内核的结构体中的信息，找到对应窗口的对应负责消息队列的线程，将消息放进他的消息队列**。

![image-20210627132533158](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210627132533158.png)

窗口对象中有个成员记录了负责消息队列的线程的指针。

- 一个线程可以有很多个窗口，多个窗口共用一个消息队列线程。
- 每个窗口只属于一个线程

![image-20210627133328265](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210627133328265.png)

红线是操作系统分发消息的过程。键盘，鼠标，内核程序的操作被操作系统捕获，封装成消息结构体，根据消息针对的窗口的对象找到对应的消息队列线程，将消息放进对应消息队列线程的消息队列

## 第一个windows窗口程序

控制台程序的默认入口是main，windows程序的默认入口是WinMain

```cpp
int WINAPI WinMain(
	HINSTANCE hInstance,//当前模块句柄（实际上就是当前模块在内存中的位置）
	HINSTANCE hPrevInstance,// 没有任何意义。 它用于16位 Windows，但现在始终为零。
	LPSTR lpCmdLine,//命令行参数，由CreateProcess的lpCommandLine参数决定
	int nCmdShow//是一个标志，用于指示主应用程序窗口是最小化、最大化还是正常显示。由CreateProcess的lpStartupInfo中的显示状态决定
)
{
    //第一步：定义你的窗口是什么样的，并注册窗口类
    TCHAR className[]=TEXT("My First Window");
    WNDCLASS wndclass={0};
    wndclass.hbrBackground=(HBRUSH)COLOR_BACKGROUND;
    wndclass.lpszClassName=className;
    wndclass.hInstance=hInstance;
    wndclass.lpfnWndProc=myWindowProc;//窗口程序回调函数名
    RegisterClass(&wndclass);//注册窗口类，把这个封装好的类给操作系统
    //第二步，创建并显示窗口
    HWND hwnd=CreateWindow(className,TEXT("我的第一个窗口"),WS_OVERLAPPEDWINDOW,10,10,600,300,NULL,NULL,hInstance,NULL);
    if(hwnd==NULL)
    {
        char szOutBuff[0x80];
        sprintf(szOutBuff,"Error:%d",GetLastError());//格式化字符串
		OutputDebugString(szOutBuff);
        return 0;
    }
    ShowWindow(hwnd,SW_SHOW);
    //第三部,接受消息并处理
    MSG msg;
    bool bRet;
    while((bRet=GetMessage(&msg,NULL,0,0))!=0)//循环从消息队列获取消息
    {
        if(bRet==-1)
        {
            //出问题了
            char szOutBuff[0x80];
		   sprintf(szOutBuff,"Error:%d",GetLastError());//格式化字符串
		    OutputDebugString(szOutBuff);
        }
        else
        {
            TranslateMessage(&msg);//转换消息，针对WM_CHAR消息
            DispatchMessage(&msg);//分发消息，该函数就是为了调用消息处理函数，每个窗口都有对应的消息处理函数
		}
	}
}
```

**【总结】**

1. 先定义窗口类，指明了窗口是怎么样的，窗口的回调函数是谁。
2. 创建窗口，该函数在内核层创建真正的窗口对象，并且在该线程内核对象创建消息队列
3. 线程循环从消息队列中取消息进行处理，分发给对应的窗口回调函数。

做完上述操作后，若操作系统捕获到用户输入，将其封装成消息，根据用户输入的窗口对象找到对应的消息队列线程对象，将消息放到其消息队列中。当线程调用DispatchMessage,操作系统拿着MSG结构体中的HWND找到窗口对象，由操作系统调用对应窗口对象的回调函数。

`下面有上面代码中函数的详解`

### WNDCLASS结构体

```cpp
//告诉我们要创建的窗口是怎么样的
typedef struct tagWNDCLASSA {
    UINT        style;
    WNDPROC     lpfnWndProc;//窗口程序,处理各种消息。
    int         cbClsExtra;
    int         cbWndExtra;
    HINSTANCE   hInstance;//这个窗口是属于哪个模块的，往往是属于自己模块的，所以填WinMain传进来的hInstance
    HICON       hIcon;
    HCURSOR     hCursor;
    HBRUSH      hbrBackground;//背景色,类型是画刷类型
    LPCSTR      lpszMenuName;
    LPCSTR      lpszClassName;//窗口类名
} WNDCLASSA, *PWNDCLASSA, NEAR *NPWNDCLASSA, FAR *LPWNDCLASSA;
typedef struct tagWNDCLASSW {
    UINT        style;
    WNDPROC     lpfnWndProc;
    int         cbClsExtra;
    int         cbWndExtra;
    HINSTANCE   hInstance;
    HICON       hIcon;
    HCURSOR     hCursor;
    HBRUSH      hbrBackground;
    LPCWSTR     lpszMenuName;
    LPCWSTR     lpszClassName;
} WNDCLASSW, *PWNDCLASSW, NEAR *NPWNDCLASSW, FAR *LPWNDCLASSW;

```

#### lpfnWndProc成员（窗口函数）

处理发送到窗口的消息的应用程序定义的回调函数，格式如下：(函数名可以随便改)

```cpp
LRESULT CALLBACK myWindowProc(
  _In_ HWND   hwnd,
  _In_ UINT   uMsg,
  _In_ WPARAM wParam,
  _In_ LPARAM lParam
)
{
    return DefWindowProc(hwnd,uMsg,wParam,lParam);//就算你什么也不想做，也要调用默认的消息处理函数,因为系统已经做好了很多基本的消息处理代码，比如说放大窗口，移动窗口等等。
}
```

**窗口回调函数实际上是由操作系统发起调用**

### CreateWindow创建窗口函数

创建重叠窗口、弹出窗口或子窗口。它指定窗口类、窗口标题、窗口样式和（可选）窗口的初始位置和大小。该函数还指定窗口的父级或所有者（如果有）以及窗口的菜单。

```cpp
//创建窗口成功返回窗口句柄;失败返回NULL。
void CreateWindowA(
   lpClassName,//类名,创建窗口的时候操作系统就是通过calssName关联起来该窗口的WNDCLASS结构体的
   lpWindowName,//窗口名
   dwStyle,//窗口样式（很多种样式，每种样式又有很多子样式组成）
   x,//相对于父窗口的x坐标（像素单位）
   y,//相对于父窗口的y坐标（像素单位）
   nWidth,//窗口宽度（像素单位）
   nHeight,//窗口高度（像素单位）
   hWndParent,//父窗口句柄，没有填空
   hMenu,//若是该窗口是父窗口，该参数表示菜单句柄，没有的话填空；若创建的是子窗口，表示子窗口的id标识编号
   hInstance,//当前应用程序的句柄
   lpParam//附加数据
);
void CreateWindowW(
   lpClassName,
   lpWindowName,
   dwStyle,
   x,
   y,
   nWidth,
   nHeight,
   hWndParent,
   hMenu,
   hInstance,
   lpParam
);
```

**只要线程调用创建窗口函数，就会有消息队列**

### ShowWindow显示窗口函数

```cpp
BOOL ShowWindow(
  HWND hWnd,//显示窗口的窗口句柄
  int  nCmdShow//以什么形式显示(例如：最大化等等)
);
```

### GetMessage函数

**取消息队列中的消息的函数，若消息队列中没有消息他会阻塞直到有消息才继续执行**

```cpp
//如果函数检索WM_QUIT以外的消息，则返回值非零。
//如果该函数检索WM_QUIT消息，则返回值为零。
//如果有错误，返回值为-1。例如，如果hWnd是无效的窗口句柄或lpMsg是无效的指针，则该函数将失败。要获取扩展错误信息，请调用GetLastError。
BOOL GetMessage(
  LPMSG lpMsg,//从消息队列中取出的消息存放的位置
  //后三个参数全是过滤消息的条件，因为一个消息队列线程同时有多个窗口
  HWND  hWnd,//针对哪个窗口
  //下面两个表示针对不同类型的消息不一样，比如键盘鼠标等
  UINT  wMsgFilterMin,//0表示我全要
  UINT  wMsgFilterMax//0表示我全要
);
```

### DispatchMessage分发消息函数

由于每个窗口都有对应的消息处理函数，该函数就是为了让操作系统调用对应窗口的消息处理函数

```cpp
//含义取决于正在调度的消息，通常会忽略返回值
LRESULT DispatchMessage(
  const MSG *lpMsg
);
```

![image-20210627141039758](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210627141039758.png)

`消息结构中有窗口HWND，下面有MSG结构体详解`

### TranslateMessage转换消息函数

将虚拟键消息转换为字符消息。字符消息被发送到调用线程的消息队列，以便在线程下次调用[GetMessage](https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-getmessage)或[PeekMessage](https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-peekmessagea)函数时读取。

写了TranslateMessage函数能转换出WM_CHAR这样的消息。不写TranslateMessage，按下键盘的时候不存在WM_CHAR这样的消息。

```cpp
//如果消息被翻译（即，一个字符消息被发送到线程的消息队列），则返回值非零。
//如果消息未翻译（即字符消息未发送到线程的消息队列），则返回值为零。
BOOL TranslateMessage(
  const MSG *lpMsg
);
```

WM_CHAR的wParam参数直接为键盘的字符

```cpp
//窗口回调函数中如下代码：
case WM_KEYDOWN:
	OutputDebugStringA("WM_KEYDOWN");
	break;
case WM_KEYUP:
	OutputDebugStringA("WM_KEYUP");
	break;
case WM_CHAR:
	char szOutBuff[0x80];
	sprintf(szOutBuff, "%c", wParam);//格式化字符串
	OutputDebugStringA(szOutBuff);
	break;
```

有TranslateMessage的情况

![image-20210627151302111](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210627151302111.png)

无TranslateMessage的情况

![image-20210627151210561](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210627151210561.png)

### windows程序调试信息的输出

```cpp
char szOutBuff[0x80];
sprintf(szOutBuff,"Error:%d",GetLastError());//格式化字符串
OutputDebugStringA(szOutBuff);
```

### MSG结构体

```cpp
typedef struct tagMSG {
  HWND   hwnd;//窗口句柄
  UINT   message;//消息类型的编号，用于标识消息是什么类型的
  //下面两个参数存储消息具体的内容，比如说怎么操作了哪个键位。
  WPARAM wParam;
  LPARAM lParam;
  DWORD  time;//消息产生的时间
  POINT  pt;//point发布消息时的光标位置，以屏幕坐标表示。
  DWORD  lPrivate;
} MSG, *PMSG, *NPMSG, *LPMSG;
```

**hwnd，message，wParam，lParam这四个参数就是操作系统调用窗口回调函数的时候会给你传进来的参数。**在窗口回调函数中可以针对性的进行处理

WINDOWS提供了编号的宏，message参数用于判断消息类型,罗列几个出来，如下：

```cpp
/*
 * Window Messages
 */
#define WM_NULL                         0x0000
#define WM_CREATE                       0x0001
#define WM_DESTROY                      0x0002
#define WM_MOVE                         0x0003
#define WM_SIZE                         0x0005

#define WM_ACTIVATE                     0x0006
```

在微软官方在线开发者手册，可以搜索信息名，比如WM_KEYDOWM可以查到wParam和lParam的具体含义。

![image-20210627144328602](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210627144328602.png)

## 子窗口

1. WINDOWS提供了几个预定义的窗口类以方便我们的使用，我们一般把它们叫做子窗口控件，简称控件
2. 控件会自己处理消息，并在自己状态发生改变时通知父窗口
3. 预定义的控件有：按钮，复选框，编辑框，静态字符串标签和滚动条等。（还有些通用控件，需要自己安装模块）

父窗口的消息处理回调函数中可以直接处理子窗口穿过来的消息。

实际项目中因为win32窗口不好看，很少有直接用win32来开发界面的。

定义子窗口不需要写WNDCLASS结构体和注册窗口类。

### 创建子窗口

```cpp
//创建文本框,可以写到窗口过程处理函数的WM_CREATE信息下，创建好父窗口后就创建子窗口
CreatWindow(
    "EDIT",
    "",//编辑子窗口这里是空就可以了
    WS_CHILD|WS_VISIBLE|WS_VSCROLL|ES_MULTILINE,//WS_CHILD必须有表示子窗口;WS_VISIBLE表示初始就是可见状态;WS_VSCROLL表示带滚动条的;ES_MULTILINEL是编辑框的特有属性，表示支持多行编辑
    10,//离父窗口左上角向右偏移10像素
    10,//离父窗口左上角向下偏移10像素
    500,//子窗口宽500像素
    300,//子窗口高300像素
    hWnd,//父窗口的窗口句柄
    (HMENU)1,//子窗口的标识编号
    hInst,//当前窗口属于哪个程序
    NULL//附加数据
);
//按钮子控件
CreatWindow(
    "BUTTON",
    "设置",//按钮子窗口这里代表按钮里的文本
    WS_CHILD|WS_VISIBLE,
    520,//离父窗口左上角向右偏移520像素
    180,//离父窗口左上角向下偏移180像素
    60,//子窗口宽60像素
    30,//子窗口高30像素
    hWnd,//父窗口的窗口句柄
    (HMENU)2,//子窗口的标识编号
    hInst,//当前窗口属于哪个程序
    NULL//附加数据
);
//按钮控件点击给父窗口传的是WM_COMMAND消息，他的wParam的低16位表示子窗口的标识编号可以区分是哪个控件的消息。
//p.s.LOWORD()宏可以直接获得DWORD的低16位。
```

如何查特殊样式

微软在线开发者手册CreatWindow函数详解页中的dwStyle参数罗列了所有的通用样式属性。但是还有特有样式属性，这种特有的样式属性要针对子控件去找。比如说要找编辑框的特有样式属性就搜索**Edit Control Styles**。

### SeTDlgItemText函数

  设置控件的标题或文本

```cpp
BOOL SetDlgItemTextA(
  HWND   hDlg,//子窗口句柄
  int    nIDDlgItem,//子窗口标识编号
  LPCSTR lpString//设置的文本
);
BOOL SetDlgItemTextW(
  HWND    hDlg,
  int     nIDDlgItem,
  LPCWSTR lpString
);
```



# 内存相关

## 虚拟内存与物理内存

![image-20210627171511300](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210627171511300.png)

### 虚拟内存

参考《现代操作系统》交换技术讲解。

虚拟内存地址划分：

| 分区                 | X86 32位Windows       |
| -------------------- | --------------------- |
| 空指针赋值区(前64KB) | 0x00000000~0x0000FFFF |
| 用户模式区           | 0x00010000~0x7FFEFFFF |
| 64KB禁入区(后64KB)   | 0x7FFF0000~0x7FFFFFFF |
| 内核                 | 0x80000000~0xFFFFFFFF |

说明:

1. 线性地址有4G，但未必都能访问（未申请的内存不能访问）
2. 所以需要记录哪些地方分配了

### 物理内存

![5396392-230b8f4ea39a4f00](https://raw.githubusercontent.com/che77a38/blogImage/main/5396392-230b8f4ea39a4f00.webp)

因特尔x86CPU架构将物理内存按照4KB的方式分成一页来进行页式管理

物理页和内存条之间还有一层映射。

**可供使用的物理内存**

1. MmNumberOfPhysicalPages（物理页数）*4=物理内存
2. 硬盘伪装的物理内存。（可选）

**能够识别的物理内存**

32位系统最多可以识别物理内存为64G，但由于操作系统的限制，比如XP，只能识别4G（Windows 2003服务器版本 可以识别4G以上）

![image-20210627184154084](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210627184154084.png)

物理内存不够用，可以把硬盘当成内存，操作如下：

![image-20210627184851391](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210627184851391.png)

自定义大小中的初始大小可以修改硬盘当物理内存使用的大小。该大小可以在c盘直观地看到一个叫pagefile.sys的文件，占用就和你设置的值一样。

对于程序员来说**感知不到物理内存的存在**是因为操作系统做了下面这些事：

![image-20210627185746450](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210627185746450.png)

**已经分配的虚拟内存也可能没有物理页**，因为可能被临时移动到硬盘去给物理内存腾出空间放新的进程了。

## 私有内存与申请释放

- 私有内存（又叫线性内存）：当前物理页只能某个进程使用，别的进程无法使用的。
- 共享内存(又叫Mapped内存)：多个进程都可以共用的物理页

申请内存的两种方式

1. 通过VirtualAlloc/VirtualAllocEx申请的：Private Memory(私有内存)
2. 通过CreateFileMapping映射的：Mapped Memory(映射内存，共享内存)

真正的申请内存只有上述这两个方式，其他如malloc，new其实和内存没有关系。

new=malloc+构造函数;

**而malloc是从已经由操作系统申请好的内存中再拿一小块来用。程序启动的时候，操作系统已经为程序分配好了内存**

malloc的本质就是malloc->HeapAlloc->没有进内核。因为内存实际上已经分配好了

### 私有内存申请与释放

```cpp
//成功的话返回分配的虚拟内存首地址
//失败返回NULL
LPVOID VirtualAlloc(
  LPVOID lpAddress,//要分配的内存区域的地址，如果指定到已经分配的虚拟空间了则一定失败。所以一般填空表示分配到哪个虚拟地址都可以
  SIZE_T dwSize,//分配多大的虚拟内存，哪怕写一个字节也会分配一个页的大小，所以通常写页的整数倍
  DWORD  flAllocationType,//分配的类型，比如MEM_RESERVE表示占用虚拟地址（使用时，操作系统才帮你挂物理页），MEM_COMMIT表示占用虚拟地址并且挂上物理页
  DWORD  flProtect//内存的初始保护属性，比如PAGE_READWRITE可读可写，比如PAGE_READONLY只读，比如PAGE_EXECUTE_READWRITE可读可写可执行
);
//释放私有内存或仅释放物理页
BOOL VirtualFree(
  LPVOID lpAddress,//释放的虚拟内存首地址
  SIZE_T dwSize,//释放多大的内存，通常写页的整数倍。dwFreeType为MEM_RELEASE时，这里必须为0
  DWORD  dwFreeType//释放方式：MEM_DECOMMIT只取消占用物理页，虚拟地址依然保留；MEM_RELEASE表示物理页不占用的同时也释放虚拟地址，如果指定此值，则dwSize必须为 0
);
//VirtualAllocEx只比VirtualAlloc多一个进程句柄，可以给别人申请内存
LPVOID VirtualAllocEx(
  HANDLE hProcess,//申请内存的目标进程句柄
  LPVOID lpAddress,
  SIZE_T dwSize,
  DWORD  flAllocationType,
  DWORD  flProtect
);
```

`可在微软官方开发者手册搜索Memory Protection Constants，有flProtect参数的可选项罗列`

## 公有内存申请释放

### 公有内存申请释放案例

```cpp
//创建内核对象:物理页
HANDLE hMapFile=CreateFileMapping((HANDLE)-1, NULL, PAGE_READWRITE, 0, 0x1000, NULL);
//将物理页与线性地址进行映射
DWORD newMemAddress=(DWORD)MapViewOfFile(hMapFile, FILE_MAP_ALL_ACCESS, 0, 0, 0x1000);
//简单使用一下地址
*(DWORD*)newMemAddress = 0x12345678;
printf("%p虚拟地址中的值为：%p\r\n", newMemAddress, *(DWORD*)newMemAddress);
//关闭映射
UnmapViewOfFile((LPCVOID)newMemAddress);
//关闭物理页内核对象句柄
CloseHandle(hMapFile);
```

结果：

![image-20210628152849905](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210628152849905.png)

下断点查看那块内存：

![image-20210628153031108](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210628153031108.png)

### CreateFileMapping函数（重点）

**创建或打开文件映射内核对象**

功能上：申请物理页或者申请物理页并把文件映射到物理页

```cpp
//返回文件映射内核对象句柄
//如果对象在函数调用之前存在，则函数返回现有对象的句柄（使用其当前大小，而不是指定大小），并且GetLastError返回ERROR_ALREADY_EXISTS。
//如果函数失败，则返回值为NULL
HANDLE CreateFileMappingA(
  HANDLE                hFile,//文件句柄，如果指定了文件句柄，不仅给你提供物理页，还可以把这个文件映射到物理页上面。填-1表示只要物理页，不需要映射文件。
  LPSECURITY_ATTRIBUTES lpFileMappingAttributes,//安全属性
  DWORD                 flProtect,//保护属性：这个是设置的物理内存的访问权限。PAGE_READONLY,PAGE_READWRITE,PAGE_WRITECOPY等等，设置了该物理内存的访问权限，则其挂到的虚拟内存的访问权限必须小于等于该物理页的访问权限
    //下面两项共同表示你要多大一块物理内存；若关联文件，如果此参数和dwMaximumSizeHigh为 0（零），则文件映射对象的最大大小等于hFile标识的文件的当前大小 。
  DWORD                 dwMaximumSizeHigh,//高32位，32位系统用不上这个成员一定填空
  DWORD                 dwMaximumSizeLow,//低32位
  LPCSTR                lpName//内核对象的名字，其他进程打开该内核对象才需要此标识。
);
HANDLE CreateFileMappingW(
  HANDLE                hFile,
  LPSECURITY_ATTRIBUTES lpFileMappingAttributes,
  DWORD                 flProtect,
  DWORD                 dwMaximumSizeHigh,
  DWORD                 dwMaximumSizeLow,
  LPCWSTR               lpName
);
```

**文件映射内核对象**就可以**理解成**是一个**物理页内核对象**

**CreateFileMapping映射到物理页并不会按照PE格式从硬盘到内存伸缩展开，而是按照文件原来的二进制格式映射到内存中**

他的释放要当所有进程都不用这个物理页的时候，操作系统会将他清除。不使用的时候CloseHandle关闭物理页内核对象句柄。

### MapViewOfFile物理页映射到虚拟地址函数

CreateFileMapping只是申请物理页或者申请物理页并把文件映射到物理页，但并没有映射物理页到进程的虚拟地址空间，下面函数就是实现这个过程。

```cpp
//成功的话返回物理页映射到的虚拟地址首地址
//如果函数失败，则返回值为NULL
LPVOID MapViewOfFile(
  HANDLE hFileMappingObject,//文件映射内核对象的句柄
  DWORD  dwDesiredAccess,//映射的虚拟内存的权限保护属性，这个权限必须小于被映射的物理页的flProtect权限保护属性(否则该函数失败)。
    //FILE_MAP_ALL_ACCESS可读可写;
    //FILE_MAP_READ只读;
    //FILE_MAP_WRITE只写。
    //前面3个属性唯一一个可与后面属性按位或|组合：
    //FILE_MAP_EXECUTE可执行;
    //FILE_MAP_COPY写拷贝（表示当修改的时候提供副本物理页供修改而不是修改原物理页，下面《内存映射文件实现读写文件的系统文件共享的注意点》有详解）等等。
    //--------------------------------------------------------------------
    //下面两项共同表示从物理页的哪里开始映射到虚拟内存空间，是相对物理页的偏移地址
  DWORD  dwFileOffsetHigh,//高32位，32位系统用不上这个成员一定填空
  DWORD  dwFileOffsetLow,//低32位
  SIZE_T dwNumberOfBytesToMap//映射物理页的多少字节数到虚拟内存空间，必须在CreateFileMapping指定的最大大小范围内。如果此参数为 0，则映射从指定的偏移量扩展到文件映射的末尾（就是整个物理页的大小）。一般与CreateFileMappingA的dwMaximumSizeHigh和dwMaximumSizeLow的组合一致
);
//解除物理页到虚拟内存空间的映射关系，解除完后物理页还是存在的
BOOL UnmapViewOfFile(
  LPCVOID lpBaseAddress//物理页映射出来的虚拟内存首地址，MapViewOfFile返回的地址
);
```

**【重点】其实一个进程中绝大多数内存都是映射内存，只有如堆和栈还有自己virtualAlloc的空间才是私有内存。**

# 文件系统

文件系统是操作系统用来管理磁盘上文件的方法和数据结构；简单点说就是**在磁盘上如何组织文件的方法**。

|              | NTFS      | FAT32  |
| ------------ | --------- | ------ |
| 磁盘分区容量 | 2T(2048G) | 32G    |
| 单个文件容量 | 4G以上    | 最大4G |
| EFS加密      | 支持      | 不支持 |
| 磁盘配额     | 支持      | 不支持 |

**EFS加密**：是让同一个电脑上别的用户无法访问

下图设置加密：

![image-20210630122311355](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210630122311355.png)

**磁盘配额**：让别的用户只能固定使用某个磁盘多少空间

![image-20210630122444855](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210630122444855.png)

文件系统：

![image-20210628154143292](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210628154143292.png)

## 文件相关API

文件相关API不需要区分文件系统的概念。windows API已经屏蔽了文件系统的底层实现。

### 卷相关API

硬盘分成多个虚拟逻辑驱动器，这个虚拟逻辑驱动器就是**卷**。

**卷**是文件系统最上层的组织形式。

1. 获取卷(有哪些卷，是什么)GetLogicalDrives
2. 获取一个卷的盘符的字符串GetLogicalDriveStrings
3. 获取卷的类型GetDriveType
4. 获取卷的信息GetVolumeInformation

#### GetLogicalDrives

```cpp
//如果函数成功，则返回值是表示当前可用磁盘驱动器的位掩码。位位置 0（最低有效位）是驱动器 A，位位置 1 是驱动器 B，位位置 2 是驱动器 C，依此类推。
//如果函数失败，则返回值为零。要获取扩展错误信息，请调用 GetLastError。
DWORD GetLogicalDrives();
```

#### GetLogicalDriveStrings

```cpp
//如果函数成功，则返回值是复制到缓冲区的字符串的长度（以字符为单位），不包括终止空字符。请注意，ANSI-ASCII 空字符使用一个字节，而 Unicode (UTF-16) 空字符使用两个字节。
//如果缓冲区不够大，则返回值大于nBufferLength。它是保存驱动器字符串所需的缓冲区大小。
//如果函数失败，则返回值为零。要获取扩展错误信息，请使用 GetLastError函数。
DWORD GetLogicalDriveStringsA(
  DWORD nBufferLength,//缓冲区的最大大小(不包括终止空字符)
  LPSTR lpBuffer//指向缓冲区的指针，该缓冲区接收一系列以空字符结尾的字符串
);
DWORD GetLogicalDriveStringsW(
  DWORD  nBufferLength,
  LPWSTR lpBuffer
);
```

lpBuffer获取到的字符串如下：

![image-20210703130407329](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703130407329.png)

#### GetDriveType

```cpp
//确定磁盘驱动器是可移动、固定、CD-ROM、RAM 磁盘还是网络驱动器。
UINT GetDriveTypeA(
  LPCSTR lpRootPathName//驱动器的根目录。需要尾随反斜杠。如果此参数为NULL，则该函数使用当前目录的根目录。
);
UINT GetDriveTypeW(
  LPCWSTR lpRootPathName
);
```

[详细信息查询文档](https://docs.microsoft.com/zh-cn/windows/win32/api/fileapi/nf-fileapi-getdrivetypew)

#### GetVolumeInformation

```cpp

BOOL GetVolumeInformationA(
  LPCSTR  lpRootPathName,//IN 磁盘驱动器代码字符串
  LPSTR   lpVolumeNameBuffer,//OUT 磁盘驱动器卷标名称(别名)
  DWORD   nVolumeNameSize,//IN 磁盘驱动器卷标名称长度
  LPDWORD lpVolumeSerialNumber,//OUT 磁盘驱动器卷标序列号（不是硬盘序列号，该号是硬盘出厂时生产厂家为区别产品而设置的，就像人的身份证）
  LPDWORD lpMaximumComponentLength,//OUT 系统允许的最大文件名长度
  LPDWORD lpFileSystemFlags,//OUT 文件系统标识
  LPSTR   lpFileSystemNameBuffer,//OUT 文件操作系统名称
  DWORD   nFileSystemNameSize//IN 文件操作系统名称长度
);
BOOL GetVolumeInformationW(
  LPCWSTR lpRootPathName,
  LPWSTR  lpVolumeNameBuffer,
  DWORD   nVolumeNameSize,
  LPDWORD lpVolumeSerialNumber,
  LPDWORD lpMaximumComponentLength,
  LPDWORD lpFileSystemFlags,
  LPWSTR  lpFileSystemNameBuffer,
  DWORD   nFileSystemNameSize
);
```

##### **使用案例**

```cpp
	TCHAR szVolumneName[260] = { 0 };
	DWORD dwVolumneSerial = 0;
	DWORD dwMaxLength = 0;
	DWORD dwFileSystem = 0;
	TCHAR szFileSystem[260] = { 0 };
	GetVolumeInformation(TEXT("C://"), szVolumneName, 260, &dwVolumneSerial, &dwMaxLength, &dwFileSystem, szFileSystem, 260);
```

![image-20210703132545845](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703132545845.png)

### 目录相关API

1. 创建目录CreateDirectory
2. 删除现有空目录RemoveDirectory
3. 修改目录名称MoveFile
4. 获取程序当前目录GetCurrentDirectory
5. 设置程序当前目录SetCurrentDirectory

`要具备管理员权限`

#### CreateDirectory

目录也是个**内核对象**

```cpp
//如果函数成功，则返回值非零。
//如果函数失败，则返回值为零。要获取扩展错误信息，请调用 GetLastError。
//ERROR_ALREADY_EXISTS	指定的目录已经存在。
//ERROR_PATH_NOT_FOUND	一个或多个中间目录不存在；此函数只会在路径中创建最终目录。
BOOL CreateDirectoryA(
  LPCSTR                lpPathName,//要创建的目录的路径。
  LPSECURITY_ATTRIBUTES lpSecurityAttributes//安全属性
);
BOOL CreateDirectoryW(
  LPCWSTR               lpPathName,
  LPSECURITY_ATTRIBUTES lpSecurityAttributes
);
```

#### RemoveDirectory

只能删除现有的**空目录**

```cpp
//如果函数成功，则返回值非零。
//如果函数失败，则返回值为零。
BOOL RemoveDirectoryA(
  LPCSTR lpPathName//要删除的目录的路径。此路径必须指定一个空目录，并且调用进程必须对该目录具有删除权限。
);
BOOL RemoveDirectoryW(
  LPCWSTR lpPathName
);
```

#### MoveFile

**移动**现有文件或目录，包括其子目录。（可以用于**改名**）

```cpp
BOOL MoveFileA(
  LPCSTR lpExistingFileName,//原路径（文件或目录）
  LPCSTR lpNewFileName//新路径（文件或目录）
);
BOOL MoveFileW(
  LPCWSTR lpExistingFileName,
  LPCWSTR lpNewFileName
);
```

#### GetCurrentDirectory/SetCurrentDirectory

获取和设置工作目录绝对路径

```cpp
//获取当前进程的当前目录。
DWORD GetCurrentDirectory(
  DWORD  nBufferLength,//当前目录字符串的缓冲区长度，以TCHARs 为单位。缓冲区长度必须包括用于终止空字符的空间。
  LPTSTR lpBuffer//指向接收当前目录字符串的缓冲区的指针。
);
//更改当前进程的当前目录。
BOOL SetCurrentDirectory(
  LPCTSTR lpPathName//新的当前目录的路径
);
```

### 文件相关API

1. 创建或打开文件或 I/O 设备CreateFile
2. 关闭文件CloseHandle
3. 获取文件长度GetFileSize
4. 获取文件的属性和信息GetFileAttributes()/GetFileAttributesEx
5. 读/写/拷贝/删除 文件ReadFile()/WriteFile()/CopyFile()/DeleteFile
6. 遍历某个盘查找文件FindFirstFile()/FindNextFile

#### CreateFile

创建或打开文件或 I/O 设备。最常用的 I/O 设备如下：文件、文件流、目录、物理磁盘、卷、控制台缓冲区、磁带驱动器、通信资源、邮槽和管道。该函数返回一个句柄，该句柄可用于根据文件或设备以及指定的标志和属性为各种类型的 I/O 访问文件或设备。

```cpp
//如果函数成功，则返回值是指定文件、设备、命名管道或邮槽的句柄。
//如果函数失败，则返回值为INVALID_HANDLE_VALUE。要获取扩展错误信息，请调用GetLastError。
HANDLE CreateFileA(
  LPCSTR                lpFileName,//文件名
  DWORD                 dwDesiredAccess,//访问模式，权限
  DWORD                 dwShareMode,//分享模式,0表示当前创建的文件使用是排他的，只有当前程序关闭后才能读写该文件;FILE_SHARE_DELETE表示在当前程序使用中，别的程序可以删掉。详情查看说明文档
  LPSECURITY_ATTRIBUTES lpSecurityAttributes,//安全属性
  DWORD                 dwCreationDisposition,//创建的处理方式:
    //CREATE_NEW创建一个新文件，仅当它不存在时；
    //OPEN_EXISTING打开文件或设备，仅当它存在时；
    //TRUNCATE_EXISTING打开一个文件并截断它，使其大小为零字节，仅当它存在时。
    //OPEN_ALWAYS总是打开一个文件。不存在就创建
    //CREATE_ALWAYS不存在的话创建，存在的话覆盖创建
  DWORD                 dwFlagsAndAttributes,//标志和属性，例如：FILE_ATTRIBUTE_HIDDEN文件属性设置为隐藏;FILE_ATTRIBUTE_NORMAL该文件没有设置其他属性，此属性仅在单独使用时有效。还有很多属性参考说明文档
  HANDLE                hTemplateFile//此参数可以为NULL。基本只在加密文件文件时用到该参数。详情看文档
);
HANDLE CreateFileW(
  LPCWSTR               lpFileName,
  DWORD                 dwDesiredAccess,
  DWORD                 dwShareMode,
  LPSECURITY_ATTRIBUTES lpSecurityAttributes,
  DWORD                 dwCreationDisposition,
  DWORD                 dwFlagsAndAttributes,
  HANDLE                hTemplateFile
);
```

##### 案例

```cpp
//确定C:\\路径没有A.txt的情况下，在C盘下创建A.txt。并且该程序使用该文件时候，其他程序可读可写
HANDLE hFile = CreateFile(
		TEXT("C:\\A.txt"),
		GENERIC_READ|GENERIC_WRITE,
		0,
		NULL,
		CREATE_NEW,
		FILE_ATTRIBUTE_NORMAL,
		NULL
		);
```

#### GetFileSize

```cpp
//若成功，返回的是文件大小低位双字
//如果函数失败并且lpFileSizeHigh为NULL，则返回值为INVALID_FILE_SIZE。
DWORD GetFileSize(
  HANDLE  hFile,//文件句柄
  LPDWORD lpFileSizeHigh//指向返回文件大小高位双字的变量的指针，若不需要高位这里设置NULL
);
```

该函数成功的话，对于大文件来说，返回值和lpFileSizeHigh参数共同组成**文件大小**

#### GetFileAttributes()/GetFileAttributesEx

检索指定文件或目录的属性。

```cpp
BOOL GetFileAttributesExA(
  LPCSTR                 lpFileName,//要获取属性的文件或目录路径名
  GET_FILEEX_INFO_LEVELS fInfoLevelId,//GetFileExInfoStandard，所述lpFileInformation参数是一个 WIN32_FILE_ATTRIBUTE_DATA 结构。
  LPVOID                 lpFileInformation//指向接收属性信息的结构体指针。
);
BOOL GetFileAttributesExW(
  LPCWSTR                lpFileName,
  GET_FILEEX_INFO_LEVELS fInfoLevelId,
  LPVOID                 lpFileInformation
);
DWORD GetFileAttributesA(
  LPCSTR lpFileName
);
DWORD GetFileAttributesW(
  LPCWSTR lpFileName
);
```

[WIN32_FILE_ATTRIBUTE_DATA](https://docs.microsoft.com/en-us/windows/desktop/api/fileapi/ns-fileapi-win32_file_attribute_data)结构

```cpp
typedef struct _WIN32_FILE_ATTRIBUTE_DATA {
  DWORD    dwFileAttributes;//文件或目录的文件系统属性信息。详情见文档
  FILETIME ftCreationTime;//创建时间结构体
  FILETIME ftLastAccessTime;//最后访问时间结构体
  FILETIME ftLastWriteTime;//最后修改时间结构体
  DWORD    nFileSizeHigh;//文件大小的高位 DWORD。
  DWORD    nFileSizeLow;//文件大小的低位 DWORD。
} WIN32_FILE_ATTRIBUTE_DATA, *LPWIN32_FILE_ATTRIBUTE_DATA;
```

**FILETIME结构体**

```cpp
typedef struct _FILETIME {
  DWORD dwLowDateTime;//文件时间的低位部分。
  DWORD dwHighDateTime;//文件时间的高位部分。
} FILETIME, *PFILETIME, *LPFILETIME;
```

要将 **FILETIME**结构转换为易于向用户显示的时间，请使用 [FileTimeToSystemTime](https://docs.microsoft.com/en-us/windows/desktop/api/timezoneapi/nf-timezoneapi-filetimetosystemtime)函数。

#### ReadFile()/WriteFile()/CopyFile()/DeleteFile

```cpp
BOOL ReadFile(
  HANDLE       hFile,//读的文件句柄
  LPVOID       lpBuffer,//读到哪去
  DWORD        nNumberOfBytesToRead,//要读多少个字节
  LPDWORD      lpNumberOfBytesRead,//读了多少个
  LPOVERLAPPED lpOverlapped//网络编程的异步模型要关注的参数，暂不管,填NULL
);
BOOL WriteFile(
  HANDLE       hFile,
  LPCVOID      lpBuffer,//写什么
  DWORD        nNumberOfBytesToWrite,
  LPDWORD      lpNumberOfBytesWritten,
  LPOVERLAPPED lpOverlapped
);
BOOL CopyFile(
  LPCTSTR lpExistingFileName,//拷贝哪个文件
  LPCTSTR lpNewFileName,//拷贝到哪里
  BOOL    bFailIfExists//如果此参数为TRUE并且lpNewFileName指定的新文件 已经存在，则函数失败。如果此参数为 FALSE且新文件已存在，则该函数会覆盖现有文件并成功。
);
BOOL DeleteFileA(
  LPCSTR lpFileName//要删除的文件路径
);
BOOL DeleteFileW(
  LPCWSTR lpFileName
);
```

##### 读取文件案例

test.txt如图：

![image-20210703161630006](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703161630006.png)

```cpp
HANDLE hFile = CreateFile(
		TEXT("C:\\Users\\Administrator\\Desktop\\test.txt"),
		GENERIC_READ | GENERIC_WRITE,
		0,
		NULL,
		OPEN_EXISTING,
		FILE_ATTRIBUTE_NORMAL,
		NULL
		);
	cout<<hFile<<endl;
	if (hFile)
	{
		//读取文件
		//	分配空间
		char* pszBuffer;
		DWORD lowSize =GetFileSize(hFile, NULL);//文件不能过大
		if (lowSize)
		{
			pszBuffer = (char*)malloc(lowSize+1);
			ZeroMemory(pszBuffer, lowSize + 1);
			//	设置当前读取的位置
			SetFilePointer(hFile, 0, NULL, FILE_BEGIN);//设置hFile对应文件光标为从文件头偏移0个字节的位置
			//读取数据
			DWORD dwReadLength = 0;
			ReadFile(hFile, pszBuffer, lowSize, &dwReadLength, NULL);
			cout<<pszBuffer<<endl;
			//关闭文件句柄
			CloseHandle(hFile);
			//释放内存
			free(pszBuffer);
		}
	}
```

案例输出如图：

![image-20210703161739985](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703161739985.png)

`红线是bom头`

##### 写文件案例

```cpp
char szBuffer[] = "中国123";
DWORD dwWritten = 0;
WriteFile(hFile, szBuffer, strlen(szBuffer), &dwWritten, NULL);
```

结果如图：

![image-20210703163120600](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703163120600.png)

##### 拷贝文件和删除文件案例

```cpp
//拷贝文件
CopyFileA("C:\\test.txt","C:\\test2.txt",FALSE);
//删除文件
DeleteFileA("C:\\test.txt");
```

#### FindFirstFile()/FindNextFile

根据文件名查找文件。该函数到一个文件夹(包括子文件夹)去搜索指定文件（或部分名称，如果使用通配符）。

```cpp
//如果函数成功，则返回值是在随后调用FindNextFile或 FindClose 时使用的搜索句柄 ，并且 lpFindFileData参数包含有关找到的第一个文件或目录的信息。
//如果函数失败或无法从lpFileName参数中的搜索字符串中定位文件 ，则返回值为 INVALID_HANDLE_VALUE并且lpFindFileData的内容不确定。
HANDLE FindFirstFileA(
  LPCSTR             lpFileName,//欲搜索的目录或路径，以及文件名。文件名可以包含通配符，例如星号 (*) 或问号 (?)。
  LPWIN32_FIND_DATAA lpFindFileData//指向WIN32_FIND_DATA结构的指针，该结构接收有关找到的文件或目录的信息。
);
HANDLE FindFirstFileW(
  LPCWSTR            lpFileName,
  LPWIN32_FIND_DATAW lpFindFileData
);
BOOL FindNextFileA(
  HANDLE             hFindFile,//搜索句柄
  LPWIN32_FIND_DATAA lpFindFileData
);
BOOL FindNextFileW(
  HANDLE             hFindFile,
  LPWIN32_FIND_DATAW lpFindFileData
);
```

##### WIN32_FIND_DATA结构

```cpp
//包含有关FindFirstFile、 FindFirstFileEx或 FindNextFile函数找到的文件的信息 。
typedef struct _WIN32_FIND_DATAA {
  DWORD    dwFileAttributes;//文件的文件属性。
  FILETIME ftCreationTime;//创建时间结构体
  FILETIME ftLastAccessTime;//最后访问时间结构体
  FILETIME ftLastWriteTime;//最后修改时间结构体
  DWORD    nFileSizeHigh;//文件大小高DWORD
  DWORD    nFileSizeLow;//文件大小低DWORD
  DWORD    dwReserved0;//如果dwFileAttributes成员包括 FILE_ATTRIBUTE_REPARSE_POINT属性，则该成员指定重新分析点标记。否则，此值未定义且不应使用。
  DWORD    dwReserved1;//保留以备将来使用。
  CHAR     cFileName[MAX_PATH];//文件名。
  CHAR     cAlternateFileName[14];//长文件名才有的文件的替代名称，是截断版本，否则为NULL。
  //下面三个参数开发文档未说明
  DWORD    dwFileType;
  DWORD    dwCreatorType;
  WORD     wFinderFlags;
} WIN32_FIND_DATAA, *PWIN32_FIND_DATAA, *LPWIN32_FIND_DATAA;
```

dwFileAttributes可以是如下属性，通过这个字段可以检查找到的究竟是一个文件还是一个子目录

```cpp
●FILE_ATTRIBUTE_ARCHIVE——文件包含归档属性。
●FILE_ATTRIBUTE_COMPRESSED——文件和目录被压缩。
●FILE_ATTRIBUTE_DIRECTORY——找到的是一个目录。
●FILE_ATTRIBUTE_HIDDEN——文件包含隐含属性。
●FILE_ATTRIBUTE_NORMAL——文件没有其他属性。
●FILE_ATTRIBUTE_READONLY——文件包含只读属性。
●FILE_ATTRIBUTE_SYSTEM——文件包含系统属性。
●FILE_ATTRIBUTE_TEMPORARY——文件是一个临时文件。
```

##### 查找文件案例

![image-20210703170047278](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703170047278.png)

```cpp
_WIN32_FIND_DATAA p;
	HANDLE h = FindFirstFileA("C:\\Users\\Administrator\\Desktop\\123\\*.txt", &p);
	puts(p.cFileName);
	while (FindNextFileA(h, &p))
		puts(p.cFileName);
```

![image-20210703170103293](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703170103293.png)

# 内存映射文件实现读写文件

内存映射文件：把一个硬盘里的文件直接映射到物理页上，直接再把物理页映射到进程的虚拟内存里（如图）

![image-20210703185707851](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703185707851.png)![image-20210703222153407](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703222153407.png)

优点：对于大文件的读写性能非常好，操作方便，可以在**多个进程中共享**

步骤：

1. CreateFile得到文件句柄
2. CreateFileMapping创建物理页并映射文件
3. MapViewOfFile将物理页映射到虚拟内存

> **【注意】**文件大小要修正的情况
>
> 如果要修改文件的大小，CreateFileMapping这个函数共有6个参数。它的第五个跟第六个函数告诉我们我们要映射文件的高32位的最大值，与低32位的最小值，如果两个都为零的话，它默认映射的大小就是原文件的大小，所以你在试图修改它的映射文件并把它映射回去的时候，会出现比原文件大的情况，这样就出现映射回去的时候只有原文件大小截断部分的问题了。所有，我们在映射文件到到内存之前，最好求出我们修改后的文件大小，给CreateFileMapping函数。
>
> 在参数dwMaximumSizeHigh和dwMaximumSizeLow中指定内存映射文件的大小，如果指定的值大于实际的文件，则实际的文件将增长到指定的大小

```cpp
	HANDLE hFile = CreateFile(
		TEXT("C:\\Users\\Administrator\\Desktop\\test.txt"),
		GENERIC_READ | GENERIC_WRITE,
		0,
		NULL,
		OPEN_EXISTING,
		FILE_ATTRIBUTE_NORMAL,
		NULL
		);
	if (hFile==INVALID_HANDLE_VALUE)
	{
		cout<<"创建文件失败"<<endl;
		return 0;
	}
	//创建FileMapping对象
	HANDLE hMapFile = CreateFileMapping(hFile, NULL, PAGE_READWRITE, 0, 0, NULL);
	if (hMapFile==NULL)
	{
		cout<<"创建文件映射失败"<<endl;
		CloseHandle(hFile);
		return 0;
	}
	//映射到虚拟内存
	LPVOID lpAddr = MapViewOfFile(hMapFile, FILE_MAP_ALL_ACCESS, 0, 0, 0);
	if (lpAddr==NULL)
	{
		cout<<"物理页映射到虚拟地址失败"<<endl;
		CloseHandle(hMapFile);
		CloseHandle(hFile);
		return 0;
	}
	//在内存中直接读取文件
	char tmp = *(char*)lpAddr;
	cout << "读到的第一个字符是：" << tmp << endl;
	
	//在内存中写文件
	*(char*)lpAddr = 'a';
	FlushViewOfFile(lpAddr, 1);//强制更新缓存

	cout<<"修改后的第一个字符为："<< *(char*)lpAddr <<endl;
	//释放资源
	UnmapViewOfFile(lpAddr);
	CloseHandle(hMapFile);
	CloseHandle(hFile);
```

程序结果：

![image-20210703221045789](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703221045789.png)

原本的文件：

![image-20210703193415048](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703193415048.png)

修改后的文件：

![image-20210703220919906](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703220919906.png)

## FlushViewOfFile

**【注意】**内存映射文件这种方式的写入，为了保证效率，所以其写入不是实时写入，而是释放资源的时候才会做收尾工作，即真正改写映射的文件（把物理页的值写回到文件里）。但可以通过下面的函数强制马上写入：

将文件映射指定范围的字节即刻写入硬盘（强制更新缓存）

```cpp
//如果函数成功，则返回值非零。
//如果函数失败，则返回值为零。
BOOL FlushViewOfFile(
  LPCVOID lpBaseAddress,//要刷新写入硬盘文件的虚拟内存首地址
  SIZE_T  dwNumberOfBytesToFlush//刷新几个字节
);
```

## 系统文件共享的注意点（重点理解）

![image-20210703222600004](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703222600004.png)

如kernel32.dll，user32.dll和ntdll.dll等系统模块，他在内存中就是文件映射到进程中的。

**Q：**那么如果你在进程A中修改了系统文件的物理页，那么进程B不就直接受到影响了吗。

但事实上是并不会，例如进程A在kernel32.dll的代码上下软件断点（实际上就是把一个字节改成了0xCC表示汇编int 3），当前A进程执行到这里会断下来，但进程B执行到那里却不会断下来

**A：**如果在MapViewOfFile映射的时候指定的是写拷贝**FILE_MAP_COPY**的话，就会产生上述效果，原理如下：

![image-20210703223924648](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703223924648.png)![image-20210703224651453](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210703224651453.png)

当进程A修改的时候，并不会对原映射的物理页做修改，而是拷贝一份修改处的最少一页的物理页。然后再修改新出现的**物理页副本**。并且修改虚拟地址对物理页的映射关系（如上面右图）。最后映射结束的时候，对物理页的副本做的所有操作也并不会写回到文件中。

如上图，进程A下断点修改的CC实际上是修改到了上面标着CC的物理页副本，对原来的没影响

# 链接库

## 静态链接库

### 编写静态链接库文件

1. 在vc6.0中创建新项目，项目类型：Win32 Static Library
2. 在项目中创建xxxx.h和xxxx.cpp 编写代码，然后构建即可

在项目目录中会生成xxxx.lib文件

### 静态链接库的使用(两种方式)

1. 将生成的.h和.lib文件复制到项目根目录，然后再代码中引用：

   ```cpp
   #include "xxxx.h"
   #pragma comment(lib,"xxxx.lib")
   ```

2. 将xxxx.h与xxxx.lib文件复制到vc6安装目录，与库文件放在一起。然后在工程->设置->连接->对象/库模块中添加xxxx.lib

**静态链接库的缺点：**

1. 使用静态链接生成的可执行文件体积较大
2. 包含相同的公共代码，造成浪费

**静态库会和所写代码编到一个模块**

## 动态链接库

动态链接库（Dynamic Link Library，缩写为DLL），是微软公司在微软Windows操作系统中，实现共享函数库概念的一种方式。

这些库函数的拓展名是".dll",".ocx"（包含ActiveX控制的库）

### **DLL的入口点**

动态链接库中的可选入口点 (DLL) 。 当系统启动或终止进程或线程时，它将使用进程的第一个线程为每个加载的 DLL 调用入口点函数。 使用 [**LoadLibrary**](https://docs.microsoft.com/zh-cn/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibrarya) 和 [**FreeLibrary**](https://docs.microsoft.com/zh-cn/windows/win32/api/libloaderapi/nf-libloaderapi-freelibrary) 函数加载或卸载 DLL 时，系统还会为其调用入口点函数。

```cpp
BOOL WINAPI DllMain(
    HINSTANCE hinstDLL,  // handle to DLL module	当前DLL的模块句柄
    DWORD fdwReason,     // reason for calling function	这个DLL入口函数被调用的原因
    LPVOID lpReserved )  // reserved	不同调用原因，含义不同
{
    // Perform actions based on the reason for calling.
    switch( fdwReason ) 
    { 
        case DLL_PROCESS_ATTACH://附加进程的时候
         // Initialize once for each new process.为每个新进程初始化一次。一个进程第一次加载dll的时候调用
         // Return FALSE to fail DLL load.
            break;

        case DLL_THREAD_ATTACH:
         // Do thread-specific initialization.执行特定于线程的初始化。子线程调用LoadLibrary
            break;

        case DLL_THREAD_DETACH://解除附加进程的时候
         // Do thread-specific cleanup.执行特定于线程的清理。已LoadLibrary的子线程结束的时候调用
            break;

        case DLL_PROCESS_DETACH:
         // Perform any necessary cleanup.
            break;
    }
    return TRUE;  // Successful DLL_PROCESS_ATTACH.
}
```

[进一步详情见说明文档]: https://docs.microsoft.com/en-us/windows/win32/dlls/dllmain

### 创建动态链接库(两种方法)

1. 函数声明用以下方式声明表明该函数要导出

   ```cpp
   extern "C" _declspec(dllexport) 调用约定 返回类型 函数名 (参数列表);
   ```

2. 使用.def文件：

   ```
   EXPORTS
   函数名	@编号
   函数名	@编号	NONAME
   ```

使用序号导出的好处：

名字是一段程序最精华的注释，通过名字可以直接猜测到函数的功能，通过使用序号，可以达到隐藏的目的

### 使用动态链接库(两种方法)

1. 显示链接
2. 隐式链接

#### 显示链接

**显示链接只需要用到一个DLL**

步骤如下：

1. 定义函数指针,如

   ```cpp
   typedef int (__stdcall *lpPlus)(int,int);
   typedef int (__stdcall *lpSub)(int,int);
   ```

2. 声明函数指针变量，如：

   ```cpp
   lpPlus myPlus;
   lpSub mySub;
   ```

3. 动态加载DLL到内存中，如：

   ```cpp
   HINSTANCE hModule = LoadLibrary("DllDemo.dll");
   ```

4. 获取函数地址，如：

   ```cpp
   myPlus=(lpPlus)GetProcAddress(hModule,"Plus");//通过函数名找函数地址
   mySub=(lpSub)GetProcAddress(hModule,(char*)0x10);//通过函数编号找函数地址
   ```

5. 调用函数，如：

   ```cpp
   myPlus(10,2);
   mySub(10,2);
   ```

6. 释放动态链接库，如：

   ```cpp
   FreeLibrary(hModule);
   ```

#### 隐式链接

隐式链接需要用到DLL和LIB文件

> 静态链接库的LIB文件中包含了所有代码；而动态链接库的LIB文件中只包含辅助信息，真正的代码在DLL中

隐式链接步骤如下：

1. 将*.dll和\*.lib放到工程目录下面

2. 将#pragma comment(lib,"DLL名.lib")添加到调用文件中。

3. 加入函数的声明

   ```cpp
   __declspec(dllimport) __stdcall int Plus(int x,int y);
   __declspec(dllimport) __stdcall int Sub(int x,int y);
   ```

4. 之后就可以正常使用该函数了

   ```cpp
   Plus(10,2);
   Sub(10,2);
   ```

**【注意】**

如果导出的时候，是下面这样导出的

```cpp
extern "C" _declspec(dllexport) 调用约定 返回类型 函数名 (参数列表);
```

则上述第三步的位置也要对应写成

```cpp
extern "C" __declspec(dllimport) __stdcall int Plus(int x,int y);
extern "C" __declspec(dllimport) __stdcall int Sub(int x,int y);
```

#### 隐式链接和显示链接的区别

本质上没有什么区别，只是显示链接是我们自己调用LoadLibrary等函数，而隐式链接是操作系统帮我们调用。

## 静态库和动态库在汇编的不同

```assembly
//静态库函数的call   0x4101234直接是函数首地址，直接调用
call 0x4101234
//动态库函数的call   0x0042a190内存中存的值才是函数首地址，是个间接调用
//程序真正运行的时候，才会把对应的函数首地址填入0x0042a190内存的位置
call dword ptr:[0x0042a190]
```

# 远程线程

## CreateRemoteThread

给别的进程中创建线程

```cpp
//和创建线程的区别仅在与多了一个进程句柄
//成功的话返回线程句柄
HANDLE CreateRemoteThread(
  HANDLE                 hProcess,//进程句柄
  LPSECURITY_ATTRIBUTES  lpThreadAttributes,//安全属性
  SIZE_T                 dwStackSize,//堆栈大小，填0表示默认
  LPTHREAD_START_ROUTINE lpStartAddress,//线程函数指针，该线程函数必须存在于远程进程中。
  LPVOID                 lpParameter,//参数
  DWORD                  dwCreationFlags,//创建状态，0表示创建好立即执行
  LPDWORD                lpThreadId//【out】线程id
);
```

## 远线程注入

Q：什么是注入？

A：所谓注入就是在第三方进程不知道或者不允许的情况下将模块或者代码写入对方进程空间，并设法执行的技术。

在安全领域，“注入”是非常重要的一种技术手段，注入与反注入也一直处于不断变化的，而且正处于愈来愈激烈的对抗当中

已知的注入方式：

1. 远程线程注入
2. APC注入
3. 消息钩子注入
4. 注册表注入
5. 导入表注入
6. 输入法注入
7. 等等

**远程线程注入的流程**

1. 在进程A中分配空间，存储DLL的路径
2. 获取LoadLibrary函数的地址
3. 创建远程线程，将线程函数指向为LoadLibrary

```cpp
BOOL WinTool::remoteThreadInject(LPTSTR szProcessname, LPTSTR szDllName)
{
	//打开目标进程句柄
	HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, NULL, getProcessIdByName(szProcessname));//getProcessIdByName为自己封装的函数
	if (!hProcess|| hProcess == INVALID_HANDLE_VALUE)
	{
		outDebugString("WinTool OpenProcess ERROR\n");
		return FALSE;
	}
	//计算DLL路径字符串所需长度
	int dwStrLength=(lstrlen(szDllName)+1) * sizeof(TCHAR);
	//在目标进程分配空间
	LPVOID dwDllStrAddress= VirtualAllocEx(hProcess, NULL, dwStrLength, MEM_COMMIT, PAGE_READWRITE);
	if (!dwDllStrAddress)
	{
		outDebugString("WinTool VirtualAllocEx ERROR\n");
		CloseHandle(hProcess);
		return FALSE;
	}
	//将DLL路径名称拷贝到目标进程内存中

	BOOL bRet = WriteProcessMemory(hProcess, dwDllStrAddress, szDllName, dwStrLength, NULL);
	if (!bRet)
	{
		outDebugString("WinTool WriteProcessMemory ERROR\n");
		VirtualFreeEx(hProcess, dwDllStrAddress, 0, MEM_RELEASE);
		CloseHandle(hProcess);
		return FALSE;
	}
	//获取模块句柄
	HMODULE hModule = GetModuleHandle(TEXT("kernel32.dll"));//同一操作系统下，kernel32.dll位置一样。
	if (!hModule)
	{
		outDebugString("WinTool GetModuleHandle ERROR\n");
		VirtualFreeEx(hProcess, dwDllStrAddress, 0, MEM_RELEASE);
		CloseHandle(hProcess);
		return FALSE;
	}

	//获取LoadLibrary函数地址
#ifdef UNICODE
	DWORD dwLoadLibraryAddress = (DWORD)GetProcAddress(hModule, "LoadLibraryW");
#else
	DWORD dwLoadLibraryAddress = (DWORD)GetProcAddress(hModule, "LoadLibraryA");
#endif // UNICODE
	if (!dwLoadLibraryAddress)
	{
		outDebugString("WinTool GetProcAddress ERROR\n");
		VirtualFreeEx(hProcess, dwDllStrAddress, 0, MEM_RELEASE);
		CloseHandle(hProcess);
		CloseHandle(hModule);
		return FALSE;
	}

	HANDLE hThread = CreateRemoteThread(hProcess, NULL, 0, (LPTHREAD_START_ROUTINE)dwLoadLibraryAddress, dwDllStrAddress, 0, NULL);
	if (!hThread|| hThread == INVALID_HANDLE_VALUE)
	{
		outDebugString("WinTool CreateRemoteThread ERROR\n");
		VirtualFreeEx(hProcess, dwDllStrAddress, 0, MEM_RELEASE);
		CloseHandle(hProcess);
		CloseHandle(hModule);
		return FALSE;
	}
	VirtualFreeEx(hProcess, dwDllStrAddress, 0, MEM_RELEASE);
	CloseHandle(hThread);
	CloseHandle(hProcess);
	CloseHandle(hModule);
	
	return TRUE;
}
```

# 进程间通信

进程间通信有很多种手段

1. 管道
2. 消息队列
3. 信号量
4. 共享内存
5. 等等

看似很多，但本质上都是**共享内存**

`注入游戏的DLL带窗口是没有实用价值的，因为特征太明显了。`

# 三环遍历进程代码

```c
//遍历全部进程名
	PROCESSENTRY32 pe32;
	pe32.dwSize = sizeof(pe32);
	HANDLE hSnapshot_proc = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
	if (hSnapshot_proc != INVALID_HANDLE_VALUE)
	{
		BOOL check = Process32First(hSnapshot_proc, &pe32);
		while (check)
		{
			myOutPutDebug("进程PID = %d 进程名 = %s\n", pe32.th32ProcessID, pe32.szExeFile);
			check = Process32Next(hSnapshot_proc, &pe32);
		}
	}
	CloseHandle(hSnapshot_proc);
```

# 模块隐藏

直接注入的DLL是很容易被目标程序检测到的。

所以需要模块隐藏

TEB和PEB都是三环结构体。

## 模块隐藏之断链

windows的三环API查的就是这些数据块，TEB和PEB

就是注入后，模块已经在进程内存空间中了，在PEB中的Ldr指向的模块双向链表中把注入的模块给断链。用户层API就无法找到你的模块了

### TEB

《1》TEB（Thread Environment Block），它记录的相关线程的信息，每个线程都有自己的TEB，FS:[0]即是**当前线程**的TEB。
$$
mov\ \ eax,fs:[0]
$$


```cpp
typedef struct _TEB {
  PVOID Reserved1[12];
  PPEB  ProcessEnvironmentBlock;//指向PEB
  PVOID Reserved2[399];
  BYTE  Reserved3[1952];
  PVOID TlsSlots[64];
  BYTE  Reserved4[8];
  PVOID Reserved5[26];
  PVOID ReservedForOle;
  PVOID Reserved6[4];
  PVOID TlsExpansionSlots;
} TEB, *PTEB;
//====================偏移详解===================
kd> dt _teb
nt!_TEB
   +0x000 NtTib            : _NT_TIB		//重要成员，内嵌_NT_TIB结构体
   +0x01c EnvironmentPointer : Ptr32 Void
   +0x020 ClientId         : _CLIENT_ID    //内嵌_CLIENT_ID结构，内含进程id和线程id
   +0x028 ActiveRpcHandle  : Ptr32 Void
   +0x02c ThreadLocalStoragePointer : Ptr32 Void
   +0x030 ProcessEnvironmentBlock : Ptr32 _PEB             //重要成员，进程PEB
   +0x034 LastErrorValue   : Uint4B		//上个错误号
   +0x038 CountOfOwnedCriticalSections : Uint4B
   +0x03c CsrClientThread  : Ptr32 Void
   +0x040 Win32ThreadInfo  : Ptr32 Void
   +0x044 User32Reserved   : [26] Uint4B
   +0x0ac UserReserved     : [5] Uint4B
   +0x0c0 WOW32Reserved    : Ptr32 Void
   +0x0c4 CurrentLocale    : Uint4B
   +0x0c8 FpSoftwareStatusRegister : Uint4B
   +0x0cc SystemReserved1  : [54] Ptr32 Void
   +0x1a4 ExceptionCode    : Int4B
   +0x1a8 ActivationContextStack : _ACTIVATION_CONTEXT_STACK
   +0x1bc SpareBytes1      : [24] UChar
   +0x1d4 GdiTebBatch      : _GDI_TEB_BATCH
   +0x6b4 RealClientId     : _CLIENT_ID
   +0x6bc GdiCachedProcessHandle : Ptr32 Void
   +0x6c0 GdiClientPID     : Uint4B
   +0x6c4 GdiClientTID     : Uint4B
   +0x6c8 GdiThreadLocalInfo : Ptr32 Void
   +0x6cc Win32ClientInfo  : [62] Uint4B
   +0x7c4 glDispatchTable  : [233] Ptr32 Void
   +0xb68 glReserved1      : [29] Uint4B
   +0xbdc glReserved2      : Ptr32 Void
   +0xbe0 glSectionInfo    : Ptr32 Void
   +0xbe4 glSection        : Ptr32 Void
   +0xbe8 glTable          : Ptr32 Void
   +0xbec glCurrentRC      : Ptr32 Void
   +0xbf0 glContext        : Ptr32 Void
   +0xbf4 LastStatusValue  : Uint4B
   +0xbf8 StaticUnicodeString : _UNICODE_STRING
   +0xc00 StaticUnicodeBuffer : [261] Uint2B
   +0xe0c DeallocationStack : Ptr32 Void
   +0xe10 TlsSlots         : [64] Ptr32 Void                  //TLS值 是个数组[64]
   +0xf10 TlsLinks         : _LIST_ENTRY
   +0xf18 Vdm              : Ptr32 Void
   +0xf1c ReservedForNtRpc : Ptr32 Void
   +0xf20 DbgSsReserved    : [2] Ptr32 Void
   +0xf28 HardErrorsAreDisabled : Uint4B
   +0xf2c Instrumentation  : [16] Ptr32 Void
   +0xf6c WinSockData      : Ptr32 Void
   +0xf70 GdiBatchCount    : Uint4B
   +0xf74 InDbgPrint       : UChar
   +0xf75 FreeStackOnTermination : UChar
   +0xf76 HasFiberData     : UChar
   +0xf77 IdealProcessor   : UChar
   +0xf78 Spare3           : Uint4B
   +0xf7c ReservedForPerf  : Ptr32 Void
   +0xf80 ReservedForOle   : Ptr32 Void
   +0xf84 WaitingOnLoaderLock : Uint4B
   +0xf88 Wx86Thread       : _Wx86ThreadState
   +0xf94 TlsExpansionSlots : Ptr32 Ptr32 Void                //TLS扩展值 是个数组[Ptr32]
   +0xf98 ImpersonationLocale : Uint4B
   +0xf9c IsImpersonating  : Uint4B
   +0xfa0 NlsCache         : Ptr32 Void
   +0xfa4 pShimData        : Ptr32 Void
   +0xfa8 HeapVirtualAffinity : Uint4B
   +0xfac CurrentTransactionHandle : Ptr32 Void
   +0xfb0 ActiveFrame      : Ptr32 _TEB_ACTIVE_FRAME
   +0xfb4 SafeThunkCall    : UChar
   +0xfb5 BooleanSpare     : [3] UChar
```

```cpp
//重要结构使用说明
FS:[000]   指向SEH链指针
FS:[004]  线程堆栈顶部
FS:[008] 线程堆栈底部
FS:[00C]  SubSystemTib
FS:[010]  FiberData
FS:[014] ArbitraryUserPointer
FS:[018]  指向TEB自身
FS:[020] 进程PID
FS:[024] 线程ID
FS:[02C] 指向线程局部存储指针
FS:[030] PEB结构地址（进程结构）
FS:[034] 上个错误号
```

[TEB详解]: https://docs.microsoft.com/zh-cn/windows/win32/api/winternl/ns-winternl-teb

![image-20210706131700275](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210706131700275.png)

#### NtTib成员

```cpp
//NtTib成员
typedef struct	_NT_TIB{
	 struct	_EXCEPTION_REGISTRATION_RECORD *ExceptionList;//指向_EXCEPTION_REGISTRATION_RECORD结构体组成的链表，它用于WindowsOS的SEH， SEH是Wiondows操作系统中的结构化异常处理机制，常用于反调试技术。
	 PVOID StackBase;
	 PVOID StackLimit; 
	 PVOID SubSystemTib; 
	 union {
		PVOID FiberData; 
		DWORD Version;
	 }; 
	 PVOID ArbitraryUserPointer;
 	 struct	_NT_TIB *Self;//Self成员是_NT_TIB结构体的自引用指针，它指向_NT_TIB结构体，又因为_NT_TIB是TEB结构体的第一个成员，所以它也是指向TEB结构体的指针（它里面存着TEB结构体的地址）。
} NT_TIB;
typedef NT_TIB *PNT_TIB;
//===============偏移详解=============
ntdll!_NT_TIB
   +0x000 ExceptionList    : Ptr32 _EXCEPTION_REGISTRATION_RECORD　　//当前线程内核异常链表(SEH)
   +0x004 StackBase        : Ptr32 Void　　　　　　　　　　　　　　　　　 //当前线程内核的基址（当前线程栈底）
   +0x008 StackLimit       : Ptr32 Void　　　　　　　　　　　　　　　　　 //当前线程内核的大小（当前线程最高允许的栈顶）
   +0x00c SubSystemTib     : Ptr32 Void
   +0x010 FiberData        : Ptr32 Void
   +0x010 Version          : Uint4B
   +0x014 ArbitraryUserPointer : Ptr32 Void
   +0x018 Self             : Ptr32 _NT_TIB　　　　　　　　　　　　　　　 //指向自己头部，目的为了方便查找
```

_CLIENT_ID成员

```cpp
kd> dt _CLIENT_ID
nt! CLIENT_ID
    +0x000 UniqueProcess  : Ptr32 Void//当前线程所属的进程ID
    +0x004 UniqueThread   : Ptr32 Void//当前线程ID
```

> 32位系统FS三环时指向TEB，零环时用KPCR，而**64位系统三环时用GS指向TEB**，零环时GS指向KPCR（之前32位windows下根本没用过GS），也就是说，在64位下不再用FS指向KPCR和TEB，64位下用GS取代了FS，FS则继续留给32位程序继续用

### PEB

《2》PEB（Process Environment Block，进程环境块）存放进程信息，每个进程都有自己的PEB信息，TEB偏移0x30的位置就是当前进程的PEB
$$
mov\ \ eax,fs:[0x30]
$$
不同的windows版本中TEB结构会不同

```cpp
typedef struct _PEB {               // Size: 0x1D8
    000h    UCHAR           InheritedAddressSpace;
    001h    UCHAR           ReadImageFileExecOptions;
    //下面参数标识当前进程是否处于调试状态，Kernel32.dll中的IsDebuggerPresent() API就是用来获取该处的值的（是，则返回1；否，则返回0）。【破解之法】只要借助OllyDbg调试器的编辑功能，将PEB.BeingDebugged的值修改为0（FALSE）即可。
    002h    UCHAR           BeingDebugged;      //Debug运行标志(可用于反调试技术)，只要该进程被调试就会被置1
    003h    UCHAR           SpareBool;
    004h    HANDLE          Mutant;
    008h    HINSTANCE       ImageBaseAddress;  //程序加载的基地址
    00Ch    struct _PEB_LDR_DATA    *Ldr    //Ptr32 指向_PEB_LDR_DATA结构体，记录了程序包含哪些模块(可用于反调试技术)
    010h    struct _RTL_USER_PROCESS_PARAMETERS  *ProcessParameters;
    014h    ULONG           SubSystemData;
    018h    HANDLE          DefaultHeap;    //(可用于反调试技术)
    01Ch    KSPIN_LOCK      FastPebLock;
    020h    ULONG           FastPebLockRoutine;
    024h    ULONG           FastPebUnlockRoutine;
    028h    ULONG           EnvironmentUpdateCount;
    02Ch    ULONG           KernelCallbackTable;
    030h    LARGE_INTEGER   SystemReserved;
    038h    struct _PEB_FREE_BLOCK  *FreeList
    03Ch    ULONG           TlsExpansionCounter;
    040h    ULONG           TlsBitmap;
    044h    LARGE_INTEGER   TlsBitmapBits;
    04Ch    ULONG           ReadOnlySharedMemoryBase;
    050h    ULONG           ReadOnlySharedMemoryHeap;
    054h    ULONG           ReadOnlyStaticServerData;
    058h    ULONG           AnsiCodePageData;
    05Ch    ULONG           OemCodePageData;
    060h    ULONG           UnicodeCaseTableData;
    064h    ULONG           NumberOfProcessors;
    068h    LARGE_INTEGER   NtGlobalFlag;               // Address of a local copy(可用于反调试技术)
    070h    LARGE_INTEGER   CriticalSectionTimeout;
    078h    ULONG           HeapSegmentReserve;
    07Ch    ULONG           HeapSegmentCommit;
    080h    ULONG           HeapDeCommitTotalFreeThreshold;
    084h    ULONG           HeapDeCommitFreeBlockThreshold;
    088h    ULONG           NumberOfHeaps;
    08Ch    ULONG           MaximumNumberOfHeaps;
    090h    ULONG           ProcessHeaps;
    094h    ULONG           GdiSharedHandleTable;
    098h    ULONG           ProcessStarterHelper;
    09Ch    ULONG           GdiDCAttributeList;
    0A0h    KSPIN_LOCK      LoaderLock;
    0A4h    ULONG           OSMajorVersion;
    0A8h    ULONG           OSMinorVersion;
    0ACh    USHORT          OSBuildNumber;
    0AEh    USHORT          OSCSDVersion;
    0B0h    ULONG           OSPlatformId;
    0B4h    ULONG           ImageSubsystem;
    0B8h    ULONG           ImageSubsystemMajorVersion;
    0BCh    ULONG           ImageSubsystemMinorVersion;
    0C0h    ULONG           ImageProcessAffinityMask;
    0C4h    ULONG           GdiHandleBuffer[0x22];
    14Ch    ULONG           PostProcessInitRoutine;
    150h    ULONG           TlsExpansionBitmap;
    154h    UCHAR           TlsExpansionBitmapBits[0x80];
    1D4h    ULONG           SessionId;
} PEB, *PPEB;
```

#### _PEB_LDR_DATA

PEB loader data 进程环境块装载机信息

```cpp
typedef struct _PEB_LDR_DATA
{
　ULONG         Length;                             // 00h
　BOOLEAN       Initialized;                        // 04h
　PVOID         SsHandle;                           // 08h
　LIST_ENTRY    InLoadOrderModuleList;              // 0ch，加载的时候按顺序有哪些模块的双向链表
　LIST_ENTRY    InMemoryOrderModuleList;            // 14h,加载完了后在内存中有哪些模块的双向链表
　LIST_ENTRY    InInitializationOrderModuleList;    // 1ch，按模块初始化顺序存的双向链表
}PEB_LDR_DATA,*PPEB_LDR_DATA;                       // 24h
```

##### LIST_ENTRY

```cpp
nt!_LIST_ENTRY
   +0x000   Flink       : Ptr32 _LIST_ENTRY     //表示从前往后
   +0x004   Blink       : Ptr32 _LIST_ENTRY     //表示从后往前
//该结构本身就提供了（不需要自己写）
typedef struct _LIST_ENTRY {
   struct _LIST_ENTRY *Flink;
   struct _LIST_ENTRY *Blink;
} LIST_ENTRY, *PLIST_ENTRY, *RESTRICTED_POINTER PRLIST_ENTRY;
```

链表中保存的是_LDR_DATA_TABLE_ENTRY结构体的信息，给结构体如下。

##### _LDR_DATA_TABLE_ENTRY

该结构未导出,需要自己定义

```cpp
//x86
typedef struct _LDR_DATA_TABLE_ENTRY
{
LIST_ENTRY InLoadOrderLinks;//代表按加载顺序构成的模块双向链表
LIST_ENTRY InMemoryOrderLinks;//代表按内存顺序构成的模块双向链表
LIST_ENTRY InInitializationOrderLinks;//代表按初始化顺序构成的模块双向链表
PVOID      DllBase;//该模块的基地址
PVOID      EntryPoint;//该模块的入口
ULONG32    SizeOfImage;//该模块的映像大小
UNICODE_STRING FullDllName;//内嵌包含路径的模块名的结构体
UNICODE_STRING BaseDllName;//内嵌不包含路径的模块名的结构体
UINT32   Unknow[17];

}LDR_DATA_TABLE_ENTRY, *PLDR_DATA_TABLE_ENTRY;


//x64
typedef struct _LDR_DATA_TABLE_ENTRY
{
LIST_ENTRY InLoadOrderLinks;
LIST_ENTRY InMemoryOrderLinks;
LIST_ENTRY InInitializationOrderLinks;
PVOID      DllBase;
PVOID      EntryPoint;
ULONG32    SizeOfImage;
UINT8      Unknow0[0x4];
UNICODE_STRING FullDllName;
UNICODE_STRING BaseDllName;
}LDR_DATA_TABLE_ENTRY, *PLDR_DATA_TABLE_ENTRY;


@Windows XP Professional Service Pack 3 (x86) (5.1, Build 2600)

lkd> dt -b _LDR_DATA_TABLE_ENTRY
nt!_LDR_DATA_TABLE_ENTRY
   +0x000 InLoadOrderLinks : _LIST_ENTRY//代表按加载顺序构成的模块双向链表
      +0x000 Flink            : Ptr32 
      +0x004 Blink            : Ptr32 
   +0x008 InMemoryOrderLinks : _LIST_ENTRY//代表按内存顺序构成的模块双向链表
      +0x000 Flink            : Ptr32 
      +0x004 Blink            : Ptr32 
   +0x010 InInitializationOrderLinks : _LIST_ENTRY//代表按初始化顺序构成的模块双向链表
      +0x000 Flink            : Ptr32 
      +0x004 Blink            : Ptr32 
   +0x018 DllBase          : Ptr32 //该模块的基地址
   +0x01c EntryPoint       : Ptr32  //该模块的入口
   +0x020 SizeOfImage      : Uint4B	//该模块的映像大小
   +0x024 FullDllName      : _UNICODE_STRING //内嵌包含路径的模块名的结构体
      +0x000 Length           : Uint2B
      +0x002 MaximumLength    : Uint2B
      +0x004 Buffer           : Ptr32 
   +0x02c BaseDllName      : _UNICODE_STRING //内嵌不包含路径的模块名的结构体
      +0x000 Length           : Uint2B
      +0x002 MaximumLength    : Uint2B
      +0x004 Buffer           : Ptr32 
   +0x034 Flags            : Uint4B
   +0x038 LoadCount        : Uint2B	//该模块的引用次数
   +0x03a TlsIndex         : Uint2B
   +0x03c HashLinks        : _LIST_ENTRY
      +0x000 Flink            : Ptr32 
      +0x004 Blink            : Ptr32 
   +0x03c SectionPointer   : Ptr32 
   +0x040 CheckSum         : Uint4B
   +0x044 TimeDateStamp    : Uint4B
   +0x044 LoadedImports    : Ptr32 
   +0x048 EntryPointActivationContext : Ptr32 
   +0x04c PatchInformation : Ptr32

 

@Windows 7 Ultimate (x64) (6.1, Build 7600)

lkd> dt -b _LDR_DATA_TABLE_ENTRY
nt!_LDR_DATA_TABLE_ENTRY
   +0x000 InLoadOrderLinks : _LIST_ENTRY
      +0x000 Flink            : Ptr64 
      +0x008 Blink            : Ptr64 
   +0x010 InMemoryOrderLinks : _LIST_ENTRY
      +0x000 Flink            : Ptr64 
      +0x008 Blink            : Ptr64 
   +0x020 InInitializationOrderLinks : _LIST_ENTRY
      +0x000 Flink            : Ptr64 
      +0x008 Blink            : Ptr64 
   +0x030 DllBase          : Ptr64 
   +0x038 EntryPoint       : Ptr64 
   +0x040 SizeOfImage      : Uint4B
   +0x048 FullDllName      : _UNICODE_STRING
      +0x000 Length           : Uint2B
      +0x002 MaximumLength    : Uint2B
      +0x008 Buffer           : Ptr64 
   +0x058 BaseDllName      : _UNICODE_STRING
      +0x000 Length           : Uint2B
      +0x002 MaximumLength    : Uint2B
      +0x008 Buffer           : Ptr64 
   +0x068 Flags            : Uint4B
   +0x06c LoadCount        : Uint2B
   +0x06e TlsIndex         : Uint2B
   +0x070 HashLinks        : _LIST_ENTRY
      +0x000 Flink            : Ptr64 
      +0x008 Blink            : Ptr64 
   +0x070 SectionPointer   : Ptr64 
   +0x078 CheckSum         : Uint4B
   +0x080 TimeDateStamp    : Uint4B
   +0x080 LoadedImports    : Ptr64 
   +0x088 EntryPointActivationContext : Ptr64 
   +0x090 PatchInformation : Ptr64 
   +0x098 ForwarderLinks   : _LIST_ENTRY
      +0x000 Flink            : Ptr64 
      +0x008 Blink            : Ptr64 
   +0x0a8 ServiceTagLinks  : _LIST_ENTRY
      +0x000 Flink            : Ptr64 
      +0x008 Blink            : Ptr64 
   +0x0b8 StaticLinks      : _LIST_ENTRY
      +0x000 Flink            : Ptr64 
      +0x008 Blink            : Ptr64 
   +0x0c8 ContextInformation : Ptr64 
   +0x0d0 OriginalBase     : Uint8B
   +0x0d8 LoadTime         : _LARGE_INTEGER
      +0x000 LowPart          : Uint4B
      +0x004 HighPart         : Int4B
      +0x000 u                : <unnamed-tag>
         +0x000 LowPart          : Uint4B
         +0x004 HighPart         : Int4B
      +0x000 QuadPart         : Int8B
```

每个加载到进程中的DLL模块都对应一个\_LDR_DATA_TABLE_ENTRY结构体，这些结构体相互链接，最终形成了_LIST_ENTRY双向链表。\_PEB_LDR_DATA结构体中存在3种\_LIST_ENTRY双向链表，也就是说，存在多个\_LDR_DATA_TABLE_ENTRY结构体，并且有三种链接方法可以将它们链接起来。

结构示意图：

![image-20210707145837215](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210707145837215.png)

![image-20210707150201266](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210707150201266.png)

![image-20210707150256851](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210707150256851.png)

![image-20210707153018376](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210707153018376.png)

![image-20210707153029369](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210707153029369.png)

[结构详解]: https://www.freesion.com/article/19771019476/

上面的图实际上都不是那么准确，下面这张图才是真正的结构。

![image-20210707155954691](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210707155954691.png)

###### _UNICODE_STRING的定义

```cpp
typedef struct _UNICODE_STRING
{
	USHORT Length;
	USHORT MaximumLength;
	PWSTR Buffer;
}UNICODE_STRING,*PUNICOID_STRING;
```

##### DefaultHeap与NtGlobalFlag反调试相关（只对XP有效）

EB.ProcessHeap与PEB.NtGlobalFlag成员（像PEB.BeingDebugged成员一样）应用于反调试技术。若进程处于调试状态，则ProcessHeap与NtGlobalFlag成员就持有特定值。由于它们具有这一个特征，所以常常应用于反调试技术。
PEB.ProcessHeap成员是指向HEAP结构体的指针，HEAP结构体如下。

```cpp
+0×000 Entry	:_HEAP_ENTRY
+0×008 Signature	:Uint4B
+0×00c Flags	:Uint4B
+0×010 ForceFlags	:Uint4B
+0×014 VirtualMemoryThreshold 	:Uint4B
+0×018 SegmentReserve	:Uint4B
+0×01c SegmentCommit	:Uint4B
+0×020 DeCommitFreeBlockThreshold	 :Uint4B
...
```

进程处于被调试状态时，Flags(+0xC)与Force Flags(+ox10)成员被设置成特定的值。
PEB.ProcessHeap（PEB结构体中偏移0x18的位置）成员既可以从PEB结构体中直接获得，也可以通过GetProcessHeap() API获得。

**当进程运行正常时Heap.Flagsh成员的值为0x2,Heap. ForceFlags成员的值位0x0，进程处于被调试状态时这些值也会随之改变**

**破解之法**
只要将HEAP.Flags与HEAP.ForceFlags的值重新设置为2与0即可（HEAP.Flags=2，HEAP.ForceFlags=0）。
注意：该方法仅在WindowsXP系统中有效，Windows7系统不存在以上特征。此外，将运行中的进程附加到调试器时，也不会出现上述特征。

### 实现代码

```cpp
void WinTool::hideModuleByCutLink32(LPTSTR szModuleName)
{
	//取ldr成员
	_PEB_LDR_DATA* ldr;
	_LIST_ENTRY* head, *cur;//头尾指针
	LDR_DATA_TABLE_ENTRY* ldm;
	//通过模块句柄来确定遍历的时候找到当前模块
	HMODULE hMod = GetModuleHandle(szModuleName);
	__asm
	{
		mov eax,fs:[0x30]
		mov eax,[eax+0x0C]
		mov ldr,eax
	}
	//取头和尾指针
	head = &(ldr->InLoadOrderModuleList);
	cur = head->Flink;
	//遍历链表
	do 
	{
		//宏 CONTAINING_RECORD 根据结构体中的某成员的地址来推算出该结构体整体的地址
		ldm = CONTAINING_RECORD(cur, LDR_DATA_TABLE_ENTRY, InLoadOrderLinks);
		if (hMod == ldm->DllBase)//模块句柄就是内存中模块的地址
		{
			//找到了，进行断链操作
			ldm->InLoadOrderLinks.Blink->Flink = ldm->InLoadOrderLinks.Flink;
			ldm->InLoadOrderLinks.Flink->Blink = ldm->InLoadOrderLinks.Blink;
			ldm->InInitializationOrderLinks.Blink->Flink = ldm->InInitializationOrderLinks.Flink;
			ldm->InInitializationOrderLinks.Flink->Blink = ldm->InInitializationOrderLinks.Blink;
			ldm->InMemoryOrderLinks.Blink->Flink = ldm->InMemoryOrderLinks.Flink;
			ldm->InMemoryOrderLinks.Flink->Blink = ldm->InMemoryOrderLinks.Blink;
		}
		cur = cur->Flink;
	} while (cur!=head);
}
```

```cpp
//main函数
WinTool myTool;
myTool.showModuleFromPIDByAPI32(GetCurrentProcessId());
cout<<"按任意键隐藏kernel32.dll模块"<<endl;
getchar();
myTool.hideModuleByCutLink32(TEXT("kernel32.dll"));
cout<<"隐藏成功"<<endl;
myTool.showModuleFromPIDByAPI32(GetCurrentProcessId());
getchar();
```

![image-20210706162954067](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210706162954067.png)

## 模块隐藏之VAD树

PEB中，断链只可以让API访问不到该module

但是VAD树是内核层访问的，依然可以在里面找到断链后的module

**即使VAD树也隐藏了自己想隐藏的模块，但是依然可以遍历内存搜索PE指纹。**

## 试图模块彻底隐藏

通杀99%的隐藏模块的方法有三步：

1. PEB断链指定模块信息
2. VAD树去除指定模块信息
3. 找到内存中指定模块的位置，修改PE指纹（不会影响程序运行）

上述操作相对简单的操作：先注入dll，再复制一份dll，再通过代码释放原来的dll，然后在原位置申请内存，再把复制的dll拷贝回去（就不需要重定位了）。再修改特征码，这样VAD树和PEB中就没有记录了

hook LoadLibrary三环和零环对应函数来检测是否有DLL被加载

最好的隐藏：无模块注入，也就是**代码注入**，连模块都没有。

代码注入的弊端：工作量特别大

# 代码注入

避免了所有模块的特征。

远线程执行CreateFileA系统函数的案例：

```cpp
struct CreateFileParam
{
	LPVOID CreateFileAddress;//CreateFileA函数地址
	//下面是CreateFileA需要用到的参数。
    char fileName[9];
	DWORD  dwDesiredAccess;
	DWORD  dwShareMode;
	LPSECURITY_ATTRIBUTES lpSecurityAttributes;
	DWORD dwCreationDisposition;
	DWORD dwFlagsAndAttributes;
	HANDLE hTemplateFile;
};

void myThreadCreateFileFunc(LPVOID pParam)
{
	typedef HANDLE(*PCreateFile)(LPCSTR  lpFileName,
		DWORD  dwDesiredAccess,
		DWORD  dwShareMode,
		LPSECURITY_ATTRIBUTES lpSecurityAttributes,
		DWORD dwCreationDisposition,
		DWORD dwFlagsAndAttributes,
		HANDLE hTemplateFile);
	CreateFileParam* tmpStruct = (CreateFileParam*)pParam;
	PCreateFile createFileFunc = (PCreateFile)(tmpStruct->CreateFileAddress);
	//线程函数中调用MessageBoxA
	(*createFileFunc)(tmpStruct->fileName, tmpStruct->dwDesiredAccess, tmpStruct->dwShareMode, tmpStruct->lpSecurityAttributes,tmpStruct->dwCreationDisposition,tmpStruct->dwFlagsAndAttributes,tmpStruct->hTemplateFile);
}

int main()
{
	WinTool myTool;
	DWORD pid = myTool.getProcessIdByName(TEXT("target.exe"));
	//往目标注入代码执行MessageBoxA函数
	CreateFileParam param;
	param.hTemplateFile = 0;
	memcpy(param.fileName, "C:\\A.txt", strlen("C:\\A.txt")+1);
	param.dwFlagsAndAttributes = FILE_ATTRIBUTE_NORMAL;
	param.dwCreationDisposition = CREATE_NEW;
	param.dwShareMode = NULL;
	param.dwDesiredAccess = GENERIC_READ | GENERIC_WRITE;
	HMODULE hModule=GetModuleHandleA("kernel32.dll");
	LPVOID CreateFileAddress =GetProcAddress(hModule, "CreateFileA");
	param.CreateFileAddress = CreateFileAddress;
	param.lpSecurityAttributes = NULL;

	//存储参数(API需要用到的参数)
	LPVOID targetParam=myTool.remoteInjectMemory(pid, &param, sizeof(CreateFileParam));

	//修正线程函数起始地址
	DWORD realThreadFunc = (DWORD)myThreadCreateFileFunc;
	if (*(BYTE*)realThreadFunc ==0xE9)
	{
		realThreadFunc = realThreadFunc + 5 + *(DWORD*)(realThreadFunc + 1);
	}

	int threadFuncSize = 0x55;//手动算出线程函数的二字节大小
	
	//存储线程函数(线程函数本身)
	LPVOID targetThreadFunc = myTool.remoteInjectMemory(pid, (PVOID)realThreadFunc, threadFuncSize);

	HANDLE hProcess=OpenProcess(PROCESS_ALL_ACCESS,NULL, pid);

	//启动远线程
	HANDLE hThread= CreateRemoteThread(hProcess, NULL, 0, (LPTHREAD_START_ROUTINE)targetThreadFunc, targetParam, 0, NULL);
	WaitForSingleObject(hThread, INFINITE);
	cout<<"执行结束"<<endl;

	CloseHandle(hProcess);

	return EXIT_SUCCESS;
}
```

【注意】上面代码要把项目属性中的代码生成中的基本运行时检查选项设为默认值

**将函数转换成shellCode的时候要注意：**

[VC编译选项“基本运行时检查”的作用]: https://blog.csdn.net/aqtata/article/details/106156275

上面的代码也可以实现代码注入，但是非常的**繁琐**，因此可以直接注入ShellCode

## 注入ShellCode

什么是ShellCode？

ShellCode：**不依赖环境，放到任何地方都可以执行的机器码**。

**ShellCode的编写原则**：

1. 不能有全局变量
2. 不能使用常量字符串
3. 不能使用系统调用（因为系统调用是间接调用，call的地址要等到exe启动的时候由操作系统根据导入表填写的）
4. 不能嵌套调用其他函数（**把整个模块按照ShellCode写过去**，暂时还做不到）

- Q：为什么不能使用系统调用
- A：导入表要目标进程本身就使用了这个系统调用，而且目标进程的该系统调用间接存放点也要这么巧刚好是这个地址，才能使用系统调用。。。(概率几乎为0)

解决上述痛点的方式：

1. 不写就解决了

2. 用局部数组写字符串

   ![image-20210607170623362](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210607170623362.png)

3. 因为调用其他PE的函数都是采用间接CALL的调用方式，实际上是由编译器填写的。系统调用都是在其他DLL中的，所以ShellCode中不能使用系统调用。

   ![image-20210607172332382](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210607172332382.png)

类似kernel32.dll中的函数，在同一个操作系统中，其在各个进程中的函数地址是一样的。可以现在别的进程找好要用的函数地址，把函数地址送进去目标进程。

shellCode通过PEB找到kernel32.dll的模块句柄，然后通过PE中的导出表找到GetProcAddress函数，就可以确定GetProcAddress在目标进程中的真实函数地址。到这一步就可以配合PEB中的所有模块句柄遍历找到所有函数。

## shellCode案例

```cpp
//提前准备自己要使用的DLL和函数的字符串
	char szKernel32[] = { 'K','\0','E','\0','R','\0','N','\0','E','\0','L','\0','3','\0','2','\0','.','\0','D','\0','L','\0','L','\0',0,0 };
	char szUser32[] = { 'U','S','E','R','3','2','.','d','l','l',0 };
	char szGetProcAddr[] = { 'G','e','t','P','r','o','c','A','d','d','r','e','s','s',0 };
	char szMessageBoxA[] = { 'M','e','s','s','a','g','e','B','o','x','A',0 };
	char szLoadLibraryA[] = { 'L','o','a','d','L','i','b','r','a','r','y','A',0 };

	//准备要找的函数的函数类型
	typedef FARPROC(*PGETPROCADDRESS)(HMODULE hModule, LPCSTR  lpProcName);
	PGETPROCADDRESS pGetProcAddress;
	typedef HMODULE(*PLOADLIBRARYA)(LPCSTR lpLibFileName);
	PLOADLIBRARYA pLoadLibraryA;
	typedef int(*PMESSAGEBOXA)(HWND   hWnd, LPCSTR lpText, LPCSTR lpCaption, UINT   uType);
	PMESSAGEBOXA pMessageBoxA;

	//准备结构体
	_LDR_DATA_TABLE_ENTRY* pBeg, *pPLD;
	DWORD dwKernelBase;

	//==通过PEB先找到
	//获取链表  TEB->PEB->_PEB_LDR_DATA->_LDR_DATA_TABLE_TABLE_ENTRY

	__asm
	{
		mov eax, fs:[0x30]  //PEB
		mov eax, [eax + 0x0c] //PEB->ldr _PEB_LDR_DATA
			add eax, 0x0c	   //_PEB_LDR_DATA ldr->InLoadOrderModuleList
			mov pBeg, eax	   //记录开头节点
			mov eax, [eax]
			mov pPLD, eax	   //记录_LDR_DATA_TABLE_ENTRY
	}

	//遍历找到kernel32.dll
	while (pPLD != pBeg)
	{
		//比较字符串(不能使用库函数)
		WORD* pLast = (WORD*)pPLD->BaseDllName.Buffer;
		//wcout<< pPLD->BaseDllName.Buffer <<endl;//调试用，查看dll名称
		WORD* pFirst = (WORD*)szKernel32;
		while (*pFirst&&*pFirst == *pLast)
			pFirst++, pLast++;
		if (*pFirst == *pLast)
		{
			dwKernelBase = (DWORD)pPLD->DllBase;//找到了Kernel32字符串则记录下来
			break;
		}
		pPLD = (_LDR_DATA_TABLE_ENTRY*)pPLD->InLoadOrderLinks.Flink;
	}

	//遍历KERNEL32.DLL的导出表，找到GetProcAddr函数的地址
	IMAGE_DOS_HEADER *pIDH = (IMAGE_DOS_HEADER *)dwKernelBase;
	//通过DOS头找到PE文件头
	IMAGE_NT_HEADERS *pINGs = (IMAGE_NT_HEADERS *)((DWORD)dwKernelBase + pIDH->e_lfanew);
	//找到导出表的地址
	IMAGE_EXPORT_DIRECTORY* pIED = (IMAGE_EXPORT_DIRECTORY*)((DWORD)dwKernelBase + pINGs->OptionalHeader.DataDirectory[0].VirtualAddress);

	//导出函数地址表
	DWORD *pAddOfFun_Raw = (DWORD*)((DWORD)dwKernelBase + pIED->AddressOfFunctions);
	//导出函数序号表
	WORD* pAddOfOrd_Raw = (WORD*)((DWORD)dwKernelBase + pIED->AddressOfNameOrdinals);
	//导出函数名称表
	DWORD* pAddOfNames_Raw = (DWORD*)((DWORD)dwKernelBase + pIED->AddressOfNames);
	DWORD dwCnt = 0;//计数

	//在函数名称表中找目标名称的函数
	char* pFinded = NULL, *pSrc = szGetProcAddr;
	for (; dwCnt < pIED->NumberOfNames; dwCnt++)
	{
		//要找的函数名首地址
		pFinded = (char*)((DWORD)dwKernelBase + pAddOfNames_Raw[dwCnt]);
		while (*pFinded&&*pFinded == *pSrc)
			pFinded++, pSrc++;
		if (*pFinded == *pSrc)
		{
			//通过函数名称表中要找的函数的下标找到要找的函数地址
			pGetProcAddress = (PGETPROCADDRESS)((DWORD)dwKernelBase + pAddOfFun_Raw[pAddOfOrd_Raw[dwCnt]]);
			break;
		}
		pSrc = szGetProcAddr;
	}


	//有了GetProcAddr 就可以得到任何API函数了
	pLoadLibraryA = (PLOADLIBRARYA)pGetProcAddress((HMODULE)dwKernelBase, szLoadLibraryA);
	HMODULE hUser32 = pLoadLibraryA(szUser32);
	pMessageBoxA = (PMESSAGEBOXA)pGetProcAddress(hUser32, szMessageBoxA);
	//调用弹框
	pMessageBoxA(0, 0, 0, 0);
```

该案例的代码放到哪里都可以跑

**什么是ShellCode？**

ShellCode：**不依赖环境，放到任何地方都可以执行的机器码**。

**ShellCode的编写原则**：

1. 不能有全局变量
2. 不能使用常量字符串
3. 不能使用系统调用
4. 不能嵌套调用其他函数（把整个模块按照ShellCode写过去，暂时还做不到）

解决上述痛点的方式：

1. 不写就解决了

2. 用局部数组写字符串

   ![image-20210607170623362](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210607170623362.png)

3. 因为调用其他PE的函数都是采用间接CALL的调用方式，实际上是由编译器填写的。系统调用都是在其他DLL中的，所以ShellCode中不能使用系统调用。

   ![image-20210607172332382](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210607172332382.png)

# HOOK

Virtual Tabel Hook

## 什么是HOOK

HOOK是用来获取，更改程序执行时的某些数据，或者是用于更改程序执行流程的一种技术。

HOOK的两种主要形式

1. **改函数代码**

   INLINE HOOK

2. **改函数地址**（其实就是改表）

   IAT HOOK（3环的表，只影响一个进程）

   VT HOOK(虚表，C++的结构)

   SSDT HOOK(这个以及下面3个表都是0环的表)

   IDT HOOK

   EAT HOOK

   IRP HOOK

   ...

## 虚表HOOK（VT HOOK）

虚表hook是通过更改虚表

有虚函数就有虚表

实现原理如下图

没改前：

![image-20210707174332826](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210707174332826.png)

修改后：

![image-20210707174410932](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210707174410932.png)

### 虚表HOOK案例

```cpp
class Base
{
public:
	virtual void Print()
	{
		cout<<"我是base"<<endl;
	}
};

void myHookFunc()
{
	cout<<"你被hook了"<<endl;
}
void main()
{
	Base* base=new Base;
	cout<<sizeof(base)<<endl;
	DWORD vtAddress = *(DWORD*)base;
	DWORD oldFunAddress = *(DWORD*)vtAddress;
	DWORD oldProtect;
    //因为表本身是只读的，所以要先修改成可读可写
	VirtualProtect((DWORD*)vtAddress, 4, PAGE_READWRITE, &oldProtect);
	*(DWORD*)vtAddress = (DWORD)myHookFunc;
	base->Print();
}
```

![image-20210707184145923](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210707184145923.png)

缺点：只能HOOK虚表中的函数

## IAT HOOK

Import Address Table 由于导入函数就是被程序调用但其执行代码又不在程序中的函数，这些函数的代码位于一个或者多个DLL 中.当PE 文件被装入内存的时候，Windows 装载器才将DLL 装入，并将调用导入函数的指令和函数实际所处的地址联系起来(动态连接)，这操作就需要导入表完成.其中导入地址表就[指示函数](https://baike.baidu.com/item/指示函数/3774265)实际地址。

任何一个进程中都存在一张表，这张表会把当前进程用到的所有API都放到导入地址表中。

```cpp
DWORD WinTool::setIATHook(DWORD dwOldAddress, DWORD dwNewAddress)
{
	BOOL bFlag = FALSE;
	PDWORD pFuncAddr = NULL;

	//得到模块基址
	//得到当前模块是从什么时候开始的
	DWORD dwImageBase = (DWORD)GetModuleHandleA(NULL);
	PIMAGE_NT_HEADERS pNtHeader = (PIMAGE_NT_HEADERS)(dwImageBase + ((PIMAGE_DOS_HEADER)dwImageBase)->e_lfanew);
	IMAGE_OPTIONAL_HEADER32 optionHeader = (IMAGE_OPTIONAL_HEADER32)(pNtHeader->OptionalHeader);
	PIMAGE_IMPORT_DESCRIPTOR pImportDescriptor = (PIMAGE_IMPORT_DESCRIPTOR)(dwImageBase + optionHeader.DataDirectory[1].VirtualAddress);

	//PIMAGE_IMPORT_DESCRIPTOR pImportDescriptor = (PIMAGE_IMPORT_DESCRIPTOR)(dwImageBase + pNtHeader->OptionalHeader.DataDirectory[IMAGE_DIRECTORY_ENTRY_IMPORT].VirtualAddress);

	//遍历IAT表，找到这个函数的地址
	while (pImportDescriptor->FirstThunk != 0 && bFlag == FALSE)
	{
		pFuncAddr = (PDWORD)(dwImageBase + pImportDescriptor->FirstThunk);
		while (*pFuncAddr)
		{
			if (dwOldAddress == *pFuncAddr)
			{
				DWORD dwOldProtect;
				//若找到要HOOK的函数，先修改内存页的属性，不然修改不可写内存程序会闪退
				VirtualProtect(pFuncAddr, sizeof(DWORD), PAGE_READWRITE, &dwOldProtect);
				*pFuncAddr = dwNewAddress;
				//恢复内存页的属性
				VirtualProtect(pFuncAddr, sizeof(DWORD), dwOldProtect, NULL);
				bFlag = TRUE;
				break;
			}
			pFuncAddr++;
		}
		pImportDescriptor = (PIMAGE_IMPORT_DESCRIPTOR)((DWORD)pImportDescriptor + sizeof(IMAGE_IMPORT_DESCRIPTOR));
	}
	//要返回原来的地址，方便以后恢复回去;

	if (bFlag)
	{
		return dwOldAddress;
	}
	return NULL;
}

DWORD g_oldAddress;//记录原函数地址

//格式要定义成一样的，不然栈不平衡程序会崩溃
int myMessageBoxA(
	HWND   hWnd,
	LPCSTR lpText,
	LPCSTR lpCaption,
	UINT   uType
	)
{
    //修改MessageBoxA中显示的信息
	char myText[]= { 'z','e','r','o','k','o','1','4',0 };
	typedef int(*PMESSAGEBOXA)(HWND   hWnd, LPCSTR lpText, LPCSTR lpCaption, UINT   uType);
	PMESSAGEBOXA pMessageBoxA = (PMESSAGEBOXA)g_oldAddress;
	return pMessageBoxA(hWnd, myText, lpCaption, uType);
}

void main()
{
    WinTool myTool;
	cout << "未HOOK前调用MessageBoxA(0,0,0,0)函数" << endl;
	MessageBoxA(0, 0, 0, 0);
	cout<<"执行IAT HOOK，HOOK MessageBoxA函数"<<endl;
	HMODULE hModule = GetModuleHandleA("user32.dll");
	DWORD pMessageBoxAAddr=(DWORD)GetProcAddress(hModule, "MessageBoxA");
	g_oldAddress=myTool.setIATHook(pMessageBoxAAddr, (DWORD)myMessageBoxA);//在IAT中并未找到需要处理的函数
	cout<<"按回车键调用IAT HOOK后的MessageBoxA(0,0,0,0)函数"<<endl;
	getchar();
	MessageBoxA(0, 0, 0, 0);
	cout<<"解除IAT HOOK"<<endl;
	myTool.setIATHook((DWORD)myMessageBoxA, g_oldAddress);
	cout << "按回车键调用解除IAT HOOK后的MessageBoxA(0,0,0,0)函数" << endl;
	getchar();
	MessageBoxA(0, 0, 0, 0);
}
```

显示结果：

![image-20210708190212173](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210708190212173.png)![image-20210708190233787](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210708190233787.png)![image-20210708190305081](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210708190305081.png)

IAT HOOK的缺点：

1. 容易被检测到
2. 只能HOOK IAT表里的函数(即**非自身模块的函数**)

## INLINE HOOK

inline hook是最有价值的HOOK

手动HOOK的流程如下：

找到要HOOK的函数头部：

```cpp
   119: void add(int a, int b)
   120: {
00702730 55                   push        ebp  
00702731 8B EC                mov         ebp,esp  
00702733 83 EC 40             sub         esp,40h  
00702736 53                   push        ebx  
00702737 56                   push        esi  
00702738 57                   push        edi  
   121: 	cout<<a+b<<endl;
00702739 68 AF 10 70 00       push        offset std::endl<char,std::char_traits<char> > (07010AFh)  
0070273E 8B 45 08             mov         eax,dword ptr [a]  
00702741 03 45 0C             add         eax,dword ptr [b]  
00702744 50                   push        eax  
00702745 8B 0D 7C E1 70 00    mov         ecx,dword ptr [_imp_?cout@std@@3V?$basic_ostream@DU?$char_traits@D@std@@@1@A (070E17Ch)]  
0070274B FF 15 70 E1 70 00    call        dword ptr [__imp_std::basic_ostream<char,std::char_traits<char> >::operator<< (070E170h)]  
00702751 8B C8                mov         ecx,eax  
00702753 FF 15 6C E1 70 00    call        dword ptr [__imp_std::basic_ostream<char,std::char_traits<char> >::operator<< (070E16Ch)]  
   122: }
00702759 5F                   pop         edi  
0070275A 5E                   pop         esi  
0070275B 5B                   pop         ebx  
0070275C 8B E5                mov         esp,ebp  
0070275E 5D                   pop         ebp  
0070275F C3                   ret  
```

将函数头部的5个字节修改为，我们自己添加的函数假如在70E89D处

```cpp
   119: void add(int a, int b)
   120: {
00702730 E9 68C10000          JMP        0070E89D  
00702735 90             	  nop//此处由于实际上改了3行命令共6个字节，多了一个无用字节填90，即nop,此处不改也可以，反正跳到那边后再跳回来是跳到00702736
00702736 53                   push        ebx  
00702737 56                   push        esi  
00702738 57                   push        edi  
```

70E89D处添加自己要做的事情，并补齐前面修改的代码，再跳回原来修改位置的下一行代码地址00702736处

```cpp
//00702736地址处
0070E89D C74424 04 02000000  MOV DWORD [ESP+4],2//修改加法函数的两个参数
0070E8A5 C74424 08 03000000  MOV DWORD [ESP+8],3
//执行原来修改掉的代码
0070E8AD 55 			    PUSH 	EBP
0070E8AE 8B EC 			    MOV 	EBP,ESP
0070E8B0 83 EC 40 		    SUP 	ESP,40h
//跳回原来修改位置的下一行代码地址00702736处
0070E8B3 E9 7E3EFFFF		JMP		 00702736
```

### Inline Hook案例

```cpp
//准备要INLINE HOOK的目标函数
void add(int a, int b)
{
	cout << a << "+" << b << "=" << a + b << endl;
}

//这里必须是裸函数，不然升栈操作会崩溃。
void _declspec(naked) myInLineHookFunc()
{
	__asm
	{   
			mov[esp + 4], 3
			mov[esp + 8], 4
			//补上之前修改掉的代码
			push ebp
			mov ebp, esp
			sub esp, 40h
			//跳回原来修改掉的指令的下一句指令的地址
			jmp add+6 
	}
}

void main()
{
    cout << "未HOOK之前调用add(1,2)函数,结果为:" << endl;
	//未HOOK之前调用add(1,2)函数
	add(1, 2);
	//inline hook add函数
	DWORD oldProtect;
	WinTool myTool;
	VirtualProtect((LPVOID)add, 5, PAGE_EXECUTE_READWRITE, &oldProtect);//因为是代码段，所以必须是PAGE_EXECUTE_READWRITE权限，不然会出现访问错误(如下图)
	//修改跳转到裸函数
	*(BYTE*)add = 0xE9;
	*(DWORD*)(((BYTE*)add) + 1) = (DWORD)myInLineHookFunc - 5 - (DWORD)add;
	VirtualProtect((LPVOID)add, 5, oldProtect, NULL);
	cout << "Inline HOOK之后调用add(1,2)函数,结果为:" << endl;
	//Inline HOOK之后调用add(1,2)函数
	add(1, 2);
}
```

![image-20210709000121629](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210709000121629.png)

发现此处不需要修正函数地址，add函数名称直接是add的真实地址。目测是VS2015有自动修正。

上面代码的VirtualProtect中PAGE_EXECUTE_READWRITE改为PAGE_READWRITE会报错：

![image-20210709002047122](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210709002047122.png)

裸函数不可以有局部变量！

#### Inline HOOK注入dll版

写在DLL中：

##### InlineHook.h

```cpp
#pragma once
#include <windows.h>
class InlineHook
{
public:
	InlineHook();
	~InlineHook();

	//设置HOOK
	BOOL SetHook(LPSTR moduleName, LPSTR funcName, PROC hookFunc);

	//卸载HOOK
	void UnHook();

	//重装HOOK
	BOOL ReHook();
private:
	char oldMem[5] ;
	char newMem[5] ;
	PROC funcAddress=NULL;

};

```

InlineHook.cpp

```cpp
#include "InlineHook.h"

InlineHook::InlineHook()
{
	memset(newMem, 0, 5);
	memset(oldMem, 0, 5);

}


InlineHook::~InlineHook()
{
	UnHook();
	memset(newMem, 0, 5);
	memset(oldMem, 0, 5);
	funcAddress = NULL;
}

BOOL InlineHook::SetHook(LPSTR moduleName, LPSTR funcName,PROC hookFunc)
{
	funcAddress=GetProcAddress(GetModuleHandleA(moduleName), funcName);
	if (!funcAddress)
	{
		return false;
	}
	DWORD retHaveRead;
	ReadProcessMemory(GetCurrentProcess(), funcAddress, &oldMem, 5, &retHaveRead);
	if (retHaveRead!=5)
	{
		return false;
	}
	newMem[0] = 0xE9;
	*(DWORD*)(&newMem[1]) = (DWORD)hookFunc- (DWORD)funcAddress-5;
	DWORD retHaveWritten;
	/*DWORD oldProtect;
	VirtualProtect(funcAddress, 5, PAGE_EXECUTE_READWRITE, &oldProtect);*/
	WriteProcessMemory(GetCurrentProcess(), funcAddress, &newMem, 5, &retHaveWritten);
	//VirtualProtect(funcAddress, 5, oldProtect, NULL);
	if (retHaveWritten != 5)
	{
		return false;
	}

	return true;
}

void InlineHook::UnHook()
{
	if (funcAddress!=NULL)
	{
		/*DWORD oldProtect;
		VirtualProtect(funcAddress, 5, PAGE_EXECUTE_READWRITE, &oldProtect);*/
		WriteProcessMemory(GetCurrentProcess(), funcAddress, &oldMem, 5, NULL);
		//VirtualProtect(funcAddress, 5, oldProtect, NULL);
	}
}

BOOL InlineHook::ReHook()
{
	if (funcAddress != NULL)
	{
		/*DWORD oldProtect;
		VirtualProtect(funcAddress, 5, PAGE_EXECUTE_READWRITE, &oldProtect);*/
		WriteProcessMemory(GetCurrentProcess(), funcAddress, &newMem, 5, NULL);
		//VirtualProtect(funcAddress, 5, oldProtect, NULL);
		return TRUE;
	}
	return FALSE;
}

```

##### dllmain.cpp

```cpp
// dllmain.cpp : 定义 DLL 应用程序的入口点。
#include "stdafx.h"
#include "InlineHook.h"

InlineHook myHook;

int WINAPI MyMessageBoxA(
	_In_opt_ HWND hWnd,
	_In_opt_ LPCSTR lpText,
	_In_opt_ LPCSTR lpCaption,
	_In_ UINT uType)
{
	myHook.UnHook();
	MessageBoxA(hWnd, "HOOK成功", "提示", MB_OK);
	myHook.ReHook();
	return 1;
}

BOOL APIENTRY DllMain( HMODULE hModule,
                       DWORD  ul_reason_for_call,
                       LPVOID lpReserved
					 )
{
	switch (ul_reason_for_call)
	{
	case DLL_PROCESS_ATTACH:
		myHook.SetHook("User32.dll", "MessageBoxA", (PROC)MyMessageBoxA);
			
		break;
	case DLL_THREAD_ATTACH:
		break;
	case DLL_THREAD_DETACH:
		break;
	case DLL_PROCESS_DETACH:
		myHook.UnHook();
		break;
	}
	return TRUE;
}
```

未HOOK前：

![image-20210710150602775](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210710150602775.png)

HOOK后：

![image-20210710150629920](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210710150629920.png)



### Inline HOOK改进版

裸函数不会帮你生成任何汇编代码，所以不可以使用局部变量。

改进版Inline HOOK

```cpp
#define PATCH_LENGTH 6//hook影响到的正常指令的大小
DWORD g_realAddTargetAddr;//真实addTarget函数地址

//准备要INLINE HOOK的目标函数
void addTarget(int a, int b)
{
	cout << a << "+" << b << "=" << a + b << endl;
}

void myFunc(int a, int b)
{
	//这里面就可以写局部变量了,注意：如果把这个代码注入到别的进程跑的话，还是要堆栈
	char str[]= { 'I','n','l','i','n','e','H','o','o','k',' ','S','u','c','c','e','e','d','!',0 };
	MessageBoxA(0, str, 0, 0);
}

void _declspec(naked) myInLineHookFunc()
{
	__asm
	{
		//保存寄存器
		pushad
		pushfd
		//传入上层需要使用的数据，用新函数的参数接收
		push [esp+0x28]
		push [esp+0x30]//由于上一条push使ESP-=4了，所以第二个参数应该是esp+0x30的位置
		call myFunc
		add esp,0x8
		//恢复寄存器
		popfd
		popad
		//补上之前修改掉的代码
		push ebp
		mov ebp, esp
		sub esp, 40h
		//跳回原来修改掉的指令的下一句指令的地址(避免用jmp的方式)
		push g_realAddTargetAddr
		add [esp],PATCH_LENGTH
		retn
	}
}

void main()
{
	cout << "未HOOK之前调用addTarget(1,2)函数,结果为:" << endl;
	//未HOOK之前调用addTarget(1,2)函数
	addTarget(1, 2);
	//inline hook addTarget函数
	WinTool myTool;
	g_realAddTargetAddr = (DWORD)myTool.repairFuncAddr((DWORD)addTarget);
	DWORD oldProtect;
	VirtualProtect((LPVOID)g_realAddTargetAddr, 5, PAGE_EXECUTE_READWRITE, &oldProtect);
	//修改跳转到裸函数
	*(BYTE*)g_realAddTargetAddr = 0xE9;
	*(DWORD*)(((BYTE*)g_realAddTargetAddr) + 1) = (DWORD)myInLineHookFunc - 5 - (DWORD)g_realAddTargetAddr;
	VirtualProtect((LPVOID)g_realAddTargetAddr, 5, oldProtect, NULL);
	cout << "Inline HOOK之后调用addTarget(1,2)函数,结果为:" << endl;
	//Inline HOOK之后调用addTarget(1,2)函数
	addTarget(1, 2);
}
```

![image-20210709163413382](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210709163413382.png)

结果：

![image-20210709162621067](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210709162621067.png)

**通过这种间接调用函数的方式，就可以实现在上面代码的myFunc函数体中使用局部变量了！**

很多时候，防守的一方都会通过检测E9，即JMP来判断自己的程序是否被HOOK了

因此将JMP过去再JMP回来的方式改为**CALL过去再RET回来**的方式实现

`jmp是E9，CALL是E8`

```cpp
#define PATCH_LENGTH 6//hook影响到的正常指令的大小
DWORD g_realAddTargetAddr;//真实addTarget函数地址

//准备要INLINE HOOK的目标函数
void addTarget(int a, int b)
{
	cout << a << "+" << b << "=" << a + b << endl;
}

void myFunc(int a, int b)
{
	//这里面就可以写局部变量了,注意：如果把这个代码注入到别的进程跑的话，还是要堆栈
	char str[]= { 'I','n','l','i','n','e','H','o','o','k',' ','S','u','c','c','e','e','d','!',0 };
	MessageBoxA(0, str, 0, 0);
}

void _declspec(naked) myInLineHookFunc()
{
	__asm
	{
		//由于是call跳转过来的，清掉堆栈最上面的call返回到的地址！！！！！！！！！！！
		add esp, 4
		//保存寄存器
		pushad
		pushfd
		//传入上层需要使用的数据，用新函数的参数接收
		push [esp+0x28]
		push [esp+0x30]//由于上一条push使ESP-=4了，所以第二个参数应该是esp+0x30的位置
		call myFunc
		add esp,0x8
		//恢复寄存器
		popfd
		popad
		//补上之前修改掉的代码
		push ebp
		mov ebp, esp
		sub esp, 40h
		//跳回原来修改掉的指令的下一句指令的地址(避免用jmp的方式)
		push g_realAddTargetAddr
		add [esp],PATCH_LENGTH
		retn
	}
}
void main()
{
    cout << "未HOOK之前调用addTarget(1,2)函数,结果为:" << endl;
	//未HOOK之前调用addTarget(1,2)函数
	addTarget(1, 2);
	//inline hook addTarget函数
	WinTool myTool;
	g_realAddTargetAddr = (DWORD)myTool.repairFuncAddr((DWORD)addTarget);
	DWORD oldProtect;
	VirtualProtect((LPVOID)g_realAddTargetAddr, 5, PAGE_EXECUTE_READWRITE, &oldProtect);
	//修改跳转到裸函数
	*(BYTE*)g_realAddTargetAddr = 0xE8;//E8为call操作码(避免用jmp E9方式)！！！！！！！！！！！
	*(DWORD*)(((BYTE*)g_realAddTargetAddr) + 1) = (DWORD)myInLineHookFunc - 5 - (DWORD)g_realAddTargetAddr;
	VirtualProtect((LPVOID)g_realAddTargetAddr, 5, oldProtect, NULL);
	cout << "Inline HOOK之后调用addTarget(1,2)函数,结果为:" << endl;
	//Inline HOOK之后调用addTarget(1,2)函数
	addTarget(1, 2);
}
```

实际上只修改了！！！！！！！！！！！标识的两处位置

### Inline HOOK攻防(重点)

#### 阶段1

- （防）检测JMP(原函数无E9)，检测跳转范围（原函数有E9）
- （破）想方设法绕

#### 阶段2

- （防）写个线程全代码校验/CRC校验

  `全代码校验就是将代码存到另一个地方，一个一个比对`

- （攻）修改检测代码，挂起检测函数(终止的动作更大，挂起安全一点)

##### 寻找检测代码

**OD跳转到检测代码必须用硬件访问断点，内存断点的本质是修改当前命令第一个字节为CC，即int 3，也会触发检测代码，因此必须要硬件访问断点。**

**在OD的代码段中只能下硬件执行断点，但内存跟踪窗口可以下硬件访问断点，所以用内存跟踪窗口跟到代码段再下硬件访问断点就可以了**

##### CRC循环冗余校验码

一种比全代码校验的更优秀的代码校验算法

**CRC**，即**循环冗余校验码(Cyclic Redundancy Check)**：是数据通信领域中最常用的一种查错校验码

计算机网络中**数据链路层的差错控制技术**

循环冗余检查（CRC）是一种数据传输检错功能，对数据进行多项式计算，并将得到的结果附在帧的后面，接收设备也执行类似的算法，以保证数据传输的正确性和完整性。

**FCS**是添加在数据后面的冗余码。FCS可以用CRC这种方法得出，但CRC并非用来获得FCS的唯一方法。

CRC最重要的是**模二运算**。模二运算就是不进位的运算，**模二减法和模二加法本质上就是异或运算**，模二乘法与模二除法过程中涉及到的加减也就是模二加法与模二减法。

**异或运算**的本质：A 异或 B ：就相当于A按照B二进制表示中的1所对应的位进行反转。（即B中的1表示A对应位要反转）

![image-20210714143816162](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210714143816162.png)

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/WonderFox_Video_Recording_001_001.gif" style="zoom: 100%" />

[CRC原理视频详解链接]: https://www.bilibili.com/video/BV1V4411Z7VA?from=search&amp;seid=12068662759704731793

实际工程中多使用CRC-16校验



























#### 阶段3

大多数现在的程序采用的手段

- （防）先对相关API全代码校验（防止提前修改好API），多个线程互相检测，并检测线程是否在活动中
- （破）使用瞬时HOOK/硬件HOOK

A线程->B线程->C线程->要保护的代码

A检测B是否被挂起并且代码是否被修改，B检测C是是否被挂起并且代码否被修改，C检测要保护的代码是否被挂起并且代码是否被修改

实际上解决上面检测的方向只有两种

1. 与当前检测线程死磕（找漏洞，检测线程无论如何逻辑上一定有漏洞！）：瞬时HOOK
2. 不改代码，但又把想做的事情做了：硬件HOOK

循环检测的伪代码：(下图相当于上面的C线程)

![image-20210710163925510](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210710163925510.png)

该循环检测本身也被B线程CRC检测中，所以不能直接修改上图中的表层二进制代码。

##### 瞬时HOOK(临时HOOK)

瞬时HOOK是属于与当前检测线程死磕的情况

瞬时HOOK要针对具体的检测代码来实现。

对于上图的循环检测来讲，VirtualProtect函数并未被检测的情况下，我们就可以在VirtualProtect函数中做文章，HOOK Virtual Protect函数中的头部对堆栈进行回溯看是不是A处调用的他，如果不是就什么额外动作也不做；如果是A调用的他，则这个时候给ExitProcess挂钩子，钩子函数内容为检测是否是A调用的他（堆栈回溯），若不是则什么额外的都不做，如果是则取消自己给ExitProcess下的钩子。

如下线程保护，以下代码也被保护中，该如何破解：

```cpp
UINT CMFCtestDlg::ThreadFunc(LPVOID pParam)
{
	//线程函数实现
	AfxMessageBox(TEXT("线程开始执行"));
	while (1)
	{
		//检测ExitProcess
		u16 tmpExitCRC = crc16_MAXIM((u8*)exitProcessAddr, 0x13);
		//检测messageBoxAAddr
		u16 tmpTarget = crc16_MAXIM((u8*)messageBoxAAddr, 0x49);
		if (compareTarget != tmpTarget|| compareExit!= tmpExitCRC)
		{
			::MessageBoxW(0, L"检测到hook", 0, 0);
			ExitProcess(0);
		}
		Sleep(1000);
	}
}
```

![image-20210715194421171](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210715194421171.png)



### HOOK相关练习（高并发hook，了解cmpxchg8b指令）

#### 在多核环境下，如何保证对一个高并发的内核函数进行HOOK而不会出错？

问题出在当hook位置处于高并发状态下的时候，由于一次要修改5个字节，因此当一条指令修改4个字节的时候，第五个字节还未修改的时候，其他线程依然正在执行，则导致错误

两种解决办法

1. 先进行一个短跳中转一下（比较麻烦）
2. 找一种可以一次修改大于等于5个字节的指令：cmpxchg8b/cmpxchg16b

**但还有低概率的问题可能发生**

形如如下的情况

```assembly
//每个push占两个字节
push 1;
;hook位置：
push 1;
push 1;
push 1;
call xxxxxxxx;
```

上面情况

CPU在执行完第一个hook位置后第一个push，正好进行hook。

会导致执行出无法预料的问题（执行的代码都会被识别成完全不同的代码），并且堆栈百分百不平衡

如图，对于执行到中途被HOOK代码处的线程，会将硬编码解读成完全不一样的指令：（解读成了下方右图的代码）

![image-20211124154438711](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20211124154438711.png)![image-20211124154455104](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20211124154455104.png)

解决方案就是不要hook这样的位置，找不影响堆栈的地方，找单条的长指令hook，或者短跳(2字节)，甚至用中断(2字节)。

该问题主要处在内核层，因为内核层高并发，并且内核出问题直接蓝屏。

#### 如何卸载高并发HOOK

卸载HOOK的前提是：没有任何线程在我们的HOOK代码中才能卸载

对于足够高并发的程序来说，没有什么好办法

对于驱动级而言，关机重启更简单。程序则是关了重开。。。

# API小列表

| 函数                                         | 作用                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| CreateProcess                                | 创建进程                                                     |
| OpenProcess                                  | 通过进程id获得进程句柄                                       |
| TerminateProcess                             | 通过进程句柄强制终止进程                                     |
| ResumeThead                                  | 恢复线程挂起计数                                             |
| CloseHandle                                  | 关闭内核对象句柄，减少内核对象计数                           |
| GetModuleFileName                            | 根据模块名得到模块文件路径                                   |
| GetCurrentDirectory                          | 获取当前进程工作目录路径                                     |
| GetCurrentProcessId                          | 获取当前进程ID                                               |
| GetCurrentProcess                            | 获取当前进程句柄                                             |
| GetCommandLine                               | 获取当前进程命令行                                           |
| GetStartupInfo                               | 获取当前进程的启动信息                                       |
| GetCurrentThreadId                           | 获取线程id                                                   |
| EnumProcesses                                | 遍历进程ID                                                   |
| CreateToolhelp32Snapshot                     | 快照                                                         |
| CreateThread                                 | 创建线程                                                     |
| Sleep                                        | 当前线程停止多少毫秒                                         |
| SuspendThread                                | 挂起别的线程                                                 |
| WaitForSingleObject                          | 等待单个内核对象状态发生变化                                 |
| WaitForMultipleObjects                       | 等待多个内核对象状态发生变化                                 |
| GetExitCodeThread                            | 获取线程回调函数的返回结果                                   |
| GetThreadContext                             | 获取线程上下文                                               |
| SetThreadContext                             | 设置线程上下文                                               |
| CreateMutex                                  | 创建或打开互斥体                                             |
| GetLastError                                 | 获取错误码                                                   |
| CreateEvent                                  | 创建或打开事件                                               |
| SetEvent                                     | 指定事件设为有信号（优先wait线程）                           |
| ResetEvent                                   | 指定事件设为无信号（优先wait线程）                           |
| GDI等一大批函数                              | 绘图                                                         |
| CreateWindow                                 | 创建窗口并创建消息队列                                       |
| ShowWindow                                   | 显示窗口                                                     |
| GetMessage                                   | 从消息队列取消息                                             |
| DispatchMessage                              | 分发消息，通知操作系统调用对应窗口回调                       |
| TranslateMessage                             | 使键盘按下产生WM_CHAR消息                                    |
| OutputDebugString                            | 显示调试信息                                                 |
| SeTDlgItemText                               | 设置控件的标题或文本                                         |
| PostQuitMessage                              | 向系统指示线程已请求终止（退出）。它通常用于响应[WM_DESTROY](https://docs.microsoft.com/en-us/windows/desktop/winmsg/wm-destroy)消息。 |
| VirtualAlloc                                 | 给自己申请私有内存                                           |
| VirtualAllocEx                               | 给别的进程申请私有内存                                       |
| VirtualFree                                  | 释放私有内存或仅释放物理页                                   |
| CreateFileMapping                            | 创建或打开文件映射内核对象用于：申请物理页或者申请物理页并把文件映射到物理页 |
| MapViewOfFile                                | 物理页映射到虚拟地址函数                                     |
| UnmapViewOfFile                              | 取消物理页到虚拟地址函数的映射关系                           |
| GetLogicalDrives                             | 获取卷(有哪些卷，是什么)                                     |
| GetLogicalDriveStrings                       | 获取一个卷的盘符的字符串                                     |
| GetDriveType                                 | 获取卷的类型                                                 |
| GetVolumeInformation                         | 获取卷的信息(可查看文件系统等)                               |
| CreateDirectory                              | 创建目录                                                     |
| RemoveDirectory                              | 删除现有空目录                                               |
| MoveFile                                     | 移动文件或目录（可改名）                                     |
| GetCurrentDirectory/SetCurrentDirectory      | 获取/设置当前程序工作目录                                    |
| CreateFile                                   | 创建或打开文件或 I/O 设备                                    |
| GetFileSize                                  | 获取文件大小                                                 |
| GetFileAttributes()/GetFileAttributesEx      | 检索指定文件或目录的属性。                                   |
| ReadFile()/WriteFile()/CopyFile()/DeleteFile | 读/写/复制/删除文件                                          |
| FindFirstFile()/FindNextFile                 | 查找文件或目录                                               |
| FlushViewOfFile                              | 将文件映射指定范围的字节即刻写入硬盘                         |
| LoadLibrary                                  | 加载动态链接库                                               |
| FreeLibrary                                  | 卸载动态链接库                                               |
| FreeLibraryAndExitThread                     | 当前由动态链接库创建的线程卸载动态链接库并退出线程           |
| GetProcAddress                               | 获取导出函数在对应模块中的地址                               |
| CreateRemoteThread                           | 创建远线程                                                   |
| WriteProcessMemory                           | 写进程内存                                                   |
| ReadProcessMemory                            | 读内存进程                                                   |
| GetModuleHandle                              | 获取模块句柄                                                 |
| VirtualProtect                               | 更改对调用进程虚拟地址空间中已提交页面区域的保护。           |
| VirtualProtectEx                             | 更改对别的进程调用进程虚拟地址空间中已提交页面区域的保护     |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |
|                                              |                                                              |















# 自定义消息

Windows程序与其它类型程序的区别就是使用消息，例如键盘或鼠标消息等，在dos系统下的程序没有定义消息。在windows操作系统中，消息不但可以用于进程内的通信，也可以用于进程间的通信。而我这篇博文将讲使用自定义消息实现进程间的通信。

​    我们都知道，在windows中消息分为两种，即系统消息和用户自定义消息，系统消息定义从0到0x3ff，可以使用0x400到0x7fff定义自己的消息。windows把0x400定义为WM_USER，如果想定义自己的一个消息，可以在WM_USER上加上一个值。当然了，还有另外一种方法，这里就不讲了，而是使用RegisterWindowsMessage()函数。

​    **要想用消息实现进程间通信，则需要在这两个程序中定义或注册相同的消息，才能保证数据通信顺利进行。**

　　**使用这种方式实现进程间通信，但是传送的数据只能是长整型的数据，不能是字符串。所以这个就是这种方式的局限。**



# 键鼠模拟

用户按下按键-----键盘驱动程序将此事件传递给操作系统-----操作系统将键盘事件插入消息队列-----键盘消息被发送到当前活动窗口

模拟键盘的方法有三种：

1. keybd_event() 
2. PostMessage() /SendMessage()
3. SendInput()

keybd_event是**全局模拟按键的，只对前台窗口**（即当前的活动窗口）才可以，但是如果模拟的按键正好也是某个窗口的全局热键消息，那该窗口也能接收到的

而SendMessage 、PostMessage是对指定句柄窗口都其作用的，对于做一些一外挂是非常有用的。例如可以做成这样的效果：即用SendMessage/PostMessage在某一个窗口模拟动作，而同时自己可以在其他窗口做其他事情，互不影响的！

PostMessage中的窗口句柄参数，可以设置为HWND_BROADCAST，即广播，但不要理所当然地认为是对所有的窗口都起作用！！！它只对系统的顶层窗口起作用，子窗口是收不到这个消息的！！！

SendMessage是没有HWND_BROADCAST参数的，那是因为，SendMessage总是等发送的消息在对应的窗口消息队列 中处理完毕后才返回的（这是一种负责的行为）

**SendMessage和PostMessage的区别**是PostMessage函数直接把消息仍给目标程序就不管了，而SendMessage把消息发出去后，还要等待目标程序返回些什么东西才好。这里要注意的是，模拟键盘消息一定要用PostMessage函数才好，用SendMessage是不正确的(因为模拟键盘消息是不需要返回值的，不然目标程序会没反应)

**如果用PostMessage发送局部消息模拟按键不成功的话，你可以试一试全局级的键盘消息keybd_event() **

## PostMessageA

```cpp
// 模拟鼠标
PostMessage(
	hwnd, 					// 目标窗口句柄
	WM_RBUTTONDOWN, 		// 更多鼠标事件宏定义类型参考 ： https://docs.microsoft.com/en-us/windows/win32/inputdev/mouse-input-notifications
	0,
	MAKELPARAM(200,200)		// x = 200,y = 200（相对于窗口的坐标，而不是屏幕的坐标）
	);

// 模拟键盘
PostMessage(
	hwnd,					// 目标窗口句柄
	WM_KEYDOWN,				// 更多键盘事件共定义参考 ： https://docs.microsoft.com/en-us/windows/win32/inputdev/keyboard-input
	0x41,					// 更多按键种类宏定义参考 ： https://docs.microsoft.com/zh-cn/windows/win32/inputdev/virtual-key-codes
	0
	);
```

[虚拟键码VK_code查询](https://docs.microsoft.com/zh-cn/windows/win32/inputdev/virtual-key-codes)

## keybd_event() 

这个函数对大部分的窗口程序都有效，可是仍然有一部分游戏对它产生的键盘事件熟视无睹，这时候，你就要用上bScan这个参数了。一般的，bScan都传0，但是如果目标程序是一些DirectX游戏，那么你就需要正确使用这个参数传入扫描码，用了它可以产生正确的硬件事件消息，以被游戏识别。

## SendInput()

[SendInput函数](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput)也可以模拟全局键盘事件。SendInput可以直接把一条消息插入到消息队列中，算是比较底层的了

## 钩子模拟键鼠操作

  除了以上这些，用全局钩子也可以模拟键盘消息。如果你对windows中消息钩子的用法已经有所了解，那么你可以通过设置一个全局HOOK来模拟键盘消息，比如，你可以用WH_JOURNALPLAYBACK这个钩子来模拟按键。WH_JOURNALPLAYBACK是一个系统级的全局钩子，它和WH_JOURNALRECORD的功能是相对的，常用它们来记录并回放键盘鼠标操作。WH_JOURNALRECORD钩子用来将键盘鼠标的操作忠实地记录下来，记录下来的信息可以保存到文件中，而WH_JOURNALPLAYBACK则可以重现这些操作。当然亦可以单独使用WH_JOURNALPLAYBACK来模拟键盘操作。你需要首先声明SetWindowsHookEx函数，它可以用来安装消息钩子：
Declare Function SetWindowsHookEx Lib "user32" Alias "SetWindowsHookExA" (ByVal idHook As Long,ByVal lpfn As Long, ByVal hmod As Long, ByVal dwThreadId As Long) As Long
先安装WH_JOURNALPLAYBACK这个钩子，然后你需要自己写一个钩子函数，在系统调用它时，把你要模拟的事件传递给钩子参数lParam所指向的EVENTMSG区域，就可以达到模拟按键的效果。不过用这个钩子模拟键盘事件有一个副作用，就是它会锁定真实的鼠标键盘，不过如果你就是想在模拟的时候不会受真实键盘操作的干扰，那么用用它倒是个不错的主意。

## 驱动级模拟

直接读写键盘的硬件端口

有一些使用DirectX接口的游戏程序，它们在读取键盘操作时绕过了windows的消息机制，而使用DirectInput.这是因为有些游戏对实时性控制的要求比较高，比如赛车游戏，要求以最快速度响应键盘输入。而windows消息由于是队列形式的，消息在传递时会有不少延迟，有时1秒钟也就传递十几条消息，这个速度达不到游戏的要求。而DirectInput则绕过了windows消息，直接与键盘驱动程序打交道，效率当然提高了不少。因此也就造成，对这样的程序无论用PostMessage或者是keybd_event都不会有反应，因为这些函数都在较高层。对于这样的程序，只好用直接读写键盘端口的方法来模拟硬件事件了。要用这个方法来模拟键盘，需要先了解一下键盘编程的相关知识。

[键鼠模拟详解]: https://blog.csdn.net/alphaxz1/article/details/49330941

我的理解：

![image-20210608224348679](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210608224348679.png)

全局到局部窗口的消息由操作系统进程分发

# 全局理解点

**进程结束的时候，操作系统会在进程之后进行全面的清除，使得所有操作系统资源都不会保留下来。这意味着进程使用的所有内存均被释放，所有打开的文件全部关闭，所有内核对象的使用计数均被递减，同时所有的用户对象和GDI对象均被撤消。**

# 图形图像处理

easyx库 ``

bmp格式的图片如何描述

```c
typedef struct tagBITMAPFILEHEADER {
        WORD    bfType;//类型
        DWORD   bfSize;//大小
        WORD    bfReserved1;
        WORD    bfReserved2;
        DWORD   bfOffBits;//偏移
} BITMAPFILEHEADER, FAR *LPBITMAPFILEHEADER, *PBITMAPFILEHEADER;

typedef struct tagBITMAPINFOHEADER{
        DWORD      biSize;
        LONG       biWidth;
        LONG       biHeight;
        WORD       biPlanes;//调色板
        WORD       biBitCount;//比特位总计
        DWORD      biCompression;//描述
        DWORD      biSizeImage;//Image图像的大小
        LONG       biXPelsPerMeter;
        LONG       biYPelsPerMeter;
        DWORD      biClrUsed;
        DWORD      biClrImportant;
} BITMAPINFOHEADER, FAR *LPBITMAPINFOHEADER, *PBITMAPINFOHEADER;

//这两个结构体描述bmp图片有关的信息
//一张bmp图片的二进制格式为: (首)BITMAPFILEHEADER+BITMAPINFOHEADER+图片像素点数据(尾)
```

[tagBITMAPINFOHEADER官方信息查阅](https://docs.microsoft.com/zh-cn/windows/win32/api/wingdi/ns-wingdi-bitmapinfoheader?f1url=%3FappId%3DDev14IDEF1%26l%3DZH-CN%26k%3Dk(wingdi%252FtagBITMAPINFOHEADER)%3Bk(tagBITMAPINFOHEADER)%3Bk(DevLang-C%252B%252B)%3Bk(TargetOS-Windows)%26rd%3Dtrue)

bmp文件是的像素点数据是反的,最先的像素点数据在文件最末尾.

一个像素是3个字节

[坐标关系转换相关查阅](https://blog.51cto.com/u_8081755/3354801)



