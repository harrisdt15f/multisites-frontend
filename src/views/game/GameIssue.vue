<template>
  <section class="game-header w fw">
    <section class="game-header-l">
      <section class="game-header-w">
        <section class="game-header-s">
          <h2 class="logo-lottery">{{currentLottery.cn_name}}</h2>
        </section>
        <section class="game-lotterys">
          <div class="deadline" v-if="currentIssue">
            <div class="deadline-text">
              第
              <strong>{{notice.issue ? notice.issue : currentIssue.issue_no}}</strong>期
              <br>投注截止
            </div>
            <div class="deadline-number">
              <em class="min-left">
                <b class="deadline-number-mask"></b>
                <span class="deadline-num deadline-num-next-t">
                  <span class="inner">{{this.time[0] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-next-b">
                  <span class="inner">{{this.time[0] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-t">
                  <span class="inner">{{this.time[0] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-b">
                  <span class="inner">{{this.time[0] || 0}}</span>
                </span>
              </em>
              <em class="min-right">
                <b class="deadline-number-mask"></b>
                <span class="deadline-num deadline-num-next-t">
                  <span class="inner">{{this.time[1] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-next-b">
                  <span class="inner">{{this.time[1] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-t">
                  <span class="inner">{{this.time[1] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-b">
                  <span class="inner">{{this.time[1] || 0}}</span>
                </span>
              </em>
              <span class="space1">:</span>

              <em class="min-left">
                <b class="deadline-number-mask"></b>
                <span class="deadline-num deadline-num-next-t">
                  <span class="inner">{{this.time[3] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-next-b">
                  <span class="inner">{{this.time[3] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-t">
                  <span class="inner">{{this.time[3] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-b">
                  <span class="inner">{{this.time[3] || 0}}</span>
                </span>
              </em>
              <em class="min-right">
                <b class="deadline-number-mask"></b>
                <span class="deadline-num deadline-num-next-t">
                  <span class="inner">{{this.time[4] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-next-b">
                  <span class="inner">{{this.time[4] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-t">
                  <span class="inner">{{this.time[4] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-b">
                  <span class="inner">{{this.time[4] || 0}}</span>
                </span>
              </em>
              <span class="space1">:</span>

              <em class="sec-left">
                <b class="deadline-number-mask"></b>
                <span class="deadline-num deadline-num-next-t">
                  <span class="inner">{{this.time[6] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-next-b">
                  <span class="inner">{{this.time[6] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-t">
                  <span class="inner">{{this.time[6] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-b">
                  <span class="inner">{{this.time[6] || 0}}</span>
                </span>
              </em>
              <em class="sec-right min-left-anim">
                <b class="deadline-number-mask"></b>
                <span class="deadline-num deadline-num-next-t">
                  <span class="inner">{{this.time[7] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-next-b">
                  <span class="inner">{{this.time[7] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-t">
                  <span class="inner">{{this.time[7] || 0}}</span>
                </span>
                <span class="deadline-num deadline-num-b">
                  <span class="inner">{{this.time[7] || 0}}</span>
                </span>
              </em>
            </div>
          </div>
          <div class="game-lottery">
            <div class="deadline">
              <div class="deadline-text">
                第
                <strong>
                  <template>{{lastIssue.issue_no}}</template>
                </strong>期
                <br>开奖号码
              </div>
            </div>
            <div class="lottery-number">
              <em v-for="(item, index) in lastIssue.open_code" :key="index">{{item || '-'}}</em>
              <div v-if="lastIssue.issue_no === '---------'" class="lottery-animate">
                <span>开</span>
                <span>奖</span>
                <span>中</span>
                <span>...</span>
              </div>
            </div>
            <!-- <section class="c333 lottery-text">
                <span class="red">上期开奖号码</span>
                第 {{lastIssue.issue_no}} 期
                <span class="official-win">官方开奖</span>
              </section>
              <section class="tc lottery-number">
                <em class="num" v-for="(item, index) in lastIssue.open_code" :key="index">
                  <span class="num-bg">{{item}}</span>
                </em>
              </section>
              <section class="lottery-tip">
                提示：
                <em class="desc" v-html="descs"></em>
            </section>-->
          </div>
          <!-- <section class="deadline">投注截止： {{ time }}</section> -->
        </section>
        <section class="trend-info">
          <router-link class="trend" tag="span" to="/user-trends" >
            <i class="fa fa-line-chart" aria-hidden="true"></i>
            <br>开奖趋势
          </router-link>
          <span class="trend info">
            <i class="fa fa-trophy" aria-hidden="true"></i>
            <br>开奖说明
          </span>
        </section>
      </section>
    </section>
    <section class="msg-notice-bg" v-if="notice.show">
      <section class="msg-notice">
        <strong>当前已进入</strong>
        <br>
        <strong class="red">{{notice.issue}}</strong>
        <br>
        <strong>请留意期号变化({{notice.time}})</strong>
      </section>
    </section>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'game-issue',
  computed: {
    ...mapGetters(['currentLottery', 'lotteryAll', 'issueInfo', 'bet', 'currentIssue'])
  },
  props: {
    lotterySign: String
  },
  data() {
    return {
      descs: '',
      lotteryNotice: [],
      scrollNotice: [],
      lastIssue: {
        issue_no: '---------',
        open_code: ['-', '-', '-', '-', '-']
      },
      issueNum: 0,
      time: '--:--:--',
      currentIssueTimer: null,
      notice: {
        issue: '',
        time: 3,
        show: false
      }
    }
  },
  mounted() {
    this.getIssue()
    this.getLottery()
    
    // 滚动公告
    // this.getNoticeList();
    this.Animation.notice('meque', 'meque_text', -1)
  },
  watch: {
     'notice.show' (newVal) {
        let timer = null
        if (newVal) {
          setTimeout(() => {
            timer = setInterval(() => {
              this.notice.time -= 1
              if (this.notice.time === 0) {
                clearInterval(timer)
                this.notice.show = false
                this.notice.time = 3
              }
            }, 1000)
          }, 1)
        }
      }
  },
  methods: {
    // 获取提示语
    lotteryList() {
      this.Api.getLotteryList().then(res => {
        if (res.success) {
          let [
            data = res.data.data,
            sign = this.$route.params.lotterySign
          ] = []

          for (const k of data) {
            for (const i of k.list) {
              if (i.id === sign) {
                this.descs = i.desc
              }
            }
          }
        }
      })
    },
    // 获取公告列表  彩种右侧公告 和 彩种滚动公告
    getNoticeList() {
      this.Api.getNoticeList().then(res => {
        if (res.success) {
          this.lotteryNotice = res.data.list
          this.scrollNotice = res.data.roll
        }
      })
    },
    // 获取开奖结果
    getLottery() {
      this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
        if (res.success) {
          this.$store.commit('currentIssue', res.data.currentIssue)
          res.data.lastIssue.open_code = res.data.lastIssue.open_code.split('')
          this.lastIssue = res.data.lastIssue
          let [timer = null] = []
          timer = setInterval(() => {
            let [
              currTime = res.data.currentIssue.open_time,
              nowTime = new Date().getTime() / 1000
            ] = []
            if (currTime - parseInt(nowTime) === 0) {
              clearInterval(timer)
              // 更新历史开奖记录
              this.$store.dispatch('issueHistory')
              this.getLottery()
            }
          }, 1000)
        }
      })
    },
    // 当前所在奖期
    getIssue() {
      this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
        if (res.success) {
          this.$store.commit('currentIssue', res.data.currentIssue)
          this.$store.commit('issueInfo', res.data.issueInfo)
          
          this.issueNum = 0
  
          if (res.data.issueInfo.length === 0 || !res.data.issueInfo) {
            return
          }
          // 开始倒计时
          this.times()
        }
      })
    },
    times() {
      // 当前 奖期倒计时
      let [time = 0] = []
      time = this.issueInfo[this.issueNum].end_time - new Date().getTime() / 1000
      this.notice.issue = this.issueInfo[this.issueNum].issue_no
      this.$store.commit('currentIssue', this.issueInfo[this.issueNum])
      this.currentIssueTimer = setInterval(() => {
        // 计算 倒计时
        time -= 1
        if (time >= 0) {
          this.time = this.Utils.formatSeconds(time)
        } else {
          clearInterval(this.currentIssueTimer)
          this.issueNum += 1
          this.$store.commit('currentIssue', this.issueInfo[this.issueNum])
          this.notice.show = true
          this.times()
          this.$store.dispatch('getUserDetail')
          this.$store.dispatch('betHistory')
          this.getIssue()
          // if (this.issueNum === this.issueInfo.length) {
          //   this.getIssue()
          // }
        }
      }, 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.currentIssueTimer)
  }
}
</script>
<style lang="scss" scoped>
.game-lotterys {
  float: left;
  width: 810px;
  line-height: 1.15;
  display: flex;
  justify-content: space-around;
  .game-lottery {
    margin-left: 15px;
    flex: 1;
    line-height: 1.15;
  }
  .deadline {
    padding: 0;
    margin: 0;
    margin-left: 30px;
    background-color: transparent;
    _display: unset;
    box-shadow: unset;
    border-radius: unset;
    .deadline-number-mask {
      position: absolute;
      left: 0;
      width: 24px;
      height: 17px;
      border-bottom: none;
      border-radius: 3px 3px 0 0;
      z-index: 60;
    }
    .deadline-text {
      float: left;
      margin: 26px 10px 0 0;
      width: 128px;
      font-weight: normal;
      letter-spacing: 0px;
      color: #4f4948;
      font-size: 14px;
      text-align: end;
      font-family: inherit;
      strong {
        font-size: 16px;
        color: #4f4948;
        font-weight: normal;
        margin: 0 3px;
        display: inline-block;
      }
    }
    .deadline-number {
      float: left;
      margin-left: 0;
      margin-top: 28px;
      font-size: 34px;
      .deadline-num {
        line-height: 36px;
        font-family: microsoft yahei;
        font-size: 32px;
        font-weight: 100;
        color: #e2e2e2;
        position: absolute;
        left: 0;
        top: 0;
        width: 24px;
        height: 34px;
        overflow: hidden;
        text-indent: 10px;
        box-shadow: none;
        text-shadow: none;
      }
      em {
        text-align: center;
        position: relative;
        width: 24px;
        height: 34px;
        margin-right: 2px;
        border-width: 1px;
        border-style: solid;
        background-image: none;
        background-color: #000;
        border-radius: 3px;
        box-shadow: none;
        border: 0;
        color: #e2e2e2;
      }
      .inner {
        position: absolute;
        height: 100%;
        width: 100%;
        left: -6px;
        font-family: Hei;
      }
      .deadline-num-next-t {
        height: 17px;
        overflow: hidden;
        background-image: none;
        background-color: #000;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 0;
      }
      .deadline-num-next-b {
        height: 17px;
        overflow: hidden;
        top: 18px;
        z-index: 50;
        background-image: none;
        background-color: #333;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        border: 0;
        transform: rotateX(-90deg);
        transform-origin: left top 0;
        .inner {
          position: absolute;
          background: none;
          top: -18px;
        }
      }
      .deadline-num-t {
        height: 17px;
        top: 0;
        z-index: 50;
        background-image: none;
        background-color: #000;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 0;
        transform: rotateX(0deg);
        transform-origin: left bottom 0;
      }
      .deadline-num-b {
        height: 17px;
        top: 18px;
        background-image: none;
        background-color: #000;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        border: 0;
      }
    }
  }
}
.deadline-number .deadline-num-b .inner {
  top: -18px;
}
.deadline-number em,
.deadline-number span.space1 {
  font-weight: 700;
  float: left;
  width: 10px;
  height: 34px;
  color: #000;
  padding-left: -2px;
  text-indent: unset;
  line-height: 25px;
}
.lottery-number {
  margin-left: 12px;
  margin-top: 8px;
  em {
    float: left;
    width: 50px;
    height: 51px;
    color: #57576b;
    font-size: 32px;
    text-align: center;
    background: url("../../assets/images/lottery/pic_ball.png") no-repeat;
    font-size: 26px;
    color: black;
    margin-right: 5px;
    line-height: 50px;
    text-align: center;
    font-family: inherit;
  }
}
.lottery-animate {
  font-size: 12px;
  color: #57576b;
}
</style>
