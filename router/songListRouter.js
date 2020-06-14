let express = require('express'),
    router = express.Router(),
    songList = require('../request/songList')

// 返回歌单详情
router.get('/songList', (req, res) => {
  let listId = req.query.id
  if (!listId) {
    res.send('请求错误，请传入参数')
  } else {
    songList.getSongListDetail(listId).then(result => {
      res.send(result)
    })
  }
})


module.exports = router