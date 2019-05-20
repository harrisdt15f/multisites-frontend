<template>
  <section class="game-header w fw">
    <section class="game-header-l">
      <section class="game-header-w">
        <section class="game-header-s">
          <h2 class="logo-lottery">
            {{currentLottery.cn_name}}
          </h2>
        </section>
        <section class="game-lottery">
          <section class="win-issue">
            <span class="music open"></span>
            <br>
            第 {{notice.issue ? notice.issue : currentIssue.issue_no}} 期
          </section>
          <section class="deadline">投注截止： {{ time }}</section>
          <section class="c333 lottery-text">
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
          </section>
        </section>
        <section class="trend-info">
          <span class="trend">开奖趋势</span>
          <span class="trend info">开奖说明</span>
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
import { mapGetters } from "vuex";
export default {
  name: "game-issue",
  computed: {
    ...mapGetters(["currentLottery", "lotteryAll", "issueInfo", "bet"])
  },
  props: {
    lotterySign: String
  },
  data() {
    return {
      descs: "",
      lotteryNotice: [],
      scrollNotice: [],
      currentIssue: {},
      lastIssue: {},
      issueNum: 0,
      time: null,
      currentIssueTimer: null,
      notice: {
        issue: "",
        time: 3,
        show: false
      }
    };
  },
  mounted() {
    this.getIssue()
    this.getLottery()
    // 滚动公告
    this.getNoticeList();
    this.Animation.notice("meque", "meque_text", -1);
  },
  methods: {
    // 获取提示语
    lotteryList() {
      this.Api.getLotteryList().then(res => {
        if (res.success) {
          let [
            data = res.data.data,
            sign = this.$route.params.lotterySign
          ] = [];

          for (const k of data) {
            for (const i of k.list) {
              if (i.id === sign) {
                this.descs = i.desc;
              }
            }
          }
        }
      });
    },
    // 获取公告列表  彩种右侧公告 和 彩种滚动公告
    getNoticeList() {
      this.Api.getNoticeList().then(res => {
        if (res.success) {
          this.lotteryNotice = res.data.list;
          this.scrollNotice = res.data.roll;
        }
      });
    },
    // 获取开奖结果
    getLottery() {
      this.Api.getOpenAward(this.lotterySign).then(res => {
        if (res.success) {
          this.currentIssue = res.data.currentIssue;
          res.data.lastIssue.open_code = res.data.lastIssue.open_code.split(
            ","
          );
          this.lastIssue = res.data.lastIssue;
          let [timer = null] = [];
          timer = setInterval(() => {
            let [
              currTime = res.data.currentIssue.open_time,
              nowTime = new Date().getTime() / 1000
            ] = [];
            if (currTime - parseInt(nowTime) === 0) {
              clearInterval(timer);
              // 更新历史开奖记录
              this.$store.dispatch("issueHistory");
              this.getLottery();
            }
          }, 1000);
        }
      });
    },
    // 当前所在奖期
    getIssue() {
      this.Api.getOpenAward(this.lotterySign).then(res => {
        if (res.success) {
          this.$store.commit("issueInfo", res.data.issueInfo);
          this.issueNum = 0;
          // this.issueInfo = res.data.issueInfo
          // 开始倒计时
          this.times();
        }
      });
    },
    times() {
      // 当前 奖期倒计时
      let [time = 0] = [];
      time =
        this.issueInfo[this.issueNum].end_time - new Date().getTime() / 1000;
      let hour = 0;
      let minute = 0;
      let second = time;
      this.notice.issue = this.issueInfo[this.issueNum].issue_no;
      this.$store.commit("currentIssue", this.issueInfo[this.issueNum]);
      this.currentIssueTimer = setInterval(() => {
        // 计算 倒计时
        time -= 1;
        if (time >= 0) {
          this.time = this.Utils.formatSeconds(time);
        } else {
          clearInterval(this.currentIssueTimer);
          this.issueNum += 1;
          this.$store.commit("currentIssue", this.issueInfo[this.issueNum]);
          this.notice.show = true;
          this.times();
          if (this.issueNum === this.issueInfo.length) {
            this.getIssue();
          }
        }
      }, 1000);
    }
  }
};
</script>
