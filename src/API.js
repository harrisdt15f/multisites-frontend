import qs from 'qs'
import axios from 'axios'
import router from 'vue-router'
import { MessageBox } from 'element-ui'
// import Utils  from './lib/utils/utils'
axios.defaults.baseURL = 'http://api.lottery.me/api/v1/'
//axios.defaults.baseURL = 'https://api.cc9950.info/api/v1/'

axios.defaults.timeout = 1000 * 60 * 3
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.defaults.headers.get['Content-Type'] = 'application/json'

axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('X-Authorization-Token')
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    },
    error => {
    return Promise.reject(error)
    })
axios.interceptors.response.use(
    (response) => {
        if (response.data && response.data.isSuccess) {
            return response.data
        } else if (response.data && response.data.msg)  {
            let msg = response.data.msg
            MessageBox(msg, '提示', {
                confirmButtonText: '确定'
            })
            return []
        }
    }, (error) => {
        if (error.response &&
            error.response.status &&
            error.response.status === 401 ||
            error.response.status === 402 ||
            error.response.status === 403 ||
            error.response.status === 422) {
            this.RemoveCurrentUser()
            router.push('login')
            return Promise.reject(error)
        } else {
            return Promise.reject(error)
        }
    })
export const API = {
    url: {
        // 登录
        login: 'login',
        // 获取所有彩种
        lotteryList: 'lotteryList',
        // 获取彩种详情
        lotteryInfo: 'lotteryInfo',
        // 获取奖期信息
        issueHistory: 'issueHistory',
        // 投注
        bet: 'bet',
        // 获取投注历史
        betHistory: 'projectHistory',
        // 可用奖期
        issueInfo: 'issueInfo',
        // 获取用户余额
        balance: 'balance',
        // 获取公告列表  彩种右侧公告 和 彩种滚动公告
        noticeList: 'noticeList'
    },
    IsSignedIn: function(){
        let o = this.GetCurrentUser();
        if(o && o.id > 0){
            return true;
        }
        return false;
    },
    GetCurrentUser: function () {
        let currentUser = undefined
        if (localStorage.getItem('current-user')) {
            currentUser = qs.parse(localStorage.getItem('current-user'));
        }
        return currentUser;
    },
    RemoveCurrentUser: function () {
        localStorage.removeItem('X-Authorization-Token');
        localStorage.removeItem('current-user');
    },
    get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url).then((res) => {
                resolve(res);
            }). catch((error) => {
                reject(error)
            })
        })
    },
    post(url, json) {
        return new Promise((resolve, reject) => {
            axios.post(url, json).then((res) => {
                resolve(res)
            }). catch((error) => {
                reject(error)
            })
        })
    },
    /**  ============================== 接口 =============================== **/

    // 登录
    login(username, password) {
        let data = {
            username: username,
            password: password,
        };
        return this.post(this.url.login, data).then(response =>  response);
    },
    // 获取所有彩种
    getLotteryList () {
        return this.get(this.url.lotteryList).then(response => response)
    },
    // 获取奖期历史
    getIssueHistory(lotterySign, count = 10) {
        let data = {
            'lottery_sign':lotterySign,
            'count': count
        }
        return this.post(this.url.issueHistory, data).then(response => response)
    },
    // 获取彩种详情
    getLotteryInfo() {
        // let data ={
        //     'lottery_sign':lotterySign
        // }
        return this.post(this.url.lotteryInfo).then(response => response)
    },
    /*
        * 投注
        *lottery_sign  彩种标识
        *trace_issues @json 追号期号
        *balls @[{}] 投注号码
        *trace_win_stop @ 0 否 1 是 是否中奖追号停止
        *total_cost  投注金额
    */
    bet(lotterySign, issues, balls, total_cost, trace_win_stop = 1) {
        let data = {
            'lottery_sign': lotterySign,
            'trace_issues': issues,
            'balls': balls,
            'trace_win_stop': trace_win_stop,
            'total_cost': total_cost
        }
        return this.post(this.url.bet, data).then(response => response)
    },
    /*
        * 投注历史
   */
    getBetHistory (sign, count = 50) {
        let data = {
            lottery_sign: sign,
            count: count
        }
        return this.post(this.url.betHistory, data).then(response => response)
    },
    /*
     * 可用奖期
    */
    getOpenAward (sign) {
        let data = {
            lottery_sign: sign
        }
        return this.post(this.url.issueInfo, data).then(response => response)
    },
    /*
     * 获取用户余额
    */
    getBalance () {
        return this.post(this.url.balance).then(response => response)
    },
    /*
    * 获取用户余额
   */
    getNoticeList () {
        return this.post(this.url.noticeList).then(response => response)
    }
}
