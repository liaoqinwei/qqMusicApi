let promiseHttps = require('../utils/promiseHttps')
/*
* 最新专辑
* page: 当前页
* num：每页专辑数量
*
* */
let getNewAlbum = (page = 0, num = 20) => {
  let hostname = 'u.y.qq.com',
      url = '/cgi-bin/musicu.fcg',
      params = {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        data: `{"albumlib":{"method":"get_album_by_tags","param":{"area":1,"company":-1,"genre":-1,"type":-1,"year":-1,"sort":2,"get_tags":1,"sin":${page},"num":${num},"click_albumid":0},"module":"music.web_album_library"}}`
      };
  return promiseHttps.getData({hostname, url, params})
}
/*
* 专辑详情
* albummid: 专辑的id
* */
let getAlbumDetail = (albummid) => {
  let url = '/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
      params = {
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        albummid: albummid,
        g_tk: 1278911659
      };
  return promiseHttps.getData({url, params})
}

module.exports = {
  getNewAlbum,
  getAlbumDetail
}