#### 基于Gulp编写的图片、JS、CSS压缩工具包含图片裁剪、合并功能


##### 图片裁剪、合并功能使用的是images插件实现

```
插件地址：https://www.npmjs.com/package/images
```

##### 执行图片压缩之前先执行图片合并

- 1. app.js文件中写了一些注释
- 2. 目录结构增加调整
- 3. node app.js 

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
gulp upload  // 上传图片到腾讯云
gulp del     // 删除dist文件夹下的所有文件

#! 打算把这些命令集合在一起，正在研究~~~~
```

- 3、文件存放

```
1、图片存放在根目录的images目录下，执行完命令后会在根目录生成dist文件夹images文件夹生成压缩后的图片

2、js文件存放在根目录的js目录下，执行完命令后会在根目录生成dist文件夹js文件夹生成压缩后的js文件

3、css文件存放在根目录的css目录下，执行完命令后会在根目录生成dist文件夹css文件夹生成压缩后的css文件

```