<template>
  <div class="bet-record sub-account">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="(item, index) in lotteryLists"
        :lazy="true"
        :key="index"
        :label="item.name"
        :name="item.sign"
      >
        <div class="slider">
          奖金组:
          <el-slider
            :disabled="prizes.min == prizes.max"
            @change="sliderChange"
            v-model="countPrize"
            :min="prizes.min"
            :max="prizes.max"
          ></el-slider>
          {{countPrize}} / {{prizes.max}}
        </div>
        <div class="list-table">
          <el-table :span-method="objectSpanMethod" border :data="list" style="width: 100%">
            <el-table-column prop="name" label="玩法" align="center"></el-table-column>
            <el-table-column prop="level" label="奖级" align="center"></el-table-column>
            <el-table-column prop="amount" label="奖金" align="center"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import prizes from '../../../lib/config/prizes';

export default {
  data() {
    return {
      activeName: '',
      showTable: false,
      // 奖金计算
      prizes: {},
      list: [],
      methodList: null,
      countPrize: null,
      // 合并列数列表
      spanArr: []
    };
  },
  computed: {
    ...mapGetters(['lotteryAll', 'lotteryLists', 'userDetail']),
    gameId() {
      const gameIdArr = [];
      for (const key in this.lotteryLists) {
        const listArr = [];
        if (this.lotteryLists.hasOwnProperty(key)) {
          const element = this.lotteryLists[key];
          element.list.forEach(val => {
            listArr.push(val.number_id);
          });
        }
        gameIdArr.push(listArr);
      }
      return gameIdArr;
    }
  },
  created() {
    this.activeName = Object.keys(this.lotteryLists)[0];
    this.prizes.min = parseInt(this.userDetail.min_prize_group);
    this.prizes.max = parseInt(this.userDetail.prize_group);
    this.countPrize = this.prizes.max;
  },
  mounted() {
    this.handleTabClick()
  },
  methods: {
    // 初始化数据
    initData() {
      this.list = [];
      let initList = [];
      const methodLists = this.lotteryAll[
        this.lotteryLists[this.activeName].list[0]['id']
      ]['methodConfig'];
      methodLists.forEach(e => {
        e.rows.forEach(el => {
          initList.push(...el.methods);
        });
      });
      // 展开分级奖金
      initList.forEach(v => {
        const amount = this.countPrizes(v.method_id);
        if (this._.isArray(amount)) {
          amount.forEach(a => {
            this.list.push({
              name: v.method_name,
              level: a.label,
              amount: a.value
            });
          });
        } else {
          this.list.push({
            name: v.method_name,
            level: '1等奖',
            amount: amount
          });
        }
      });
    },
    // 计算奖金
    countPrizes(methodName) {
      let [
        seriesId = this.activeName,
        diff = 0,
        prize = prizes[this.activeName]['official'][methodName],
        count = 0,
        arr = []
      ] = [];
      for (const k of this.gameId) {
        for (const i of k) {
          if (!prize) return;
          if (
            i === 20 ||
            i === 17 ||
            i === 71 ||
            seriesId === 'sd' ||
            seriesId === 'ssl' ||
            seriesId === 'p3p5'
          ) {
            diff = 30;
          } else if (seriesId === 'lotto') {
            diff = 20;
          }
          // 单个奖金时
          if (!Array.isArray(prize.count)) {
            count =
              (((1 * 2) / (prize.count / prize.total)) *
                (this.countPrize - diff)) /
                2000 +
              0.00000001;
            this.typeGroup = 'auto';
            return this.Utils.toFixed(String(count));
          }

          // 奖金为多个奖级时  数组
          else {
            for (const j of Object.keys(prize.count)) {
              let json = {};

              count =
                (((1 * 2) / (prize.count[j] / prize.total)) *
                  (this.countPrize - diff)) /
                  2000 +
                0.00000001;

              json.value = this.Utils.toFixed(String(count));
              if (this.currentMethodGroup === 'LH') {
                if (+j === 0) {
                  json.label = '和 ';
                } else if (+j === 1) {
                  json.label = '龙虎 ';
                }
              } else {
                json.label = +j + 1 + ' 等奖 ';
              }
              json.prize = count;
              arr.push(json);
            }
            return arr;
          }
        }
      }
    },
    handleTabClick() {
      this.activeName = this.activeName;
      this.countPrize = this.prizes.max;
      this.initData();
      this.getSpanArr(this.list);
    },
    sliderChange() {
      this.initData();
    },
    // 计算合并列数
    getSpanArr(data) {
      this.spanArr = []
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].name === data[i - 1].name) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 合并第一列
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    }
  }
};
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
    margin: 15px 0 15px;
  }
  .list-table {
    padding: 30px;
  }
}
</style>
