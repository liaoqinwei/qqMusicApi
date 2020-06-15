const https = require('https'),
    http = require('http');

/* 处理参数
 * url: 拼接的路径
 * param: 参数[Object]
 *  */
let urlHandler = (url, param = {}) => {
  let result = ''
  for (let key in param) {
    // 如果是自身属性, 避免遍历到原型
    if (param.hasOwnProperty(key)) {
      result += `&${key}=${param[key]}`
    }
  }
  return url.indexOf('?') > -1 ? `${url}&${result}` : `${url}?${result.slice(1)}`
}

/*
* 用于发送请求 返回一个promise实例
*
* */
let getData = (config = {}) => {
  // 没有传参就抛出异常
  if (Object.keys(config).length === 0) {
    throw new Error('Please pass in parameters !')
  }
  /* 解构参数:url请求地址 params请求参数 headers请求头信息 hostname请求的主机名 */
  let {
        url,
        params = {},
        headers = {
          Connection: 'keep-alive',
          Accept: '*/*'
        },
        hostname = 'c.y.qq.com',
        method = 'get'
      } = config,
      path = urlHandler(url, params), // 解析参数
      options = {hostname, path, headers, method}

  return new Promise((resolve, reject) => {
    // 发送https请求
    let req = https.request(options, (res) => {
      // 接收数据
      let chunk = ''
      // 数据是流传输 所以我们要监听 data 事件
      res.on('data', result => {
        chunk += result + ''
      })
      res.on('end', () => {
        resolve(chunk)
      })
    })
    // 如果有请求体
    if (config.body) {
      req.write(config.body)
    }
    // 有错误就执行 reject
    req.on('error', err => {
      reject(err)
    })
    req.end()
  })
}

/*
* 获取文件
* */
let getFile = url => {
  if (!url) return;
  return new Promise(resolve => {
    http.get(url, res => {
      let list = [], file
      // 我们用数组把所有的流 存储起来
      res.on('data', result => {
        list.push(result)
      })
      // 将所有的流 拼接成一个流 然后返回调用 resolve
      res.on('end', () => {
        file = Buffer.concat(list)
        resolve(file)
      })
    })
  })
}

module.exports = {getData, getFile}


// 测试 test
/*getData({
  url: '/cgi-bin/musicu.fcg',
  params: {
    g_tk: 1278911659,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8¬ice=0',
    platform: 'yqq',
    needNewCode: '0',
    data: '{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}'
  }
}).then(res=>{
  console.log(res);
})*/


