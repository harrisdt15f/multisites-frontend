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
    let account = this.Utils.storage.get('current-user');
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
          this.lotteryLists = res.data
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
@import '../assets/css/header.css';
</style>
