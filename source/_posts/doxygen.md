---
title: doxygen
tags: doxygen
categories: 技术
mathjax: true
abbrlink: 3bba4007
---

详细介绍doxygen的基本到进阶用法

<!-- more -->

文档生成工具方案盘点

- Doxygen: (直接生成.html)简单可用

- Doxygen（生成.xml）+ 前端工具（由.xml生成html，例如 docsforge）

- 基于clang解析（Standardese/Hdoc/Cldoc）：不一定提供latex=>pdf

- Sphinx: 需要手写独立的.rst文件，再生成，不好维护

- .md转html（MkDocs/Docusaurus）：需要手写独立的.md文件，再生成

- Doxygen+Sphinx组合：需要进一步搭配Breathe，或定制开发的工具

最方便简单无痛使用的到头来还就是**Doxygen**

# Doxygen

[官网](http://www.doxygen.nl/)

Doxygen 是一个文档生成工具，用于为源码生成说明文档。我们可以在代码中按照 Doxygen 要求的语法编写代码注释，然后使用 Doxygen 将程序中的注释提取出来生成一个文档。我们一般都把注释写在代码中，所以使用 Doxygen 生成的文档也能够非常方便地更新。Doxygen 还会在文档中引用源码文件，故我们也可在文档中方便地查看源码。

Doxygen 实际上是为C++编写的标准的文档生成工具，它可以从C++源码中提取文档。除了 C++，还支持 C、Objective-C、C#、PHP、Java，、Python、IDL （Corba，Microsoft， 和 UNO/OpenOffice flavors）、Fortran、VHDL、Tcl、以及D语言。

Doxygen支持Windwos,Linux,macOS

以mac安装为例:

官网上download下载到的是界面版,不带命令行工具

[可选] 通过 `brew install doxygen` 安装doxygen命令工具

## 生成文档流程 

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404231114289.png)

- Project name/Project synopsis/Project version or id均会显示到生成的网页中

**Expert专家模式中记录常用设置流程**

1. Project->OUTPUT_LANGUAGE:Chinese
2. SHOW_USED_FILES:EXTRACT_ALL:true   即使没有注释也会提取,但是不包含私有,静态等实体,这些也需要手动开启
3. SHOW_USED_FILES:false   取消某处文件位置显示
4. HTML->DISABLE_INDEX:true   关掉顶部导航栏
5. HTML->GENERATE_TREEVIEW:true  生成侧边栏的树状图

## 理解

doxygen中的实体:类,函数,甚至函数的参数所有一切均视为实体

简单理解流程,图中列的输出项并不全

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404231140035.png" alt="image-20240423113959320" style="zoom: 25%;" />

## 注释写法

[注释的几种风格参考官方文档](https://doxygen.nl/manual/docblocks.html#cppblock)

这里列一套做法:

- 与代码同行的注释类型

  ```cpp
  /*!< ... 批注 ... */
  /**< ... 批注 ... */ （推荐）
  //!< ... 批注 ...
  ///< ... 批注 ...  （推荐）
  ```

- 在代码上方的注释类型

  ```cpp
  /*!
   * ... text ...
   */
  
  /**
   * ... txt ...
   */
  
  ///
  /// ... txt ...  (推荐)
  ///
  ```

- 其它不想被包含到文档里的注释

  ```cpp
  // ... text ...
  
  /*  ... text ... */
  
  ```

- 一种常用的注释格规范（一般放在函数、对象、结构体的定义前面）

  ```cpp
  /**
   * @brief 表示具体描述说明
   * @param 表示参数说明，有@param、@param[in]和@param[out]三种写法，字面意思
   * @return 表示返回参数
   * @see 表示另见See also，多用在存在继承关系上，\n
     比如A继承了B，但是A没有重写继承来的方法C，在C上就可以注释另见B
  */
  ```

## 常用注释命令

详解(下面的`@`均可替换为`\`)

```c#
@exception <exception-object> {exception description} 对一个异常对象进行注释。

@warning {warning message } 一些需要注意的事情

@todo { things to be done } 对将要做的事情进行注释，链接到所有TODO 汇总的TODO 列表

@bug 缺陷，链接到所有缺陷汇总的缺陷列表

@see {comment with reference to other items } 一段包含其他部分引用的注释，中间包含对其他代码项的名称，自动产生对其的引用链接。

@relates <name> 通常用做把非成员函数的注释文档包含在类的说明文档中。

@since {text} 通常用来说明从什么版本、时间写此部分代码。

@deprecated

@pre { description of the precondition } 用来说明代码项的前提条件。

@post { description of the postcondition } 用来说明代码项之后的使用条件。

@code 在注释中开始说明一段代码，直到@endcode命令。

@endcode 注释中代码段的结束。

@code .. @endcode 包含一段代码

@addtogroup 添加到一个组。

@brief 概要信息

@deprecated 已废弃函数

@details  详细描述

@note 开始一个段落，用来描述一些注意事项

@par 开始一个段落，段落名称描述由你自己指定

@param 标记一个参数的意义

@fn 函数说明

@ingroup 加入到一个组

@return 描述返回意义

@retval 描述返回值意义

@include 包含文件

@var、@enum、@struct、@class 对变量、美剧、结构体、类等进行标注
```

> 一般在头文件中放置不太会发生变化的注释
>
> 在源文件中使用一些易发生变化的注释

## 相关插件

[Doxygen Documentation Generator](https://marketplace.visualstudio.com/items?itemName=cschlosser.doxdocgen#config-options)   自动补全注释模板

[Auto Comment Blocks](https://marketplace.visualstudio.com/items?itemName=kevinkyang.auto-comment-blocks)     自动补全注释符号,可以和上面搭配使用于单行注释

## 进阶用法

### 函数关系图

Linux环境下采用CodeViz+GraphViz+gcc可以自动生成函数调用关系

Windows环境下有很多方法

1. vs有自动生成函数调用功能关系图的工具(社区版不够用)

2. 开源利器SI(source insight)

   SI生成的调用关系图中，当两个函数调用同一个底层函数时，该底层函数会分别出现在两个函数调用图的下面，因此这种方法也不能最快的看出那些经常被调用的底层函数

3. 自动生成函数调用关系图Doxygen+GraphViz+HtmlHelp

#### Doxygen+GraphViz+HtmlHelp方案

[生成函数调用关系图](https://blog.csdn.net/zpqiatongxueshaonian/article/details/97056075)

[较为详细的操作指引](https://blog.csdn.net/u014213012/article/details/123064358)