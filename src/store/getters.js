const getters = {
  token: state => state.user.token,
  userDetail: state => state.user.userDetail,
  currentLottery: state => state.lottery.currentLottery,
  lotteryAll: state => state.lottery.lotteryAll,
  bet: state => state.lottery.bet,
  issueInfo: state => state.lottery.issueInfo,
  allMethods: state => state.lottery.allMethods,
  defaultGroup: state => state.lottery.defaultGroup,
  defaultMethod: state => state.lottery.defaultMethod,
  currentMethod: state => state.lottery.currentMethod,
  chengeYlcPlays: state => state.lottery.chengeYlcPlays,
  orderList: state => state.lottery.orderList,
  currentOrderState: state => state.lottery.currentOrderState,
  totalCost: state => state.lottery.totalCost,
  currentIssue: state => state.lottery.currentIssue,
  userConfig: state => state.lottery.userConfig,
  currentLotterySign: state => state.lottery.currentLotterySign,
  lotteryLists: state => state.lottery.lotteryLists,  
}

export default getters