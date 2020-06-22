let {getData} = require('../utils/promiseHttps')

let getComment = (id, page = 0) => {
  let url = '/base/fcgi-bin/fcg_global_comment_h5.fcg',
      params = {
        g_tk: 1719479462,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        g_tk_new_20200303: 1719479462,
        cid: 205360772,
        reqtype: 1,
        cmd: 8,
        needmusiccrit: 0,
        pagesize: 3,
        lasthotcommentid: 0,
        qq: 2573424017,
        msg_comment_id: '',
        pagenum: page,
        biztype: 1,
        topid: id,
        ct: 888,
        _: Date.now()
      };
  return getData({url, params});
}

module.exports={getComment}