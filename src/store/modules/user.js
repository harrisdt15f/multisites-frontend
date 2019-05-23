import { API } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  // 用户信息
  userDetail: {
    username: '',
    balance: ''
  },
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_DETAIL(state, data) {
    state.userDetail = data
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      API.login( username.trim(), password ).then(response => {
        const { data, success } = response
        if (success) {
          commit('SET_TOKEN', data.access_token)
          setToken(data.access_token, data.expires_at)
          resolve()
        } else {
          reject()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户信息
  getUserDetail({ commit }) {
    return new Promise((resolve, reject) => {
      API.getUserDetail()
        .then(res => {
          const { success } = res
          if (success) {
            resolve(res)
            commit('SET_USER_DETAIL', res.data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions
}