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
      <div class="login-form">
        <el-form :inline="true" :model="formInline" class="login-form-inline">
          <el-form-item>
            <el-input
              style="width:185px;"
              suffix-icon="el-icon-user"
              size="small"
              v-model="formInline.user"
              placeholder="账号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              style="width:185px;"
              suffix-icon="el-icon-lock"
              size="small"
              v-model="formInline.user"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small">登录</el-button>
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
      loading: false,
      showSelectLottery: false,
      formInline: {}
    }
  },
  computed: {
    ...mapGetters([
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
  }
  .login-form {
    float: right;
    /deep/ {
      .el-form-item {
        margin-top: 25px;
        margin-bottom: 25px;
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
        border-color: #ff5656;
      }
      .el-input__prefix,
      .el-input__suffix {
        color: #ff5657;
        font-size: 16px;
      }
    }
  }
}
.header-bottom {
  height: 58px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  background: #ff5656;
  line-height: 58px;
}
.select-lottery {
  text-align: left;
  background: #c51313;
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
    background: #d81e06;
  }
}
.sub-select {
  position: absolute;
  z-index: 999;
  top: 58px;
  border: 1px solid #e2e2e2;
  border-top: 0;
  left: 0;
  width: 25%;
}
.select-grou {
  background: #fff;
  width: 100%;
  color: #000;
  font-size: 14px;
  min-height: 414px;
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
    font-size: 12px;
    color: #c51313;
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
      background: #ff5656;
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
    top: 58px;
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
      display: block;
      z-index: 1001;
    }
  }
}
</style>

