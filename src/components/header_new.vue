<template>
  <div class="header-wrapper">
    <div class="header-toptray">
      <div class="container w">
        <div class="toptray-left">您好，欢迎光临包网彩票 官方平台！</div>
        <div class="toptray-right">
          <ul>
            <router-link class="toptray-item" tag="li" to="/account-center">用户中心</router-link>|
            <router-link class="toptray-item" tag="li" to="/account-center/bet-record">投注记录</router-link>|
            <router-link class="toptray-item" tag="li" to="/help-center">帮助中心</router-link>|
            <router-link class="toptray-item" tag="li" to="/account-center">在线客服</router-link>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-content container w">
      <router-link class="logo" tag="h1" to="/home">
        <img class="logo-img" :src="logoSrc" />
      </router-link>
      <div class="header-person" v-if="isLogin">
        <div class="item">欢迎 {{userDetail.username}}</div>
        <span class="header-line-in">|</span>
        <div class="header-wallet">
          <span class="wallet">钱包余额:</span>
          <span class="header-money">￥</span>
          <span class="header-money">
            <span class="header-money">
              {{this.userDetail.balance && Utils.toFixed(this.userDetail.balance)}}
              <i
                class="fa fa-refresh cur"
                :class="{loading: loading}"
                @click="refresh()"
              ></i>
            </span>
          </span>
        </div>
        <div class="header-drop-in">
          <router-link tag="a" to="/account-center/fund-manage/recharge" class="header-btn-in">充值</router-link>
          <span class="header-line-in">|</span>
          <router-link tag="a" to="/account-center/fund-manage/withdrawal" class="header-btn-in">提款</router-link>
          <span class="header-line-in">|</span>
          <router-link tag="a" to="/account-center/fund-manage/transfer" class="header-btn-in">额度转换</router-link>
        </div>
        <a class="bar-link-in">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
          <span class="bar-exit" @click="logout()">退出</span>
        </a>
      </div>
      <div class="login-form" v-else>
        <el-form
          :inline="true"
          :model="user"
          :rules="userRules"
          ref="userForm"
          class="login-form-inline"
        >
          <el-form-item prop="username">
            <el-input
              style="width:185px;"
              suffix-icon="el-icon-user"
              size="small"
              v-model="user.username"
              placeholder="账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              style="width:185px;"
              suffix-icon="el-icon-lock"
              size="small"
              v-model="user.password"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loginLoading"
              @click.native="submitForm('userForm')"
              type="danger"
              size="small"
            >登录</el-button>
            <el-button type="danger" size="small">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="header-bottom">
      <div class="container">
        <el-row>
          <el-col :span="6">
            <div
              class="select-lottery"
              @mouseenter="showSelectLottery = true"
              @mouseleave="showSelectLottery = false"
            >
              <div class="title">
                <span>⑧</span> 选择彩种
              </div>
              <div
                class="sub-select"
                v-show="$route.path.indexOf('/home') != -1 || showSelectLottery"
                v-if="popularLotteries1.length"
              >
                <ul class="select-grou">
                  <router-link
                    tag="li"
                    :to="`/bet/${item.en_name}`"
                    @click.native="showSelectLottery = false"
                    v-for="(item, index) in popularLotteries1"
                    :key="index"
                    class="w"
                  >
                    <img class="select-grou-img" :src="item.pic_path" />
                    <div class="name">{{item.cn_name}}</div>
                    <div class="issue">全天{{item.day_issue}}期</div>
                  </router-link>
                </ul>
                <div class="select-box">
                  <div class="box-l">
                    <span>全部彩种</span>
                  </div>
                  <div class="box-r">
                    <el-row>
                      <el-col
                        class="box-r-item"
                        v-for="(lottery, index) in lotteryLists"
                        :key="index"
                        :span="12"
                      >
                        <router-link
                          tag="div"
                          :to="`/bet/${lottery.list && lottery.list[0].id}`"
                          @click.native="showSelectLottery = false"
                        >
                          <i></i>
                          {{lottery.name}}
                        </router-link>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="3">&nbsp;</el-col>
              <el-col :span="3">
                <router-link class="nav-col" tag="span" to="/home">首页</router-link>
              </el-col>
              <el-col :span="3" class="all-lottery">
                <router-link class="nav-col" tag="span" to="/bet">全部彩种</router-link>
                <div class="nav">
                  <section ref="lotterListShow" class="nav-menu-box">
                    <el-row :gutter="30">
                      <el-col v-for="(lottery, index) in lotteryLists" :key="index" :span="12">
                        <div class="nav-menu-title">{{lottery.name}}</div>
                        <el-row :gutter="4" class="nav-menus">
                          <el-col
                            :span="8"
                            class="nav-menu"
                            v-for="(item, itemIndex) in lottery.list"
                            :key="itemIndex"
                          >
                            <router-link
                              :to="`/bet/${item.id}`"
                              class="span wzfw"
                              tag="a"
                            >{{item.name}}</router-link>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </section>
                </div>
              </el-col>
              <el-col :span="3">
                <router-link class="nav-col" tag="span" to="/chess-all">棋牌游戏</router-link>
              </el-col>
              <el-col :span="3">
                <router-link class="nav-col" tag="span" to="/fish-game">捕鱼游戏</router-link>
              </el-col>
              <el-col :span="3">
                <router-link class="nav-col" tag="span" to="/active">优惠活动</router-link>
              </el-col>
              <el-col :span="3">
                <router-link class="nav-col" tag="span" to="/user-trends">走势图标</router-link>
              </el-col>
              <el-col :span="3">
                <router-link class="nav-col" tag="span" to="/agent-center">代理中心</router-link>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { removeToken } from '@/utils/auth'
export default {
  name: 'Header',
  data() {
    return {
      loginLoading: false,
      loading: false,
      showSelectLottery: false,
      user: { username: '', password: '' },
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度在 3 个以上', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在 6 个以上', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'userDetail',
      'lotteryLists',
      'popularLotteries1',
      'logoSrc'
    ])
  },
  mounted() {
    this.$store.dispatch('lotteryAll')
    this.lotteryList()
    // head 滚动公告
    // this.Animation.notice('head-meque', 'head-meque_text', -1)
  },
  methods: {
    // 刷新用户余额
    refresh() {
      this.loading = true
      this.$store.dispatch('getUserDetail').then(() => {
        this.loading = false
      })
    },
    // 退出登录
    logout() {
      this.$confirm('是否确认退出！', '提示', {
        confirmButtonText: '确定',
        cancelButtonClass: '取消'
      }).then(() => {
        this.Api.logout().then(res => {
          const { success } = res
          if (success) {
            this.$message({ message: '退出成功！', type: 'success' })
            this.$store.commit('SET_TOKEN', '')
            this.$store.commit('SET_USER_DETAIL', {})
            removeToken()
            window.sessionStorage.clear()
            this.$nextTick(() => {
              this.$router.push('/login')
            })
          }
        })
      })
    },
    // 获取 导航 彩票游戏 全部彩种
    lotteryList() {
      const loading = this.$loading({
        target: this.$refs.lotterListShow,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.Api.getLotteryList().then(res => {
        loading.close()
        if (res.success) {
          this.$store.commit('SET_LOTTERY_LISTS', res.data)
        }
      })
    },
    //登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    login() {
      this.loginLoading = true
      this.$store
        .dispatch('login', {
          username: this.user.username,
          password: this.user.password
        })
        .then(() => {
          this.loginLoading = false
          this.$store.dispatch('getUserDetail')
        })
        .catch(() => {
          this.loginLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes myRotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.header-toptray {
  height: 50px;
  line-height: 50px;
  background-color: #e6e6e6;
  font-size: 14px;
  .toptray-left {
    float: left;
  }
  .toptray-right {
    float: right;
    .toptray-item {
      display: inline-block;
      padding: 0 6px;
      cursor: pointer;
    }
  }
}
.header-content {
  .logo-img {
    height: 60px;
    width: auto;
    float: left;
    margin-top: 15px;
  }
  .login-form {
    float: right;
    /deep/ {
      .el-form-item {
        margin-top: 25px;
      }
      .el-input__suffix {
        left: 5px;
        right: auto;
      }
      .el-input--suffix .el-input__inner {
        padding-right: 15px;
        padding-left: 30px;
      }
      .el-input__inner {
        border-color: #e6e6e6;
      }
      .el-input__prefix,
      .el-input__suffix {
        color: #666;
        font-size: 16px;
      }
    }
  }
}
.header-bottom {
  height: 48px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  background: rgb(255, 118, 0);
  line-height: 48px;
}
.select-lottery {
  text-align: left;
  background: rgb(255, 155, 0);
  .title {
    width: 100%;
    padding: 0 15px;
    & > span {
      display: inline;
      background: #fff;
      color: #c51313;
      border-radius: 50%;
      padding: 3px;
      margin-right: 5px;
    }
  }
}
.nav-col {
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
  &:hover,
  &.router-link-active {
    background: rgb(255, 155, 0);
  }
}
.sub-select {
  position: absolute;
  z-index: 999;
  top: 48px;
  border: 1px solid #e2e2e2;
  border-top: 0;
  left: 0;
  width: 24.8%;
}
.select-grou {
  background: #fff;
  width: 100%;
  color: #000;
  font-size: 14px;
  min-height: 459px;
  & > li {
    box-sizing: border-box;
    padding: 5px 15px;
    border-bottom: 1px solid #e2e2e2;
    cursor: pointer;
    &:hover {
      .name {
        color: #d81e06;
      }
    }
  }
  & > li:nth-last-of-type(1) {
    border-bottom: none;
  }
  .select-grou-img {
    display: block;
    float: left;
    width: 45px;
    height: auto;
    margin-top: 5px;
    margin-right: 10px;
  }
  .w {
    width: 100%;
  }
  .name {
    float: left;
  }
  .issue {
    float: right;
    color: #ff7600;
  }
}
.select-box {
  background-color: #f9f9f9;
  font-size: 14px;
  color: #000;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 17px 0 18px;
  .box-l {
    flex: 0 0 80px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    span {
      display: block;
      margin-top: 15px;
      font-size: 16px;
      text-align: center;
      width: 40px;
      background: #ff7600;
      color: #fff;
      padding: 20px 5px;
      box-sizing: border-box;
      line-height: 1.5;
    }
  }
  .box-r {
    flex: 1;
    line-height: 1.5;
    .box-r-item {
      padding: 10px 0;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
      i {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #c51313;
        border-radius: 50%;
      }
    }
  }
}
.all-lottery {
  .nav-menu-box {
    line-height: 1.5;
    min-width: 350px;
    min-height: 200px;
    position: absolute;
    top: 48px;
    left: 225px;
    background: #fff;
    z-index: 0;
    display: none;
    // z-index: 1001;
    padding: 15px;
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    /deep/ {
      .el-loading-spinner i,
      .el-loading-spinner .el-loading-text {
        color: #fff;
      }
    }
    .nav-menu-title {
      text-align: left;
      color: #000;
      margin-bottom: 5px;
    }
    .nav-menus {
      .nav-menu {
        .span {
          box-sizing: border-box;
          background: #f3f3f3;
          color: #9d9d9d;
          display: block;
          text-align: center;
          margin-bottom: 8px;
          font-size: 14px;
          padding: 8px 5px;
          &:hover {
            background: #e9625d;
            color: #fffefe;
          }
          &.router-link-active {
            background: #e9625d;
            color: #fffefe;
          }
        }
      }
    }
  }
  &:hover {
    .nav-menu-box {
      display: block;
      z-index: 1001;
    }
  }
}
.login-form-inline {
  /deep/ .el-button--danger {
    color: #fff;
    background-color: #ff7600;
    border-color: #ff7600;
  }
}
.header-person {
  display: flex;
  float: right;
  width: 600px;
  height: 75px;
  line-height: 75px;
  box-sizing: border-box;
  justify-content: flex-end;
  font-size: 13px;
  padding-right: 5px;
  .item {
    padding-right: 5px;
  }
}

.header-wallet {
  box-sizing: border-box;
  padding: 0 8px 0 5px;
}
.header-btn-in {
  box-sizing: border-box;
  padding: 0px 5px;
  cursor: pointer;
  &:hover {
    color: #ff6c00;
  }
}
.bar-link-in {
  box-sizing: border-box;
  padding: 0px 5px;
  cursor: pointer;
  &:hover {
    color: #ff6c00;
  }
}
.header-money {
  .cur.loading {
    animation: myRotate 1.5s linear infinite;
  }
}
</style>

