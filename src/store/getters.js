const getters = {
  // 登录
  token: state => state.user.token,
  userDetail: state => state.user.userDetail,
  // 网站
  banner: state => state.site.banner,
  qrSrc: state => state.site.qrSrc,
  logoSrc: state => state.site.logoSrc,
  notice: state => state.site.notice,
  popularLotteries2: state => state.site.popularLotteries2,
  popularLotteries1: state => state.site.popularLotteries1,
  showBanner: state => state.site.showBanner,
  showSideFloat: state => state.site.showSideFloat,
  // 彩票
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
  countPrize: state => state.lottery.countPrize,
}

export default getters
