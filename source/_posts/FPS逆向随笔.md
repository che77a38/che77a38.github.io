---
title: FPS逆向
tags: FPS
categories: 杂项
mathjax: true
---



[x64dbg快捷键]: https://www.52pojie.cn/thread-227097-1-1.html

fps辅助整体分析

<!-- more -->

- FPS游戏特性导致的，需要非常高的实时性，不能过度的网络验证
- 绘制部分可以使用透明窗口覆盖在游戏上，非常难以检测
- 自瞄部分，捕捉准星数据，准星路径曲线不规则或有中断（不能平滑，人类操作鼠标非常不圆滑）
- 连续爆头的行为检测行为数据异常等等

# 相关基础

## 角度计算

- tan，cos，sin函数，**参数为弧度**，弧度为π表示180度。
- atan2，acos2，asin2，**返回值为弧度**。

$$
角度=(弧度*180)/π
$$

$$
弧度=(角度*π)/180
$$

[3线性代数本质系列]: https://www.bilibili.com/video/BV1ys411472E?spm_id_from=333.999.0.0

向量内积是一个向量在另一个向量上的投影长度乘以另一个向量的长度

```c
//比如：[1,3]和[3,0]的向量内积为：
[1,3]*[3,0]=3+0=3
```

矩阵的乘法：

![image-20220122133019389](https://raw.githubusercontent.com/che77a38/blogImage/main/202201221330618.png)

## 快捷键写法

```c
if(GetKeyState(VK_F1)&1)//VK_F1是键码
{
	//按下F1执行里面的指令,再按下F1停止执行里面的指令
}
```

## 绘制的三种方法

1. hook d3d/opengl
   - 优:完全不闪,代码简单
   - 缺:非常容易被检测
2. 游戏窗口上自行绘制
   - 优:适中
   - 缺:会闪
3. 自己创建窗口,在自己创建的窗口上绘制
   - 优:稳定
   - 缺:麻烦一点,会闪,需要通信

# 3维坐标转屏幕算法

两种坐标求导算法

- 需要矩阵
- 不需要矩阵

## 不需要矩阵

![image-20220122192831457](https://raw.githubusercontent.com/che77a38/blogImage/main/202201221928872.png)
$$
摄像机到准星的距离分辨率=\frac{\frac{屏幕水平分辨率}{2}}{\tan{\frac{水平FOV}{2}}}
$$
$$
\tan{x差角度}=\frac{屏幕的x差分辨率}{摄像机到准星的距离分辨率}
$$


$$
\tan{x差角度}=\frac{屏幕的x差分辨率}{\frac{\frac{屏幕水平分辨率}{2}}{\tan{\frac{水平FOV}{2}}}}
$$

$$
屏幕的x差分辨率=\frac{\frac{屏幕水平分辨率}{2}}{\tan{\frac{水平FOV}{2}}}\times\tan{x差角度}
$$

因为屏幕的左上角为(0,0)，向右为x变大，向下为y变大，因此可知：

**屏幕上指向敌人的x坐标**就是:**屏幕的x差分辨率+水平分辨率/2**

![image-20220122151558943](https://raw.githubusercontent.com/che77a38/blogImage/main/202201221515481.png)
$$
\frac{垂直FOV}{水平FOV}=\frac{垂直分辨率}{水平分辨率}
$$
$$
屏幕的y差分辨率=\frac{\frac{屏幕垂直分辨率}{2}}{\tan{\frac{垂直FOV}{2}}}\times\tan{y差角度}
$$

$$
屏幕的y差分辨率=\frac{\frac{屏幕水平分辨率}{2}}{\tan{\frac{水平FOV}{2}}}\times\tan{y差角度}
$$

**屏幕上指向敌人的y坐标**就是:**屏幕的y差分辨率+垂直分辨率/2**

### **总结**

$$
屏幕坐标X=\frac{\frac{屏幕水平分辨率}{2}}{\tan{\frac{水平FOV}{2}}}\times\tan{x差角度}+\frac{水平分辨率}{2}
$$

$$
屏幕坐标Y=\frac{\frac{屏幕水平分辨率}{2}}{\tan{\frac{水平FOV}{2}}}\times\tan{y差角度}+\frac{垂直分辨率}{2}
$$

算法如下：

```cpp
#define PI 3.1415926

class 坐标结构
{
public:
    int X,Y;
};

float 弧度转角度(float 弧度)
{
    return 弧度*180/PI;
}

float 角度转弧度(float 角度)
{
    return 角度*PI/180;
}

bool 世界坐标转屏幕坐标_非矩阵(坐标结构& 屏幕坐标,float 水平角度差,float 垂直角度差,float 水平FOV)
{
    取窗口信息(水平分辨率，垂直分辨率);//获取屏幕分辨率(伪函数)
    float 摄像机到准星的距离分辨率=水平分辨率/2/(tan(角度转弧度(水平FOV/2)));
    float 高低最大可视角度=弧度转角度(atan2(垂直分辨率/2,摄像机到准星的距离分辨率));
    if (fabs(水平角度差)>水平FOV/2||fabs(垂直角度差)>高低最大可视角度)
    {
        return false;//不在屏幕范围内
    }
    int 水平差=摄像机到准星的距离分辨率*tan(角度转弧度(水平角度差));
    屏幕坐标.X=水平差+水平分辨率/2;
    int 垂直差=摄像机到准星的距离分辨率*tan(角度转弧度(垂直角度差));
    屏幕坐标.Y=垂直差+垂直分辨率/2;
    return true;
}
```

无矩阵方式为:获取人物与目标的世界坐标高度差和世界水平距离来得到人物和目标的夹角,再通过人物准星减去目标夹角(或反过来)来确定准星偏转**角度差**,再通过准星偏转角度差和游戏宽高分辨率来转换成屏幕坐标进行绘图

这种方式得到的坐标绘制多多少少有误差,下面用到矩阵的方式无误差

### 相关代码截取

```c
struct Point2D
{
	float X, Y;
};

struct  Vector4 
{
	float x;
	float y;
	float z;
	float w;
};

class Paint
{
public:
	HWND m_hWnd;//窗口句柄
	RECT m_wndRect;//窗口尺寸信息
	int m_resolutionWidth;//分辨率宽
	int m_resolutionHeight;//分辨率高
	RECT m_outsideWnd;//外窗口尺寸信息
	int m_outsideWndWidth;//外窗口分辨率宽
	int m_outsideWndHeight;//外窗口分辨率高
	float m_viewMatrix[16];//视角矩阵
	DWORD m_matrixAddr32;//32位矩阵地址
	DWORD64 m_matrixAddr64;//64位矩阵地址

	//取窗口信息
	void getWndInfo();
public:
	Paint(HWND hWnd,DWORD matrixAddr=NULL, COLORREF brushColor=RGB(255,0,0), COLORREF penColor=RGB(255,0,0));
	//64位非矩阵绘制未完善
	Paint(HWND hWnd, DWORD64 matrixAddr, COLORREF brushColor = RGB(255, 0, 0), COLORREF penColor = RGB(255, 0, 0));
	Paint();
	~Paint();
	HDC hdc;//画板句柄
	HBRUSH hBrush;//画刷句柄
	HFONT hfont;//字体句柄
	HPEN hPen;//画笔
	//HDC hOldDc;//老的画板句柄
	//HBRUSH hOldBrush;//老的画刷句柄
	//HPEN hOldPen;//老的画笔
	//世界坐标转屏幕坐标(无矩阵)
	bool worldPointToScreenPointWithoutMatrix(Point2D& screenPoint,const Orientation& angleDiff);
	//世界坐标转屏幕坐标
	bool worldPointToScreenPoint(Point2D& screenPoint, const Point3D& targetWorldPoint);
	//世界坐标转屏幕坐标64位
	bool worldPointToScreenPoint64(Point2D& screenPoint, const Point3D& targetWorldPoint);
	//画线(从屏幕下方中间出发到(x,y))
	void paintLine(int x, int y);
	//两点画线
	void paintLine(int x, int y, int xTo, int yTo);
	//画框
	void paintFrame(int x, int y, int w, int h, int thick);
	//针对头脚坐标画框
	void paintFrameByFootAndHead(Point2D footPoiny,Point2D headPoint,int thick);
	//画矩形
	void paintRect(int x,int y,int w,int h);
	//写字
	void paintText(int x,int y,COLORREF color,const char* text);
	//绘制
	void beginPaint();
	//更换画刷
	void changeBrush(COLORREF brushColor);
	//更换画笔
	void changePen(int penStyle,int penWidth,COLORREF penColor);
	bool 世界坐标转屏幕坐标_非矩阵(Point2D& 屏幕坐标, FLOAT  水平角度差, FLOAT 高低角度差);
};

float angleToRadian(float angle)
{
	return (FLOAT)(angle*PI / 180);
}
float radianToAngle(float radian)
{
	return (FLOAT)(radian * 180 / PI);
}
void Paint::getWndInfo()
{
	//获得窗口信息
	GetClientRect(m_hWnd,&m_wndRect);
	m_resolutionWidth = m_wndRect.right - m_wndRect.left;
	m_resolutionHeight = m_wndRect.bottom - m_wndRect.top;
	GetWindowRect(m_hWnd, &m_outsideWnd);  //含有边框及全屏幕坐标
	m_outsideWndWidth = m_outsideWnd.right - m_outsideWnd.left;
	m_outsideWndHeight = m_outsideWnd.bottom - m_outsideWnd.top;
}

bool Paint::世界坐标转屏幕坐标_非矩阵(Point2D& 屏幕坐标, FLOAT  水平角度差, FLOAT 高低角度差)
{

	getWndInfo();
	FLOAT 高低可视角度 = (FLOAT)((double)atan2(m_resolutionHeight, m_resolutionWidth) * 180 / 3.1415);
	if (fabs(水平角度差) > 45 || fabs(高低角度差) > 高低可视角度)
	{
		return false;// 不在屏幕范围内
	}
	int 水平差 = (int)(tan(水平角度差 * 3.1416 / 180) * ((m_resolutionWidth) / 2));
	屏幕坐标.X = (float)(m_resolutionHeight / 2 + 水平差);

	int 高度差 = (int)(tan(高低角度差 * 3.1416 / 180) * ((m_resolutionWidth) / 2));
	屏幕坐标.Y = (float)(m_resolutionHeight / 2 + 高度差);

	return true;
}

//计算朝向函数参考
void EntityAround::calOrientation(Point3D& targetLoc,Orientation& targetAngle,Orientation& angleDiff)
{
	FLOAT fov_X = *(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x195fe58);
	FLOAT fov_Y = *(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x195fe5c);
	FLOAT fov_Z = *(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x195fe60);
	FLOAT fov_horizon= *(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x19E10C8);
	FLOAT fov_vertical = *(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x19E10C4);
	//水平朝向确定
	if (targetLoc.X >= fov_X&&targetLoc.Y >= fov_Y)
	{
		//第一象限
		targetAngle.horizon= radianToAngle(atan2(targetLoc.Y - fov_Y, targetLoc.X - fov_X));
	}
	else if (targetLoc.X <= fov_X&&targetLoc.Y >= fov_Y)
	{
		//第二象限
		targetAngle.horizon = 180- radianToAngle(atan2(targetLoc.Y - fov_Y, fov_X - targetLoc.X));
	}
	else if (targetLoc.X <= fov_X&&targetLoc.Y <= fov_Y)
	{
		//第三象限
		targetAngle.horizon = 180+ radianToAngle(atan2(fov_Y - targetLoc.Y, fov_X - targetLoc.X));
	}
	else if (targetLoc.X >= fov_X&&targetLoc.Y <= fov_Y)
	{
		//第四象限
		targetAngle.horizon = 360 - radianToAngle(atan2(fov_Y - targetLoc.Y, targetLoc.X - fov_X));
	}
	//垂直朝向确定
	FLOAT distance = sqrt((targetLoc.X - fov_X)*(targetLoc.X - fov_X) + (targetLoc.Y - fov_Y)*(targetLoc.Y - fov_Y));
	if (targetLoc.Z >= fov_Z)
	{
		//上方
		targetAngle.vertical = -radianToAngle(atan2(targetLoc.Z - fov_Z, distance));//必须加负数,因为游戏逆向朝上转视角是负数
	}
	else
	{
		//下方
		targetAngle.vertical = radianToAngle(atan2(fov_Z - targetLoc.Z, distance));
	}
	//计算朝向目标头部和自己准星朝向的角度差(顺时针为正,逆时针为负)
	angleDiff.horizon = fov_horizon - targetAngle.horizon;
	if (angleDiff.horizon<=-180)//跨0轴的两种情况,防止超出水平转向区间
	{
		angleDiff.horizon += 360;
	}
	if (angleDiff.horizon>180)
	{
		angleDiff.horizon -= 360;
	}
	angleDiff.vertical = targetAngle.vertical - fov_vertical;
}
```

## 需要矩阵

[上帝视角看gpu系列(有助于理解矩阵算法)]: https://space.bilibili.com/2055684362/channel/collectiondetail?sid=318149

矩阵分行主序与列主序,主要是d3d和openGl的区别

- 行主序(D3D)

  ```
  a1 a2 a3 a4          x         a1*x+a2*y+a3*z+a4*w
  b1 b2 b3 b4    乘以  	y  =      b1*x+b2*y+b3*z+b4*w
  c1 c2 c3 c4          z         c1*x+c2*y+c3*z+c4*w
  d1 d2 d3 d4          w         d1*x+d2*y+d3*z+d4*w
  ```

- 列主序(openGl)

  ```
                 a1 b1 c1 d1    a1*x+a2*y+a3*z+a4*w
  x,y,z,w  乘以  a2 b2 c2 d2  =  b1*x+b2*y+b3*z+b4*w
                a3 b3 c3 d3     c1*x+c2*y+c3*z+c4*w
                a4 b4 c4 d4     d1*x+d2*y+d3*z+d4*w
  ```

### 缩放和位移矩阵

```c
//行主序:(D3D)
Sx 0  0  Tx
0  Sy 0  Ty
0  0  Sz Tz
0  0  0  Tw
//列主序:(openGl)
Sx 0  0  0
0  Sy 0  0
0  0  Sz 0
Tx Ty Tz Tw
  
//平移缩放后的坐标如下
                  Sx*x+w*Tx
x,y,z,w乘以列主序= Sy*y+w*Ty
  							 Sz*z+w*Tz
                 w*Tw
```

**[第一结论]** : 行主序最后一列,列主序最后一行,走路,跳,会发生改变,不代表别的动作不改变

### **旋转矩阵**

#### 绕z轴旋转矩阵

```c
绕z轴旋转矩阵(A表示点逆时针旋转角度 或 坐标系顺时针旋转角度)
//行主序
cosA   -sinA  0  0
sinA   cosA   0  0
0      0      1  0
0      0      0  1
//列主序
cosA   sinA   0  0
-sinA  cosA   0  0
0      0      1  0
0      0      0  1

//绕z轴顺时针旋转后的坐标如下:
                 xcosA-ysinA
x,y,z,w乘以列主序= xsinA+yconsA
                 z
                 w
```

**[第二结论]** : 水平转动的情况,行主序第三列不变,列主序第三行不变

#### 绕x轴旋转矩阵

```c
绕x轴旋转矩阵(A表示点逆时针旋转角度 或 坐标系顺时针旋转角度)
//行主序
1  0     0      0
0  conA  -sinA  0
0  sinA  cosA   0
0  0     0      1
//列主序
1  0     0      0
0  conA  sinA   0
0  -sinA cosA   0
0  0     0      1

//绕x轴顺时针旋转后的坐标如下:
                 x
x,y,z,w乘以列主序= -zsinA+yconsA
                 ysinA+zcosA
                 w
```

**[第三结论]** : 高低朝向改变的时候,行主序第一行不变,列主序第一列不变

#### 绕y轴旋转矩阵

```c
//绕y轴旋转矩阵(A表示点逆时针旋转角度 或 坐标系顺时针旋转角度)
//行主序
cosA  0  sinA  0
0     1  0     0
-sinA 0  cosA  0
0     0  0     1
//列主序
cosA  0  -sinA 0
0     1  0     0
sinA  0  cosA  0
0     0  0     1

//绕y轴顺时针旋转后的坐标如下:
                 xcosA+zsinA
x,y,z,w乘以列主序= y
                 -xsinA+zcosA
                 w
```

### 矩阵变换总结

[矩阵变换总结]: https://www.cnblogs.com/moxiaotao/p/11205082.html

### **找矩阵总结**

分类

- 行主序(D3D)
- 列主序(openGl)

总结

- **[第一结论]** : 行主序最后一列,列主序最后一行,走路,跳,会发生改变(只影响这行或列),不代表别的动作不改变)
- **[第二结论]** : 水平转动的情况,行主序第三列(或第二列)不变,列主序第三行(或第二行)不变
- **[第三结论]** : 高低朝向改变的时候,行主序第一行不变,列主序第一列不变

下面的结论不绝对

- **[第四结论]**矩阵第一个值往往是-1到1之间的(只有一部分)
- **[第五结论]**行主序第一行第三个(或第二个)元素是固定的0,列主序第一列的第三个(或第二个)元素是0
- **[第六结论]**开倍镜,第一个值会乘以相应的倍数(这个是绝对的)
- **[第七结论]**列主序最后两列前三值相似,行主序最后两行前三值相似(只做参考)
- **[第八结论]**随便走,不动准星,会有一行或一列4个在变化(如果只朝x或y前进,那么也只改变3个值,即行主序最后一列第一个与列主序最后一行第一个当沿着x或y方向走也不变),跳就只有三个值在一行或一列变化[第八结论UE4矩阵不符合,可参考下面的UE4专题]

经验:

- 找矩阵的时候一批次只用确定一次
- 找矩阵的时候,优先找多号码段连排的

**基本步骤**

1. 鼠标移动,搜变动
2. 人物移动,跳跃等搜不变动
3. 如果剩余过多尝试不绝对结论减少数量(风险)
4. 剩余不多数量的情况下,每个打开看看移动是不是四个连着的数据改变,跳跃是不是三个连着的数据改变

[找矩阵实例](# 找矩阵)

### **世界坐标转换为屏幕坐标**

> **剪辑坐标**:理解为三维世界的切片

**NDC坐标**(标准化设备坐标)

就是将剪辑坐标的范围缩小至-1到1,如图:

![img](https://raw.githubusercontent.com/che77a38/blogImage/main/202203211338236.png)

**世界坐标-->剪辑坐标-->NDC坐标**

```c
//世界坐标转换为剪辑坐标(剪辑坐标和分辨率没有任何关系)
//世界坐标  *     矩阵
                a0  a1  a2  a3
x,y,z,w   乘以   a4  a5  a6  a7
                a8  a9  a10 a11
                a12 a13 a14 a15
                  
剪辑坐标x   =   a0*x+a4*y+a8*z+a12*w
剪辑坐标y   =   a1*x+a5*y+a9*z+a13*w
剪辑坐标z   =   a2*x+a6*y+a10*z+a14*w
剪辑坐标w   =   a3*x+a7*y+a11*z+a15*w
//剪辑坐标w如果小于0表示在屏幕外!!!!!!!!!!!!!!!!!!!!!!

//剪辑坐标转换为NDC坐标
NDC.x=剪辑坐标x/剪辑坐标w
NDC.y=剪辑坐标y/剪辑坐标w
NDC.z=剪辑坐标z/剪辑坐标w //无用                 
```

**NDC坐标-->屏幕坐标**

![捕获](https://raw.githubusercontent.com/che77a38/blogImage/main/202203211629382.png)

实际上就是坐标系的转换,NDC坐标系转换成屏幕分辨率坐标系.

<img src="https://raw.githubusercontent.com/che77a38/blogImage/main/202203211712682.jpeg" alt="截屏2022-03-21 17.12.02"  />
$$
\frac{目标点的NDC坐标X}{2}=\frac{屏幕坐标差x}{显示器分辨率宽}
\\
\\
\frac{目标点的NDC坐标y}{2}=\frac{屏幕坐标差y}{显示器分辨率高}
$$

```c
//上面两个公式可知:
目标点的屏幕坐标差x=目标点的NDC坐标X*显示器分辨率宽/2
目标点的屏幕坐标差y=目标点的NDC坐标y*显示器分辨率高/2
```

因此**NDC坐标--->屏幕坐标算法**计算如下:
$$
目标点的屏幕坐标x=\frac{目标点的NDC坐标X\times分辨率宽}{2}+\frac{分辨率宽}{2}
$$
$$
目标点的屏幕坐标y=\frac{分辨率高}{2}-\frac{目标点的NDC坐标y\times分辨率高}{2}
$$

坐标点A和坐标点B均适用,说明四象限全适用.

### 相关代码截取

```c
struct Point2D
{
	float X, Y;
};

struct  Vector4 
{
	float x;
	float y;
	float z;
	float w;
};

class Paint
{
public:
	HWND m_hWnd;//窗口句柄
	RECT m_wndRect;//窗口尺寸信息
	int m_resolutionWidth;//分辨率宽
	int m_resolutionHeight;//分辨率高
	RECT m_outsideWnd;//外窗口尺寸信息
	int m_outsideWndWidth;//外窗口分辨率宽
	int m_outsideWndHeight;//外窗口分辨率高
	float m_viewMatrix[16];//视角矩阵
	DWORD m_matrixAddr32;//32位矩阵地址
	DWORD64 m_matrixAddr64;//64位矩阵地址

	//取窗口信息
	void getWndInfo();
public:
	Paint(HWND hWnd,DWORD matrixAddr=NULL, COLORREF brushColor=RGB(255,0,0), COLORREF penColor=RGB(255,0,0));
	//64位非矩阵绘制未完善
	Paint(HWND hWnd, DWORD64 matrixAddr, COLORREF brushColor = RGB(255, 0, 0), COLORREF penColor = RGB(255, 0, 0));
	Paint();
	~Paint();
	HDC hdc;//画板句柄
	HBRUSH hBrush;//画刷句柄
	HFONT hfont;//字体句柄
	HPEN hPen;//画笔
	//HDC hOldDc;//老的画板句柄
	//HBRUSH hOldBrush;//老的画刷句柄
	//HPEN hOldPen;//老的画笔
	//世界坐标转屏幕坐标(无矩阵)
	bool worldPointToScreenPointWithoutMatrix(Point2D& screenPoint,const Orientation& angleDiff);
	//世界坐标转屏幕坐标
	bool worldPointToScreenPoint(Point2D& screenPoint, const Point3D& targetWorldPoint);
	//世界坐标转屏幕坐标64位
	bool worldPointToScreenPoint64(Point2D& screenPoint, const Point3D& targetWorldPoint);
	//画线(从屏幕下方中间出发到(x,y))
	void paintLine(int x, int y);
	//两点画线
	void paintLine(int x, int y, int xTo, int yTo);
	//画框
	void paintFrame(int x, int y, int w, int h, int thick);
	//针对头脚坐标画框
	void paintFrameByFootAndHead(Point2D footPoiny,Point2D headPoint,int thick);
	//画矩形
	void paintRect(int x,int y,int w,int h);
	//写字
	void paintText(int x,int y,COLORREF color,const char* text);
	//绘制
	void beginPaint();
	//更换画刷
	void changeBrush(COLORREF brushColor);
	//更换画笔
	void changePen(int penStyle,int penWidth,COLORREF penColor);
	bool 世界坐标转屏幕坐标_非矩阵(Point2D& 屏幕坐标, FLOAT  水平角度差, FLOAT 高低角度差);
};

void Paint::getWndInfo()
{
	//获得窗口信息
	GetClientRect(m_hWnd,&m_wndRect);
	m_resolutionWidth = m_wndRect.right - m_wndRect.left;
	m_resolutionHeight = m_wndRect.bottom - m_wndRect.top;
	GetWindowRect(m_hWnd, &m_outsideWnd);  //含有边框及全屏幕坐标
	m_outsideWndWidth = m_outsideWnd.right - m_outsideWnd.left;
	m_outsideWndHeight = m_outsideWnd.bottom - m_outsideWnd.top;
}

Vector4 RowVecTimesMatrix(const Vector4& rowVec, float matrix[16])
{
	Vector4 retVec;
	retVec.x = rowVec.x*matrix[0] + rowVec.y*matrix[4] + rowVec.z*matrix[8] + rowVec.w*matrix[12];
	retVec.y = rowVec.x*matrix[1] + rowVec.y*matrix[5] + rowVec.z*matrix[9] + rowVec.w*matrix[13];
	retVec.z = rowVec.x*matrix[2] + rowVec.y*matrix[6] + rowVec.z*matrix[10] + rowVec.w*matrix[14];
	retVec.w = rowVec.x*matrix[3] + rowVec.y*matrix[7] + rowVec.z*matrix[11] + rowVec.w*matrix[15];
	return retVec;
}

//世界坐标转屏幕坐标32位
bool Paint::worldPointToScreenPoint(Point2D & screenPoint,const Point3D& targetWorldPoint)
{
	getWndInfo();
	//刷新矩阵
	memcpy(&m_viewMatrix, (PVOID)m_matrixAddr32, sizeof(m_viewMatrix));
	Vector4 worldLocation = { targetWorldPoint.X,targetWorldPoint.Y,targetWorldPoint.Z,1};//世界坐标
	//世界坐标配合矩阵算出裁剪坐标(目前只考虑了列主序,还需要考虑行主序的情况)
	Vector4 cutLocation= RowVecTimesMatrix(worldLocation, m_viewMatrix);
	if (cutLocation.w<0.0)//剪辑坐标w如果小于0,表示在屏幕外
	{
		return false;
	}
	Point2D NDC;//ndc坐标
	NDC.X = cutLocation.x / cutLocation.w;
	NDC.Y = cutLocation.y / cutLocation.w;
	screenPoint.X = (NDC.X*m_resolutionWidth + m_resolutionWidth) / 2;
	screenPoint.Y = (m_resolutionHeight - m_resolutionHeight*NDC.Y) / 2;
	return true;
}
//世界坐标转屏幕坐标64位
bool Paint::worldPointToScreenPoint64(Point2D & screenPoint, const Point3D& targetWorldPoint)
{
	getWndInfo();
	//刷新矩阵
	memcpy(&m_viewMatrix, (DWORD64*)m_matrixAddr64, sizeof(m_viewMatrix));
	Vector4 worldLocation = { targetWorldPoint.X,targetWorldPoint.Y,targetWorldPoint.Z,1 };//世界坐标
																						   //世界坐标配合矩阵算出裁剪坐标(目前只考虑了列主序,还需要考虑行主序的情况)
	Vector4 cutLocation = RowVecTimesMatrix(worldLocation, m_viewMatrix);
	if (cutLocation.w < 0.0f)//剪辑坐标w如果小于0,表示在屏幕外
	{
		return false;
	}
	Point2D NDC;//ndc坐标
	NDC.X = cutLocation.x / cutLocation.w;
	NDC.Y = cutLocation.y / cutLocation.w;
	screenPoint.X = (NDC.X*m_resolutionWidth + m_resolutionWidth) / 2;
	screenPoint.Y = (m_resolutionHeight - m_resolutionHeight*NDC.Y) / 2;
	return true;
}
```



## 朝向（准星）

准星数据寻找

在fps游戏中，横轴是可以无限原地转圈的，而竖轴上下大概在180度左右，所以Y往往比X更合适用来当作这一数据的突破口。那么假设准星数据做了处理，应该如何找到瞄准call呢？搜索出与准星坐标相关的地址后，移动鼠标进行访问断，就有可能断到相关的函数。

朝向极大概率是浮点数。

需要找到x,y轴坐标对应的朝向。

# 矩阵补充

通常情况下Dx9中会采用4*4的矩阵

这里说的横矩阵是列主序,列矩阵是行主序

![image-20210514115116708](https://raw.githubusercontent.com/che77a38/blogImage/main/image-20210514115116708.png)

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
↓                               ↓
Uworld（世界地址）            人物坐标XYZ  血量 阵容  飞天
```



```
X
Y
Z地址"UE4Game-Win64-Shipping.exe"+02CC5F50]+588]+158]+1D8

[[[[[7FF714B28BF0+88+rcx*3*8+8]+10]+50]+270]+158]+1D0==233F0434FE0
```



# CE找数据技巧

找数据技巧：排除栈地址，排除ui上显示的数据信息，排除追踪到服务器模块的情况（如果本机有服务器的话）

大量30~80的字符表示的是ascii字符串，4或C开头的4字节大概率是浮点数

对于服务器和客户端模块都在本地的游戏,使用一些确定是服务器数据的数据来找来源,来源于的模块大概率就是服务器模块

**追任何偏移,如果CE能直接搜索到对应基地址,则可直接使用基地址**

可以通过call内的ret来判断这个call有几个参数,而不仅仅是通过找call前的push数量

## dbg配合ce找下属偏移的高级技巧

**角色对象附近地址的属性都可以直接尝试定位,甚至可以到CE搜所有相同结果,找所有结果中最靠近对象地址附近的结果,然后通过 `所有结果中最靠近对象地址-对象首地址`来得到猜测的偏移.这时候直接在最靠近对象的地址下访问断,看能不能断到偏移就是猜测偏移的地址**   [该技巧使用实例](#骨骼数据)

针对单机游戏如下:

无限子弹通过对子弹数下写入断就可以断到,断到的位置往上翻找子弹数减少1,修改此处可以无限子弹.往上追上层call一定会追到射击call,射击call附近应该有射速相关的参数,可能是射击间隔作为参数,也可能是别的;(老游戏每个枪可能都有一个射击call,但是往上追会追到一个通用的射击call).每个call进行屏蔽,来确定哪个是负责后坐力的,简单粗暴把负责后坐力的nop掉,将call改成`add esp,参数字节数`,就实现了没有后坐力.找无敌可以到血量下写入断点,断到的位置的call很可能就是扣血call,nop掉就不扣血了.放雷的call中,nop掉[所有可能跳过将雷的数量减一放入某地址的操作],就实现了疯狂丢雷无间隔.

------

逆向注意点:下图这样的lea一个堆栈地址的情况,要这么处理

![逆向注意点](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204171641184.jpeg)

# CS1.6的逆向

## 找内存数据

通过客户端或服务端来搜数据排查服务端的模块是哪一个

找血量数据如下:

![00001](https://raw.githubusercontent.com/che77a38/blogImage/main/202202161531874.png)

只有蓝标数据真正可以修改目标血量,说明这个数据是服务端数据,到x32dbg中下写入断点来确定服务器模块,击中目标的瞬间断到下图位置

![213213123](https://raw.githubusercontent.com/che77a38/blogImage/main/202202161531371.png)

观察红线标记的模块,可知服务器模块应该就是mp.dll,可对其他数据进行下断确定不经过该模块.

回头发现,只有鼠标经过指向目标才变回来的是个基地址,第三行数据往上追的过程中经过了mp.dll模块,因此最终确定到第二行数据才是真是数据,而不是第三行.

在x32dbg中追第二行数据:

![999999999999](https://raw.githubusercontent.com/che77a38/blogImage/main/202202161600416.png)

```c
得出队友血量的地址=[0x1A17CB8]*0x68+0x1A2565C
//可见0x1A17CB8地址存的是2(游戏中鼠标指向不同的人,下标会改变,从0开始),可能是一个下标.敌人存的血量填的是100即0x64,原因是敌人血量不可见,同时也看不到自己的血量(为0)
  因此遍历实体血量:n*0x68+0x1A2565C
```

比对数组项之间的差异,结构体大小为0x68(公式分析得出),-0x30的目的是因为我们找到的有可能并不是数组项的起始地址

![987887](https://raw.githubusercontent.com/che77a38/blogImage/main/202202161654479.png)

0和5下标是边界外,游戏目前数据只有1~4,1,2,4是队友,3是敌人

打死队友发现其对应的生命不归零,因此需要找死亡标志

```c
//假如我们设n*0x68+0x1A2565C-0x68为起始数组项地址(-0x68是为了使后面的偏移项都是正数)
//n*0x68+h1.exe+0x62565C-0x68    n下标从1开始(减掉68使得下标本来"从0开始"变成"从1开始")
+0x4E BYTE  	//阵容,1表示恐怖分子,2表示反恐精英,0是观察者
+0x60	BYTE		//死亡标记:1表示死亡,0表示活着,超出范围的此项也为1
+0x68 DWORD  	//血量,死亡不清零,敌人和自己的血量均没有意义
```

我们还要找坐标的数据结构:

通过反复让敌人行动找到了坐标,锁定才能触发屏闪的位置,不锁定什么反应都没有的情况,下硬件写入断点直接崩溃.

发现必须找到是不锁定的情况下修改坐标人物抖动以下,这个才是真正要找的目标坐标.发现他是一个基地址:h1.exe+1B5A998

并且在其附近发现了目标的名称

下硬件访问断点开始追该地址

断在的两个位置(分别是下图两次标黄)往上追都不好追,追丢了.但可以猜测出最末一层的结构体偏移为0x188

![54646546](https://raw.githubusercontent.com/che77a38/blogImage/main/202202162322962.png)

尝试不直接断坐标数据,而是断前后几个数据之一,断到的位置往上追一层偏移,放开断点后发现上一层偏移的地址中存的值变成了0,即这个地址是个临时的地址,也不能用

尝试在名字下访问断,断下的位置发现有一个基地址偏移,因此大概率是可以追到数据结构的.

![747474](https://raw.githubusercontent.com/che77a38/blogImage/main/202202162313907.png)

上图可知:

```c
//遍历名字算式为:0x2F5A6C8+0x24C*N
//N的范围为0~31,指向为0表示遍历结束
```

确定结构体首地址:

![786474345](https://raw.githubusercontent.com/che77a38/blogImage/main/202202162327528.png)

上图可知坐标比名字大0x84,前面有知道名字的末层偏移是0x188

因此名字的末层偏移为0x104

```c
//因此结构体数组首地址为0x2F5A6C8-0x104=0x2F5A5C4
//所以结构体数组首地址算式为h1.exe+0x1B5A5C4+0x24C*N
//超出人物数量的结构体数组项全为0,加入的人物再把人物删除掉后并不会初始化该数组,但是名称最前面的一个字节会变成00
+0x0  	DWORD		//等于0结束遍历(中间可能出现空坐标,但该项也一定不为空)>>>注意遍历要跳过自己,因为自己该项也是0	
+0x104	ASCII		//名称		名字为空的话,代表这个结构没有玩家,或玩家已死亡
+0x130  ASCII   //人物模型字符串    比如:guerilla,leet等等等等
+0x180  FLOAT   //该数值不断循环从0加到60,仅当处于本人范围内才变化,范围外不变化		可用于判断对应玩家是否处在本人坐标数据获取范围内
+0x188  FLOAT		X坐标   //坐标超出范围不变化,变化说明在范围内;自己的坐标不变化
+0x18C	FLOAT		Y坐标
+0x190	FLOAT		Z坐标		//坐标为0表示该项不存在,观察发现数组不一定是顺序存放
```

由于上面结构并没有本人坐标,因此下面逆向本人坐标

**找本人坐标的时候,其特点是锁定数值后,修改数值,人物产生位移,解除锁定后,动下人物,人物瞬移回来**

另外一种情况是锁定后,修改,不断的人物屏闪,这种内存也能用,但是最好不要下断,太快了,容易崩溃

**要注意移动到一个位置后要等他完全静止才搜变动,因为有些内存更改比较慢(上面非屏闪情况就是这种)**

```c
//本人坐标:(屏闪,非常快)
h1.exe+1B5A528	FLOAT	X坐标
h1.exe+1B5A52C	FLOAT	Y坐标
h1.exe+1B5A530	FLOAT	Z坐标
//不屏闪但慢慢会跳转(3个不同的X坐标)
h1.exe+19E3F28
h1.exe+19f0750
h1.exe+19F4A08
//完全不跳转,也不屏闪,锁定修改后完全没反应(最快)
h1.exe+195FE58
//意外发现朝向数据(但是只可以显示朝向数据,却无法改变准星朝向,本地必然还有一个内存存着真正可以控制准星的数据)
h1.exe+1B5A508	FLOAT	垂直朝向		//范围是-89(向上为负)到89(向下为正)
h1.exe+1B5A50C	FLOAT	水平朝向		//范围是360到0(左到右)
```

在x32dbg中简单观察了一下,初步确认不是来自于mp.dll的服务器数据

利用上面找到的朝向数值来找真正的准星内存:(可以修改准星位置的内存数据)

```c
h1.exe+19E10C4	FLOAT	垂直朝向		//范围是-89(向上为负)到89(向下为正)
h1.exe+19E10C8	FLOAT	水平朝向		//范围是360到0(左到右)
//0的方向是坐标x增大方向,180是坐标x减小的方向
//90的方向是坐标y增大方向,270是坐标y减小的方向
```

## 找矩阵

[找矩阵方法总结](# 找矩阵总结)

按照上述方法找到的矩阵地址为: `0x2c20100`  =  `hl.exe+1820100`

![image-20220328171548251](https://raw.githubusercontent.com/che77a38/blogImage2/main/202203281715489.png)

# 口袋西游逆向

口袋西游逆向参见详见51和53课

骨骼和模型不一定有绝对坐标,但是一般都有相对坐标

## 基本数据

```c
//人物数据
[[[D0DF1C]+1C]+28]+3C    //X
[[[D0DF1C]+1C]+28]+40    //Y
[[[D0DF1C]+1C]+28]+44    //Z
[[[D0DF1C]+1C]+28]+560   //X中心点
[[[D0DF1C]+1C]+28]+564   //Y中心点
[[[D0DF1C]+1C]+28]+568   //Z中心点
[[[D0DF1C]+1C]+28]+56C   //X中心点到对顶点的X差
[[[D0DF1C]+1C]+28]+570   //Y中心点到对顶点的Y差
[[[D0DF1C]+1C]+28]+574   //Z中心点到对顶点的Z差
[[[D0DF1C]+1C]+28]+578   //立方体下顶点X坐标(斜对角)
[[[D0DF1C]+1C]+28]+57C   //立方体下顶点Y坐标(斜对角)
[[[D0DF1C]+1C]+28]+580   //立方体下顶点Z坐标(斜对角)
[[[D0DF1C]+1C]+28]+584   //立方体上顶点X坐标(斜对角)
[[[D0DF1C]+1C]+28]+588   //立方体上顶点Y坐标(斜对角)
[[[D0DF1C]+1C]+28]+58C   //立方体上顶点Z坐标(斜对角)

//周围遍历    N为[0,对象数量)
[[[[D0DF1C]+1C]+8]+20]+5C   //对象数量
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+3C   //周围对象X
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+40   //周围对象Y
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+44   //周围对象Z
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+ED   //死亡标志位,1为死亡(BYTE)
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+138  //周围对象血量(未被攻击过是0)
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2C4  //X中心点
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2C8  //Y中心点
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2CC  //Z中心点
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2D0  //X中心点到对顶点的X差
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2D4  //Y中心点到对顶点的Y差
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2D8  //Z中心点到对顶点的Z差
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2DC  //立方体下顶点X坐标(斜对角)
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2E0  //立方体下顶点Y坐标(斜对角)
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2E4  //立方体下顶点Z坐标(斜对角)
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2E8  //立方体上顶点X坐标(斜对角)
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2EC  //立方体上顶点Y坐标(斜对角)
[[[[[[[D0DF1C]+1C]+8]+20]+58]+N*4]+4]+2F0  //立方体上顶点Z坐标(斜对角)
```

![image-20220330172058752](https://raw.githubusercontent.com/che77a38/blogImage2/main/202203301720046.png)

## 找矩阵

[找矩阵方法总结](# 找矩阵总结)

矩阵头地址为:  `[[[ELEMENTCLIENT.EXE+0x90DF1C]+14]+8]+E8`

`[ELEMENTCLIENT.EXE+92E5D0]+E8`  也可以

![image-20220328164120672](https://raw.githubusercontent.com/che77a38/blogImage2/main/202203281641926.png)

# 突袭的逆向

## 基本数据

```c
//目标血2  [[[587c10]+n*4]+0xEC]  n为[0,[587C18]-1]
//人物数据
[587C0C]+28   //X
[587C0C]+2C   //Y
[587C0C]+30   //Z
[587C0C]+34   //水平朝向顺时针递增360
[587C0C]+38   //竖直朝向-90到90,从下到上
[587C0C]+EC   //角色血量(血量小于等于0为死亡)
  
//周围遍历    N为[1,玩家数量)
587C18  //玩家数量
[[587C10]+n*4]+4    //头X
[[587C10]+n*4]+8    //头Y
[[587C10]+n*4]+C    //头Z
[[587C10]+n*4]+28   //X
[[587C10]+n*4]+2C   //Y
[[587C10]+n*4]+30   //Z
[[587C10]+n*4]+34   //水平朝向顺时针递增360
[[587C10]+n*4]+38   //竖直朝向-90到90,从下到上
[[587C10]+n*4]+50   //身高
[[587C10]+n*4]+EC   //角色血量(血量小于等于0为死亡)
//未分析阵营
```

## 找矩阵

[找矩阵方法总结](# 找矩阵总结)

矩阵头地址: `ac_client.exe+17AFE0`

![image-20220328172108435](https://raw.githubusercontent.com/che77a38/blogImage2/main/202203281721643.png)

# UE4逆向

## UE4引擎特点

- 增加新对象时,即更换物品时(物品从不可见无中生有)内存几乎一直在增加
- 世界中所有万物都在数组结构中,存在数组数量(物品从不可见无中生有的情况,数量会增加,游戏只要不退出而是当前地图重新开始,数量也会增加;只有游戏退出或更换地图重新开始,数量才会重置,同时存数组数量的地址也会发生变化)
- 子弹未命中的情况下不会增加实体,子弹只有命中的情况下才会增加实体

数组数量:几乎没有减少的可能,基本上一直在增加

**UE4的坐标特点:**

```c
//坐标的内存数据符合以下规律
x  y  z  0
1  1  1  0
//这个特点不绝对
```

在CE结构对比工具中,因为z后的0和x下的1被合并误识别为double类型,因此是如图:



在内存中:

![image-20220331194527584](https://raw.githubusercontent.com/che77a38/blogImage2/main/202203311945720.png)



```c
//UE4的矩阵的前面不远处都符合(不绝对):
0 0 1 1
1 1 0 0
1 0(全为浮点数)

//1的浮点数在内存中为:0x3F800000
//UE4矩阵在内存中的特征码:(不绝对)
00 00 00 00 00 00 00 00 00 00 80 3F 00 00 80 3F 00 00 80 3F 00 00 80 3F 00 00 00 00 00 00 00 00 00 00 80 3F 00 00 00 00 00 00 00 00 00 00 80 3F 00 00 80 3F 00 00 00 00
```

UE4矩阵:

![image-20220331192721545](https://raw.githubusercontent.com/che77a38/blogImage2/main/202203311927800.png)

- 上图中红框第三列0,0,0,x永远不变.(不绝对)
- 四处走动时,最后一行除了1其他3个都变(沿着x,y走两个值改变);跳跃时,最后一行除了1和第一个,其他两个变(不绝对)
- 第一个值-1.19到+1.19(不绝对)
- 矩阵下方那排都是0,0,0,1?

参考pubg矩阵:

![image-20220402140648459](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204021406705.png)

## Battle Royale Trainer逆向

吃鸡模拟器

### 基本数据

![笔记图](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204051307338.jpeg)

```c
//COUNT 世界数组的项数量(该数组中还包含所有的报废对象,要找个标志加以区分,如果要找到玩家们,还需要玩家标志)
[["BattleRoyaleTrainer-Win64-Shipping.exe"+2AF0FB8]+138]+0xB8//CE取巧
//x64dbg追到头为:
[[[[["BattleRoyaleTrainer-Win64-Shipping.exe"+2AD9F30]+[(["BattleRoyaleTrainer-Win64-Shipping.exe"+2B00648]+40)]的低4字节*3*8]+20]+c0]+138]+0xB8
  
//COUNT地址-8就是:数组起始地址的地址:
[["BattleRoyaleTrainer-Win64-Shipping.exe"+2AF0FB8]+138]+0xB0
//检查发现,本人对象首地址也在该世界数组中
  
//世界中对象首地址:(N为[0,COUNT-1])
[[["BattleRoyaleTrainer-Win64-Shipping.exe"+2AF0FB8]+138]+0xB0]+N*8
  
//坐标地址:
[对象首地址+158]+190   X
[对象首地址+158]+194   Y
[对象首地址+158]+198   Z
[[世界对象数组地址+n*8]+158]+190     X
[[世界对象数组地址+n*8]+158]+194     Y
[[世界对象数组地址+n*8]+158]+198     Z
//宏观解读:
  [世界对象地址+n*8]得到的是对象结构首地址,再+158]进入一个存放了坐标信息的结构首地址.再+190]取到坐标x或y值
  
//因为世界数组项非常杂乱,什么都有,因此需要找人物标志和作废对象标志
//找人物标志.找人物标志首先要知道人物对象首地址,可以是自己的,也可以是敌人;通过自己的数据向上追几层看看有没有多个对象存在(可以通过宏观解读去找可以断到人物的位置)
//通过自己的数据判断是否有访问断点往上追两层可以追到断下几个对象地址的情况(如下图),但由于该游戏x64dbg访问硬断会崩溃,因此采取CE进行访问代码扫描,在到x64dbg中依次分析,以此找到人物对象;再将人物对象和其他对象在CE中做对比分析.
```

![image-20220404182919564](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204041829938.png)

此位置可以断到多个人物对象,通过查看对应坐标可确定是人物对象地址.通过上图黄标处多次断下的rcx可以得到所有人物对象地址.

#### 找人物特征

![笔记图](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204041754643.jpeg)

用ce比对工具如上图(前一组两列是两个人物,后一组是其他对象),黄标处那两个很可能是人物特征

```c
//如果:
	[对象首地址+0]==  BattleRoyaleTrainer-Win64-Shipping.exe + 0x1D45740//虚表,这个条件更稳定更靠谱
//或者
	[对象首地址+0xB9]==0x200(即十进制512)//等等还有很多条件也可以,不止一种标志,比如0x50偏移等等
//则:
	可判断是人物
```

**[ 重点 ]**  **对象首地址+0的位置,代表的指针往往是指向虚表的(在非虚继承的情况下，虚函数表指针是存在于类的顶部的).其一样代表表示对象具有同样的成员函数(即对象具有同样的行为模板),因此[对象首地址+0]是最好用于判断是否同类对象的偏移.**

#### 排除做废对象

![笔记图](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204051047668.jpeg)

类似+0和+18和+35这样的位置都可以判断

我们发现做废对象,虚表指针也会改变,因此只需要使用上面人物标志的判断方式就可以避开做废对象.

#### 人物存活判断

CE搜索找到自身血量的地址,然后通过上面找到的自己对象地址,通过`自己血量地址-自己对象首地址`得到血量偏移**(角色对象附近地址的属性都可以直接这样尝试定位,甚至可以到CE搜所有相同结果,找所有结果中最靠近对象地址附近的结果,然后通过 `所有结果中最靠近对象地址-对象首地址`来得到猜测的偏移.这时候直接在最靠近对象的地址下访问断,看能不能断到偏移就是猜测偏移的地址 )**

血量地址为: `人物对象首地址+0x7CC`

人物死亡后,血量会<=0

#### 武器相关

**人物对象下存在一些数组结构,即地址+数量的组合.找到一个数组刚好和人物身上的武器数相同的数组结构,当把手榴弹掏出来的时候,数组数量还会加1.**

进到数组首地址中,数组形式存储的这几个对象一般是对应1,2,3号键对应的武器.(顺序对应)

**到武器对象下**,可找到诸如射击间隔(射速),武器朝向,后坐力等浮点数数据,还有子弹数等.

**射速和后坐力**等数据往往是武器**创建后就固定的浮点数**

**可通过找武器对象下的浮点数(避开地址类型数据,防止崩溃,同时避开会变化的浮点数,因为那很可能是武器朝向)进行清0后游戏中尝试射击后还原,来找到后坐力,射速数据的位置.**

```c
//射速
武器对象+39C  浮点数   射速(射击的间隔)   炸弹没有该参数,炸弹应该和枪结构不一致
//后坐力
武器对象+680  浮点数   初始上下抖动幅度
武器对象+684  浮点数   后续上下抖动幅度
武器对象+6A4  浮点数   左右抖动幅度
```

#### 骨骼数据

骨骼数据一般存有相对于人物参考点坐标的偏移坐标(人物参考点坐标可能有别于人物位置坐标)

通过身体上坐标变化比较多的身体部位来找骨骼数据

骨骼数据同样在人物对象下

骨骼数据往往是即使人站着的位置不动,骨骼数据也会轻微晃动(人物在微微晃动)

骨骼坐标数据如下:

![捕获](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204061736996.jpeg)

黄标的是骨骼相对人物参考点坐标的偏移坐标;黄标上一行应该是骨骼的朝向信息,上图也可以看出这个骨骼的结构是个数组,每个re数组项占0x30字节.因此外围还存在数组地址和数组数量

**[找的过程]**    找到相对骨骼坐标地址后访问断往上追,追到下面地址处:

00007FF7A1EB25D9地址截图:

![捕获](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204091405305.JPG)

追到此处继续往上追发现非常难追了,尝试用ce分析.      [此处用到的找偏移的理论方法](#dbg配合ce找下属偏移的高级技巧)

rbx有两个值,均到CE中搜索,发现其中一个有存放他的地址离对象首地址非常近.

![捕获](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204091415645.jpeg)

上图猜测偏移结果为378

证实:

![捕获](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204091425024.jpeg)

```c
[[对象头地址+378]+698+[[对象头地址+378]+6DC]*10]+n*30+10  //偏移地址X   n为[1,0x43]
[[对象头地址+378]+698+[[对象头地址+378]+6DC]*10]+n*30+14  //偏移地址Y   n为[1,0x43]
[[对象头地址+378]+698+[[对象头地址+378]+6DC]*10]+n*30+18  //偏移地址Z   n为[1,0x43]
//[[对象头地址+378]+6DC]*10]为0或1,但发现,无论是0还是1都是一样的结果
//数组首地址是存在+698,因此数组数量应该也在附近,果然在+6A0位置看到了68(0x44)
[对象头地址+378]+6A0    //n的数量
```

上面找到的只是相对参考点的偏移坐标,因此需要**人物参考点坐标**.可以在到对象[头地址+378]下去找参考点坐标.按照逻辑猜测应该在这里

```c
[对象头地址+378]+190  //骨骼基准坐标X
[对象头地址+378]+194  //骨骼基准坐标Y
[对象头地址+378]+198  //骨骼基准坐标Z
```

![捕获](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204091521692.jpeg)

骨骼基准坐标大概率比人物位置坐标要低,一般是人物脚下的位置.还是实际到游戏中绘制一下看看是不是骨骼基准坐标最可靠.

### 找朝向

水平朝向值有-PI到+PI,0到360,-1到+1,非常多种.但很少出现特别大的值.

通过CE简单的搜索后,再通过手动修改来确定找到的是不是正确朝向

断到两个点,通过目标对象首地址配合CE找到目标数据  [此处用到的找偏移的理论方法](#dbg配合ce找下属偏移的高级技巧)

```c
[角色头地址+350]+36C    float    //水平朝向地址
//水平朝向值0~360,地图正东为0/360,顺时针递增
[角色头地址+350]+368    float    //垂直朝向地址
//仰角从0~89.9   0为水平值
//俯角从360~270  360为水平值
```

### 找矩阵

![image-20220331192721545](https://raw.githubusercontent.com/che77a38/blogImage2/main/202203311927800.png)

矩阵地址:   `[["BattleRoyaleTrainer-Win64-Shipping.exe"+2ADA268]+24D08*8+8]+0x280`   

其中24D08的来源涉及非常复杂的加密流程,但是他是不变的.

# 上面项目代码盘点

- [entityAround.h](#entityAround.h)
- [paint.h](#paint.h)
- [stdafx.h](#stdafx.h)
- [dllmain.cpp](#dllmain.cpp)
- [entityAround.cpp](#entityAround.cpp)
- [paint.cpp](#paint.cpp)

## entityAround.h

[回到目录](#上面项目代码盘点)         [跳转到源文件](#entityAround.cpp)

```c
#pragma once
#include <windows.h>

//三维坐标结构
struct Point3D
{
    float X;
    float Y;
    float Z;
};
//朝向结构
struct Orientation
{
    /* data */
    float horizon;
    float vertical;
};

struct Entity
{
    /* data */
    Point3D headPoint;
    Point3D footPoint;
    int hp;
    BYTE isDeath;//死亡标志位
    bool isFriend;//友方单位标志位
	//无矩阵方式为:获取人物与目标的世界坐标高度差和世界水平距离来得到人物和目标的夹角,
	//再通过人物准星减去目标夹角(或反过来)来确定准星偏转角度差, 通过准星偏转角度差来和游戏宽高分辨率来转换为屏幕坐标进行绘图
	//(无矩阵画框因为头和脚的差填入的是手动填入的固定值,并且画框的时候,目标框体的宽高比也是固定值等等,因此会有诸多问题)
    Orientation headAngle;//朝向对象的头部角度(以x正轴为底)
    Orientation footAngle;//朝向对象的脚部角度(以x正轴为底)
    Orientation headAngleDifference;//朝向目标头部和自己准星朝向的角度差(顺时针为正,逆时针为负)
    Orientation footAngleDifference;//朝向目标脚部和自己准星朝向的角度差
	bool isNotNull=true;
};


#define PI 3.1415926

class EntityAround{
public:
    Entity entity[0x100];
    unsigned int entityNum;
	Entity closeToFrontSizeEntity ;//最靠近准星的对象
    void flashEntityAround_cs();//CS1.6
	void flashEntityAround_koudaixiyou();//口袋西游
	void flashEntityAround_tuxi();//突袭
	void flashEntityAround_chijimoniqi();//吃鸡模拟器

	//计算朝向
    void calOrientation(Point3D& targetLoc,Orientation& targetAngle,Orientation& angleDiff);
};

float radianToAngle(float radian);

float angleToRadian(float angle);

//调试工具
void myOutPutDebug(const char* pszFormat, ...);
```

## paint.h

[回到目录](#上面项目代码盘点)          [跳转到源文件](#paint.cpp)

```c
#pragma once
#include "entityAround.h"
struct Point2D
{
	float X, Y;
};

struct  Vector4 
{
	float x;
	float y;
	float z;
	float w;
};

class Paint
{
public:
	HWND m_hWnd;//窗口句柄
	RECT m_wndRect;//窗口尺寸信息
	int m_resolutionWidth;//分辨率宽
	int m_resolutionHeight;//分辨率高
	RECT m_outsideWnd;//外窗口尺寸信息
	int m_outsideWndWidth;//外窗口分辨率宽
	int m_outsideWndHeight;//外窗口分辨率高
	float m_viewMatrix[16];//视角矩阵
	DWORD m_matrixAddr32;//32位矩阵地址
	DWORD64 m_matrixAddr64;//64位矩阵地址

	//取窗口信息
	void getWndInfo();
public:
	Paint(HWND hWnd,DWORD matrixAddr=NULL, COLORREF brushColor=RGB(255,0,0), COLORREF penColor=RGB(255,0,0));
	//64位非矩阵绘制未完善
	Paint(HWND hWnd, DWORD64 matrixAddr, COLORREF brushColor = RGB(255, 0, 0), COLORREF penColor = RGB(255, 0, 0));
	Paint();
	~Paint();
	HDC hdc;//画板句柄
	HBRUSH hBrush;//画刷句柄
	HFONT hfont;//字体句柄
	HPEN hPen;//画笔
	//HDC hOldDc;//老的画板句柄
	//HBRUSH hOldBrush;//老的画刷句柄
	//HPEN hOldPen;//老的画笔
	//世界坐标转屏幕坐标(无矩阵)
	bool worldPointToScreenPointWithoutMatrix(Point2D& screenPoint,const Orientation& angleDiff);
	//世界坐标转屏幕坐标
	bool worldPointToScreenPoint(Point2D& screenPoint, const Point3D& targetWorldPoint);
	//世界坐标转屏幕坐标64位
	bool worldPointToScreenPoint64(Point2D& screenPoint, const Point3D& targetWorldPoint);
	//画线(从屏幕下方中间出发到(x,y))
	void paintLine(int x, int y);
	//两点画线
	void paintLine(int x, int y, int xTo, int yTo);
	//画框
	void paintFrame(int x, int y, int w, int h, int thick);
	//针对头脚坐标画框
	void paintFrameByFootAndHead(Point2D footPoiny,Point2D headPoint,int thick);
	//画矩形
	void paintRect(int x,int y,int w,int h);
	//写字
	void paintText(int x,int y,COLORREF color,const char* text);
	//绘制
	void beginPaint();
	//更换画刷
	void changeBrush(COLORREF brushColor);
	//更换画笔
	void changePen(int penStyle,int penWidth,COLORREF penColor);
	bool 世界坐标转屏幕坐标_非矩阵(Point2D& 屏幕坐标, FLOAT  水平角度差, FLOAT 高低角度差);
};


//横向量乘矩阵函数
Vector4 RowVecTimesMatrix(const Vector4& rowVec, float matrix[16]);

//创建窗口
int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nShowCmd);

LRESULT CALLBACK windowProc(HWND hMyWnd, UINT msg, WPARAM wParam, LPARAM lParam);

//需要针对游戏进行修正,只支持32位,64位需要进行修改
void  drawTransparentWnd();
```

## stdafx.h

[回到目录](#上面项目代码盘点)         

```c
// stdafx.h : 标准系统包含文件的包含文件，
// 或是经常使用但不常更改的
// 特定于项目的包含文件
//

#pragma once

#include "targetver.h"

#define WIN32_LEAN_AND_MEAN             // 从 Windows 头中排除极少使用的资料
// Windows 头文件: 
#include <windows.h>



// TODO:  在此处引用程序需要的其他头文件
#include "string"
using namespace std;
```

## dllmain.cpp

[回到目录](#上面项目代码盘点)             [跳转到头文件](#dllmain.h)

```c
// dllmain.cpp : 定义 DLL 应用程序的入口点。
#include "stdafx.h"
#include "paint.h"
#include "entityAround.h"


void mainThread()
{
//	//无矩阵绘制流程
//	Paint paint(FindWindow(NULL,L"Counter-Strike"),0x2C20100);
//	EntityAround entityAround;
//	entityAround.flashEntityAround_cs();
//	//调试展示信息
//	char tmp2[999];
//	sprintf(tmp2, "cs1.6 g_baseAroundLoc:%X  g_baseAroundInfo:%X ", (DWORD)GetModuleHandleA("hl.exe") + 0x1B5A5C4, (DWORD)GetModuleHandleA("hl.exe") + 0x62565C);
//	OutputDebugStringA(tmp2);
//	//刷新数据后显示来看看
//	for (int i = 1; i < entityAround.entityNum; i++)//从1开始遍历跳过自己
//	{
//		char tmp[999];
//		sprintf(tmp, "cs1.6 No.%d hp:%d foot(%f,%f,%f) head(%f,%f,%f) isFriend:%d isDeath:%d",i+1, entityAround.entity[i].hp
//			, entityAround.entity[i].footPoint.X
//			, entityAround.entity[i].footPoint.Y
//			, entityAround.entity[i].footPoint.Z
//			, entityAround.entity[i].headPoint.X
//			, entityAround.entity[i].headPoint.Y
//			, entityAround.entity[i].headPoint.Z
//			, entityAround.entity[i].isFriend
//			, entityAround.entity[i].isDeath);
//		
//		OutputDebugStringA(tmp);
//	}
//
//	OutputDebugStringA("==========================================");
//
//	//死循环,不断绘制的过程
//	while (true)
//	{
//		entityAround.flashEntityAround_cs();
//		Point2D entityFootPoint2d, entityHeadPoint2d;
//		for (int i = 0; i < entityAround.entityNum; i++)//从1开始遍历跳过自己
//		{
//			if (entityAround.entity[i].isDeath)
//			{
//				continue;//死亡的跳过绘制流程
//			}
////是否使用矩阵方式
//#if 0
//			//矩阵方式!!!!!!!!!!!!!!!!!!
//			//脚坐标是否能转换成屏幕坐标(该函数内部避免了在角色身后绘制的情况),能转换成屏幕坐标的才绘制
//			if (!paint.worldPointToScreenPoint(entityFootPoint2d, entityAround.entity[i].footPoint))
//			{
//				continue;
//			}
//			//头坐标是否能转换成屏幕坐标(该函数内部避免了在角色身后绘制的情况),能转换成屏幕坐标的才绘制
//			if (!paint.worldPointToScreenPoint(entityHeadPoint2d, entityAround.entity[i].headPoint))
//			{
//				continue;
//			}
//#else
//			//非矩阵方式!!!!!!!!!!!!!!!!!!
//			//脚坐标是否能转换成屏幕坐标(该函数内部避免了在角色身后绘制的情况),能转换成屏幕坐标的才绘制
//			if (!paint.worldPointToScreenPointWithoutMatrix(entityFootPoint2d, entityAround.entity[i].footAngleDifference))
//			{
//				continue;
//			}
//			//头坐标是否能转换成屏幕坐标(该函数内部避免了在角色身后绘制的情况),能转换成屏幕坐标的才绘制
//			if (!paint.worldPointToScreenPointWithoutMatrix(entityHeadPoint2d, entityAround.entity[i].headAngleDifference))
//			{
//				continue;
//			}
//#endif 
//			//头和脚都在屏幕范围内才绘制
//			if (entityAround.entity[i].isFriend)//是朋友不绘制
//			{
//				continue;
//			}
//			//画框
//			if (GetKeyState(VK_F3) & 1)//按下F3开关绘制
//			{
//				float entityHeight = entityFootPoint2d.Y - entityHeadPoint2d.Y;
//				//myOutPutDebug("height:%f", entityHeight);
//				paint.paintFrame(entityHeadPoint2d.X - entityHeight / 4, entityHeadPoint2d.Y, entityHeight / 2, entityHeight, 1);
//				//paint.paintText(entityFootPoint2d.X, entityFootPoint2d.Y, RGB(255, 0, 0), "foot");
//				//paint.paintText(entityHeadPoint2d.X, entityHeadPoint2d.Y, RGB(255, 0, 0), "head");
//				//float head =  entityHeadPoint2d.Y - entityFootPoint2d.Y;
//				//float width = head / 2;
//				//float center = width / -2;
//				//float extra = head / -6;
//				//FPS_绘制.画框((int)(屏幕坐标_j.x + center), (int)屏幕坐标_j.y, (int)width, (int)(head - extra), 1);
//				//paint.paintFrame(entityFootPoint2d.X + center, entityFootPoint2d.Y, width, head - extra, 1);
//
//			}
//			//myOutPutDebug("cs1.6 第%d号  foot(%f,%f)  head(%f,%f)", i + 1, entityFootPoint2d.X, entityFootPoint2d.Y, entityHeadPoint2d.X, entityHeadPoint2d.Y);
//			
//		}
//
//			if (entityAround.closeToFrontSizeEntity.isNotNull)
//			{
//				if (GetAsyncKeyState(VK_RBUTTON) )//按下右键
//				{
//					//校准
//					Point3D targetPoint = entityAround.closeToFrontSizeEntity.footPoint;
//					targetPoint.Z += 56;//刚好指到头
//					Orientation targetAngle, targetAngleDiffer;
//					entityAround.calOrientation(targetPoint, targetAngle, targetAngleDiffer);
//					//修改内存准星数据(非矩阵有问题!!!!!)
//					*(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x19E10C4) = targetAngle.vertical;
//					*(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x19E10C8) = targetAngle.horizon;
//					//SetCursorPos(entityHeadPoint2d.X, entityHeadPoint2d.Y);//不行
//				}
//				
//			}
//
//		
//		if (GetKeyState(VK_F2)&1)//按下F2彻底退出
//		{
//			break;
//		}
//		Sleep(1);
//	}
	
	
	//口袋西游
	//DWORD matrixAddr = (*(DWORD*)0xD2E5D0) + 0xE8;
	//Paint paint(FindWindow(NULL, L"口袋西游"), matrixAddr);
	//EntityAround entityAround; 
	//while (true)
	//{
	//	entityAround.flashEntityAround_koudaixiyou();
	//	for (int i = 0; i < entityAround.entityNum; i++)
	//	{
	//		Point2D entityFootPoint2d, entityHeadPoint2d;
	//		if (!paint.worldPointToScreenPoint(entityFootPoint2d, entityAround.entity[i].footPoint))
	//		{
	//			continue;
	//		}
	//		if (!paint.worldPointToScreenPoint(entityHeadPoint2d, entityAround.entity[i].headPoint))
	//		{
	//			continue;
	//		}
	//		if (GetKeyState(VK_F3) & 1)//按下F3开关绘制
	//		{
	//			paint.paintText(entityFootPoint2d.X, entityFootPoint2d.Y, RGB(255, 0, 0), "foot");
	//			paint.paintText(entityHeadPoint2d.X, entityHeadPoint2d.Y, RGB(255, 0, 0), "head");
	//		}
	//	}
	//	Sleep(1);
	//	if (GetKeyState(VK_F2) & 1)//按下F2彻底退出
	//	{
	//		break;
	//	}
	//}

	//突袭
	//Paint paint(FindWindow(NULL, L"AssaultCube"), 0x57AFE0);
	//EntityAround entityAround;
	//while (true)
	//{
	//	entityAround.flashEntityAround_tuxi();
	//	for (int i = 0; i < entityAround.entityNum; i++)
	//	{
	//		Point2D entityFootPoint2d, entityHeadPoint2d;
	//		if (!paint.worldPointToScreenPoint(entityFootPoint2d, entityAround.entity[i].footPoint))
	//		{
	//			continue;
	//		}
	//		if (!paint.worldPointToScreenPoint(entityHeadPoint2d, entityAround.entity[i].headPoint))
	//		{
	//			continue;
	//		}
	//		if (entityAround.entity[i].isDeath)
	//		{
	//			continue;
	//		}
	//		if (GetKeyState(VK_F3) & 1)//按下F3开关绘制
	//		{
	//			paint.paintText(entityFootPoint2d.X, entityFootPoint2d.Y, RGB(255, 0, 0), "foot");
	//			paint.paintText(entityHeadPoint2d.X, entityHeadPoint2d.Y, RGB(255, 0, 0), "head");
	//		}
	//	}
	//	Sleep(1);
	//	if (GetKeyState(VK_F2) & 1)//按下F2彻底退出
	//	{
	//		break;
	//	}
	//}


	//吃鸡模拟器绘制
	DWORD64 matrixAddr = *(DWORD64*)(*(DWORD64*)((DWORD64)GetModuleHandleA("BattleRoyaleTrainer-Win64-Shipping.exe") + 0x2ADA268) + 0x24D08 * 8 + 8) + 0x280;
	myOutPutDebug("matrix: %llx", matrixAddr);
	Paint paint(FindWindow(L"UnrealWindow", 0), matrixAddr);
	EntityAround entityArround;
	while (true)
	{
		entityArround.flashEntityAround_chijimoniqi();
		for (int i = 0; i < (int)entityArround.entityNum; i++)
		{
			//if (entityArround.entity[i].isFriend || entityArround.entity[i].isDeath)//排除死的和友军的
			//{
			//	continue;
			//}
			Point2D screenFootPoint, screenHeadPoint;
			float footTmp = entityArround.entity[i].footPoint.Z;
			entityArround.entity[i].headPoint.X = entityArround.entity[i].footPoint.X;
			entityArround.entity[i].headPoint.Y = entityArround.entity[i].footPoint.Y;
			entityArround.entity[i].headPoint.Z = entityArround.entity[i].footPoint.Z+60;
			entityArround.entity[i].footPoint.Z = footTmp -100;
			if (paint.worldPointToScreenPoint64(screenFootPoint, entityArround.entity[i].footPoint))
			{
				if (paint.worldPointToScreenPoint64(screenHeadPoint, entityArround.entity[i].headPoint))
				{
					if (GetKeyState(VK_F3) & 1)//按下F3开关绘制
					{
						paint.paintFrameByFootAndHead(screenFootPoint, screenHeadPoint, 1);
						//paint.paintText(screenFootPoint.X, screenFootPoint.Y, RGB(255, 0, 0), "foot");
					}
				}
			}
		}

			Sleep(1);
			if (GetKeyState(VK_F2) & 1)//按下F2彻底退出
			{
				break;
			}
	}
}


HWND hMyWnd;//用于储存自建窗口的句柄

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nShowCmd)
{
	//测试hdc的释放
	//while (1)
	//{
	//	Paint paintTest(FindWindow(L"Valve001", 0), (DWORD)GetModuleHandleA("hl.exe") + 0x1820100);
	//	ReleaseDC(paintTest.m_hWnd, paintTest.hdc);
	//	paintTest.hdc = GetDC(paintTest.m_hWnd);
	//	ReleaseDC(paintTest.m_hWnd, paintTest.hdc);
	//	if (GetKeyState(VK_F3) & 1)//按下F3退出消息循环
	//	{
	//		myOutPutDebug("test quit");
	//		return 0;
	//	}
	//	Sleep(10);
	//}
	myOutPutDebug("begin");
	::WNDCLASSEXA winClass;
	winClass.lpszClassName = "zijiandialog";
	winClass.cbSize = sizeof(::WNDCLASSEX);
	winClass.style = CS_HREDRAW | CS_VREDRAW | CS_OWNDC | CS_DBLCLKS;
	winClass.lpfnWndProc = windowProc;//回调函数
	winClass.hInstance = hInstance;
	winClass.hIcon = 0;
	winClass.hIconSm = 0;
	winClass.hCursor = LoadCursor(NULL, IDC_ARROW);
	winClass.hbrBackground = NULL;//(HBRUSH)(BLACK_BRUSH); // 背景颜色
	winClass.lpszMenuName = NULL;
	winClass.cbClsExtra = 0;
	winClass.cbWndExtra = 0;

	RegisterClassExA(&winClass);//注册窗口类

								//创建窗口
	hMyWnd = CreateWindowExA(
		128 | 32 | 8 | WS_EX_LAYERED,// 扩展风格  透明窗口 WS_EX_LAYERED
		"zijiandialog",//类名指针
		"自建窗口",//窗口名指针
		WS_EX_LAYERED | 0 | 0x10000 | 0x20000 | 0x2000000 | WS_POPUP,//窗口的风格 
		100,//初始水平位置
		100,//初始垂直位置
		GetSystemMetrics(SM_CXSCREEN) * 640 / 1920,//宽度   游戏水平窗口分辨率/屏幕水平分辨率   由于此两项是初始位置,所以写什么都行,反正下面会实时修正
		GetSystemMetrics(SM_CYSCREEN) * 480 / 1080,//高度   游戏窗口垂直分辨率/屏幕垂直分辨率  
		0,
		0,
		hInstance,//应用程序实例的句柄  
		0//用户自定义的变量
		);
	myOutPutDebug("hMyWnd: %d   error: %d", hMyWnd, GetLastError());
	SetWindowPos(hMyWnd, (HWND)-1, 100, 100, 0, 0, 19);
	ShowWindow(hMyWnd, SW_NORMAL);//显示窗口
	UpdateWindow(hMyWnd);//更新窗口
	SetWindowLongA(hMyWnd, -20, 589992);
	SetLayeredWindowAttributes(hMyWnd, 0, 1, 2);
	SetLayeredWindowAttributes(hMyWnd, 0, 0, 1);

	//window 消息循环
	MSG msg = { 0 };
	while (true)
	{
		//置顶窗口
		::SetWindowPos(hMyWnd, HWND_TOPMOST, 0, 0, 0, 0, SWP_NOSIZE | SWP_NOMOVE);
		//读取当前的主框架的style
		DWORD dwStyle = ::GetWindowLong(hMyWnd, GWL_EXSTYLE);
		if (!((dwStyle & WS_EX_TOPMOST) == WS_EX_TOPMOST))
		{
			//保证主框架前置，然后再恢复到正常状态
			SetWindowPos(hMyWnd, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOSIZE | SWP_NOMOVE);
		}

		if (msg.message == WM_ERASEBKGND)
		{
			break;
		}

		if (msg.message == WM_DESTROY || msg.message == WM_CLOSE || msg.message == WM_QUIT)
		{
			break;
		}
		if (PeekMessage(&msg, hMyWnd, 0, 0, PM_REMOVE))
		{
			DispatchMessage((&msg));//分发消息
			TranslateMessage(&msg);//解释消息	
		}
		Sleep(10);
		if (GetKeyState(VK_F3) & 1)//按下F3退出消息循环
		{
			myOutPutDebug("quit");
			break;
		}
	}
	return 0;
}



//回调函数
LRESULT CALLBACK windowProc(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam)
{
	switch (msg)
	{
	case WM_PAINT:
		drawTransparentWnd();//针对每款游戏提供!!!!!!!!!
		return 0;
	case WM_SIZE:
		break;
	case WM_CLOSE:
	case WM_DESTROY:
		PostQuitMessage(0);
		break;
	default:
		break;
	}
	return DefWindowProc(hWnd, msg, wParam, lParam);
}



EntityAround entityAround;//全局工具

HBRUSH hBrush;
HDC hdc;
Point2D screenFootPoint, screenHeadPoint;

//透明窗口绘制(针对每款游戏实现)!!!!!!!!!
void  drawTransparentWnd()
{
	RECT myWnd;
	GetClientRect(hMyWnd, &myWnd);//获取自己的窗口的宽高位置信息
								  //InvalidateRect(hMyWnd, &myWnd, TRUE);
								  //UpdateWindow(hMyWnd);//更新窗口 

	//这里是为了清空上一次的绘制
	hdc = GetDC(hMyWnd);
	hBrush = CreateSolidBrush(RGB(0, 0, 0));
	FillRect(hdc, &myWnd, hBrush);//绘制矩形

	DeleteObject(hBrush);
	//区别似乎只有下面这个类...
	Paint paintMyWnd(FindWindow(L"Valve001", 0), (DWORD)GetModuleHandleA("hl.exe") + 0x1820100);//针对32位
	paintMyWnd.getWndInfo();
	//不断地跟我们的窗口重合
	MoveWindow(hMyWnd, paintMyWnd.m_outsideWnd.left + (paintMyWnd.m_outsideWndWidth - paintMyWnd.m_resolutionWidth) / 2, paintMyWnd.m_outsideWnd.top + (paintMyWnd.m_outsideWndHeight - paintMyWnd.m_resolutionHeight - (paintMyWnd.m_outsideWndWidth - paintMyWnd.m_resolutionWidth) / 2), paintMyWnd.m_outsideWnd.right- paintMyWnd.m_outsideWnd.left, paintMyWnd.m_outsideWnd.bottom- paintMyWnd.m_outsideWnd.top, 1);

	entityAround.flashEntityAround_cs();
	//myOutPutDebug("前hMyWnd: %d   hdc: %d", (DWORD)hMyWnd, (DWORD)paintMyWnd.hdc);
	ReleaseDC(paintMyWnd.m_hWnd, paintMyWnd.hdc);//清除原有hdc
	paintMyWnd.m_hWnd = hMyWnd;
	paintMyWnd.hdc = hdc;//绘画前更新绘画目标为新建窗口对应的hdc
	//myOutPutDebug("后hMyWnd: %d   hdc: %d", (DWORD)hMyWnd, (DWORD)paintMyWnd.hdc);
	paintMyWnd.paintText(paintMyWnd.m_resolutionWidth / 2, paintMyWnd.m_resolutionHeight / 2, RGB(255, 0, 0), "准星");//绘制准星

	for (int i = 0; i < (int)entityAround.entityNum; i++)
	{
		if (entityAround.entity[i].isDeath)
		{
			continue;
		}
		if (entityAround.entity[i].isFriend)
		{
			continue;
		}
		Point3D footPoint = { entityAround.entity[i].footPoint.X ,entityAround.entity[i].footPoint.Y ,entityAround.entity[i].footPoint.Z };

		if (paintMyWnd.worldPointToScreenPoint(screenFootPoint, footPoint))
		{
			Point3D headPoint = { entityAround.entity[i].headPoint.X ,entityAround.entity[i].headPoint.Y ,entityAround.entity[i].headPoint.Z };
			if (paintMyWnd.worldPointToScreenPoint(screenHeadPoint, headPoint))
			{
				float head = (float)screenHeadPoint.Y - (float)screenFootPoint.Y;//  负数高度
				float width = head / 2;   //  负数宽度
				float center = width / -2;  //  一半宽度
				float extra = head / -6;   //  三分之一 宽度

				paintMyWnd.paintFrame((int)(screenFootPoint.X + center), (int)screenFootPoint.Y, (int)width, (int)(head - extra), 1);

				//DeleteObject(hBrush);

				char healthChar[255];
				sprintf_s(healthChar, sizeof(healthChar), "%d", entityAround.entity[i].hp);
				paintMyWnd.paintText((int)screenFootPoint.X, (int)screenFootPoint.Y, RGB(255, 0, 0), healthChar);
				if (GetKeyState(VK_F4) & 1)//按下F2打开射线绘制
				{
					//下面的画线有问题
					paintMyWnd.paintLine((int)screenFootPoint.X, (int)screenFootPoint.Y);
				}

			}
		}
	}
	//ReleaseDC(hMyWnd, hdc);

}

BOOL APIENTRY DllMain( HMODULE hModule,
                       DWORD  ul_reason_for_call,
                       LPVOID lpReserved
					 )
{
	switch (ul_reason_for_call)
	{
	case DLL_PROCESS_ATTACH:
		//禁用指定动态链接库 (DLL) 的 DLL_THREAD_ATTACH 和 DLL_THREAD_DETACH 通知
		DisableThreadLibraryCalls(hModule);
		//CreateThread(0, 0, (LPTHREAD_START_ROUTINE)mainThread, 0, 0, 0);
		CreateThread(0, 0, (LPTHREAD_START_ROUTINE)WinMain, 0, 0, 0);//自建窗口
		break;
	case DLL_THREAD_ATTACH:
	case DLL_THREAD_DETACH:
	case DLL_PROCESS_DETACH:
		break;
	}
	return TRUE;
}
```

## entityAround.cpp

[回到目录](#上面项目代码盘点)            [跳转到头文件](#entityAround.h)

```c
#include "entityAround.h"
#include <windows.h>
#include <iostream>
using namespace std;
DWORD g_baseAroundLoc = (DWORD)GetModuleHandleA("hl.exe")+0x1B5A5C4;
DWORD g_baseAroundInfo = (DWORD)GetModuleHandleA("hl.exe") + 0x62565C;

//初始化值(未判断离得远的敌人的框体消除)
void EntityAround::flashEntityAround_cs()
{
	//读取自己的阵营
	BYTE myCam = *(BYTE*)(g_baseAroundInfo + 0x68 * 0 + 0x4E);//0号位置是自己
	entityNum = 0;
	closeToFrontSizeEntity.isNotNull = 0;
	//最小角度差和初始值
	float theMiniAngleDiffSum = 999;
    for (int i = 1; i < 32; i++)//从1开始遍历,跳过自己
    {
    	if (*(DWORD*)g_baseAroundLoc+0x24C*i==0)//遍历到了真正的边界直接结束
    	{
			break;
    	}
		if (*(DWORD*)g_baseAroundLoc + 0x24C * i+0x190 == 0)//跳过无用的数组项
		{
			continue;
		}
		//真正是entity
		entity[entityNum].footPoint.X = *(FLOAT*)(g_baseAroundLoc + 0x24C * i + 0x188);
		entity[entityNum].footPoint.Y = *(FLOAT*)(g_baseAroundLoc + 0x24C * i + 0x18C);
		entity[entityNum].footPoint.Z = *(FLOAT*)(g_baseAroundLoc + 0x24C * i + 0x190)-52 ;
		entity[entityNum].headPoint.X = *(FLOAT*)(g_baseAroundLoc + 0x24C * i + 0x188);
		entity[entityNum].headPoint.Y = *(FLOAT*)(g_baseAroundLoc + 0x24C * i + 0x18C);
		entity[entityNum].headPoint.Z = *(FLOAT*)(g_baseAroundLoc + 0x24C * i + 0x190)+10 ;
		if (myCam== *(BYTE*)(g_baseAroundInfo + 0x68 * i + 0x4E))
		{
			entity[entityNum].isFriend = true;
		}
		else
		{
			entity[entityNum].isFriend = false;
		}
		entity[entityNum].isDeath = *(BYTE*)(g_baseAroundInfo + 0x68 * i + 0x60);
		entity[entityNum].hp= *(DWORD*)(g_baseAroundInfo + 0x68 * i + 0x68);
		//计算朝向
		calOrientation(entity[entityNum].footPoint, entity[entityNum].footAngle, entity[entityNum].footAngleDifference);
		calOrientation(entity[entityNum].headPoint, entity[entityNum].headAngle, entity[entityNum].headAngleDifference);
		
		//获取离准星最近的对象(用于自瞄)
		if (fabs(entity[entityNum].headAngleDifference.horizon)<45&&fabs(entity[entityNum].headAngleDifference.vertical)<35&&!entity[entityNum].isFriend&&!entity[entityNum].isDeath)
		{
			// 是没死的敌人,并且在我们的自瞄范围中
			float tmp = fabs(entity[entityNum].headAngleDifference.horizon) + fabs(entity[entityNum].headAngleDifference.vertical);
			if (tmp < theMiniAngleDiffSum)
			{
				theMiniAngleDiffSum = tmp;
				closeToFrontSizeEntity = entity[entityNum];//获取离准星最近的对象
			}
		}

		entityNum++;
	}
}


void EntityAround::flashEntityAround_koudaixiyou()
{
	DWORD temp = *(DWORD*)((*(DWORD*)((*(DWORD*)((*(DWORD*)0xD0DF1C) + 0x1C)) + 0x8)) + 0x20);
	entityNum = *(DWORD*)(temp + 0x5C);
	DWORD entityBase = *(DWORD*)(temp + 0x58);
	for (int i = 0; i < (int)entityNum; i++)
	{
		entity[i].footPoint.X = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0x2DC);
		entity[i].footPoint.Y = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0x2E0);
		entity[i].footPoint.Z = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0x2E4);
		entity[i].headPoint.X = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0x2E8);
		entity[i].headPoint.Y = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0x2EC);
		entity[i].headPoint.Z = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0x2F0);
		entity[i].isFriend = 0;
		entity[i].hp= *(DWORD*)(*(DWORD*)(entityBase + 0x4 * i) + 0x138);//未攻击的血量为0
		entity[i].isDeath = *(BYTE*)(*(DWORD*)(entityBase + 0x4 * i) + 0xED);
	}
	//自己的人物也加进去,因为游戏是第三人称,人物本身也是在游戏中的.
	entityNum++;
	entity[entityNum - 1].footPoint.X = *(FLOAT*)((*(DWORD*)((*(DWORD*)((*(DWORD*)0xD0DF1C) + 0x1C)) + 0x28)) + 0x578);
	entity[entityNum - 1].footPoint.Y = *(FLOAT*)((*(DWORD*)((*(DWORD*)((*(DWORD*)0xD0DF1C) + 0x1C)) + 0x28)) + 0x57C);
	entity[entityNum - 1].footPoint.Z = *(FLOAT*)((*(DWORD*)((*(DWORD*)((*(DWORD*)0xD0DF1C) + 0x1C)) + 0x28)) + 0x580);
	entity[entityNum - 1].headPoint.X = *(FLOAT*)((*(DWORD*)((*(DWORD*)((*(DWORD*)0xD0DF1C) + 0x1C)) + 0x28)) + 0x584);
	entity[entityNum - 1].headPoint.Y = *(FLOAT*)((*(DWORD*)((*(DWORD*)((*(DWORD*)0xD0DF1C) + 0x1C)) + 0x28)) + 0x588);
	entity[entityNum - 1].headPoint.Z = *(FLOAT*)((*(DWORD*)((*(DWORD*)((*(DWORD*)0xD0DF1C) + 0x1C)) + 0x28)) + 0x58C);
	entity[entityNum - 1].isFriend = 0;
	entity[entityNum - 1].hp = *(DWORD*)((*(DWORD*)((*(DWORD*)((*(DWORD*)0xD0DF1C) + 0x1C)) + 0x28)) + 0x288);
	entity[entityNum - 1].isDeath = 0;



}

void EntityAround::flashEntityAround_tuxi()
{
	entityNum = *(DWORD*)0x587C18;
	DWORD entityBase = *(DWORD*)0x587C10;
	for (int i = 1; i < (int)entityNum; i++)//从1开始遍历跳过无效数据
	{
		entity[i].footPoint.X = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0x28);
		entity[i].footPoint.Y = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0x2C);
		entity[i].footPoint.Z = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0x30);
		entity[i].headPoint.X = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0x4);
		entity[i].headPoint.Y = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0x8);
		entity[i].headPoint.Z = *(FLOAT*)(*(DWORD*)(entityBase + 0x4 * i) + 0xC);
		entity[i].isFriend = 0;
		entity[i].hp = *(DWORD*)(*(DWORD*)(entityBase + 0x4 * i) + 0xEC);
		if (entity[i].hp<=0)
		{
			entity[i].isDeath = 1;
		}
		else
		{
			entity[i].isDeath = 0;
		}
		
	}
}

//吃鸡模拟器遍历
DWORD64 worldAddress = (DWORD64)GetModuleHandleA("BattleRoyaleTrainer-Win64-Shipping.exe") + 0x2AF0FB8;
DWORD64 humanVirtualTableFlag = (DWORD64)GetModuleHandleA("BattleRoyaleTrainer-Win64-Shipping.exe") + 0x1D45740;
void EntityAround::flashEntityAround_chijimoniqi()
{
	__try
	{
		DWORD worldCount = *(DWORD*)(*(DWORD64*)(*(DWORD64*)worldAddress + 0x30) + 0xB8);
		DWORD64 worldArrayAddr = *(DWORD64*)(*(DWORD64*)(*(DWORD64*)worldAddress + 0x30) + 0xB0);
		//myOutPutDebug("世界数组: %x  %llx", worldCount, worldArrayAddr);
		int realNo = 0;//真实的对象数量
		for (int i = 0; i < (int)worldCount; i++)
		{
			DWORD64 object = *(DWORD64*)(worldArrayAddr + i * 8);
			if (IsBadReadPtr((DWORD64*)object,8))//排除不可以访问的指针
			{
				continue;
			}
			if (*(DWORD64*)object!= humanVirtualTableFlag )//不符合人物特征,同时排除了作废对象
			{
				continue;
			}
			entity[realNo].hp = (DWORD)*(FLOAT*)(object + 0x7CC);
			if (entity[realNo].hp<=0)//排除死亡人物
			{
				continue;
			}
			entity[realNo].footPoint.X = *(FLOAT*)(*(DWORD64*)(object + 0x158) + 0x190);
			entity[realNo].footPoint.Y = *(FLOAT*)(*(DWORD64*)(object + 0x158) + 0x194);
			entity[realNo].footPoint.Z = *(FLOAT*)(*(DWORD64*)(object + 0x158) + 0x198);
			entity[realNo].isFriend = 0;
			entity[realNo].isDeath = 0;//只有未死亡的才记录了,所以默认都是未死亡
			realNo++;
		}
		entityNum = realNo;
		myOutPutDebug("数量:%d", realNo);

	}
	__except (1)
	{
		myOutPutDebug("something wrong1");
	}

}

void EntityAround::calOrientation(Point3D& targetLoc,Orientation& targetAngle,Orientation& angleDiff)
{
	FLOAT fov_X = *(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x195fe58);
	FLOAT fov_Y = *(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x195fe5c);
	FLOAT fov_Z = *(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x195fe60);
	FLOAT fov_horizon= *(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x19E10C8);
	FLOAT fov_vertical = *(FLOAT*)((DWORD)GetModuleHandleA("hl.exe") + 0x19E10C4);
	//水平朝向确定
	if (targetLoc.X >= fov_X&&targetLoc.Y >= fov_Y)
	{
		//第一象限
		targetAngle.horizon= radianToAngle(atan2(targetLoc.Y - fov_Y, targetLoc.X - fov_X));
	}
	else if (targetLoc.X <= fov_X&&targetLoc.Y >= fov_Y)
	{
		//第二象限
		targetAngle.horizon = 180- radianToAngle(atan2(targetLoc.Y - fov_Y, fov_X - targetLoc.X));
	}
	else if (targetLoc.X <= fov_X&&targetLoc.Y <= fov_Y)
	{
		//第三象限
		targetAngle.horizon = 180+ radianToAngle(atan2(fov_Y - targetLoc.Y, fov_X - targetLoc.X));
	}
	else if (targetLoc.X >= fov_X&&targetLoc.Y <= fov_Y)
	{
		//第四象限
		targetAngle.horizon = 360 - radianToAngle(atan2(fov_Y - targetLoc.Y, targetLoc.X - fov_X));
	}
	//垂直朝向确定
	FLOAT distance = sqrt((targetLoc.X - fov_X)*(targetLoc.X - fov_X) + (targetLoc.Y - fov_Y)*(targetLoc.Y - fov_Y));
	if (targetLoc.Z >= fov_Z)
	{
		//上方
		targetAngle.vertical = -radianToAngle(atan2(targetLoc.Z - fov_Z, distance));//必须加负数,因为游戏逆向朝上转视角是负数
	}
	else
	{
		//下方
		targetAngle.vertical = radianToAngle(atan2(fov_Z - targetLoc.Z, distance));
	}
	//计算朝向目标头部和自己准星朝向的角度差(顺时针为正,逆时针为负)
	angleDiff.horizon = fov_horizon - targetAngle.horizon;
	if (angleDiff.horizon<=-180)//跨0轴的两种情况,防止超出水平转向区间
	{
		angleDiff.horizon += 360;
	}
	if (angleDiff.horizon>180)
	{
		angleDiff.horizon -= 360;
	}
	angleDiff.vertical = targetAngle.vertical - fov_vertical;

}





float angleToRadian(float angle)
{
	return (FLOAT)(angle*PI / 180);
}

void myOutPutDebug(const char* pszFormat, ...)
{
	char szbufFormat[0x1000];
	char szbufFormat_Game[0x1100] = "";
	va_list argList;
	va_start(argList, pszFormat);
	vsprintf_s(szbufFormat, pszFormat, argList);
	strcat_s(szbufFormat_Game, "FPS ");// 加上输出头特征
	strcat_s(szbufFormat_Game, szbufFormat);
	OutputDebugStringA(szbufFormat_Game);// 编码转换
	va_end(argList);
}


float radianToAngle(float radian)
{
	return (FLOAT)(radian * 180 / PI);
}
```

## paint.cpp

[回到目录](#上面项目代码盘点)                [跳转到头文件](#paint.h)

```c
#include "paint.h"
#include <math.h>
#include <stdio.h>
#include <windows.h>



void Paint::getWndInfo()
{
	//获得窗口信息
	GetClientRect(m_hWnd,&m_wndRect);
	m_resolutionWidth = m_wndRect.right - m_wndRect.left;
	m_resolutionHeight = m_wndRect.bottom - m_wndRect.top;
	GetWindowRect(m_hWnd, &m_outsideWnd);  //含有边框及全屏幕坐标
	m_outsideWndWidth = m_outsideWnd.right - m_outsideWnd.left;
	m_outsideWndHeight = m_outsideWnd.bottom - m_outsideWnd.top;
}

Paint::Paint(HWND hWnd, DWORD matrixAddr,COLORREF brushColor,COLORREF penColor)
{
	m_hWnd = hWnd;
	m_matrixAddr32 = matrixAddr;
	if (matrixAddr!=NULL)
	{
		memcpy(&m_viewMatrix, (VOID*)m_matrixAddr32, sizeof(m_viewMatrix));
	}
	getWndInfo();
	hdc = GetDC(hWnd);
	hBrush = CreateSolidBrush(brushColor);
	hPen = CreatePen(PS_SOLID, 1, penColor);
	DeleteObject(SelectObject(hdc,hBrush));
	DeleteObject(SelectObject(hdc, hPen));
}

Paint::Paint(HWND hWnd, DWORD64 matrixAddr64, COLORREF brushColor, COLORREF penColor)
{
	m_hWnd = hWnd;
	m_matrixAddr64 = matrixAddr64;
	if (matrixAddr64 != NULL)
	{
		memcpy(&m_viewMatrix, (VOID*)m_matrixAddr64, sizeof(m_viewMatrix));
	}
	getWndInfo();
	hdc = GetDC(hWnd);
	hBrush = CreateSolidBrush(brushColor);
	hPen = CreatePen(PS_SOLID, 1, penColor);
	DeleteObject(SelectObject(hdc, hBrush)) ;//删除原来的句柄
	DeleteObject(SelectObject(hdc, hPen));
}

Paint::Paint()
{
	
}


Paint::~Paint()
{
	if (hdc)
	{
		ReleaseDC(m_hWnd,hdc);
	}
	if (hBrush)
	{
		DeleteObject(hBrush);
	}
	if (hPen)
	{
		DeleteObject(hPen);
	}
}

bool Paint::worldPointToScreenPointWithoutMatrix(Point2D & screenPoint, const Orientation& angleDiff)
{
	getWndInfo();
	//最大
	float maxVerticalViewAngle = radianToAngle(atan2(m_resolutionHeight, m_resolutionWidth));
	if (fabs(angleDiff.horizon) > 45 || fabs(angleDiff.vertical) > maxVerticalViewAngle)
	{
		return false;//不在屏幕范围内
	}
	int horizonDiff = (int)(tan(angleToRadian(angleDiff.horizon))*((m_resolutionWidth) / 2));
	screenPoint.X = (float)(m_resolutionWidth / 2 + horizonDiff);

	int verticalDiff = (int)(tan(angleToRadian(angleDiff.vertical))*((m_resolutionWidth) / 2));
	screenPoint.Y = (float)(m_resolutionHeight / 2 + verticalDiff);
	return TRUE;
}
void Paint::changeBrush(COLORREF brushColor)
{
	hBrush = CreateSolidBrush(brushColor);
	if (hdc&&hBrush)
	{
		DeleteObject(SelectObject(hdc, hBrush));
	}
}
void Paint::changePen(int penStyle, int penWidth, COLORREF penColor)
{
	hPen = CreatePen(penStyle, penWidth, penColor);
	if (hdc&&hPen)
	{
		DeleteObject(SelectObject(hdc, hPen) );
	}
}
bool Paint::世界坐标转屏幕坐标_非矩阵(Point2D& 屏幕坐标, FLOAT  水平角度差, FLOAT 高低角度差)
{

	getWndInfo();
	FLOAT 高低可视角度 = (FLOAT)((double)atan2(m_resolutionHeight, m_resolutionWidth) * 180 / 3.1415);
	if (fabs(水平角度差) > 45 || fabs(高低角度差) > 高低可视角度)
	{
		return false;// 不在屏幕范围内
	}
	int 水平差 = (int)(tan(水平角度差 * 3.1416 / 180) * ((m_resolutionWidth) / 2));
	屏幕坐标.X = (float)(m_resolutionHeight / 2 + 水平差);

	int 高度差 = (int)(tan(高低角度差 * 3.1416 / 180) * ((m_resolutionWidth) / 2));
	屏幕坐标.Y = (float)(m_resolutionHeight / 2 + 高度差);

	return true;
}

bool Paint::worldPointToScreenPoint(Point2D & screenPoint,const Point3D& targetWorldPoint)
{
	getWndInfo();
	//刷新矩阵
	memcpy(&m_viewMatrix, (PVOID)m_matrixAddr32, sizeof(m_viewMatrix));
	Vector4 worldLocation = { targetWorldPoint.X,targetWorldPoint.Y,targetWorldPoint.Z,1};//世界坐标
	//世界坐标配合矩阵算出裁剪坐标(目前只考虑了列主序,还需要考虑行主序的情况)
	Vector4 cutLocation= RowVecTimesMatrix(worldLocation, m_viewMatrix);
	if (cutLocation.w<0.0)//剪辑坐标w如果小于0,表示在屏幕外
	{
		return false;
	}
	Point2D NDC;//ndc坐标
	NDC.X = cutLocation.x / cutLocation.w;
	NDC.Y = cutLocation.y / cutLocation.w;
	screenPoint.X = (NDC.X*m_resolutionWidth + m_resolutionWidth) / 2;
	screenPoint.Y = (m_resolutionHeight - m_resolutionHeight*NDC.Y) / 2;
	return true;
}

bool Paint::worldPointToScreenPoint64(Point2D & screenPoint, const Point3D& targetWorldPoint)
{
	getWndInfo();
	//刷新矩阵
	memcpy(&m_viewMatrix, (DWORD64*)m_matrixAddr64, sizeof(m_viewMatrix));
	Vector4 worldLocation = { targetWorldPoint.X,targetWorldPoint.Y,targetWorldPoint.Z,1 };//世界坐标
																						   //世界坐标配合矩阵算出裁剪坐标(目前只考虑了列主序,还需要考虑行主序的情况)
	Vector4 cutLocation = RowVecTimesMatrix(worldLocation, m_viewMatrix);
	if (cutLocation.w < 0.0f)//剪辑坐标w如果小于0,表示在屏幕外
	{
		return false;
	}
	Point2D NDC;//ndc坐标
	NDC.X = cutLocation.x / cutLocation.w;
	NDC.Y = cutLocation.y / cutLocation.w;
	screenPoint.X = (NDC.X*m_resolutionWidth + m_resolutionWidth) / 2;
	screenPoint.Y = (m_resolutionHeight - m_resolutionHeight*NDC.Y) / 2;
	return true;
}

void Paint::paintLine(int x,int y)
{
	getWndInfo();
	//从屏幕下方中间点开始画
	MoveToEx(hdc, m_resolutionWidth / 2, m_resolutionHeight, 0);
	LineTo(hdc, x, y);
}

void Paint::paintLine(int x, int y, int xTo, int yTo)
{
	MoveToEx(hdc,x, y, 0);
	LineTo(hdc, xTo, yTo);
}

void Paint::paintFrame(int x,int y,int w,int h,int thick)
{
	//顶边
	paintRect(x, y, w, thick);
	//左边
	paintRect(x, y+thick, thick, h-thick);
	//右边
	paintRect(x+w-thick, y+thick, thick, h-thick);
	//底边
	paintRect(x+thick, y+h-thick, w-2*thick, thick);
}

void Paint::paintFrameByFootAndHead(Point2D footPoiny, Point2D headPoint, int thick)
{
	float head = headPoint.Y - footPoiny.Y;	//负数高度
	float width = head / 2;	//负数宽度
	float center = width / -2;	//一半宽度
	float extra = head / -6;	//三分之一宽度
	paintFrame((int)(footPoiny.X + center), (int)footPoiny.Y, (int)width, (int)(head - extra), thick);
}

void Paint::paintRect(int x, int y, int w, int h)
{
	RECT rect = { x,y,x + w,y + h };
	FillRect(hdc, &rect, hBrush);
}

void Paint::paintText(int x, int y, COLORREF color, const char * text)
{
	SetTextAlign(hdc, TA_CENTER | TA_NOUPDATECP);
	SetBkColor(hdc, RGB(0, 0, 0));
	SetBkMode(hdc, TRANSPARENT);
	SetTextColor(hdc, color);
	DeleteObject(SelectObject(hdc, hfont));//删除原来的字体句柄
	TextOutA(hdc, x, y, text, strlen(text));
	DeleteObject(hfont);
}

Vector4 RowVecTimesMatrix(const Vector4& rowVec, float matrix[16])
{
	Vector4 retVec;
	retVec.x = rowVec.x*matrix[0] + rowVec.y*matrix[4] + rowVec.z*matrix[8] + rowVec.w*matrix[12];
	retVec.y = rowVec.x*matrix[1] + rowVec.y*matrix[5] + rowVec.z*matrix[9] + rowVec.w*matrix[13];
	retVec.z = rowVec.x*matrix[2] + rowVec.y*matrix[6] + rowVec.z*matrix[10] + rowVec.w*matrix[14];
	retVec.w = rowVec.x*matrix[3] + rowVec.y*matrix[7] + rowVec.z*matrix[11] + rowVec.w*matrix[15];
	return retVec;
}
```

# Unity逆向

Unity一切基于GameObjects对象,他们可以有各种属性(unity中叫做components组件),有像transform的属性,其包含位置,旋转和比例等这样的数据.

unity的脚本由C#编写,建立在方法中,写在不同的类中以继承MonoBehaviour方法.

其中一些方法如下:

- `void Start()`  这个方法只被调用一次
- `void Update()` 这份方法每一个tick被调用一次
- `void FixedUpdate()`  这个方法每一帧被调用一次
- `void OnGUI()`  这是绘制方法

Unity的文件结构

Unity中所有的脚本被编译为两个DLLs,他们被称为 `Assembly-CSharp` 和 `Assembly-CSharp-firstpass`,他们在 `Gamename_Date->Managed` 文件夹中,其他的dll在文件夹中是引擎代码,和其他系统代码

## Unity找数据特殊技巧:

C#语言编译出来的dll中的语言实际上是IL(.NET框架中的中间语言),该语言的文件可以跨平台运行于**mono**虚拟机.**dnspy**可以将IL语言写的文件基本完美反编译出C#源代码.而**il2cpp**的职责是把IL语言的文件转换为原生的系统二进制文件.

如何区分unity游戏是采用il2cpp技术还是不采用il2cpp技术

- exe文件同目录下有GameAssembly.dll的一般为采用了il2cpp技术(Metadata文件夹所在目录没有什么dll),但可以进行加密隐藏该文件,参考原神
- exe所在目录进入xxxData文件夹中的子目录中有个Metadata文件夹所在目录有一大堆dll文件(此时exe文件同目录下没有GameAssembly.dll)即为未采用il2cpp

il2cpp机制将C#中所有类型信息保存到global-metadata.dat的文件,通过解析global-metadata文件,可以获得C#代码中的类型,方法,字段等等信息

unity游戏偏移层级比较多,因此最优先的方法就是hook,在找到人物的基本属性(一般找血量)后找到赋值的汇编段inline hook取对象地址即可,这是最方便的做法

下面是不用hook的前提下快速找到数组:

- 数组和人数一般满足一定的偏移关系(不绝对)
- 而且unity可以直接找到人物的数组,没有其他对象干扰(找其他物品外部的方式似乎是通过找GameObjectManager).因此完全可以**从人数入手**.

```c
//二者关系如下:
0x********+0x??为人数地址
0x********]+0x10+0x4*i为数组
//0x??在32位中大多数情况是0xC,64位大多数情况是0x18
```









## 逃离塔科夫逆向

**[1]**先追人物坐标

经过一个逆向注意点:下图这样的lea一个堆栈地址的情况,要如下图这么处理

![逆向注意点](https://raw.githubusercontent.com/che77a38/blogImage2/main/202204171641184.jpeg)

未能最后,但追到下面的偏移:

```c
[[[[[[rcx+40]+20]+10]+10]+38]+18]    //角色坐标X地址
```

**[2]**追骨骼





中途会遇到F2会崩溃的情况,此时只能使用硬件访问数据断点来断



放开断点前先跟踪往上追的内存,放开断点的时候,如果发现内存中的值骤变了,说明他是个临时的值,这时候,可以用CE搜的方式往上找











# 绘制相关

除了注入后的dll进行gdi绘制外,还有如下绘制方法

## openGl和D3D绘制

简单粗暴,但容易被检测

### opengl

glBegin  开始渲染函数     一个参数 0 - 9  0是画一个点,1画线等等...

glDisable 关闭渲染函数     一个参数

hook  glbegin函数,在hook中利用glDisable函数关闭我们不想让他显示的渲染

检测方面主要是 "CRC的对抗"



## 自建窗口外部绘制

反外挂最艰难的一种绘制方法

优点:不闪烁,检测难度大了

1. 创建一个透明窗口
2. 同步分辨率
3. 透明窗口跟随游戏移动
4. 置顶透明窗口
5. 自己的窗口上画框

框架代码参考 `/Desktop/FPS/csDLL`

窗口特征枚举检测,截图检测( 可以使用`SetWindowDisplayAffinity`防止自己的外部窗口被截图)

### 相关代码

配置:

- 属性-VC++目录-包含目录:选中D3D9库根目录DirectSDK下的include文件夹
- 属性-VC++目录-引用目录:选中D3D9库根目录DirectSDK下的`Lib\x86`或`Lib\x64`文件夹
- 属性-VC++目录-库目录:选中D3D9库根目录DirectSDK下的`Lib\x86`或`Lib\x64`文件夹

#### 预编译.h

```c
#pragma once
 
#include <d3d9.h>
#include <d3dx9.h>
#pragma comment(lib, "d3d9.lib")
#pragma comment(lib, "d3dx9.lib")
#include <dwmapi.h>
#pragma comment(lib, "dwmapi.lib")
 
#include <iostream>
#include<Windows.h>
 
using namespace std;
```

#### D3D绘制.h

```c
#pragma once
#include"预编译.h"
/*
D3D相关的一些东西
如果不想用static变量用全局变量的话，千万别再头文件声明，在cpp文件声明后
再在头文件extern 类型名 变量名
*/
static MARGINS Margin;
static LPDIRECT3D9              g_pD3D = NULL;
static LPDIRECT3DDEVICE9        g_pd3dDevice = NULL;
static D3DPRESENT_PARAMETERS    g_d3dpp = {};
static ID3DXLine* pLine = 0;
static ID3DXFont* Font;
 
static HWND 辅助窗口句柄, GameHwnd;
static RECT 窗口矩形;
static int 窗口宽, 窗口高;
 
//注册窗口需要用到的窗口类
static WNDCLASSEX wClass;
 
 
//画矩形，文字之类的单独放在这个函数里
typedef void(*Draw)();
static Draw Render;
 
 
//窗口消息处理函数
LRESULT WinProc(HWND hWnd, UINT Message, WPARAM wParam, LPARAM lParam);
 
bool 初始化D3D();
 
void 创建透明窗口(HWND 游戏窗口句柄, Draw 绘制函数);
 
void 窗口消息循环();
 
void 画线(D3DCOLOR Color, float X1, float Y1, float X2, float Y2, float Width);
 
void 绘制文字(float X, float Y, const char* Str, D3DCOLOR Color);
 
void 画框(float X, float Y, float W, float H, float Width, D3DCOLOR Color);
 
void 绘制开始();
 
void 绘制结束();
```

#### D3D绘制.cpp

```c
#include "D3D绘制.h"
 
bool 初始化D3D()
{
	if ((g_pD3D = Direct3DCreate9(D3D_SDK_VERSION)) == NULL)
		return false;
 
	// 创建D3D设备
	ZeroMemory(&g_d3dpp, sizeof(g_d3dpp));
	g_d3dpp.Windowed = TRUE;
	g_d3dpp.SwapEffect = D3DSWAPEFFECT_DISCARD;
	g_d3dpp.BackBufferFormat = D3DFMT_UNKNOWN;
	g_d3dpp.EnableAutoDepthStencil = TRUE;
	g_d3dpp.AutoDepthStencilFormat = D3DFMT_D16;
	g_d3dpp.PresentationInterval = D3DPRESENT_INTERVAL_ONE;
	if (g_pD3D->CreateDevice(D3DADAPTER_DEFAULT, D3DDEVTYPE_HAL, 辅助窗口句柄, D3DCREATE_HARDWARE_VERTEXPROCESSING, &g_d3dpp, &g_pd3dDevice) < 0)
		return false;
 
	if (pLine == NULL)
		D3DXCreateLine(g_pd3dDevice, &pLine);
 
	//创建D3D字体
	D3DXCreateFontW(g_pd3dDevice, 16, 0, FW_DONTCARE, D3DX_DEFAULT, FALSE, DEFAULT_CHARSET, OUT_DEFAULT_PRECIS, DEFAULT_QUALITY, FF_DONTCARE, L"Vernada", &Font);
 
	return true;
}
 
void 创建透明窗口(HWND 游戏窗口句柄, Draw 绘制函数)
{
	if (绘制函数 == NULL || 游戏窗口句柄 == 0) return;
 
	GameHwnd = 游戏窗口句柄;
	Render = 绘制函数;
 
	//初始化窗口类
	wClass.cbClsExtra = NULL;
	wClass.cbSize = sizeof(WNDCLASSEX);
	wClass.cbWndExtra = NULL;
	wClass.hbrBackground = (HBRUSH)CreateSolidBrush(RGB(0, 0, 0));
	wClass.hCursor = LoadCursor(0, IDC_ARROW);
	wClass.hIcon = LoadIcon(0, IDI_APPLICATION);
	wClass.hIconSm = LoadIcon(0, IDI_APPLICATION);
	wClass.hInstance = GetModuleHandle(NULL);
	wClass.lpfnWndProc = (WNDPROC)WinProc;
	wClass.lpszClassName = L" ";
	wClass.lpszMenuName = L" ";
	wClass.style = CS_VREDRAW | CS_HREDRAW;
 
	//注册窗口
	if (RegisterClassEx(&wClass) == 0)
	{
		MessageBox(NULL, L"创建窗口出错！", L"提示！", 0);
		exit(1);
	}
 
	//创建窗口
	GetWindowRect(GameHwnd, &窗口矩形);
	窗口宽 = 窗口矩形.right - 窗口矩形.left;
	窗口高 = 窗口矩形.bottom - 窗口矩形.top;
	辅助窗口句柄 = CreateWindowEx(WS_EX_TOPMOST | WS_EX_TRANSPARENT | WS_EX_LAYERED, L" ", L" ", WS_POPUP, 1, 1, 窗口宽, 窗口高, 0, 0, 0, 0);
 
	//显示窗口
	SetLayeredWindowAttributes(辅助窗口句柄, 0, RGB(0, 0, 0), LWA_COLORKEY);
	ShowWindow(辅助窗口句柄, SW_SHOW);
 
	初始化D3D();
}
 
void 窗口消息循环()
{
	while (1)
	{
		//使辅助窗口一直盖在游戏窗口上
		if (GameHwnd)
		{
			GetWindowRect(GameHwnd, &窗口矩形);
			窗口宽 = 窗口矩形.right - 窗口矩形.left;
			窗口高 = 窗口矩形.bottom - 窗口矩形.top;
			DWORD dwStyle = GetWindowLong(GameHwnd, GWL_STYLE);
			if (dwStyle & WS_BORDER)
			{
				窗口矩形.top += 23;
				窗口高 -= 23;
			}
			MoveWindow(辅助窗口句柄, 窗口矩形.left, 窗口矩形.top, 窗口宽, 窗口高, true);
		}
 
		//处理窗口消息
		MSG Message;
		ZeroMemory(&Message, sizeof(Message));
		if (PeekMessage(&Message, 0, 0, 0, PM_REMOVE))
		{
			DispatchMessage(&Message);
			TranslateMessage(&Message);
		}
 
		Sleep(1);
	}
 
 
	if (g_pd3dDevice) { g_pd3dDevice->Release(); g_pd3dDevice = NULL; }
	if (g_pD3D) { g_pD3D->Release(); g_pD3D = NULL; }
	CloseWindow(辅助窗口句柄);
 
	::UnregisterClass(wClass.lpszClassName, wClass.hInstance);
}
 
LRESULT WinProc(HWND hWnd, UINT Message, WPARAM wParam, LPARAM lParam)
{
	switch (Message)
	{
	case WM_PAINT:
		if(g_pd3dDevice)Render();//就是这里调用了我们的画框画线之类的函数
		break;
 
	case WM_CREATE:
		DwmExtendFrameIntoClientArea(hWnd, &Margin);
		break;
 
	case WM_DESTROY:
	{
		g_pD3D->Release();
		g_pd3dDevice->Release();
		exit(1);
		return 0;
	}
	default:
		return DefWindowProc(hWnd, Message, wParam, lParam);
		break;
	}
	return 0;
}
 
void 画线(D3DCOLOR Color, float X1, float Y1, float X2, float Y2, float Width)
{
	D3DXVECTOR2 Vertex[2] = { {X1,Y1},{X2,Y2} };
	pLine->SetWidth(Width);
	pLine->Draw(Vertex, 2, Color);
}
 
void 绘制文字(float X, float Y, const char* Str, D3DCOLOR Color)
{
	RECT Rect = { (LONG)X,(LONG)Y };
	Font->DrawTextA(NULL, Str, -1, &Rect, DT_CALCRECT, Color);
	Font->DrawTextA(NULL, Str, -1, &Rect, DT_LEFT, Color);
}
 
void 画框(float X, float Y, float W, float H, float Width, D3DCOLOR Color)
{
	D3DXVECTOR2 Vertex[5] = { {X,Y},{X + W,Y},{X + W,Y + H},{X,Y + H},{X,Y} };
	pLine->SetWidth(Width);
	pLine->Draw(Vertex, 5, Color);
}
 
void 绘制开始()
{
	g_pd3dDevice->Clear(0, 0, D3DCLEAR_TARGET, 0, 1.0f, 0);
	g_pd3dDevice->BeginScene();
}
 
void 绘制结束()
{
	g_pd3dDevice->EndScene();
	g_pd3dDevice->Present(0, 0, 0, 0);
}
```

#### 调用例子

```c
#include"D3D绘制.h"
 
int 线粗 = 2;
D3DCOLOR 红色 = D3DCOLOR_ARGB(255, 255, 255, 255);
 
void 绘制()
{
	绘制开始();
	画线(D3DCOLOR_ARGB(255, 0, 0, 255), 20, 20, 66, 66,线粗);
	画框(100, 100, 100, 100, 线粗, D3DCOLOR_ARGB(255, 255, 255, 0));
	绘制文字(200, 200, "吾无法无天", D3DCOLOR_ARGB(255, 255, 0, 255));
	绘制结束();
}
 
HWND 游戏窗口 = (HWND)0x50A00;
void 开始()
{
	创建透明窗口(游戏窗口, 绘制);
	窗口消息循环();
}
 
int main()
{
	CreateThread(NULL, 0, (LPTHREAD_START_ROUTINE)开始, NULL, 0, NULL);
 
	while (1)
	{
		cout << "输入233关闭:" << endl;
		int a=0;
		cin >> a;
		if (a == 233)
		{
			return 0;
		}
	}
 
	return 0;
}
```



## GDI泄露

**[注意点]:  Create出来的GDI对象，都要用DeleteObject来释放；Create出来的DC，都要用DeleteDC来释放，GetDC得出的DC,要用ReleaseDC来释放。**

getDC每次获取到的都不一样,我理解成开了个拷贝.因此即使是getDC(同一个窗口句柄) 多次,也要每一个getDC对应一个releaseDC才能防止gdi对象泄露

## **双缓冲**

[控制台双缓冲原理]: https://blog.csdn.net/NEFU_kadia/article/details/106211471
[easyxy库中有双缓冲相关代码,可惜未开源]: https://blog.csdn.net/NEFU_kadia/article/details/107213480
[gdi双缓冲原理]: https://blog.csdn.net/wuan584974722/article/details/80429967

