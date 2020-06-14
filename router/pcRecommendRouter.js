let express = require('express'),
    router = express.Router(),
    songList = require('../request/songList')

//      PC端
// 推荐数据
router.get('/precommend', (req, res) => {
  songList.getCommendData().then(result => {
    res.send(result)
  })
})

module.exports = router