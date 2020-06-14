/*
* 封装关于搜索功能的请求
* */
let promiseHttps = require('../utils/promiseHttps')

/*
* 获取热搜数据
* */
let getHotSearch = () => {
  let url = '/splcloud/fcgi-bin/gethotkey.fcg',
      params = {
        outCharset: 'utf-8',
        notice: '0',
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        platform: 'h5',
        needNewCode: 1,
        _: Date.now()
      };

  return promiseHttps.getData({url, params})
}
/*
* 搜索功能
* w: 搜索的字段 必传
* p: 页码   1
* n: 每页的条数 20
* */
let searchMusic = (w, p = 1, n = 20) => {
  let url = '/soso/fcgi-bin/client_search_cp',
      params = {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        w: encodeURIComponent(w),
        p, n,
        zhidaqu: 1,
        catZhida: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: 20,
        remoteplace: 'txt.mqq.all',
        _: Date.now()
      };
  return promiseHttps.getData({url, params})
}


module.exports = {
  getHotSearch,
  searchMusic
}