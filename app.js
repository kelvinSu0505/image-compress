// 图片合并、裁剪
const images = require("images");
const fs = require('fs');
const path = require('path');
// 裁剪、合并前的图片目录
const pathName = './ready_image';
// 裁剪、合并保存的图片目录
const savePath = './images';
// 左上角logo图
const pathLogo = './shuiyin.png';
// 底部 title图
const pathTitle = './titlepng.png';

// 应用
// 1. 获取image文件夹下的所有图片，将图片裁剪、合并log  将处理的图片统一放到images 文件夹下
fs.readdir(pathName, (err, files) => {
  (function iterator(i){
    if(i == files.length) {
      return ;
    }
    if (files[i] != '.DS_Store') {
      fs.stat(path.join(pathName, files[i]), function(err, data){
        if(data.isFile()){               
            dealImage(files[i]);
        }
        iterator(i+1);
       });   
    } else {
      iterator(i+1);
    }
  })(0);
  console.log('deno');
})

function dealImage(data) {
  images( pathName + '/' + data)
  .size(750, 750)
  .draw(images(pathLogo), 10, 10)
  .draw(images(pathTitle), 0, 625)
  .save(savePath + '/' + data,{
    quality : 50
  });
}




