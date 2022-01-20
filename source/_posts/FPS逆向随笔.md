---
title: FPS逆向
tags: FPS
categories: 杂项

---

# FPS 逆向随笔

通常情况下Dx9中会采用4*4的矩阵

<!-- more -->

![image-20210514115116708](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20210514115116708.png)

 //荒野行动横矩阵第3排，第4列的数，光标朝天看的时候是1，朝地下是-1。（此结论通用性待验证）

补充一个3*4列矩阵

```cpp
X X X x
X X X y
X X X z
0 0 0 比例
3*4（列矩阵）
```

UE4矩阵

```
UE4最常见的两种矩阵
//第一种横矩阵格式（上+下-）（这就是上图中荒野行动那种）
xxx xxx 0 xxxx
xxx xxx 0 xxxx
xxx xxx 0 xxxx
 X   Y 比例 Z
//第二种横矩阵格式(上-下+)
xxx xxx xxxx 0
xxx xxx xxxx 0
xxx xxx xxxx 0
 X   Y   Z  比例
 //特征：除了XYZ，其他所有数值在（-2，+2）间
```

[cf思路]: https://bbs.pediy.com/thread-251836.htm

普通食物4*4横矩阵和竖矩阵的矩阵头在这个区间（-2，+2）

针对自动瞄准，应该如何检测：

1、模拟类自瞄

一、Hook windows所提供的所有按键操作、鼠标操作类接口，函数全部由游戏安全系统接管。

二、既然Hook了相关函数，那么就可以被突破，Hook被还原，还要在代码段上下crc，防止被还原Hook，在crc上多次套crc，多设防御关卡。

三、检测鼠标轨迹和移动速度，没有谁可以一直直线移动鼠标。

2、内存类自瞄

一、Hook windows所提供的所有“写内存”类接口，如WriteProcessMemory（），函数全部由游戏安全系统接管，检测到非自身或者未知程序调用该类型函数对游戏进行操作时，将其踢下线。

二、同模拟类自瞄第二条。

三、同模拟类自瞄第三条。

四、加密鼠标横轴（x坐标），且多个地址同步准星数据，当非法修改了准星位置，即准星数据不同步，即可知道非法修改了内存。

​    那么接下来，同笔者一起分析，透视自瞄究竟是如何实现的呢？

​    其实只要实现了自瞄，就相当于实现了透视，只是需要开发者通过一系列算法将其绘制在屏幕上而已。而实现自瞄，对于有相关工作经验的人来说，也算不上难，一套公式，几乎“通杀”所有FPS。自瞄算法可以简单的分为两种，一种通过玩家坐标和准星位置进行计算，一种为”矩阵自瞄“，计算模型骨骼等等，其实两种自瞄本质意义上区别不大，各有各的好处，只不过第二种更为精准，第一种则更为方便，需要的数据更少。

准星数据寻找

在fps游戏中，横轴是可以无限原地转圈的，而竖轴上下大概在180度左右，所以Y往往比X更合适用来当作这一数据的突破口。那么假设准星数据做了处理，应该如何找到瞄准call呢？搜索出与准星坐标相关的地址后，移动鼠标进行访问断，就有可能断到相关的函数。



自己封装内存模块用到的api

1. 打开进程===OpenProcess
2. 打开当前进程===OpenProcess
3. 写内存===WriteProcessMemory
4. 关闭句柄===CloseHandle
5. 读取内存整数===ReadProcessMemory
6. 保护内存===VirtualQueryEx
7. 读内存字节集===ReadProcessMemory
8. 提示自身进程权限===RtlAdjustPrivilege
9. 获取当前进程id===GetCurrentProcessId
10. 取一个窗口的标题===GetWindowTextA
11. 寻找窗口句柄===FindWindowExA
12. 获取窗口客户区===GetClientRect
13. 获取窗口类名===GetClassNameA
14. 终止进程===TerminateProcess
15. 获取快照信息===CreateToolhelp32Snapshot
16. 获取遍历快照的第一个进程===Process32First
17. 获取遍历快照的下一个进程===Process32Next
18. 获取遍历快照的第一个模块===MODULE32First
19. 获取遍历快照的下一个模块===MODULE32Next



```javascript
UE4
Count(环境数量)→  -游戏类型  → 数组Actor
↓                                    ↓
Uworld（世界地址）            人物坐标XYZ  血量 阵容  飞天
```





```
X
Y
Z地址"UE4Game-Win64-Shipping.exe"+02CC5F50]+588]+158]+1D8

[[[[[7FF714B28BF0+88+rcx*3*8+8]+10]+50]+270]+158]+1D0==233F0434FE0
```



