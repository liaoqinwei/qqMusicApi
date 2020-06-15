let express = require('express'),
    index = require('./request'),
    mime = require('mime'),
    bodyParser = require('body-parser'),
    routers = require('./router');
// 初始化
let app;
let init = () => {
  // 启动服务器
  app = express()
  // 收到请求 调用写好的接口 响应数据
  app.listen(9090, () => {
    console.log('服务启动！')
  })
  // 配置
  app.use(bodyParser.urlencoded({extended: false}))
  app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200)
    res.type(mime.getType('json'))
    next()
  })
  app.use(routers)

  // 设置一个定时器，每隔一个小时执行saveIndexData，保证主页获取到的数据的真实性
  index.saveRecommendData()
  index.saveTopListData()
  setInterval(() => {
    index.saveRecommendData()
    index.saveTopListData()
  }, 1000 * 60 * 60);
}

init()
app.set('port',9090)