let {getData} = require('../utils/promiseHttps'),
    {writeFile} = require('../utils/promiseFS');
// 移动端主页数据思路
// 我们把数据获取下来 通过 正则拆分数据
// 将数据保存到index.json 中
// 为了保证数据真实，我们需要每隔一分钟执行一次这个方法
let saveRecommendData = () => {
  getData({url: 'https://i.y.qq.com/n2/m/index.html'}).then(res => {
    let reg = /<script>window\.__INIT_DATA__=(.*?)<\/script>/,
        data = reg.exec(res)[1];
    // 存数据
    writeFile('./json/recommend.json', data).then(() => {
      console.log('推荐数据更新成功')
    })
  })
}

let saveTopListData = () => {
  getData({url: 'https://i.y.qq.com/n2/m/index.html?tab=toplist'}).then(res => {
    let reg = /<script>window\.__INIT_DATA__=(.*?)<\/script>/,
        data = reg.exec(res)[1];
    // 存数据
    writeFile('./json/tolist.json', data).then(() => {
      console.log('排行数据更新成功')
    })
  })
}

module.exports = {
  saveRecommendData,
  saveTopListData
}