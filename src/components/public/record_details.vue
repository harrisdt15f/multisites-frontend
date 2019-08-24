<template>
  <el-dialog
    width="80%"
    class="record-detail"
    title="记录详情"
    :visible.sync="openStatus"
    @close="handleClose"
  >
    <template v-if="detailData">
      <!-- 投注记录详情 -->
      <div class="content" v-if="!isTraces">
        <div class="openball-result" v-if="detailData.open_number && detailData.open_number.length">
            <span
              class="item"
              v-for="(item, index) in detailData.open_number.split(lotteryLists[currentLottery.series_id]['encode_splitter'] || '')"
              :key="index"
            >{{item}}</span>
        </div>
        <div class="table-detail">
          <table width="100%" class="table-detail">
            <tbody>
              <tr>
                <td width="30%" align="right">游戏：</td>
                <td>
                  <span class="value">
                    {{lotteryAll[detailData.lottery_sign].lottery.cn_name}}
                  </span>
                </td>
                <td align="right">注单编号：</td>
                <td>
                  <span class="value">{{detailData.serial_number}}</span>
                </td>
              </tr>
              <tr>
                <td align="right">玩法：</td>
                <td>
                  <span class="value">{{detailData.method_name}}</span>
                </td>
                <td align="right">投注时间：</td>
                <td>
                  <span class="value">{{detailData.created_at}}</span>
                </td>
              </tr>
              <tr>
                <td align="right">期号：</td>
                <td>
                  <span class="value">{{detailData.issue}}</span>
                </td>
                <td align="right">倍数：</td>
                <td>
                  <span class="value">{{detailData.times}}倍</span>
                </td>
              </tr>

              <tr>
                <td align="right">模式：</td>
                <td>
                  <span class="value" v-if="detailData.mode === '1.0000'">元</span>
                  <span class="value" v-if="detailData.mode === '0.1000'">角</span>
                  <span class="value" v-if="detailData.mode === '0.0100'">分</span>
                </td>
                <td align="right">投注金额：</td>
                <td>
                  <span class="value">{{detailData.total_cost}}</span>
                </td>
              </tr>

              <tr>
                <td align="right">状态：</td>
                <td>
                  <span class="value" v-if="detailData.status == 0">待开奖</span>
                  <span class="value" v-if="detailData.status == 1">已撤销</span>
                  <span style="color:red" class="value" v-if="detailData.status == 2">未中奖</span>
                  <span class="value" v-if="detailData.status == 3">中奖</span>
                  <span style="color:green" class="value" v-if="detailData.status == 4">已派奖</span>
                  <span class="value" v-if="detailData.status == 5">管理员撤销</span>
                </td>
                <td align="right">奖金：</td>
                <td>
                  <span class="value">{{detailData.bonus}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="detail-row-cont">
          <div class="title">投注内容：</div>
          <el-input type="textarea" disabled :rows="4" v-model="bet_number"></el-input>
        </div>
        <div v-if="detailData.status == 0" style="text-align:center; margin-top:10px;">
          <el-button @click="handleCancelBet(detailData)">撤单</el-button>
        </div>
      </div>
      <!-- 追号记录详情 -->
      <div class="content" v-else>
        <div class="table-detail">
          <table width="100%" class="table-detail">
            <tbody>
              <tr>
                <td width="30%" align="right">游戏：</td>
                <td>
                  <span class="value">{{lotteryAll[detailData.lottery_sign].lottery.cn_name}}</span>
                </td>
                <td align="right">追号编号：</td>
                <td>
                  <span class="value">{{detailData.trace_serial_number}}</span>
                </td>
              </tr>
              <tr>
                <td align="right">玩法：</td>
                <td>
                  <span class="value">{{detailData.method_name}}</span>
                </td>
                <td align="right">追号时间：</td>
                <td>
                  <span class="value">{{detailData.created_at}}</span>
                </td>
              </tr>
              <tr>
                <td align="right">开始期号：</td>
                <td>
                  <span class="value">{{detailData.start_issue}}</span>
                </td>
                <td align="right">追号期数：</td>
                <td>
                  <span class="value">{{detailData.total_issues}}</span>
                </td>
              </tr>

              <tr>
                <td align="right">完成期数：</td>
                <td>
                  <span class="value">{{detailData.finished_issues}}</span>
                </td>
                <td align="right">取消期数：</td>
                <td>
                  <span class="value">{{detailData.canceled_issues}}</span>
                </td>
              </tr>

              <tr>
                <td align="right">追号金额：</td>
                <td>
                  <span class="value">{{detailData.total_price}}</span>
                </td>
                <td align="right">完成金额：</td>
                <td>
                  <span class="value">{{detailData.finished_amount}}</span>
                </td>
              </tr>

              <tr>
                <td align="right">取消金额：</td>
                <td>
                  <span class="value">{{detailData.canceled_amount}}</span>
                </td>
                <td align="right">中奖金额：</td>
                <td>
                  <span class="value">{{detailData.finished_bonus ? detailData.finished_bonus : '--'}}</span>
                </td>
              </tr>

              <tr>
                <td align="right">追号状态：</td>
                <td>
                  <span class="value">
                    <span class="value" v-if="detailData.status == 0">正在追号</span>
                    <span class="value" v-if="detailData.status == 1">追号完成</span>
                    <span class="value" v-if="detailData.status == 2">中奖停止</span>
                    <span class="value" v-if="detailData.status == 4">系统撤销</span>
                    <span class="value" v-if="detailData.status == 5">玩家撤销</span>
                  </span>
                </td>
                <td align="right">模式：</td>
                <td>
                  <span class="value" v-if="detailData.mode === '1.0000'">元</span>
                  <span class="value" v-if="detailData.mode === '0.1000'">角</span>
                  <span class="value" v-if="detailData.mode === '0.0100'">分</span>
                </td>
              </tr>

              <tr>
                <td align="right">追号奖金组：</td>
                <td>
                  <span class="value">{{detailData.bet_prize_group}}</span>
                </td>
                <td align="right">中奖后终止任务：</td>
                <td>
                  <span class="value">{{detailData.win_stop}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="detail-row-cont">
          <div class="title">投注内容：</div>
          <el-input type="textarea" disabled :rows="4" v-model="bet_number"></el-input>
        </div>
        <div style="text-align:center; margin-top:20px;" v-if="detailData.status == 0">
          <el-button @click="handleStopTrace(detailData)">终止追号</el-button>
        </div>
        <div class="trace-lists">
          <el-table :data="detailData.trace_lists" style="width: 80%;margin:30px auto">
            <el-table-column align="center" prop="issue" label="奖期" width="180"></el-table-column>
            <el-table-column align="center" label="投注内容" show-overflow-tooltip>
              <template slot-scope="scope">{{bet_number}}</template>
            </el-table-column>
            <el-table-column align="center" prop="times" label="追号倍数"></el-table-column>
            <el-table-column align="center" prop="total_price" label="投注金额	"></el-table-column>
            <el-table-column align="center" prop="address" label="追号状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">等待追号</span>
                <span v-if="scope.row.status == 1">正在追号</span>
                <span v-if="scope.row.status == 2">追号完成</span>
                <span v-if="scope.row.status == 3">玩家撤销</span>
                <span v-if="scope.row.status == 4">管理员撤销</span>
                <span v-if="scope.row.status == 5">系统撤销</span>
                <span v-if="scope.row.status == 6">中奖停止</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="中奖">
              <!-- <template slot-scope="scope"> -->
                <!-- {{scope.row.status}} -->
              <!-- </template> -->
            </el-table-column>
            <el-table-column align="center" label="操作	">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status == 0" @click="handleStopIssueTrace(scope.row)" type="text" size="mini">取消本期追号</el-button>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // 弹框显示
      openStatus: this.dialogVisible
    }
  },
  computed: {
    ...mapGetters(['currentLottery', 'lotteryAll', 'lotteryLists']),
    // 是否是追号
    isTraces() {
      return this.detailData.win_stop !== undefined
    },
    // 翻译字符
    bet_number() {
      if (this.detailData.series_id === 'pk10') {
        return this.detailData.bet_number
          .replace(/[0-9]/g, match=>{
            return parseInt(match) + 1
          })
      }
      if (this.detailData.method_group === 'DXDS') {
        return this.detailData.bet_number
          .replace(/&/g, ',')
          .replace(/(0)/g, '小')
          .replace(/(1)/g, '大')
          .replace(/(2)/g, '双')
          .replace(/(3)/g, '单')
      }
      if (this.detailData.method_group === 'LH') {
        return this.detailData.bet_number
          .replace(/&/g, ',')
          .replace(/(0)/g, '龙')
          .replace(/(1)/g, '虎')
          .replace(/(2)/g, '和')
      }
      if (
        this.detailData.method_sign === 'QTS3' || 
        this.detailData.method_sign === 'ZTS3' || 
        this.detailData.method_sign === 'HTS3'
      ) {
        return this.detailData.bet_number
          .replace(/&/g, ',')
          .replace(/(0)/g, '豹子')
          .replace(/(1)/g, '顺子')
          .replace(/(2)/g, '对子')
      }
      if (this.detailData.method_sign === 'LTDDS') {
        return this.detailData.bet_number
          .replace(/ /g, ',')
          .replace(/(0)/g, '零单五双')
          .replace(/(1)/g, '一单四双')
          .replace(/(2)/g, '二单三双')
          .replace(/(3)/g, '三单二双')
          .replace(/(4)/g, '四单一双')
          .replace(/(5)/g, '五单零双')
      }
      return this.detailData.bet_number.replace(/&/g, ',')
    }
  },
  watch: {
    dialogVisible(val) {
      this.openStatus = val
    }
  },
  props: ['dialogVisible', 'detailData'],
  methods: {
    // 关闭弹框
    handleClose() {
      this.$emit('close')
    },
    // 撤单
    handleCancelBet(item) {
      this.$confirm('你确认撤单么？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Api.cancelBet({ id: item.id }).then(({ success }) => {
          if (success) {
            this.$store.dispatch('betHistory')
            item.status = 1
            this.$message({
              type: 'success',
              message: '撤单成功!',
              duration: 1000
            })
          }
        })
      })
    },
    // 终止追号
    handleStopTrace(item){
      this.$confirm('你确认中止追号么？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Api.stopTrace({ type: 1, lottery_traces_id: item.id}).then(({ success }) => {
          if (success) {
            this.$store.dispatch('betHistory')
            item.status = 5
            item.trace_lists.forEach(val => {
              if (val.status == 0) {
                this.$set(val, 'status', 3)
              }
            })
            this.$message({
              type: 'success',
              message: '本期追号单取消成功!',
              duration: 1000
            })
          }
        })
      })
    },
    // 终止本期追号
    handleStopIssueTrace(item){
       this.$confirm('你确认取消本期追号么？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Api.stopTrace({ type: 2, lottery_traces_id: item.trace_id, lottery_trace_lists_id: item.id}).then(({ success }) => {
          if (success) {
            this.$store.dispatch('betHistory')
            item.status = 3
            this.$message({
              type: 'success',
              message: '本期追号单取消成功!',
              duration: 1000
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.record-detail {
  /deep/ {
    .el-textarea.is-disabled .el-textarea__inner {
      background-color: #fff;
      border-color: #dcdfe6;
      color: #606266;
    }
  }
  .content {
    margin: 0 auto;
  }
  .openball-result {
    text-align: center;
    padding: 10px 0 30px 0;
    .item {
      display: inline-block;
      width: 45px;
      height: 45px;
      line-height: 45px;
      background: #ffbb52;
      text-align: center;
      border-radius: 50%;
      color: #fff9e9;
      font-size: 26px;
      margin: 0 2px;
      box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.47);
    }
  }
  .table-detail {
    color: #343434;
    border-collapse: collapse;
    border-spacing: 0;
    .title {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
    }
    td {
      border-bottom: 1px dashed #e5e5e5;
      height: 36px;
      line-height: 36px;
    }
    .noborder td {
      border: 0;
    }
    .ball {
      margin-bottom: 20px;
    }
    .value {
      color: #545454;
    }
  }
  .detail-row-cont {
    width: 500px;
    margin: 15px auto 0;
  }
}
</style>


