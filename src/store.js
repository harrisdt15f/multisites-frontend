import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store =  new Vuex.Store({
    state: {
        // 用户配置
        userConfig:{
            singlePrice: 2,
        },

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
        issueHistory:{},
        currentLottery:{},
        currentMethod: {},
        currentIssue:{},
        beforeIssue:{},
        nextIssue:{},

        // 计算属性
        currentOrderState:{},
        totalCost:{},
        orderList:[],
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

        // 当前奖期
        currentIssue (state, issue) {
            state.currentIssue = issue;
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

        // 奖期历史
        issueHistory (state, historyData) {
            state.issueHistory = historyData;
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
    },
    actions: {
    }
});

export default store;