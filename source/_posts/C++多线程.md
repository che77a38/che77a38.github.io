---
title: C++多线程
tags:
  - C++
categories: 技术
mathjax: true
abbrlink: 9f089854
---

C++语言级线程支持详解

<!-- more -->

# 概述

为什么要用多线程

- 任务分解

  耗时的操作,任务分解,实时响应

- 数据分解

  充分利用多核cpu处理数据

- 数据流分解

  读写分离,解耦合设计

> 先了解操作系统提供的线程api
>
> - [[linux基础以及系统编程#线程相关函数|linux提供的线程操作用法详解]]
> - [[windows开发#线程|windows提供的线程操作用法详解]]

C++11引入了语言级线程支持,使用头文件`#include <thread>`,同时linux上额外需要编译选项`-lpthread`

thread下的两个成员函数,用于主线程与子线程之间的交互

- `join()`: 等待线程结束并阻塞当前线程，直到被等待的线程执行完毕。

  可以在整个程序析构的时候调用join,来等待子线程退出

- `detach()`: 将线程设置为分离状态，使得线程结束时资源可以自动释放，不需要显式调用`join`来等待线程结束。

> `this_thread::sleep_for(chrono::seconds(1));`  等待一秒
>
> 由C++11引入
>
>    - `this_thread::sleep_for` 需要使用 `std::this_thread` 命名空间，并且需要包含 `<thread>` 和 `<chrono>` 头文件。
>
>      精度更高,可移植性更强
>
>    - `sleep` 函数通常在 POSIX 系统中使用，需要包含 `<unistd.h>` 头文件。





```cpp
void testFunc(int p1,float p2,string str)
{
    cout<<"subThread begin"<<endl;
    cout<<p1<<endl;
    cout<<p2<<endl;
    cout<<str<<endl;
    cout<<"subThread end"<<endl;
}
int main(int argc, const char **argv) {
    cout<<"main begin"<<endl;
    thread th(testFunc,101,1.1,"hello world");//传参给线程函数
    th.join();//堵塞,等待子线程退出
    //th.detach();//分离
    cout<<"main end"<<endl;
    return 0;
}
```

注意:传参给线程函数的过程是**值传递**

