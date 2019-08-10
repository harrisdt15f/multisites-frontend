<template>
  <section class="game-header w fw">
    <section class="game-header-l">
      <section class="game-header-w">
        <section class="game-header-s">
          <h2 class="logo-lottery">{{currentLottery.cn_name}}</h2>
        </section>
        <section class="game-lotterys">
          <div class="deadline">
            <div class="deadline-text">
              第
              <strong>{{notice.issue ? notice.issue : currentIssue.issue_no}}</strong>期
              <br />投注截止
            </div>
            <div class="deadline-number" >
              <FlipDown
                :endDate="currentIssue.end_time"
                :type="3"
                :theme="2"
                @timeUp="handleTimeup"
              />
            </div>
          </div>
          <div class="game-lottery">
            <div class="deadline">
              <div class="deadline-text">
                第
                <strong>
                  <template>{{lastIssue.issue_no}}</template>
                </strong>期
                <br />开奖号码
              </div>
            </div>
            <div class="lottery-number">
              <div style="overflow:hidden">
                <!-- <em v-for="(item, index) in lastIssue.open_code" :key="index">{{item || '-'}}</em> -->
                <em :class="`open_code${index}`" v-for="(item, index) in lastIssue.open_code" :key="index">
                </em>
              </div>
              <div
                v-if="lastIssue.open_code && lastIssue.open_code[0] === '-'"
                class="lottery-animate">
                <span>开</span>
                <span>奖</span>
                <span>中</span>
                <span>...</span>
              </div>
            </div>
          </div>
          
        </section>
        <section class="trend-info">
          <router-link class="trend" tag="span" to="/user-trends">
            <i class="fa fa-line-chart" aria-hidden="true"></i>
            <br />开奖趋势
          </router-link>
          <span class="trend info">
            <i class="fa fa-trophy" aria-hidden="true"></i>
            <br />开奖说明
          </span>
        </section>
      </section>
    </section>
    <section class="msg-notice-bg" v-if="notice.show">
      <section class="msg-notice">
        <strong>当前已进入</strong>
        <br />
        <strong class="red">{{notice.issue}}</strong>
        <br />
        <strong>请留意期号变化({{notice.time}})</strong>
      </section>
    </section>
  </section>
</template>
<script>
import FlipDown from '../../components/public/flip-down'
import { Flip } from 'number-flip'

import { mapGetters } from 'vuex'
export default {
  name: 'game-issue',
  components: {
    FlipDown
  },
  computed: {
    ...mapGetters([
      'currentLottery',
      'lotteryAll',
      'issueInfo',
      'bet',
      'currentIssue'
    ])
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
    this.getLottery()
  },
  watch: {
    'notice.show'(newVal) {
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
    //开奖号码滚动
    filpOpenCode() {
      this.lastIssue.open_code.forEach((v, i) => {
        const $node = document.querySelector(`.open_code${i}`)
        $node.innerHTML = ''
        new Flip({
          node: $node,
          from: 0,
          to: v,
          duration: 2
        })
      })
    },
    // 获取开奖结果
    getLottery() {
      this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
        if (res.success) {
          this.$store.commit('currentIssue', res.data.currentIssue)
          this.$store.commit('issueInfo', res.data.issueInfo)
          if (res.data.lastIssue.open_code) {
            if (this.currentLottery.series_id === 'lotto') {
              res.data.lastIssue.open_code = res.data.lastIssue.open_code.split(
                ' '
              )
            } else {
              res.data.lastIssue.open_code = res.data.lastIssue.open_code.split(
                ''
              )
            }
          } else {
            res.data.lastIssue.open_code = ['-', '-', '-', '-', '-']
          }

          this.lastIssue = res.data.lastIssue
        }
      }).then(() => {
        this.filpOpenCode()
      })
    },
    getLastIssue() {
      this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
        if (res.success) {
          this.$store.commit('currentIssue', res.data.currentIssue)
          this.$store.commit('issueInfo', res.data.issueInfo)
          if (res.data.lastIssue.open_code) {
            if (this.currentLottery.series_id === 'lotto') {
              res.data.lastIssue.open_code = res.data.lastIssue.open_code.split(
                ' '
              )
            } else {
              res.data.lastIssue.open_code = res.data.lastIssue.open_code.split(
                ''
              )
            }
          } else {
            res.data.lastIssue.open_code = ['-', '-', '-', '-', '-']
          }
          this.lastIssue = res.data.lastIssue
        }
      }).then(() => {
        this.filpOpenCode()
      })
    },
    handleTimeup(){
      if(!this.currentIssue.end_time) return
        this.issueNum = 1
        this.$store.commit('currentIssue', this.issueInfo[this.issueNum])
        this.notice.issue = this.issueInfo[this.issueNum].issue_no
        this.notice.show = true
        this.$store.dispatch('getUserDetail')
        this.$store.dispatch('betHistory')
        setTimeout(() => {
          this.$store.dispatch('issueHistory')
          this.getLastIssue()
        }, 3000)
    }
  }
}
</script>
<style lang="scss" scoped>
.game-lotterys {
  float: left;
  width: 834px;
  line-height: 1.15;
  display: flex;
  justify-content: space-around;
  .game-lottery {
    margin-left: 5px;
    flex: 1;
    line-height: 1.15;
    overflow: hidden;
  }
  .deadline {
    float: left;
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
      width: 142px;
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
      margin-left: 5px;
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
  overflow: hidden;
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
  text-indent:4em;
  line-height: 1.5;
  font-size: 12px;
  color: #57576b;
}
</style>
