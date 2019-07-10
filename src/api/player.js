export default {
  // 玩家-投注记录 
  getBetGameRecord(data) {
    return this.post('/lotteries/projectHistory', data).then(response =>  response)
  },
  // 玩家-追号记录 
  getBetTraceRecord(data) {
    return this.post('/lotteries/tracesHistory', data).then(response =>  response)
  }
}
