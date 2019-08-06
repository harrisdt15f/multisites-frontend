export default {
  // 获取彩种接口
  getLotteryList() {
    return this.post('/lotteries/lotteryList').then(response => response)
  },
  // 获取彩种详情
  getLotteryInfo() {
    return this.post('/lotteries/lotteryInfo').then(response => response)
  },
  // 获取奖期历史
  getIssueHistory(lotterySign, count = 10) {
    let data = {
      lottery_sign: lotterySign,
      count: count
    }
    return this.post('/lotteries/issueHistory', data).then(response => response)
  },
  /*
   * 可用奖期
   */
  getOpenAward(sign) {
    let data = {
      lottery_sign: sign
    }
    return this.post('/lotteries/availableIssues', data).then(
      response => response
    )
  },
  /*
   * 投注历史
   */
  getBetHistory(sign, count = 10, start = 0) {
    let data = {
      lottery_sign: sign,
      page_size: count,
      start: start
    }
    return this.post('/lotteries/projectHistory', data).then(
      response => response
    )
  },
   /*
   * 追号历史
   */
  getTracesHistory(sign, count = 10, start = 0) {
    let data = {
      lottery_sign: sign,
      page_size: count,
      start: start
    }
    return this.post('/lotteries/tracesHistory', data).then(
      response => response
    )
  },
  /*
   * 投注
   *lottery_sign  彩种标识
   *trace_issues @json 追号期号
   *balls @[{}] 投注号码
   *trace_win_stop @ 0 否 1 是 是否中奖追号停止
   *total_cost  投注金额
   */
  bet(lotterySign, issues, balls, total_cost, is_trace = 0, trace_win_stop = 1) {
    let data = {
      lottery_sign: lotterySign,
      trace_issues: JSON.stringify(issues),
      balls: JSON.stringify(balls),
      trace_win_stop: trace_win_stop,
      total_cost: total_cost,
      is_trace: is_trace
    }
    return this.post('/lotteries/bet', data).then(response => response)
  },
  /*
   * 获取用户余额
   */
  getBalance() {
    return this.post(this.url.balance).then(response => response)
  },
  /*
   * 获取用户余额
   */
  getNoticeList() {
    return this.post(this.url.noticeList).then(response => response)
  },
  //游戏-投注撤销
  cancelBet(data) {
    return this.post('/lotteries/cancel-bet', data).then(response =>  response)
  },
  //游戏-投注撤销
  stopTrace(data) {
  return this.post('/lotteries/stop-trace', data).then(response =>  response)
},
}
