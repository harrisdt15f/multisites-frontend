import { API } from '@/api'

const state = {
  banner: [],
  qrSrc: '',
  logoSrc: '',
  notice: '',
  activity: '',
  popularLotteries1: [],
  popularLotteries2: [],
  showBanner: false,
  showSideFloat: true
}

const mutations = {
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
      val.pic_path = process.env.VUE_APP_API_URL + val.pic_path
    })
    state.popularLotteries1 = data
  },
  SET_POPULAR_LOTTERIES2: (state, data) => {
    state.popularLotteries2 = data
  },
  SET_BANNER: (state, data) => {
    data.forEach(val => {
      val.pic_path = process.env.VUE_APP_API_URL + val.pic_path
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
        commit('SET_NOTICE', data)
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
  getActivity({ commit }){
    API.getActivity().then(({success, data}) => {
      if (success) {
        commit('SET_ACTIVITY', data)
      }
    })
  },
}

export default {
  state,
  mutations,
  actions
}