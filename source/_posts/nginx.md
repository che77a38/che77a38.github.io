---
title: nginx
tags: 网络
categories: 技术
mathjax: true
abbrlink: a477be03
---

# 基本介绍

> **Nginx** 是异步框架的网页服务器，也可以用作反向代理、负载平衡器和 HTTP缓存。该软件由俄罗斯程序员伊戈尔•赛索耶夫开发的开源框架,由c语言实现，并于2004年首次公开发布。2011年成立同名公司以提供支持服务。2019年3月11日，Nginx公司被F5网络公司以6.7亿美元收购。Nginx是免费的开源软件，根据类BSD许可证的条款发布。

<!-- more -->

## 作用

- web服务器

  解析http协议

- [反向代理](#正向/反向代理)服务器

  了解反向代理的概念

- 邮件服务器

  解析邮件相关的协议:pop3/smtp/imap

## 优点

> - **高并发支持**： 单机能够支持10W+的并发连接（取决于内存大小，极限能够到百万），那么在实际生产中也是非常能接近这个数字的，这主要得益于 nginx 在linux 环境下使用了 epol1 I0 多路复用模型。
>
> - **内存消耗低**： 在同类型 web 服务中，nginx 比 apache 占用的内存资源更少，在一般情况下 10K非活跃的 HTTP Keep-Alive 连接在 nginx中仅消耗 2.5M内存。
>
> - **高扩展性**： 低耦合的模块设计，并且有丰富的第三方模块支持。
>
> - **高可靠性**： 经过十几年各种复杂场景和各大公司的生产环境验证，并且 nginx 的架构是由 master 进程和worker 进程组成的，如果 worker 进程出现问题，那么 master 进程可以快速开启一个新的worker 进程提供服务。
>
>   经过大批网站检验：
>
>   - www.sina.com.cn
>   - www.xunlei.com
>   - www.163.com
>
> - **热部署**
>
>   master和worker的分离设置,可实现7*24小时不间断服务的前提下升级nginx可执行文件
>
> - **最自由的BSD许可协议**
>
>   BSD许可协议，即Berkeley Software Distribution license的简称，是由加州大学伯克利分校发布并维护的开源软件许可证[。它是自由软件中使用最广泛的许可协议之一。BSD许可协议给予使用者很大的自由，可以自由地使用、修改源代码，也可以将修改后的代码作为开源或专有软件再发布。这种许可证因此而得名，被叫做BSD许可证](https://zhuanlan.zhihu.com/p/350968635)。
>
>   BSD许可协议允许用户免费使用nginx,修改nginx源码再发布
>
>   - 淘宝:tengine

Nginx是[[网络编程#多并发服务器|异步非阻塞的事件驱动模型]]

[Nginx官方地址](http://nginx.org/)

# Nginx安装

源码安装方式如下:

[pcre官网](https://pcre.org/)    [zlib官网](https://zlib.net/)   [openssl官网](https://www.openssl.org/)

```shell
# nginx工作时候需要依赖三个库(openssl没有版本要求)
#openssl源码下载:wget https://www.openssl.org/source/openssl-1.1.1.tar.gz
#zlib源码下载:wget https://zlib.net/fossils/zlib-1.2.11.tar.gz
#pcre源码下载:wget https://github.com/PCRE2Project/pcre2/releases/download/pcre2-10.42/pcre2-10.42.tar.gz
# 三个参数为:这三个库对应的源码安装目录
# 根据自己的电脑的库安装包的位置进行指定
./configure --with-openssl=../openssl-1.0.1t --with-pcre=../pcre-8.40 --with-zlib=../zlib-1.2.11 --prefix=要安装的位置(省略的话默认安装到/usr/local/nginx/)
#返回如下表示configure没有问题
#Configuration summary
#  + using PCRE2 library: ../pcre2-10.42
#  + using OpenSSL library: /root/openssl/openssl
#  + using zlib library: ../zlib-1.2.13
make
sudo make install
#最终会将nginx安装到/usr/local/nginx/下

#上面命令中的--with-zlib和--with-pcre可以不写路径
```

> 需要安装ssl支持的话,需要`--with-http_ssl_module`

测试是否安装成功:

在浏览器中访问[部署了nginx对应的主机的ip地址],如果能看到nginx的欢迎页面表示已经安装成功

apt安装的话,已包含大量常用模块,推荐使用apt方式安装,简单快速

**nginx可执行程序路径**

```shell
/usr/local/nginx/sbin/nginx
#快速启动的方式
	#将/usr/local/nginx/sbin添加到环境变量PATH中
	#创建软链接
		ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx
```

由于nginx安装需要很多模块,源码编译比较麻烦,因此有捆绑了标准 nginx 核心、大量第三方 nginx 模块以及大部分外部依赖项的项目[OpenResty](https://github.com/openresty/openresty)

> OpenResty® 是一个基于 Nginx 和 LuaJIT 的动态网页服务器，它集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。
>
> OpenResty® 通过汇聚各类设计精良的 Nginx 模块（主要由 OpenResty 团队自主开发），从而将 Nginx 有效地变成一个强大的通用 Web 应用平台。这样，Web 开发人员和系统工程师可以使用 Lua 脚本语言调动 Nginx 支持的各种 C 以及 Lua 模块，快速构造出足以胜任 10K 以上并发连接响应的超高性能 Web 应用。
>
> OpenResty® 的目标是让你的Web服务直接跑在 Nginx 服务内部，充分利用 Nginx 的非阻塞 I/O 模型，不仅仅对 HTTP 客户端请求,甚至于对远程后端诸如 MySQL、PostgreSQL、Memcached 以及 Redis 等都进行一致且友好的非阻塞响应。
>
> OpenResty® 已经在很多知名的互联网公司（包括阿里巴巴、腾讯和新浪）和许多高流量的网站（例如 weibo.com、taobao.com 和 jd.com）中得到了广泛应用，并得到了越来越多的全球知名互联网公司的青睐。

## nginx各种默认路径

> 在nginx不手动指定各项路径的时候的默认路径详解

### Linux

**nginx在linux下各种默认目录详解**

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202311061743282.png" alt="image-20231106174312888" style="zoom: 33%;" />

```shell
/usr/local/nginx/
#下面是目录结构介绍
conf -> 存储配置文件的目录
html -> 默认存储网站(服务器)静态资源的目录[图片,html]
logs -> 存储log日志(其中error.log用于分析问题,access.log用于查看访问记录)
sbin -> 启动nginx的可执行程序
```

### Mac

**nginx在mac下下各种默认目录详解** (此时location中是`root html`)

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202311061742999.png" alt="image-20231106174235994" style="zoom: 33%;" />

mac上配置文件真正的根目录为：`/opt/homebrew/Cellar/nginx/1.25.3/`，即配置文件中的相对路径都为相对此地址

> root后面跟的如果是`.`即 `root .`,则nginx是会去`/opt/homebrew/Cellar/nginx/1.25.3/`路径下找nginx.conf文件

mac中`/opt/homebrew/Cellar/nginx/1.25.3/html/`等同于`/opt/homebrew/var/www/`，互为映射关系

像kali系统，会把`/var/www/html`映射到`/usr/local/nginx/html`

# Nginx基本命令

**启动nginx**(需要管理员权限)

```shell
#启动
sudo nginx
#重启(修改配置文件后需要执行该命令以生效)
sudo nginx -s reload
```

**关闭nginx**

```shell
#马上关闭
sudo nginx -s stop
#等nginx完成当前操作之后关闭
sudo nginx -s quit
```

查看nginx配置文件位置并且测试配置文件正确与否使用命令查看: **`nginx -t`**

查看nginx的版本： `nginx -v`

查看nginx的编译配置信息： `nginx -V`

# nginx配置

nginx的配置需要通过nginx.conf文件来配置

配置文件可以通过 `nginx -t`来查看位置

可以通过 `sudo netstat -tuln | grep 端口号`查看端口是否正确被监听中

## nginx.conf详解

配置文件的组织形式

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202306071742265.png" alt="image-20230607174201176" style="zoom:50%;" />

上图中main模块本身即为最外层,即所有`{...}`之外就是main模块

- http模块  (这个是**协议级别**)
  - server模块  (每个server模块对应一个web服务器:**服务器级别**) 
    - location模块 (用来匹配不同的URI请求，进而对请求做不同的处理和响应:**请求级别**)
- mail模块 (处理邮件相关的动作)

**[重要]常用配置项介绍**

```nginx
user  nobody;#启动之后的worker进程属于谁
#需要将nobody改为root,否则nginx操作文件时会失败,显示原因:Permission denied
worker_processes 1;#设置worker进程的个数,建议最大为cpu核数
error_log logs/error.log {日志级别};#设置错误日志路径(相对路径)和日志级别(如notice,info等)
pid logs/nginx.pid;#pid文件,记录启动的nginx进程的pid
#nginx的事件处理
events{
	use epoll; #多路IO转接模型选择epoll
	worker_connections 1024;#每个工作进程的最大连接数
}
#http模块
http{
	#省略...
	#server模块
	server{
			listen  80;#web服务器监听的端口
			server_name localhost;#服务器的域名(不能写ip地址),让客户端通过该域名访问服务器
			charset utf8;#设置字符编码
			#access_log logs/host.access.log main;#正常工作也会写访问日志,设置访问日志位置,该行注释掉表示正常工作不写访问日志.
			#location模块可以有多个
			location / { #'/'为location指令名(可以是正则表达式),location指令名不能重复
            root   html;#一个相对/usr/local/nginx/来找的路径,html为nginx默认自带的web静态资源目录,也可以设置为自己建立的目录名
            #当客户端的请求是一个目录时,通过该指令设置nginx会找一个默认显示的网页,先找index.html,找不到再找index.htm
            index  index.html index.htm;
        }
				#假设自建的静态资源目录yundisk下有个hello文件夹,当访问的url为http:xxx.xxx.xxx.xxx/hello/text.html,实际上是访问/usr/local/nginx/yundisk/hello/text.html
				location /hello/ {
						root yundisk;#此处的root表示location指令名'/hello/'的第一个'/'部分.结合这条root指令的'/hello'可以视为'/yundisk/hello/'
						#此处如果不写index的话,如果访问http:xxx.xxx.xxx.xxx/hello/会返回404
				}
			}
	}
}
```

location指令名可以是[[正则表达式|正则表达式]]

服务器要处理的指令如何**从url中提取?**

例子:`http://192.168.10.100:80/login.html`

1. 去掉协议  `http://`
2. 去掉IP/域名+端口:`192.168.10.100:80`
3. 剩下的:`/login.html`,会去`/usr/local/nginx/`下找`./login.html`

### 全局配置main段详解

```nginx
核心参数（其他参数大部分情况下用不到）

# user USERNAME [GROUP]
# 解释：指定运行nginx的worker子进程的属主和属组，其中属组可以不指定
user  nginx;

# worker_processes NUMBER | auto
# 解释：指定nginx启动的worker子进程数量
# 【*auto：自动设置为物理CPU核心数】
worker_processes  auto;

# pid DIR
# 解释：指定运行nginx的master主进程的pid文件存放路径
pid /opt/nginx/logs/nginx.pid;

# worker_rlimit_nofile NUMBER
# 解释：指定worker子进程可以打开的最大文件句柄数
# 【系统最大打开65535，每个子进程打开数乘子进程数，实际也不会超过65535】
# 这个值需要调大
worker_rlimit_nofile 20480;

# worker_rlimit_core SIZE
# 指定worker子进程异常终止后的core文件，用于记录分析问题
worker_rlimit_core 50M;
working_directory /opt/nginx/tmp;#【必须对子进程用户赋写权限】

# 解释：将每个worker子进程与CPU物理核心绑定
# 【master负责调度，worker负责处理请求】
# 【假设CPU有4个核心，某一时刻worker1获取到了CPU1的工作调度时间片，时间片过后worker1从CPU1上面撤下来，CPU1去处理其他事件，下一时刻可能是CPU2、CPU3的时间片调度到了worker1上面，那么worker1就会在其他CPU上面工作，进程与CPU的调度切换是有损耗的，worker1如果绑定了CPU1，worker1将永远等待CPU1的调度，充分利用CPU缓存】
# 【【主要作用：将每个worker子进程与特定CPU物理核心绑定，优势在于：避免同一个worker子进程在不同的CPU核心上切换，缓存失效，降低性能；其并不能真正避免进程切换（进程切换是CPU工作特性）】】
# -- worker_cpu_affinity 00000001 00000010 00000100 00001000 00010000 00100000 01000000 10000000;# 8核心，8个worker
# -- worker_cpu_affinity 01 10 01 10;# 2核心，4个worker
worker_cpu_affinity 0001 0010 0100 1000;# 4核心，4个worker

# 解释：指定worker子进程的nice值，以调整运行nginx的优先级，通常设定为“负值”，以优先调用nginx
# 【Linux默认进程的优先级值是120，值越小越优先；nice设定范围为-20到+19】
# 【对Linux来说，优先级值则是100到139】
worker_priority -20;

# 指定worker子进程优雅退出时的超时时间，不管5秒内是否处理完，都强制退出
worker_shutdown_timeout 5s;

# worker子进程内部使用的计时器精度，调整时间间隔越大，系统调用越少，有利于性能提升；反之，系统调用越多，性能下降
# 比如某些计时的操作，worker需要去获取内核时间，频繁跟内核打交道会降低性能
timer_resolution 100ms;

# daemon on | off
# 设定nginx的运行方式，前台还是后台，前台用户调试，后台用于生产
daemon on;

# 负载均衡互斥锁文件存放路径
lock_file logs/nginx.lock;
#负载均衡器是将网络流量分发到多个服务器的设备。负载均衡器可以确保流量均匀分布在多个服务器之间，从而提高性能和可靠性。负载均衡互斥锁文件用于确保一次只有一个进程正在访问负载均衡器。这可以防止冲突并确保负载均衡器正常运行。
```

### events段

```nginx
events {
    # Nginx使用何种事件驱动模型,一般不指定这个参数
    # use epoll;
    
    # worker子进程能够处理的最大并发连接数，多核情况最大其实达不到65535，
    worker_connections  65535;
    
    # 是否打开负载均衡互斥锁，默认off（当master接收到请求时，会给每个worker发送消息去唤醒，状态为on时，则会有一个负载均衡锁，master会轮流发给每一个）
    accept_mutex on;
    
    # 新连接分配给worker子进程的超时时间，默认500ms，超时后会转给下一个worker处理请求
    accept_mutex_delay 100ms;
    
    # worker子进程可以接收的新连接个数(这个参数对性能影响不太大)
    multi_accept on;
}
```

### http段

#### server段

```nginx
server {
 listen 80;
    server_name www.test.com; 
    location /picture {
     root /opt/nginx/html/picture;
        # 客户端请求 www.test.com/picture/1.jpg；
        # 对应磁盘映射路径为：/opt/nginx/html/picture/picture/1.jpg
        
 }
 location /picture {
     alias /opt/nginx/html/picture/;
        # 客户端请求 www.test.com/picture/1.jpg；
        # 对应磁盘映射路径为：/opt/nginx/html/picture/1.jpg
        # 【末尾一定要加/】
 }
}
```

| root与alias的区别 | root                       | alias                       |
| :---------------- | :------------------------- | :-------------------------- |
| 语法              | root path                  | alias path                  |
| 上下文            | http, server, location, if | location                    |
| 区别              | 将定义路径与URI叠加        | 只取定义路径，末尾一定要加/ |

##### server_name的匹配规则

```nginx
# 精确匹配，优先级最高，1
server_name www.test.com;

# 左通配，优先级2
server_name *.test.com;

# 右通配，优先级3
server_name www.test.*;

# 正则通配，优先级最低，4
server_name ~^w\.test\..*$;

# 多个
server_name www.test.com *.test.com www.test.* ~^w\.test\..*$;
```

##### location段

| 匹配规则 | 含义                         | 示例                       | 优先级（1最高） |
| :------- | :--------------------------- | :------------------------- | :-------------- |
| =        | 精确匹配                     | `location = /pic/`         | 1               |
| ^~       | 匹配到即停止搜索             | `location ^~ /pic/`        | 2               |
| ~        | 正则匹配，区分大小写         | `location ~ \.(Jpg|gif)#`  | 3               |
| ~*       | 正则匹配，不区分大小写       | `location ~* \.(Jpg|gif)$` | 3               |
| !~       | 表示区分大小写不匹配的正则   |                            | 3               |
| !~*      | 表示不区分大小写不匹配的正则 |                            | 3               |
| 无符号   | 通用匹配,任何请求都会匹配到  | `location /`               | 4               |
| @        | 内部跳转                     | `location @errorpage`      |                 |

查找顺序和优先级

1. 带有“=”的精确匹配优先
2. 没有修饰符的精确匹配
3. 正则表达式按照他们在配置文件中定义的顺序
4. 带有"^~"修饰符的，开头匹配
5. 带有"~"或"~*"修饰符的，如果正则表达式与URI匹配
6. 没有修饰符的，如果指定字符串与URI开头匹配

| location末尾带与不带/的区别 |                 |                                            |
| :-------------------------- | :-------------- | :----------------------------------------- |
| 不带/                       | location /test  | 尝试把test当成目录，如果找不到则找test文件 |
| 带/                         | location /test/ | 将test作为目录，如果不存在则直接返回404    |

```nginx
# 测试样例
location ~ /test/8005/t/$ {
  return 200 'first regular expressions match!';
}
location ~* /test/8005/t/(\w+)$ {
  return 200 'longest regular expressions match!';
}
location ^~ /test/8005/t/ {
  return 200 'stop regular expressions match!';
}
location /test/8005/t/Test2 {
  return 200 'longest prefix string match!';
}
location /test/8005/t {
  return 200 'prefix string match!';
}
location = /test/8005/t {
  return 200 'exact match!';
}
```

###### 监控模块

主要用于监控各种连接数

> 需要模块--with-http_stub_status_module

```nginx
location /status {
 # 监控模块
    stub_status;
}
# ------页面结果------
Active connections: 2 
server accepts handled requests
 16 16 26 
Reading: 0 Writing: 1 Waiting: 1 
```

页面结果解释:

| 状态项             | 含义                                                         |
| :----------------- | :----------------------------------------------------------- |
| Active connections | 当前客户端与Nginx间的TCP连接数，等于下面Reading、Writing、Waiting数量之和 |
| accepts            | 自Nginx启动起，与客户端建立过的连接总数                      |
| handled            | 自Nginx启动起，处理过的客户端连接总数。如果没有超出worker_connections配置，该值与accepts相同 |
| requests           | 自Nginx启动起，处理过的客户端请求总数。由于存在HTTP Keep-Alive请求，故requests值会大于handled值 |
| Reading            | 正在读取HTTP请求头部的连接总数                               |
| Writing            | 正在向客户端发送响应数据的连接总数                           |
| Waiting            | 当前空闲的HTTP Keep-Alive连接总数                            |

| 内嵌变量             |                        |
| :------------------- | :--------------------- |
| 变量名               | 含义                   |
| $connections_active  | 同Active connections值 |
| $connections_reading | 同Reading值            |
| $connections_writing | 同Writing值            |
| $connections_waiting | 同waiting值            |

# nginx语法

## nginx模块语法指令

### --with-http_rewrite_module

#### rewrite/return指令

由此模块提供支持: `ngx_http_rewrite_module`

- **rewrite**
  - 根据指定正则表达式匹配规则，重写URL(其实就是重定向)
- **return**
  - 停止处理请求，直接返回响应码或重定向到其他URL
  - 执行return指令后，location中后续指令将不会被执行

##### rewrite

> Rewrite主要实现**url地址重写**，以及**重定向**，就是把传入web的请求重定向到其他url的过程。Nginx 的 Rewrite 规则采用 PCRE Perl 兼容正则表达式的语法进行规则匹配，如相使用 Nginx 的 Rewrite 功能，在编译 Nginx 前要编译安装 PCRE 库

上下文：`server, location, if`

**[格式]** `rewrite regex replacement [flag]`

- `regex`：用来匹配URI的正则表达式。

- `replacement`：正则匹配成功后，用来替换URI的字符串。如果该字符串以`http://`、`https://`或`$scheme`开头，则处理将停止，并重定向URI到客户端。

- `flag`：是一个可选参数，其有4个候选值。

  - `last`: 重写后的url发起新请求，再次进入server段，重试location中的匹配(默认为last)

  - `break`: 直接使用重写后的url，不再匹配其他location中的语句

  - `redirect`: 返回302临时重定向

  - `permanent`: 返回301永久重定向


> 在以上的flag标记中，last和break用来实现URL重写，浏览器地址栏的URL地址不变，但在服务器访问的程序及路径发生了变化。redirect和permanent用来实现URL跳转，浏览器地址会显示跳转后的URL地址。
>
> last和break标记的实现功能类似，但二者之间有细微的差别，使用alias指令时必须用last标记，使用proxy_pass指令时要使用break标记

例子: `rewrite ^/(.*) http://www.cjzzc.com/$1 permanent;` 

在上述指令中，rewrite为固定关键字，表示开启一条rewrite匹配规则，regex部分是`^/(.*)`，这是一个正则表达式，表示匹配所有，匹配成功后跳转到`http://www.cjzzc.com/$1`。这里的$1是取前面regex部分括号里的内容结尾的permanent；是永久301重定向标记，即跳转到后面的`http://www.cjzzc.com/$1`地址上。

##### return

上下文：`server, location, if`

该指令可以停止处理并指定的响应码返回给前端。既可以返回文本，也可以重定向URL。

- `return code [text];`
  - text：响应体内容（如果code是200）
  - 例:`return 200 "return 200 HTTP Code";`
- `return code URL;`
  - URL：重定向
  - 例:`return 302 /test;`
- `return URL;`
  - URL:直接跟URL的话必须是http/https开头的完整路径

###### 使用案例


```nginx
location / {
    return http://localhost:8000/test;
}

location /test {
    index test.html;
}

location /search {
    rewrite /(.*) https://www.baidu.com permanent;
}

location /test1 {
    # 继续匹配location，
    rewrite /images/(.*) /test2/$1 last;
    return 200 "return 200 in /test1";
}

location /test2 {
    # 不会再匹配，直接找test3下面的文件
    rewrite /pics/(.*) /test3/$1 break;
    return 200 "return 200 in /test2";
}

location /test3 {
    # 请求：/test3/index.html,
    # 结果：直接返回"return 200 in /test3"，不会再去找index.html文件
    return 200 "return 200 in /test3";
}

location /test4/ {
    if ( $remote_addr = "192.168.1.1" ) {
        return 200 "test if OK in URL /test4/";
    } 
}

location /test5 {
    if ( $uri = "/images/" ) {
        rewrite (.*) /test2/ break;
    }
    # 执行了上面rewrite后，这里的return还会执行，通常不会联合一起写
    return 200 "test5 if failed\n";
}
```

##### set指令

由此模块提供支持: `ngx_http_rewrite_module`

**用于定义一个变量**

上下文:`server，location，if`

格式: `set $variable value`

- `$variable`：为变量的名称，可以看到变量的名称以`$`符号开头，且不要与nginx预设的全局变量名相同。
- `value`：为变量的值，可以是字符串、其他变量或者两者的组合。

如:`set $url $scheme://$host:$server_port$request_uri;`

$url为客户端发起的完整url

##### if指令

由此模块提供支持: `ngx_http_rewrite_module`

上下文: `server，location`

格式: `if (condition) { ... }` (**`if`和`(`之间有一个空格。**)

条件表达式condition的形式

- 变量名，如果变量的值为空字符串或"0"，则为false，其他条件为true。
- 使用"="和"!="比较变量和字符串是否相等，满足条件则为true，否则为false。
- 判断文件是否存在：`-f`和`!-f`
- 判断目录是否存在: `-d`和`!-d`
- 使用正则表达式与变量的值进行匹配。变量与正则表达式之间使用`~`、`~*`、`!~`、`!~*`，如果正则表达式包含`}`或`;`，则整个表达式应该用单引号或双引号括起来。

```nginx
~                     正则匹配 (区分大小写)
~*                     正则匹配 (不区分大小写)
!~                  正则不匹配 (区分大小写)
!~*                    正则不匹配  (不区分大小写)
-f 和!-f             用来判断是否存在文件
-d 和!-d             用来判断是否存在目录
-e 和!-e             用来判断是否存在文件或目录
-x 和!-x             用来判断文件是否可执行
```

在匹配过程中可以引用一些[Nginx的全局变量](#nginx变量)

### --with-http_map_module

#### map指令

```nginx
map $request_uri $real {
    "~^/(.*)"   /$1;
    default     $request_uri;
}
```

## nginx核心指令

### root/alias指令

```nginx
location /img/ {
    alias /var/www/image/;
}
#若按照上述配置的话，则访问/img/目录里面的文件时，ningx会自动去/var/www/image/目录找文件
location /img/ {
    root /var/www/image;
}
#若按照这种配置的话，则访问/img/目录下的文件时，nginx会去/var/www/image/img/目录下找文件。]
```

- `alias` 是一个目录别名的定义，
- `root` 则是最上层目录的定义。

还有一个重要的区别是alias后面必须要用“/”结束，否则会找不到文件的,而root则可有可无 

### break指令

上下文: `server, location, if;`

格式: `break;`

在同一作用域中，中断该指令之后的其他指令，位于其前面的指令配置生效，位于其后面的指令配置则无效。

## nginx变量

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202312041044051.png)

![img](https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202312041045644.png)更详细的看下方

### TCP连接相关变量

```nginx
 #客户端地址，例如192.168.1.1
 remote_addr     
 
 #客户端端口，例如58473
 remote_port     
 
 #客户端地址的整型格式
 binary_remote_addr   
 
 #已处理连接，是一个递增的序号
 connection     
 
 #当前连接上执行的请求数，对于keepalive连接有意义
 connection_request   
 
 #如果使用proxy_protocol协议，则返回原始用户的地址，否则为空
 proxy_protocol_addr   
 
 #如果使用proxy_protocol协议，则返回原始用户的端口，否则为空
 proxy_protocol_port   
 
 #服务器地址，例如192.168.184.240
 server_addr     
 
 #服务器端口,例如80
 server_port     
 
 #服务端协议，例如HTTP/1.1
 server_protocol  
```

### HTTP请求相关变量 

```nginx
 #请求包体头部长度
 conten_length    
 
 #请求包体类型
 content_type    
 
 #URL中某个参数
 arg_参数名     
 
 #所有URL参数
 args      
 
 #URL中有参数，则返回?；否则返回空
 is_args      
 
 #与args完全相同
 query_string    
 
 #请求的URL，不包含参数
 uri       
 
 #请求的URL，包含参数
 request_uri     
 
 #协议名，http或者https
 scheme      
 
 #请求的方法，GET、HEAD、POST等
 request_method    
 
 #所有请求内容的大小，包含请求行，头部，请求体
 request_length    
 
 #由HTTP Basic Authentication协议传入的用户名
 remote_user     
 
 #客户端请求主体信息的临时文件名
 request_body_file   
 
 #包含请求的主要信息，在使用proxy_pass或fastcgi_pass指令的location中比较有意义
 request_body 

 #先看请求行，再看请求头，最后找server_name
 host

 #用户浏览器标识
 http_user_agent

 #从哪些链接过来的请求
 http_referer

 #经过一层代表服务器，添加对应代理服务器的信息
 http_via

 #获取用户真实IP
 http_x_forwarded_for

 #用户cookie
 http_cookie
```

### Nginx处理请求时相关变量     

```nginx
 #请求处理到现在所耗费的时间，单位为秒，例如0.03代表30毫秒
 request_time    
 
 #请求处理完成，则返回OK，否则为空
 request_completion   
 
 #16进制显示的请求id，随机生成的
 request_id     
 
 #匹配上请求的server_name值
 server_name     
 
 #若开启https，则值为on,否则为空
 https      
 
 #待访问文件的完整路径
 request_filename   
 
 #由URI和root/alias规则生成的文件夹路径
 document_root    
 
 #将document_root中的软链接换成真实路径
 realpath_root    
 
 #返回响应时的速度上限值
 limit_rate     
```

### Nginx返回响应时相关变量

```nginx
 #响应体中真实内容的大小 
 body_bytes_sent    
 
 #全部响应体大小
 body_sent     
 
 #HTTP返回状态码
 status      
```

### 系统变量

```nginx
 #nginx系统版本
 nginx_version

 #服务器时间
 time_local
```

## 时间空间单位

### 时间单位

- ms：毫秒
- s：秒
- m：分钟
- h：小时
- d：天
- w：周
- M：月
- y：年

### 空间单位

- k/K：KB
- m/M：MB
- g/G：GB

# nginx实用场景

## 虚拟主机

```nginx
server {
    # 1: 基于多ip的虚拟主机：listen监听不同网卡的ip，端口可相同
    listen 8000;
    server_name 172.17.1.1;
    
    listen 8000;
    server_name 172.17.1.2;
    
    # 2: 基于多端口的虚拟主机(局域网常用)：listen监听不同端口
    listen 8001;
    server_name localhost;
    
    listen 8002;
    server_name localhost;
    
    #3: 基于域名的虚拟主机(公网最常用)：端口可相同，server_name为不同域名
    listen 8003;
    server_name www.test1.com;
    
    listen 8003;
    server_name www.test2.com;
}
```

## 静态站点

> 为了加快网站解析速度，可以将动态资源交给后端服务器，纯前端的静态页面放在系统目录下，交给Nginx来解析。

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202311071751738.png" alt="image-20231107175136906" style="zoom:33%;" />

```nginx
server {
    listen 80;
    server_name localhost;
    
    location / {
          root   /opt/nginx/html;
          index  index.html index.htm;
      }
}
```

### 反向代理

[[网络编程#反向代理|了解反向代理]]

> 反向代理是用户客户端访问代理服务器后，被反向代理服务器按照一定的规则从一个或多个被代理服务器中获取响应资源并返回给客户端的代理模式，客户端只知道代理服务器的 IP，并不知道后端服务器的 IP，原因是代理服务器隐藏了被代理服务器的信息。

![image-20231107175434006](https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202311071754917.png)

nginx反向代理可以

- 七层反向代理(应用层)
- 四层反向代理(TCP/UDP代理)

#### 七层反向代理

在配置文件nginx.conf中的http段中，写入如下格式的配置，即可将本地8088端口代理到百度：

```nginx
server {
    listen       8088;
    server_name  localhost;
    
    location / {
        proxy_pass   https://www.baidu.com;
    }
}
```

**使用nginx做反向代理以支持cors跨域请求访问**

[相关参考](https://blog.csdn.net/Lv_Victor/article/details/113417960)

[超详细解释](https://mp.weixin.qq.com/s/HpO683eTzyFYjujR2qv_HQ)

```nginx
location / {
                resolver 8.8.8.8;  # 设置DNS解析器
# 拆解请求目标
                        set $target "";
                if ($request_uri ~ "^/([^/].*)$") {
                        set $target $1;
                }
# 设置代理转发
                proxy_pass $target;
# 设置CORS头信息
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
                add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
# 处理OPTIONS请求
                if ($request_method = 'OPTIONS') {
                            return 200;
                }
        }
```

**作用为**: 当访问`https://xxx.xxx.xxx.xxx:xxxx/https://www.github.com`的时候访问的实际上是`https://www.github.com`的资源,解决了跨域问题

#### 四层反向代理

> Nginx除了可以代理HTTP七层流量，还可以代理 TCP/UDP 四层流量，需要使用核心模块 **stream**,手动编译的话需要在编译配置时增加`--with-stream`参数进行编译。

配置文件如下（需写在[main段](#nginx.conf详解)中）：

```nginx
stream {
    server {
        listen 3306;
        # 访问本机的3306，就被转发到了远程的3306
        proxy_pass 172.17.0.1:3306;
    }
}
```

## 负载均衡

> 当出现高并发大流量的业务场景时，单台后端服务器已无法支撑业务正常运行，需要将请求流量按照一定规则分发到多台服务节点上，即使某个节点宕机，系统依然能够对外正常提供服务，以此来提高系统的性能和稳定性。

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202311071811827.png" alt="image-20231107181143583" style="zoom: 33%;" />

 支持的协议如下:

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202311071826427.png" alt="640" style="zoom:67%;" />

### upstream模块

用于定义上游模块

upstream及其下层指令说明

| 指令               | 含义                                                         |
| :----------------- | :----------------------------------------------------------- |
| upstream           | 段名，中间定义上游服务url                                    |
| server             | 定义上游服务地址                                             |
| zone               | 定义共享内存，用于跨worker子进程共享数据                     |
| keepalive          | 对上游服务启用长连接，每个worker子进程与上游服务器***空闲长连接***的最大数量（keepalive 16；当同时有5000个请求过来，处理完毕后，会保留16个连接，其他全部关闭） |
| keepalive_requests | 一个长连接可以处理的最多请求个数                             |
| keepalive_timeout  | 空闲情况下，一个长连接的超时时长，超过后会销毁长连接         |
| hash               | 负载均衡算法：哈希                                           |
| ip_hash            | 负载均衡算法：依据ip进行哈希计算                             |
| least_conn         | 负载均衡算法：最少连接数                                     |
| least_time         | 负载均衡算法：最短响应时间                                   |
| random             | 负载均衡算法：随机                                           |

**server模块**

| 参数              | 含义                                                         |
| :---------------- | :----------------------------------------------------------- |
| weight=number     | 权重值，默认为1                                              |
| max_conns=number  | 上游服务器的最大并发连接数                                   |
| fail_timeout=time | 服务器不可用的判定时间（10s内不可用次数达3次，则在这10s内不会再转发给后端，超过10后依然还是会转发过去） |
| max_fails=number  | 服务器不可用的检查次数                                       |
| backup            | 备份服务器，仅当其他服务器都不可用时                         |
| down              | 标记服务器长期不可用，离线维护                               |

### 负载均衡算法

#### 轮询(默认)

每个请求按时间顺序逐一分配到不同的后端服务器

```nginx
upstream backend {
    # 默认所有服务器权重为 1
    server 192.168.1.1:8080;
    server 192.168.1.2:8080;
    server 192.168.1.3:8080;
}
```

##### 加权轮询

指定轮询概率，用于后端服务器性能不均的情况

```nginx
upstream backend {
    server 192.168.1.1:8080 weight=3;
    server 192.168.1.2:8080 weight=2;
    # default weight=1
    server 192.168.1.3:8080;  
}
```

##### 实际案例

```nginx
#server模块,代理几台服务器就需要几个server模块,同时也需要几个代理模块upstream
server {
	listen 80;#客户端访问反向代理服务器,反向代理服务器监听的端口
	server_name localhost;#客户端访问反向代理服务器的域名.当需要反向代理多个服务器的时候,需要不同的域名以区分
	location / {
		#反向代理服务器转发指令(指定转发地址,http:// 固定的头,名字自己定,与下面的代理模块需要一一对应)
		proxy_pass http://robin.test.com;#proxy_pass与root指令一致,只替代location名中的'/'符号
	}
}
#添加一个代理模块upstream
upstream robin.test.com{#该网址需要与上面proxy_pass后面接的网址对应
	server 192.168.247.135:80;#http://robin.test.com的真实ip地址与端口.此server指令可以有多个以实现负载均衡,不设置权重的情况下为轮询.
	#设置权重的格式:
	#server ip:端口 weight=1;#表示设置访问该ip的权重为1.
}
```

关于上面[nginx实现负载均衡的加权轮询算法(WeightedRound-Robin)详解,点击跳转](https://blog.csdn.net/qq_27937043/article/details/80372599)

#### 哈希-hash

> - 哈希算法是将任意长度的二进制值映射为较短的固定长度的二进制值，这个小的二进制值叫哈希值，映射不可逆。
> - `hash $request_uri`：根据这个变量的哈希值来负载
> - **相同统一资源标识符(Uniform Resource Identifier)的请求将始终被路由到相同的后端服务器**

```nginx
upstream backend {
    hash $request_uri;
    server 192.168.1.1:8080;
    server 192.168.1.2:8080;
    server 192.168.1.3:8080; 
}
```

##### ip_hash

> 每个请求按访问ip的hash结果分配，这样**每个访客固定访问一个后端服务器**，是session共享问题的解决方案之一

```nginx
upstream backend {
    ip_hash;
    server 192.168.1.1:8080;
    server 192.168.1.2:8080;
    server 192.168.1.3:8080; 
}
```

#### 最少连接数算法

- > - **从上游服务器挑选一台当前已建立连接数最少的分配请求**
  > - 极端情况下会退化为轮询算法
  > - `least_conn`：
  >   - 多个worker子进程同时处理请求时，无法共享后端服务器的连接数状态，此时需要开辟共享内存空间，用来在多个worker子进程中共享信息
  >   - zone zone_name 1M，指定开辟共享内存的大小

```nginx
upstream backend {
    least_conn;
    server 192.168.1.1:8080;
    server 192.168.1.2:8080;
    server 192.168.1.3:8080; 
}
```

#### 对上游服务器返回异常时的处理

主要有这三个关键词可以设置

- [proxy_next_upstream](#proxy_next_upstream)
- [proxy_next_upstream_timeout](#proxy_next_upstream_timeout)
- [proxy_next_upstream_tries](#proxy_next_upstream_tries)

##### proxy_next_upstream

含义是:**proxy_next_upstream配置的这些情况下执行失败转发**,如果不配置proxy_next_upstream,当遇到上游返回http错误码时,nginx会直接返回给客户端.

语法：  `proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504 http_403 http_404 http_429 non_idempotent off;`

默认值：`proxy_next_upstream error timeout`

上下文：http, server, location

| 可选参数                               | 含义                                                         |
| :------------------------------------- | :----------------------------------------------------------- |
| error                                  | 向后端服务器传输请求，或读取响应头**「出错」**时（服务器宕机会转发到下一台） |
| timeout                                | 向后端服务器传输请求，或读取响应头**「超时」**时（`proxy_read_timeout`设置的时间内没有接收完响应体，则会转发到下一台服务器；但是服务器宕机的话会返回502，不会转发下一台） |
| invalid_header                         | 后端返回无效的响应时                                         |
| http_500、502、503、504、403、404、429 | http响应状态为xxx时                                          |
| non_idempotent                         | 非幂等请求失败时，是否需要转发下一台后端服务器（不设置就是不转发，如post请求时，如果命中404，则会直接返回404。对于写操作最好不要轻易设置） |
| off                                    | 禁用请求失败转发功能                                         |

**案例**

```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type text/plain;
    sendfile        on;
    keepalive_timeout  65;

    upstream upstream_test{
            server 127.0.0.1:8001;
            server 127.0.0.1:8002;
            server 127.0.0.1:8003;
    }

    server {
        listen       8080;
        server_name  localhost;
        location /test {
            proxy_pass http://upstream_test/test;
	    proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504 http_403 http_404 http_429; 
        }
    }
    
     server {
        listen       8001;
        server_name  localhost;
        location / {
            return 404 "html_8001";
        }
    }

    server {
        listen       8002;
        server_name  localhost;
        location / {
            return 200 "html_8002";
        }
    }
    
    server {
        listen       8003;
        server_name  localhost;
        location / {
            return 500 "html_8003";
        }
    }
}
```

上面的案例中:如果访问`localhost:8080/test`,会因为负载均衡访问上游服务器`localhost:8001`,`localhost:8002`,`localhost:8003`其中一个,但是由于设置了`proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504 http_403 http_404 http_429;` 即设置的上述情况不会走负载均衡的转发,因此访问`localhost:8080/test`始终会在多次转发下最终访问的是`localhost:8002`

##### proxy_next_upstream_timeout

含义:**超过该时间不再尝试失败转发**

语法：  `proxy_next_upstream_timeout time`

默认值：`proxy_next_upstream_timeout 0` 

> 含义为:如果nginx在向上游服务器发送请求时，如果连接超时时间超过了0，nginx将不会尝试将请求转发到下一个上游服务器，而是**立即返回一个失败响应**（通常是502 Bad Gateway）给客户端

上下文：http, server, location

##### proxy_next_upstream_tries

含义:设置最大尝试**转发次数**,超过转发次数依旧失败则错误码直接返回给客户端

语法：  `proxy_next_upstream_tries number`

默认值：`proxy_next_upstream_tries  0` (一直转发)

上下文：http, server, location

##### 异常处理样例

```nginx
upstream backend {
    zone upstream_backend 64k;
    server 127.0.0.1:8080 weight=2 max_conns=1000 fail_timeout=10s max_fails=5;
    server test.nginx.com weight=1;
    
    keepalive 16;
    keepalive_requests 100;
    keepalive_timeout 30s;
}

server {
    location /test {
        proxy_pass http://backend/test;
        # 如果不配置proxy_next_upstream，当遇到上游返回http错误状态码时，nginx会直接返回给客户端
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504 http_403 http_404 http_429; 
    }
}
```

## HTTPS加密传输

> HTTPS 通过加密通道保护客户端与服务端之间的数据传输，已成为当前网站部署的必选配置。在部署有 Nginx 代理集群的 HTTPS 站点，通常会把 SSL 证书部署在 Nginx 的服务器上，然后把请求代理到后端的上游服务器。这种部署方式由 Nginx 服务器负责 SSL 请求的运算，相对减轻了后端上游服务器的 CPU 运算量。

### 生成自签名HTTPS证书

```shell
# 配置https签名证书
  # 1、创建https证书存放目录：
  cd /usr/local/nginx/conf/
  mkdir ssl
  cd ssl
  # 2、创建私钥：
  openssl genrsa -des3 -out https.key 2048
  #这样创建私钥可以直接带上密码
  openssl genrsa -des3 -passout pass:your_password -out https.key 2048
  # 3、创建签名请求证书：
  openssl req -new -key https.key -out https.csr
  #您即将被要求输入一些信息，这些信息将被包含在您的证书请求中。这些信息通常用于标识和识别您的身份。这些信息被称为Distinguished Name（简称DN），它包含了一些字段。
#在输入DN时，您可以留下某些字段为空白，如果您不想提供相关信息。对于某些字段，系统可能会有默认值，如果您想使用默认值，可以直接按下回车键。如果您想保持某个字段为空白，可以输入句点（.）。
#根据您的需求和证书颁发机构的要求，您可以根据提示逐个输入相关信息，例如国家/地区、组织名称、单位名称、常用名等。请确保提供准确的信息，因为这些信息将在您的证书中显示并用于识别您的身份。
  # 4、在加载SSL支持的Nginx并使用上述私钥时除去必须的口令：
  cp https.key https.key.org
  openssl rsa -in https.key.org -out https.key
  # 5、最后标记证书使用上述私钥和CSR和有效期：
  openssl x509 -req -days 365 -in https.csr -signkey https.key -out https.crt
```

> 这种自签名的SSL证书只能提供数据加密的功能，无法提供身份验证。这意味着，虽然数据传输是加密的，但用户无法确认他们正在与预期的服务器进行通信，而不是与中间人攻击者进行通信。此外，自签名证书在用户的浏览器中通常会显示**警告**，这可能会影响用户对网站的信任度。
>
> 而购买SSL证书，尤其是从知名的证书颁发机构购买，可以提供更全面的保护。这些证书不仅提供数据加密，还经过了严格的身份验证过程，可以证明网站的身份是真实的。此外，这些证书会被用户的浏览器所信任，不会显示任何警告。
>
> 总的来说，如果你的网站需要处理敏感信息，如用户登录凭据、信用卡信息等，那么购买SSL证书是非常必要的。如果你的网站只是提供一些公开的、非敏感的信息，那么使用自签名的SSL证书或许就足够了。但无论如何，使用SSL证书（无论是购买的还是自签名的）总比完全不使用SSL证书要安全得多

### nginx.conf配置

```nginx
server {
    listen       443 ssl;
    server_name  localhost;

    # 证书部分
    ssl_certificate     /usr/local/nginx/conf/ssl/https.crt; #RSA证书
    ssl_certificate_key  /usr/local/nginx/conf/ssl/https.key; #RSA密钥
    
    # TLS 握手优化
    # 会话缓存的存储大小为1MB
    ssl_session_cache    shared:SSL:1m;
    # 会话缓存的超时时间为5分钟
    ssl_session_timeout  5m;
    keepalive_timeout    75s;
    keepalive_requests   100;
    location / {
        root   html;
        index  index.html index.htm;
    }
}
```

nginx如果未开启SSL模块,配置https后`nginx -t`会提示错误:`[emerg] the "ssl" parameter requires ngx_http_ssl_module in /usr/local/nginx`

`apt` 默认安装的 Nginx 包通常不包含 `--with-http_ssl_module` 选项,即不包含ssl模块。可用下面命令查看配置的模块

nginx -V:

`--with-openssl=/root/openssl/openssl --with-pcre=../pcre2-10.42 --with-zlib=../zlib-1.2.13`

[报该错误的解决方案](https://blog.csdn.net/guo_qiangqiang/article/details/95622649)

## 文件服务器

要归档一些数据或资料，那么文件服务器必不可少。使用 Nginx 可以非常快速便捷的搭建一个**简易的文件服务**。

### nginx.conf配置

```nginx
server {
    listen 8004;
    server_name localhost;
    
    # 正常显示中文，windows服务器下中文目录无法下钻，目前无解
    charset gbk,utf-8;

    # 打开autoindex功能，以/结尾的请求:可以将root指向的目录作为一个列表来显示到页面上
    autoindex on;
    
    # 显示文件的大小，
    # on：以字节显示
    # off：人性化显示，文件过大会显示为mb或gb
    autoindex_exact_size off;
    
    # 以哪种格式返回：html | xml | json | jsonp
    # 默认值：autoindex_format html
    autoindex_format html;
    
    # 显示时间格式
    # on: 12-Jul-2019 10:11（当前时区）
    # off: 12-Jul-2019 02:11(0时区，GMT)
    autoindex_localtime on;

    location / {
        root /data/files/;
        # 如果a.html文件存在，则会返回a.html内容，否则才会返回目录内容
        index a.html;
    } 
}
```

**注意点**

按照上述配置配置好后,访问网址会出现403错误,查看error.log会发现是权限不足问题,使用`ps aux | grep nginx`会发现 master进程是root权限,而worker进程是`nobody`权限

> `nobody`是nginx工作进程的运行用户。Nginx通常会使用非特权用户运行工作进程，以增加安全性。"nobody"是一个常见的非特权用户，用于执行网络服务进程。它通常具有较低的权限，只能访问必要的系统资源，以减少潜在的安全风险。因此，作为文件服务器不具备权限访问文件资源,因此会返回403错误.

nginx.conf中添加`user root wheel；`可以解决问题,此后,worker进程也将会获得root权限.

> 在`user root wheel；`中,wheel是通过`id root`指令查看root的用户组为wheel

虽然这种方法可以解决权限不足问题,但有安全隐患,最好还是用别的用户    [[linux基础以及系统编程#用户权限,用户和用户组相关命令|查看linux权限相关命令]]

## 限速

**limit_rate**

> 定义响应数据的传输速度，bytes/s
>
> 本指令属于ngx_http_core_module，不属于ngx_http_limit_conn_module

```nginx
location /rate {
 # 定义响应数据的传输速度，默认bytes/s
    limit_rate 20;

    # 这些是Nginx处理请求时相关变量，加大返回数据量更好地看到限速效果
 return 200 'request_time  $request_time
request_id   $request_id
server_name   $server_name
request_filename $request_filename
document_root  $document_root
realpath_root  $realpath_root
request_completion $request_completion
';
}
```

## 限流

- [limit_conn](#limit_conn)     限制客户端并发连接数
  - [limit_conn_zone](#limit_conn_zone)
  - [limit_conn_status](#limit_conn_status)
- [limit_req](#limit_req)       限制客户端处理请求的平均速率
  - [limit_req_zone](#limit_req_zone)
  - [limit_req_status](#limit_req_status)

### limit_conn

- 用于**限制客户端的并发连接数**
- 使用共享内存，对所有的worker子进程生效（需要保存客户端连接数）

**[格式] `limit_conn zone number`**

- `zone`：用limit_conn_zone中定义的zone名称
- `number`：以zone为标识的客户端被允许的同时最大连接数

上下文:http,server,location

**案例**: `limit_conn limit_addr 1`

#### limit_conn_zone

**[格式] `limit_conn_zone key zone=name:size`**

上下文：http

- `key`：用于定义客户端的唯一标识来限速，如
  - `$binary_remote_addr` 使用4个字节空间，高效
  - `$remote_addr` 使用7-15个字节空间
- `name`：给zone取的任意名称
- `size`：共享内存大小空间，m为单位

**案例**:`limit_conn_zone $binary_remote_addr zone=limit_addr:10m;`

#### limit_conn_status

**[格式] `limit_conn_status 触发限速后返回的状态码`**

上下文:http,server,location

**案例**: limit_conn_status 503

### limit_req

- 用于限制客户端处理请求的**「平均速率」**
- 使用共享内存，对所有的worker子进程生效
- 限流算法：**「leaky_bucket」**（漏桶）
  - 暂时拦截住上方水的向下流动，等待桶中的一部分水漏走后，再放行上方水。
  - 溢出的上方水直接抛弃。


**[格式] `limit_req zone=name [burst=number] [nodelay | delay=number];`**

上下文：http, server, location

- `burst`：桶大小,设置一个大小为x的缓冲区,当有大量请求（爆发）过来时，超过了访问频次限制的请求可以先放到这个缓冲区内等待，但是这个等待区里的位置只有5个，超过的请求会直接报`limit_req_status设置的状态码`的错误然后返回。
- `nodelay`：如果设置，会在瞬时提供处理(burst + rate)个请求的能力，请求超过（burst + rate）的时候就会直接返回`limit_req_status设置的状态码`，永远不存在请求需要等待的情况。(rate指limit_req_zone设置)
- `name`：给zone取的任意名称

**案例**:`limit_req zone=limit_req burst=7 nodelay;`

**案例**:`limit_req zone=limit_req;`

#### limit_req_zone

**[格式] `limit_req_zone key zone=name:size rate=rate;`**

上下文：http

- `key`：用于定义客户端的唯一标识来限速，如remote_addr
  - `$binary_remote_addr` 使用4个字节空间，高效
  - `$remote_addr` 使用7-15个字节空间
- `name`：给zone取的任意名称
- `size`：共享内存大小空间，m为单位
- `rate`:表示允许**相同标识的客户端的访问频次**，12r/m的，即限制每5秒访问一次，每5秒才处理一个请求。

**案例**:`limit_req_zone  $binary_remote_addr zone=limit_req:15m rate=12r/m;`

#### limit_req_status

**[格式] `limit_req_status code（http的状态码,默认值：503）`** 

上下文：http, server, location

**案例**: `limit_req_status 504;`

## 限流案例

结合limit_conn和limit_req的案例

```nginx
http {
    include       mime.types;
    default_type  application/json;
    
    # [格式] limit_conn_zone key zone=name:size
    # key：用于定义客户端的唯一标识来限速，如remote_addr
    # name：给空间取的任意名称
    # size：共享内存大小空间，m为单位
    # binary_remote_addr 使用4个字节空间，高效;remote_addr 使用7-15个字节空间
    limit_conn_zone $binary_remote_addr zone=limit_addr:10m;
    
    # [格式] limit_req_zone key zone=name:size rate=rate;
    # 上下文：http
    # rate:表示允许相同标识的客户端的访问频次，12r/m的，即限制每5秒访问一次，每5秒才处理一个请求。
    limit_req_zone  $binary_remote_addr zone=limit_req:15m rate=12r/m;

    server {
        listen       80;
        server_name  localhost;

        location / {
           root   html;
           index  index.html index.htm;
            
            # 触发限速后，返回状态码,默认503
            # 上下文：http, server, location
            limit_conn_status 503;
            
            # 当触发限速后，错误日志出记录一条日志， 这里用于定义日志等级
            # info|notice|warn|error
            # 上下文：http, server, location
            # 默认值：error
            limit_conn_log_level warn;
            
            # limit_conn zone number;
            # zone：用limit_conn_zone中定义的zone名称
            # number：以zone为标识的客户端被允许的同时最大连接数
            limit_conn limit_addr 2;
            
            # 定义响应数据的传输速度，bytes/s
            # 本指令属于ngx_http_core_module，不属于ngx_http_limit_conn_module
            limit_rate 50;

            # limit_req_status code（http的状态码） 
            # 默认值：503
            # 上下文：http, server, location
            limit_req_status 504;
            
            # 触发限速后，日志记录的等级 
            # info|notice|warn|error
            # 默认值：error
            # 上下文：http, server, location
            limit_req_log_level notice;
            
            # limit_req zone=name [burst=number] [nodelay | delay=number];
            # burst：桶大小,设置一个大小为x的缓冲区,当有大量请求（爆发）过来时，超过了访问频次限制的请求可以先放到这个缓冲区内等待，但是这个等待区里的位置只有5个，超过的请求会直接报503的错误然后返回。
            # nodelay：如果设置，会在瞬时提供处理(burst + rate)个请求的能力，请求超过（burst + rate）的时候就会直接返回503，永远不存在请求需要等待的情况。
            # 上下文：http, server, location
            # limit_req zone=limit_req burst=7 nodelay;
            limit_req zone=limit_req;
        }
    }
}
```

## 黑白名单

限制特定IP或网段访问

- allow
- deny

规则是从上到下的,**规则顺序**很重要

```nginx
server {
    listen       80;
    server_name  localhost;
    location / {
        # allow address | CIDR | UNIX | all
        # 默认值
        # 上下文：http, server, location, limit_except
        allow 192.168.0.1/24;
        
        # deny address | CIDR | UNIX | all
        # 默认值
        # 上下文：http, server, location, limit_except
        deny all;  
    }
}
```

**规则示例**

```nginx
location / {
    # 规则从上到下
    
    # 拒绝
    deny   192.168.1.1;
    
    # 放行192.168.1.0网段，子网掩码24位（255.255.255.0），但是除了192.168.1.1
    allow  192.168.1.0/24;
    
    # 放行10.1.1.0网段，子网掩码16位（255.255.0.0）
    allow  10.1.1.0/16;
    
    # 放行ipv6
    allow  2001:0db8::/32;
    
    # 除了上面放行的，其他全部拒绝
    deny   all;
}
```

## 请求拦截

关键词: **`auth_request`**

基于子请求收到的HTTP响应码做访问控制

如：拦截所有请求，先去做鉴权请求，通过后再放行(典型的应用就是鉴权)

```nginx
location /private {
    # 默认值：off
    # 上下文：http, server, location;
    # 鉴权成功对会返回后面实际内容，鉴权失败会返回鉴权服务的返回内容
    auth_request /auth;
    ...
}
location /auth {
    proxy_pass http://localhost:8080/auth;
    proxy_pass_request_body off;
    proxy_set_header Content-Length "";
    proxy_set_header X-Original-URI $request_uri;
}
```

## 防盗链

```properties
 location ~^/.*\.(png|jpg|gif|jfif) {
     valid_referers www.example.com;
     if ($invalid_referer){
         rewrite ^/ http://192.168.110.98/images/forbidden.png;
     }
     root   html;
 }
```

如果出现盗链的情况，将会出现类似于如下效果：<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202312041125985.png" alt="img" style="zoom: 25%;" />

# nginx配置问题

nginx配置过程中遇到的一些**问题记录**

## nginx配置端口问题

**Mac/linux系统的限制**：Mac系统默认只允许1024以下的端口号被系统服务使用，如果要使用1024以下的端口号，需要root权限或者修改系统配置,即通过[user指令配置](#全局配置main段详解)设置为root权限

但似乎阿里云服务器可以部署到8000以内的端口.不明所以

## 直接return文本

使用`default_type`指令将默认的`Content-Type`设置为`text/plain`，以确保返回的内容被浏览器识别为纯文本。然后，我们使用`return`指令返回带有`target_host`和`target_uri`的文本响应。

```nginx
location /test {
    default_type text/plain;
    return 200 "hello world";
}
```

# nginx插件

## fastdfs插件

[[网络编程#FastDFS|fastdfs插件详解跳转]]

[[网络编程#fastDFS配合fastCGI项目|nginx配合fastcgi使用跳转]]















