<template>
  <div class="bet-record sub-account">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="(item, index) in lotteryLists"
        :key="index"
        :label="item.name"
        :name="item.sign"
      >
        <div class="slider">
          奖金组:
          <el-slider
            @change="sliderChange"
            v-model="countPrize"
            :min="prizes.min"
            :max="prizes.max"
          ></el-slider>
          {{countPrize}} / {{prizes.max}}
        </div>
        <div class="list-table"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import methods from '../../../lib/config/method'
import prizes from '../../../lib/config/prizes'

export default {
  data() {
    return {
      activeName: '',
      // 奖金计算
      prizes: {},
      list: [],
      methodList: null,
      countPrize: null
    }
  },
  computed: {
    ...mapGetters(['lotteryAll', 'lotteryLists', 'userDetail']),
    gameId() {
      const gameIdArr = []
      for (const key in this.lotteryLists) {
        const listArr = []
        if (this.lotteryLists.hasOwnProperty(key)) {
          const element = this.lotteryLists[key]
          element.list.forEach(val => {
            listArr.push(val.number_id)
          })
        }
        gameIdArr.push(listArr)
      }
      return gameIdArr
    }
  },
  created() {
    this.activeName = Object.keys(this.lotteryLists)[0]
    this.prizes.min = parseInt(this.userDetail.min_prize_group)
    this.prizes.max = parseInt(this.userDetail.prize_group)
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.list = []
      const methodList = methods[this.activeName].official
      for (const key in methodList) {
        if (methodList.hasOwnProperty(key)) {
          const element = methodList[key]
          this.list.push({
            name: element.name,
            level: '一等奖',
            amount: this.countPrizes(element.method)
          })
        }
      }
      console.log(this.list)
    },
    countPrizes(methodName) {
      let [
        seriesId = this.activeName,
        diff = 0,
        prize = prizes[this.activeName]['official'][methodName],
        count = 0,
        arr = []
      ] = []
      for (const k of this.gameId) {
        for (const i of k) {
          if (!prize) return
          if (
            i === 20 ||
            i === 17 ||
            i === 71 ||
            seriesId === 'sd' ||
            seriesId === 'ssl' ||
            seriesId === 'p3p5'
          ) {
            diff = 30
          } else if (seriesId === 'lotto') {
            diff = 20
          }
          // 单个奖金时
          if (!Array.isArray(prize.count)) {
            count =
              (((1 * 2) /
                (prize.count / prize.total)) *
                (this.countPrize - diff)) /
                2000 +
              0.00000001
            this.typeGroup = 'auto'
            return this.Utils.toFixed(String(count))
          }

          // 奖金为多个奖级时  数组
          else {
            for (const j of Object.keys(prize.count)) {
              let json = {}

              count =
                (((1 * 2) /
                  (prize.count[j] / prize.total)) *
                  (this.countPrize - diff)) /
                  2000 +
                0.00000001

              json.value = j
              if (this.currentMethodGroup === 'LH') {
                if (+j === 0) {
                  json.label =
                    '和 ' + this.Utils.toFixed(String(count)) + ' 元'
                } else if (+j === 1) {
                  json.label =
                    '龙虎 ' + this.Utils.toFixed(String(count)) + ' 元'
                }
              } else {
                json.label =
                  +j + 1 + ' 等奖 ' + this.Utils.toFixed(String(count)) + ' 元'
              }
              json.prize = count
              arr.push(json)
            }
            this.typeGroup = '78px'
            this.prizeSelect = arr[0].label
            return arr
          }
        }
      }
    },
    handleTabClick(tab) {
      this.activeName = tab.name
      this.initData()
    },
    sliderChange(v) {
      console.log(v)
    }
  }
}
</script>
<style lang="scss" scoped>
.bet-record {
  .container {
    padding: 0 35px 35px;
  }
  /deep/ {
    .el-input--mini .el-input__inner {
      height: 28px;
    }
    .el-slider {
      width: 250px;
    }
  }
  .slider {
    text-align: center;
  }
}
</style>
