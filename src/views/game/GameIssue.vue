<template>
  <section class="game-header w fw">
    <section class="game-header-l">
      <div class="game-header-w">
        <div class="game-header-s">
          <div class="logo-lottery">
            <div class="text">重庆时时彩</div>
          </div>
          <div class="win-issue">
            <div class="win-issue-s"><span class="open"></span></div>
            <div class="text">第 {{currentIssue.issue_no}} 期</div>
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
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'game-issue',
    computed: {
      ...mapState([
        'currentLottery',
        'lotteryAll'
      ])
    },
    data() {
        return {
          currentIssue: {},
          lastIssue: {},
          time: 0
        }
    },
    created () {
      this.getIssue()
    },
    watch: {
    },
    methods: {
      // 获取开奖历史   上期开奖 当期开奖
      getIssue () {
        this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
          if (res.isSuccess) {
            this.currentIssue = res.data.currentIssue
            res.data.lastIssue.open_code  = res.data.lastIssue.open_code.split(',')
            this.lastIssue = res.data.lastIssue
            let [
              timer = null,
              time = this.currentIssue.end_time - this.currentIssue.begin_time,
            ] = []
            // console.log(this.Utils.formatTime(time, 'HH:MM:SS'))
            let hour = 0;
            let minute = 0;
            let second = time;
            
  
            if (second > 60) {
              minute = second / 60
              second = second % 60
            }
            // if (minute > 60) {
            //   hour = minute / 60;
            //   minute = minute % 60;
            // }
            console.log(hour + ':' + minute  + ':' + second)
            timer = setInterval(() => {
              if (time >= 0) {
                time -= 1
              } else {
                clearInterval(timer)
              }
            }, 1000)
            // this.times()
          }
        })
      },
      times () {
      
      }
    }
}
</script>

<style scoped>

</style>