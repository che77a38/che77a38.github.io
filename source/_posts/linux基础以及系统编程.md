---
title: linux系统编程
tags: linux
categories: 技术
mathjax: true
abbrlink: 5c231afa
date: 2020-12-23 22:51:13
---

# linux基础

- 熟悉Linux下目录结构和常见目录的作用
- 熟练使用linux下的相对路径和绝对路径
- 熟练使用Linux下常用文件和目录操作相关的命令
- 熟练使用修改用户权限,用户和用户组相关的命令
- 熟练使用文件的查找和检索相关的命令
- 熟练掌握Ubuntu下的软件安装和卸载
- 熟练使用压缩工具完成文件或目录的压缩解压缩

<!-- more -->

[linux详细查询跳转外部网址](http://c.biancheng.net/linux_tutorial/)

## 命令解释器

- shell就是命令解释器
- 作用:对用户输入到终端的命令进行解析,调用对应的执行程序

![1212121212](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203051532095.png)

用户在终端输入命令,由shell命令解释器对命令进行解析(按照$PATH环境变量搜索命令),解析成内核能够识别的指令,然后有内核执行命令,最后由终端显示命令执行的结果给用户

shell在寻找命令的时候是按照$PATH环境变量去查找的,如果找到了就执行对应的命令,若找不到就报错,执行`echo $PATH`可以查看PATH环境变量的值

![image-20220305153637492](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203051536768.png)

![1212121212](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203051541990.png)

常见的命令解析器:

- shell -- Bourne Shell     (/bin/sh)   不支持tab键补全
- bash -- Bourne Again Shell      (/bin/bash)

查看当前电脑有几个命令解析器:`cat /etc/shells`

![image-20220305154519666](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203051545251.png)

查看当前系统使用的shell:`echo $SHELL`

![image-20220305154621265](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203051546536.png)

## Linux下常用快捷键

- tab键

  补齐命令,补齐文件

- 上下方向键

  遍历输入的历史命令

  使用`history`命令可以显示用户输入的所有命令

- 光标移动

  ctrl+b光标后移

  ctrl+f光标前移

  ctrl+a光标移动到行首

  ctrl+e光标移动到行末

- 删除字符

  ctrl+h(backspace)删除光标左边字符

  ctrl+d删除光标右边(覆盖的)字符

  ctrl+u删除光标前所有内容

  ctrl+k删除光标前后有内容

## Linux下目录结构

Linux系统的目录结构是一个倒立的树状结构,根目录用`/`表示,对比Windows目录结构理解Linux的目录结构

![捕获](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203051601037.png)

- `/bin` binary,二进制文件,可执行程序,shell命令,存放众多的【(一般性/系统)应用程序】目录，主要放置**一些应用软件工具的必备执行档**,**存放二进制可执行程序，里面的程序可以直接通过命令行调用，而不需要进入程序所在的文件夹。**

  如:ls,rm,mv,cp等常用命令

- `/sbin` s是Super User的意思,这里存放的是系统管理员使用的系统管理程序,存放【**超级用户**的一些管理程序】目录，与`/bin`相比，此文件下的属于**超级用户(root)所有**

  如:ifconfig,halt,shutdown,reboot等系统命令

- `/dev` device设备,在linux下一切皆文件,存放【所有设备文件，设备特殊文件】目录

  硬盘,显卡,显示器

  字符设备文件,块设备文件

  如:在input目录下执行:sudo cat mouse0,移动鼠标会显示有输入

  `/dev/null`是一个类似无底洞,写不满的设备文件,重定向数据到该设备相当于丢弃数据

- `/lib` linux运行的时候需要加载的一些动态库,存放【标准程序设计库】目录，又叫【动态链接共享库】目录

  如:libc.so,libpthread.so等

  下文介绍`/usr`中有提及与`/usr`中一些lib文件夹的关系与区别

- `/mnt` 挂载**外部介质**（设备）的目录,如U盘等

- `/media` 外设的自动挂载目录,如光驱等

- `/root` linux的超级用户root的家目录(家目录:切换到不同用户时跳转到的目录)

- `/usr` unix system resource -- 类似于Windows的programe files目录

  - include目录里存放头文件,如:stdio.h,stdlib.h,string.h,pthread.h

  - games目录下的小游戏,如:小火车游戏

    > 内部的进一步划分,以及和`/lib`的关系与区别
    >
    > 简单说,`/lib`是内核级的,`/usr/lib`是系统级的,`/usr/local/lib`是用户级的.
    >
    > `/lib/` — 包含许多被 `/bin/` 和 `/sbin/` 中的程序使用的库文件。目录 `/usr/lib/` 中含有更多用于用户程序的库文件。

- `/etc` 存放系统级别的配置文件,存放【系统管理和配置文件】目录，所有的配置文件几乎都在此处

  - `/etc/passwd`

    man 5 passwd可以查看passwd文件的格式信息

  - `/etc/group`

    man 5 group可以查看group文件的格式信息

  - `/etc/profile`

    系统的配置文件,修改该文件会影响这个系统下面的所有的用户

- `/opt` 存放**第三方软件**的目录

  但oracle，websphere等不认为是第三方软件，反而认为是linux的一员，故而放在`/usr`下

- `/home` linux操作系统所有用户的家目录

  用户家目录:(宿主目录或主目录)  /home/你的用户名

- `/tmp` 存放临时文件

  这个目录下的文件会在系统重启后自动清除
  
- `/boot`  内核和其它系统启动期间使用的文件

- `/var`   存放【系统产生的经常变化文件】目录，例如：打印机，邮件，新闻等假脱机目录

![1173617-20171014010929277-1576262155](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202306071427682.png)

> - `/usr`：系统级的目录，可以理解为`C:/Windows/`，`/usr/lib`理解为`C:/Windows/System32`。
> - `/usr/local`：用户级的程序目录，可以理解为`C:/Progrem Files/`。用户自己编译的软件默认会安装到这个目录下。
> - `/opt`：用户级的程序目录，可以理解为`D:/Software`，opt有可选的意思，这里可以用于放置第三方大型软件（或游戏），当你不需要时，直接`rm -rf`掉即可。在硬盘容量不够时，也可将/opt单独挂载到其他磁盘上使用。
>
> 源码放哪里？
> `/usr/src`：系统级的源码目录。
> `/usr/local/src`：用户级的源码目录。

## 相对路径和绝对路径

- 绝对路径

  从根目录开始表示的路径,也就是从 `/` 开始

- 相对路径

  - 从当前所处的目录开始表示的路径
  - `.` 表示当前目录
  - `..` 表示当前目录的上一级目录

- linux中的命令提示符

  `zeroko14@deMacBook-Pro:~/test/course/day1$`

  - `zeroko`:当前登录的用户

  - `@`:英文at,在的意思

  - `deMacBook-Pro`:主机名(主机名在/etc/hosts这个文件中)

  - `~/test/course/day1` 当前工作目录,~表示宿主目录(家目录或主目录)

    可以通过 `echo ~` 或者 `echo $HOME` 查看当前用户的宿主目录

  - `$`:表示当前用户为普通用户,`#` 表示当前用户为root用户

## 文件和目录操作相关的命令

### tree命令

以树状形式查看指定目录内容(结构层次清晰),使用该命令需安装软件tree

安装方式:`sudo apt-get update`     `sudo apt-get install tree`

```c
tree //树形结构显示当前目录下的文件信息
tree 目录//树形结构显示指定目录下的文件信息
```

### ls命令

查看指定目录下的文件信息

```c
ls  //显示当前目录下文件信息
ls 目录或文件名//显示指定目录下文件信息
```

| 参数 | 作用                                          |
| ---- | --------------------------------------------- |
| -a   | 列出当前目录下的所有文件(包含.开头的隐藏文件) |
| -R   | 递归方式列出所有目录中的内容                  |
| -l   | 列出文件的详细信息(`ls -l`简写:`ll`)          |
| -t   | 按照时间排序显示内容                          |
| -r   | 反转顺序显示                                  |
| -i   | 查看inode节点lili                             |

参数之间可以结合使用,如:`ls -ltr` 按照时间逆向显示所有内容详细信息

-a所有文件包含:隐藏文件(以.开头的文件名和普通文件和.还有..)

![image-20220305170027550](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203051700028.png)

-l列出的详细信息包含7部分内容

![图片1](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203051716573.png)

![image-20220305165430053](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203051654788.png)

- 文件类型(第1个字符)

  - `-` 普通文件
  - `d` 目录directory
  - `l`  符号链接link,相当于Windows的快捷方式
  - `s` 套接字socket
  - `p`  管道pipe
  - `b` 块设备block
  - `c` 字符设备 character

- 用户的操作权限(2~10个字符)

  r:可读;w:可写;x:可执行

  - 文件所有者对文件的操作权限(第2,3,4字符)

  - 文件所属组用户对文件的操作权限(第5,6,7字符)

  - 其他人对文件的操作权限(第8,9,10字符)

    ![捕获](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203051713214.png)

- 硬链接计数

  - 对于**目录**来说,**链接计数**等于**该目录下所有的目录总数(包含.和..)**,但是不包含该目录的子目录下的目录文件数量(执行ls -la命令可以进行查看)
  - 对于**文件**来说,指的是该文件所有的**硬链接文件数量**

- 文件所有者:zeroko或root

- 文件所属组:wheel(mac中具有管理员性质的用户位于wheel组中,可以用su切换到root的用户集合)

- 文件大小

  - 如果是**目录**:只表示目录大小,不包含目录中的内容,目录大小为4k
  - 如果是**文件**:表示文件大小

- 文件的创建日期或最后修改时间:`3  4  22:51`:表示创建或最后修改于3月4日22:51

- 文件名:DidFinish.txt

### cd命令

切换目录(change directory),命令使用方式:`cd + (相对或绝对)路径`

```c
cd //切换到家目录
cd -//切换到上一个目录cd切换过来的源目录
```

### pwd命令

查看用户当前所处的工作目录printf working directroy

### which命令

显示命令所在的目录,如:which ls

### touch命令

如果文件不存在,创建新文件,如果文件存在,更新文件的最后修改时间.

使用方式:`touch + 文件名`

### mkdir命令

创建新目录,make directory

使用方式:`mkdir 目录名`

创建多级目录需要添加参数 `-p`

创建多级目录例子:`mkdir -p ~/test/hello/world/aa`

### rm命令

删除文件:`rm  文件名`

删除目录:`rm -r  目录名`

| 参数 | 功能                                |
| ---- | ----------------------------------- |
| -r   | 递归删除目录,删除目录必须添加此参数 |
| -i   | 提示用户是否删除文件或目录          |
| -f   | 强制删除                            |

**[注意]** 使用rm命令删除的文件或目录不会放入回收站中,数据不易恢复

### cp命令

拷贝命令copy

使用方式: `cp 源目录或文件 目标目录或文件`



| 参数 | 功能                                             |
| ---- | ------------------------------------------------ |
| -r   | **若有目录的拷贝(拷贝对象是目录)需要使用该参数** |
| -a   | 保留被拷贝文件的一些属性信息                     |

有下面几种情况

- `cp file1 file(不存在)`  ==>  创建file,将file1内容拷贝到file
- `cp file1 file`  ==>  file1覆盖file
- `cp file dir`  ==>  拷贝file到dir目录
- `cp -r dir dir1`  ==>  将dir目录拷贝到dir1目录中(包含dir目录本身)
- `cp -r dir dir1(不存在)`  ==>  创建dir1, 将dir中的内容拷贝到dir1目录中(不包含dir目录本身)

### mv命令

改名或移动文件

使用方式: 

- 改名
  - `mv file file2`  若file2存在则覆盖并将**file改名为file2**,file2不存在则没有覆盖
  - `mv dir dir2(不存在)`
- 移动(**第二个参数一定是存在的目录文件**)
  - `mv file dir(存在)` 文件移动到目录中
  - `mv dir dir2(存在)`   整个目录移动

### cat命令

将文件内容一次性输出到终端

使用方式:`cat 文件名`

缺点:终端显示的内容有限,如果文件太长无法全部显示

可用于文件重定向:`cat file1>file2` (一个`>`是覆盖,两个`>`是末尾追加)相当于 `cp file1 file2`

### more命令

文件内容分页显示到终端,但是智能一直向下浏览,不能回退

使用方法:`more 文件名`

相关操作

- 显示下一行:回车
- 显示下一页:空格
- 退出:q(ctrl+c)

### less命令

文件内容分页显示到终端,可以自由上下浏览

使用方式:`less 文件名`

相关操作:

- 显示下一行:回车,ctrl+p,向下方向键
- 显示上一行:ctrl+n,向上方向键
- 显示下一页:空格,PageDown
- 显示上一页:PageUp
- 退出:q

### head命令

从文件头部开始查看前n行的内容

使用方式:`head-n[行数] 文件名`  如:`head -20 hello.txt`

如果没有指定行数,默认显示前10行内容

### tail命令

从文件尾部向上查看最后n行的内容

使用方式:`tail  -n[行数]  文件名`

如果没有指定行数,默认显示最后10行内容

一个比较重要的应用:显示日志: `tail -f test.log` (`-f` 是阻塞的意思,表示堵塞实时显示文件内容)

![截屏2022-03-07 16.59.55](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203071702227.jpeg)

### 链接相关命令

#### 软链接

软链接类似于windows下的快捷方式

创建软链接方式:

- 创建文件软链接: `ln -s 文件名  快捷方式的路径`

  如: `ln -s  aa  aa.soft`

- 创建目录软链接: `ln -s  目录  快捷方式的路径`

  如: `ln -s  tmp  tmp.link`

**[注意事项]**

ln创建软链接要用**绝对路径**,因为如果不使用绝对路径,一旦这个链接文件发生位置变动,就不能找到那个文件了.
$$
软链接文件的大小为: 路径+文件名的总字节数
$$

#### 硬链接

使用方式: `ln 文件名 硬链接的路径`          如: `ln test.log test.log.hard`

**[注意事项]**

1. 硬链接**不能建在目录上**

2. **硬链接对绝对路径没有要求**

3. 硬链接不能跨文件系统

   硬链接文件的源文件的inode是相同的,文件系统的inode要求唯一,跨文件系统可能会使inode不同,所以硬链接不能跨文件系统

> **硬链接的本质**
>
> 硬链接的本质是不同的文件名所在的inode节点是相同的,相同的inode节点指向了相同的数据块,所以他们的文件内容是一样的,文件内容会同步.

查看文件的i节点(inode): `ls -i 文件名` 

![image-20220306101335367](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203061013559.png)

查看i节点信息: `stat 文件名`

![image-20220306101354149](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203061013391.png)

如下图,file.hard是file的硬链接,这两个文件指向了同一个inode,同一个inode指向了相同的数据块(文件内容)

![捕获](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203061016986.png)

- 当新创建了一个文件,硬链接计数为1
- 给文件创建一个硬链接后,硬链接计数加1
- 删除一个硬链接后,硬链接计数减1
- 如果删除硬链接后,硬链接计数为0,则该文件会删除

**硬链接的应用场合**

- 可以起到同步文件的作用

  修改file的内容,会在其余三个硬链接文件上同步

- 可以起到保护文件的作用

  删除文件的时候,只要硬链接计数不为0,不会真正被删除,起到保护文件的作用

![捕获](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203061051478.png)

只有删除这4个文件,文件才会真正被删除

[软硬链接和mac上的替身的区别详解](https://zhuanlan.zhihu.com/p/352347364)

### wc命令

显示文件行数,字节数,单词数

- `wc -l file` 显示文件的总行数
- `wc -c file` 显示文件的总字节数
- `wc -w file` 显示文件的总单词数
- `wc file` 显示文件的总行数,单词数和总字节数

![image-20220306112350129](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203061123384.png)

### whoami命令

显示当前登录的用户名

![image-20220306112431190](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203061124397.png)

### man命令

[man详解]: https://blog.csdn.net/weixin_42437253/article/details/116576750

$$
使用方式:\ \ man(选项)(参数)
$$

**选项**

- -a：在所有的man帮助手册中搜索;
- -f：等价于whatis指令，显示给定关键字的简短描述信息;
- -P：指定内容时使用分页程序;
- -M：指定man手册搜索的路径。

**参数**

- 1是普通的命令
- 2是[[系统调用]],如open,write之类的(通过这个，至少可以很方便的查到调用这个函数，需要加什么头文件)
- 3是库函数,如printf,fread
- 4是特殊文件,也就是/dev下的各种设备文件
- 5是指文件的格式,比如passwd,就会说明这个文件中各个字段的含义
- 6是给游戏留的,由各个游戏自己定义
- 7是附件还有一些变量,比如向environ这种全局变量在这里就有说明
- 8是系统管理用的命令,这些命令只能由root使用,如ifconfig

[了解库函数与系统函数的关系](#库函数与系统函数的关系)

man文档中函数后头写了POSIX.1,表示符合POSIX.1这个标准,即linux也可以用,unix也可以用

`POSIX` 表示 可移植操作系统接口（Portable Operating System Interface of UNIX，缩写为 POSIX ），POSIX标准定义了操作系统应该为应用程序提供的接口标准.

## 用户权限,用户和用户组相关命令

### chmod命令

修改文件权限 change mode

linux是通过权限对文件进行控制的,通过使用chmod命令可以修改文件相关的权限

#### 文字设定法

命令: `chmod [who] [+|-|=] [mode] 文件名`

例子:`chmod ug+wr file.txt`  给文件file.txt的所有者和所属组添加读写权限

- 操作对象[who]  
  
  **[注意]** 如果chmod未设置ugo的话,此时默认设置为a,此设置受[umask](https://blog.csdn.net/yangzhengquan19/article/details/83055686)限制影响
  
  - u -- 用户(user)
  - g -- 同组用户(group)
  - o -- 其他用户(other)
  - a -- 所有用户(all) [默认]
  
- 操作符[+|-|=]
  - `+`  添加权限
  - `-`  取消权限
  - `=`  赋予给定权限并取消其他权限
  
- 权限[mode]
  - r -- 读权限
  - w -- 写权限
  - x -- 执行权限

#### 数字设定法

数字表示的含义

- 0 -- 没有权限(-)
- 1 -- 执行权限(x)
- 2 -- 写权限(w)
- 4 -- 读权限(r)

例子:`chmod 764 file.txt`  给file.txt文件设置权限为rwx-rw-r

**[注意]** 使用数字设定法,一定要使用3位的8进制数:如:066

### chown命令

change owner

- 修改文件所有者

  用法: `chown 文件所有者 文件名`

  例: `sudo chown mytest file.txt`

- 修改文件所有者和所属组

  用法:`chown 文件所有者:文件所属组 文件名`(`:`也行, `.`也行,意思一样)

  例:`sudo chown mytest.mytest file.txt`

  

普通用户需要使用**管理员用户权限**执行该命令(若系统没有其他用户,可以使用 `sudo adduser 用户名` 创建一个新用户)

### chgrp命令

修改文件所属组 change group

使用方法: `chgrp 用户组 文件或目录名`

例: `sudo chgrp mytest file.txt`  修改文件所述组为mytest

普通用户需要使用管理员权限执行该命令

### id命令

用于查看用户的id相关信息,组id,用户id等等

如: `id root`:查看root用户的相关信息

### 其他权限命令

查看所有用户列表: `cut -d: -f1 /etc/passwd`

查看特定用户的特权级别和允许执行的命令: `sudo -l -U <用户名>`

## find命令

- `-name` 按文件名查询

  格式:`find 路径 -name "文件名"`

  例:`find /home -name "*.c"`

- `-type` 按文件类型查询

  格式:`find 路径 -type 类型`

  类型盘点:

  - `f` 普通文件类型
  - `d` 目录
  - `l` 符号链接
  - `b` 块设备文件
  - `c` 字符设备文件
  - `s` socket文件
  - `p` 管道文件

  例:`find /home -type f` 查找指定目录下的普通文件

- `-size` 按文件大小查询

  格式: `find 路径 -size 范围`

  范围:

  - `+` 大于
  - `-` 小于
  - `不需要添加符号` 等于

  大小:

  - M必须大写,表示1024*1024字节的单位
  - k必须小写,表示1024字节的单位
  - c表示字节数

  例:`find ~/ -size +50k -size -100k`  查找家目录中大于50k,小于100k的文件

- 按文件日期查询

  `-ctime -n/+n`(`-n` n天以内; `+n` n天以外) 

  - 按创建日期查询 `-ctime -n/+n `  create time
  - 按修改日期查询 `-mtime -n/+n` *modificate*d time  
  - 按访问日期查询 `-atime -n/+n `  access time

- 按深度查询

  - -maxdepth n(层数)

    搜索<=n层目录

  - -mindepth n(层数)	

    搜索>=n层的目录

- 高级查询

  - 格式1 `find 路径 -type d -exec shell命令 {} \;`

    例: `find ./ -type d -exec ls -l {} \;`

  - 格式2 `find 路径 -type d -ok shell命令 {} \;`(`-ok` 会显示找到的文件问你是否确认执行输入的shell命令)

    例: `find ./ -type d -ok ls -l {} \;`

  - 格式3 `find 路径 -type d | xargs shell命令`

  - 例: `find ./ -type d | xargs ls -l`

  注意:

  - 上面的{}中间不能有空格
  - ok最安全(因为会显示搜索结果问你是否确认执行shell命令),特别是在执行rm删除文件的时候

  `|`表示管道,从管道读到的信息通过xargs作为shell命令的参数使用

## grep命令

查找文件中按照行为单位查询是否包含内容

格式: `grep -r(有目录的话) "查找的内容" 搜索的路径`

| 参数 | 功能                                      |
| ---- | ----------------------------------------- |
| -r   | 若是搜索目录必须加这个参数,可进行递归搜索 |
| -n   | 显示该查找内容所在的行号                  |
| -i   | 忽略大小写进行查找                        |
| -v   | 不显示含有某字符串的行                    |

例子: `grep -r -i -n "HELLO world" ./`  搜索当前目录下包含HELLO world(忽略大小写)并且显示行号

### find和grep命令结合使用

先使用find命令查找文件, 然后使用grep命令查找哪些文件包含某个字符串     `find . -name "*.c" | xargs grep -n "main"`

## linux中常用的解压缩工具

### gzip和bzip2

不能压缩目录,只能一个一个文件进行压缩,压缩之后会使原文件消失

- `gzip *` 压缩当前目录下所有的文件,但是目录不能压缩
- `gunzip*` 解压当前目录下所有的.gz文件
- `bzip2 *` 压缩当前目录下所有的文件,但是目录不能压缩
- `bunzip2 *` 解压当前目录下所有的.bz2文件

### tar工具

参数:

| 参数              | 功能                                |
| ----------------- | ----------------------------------- |
| z                 | 用gzip来压缩/解压缩文件             |
| j                 | 用bzip2来压缩/解压缩文件            |
| c                 | create,创建新的压缩文件,与x互斥使用 |
| x                 | 从压缩文件中释放文件,与c互斥使用    |
| v                 | 详细报告tar处理的文件信息           |
| f                 | 指定压缩文件的名字                  |
| t                 | 查看压缩包中有哪些文件              |
| -C(大写) 解压目录 | 解压到指定目录                      |

压缩

- ``tar cvf 压缩包名字.tar 原材料(要打包压缩的文件或目录)`  (只打包,不压缩)
- `tar zcvf 压缩包名字.tar.gz 原材料(要打包压缩的文件或目录) `
- `tar jcvf 压缩包名字.tar.bz2 原材料(要打包压缩的文件或目录)`

解压缩

- `tar xvf 已有的压缩包.tar.gz`
- `tar zxvf 已有的压缩包.tar.gz`
- `tar jxvf 已有的压缩包.tar.bz2`

解压缩到指定目录: `tar zxvf test.tar.gz -C ./`

查看压缩包中有哪些文件 `tar -tvf 压缩包.tar`

### rar工具

使用前需要安装rar工具 `sudo apt-get install rar`

- 压缩

  命令: `rar a -r 要压缩的文件(含文件或者目录)`

  压缩目录需要使用参数: -r

  例: `rar a -r my aa bb dir`  将aa,bb,dir压缩到my.rar文件中(打包的生成的新文件不需要指定后缀)

- 解压缩

  命令: `rar x xxx.rar [解压到的目录]` 解压目录[到指定位置]

  例: `rar x my.rar TAR` 将my.rar解压到TAR目录下

  注意:若解压目录不存在会报错

`rar v 压缩文件名.rar` 查看压缩文件内容

### zip工具

- 压缩: `zip -r 压缩包名 要压缩的文件(含文件或目录)`

  压缩目录需要使用参数 `-r`

  使用该命令不需要指定压缩包后缀

  例: `zip -r xxx file dir`    生成xxx.zip文件

- 解压缩: `unzip 压缩包名`

  解压缩到指定目录: 添加参数 `-d 解压目录`

  注意:解压目录若不存在则会创建

## 软件的安装和卸载

在线安装

- 软件安装 `sudo apt-get install 软件名`

- 软件卸载 `sudo apt-get remove 软件名`

- 更新软件列表 `sudo apt-get update`

- 清理安装包 `sudo apt-get clean`

   清理的是缓存路径: `/var/cache/apt/archives`

软件包本地安装

- 在ubuntu下系统下必须有deb格式的安装包
- 软件安装: `sudo dpkg -i xxx.deb`
- 软件卸载: `sudo dpkg -r 软件名`
- 查看软件释放内容 `dpkg -L 软件名`

dpkg == Debian package

## 进程相关命令

ps和[kill命令](#kill函数/命令)

linux绝大多数命令都有对应的函数,例如

`man kill`查询的是命令,`man 2 kill`查看kill函数 `int kill(pid_t pid,int sig);`

### ps命令

- 使用权限：所有使用者

- 使用方式：ps [options] [--help]

- 说明：显示瞬间行程 (process) 的动态

- 常用参数：(ps的参数非常多, 在此仅列出几个常用的参数并大略介绍含义)

  - `-A` 显示所有进程（等价于-e）(utility)
  - `-w`    显示加宽可以显示较多的资讯
  - `-u`：查看进程所有者及其他一些信息
  - `-a` 显示一个终端的所有进程，除了会话引线
  - `-N` 忽略选择。
  - `-d` 显示所有进程，但省略所有的会话引线(utility)
  - `-x` 显示没有控制终端的进程，同时显示各个命令的具体路径。dx不可合用。（utility）
  - `-p pid` 进程使用cpu的时间
  - `-u uid or username` 选择有效的用户id或者是用户名
  - `-g gid or groupname` 显示组的所有进程。
  - `U username` 显示该用户下的所有进程，且显示各个命令的详细路径。如:ps U zhang;(utility)
  - `-f` 全部列出，通常和其他选项联用。如：ps -fa or ps -fx and so on.
  - `-l` 长格式（有F,wchan,C 等字段）
  - `-j`  列出与作业控制相关的信息
  - `-o` 用户自定义显示哪些信息。如:`ps -o pid,ppid`只显示pid和ppid信息
  - `v` 以虚拟存储器格式显示
  - `s` 以信号格式显示
  - `-m` 显示所有的线程
  - `-H` 显示进程的层次(和其它的命令合用，如：ps -Ha)（utility）
  - `e` 命令之后显示环境（如：ps -d e; ps -a e）(utility)
  - `h` 不显示第一行

- 常用用法

  - `ps -ef`    相对 aux 来说, 显示内容较少.主要用来结合管道查找进程 ID.

  - `ps aux | grep "xxx"`   最常用的方法是`ps -aux`,然后再利用一个管道符号导向到grep去查找特定的进程,然后再对特定的进程进行操作。

  - `ps ajx | grep "xxx"`  

- Head标头

  - `USER`    用户名
  - `UID`    用户ID（User ID）
  - `PID`    进程ID（Process ID）
  - `PPID`    父进程的进程ID（Parent Process id）
  - `SID`    会话ID（Session id）
  - `%CPU`    进程的cpu占用率
  - `%MEM`    进程的内存占用率
  - `VSZ`    进程所使用的虚存的大小（Virtual Size）
  - `RSS`    进程使用的驻留集大小或者是实际内存的大小，Kbytes字节。
  - `TTY`    与进程关联的终端（tty）
  - `STAT`    进程的状态：进程状态使用字符表示的（STAT的状态码）
  - `R` 运行    Runnable (on run queue)            正在运行或在运行队列中等待。
  - `S` 睡眠    Sleeping                休眠中, 受阻, 在等待某个条件的形成或接受到信号。
  - `I` 空闲    Idle
  - `Z` 僵死    Zombie（a defunct process)        进程已终止, 但进程描述符存在, 直到父进程调用wait4()[[系统调用]]后释放。
  - `D` 不可中断    Uninterruptible sleep (ususally IO)    收到信号不唤醒和不可运行, 进程必须等待直到有中断发生。
  - `T` 终止    Terminate                进程收到SIGSTOP, SIGSTP, SIGTIN, 
  - `SIGTOU`信号后停止运行运行。
  - `P` 等待交换页
  - `W` 无驻留页    has no resident pages        没有足够的记忆体分页可分配。
  - X 死掉的进程
  - `<` 高优先级进程                    高优先序的进程
  - `N` 低优先    级进程                    低优先序的进程
  - `L` 内存锁页    Lock                有记忆体分页分配并缩在记忆体内
  - `s` 进程的领导者（在它之下有子进程）；
  - `l` 多进程的（使用 CLONE_THREAD, 类似 NPTL pthreads）
  - `+` 位于后台的进程组 
  - `START`    进程启动时间和日期
  - `TIME`    进程使用的总cpu时间
  - `COMMAND`    正在执行的命令行命令
  - `NI`    优先级(Nice)
  - `PRI`    [进程优先级](https://zhuanlan.zhihu.com/p/665100294)编号(Priority)
  - `WCHAN`    进程正在睡眠的内核函数名称；该函数的名称是从/root/system.map文件中获得的。
  - `FLAGS`    与进程相关的数字标识

### kill命令

kill 终止（杀死）进程，有十几种控制进程的方法，下面是一些常用的方法:

- `kill -l` 查看系统有哪些信号   

  ![信号图](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206231654467.jpeg)

- `kill -STOP [pid]` 发送SIGSTOP (17,19,23)停止一个进程，而并不消灭这个进程。

- `kill -CONT [pid]` 发送SIGCONT (19,18,25)重新开始一个停止的进程。

- `kill -KILL [pid]/kill -9 [pid]` 发送SIGKILL (9)强迫进程立即停止，并且不实施清理操作。

SIGKILL 和 SIGSTOP 信号不能被捕捉、封锁或者忽略，但是，其它的信号可以。所以这是你的终极武器。

## [linux脚本](https://blog.csdn.net/weixin_43705953/article/details/119137570)

[点击跳转](https://blog.csdn.net/weixin_43705953/article/details/119137570)

## linux定时任务

linux系统,通过修改 `/etc/crontab`文件(系统任务调度)添加定时任务.

![](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202208151816868.png)

例子:

```python
30 21 * * * /usr/local/etc/rc.d/lighttpd restart       #每晚的21:30重启apache。
45 4 1,10,22 * * /usr/local/etc/rc.d/lighttpd restart  #每月1、10、22日的4 : 45重启apache。
10 1 * * 6,0 /usr/local/etc/rc.d/lighttpd restart      #每周六、周日的1 : 10重启apache
0,30 18-23 * * * /usr/local/etc/rc.d/lighttpd restart  #每天18 : 00至23 : 00之间每隔30分钟重启apache。
0 23 * * 6 /usr/local/etc/rc.d/lighttpd restart        #每星期六的11 : 00 pm重启apache。
* */1 * * * /usr/local/etc/rc.d/lighttpd restart       #每一小时重启apache
* 23-7/1 * * * /usr/local/etc/rc.d/lighttpd restart    #晚上11点到早上7点之间，每隔一小时重启apache
0 11 4 * mon-wed /usr/local/etc/rc.d/lighttpd restart  #每月的4号与每周一到周三的11点重启apache
0 4 1 jan * /usr/local/etc/rc.d/lighttpd restart       #一月一号的4点重启apache
*/30 * * * * /usr/sbin/ntpdate 210.72.145.44           #每半小时同步一下时间
```

## 系统服务

> `systemctl` 是一个用于管理系统服务（systemd units）的命令行工具。systemd是Linux系统中的一个初始化系统和服务管理器，它负责启动和管理系统上运行的各种服务和进程

`systemctl` 命令可以让您启动、停止、重启、重载和查询系统服务的状态。它还可以管理系统的引导过程，设置服务的自动启动和禁用等。

以下是一些常见的 `systemctl` 命令：

- `systemctl start <unit>`：启动指定的服务。
- `systemctl stop <unit>`：停止指定的服务。
- `systemctl restart <unit>`：重启指定的服务。
- `systemctl reload <unit>`：重新加载指定的服务配置文件。
- `systemctl status <unit>`：查看指定的服务状态。
- `systemctl enable <unit>`：设置指定的服务在系统启动时自动启动。
- `systemctl disable <unit>`：禁止指定的服务在系统启动时自动启动。

在上述命令中，`<unit>` 是指代服务的名称或者服务配置文件的路径。`systemctl` 命令还支持通配符和正则表达式，以便同时操作多个服务。

## 其他常用命令盘点

更多网络相关命令参考[[网络编程]]页面

- `alias`  起别名(不加任何东西是查看所有别名)    E.g.  `alias psj='ps -ef |grep jenkins'``

  ``unalias` 取消别名   E.g. `unalias psj`

- `free`命令 显示当前系统未使用的和已使用的内存大小，还可以显示被内核使用的内存缓冲区   [详细跳转](https://blog.csdn.net/weixin_43083491/article/details/120746362)`

- `top`命令  实时动态地查看系统的整体运行情况，是一个综合了多方信息监测系统性能和运行信息的实用工具。通过top命令可以有效的发现系统的缺陷出在哪里，如内存不够、CPU处理能力不够、IO读写过高等。通过top命令所提供的互动式界面，用热键可以管理。  参考free的详细跳转地址

- `nm`命令    文本分析工具,来源于name的简写,该命令用来列出指定文件中的符号（如常用的函数名、变量等，以及这些符号存储的区域）。它显示指定文件中的符号信息，文件可以是对象文件、可执行文件或对象文件库。如果文件中没有包含符号信息，nm报告该情况，单不把他解释为出错。nm缺省情况下报告十进制符号表示法下的数字值。

- `wget`命令   开源的下载文件工具

  例如临时代理下载http文件下载链接,可用如下命令 
  `wget -c -r -np -k -L -p -e "http_proxy=http://127.0.0.1:9090" 下载链接`

- `curl`命令    用来请求 Web 服务器的工具.发出网络请求,然后获取数据,显示在标准输出(stdout)上面

- `ifconfig -a`命令   查看网络接口信息,可查看ip地址

- [`nohup`命令](https://www.zhangshengrong.com/p/bYXxq3ZL1Z/)   将程序以忽略挂起信号的方式运行起来,如果最后面加个`&`表示**后台运行程序**   注意:关闭SSH窗口会关闭运行命令的session，导致nohup对应的进程被通知需要一起shutdown。那么，我们每次运行完nohup的程序后，手动用**`exit`**命令退出，这样就能保留运行程序了

- [`iotop`](https://help.aliyun.com/document_detail/41224.htm?spm=a2c6h.13066369.question.23.548d7db72yrcLA)命令,需要安装使用,用于查看进程对磁盘的IO负载

- **`which`** 在用户路径下定位一个程序位置

- `df` 和 `du` 命令,查看文件大小,如:`du -sh 文件夹路径`查看文件夹总大小

# vim

> vi是”visual interface”的简称, 它在Linux上的地位就仿佛Windows中的记事本一样. 它可以执行编辑、删除、查找、替换、块操作等众多文本操作, 而且用户可以根据自己的需要对其进行定制. vi是一个文本编辑程序, 没有菜单, 只有命令. 
>
> vim更高级一些, 可以理解是vi的高级版本.
>
> ​	vim需要自行安装, 在shell中输入vimtutor命令可以查看相关的帮助文档.

## vim的三种模式

Vi有三种基本工作模式: 命令模式、文本输入模式、末行模式。

![image-20220310134131345](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203101341712.png)

### 命令模式下的操作

用户按下esc键, 就可以使vi进入命令模式下; 当使用vi打开一个新文件开始也是进入命令模式下

#### 保存退出

| 快捷键 | 操作                                    |
| ------ | --------------------------------------- |
| ZZ     | 保存退出                                |

#### 代码的格式化

| 快捷键 | 操作         |
| :----- | ------------ |
| gg=G   | 代码的格式化 |

vim下写代码超实用代码格式整理命令，仅需四步

1. 先使用 `gg` 命令使光标回到第一行
2. `shift+v` 进入可视模式
3. `shift+g` 全选
4. 按下 `=` 即可

#### 光标移动

| 快捷键 | 操作                                    |
| ------ | --------------------------------------- |
| h      | 光标左移                                |
| j      | 光标下移                                |
| k      | 光标上移                                |
| l      | 光标右移                                |
| w      | 移动一个单词                            |
| gg     | 光标移动到文件开头                      |
| G      | 光标移动到文件末尾                      |
| 0      | 光标移动到行首                          |
| $      | 光标移动到行尾                          |
| nG     | 行跳转,例:12G,跳转到12行处              |

#### 删除命令

| 快捷键    | 操作                                                         |
| --------- | ------------------------------------------------------------ |
| x         | 删除光标后一个字符,相当于Del                                 |
| X         | 删除光标前一个字符,相当于Backspace                           |
| dw        | delete word删除光标开始位置的字,包含光标所在字符             |
| d0        | 删除光标前本行所有内容,包含光标所在字符                      |
| D或者是d$ | 删除光标后本行所有内容,包含光标所在字符                      |
| dd        | 删除光标所在行(本质其实是剪切)                               |
| ndd       | 从光标当前行向下删除指定的行数,如:15dd                       |
| v/ctrl+v  | 使用h,j,k,l移动选择内容,然后按d删除(其中ctrl+v是列模式,v为非列模式) |
| dG        | 全部删除  ,当前所选行之下的全部删除,可以先gg到文件头,再用此命令全部删除 |

#### 撤销和反撤销命令

| 快捷键 | 操作                                |
| :----- | ----------------------------------- |
| u      | 一步一步撤销,相当于word文档的ctrl+z |
| ctrl+r | 反撤销,相当于word文档的ctrl+y       |

#### 复制和粘贴

| 快捷键   | 操作                                                         |
| :------- | ------------------------------------------------------------ |
| yy       | 复制当前行                                                   |
| nyy      | 复制n行,如10yy                                               |
| p        | 在光标所在位置向下开辟一行,粘贴                              |
| P        | 在光标所在位置向上开辟一行,粘贴                              |
| 剪切操作 | 按dd或ndd山删除,将删除的行保存到剪贴板中,然后按p/P就可以粘贴了 |

这里的复制粘贴均仅能在 vim 中自身使用,并非复制到系统剪贴板
[想要实现关联系统剪贴板参考该博客](https://www.cnblogs.com/Biiigwang/p/12086514.html)
#### 可视模式

| 快捷键   | 操作                                                         |
| :------- | ------------------------------------------------------------ |
| v/ctrl+v | 使用h、j、k、l移动选择内容;使用d删除;使用y复制,使用p粘贴到光标的后面;使用P粘贴到光标的前面 |

- `v`是可视**行**模式
- `ctrl+v`是可视**块**模式

#### 替换操作

| 快捷键 | 操作                   |
| :----- | ---------------------- |
| r      | 替换当前字符           |
| R      | 替换当前行光标后的字符 |

#### 查找命令

| 快捷键  | 操作                                                         |
| :------ | ------------------------------------------------------------ |
| /       | /xxxx,从光标所在的位置开始搜索(默认为大小写敏感),按n向下搜索,按N向上搜索 |
| ?       | ?xxxx从光标所在的位置开始搜索,按n向下搜索,按N向上搜索        |
| #       | 将光标移动到待搜索的的字符串上,然后按n向上搜索,按N向下搜索   |
| shift+k | 在待搜索的字符串上按shift+k或者K,可以查看相关的帮助文档      |

> 上述的`xxxx`支持[[正则表达式]]

**查找当前单词:** 按下 `*` 键可以查找光标所在位置的单词(前后无空格或标点符号视为一个单词)

#### 快速翻屏

| 快捷键 | 操作                           |
| :----- | ------------------------------ |
| ctrl+u | 向下翻半屏(up)--光标向上移动   |
| ctrl+d | 向上翻半屏(down)--光标向下移动 |
| ctrl+f | 向上翻一屏(front)              |
| ctrl+b | 向后翻一屏(back)               |

#### 快速定位

`shift+%`    快速定位到一组括号其中一个对应的另一个括号

#### 切换到文本输入模式

| 快捷键       | 操作                                                         |
| :----------- | ------------------------------------------------------------ |
| i            | 在光标前插入                                                 |
| a            | 在光标后插入                                                 |
| I            | 在光标所在行的行首插入                                       |
| A            | 在光标所在行的行尾插入                                       |
| o            | 在光标所在的行的下面新创建一行,行首插入                      |
| O            | 在光标所在的行的上面新创建一行,行首插入                      |
| s            | 删除光标后边的字符,从光标当前位置插入                        |
| S            | 删除光标所在当前行,从行首插入                                |
| 按列模式插入 | 先按ctrl+v进入列模式,按hjkl移动选定某列,按I或者A插入,然后输入字符,最后按两次esc(实现多行同时输入的效果) |

#### 切换到末行模式

| 快捷键 | 操作           |
| :----- | -------------- |
| :      | 切换到末行模式 |

### 末行模式下的操作

从命令模式切换到末行模式, 输入冒号(:)

#### 保存退出

| 快捷键 | 操作                    |
| :----- | ----------------------- |
| q      | 退出                    |
| q!     | 强制退出,不保存修改内容 |
| w      | 保存修改内容,不退出     |
| wq     | 保存并退出              |
| x      | 相当于wq                |

#### 替换操作

> Vim支持使用正则表达式进行替换

替换的语法格式为   
$$
\{作用范围\}s/\{目标\}/\{替换\}/\{替换标志\}
$$

- `s`（substitute）命令用来查找和替换字符串

-  **作用范围**  作用范围分为当前行、全文、选区等等

  - 当前行：`不填`

  - 全文：`%`

  - 选区: `'<,'>`  

    在Visual模式下选择区域后输入`:`，Vim即可自动补全为 `:'<,'>`

  - N行到m行: `n,m` 

    `:5,12s/foo/bar/g`  5~12行

    `:.,+2s/foo/bar/g`  从当前行(`.`)到当前行+2(`+2`)行

- **目标** 正则表达式  [注意正则表达式中的符号要用`\`转义,不然会识别成符号本身]

  如:`:%s/(\w+) (\w+) (\w+)/\1\3/g`  是错误的,应该加上转义变成: `:%s/\(\w\+\) \(\w\+\) \(\w\+\)/\1\3/g`

- **替换** 想要替换的文本  其中&表示匹配到的字符串本身  也可以使用正则表达式的[[正则表达式#捕获组|捕获组]]

- **替换标志**   

  下面参数可以组合使用 

  - 全局替换  `g`

  - 只替换从光标开始的第一次匹配  `不填`

  - 大小写不敏感 `i`

  - 大小写敏感 `I`

  - 每次替换前光标都会移动到匹配项询问是否替换  `c`

    按下`y`表示替换，`n`表示不替换，`a`表示替换所有，`q`表示退出查找模式， `l`表示替换当前位置并退出

  - 不执行实际的替换操作，只显示匹配到的文本行数  `n`

一些例子:

下面表格中 `old` 表示原字符串, `new` 表示新字符串

| 快捷键          | 操作                                 |
| :-------------- | ------------------------------------ |
| :s/old/new/     | 光标**所在行**的第一个old替换为new   |
| :s/old/new/g    | 光标**所在行**的所有old替换为new     |
| :m,ns/old/new/g | 将第m行至第n行之间的old全部替换为new |
| :%s/old/new/g   | 当前文件的所有old替换为new           |
| :1,%s/old/new/g | 当前文件的所有old替换为new           |
| :%s/old/new/gc  | 同上,但是每次替换需要用户确认        |

#### 末行模式下执行shell命令

`!shell命令`

按下两次esc可以回到命令模式

#### 分屏操作

##### 打开文件之前分屏

| 快捷键                     | 操作                                         |
| :------------------------- | -------------------------------------------- |
| sp                         | 当前文件水平分屏                             |
| vsp                        | 当前文件垂直分屏                             |
| sp 文件名                  | 当前文件和另一个文件水平分屏                 |
| vsp 文件名                 | 当前文件和另一个文件垂直分屏                 |
| Ctrl+w两次                 | 在多个窗口切换光标                           |
| wall/wqall/xall/qall/qall! | 保存/保存退出/保存退出/退出/强制退出分屏窗口 |

##### 打开文件之后分屏

分屏: vim -on file1 file2 …  

垂直分屏: vim -On file1 file2…  

注意: n表示分几个屏,可以省略, 有几个文件就分几屏

#### 从末行模式切换回命令模式

按两次ESC, 退格(backspace)或者回车键

## vim的配置文件

- **用户级别配置文件**

  ~/.vimrc, 修改用户级别的配置文件只会影响当前用户, 不会影响其他的用户.

  例如: 在用户的家目录下的.vimrc文件中添加

  - set tabstop=4  ----设置缩进4个空格
  - set nu     ----设置行号
  - set shiftwidth=4  ---设置gg=G缩进4个空格, 默认是缩进8个空格

- **系统级别配置文件**

  etc/vim/vimrc, 修改了系统级别的配置文件将影响系统下的所有用户.

  说明: 由于linux是多用户操作系统, 建议只在用户级别的配置文件下进行修改, 不要影响其他用户.

# gcc编译器

gcc编译器将c源文件到生成一个可执行程序，中间一共经历了四个步骤：

![image-20220310145713407](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203101457076.png)

四个步骤并不是gcc独立完成的，而是在内部调用了其他工具，从而完成了整个工作流程, 其中编译最耗时, 因为要逐行检查语法.

![image-20220310145857517](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203101458023.png)

```makefile
#下面以test.c为例介绍gcc的四个步骤:
gcc -E test.c -o test.i
gcc -S test.i -o test.s
gcc -c test.s -o test.o
gcc test.o -o test
#一步生成最终的可执行程序: 
gcc test.c -o test
```

## gcc常用参数

- **-v**  查看gcc版本号, --version也可以

- **-E**  生成预处理文件

- **-S**  生成汇编文件

- **-c**  **只编译,** **生成.o文件, 通常称为目标文件**

- **-I**  指定头文件所在的路径

- **-L**  **指定库文件所在的路径**

- **-l**  **指定库的名字**

-  **-o**  指定生成的目标文件的名字

-  **-g**  **包含调试信息, 使用gdb调试需要添加-g参数**

- **-On** n=0∼3 编译优化,n越大优化得越多

- **-Wall** 提示更多警告信息

- **-D**  编译时定义宏

  例:`gcc -o test test.c -D MAX=10`

DEBUG和RELEASE版本的差异

[DEBUG和RELEASE版本的差异与调试相关问题]: https://blog.csdn.net/weixin_43587848/article/details/107333107

# 静态库和共享(动态)库

> ***什么是库***
>
>   库是二进制文件, 是源代码文件的另一种表现形式, 是加了密的源代码; 
>
> 是一些功能相近或者是相似的函数的集合体.

使用库有什么好处

- 提高代码的可重用性, 而且还可以提高程序的健壮性.
- 可以减少开发者的代码开发量, 缩短开发周期.

**库制作完成后, 如何给用户使用**

- 头文件---包含了库函数的声明
- 库文件---包含了库函数的代码实现

注意: 库不能单独使用, 只能作为其他执行程序的一部分完成某些功能, 也就是说只能被其他程序调用才能使用.

库可分

- 静态库(static library)
- 共享库(shared library)

## 静态库

静态库可以认为是一些目标代码的集合, 是在可执行程序运行前就已经加入到执行码中, 成为执行程序的一部分. 按照习惯, 一般以.a做为文件后缀名.

静态库的命名一般分为三个部分：

- 前缀：lib
- 库名称：自定义即可, 如test
- 后缀：.a

所以最终的静态库的名字应该为：libtest.a

### **静态库的制作**

下面以fun1.c , fun2.c和head.h三个文件为例讲述静态库的制作和使用, 其中head.h文件中有函数的声明,  fun1.c和fun2.c中有函数的实现.

- 将c源文件生成对应的.o文件

  ```c
  	gcc -c fun1.c fun2.c
  //或者分别生成.o文件:
  	gcc -c fun1.c -o fun1.o
  	gcc -c fun2.c -o fun2.o
  ```

- 使用打包工具ar将准备好的.o文件打包为.a文件 

  ```makefile
  #  在使用ar工具是时候需要添加参数rcs
  #  r更新、c创建、s建立索引
  #  命令：ar rcs 静态库名 .o文件
  ar rcs libtest1.a fun1.o fun2.o
  ```

  ![image-20220315110819829](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151108150.png)

### **静态库的使用**

**静态库制作完成之后, 需要将.a文件和头文件一定发布给用户.**

**[使用静态库时用到的参数]**

- `-L`：指定要连接的库的所在目录
- `-l`：指定链接时需要的静态库, 去掉前缀和后缀
- `-I`: 指定main.c文件用到的头文件head.h所在的路径

假设测试文件为main.c, 静态库文件为libtest1.a, 头文件为head.h

```shell
gcc -o main1 main.c -L./ -ltest1 -I./
```

若动态库和静态库文件名一样,编译的时候可以用`-static`要求使用静态库文件:

```shell
gcc foo.c -L /home/itcast/lib -static -lfoo -o foo
```

### [实际案例]

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151556250.jpeg" alt="截屏2022-03-15 15.51.09" style="zoom: 50%;" />

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151552248.png" style="zoom: 50%;" />

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151557180.jpeg" alt="截屏2022-03-15 15.53.27" style="zoom: 50%;" />

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151556430.jpeg" alt="截屏2022-03-15 15.55.14" style="zoom: 50%;" />

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151559245.jpeg" alt="截屏2022-03-15 15.58.57" style="zoom:50%;" />

### 静态库的优缺点

#### 优点

- 函数库最终被打包到应用程序中，实现是函数本地化，寻址方便、速度快。

  （库函数调用效率==自定义函数使用效率）

- 程序在运行时与函数库再无瓜葛，移植方便。

#### 缺点

消耗系统资源较大, 每个进程使用静态库都要复制一份, 无端浪费内存。

![image-20220315113303414](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151133735.png)

静态库会给程序的更新、部署和发布带来麻烦。如果静态库libxxx.a更新了，所有使用它的应用程序都需要重新编译、发布给用户（对于玩家来说，可能是一个很小的改动，却导致整个程序重新下载）。

## 共享库/动态库

> 共享库在程序编译时并不会被连接到目标代码中, 而是在程序运行是才被载入. 不同的应用程序如果调用相同的库, 那么在内存里只需要有一份该共享库的拷贝, 规避了空间浪费问题.动态库在程序运行时才被载入, 也解决了静态库对程序的更新、部署和发布会带来麻烦. 用户只需要更新动态库即可, 增量更新. 为什么需要动态库, 其实也是静态库的特点导致. 

照习惯, 一般以”.so”做为文件后缀名. 共享库的命名一般分为三个部分：

- 前缀：lib
- 库名称：自己定义即可, 如test
- 后缀：.so

所以最终的静态库的名字应该为：libtest.so

![image-20220315135210177](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151352511.png)

### **共享库的制作**

- 生成目标文件.o, 此时要加编译选项：-fPIC（fpic）

  ```makefile
  gcc -fpic -c fun1.c fun2.c
  #参数：-fpic创建与地址无关的编译程序(pic, position independent code), 目的就是为了能够在多个应用程序间共享.
  ```

- 生成共享库, 此时要加链接器选项: -shared（指定生成动态链接库**）**

  ```makefile
  gcc -shared fun1.o fun2.o -o libtest2.so
  ```

### **共享库的使用**

引用动态库编译成可执行文件（跟静态库方式一样）：

用到的参数：

- `-L`：指定要连接的库的所在目录
- `-l`：指定链接时需要的动态库, 去掉前缀和后缀
- `-I`: 指定main.c文件用到的头文件head.h所在的路径

```makefile
gcc main.c -I./ -L./ -ltest2 -o main2
```

然后运行：`./main2`，发现竟然报错了.

![image-20220315140737562](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151407768.png)

**分析为什么在执行的时候找不到libtest2.so库**

当系统加载可执行代码时候, 能够知道其所依赖的库的名字, 但是**还需要知道所依赖的库的绝对路径**。此时就需要系统动态载入器(dynamic linker/loader)。

**ldd**命令可以查看可执行文件依赖的库文件, 执行`ldd main2`,可以发现libtest2.so找不到.

![image-20220315141518461](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151415703.png)

对于elf格式(windows可执行程序是[[pe]]格式的)的可执行程序，是由**ld-linux.so**来完成的, 它先后搜索elf文件的 DT_RPATH段 — 环境变量LD_LIBRARY_PATH — /etc/ld.so.cache文件列表 — /lib/, /usr/lib目录找到库文件后将其载入内存。

**使用file命令可以查看文件的类型: `file main2`**

![image-20220315141032823](https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151410036.png)

### Linux如何查找动态库

**编译和链接时**，动态库的搜索路径顺序如下（注意不会递归性地在其子目录下搜索）

1. gcc编译、链接命令中的`-L`选项；
2. gcc的环境变量的 `LIBRARY_PATH`（多个路径用冒号分割）；
3. gcc默认动态库目录：`/lib:/usr/lib:usr/lib64:/usr/local/lib`

 **运行时**，动态库的搜索路径顺序如下：

1. 编译目标代码时指定的动态库搜索路径：用选项-Wl,-rpath和include指定的动态库的搜索路径，

   比如`gcc -Wl,-rpath,include -L. -ldltest hello.c`，在执行文件时会搜索路径`./include`；

2. 环境变量`LD_LIBRARY_PATH`（多个路径用冒号分割）；

3. 修改 `/etc/ld.so.conf` 来配置文件指定的动态库绝对路径,也就是生效后的 `/etc/ld.so.cache` 文件中缓存的文件位置

   （通过 `sudo ldconfig` 生效，一般是非 root 用户时使用）；

4. 默认的搜索路径 `/lib` 和 `/usr/lib`

### **让系统找到共享库**

- 拷贝自己制作的共享库到`/lib`或`/usr/lib`

  (不推荐,因为里面存放的是系统动态库,尽量不操作这两个文件夹防止出问题)

- 临时设置LD_LIBRARY_PATH:

  `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:库路径`

- 永久设置(项目开发基本都是这么做),把`export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:库路径`设置到`~/.bashrc`文件中,然后再执行下列三种办法之一:(mac下环境初始化顺序参考[此链接](#mac下环境初始化顺序))

  - 执行 `. ~/.bashrc`使配置文件生效(第一个.后面会有一个空格)

  - 执行 `source ~/.bashrc`配置文件生效

  - 退出当前终端,然后再次登录也可以使配置文件生效

    <img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203181010547.jpg" alt="截屏2022-03-18 10.07.53" style="zoom:50%;" />

    <img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203181021902.jpg" alt="截屏2022-03-18 10.09.34" style="zoom:50%;" />

    <img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203181021952.jpeg" alt="截屏2022-03-18 10.08.09" style="zoom:50%;" />

    <img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203181022007.jpeg" alt="截屏2022-03-18 10.22.35" style="zoom: 50%;" />

- 永久设置,把`export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:库路径`设置到`/etc/profile`文件中

- 将其添加到/etc/ld.so.cache文件中

  1. 编辑 `/etc/ld.so.conf`文件,加入库文件所在目录的路径
  2. 运行 `sudo ldconfig -v`,该命令会重建 `/etc/ld.so.cache` 文件

### [实际案例]

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151556250.jpeg" alt="截屏2022-03-15 15.51.09" style="zoom: 50%;" />

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151628263.jpeg" alt="截屏2022-03-15 16.25.11" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151627052.jpeg" alt="截屏2022-03-15 16.25.30" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151628443.jpeg" alt="截屏2022-03-15 16.25.46" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage/202203151629202.jpeg" alt="截屏2022-03-15 16.26.34" style="zoom:50%;" />

### mac下环境初始化顺序

```c
/etc/profile
/etc/paths
~/.bash_profile
~/.bash_login
~/.profile
~/.bashrc
```

其中`/etc/profile`和`/etc/paths`是系统级别的，系统启动就会加载，
后几个是当前用户级的环境变量。后面3个按照从前往后的顺序读取，如果`/.bash_profile`文件存在，则后面的几个文件就会被忽略不读了，如果`/.bash_profile`文件不存在，才会以此类推读取后面的文件。
`~/.bashrc`没有上述规则，它是bash shell打开的时候载入的。
也就是说在当前用户的目录下，如果有了`.bash_profile`文件就不会去加载`.bashrc`文件。

**上述修改时针对终端时bash的修改，假如终端是`zsh`的话，需要找到用户目录下的`.zlogin`文件，加入上述代码**

### 共享库的特点

- 动态库把对一些库函数的链接载入推迟到程序运行的时期。
- 可以实现进程之间的资源共享。（因此动态库也称为共享库）
- 将一些程序升级变得简单。(增量更新)
- 甚至可以真正做到链接载入完全由程序员在程序代码中控制（显示调用）

## 比较静态库和动态库的优缺点

###  静态库

优点:

1.  执行速度快, 是因为静态库已经编译到可执行文件内部了
2. 移植方便, 不依赖域其他的库文件

 缺点: 

1.  耗费内存, 是由于每一个静态库的可执行程序都会加载一次
2. 部署更新麻烦, 因为静态库修改以后所有的调用到这个静态库的可执行文件都需要重新编译

###   动态库

优点:

1.  节省内存
2. 部署升级更新方便, 只需替换动态库即可, 然后再重启服务.

 缺点: 

1.  加载速度比静态库慢
2. 移植性差, 需要把所有用到的动态库都移植.

由于由静态库生成的可执行文件是把静态库加载到了其内部, 所以静态库生成的可执行文件一般会比动态库大.

# linux系统API相关

## C库IO理解

![1](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206061447162.jpeg)exit函数会自动刷新flush

![2](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206061447137.jpeg)

c语言操作文件相关问题:
使用fopen函数打开一个文件, 返回一个FILE* fp, 这个指针指向的结构体有三个重要的成员.

- **文件描述符**: 通过文件描述可以找到文件的inode, 通过inode可以找到对应的数据块
- **文件指针**: 读和写共享一个文件指针, 读或者写都会引起文件指针的变化
- **文件缓冲区**: 读或者写会先通过文件缓冲区, 主要目的是为了减少对磁盘的读写次数, 提高读写磁盘的效率.

备注:

- 头文件stdio.h 的第48行处:  `typedef struct _IO_FILE FILE`;
- 头文件libio.h 的第241行处:  `struct \_IO_FILE`, 这个接头体定义中有一个`_fileno`成员, 这个就是文件描述符

## 库函数与系统函数的关系

![1.jpg](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206061507063.jpeg)

FD是file descriptor文件描述符,唯一指向文件块.(类似于windows的句柄)

**库函数 是 系统API的进一步封装**,他们的关系是**调用与被调用的关系**.

**[系统调用]**: 由操作系统实现并提供给外部应用程序的编程接口,
(Application Programming Interface, API), 是应用程序同系统之间数据交互的桥梁.

## 虚拟地址空间

![1](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206061718536.jpeg)

读写受保护的地址会导致Segmentation fault.

进程的虚拟地址空间分为用户区和内核区, 其中内核区是受保护的, 用户是不能够对其进行读写操作的;
内核区中很重要的一个就是进程管理, 进程管理中有一个区域就是PCB(本质是一个结构体);
PCB中有文件描述符表, 文件描述符表中存放着打开的文件描述符, 涉及到文件的IO操作都会用到这个文件描述符.

## PCB和文件描述符表

![1](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206061728121.jpeg)

备注: 
pcb：结构体:`task_stuct`, 该结构体在:
`/usr/src/linux-headers-4.4.0-97/include/linux/sched.h:624`(linux-headers-4.4.0-97和行号不同版本系统 不一样)
**一个进程有一个文件描述符表**：1024项

[PCB详解](#PCB详解)

- 前三个被占用, 分别是STDIN_FILENO, STDOUT_FILENO, STDERR_FILENO  [标准输入输出详解](https://dontla.blog.csdn.net/article/details/121200247?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-121200247-blog-116029986.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-121200247-blog-116029986.pc_relevant_aa&utm_relevant_index=1)
- **文件描述符作用**：通过文件描述符找到inode, 通过inode找到磁盘数据块.

虚拟地址空间->内核区->PCB->文件描述表->文件描述符->文件IO操作使用文件描述符

文件描述符FD和文件指针是一对一的关系,存在函数 `int fileno(FILE *stream);` 通过文件指针找到文件描述符

## 文件IO函数

统一使用头文件:`#include <fcntl.h>`

![1](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206081601488.jpeg)

每一个FILE文件流（标准C库函数）都有一个缓冲区buffer，默认大小8192Byte。Linux系统的IO函数默认是没有缓冲区.

![2](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206061447137.jpeg)

需要的头文件用 `man 2 函数名`来查询

### open/close

调用open函数可以打开或创建一个文件, 得到一个文件描述符

**open函数**

功能:打开或者新建一个文件

```c
int open(const char *pathname, int flags);
int open(const char *pathname, int flags, mode_t mode);
```

- 函数参数：
  - pathname参数是要打开或创建的文件名,和fopen一样, pathname既可以是相对路径也可以是绝对路径。 
  - flags参数,表示打开文件所采取的动作,有一系列常数值可供选择, 可以同时选择多个常数用按位或运算符连接起来, 所以这些常数的宏定义都以O_开头,表示or。
    - 必选项:以下三个常数中必须指定一个, 且仅允许指定一个。
      - `O_RDONLY` 只读打开
      - `O_WRONLY` 只写打开
      - `O_RDWR` 可读可写打开
    - 以下可选项可以同时指定0个或多个, 和必选项按位或起来作为flags参数。可选项有很多, 这里只介绍几个常用选项：
      - `O_APPEND` 表示追加。如果文件已有内容, 这次打开文件所写的数据附加到文件的末尾而不覆盖原来的内容。
      - `O_CREAT` 若此文件不存在则创建它。使用此选项时需要提供第三个参数mode, 表示该文件的访问权限。
  - mode参数,设置文件访问权限的初始值(第三个参数是在第二个参数中有`O_CREAT`时才有作用)
    - `O_EXCL` 如果同时指定了`O_CREAT`,并且文件已存在,则出错返回。
    - `O_TRUNC` 如果文件已存在, 将其长度截断为为0字节。
    - `O_NONBLOCK` 对于设备文件, 以O_NONBLOCK方式打开可以做非阻塞I/O(NonblockI/O),非阻塞I/O。
- 文件最终权限：`mode & ~umask`  (umark控制如何为新创建的文件设置文件权限掩码,文件初始默认权限为0666，目录为0777,若用户umask为0002,则新创建的文件或目录在没有指定的情况下默认权限分别为0664,0775))   [umask详解](https://blog.csdn.net/yangzhengquan19/article/details/83055686)
- **函数返回值**:
  - 成功: 返回一个最小且未被占用的文件描述符
  - 失败: 返回-1, 并设置errno值.

**close函数**

功能: 关闭文件

```c
 int close(int fd);
```

- 函数参数:  fd文件描述符
- 函数返回值:
  - 成功返回0
  - 失败返回-1, 并设置errno值.

需要说明的是,当一个进程终止时, 内核对该进程所有尚未关闭的文件描述符调用close关闭,所以即使用户程序不调用close, 在终止时内核也会自动关闭它打开的所有文件。但是对于一个长年累月运行的程序(比如网络服务器), 打开的文件描述符一定要记得关闭, 否则随着打开的文件越来越多, 会占用大量文件描述符和系统资源。

### read/write

**read函数**

从打开的设备或文件中读取数据

```c
ssize_t read(int fd, void *buf, size_t count);
```

- 函数参数:
  - fd: 文件描述符
  - buf: 读上来的数据保存在缓冲区buf中
  - count: buf缓冲区存放的最大字节数
- 函数返回值:
  - `>0`：读取到的字节数
  - `0`：文件读取完毕
  - `-1`： 出错，并设置errno

1. [read函数的默认堵塞状况详细跳转](#阻塞和非阻塞)
2. [管道read的详细堵塞状况详细跳转](#管道的读写行为)

当read读文件描述符为非阻塞状态的时候, 若对方没有发送数据, 会立刻返回, errno设置为`EAGAIN`, 这个错误我们要忽略.

**write函数**

向打开的设备或文件中写数据

```c
 ssize_t write(int fd, const void *buf, size_t count);
```

- 函数参数： 
  - fd：文件描述符
  - buf：缓冲区，要写入文件或设备的数据
  - count：buf中数据的长度
- 函数返回值:
  - 成功：返回写入的字节数
  - 错误：返回-1并设置errno

### lseek函数

功能:移动文件指针

所有打开的文件都有一个**当前文件偏移量(current file offset)**,以下简称为cfo. cfo通常是一个非负整数, 用于表明文件开始处到文件当前位置的字节数. 读写操作通常开始于 cfo, 并且使 cfo 增大, 增量为读写的字节数. 文件被打开时, cfo 会被初始化为 0, 除非使用了 O_APPEND.
使用 lseek 函数可以改变文件的 cfo.

```c
#include <sys/types.h>
#include <unistd.h>
off_t lseek(int fd, off_t offset, int whence);
```

- 函数参数：
  - fd：文件描述符
  - 参数 offset 的含义取决于参数 whence：
    - 如果 whence 是 SEEK_SET，文件偏移量将设置为 offset。
    - 如果 whence 是 SEEK_CUR，文件偏移量将被设置为 cfo 加上 offset，offset 可以为正也可以为负。
    - 如果 whence 是 SEEK_END，文件偏移量将被设置为文件长度加上 offset，offset 可以为正也可以为负。
- 函数返回值: 若lseek成功执行, 则返回新的偏移量。

常用操作

```c
//文件指针移动到头部
lseek(fd, 0, SEEK_SET);
//获取文件指针当前位置
int len = lseek(fd, 0, SEEK_CUR);
//获取文件长度
int len = lseek(fd, 0, SEEK_END);
//lseek实现文件拓展
off_t currpos;
// 从文件尾部开始向后拓展1000个字节
currpos = lseek(fd, 1000, SEEK_END); 
// 额外执行一次写操作，否则文件无法完成拓展
write(fd, “a”, 1);	// 数据随便写
```

### perror和errno

errno是一个**全局变量**(需要头文件 `#include<errno.h>`,可以使用命令 `man errno`查询 ),当系统调用后若出错会对errno进行设置,perror可以将errno对应的错误描述信息打印出来.

errno宏:在 `/usr/include/asm-generic/errno.h`包含了errno所有的宏和对应的错误描述信息

如: `perror("open");`  打印出来的结果为:  `open:(空格)错误信息`

### 阻塞和非阻塞

阻塞和非阻塞是文件本身的属性, 不是read函数的属性

- 普通文件：hello.c
  - 默认是非阻塞的
- 终端设备：如 /dev/tty
  - 默认阻塞
- 管道和套接字
  - [默认阻塞(点击跳转详解)](#管道的读写行为)

`STDIN_FILENO,STDOUT_FILENO,STDERR_FILENO`三个已经默认打开的文件描述符的宏,可以直接拿来使用,无需`open函数`

### stat/lstat函数

获取文件的属性

```c
int stat(const char *pathname, struct stat *buf);
int lstat(const char *pathname, struct stat *buf);
```

- 函数返回值： 
  - 成功返回 0
  - 失败返回 -1

参数pathname是文件路径

参数 buf是输出参数

```c
struct stat {
	    dev_t          st_dev;        //文件的设备编号
	    ino_t           st_ino;        //节点
	    mode_t         st_mode;      //文件的类型和存取的权限
	    nlink_t         st_nlink;     //连到该文件的硬连接数目，刚建立的文件值为1
	    uid_t           st_uid;       //用户ID
	    gid_t           st_gid;       //组ID
	    dev_t          st_rdev;      //(设备类型)若此文件为设备文件，则为其设备编号
	    off_t          st_size;      //文件字节数(文件大小)
	    blksize_t       st_blksize;   //块大小(文件系统的I/O 缓冲区大小)
	    blkcnt_t        st_blocks;    //块数
	    time_t         st_atime;     //最后一次访问时间
	    time_t         st_mtime;     //最后一次修改时间(较有用)
	    time_t         st_ctime;     //最后一次改变时间(指属性)
	};
```

上述结构体中有一个成员叫`st_mode` 

**`st_mode`详解**    16位整形   表示文件的类型和存取的权限(文件类型互斥,权限非互斥)

- 0~2位    其他人权限   

  - `S_IROTH`     00004       读权限        
  - `S_IWOTH`    00002       写权限        
  - `S_IXOTH`      00001       执行权限   
  - `S_IRWXO`     00007        掩码,过滤去掉st_mode中除其他人权限以外的信息

- 3~5位     所属组权限

  - `S_IRGRP`	   00040       读权限
  - `S_IWGRP`      00020       写权限
  - `S_IXGRP`       00010       执行权限   
  - `S_IRWXG`      00070        掩码, 过滤去掉 st_mode中除所属组权限以外的信息

- 6-8 位    文件所有者权限

  - `S_IRUSR`    00400    读权限

  - `S_IWUSR`   00200    写权限

  - `S_IXUSR`    00100     执行权限

  - `S_IRWXU`   00700    掩码, 过滤去掉 st_mode中除文件所有者权限以外的信息

    ```c
    If (st_mode & S_IRUSR)   -----为真表明所有者可读
    If (st_mode & S_IWUSR)  ------为真表明所有者可写
    If (st_mode & S_IXUSR)   ------为真表明所有者可执行
    ```

- 12-15 位   文件类型   下面属性互斥

  - `S_IFSOCK`         0140000 套接字

  - `S_IFLNK`          0120000 符号链接（软链接）

  - `S_IFREG`          0100000 普通文件

  - `S_IFBLK`           0060000 块设备

  - `S_IFDIR`           0040000 目录

  - `S_IFCHR`           0020000 字符设备

  - `S_IFIFO`           0010000 管道

  - `S_IFMT`              0170000 掩码,过滤去掉 st_mode中除文件类型以外的信息

    ```c
    If ((st_mode & S_IFMT)==S_IFREG) ----为真普通文件
    if(S_ISREG(st_mode))   ------为真表示普通文件
    if(S_ISDIR(st.st_mode))  ------为真表示目录文件
    ```

#### 文件类型获取案例

```c
if((sb.st_mode & S_IFMT) == S_IFREG)
{
	//是普通文件
}
else if((sb.st_mode & S_IFMT) == S_IFDIR)
{
  //目录文件
}

//使用宏的用法
if(S_ISREG(sb.st_mode))
{
  //是普通文件
}
else if(S_ISDIR(sb.st_mode))
{
  //目录文件
}
```

**stat函数和lstat函数的区别**

- stat函数获取链接文件属性,获取到的是链接文件**指向的文件的属性**
- lstat函数获取链接文件属性,获取到的是链接文件**本身的属性**

判断文件是否存在代码:

```c
struct stat st;
if(stat(fileName,&st)<0)
{
   printf("文件不存在\n");
}
```

### 目录操作

主要函数如下:

- 打开目录 [ `opendir`](#opendir函数)
- 读目录   [`readdir`](#readdir函数)
- 关闭目录  [`closedir`](#closedir函数)
- 目录子项过滤与排序  [`scandir`](#函数)

```c
DIR *pDir = opendir("dir");  //打开目录
dirent p=NULL;//用于接受readdir的返回值,dirent结构体
while((p = readdir(pDir))!=NULL){}  //循环读取文件
closedir(pDir);  //关闭目录
```

#### opendir函数

打开一个目录 

```c
DIR *opendir(const char *name);
```

- 函数返回值: 指向目录的指针
- 函数参数: 要遍历的目录(相对路径或者绝对路径)

#### readdir函数

读取目录内容--目录项

```c
struct dirent *readdir(DIR *dirp);
```

- 函数返回值: 读取的目录项指针
- 函数参数: opendir函数的返回值

##### dirent结构体

记录目录项信息

![无标题](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206121613690.jpeg)


```c
//linux
struct dirent
{
  ino_t d_ino;             // 此目录进入点的inode
  off_t d_off;              // 目录文件开头至此目录进入点的位移
  signed short int d_reclen;   // d_name 的长度, 不包含NULL 字符
  unsigned char d_type;     // d_name 所指的文件类型 
  char d_name[256];	    // 文件名
};

//mac
//dirent结构
struct dirent __DARWIN_STRUCT_DIRENTRY;
//64位系统下:
#define __DARWIN_STRUCT_DIRENTRY { \
	__uint64_t  d_ino;      /* file number of entry */ \
	__uint64_t  d_seekoff;  /* seek offset (optional, used by servers) */ \
	__uint16_t  d_reclen;   /* length of this record */ \
	__uint16_t  d_namlen;   /* length of string in d_name */ \
	__uint8_t   d_type;     /* 文件类型file type, see below */ \
	char      d_name[__DARWIN_MAXPATHLEN]; /* 文件名entry name (up to MAXPATHLEN bytes) */ \
}
```

d_type的取值: 

- `DT_BLK` - 块设备
- `DT_CHR` - 字符设备
- `DT_DIR` - 目录
- `DT_LNK` - 软连接
- `DT_FIFO` - 管道
- `DT_REG` - 普通文件
- `DT_SOCK` - 套接字
- `DT_UNKNOWN` - 未知

#### closedir函数

关闭目录

```c
 int closedir(DIR *dirp);
```

- 函数返回值: 成功返回0, 失败返回-1
- 函数参数: opendir函数的返回值

#### scandir函数

目录子项过滤与排序

```c
int scandir(
  const char *dirname,
  struct dirent ***namelist,
  int (*select)(const struct dirent *),
  int (*compar)(const struct dirent **,const struct dirent **));
```

- `dirname` 目录路径
- `namelist` 输出目录的子项信息,dirent结构体三级指针
- `select` 过滤某些文件的回调函数,NULL表示不过滤
- `compar` 排序回调函数   自带的回调函数有`alphasort`(依字母顺序排序目录结构)和`versionsort`,可以直接使用.NULL表示不排序

返回值:失败返回`-1` ;成功返回过滤后的目录子项数

**[注意]** 由于scandir内部是malloc申请的空间,因此记得要释放

**例子**

```c
//dirPath为目录路径
struct dirent **namelist;
int n = scandir(dirPath,&namelist,NULL,alphasort);
if(n<0)
	perror("scandir");
else
{
  while(n--)
  {
    printf("%s\n",namelist[n]->d_name);
    free(namelist[n]);//由于scandir内部是malloc申请的空间,因此记得要释放
	}
  free(namelist);
}
```

#### **案例实现代码**

此处代码不是递归遍历,如果是递归遍历,需要特别注意: **递归遍历指定目录下的所有文件的时候, 要过滤掉.和..文件, 否则会进入死循环**

```c
int main(int argc,char** argv)
{
    DIR *pDir = opendir(argv[1]);
    if(pDir==NULL)
    {
        perror("opendir  error");
        return -1;
    }
    dirent* pDirent = NULL;
    while((pDirent = readdir(pDir))!=NULL)
    {
        cout<<"=================="<<endl;
        cout<< pDirent->d_name <<endl;
         //打印类型
    switch(pDirent->d_type)
        {
         case DT_REG:
                cout<<"普通文件"<<endl;
         break;
         case DT_DIR:
             cout<<"目录文件"<<endl;
         break;
         case DT_LNK:
             cout<<"链接文件"<<endl;
             break;
        }
    }
   return 0;
}
```

![截屏2022-06-12 15.49.25](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206121550194.jpeg)

### dup/dup2/fcntl

![无标题](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206181305314.jpeg)

当调用dup函数之后,newfd和fd都指向了同一个文件,内核会在内部维护一个计数,此时计数为2,当close一个文件描述符之后,这个计数变为1,**只有当计数为0时,文件才会被真正关闭**

#### dup函数

复制文件描述符

```c
int dup(int oldfd);
```

- 函数参数: oldfd -要复制的文件描述符
- 函数返回值:
  - 成功: 返回最小且没被占用的文件描述符
  - 失败: 返回-1, 设置errno值

#### dup2函数

复制文件描述符(可用于标准输入输出重定向)

```c
int dup2(int oldfd, int newfd);
//newfd重定向到oldfd
```

- 函数参数: 
  - oldfd- 一个已经打开的文件描述符
  - newfd- 一个将会与oldfd指向同一个文件的新文件描述符
- 函数返回值:
  - 成功: 将oldfd复制给newfd, 两个文件描述符指向同一个文件
  - 失败: 返回-1, 设置errno值
- 假设newfd已经指向了一个文件，**首先close原来打开的文件**(无需自己手动close)，然后newfd指向oldfd指向的文件.
- 若newfd没有被占用，**newfd指向oldfd指向的文件**.(newfd重定向到oldfd)

**dup2实现标准输出重定向到文件案例**

```c
int main(int argc,char** argv)
{
    int fd = open(argv[1],O_RDWR | O_CREAT , 777);
    if(fd<0)
    {
        perror("open error");
        return -1;
    }       
    dup2(fd,STDOUT_FILENO);
    cout<<"hello world!"<<endl;
    close(fd);
  	close(STDOUT_FILENO);
    return 0;
}
```

标准输入 : `dup2(xxxfd,STDIN_FILENO);`标准输入重定向后,依然需要写标准输入函数来供用户输入,输入的内容重定向到xxxfd

#### fcntl函数

改变已经打开的文件的属性

```c
int fcntl(int fd, int cmd, ... /* arg */ );
```

- 若cmd为`F_DUPFD`, 复制文件描述符, 与dup相同

- 若cmd为`F_GETFL`, 获取文件描述符的flag属性值

- 若cmd为 `F_SETFL`, 设置文件描述符的flag属性

- 函数返回值:返回值取决于cmd

  - 成功
    - 若cmd为`F_DUPFD`, 返回一个新的文件描述符
    - 若cmd为`F_GETFL`, 返回文件描述符的flags值
    - 若cmd为 `F_SETFL`, 返回0
  - 失败返回-1, 并设置errno值.

- fcntl函数常用的操作:

  - 1 复制一个新的文件描述符:

    ```c
    int newfd = fcntl(fd, F_DUPFD, 0);
    ```

  - 2 获取文件的属性标志

    ```c
    int flag = fcntl(fd, F_GETFL, 0)
    ```

  - 3 设置文件状态标志(flags就是调用[open函数](#open/close)提供的参数flags)

    ```c
    flag = flag | O_APPEND;
    fcntl(fd, F_SETFL, flag);
    ```

  - 4 常用的属性标志

    ```c
    O_APPEND-----设置文件打开为末尾添加
    O_NONBLOCK-----设置打开的文件描述符为非阻塞
    ```

### 其他文件IO函数

`int unlink(const char *pathname);`  用于删除文件

`int rmdir(const char *pathname);` 用于删除目录

## 进程控制

学习目标

- 了解进程相关概念
- 掌握**fork**/getpid/getppid函数的使用
- 数量掌握ps/kill命令的使用
- 熟练掌握[execl/execlp](#exec函数族)函数的使用
- 了解孤儿进程和僵尸进程
- [**wait**函数和**waitpid**函数](#进程回收函数)

程序和进程

- 程序:编译好的二进制文件,占用磁盘空间,是一个静态概念
- 进程:一个启动的程序,占用的是系统资源,如:物理内存,CPU,终端等

### 并发和并行

- **并发**:在一个时间段内,是在同一个cpu上,运行多个进程

  ![无标题](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206211417434.jpeg)

- **并行**:多个程序在同一时刻发生(需要有多颗cpu)

  ![无标题](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206211418742.jpeg)

### PCB详解

每个进程在内核中都有一个进程控制块（PCB）来维护进程相关的信息，Linux内核的进程控制块是**`task_struct`**结构体。

pcb记录了如下信息:

- **进程id**。系统中每个进程有唯一的id，在C语言中用pid_t类型表示，其实就是一个非负整数。

- **进程的状态**，有就绪、运行、挂起、停止等状态。

- 进程切换时需要保存和恢复的一些CPU寄存器。

- 描述虚拟地址空间的信息。

- 描述控制终端的信息。

- **当前工作目录**（Current Working Directory）。

  - `getcwd(获取当前工作目录函数) -- chdir(修改当前工作目录函数) --pwd(linux命令)`

- **[umask掩码](https://blog.csdn.net/yangzhengquan19/article/details/83055686)**。

- **文件描述符表**，包含很多指向file结构体的指针。

- 和信号相关的信息。

- 用户id和组id。

- 会话（Session）和进程组。

- 进程可以使用的资源上限（Resource Limit）。

  - `ulimit -a`

    ![截屏2022-06-21 14.31.56](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206211433823.jpeg)

### 进程状态

进程基本的状态有5种

- 初始态(进程准备阶段,常与就绪态结合来看)
- 就绪态
- 运行态
- 挂起态
- 终止态

![无标题](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206211525270.jpeg)

SIGSTOP是个信号

### 创建进程

fork函数

头文件: `#include <unistd.h>`

复制创建子进程([用户区内存](#虚拟地址空间)完全一样)

```c
pid_t fork(void);
```

返回值：

- 调用成功: **父进程返回子进程的PID，子进程返回0**；
- 调用失败: 返回-1，设置errno值。

fork代码案例(箭头标识执行时机)

![无标题](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206211528595.jpeg)

子进程从fork函数后一句开始执行.(因为,fork出来的子进程与父进程用户区是复制出来的,因此fork出来的子进程开始的变量与调用fork函数后的父进程此时变量完全一样)

![无标题](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206211529165.jpeg)

- linux提供了函数供子进程获取其父进程,但**父进程要获取子进程pid只能在创建的时候获取**.
- 父子进程谁先抢到cpu时间片,谁先执行.
- 子进程的pid和父进程不一样，是新分配的。子进程的ppid会设置为父进程的pid，也就是说子进程和父进程各自的“父进程”是不一样的。
- **[描述符表](#PCB和文件描述符表)是按进程的**，因此系统中的每个进程都可以在每个描述符表槽中打开一个不同的文件 但实际上它有点复杂。如果两个进程独立地打开一个文件，那么它们每个进程都有完全独立的文件访问权限，并且有自己的读写指针，只有当它们都写入同一个文件时才会进行交互。 但是**当进程fork的时候，父和子的描述符指向同一个文件表条目**，因此它们在文件中共享一个指针位置。这使Unix进程可以共享对输入流的访问，而无需了解这种情况。

**[注意]**父进程先于子进程被终止的话,子**进程会被1号pid进程接管**(子进程的新父进程pid为1),**1号pid的进程的父进程pid为0**

[进程相关命令跳转](#进程相关命令)

**fork注意点**:**如果在循环中fork一定要注意避免未预期的递归fork情况.**

### 进程相关函数

#### exit()函数

退出整个进程,包括所有进程下线程.但不影响子进程与父进程.

#### getpid和getppid

`pid_t getpid(void);`  获取自身进程id

`pid_t getppid(void);`  获取父进程id

#### exec函数族

头文件: `#include <unistd.h>`

需要在一个进程里面**执行其他的命令或者是用户自定义的应用程序**，此时就用到了exec函数族当中的函数。

##### execl函数

execl函数一般**执行自己写的程序**。

```c
int execl(const char *path, const char *arg, ... /* (char  *) NULL */);
```

- 参数介绍：
  - **path**: 要执行的程序的绝对/相对路径
  - 变参arg: 要执行的程序的需要的参数
  - arg:占位，通常写命令的名字(除非有意让别人看不到)
  - arg后面的: 命令的参数
  - NULL结尾(最后一个参数)
- 返回值：
  - 若是成功，则不返回，不会再执行exec函数后面的代码；若是失败，会执行execl后面的代码，可以用perror打印错误原因。

##### execlp函数

execlp函数一般是**执行系统自带的程序或者是命令**.

```c
 int execlp(const char *file, const char *arg, .../* (char  *) NULL */);
```

- 参数介绍：
  - **file**: 执行命令的名字, 根据PATH环境变量来搜索该命令
  - arg:占位，通常写应用程序的名字(除非有意让别人看不到)
  - arg后面的: 命令的参数
  - NULL结尾(最后一个参数)
- 返回值：
  - 若是成功，则不返回，不会再执行exec函数后面的代码；**若是失败，会执行exec后面的代码**，可以用perror打印错误原因。

```c
//第二个参数的ls是用来占位的,实际上写什么都可以
execl("/bin/ls","ls","-l",NULL);
//上面等同于下面
execlp("ls","ls","-l",NULL);
```

##### exec函数族原理

![无标题](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206231907967.jpeg)

**[注意]**当execl和execlp函数执行成功后，**不返回**，并且**不会执行execl后面的代码逻辑，原因是调用execl函数成功以后，exec函数指定的代码段已经将原有的代码段替换了**。

因此一般先fork一个子进程,在子进程中调用exec函数族.

#### popen函数

> 利用system函数调用shell命令，只能获取到shell命令的返回值，而不能获取shell命令的输出结果，那如果想获取输出结果怎么办呢？除了用exec函数族,也可以用popen函数实现。

**格式: `FILE popen(const char* command,const char* type);`**

popen()会调用fork()产生子进程，然后从子进程中调用`/bin/sh -c` 来执行参数command 的指令,然后将子进程的标准输出连接到一个管道中

- **参数type** 可使用 "r"代表读取，"w"代表写入。依照此type 值，popen()会建立管道连到子进程的标准输出设备或标准输入设备，然后返回一个文件指针。

**返回值**

- 成功则返回文件指针(随后进程便可利用此文件指针来读取子进程的输出设备或是写入到子进程的标准输入设备中) 
  - 所有使用文件指针(FILE*)操作的函数也都可以使用，除了fclose()以外(关闭该文件指针需要用`pclose`函数)。
- 失败返回NULL, 错误原因存于errno 中.

> popen只能阻塞执行,如果需要非阻塞执行还是需要流程如下:
>
> 使用fork函数创建子进程使用execl函数执行`/bin/sh -c`配合想执行的命令执行命令,并通过管道与在执行waitpid函数等待子进程结束的父进程进行通信传递命令执行结果,案例如下:

```cpp
int main(int argc, const char **argv)
{
    // 创建管道
    int pipefd[2];
    if (pipe(pipefd) == -1)
    {
        std::cerr << "Failed to create pipe." << std::endl;
        return 1;
    }
    std::string askStr = "";
    cout << "请输出要提问的内容:";
    cin >> askStr;
    std::string command = "echo " + askStr + " | bito";
    string result = "";
    // 创建子进程
    pid_t pid = fork();

    if (pid == -1)
    {
        std::cerr << "Failed to fork process." << std::endl;
        return 1;
    }
    else if (pid == 0)
    {
        // 子进程执行命令
        // 将标准输出重定向到管道写端
        close(pipefd[0]);
        dup2(pipefd[1], STDOUT_FILENO);
        close(pipefd[1]);
        execl("/bin/sh", "sh", "-c", command.c_str(), NULL);
        _exit(1);
    }
    else
    {
        // 父进程继续执行其他任务
        // ...
        // 关闭管道写端
        close(pipefd[1]);
        while (1)
        {
            std::cout << "子进程还未结束" << std::endl;
            sleep(1);
            // 等待子进程结束
            int status;
            if (waitpid(pid, &status, WNOHANG) > 0) // 子进程正常退出或子进程异常退出
            {
                std::cout << "子进程已退出" << std::endl;
                // 读取子进程的输出结果
                char buffer[128];
                result = "";
                ssize_t bytesRead;
                while ((bytesRead = read(pipefd[0], buffer, sizeof(buffer))) > 0)
                {
                    result += std::string(buffer, bytesRead);
                }
                cout << "bito回答: " << result << endl;
                break;
            }
        }
    }
    return 0;
}
```

返回结果为:

```cpp
请输出要提问的内容:你好,你会什么
子进程还未结束
子进程还未结束
子进程还未结束
子进程还未结束
子进程还未结束
子进程还未结束
子进程还未结束
子进程还未结束
子进程还未结束
子进程还未结束
子进程已退出
bito回答: 你好！作为一个AI助手，我可以帮助您回答各种问题，提供信息，进行翻译，进行日常对话等。请告诉我您需要什么帮助，我会尽力为您提供支持！
```

#### 进程回收函数

##### wait函数

作用:

- **阻塞**并等待任意子进程退出 
- 回收子进程残留资源 
- 获取子进程结束状态(退出原因)。

```c
pid_t wait(int *status);
```

- 返回值：
  - 成功：清理掉的子进程ID(表示任意子进程已退出)；
  - 失败：-1 (没有子进程)
- **status参数**：**传出参数 **-- 子进程的退出状态(**不关心可以写NULL**) 
  - `WIFEXITED(status)`：为非0        → 进程正常结束
  - `WEXITSTATUS(status)`：获取进程退出状态 
  - `WIFSIGNALED(status)`：为非0 → 进程异常终止
  - `WTERMSIG(status)`：取得进程终止的信号编号。

##### waitpid函数

作用同[wait函数](#wait函数)

```c
pid_t waitpid(pid_t pid, int *status, in options);
```

参数：

- **pid**：

  - pid = -1 等待任一子进程。与wait等效。

  - pid > 0 等待其进程ID与pid相等的子进程。

  - pid = 0 等待进程组ID与目前进程相同的任何子进程，也就是说任何和调用

    waitpid()函数的进程在同一个进程组的进程。

  - pid < -1 等待其组ID等于pid的绝对值的任一子进程。(适用于子进程在其他组的情况)

- **status**: 子进程的退出状态，用法同[wait函数](#wait函数)。

- **options**：设置为WNOHANG，函数非阻塞，设置为0，函数阻塞。

函数返回值

- `>0`：返回回收掉的子进程ID(表示等待子进程已退出)；
- `-1`：无子进程(实际上官方文档中是错误返回-1,但无子进程的错误也是返回-1,没别的情况)
- `=0`：参3为WNOHANG，且子进程正在运行。

**案例**

```c
int main(int argc,char** argv)
{
    int pid = fork();
    if (pid>0)//父进程
    {
        int status;
        pid_t wpid = waitpid(-1,&status,0);//堵塞
        if(WIFEXITED(status))
            cout<<"孩子正常退出   status="<<WEXITSTATUS(status)<<endl;
        else if(wpid==0)
            cout<<"子进程还在运行"<<endl;
        else if(wpid==-1)
            cout<<"子进程已全部正常退出"<<endl;
        else if(WIFSIGNALED(status))
            cout<<"孩子被信号杀死  信号编号为:"<<WTERMSIG(status)<<endl;
        cout<<"father over!"<<endl;
    }
    else{//子进程
        sleep(2);
        cout<<"son over!"<<endl;
    }
    return 0;
}
```

**[注意]wali或waitpid调用一次只能清理一个子进程**

### 进程回收

当一个进程退出之后，进程能够回收自己的用户区的资源，但是不能回收内核空间的PCB资源，**必须由它的父进程调用wait或者waitpid函数完成对子进程的回收**，避免造成系统资源的浪费。

#### 孤儿进程

**[孤儿进程的概念]**：若**子进程的父进程已经死掉，而子进程还存活着**，这个进程就成了孤儿进程。

为了保证每个进程都有一个父进程，孤儿进程会被init进程(pid为1)领养，init进程成为了孤儿进程的养父进程，当孤儿进程退出之后，由init进程完成对孤儿进程的回收。

#### 僵尸进程

**[僵尸进程的概念]**:   若**子进程死了，父进程还活着**， 但是父进程没有调用wait或waitpid函数完成对子进程的回收，则该子进程就成了僵尸进程。

> 僵尸进程是一种早已死亡的进程,僵尸进程的用户空间内存已经释放掉了,然而内核空间内存还有残留.僵尸进程已经放弃了几乎所有的内存空间,没有任何可执行代码,也不能被调度,仅仅在进程列表中保留一个位置,记载该进程的退出状态信息供其他进程收集.除此之外,僵尸进程不再占有任何存储变量.他需要他的父进程来为他收尸.子进程执行完毕后发送一个Exit信号然后死掉,这个Exit信号需要被父进程读取,父进程随后调用wait命令来读取子进程的退出状态,并将子进程从进程表中剔除.如果他的父进程没有安装SIGCHLD信号处理函数调用wait或waitpid()等待子进程结束或者父进程未能读取到子进程的Exit信号,则这个子进程虽然完成执行处于死亡状态,但也不会从进程表中剔除,那么他就一直保持僵尸状态.

如何解决僵尸进程

- 由于僵尸进程是一个已经死亡的进程，所以不能使用kill命令将其杀死
- **通过杀死其父进程的方法可以消除僵尸进程。**
  **杀死其父进程后，这个僵尸进程会被init进程领养，由init进程完成对僵尸进程的回收。**

`ps -ef`中CMD属性后有`<defunct>`,表示该进程是僵尸进程

![截屏2022-06-24 13.34.06](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206241336368.jpeg)

如何找到defunct僵尸进程: `ps -ef |grep defunct_process_pid`

[进程回收相关函数跳转](#进程回收函数)

完善的进程回收案例应该参考[此处](#使用SIGCHLD信号完成对子进程的回收案例)

### **进程间通信**

IPC(Inter-Process Communication)

目标:

- 熟练使用pipe进行父子进程间通信
- 熟练使用pipe进行兄弟进程间通信
- 熟练使用fifo进行无血缘关系的进程间通信
- 使用mmap进行有血缘关系的进程间通信
- 使用mmap进行无血缘关系的进程间通信

> Linux环境下，进程地址空间相互独立，每个进程各自有不同的用户地址空间。任何一个进程的全局变量在另一个进程中都看不到，所以进程和进程之间不能相互访问，要交换数据必须通过内核，在内核中开辟一块缓冲区，进程1把数据从用户空间拷到内核缓冲区，进程2再从内核缓冲区把数据读走，内核提供的这种机制称为**进程间通信**（**IPC**，InterProcess Communication）。
>
> ![image-20220703154459626](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207031544810.png)

在进程间完成数据传递需要借助操作系统提供特殊的方法，如：文件、管道、信号、共享内存、消息队列、套接字、命名管道等。随着计算机的蓬勃发展，一些方法由于自身设计缺陷被淘汰或者弃用。现今常用的进程间通信方式有：

- 管道 (使用最简单)
- 信号 (开销最小)
- 共享映射区 (无血缘关系)
- 本地套接字 (最稳定)

#### 管道pipe

管道pipe是一种最基本的IPC机制,也称为**匿名管道**,应用于有血缘关系的进程之间,完成数据传递.调用pipe函数即可创建一个管道.

![image-20220704102905251](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207041029498.png)

**有如下特质：**

- 管道的本质是一块**内核缓冲区** 
- 由两个文件描述符引用，一个表示读端，一个表示写端。(`read`,`write`操作)
- 规定数据从管道的写端流入管道，从读端流出。
- 当两个进程都终结的时候，管道也自动消失。(可以无需`close`)
- 管道的读端和写端**默认都是阻塞的**。

**管道的原理**

- 管道的实质是内核缓冲区，内部使用**环形队列实现**。
- 默认缓冲区大小为4K，可以使用`ulimit -a`命令获取大小(pipe)。
- 实际操作过程中缓冲区会根据数据压力做适当调整。

**管道的局限性**

- 数据一旦被读走,便不在管道中存在,**不可反复读取**.
- 数据只能在一个方向上流动,若要实现**双向流动，必须使用两个管道**
- **只能在有血缘关系的进程间使用管道**。(因为另一个进程无法获得管道的文件描述符)

**查看管道缓冲区的大小**

- 命令

  ```c
  ulimit -a
  ```

- 函数

  ```c
  long fpathconf(int fd,int name);
  //E.g.
  printf("pipe size==%ld\n",fpathconf(fd[0],_PC_PIPE_BUF));
  printf("pipe size==%ld\n",fpathconf(fd[1],_PC_PIPE_BUF));
  ```

##### 创建管道pipe函数

创建一个管道

```c
int pipe(int fd[2]);
```

- 函数参数:
  - 若函数调用成功，fd[0]存放管道的读端，fd[1]存放管道的写端
- 返回值:
  - 成功返回0；
  - 失败返回-1，并设置errno值。

**fd[0]是读端， fd[1]是写端**，向管道读写数据是通过使用这**两个文件描述符**进行的，读写管道的实质是操作内核缓冲区。

管道创建成功以后，创建该管道的进程（父进程）同时掌握着管道的读端和写端。如何实现父子进程间通信呢？

**管道通信步骤**

1. 父进程创建管道

   ![image-20220704114315454](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207041143653.png)

2. 父进程fork出子进程

   ![image-20220704125814879](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207041258197.png)

3. 父进程关闭fd[0]，子进程关闭fd[1]

   ![image-20220704125938674](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207041259218.png)

4. 进行通信(父进程可以向管道中写入数据，子进程将管道中的数据读出)

##### 案例

兄弟进程间通信, 实现ps aux | grep bash
使用execlp函数和dup2函数
父进程要调用waitpid函数完成对子进程的回收

```c
int main(int argc,char** argv)
{
    std::cout<<"开始"<<std::endl;
    int fd[2];
    if(pipe(fd)==-1)
        std::cout<<"创建管道失败!"<<std::endl;
    int pid =-1;
    pid = fork();
    //创建临时文件
    if(pid==0)//子进程
    {
        close(fd[0]);//关闭管道读端
        dup2(fd[1],STDOUT_FILENO);
        execlp("ps","ps","aux",NULL);
        perror("error1!");
      	close(fd[1]);
    }
    else if(pid>0){//主进程
        int pid2 = -1;
        pid2 = fork();
        if(pid2==0)//子进程1
        {
            close(fd[1]);//关闭管道写端
            dup2(fd[0],STDIN_FILENO);
            execlp("grep","grep","bash","--color=auto",NULL);
            perror("error2!");
          	close(fd[0]);
        }
        else if(pid2>0)//主进程
        {
            close(fd[0]);//不关闭的话,read会堵塞
            close(fd[1]);
            wait(NULL);//此处是堵塞的等待,也可以设置非堵塞的等待,手动写while循环,以此实现更细致的控制
            wait(NULL);
        }
    }
    return 0;
}
```

##### 管道的读写行为

默认为堵塞状态下的情况

###### 读操作

- 有数据

  read正常读,返回读出的字节数

- 无数据

  - 写端全部关闭

    read解除阻塞,返回0,相当于读文件读到了尾部

  - 没有全部关闭

    read阻塞

###### 写操作

- 读端全部关闭

  管道破裂,进程终止,内核给当前进程发`SIGPIPE`信号

- 读端没全部关闭

  - 缓冲区写满了

    write阻塞

  - 缓冲区没有满

    继续write

###### 设置管道为非堵塞

```c
int flags = fcntl(fd[0],F_GETFL,0);
flags |= O_NONBLOCK;
fcntl(fd[0],F_SETFL,flags);//设置为非堵塞
```

**读端设置为非堵塞:**

- 写端未关闭
  - 管道中无数据可读,read返回`-1`
  - 管道中有数据可读,read返回实际读到的字节数
- 写端已关闭
  - 管道中无数据可读,read返回`0`
  - 管道中有数据可读,read返回实际读到的字节数

#### 命名管道FIFO

FIFO常被称为**命名管道**，以区分管道(pipe)。管道(pipe)只能用于“有血缘关系”的进程间通信。但通过FIFO，**不相关的进程也能交换数据**。
FIFO是Linux基础文件类型中的一种（文件类型为p(`ls -l`第一个类型)，可通过`ls -l`查看文件类型）。但FIFO文件在磁盘上没有数据块，文件大小为0，仅仅用来标识内核中一条通道。进程可以打开这个文件进行read/write，实际上是在读写内核缓冲区，这样就实现了进程间通信。

##### 创建FIFO管道

- 命令方式

  命令格式： `mkfifo 管道名`              例如：`mkfifo myfifo`

- 函数方式

  ```c
  int mkfifo(const char *pathname, mode_t mode);
  //参数:pathname为fifo管道文件的路径,mode可参考stat/open等函数的mode参数,用于表示权限
  //返回值:成功返回0,失败返回-1并设置errno
  //更详细的参数说明和返回值查看man 2 mkfifo
  ```

[点击跳转参考open函数mode参数](#open/close)

当创建了一个FIFO，就可以使用open函数打开它，常见的文件I/O函数都可用于FIFO。如：close、read、write、unlink等。

FIFO严格遵循**先进先出（first in first out）**，对FIFO的读总是从开始处返回数据，对它们的写则把数据添加到末尾。它们**不支持诸如lseek()等文件定位操作**(因为实质上该fifo文件是没有内容的)。

**两个进程间FIFO通信思路**

![image-20220704185821340](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207041858586.png)

进程A：

- access函数确定fifo文件是否存在,若不存在创建一个fifo文件：myfifo
- 调用open函数打开myfifo文件
- 调用write函数写入一个字符串如：“hello world”（其实是将数据写入到了内核缓冲区）
- 调用close函数关闭myfifo文件

进程B：

- access函数确定fifo文件是否存在,若不存在创建一个fifo文件：myfifo
- 调用open函数打开myfifo文件
- 调用read函数读取文件内容（其实就是从内核中读取数据）
- 打印显示读取的内容
- 调用close函数关闭myfifo文件

#### 内存映射区

​	存储映射I/O (Memory-mapped I/O) 使一个磁盘文件与存储空间中的一个缓冲区相映射。从内存缓冲区中取数据，就相当于读文件中的相应字节；将数据写入内存缓冲区，则会将数据写入文件。这样，就可在不使用read和write函数的情况下，使用地址（指针）完成I/O操作。
使用存储映射这种方法，首先应通知内核，将一个指定文件映射到存储区域中。这个映射工作可以通过**mmap**函数来实现。

![image-20220705121725756](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207051217507.png)

##### mmap函数

建立存储映射区

```c
void *mmap(void *addr, size_t length, int prot, int flags, int fd, off_t offset);
```

- 函数返回值：
  - 成功：返回创建的映射区首地址；
  - 失败：`MAP_FAILED`宏(实际上就是`(void*)-1`)
- 参数：	
  - `addr`: 	指定映射的起始地址, **通常设为NULL**, 由系统指定
  - `length`：映射到内存的文件长度,要**>0**
  - `prot`：	映射区的保护方式, 最常用的:
    - 读：`PROT_READ`
    - 写：`PROT_WRITE`
    - 读写：`PROT_READ | PROT_WRITE`
  - `flags`：	映射区的特性, 可以是
    - **`MAP_SHARED`**: 写入映射区的数据**会写回文件**, 且允许其他映射该文件的进程共享。
    - `MAP_PRIVATE`: 对映射区的写入操作会产生一个映射区的复制(copy-on-write), 对此区域所做的修改**不会写回原文件**。
    - `MAP_ANONYMOUS`:[匿名映射相关跳转](#匿名映射)
  - `fd`：由open返回的文件描述符, 代表要映射的文件。
  - `offset`：以文件开始处的偏移量, 必须是**4k的整数倍**, 通常为0, 表示从文件头开始映射。

**注意点:**

- 创建映射区的过程中，隐含着一次对映射文件的读操作，将文件内容读取到映射区

- 当MAP_SHARED时，要求：映射区的权限应 <=文件打开的权限(出于对映射区的保护)。而MAP_PRIVATE则无所谓，因为mmap中的权限是对内存的限制。

- 映射区的释放与文件关闭无关，只要映射建立成功，文件可以立即关闭。

- **[特别注意]当映射的目标文件大小为0时，不能创建映射区**。所以，用于映射的文件必须要有实际大小；否则会出现总线错误(bus error)(至少要写入一点东西,文件大小不能为0,不然导致错误)。

  <img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207051510703.jpeg" alt="截屏2022-07-05 15.09.57" style="zoom: 33%;" />

  因此不可以仅仅open的时候用`O_CREAT`方式打开一个新文件来创建映射区,不然总线错误

- munmap传入的地址一定是mmap的返回地址。坚决杜绝指针++操作。

- 文件偏移量必须为0或者4K的整数倍(否则函数失败)

- mmap创建映射区**出错概率非常高**，**一定要检查返回值**，确保映射区建立成功再进行后续操作。

##### munmap函数

释放由mmap函数建立的存储映射区

```c
int munmap(void *addr, size_t length);
```

- 返回值：
  - 成功：返回0
  - 失败：返回-1，设置errno值
- 函数参数:
  - addr：调用mmap函数成功返回的映射区首地址
  - length：映射区大小（mmap函数的第二个参数）

##### 父子进程间通信

![image-20220705174939006](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207051749198.png)

- 调用mmap函数创建存储映射区，返回映射区首地址ptr
- 调用fork函数创建子进程，子进程也拥有了映射区首地址
- 父子进程可以通过映射区首地址指针ptr完成通信
- 调用munmap函数释放存储映射区

```c
int main(int argc,char** argv)
{
    int fd = open("./1.log",O_RDWR);
    if(fd<=0)
    {
        perror("wrong!");
    }
    void* mAddr = mmap(NULL,4096,PROT_READ|PROT_WRITE,MAP_SHARED,fd,0);
    close(fd);
     if(mAddr==MAP_FAILED)
    {
        perror("wrong!");
    }
    
    pid_t pid = fork();
    if (pid>0)
    {
        //父进程写
        memcpy(mAddr,"zeroko14",strlen("zeroko14")+1);
    }
    else{//子进程读
        sleep(1);
        cout<<(char*)mAddr<<endl;
    }
    munmap(mAddr,4096);
}
```

上面案例存在疑问:程序执行后,`cat 1.log`命令显示出来不完整,为 `z%     `

##### 无血缘关系进程间通信

两个进程都打开相同的文件，然后调用mmap函数建立存储映射区，这样两个进程共享同一个存储映射区。

##### 匿名映射

匿名映射不需要任何文件的支持

由于没有文件,所以匿名映射只适用于有血缘关系的进程间通信

**`MAP_ANONYMOUS`使用要求:**

他的容量初始化为0,文件描述符和偏移参数均忽略,然而一些可移植性应用程序实现要求**保证fd为-1**.**MAP_ANONYMOUS必须结合MAP_SHARED使用**(存疑)

```c
//使用案例
mmap(NULL, 4096, PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0);
```

#### 信号

- 了解信号中的基本概念
- 熟练使用[信号相关的函数](#信号相关函数)
- 参考文档使用[信号集操作相关函数](#信号集相关函数)
- 熟练使用信号捕捉函数 [`signal`](#signal函数)
- 熟练使用信号捕捉函数[ `sigaction`](#sigaction函数)
- 熟练掌握使用信号完成子进程的回收

**[概念]**  信号是信息的载体，Linux/UNIX 环境下，古老、经典的通信方式， 现下依然是主要的通信手段。

**信号的特点**

- 简单
- 不能携带大量信息
- 满足某个特点条件才会产生

##### 信号的机制

进程A给进程B发送信号，进程B收到信号之前执行自己的代码，收到信号后，不管执行到程序的什么位置，都要暂停运行，去处理信号，处理完毕后再继续执行。**与硬件中断类似——异步模式。但信号是软件层面上实现的中断，早期常被称为“软中断”。**

每个进程收到的所有信号，都是由内核负责发送的。

![image-20220713161342554](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207131704167.png)

###### 信号的状态

**信号有三种状态：**

- **产生**
- **未决**
- **递达**

**信号的产生**

- 按键产生，如：`Ctrl+c`(终止/中断,终止程序,信号:SIGINT)、`Ctrl+z`(暂停/停止,类似挂起程序,信号:SIGTSTP)、`Ctrl+\`(退出,退出程序并转储错误信息([查看方式](https://blog.csdn.net/lucien_zhou/article/details/72614749)),信号:SIGQUIT)
- 系统调用产生，如：`kill`、`raise`、`abort`
- 软件条件产生，如：定时器alarm
- 硬件异常产生，如：非法访问内存(段错误)、除0(浮点数例外)、内存对齐出错(总线错误)
- 命令产生，如：kill命令

**未决**：产生和递达之间的状态。主要由于阻塞(屏蔽)导致该状态。 

**递达**：递送并且到达进程。

###### 信号的处理方式

- 执行默认动作 
- 忽略信号(丢弃不处理)
- 捕捉信号(调用用户的自定义的处理函数)

###### 信号的特质

信号的实现手段导致信号有很强的**延时性**，但对于用户来说，时间非常短，不易察觉。
Linux内核的进程控制块PCB是一个结构体，task_struct, 除了包含进程id，状态，工作目录，用户id，组id，文件描述符表，还包含了信号相关的信息，主要指**阻塞信号集和未决信号集**。

**阻塞信号集和未决信号集**

 Linux内核的进程控制块PCB是一个结构体，这个结构体里面包含了信号相关的信息，主要有阻塞信号集和未决信号集。

- 阻塞信号集中保存的都是被当前进程阻塞的信号。若当前进程收到的是阻塞信号集中的某些信号，这些信号需要暂时被阻塞，不予处理。
- 信号产生后由于某些原因(主要是阻塞)不能抵达，这类信号的集合称之为未决信号集。**在屏蔽解除前，信号一直处于未决状态；若是信号从阻塞信号集中解除阻塞，则该信号会被处理，并从未决信号集中去除。**

**`man 7 signal`**可以查看更详细的信息,**包含所有信号的盘点**.

1. 信号的编号
   - 使用`kill -l`命令可以查看当前系统有哪些信号，不存在编号为0的信号。其中**1-31号信号称之为常规信号**（也叫普通信号或标准信号），34-64称之为实时信号，驱动编程与硬件相关。
2. 信号的名称
3. 产生信号的事件
4. 信号的默认处理动作
   - `Term`：终止进程
   - `Ign`：忽略信号 (默认即时对该种信号忽略操作)
   - `Core`：终止进程，生成Core文件。(查验死亡原因，用于gdb调试)
   - `Stop`：停止（暂停）进程
   - `Cont`：继续运行进程

**特别需要注意的是**：The signals `SIGKILL` and `SIGSTOP` cannot be caught, blocked, or ignored.

几个常用到的信号:
`SIGINT、SIGQUIT、SIGKILL、SIGSEGV、SIGUSR1、SIGUSR2、SIGPIPE、SIGALRM、SIGTERM、SIGCHLD、SIGSTOP、SIGCONT`

##### 常见信号一览

| 信号宏名 | 信号编号 | 说明                                                      | 系统默认处理方式   |
| -------- | -------- | --------------------------------------------------------- | ------------------ |
| SIGABRT  | 6        | 终止进程，调用abort函数时产生                             | 终止，产生core文件 |
| SIGALRM  | 14       | 超时，调用alarm函数时产生                                 | 终止               |
| SIGBUS   | 7        | 硬件故障                                                  | 终止，产生core文件 |
| SIGCHLD  | 17       | 子进程状态改变                                            | 忽略               |
| SIGINT   | 2        | 终止进程(Ctrl+C)                                          | 终止               |
| SIGIO    | 29       | 异步通知信号                                              | 终止               |
| SIGKILL  | 9        | 无条件终止一个进程，不可以被捕获或忽略(与SIGTERM区分开来) | 终止               |
| SIGPIPE  | 13       | 写没有读权限的管道文件时                                  | 终止               |
| SIGPOLL  | 8        | 轮训事件，涉及POLL机制                                    | 终止               |
| SIGTERM  | 15       | kill PID时默认发送的信号                                  | 终止               |
| SIGQUIT  | 3        | 终止进程( Ctrl+\ )                                        | 终止，产生core文件 |
| SIGSEGV  | 11       | 无效存储访问(指针错误)                                    | 终止               |
| SIGUSER1 | 10       | 用户自定义信号1                                           | 终止               |
| SIGUSER2 | 10       | 用户自定义信号2                                           | 终止               |

##### 信号相关函数

- [`signal`函数](#signal函数)
- [`kill`函数/命令函数](#kill函数/命令)
- [`abort`函数](#abort函数)
- [`raise`函数](#raise函数)
- [`alarm`函数](#alarm函数)
- [`setitimer`函数](#setitimer函数)

用信号进行IPC涉及到的函数:msgctl,msgrcv,msgsnd等等

###### 自定义的信号处理函数

信号处理函数格式: **`void 自定义信号处理函数名称(int signo)`**

- 信号处理函数中逻辑尽可能简单
- 不要在信号处理函数中打印日志,容易出问题甚至死锁

###### signal函数

注册信号捕捉函数

```c
typedef void (*sighandler_t)(int);
sighandler_t signal(int signum, sighandler_t handler);
```

函数参数

- `signum`：信号编号(用宏)

- `handler`：[信号处理函数](#自定义的信号处理函数)

  也可赋值为`SIG_IGN`表忽略 或 `SIG_DFL`表执行默认动作

###### kill函数/命令

**给指定进程发送指定信号  **     (注意:并不是简单的杀死功能)

**kill命令：**`kill -SIGKILL 进程PID`

**kill函数原型:**

```c
int kill(pid_t pid, int sig);	
```

**函数返回值：**

- 成功：0；
- 失败：-1，设置errno

**函数参数：**

- `sig`信号参数：不推荐直接使用数字，应使用宏名，因为不同操作系统信号编号可能不同，但名称一致。
- `pid`参数：
  - `pid > 0`: **发送信号给指定的进程。(最常用)**
  - `pid = 0`: 发送信号给与调用kill函数进程属于同一进程组的所有进程。
  - `pid < -1`:  取|pid|发给对应进程组。
  - `pid = -1`：发送给进程有权限发送的系统中所有进程。

> 进程组：每个进程都属于一个进程组，进程组是一个或多个进程集合，他们相互关联，共同完成一个实体任务，每个进程组都有一个进程组长，**默认进程组ID与进程组长ID相同**。

###### abort函数

给自己发送异常终止信号 `6) SIGABRT`，并产生core文件

```
void abort(void); 
```

函数说明: `abort() == kill(getpid(), SIGABRT);`

###### raise函数

给当前进程发送指定信号(自己给自己发)	

```c
int raise(int sig);
```

- 函数返回值：成功:0，失败:非0值
- 函数说明：`raise(signo) == kill(getpid(), signo);`

###### alarm函数

设置定时器(闹钟)。在指定seconds后，内核会给当前进程发送`14）SIGALRM`信号。进程收到该信号，**默认动作终止**。**每个进程都有且只有唯一的一个定时器**。(弄两个的话,后一个有效,前一个被覆盖)

```c
unsigned int alarm(unsigned int seconds); 
```

函数返回值：返回0或剩余的秒数，无失败。例如：

![image-20220714150216760](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207141503278.png)

常用操作:**取消定时器** `alarm(0)`,返回旧闹钟余下秒数.

alarm使用的是自然定时法,与进程状态无关,就绪,运行,挂起(阻塞,暂停),终止,僵尸...无论进程处于何种状态,alarm都计时.

**time命令**

```c
time ./main     //执行./main可执行程序并且最后打印时间结果
```

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207151104023.jpeg" style="zoom:33%;" />
$$
实际执行时间(total/real) = 系统时间(system) + 用户时间(user) + 损耗时间
$$

> 使用time命令查看程序执行的时间。程序运行的瓶颈在于IO，优化程序，首选优化IO。
>
> **损耗的时间**主要来自文件IO操作，IO操作会有用户区到内核区的切换，切换的次数越多越耗时。

调用`printf`函数打印数字遇到`\n`才会打印,打印过程涉及到从用户区到内核区的切换,切换次数越多消耗的时间越长,效率越低;

而使用文件重定向,由于文件操作是带缓冲的,所以涉及到用户区到内核区的切换次数大大减少,从而使损耗时间降低

###### setitimer函数

设置定时器(闹钟),可代替alarm函数,精度微秒us,**默认动作终止**,可以实现**周期定时**。

```c
int setitimer(int which, const struct itimerval *new_value, struct itimerval *old_value);
```

**函数返回值**

- 成功：0；
- 失败：-1，设置errno值

**函数参数**

- `which`：指定定时方式

  - **自然定时**：`ITIMER_REAL` → 14）SIGALRM计算自然时间**(最常用)**
  - **虚拟空间计时(用户空间)**：`ITIMER_VIRTUAL` → 26）SIGVTALRM  只计算进程占用cpu的时间
  - **运行时计时(用户+内核)**：`ITIMER_PROF` → 27）SIGPROF计算占用cpu及执行[[系统调用]]的时间

- `new_value`：`struct itimerval`结构, 负责设定timeout时间。

  ```c
  struct itimerval { 
      struct timerval it_interval; // 闹钟触发周期(设定第一次执行function所延迟的时间)
      struct timerval it_value; // 闹钟触发时间(设定以后每几秒执行function)
   }; 
   struct timeval { 
      long tv_sec; 			// 秒
      long tv_usec; 			// 微秒
  }     
  ```

- `old_value`： 存放旧的timeout值，一般指定为NULL

**案例**

```c
//从第三秒开始,每隔1秒打印一个"触发!"
void alarmFunc(int signo)
{
    std::cout<<"触发!"<<std::endl;
}

int main(int argc,char** argv)
{
    signal(SIGALRM,alarmFunc);
    struct itimerval tm;
    //周期性时间赋值
    tm.it_interval.tv_sec = 1;
    tm.it_interval.tv_usec =0;
    //第一次触发的时间赋值
    tm.it_value.tv_sec= 3;
    tm.it_value.tv_usec = 0;
    setitimer(ITIMER_REAL,&tm,NULL);
    while (1)//防止主线程退出,导致整个程序退出
    {
        sleep(1);
    }
   return 0;
}
```

##### 信号集相关

###### 未决信号集和阻塞信号集的关系

阻塞信号集是当前进程要阻塞的信号的集合，未决信号集是当前进程中还处于未决状态的信号的集合，这两个集合存储在内核的PCB中。

![image-20220715130337216](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207151303644.png)

> 下面以SIGINT为例说明信号未决信号集和阻塞信号集的关系：
>
> 当进程收到一个SIGINT信号（信号编号为2），首先这个信号会保存在未决信号集合中，此时对应的2号编号的这个位置上置为1，表示处于未决状态；在这个信号需要被处理之前首先要在阻塞信号集中的编号为2的位置上去检查该值是否为1：
>
> - 如果为1，表示SIGNIT信号被当前进程阻塞了，这个信号暂时不被处理，所以未决信号集上该位置上的值保持为1，表示该信号处于未决状态；
> - 如果为0，表示SIGINT信号没有被当前进程阻塞，这个信号需要被处理，内核会对SIGINT信号进行处理（执行默认动作，忽略或者执行用户自定义的信号处理函数），并将未决信号集中编号为2的位置上将1变为0，表示该信号已经处理了，这个时间非常短暂，用户感知不到。
>
> 当SIGINT信号从阻塞信号集中解除阻塞之后，该信号就会被处理。

###### 信号集相关函数

由于信号集属于内核的一块区域，用户不能直接操作内核空间，为此，内核提供了一些信号集相关的接口函数，使用这些函数用户就可以完成对信号集的相关操作。

信号集是一个能表示多个信号的数据类型，`sigset_t set`，set即一个信号集。既然是一个集合，就需要对集进行添加、删除等操作。

```c
//sigset_t类型的定义在signal.h文件中的第49行处:
# define _SIGSET_NWORDS (1024 / (8 * sizeof (unsigned long int)))

typedef struct
{
  unsigned long int __val[_SIGSET_NWORDS];
} __sigset_t;

//上述变量类型的定义的查找有个小窍门： 可以执行gcc的预处理命令：
//gcc -E test.c -o test.i 这样头文件就会展开，可以直接到test.i文件中看到相关变量类型的定义。
```

**信号集相关函数**

- `int sigemptyset(sigset_t *set);`
  - 函数说明：将某个信号集**全部清0**		 	
  - 函数返回值：成功：0；失败：-1，设置errno
- `int sigfillset(sigset_t *set);`
  - 函数说明：将某个信号集**全部置1**		  		
  - 函数返回值：成功：0；失败：-1，设置errno
  - `int sigaddset(sigset_t *set, int signum);`	
  - 函数说明：将某个信号**加入**信号集合中,即**单个置1**
  - 函数返回值：成功：0；失败：-1，设置errno
- `int sigdelset(sigset_t *set, int signum);`		
  - 函数说明：将某信号从信号**清出**信号集,即**单个清零**
  - 函数返回值：成功：0；失败：-1，设置errno
- `int sigismember(const sigset_t *set, int signum);`
  - 函数说明：判断某个信号**是否在**信号集中
  - 函数返回值：在：1；不在：0；出错：-1，设置errno
- `int sigpending(sigset_t *set);`   
  - 函数说明：**读取当前进程的未决信号集**
  - 函数参数：set传出参数
  - 函数返回值：成功：0；失败：-1，设置errno

**sigprocmask函数**

用来屏蔽信号、解除屏蔽也使用该函数。其本质，读取或修改进程控制块中的信号屏蔽字（阻塞信号集）。

**特别注意，屏蔽信号只是将信号处理延后执行(延至解除屏蔽)；而忽略表示将信号丢弃处理。**

```c
int sigprocmask(int how, const sigset_t *set, sigset_t *oldset);
```

- 函数返回值：成功：0；失败：-1，设置errno
- 函数参数：
- `how`参数取值：假设当前的信号屏蔽字为mask
  - `SIG_BLOCK`: 当how设置为此值，set表示需要屏蔽的信号。相当于 mask = mask|set
  - `SIG_UNBLOCK`: 当how设置为此，set表示需要解除屏蔽的信号。相当于 mask = mask & ~set
  - `SIG_SETMASK`: 当how设置为此，set表示用于替代原始屏蔽及的新屏蔽集。相当于mask = set若，调用sigprocmask解除了对当前若干个信号的阻塞，则在sigprocmask返回前，至少将其中一个信号递达。
- `set`：传入参数，是一个自定义信号集合。由参数how来指示如何修改当前信号屏蔽字。
- `oldset`：传出参数，保存旧的信号屏蔽字。

**案例**

```c
//设置阻塞信号集并把所有常规信号的未决状态打印至屏幕。
int main(int argc,char** argv)
{
  sigset_t set;
  sigemptyset(&set);
  sigpending(&set);
  sigaddset(&set,SIGHUP);//将SIGHUP和SIGSYS信号手动设置为1,方便看出效果
  sigaddset(&set,SIGSYS);
  for(int i=1;i<32;i++)
  {
        if(sigismember(&set,i)==1)
                cout<<i<<"信号为1"<<endl;
        else if(sigismember(&set,i)==0)
                cout<<i<<"信号为0"<<endl;
        else
                cout<<i<<"信号出错"<<endl;
  }
  return 0;
}
```

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207151512599.jpeg" style="zoom:25%;" /><img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202206231654467.jpeg" alt="信号图" style="zoom: 25%;" />

##### 信号捕捉函数

[signal函数跳转](#signal函数)

###### sigaction函数

相较于`signal`,`sigaction`跨平台支持更好

注册一个信号处理函数

```c
int sigaction(int signum, const struct sigaction *act, struct sigaction *oldact);
```

**函数返回值**：成功：0；失败：-1，设置errno

**函数参数**

- signum：捕捉的信号
- act：    传入参数，新的处理方式。
- oldact： 传出参数，旧的处理方式

```c
//sigaction结构体详解
struct sigaction {
       void  (*sa_handler)(int);	// 信号处理函数
       void  (*sa_sigaction)(int, siginfo_t *, void *); //信号处理函数(一般不用)
       sigset_t  sa_mask; //信号处理函数执行期间需要阻塞的信号集,如果不需要阻塞任何一个,用sigemptyset函数初始化该结构就可以了
       int      sa_flags; //通常为0，表示使用默认标识
       void     (*sa_restorer)(void);//已废弃
};
```

参数详解

- `sa_handler`：指定信号捕捉后的处理函数名(即注册函数)。也可赋值为`SIG_IGN`表忽略 或 `SIG_DFL`表执行默认动作
- `sa_mask`: 用来指定在信号处理函数执行期间需要被屏蔽的信号，特别是**当某个信号被处理时，它自身会被自动放入进程的信号掩码，因此在信号处理函数执行期间这个信号不会再度发生**。注意：仅在处理函数被调用期间屏蔽生效，是临时性设置。
- `sa_flags`：通常设置为0，使用默认属性。
- `sa_restorer`：已不再使用	

**[知识点] 信号处理不支持排队:**

- 在XXX信号处理函数执行期间, XXX信号是被阻塞的, 如果该信号产生了多次, 在XXX信号处理函数结束之后,  该XXX信号只被处理一次.
- 在XXX信号处理函数执行期间,如果阻塞了YYY信号, 若YYY信号产生了多次, 当XXX信号处理函数结束后, YYY信号只会被处理一次.

**内核实现信号捕捉的过程**

如果信号的处理动作是用户自定义函数，在信号递达时就调用这个函数，这称为捕捉信号。由于信号处理函数的代码是在用户空间的，处理过程比较复杂，举例如下：

1. 用户程序注册了SIGQUIT信号的处理函数sighandler。
2. 当前正在执行main函数，这时发生中断或异常切换到内核态。
3. 在中断处理完毕后要返回用户态的main函数之前检查到有信号SIGQUIT递达。
4. 内核决定返回用户态后不是恢复main函数的上下文继续执行，而是执行sighandler函数，sighandler和main函数使用不同的堆栈空间，它们之间不存在调用和被调用的关系，是两个独立的控制流程。
5. sighandler函数返回后自动执行特殊的系统调用sigreturn再次进入内核态。
6. 如果没有新的信号要递达，这次再返回用户态就是恢复main函数的上下文继续执行了。

![image-20220716100353613](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207161004027.png)

执行信号处理函数后,`errno`会被设置为`EINTR`.但如果执行信号处理函数后,发起信号的线程处于**另一个sleep**中(如果仅一个sleep延续至今则依旧导致`EINTR`,并且会打断当前堵塞),则会导致 `ETIMEDOUT`错误

##### 信号直接结束当前阻塞

信号的优先级更高.因此:

**[重点]**  **阻塞函数遇到信号都会被中断,信号处理完后继续执行后续命令**.

```c
int main(int argc,char** argv)
{
    signal(SIGALRM,sigFunc);
    alarm(2);
    sleep(60);//此处60秒的等待时间并没有真正阻塞60秒,而是仅仅堵塞了两秒就被信号打断直接结束阻塞了
    std::cout<<"执行完毕"<<std::endl;
		return 0;
}
```

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207181155330.jpeg" alt="截屏2022-07-18 11.52.44" style="zoom:33%;" />

##### 父进程回收子进程SIGCHLD信号

主要作用: **父进程利用该信号完成对子进程的回收**

###### 产生SIGCHLD信号的条件

- 子进程结束的时候
- 子进程收到SIGSTOP信号
- 当子进程停止时，收到SIGCONT信号

###### SIGCHLD信号的作用

子进程退出后，内核会给它的父进程发送SIGCHLD信号，父进程收到这个信号后可以对子进程进行回收(回收函数`wait/waitpid`只有真正子进程结束之后才能回收,所以`SIGSTOP`和`SIGCONT`信号导致的产生`SIGCHLD`可以忽视)。
	使用SIGCHLD信号完成对子进程的回收可以避免父进程阻塞等待而不能执行其他操作，只有当父进程收到SIGCHLD信号之后才去调用信号捕捉函数完成对子进程的回收，未收到SIGCHLD信号之前可以处理其他操作。

###### 使用SIGCHLD信号完成对子进程的回收案例

父进程创建三个子进程，然后让父进程捕获SIGCHLD信号完成对子进程的回收。

**[注意点]**

- 可能还未完成信号处理函数的注册三个子进程都退出了。
  - 解决办法：可以在fork之前先将SIGCHLD信号阻塞，当完成信号处理函数的注册后再解除阻塞。
- 当SIGCHLD信号函数处理期间, SIGCHLD信号若再次产生是被阻塞的,而且若产生了多次, 则该信号只会被处理一次, 这样可能会产生僵尸进程。(根本原因是信号不支持排队)
  - 解决办法: 可以在信号处理函数里面使用while(1)循环回收, 这样就有可能出现捕获一次SIGCHLD信号但是回收了多个子进程的情况，从而可以避免产生僵尸进程。

```c
void sigFunc(int signo)
{
    //对子进程进行回收
    std::cout<<getpid()<<"对子进程进行回收,所处信号为:"<<signo<<std::endl;
    int iRet=0;
    do
    {
       iRet = waitpid(-1,NULL,WNOHANG);
       if(iRet>0)
        std::cout<<"回收子进程"<<iRet<<std::endl;
    } while ((iRet!=0)&&(iRet!=-1));//只要不是子进程正在运行和无子进程状态即继续循环,防止因为执行期间信号屏蔽产生僵尸进程
    if (iRet==-1)//全部子进程回收完毕,释放自身
    {
        std::cout<<"全部子进程回收完毕,结束"<<getpid()<<"自身"<<std::endl;
        exit(0);
    }
}

int main(int argc,char** argv)
{
    //先注册信号回收函数(也可以在fork前先屏蔽SIGCHLD信号)
  	//当前的情况下,该信号处理函数的注册,同样会被子进程继承
    struct sigaction sg;
    sigemptyset(&sg.sa_mask);
    sg.__sigaction_u.__sa_handler=sigFunc;
    sg.sa_flags = 0;
    int iRet= sigaction(SIGCHLD,&sg,NULL);
    if(!iRet)
        std::cout<<getpid()<<"主进程回收子进程回调注册成功"<<std::endl;
    //创建子进程
    int newPId = 1;//保证父进程第一次fork执行
    for (size_t i = 0; i < 3; i++)//父进程循环fork三次
    {
        if(newPId>0)//只有父进程会fork
        {
            std::cout<<"第"<<i+1<<"次:正在fork"<<std::endl;
            newPId = fork();
        }
    }
    if(newPId==0)
            std::cout<<"我是子进程"<<getpid()<<std::endl;
    else if(newPId>0)
    {
        std::cout<<"父进程阻塞状态..."<<std::endl;
        while(1)
        {
            sleep(1);
        }
            
    }
return 0;
}
```

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207161343792.jpeg" style="zoom: 25%;" />

**信号实现进程间通信案例**

两个进程之间可以用信号来通信,但**绝对不推荐用**.

实现通信通过`SIGUSR1`和`SIGUSR2`自定义信号处理函数,因为系统不会主动发该信号

```c
//两个进程间着输出,等着对方的信号才输出
int flag=0;
void sigFunc(int signo)
{
    flag = 1;
    std::cout<<"父进程消息回调"<<std::endl;
    sleep(1);//强行拖慢速度,方便观察
}
void sigFunc2(int signo)
{
    flag =1;
    std::cout<<"子进程消息回调"<<std::endl;
    sleep(1);//强行拖慢速度,方便观察
}

int main(int argc,char** argv)
{
    int newPid = fork();
    if(newPid>0)
    {
        std::cout<<"我是父进程"<<std::endl;
        //父进程
        signal(SIGUSR1,sigFunc);
        flag =0;
        while(1)
        {
            if(flag)
            {
                kill(newPid,SIGUSR2);
                flag=0;
            }
        }
    }
    else if(newPid==0)//子进程
    {
        std::cout<<"我是子进程"<<std::endl;
        signal(SIGUSR2,sigFunc2);
        flag =1;
         while(1)
        {
            if(flag)
            {
                kill(getppid(),SIGUSR1);
                flag=0;
            }
        }
    }
return 0;
}
```

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207161856627.jpeg" style="zoom:25%;" />

#### 共享内存

共享内存的实质是将内核的一块内存映射到进程中的内存,操作本地内存就相当于操作共享内存

> 共享内存允许两个或更多进程访问同一块内存，当一个进程改变了这块地址中的内容的时候，其它进程都会察觉到这个更改。

使用步骤

1. 获取创建共享内存需要用到的key值 -- [ftok函数](#ftok函数)
1. 创建共享内存 -- [shmget函数](#shmget函数)
2. 关联共享内存 -- [shmat函数](#shmat函数)
3. 使用共享内存
4. 断开与共享内存的关联 -- [shmdt函数](#shmdt函数)
5. 控制共享内存,包括删除共享内存 -- [shmctl函数](#shmctl函数)

##### 共享内存相关函数

共享内存头文件: 

```cpp
#include <sys/ipc.h>
#include <sys/shm.h>
```

###### shmget函数

创建或打开一块共享内存区

```cpp
int shmget(key_t key, size_t size, int shmflg);
```

- 参数`key`: 一个无符号4字节整形值,表示创建出的共享内存的键值,唯一标识了一块共享内存(一般由[ftok函数](#ftok函数)生成)

  一般指定的数据格式是16进制形式的

- 参数`size`: 创建的共享内存的大小, 分配的时候实际大小是是4k的倍数,如果是确定打开已存在的共享内存则此处可直接填0

- 参数`shmflag`: 共享内存的属性, 与创建文件相同

  [`open(name, flag, mode);`](#open/close) - 与flag相同

  `shmflag`的取值,如果是确定打开已存在的共享内存则此处可直接填0

  - `IPC_CREAT`: 创建共享内存

    创建文件并指定权限: `IPC_CREAT|0664`

  - `IPC_EXCL`: 必须和`IPC_CREAT`一起使用, 检测共享内存是否存在,若存在则报错.并且errno设置为`EEXIST`  类似[open函数](#open/close)结合O_CREAT和O_EXCL一起使用

返回值: 

- 成功: 返回创建的共享内存的描述符, 理解为共享内存的ID, ID也是唯一的,后续操作用的都是该id值
- 失败: 返回-1,并设置errno

```cpp
// 1. 创建一块不存在的共享内存
// 如果检测到key值为0x12的共享内存已经存在, 该函数调用失败并设置errno为EEXIST
shmget(0x12, 4096, IPC_CREAT|IPC_EXCL|0664)
// 2. 打开一块已经存在的共享内存, 共享内存的key 0x12
shmget(0x12, 0, 0)
// 3. 操作一块内存, 存在打开, 不存在创建
shmget(0x12, 4096, IPC_CREAT|0664)
```

###### shmat函数

将当前进程和共享内存关联到一起

```cpp
void *shmat(int shmid, const void *shmaddr, int shmflg);
```

- 参数`shmid`: shmget函数的返回值

- 参数`shmaddr`: 共享内存和进程关联, 指定的内存位置

  赋值为NULL, 内核会自动分配

- 参数`shmflg`:

  - SHM_RDONLY: 对共享内存只读
  - 0: 可以对共享内存读写

返回值: 

- 关联成功之后, 内核分配的可进行读写的内存块的首地址
- 失败,返回 `(void*)-1`

###### shmdt函数

将共享内存和当前进程分离

```cpp
int shmdt(const void *shmaddr);
```

参数`shmaddr`: shmat函数的返回值
返回值: 成功0, 失败-1

###### shmctl函数

控制共享内存,包括删除共享内存

```cpp
int shmctl(int shmid, int cmd, struct shmid_ds *buf);
```

- 参数`shmid`: shmget函数的返回值
- 参数`cmd`:
  - `IPC_STAT`: 获得共享内存状态信息
  - `IPC_SET`: 设置共享内存状态
  - `IPC_RMID`: 标记该共享内存要被删除,只有在所有进程都与该共享内存分离才会被真正删除.(共享内存状态信息中的`shm_nattch`成员为0,才真正被删除)
- 参数`buf`:
  - `IPC_STAT`: `buf`为传出参数, 记录共享内存信息
  - `IPC_SET`: `buf`为传入参数
  - `IPC_RMID`: `buf`用不到, 赋值为NULL

返回值:成功返回0,失败返回-1并设置`errno`

**shmid_ds结构体如下:**

```cpp
struct shmid_ds
{
    struct ipc_perm shm_perm; /*
operation permissions */
    size_t shm_segsz;         /*
size of segment in bytes */
    pid_t shm_lpid;           /*
pid of last shm op */
    pid_t shm_cpid;           /*
pid of creator */
    short shm_nattch;         /*
# of current attaches */
    time_t shm_atime;         /*
last shmat() time*/
    time_t shm_dtime;         /*
last shmdt() time */
    time_t shm_ctime;         /*
last change by shmctl() */
    void *shm_internal;       /*
sysv stupidity */
};
```

**[注意]**

共享内存被删除一次之后, 如果还有进程和共享内存关联着, 共享内存的key会发生变化变成`0`,此时别的进程如果还调用shmctl函数对原本的共享内存id进行删除,会返回-1,errno返回22表示无效参数错误（EINVAL）

###### ftok函数

ftok函数的作用是将一个文件路径和一个字符作为输入，生成一个唯一的key值。一般用于进程间通信（IPC）中，例如消息队列、共享内存等对象的创建及操作。

> 在创建IPC对象时需要一个唯一的标识符，例如消息队列和共享内存。ftok函数可以将一个磁盘上的文件路径及一个字符进行映射生成一个key值。这个key值可以作为IPC对象的标识符，保证不同IPC对象之间不会出现重复的key。
>
> 通常在使用ftok函数时，需要确保输入的文件路径对于每个进程来说是唯一的，否则会导致多个进程使用相同的key值，引发IPC对象创建失败。同时，ftok函数生成的key值也要保证在相同系统中是唯一的。

```cpp
key_t ftok(const char *pathname, int proj_id);
```

- `pathname`: 路径或文件名, 必须存在, 对文件的权限没有要求
  - `/home/kevin/a.txt`
  - `/home/kevin/hello` - 目录
- `proj_id`: 只用到了一个字节, 取值范围: 0-255, 也可以传递一字符
  - `88`
  - `'a'`

返回值:成功返回key值,失败返回-1并设置errno

**注意**:如果pathname指向的文件或者目录被删除而且又重新创建，那么文件系统会赋予这个同名文件**新的`inode`节点信息**，于是这些进程调用的 `ftok()` 都能正常返回，但**键值key却不一定相同**了。(**相同inode节点和相同的id会生成相同的key**)

##### 共享内存和内存映射的区别

- 内存映射如果用于没有血缘关系的进程间通信必须使用文件,共享内存不需要
- 共享内存比内存映射快
- 内存映射比共享内存安全(共享内存断电全部数据丢失)

#### 信号量

信号量也可以用于IPC

常用函数包括semget,semctl,semop等等

#### IPC相关命令

ipcs用法(ipc show)

```cpp
ipcs -a // 打印当前系统中所有的进程间通信方式的信息
ipcs -m // 打印出使用共享内存进行进程间通信的信息 == 常用
//================ 以下为了解内容 ================
ipcs -q // 打印出使用消息队列进行进程间通信的信息
ipcs -s // 打印出使用信号进行进程间通信的信息
```

ipcrm用法(ipc rm)

```cpp
ipcrm -M shmkey // 移除用shmkey创建的共享内存段
ipcrm -m shmid // 移除用shmid标识的共享内存段
//================ 以下为了解内容 ================
ipcrm -Q msgkey // 移除用msqkey创建的消息队列
ipcrm -q msqid // 移除用msqid标识的消息队列
ipcrm -S semkey // 移除用semkey创建的信号
ipcrm -s semid // 移除用semid标识的信号
```

#### 进程间通信总结

- 匿名管道: 只能用于有血缘关系的进程间通信,局限于单向通信的工作方式,适用于数据量比较小的进程间通信，**效率较高**。
- 命名管道: **效率比较低**，因为它需要操作系统在文件系统中维护一些信息。
- 内存映射区: 创建内存映射区出错概率非常高，一定要检查返回值,**效率较高**
- 信号: 不能携带大量信息,**效率也比较低**,进程间通信机制中唯一的异步通信机制
- 本地socket通信: 实时性较差，但适合于通信数据量比较大的情况
- 共享内存:**效率最高**，适合于通信数据量比较大的情况,但是由于数据访问没有加锁，所以可能存在数据一致性问题。

ipc机制细分:

- **`System V IPC机制特征`**：System V IPC是一种在UNIX系统中广泛使用的IPC机制，包括消息队列、信号量和共享内存三种方式。使用它需要用到特定的函数和API，例如msgget、msgsnd、msgrcv等。System V IPC机制的实现会产生一些特殊的对象，例如消息队列。这种机制的特点是高效、可靠、灵活，而且跨平台。
- **`IPC机制特征`**：IPC机制包括管道、套接字、远程过程调用（RPC）、网络文件系统（NFS）等方式。它们的实现是跨平台的，不需要特定的函数和API，而且使用方，适用于不同的应用场景。使用IPC机制需要了解相关的通信协议和API，例如针对套接字通信的socket API等。

总的来说，`System V IPC机制`和`IPC机制`是两种不同的进程间通信方式。选择哪一种方式应该根据不同的应用场景进行权衡。如果要在UNIX系统中实现进程间通信，`System V IPC`机制可能是更好的选择，而IPC机制对于**跨平台应用**来说可能更加适用。

### 守护进程

- 说出守护进程的特点
- 独立完成守护进程的创建

Daemon(精灵)进程，是Linux中的后台服务进程，通常独立于控制终端并且周期性地执行某种任务或等待处理某些发生的事件。**一般采用以d结尾的名字**，如`vsftpd`

Linux后台的一些系统服务进程，没有控制终端，不能直接和用户交互。不受用户登录、注销的影响，一直在运行着，他们都是守护进程。如：*预读入缓输出机制的实现；ftp服务器；nfs服务器等。*

**总结守护进程的特点**

- Linux后台服务进程
- 独立于控制终端
- 周期性的执行某种任务
- 不受用户登陆和注销的影响
- 一般采用以d结尾的名字

#### 进程组和会话

- 进程组

  - 进程组是一个或者多个进程的集合，每个进程都属于一个进程组，引入进程组是为了简化对进程的管理。当父进程创建子进程的时候，**默认子进程与父进程属于同一个进程组**。

    进程组ID==第一个进程ID（组长进程）。如父进程创建了多个子进程，父进程和多个子进程同属于一个组，而由于父进程是进程组里的第一个进程，所以父进程就是这个组的组长, **组长ID==父进程ID**。

  - 可以使用`kill -SIGKILL -进程组ID(负的)`来将整个进程组内的进程全部杀死。

  - 只要进程组中**有一个进程存在，进程组就存在，与组长进程是否终止无关。**

  - 进程组生存期：从进程组创建到最后一个进程离开

- 会话

  - 一个会话是**一个或多个进程组的集合**。
  
  - **[硬性规则]** **创建会话的进程不能是进程组组长**
  
    建立新会话时，先调用`fork`, 父进程终止，子进程调用`setsid`函数
  
  - **创建会话的进程成为一个进程组的组长进程，同时也成为会话的会长。**
  
  - 需要有root权限（ubuntu不需要）
  
  - **新创建的会话丢弃原有的控制终端**

使用`ps ajx`来查看进程组ID和会话ID

![image-20220718141339967](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207181413469.png)

#### 创建守护进程模型

1. fork子进程，父进程退出     **(必要)**

   子进程继承了父进程的进程组ID, 但具有一个新的进程ID,这样就保证了子进程不是一个进程组的组长ID,这对于下面要做的`setsid`函数的调用是必要的前提条件

   父进程先于子进程退出,子进程将被1号进程领养

2. 子进程调用`setsid`函数创建新会话   **(必要)**

   调用这个函数以后

   - 该进程成为新会话的首进程，即会话的会长
   - 成为一个新进程组的组长进程，即进程组组长
   - 不受控制终端的影响

3. 改变当前工作目录`int chdir(const char *path);`  (非必要)

   如：a.out在U盘上，启动这个程序，这个程序的当前的工作目录就是这个u盘，如果u盘拔掉后进程的当前工作目录将消失，a.out将不能正常工作。

4. 重设文件掩码   `mode & ~umask`    (非必要)

   - 子进程会继承父进程的掩码
   - 增加子进程程序操作的灵活性
   - 重设文件掩码函数: ` mode_t umask(mode_t cmask);`     `umask(0000);`    

5. 关闭文件描述符    (非必要)

   守护进程不受控制终端的影响所以可以关闭，以释放资源 

   ```c
   close(STDIN_FILENO);
   close(STDOUT_FILENO);
   close(STDERR_FILENO);
   ```

6. 执行核心工作

   守护进程的核心代码逻辑

##### 案例

遍写一个守护进程,每隔2s获取一次系统时间,并将这个时间写入磁盘文件.

```c
void sigFunc(int signo)
{
    std::cout<<"信号处理函数执行"<<std::endl;
    time_t tmp;
    time(&tmp);//获取当前系统时间
    char* timeStr = ctime(&tmp);//time_t类型转换为字符串
    int fd = open("1.log",O_WRONLY | O_CREAT ,0755);
    write(fd,timeStr,strlen(timeStr)+1);
    close(fd);
}

int main(int argc,char** argv)
{
    int newPid = fork();
    if(newPid>0)
    {
        std::cout<<"守护进程pid为"<<newPid<<std::endl;
        return 0;//父进程退出
    }
    int sid = setsid();   //子进程创建会话
    //重设文件掩码(不设也行)
    umask(0000);
    //关闭文件描述符(不设也行)
    close(STDIN_FILENO);
    close(STDOUT_FILENO);
    close(STDERR_FILENO);
    signal(SIGALRM,sigFunc);
    itimerval itmv;
    itmv.it_interval.tv_sec=2;
    itmv.it_interval.tv_usec=0;
    itmv.it_value.tv_sec=2;
    itmv.it_value.tv_usec=0;
    setitimer(ITIMER_REAL,&itmv,NULL);
    while (1)
    {
        sleep(1);
    }
		return 0;
}
```

## 线程相关

### 线程

- 轻量级的进程（LWP：light weight process），在**Linux环境下线程的本质仍是进程**。

- 进程：拥有独立的地址空间，拥有PCB，相当于独居。
- 线程：有PCB，但没有独立的地址空间，多个线程共享进程空间，相当于合租。

![image-20220719150101951](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207191501937.png)

一个进程空间对应一个pid,同一个进程空间的线程有同一个pid,但是他们各自有各自的线程id

- **线程**：最小的执行单位
- **进程**：最小分配资源单位，可看成是只有一个线程的进程。

**线程的特点**

- 类Unix系统中，早期是没有“线程”概念的，80年代才引入，借助进程机制实现出了线程的概念。因此在这类系统中，进程和线程关系密切。
- 线程是**轻量级进程**(**light-weight process,简称LWP**)，也有PCB，创建线程使用的底层函数和进程一样，都是`clone`
- 从内核里看进程和线程是一样的，都有各自不同的PCB.
- 进程可以蜕变成线程
- 在linux下，线程最是小的执行单位；进程是最小的分配资源单位
- **主线程退出，整个进程空间都会被回收，子线程没有了生存空间，所以也就得不到执行。**

![image-20220719153308706](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207191533978.png)

查看指定进程的所有的LWP号： `ps –Lf pid`

![截屏2022-07-20 11.24.10](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207201125224.jpeg)

NLWP表示线程数,STAT表示线程状态,LWP表示线程号(不同于线程id,线程id是给程序员看的)

实际上，无论是创建进程的fork，还是创建线程的pthread_create(C库函数)，底层实现都是调用同一个内核函数 `clone`。

- 如果复制对方的地址空间，那么就产出一个“进程”；
- 如果共享对方的地址空间，就产生一个“线程”。

所以：**Linux内核是不区分进程和线程的**, 只在用户层面上进行区分。

所以，**线程所有操作函数 `pthread_*` 是库函数**，而非系统调用。

#### 线程独立资源

- 线程id
- 处理器现场和栈指针(内核栈)
- 独立的栈空间(用户空间栈)
- errno变量(多线程编程中,不应该用`perror()`,应该改用`strerror(errno)`函数,因为`perror`是调用进程的全局错误号，不适合单独线程的错误分析，所以只能使用`strerror`。)
- 信号屏蔽字
- 调度优先级

#### 线程共享资源

**实际上本进程所有内存都可以读取**

p.s. 线程之间（包含主线程和子线程）可以共享同一变量，包含全局变量或者非全局变量（但是非全局变量必须在其有效的生存期内）

- **文件描述符**
- 每种信号的处理方式
- 当前工作目录
- 用户ID和组ID
- 内存地址空间(.text/.data/.bss/heap/共享库)
- 等等

#### 线程优/缺点

- 优点：	
  - 提高程序并发性	
  - 开销小	
  - 数据通信、共享数据方便
- 缺点：	
  - 库函数，不稳定	
  - **gdb调试、编写困难**	
  - **对信号支持不好**

优点相对突出，缺点均不是硬伤。Linux下由于实现方法导致进程、线程差别不是很大。

一般来说,业务处理,[[数据库]]操作用进程操作,网络通信用线程操作.

#### windows和linux线程的函数比较

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202208211822664.jpeg)

linux也有Semaphore信号量(上图有误)

### 线程相关函数

- [创建子线程](#pthread_create函数)    `pthread_create`
- 获取子线程id  `pthread_self`
- [线程退出 ](#pthread_exit函数)    `pthread_exit`
- [回收子线程 ](#pthread_join函数)   `pthread_join`
- [设置子线程为分离属性](#pthread_join函数)    `pthread_detach`
- [杀死线程](#pthread_cancel函数)    `pthread_cancel`
- 设置线程取消点    `pthread_testcancel`

#### pthread_create函数

创建一个新线程

```c
int pthread_create(pthread_t *thread, //可以理解为传出线程操作的标识,但目前实际上就是线程id,以后可能改写成结构体
								const pthread_attr_t *attr,
                void *(*start_routine) (void *),//回调函数
  							void *arg);//回调函数的参数
```

返回值

- 成功，返回0
- 失败，返回错误号

函数参数：

- `pthread_t`：传出参数，保存系统为我们分配好的线程ID
  - 当前Linux中可理解为：**`typedef unsigned long int pthread_t`**。(在mac中,理解成`typedef int64_t  pthread_t`)
- `attr`：通常传NULL，表示使用线程默认属性。若想使用具体属性也可以修改该参数。
- `start_routine`：函数指针，指向线程主函数(线程体)，该函数运行结束，则线程结束。
- `arg`：线程主函数执行期间所使用的参数。

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207201055606.jpeg" alt="截屏2022-07-20 10.53.32" style="zoom: 33%;" />

注意:

- 由于`pthread_create`的错误码不保存在`errno`中，因此不能直接用`perror()`打印错误信息，可以先用`strerror()`把错误码转换成错误信息再打印。
- **如果任意一个线程调用了`exit`或`_exit`，则整个进程的所有线程都终止，由于从`main`函数`return`也相当于调用`exit`**，为了防止新创建的线程还没有得到执行就终止，我们在main函数return之前延时1秒，这只是一种权宜之计，即使主线程等待1秒，内核也不一定会调度新创建的线程执行，下一节我们会看到更好的办法。
- 创建的线程,谁先执行没法确定

**创建线程案例**

```c
//主线程循环创建5个子线程，并让子线程判断自己是第几个子线程,该案例有bug,用于展示特性,后续有解决
void* threadFunc(void* numAdd)
{
    std::cout<<"我是第"<<*(int*)numAdd<<"个子线程,线程id为"<<pthread_self()<<" pid为"<<getpid()<<std::endl;
}

int main(int argc,char** argv)
{
    pthread_t tid;
    for (size_t i = 0; i < 5; i++)
    {
        /* code */
        int iRet = pthread_create(&tid,NULL,threadFunc,&i);
        if(iRet !=0)
        {
            std::cout<<strerror(iRet)<<std::endl;
            return -1;
        }
    }
    
    sleep(1);//让打印错开,不然两串打印黏合在一起
    std::cout<<"我是主线程,线程id为:"<<pthread_self()<<" pid为"<<getpid()<<std::endl;
    sleep(1);//让主线程晚一点退出
    return 0;
}
```

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207201059397.jpeg" alt="截屏2022-07-20 10.59.36" style="zoom:25%;" />![image-20220720110017321](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207201100698.png)

> **为什么打印出来的值是5**:
>
> 是由于主线程可能会在一个cpu时间片内连续创建了5个子线程，此时变量i的值变成了5，当主线程失去cpu的时间片后，子线程得到cpu的时间片，子线程访问的是变量i的内存空间的值，所以打印出来值为5.

解决方案:  "多线程不访问同一个内存地址"  或者  "不传内存地址,而是直接传值本身".

#### pthread_exit函数

将单个线程退出

在线程中禁止调用`exit`函数，否则会导致整个进程退出，取而代之的是调用`pthread_exit`函数，这个函数是使一个线程退出

**如果主线程调用`pthread_exit`函数也不会使整个进程退出，不影响其他线程的执行**。

```c
void pthread_exit(void *retval);
```

**参数**:  `retval`表示线程退出状态,传出参数，通常传NULL

**注意**: `pthread_exit`或者`return`返回的指针所指向的内存单元必须是全局的或者是用malloc分配的(但不一定要返回指针,也可以直接返回常数)，不能在线程函数的栈上分配，因为当其它线程得到这个返回指针时线程函数已经退出了，栈空间就会被回收。

在子线程中，当执行结束， `return` 和 `pthread_exit()` 都可以给返回值到主线程，主线程中的 `pthread_join()` 函数都可以接收到线程的返回值。

如果直接在多线程环境中使用`pthread_exit`退出主线程,那么剩下的线程会成为**僵尸线程**,如何避免僵尸线程,用[`pthread_join`](#pthread_join函数)函数

#### pthread_join函数

阻塞等待线程退出，**获取线程退出状态**。其作用，对应进程中的waitpid() 函数。

```c
int pthread_join(pthread_t thread, void **retval); 
```

- 函数返回值：
  - 成功：0；
  - 失败：错误号
- 函数参数： 
  - `thread`：线程ID
  - `retval`：传出参数,双重指针,为**指向`pthread_exit`函数的retval的指针**,存储线程结束状态，[整个指针指向的]和pthread_exit的参数是同一块内存地址。

一般先定义`void *ptr;` 然后`pthread_join(threadid, &ptr);`

**案例**

```c
char* tmp;
void* threadFunc(void* numAdd)
{
    std::cout<<"我是第"<<*(int*)numAdd<<"个子线程,线程id为"<<pthread_self()<<" pid为"<<getpid()<<std::endl;
    tmp = (char*)malloc(strlen("helloworld!")+1);
    memset(tmp,0,strlen("helloworld!")+1);
    strcpy(tmp,"helloworld!");
    //return tmp;//也可以
    pthread_exit(tmp);
}

int main(int argc,char** argv)
{
    pthread_t tid;
    for (size_t i = 0; i < 1; i++)
    {
        /* code */
        int iRet = pthread_create(&tid,NULL,threadFunc,&i);
        if(iRet !=0)
        {
            std::cout<<strerror(iRet)<<std::endl;
            return -1;
        }
    }
    
    sleep(1);//让打印错开,不然两串打印黏合在一起
    std::cout<<"我是主线程,线程id为:"<<pthread_self()<<" pid为"<<getpid()<<std::endl;
    void* ptr;
    pthread_join(tid,&ptr);
    cout<<"收到子线程返回的数据为:"<<(char*)ptr<<endl;
    free(tmp);
    return 0;
}
```

`pthread_self`函数用于获取自身线程id

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207201311701.jpeg" alt="截屏2022-07-20 13.10.44" style="zoom: 33%;" />

#### pthread_detach函数

实现线程分离

线程分离状态：指定该状态，线程主动与主控线程断开关系。线程结束后，其退出状态不由其他线程获取，而直接自己自动释放。**网络、多线程服务器常用。**

进程若有该机制，将不会产生僵尸进程。僵尸进程的产生主要由于进程死后，大部分资源被释放，一点残留资源仍存于系统中，导致内核认为该进程仍存在。
也可使用 pthread_create函数的**参2(线程属性)**来设置线程分离。而`pthread_detach`函数是在创建线程之后调用的。

```c
int pthread_detach(pthread_t thread);
```

- 函数返回值
  - 成功：0；
  - 失败：错误号

一般情况下，线程终止后，其终止状态一直保留到其它线程调用`pthread_join`获取它的状态为止。**但是线程也可以被置为`detach`状态，这样的线程一旦终止就立刻回收它占用的所有资源，而不保留终止状态。**不能对一个已经处于`detach`状态的线程调用`pthread_join`，这样的调用将直接返回`EINVAL`错误。也就是说，如果已经对一个线程调用了`pthread_detach`就不能再调用`pthread_join`了。

如果线程已经设置了分离状态，则再调用pthread_join就会失败，可用这个方法验证是否已成功设置分离状态

#### pthread_cancel函数

杀死(取消)线程。其作用，对应进程中 `kill()` 函数

```c
int pthread_cancel(pthread_t thread);
```

- 函数返回值
  - 成功：0；
  - 失败：错误号

**【注意】** 线程的取消并**不是实时的**，而**有一定的延时**。需要等待线程到达某个**取消点**(检查点)。

**取消点**：是线程检查是否被取消，并按请求进行动作的一个位置。通常是一些系**统调用**`creat，open，pause，close，read，write.....` 执行命令`man 7 pthreads`可以查看具备这些取消点的系统调用列表。可粗略认为一个[[系统调用]](进入内核)即为一个取消点。还以通过调用`pthread_testcancel`函数设置一个取消点。

```c
//设置一个取消点函数,是用于要被取消的线程的回调中,如果有系统调用就不必写这个了
void pthread_testcancel(void);
```

**案例**

```c
void* threadFunc(void* numAdd)
{
    while(1)
    {
        int a;
        //pthread_testcancel();//设置取消点
    }
}

int main(int argc,char** argv)
{
    pthread_t tid;
    for (size_t i = 0; i < 1; i++)
    {
        /* code */
        int iRet = pthread_create(&tid,NULL,threadFunc,&i);
        if(iRet !=0)
        {
            std::cout<<strerror(iRet)<<std::endl;
            return -1;
        }
    }
    
    sleep(1);//让打印错开,不然两串打印黏合在一起
    std::cout<<"我是主线程,线程id为:"<<pthread_self()<<" pid为"<<getpid()<<std::endl;
    pthread_cancel(tid);
    pthread_join(tid,NULL);
    std::cout<<"子线程真正退出"<<std::endl;
    return 0;
}
```

上面案例阻塞,如下图:

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207201405870.jpeg" alt="截屏2022-07-20 14.04.24" style="zoom:25%;" />

原因是子线程没有取消点,所以在 `pthread_join`函数处阻塞住了.

把`pthread_testcancel`加到子线程回调中,就不会阻塞了,子线程将被成功释放.

#### pthread_equal函数

比较两个线程ID是否相等。

```c
int pthread_equal(pthread_t t1, pthread_t t2);
```

- 返回值
  - `0`     不相等
  - `不为0`    相等

注意：这个函数是为了以能够扩展使用的， 有可能Linux在未来线程ID pthread_t 类型被修改为结构体实现。

#### 进程函数和线程函数比较

| 进程         | 线程           |
| ------------ | -------------- |
| fork         | pthread_create |
| exit         | pthread_exit   |
| wait/waitpid | pthread_join   |
| kill         | pthread_cancel |
| getpid       | pthread_self   |

### 线程属性

linux下线程的属性是可以根据实际项目需要，进行设置，之前讨论的线程都是采用线程的默认属性，默认属性已经可以解决绝大多数开发时遇到的问题，如果对程序的性能提出更高的要求，则需要设置线程属性

线程的分离状态决定一个线程以什么样的方式来终止自己，有两种状态：

- 非分离状态：线程的默认属性是非分离状态，这种情况下，原有的线程等待创建的线程结束。只有当pthread_join()函数返回时，创建的线程才算终止，才能释放自己占用的系统资源。
- 分离状态：分离线程没有被其他的线程所等待，自己运行结束了，线程也就终止了，马上释放系统资源。应该根据自己的需要，选择适当的分离状态。

设置线程属性分为以下步骤:

1. 定义线程属性类型类型的变量

   `pthread_attr_t  attr;`

2. 对线程属性变量进行初始化

   `int pthread_attr_init (pthread_attr_t* attr);`

3. 设置线程为分离属性

   ```c
   int pthread_attr_setdetachstate(
   pthread_attr_t *attr, 
   int detachstate);
   ```

   参数:

   - `attr`: 线程属性
   - `detachstate`:
     - PTHREAD_CREATE_DETACHED(分离)
     - PTHREAD_CREATE_JOINABLE（非分离)

   注意：这一步完成之后调用pthread_create函数创建线程，
   				则创建出来的线程就是分离线程；其实上述三步就是
   				pthread_create的第二个参数做准备工作。

4. 释放线程属性资源

   `int pthread_attr_destroy(pthread_attr_t *attr);`

   参数：线程属性

验证：设置为分离属性的线程是不能够被pthread_join函数回收的，
可以通过调用pthread_join函数测试该线程是否已经是分离属性的线程。

**案例**

```c
pthread_t tid;
void* threadFunc(void* numAdd)
{
    std::cout<<"子线程为"<<pthread_self()<<std::endl;
    sleep(10);
}

int main(int argc,char** argv)
{
    //以分离状态创建子线程
    pthread_attr_t attr;
    pthread_attr_init(&attr);
    pthread_attr_setdetachstate(&attr,PTHREAD_CREATE_DETACHED);
        /* code */
        int iRet = pthread_create(&tid,&attr,threadFunc,NULL);
        if(iRet !=0)
        {
            std::cout<<strerror(iRet)<<std::endl;
            return -1;
        }
    sleep(1);//让打印错开,不然两串打印黏合在一起
    std::cout<<"我是主线程,线程id为:"<<pthread_self()<<" pid为"<<getpid()<<std::endl;
    iRet = pthread_join(tid,NULL);
    if(iRet!=0)
    {
        cout<<"pthread_join error :"<<strerror(iRet)<<endl;
    }
    std::cout<<"子线程真正退出"<<std::endl;
    //释放线程属性
    pthread_attr_destroy(&attr);
    return 0;
}
```

**案例效果为:子线程设置为分离线程后,子线程虽然还未结束,但`pthread_join`也不会阻塞.**

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207201629974.jpeg" alt="截屏2022-07-20 16.27.48" style="zoom: 33%;" />

### 线程同步

**线程同步**，指一个线程发出某一功能调用时，在没有得到结果之前，该调用不返回。同时其它线程为保证数据一致性，不能调用该功能。

**多线程数据混乱的原因**

- 资源共享（独享资源则不会）	
- 调度随机（线程操作共享资源的先后顺序不确定）
- 线程间缺乏必要的同步机制。

以上3点中，前两点不能改变，欲提高效率，传递数据，资源必须共享。只要共享资源，就一定会出现竞争。只要存在竞争关系，数据就很容易出现混乱。所以只能从第三点着手解决。使多个线程在访问共享资源的时候，出现**互斥**。

- 原子操作的概念

  原子操作指的是该操作要么不做，要么就完成。

- 使用互斥锁解决同步问题

  使用互斥锁其实是模拟原子操作，互斥锁示意图：

Linux中提供一把互斥锁mutex（也称之为互斥量）。每个线程在对资源操作前都尝试先加锁，成功加锁才能操作，操作结束解锁。

资源还是共享的，线程间也还是竞争的，但**通过“锁”就将资源的访问变成互斥操作**，而后与时间有关的错误也不会再产生了。

![image-20220721114209334](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207211142513.png)

线程1访问共享资源的时候要先判断锁是否锁着，如果锁着就阻塞等待；若锁是解开的就将这把锁加锁，此时可以访问共享资源，访问完成后释放锁，这样其他线程就有机会获得锁。

使用互斥锁之后，两个线程由**并行操作变成了串行操作**，**效率降低了，但是数据不一致的问题得到解决了。**

[windows和linux线程相关函数比较跳转](#windows和linux线程的函数比较)

#### 互斥锁

##### 互斥锁相关函数

**pthread_mutex_t 类型**

其本质是一个结构体，为简化理解，应用时可忽略其实现细节，简单当成整数看待。

`pthread_mutex_t mutex;` 变量mutex只有两种取值1、0。

##### pthread_mutex_init函数

初始化一个互斥锁(互斥量) ---> 初值可看作1

```c
int pthread_mutex_init(pthread_mutex_t *restrict mutex, const pthread_mutexattr_t *restrict attr);
```

**函数参数**

- `mutex`：传出参数，调用时应传 `&mutex`	

- `attr`：互斥锁属性。是一个传入参数，通常传NULL，选用默认属性(线程间共享)。

  `restrict`关键字：只用于限制指针，告诉编译器，所有修改该指针指向内存中内容的操作，只能通过本指针完成。不能通过除本指针以外的其他变量或指针修改互斥量mutex的两种初始化方式：

  - 静态初始化：如果互斥锁 mutex 是静态分配的（定义在全局，或加了static关键字修饰），可以直接使用宏进行初始化。

    `pthead_mutex_t muetx = PTHREAD_MUTEX_INITIALIZER;`

  - 动态初始化：局部变量应采用动态初始化。

    `pthread_mutex_init(&mutex, NULL)`

**返回值**

- `0`          成功
- 不为0   失败,并且设置错误号

##### pthread_mutex_destroy函数

销毁一个互斥锁

```c
int pthread_mutex_destroy(pthread_mutex_t *mutex);
```

函数参数
	mutex—互斥锁变量

返回值

- `0`          成功
- 不为0   失败,并且设置错误号

##### pthread_mutex_lock函数

对互斥锁加锁，可理解为将`mutex--`

```c
int pthread_mutex_lock(pthread_mutex_t *mutex);
```

函数参数
	mutex—互斥锁变量

返回值

- `0`          成功
- 不为0   失败,并且设置错误号

##### pthread_mutex_unlock函数

对互斥锁解锁，可理解为将`mutex ++`

```c
int pthread_mutex_unlock(pthread_mutex_t *mutex);
```

函数参数
	mutex—互斥锁变量

返回值

- `0`          成功
- 不为0   失败,并且设置错误号

##### pthread_mutex_trylock函数

尝试加锁

```c
int pthread_mutex_trylock(pthread_mutex_t *mutex);
```

函数参数
	mutex—互斥锁变量

返回值

- `0`          成功
- 不为0   失败,并且设置错误号

##### 加锁和解锁

- lock尝试加锁，如果加锁不成功，线程阻塞，阻塞到持有该互斥量的其他线程解锁为止。
- unlock主动解锁函数，同时将阻塞在该锁上的所有线程全部唤醒，至于哪个线程先被唤醒，取决于优先级、调度。默认：先阻塞、先唤醒。

**案例**

```c
int number=0;
pthread_mutex_t myMutex;
void* thread1Func(void* numAdd)
{
    for (size_t i = 0; i < 1000000; i++)
    {
        pthread_mutex_lock(&myMutex);
        std::cout<<"[1]"<<++number<<std::endl;
        pthread_mutex_unlock(&myMutex);
    }
}

void* thread2Func(void* numAdd)
{
    for (size_t i = 0; i < 1000000; i++)
    {
        pthread_mutex_lock(&myMutex);
        std::cout<<"[2]"<<++number<<std::endl;
        pthread_mutex_unlock(&myMutex);
    }
}

int main(int argc,char** argv)
{
    pthread_mutex_init(&myMutex,NULL);
    pthread_t thread1,thread2;
    pthread_create(&thread1,NULL,thread1Func,NULL);
    pthread_create(&thread1,NULL,thread2Func,NULL);
    pthread_join(thread1,NULL);
    pthread_join(thread2,NULL);
    pthread_mutex_destroy(&myMutex);
    return 0;
}
```

未加锁之前:<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207211347215.jpeg" alt="截屏2022-07-21 13.36.00" style="zoom:25%;" />,加锁之后,输出到`2000000`

#### 死锁

死锁并不是linux提供给用户的一种使用方法，而是由于用户使用互斥锁不当引起的一种现象。
常见的死锁有两种：

1. 自己锁自己，如下图代码片段

   ![image-20220726133100008](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207261331774.png)

2. 线程A拥有A锁，请求获得B锁；线程B拥有B锁，请求获得A锁，这样造成线程A和线程B都不释放自己的锁，而且还想得到对方的锁，从而产生死锁，如下图所示：

   ![image-20220726133159681](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207261332625.png)

**[如何解决死锁]**：

- 让线程按照一定的顺序去访问共享资源
- **在访问其他锁的时候，需要先将自己的锁解开**
- **调用`pthread_mutex_trylock`**，如果加锁不成功会立刻返回

#### 读写锁

读写锁也叫`共享-独占锁`。当读写锁以**读模式**锁住时，它是以**共享模式**锁住的；当它以**写模式**锁住时，它是以**独占模式**锁住的。**[写独占、读共享]**。

读写锁**使用场合**:
读写锁非常**适合于对[[数据结构]]读的次数远大于写的情况**。

**读写锁特性**

- 读写锁是“写模式加锁”时，解锁前，所有对该锁加锁的线程都会被阻塞。
- 读写锁是“读模式加锁”时，如果线程以读模式对其加锁会成功；如果线程以写模式加锁会阻塞。
- 读写锁是“读模式加锁”时， 既有试图以写模式加锁的线程，也有试图以读模式加锁的线程。那么**读写锁会阻塞随后的读模式锁请求**。**优先满足写模式锁。读锁、写锁并行阻塞，写锁优先级高**

**读写锁总结**

**读并行，写独占，当读写同时等待锁的时候写的优先级高**

##### 读写锁主要函数

- 定义一把读写锁 

  `pthread_rwlock_t rwlock;`

- 初始化读写锁 

  ```c
  int pthread_rwlock_init(pthread_rwlock_t *restrict rwlock,const pthread_rwlockattr_t *restrict attr);
  ```

  函数参数:

  - rwlock-读写锁
  - attr-读写锁属性，传`NULL`为默认属性

- 销毁读写锁  

  `int pthread_rwlock_destroy(pthread_rwlock_t *rwlock);`        

- 加读锁
  `int pthread_rwlock_rdlock(pthread_rwlock_t *rwlock);`              

- 尝试加读锁
  `int pthread_rwlock_tryrdlock(pthread_rwlock_t *rwlock);`

- 加写锁
  `int pthread_rwlock_wrlock(pthread_rwlock_t *rwlock);`

- 尝试加写锁
  `int pthread_rwlock_trywrlock(pthread_rwlock_t *rwlock);`

- 解锁
  `int pthread_rwlock_unlock(&pthread_rwlock_t *rwlock);`

#### 条件变量

条件变量本身**不是锁**！但它也可以造成线程阻塞。**通常与互斥锁配合使用**。给多线程提供一个会合的场所。

- 使用互斥量保护共享数据;
- 使用条件变量可以使线程阻塞, 等待某个条件的发生, 当条件满足的时候解除阻塞.

条件变量的两个动作:

- 条件不满足, 阻塞线程
- 条件满足, 通知阻塞的线程解除阻塞, 开始工作.

##### 条件变量相关函数

条件变量类型  `pthread_cond_t  cond;`

###### pthread_cond_init

初始化条件变量

`int pthread_cond_init(pthread_cond_t *restrict cond,const pthread_condattr_t *restrict attr);`

函数参数: 
		`cond`: 条件变量
		`attr`: 条件变量属性, 通常传NULL
函数返回值:成功返回0, 失败返回错误号

###### pthread_cond_destroy

销毁条件变量

```c
int pthread_cond_destroy(pthread_cond_t *cond);
```

函数参数: 条件变量
返回值: 成功返回0, 失败返回错误号

###### pthread_cond_wait

- 条件不满足, 引起线程阻塞并解锁
- 条件满足, 解除线程阻塞, 并加锁

```c
int pthread_cond_wait(pthread_cond_t *restrict cond,pthread_mutex_t *restrict mutex);
```

函数参数:
		`cond`: 条件变量
		`mutex`: **互斥锁变量**
函数返回值: 成功返回0, 失败返回错误号

###### pthread_cond_signal

唤醒至少一个阻塞在该条件变量上的线程

```c
int pthread_cond_signal(pthread_cond_t *cond);
```

函数参数: 条件变量
函数返回值: 成功返回0, 失败返回错误号

###### pthread_cond_boardcast

唤醒所有条件变量

```c
int pthread_cond_boardcast(pthread_cond_t *cond);
```

函数参数: 条件变量
函数返回值: 成功返回0, 失败返回错误号

**案例**

![](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207281613821.png)![](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207281613562.png)

生产者线程调用pthread_cond_signal函数会使消费者线程在pthread_cond_wait处解除阻塞。

#### 信号量

信号量相当于多把锁, 可以理解为是加强版的互斥锁

前面的锁同一时间都只能有一个单位持有锁,信号量允许多个单位持有同一把锁.

![image-20220729141523246](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207291415036.png)

可以如上图理解成多部车进同一个车库

##### 信号量相关函数

定义信号量 `sem_t sem;`

######  sem_init函数

初始化信号量

```c
int sem_init(sem_t *sem, int pshared, unsigned int value);
```

函数参数:
	`sem`: 信号量变量
	`pshared`: 0表示线程同步, 1表示进程同步
	`value`: **最多有几个线程操作共享数据**
函数返回值:成功返回0, 失败返回-1, 并设置errno值

###### sem_wait函数

调用该函数一次, 相当于sem--, 当**sem为0的时候, 引起阻塞**

```c
int sem_wait(sem_t *sem);
```

函数参数: 信号量变量
函数返回值: 成功返回0, 失败返回-1, 并设置errno值

###### sem_post函数

调用一次, 相当于sem++

```c
int sem_post(sem_t *sem);
```

函数参数: 信号量变量
函数返回值: 成功返回0, 失败返回-1, 并设置errno值

######  sem_trywait函数

尝试加锁, 若失败直接返回, 不阻塞

```c
int sem_trywait(sem_t *sem);
```

函数参数: 信号量变量
函数返回值: 成功返回0, 失败返回-1, 并设置errno值

###### sem_destroy函数

销毁信号量

```c
int sem_destroy(sem_t *sem);
```

函数参数: 信号量变量
函数返回值: 成功返回0, 失败返回-1, 并设置errno值

**案例**

![image-20220729142150009](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207291421675.png)![image-20220729142154726](https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202207291421450.png)

#### 原子指令

实现线程同步还可以使用**原子指令**

原子指令是一种特殊的CPU指令，它可以保证在多线程环境下对某个变量进行的操作是原子的，即不可分割的。这意味着，当一个线程正在执行原子指令时，其他线程不能对该变量进行任何操作，直到原子指令完成。

> 原子指令通常用于实现无锁数据结构和算法。例如，在C++中，可以使用**`<atomic>`**头文件(C++11)中定义的原子类型和原子操作函数来实现无锁队列等数据结构。这些原子类型和原子操作函数底层都是通过调用CPU提供的原子指令来实现的。
>
> 在C语言中为**`<stdatomic.h>`**(C11)

- 使用锁

  [[数据库]]中把这种叫**悲观锁**(锁住后影响别人)

  适用于**冲突概率较高**的场景

- 使用cas(常用的一种原子指令)

  [[数据库]]中把这种叫**乐观锁**(不影响别人)

  适用于**冲突概率较低**的场景，它可以**提高程序的并发性能**，但在冲突概率较高时会导致大量更新操作失败

通过原子指令也可以实现互斥区(作为锁).

## 其他常用函数

- `getenv函数`   获取环境变量

# linux下设置代理

## 无ui linux非docker设置代理

1. 使用wget下载,到[此链接](https://github.com/Dreamacro/clash/releases)找`clash-linux-amd64-v1.12.0.gz`下载链接,下载后解压

2. 节点转订阅[链接](https://v2rayse.com/v2ray-clash),该链接会显示节点转换好的文本,新建`config.yaml`文件,将文本拷贝进该文件

3. 将`clash-linux-amd64-v1.12.0`改名为`clash`放到/opt/clash目录下,方便调用

4. `clash -f 上面的config.yaml`尝试启动,并查看代理端口信息

5. 接下来将clash设置为系统服务,在`/etc/systemd/system/`下新建`clash.service`文件,输入下面内容

   ```shell
   [Unit]
   Description=clash-core
   [Service]
   Type=simple
   ExecStart=/opt/clash/clash -f /opt/clash/config.yaml                      
   ```

6. 设置完成后需要` systemctl daemon-reload` 重新加载一下,然后就可以通过 `systemctl start clash`启动clash服务;通过 `systemctl status clash`查看clash服务输出信息

7. 至此,代理设置完毕

终端设置http和https代理:`export http_proxy=http://127.0.0.1:7890`和`export https_proxy=http://127.0.0.1:7890`可以在`~/.bashrc`通过别名设置一个宏

```shell
#开启终端代理
alias proxy="export https_proxy=http://127.0.0.1:7890;export https_proxy=http://127.0.0.1:7890"
#关闭终端代理
alias unproxy="unset http_proxy;unset https_proxy"
```

## 给代理设置前端UI界面

[此链接](https://github.com/Dreamacro/clash-dashboard/tree/gh-pages)下载界面相关文件(假设下到`/opt/clash/ui`文件夹)

在`config.yaml`中添加 external -ui: /opt/clash/ui

重启系统服务后,可在本机`127.0.0.1:9090/ui`查看前端页面

## docker版clash

直接下载如下命令启用就可以了

```shell
docker run -d --name clash -p 7890:7890 -p 7891:7891 -p 9090:9090 -v /opt/clash/config.yaml:/root/.config/clash/config.yaml -v /opt/clash/ui:/opt/clash/ui clash的docker镜像名
```

参数含义

- `-d`    后台运行
- `-p 7890:7890`    端口映射:`-p 主机端口:容器端口`
- `-v`    文件映射:`-v 主机文件路径:容器内部路径`

`docker ps -a`   查看全部容器信息

`docker logs -f 容器名`  查看容器输出

# shell脚本

一系列shell命令的集合,可以有函数,条件判断/循环语句,这样的一个文件叫做shell脚本

基本格式:

- 命名格式:一般使用`.sh`为后缀命名文件(这是一个约定,不是必须的)

- 书写格式

  ```shell
  # - 注释
  # 第一行的内容
  #! /bin/bash - 解析当前脚本文件使用的命令解析器(可以省略,省略的话使用默认命令解析器)
  #! /bin/sh
  #bourne shell ->sh -> unix
  #bourne again shell -> bash
  # 第二行开始
  shell命令 1
  shell命令 2
  shell命令 3
  ......
  ```

- 脚本创建出来之后是一个普通文件 -> 没有执行权限

  ```shell
  chmod u+x xxx.sh   #赋予执行权限
  ./xxx.sh  #最常用的执行方式
  sh xxx.sh
  ```

## shell中的变量

shell中的变量只有字符串类型

### 用户自定义变量

**变量定义**:      `变量名=值`

**等于号前后不能有空格 **↑↑↑

值中有空格,则必须要加单或双引号括起来,并且单双引号会将内部的多个连续空格视为一个

**变量使用**:      `$变量名`   或   `${变量名}`

**单引号和双引号的区别**:双引号会展开内部变量,单引号不会.

**取命令执行后的结果**:  

```shell
 value=$(shell命令)    
 value=`shell命令`    #注意是反引号
```

**变量计算:**  `$[ 数字/变量运算式 ]` 无法计算浮点运算

`$(expr $var2 / $var1)`

### 位置变量

**位置变量**  --执行shell脚本时候, 传递到内部的参数

- `$0` - 脚本文件的名字
- `$1` - 第一个参数
- `$2` - 第二个参数
- `$3` - 第三参数
- ...

### 环境变量

将普通变量设置为环境变量: `export 变量名=值`

### 特殊变量

- `$#`: 表示参数的个数
- `$@`: 表示全部的参数
- `$$` : 当前进程的PID
- `$?`: 程序执行完成之后的返回值  0表示正常返回

## 条件判断语句 - if

格式如下:

```shell
# 条件判断语句和[ 判断语句 ]左右必须要有空格间隔
if[ 判断语句 ];then
处理语句
处理语句
fi
# 或者
if[ 判断语句 ]
then
处理语句
处理语句
fi
# 或者
if [ 判断语句 ];then
处理语句
处理语句
elif [ 判断语句 ];then
处理语句
处理语句
else
处理语句
处理语句
fi
```

例子如下:

```shell
var="hello"
if [ $var="hello" ]
then
	echo "same"
fi
#会打印same

hour=`date +%H`
echo "current time is $hour"
if [ $hour -gt 8 -a $hour -lt 12 ]
then
        echo "good moring"
else
        echo "not moring"
fi
#打印如下:
current time is 17
not moring

if [ -f "a.txt" ]
then
	echo "a.txt is exist"
else
	echo "a.txt is not exist"
fi
#打印a.txt is not exist
```

### shell的比较符

#### 文件相关

| 文件状态命令    | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| -b ﬁlename      | 当ﬁlename 存在并且是块文件时返回真(返回0)                    |
| -c ﬁlename      | 当ﬁlename 存在并且是字符文件时返回真                         |
| -d pathname     | 当pathname 存在并且是一个目录时返回真                        |
| -e pathname     | 当由pathname 指定的文件或目录存在时返回真                    |
| -f ﬁlename      | 当ﬁlename 存在并且是正规(普通)文件时返回真                   |
| -g pathname     | 当由pathname   指定的文件或目录存在并且设置了SGID 位时返回真 |
| "-h/-L ﬁlename" | 当ﬁlename 存在并且是符号链接文件时返回真 (或 ﬁlename)        |
| -k pathname     | 当由pathname   指定的文件或目录存在并且设置了"粘滞"位时返回真 |
| -p ﬁlename      | 当ﬁlename 存在并且是命名管道时返回真                         |
| -r pathname     | 当由pathname 指定的文件或目录存在并且可读时返回真            |
| -s ﬁlename      | 当ﬁlename 存在并且文件大小大于0 时返回真                     |
| -S ﬁlename      | 当ﬁlename 存在并且是socket 时返回真                          |
| -t fd           | 当fd   是与终端设备相关联的文件描述符时返回真                |
| -u pathname     | 当由pathname   指定的文件或目录存在并且设置了SUID 位时返回真 |
| -w pathname     | 当由pathname 指定的文件或目录存在并且可写时返回真            |
| -x pathname     | 当由pathname 指定的文件或目录存在并且可执行时返回真          |
| -O pathname     | "当由pathname   存在并且被当前进程的有效用户id 的用户拥有时返回真(字母O 大写)" |
| -G pathname     | 当由pathname   存在并且属于当前进程的有效用户id 的用户的用户组时返回真 |
| ﬁle1 -nt   ﬁle2 | ﬁle1   比ﬁle2 新时返回真                                     |
| ﬁle1 -ot   ﬁle2 | ﬁle1   比ﬁle2 旧时返回真                                     |
| f1 -ef f2       | ﬁles f1   and f2 are hard links to the same ﬁle              |

#### 字符串相关

| 字符串比较命令 | 含义                                           |
| -------------- | ---------------------------------------------- |
| -z string      | 字符串string   为空串(长度为0)时返回真         |
| -n string      | 字符串string   为非空串时返回真                |
| str1 =   str2  | 字符串str1   和字符串str2 相等时返回真         |
| str1 ==   str2 | 同 =                                           |
| str1 !=   str2 | 字符串str1   和字符串str2 不相等时返回真       |
| str1 <   str2  | 按字典顺序排序，字符串str1 在字符串str2 之前   |
| str1 >   str2  | 按字典顺序排序，字符串str1   在字符串str2 之后 |

#### 数值相关

| 数值比较命令    | 含义                              |
| --------------- | --------------------------------- |
| nt1 -eq   int2  | 如果int1   等于int2，则返回真     |
| int1 -ne   int2 | 如果int1   不等于int2，则返回真   |
| int1 -lt   int2 | 如果int1   小于int2，则返回真     |
| int1 -le   int2 | 如果int1   小于等于int2，则返回真 |
| int1 -gt   int2 | 如果int1   大于int2，则返回真     |
| int1 -ge   int2 | 如果int1   大于等于int2，则返回真 |

#### 逻辑符

| 逻辑符 | 含义                                             |
| ------ | ------------------------------------------------ |
| -a     | 逻辑与，操作符两边均为真，结果为真，否则为假。   |
| -o     | 逻辑或，操作符两边一边为真，结果为真，否则为假。 |
| !      | 逻辑否，条件为假，结果为真。                     |

## 循环控制语句

for和while

```shell
#for的用法:
for var in apple pear banana
do
echo $var
done
#例2:打印当前所有的文件
for file in `ls`
do
echo $file
done
#例3:求1-100的和
sum=0
for i in {1..100}
do
sum=$[ $sum+$i ]
done
echo "sum==[$sum]"
#如果一个文件名字为: file.xxx, 想去掉.xxx得到file可以: basename file.xxx ".xxx"使用这种方法可以获得文件名字去掉扩展名后的名字: 如: `basename test.sh .sh`

#while的用法:
#案例: 求1-10的和
sum=0
i=1
while [ $i -le 10 ]
do
sum=$[ $sum+$i ]
i=$[ $i+1 ]
done
echo "sum==[$sum]"
```

## awk

awk可以将文件拆分成若干行,根据指定的分隔符,再将每一行拆分成若干列,默认按照空格或tab进行拆分

语法格式:

```shell
awk 参数 '条件{处理动作}' 操作的文件或数据
awk 参数 '/正则表达式{处理动作}' 操作的文件或数据
#如 
awk -F ':' '{print $1}' /etc/passwd
```

指定分隔符的参数: `-F`

- `-F 分隔符`  如   `-F ':'`  按照`:`来分割
- 如果不指定分隔符, 默认是按照空格或者tab进行拆分

如何使用变量取出某一列?

- `$0` - 当前整一行
- `$1` - 拆分的第一列
- `$2` - 拆分的第二列
- `$3` - 拆分的第三列
- ...

打印某一列的值

- `print $n`

## 案例

通过参数提供进程名停止指定进程

```shell
i=0
for arg in $@
do
PNAME=$arg
PID=`ps -ef | grep $PNAME | grep -v grep | awk '{print $2}'`
if [ -n "$PID" ];then
        kill -9 $PID
        echo "杀死进程$PNAME"
else
        echo "没有找到要杀死的进程$PNAME"
fi
done
```

# linux源码安装

> **\源码安装\的安装流程:** 
>
> 1. **以下文件, 里边有安装步骤**
>    1. **readme**
>    2. **readme.md**
>    3. **INSTALL**
> 2. **找 可执行文件 `configure`**
>    1. **执行这个可执行文件**
>       1. **检测安装环境**
>       2. **生成 makefile**
> 3. **执行`make`命令**
>    1. **编译源代码**
>       1. **生成了动态库**
>       2. **静态库**
>       3. **可执行程序**
> 4. **安装 `make install` (需要管理员权限)**
>    1. **将第三步生成的动态库/动态库/可执行程序拷贝到对应的系统目录**

`configure` 脚本无法确定系统的构建类型时。解决此问题的一种方法是在 `./configure` 步骤中指定 `--build` 参数。例如，对于 arm64，您可以使用 `./configure --build=aarch64-unknown-linux-gnu`，对于 x64，您可以使用 `./configure --build=x86_64-unknown-linux-gnu`



