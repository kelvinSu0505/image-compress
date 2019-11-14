// 获取 gulp
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),                   // 获取 uglify 模块（用于压缩 JS）
    cssUglify = require('gulp-minify-css'),            // 压缩css
    imageMin = require('gulp-imagemin'),               // 压缩图片1  效果不是很好
    tinypngNokey = require('gulp-tinypng-nokey'),      // 压缩图片2  效果比 gulp-imagemin 好
    tinypng = require('gulp-tinypng-compress'),        // 压缩图片3 需要有KEY,下面有将怎样获取KEY值   花钱的就是效果好，3种图片压缩效果最好的
    upload = require('gulp-qcloud-cos-upload'),       // 图片上传插件
    del = require('del');

 
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', async() => {
    // 1. 找到文件
    gulp.src('js/*.js')
    // 2. 压缩文件
        .pipe(uglify({ mangle: false }))
    // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
})
 
gulp.task('auto',async() => {
    await gulp.watch('js/*.js',['script']);
    await gulp.watch('css/*.css', ['css']);
    await gulp.watch('images/*.*', ['image']);
})
 
gulp.task('css',async() => {
    await gulp.src('css/*.css')
        .pipe(cssUglify())
        .pipe(gulp.dest('dist/css'))
})




// 压缩图片1 

gulp.task('image',async() => {
    await gulp.src('images/*.*')
        .pipe(imageMin({
          progressive: true,                      // 类型：Boolean 默认：false 无损压缩
        //   interlaced: true,                       // 类型：Boolean 默认：false 隔行扫描gif进行渲染
        //   multipass: true,                        // 类型：Boolean 默认：false 多次优化svg直到完全优化
        //   optimizationLevel: 5                    // 类型：Number  默认：3  取值范围：0-7（优化等级）
        }))
        .pipe(gulp.dest('dist/images'))
})



// 压缩图片2 

gulp.task('tp',async() => {
    await gulp.src('images/*.{png,jpg,jpeg,gif}')
        .pipe(tinypngNokey())
        .pipe(gulp.dest('dist/images'))
})



// 压缩图片3

gulp.task('tinypng', async() => {
    await gulp.src('images/*.{png,jpg,jpeg,gif}')
        .pipe(tinypng({
            key: 'JjdLtPLgR6hmj3c0bR3xcD2ZTg24HWLk',
            sigFile: 'dist/img/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('dist/images'));
})


// 上传到腾讯云对象存储

gulp.task(
    'upload',
    ()=> gulp.src(['**/*'],{
        // 必要参数，用于计算相对路径
        cwd: './dist/images/'
    }).pipe(upload({
        // 日志是否呈现为cdn路径，默认为 ''，设为具体域名可以替换 cdn 域名。
        cdn: true,
        // 是否开启调试模式，默认为 false，调试模式下，报错时输出详细错误信息
        debug: false,
        // 是否在控制台打印上传日志，默认为 true
        log: true,
        // 是否允许文件覆盖，默认为 false
        overwrite: false,
        // 在腾讯云申请的 AppId
        AppId: '1258301795',
        // 配置腾讯云 COS 服务所需的 SecretId
        SecretId: 'AKIDMbhg0cTc0MvUxID4z1vxujPxRnyDYB6q',
        // 配置腾讯云 COS 服务所需的 SecretKey
        SecretKey: 'nRwJUWLJ9qPr9GD681iHi8QXa1GKKNKD',
        // COS服务配置的存储桶名称
        Bucket: 'sh-image-1258301795',
        // 地域名称
        Region: 'ap-shanghai',
        // 前缀路径，所有文件上传到这个路径下
        prefix: 'upload'
    }))
)



// 删除dist文件夹下的所有文件

gulp.task('del', async ()=>{
    await del('dist/**/*');
    await del('ready_image/*');
    await del('images/*');
});


// 执行队列

gulp.task('default', gulp.series('del','tinypng',function(){
    console.log('default')
}))