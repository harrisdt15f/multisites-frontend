<template>
  <section class="game-header w fw">
    <section class="game-header-l">
      <div class="game-header-w">
        <div class="game-header-s">
          <div class="logo-lottery">
            <div class="text">{{currentLottery.cn_name}}</div>
          </div>
          <div class="win-issue">
            <div class="win-issue-s"><span class="open"></span></div>
            <div class="text">第 {{notice.issue ?  notice.issue : currentIssue.issue_no}} 期</div>
          </div>
          <div class="deadline">
            <div class="deadline-text">投注截止：</div>
            {{ time }}
          </div>
        </div>
        <div class="game-lottery">
          <div class="lottery-text">
            <span class="prev-win">上期开奖号码</span>
            <span class="prev-date">第<span class="num">{{lastIssue.issue_no}}</span>期</span>
            <span class="official-win"  style="visibility: visible;">官方开奖</span>
          </div>
          <div class="lottery-number-w">
            <div id="J-lottery-balls-lasttime" class="lottery-number">
              <em  v-for="(item, index) in lastIssue.open_code" :key="index">{{item}}</em>
            </div>
          </div>
          <div class="lottery-tip">提示：当天 <span class="col">00</span> 点至 <span class="col">23</span> 点 &nbsp; 当日共有
            <span class="col">59</span> 期
          </div>
        </div>
        <div class="trend-info">
          <a href="javascript:;" target="_blank" class="trend"><span>开奖趋势</span></a>
          <a class="trend info" target="_blank" href="javascript:;"><span>开奖说明</span></a>
        </div>
      </div>
      <div class="game-header-inform">
        <a href="javascript:void(0)" class="a">尊敬的玩家：您好应广大玩家强烈要求，平台隆重推出《腾讯5分彩》以及《腾讯时时彩》，开奖号码完全依据官方春秋娱乐平台运营部</a>
      </div>
    </section>
    <section class="game-header-r j-hide">
      <div class="game-header-r-t clearfix">
        <span class="span">彩种公告</span>
        <a href="javascript:void(0)" class="a">更多&gt;&gt;</a>
      </div>
      <ul class="game-header-r-c">
        <li data-id="412">
          <span class="dot"></span>
          <a href="javascript:void(0)" class="a">新彩种火爆上线</a>
          <span class="date">2019-04-12</span>
        </li>
        <li data-id="408">
          <span class="dot"></span>
          <a href="javascript:void(0)" class="a">新彩种火爆上线</a>
          <span class="date">2019-03-29</span>
        </li>
        <li data-id="378">
          <span class="dot"></span>
          <a href="javascript:void(0)" class="a">新彩种火爆上线</a>
          <span class="date">2018-12-03</span>
        </li>
        <li data-id="359">
          <span class="dot"></span>
          <a href="javascript:void(0)" class="a">新彩种火爆上线</a>
          <span class="date">2018-10-20</span>
        </li>
        <li data-id="342">
          <span class="dot"></span>
          <a href="javascript:void(0)" class="a">新彩种火爆上线</a>
          <span class="date">2018-08-02</span>
        </li>
      </ul>
    </section>
    <section class="msg-notice-bg" v-if="notice.show">
      <div class="msg-notice">
        <strong>当前已进入</strong><br>
        <strong class="red">{{notice.issue}}</strong><br>
        <strong>请留意期号变化({{notice.time}})</strong>
      </div>
    </section>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'game-issue',
    computed: {
      ...mapState([
        'currentLottery',
        'lotteryAll',
        'issueInfo'
      ])
    },
    data() {
        return {
          currentIssue: {},
          lastIssue: {},
          issueNum: 0,
          time: null,
          currentIssueTimer: null,
          notice: {
            issue: '',
            time: 3,
            show: false
          }
        }
    },
    created () {
      this.getIssue()
      this.getLottery()
    },
    watch: {
      'currentLottery' () {
        // 路由变化的时候更换彩种信息
        clearInterval(this.currentIssueTimer)
        this.getIssue()
        this.getLottery()
      },
      // 倒计时结束，进入当前奖期的弹出框
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
      // 获取开奖结果
      getLottery () {
        this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
          if (res.isSuccess) {
            this.currentIssue = res.data.currentIssue
            res.data.lastIssue.open_code  = res.data.lastIssue.open_code.split(',')
            this.lastIssue = res.data.lastIssue
            let [ timer = null ] = []
            timer = setInterval(() => {
              let [
                currTime = res.data.currentIssue.open_time,
                nowTime = new Date().getTime() / 1000
              ] = []
              if ( currTime - parseInt(nowTime) === 0) {
                clearInterval(timer)
                this.getLottery()
              }
            }, 1000)
          }
        })
      },
      // 当前所在奖期
      getIssue () {
        this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
          if (res.isSuccess) {
            this.$store.commit('issueInfo', res.data.issueInfo)
            // this.issueInfo = res.data.issueInfo
            // 开始倒计时
            this.times()
          }
        })
      },
      times () {
        // 当前 奖期倒计时
        let [
          time = this.issueInfo[this.issueNum].end_time - new Date().getTime() / 1000,
        ] = []
        let hour = 0
        let minute = 0
        let second  = time
        this.$store.commit('currentIssue', this.issueInfo[this.issueNum])
        this.currentIssueTimer = setInterval(() => {
          // 计算 倒计时
          time -= 1
          if (time >= 0) {
            second = time
            if (second > 60) {
              minute = second / 60
              second = second % 60
            }
            if (minute > 60) {
              hour = second / 60
              minute = minute % 60
            }
            this.time = parseInt(hour) + ':' + parseInt(minute)  + ':' + parseInt(second)
          } else {
            clearInterval(this.currentIssueTimer)
            this.issueNum += 1
            this.notice.issue = this.issueInfo[this.issueNum].issue_no
            this.notice.show = true
            this.times()
            if (this.issueNum === this.issueInfo.length) {
              this.getIssue()
            }
          }
        }, 1000)
      }
    }
}
</script>

<style scoped>
  .msg-notice-bg{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:999;
    background:rgba(0,0,0, .5);
  }
  .msg-notice{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin: auto;
    padding-top:10px;
    width:150px;
    height:100px;
    border:3px solid #666;
    border-radius:5px;
    color:#666;
    text-align: center;
    font-size:16px;
    background:#dedede;
    line-height:30px;
  }
  .red{
    color:red;
  }
</style>