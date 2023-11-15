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

```shell
# nginx工作时候需要依赖三个库(openssl没有版本要求)
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
```

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

**nginx在mac下下各种默认目录详解**

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202311061742999.png" alt="image-20231106174235994" style="zoom: 33%;" />

mac上配置文件真正的根目录为：`/opt/homebrew/Cellar/nginx/1.25.3/`，即配置文件中的相对路径都为相对此地址

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







## nginx.conf详解

配置文件的组织形式

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202306071742265.png" alt="image-20230607174201176" style="zoom:50%;" />

上图中main模块本身即为最外层,即所有`{...}`之外就是main模块

- http模块
  - server模块  (每个server模块对应一个web服务器)
    - location模块 (用来匹配不同的URI请求，进而对请求做不同的处理和响应)
- mail模块 (处理邮件相关的动作)

### [重要]常用配置项介绍

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

### 实用场景

#### 虚拟主机

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

#### 静态站点

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

#### 反向代理

[[网络编程#反向代理|了解反向代理]]

> 反向代理是用户客户端访问代理服务器后，被反向代理服务器按照一定的规则从一个或多个被代理服务器中获取响应资源并返回给客户端的代理模式，客户端只知道代理服务器的 IP，并不知道后端服务器的 IP，原因是代理服务器隐藏了被代理服务器的信息。

![image-20231107175434006](https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202311071754917.png)

nginx反向代理可以

- 七层反向代理(应用层)
- 四层反向代理(TCP/UDP代理)

##### 七层反向代理

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

##### 四层反向代理

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

#### 负载均衡

> 当出现高并发大流量的业务场景时，单台后端服务器已无法支撑业务正常运行，需要将请求流量按照一定规则分发到多台服务节点上，即使某个节点宕机，系统依然能够对外正常提供服务，以此来提高系统的性能和稳定性。

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202311071811827.png" alt="image-20231107181143583" style="zoom: 33%;" />

 支持的协议如下:

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2//202311071826427.png" alt="640" style="zoom:67%;" />

###### upstream模块

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

##### 负载均衡算法

###### 轮询(默认)

每个请求按时间顺序逐一分配到不同的后端服务器

```nginx
upstream backend {
    # 默认所有服务器权重为 1
    server 192.168.1.1:8080;
    server 192.168.1.2:8080;
    server 192.168.1.3:8080;
}
```

###### 加权轮询

指定轮询概率，用于后端服务器性能不均的情况

```nginx
upstream backend {
    server 192.168.1.1:8080 weight=3;
    server 192.168.1.2:8080 weight=2;
    # default weight=1
    server 192.168.1.3:8080;  
}
```

**实际案例**

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

###### 哈希-hash

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

###### ip_hash

> 每个请求按访问ip的hash结果分配，这样**每个访客固定访问一个后端服务器**，是session共享问题的解决方案之一

```nginx
upstream backend {
    ip_hash;
    server 192.168.1.1:8080;
    server 192.168.1.2:8080;
    server 192.168.1.3:8080; 
}
```

###### 最少连接数算法

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

##### 对上游服务器返回异常时的处理

主要有这三个关键词可以设置

- [proxy_next_upstream](#proxy_next_upstream)
- [proxy_next_upstream_timeout](#proxy_next_upstream_timeout)
- [proxy_next_upstream_tries](#proxy_next_upstream_tries)

###### proxy_next_upstream

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

###### proxy_next_upstream_timeout

含义:**超过该时间不再尝试失败转发**

语法：  `proxy_next_upstream_timeout time`

默认值：`proxy_next_upstream_timeout 0` 

> 含义为:如果nginx在向上游服务器发送请求时，如果连接超时时间超过了0，nginx将不会尝试将请求转发到下一个上游服务器，而是**立即返回一个失败响应**（通常是502 Bad Gateway）给客户端

上下文：http, server, location

###### proxy_next_upstream_tries

含义:设置最大尝试**转发次数**,超过转发次数依旧失败则错误码直接返回给客户端

语法：  `proxy_next_upstream_tries number`

默认值：`proxy_next_upstream_tries  0` (一直转发)

上下文：http, server, location

##### 负载均衡样例

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

#### HTTPS加密传输

> HTTPS 通过加密通道保护客户端与服务端之间的数据传输，已成为当前网站部署的必选配置。在部署有 Nginx 代理集群的 HTTPS 站点，通常会把 SSL 证书部署在 Nginx 的服务器上，然后把请求代理到后端的上游服务器。这种部署方式由 Nginx 服务器负责 SSL 请求的运算，相对减轻了后端上游服务器的 CPU 运算量。

##### 生成自签名HTTPS证书

```shell
# 配置https签名证书
  # 1、创建https证书存放目录：
  cd /usr/local/nginx/conf/
  mkdir ssl
  cd ssl
  # 2、创建私钥：
  openssl genrsa -des3 -out https.key 1024
  #这样创建私钥可以直接带上密码
  openssl genrsa -des3 -passout pass:your_password -out https.key 1024
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

##### nginx.conf配置

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

#### 文件服务器

要归档一些数据或资料，那么文件服务器必不可少。使用 Nginx 可以非常快速便捷的搭建一个**简易的文件服务**。

###### nginx.conf配置

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

###### 注意点

按照上述配置配置好后,访问网址会出现403错误,查看error.log会发现是权限不足问题,使用`ps aux | grep nginx`会发现 master进程是root权限,而worker进程是`nobody`权限

> `nobody`是nginx工作进程的运行用户。Nginx通常会使用非特权用户运行工作进程，以增加安全性。"nobody"是一个常见的非特权用户，用于执行网络服务进程。它通常具有较低的权限，只能访问必要的系统资源，以减少潜在的安全风险。因此，作为文件服务器不具备权限访问文件资源,因此会返回403错误.

nginx.conf中添加`user root wheel；`可以解决问题,此后,worker进程也将会获得root权限.

> 在`user root wheel；`中,wheel是通过`id root`指令查看root的用户组为wheel

虽然这种方法可以解决权限不足问题,但有安全隐患,最好还是用别的用户    [[linux基础以及系统编程#用户权限,用户和用户组相关命令|查看linux权限相关命令]]





