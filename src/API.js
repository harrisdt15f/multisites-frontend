import qs from 'qs';
import axios from 'axios';
import router from 'vue-router'
axios.defaults.baseURL = 'http://api.lottery.me/api/v1/';
axios.defaults.timeout = 1000 * 60 * 3;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.get['Content-Type'] = 'application/json';

export const API = {
    CreateHttpClient: function () {

        let token = localStorage.getItem('X-Authorization-Token');
        let axiosInstance = axios.create({
            headers: {
                'Authorization': "Bearer" + token
            },

            paramsSerializer: (params) => {
                return qs.stringify(params, {
                    arrayFormat: 'brackets'
                });
            }
        });

        axiosInstance.interceptors.response.use(
            (response) => {
                if (response.data.isSuccess) {
                    return response.data.data;
                } else {
                    alert(response.data.msg);
                    return [];
                }
            },
            (error) => {
            console.log(error);
            if (error.response && error.response.status === 401 ||
                error.response.status === 402 ||
                error.response.status === 403 ||
                error.response.status === 422) {
                this.RemoveCurrentUser();
                router.push('login');
                return Promise.reject(error);

            } else {
                return Promise.reject(error);
            }
        });

        return axiosInstance;
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

    SetCurrentUser: function (auth_token, user) {
        localStorage.setItem('X-Authorization-Token', auth_token);
        localStorage.setItem('current-user', qs.stringify(user));
    },

    RemoveCurrentUser: function () {
        localStorage.removeItem('X-Authorization-Token');
        localStorage.removeItem('current-user');
    },


    Login: function (username, password) {
        let loginData = {
            username: username,
            password: password,
        };
        return this.CreateHttpClient().post("login", loginData).then(response => response);
    },

    /**  ============================== 游戏接口 =============================== **/

    // 获取所有彩种
    getAllLotteries: function () {
        return this.CreateHttpClient().get("lotteryList", {}).then(response => response);
    },

    // 获取彩种详情
    getLotteryInfo: function (lotterySign) {
        return this.CreateHttpClient().post("lotteryInfo", {'lottery_sign':lotterySign}).then(response => response);
    },

    // 获取奖期信息
    getIssueInfo: function (lotterySign) {
        return this.CreateHttpClient().post("issueHistory", {'lottery_sign':lotterySign}).then(response => response);
    },

    // 获取奖期历史
    getIssueHistory:function (lotterySign, count = 10) {
        return this.CreateHttpClient().post("issueHistory", {'lottery_sign':lotterySign, 'count': count}).then(response => response);
    }
}