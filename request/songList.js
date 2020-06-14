let promiseHttps = require('../utils/promiseHttps')


/*
* 推荐
* */
let getCommendData = () => {
  // 提取 地址 和参数
  let hostname = 'u.y.qq.com',
      url = '/cgi-bin/musicu.fcg',
      params = {
        g_tk: 1278911659,
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8¬ice=0',
        platform: 'yqq',
        needNewCode: '0',
        data: '{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}'
      };
  return promiseHttps.getData({url, params, hostname})
}
/*
* 歌单详情
* 需要传入歌单的Id
* */
let getSongListDetail = (listId) => {
  let url = '/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
      params = {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        disstid: listId,
        format: 'json',
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      },
      headers = {referer: `https://y.qq.com/n/yqq/playlist/${listId}.html`};

  return promiseHttps.getData({url, params, headers})
}


module.exports = {
  getCommendData,
  getSongListDetail
}
