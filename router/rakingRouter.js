let express = require('express'),
    router = express.Router(),
    raking = require('../request/raking')


// 排行榜数据
router.get('/raking', (req, res) => {
  raking.getRankingData().then(result => {
    res.send(result)
  })
})
// 排行榜详情
router.get('/rakingDetail', (req, res) => {
  let topId = req.query.id
  if (!topId) {
    res.send('请求错误，请传入参数')
  } else {
    raking.getRankingDetail(topId).then(result => {
      res.send(result)
    })
  }
})

module.exports = router