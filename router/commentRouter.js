let {getComment} = require('../request/comment'),
    express = require('express'),
    router = express.Router();


router.get('/comment', (req, res) => {
  let id = req.query.id,
      page = req.query.page;
  getComment(id, page).then(result => {
    res.send(result)
  })
})


module.exports = router

