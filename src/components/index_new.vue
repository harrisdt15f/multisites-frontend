<template>
  <div class="new-index">
    <div class="w">
      <el-row class="index-top">
        <el-col :span="6">&nbsp;</el-col>
        
        <el-col :span="18">
          <div class="carousel-img" v-if="showBanner">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in banner" :key="item.src">
                <a
                  class="carousel-src"
                  href="javascript:;"
                  @click="goToBannerUrl(item.redirect_url)"
                  :style="`background-image: url(${item.pic_path})`"
                ></a>
              </el-carousel-item>
            </el-carousel>
          </div>
  
          <section class="head-notice">
            <i class="fa fa-volume-up ft21 head-notice-img"></i>
            <section class="head-meque">
              <section class="resultMarquee" id="head-meque">
                <p id="head-meque_text">
                  中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！中大奖了！！！
                </p>
              </section>
            </section>
          </section>
        </el-col>
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="12">
            <div class="hot-box">
              <el-tabs class="hot-box-tab" v-model="activeName">
                <el-tab-pane
                        v-for="(item, index) in lotteriesList"
                        :key="index"
                        :label="item.name"
                        :name="item.id"
                >
                  <div
                          class="hot-box-item"
                  >
                    <div class="title">
                      <div class="fl">
                        {{item.name}} {{item.method_name}}
                        <span style="color:#ff7800;">20190308</span>
                        12.1245截止
                      </div>
                      <div class="fr">
                        <a class="btn" href="javascript:;">
                          <i class="fa fa-line-chart" aria-hidden="true"></i>
                          走势图
                        </a>
                      </div>
                    </div>
                    <div class="num">
                      <ul class="num-list">
                        <li
                                class="num-list-item"
                                :class="{on : items.sign}"
                                v-for="items in item.code"
                                :key="items.num"
                        >{{items.num}}</li>
                      </ul>
                      <div class="desc">
                        <el-input-number
                                v-model="item.multiple"
                                class="custom-input-number"
                                @change="handleChangeMultiple(item)"
                                :min="1"
                                :max="10"
                        ></el-input-number>倍，
                        共
                        <span style="color:#ff7800">{{item.totalCost}}</span> 元
                      </div>
                    </div>
                    <div class="btn-group">
                      <a @click="handleRandomNum(item.code)" href="javascript:;" class="btn-item">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                        换一注
                      </a>
                      <router-link tag="a" :to="`/bet/${item.id}`" class="btn-item">手动选号</router-link>
                      <a href="javascript:;" @click="immediateBet(item)" class="btn-item bet">立即投注</a>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="box-qr">
              <div class="title"></div>
              <div class="qr" v-if="qrSrc">
                <img :src="qrSrc" />
              </div>
            </div>
          </el-col>
   
         </el-row>

<!--        <el-col :span="6">-->
<!--          <div class="box-report">-->
<!--            <div class="report-title">网站公告</div>-->
<!--            <ul class="report-list">-->
<!--              <li-->
<!--                class="report-list-item"-->
<!--                v-for="(item, index) in notice.data.slice(0, 6)"-->
<!--                :key="index"-->
<!--              >-->
<!--                <a-->
<!--                  class="wzfw"-->
<!--                  href="javascript:;"-->
<!--                  @click="handleOpenDialog(item.id)"-->
<!--                >{{item.title}}{{item.id}}</a>-->
<!--              </li>-->
<!--              <div class="btn">-->
<!--                <a href="javascript:;" @click="handleOpenDialog()">-->
<!--                  查看更多-->
<!--                  <i class="fa fa-angle-right"></i>-->
<!--                </a>-->
<!--              </div>-->
<!--            </ul>-->
<!--          </div>-->
<!--          <div class="box-qr">-->
<!--            <div class="title"></div>-->
<!--            <div class="qr" v-if="qrSrc">-->
<!--              <img :src="qrSrc" />-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
      </el-row>

      <el-row style="margin: 5px 0 45px 0">
        <el-col :span="6">
          <div class="kjgg">
            <div class="title">开奖公告</div>
            <div class="kjgg-group">
              <div class="kigg-item" v-for="(item, index) in lotteryNoticeList" :key="index">
                <div class="top">
                  <div class="fl">{{item.cn_name}}</div>
                  <div class="fr">
                    <span class="time">{{item.issue}}</span>期
                  </div>
                </div>
                <div class="middle">
                  <template v-if="item.official_code">
                    <span class="ball" v-for="(item, index) in item.official_code.split('')" :key="index">{{item}}</span>
                  </template>
                </div>
                <div class="bottom">
                  <div class="fl">{{Utils.formatTime(item.encode_time)}}</div>
                  <div class="fr">
                    <a href="javascript:;" class="btn">走势</a>
                    <a href="javascript:;" class="btn">投注</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="other-game">
            <div class="container">
              <el-tabs v-model="activeGameName">
                <el-tab-pane label="彩票" name="lott">
                  <el-row :gutter="8" class="tab-lott">
                    <el-col :span="12" v-for="item in 8" :key="item">
                      <div class="lott-item-warp">
                        <div class="lott-item">
                          <img class="img" src="../assets/images/lott-img.png" />
                          <div class="lott-r">
                            <div class="title">
                              龙虎斗
                              <br />经典棋牌对战
                            </div>
                            <div class="btn">进入游戏</div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="棋牌" name="chess">配置管理</el-tab-pane>
                <el-tab-pane label="电子" name="electron">角色管理</el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="zjxx">
            <div class="title">中奖信息</div>
            <div class="zjxx-group" id="lottery-wins-boxs">
              <div id="lottery-wins-lists" class="zjxx-group-lists">
                <div class="zjxx-item" v-for="(item, index) in ranking" :key="index">
                  <img class="img" src="../assets/images/Avatar.png" />
                  <div class="zjxx-r">
                    {{item.username}}
                    <br />喜中十一选五
                    <span class="cost">{{item.bonus}}元</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 悬浮 -->
    <!-- <div class="float-layer" ref="floatLayer" v-if="showSideFloat">   
      <a href="javascript:;" @click="$store.commit('SET_SHOW_FLOAT', !showSideFloat)" class="close">
        <i class="fa fa-times-circle" aria-hidden="true"></i>
      </a>
      <a href class="online-server"></a>
      <router-link tag="a" to="active" class="promotions"></router-link>
    </div>-->
    <dialog-bulletin
      v-if="showBulletin"
      :showBulletin="showBulletin"
      :currentBulletinIndex="currentBulletinIndex"
      index="0"
      @close="handleBulletinClose"
    ></dialog-bulletin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dialogBulletin from '../components/public/dialog_bulletin'

export default {
  name: 'index',
  data() {
    return {
      debounce: null,
      lotteriesList: [],
      currentBulletinIndex: null,
      showBulletin: false,
      activeName: '',
      activeGameName: 'lott'
    }
  },
  components: {
    dialogBulletin
  },
  computed: {
    ...mapGetters([
      'banner',
      'qrSrc',
      'notice',
      'popularLotteries1',
      'popularLotteries2',
      'showBanner',
      'showSideFloat',
      'ranking',
      'lotteryNoticeList'
    ])
  },
  watch: {
    popularLotteries2: {
      handler(val) {
        const list = Object.keys(val).map(v => {
          return {
            name: val[v].lottery_name,
            id: val[v].lotteries_id,
            method_name: val[v].method_name,
            method_id: val[v].method_id,
            multiple: 1,
            code: [
              { num: 0, sign: true },
              { num: 1, sign: false },
              { num: 2, sign: true },
              { num: 3, sign: true },
              { num: 4, sign: true },
              { num: 5, sign: false },
              { num: 6, sign: false },
              { num: 7, sign: false },
              { num: 8, sign: true },
              { num: 9, sign: false }
            ],
            totalCost: 2
          }
        })
        this.lotteriesList = list
        this.activeName = list[0].id
      },
      immediate: true
    }
  },
  mounted() {
    this.Animation.ranking('lottery-wins-boxs', 'lottery-wins-lists', -1)
    // this.debounce = this._.debounce(this.handleScroll, 150)
    window.addEventListener('scroll', this.debounce)
  },
  methods: {
    goToBet(en_name) {
      this.$router.push(`/bet/${en_name}`)
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      const floatLayer = this.$refs.floatLayer
      if (scrollTop > 400) {
        floatLayer.style.top = '28%'
      } else if (scrollTop < 1790) {
        floatLayer.style.top = '60%'
      } else {
        floatLayer.style.top = '50%'
      }
    },
    handleCilckNum(items) {
      this.$set(items, 'sign', !items.sign)
    },
    handleRandomNum(code) {
      const num = []
      while (num.length < 5) {
        const ranNum = Math.floor(Math.random() * 10)
        !num.includes(ranNum) ? num.push(ranNum) : null
      }
      code.forEach(v => {
        this.$set(v, 'sign', num.includes(v.num))
      })
    },
    handleChangeMultiple(item) {
      this.$set(item, 'totalCost', item.multiple * 2)
    },
    immediateBet(item) {
      const code = []
      item.code.forEach(v => {
        v.sign ? code.push(v.num) : null
      })
    },
    goToBannerUrl(url) {
      this.$router.push(url)
    },
    handleOpenDialog(id) {
      id
        ? (this.currentBulletinIndex = id)
        : (this.currentBulletinIndex = null)
      this.showBulletin = true
    },
    handleBulletinClose(val) {
      this.showBulletin = val
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.debounce)
  }
}
</script>

<style lang="scss" scoped>
.gold {
  color: #fde785;
  font-size: 18px;
}
.blood {
  color: #ff7800;
}
.carousel-img {
  width: 100%;
  height: 310px;
  background: #32221a;
  .carousel-src {
    height: 100%;
    width: 100%;
    display: block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  /deep/ {
    .el-carousel--horizontal {
      width: 100%;
    }
    .el-carousel__container {
      height: 310px;
    }
    .el-carousel__arrow--left {
      left: 0;
    }
    .el-carousel__arrow--right {
      right: 0;
    }
    .el-carousel__arrow {
      border-radius: 0;
      font-size: 26px;
      // background-color: rgba(0, 0, 0, .2);
    }
  }
}
.new-index {
  width: 100%;
  .container {
    width: 1200px;
    margin: 0 auto;
    .lotter-list {
      height: 346px;
      background: url("../assets/images/new/index/lotter_list_bg.jpg") no-repeat;
      background-size: 100% 100%;
      margin-top: 30px;
      border-radius: 5px;
      overflow: hidden;
    }
  }
  .lotter-list-item {
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    width: 25%;
    height: 346px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    display: inline-block;
    letter-spacing: 2px;
    box-sizing: border-box;
    background-size: 100% 100%;
    .lotter-list-item-text {
      position: absolute;
      top: 198px;
      width: 100%;
      text-align: center;
    }
    .lotter-list-item-btn {
      cursor: pointer;
      width: 183px;
      height: 52px;
      position: absolute;
      top: 262px;
      left: 50%;
      transform: translateX(-50%);
      background: url("../assets/images/new/index/lotter-btn.png") no-repeat;
    }
  }
  .game-list {
    margin-top: 30px;
    padding-bottom: 60px;
    .game-list-item {
      width: 100%;
      height: 388px;
      position: relative;
      cursor: pointer;
      background-size: 100% 100%;
      &.item-1 {
        background-image: url("../assets/images/new/index/game-list1.png");
        &:hover {
          background-image: url("../assets/images/new/index/game-list1.2.png");
        }
      }
      &.item-2 {
        background-image: url("../assets/images/new/index/game-list2.png");
        &:hover {
          background-image: url("../assets/images/new/index/game-list2.2.png");
        }
      }
      &.item-3 {
        background-image: url("../assets/images/new/index/game-list3.png");
        &:hover {
          background-image: url("../assets/images/new/index/game-list3.2.png");
        }
      }
      &.item-4 {
        background-image: url("../assets/images/new/index/game-list4.png");
        &:hover {
          background-image: url("../assets/images/new/index/game-list4.2.png");
        }
      }
    }
  }
  .center {
    background: url("../assets/images/new/index/center_bg.jpg") no-repeat;
    background-size: 100% 100%;
    height: 576px;
    margin-top: 30px;
    color: #e6d2c3;
    font-size: 14px;
    .winning {
      width: 100%;
      height: 576px;
      background: url("../assets/images/new/index/winner_bg.jpg") no-repeat left
        top;
      background-size: 100% 100%;
      position: relative;
      padding: 0.1px;
      font-size: 14px;
      .lottery-wins-boxs {
        position: relative;
        margin-top: 190px;
        height: 380px;
        overflow: hidden;
      }
      .lottery-wins-lists {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0 10px;
        overflow: hidden;
        box-sizing: border-box;
      }
      .lottery-wins-list {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
        line-height: 20px;
      }
      .lottery-wins-list-num {
        span {
          display: block;
          height: 20px;
          width: 20px;
          background: #caa16d;
          color: #fff;
          border-radius: 50%;
          text-align: center;
          line-height: 20px;
        }
      }
      .lottery-wins-list-moeny {
        flex: 0 0 110px;
      }
    }

    .hot-box {
      width: 100%;
    }
    .hot-box-wrap {
      height: 100%;
      background: url("../assets/images/new/index/hot_box_item_bg.png")
        no-repeat left top;
      background-size: 100% 100%;
    }
  }
  .hot-box-item {
    font-size: 16px;
    padding: 0 15px 15px;
    & + .hot-box-item {
      border-top: 1px solid #695e56;
    }
    .title {
      overflow: hidden;
      padding: 12px 0;
      .btn {
        border: 1px solid #e2e2e2;
        padding: 7px 10px;
      }
    }
    .num {
      background: #f7f7f7;
      .num-list {
        display: flex;
        justify-content: space-around;
        width: 460px;
        margin: 0 auto;
        padding: 30px 0;
        .num-list-item {
          font-size: 14px;
          width: 30px;
          height: 30px;
          text-align: center;
          color: #fff;
          line-height: 30px;
          border-radius: 50%;
          background: #fb9f46;
          &.on {
            background: #ff7800;
          }
        }
      }
      .desc {
        text-align: center;
        padding-bottom: 18px;
        color: #000;
      }
    }
    .btn-group {
      display: flex;
      justify-content: space-between;
      margin-top: 17px;
      .btn-item {
        box-sizing: border-box;
        width: 142px;
        height: 30px;
        background: #fff;
        border: 1px solid #e2e2e2;
        line-height: 30px;
        text-align: center;
        color: #000000;
        font-size: 14px;
        i {
          font-size: 16px;
          vertical-align: middle;
        }
      }
      .bet {
        background: #ff7800;
        border: 1px solid #ff7800;
        color: #fff;
      }
      .bet:hover {
        background: transparent;
        border: 1px solid #ff7800;
        color: red;
      }
    }
  }
  .custom-input-number {
    width: 120px;
    line-height: 24px;
    margin-right: 5px;
    /deep/ {
      .el-input__inner {
        line-height: 27px;
        height: 24px;
        padding: 0;
        width: 65px;
        border-radius: 0;
      }
      .el-input-number__decrease {
        left: 0;
        top: 1px;
      }
      .el-input-number__increase {
        right: 0;
        top: 1px;
      }
      .el-input-number__decrease,
      .el-input-number__increase {
        border: 0;
        width: 24px;
        color: #fff;
        background: #ff7800;
      }
    }
  }
}
.float-layer {
  width: 197px;
  height: 468px;
  background: url("../assets/images/new/index/float_layer_bg.png") no-repeat;
  position: fixed;
  background-size: contain;
  z-index: 300;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  transition: all 0.3s;
  .online-server {
    position: absolute;
    width: 100%;
    top: 190px;
    height: 44px;
  }
  .promotions {
    position: absolute;
    width: 100%;
    bottom: 18px;
    height: 44px;
  }
  .close {
    color: #f56c6c;
    position: absolute;
    font-size: 26px;
    right: 15px;
    top: 15px;
  }
  .close:hover {
    color: #F9780B;
  }
}
.hot-box-tab {
  background-color: #fff;
  /deep/ {
    .el-tabs__header {
      margin: 0 0 10px;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__nav-wrap::after {
      height: 1px;
    }
    .el-tabs__nav {
      width: 100%;
    }
    .el-tabs__item {
      text-align: center;
      padding: 0;
      width: 25%;
      font-size: 16px;
      height: 45px;
      line-height: 45px;
    }
    .el-tabs__item:hover,
    .el-tabs__item.is-active {
      color: rgb(255, 120, 0);
      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background: #ff7800;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
    }
  }
}
.box-report {
  width: 100%;
  height: 310px;
  box-sizing: border-box;
  border: 1px solid #e2e2e2;
  background: #fff;
  .report-title {
    font-size: 16px;
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
    border-bottom: 1px solid #efefef;
  }
  .btn {
    text-align: right;
    a {
      display: inline-block;
      color: #000;
      height: 28px;
      line-height: 28px;
      text-align: center;
    }
  }
}
.report-list {
  padding: 5px 15px 0;
  .report-list-item {
    margin-bottom: 20px;
    a {
      display: block;
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.box-qr {
  width: 100%;
  height: 298px;
  box-sizing: border-box;
  position: relative;
  background: #fff;
  border: 1px solid #e2e2e2;
  border-top: none;
  overflow: hidden;
  .title {
    width: 228px;
    height: 39px;
    background: url("../assets/images/new/index/saoyisao.png") no-repeat;
    margin: 45px 0 0 32px;
  }
  .qr {
    width: 143px;
    height: 143px;
    position: absolute;
    top: 95px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 5px;
    background: #fff;
    border-radius: 5px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
.kjgg {
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #e2e2e2;
  min-height: 788px;
  .title {
    font-size: 16px;
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
  }
  .kigg-item {
    padding: 10px;
    font-size: 16px;
    border-top: 1px solid #efefef;
    .top {
      overflow: hidden;
      .time {
        color: #ff7800;
        margin-right: 5px;
      }
    }
    .middle {
      .ball {
        display: inline-block;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: #fff;
        background-color: #ff7800;
        border-radius: 50%;
        margin: 15px 5px;
      }
    }
    .bottom {
      font-size: 14px;
      overflow: hidden;
      .btn {
        font-size: 14px;
        border: 1px solid #e2e2e2;
        padding: 3px 8px;
        margin-left: 5px;
      }
    }
  }
}
.other-game {
  box-sizing: border-box;
  padding: 0 5px;
  .container {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #e2e2e2;
    background-color: #fff;
    min-height: 788px;
  }
  /deep/ {
    .el-tabs__nav {
      width: 100%;
    }
    .el-tabs__item {
      height: 50px;
      font-size: 16px;
      line-height: 50px;
      padding: 0;
      font-weight: 400;
      width: 33.3333%;
      text-align: center;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__item.is-active,
    .el-tabs__item:hover {
      color: #ff7800;
    }
    .el-tabs__item.is-active {
      position: relative;
      &:after {
        position: absolute;
        content: " ";
        display: block;
        height: 2px;
        width: 100%;
        background: #ff7800;
        bottom: 0;
        left: 0;
      }
    }
  }
}

.tab-lott {
  padding: 14px 20px 20px;
  .lott-item-warp {
    border: 1px solid #e2e2e2;
    margin-bottom: 15px;
  }
  .lott-item {
    overflow: hidden;
    border: 4px solid #f2f2f2;
    padding: 15px;
    .img {
      float: left;
      width: 120px;
    }
    .lott-r {
      float: right;
      .btn {
        cursor: pointer;
        background: #ff7800;
        text-align: center;
        color: #fff;
        width: 84px;
        line-height: 30px;
        margin-top: 22px;
        border-radius: 5px;
      }
    }
  }
}
.zjxx {
  box-sizing: border-box;
  height: 788px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e2e2e2;
  .title {
    border-bottom: 1px solid #e2e2e2;
    font-size: 16px;
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
  }
}
.zjxx-group {
  position: relative;
  height: 100%;
  overflow: hidden;
  .zjxx-group-lists {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .zjxx-item {
    overflow: hidden;
    padding: 15px;
    border-bottom: 1px dashed #e2e2e2;
    .img {
      float: left;
      margin-right: 10px;
    }
    .zjxx-r {
      float: left;
      .cost {
        color: #F9780B;
      }
    }
  }
}
.head-notice{
  margin: 8px 0 ;
  background: rgb(255, 253, 233);
}
.head-notice-img {
  float: left;
  margin: 8px 0 0 7px;
  color: rgb(254, 99, 3);
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
  line-height: 35px;
}
</style>
