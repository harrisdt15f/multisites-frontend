import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import { nextTick } from 'q'

import qs from 'qs'


import router from '@/route'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL + '/web-api', // url = base url + request url
  timeout: 1000 * 60 * 3 // request timeout
})

function randomString(len) {
  len = len || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length
  var pwd = ''
  for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
/* eslint-disable */
//偏移量 由前端每次请求随机生成 16位
var IV = randomString(16)
//AES加密KEY 由前端自己每次请求随机生成
var KEY = randomString(16)
//公钥固定值
var pkcs8_public="-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCt5ugWm2WdqkMI5iDgTmdavYPTp6hmqbopy7N9fNnsNiwEE+toi0XgQjQeuE0Yf7VOIiCI8eWzUaTWfCK3D/dmFTbsTK3Ugql6QuYKRhSn9QnxtEqzvkz5jv3dc3sSav8gK3Ox22DBWUX5LOwY52kBieawlRFckv8vtCOYVPrd+wIDAQAB-----END PUBLIC KEY-----";


/**
 * AES加密数组 传入参数为需要传递的数组JSON
 */
function AES_encrypt(data,KEY,IV,pkcs8_public) {
    var key_utf8 = CryptoJS.enc.Utf8.parse(KEY); // 秘钥
    var iv_utf8= CryptoJS.enc.Utf8.parse(IV); //向量iv
    //AES 加密
    var encrypted = CryptoJS.AES.encrypt(data, key_utf8, { iv: iv_utf8, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7}).toString();
    //RSA 加密 组包
    return pack(encrypted,IV,KEY,pkcs8_public)
}
//RSA加密
function RSA_encrypt(data,PUBLIC_KEY) {
    let encryptor = new JSEncrypt();  // 新建JSEncrypt对象
    encryptor.setPublicKey(PUBLIC_KEY); // 设置公钥
    const rsaDta = encryptor.encrypt(data); // 进行加密
    return rsaDta
}
//组包
function pack(encrypted,iv,key,pub_key) {

    var rsa_iv = RSA_encrypt(iv,pub_key);
    var rsa_key = RSA_encrypt(key,pub_key);

    var splitFlag = 'aesrsastart'


    var res_data = encrypted+splitFlag+rsa_iv+splitFlag+rsa_key
    return res_data
}
var data = {title:100,name:'jeff'}
//数据需要jso
// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    var enstr = AES_encrypt(JSON.stringify(config.data),KEY,IV,pkcs8_public)
    config.data = config.data || config.data === {} ? qs.stringify({data:enstr}) : null
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

let sign = 0
// response interceptor
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
        MessageBox(message, '提示', {
          confirmButtonText: '确定'
        })
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
