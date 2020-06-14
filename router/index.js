let songRouter = require('./songRouter'),
    songListRouter = require('./songListRouter'),
    searchRouter = require('./searchRouter'),
    rakingRouter = require('./rakingRouter'),
    albumRouter = require('./albumRouter'),
    pcRecommendRouter = require('./pcRecommendRouter'),
    phoneIndexRouter = require('./phoneIndexRouter')

module.exports = [songRouter, songListRouter, searchRouter, rakingRouter, albumRouter, pcRecommendRouter, phoneIndexRouter]
