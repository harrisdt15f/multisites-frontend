import { API } from '@/api'

const state = {
  banner: [],
  ico:'',
  qrSrc: '',
  logoSrc: '',
  notice: '',
  activity: '',
  popularLotteries1: [],
  popularChess: [],
  popularEgame:[],
  ranking: [],
  lotteryNoticeList: [],
  showBanner: false,
  showSideFloat: true,
  helpList: []
}

const mutations = {
  SET_ICO:(state, data) => {
    state.ico = process.env.VUE_APP_API_URL + data
  },
  SET_HELP_LIST:(state, data) => {
    state.helpList = data
  },
  SET_LOTTERY_NOTICE: (state, data) => {
    state.lotteryNoticeList = data
  },
  SET_SHOW_FLOAT: (state, data) => {
    state.showSideFloat = data
  },
  SET_SHOW_BANNER: (state, data) => {
    state.showBanner = data
  },
  SET_ACTIVITY: (state, data) => {
    state.activity = data
  },
  SET_POPULAR_LOTTERIES1: (state, data) => {
    data.forEach(val => {
      val.icon_path = `${process.env.VUE_APP_API_URL}${val.icon_path}`
    })
    state.popularLotteries1 = data
  },
  SET_POPULAR_CHESS: (state, data) => {
    data.forEach(val => {
      val.icon = `${process.env.VUE_APP_API_URL}/${val.icon.substring(1)}`
    })
    state.popularChess = data
  },
  SET_POPULAR_EGAME: (state, data) => {
    data.forEach(val => {
      val.icon = `${process.env.VUE_APP_API_URL}/${val.icon.substring(1)}`
    })
    state.popularEgame = data
  },
  SET_BANNER: (state, data) => {
    data.forEach(val => {
      val.pic_path = `${process.env.VUE_APP_API_URL}/${val.pic_path}`
    })
    state.banner = data
  },
  SET_QR_SRC(state, data) {
    state.qrSrc = process.env.VUE_APP_API_URL + data
  },
  SET_LOGO_SRC(state, data) {
    state.logoSrc = process.env.VUE_APP_API_URL + data
  },
  SET_NOTICE(state, data) {
    state.notice = data
  },
  SET_RANKING(state, data) {
    data.forEach(val => {
      val.user_icon = `${process.env.VUE_APP_API_URL}/${val.user_icon.substring(1)}`
    })
    state.ranking = data
  },
}

const actions = {
  //获取banner
  getBanner({ commit }){
    commit('SET_SHOW_BANNER', true)
    API.getBanner().then(({success, data}) => {
      if (success) {
        commit('SET_BANNER', data)
      }
    })
  },
  //获取网站基本内容
  getBasicContent({ commit }){
    API.getBasicContent().then(({success, data}) => {
      if (success) {
        commit('SET_ICO', data.ico)
        commit('SET_LOGO_SRC', data.logo.value)
        commit('SET_QR_SRC', data.qrcode.value)
      }
    })
  },
  //获取公告 API
  getNotice({ commit }, sendData){
    return new Promise((resolve) => {
      API.getNotice(sendData).then(res => {
        const { success, data } = res
        if (success) {
          resolve(res)
          commit('SET_NOTICE', data)
        }
      })
    })
  },
  getPopularGame({ commit }){
    API.getPopularGame().then(({success, data}) => {
      if (success && data) {
        commit('SET_POPULAR_LOTTERIES1', data.lotteries)
        commit('SET_POPULAR_CHESS', data.chess_cards)
        commit('SET_POPULAR_EGAME', data.e_game)
      }
    })
  },
  getActivity({ commit }){
    API.getActivity().then(({success, data}) => {
      if (success) {
        commit('SET_ACTIVITY', data)
      }
    })
  },
  getRanking({ commit }){
    API.getRanking().then(({success, data}) => {
      if (success) {
        commit('SET_RANKING', data)
      }
    })
  },
  getLotteryNotice({ commit }){
    API.lotteryNoticeList().then(({success, data}) => {
      if (success) {
        commit('SET_LOTTERY_NOTICE', data)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
