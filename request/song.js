/*
* 封装歌曲数据
* */
let promiseHttps = require('../utils/promiseHttps'),
    {parse} = require('../utils/parseSign'),
    {Base64} = require('js-base64')

/*
* 获取歌曲数据
* songId: 歌曲的Id
* copyright: 不传 返回歌曲的详情信息   "albummid"
*           传   返回歌曲的 m4a文件所在的 json文件   "songmid"
* */
let getSongData = (songId, copyright) => {
  let hostname = 'u.y.qq.com',
      url = '/cgi-bin/musics.fcg',
      params = {
        g_tk: 1807347960,
        // sign:'zzany09qmk055rgo2ide8eb7dce5d72490520aebab2de1fce2', // parse(data)
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: `{"comm":{"ct":24,"cv":10000},"albumDetail":{"module":"music.musichallAlbum.AlbumInfoServer","method":"GetAlbumDetail","param":{"albumMid":"${songId}"}}}`,
        _: Date.now()
      };

  // 判断是否有传入 copyright参数 如果有的话就是获取歌曲的m4a文件
  if (copyright) {
    params.data = `{"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"8058980168","songmid":["${songId}"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`
  }
  // 处理密钥
  params.sign = parse(params.data);
  return promiseHttps.getData({hostname, url, params})
}
/*
* 获取歌曲
* */
let getSongM4a = url => {
  return promiseHttps.getFile(url)
}
/*
* 获取歌词
* */
let getLyric = songId => {
  let url = '/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
      headers = {
        referer: 'https://y.qq.com/portal/player.html'
      },
      params = {
        g_tk: 1414077212,
        g_tk_new_20200303: 1414077212,
        format: 'json',
        outCharset: 'utf-8',
        notice: 0,
        songmid: songId,
        hostUin: 0,
        inCharset: 'inCharset',
        platform: 'yqq.json',
        needNewCode: 0,
        pcachetime: 1592041856541,
        loginUin: 0
      };
  return promiseHttps.getData({url, params, headers}).then(result => {
    result = JSON.parse(result);
    result.lyric = Base64.decode(result.lyric)
    return Promise.resolve(result)
  })
}
/* 获取歌曲的详情信息 */
let getSongDetail = songId => {
  let hostname = 'u.y.qq.com',
      url = '/cgi-bin/musicu.fcg',
      body = `{"comm":{"g_tk":1708031742,"uin":2573424017,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"detail":{"module":"music.pf_song_detail_svr","method":"get_song_detail","param":{"song_id":${songId}}},"simsongs":{"module":"rcmusic.similarSongRadioServer","method":"get_simsongs","param":{"songid":${songId}}},"gedan":{"module":"music.mb_gedan_recommend_svr","method":"get_related_gedan","param":{"sin":0,"last_id":0,"song_type":1,"song_id":${songId}}},"video":{"module":"MvService.MvInfoProServer","method":"GetSongRelatedMv","param":{"songid":"${songId}","songtype":1,"lastmvid":0,"num":5}}}`,
      method = 'POST',
      params = {
        _: Date.now()
      };

  return promiseHttps.getData({hostname, url, body, method, params})
}

module.exports = {
  getSongData,
  getSongM4a,
  getLyric,
  getSongDetail
}