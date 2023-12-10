---
title: Hello World
tags: next
categories: 杂项
abbrlink: 4a17b156
---
此处记录一些hexo相关操作

<!-- more -->

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)



# 记录一些hexo部署操作

[gitalk的部署参考](https://cuiqingcai.com/30010.html)

- hexo版本: 6.3.0
- next版本: 7.8.0

下面部署步骤基于以上版本

## 长代码折叠功能

[原始参考链接](https://www.toimc.com/hexo-usage-2/)

由 jQuery 选择器选择代码模块`.highlight`相关的DOM节点，给超过某个高度的代码模块添加展开收起的盒子，让盒子实现展开隐藏效果。

操作步骤:

1. 添加`code-unfold.js`

   由于是在`next`主题中添加js逻辑，所以我们新建code-unfold.js`放置在了`themes/next/source/js/code-unfold.js`：

   ```js
   var CODE_MAX_HEIGHT = 200;
   var containers = [];
   
   // 展开
   $('body').on('click', '.js_unfold_code_btn', function () {
     $(this).closest('.js_highlight_container').addClass('on');
   });
   // 收起
   $('body').on('click', '.js_retract_code_btn', function () {
     var $container = $(this).closest('.js_highlight_container').removeClass('on');
     var winTop = $(window).scrollTop();
     var offsetTop = $container.offset().top;
     $(this).css('top', 0);
     if (winTop > offsetTop) {
       // 设置滚动条位置
       $('body, html').animate({
         scrollTop: $container.offset().top - CODE_MAX_HEIGHT
       }, 600);
     }
   });
   // 滚动事件，触发动画效果
   $(window).on('scroll', function () {
     var scrollTop = $(window).scrollTop();
     var temp = [];
     for (let i = 0; i < containers.length; i++) {
       var item = containers[i];
       var { $container, height, $hide, hasHorizontalScrollbar } = item;
       if ($container.closest('body').length === 0) {
         // 如果 $container 元素已经不在页面上, 则删除该元素
         // 防止pjax页面跳转之后，元素未删除
         continue;
       }
       temp.push(item);
       if (!$container.hasClass('on')) {
         continue;
       }
       var offsetTop = $container.offset().top;
       var hideBtnHeight = $hide.outerHeight();
       // 减去按钮高度，减去底部滚动条高度
       var maxTop = parseInt(height - (hasHorizontalScrollbar ? 17 : 0) - hideBtnHeight);
       let top = parseInt(
         Math.min(
           Math.max(scrollTop - offsetTop, 0), // 如果小于 0 ，则取 0
           maxTop,// 如果大于 height ，则取 height
         )
       );
       // 根据 sin 曲线设置"收起代码"位置
       var halfHeight = parseInt($(window).height() / 2 * Math.sin((top / maxTop) * 90 * (2 * Math.PI/360)));
       $hide.css('top', Math.min(top + halfHeight, maxTop));
     }
     containers = temp;
   });
   
   // 添加隐藏容器
   function addCodeWrap($node) {
     var $container = $node.wrap('<div class="js_highlight_container highlight-container"><div class="highlight-wrap"></div></div>').closest('.js_highlight_container');
   
     // 底部 "展开代码" 与 侧边栏 "收起代码"
     var $btn = $(`
       <div class="highlight-footer">
         <a class="js_unfold_code_btn show-btn" href="javascript:;">展开代码<i class="fa fa-angle-down" aria-hidden="true"></i></a>
       </div>
       <a class="js_retract_code_btn hide-btn" href="javascript:;"><i class="fa fa-angle-up" aria-hidden="true"></i>收起代码</a>
     `);
   
     $container.append($btn);
     return $container;
   };
   
   function codeUnfold () {
     $('.highlight').each(function () {
       // 防止重复渲染
       if (this.__render__ === true) {
         return true;
       }
       this.__render__ = true;
       var $this = $(this);
       var height = $(this).outerHeight();
       if (height > CODE_MAX_HEIGHT) {
         // 添加展开&收起容器
         var $container = addCodeWrap($this, height);
         containers.push({
           $container,
           height,
           $hide: $container.find('.js_retract_code_btn'),
           hasHorizontalScrollbar: this.scrollWidth > this.offsetWidth,
         });
       }
     });
   };
   ```

2. 添加`jquery`

   由于需要在`next`主题文件中使用`jquery`

   不知道新版hexo在哪里才能引用 `jquery.min.js` ，所以干脆自己下载到自己的项目，放到第1步创建的`code-unfold.js` 边上一起引用。

3. 引用`jquery.min.js`和`code-unfold.js`

   修改文件`themes/next/layout/_scripts/index.swig`,最后添加两行:

   ```swig
   {{- next_js('jquery.min.js') }}
   {{- next_js('code-unfold.js') }}
   ```

   下面找到文件`themes/next/source/js/next-boot.js`：添加一行代码:

   ```js
   NexT.boot.refresh = function () {
     // 添加一行代码
     codeUnfold()
     
     // ...
   
   ```

4. 添加样式`highlight.styl`

   创建`theme/next/source/css/_common/components/highlight.styl`文件：

   ```css
   // 展开收起效果
   .highlight-container
     position: relative
     background-color: highlight-background
     &.on
       .highlight-footer
         display: none
       .hide-btn
         display: flex
       .highlight-wrap
         max-height: none
     .highlight-wrap
       overflow: hidden
       max-height: 200px
     .highlight-footer
       position absolute
       width: 100%
       left: 0
       bottom: 0
       height: 60px
       background-image: 'linear-gradient(-180deg, rgba(255,255,255,0) 0%, %s 65%)' % highlight-background;
       text-align: center
     .show-btn
       font-size: 12px
       color: #fff
       position: absolute
       left: 50%
       transform: translateX(-50%)
       bottom: 0
       line-height: 2em
       text-decoration: none
       padding: 0 0.8em
       text-align: center
       border-radius: 4px 4px 0
       &:hover
         text-decoration: none
     .hide-btn
       color: #fff
       font-size: 12px
       width: 22px
       position: absolute
       left: -21px
       top: 0
       line-height: 1em
       text-decoration: none
       text-align: center
       display: none
       flex-direction: column
       background-color: highlight-background
       border-radius: 4px 0 0 4px
       padding: 0.1em 0 0.6em
       transition: top ease 0.35s
     .fa-angle-up,
     .fa-angle-down
       font-style: normal
       color: #fff
     .fa-angle-up:before
       content:"\f106"
     .fa-angle-down:before
       content:"\f107"
       margin-left: 0.5em
     .js_unfold_code_btn, .js_retract_code_btn
       background: rgba(0,0,0,0.5)
       border-bottom: none !important
       &:hover
         border-bottom-color: none !important
   ```

5. 引用样式`highlight.styl`

   修改`themes/next/source/css/_common/components/third-party/third-party.styl`文件,最后添加

   ```styl
   @import 'highlight';
   ```

> styl文件的引入关系为:
>
> `themes/next/source/css/_common/components/components.styl`   
>
> 引入
>
> `themes/next/source/css/_common/components/third-party/third-party.styl`  
>
> 引入
>
> `theme/next/source/css/_common/components/highlight.styl`

至此，我们就完成了hexo博客长代码折叠功能



