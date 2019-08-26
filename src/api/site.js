export default {
  //网站头ico 二维码  LOGO
  getBasicContent() {
    return this.get('/homepage/get-basic-content').then(response =>  response)
  },
  // 获取需要展示的前台模块 
  showHomepageModel(data) {
    return this.get('/homepage/show-homepage-model', data).then(response =>  response)
  },
  //获取用户信息 
  getBanner(data) {
    return this.get('/homepage/banner', data).then(response =>  response)
  },
  //热门彩种
  getPopularLotteries2(data) {
    return this.get('/homepage/popular-methods', data).then(response =>  response)
  },
  //.热门游戏
  getPopularGame(data) {
    return this.get('/homepage/get-popular-game', data).then(response =>  response)
  },
  //二维码 
  getActivity() {
    return this.get('/homepage/activity').then(response =>  response)
  },
  
  //公告API
  getNotice(data) {
    return this.post('/homepage/notice', data).then(response =>  response)
  },
  //中奖排行
  getRanking() {
    return this.get('/homepage/ranking').then(response =>  response)
  },
  //中奖排行 
  getUserHelp() {
    return this.get('/user-help/menus').then(response =>  response)
  },
  //开奖公告
  lotteryNoticeList() {
    return this.get('/homepage/lottery-notice-list').then(response =>  response)
  },
  //公告|站内信 已读
  lotteryRedMessage(data) {
    return this.post('/homepage/read-message', data).then(response =>  response)
  }
}