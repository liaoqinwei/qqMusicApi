let express = require('express'),
    router = express.Router(),
    promiseFs = require('../utils/promiseFS')


//     移动端
// 推荐数据( 移动端 )
router.get('/recommend', (req, res) => {
  let {url} = req;
  promiseFs.readFile('./json/recommend.json').then(result => {
    res.send(result)
  })
})
// 排行榜数据( 移动端 )
router.get('/tolist', (req, res) => {
  let {url} = req;
  promiseFs.readFile('./json/tolist.json').then(result => {
    res.send(result)
  })
})

module.exports = router