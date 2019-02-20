#### 基于Gulp编写的图片、JS、CSS压缩工具

##### 图片压缩主要有3中方法

- 1、使用 gulp-imagemin 插件进行压缩，效果比较差，图片压缩后大小变化不是很大；
- 2、使用 gulp-tinypng-nokey 插件进行压缩，效果一般，图片压缩后的比例一般；
- 3、使用 gulp-tinypng-compress 插件进行压缩，花钱的就是不一样，压缩后的效果很好，需要申请KEY，每个月免费压缩500张。

```

去tinypng官网申请key：https://tinypng.com/developers

```

##### 环境说明

- node >= 8.0.0
- gulp >= 4.0.0


##### 使用

- 1、安装依赖

```
 yarn install / npm install
```

- 2、启动

```
gulp script  // 压缩js
gulp css     // 压缩css
gulp image   // 第一种压缩图片方法
gulp tp      // 第二种压缩图片方法
gulp tinypng // 第三种压缩图片方法
```