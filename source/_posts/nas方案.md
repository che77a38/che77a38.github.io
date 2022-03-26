---
title: nas方案
tags: nas
categories: 杂项

---



## nas方案

前提：路由器要全千兆网口和网线（对应机械硬盘）

原因：数据有一定的私密性，服务不对外，外联网速达不到上云的要求

合适位置：**温度可控**，**清洁**，**稳定**，**安全**

<!-- more -->

网线：

![image-20210407153352145](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210407153352145.png)

![image-20210407153558825](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210407153558825.png)

机械硬盘：（寿命最少6年）

1. 西部数据企业盘  8T 1248 10T 1578  1678（氦气盘） 12T  1939（backblaze）

   https://item.jd.com/8703756.html#crumb-wrap

2. 希捷（希捷的ES系列）4T 850   6T 1079  8T 1249 10T 1828（氦气盘）

   https://item.jd.com/100012134646.html#crumb-wrap

3. netapp

4. 东芝的mg系列

nas服务器：

1. emc
2. 群晖   DS920（4700）
3. 威联通   TS-453Dmini（3700）
4. microserver gen8

##### <img src="https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210407145052565.png" alt="image-20210407145052565" style="zoom:150%;" />

https://www.synology.cn/zh-cn/products/series/home

![image-20210407145118090](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210407145118090.png)

https://www.qnap.com.cn/zh-cn/product/series/enterprise



不间断电源：

**BK650-CH** 450左右

https://item.jd.com/47459631191.html

**（SANTAK)TG-BOX600/850** 550左右

https://item.jd.com/27388146212.html

总结：

TS-453Dmini（3700）+4*12T （7,800）+（SANTAK)TG-BOX600/850（ 550）=12050

24T完美备份的空间



## 代替方案：云服务

1. [阿里云价格页点击跳转](https://www.aliyun.com/price/product?spm=5176.22414175.5694434980.4.17657bd75iMAOB#/oss/detail)
2. 百度云
3. 腾讯云

