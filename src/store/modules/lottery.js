import { API } from '@/api'
import { Promise } from 'q'

const state = {
  // 用户配置
  userConfig: {
    singlePrice: 2,
    mode: 1.000
  },
  // 当前彩种
  currentLotterySign: 'cqssc',
  // 模式配置
  modeConfig: {
    '1.000': '元',
    '0.100': '角',
    '0.010': '分',
    '0.001': '厘'
  },
  // 玩法相关
  defaultGroup: '',
  defaultMethod: '',
  allMethods: {},
  lotteryList: {},
  // 主界面头部
  currentLottery: {},
  // 当前奖期
  currentIssue: {},
  // 当前玩法
  currentMethod: {},
  // 当前玩法系列
  currentMethodGroup: '',
  beforeIssue: {},
  nextIssue: {},
  // 计算属性
  currentOrderState: {},
  totalCost: {},
  orderList: [],
  // 投注相关的
  bet: {
    // 翻倍计算，初始化值
    doubleBeforeOrder: [],
    // 我的投注 我的追号
    betHistory: {
      myBetList: [],
      myChaseList: []
    },
    issueHistory: [],
    // 开奖区域 下方提示语
    issueDesc: '',
    // 玩法切换时
    methodsTab: 0
  },
  // 全部彩种
  lotteryAll: {},
  // 彩种全部期数

  // 可用奖期
  issueInfo: [],

  // 切换 官方和娱乐城 玩法
  chengeYlcPlays: {
    name: 'official',
    index: 0
  },
  // 拖动后的奖金组
  countPrize: 0,

  lotteryLists: [],
}

const mutations = {
  // 用户配置
  userConfig(state, userConfig) {
    state.userConfig = userConfig
  },

  // 拖动后的奖金组
  countPrize(state, data) {
    state.countPrize = data
  },
  // 注单列表
  orderList(state, orderList) {
    state.orderList = orderList
  },

  // 游戏列表
  initLotteryList(state, lotteryList) {
    state.lotteryList = lotteryList
  },

  // 当前游戏
  currentLottery(state, lottery) {
    state.currentLottery = lottery
  },
  // 下一奖期
  nextIssue(state, issue) {
    state.nextIssue = issue
  },

  // 上一奖期
  beforeIssue(state, issue) {
    state.beforeIssue = issue
  },

  // 当前玩法
  currentMethod(state, method) {
    state.currentMethod = method
  },

  // 当前玩法系列
  currentMethodGroup(state, data) {
    state.currentMethodGroup = data
  },

  // 当前选中订单数据
  currentOrderState(state, order) {
    state.currentOrderState = order
  },
  // 总花费
  totalCost(state, cost) {
    state.totalCost = cost
  },

  // 当前彩种所有玩法
  allMethods(state, allMethods) {
    state.allMethods = allMethods
  },

  // 当前彩种所有玩法
  defaultGroup(state, defaultGroup) {
    state.defaultGroup = defaultGroup
  },

  // 当前彩种所有玩法
  defaultMethod(state, defaultMethod) {
    state.defaultMethod = defaultMethod
  },
  // 当前彩种
  currentLotterySign(state, sign) {
    state.currentLotterySign = sign
  },
  // 全部彩种
  lotteryAll(state, data) {
    state.lotteryAll = data
    state.lotteryAll[state.currentLottery.en_name].methodConfig2 = [
      {
        name: '整合',
        rows: [
          {
            name: '直选',
            sign: 'zhixuan',
            methods: [{ method_id: 'ZH', method_name: '整合' }]
          }
        ],
        sign: 'ZH'
      },
      {
        name: '两面盘',
        rows: [
          {
            name: '直选',
            sign: 'zhixuan',
            methods: [{ method_id: 'LMP', method_name: '两面盘' }]
          }
        ],
        sign: 'LMP'
      },
      {
        name: '第一球',
        rows: [
          {
            name: '直选',
            sign: 'zhixuan',
            methods: [{ method_id: 'DYQ', method_name: '第一球' }]
          }
        ],
        sign: 'DYQ'
      },
      {
        name: '第二球',
        rows: [
          {
            name: '直选',
            sign: 'zhixuan',
            methods: [{ method_id: 'DEQ', method_name: '第二球' }]
          }
        ],
        sign: 'DEQ'
      },
      {
        name: '第三球',
        rows: [
          {
            name: '直选',
            sign: 'zhixuan',
            methods: [{ method_id: 'DSQ', method_name: '第三球' }]
          }
        ],
        sign: 'DSQ'
      },
      {
        name: '第四球',
        rows: [
          {
            name: '直选',
            sign: 'zhixuan',
            methods: [{ method_id: 'DSIQ', method_name: '第四球' }]
          }
        ],
        sign: 'DSIQ'
      },
      {
        name: '第五球',
        rows: [
          {
            name: '直选',
            sign: 'zhixuan',
            methods: [{ method_id: 'DWQ', method_name: '第五球' }]
          }
        ],
        sign: 'DWQ'
      },
      {
        name: '龙虎斗',
        rows: [
          {
            name: '直选',
            sign: 'zhixuan',
            methods: [{ method_id: 'LHD', method_name: '龙虎斗' }]
          }
        ],
        sign: 'LHD'
      },
      {
        name: '全五中一',
        rows: [
          {
            name: '直选',
            sign: 'zhixuan',
            methods: [{ method_id: 'QWZY', method_name: '全五中一' }]
          }
        ],
        sign: 'QWZY'
      }
    ]

  },
  // 当前奖期信息
  currentIssue(state, data) {
    state.currentIssue = data
  },
  // 所有彩种期数
  issueInfo(state, data) {
    state.issueInfo = data
  },
  // 我的投注 和 我的追号
  betHistory(state, data) {
    state.bet.betHistory.myBetList = data.project
    state.bet.betHistory.myChaseList = data.trace
  },
  // 历史开奖记录
  issueHistory(state, data) {
    state.bet.issueHistory = data
  },
  // 投注页面 奖期
  issueDesc(state, data) {
    state.bet.issueDesc = data
  },
  // 玩法切换时
  methodsTab(state) {
    state.bet.methodsTab += 1
  },

  // 切换 官方和娱乐城 玩法
  chengeYlcPlays(state, data) {
    state.chengeYlcPlays = data
  },

  SET_LOTTERY_LISTS(state, data) {
    state.lotteryLists = data
  },
}

const actions = {
  // 全部彩种
  lotteryAll({ commit }) {
    API.getLotteryInfo().then(res => {
      if (res.success) {
        commit('lotteryAll', res.data)
      }
    })
  },
  // 我的投注 和 我的追号
  betHistory({ commit, state }) {
    const bet = {}
    const betHistory = API.getBetHistory(state.currentLottery.en_name).then(({success,data}) => {
      if (success) {
        bet.project = data.data
      }
    })
    const traceHistory = API.getTracesHistory(state.currentLottery.en_name).then(({success,data}) => {
      if (success) {
        bet.trace = data.data
      }
    })
    Promise.all([betHistory, traceHistory]).then(() => {
      commit('betHistory', bet)
    })
  },
  // 历史开奖记录
  issueHistory({ commit, state}) {
    API.getIssueHistory(state.currentLottery.en_name).then(data => {
      if (data.success) {
        commit('issueHistory', data.data)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
