<template>
  <section>
    <section class="jack-header">
      <section class="w">
        <nav class="header-l">
          <a href="javascript:;" class="header-l-a">手机客户端</a>
          <a href="javascript:;" class="header-l-a">PC客户端</a>
          <a href="javascript:;" class="header-l-a">防劫持教程</a>
        </nav>
        <section class="header-r">
          <span class="header-vip"></span>
          <section class="header-drop down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
            <a href="javascript:;" class="header-drop-a">
              <i class="fa fa-user ft18"></i>
              <span class="header-user">{{account.username}}<em class="header-message">0</em></span>
              <i class="fa fa-angle-down arrow-down ft20"></i>
            </a>
            <section class="nav-drop bar-drop down-menu c333">
              <section class="nav-wrap down-wrap">
                <section class="my-name">您好，<em class="header-col">{{account.username}}</em></section>
                <section class="bar-box tc">
                  <a href="javascript:void(0);" class="bar-link">
                    平台公告<em class="header-message">0</em>
                  </a>
                  <a href="javascript:void(0);" class="bar-link">站内信<em class="header-message">0</em></a>
                </section>
                <section class="bar-box tc">
                  <i class="fa fa-sign-out ft16"></i>
                  <span class="cur bar-exit" @click="logout()">退出登录</span>
                </section>
                <section class="login-time tc">
                  上次登录<br>{{account.last_login_time}}
                </section>
              </section>
            </section>
          </section>
          <span class="header-line">|</span>
          <section class="header-drop header-money">
            <span class="wallet">钱包余额：</span>
            ￥{{Utils.toFixed(this.account.balance)}}
            <i class="fa fa-rotate-left ft14 cur refresh" @click="refresh()"></i>
          </section>
          <span class="header-line">|</span>
          <section class="header-drop">
            <a href="javascript:;" class="header-btn">充值</a>
            <a href="javascript:;" class="header-btn">提款</a>
            <a href="javascript:;" class="header-btn">钱包</a>
            <span class="header-server cur">在线客服</span>
          </section>
        </section>
      </section>
    </section>
    <section class="jack-nav">
      <section class="w" style="height:84px;">
        <section class="nav-l">
        </section>
        <ul class="nav-r">
          <li class="nav-li nav-li-first"  @mouseenter="lotteryEnter()" @mouseleave="lotteryLeave()">
            <section class="nav-a">
              彩票游戏
            </section>
            <section class="nav-menu">
              <section class="nav-lottery w">
                <section class="number-con" v-for="(item, index) in lotteryLists" :key="index">
                  <section class="com-title">{{item.name}}系列</section>
                  <nav class="play-sort">
                    <a class="play-link" @click="goLottery(lottery)" href="javascript:;" v-for="(lottery, index) in item.list" :key="index">
                      {{lottery.name}}
<!--                      <i class=" play-icon play-hot  "></i>-->
                    </a>
                  </nav>
                </section>
              </section>
            </section>
          </li>
          <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
            <section class="nav-a">游戏记录</section>
            <section class="nav-drop down-menu">
              <section class="nav-wrap down-wrap">
                <nav class="nav-sort">
                  <a href="javascript:;" class="play-link">游戏记录</a>
                  <a href="javascript:;" class="play-link">追号记录</a>
                </nav>
              </section>
            </section>
          </li>
          <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
            <section class="nav-a">资金管理</section>
            <section class="nav-drop down-menu dn" >
              <section class="nav-wrap down-wrap">
                <nav class="nav-sort">
                  <a href="javascript:;" class="play-link">充值记录</a>
                  <a href="javascript:;" class="play-link">充值</a>
                  <a href="javascript:;" class="play-link">提现记录</a>
                  <a href="javascript:;" class="play-link">提款</a>
                  <a href="javascript:;" class="play-link">账变记录</a>
                </nav>
              </section>
            </section>
          </li>
          <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
            <section class="nav-a">账户管理</section>
            <section class="nav-drop down-menu dn" >
              <section class="nav-wrap down-wrap">
                <nav class="nav-sort">
                  <a href="javascript:;" class="play-link">银行卡管理</a>
                  <a href="javascript:;" class="play-link">密码管理</a>
                  <a href="javascript:;" class="play-link">奖金组详情</a>
                </nav>
              </section>
            </section>
          </li>
          <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
            <section class="nav-a">代理中心</section>
            <section class="nav-drop down-menu dn">
              <section class="nav-wrap down-wrap">
                <nav class="nav-sort">
                  <a href="javascript:;" class="play-link">团队管理</a>
                  <a href="javascript:;" class="play-link">盈亏管理</a>
                  <a href="javascript:;" class="play-link">下级开户</a>
                  <a href="javascript:;" class="play-link">代理消息<span class="unread-msg-num">0</span></a>
                </nav>
              </section>
            </section>
          </li>
          <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
            <section class="nav-a">幸运棋牌</section>
            <section class="nav-drop nav-drop-last down-menu dn">
              <section class="nav-wrap down-wrap">
                <nav class="nav-sort">
                  <a href="javascript:;" class="play-link" target="_blank">进入游戏</a>
                  <a href="javascript:;" class="play-link">游戏记录</a>
                </nav>
              </section>
            </section>
          </li>
          <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
            <section class="nav-a">刮刮乐</section>
            <section class="nav-drop nav-drop-last down-menu dn">
              <section class="nav-wrap down-wrap">
                <nav class="nav-sort">
                  <a href="javascript:;" class="play-link">进入游戏</a>
                  <a href="javascript:;" class="play-link">刮刮乐转账</a>
                </nav>
              </section>
            </section>
          </li>
          <li class="nav-active">
            <a href="javascript:;" class="nav-monery">
            </a>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      lotteryLists: [],
      issueDesc: ''
    }
  },
  computed: {
    ...mapState([
      'currentLottery',
      'lotteryAll',
      'account'
    ])
  },
  watch: {
  },
  created () {
    // 获取用户登录后的信息
    let account = this.Utils.storage.get('current-user')
    if (account && account.data) {
      this.$store.commit('account', account.data)
    }
    this.$store.dispatch('lotteryAll')
    this.lotteryList()
  },
  mounted () {
    // 彩票游戏列表全屏宽
    let frist = document.getElementsByClassName('nav-li-first')[0]
    let navMenu = frist.getElementsByClassName('nav-menu')[0]
    navMenu.style.width =  document.body.clientWidth + 'px'
    navMenu.style.left = -frist.getBoundingClientRect().left + 'px'
  },
  methods: {
    // 刷新用户余额
    refresh () {
      this.Api.getBalance().then((res) => {
        if (res.isSuccess) {
          let account = this.Utils.storage.get('current-user')
          if (account && account.data) {
            account.data.balance = res.data.balance
            account.data.frozen = res.data.frozen
            this.$store.commit('account', account.data)
            this.Utils.storage.set('current-user', account.data)
          }
        }
      })
    },
    // 去投注页
    goLottery (lottery) {
      this.$router.push('/bet/'+ lottery.id)
      this.$store.commit('issueDesc', lottery.desc)
      this.$store.commit('currentLottery', this.lotteryAll[lottery.id].lottery)
    },
    logout () {
      // 退出登录
      this.Utils.storage.remove('current-user')
      this.$router.push('/login')
    },
    lotteryList () {
      // 获取 导航 彩票游戏 全部彩种
      this.Api.getLotteryList().then((res) => {
        if (res.isSuccess) {
          this.lotteryLists = res.data.data
        }
      })
    },
    // 彩票游戏 进入动画
    lotteryEnter () {
      let navMenu = document.getElementsByClassName('nav-menu')[0]
      navMenu.style.display = 'block'
      setTimeout(() => {
        this.Animation.move(navMenu, {height: 120, opacity: 100}, 1)
      }, 30)
    },
    // 彩票游戏 离开动画
    lotteryLeave () {
      let navMenu = document.getElementsByClassName('nav-menu')[0]
      this.Animation.move(navMenu, {height: 0, opacity: 0}, 1)
      setTimeout(() => {
        navMenu.style.display = 'none'
      }, 200)
    },
    // 导航用鼠标 移入 动画
    translateEnter (e) {
      let [ target = e.target.children ] = []
      for (let i = 0; i < target.length; i++) {
        for (let j = 0; j < target[i].children.length; j++) {
          if (target[i].children[j].className.indexOf('arrow-down') > -1 && target[i].children[j].className.indexOf('on-transform') === -1) {
            target[i].children[j].className = target[i].children[j].className + ' on-transform'
          }
        }
        if(target[i].className.indexOf('nav-drop') > -1 && target[i].className.indexOf('on-transform') === -1) {
          target[i].style.display = 'block'
          setTimeout(() => {
            target[i].className = target[i].className + ' on-transform'
          }, 200)
        }
      }
    },
    // 导航鼠标 移出 动画
    translateLeave () {
      let [
        headerR = document.getElementsByClassName('header-r')[0],
        arrowDown = headerR.getElementsByClassName('arrow-down')[0],
        navDrop = document.getElementsByClassName('nav-drop')
      ] = []
      if (arrowDown.className.indexOf('on-transform') > -1) {
        arrowDown.className = arrowDown.className.substr(0, arrowDown.className.indexOf(' on-transform'))
      }
      for (let i = 0; i < navDrop.length; i++) {
        navDrop[i].style.display = 'none'
        if (navDrop[i].className.indexOf('on-transform') > -1) {
          navDrop[i].className = navDrop[i].className.substr(0, navDrop[i].className.indexOf(' on-transform'))
        }
      }
    }
  }
}
</script>
<style scoped>
  .jack-header {
    position: relative;
    z-index: 101;
    color: #fff;
    background: #181E29;
    line-height: 40px;
  }
  .jack-header .header-l {
    font-size: 12px;
    float: left;
  }
  .jack-header .header-l .header-l-a {
    color: #fff;
    margin-right: 14px;
  }
  .jack-header .header-r {
    float: right;
  }
  .header-vip {
    width: 48px;
    height:16px;
    background: url(../assets/images/home/1.png) no-repeat;
    background-size:100%;
  }
  .header-r .header-drop {
    height: 43px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    padding: 0 8px;
  }
  .header-r .header-drop-a {
    height: 43px;
    font-size: 14px;
    color: #fff;
  }
  .header-money{
    font-size: 18px;
    color: #FFF;
    font-weight: 400;
  }
  .header-r .header-user {
    position: relative;
    margin-left: 2px;
  }
  .header-message {
    position: absolute;
    right: -14px;
    top: 2px;
    min-width: 14px;
    height: 14px;
    line-height: 14px;
    overflow: hidden;
    background: #C02828;
    color: #fff;
    border-radius: 8px;
    text-align: center;
    font-size: 11px;
    display: inline-block;
    padding: 0 3px;
  }
  .jack-header .header-r .header-drop .arrow-down {
    margin-left: 6px;
    position: relative;
    top: 3px;
    color:#dcb976;
    -webkit-transition: all 0.3s 0.15s;
    -moz-transition: all 0.3s 0.15s;
    -ms-transition: all 0.3s 0.15s;
    -o-transition: all 0.3s 0.15s;
    transition: all 0.3s 0.15s;
  }
  .bar-drop {
    position: absolute;
    line-height: 1.5;
    font-size: 12px;
    width: 170px;
    padding-top: 0;
    left: 0;
    opacity: 0;
    transition: all .3s;
    top:27px;
    -webkit-transform: translateY(15px);
    -moz-transform: translateY(15px);
    -ms-transform: translateY(15px);
    -o-transform: translateY(15px);
    transform: translateY(15px);
  }
  .bar-drop .nav-wrap {
    text-align: center;
    padding-top: 15px;
  }
  .nav-drop{
    display:none;
  }
  .nav-drop .nav-wrap {
    position: relative;
    border: 1px solid #e45b5d;
    background: #FFF;
    text-align: left;
    top: 15px;
  }
  .bar-drop .my-name {
    text-align: left;
    margin-bottom: 15px;
    font-size: 13px;
    padding: 0 20px;
    color: #454545;
  }
  .bar-drop .header-col {
    color: #e45b5d;
    font-size: 14px;
  }
  .bar-drop .bar-box {
    margin-bottom: 8px;
  }
  .bar-box .bar-link {
    position:relative;
    font-size: 14px;
    line-height: 30px;
  }
  .bar-box .bar-link:nth-of-type(1){
    margin-right:15px;
  }
  .bar-drop .bar-link .header-message {
    right: -15px;
    top: -5px;
  }
  .jack-header .header-r .header-line {
    color: #404040;
    font-size: 18px;
    font-weight: 200;
  }
  .jack-header .header-r .wallet {
    font-size: 14px;
  }
  .jack-header .header-r .header-money {
    font-size: 18px;
    color: #FFF;
    font-weight: 400;
  }
  .jack-header .header-r .header-money {
    font-size: 18px;
    color: #FFF;
    font-weight: 400;
  }
  .jack-header .header-r .refresh {
    margin-left: 6px;
  }
  .jack-header .header-r .header-btn {
    background: #505050;
    line-height: 18px;
    padding: 4px 10px;
    border-radius: 2px;
    color: #FFF;
    margin: 0 1px;
    font-size: 12px;
    position: relative;
    top: -1px;
  }
  
  .header-server{
    height: 27px;
    line-height: 27px;
    text-align: center;
    color: #FFF;
    font-size: 12px;
  }
  .header-server:before{
    content:'';
    width: 28px;
    height: 27px;
    float: left;
    margin: 0 5px 0 8px;
    background: url(../assets/images/hj.png) no-repeat 0 0;
  }
  .jack-header .header-r .header-btn:hover {
    background: #ff5656;
  }
  .header-server:hover {
    color: #ff5656;
  }
  .jack-header .header-l .header-l-a:hover {
    color: #ccc;
  }
  .bar-drop a.bar-link:hover {
    color: #e45b5d;
  }
  .bar-drop .login-time {
    padding:10px 0;
    color: #757575;
    border-top: 1px solid #e45b5d;
  }
  .nav-drop .nav-wrap:before, .nav-drop .nav-wrap:after {
    content: '';
    display: block;
    position: absolute;
    left: 51px;
    border: 6px solid transparent;
  }
  .bar-drop .nav-wrap:before,
  .bar-drop .nav-wrap:after {
    left: 36%;
  }
  .nav-drop .nav-wrap:before {
    top: -12px;
    border-bottom: 6px solid #e45b5d;
  }
  .jack-header span, .jack-header a, .jack-header img, .jack-nav span, .jack-nav a, .jack-nav img, .jack-foot span, .jack-foot a, .jack-foot img {
    display: inline-block;
    vertical-align: middle;
  }
  .jack-nav {
    background: #FFF;
    position: relative;
    border-bottom: 2px solid #ff5656;
    z-index: 100;
    box-shadow: 0 3px 10px rgba(68, 68, 68, 0.38);
  }
  .jack-nav .nav-l {
    float: left;
    padding-top: 10px;
  }
  .jack-nav .nav-r {
    width:calc(100% - 270px);
    float: right;
    font-size: 17px;
  }
  .jack-nav .nav-r .nav-li {
    position: relative;
    float: left;
    text-align: center;
    cursor:pointer;
  }
  .jack-nav .nav-r .nav-li {
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    height: 86px;
  }
  .jack-nav .nav-r .nav-li:first-child .nav-a {
    width: 150px;
  }
  .jack-nav .nav-r .nav-center .text-1 {
    font-size: 17px;
  }
  .jack-nav .nav-r .nav-a {
    height: 83px;
    line-height: 83px;
    width: 110px;
    color: #454545;
  }
  .down-menu .down-wrap {
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  .jack-nav .nav-r .nav-active {
    float: right;
    padding-top: 20px;
  }
  .jack-nav .nav-r .nav-active .nav-monery {
    display: inline-block;
    width: 110px;
    height: 36px;
    background: url(../assets/images/home/monerybtn.png) center no-repeat;
    background-size: contain;
  }
  .nav-menu {
    position: absolute;
    top: 86px;
    left: 0;
    width: 100%;
    height:0;
    background: #FFF;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    opacity: 0;
    padding: 25px 0;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(68, 68, 68, 0.38);
    border-bottom: 2px solid #FF5656;
    display:none;
  }
  .number-con {
    float: left;
    padding-left: 30px;
  }
  .number-con .com-title {
    font-size: 16px;
    color: #FF5656;
    padding-left: 10px;
  }
  .play-sort li {
    display: inline-block;
  }
  .nav-lottery .number-con .play-sort li {
    width: 104px;
    float: left;
  }
  .nav-lottery .number-con:first-child .play-sort li {
    width: 116px;
  }
  .play-sort {
    text-align:left;
  }
  .play-sort .play-link{
    position: relative;
    line-height: 25px;
    font-size: 13px;
    width: 100px;
    padding-left: 10px;
  }
  .nav-sort .play-link{
    width:76px;
    display:inline-block;
    vertical-align:middle;
    margin-bottom:7px;
  }
  .nav-menu .play-link {
    padding: 0 5px;
    border-radius: 8px;
  }
  .number-con {
    float: left;
    padding-left: 30px;
  }
  .nav-lottery .number-con {
    padding-left: 10px;
  }
  .nav-lottery .number-con:first-child {
    width: 220px;
  }
  .nav-lottery .number-con:nth-child(2) {
    width: 220px;
  }
  .nav-lottery .number-con:nth-child(3) {
    width: 220px;
  }
  .nav-lottery .number-con:nth-child(4) {
    width: 100px;
  }
  .nav-lottery .number-con:nth-child(5) {
    width: 120px;
  }
  .nav-lottery .number-con:nth-child(6) {
    width: 100px;
  }
  .nav-lottery .number-con:last-child .play-sort {
    border-right: none;
  }
  .nav-sort .play-link:hover {
    background: #ff5656;
    color:#fff;
  }
  .nav-sort {
    font-size: 0;
    padding: 15px 15px 8px 15px;
  }
  .play-sort .play-link,
  .nav-sort .play-link {
    position: relative;
    line-height: 25px;
    font-size: 13px;
    text-align:center;
  }
  .play-link {
    padding: 0 10px;
    border-radius: 8px;
  }
  .nav-drop.on-transform,
  .nav-li .nav-drop.on-transform{
    opacity: 1;
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }
  .arrow-down.on-transform{
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .nav-li .nav-drop{
    width:225px;
    position: absolute;
    left: 0;
    opacity: 0;
    transition: all .3s;
    top:75px;
    -webkit-transform: translateY(30px);
    -moz-transform: translateY(30px);
    -ms-transform: translateY(30px);
    -o-transform: translateY(30px);
    transform: translateY(30px);
  }
  .jack-nav .nav-r .nav-li:hover,
  .play-sort .play-link:hover{
    background:#FF5656;
  }
  .jack-nav .nav-r .nav-li:hover .nav-a,
  .play-sort .play-link:hover{
    color:#fff;
  }
  .unread-msg-num {
    position: absolute;
    display: inline-block;
    height: 16px;
    min-width: 16px;
    line-height: 16px;
    border-radius: 3px;
    background-color: #FF5656;
    color: #FFF;
  }
  .jack-header .bar-exit{
    vertical-align:text-bottom;
  }
</style>
