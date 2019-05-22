<template>
  <div class="header-wrapper">
    <header class="container">
      <h1 class="logo">
        <!-- <img :src="logoSrc" alt="logo"> -->
        LOGO
      </h1>
      <div class="top">
        <section class="head-notice">
          <i class="fa fa-volume-up ft21 head-notice-img"></i>
          <section class="head-meque">
            <section
              class="resultMarquee"
              id="head-meque">
              <p id="head-meque_text">
                 中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！
              </p>
            </section>
          </section>
        </section>
        <ul class="head-users fr ft0">
          <li class="head-user head-user-name wzfw">
            <img src="../assets/images/header/vip5.png" alt="vip" title="vip" class="head-vip">
            {{userDetail.username}}
          </li>
          <span class="line">|</span>
          <li class="head-user" style="cursor: default">
            余额:
            {{Utils.toFixed(this.userDetail.balance)}}
            <!--               <i class="fa fa-refresh cur" @click="refresh()"></i>-->
          </li>
          <li class="head-user">充值</li>
          <li class="head-user">退款</li>
          <li class="head-user">会员中心</li>
          <li class="head-user">额度转换</li>
          <li class="head-user" ref="logout" @click="logout()">退出</li>
          <li class="head-user head-user-server">
            <img
                    style="display:inline; vertical-align:middle"
                    src="../assets/images/new/header/lxkf.png"
            > 联系客服
          </li>
        </ul>
      </div>
      <div class="bottom">
        <nav class="fr">
          <section class="nav">
            <router-link tag="a" to="/home" href="javascript:;" class="nav-title">首页</router-link>
          </section>
          <section class="nav">
            <router-link tag="a" to="/bet" href="javascript:;" class="nav-title">彩票游戏</router-link>
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
      </div>
    </header>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { removeToken } from "@/utils/auth";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["userDetail", "lotteryLists", "logoSrc"])
  },
  mounted() {
    this.$store.dispatch("lotteryAll");
    this.lotteryList();
    // head 滚动公告
    this.Animation.notice('head-meque', 'head-meque_text', -1)
  },
  methods: {
    // 刷新用户余额
    refresh() {
      this.Api.getBalance().then(res => {
        if (res.success) {
          let account = this.Utils.storage.get("current-user");
          if (account && account.data) {
            account.data.balance = res.data.balance;
            account.data.frozen = res.data.frozen;
            this.$store.commit("account", account.data);
            this.Utils.storage.set("current-user", account.data);
          }
        }
      });
    },
    // 退出登录
    logout() {
      this.Api.logout().then(res => {
        const { success } = res;
        if (success) {
          this.$message({ message: '退出成功！', type: 'success' })
          this.$store.commit("SET_TOKEN", "");
          this.$store.commit("SET_USER_DETAIL", {});
          removeToken();
          window.sessionStorage.clear()
          this.$nextTick(() => {
            this.$router.push("/login")
          })
        }
      });
    },
    // 获取 导航 彩票游戏 全部彩种
    lotteryList() {
      const loading = this.$loading({
        target: this.$refs.lotterListShow,
        text: "拼命加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.Api.getLotteryList().then(res => {
        loading.close();
        if (res.success) {
          this.$store.commit('SET_LOTTERY_LISTS', res.data)
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  height: 97px;
  font-size: 14px;
  background: url("../assets/images/new/header/header_bg.jpg") repeat-x;
  .container {
    width: 1320px;
    margin: 0 auto;
    position: relative;
  }
  .logo {
    position: absolute;
    left: 0;
    top: 0;
    background: url("../assets/images/new/header/logo_bg.png") no-repeat;
    line-height: 83px;
    text-align: center;
    color: #fff;
    width: 273px;
    height: 83px;
  }
  .top {
    overflow: hidden;
    .head-notice {
      margin-left: 300px;
      float: left;
      padding-left: 12px;
      margin-top: 5px;
      width: 380px;
      height: 34px;
      line-height: 35px;
      border-radius: 17px;
      background: #332e2d;
      color: #fff;
      .head-notice-img {
        float: left;
        margin-top: 8px;
        color: #f9bd62;
        font-size: 19px;
      }
      .head-meque {
        margin-left: 25px;
        position: relative;
        overflow: hidden;
        height: 35px;
        .resultMarquee {
          white-space: nowrap;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
    .head-users {
      padding: 0.1px;
      .line {
        color: #e6d2c3;
        font-size: 14px;
        vertical-align: -4px;
      }
      .head-user {
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
        padding: 0 5px;
        color: #e6d2c3;
        height: 44px;
        line-height: 44px;
        cursor: pointer;
        animation: all 0.5s;
      }
      .head-vip {
        display: inline-block;
        vertical-align: middle;
      }
      .head-user-name {
        max-width: 120px;
      }
    }
  }
  .bottom {
    // overflow: hidden;
    position: relative;
    .nav {
      display: inline-block;
      .nav-menu-box {
        min-width: 350px;
        min-height: 200px;
        position: absolute;
        top: 52px;
        left: 572px;
        background: #36302e;
        display: none;
        z-index: 0;
        padding: 15px 28px;
        font-size: 16px;
        /deep/{
          .el-loading-spinner i, .el-loading-spinner .el-loading-text{
            color: #fff;
          }
        }
        .nav-menu-title {
          font-weight: bold;
          margin: 8px 0;
          color: #e6d2c3;
        }
        .nav-menus {
          .nav-menu {
            .span {
              box-sizing: border-box;
              background: #3e3635;
              color: #e6d2c3;
              display: block;
              text-align: center;
              margin-bottom: 8px;
              padding: 8px 5px;
              &:hover {
                background: #ffc164;
                color: #36302e;
              }
              &.router-link-active {
                background: #ffc164;
                color: #36302e;
              }
            }
          }
        }
      }
      &:hover {
        .nav-menu-box {
          display: block;
          z-index: 999;
        }
      }
      .nav-title {
        display: block;
        height: 53px;
        line-height: 53px;
        padding: 0 20px;
        font-size: 18px;
        color: #e6d2c3;
        animation: all 0.5s;
        &:hover {
          background: #44362b;
          box-sizing: border-box;
          border-bottom: 3px solid #ffc164;
        }
        &.router-link-active {
          background: #44362b;
          box-sizing: border-box;
          border-bottom: 3px solid #ffc164;
        }
      }
    }
  }
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
</style>

