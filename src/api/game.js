export default {
  //首页-热门游戏
  casinoGame(data) {
    return this.get('/homepage/casino-game', data).then(response =>  response)
  },
  // 导航-游戏平台
  casinoPlat(data) {
    return this.post('/casinoPlat', data).then(response =>  response)
  },
}