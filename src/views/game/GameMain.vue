<template>
  <section class="game-mian" v-if="mainShow">
    <!--开奖区-->
    <game-issue></game-issue>

    <game-method></game-method>
    <!-- 娱乐城 -->
    <GameYlc v-if="currentLottery.en_name === 'bjxy28'"></GameYlc>
  </section>
</template>
<script>
import GameIssue from './GameIssue'
import GameMethod from './GameMethod'
import GameYlc from '../../components/game/ylc'
import { mapGetters } from 'vuex'
export default {
  name: 'game-main',
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
    }
  },
  computed: {
    ...mapGetters(['currentLottery', 'lotteryAll', 'bet', 'isLogin']),
  },
  watch: {
    'lotteryAll': {
      handler(newVal){
        if(Object.keys(newVal).length){
          this.getLotteryInfo(newVal)
        }
      },
      immediate: true
    }
  },
  created() {
    this.chengePlay()
  },
  methods: {
    //切换娱乐城
    chengePlay() {
      let json = {
        name: 'official',
        index: 0
      }
      this.$store.commit('chengeYlcPlays', json)
    },
    //获取所有彩种
    getLotteryInfo(lotteryAll) {
      let lottery = lotteryAll[this.lotterySign]
      lottery.methodConfig2 = [
        {
          name: '整合',
          rows: [
            {
              name: '直选',
              sign: 'zhixuan',
              methods: [{ method_id: 'ZH', method_name: '整合' }]
            }
          ],
          sign: 'ZH'
        },
        {
          name: '两面盘',
          rows: [
            {
              name: '直选',
              sign: 'zhixuan',
              methods: [{ method_id: 'LMP', method_name: '两面盘' }]
            }
          ],
          sign: 'LMP'
        },
        {
          name: '第一球',
          rows: [
            {
              name: '直选',
              sign: 'zhixuan',
              methods: [{ method_id: 'DYQ', method_name: '第一球' }]
            }
          ],
          sign: 'DYQ'
        },
        {
          name: '第二球',
          rows: [
            {
              name: '直选',
              sign: 'zhixuan',
              methods: [{ method_id: 'DEQ', method_name: '第二球' }]
            }
          ],
          sign: 'DEQ'
        },
        {
          name: '第三球',
          rows: [
            {
              name: '直选',
              sign: 'zhixuan',
              methods: [{ method_id: 'DSQ', method_name: '第三球' }]
            }
          ],
          sign: 'DSQ'
        },
        {
          name: '第四球',
          rows: [
            {
              name: '直选',
              sign: 'zhixuan',
              methods: [{ method_id: 'DSIQ', method_name: '第四球' }]
            }
          ],
          sign: 'DSIQ'
        },
        {
          name: '第五球',
          rows: [
            {
              name: '直选',
              sign: 'zhixuan',
              methods: [{ method_id: 'DWQ', method_name: '第五球' }]
            }
          ],
          sign: 'DWQ'
        },
        {
          name: '龙虎斗',
          rows: [
            {
              name: '直选',
              sign: 'zhixuan',
              methods: [{ method_id: 'LHD', method_name: '龙虎斗' }]
            }
          ],
          sign: 'LHD'
        },
        {
          name: '全五中一',
          rows: [
            {
              name: '直选',
              sign: 'zhixuan',
              methods: [{ method_id: 'QWZY', method_name: '全五中一' }]
            }
          ],
          sign: 'QWZY'
        }
      ]
      this.$store.commit('currentLottery', lottery.lottery)
      this.$store.commit('defaultGroup', lottery.defaultGroup)
      this.$store.commit('defaultMethod', lottery.defaultMethod)
      this.$store.commit('allMethods', lottery.methodConfig)
      this.$store.commit('issueHistory', [])
      this.$store.dispatch('issueHistory')
      this.mainShow = true
    }
  }
}
</script>
