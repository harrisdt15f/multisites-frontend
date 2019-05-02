<template>
  <section>
    <section class="header-top">
      <section class="w13">
        <section class="logo-bg">
          <span class="logo"></span>
        </section>
        <section class="head-notice">
          <i class="fa fa-volume-up ft21 head-notice-img"></i>
          <section id="head-meque">
            <p id="head-meque_text">中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！</p>
          </section>
        </section>
        <ul class="ft0 fr head-users">
          <li class="head-user head-user-name wzfw">
            <img src="../assets/images/header/vip5.png" alt="vip" title="vip" class="head-vip">
            {{account.username}}
            <span class="line">|</span>
          </li>
          <li class="head-user" style="cursor: default">
            余额: {{Utils.toFixed(this.account.balance)}}
            <i class="fa fa-refresh cur" @click="refresh()"></i>
          </li>
          <li class="head-user">充值</li>
          <li class="head-user">退款</li>
          <li class="head-user">会员中心</li>
          <li class="head-user">额度转换</li>
          <li class="head-user" @click="logout()">退出</li>
          <li class="head-user head-user-server">联系客服</li>
        </ul>
      </section>
    </section>
    <section class="header-bottom">
      <section class="w13">
        <nav class="fr">
          <section class="nav" :class="{on: $route.path === '/home'}">
            <router-link tag="a" to="/home" href="javascript:;"  class="nav-title">首页</router-link>
          </section>
          <section class="nav">
            <a href="javascript:;" class="nav-title">彩票游戏</a>
            <section class="tc nav-menu-box">
              <ul class="nav-menus" v-for="(lottery, index) in lotteryLists" :key="index">
                <li class="nav-menu-icon" :class="menusName(lottery.sign)"></li>
                <li class="nav-menu-title">{{lottery.name}}</li>
                <li class="nav-menu cur"
                    v-for="(item, itemIndex) in lottery.list"
                    :key="itemIndex"
                    @click="goLottery(item)"
                >
                  {{item.name}}
                </li>
              </ul>
            </section>
          </section>
          <section class="nav">
            <a href="javascript:;" class="nav-title">体育竞技</a>
          </section>
          <section class="nav">
            <a href="javascript:;" class="nav-title">电子娱乐</a>
          </section>
          <section class="nav">
            <a href="javascript:;" class="nav-title">投注记录</a>
          </section>
          <section class="nav">
            <a href="javascript:;" class="nav-title">资金管理</a>
          </section>
          <section class="nav">
            <a href="javascript:;" class="nav-title">代理中心</a>
          </section>
        </nav>
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
    let account = this.Utils.storage.get('current-user')
    if (account && account.data) {
      this.$store.commit('account', account.data)
    }
    this.$store.dispatch('lotteryAll')
    this.lotteryList()
  },
  mounted () {
    let navMenus = document.getElementsByClassName('nav-menu-box')
    for (let i = 0; i < navMenus.length; i++) {
      this.Animation.screenWidth(navMenus[i])
    }
    // head 滚动公告
    this.Animation.notice('head-meque', 'head-meque_text', -1)
  },
  methods: {
    // 计算导航图标
    menusName (sign) {
      switch (sign) {
        case 'ssc':
          return 'nav-menu-icon1'
          break
        case 'lotto':
          return 'nav-menu-icon2'
          break
        case 'k3':
          return 'nav-menu-icon3'
          break
        case 'pk10':
          return 'nav-menu-icon5'
          break
        case 'lhc':
          return 'nav-menu-icon4'
          break
      }
    },
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
    // 退出登录
    logout () {
      this.Utils.storage.remove('current-user')
      this.$router.push('/login')
    },
    // 获取 导航 彩票游戏 全部彩种
    lotteryList () {
      this.Api.getLotteryList().then((res) => {
        if (res.isSuccess) {
          // res.data.data.push({
          //   list: [
          //     {
          //       day_issue: 59,
          //       desc: "当天 <span>00</span> 点至 <span>23</span> 点   当日共有 <span>59</span> 期",
          //       id: "pcdd",
          //       max_prize_group: 1990,
          //       max_times: 1000,
          //       max_trace_number: 59,
          //       min_prize_group: 1700,
          //       min_times: 1,
          //       name: "加拿大28",
          //       valid_modes: "1,2,3"
          //     }
          //   ],
          //   name: 'PC蛋蛋',
          //   sign: 'pcdd'
          // })
          this.lotteryLists = res.data.data
        }
      })
    },
  }
}
</script>
<style scoped>
  /*head 头部*/
  .header-top{
    height: 42px;
    background: #c81313;
  }
  .header-top .w13 {
    position:relative;
    padding-left:285px;
    width:1015px;
  }
  .logo-bg{
    position:absolute;
    left:0;
    top:0;
    width:275px;
    height:80px;
    background:url(../assets/images/header/logo-bg.png) no-repeat;
    border-radius: 33px;
  }
  .logo{
    margin:10px auto 0;
  }
  /*头部滚动 公告*/
  .head-notice{
    float:left;
    padding-left: 11px;
    margin-top:3px;
    width: 370px;
    height: 34px;
    line-height: 35px;
    border-radius: 17px;
    background: #980b0b;
    overflow: hidden;
  }
  .head-notice-img{
    float: left;
    margin-top:8px;
    color:#e53d3d;
    font-size:19px;
  }
  #head-meque {
    position: relative;
    left:6px;
    width: 352px;
    height:34px;
    overflow: hidden;
  }
  #head-meque_text {
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    cursor: pointer;
    color:#f1f1f1;
  }
  /*用户信息*/
  .head-vip{
    display:inline-block;
    vertical-align: sub;
  }
  .head-user-name {
    max-width:120px;
  }
  .head-user-server:before{
    content:'';
    float:left;
    margin:11px 3px 0 0;
    width:21px;
    height:18px;
    background:url(../assets/images/hj.png) no-repeat -270px 0;
  }
  .head-user{
    display:inline-block;
    vertical-align:middle;
    padding:0 5px;
    color:#f1f1f1;
    font-size:14px;
    height:42px;
    line-height:42px;
    cursor: pointer;
    animation:all .5s;
  }
  .head-user:hover{
    background:#a60000;
  }
/*  head 底部*/
  .header-bottom{
    height:51px;
    background: #ff5656;
  }
  /*导航 菜单*/
  .nav{
    position:relative;
    float:left;
  }
  .nav-title{
    display:block;
    padding:0 23px;
    height:51px;
    line-height:51px;
    font-size:18px;
    text-align:center;
    color:#fff;
  }
  .nav.on .nav-title,
  .nav-title:hover{
    font-weight:bold;
    background:#a60000;
  }
  .nav-menu-box{
    visibility:hidden;
    position:absolute;
    padding:25px 0 22px;
    top:51px;
    z-index:99;
    background:rgba(0,0,0, .7);
    font-size:0;
  }
  .nav:hover .nav-menu-box{
    visibility: visible;
  }
  .nav-menus{
    display:inline-block;
    vertical-align:top;
  }
  .nav-menu,
  .nav-menu-title{
    padding-left:6px;
    width:129px;
    color:#f1f1f1;
    font-size:14px;
    text-align:left;
    line-height:33px;
  }
  .nav-menu:hover{
    background:#c81313;
  }
  .nav-menu-icon{
    margin:5px 0 7px 7px;
    background:url(../assets/images/hj.png) no-repeat -578px 0;
  }
  .nav-menu-icon1{
    width:23px;
    height:26px;
  }
  .nav-menu-icon2{
    width:29px;
    height:20px;
    background-position:-396px 0;
  }
  .nav-menu-icon3{
    width:26px;
    height:27px;
    background-position:-306px 0;
  }
  .nav-menu-icon4{
    width:26px;
    height:26px;
    background-position:-446px 0;
  }
  .nav-menu-icon5{
    width:25px;
    height:27px;
    background-position:-353px 0;
  }
  .nav-menu-title{
    padding-bottom:14px;
    font-weight:bold;
    font-size:18px;
  }
</style>
