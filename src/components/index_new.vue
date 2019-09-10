<template>
  <div class="new-index">
    <div class="carousel-img" v-if="showBanner">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in banner" :key="item.src">
          <a
            class="carousel-src"
            href="javascript:;"
            @click="goToBannerUrl(item.redirect_url)"
            :style="`background-image: url(${item.pic_path})`"></a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <ul class="lotter-list ft0" v-if="popularLotteries1 && popularLotteries1.length">
        <li
          class="lotter-list-item"
          v-for="(item, index) in popularLotteries1"
          :style="`background: url(${item.icon_path}) no-repeat center center`"
          :key="index">
          <p class="lotter-list-item-text">
            <span class="gold">20</span>分钟/期
            全天共
            <span class="gold">{{item.day_issue}}</span>期
          </p>
          <div @click="goToBet(item.en_name)" class="lotter-list-item-btn"></div>
        </li>
      </ul>
      <div class="center">
        <el-row class="center-box" :gutter="8">
          <el-col :span="6">
            <div class="winning" v-if="ranking && ranking.length">
              <section class="fw lottery-wins-boxs" id="lottery-wins-boxs">
                <ul class="lottery-wins-lists" id="lottery-wins-lists">
                  <li class="lottery-wins-list" v-for="(item, index) in ranking" :key="index"> 
                    <div v-if="index === 0" class="lottery-wins-list-num">
                      <img src="../assets/images/new/index/wins_1.png">
                    </div>
                    <div v-else-if="index === 1" class="lottery-wins-list-num">
                      <img src="../assets/images/new/index/wins_2.png">
                    </div>
                    <div v-else-if="index === 2" class="lottery-wins-list-num">
                      <img src="../assets/images/new/index/wins_3.png">
                    </div>
                    <div v-else class="lottery-wins-list-num">
                      <span>{{index}}</span>
                    </div>
                    <div class="lottery-wins-list-name">{{item.username}}</div>
                    <div class="lottery-wins-list-moeny wzfw">{{item.bonus}}</div>
                  </li>
                </ul>
              </section>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="box-qr">
              <div class="qr" v-if="qrSrc">
                <img :src="qrSrc">
              </div>
            </div>
            <div class="box-report">
              <ul class="report-list" v-if="notice.data && notice.data.length">
                <li class="report-list-item" v-for="(item, index) in notice.data.slice(0, 6)" :key="index">
                  <a class="wzfw" href="javascript:;" @click="handleOpenDialog(item.id)">{{item.title}}{{item.id}}</a>
                </li>
                <div class="btn">
                  <a href="javascript:;" @click="handleOpenDialog()">
                    查看更多
                    <i class="fa fa-angle-right"></i>
                  </a>
                </div>
              </ul>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="hot-box">
              <div class="hot-box-wrap">
                <template>
                  <div class="hot-box-item" v-for="(item, index) in lotteriesList" :key="index">
                    <div class="title">
                      <div class="fl">
                        {{item.name}} {{item.method_name}}
                        <span style="color:#fb9f46;">{{item.issue}}</span>
                      </div>
                      <div class="fr">{{timeArr[index]}}截止</div>
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
                        <span style="color:#fff">{{item.totalCost}}</span> 元
                      </div>
                    </div>
                    <div class="btn-group">
                      <a @click="handleRandomNum(item)" href="javascript:;" class="btn-item">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                        换一注
                      </a>
                      <router-link tag="a" :to="`/bet/${item.id}`" class="btn-item">手动选号</router-link>
                      <a href="javascript:;" @click="immediateBet(item)" class="btn-item bet">立即投注</a>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="game-list">
        <el-row>
          <el-col :span="6">
            <router-link tag="div" :to="`/fish-game`" class="game-list-item item-1"></router-link>
          </el-col>
          <el-col :span="6">
           <router-link tag="div" :to="`/chess-all`" class="game-list-item item-2"></router-link>
          </el-col>
          <el-col :span="6">
            <div class="game-list-item item-3"></div>
          </el-col>
          <el-col :span="6">
            <div class="game-list-item item-4"></div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 悬浮 -->
    <div class="float-layer" ref="floatLayer" v-if="showSideFloat">   
      <a href="javascript:;" @click="$store.commit('SET_SHOW_FLOAT', !showSideFloat)" class="close">
        <i class="fa fa-times-circle" aria-hidden="true"></i>
      </a>
      <a href class="online-server"></a>
      <router-link tag="a" to="active" class="promotions"></router-link>
    </div>
    <dialog-bulletin v-if="showBulletin" :showBulletin="showBulletin" :currentBulletinIndex="currentBulletinIndex" index='0' @close="handleBulletinClose"></dialog-bulletin>
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
      timer: [],
      timeArr: ['-- : -- : --', '-- : -- : --'],
      timerContainer: [],

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
      'ranking'
    ])
  },
  created () {
    this.getIndexLottery()
  },
  mounted() {
    this.Animation.ranking('lottery-wins-boxs', 'lottery-wins-lists', -1)
    this.debounce = this._.debounce(this.handleScroll, 150)
    this.showSideFloat && window.addEventListener('scroll', this.debounce)
  },
  methods: {
    getIndexLottery(){
       this.Api.getPopularLotteries2().then(({success, data}) => {
        if (success && data.length) {
          data = data.slice(0,3)
          const list = Object.keys(data).map((v, i) => {
            if (data[v].end_time) this.timer[i] = data[v].end_time - new Date().getTime() / 1000
            return {
              name: data[v].lottery_name,
              id: data[v].lotteries_id,
              issue: data[v].issue,
              method_name: data[v].method_name,
              end_time: data[v].end_time,
              method_id: data[v].method_id,
              method_group: data[v].method_group,
              count: 5,
              multiple: 1,
              code: data[v].code && data[v].code.length ? data[v].code : [
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
              cost: 10.00,
              totalCost: 10.00
            }
          })
          this.lotteriesList = list
          this.times()
        }
      })
    },
    // 倒计时
    times() {
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
                this.getIndexLottery()
              })
            }
          }, 1000)
        })
      }
    },
    // 一键投注
    immediateBet(item) {
      const code = [],
            bet = []
      item.code.forEach(v => {
        v.sign ? code.push(v.num) : null
      })
      bet.push({
        mode: 1,
        price: 2,
        count: item.count,
        prize_group: this.userDetail.prize_group,
        method_group: item.method_group,
        method_name: item.name,
        times: item.multiple,
        codes: code.join('&'),
        method_id: item.method_id,
        cost: item.totalCost.toFixed(3)
      })
      this.betBtnLoading = true
      this.Api.bet(
        item.id,
        {[item.issue]:1},
        bet,
        item.totalCost.toFixed(3),
      ).then(res => {
        this.betBtnLoading = false
        if (res.success) {
          this.$alert(
            '投注成功, 您可以通过”游戏记录“查询您的投注记录！',
            '提示',
            {
              confirmButtonText: '确定'
            }
          )
        }
      })
    },

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
    // 换一注
    handleRandomNum(item) {
      const num = [],
            randomNum = Math.ceil(Math.random() * 7)
      while (num.length < randomNum) {
        const ranNum = Math.floor(Math.random() * 10)
        !num.includes(ranNum) ? num.push(ranNum) : null
      }
      item.count = randomNum
      item.cost = 2 * item.count
      item.totalCost = item.multiple * item.cost
      item.code.forEach(v => {
        this.$set(v, 'sign', num.includes(v.num))
      })
      
    },

    handleChangeMultiple(item) {
      this.$set(item, 'totalCost', item.multiple * 2)
    },
    goToBannerUrl(url){
      this.$router.push(url)
    },
    handleOpenDialog(id){
      id ? this.currentBulletinIndex = id : this.currentBulletinIndex = null
      this.showBulletin = true
    },
    handleBulletinClose(val){
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
  color: #c51313;
}
.carousel-img {
  width: 100%;
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
      height: 520px;
    }
    .el-carousel__arrow--left {
      left: 0;
    }
    .el-carousel__arrow--right {
      right: 0;
    }
    .el-carousel__arrow {
      width: 58px;
      height: 58px;
      border-radius: 0;
      font-size: 36px;
      // background-color: rgba(0, 0, 0, .2);
    }
  }
}
.new-index {
  width: 100%;
  background: url("../assets/images/new/index/index_center_bg.jpg") no-repeat
    center center;
  background-size: cover;
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
    .box-qr {
      width: 100%;
      height: 260px;
      background: url("../assets/images/new/index/qr_box_bg.png") no-repeat left
        top;
      background-size: 100% 100%;
      position: relative;
      .qr {
        width: 143px;
        height: 143px;
        position: absolute;
        top: 0;
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
    .box-report {
      width: 100%;
      height: 306px;
      background: url("../assets/images/new/index/box_report_bg.png") no-repeat
        left top;
      background-size: 100% 100%;
      margin-top: 8px;
      box-sizing: border-box;
      padding-top: 46px;
      .btn {
        text-align: right;
        a {
          display: inline-block;
          color: #000;
          background: #e3bd87;
          height: 28px;
          width: 98px;
          line-height: 28px;
          text-align: center;
          border-radius: 18px;
        }
      }
    }
    .report-list {
      padding: 5px 15px 0;
      .report-list-item {
        margin-bottom: 20px;
        a {
          display: block;
          color: #e6d2c3;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .hot-box {
      width: 100%;
      height: 576px;
      background: url("../assets/images/new/index/hot_box_bg.jpg") no-repeat
        left top;
      background-size: 100% 46px;
      box-sizing: border-box;
      padding-top: 46px;
    }
    .hot-box-wrap {
      height: 100%;
      background: url("../assets/images/new/index/hot_box_item_bg.png")
        no-repeat left top;
      background-size: 100% 100%;
    }
  }
  .hot-box-item {
    font-size: 14px;
    padding: 10px 15px 15px;
    & + .hot-box-item {
      border-top: 1px solid #695e56;
    }
    .title {
      overflow: hidden;
      padding-bottom: 4px;
    }
    .num {
      background: #aa8565;
      .num-list {
        display: flex;
        justify-content: space-around;
        width: 342px;
        margin: 0 auto;
        padding: 14px 0;
        .num-list-item {
          font-size: 12px;
          width: 24px;
          height: 24px;
          text-align: center;
          color: #fff;
          line-height: 24px;
          border-radius: 50%;
          background: #6a4c54;
          &.on {
            background: #fb9f46;
          }
        }
      }
      .desc {
        text-align: center;
        padding-bottom: 8px;
        color: #000;
      }
    }
    .btn-group {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      .btn-item {
        box-sizing: border-box;
        width: 142px;
        height: 30px;
        background: linear-gradient(to left, #a78363, #ebc48c);
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
        background: #dd891c;
        border: 1px solid #dd891c;
        color: #fff;
      }
      .bet:hover {
        background: transparent;
        border: 1px solid #dd891c;
        color: #ffaa31;
      }
    }
  }
  .custom-input-number {
    width: 120px;
    line-height: 24px;
    margin-right: 5px;
    /deep/ {
      .el-input__inner {
        line-height: 24px;
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
        background: #6a4c54;
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
  .close{
    color:#f56c6c;
    position: absolute;
    font-size: 26px;
    right:15px;
    top: 15px;
  }
  .close:hover{
    color:#ff0000;
  }
}
</style>
