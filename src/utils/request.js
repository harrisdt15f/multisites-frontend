import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken, getIsCryptData } from '@/utils/auth'
import { AES_encrypt, randomString } from '@/utils/encrypt'
import { nextTick } from 'q'

import qs from 'qs'

import router from '@/route'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL + '/web-api', // url = base url + request url
  timeout: 1000 * 60 * 3 // request timeout
})

//偏移量 由前端每次请求随机生成 16位
var IV = randomString(16)
//AES加密KEY 由前端自己每次请求随机生成
var KEY = randomString(16)
//公钥固定值
var pkcs8_public =
  '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCt5ugWm2WdqkMI5iDgTmdavYPTp6hmqbopy7N9fNnsNiwEE+toi0XgQjQeuE0Yf7VOIiCI8eWzUaTWfCK3D/dmFTbsTK3Ugql6QuYKRhSn9QnxtEqzvkz5jv3dc3sSav8gK3Ox22DBWUX5LOwY52kBieawlRFckv8vtCOYVPrd+wIDAQAB-----END PUBLIC KEY-----'

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    if (config.data) {
      
      console.log(`%c ${config.url}`, 'color: #ff7200', config.data)
      const IsCryptData = getIsCryptData()
      if (IsCryptData == 'true') {
        //判断是否加密
        const enstr = AES_encrypt(
          JSON.stringify(config.data),
          KEY,
          IV,
          pkcs8_public
        )
        config.headers['Content-Type'] =
          'application/x-www-form-urlencoded; charset=UTF-8'
        config.data = qs.stringify({ data: enstr })
      }
      if (config.url.includes('/pay/v2.0/withdraw')) {
        config.data = qs.stringify(config.data)
        config.headers['Content-Type'] =
          'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//标记
let sign_0 = 0
let sign = 0
// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res && !res.success && res.message) {
      let message = res.message
      if (res.code == 0) {
        sign += 1
        if (sign === 1) {
          MessageBox(message, '提示', {
            confirmButtonText: '确定',
            closeOnClickModal: false,
            closeOnPressEscape: false,
            showClose: false
          })
            .then(() => {
              sign = 0
              removeToken()
              window.sessionStorage.clear()
              store.commit('SET_TOKEN', '')
              nextTick(() => {
                router.push('/login')
              })
            })
            .catch(() => {
              sign = 0
              removeToken()
              window.sessionStorage.clear()
              nextTick(() => {
                router.push('/login')
              })
            })
        }
      } else {
        //如果页面加载中，参数加密方式改变处理
        if (res.code == 100507) {
          sign_0 += 1
          if (sign_0 === 1) {
            MessageBox(message, '提示', {
              confirmButtonText: '确定'
            })
            store
              .dispatch('getIsCryptData')
              .then(res => {
                const { success } = res
                if (success) {
                  sign_0 = 0
                  removeToken()
                  window.sessionStorage.clear()
                  nextTick(() => {
                    router.push('/login')
                  })
                }
              })
              .catch(error => {
                Message.error(error || '请求出错！')
              })
          }
        } else {
          MessageBox(message, '提示', {
            confirmButtonText: '确定'
          })
        }
      }
    }
    return res
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
