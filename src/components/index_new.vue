<template>
  <div class="new-index">
    <div class="carousel-img">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in banner" :key="item.src">
          <a class="carousel-src" href="javascript:;" :style="`background-image: url(${item.src})`"></a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <ul class="lotter-list ft0">
        <li class="lotter-list-item item1">
          <p class="lotter-list-item-text">
            <span class="gold">20</span>分钟/期 全天共
            <span class="gold">1</span>期
          </p>
          <div class="lotter-list-item-btn"></div>
        </li>
        <li class="lotter-list-item item2">
          <p class="lotter-list-item-text">
            <span class="gold">20</span>分钟/期 全天共
            <span class="gold">1</span>期
          </p>
          <div class="lotter-list-item-btn"></div>
        </li>
        <li class="lotter-list-item item3">
          <p class="lotter-list-item-text">
            <span class="gold">20</span>分钟/期 全天共
            <span class="gold">1</span>期
          </p>
          <div class="lotter-list-item-btn"></div>
        </li>
        <li class="lotter-list-item item4">
          <p class="lotter-list-item-text">
            <span class="gold">20</span>分钟/期 全天共
            <span class="gold">1</span>期
          </p>
          <div class="lotter-list-item-btn"></div>
        </li>
      </ul>
      <div class="center">
        <el-row class="center-box" :gutter="8">
          <el-col :span="6">
            <div class="winning">
              <section class="fw lottery-wins-boxs" id="lottery-wins-boxs">
                <ul class="lottery-wins-lists" id="lottery-wins-lists">
                  <li class="lottery-wins-list">
                    <div class="lottery-wins-list-num">
                      <img src="../assets/images/new/index/wins_1.png">
                    </div>
                    <div class="lottery-wins-list-name">12****8</div>
                    <div class="lottery-wins-list-moeny wzfw">990,000,000,000</div>
                  </li>
                  <li class="lottery-wins-list">
                    <div class="lottery-wins-list-num">
                      <img src="../assets/images/new/index/wins_2.png" alt>
                    </div>
                    <div class="lottery-wins-list-name">12****8</div>
                    <div class="lottery-wins-list-moeny wzfw">990,000,000,000</div>
                  </li>
                  <li class="lottery-wins-list">
                    <div class="lottery-wins-list-num">
                      <img src="../assets/images/new/index/wins_3.png" alt>
                    </div>
                    <div class="lottery-wins-list-name">12****8</div>
                    <div class="lottery-wins-list-moeny wzfw">990,000,000,000</div>
                  </li>
                  <li class="lottery-wins-list">
                    <div class="lottery-wins-list-num">
                      <span>4</span>
                    </div>
                    <div class="lottery-wins-list-name">12****8</div>
                    <div class="lottery-wins-list-moeny wzfw">990,000,000,000</div>
                  </li>
                </ul>
              </section>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="box-qr">
              <div class="qr">
                <img src="../assets/images/new/index/qr.jpg">
              </div>
            </div>
            <div class="box-report">
              <ul class="report-list">
                <li class="report-list-item">
                  <a class="wzfw" href>[彩云追星]七星彩第19033期分析:七位胆码4956七位胆码4956七位胆码4956七位胆码4956</a>
                </li>
                <li class="report-list-item">
                  <a class="wzfw" href>[彩云追星]七星彩第19033期分析:七位胆码4956七位胆码4956七位胆码4956七位胆码4956</a>
                </li>
                <li class="report-list-item">
                  <a class="wzfw" href>[彩云追星]七星彩第19033期分析:七位胆码4956七位胆码4956七位胆码4956七位胆码4956</a>
                </li>
                <li class="report-list-item">
                  <a class="wzfw" href>[彩云追星]七星彩第19033期分析:七位胆码4956七位胆码4956七位胆码4956七位胆码4956</a>
                </li>
                <li class="report-list-item">
                  <a class="wzfw" href>[彩云追星]七星彩第19033期分析:七位胆码4956七位胆码4956七位胆码4956七位胆码4956</a>
                </li>
                <div class="btn">
                  <a href="javascript:;">
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
                <div class="hot-box-item">
                  <div class="title">
                    <div class="fl">
                      重庆时时彩
                      <span class="blood">20190308</span>
                    </div>
                    <div class="fr">12.1245截止</div>
                  </div>
                  <div class="num">
                    <ul class="num-list">
                      <li v-for="item in 10" :key="item">{{item-1}}</li>
                    </ul>
                    <div class="desc">
                      <el-input-number class="custom-input-number" :min="1" :max="10"></el-input-number>倍，共
                      <span class="blood">1</span> 元
                    </div>
                  </div>
                  <div class="btn-group">
                    <a href="javascript:;" class="btn-item">
                      <i class="fa fa-refresh" aria-hidden="true"></i>
                      换一注
                    </a>
                    <a href="javascript:;" class="btn-item">手动选号</a>
                    <a href="javascript:;" class="btn-item on">立即投注</a>
                  </div>
                </div>
                <div class="hot-box-item">
                  <div class="title">
                    <div class="fl">
                      重庆时时彩
                      <span class="blood">20190308</span>
                    </div>
                    <div class="fr">12.1245截止</div>
                  </div>
                  <div class="num">
                    <ul class="num-list">
                      <li v-for="item in 10" :key="item">{{item-1}}</li>
                    </ul>
                    <div class="desc">
                      <el-input-number class="custom-input-number" :min="1" :max="10"></el-input-number>倍，共
                      <span class="blood">1</span> 元
                    </div>
                  </div>
                  <div class="btn-group">
                    <a href="javascript:;" class="btn-item">
                      <i class="fa fa-refresh" aria-hidden="true"></i>
                      换一注
                    </a>
                    <a href="javascript:;" class="btn-item">手动选号</a>
                    <a href="javascript:;" class="btn-item on">立即投注</a>
                  </div>
                </div>
                <div class="hot-box-item">
                  <div class="title">
                    <div class="fl">
                      重庆时时彩
                      <span class="blood">20190308</span>
                    </div>
                    <div class="fr">12.1245截止</div>
                  </div>
                  <div class="num">
                    <ul class="num-list">
                      <li v-for="item in 10" :key="item">{{item-1}}</li>
                    </ul>
                    <div class="desc">
                      <el-input-number class="custom-input-number" :min="1" :max="10"></el-input-number>倍，共
                      <span class="blood">1</span> 元
                    </div>
                  </div>
                  <div class="btn-group">
                    <a href="javascript:;" class="btn-item">
                      <i class="fa fa-refresh" aria-hidden="true"></i>
                      换一注
                    </a>
                    <a href="javascript:;" class="btn-item">手动选号</a>
                    <a href="javascript:;" class="btn-item on">立即投注</a>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="game-list">
        <el-row>
          <el-col :span="6">
            <div class="game-list-item item-1">
            </div>
          </el-col>
          <el-col :span="6">
            <div class="game-list-item item-2">
            </div>
          </el-col>
          <el-col :span="6">
            <div class="game-list-item item-3">
            </div>
          </el-col>
          <el-col :span="6">
            <div class="game-list-item item-4">
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      banner: [
        { src: require("../assets/images/index/banner1.jpg") },
        { src: require("../assets/images/index/banner2.jpg") },
        { src: require("../assets/images/index/banner3.jpg") }
      ],
      hotLottery: {
        list: [
          {
            bg: require("../assets/images/index/lottery1.jpg"),
            name: require("../assets/images/index/lotter-name1.png"),
            btn: require("../assets/images/index/lottery-btn1.png"),
            desc: "<span>20</span> 分钟 / 期 全天共 <span>1</span> 期"
          },
          {
            bg: require("../assets/images/index/lottery2.jpg"),
            name: require("../assets/images/index/lotter-name1.png"),
            btn: require("../assets/images/index/lottery-btn2.png"),
            desc: "<span>20</span> 分钟 / 期 全天共 <span>1</span> 期"
          },
          {
            bg: require("../assets/images/index/lottery3.jpg"),
            name: require("../assets/images/index/lotter-name1.png"),
            btn: require("../assets/images/index/lottery-btn3.png"),
            desc: "<span>20</span> 分钟 / 期 全天共 <span>1</span> 期"
          },
          {
            bg: require("../assets/images/index/lottery4.jpg"),
            name: require("../assets/images/index/lotter-name1.png"),
            btn: require("../assets/images/index/lottery-btn4.png"),
            desc: "<span>20</span> 分钟 / 期 全天共 <span>1</span> 期"
          }
        ]
      },
      bet: {
        multiple: 1
      },
      games: {
        list: [
          { src: require("../assets/images/index/game1.png"), show: false },
          { src: require("../assets/images/index/game2.png"), show: false },
          { src: require("../assets/images/index/game3.png"), show: false },
          { src: require("../assets/images/index/game4.png"), show: false }
        ]
      }
    };
  },
  mounted() {
    this.Animation.ranking("lottery-wins-boxs", "lottery-wins-lists", -1);
  },
  methods: {
    // 四个游戏移入
    gameEnter(item) {
      item.show = true;
    },
    // 四个游戏移出
    gameLeave(item) {
      item.show = false;
    },
    // 热门彩种立即投注 减
    multiplesReduce() {
      if (this.bet.multiple <= 1) {
        return;
      }
      this.bet.multiple--;
    },
    // 热门彩种立即投注 加
    multiplesAdd() {
      if (this.bet.multiple > 1000) {
        return;
      }
      this.bet.multiple++;
    }
  }
};
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
      height: 585px;
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
      background: url('../assets/images/new/index/lotter_list_bg.jpg') no-repeat;
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
    &.item1 {
      background: url("../assets/images/new/index/lotter-list1.png") no-repeat;
      &:hover{
        background: url("../assets/images/new/index/lotter-list1.2.png") no-repeat;
      }
    }
    &.item2 {
      background: url("../assets/images/new/index/lotter-list2.png") no-repeat;
      &:hover{
        background: url("../assets/images/new/index/lotter-list2.2.png") no-repeat;
      }
    }
    &.item3 {
      background: url("../assets/images/new/index/lotter-list3.png") no-repeat;
      &:hover{
        background: url("../assets/images/new/index/lotter-list3.2.png") no-repeat;
      }
    }
    &.item4 {
      background: url("../assets/images/new/index/lotter-list4.png") no-repeat;
      &:hover{
        background: url("../assets/images/new/index/lotter-list4.2.png") no-repeat;
      }
    }
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
      &.item-1{
        background-image: url('../assets/images/new/index/game-list1.png');
        &:hover{
          background-image: url('../assets/images/new/index/game-list1.2.png');
        }
      }
      &.item-2{
        background-image: url('../assets/images/new/index/game-list2.png');
        &:hover{
          background-image: url('../assets/images/new/index/game-list2.2.png');
        }
      }
      &.item-3{
        background-image: url('../assets/images/new/index/game-list3.png');
        &:hover{
          background-image: url('../assets/images/new/index/game-list3.2.png');
        }
      }
      &.item-4{
        background-image: url('../assets/images/new/index/game-list4.png');
        &:hover{
          background-image: url('../assets/images/new/index/game-list4.2.png');
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
        flex: 0 0 130px;
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
          &:hover{
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
        li {
          font-size: 12px;
          width: 24px;
          height: 24px;
          text-align: center;
          cursor: pointer;
          color: #fff;
          line-height: 24px;
          border-radius: 50%;
          background: #fb9f46;
        }
      }
      .desc {
        text-align: center;
        padding-bottom: 8px;
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
        background: #e2bc87;
        line-height: 30px;
        text-align: center;
        color: #000000;
        font-size: 14px;
        i {
          font-size: 16px;
          vertical-align: middle;
        }
        &.on {
          background: transparent;
          border: 1px solid #dd891c;
          color: #ffaa31;
        }
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
        background: #c51313;
      }
    }
  }
}
</style>
