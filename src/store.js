import Vue from 'vue'
import Vuex from 'vuex'
import { API } from './API'

Vue.use(Vuex);

const store =  new Vuex.Store({
    state: {
        // 用户信息
        account: {
            username: '',
            balance: ''

        },
        // 用户配置
        userConfig:{
            singlePrice: 2,
        },
        // 当前彩种
        currentLotterySign: 'cqssc',
        // 模式配置
        modeConfig: {
            '1':"元",
            '0.1':'角',
            '0.01':'分',
            '0.001':'厘',
        },
        // 玩法相关
        defaultGroup:'',
        defaultMethod:'',
        allMethods:{},
        lotteryList:{},
        // 主界面头部
        currentLottery:{},
        currentIssue: {},
        currentMethod: {},
        beforeIssue:{},
        nextIssue:{},
        // 计算属性
        currentOrderState:{},
        totalCost:{},
        orderList:[],
        // 投注相关的
        bet: {
            // 翻倍计算，初始化值
            doubleBeforeOrder: []
        },
        // 全部彩种
        lotteryAll: {},
        // 彩种全部期数
        issueInfo: []
    },
    mutations: {
        // 用户配置
        userConfig (state, userConfig) {
            state.userConfig = userConfig;
        },

        // 注单列表
        orderList (state, orderList) {
            state.orderList = orderList;
        },

        // 游戏列表
        initLotteryList (state, lotteryList) {
            state.lotteryList = lotteryList;
        },

        // 当前游戏
        currentLottery (state, lottery) {
            state.currentLottery = lottery;
        },
        // 下一奖期
        nextIssue (state, issue) {
            state.nextIssue = issue;
        },

        // 上一奖期
        beforeIssue (state, issue) {
            state.beforeIssue = issue;
        },

        // 当前玩法
        currentMethod (state, method) {
            state.currentMethod = method;
        },

        // 当前选中订单数据
        currentOrderState (state, order) {
            state.currentOrderState = order;
        },
        // 总花费
        totalCost (state, cost) {
            state.totalCost = cost;
        },

        // 当前彩种所有玩法
        allMethods (state, allMethods) {
            state.allMethods = allMethods;
        },

        // 当前彩种所有玩法
        defaultGroup (state, defaultGroup) {
            state.defaultGroup = defaultGroup;
        },

        // 当前彩种所有玩法
        defaultMethod (state, defaultMethod) {
            state.defaultMethod = defaultMethod;
        },
        // 当前彩种
        currentLotterySign (state, sign) {
            state.currentLotterySign = sign
        },
        // 全部彩种
        lotteryAll (state, data) {
            state.lotteryAll = data
        },
        // 当前奖期信息
        currentIssue (state, data) {
            state.currentIssue = data
        },
        // 所有彩种期数
        issueInfo (state, data) {
            state.issueInfo = data
        },
        // 用户信息
        account (state, data) {
            state.account = data
        }
    },
    actions: {
        // 全部彩种
        lotteryAll ({ commit }) {
            API.getLotteryInfo().then(res => {
                if (res.isSuccess) {
                  commit('lotteryAll', res.data)
                }
            })
        }
    }
});

export default store;