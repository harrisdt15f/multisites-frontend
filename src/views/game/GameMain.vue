<template>
  <section v-if="mainShow">
    <!--开奖区-->
    <game-issue></game-issue>

    <game-method></game-method>

    <GameYlc v-if="currentLottery.en_name === 'bjxy28'"></GameYlc>
  </section>
</template>
<script>
import GameIssue from "./GameIssue";
import GameMethod from "./GameMethod";
import GameYlc from "../../components/game/ylc";
import { mapGetters } from "vuex";
export default {
  name: "game-main",
  components: {
    GameMethod,
    GameIssue,
    GameYlc
  },
  props: {
    lotterySign: String
  },
  data() {
    return {
      mainShow: false,
      historyIssueList: []
    };
  },
  computed: {
    ...mapGetters(["currentLottery", "lotteryAll", "bet"])
  },
  created() {
    this.$store.dispatch("issueHistory");
    this.getLotteryInfo();
    this.mainShow = true;
  },
  methods: {
    getLotteryInfo() {
      const lottery = this.lotteryAll[this.lotterySign];
      this.$store.commit("currentLottery", lottery.lottery);
      this.$store.commit("defaultGroup", lottery.defaultGroup);
      this.$store.commit("defaultMethod", lottery.defaultMethod);
      this.$store.commit("allMethods", lottery.methodConfig);
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/game.css";
</style>
