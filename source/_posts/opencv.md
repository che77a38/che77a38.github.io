---
title: opencv
tags: C++
categories: 技术
mathjax: true
abbrlink: 8b5f195
---

opencv相关知识

<!-- more -->

# 计算机图像颜色基础理论

## RGB颜色空间

### 基本知识

> RGB三原色起源于上世纪初1809年Thomas Young提出视觉的三原色学说，随后Helmholtz在1824年也提出了三原色学说：即：视网膜存在三种视锥细胞，分别含有对红、绿、蓝三种光线敏感的视色素，当一定波长的光线作用于视网膜时，以一定的比例使三种视锥细胞分别产生不同程度的兴奋，这样的信息传至大脑中枢，就产生某一种颜色的感觉。
>
> 在显示器发明之后，从黑白显示器发展到彩色显示器，人们开始使用发出不同颜色的光的荧光粉（CRT，等离子体显示器），或者不同颜色的滤色片（LCD），或者不同颜色的半导体发光器件（OLED和LED大型全彩显示牌）来形成色彩，无一例外的选择了Red,Green,Blue这3种颜色的发光体作为基本的发光单元。通过控制他们发光强度，组合出了人眼睛能够感受到的大多数的自然色彩。     
>
> 计算机显示彩色图像的时候也不例外，最终显示的时候，要控制一个像素中Red,Green,Blue的值，来确定这个像素的颜色。计算机中无法模拟连续的存储从最暗到最亮的量值，而只能以数字的方式表示。于是，结合人眼睛的敏感程度，使用3个字节（3*8位）来分别表示一个像素里面的Red,Green 和Blue的发光强度数值，这就是常见的RGB格式。我们可以打开画图板，在自定义颜色工具框中，输入r,g,b值，得到不同的颜色。

RGB颜色空间以R(Red:红)、G(Green:绿)、B(Blue:蓝)三种基本色为基础，进行不同程度的叠加，产生丰富而广泛的颜色，所以俗称三基色模式。

RGB空间是生活中最常用的一个颜色显示模型，电视机、电脑的CRT显示器等大部分都是采用这种模型。自然界中的任何一种颜色都可以由红、绿、蓝三种色光混合而成，现实生活中人们见到的颜色大多是混合而成的色彩。

组合方法是通过互补光的形式来组合成任意颜色的

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405051453201.png" alt="image-20240505145338856" style="zoom:50%;" />

> **三通道想要组合成黑白灰,必须三原色值相同**,当某一方的值不相同时就会产生其他颜色。
>
> **灰度图不一定是单通道，但是单通道一定是灰度图**
>
> 将RGB图像转变为灰度图像遵循下面的公式:(仅需了解)
> $$
> gray  = B*0.114+G*0.587+R*0.299
> $$

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405051458202.png" alt="img"  />

## HSV颜色空间

> RGB颜色空间的分量与亮度密切相关,即只要改变亮度,3个分量都会随之相应地改变.因此,RGB颜色空间适合于显示系统,却并不适合于图像处理

- 色调: 表示观察者感知的主要颜色

- 饱和度: 指的是相对的纯净度,或一种颜色混合白光的数量

  如深红色(红加白)和淡紫色(紫加白)这样的色彩是欠饱和的,饱和度与所加的白光的数量成反比

- 亮度: 表达了无色的强度概念

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405051948074.png" alt="image-20240505194825626" style="zoom:50%;" /><img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405051958255.png" alt="image-20240505195849731" style="zoom: 33%;" />

因为,色调+饱和度 = 色度,所以:
$$
颜色 = 色调+饱和度+亮度 = 色度+亮度
$$
<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405051959148.png" alt="image-20240505195921691" style="zoom:33%;" />

## 图像的基本类型

在计算机中，我们常见的图像类型有以下几种：

1. **二值化图像**: 一幅二值图像的二维矩阵仅由0、1两个值构成，“0”代表黑色，“1”代白色。由于每一像素（矩阵中每一元素）取值仅有0、1两种可能，所以计算机中二值图像的数据类型通常为1个二进制位。二值图像通常用于文字、线条图的扫描识别（OCR）和掩膜图像的存储。
2. **灰度图像:** 灰度图像矩阵元素的取值范围通常为[0，255]。因此其数据类型一般为8位无符号整数的（int8），这就是人们经常提到的256灰度图像。“0”表示纯黑色，“255”表示纯白色，中间的数字从小到大表示由黑到白的过渡色。在某些软件中，灰度图像也可以用双精度数据类型（double）表示，像素的值域为[0，1]，0代表黑色，1代表白色，0到1之间的小数表示不同的灰度等级。二值图像可以看成是灰度图像的一个特例。
3. **索引图像:**索引图像的文件结构比较复杂，除了存放图像的二维矩阵外，还包括一个称之为颜色索引矩阵MAP的二维数组。MAP的大小由存放图像的矩阵元素值域决定，如矩阵元素值域为[0，255]，则MAP矩阵的大小为256Ⅹ3，用MAP=[RGB]表示。MAP中每一行的三个元素分别指定该行对应颜色的红、绿、蓝单色值，MAP中每一行对应图像矩阵像素的一个灰度值，如某一像素的灰度值为64，则该像素就与MAP中的第64行建立了映射关系，该像素在屏幕上的实际颜色由第64行的[RGB]组合决定。也就是说，图像在屏幕上显示时，每一像素的颜色由存放在矩阵中该像素的灰度值作为索引通过检索颜色索引矩阵MAP得到。索引图像的数据类型一般为8位无符号整形（int8），相应索引矩阵MAP的大小为256Ⅹ3，因此一般索引图像只能同时显示256种颜色，但通过改变索引矩阵，颜色的类型可以调整。索引图像的数据类型也可采用双精度浮点型（double）。索引图像一般用于存放色彩要求比较简单的图像，如Windows中色彩构成比较简单的壁纸多采用索引图像存放，如果图像的色彩比较复杂，就要用到RGB真彩色图像。
4. **真彩色RGB图像:**RGB图像与索引图像一样都可以用来表示彩色图像。与索引图像一样，它分别用红（R）、绿（G）、蓝（B）三原色的组合来表示每个像素的颜色。但与索引图像不同的是，RGB图像每一个像素的颜色值（由RGB三原色表示）直接存放在图像矩阵中，由于每一像素的颜色需由R、G、B三个分量来表示，M、N分别表示图像的行列数，三个M x N的二维矩阵分别表示各个像素的R、G、B三个颜色分量。RGB图像的数据类型一般为8位无符号整形，通常用于表示和存放真彩色图像，当然也可以存放灰度图像。

### 图像的大小、深度和通道

在OpenCV中，定义的图像一般会包含图像的大小、深度和通道等几个元素。一般我们是用 `cv::Mat` 去定义一个图像，例如：

```cpp
cv::Mat img(512, 512, CV_8UC3, Scalar(255, 255, 255));
```

上面这一语句实例化了一个Mat 的对象img；其大小为512像素*512像素，类型为8位无符号整型三通道；颜色为纯白色`（Scalar(255,255,255) B= 255 G= 255 R=255）`

**CV_8UC3** 中 8表示 8bit； U表示无符号整型数 S = 符号整型 F = 浮点型； C3 表示3通道；

同理，**CV_8SC1** 即表示8bit带符号整型单通道类型的图像；**CV_32FC2**是指一个32位浮点型双通道矩阵，这两个例子中的数字就代表了位深度，数字越大单个通道能表示的颜色就越细，可以理解位调节的粒度。

| **位深度**                     | **取值范围**  |
| :----------------------------- | :------------ |
| IPL_DEPTH_8U - 无符号8位整型   | 0--255        |
| IPL_DEPTH_8S - 有符号8位整型   | -128--127     |
| IPL_DEPTH_16U - 无符号16位整型 | 0--65535      |
| IPL_DEPTH_16S - 有符号16位整型 | -32768--32767 |
| IPL_DEPTH_32S - 有符号32位整型 | 0--65535      |
| IPL_DEPTH_32F - 单精度浮点数   | 0.0--1.0      |
| IPL_DEPTH_64F - 双精度浮点数   | 0.0--1.0      |

那么，单通道和多通道有啥区别呢，例如，单通道图像由一字节就可以表示一个像素的色彩（明暗），而三通道则需要3个字节才能表示一个像素的色彩，RGB彩色图一般就是三通道，每个通道表示一个颜色。4通道通常为RGBA，在某些处理中可能会用到。2通道图像不常见，通常在程序处理中会用到，如傅里叶变换，可能会用到，一个通道为实数，一个通道为虚数，主要是编程方便。还有一种情况就是16位图像，本来是3通道，但是为了减少数据量，压缩为16位，刚好两个通道，常见格式有RGB555或RGB565，也就是说R占5位，G占5或6位，B占5位，也有RGBA5551格式。

### 图像在计算机中的坐标

图像像素的坐标不同于我们常见的直角坐标，它的坐标原点是在图像的左上角，向右为x的正方向，向下为y轴的正方向；

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405051450131.png" alt="image-20240505145055851" style="zoom:33%;" />

- VGA = 640 x 480
- HD = 1280 ×720
- FHD = 1920 x 1080
- 4K = 3840 ×2160

灰度图像:从0~256($2^8$)

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405031613889.png" alt="image-20240503161327947" style="zoom: 25%;" />

对于彩色图像,有三个灰度图像,分别代表红色,绿色和蓝色的强度.将他们合在一起就是完整的彩色图像

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405031617515.png" alt="image-20240503161719931" style="zoom: 33%;" />







# opencv环境配置

## mac配置

`brew install opencv` 或`vcpkg install opencv4` (opencv4是记录时的最新版)

[[C++基础#C++如何使用第三方库|参考此处了解cmake应该如何使用]]



opencv常用的头文件

| 头文件                     | 功能                                           |
| -------------------------- | ---------------------------------------------- |
| `<opencv2/core.hpp>`       | OpenCV 核心功能,包括基本数据结构和函数         |
| `<opencv2/imgproc.hpp>`    | 图像处理功能,如滤波、变换、颜色空间转换等      |
| `<opencv2/highgui.hpp>`    | 图形用户界面功能,如 `imshow()`、`waitKey()` 等 |
| `<opencv2/imgcodecs.hpp>`  | 图像读写功能,如 `imread()`、`imwrite()` 等     |
| `<opencv2/features2d.hpp>` | 特征检测和描述功能                             |
| `<opencv2/calib3d.hpp>`    | 3D 计算机视觉功能,如相机标定、三维重建等       |
| `<opencv2/video.hpp>`      | 视频分析功能,如光流、背景建模等                |
| `<opencv2/objdetect.hpp>`  | 对象检测功能,如人脸检测、行人检测等            |
| `<opencv2/ml.hpp>`         | 机器学习功能                                   |
| `<opencv2/dnn.hpp>`        | 深度学习功能                                   |
| `<opencv2/flann.hpp>`      | 快速近似最近邻搜索功能                         |
| `<opencv2/photo.hpp>`      | 图像处理功能,如去噪、美化等                    |
| `<opencv2/stitching.hpp>`  | 图像拼接功能                                   |
| `<opencv2/videoio.hpp>`    | 视频 I/O 功能                                  |

```cpp
//最基本,常用:
#include <opencv2/imgcodecs.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>
```

## Windows配置

[下载位置](https://opencv.org/releases/)











## 简单代码案例

读取图片并窗口显示

```cpp
string path = "../../Resources/str.jpeg";
Mat img = imread(path);
imshow("Image",img);
waitKey(0);//堵塞直到键入
```

读取视频并窗口显示

```cpp
//测试视频捕获
string path = "../../Resources/3s.ts";
VideoCapture cap(path);
Mat img;
while(true)
{
  cap.read(img);
  imshow("Image",img);
  waitKey(20); //延迟20毫秒
}
//此代码,视频播放完了会有异常,因为视频播放完了,读不到了
```

读取摄像头并窗口显示

```cpp
VideoCapture cap(0);//0表示摄像头编号
Mat img;
while(true){
  cap.read(img);
  imshow("Image",img);
  waitKey(1);
}
```

> Mat是opencv引入的矩阵类型(Matrix)

# 基本图像处理操作

## 灰度/高斯模糊/边缘/扩张/侵蚀

- 转换为灰度图像
- 添加高斯模糊
- canny边缘检测
- 图像扩张
- 图像侵蚀

```cpp
string path = "../../Resources/str.jpeg";
Mat img = imread(path);
//转为灰度图像
Mat imgGray;
cvtColor(img,imgGray,COLOR_BGR2GRAY);//opencv中将RGB称为BGR
//添加高斯模糊
Mat imgBlur;
GaussianBlur(img,imgBlur,Size(3,3),3,0);
//canny边缘检测,边缘检测前,通常需要做些模糊处理
Mat imgCanny;
Canny(imgBlur,imgCanny,25,75);
//图像扩张(增加厚度)
Mat imgDil;
Mat kernel = getStructuringElement(MORPH_RECT,Size(5,5));//有尽量使用奇数的说法,似乎是会导致图像偏移?
dilate(imgCanny,imgDil,kernel);
//图像侵蚀(减少厚度)
Mat imgErode;
erode(imgDil,imgErode,kernel);
imshow("Image",img);
imshow("Image Gray",imgGray);
imshow("Image Blur",imgBlur);
imshow("Image Canny",imgCanny);
imshow("Image Dilation",imgDil);
imshow("Image Erode",imgErode);
waitKey(0);
```

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405051346016.png" alt="image-20240505134628409" style="zoom:50%;" />

## 调整图像大小/裁剪图像

```cpp
string path = "../../Resources/str.jpeg";
Mat img = imread(path);
//调整大小
Mat imgResize,imgResize2;
std::cout<<img.size()<<std::endl;//打印图像原本大小  [468 x 265]
resize(img,imgResize,Size(400,200));//缩放为大小:400,200(无视宽高比调整)
resize(img,imgResize2,Size(),0.5,0.5);//0,5倍等比例缩小
//裁切
Mat imgCrop;
Rect roi(100,100,200,50);
imgCrop = img(roi);//裁切区间必须小于图像本身大小,不然会报错
imshow("Image",img);
imshow("Image Resize",imgResize);
imshow("Image Resize2",imgResize2);
imshow("Image Crop",imgCrop);
waitKey(0);
```

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405051402051.png" alt="image-20240505140243693" style="zoom: 50%;" />

## 绘制

```cpp
//新建空白图片,参数解释如下:
//CV_8UC3中 8表示2的8次方,U表示无符号(结合前面就是0~255),C3表示三通道(3 channels)
//Scalar(255,255,255)表示白色
Mat img(512,512,CV_8UC3,Scalar(255,255,255));
//画圆圈  从坐标(256,256)做半斤为155的圆圈,颜色为(0,69,255),线条粗细为10(若为FILLED表示实心圆)(注意这个线条粗细是往两边同时扩张的)
circle(img,Point(256,256),155,Scalar(0,69,255),50);
//画矩形
rectangle(img,Point(101,101),Point(411,411),Scalar(255,0,0),3);
//画线
line(img,Point(130,296),Point(382,296),Scalar(0,0,0),2);
//画文本(不支持中文,将会是乱码)
putText(img,"hello world!",Point(20,262),FONT_HERSHEY_DUPLEX,0.7,Scalar(0,0,0),2);
imshow("Image",img);
waitKey(0);
```

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405051437596.png" alt="image-20240505143710291" style="zoom:33%;" />

## 仿射变换

- 仿射变换是线性变换和平移的组合。
- 仿射变换保持直线的性质,但不保持原点不变。
- 仿射变换可以用矩阵乘法和向量加法来表示

```cpp
string path = "../../Resources/cards.jpg";
Mat img = imread(path);
float w = 250;
float h = 350;
Mat matrix,imgWarp;//分别用于存储透视变换的矩阵,用于存储变换后的图像

Point2f src[4] ={{520,142},{771,190},{405,395},{674,457}};//定义变换前的矩形
Point2f dst[4] ={{0.0f,0.0f},{w,0.0f},{0.0f,h},{w,h}};//定义变换后的矩形

matrix = getPerspectiveTransform(src,dst);//计算透视变换矩阵matrix
///使用warpPerspective函数，将img中的图像应用透视变换，结果存储在imgWarp中。参数matrix是变换矩阵，Point(w,h)指定输出图像的大小
warpPerspective(img,imgWarp,matrix,Point(w,h));

//画上一些标记点
for (int i = 0; i < 4; i++)
{
  circle(img,src[i],10,Scalar(0,0,255),FILLED);
}
imshow("Image",img);
imshow("Image Warp",imgWarp);
```

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202405051810787.png" alt="image-20240505181014198" style="zoom: 50%;" />

## 颜色检测





