import { API } from '@/api'

const state = {
  banner: [],
  qrSrc: '',
  logoSrc: '',
  notice: '',
  popularLotteries1: [],
  popularLotteries2: []
}

const mutations = {
  SET_POPULAR_LOTTERIES1: (state, token) => {
    state.popularLotteries1 = token
  },
  SET_POPULAR_LOTTERIES2: (state, token) => {
    state.popularLotteries2 = token
  },
  SET_BANNER: (state, token) => {
    state.banner = token
  },
  SET_QR_SRC(state, data) {
    state.qrSrc = data
  },
  SET_LOGO_SRC(state, data) {
    state.logoSrc = data
  },
  SET_NOTICE(state, data) {
    state.notice = data
  },
}

const actions = {
  //获取banner
  getBanner({ commit }){
    API.getBanner().then(({success, data}) => {
      if (success) {
        commit('SET_BANNER', data)
      }
    })
  },
  //获取二维码
  getQrcode({ commit }){
    API.getQrcode().then(({success, data}) => {
      if (success) {
        commit('SET_QR_SRC', data.value)
      }
    })
  },
  //获取logo
  getLogo({ commit }){
    API.getLogo().then(({success, data}) => {
      if (success) {
        commit('SET_LOGO_SRC', data.value)
      }
    })
  },
  //获取公告 API
  getNotice({ commit }){
    API.getNotice().then(({success, data}) => {
      if (success) {
        commit('SET_NOTICE', data.value)
      }
    })
  },
  getPopularLotteries1({ commit }){
    API.getPopularLotteries1().then(({success, data}) => {
      if (success) {
        commit('SET_POPULAR_LOTTERIES1', data)
      }
    })
  },
  getPopularLotteries2({ commit }){
    API.getPopularLotteries2().then(({success, data}) => {
      if (success) {
        commit('SET_POPULAR_LOTTERIES2', data)
      }
    })
  },
}

export default {
  state,
  mutations,
  actions
}