<template id="header">
  <section>
    <section class="jack-header">
      <section class="w">
        <nav class="header-l">
          <a href="javascript:;" class="header-l-a">手机客户端</a>
          <a href="javascript:;" class="header-l-a">PC客户端</a>
          <a href="javascript:;" class="header-l-a">防劫持教程</a>
        </nav>
        <section class="header-r">
          <a href="javascript:;" class="header-vip  header-vip-1"></a>
          <section class="header-drop down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
            <a href="javascript:;" class="header-drop-a">
              <span class="header-person"></span>
              <span class="header-user">{{account.username}}<em class="header-message">0</em></span>
              <span class="arrow-down"></span>
            </a>
            <section class="nav-drop bar-drop down-menu c333">
              <section class="nav-wrap down-wrap">
                <section class="my-name"><em>您好，</em><em class="header-col">{{account.username}}</em></section>
                <section class="bar-box tc">
                  <a href="javascript:void(0);" class="bar-link tab_menu">
                    <span class="play-pos">平台公告<em class="header-message">0</em></span>
                  </a>
                  <a href="javascript:void(0);" class="bar-link tab_menu"><span class="play-pos">站内信</span></a>
                </section>
                <section class="bar-box tc">
                  <a href="javascript:;" class="bar-link">
                    <img src="../assets/images/home/exit.png" class="dinv"><span class="bar-exit" @click="logout()">退出登录</span>
                  </a>
                </section>
                <section class="login-time tc">
                  <section class="ex-login">上次登录</section>
                  <section class="time">{{account.last_login_time}}</section>
                </section>
              </section>
            </section>
          </section>
          <span class="header-line">|</span>
          <section class="header-drop">
            <span class="wallet">钱包余额：</span>
            <span class="header-money">￥</span>
            <span class="header-money">{{Utils.toFixed(this.account.balance)}}</span>
            <a href="javascript:;" class="refresh" @click="refresh()"></a>
          </section>
          <span class="header-line">|</span>
          <section class="header-drop">
            <a href="javascript:;" class="header-btn">充值</a>
            <a href="javascript:;" class="header-btn">提款</a>
            <a href="javascript:;" class="header-btn">钱包</a>
            <a class="header-server online-server">
              <span class="online-server-logo"></span>
              <span class="online-server-lab">在线客服</span>
            </a>
          </section>
        </section>
      </section>
    </section>
    <section class="jack-nav">
      <section class="jack-nav-bg">
        <section class="w" style="height:84px;">
          <section class="nav-l">
<!--            <img src="../assets/images/home/logo.png" height="60">-->
<!--            <section class="logo-lab">-->
<!--              <a class="platform-name-canvas" href="https://chunqiucp5.com">-->
<!--                <span class="platform-name"></span>-->
<!--              </a><br>-->
<!--              <a class="domain-name-canvas" href="https://0120.com/" target="_blank">-->
<!--                <span class="domain-name"></span>-->
<!--              </a>-->
<!--            </section>-->
          </section>
          <ul class="nav-r">
            <li class="nav-li nav-li-first" >
              <section class="nav-a">
                <section class="nav-text">
                  <section class="text-1">彩票游戏</section>
                </section>
              </section>
              <section class="nav-menu">
                <section class="nav-lottery w">
                  <section class="number-con" v-for="(item, index) in lotteryLists" :key="index">
                    <section class="com-title">{{item.name}}系列</section>
                    <nav class="play-sort">
                      <a class="play-link" @click="goLottery(lottery)" href="javascript:;" v-for="(lottery, index) in item.list" :key="index">
                        {{lottery.name}}
                        <!--                <i class=" play-icon play-hot  "></i>-->
                      </a>
                    </nav>
                  </section>
                </section>
                <section class="nav-line"></section>
              </section>
            </li>
            <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
              <section class="nav-a">
                <section class="text-1">游戏记录</section>
              </section>
              <section class="nav-drop down-menu">
                <section class="nav-wrap down-wrap">
                  <ul class="nav-sort">
                    <li><a href="javascript:;" class="play-link">游戏记录</a></li>
                    <li><a href="javascript:;" class="play-link">追号记录</a></li>
                  </ul>
                </section>
              </section>
            </li>
            <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
              <section class="nav-a">
                <section class="text-1">资金管理</section>
              </section>
              <section class="nav-drop down-menu dn" >
                <section class="nav-wrap down-wrap">
                  <ul class="nav-sort">
                    <li><a href="javascript:;" class="play-link">充值记录</a></li>
                    <li><a href="javascript:;" class="play-link">充值</a></li>
                    <li><a href="javascript:;" class="play-link">提现记录</a></li>
                    <li><a href="javascript:;" class="play-link">提款</a></li>
                    <li><a href="javascript:;" class="play-link">账变记录</a></li>
                  </ul>
                </section>
              </section>
            </li>
            <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
              <section class="nav-a">
                <section class="text-1">账户管理</section>
              </section>
              <section class="nav-drop down-menu dn" >
                <section class="nav-wrap down-wrap">
                  <ul class="nav-sort">
                    <li><a href="javascript:;" class="play-link">银行卡管理</a></li>
                    <li><a href="javascript:;" class="play-link">密码管理</a></li>
                    <li><a href="javascript:;" class="play-link">奖金组详情</a></li>
                  </ul>
                </section>
              </section>
            </li>
            <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
              <section class="nav-a">
                <section class="text-1">代理中心</section>
              </section>
              <section class="nav-drop down-menu dn">
                <section class="nav-wrap down-wrap">
                  <ul class="nav-sort">
                    <li><a href="javascript:;" class="play-link">团队管理</a></li>
                    <li><a href="javascript:;" class="play-link">团队盈亏</a></li>
                    <li><a href="javascript:;" class="play-link">下级开户</a></li>
                    <li><a href="javascript:;" class="play-link">代理消息<span class="unread-msg-num">0</span></a></li>
                  </ul>
                </section>
              </section>
            </li>
            <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
              <section class="nav-a">
                <section class="text-1">幸运棋牌</section>
              </section>
              <section class="nav-drop nav-drop-last down-menu dn">
                <section class="nav-wrap down-wrap">
                  <ul class="nav-sort">
                    <li><a href="javascript:;" class="play-link" target="_blank">进入游戏</a></li>
                    <li><a href="javascript:;" class="play-link">游戏记录</a></li>
                  </ul>
                </section>
              </section>
            </li>
            <li class="nav-li down-drop" @mouseenter="translateEnter($event)" @mouseleave="translateLeave($event)">
              <section class="nav-a">
                <section class="text-1">刮刮乐</section>
              </section>
              <section class="nav-drop nav-drop-last down-menu dn">
                <section class="nav-wrap down-wrap">
                  <ul class="nav-sort">
                    <li><a href="javascript:;" class="play-link" target="_blank">进入游戏</a></li>
                    <li><a href="javascript:;" class="play-link">刮刮乐转账</a></li>
                  </ul>
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
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      lotteryLists: []
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
    let navMenu = document.getElementsByClassName('nav-menu')[0]
    this.Animation.screenWidth(navMenu)
  },
  methods: {
    // 刷新用户余额
    refresh () {
      this.Api.getBalance().then((res) => {
        if (res.isSuccess) {
          let account = this.Utils.storage.get('current-user');
          if (account && account.data) {
            account.data.balance = res.data.balance
            account.data.frozen = res.data.frozen
            this.$store.commit('account', account.data)
            this.Utils.storage.set('current-user', account.data)
          }
        }
      })
    },
    goLottery (item) {
      this.$router.push('/bet/'+ item.id)
      this.$store.commit('currentLottery', this.lotteryAll[item.id].lottery)
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
    translateEnter (e) {
      // 导航用鼠标 移入 动画
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
    translateLeave () {
      // 导航鼠标 移出 动画
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
