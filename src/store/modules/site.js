import { API } from '@/api'

const state = {
  banner: [],
  qrSrc: '',
  logoSrc: ''
}

const mutations = {
  SET_BANNER: (state, token) => {
    state.banner = token
  },
  SET_QR_SRC(state, data) {
    state.qrSrc = data
  },
  SET_LOGO_SRC(state, data) {
    state.logoSrc = data
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
  }
}

export default {
  state,
  mutations,
  actions
}