let express = require('express'),
    router = express.Router(),
    search = require('../request/search')

// 热搜
router.get('/hotSearch', (req, res) => {
  search.getHotSearch().then(result => {
    res.send(result)
  })
})
// 搜索
router.get('/search', (req, res) => {
  let {w, p, n} = req.query
  if(!w){
    res.send('搜索失败')
  }else{
    search.searchMusic(w,p,n).then(result=>{
      res.send(result)
    })
  }

})

module.exports = router