var posts=["posts/32位逆向/","posts/APC机制/","posts/C++多线程/","posts/C++相关工具盘点/","posts/C++谷歌代码规范/","posts/C++11与14/","posts/C语言入门/","posts/C++基础/","posts/MFC/","posts/FPS逆向随笔/","posts/PE/","posts/QT/","posts/avalonia/","posts/CSharp入门/","posts/colab/","posts/doxygen/","posts/cmake/","posts/hello-world/","posts/git/","posts/WPF/","posts/64位逆向/","posts/STL/","posts/mac及linux_C++环境/","posts/nginx/","posts/opencv/","posts/linux基础以及系统编程/","posts/prism/","posts/slidev/","posts/yaml/","posts/事件等待/","posts/加解密相关/","posts/句柄表/","posts/字符编码/","posts/windows开发/","posts/屏幕监控（未完成）/","posts/保护模式/","posts/数学/","posts/开发项目管理/","posts/摄像头监控开发/","posts/前端/","posts/架构相关/","posts/正则表达式/","posts/数据结构/","posts/数据库/","posts/算法/","posts/视频效果/","posts/系统调用/","posts/软考相关/","posts/运维/","posts/硬编码/","posts/设计模式/","posts/通信技术/","posts/问题汇总/","posts/nas方案/","posts/进程与线程/","posts/网络编程/","posts/驱动开发/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };