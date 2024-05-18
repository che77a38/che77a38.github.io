---
title: C++相关工具盘点
tags: C++
categories: 工具
mathjax: true
abbrlink: 838774f7
---

盘点各种C++开发中可能使用到的工具及其详细使用方式

<!-- more -->

# C++分析工具

## AddressSanitizer

AddressSanitizer是Google旗下的一个内存问题检测工具，[项目地址](https://github.com/google/sanitizers/wiki/AddressSanitizer)

与传统的内存问题检测工具，如 `Valgrind`,最大的区别是效率:

- Valgrind 大约降低10倍运行速度
- AddressSanitizer  大约降低2运行速度

在LLVM及高版本编译器中已经自带了该工具，编译时添加 `-fsanitize=address` 选项。
正常运行程序，如有内存相关问题，即会打印异常信息。

[原理参考官方文档](https://github.com/google/sanitizers/wiki/AddressSanitizerAlgorithm)   [原理讲解](https://zhuanlan.zhihu.com/p/37515148)

- AddressSanitizer(ASan): 内存地址越界检查

  `-fsanitize=address`

- LeakSanitizer(LSan): 内存泄漏检查，可以单独使用

  `-fsanitize=leak`

  目前只支持linux

- ThreadSanitizer (TSan): 线程安全检查

  检测多线程程序中的数据竞争和死锁问题

  `-fsanitize=thread`

- UndefinedBehaviorSanitizer (UBSsan): 未定义行为检查

  比如整数溢出,除以零等

  `-fsanitize=underfined`

- MemorySanitizer (MSan): 内存分配检查

  检测使用未初始化的内存

以上这些工具都是clang/clang++编译器自带的，他们位于llvm项目的一个子项目Sanitizer中。因此，如果我们使用clang编译器，便可以很方便地使用这些功能。需要注意的是，Mac自带的clang编译器和llvm的clang的编译器，稍有不同，Mac自带的clang不支持LeakSanitizer的内存泄漏检查功能

> 优势
>
> - 不需要额外安装，比如在Mac下安装valgrind，并不是十分方便
> - 可以无缝接入到cmake，可以在CMakeLists.txt中直接设置编译选项
> - **运行速度快**，个人实际使用体验，比valgrind快太多了

`-fsanitize=address -g -O1 -fno-omit-frame-pointer`

> 1. `-g`
>    该选项告诉编译器生成调试信息,这对于在发生内存错误时获取有用的堆栈跟踪和源代码位置信息非常重要。
> 2. `-O1`
>    这是一个优化级别选项,`-O1`表示进行基本的优化,可以提高程序性能,同时保留足够的调试信息。更高级别的优化(如`-O2`或`-O3`)可能会使调试信息不准确或丢失。
> 3. `-fno-omit-frame-pointer`
>    默认情况下,编译器可能会优化掉帧指针(frame pointer),以减小二进制大小和提高性能。但这会使堆栈跟踪信息不完整。`-fno-omit-frame-pointer`选项可以确保保留帧指针,从而获得更准确的堆栈跟踪。

## gperftools

[开源地址](https://github.com/gperftools/gperftools/tree/master)

| 工具       | 使用命令                                                     | 是否需要重新编译 | Profiling速度 | 是否支持多线程热点分析 | 是否支持链接库热点分析 |
| ---------- | ------------------------------------------------------------ | ---------------- | ------------- | ---------------------- | ---------------------- |
| gprof      | `./test; gprof ./test ./gmon.out`                            | 是               | 慢            | 否                     | 否                     |
| valgrind   | `Valgrind --tool=callgrind ./test`                           | 否               | 非常慢        | 是                     | 是                     |
| gperftools | `LD_PRELOAD=/usr/lib/libprofiler.so CPUPROFILE=./test.prof ./test` | 否               | 快            | 是                     | 是                     |

安装: `brew install gperftools`

不会使用,暂略

arm暂时不支持

## valgrind

速度慢但是最强大

不支持arm架构

可以在arm mac上转译运行他,用于检测x86架构的程序

## vs自带性能分析工具

还未开始使用

# Instruments

xcode专用调试工具

| 检测项目          | 英文名称         |
| ----------------- | ---------------- |
| 内存泄漏检测      | Leaks            |
| CPU使用情况分析   | Time Profiler    |
| 磁盘活动监控      | File Activity    |
| 网络活动监控      | Network Activity |
| GPU渲染性能分析   | Core Animation   |
| OpenGL ES驱动分析 | OpenGL ES Driver |
| 能源消耗分析      | Energy Log       |
| 系统跟踪          | System Trace     |
| 自动化UI测试      | Automation       |
| 僵尸对象检测      | Zombies          |
| 核心数据检测      | Core Data        |
| 响应时间分析      | Responsiveness   |
| 内存分析          | Allocations      |
| 虚拟内存分析      | VM Tracker       |
| 活动监视器        | Activity Monitor |

# C++单元测试工具

## gtest

[开源地址](https://github.com/google/googletest)

Google Test（简称为gtest）是一个流行的C++测试框架，用于编写和执行单元测试、集成测试和功能测试。它是 Google 开发的开源项目，旨在提供简单、灵活和可扩展的测试解决方案。以下是对 Google Test 的一些重要特点和功能的介绍

1. 易于入门和使用：Google Test 提供了简洁而直观的 API，使得编写和运行测试用例非常容易。它遵循 xUnit 风格的测试框架设计，并提供了丰富的断言宏来验证预期结果。
2. 支持多种测试类型：Google Test 支持单元测试、集成测试和功能测试。你可以使用它来编写针对函数、类、模块或整个应用程序的测试。
3. 参数化测试：Google Test 允许你使用参数化测试来覆盖不同的输入和参数组合。你可以使用 TEST_P 和 INSTANTIATE_TEST_SUITE_P 宏来定义和实例化参数化测试。
4. 固件（Fixture）支持：Google Test 支持测试固件的概念，允许你在测试之前和之后设置和清理共享资源。通过使用 TEST_F 宏定义测试固件，可以方便地在多个测试用例之间共享初始化和清理代码。
5. 丰富的断言：Google Test 提供了丰富的断言宏来验证预期结果。例如，你可以使用 EXPECT_EQ 来检查两个值是否相等，或使用 EXPECT_TRUE 来验证条件是否为真。
6. 输出详细信息：Google Test 在测试运行过程中会生成详细的输出信息，包括测试结果、失败原因和附加信息等。这些信息有助于诊断问题和快速修复错误。
7. 可扩展性：Google Test 具有良好的可扩展性，允许你编写自定义的测试扩展和辅助函数。你可以根据需要创建自己的断言宏、打印函数和参数生成器等。
8. 平台支持：Google Test 支持多种平台和编译器，包括 Windows、Linux、macOS 和各种 C++ 编译器。

## 环境配置

### Linux

```shell
# apt安装
sudo apt install libgtest-dev
# 编译运行
g++ -o main main.cpp test.cpp -lgtest -lgtest_main -pthread  && ./main
```













