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
              <section @click="openNotice" class="resultMarquee" id="head-meque">
<!--                <p @click="openNotice" v-if="notice.data.length" id="head-meque_text" v-html="notice.data[0].message_content.content"></p>-->
                <p @click="openNotice"
                   v-if="notice.data.length"
                   id="head-meque_text">
                    <span
                      class="meque_text_content"
                      :key="index"
                      v-for="(item, index) in noticeList"
                    >
                       {{item.content}}
                    </span>
                </p>
              </section>
            </section>
          </section>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="12">
          <div class="hot-box">
            <el-tabs class="hot-box-tab" v-model="activeName">
              <el-tab-pane
                v-for="(item, index) in lotteriesList"
                :key="index"
                :label="item.name"
                :name="item.id">
                <div class="hot-box-item">
                  <div class="title">
                    <div class="fl">
                      {{item.name}} {{item.method_name}}
                      <span style="color:#ff7800;">{{timeArr[index]}}</span> 截止
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
                    <a href="javascript:;" @click="preInto(`/bet/${item.id}`)" class="btn-item">手动选号</a>
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
                <div class="middle" v-if="item.official_code">
                  <template v-if="item.series_id === 'lotto'">
                    <span
                      class="ball"
                      v-for="(item, index) in item.official_code.split(' ')"
                      :key="index"
                    >{{item}}</span>
                  </template>
                  <template v-else>
                    <span
                      class="ball"
                      v-for="(item, index) in item.official_code.split('')"
                      :key="index"
                    >{{item}}</span>
                  </template>
                </div>
                <div class="bottom">
                  <div
                    class="fl"
                    v-if="item.encode_time"
                  >{{Utils.formatTime(item.encode_time * 1000, 'YYYY-MM-DD HH:MM:SS')}}</div>
                  <div class="fr">
                    <a href="javascript:;" class="btn">走势</a>
                    <a href="javascript:;" @click="preInto(`/bet/${item.lotteries_id}`)" class="btn">投注</a>
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
                    <template v-if="popularLotteries1.length">
                      <el-col :span="12" v-for="(item, index) in popularLotteries1.slice(0,6)" :key="index">
                        <div class="lott-item-warp">
                          <div class="lott-item">
                            <section>
                              <img class="img dinv" :src="item.icon_path" />
                              <div class="title">
                                {{item.cn_name}}<br />经典彩票游戏
                              </div>
                            </section>
                            <div class="lott-r fw w100">
                              <div @click="preInto(`/bet/${item.en_name}`)" class="btn">号码走势</div>
                              <div @click="preInto(`/bet/${item.en_name}`)" class="btn">玩法规则</div>
                              <div @click="preInto(`/bet/${item.en_name}`)" class="btn">立即投注</div>
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </template>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="棋牌" name="chess">
                  <el-row :gutter="8" class="tab-lott">
                    <el-col :span="12" v-for="(item, index) in popularChess" :key="index">
                      <div class="lott-item-warp">
                        <div class="lott-item lott-item-game">
                          <img class="img" :src="item.icon" />
                          <div class="lott-r">
                            <div class="title">
                              {{item.name}}
                              <br />经典棋牌游戏
                            </div>
                            <div class="btn">进入游戏</div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="电子" name="electron">
                  <el-row :gutter="8" class="tab-lott">
                    <el-col :span="12" v-for="(item, index) in popularEgame" :key="index">
                      <div class="lott-item-warp">
                        <div class="lott-item lott-item-game">
                          <img class="img" :src="item.icon" />
                          <div class="lott-r">
                            <div class="title">
                              {{item.name}}
                              <br />经典电子游艺
                            </div>
                            <div class="btn">进入游戏</div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="zjxx">
            <div class="title">中奖排行榜</div>
            <div class="zjxx-group" id="lottery-wins-boxs">
              <div id="lottery-wins-lists" class="zjxx-group-lists">
                <div class="zjxx-item" v-for="(item, index) in ranking" :key="index">
                  <img class="img" :src="item.user_icon" />
                  <div class="zjxx-r wzfw">
                    {{item.username}}
                    <br />喜中{{item.lottery_sign}}
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
    <div class="float-layer" ref="floatLayer" v-if="showSideFloat">
      <a href="javascript:;" @click="$store.commit('SET_SHOW_FLOAT', !showSideFloat)" class="close">
        <i class="fa fa-times-circle" aria-hidden="true"></i>
      </a>
      <a href class="online-server"></a>
      <router-link tag="a" to="active" class="promotions"></router-link>
    </div>
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
import { mapGetters, mapActions } from 'vuex'
import dialogBulletin from '../components/public/dialog_bulletin'

export default {
  name: 'index',
  data() {
    return {
      currentIssueTimer: null,
      debounce: null,
      lotteriesList: [],
      currentBulletinIndex: null,
      showBulletin: false,
      activeName: '',
      endTime: null,
      activeGameName: 'lott',
      timer: [],
      timeArr: ['-- : -- : --', '-- : -- : --'],
      timerContainer: [],
      
      // 公告内容
      noticeList: []
    }
  },
  components: {
    dialogBulletin
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'banner',
      'qrSrc',
      'notice',
      'popularLotteries1',
      'popularLotteries2',
      'showBanner',
      'showSideFloat',
      'ranking',
      'lotteryNoticeList',
      'popularEgame',
      'popularChess'
    ])
  },
  watch: {
    popularLotteries2: {
      handler(val) {
        const list = Object.keys(val).map((v, i) => {
          this.timer[i] = val[v].end_time - new Date().getTime() / 1000
          return {
            name: val[v].lottery_name,
            id: val[v].lotteries_id,
            method_name: val[v].method_name,
            end_time: val[v].end_time,
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
    },
    'noticeList': {
      handler () {
        // console.log(document.getElementById('meque_text_content')[0].style.width)
      }
    }
  },
  mounted() {
    this.Animation.ranking('lottery-wins-boxs', 'lottery-wins-lists', -1)
    this.debounce = this._.debounce(this.handleScroll, 150)
    window.addEventListener('scroll', this.debounce)
    this.noticehandler()
  },
  created() {
    this.initData()
  },
  methods: {
    ...mapActions(['getPopularLotteries2']),
    // 处理公告内容
    noticehandler() {
      for (const k of this.notice.data) {
        let json = {}
        json['content'] = k['message_content']['title']
        json['id'] = k['message_content']['id']
        this.noticeList.push(json)
      }
      
      setTimeout(() => {
        this.Animation.notice('head-meque', 'head-meque_text', -1)
      }, 10)
    },
    initData(){
      this.getPopularLotteries2().then(() => {
        this.times()
      })
    },
    preInto(route) {
      if (!this.isLogin) {
        this.$router.push('/login')
        return
      } else {
        this.$router.push(route)
      }
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      const floatLayer = this.$refs.floatLayer
      if(!floatLayer) return
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
    },
    openNotice() {
      this.showBulletin = true
    },
    times() {
      this.timerContainer = []
      if(this.timer.length){
        this.timer.forEach((v, i) => {
          this.timerContainer[i] = setInterval(() => {
            // 计算 倒计时
            v -= 1
            if (v >= 0) {
              this.$set(this.timeArr, i, this.Utils.formatSeconds(v))
            } else {
              this.timerContainer.forEach(setIn => {
                clearInterval(setIn)
              })
              this.$nextTick(() => {
                this.initData()
              })
            }
          }, 1000)
        })
      }
    }
  },
  destroyed() {
    this.timerContainer.forEach(setIn => {
      clearInterval(setIn)
    })
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
          background: #f5d5b5;
          &.on {
            background: #f37616;
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
  width: 135px;
  height: 316px;
  background: url("../assets/images/new/index/float_layer_bg2.png") no-repeat;
  position: fixed;
  background-size: contain;
  z-index: 300;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  transition: all 0.3s;
  .online-server {
    position: absolute;
    width: 100%;
    top: 110px;
    height: 36px;
  }
  .promotions {
    position: absolute;
    width: 100%;
    bottom: 0px;
    height: 36px;
  }
  .close {
    color: #f56c6c;
    position: absolute;
    font-size: 26px;
    right: 0px;
    top: -5px;
  }
  .close:hover {
    color: #f9780b;
  }
}
.hot-box-tab {
  background-color: #fff;
  /deep/ {
    .el-tabs__header {
      margin: 0 0 12px;
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
  min-height: 579px;
  .title {
    font-size: 16px;
    height: 49px;
    line-height: 49px;
    padding: 0 15px;
  }
  .kigg-item {
    padding: 14px 10px;
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
    min-height: 579px;
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
  padding: 14px 20px 14px;
  .lott-item-warp {
    border: 1px solid #e2e2e2;
    margin-bottom: 15px;
  }
  .lott-item,
  .lott-item-game{
    overflow: hidden;
    border: 4px solid #f2f2f2;
    padding-top: 15px;
    .img {
      margin:0 15px 10px;
    }
    .title{
      display: inline-block;
      vertical-align: sub;
    }
    .lott-r {
      border-top:2px solid #f2f2f2;
      background:#e6e6e6;
      .btn {
        float:left;
        cursor: pointer;
        text-align: center;
        color: #4893e3;
        width: 33.33%;
        line-height: 38px;
        font-size:12px;
        border-right:1px solid #f2f2f2;
        box-sizing: border-box;
      }
      .btn:nth-of-type(3){
        font-size:14px;
        border-right:none;
        color: #333;
      }
    }
  }
  .lott-item-game {
    overflow: hidden;
    border: 4px solid #f2f2f2;
    padding: 12px 15px;
    .img {
      float: left;
      width: 110px;
      border-radius: 5px;
      margin:0;
    }
    .title{
      padding-top: 11px;
      display: block;
    }
    .lott-r {
      border-top:none;
      float: right;
      background:none;
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
  height: 579px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e2e2e2;
  .title {
    border-bottom: 1px solid #e2e2e2;
    font-size: 16px;
    height: 49px;
    line-height: 49px;
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
      width:50px;
      height:50px;
      border-radius:50%;
    }
    .zjxx-r {
      width:76%;
      float: left;
      .cost {
        color: #f9780b;
      }
    }
  }
}
.head-notice {
  margin: 8px 0;
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
  cursor: pointer;
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
  left: 6px;
  height: 34px;
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
  .meque_text_content{
    float:left;
    min-width:333px;
    padding-right:25px;
  }
</style>
