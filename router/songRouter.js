let express = require('express'),
    router = express.Router(),
    song = require('../request/song'),
    mime = require('mime')


// 返回歌曲m4a文件
router.get('/song', (req, res) => {
  let songId = req.query.id
  res.status(200)
  res.type(mime.getType('m4a'))
  if (!songId) {
    res.send('请求错误，请传入参数')
  } else {
    song.getSongData(songId, 1).then(result => {
      result = JSON.parse(result)
      let data = result['req_0'].data,
          url = data.sip[0] + data.midurlinfo[0].purl;
      return song.getSongM4a(url)
    }).then(result => {
      res.send(result)
    })
  }
})
// 获取歌词
router.get('/lyric', (req, res) => {
  let songId = req.query.id
  if (!songId) {
    res.send('请求错误，请传入参数')
  } else {
    song.getLyric(songId).then(result => {
      res.send(result)
    })
  }
})
// 返回歌曲详情信息
router.get('/songDetail', (req, res) => {
  let songId = req.query.id;
  if (!songId) {
    res.send('请求错误，请传入参数')
  } else {
    song.getSongData(songId).then(result => {
      res.send(result)
    })
  }
})


module.exports = router