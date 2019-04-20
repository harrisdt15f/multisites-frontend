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
          <div class="lottery-tip">
            提示：<em v-html="descs"></em>
          </div>
        </div>
        <div class="trend-info">
          <a href="javascript:;" target="_blank" class="trend"><span>开奖趋势</span></a>
          <a class="trend info" target="_blank" href="javascript:;"><span>开奖说明</span></a>
        </div>
      </div>
      <section class="notice">
        <img src="../../assets/images/bet/bet-notice.png" class="notice-img"><span class="fl">:</span>
        <div class="game-header-inform" id="meque">
          <p class="a" id="meque_text">{{scrollNotice && scrollNotice.content ? scrollNotice.content : '暂无公告'}}</p>
        </div>
      </section>
    </section>
    <section class="game-header-r j-hide">
      <div class="game-header-r-t clearfix">
        <span class="span">彩种公告</span>
        <a href="javascript:void(0)" class="a">更多&gt;&gt;</a>
      </div>
      <ul class="game-header-r-c">
        <li data-id="412"  v-for="(item, index) in lotteryNotice" :key="index">
          <span class="dot"></span>
          <a href="javascript:void(0)" class="a">{{item.title}}</a>
          <span class="date">{{item.start_day}}</span>
        </li>
        <li v-if="lotteryNotice.length === 0">
           暂无公告
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
        'issueInfo',
        'bet'
      ])
    },
    data() {
        return {
          descs: '',
          lotteryNotice: [],
          scrollNotice: [],
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
      // 开奖号码下的 提示语
      if (this.$route.query && this.$route.query.desc) {
        this.descs = this.$route.query.desc
      } else {
        this.lotteryList()
      }
      this.getIssue()
      this.getLottery()
    },
   mounted () {
      // 滚动公告
     this.getNoticeList()
      this.Animation.notice('meque', 'meque_text', -1)
   },
    watch: {
      // 开奖号码下的 提示语
      'bet.issueDesc' (newVal) {
        this.descs = newVal
      },
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
      // 获取提示语
      lotteryList () {
        this.Api.getLotteryList().then((res) => {
          if (res.isSuccess) {
            let data = res.data
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < data[i].list.length; j++) {
                if (data[i].list[j].id === this.$route.params.lotterySign) {
                  this.descs = data[i].list[j].desc
                }
              }
            }
          }
        })
      },
      // 获取公告列表  彩种右侧公告 和 彩种滚动公告
      getNoticeList () {
        this.Api.getNoticeList().then(res => {
          if (res.isSuccess) {
            this.lotteryNotice = res.data.list
            this.scrollNotice = res.data.roll
          }
        })
      },
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
                // 更新历史开奖记录
                this.$store.dispatch('issueHistory')
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
            this.issueNum = 0
            // this.issueInfo = res.data.issueInfo
            // 开始倒计时
            this.times()
          }
        })
      },
      times () {
        // 当前 奖期倒计时
        let [
          time = 0,
        ] = []
        time = this.issueInfo[this.issueNum].end_time - new Date().getTime() / 1000
        let hour = 0
        let minute = 0
        let second  = time
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

  .notice {
    background:#fff;
    overflow:hidden;
    margin-top:1px;
    line-height: 38px;
  }
  .notice-img {
    float: left;
    margin: 12px 4px 0 5px;
  }
  #meque {
    width: 831px;
    height: 40px;
    line-height: 40px;
    margin-left:5px;
    overflow: hidden;
    position: relative;
    float:left;
  }
  #meque_text {
    white-space: nowrap;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
  }
</style>