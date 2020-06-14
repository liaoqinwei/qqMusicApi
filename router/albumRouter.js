let express = require('express'),
    router = express.Router(),
    album = require('../request/album')

// 最新专辑
router.get('/newAlbum', (req, res) => {
  let {page, num} = req.query;
  album.getNewAlbum(page, num).then(result => {
    res.send(result)
  })
})
// 专辑详情
router.get('/albumDetail', (req, res) => {
  let albumId = req.query.id;
  album.getAlbumDetail(albumId).then(result => {
    res.send(result)
  })
})

module.exports = router