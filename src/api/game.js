export default {
  //首页-热门游戏
  casinoGame(data) {
    return this.get('/homepage/casino-game', data).then(response =>  response)
  },
 
}