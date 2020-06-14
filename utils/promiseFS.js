/*
* 将fs中的常用 I/O 操作封装为promise版本
* */

let fs = require('fs'),
    path = require('path'),
    resultObj = {};

let suffixHandle = (pathname) => {
  let suffixReg = /\.(PNG|JPG|JPEG|WEBP|ICO|BMP|SVG|MP4|MP3|M3U8|WAV|OGG)$/i
  return suffixReg.test(pathname)
}

// READ-FILE / READ-DIR / MK-DIR / RM-DIR / UN-LINK /
/*
* 读取文件时 需要使用编码 以及过滤 富媒体 文件
* */
['readFile', 'readdir', 'mkdir', 'rmdir', 'unlink'].forEach(item => {
  resultObj[item] = function (pathname, encoding = 'utf8') {
    return new Promise((resolve, reject) => {
      let callback = function (err, res) {
        !err ? resolve(res) : reject(err)
      }
      // 如果是富媒体编码就为null
      suffixHandle() ? encoding = null : null
      pathname = path.resolve(pathname)

      if (item !== 'readFile') {
        encoding = callback
        encoding = null
      }
      fs[item](pathname, encoding, callback)
    })
  }
});

// WRITE-FILE / APPEND-FILE
['writeFile', 'appendFile'].forEach(item => {
  resultObj[item] = function (pathname, content, encoding = 'utf8') {
    // 支持JSON类型数据
    (typeof content === 'object' && content !== null) ? content = JSON.stringify(content) : null
    // 将传入的内容转为 对象
    typeof content !== 'string' ? content += '' : null
    return new Promise((resolve, reject) => {
      let callback = function (err, res) {
        !err ? resolve(res) : reject(err)
      }
      pathname = path.resolve(pathname)
      fs[item](pathname, content, encoding, callback)
    })
  }
})

// COPYFILE
resultObj['copyFile'] = function (pathname1, pathname2) {
  return new Promise((resolve, reject) => {
    // 解析路径 为了防止路径错误
    pathname1 = path.resolve(pathname1)
    pathname2 = path.resolve(pathname2)

    let callback = function (err) {
      !err ? resolve() : reject(err)
    }

    fs['copyFile'](pathname1, pathname2, callback)
  })
}

module.exports = resultObj