/*
* 封装关于排行榜的数据
* */
let promiseHttps = require('../utils/promiseHttps')

/*
* 排行榜
* */
let getRankingData = () => {
  let url = '/v8/fcg-bin/fcg_myqq_toplist.fcg',
      params = {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: Date.now()
      };
  return promiseHttps.getData({url, params})
}
/*
* 排行榜详情
* topId 需要传入排行榜 表单的id
* */
let getRankingDetail = (topId) => {
  let url = '/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      params = {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid:topId,
        _: Date.now()
      };
  return promiseHttps.getData({url, params})
}

module.exports = {
  getRankingData,
  getRankingDetail
}