<template>
  <el-dialog
    width="80%"
    class="record-detail"
    title="记录详情"
    :visible.sync="openStatus"
    @close="handleClose"
  >
    <template v-if="detailData">
      <div class="content" v-if="!isTraces">
        <div class="openball-result" v-if="detailData.open_number && detailData.open_number.length">
          <template v-if="detailData.series_id ==='lotto'">
            <span
              class="item"
              v-for="(item, index) in detailData.open_number.split(' ')"
              :key="index"
            >{{item}}</span>
          </template>
          <template v-else>
             <span
              class="item"
              v-for="(item, index) in detailData.open_number.split('')"
              :key="index"
            >{{item}}</span>
          </template>
        </div>
        <div class="table-detail">
          <table width="100%" class="table-detail">
            <tbody>
              <tr>
                <td width="30%" align="right">游戏：</td>
                <td>
                  <span class="value">{{currentLottery.cn_name}}</span>
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
                  <span class="value" v-if="detailData.status == 2">未中奖</span>
                  <span class="value" v-if="detailData.status == 3">中奖</span>
                  <span class="value" v-if="detailData.status == 4">已派奖</span>
                </td>
                <td align="right">奖金：</td>
                <td>
                  <span class="value">{{detailData.bonus}}</span>
                </td>
              </tr>
              <!-- <tr>
              <td align="right"></td>
              <td></td>
              <td align="right">投注返点：</td>
              <td>
                <span class="value"></span>
              </td>
              </tr>-->
            </tbody>
          </table>
        </div>
        <div class="detail-row-cont">
          <div class="title">投注内容：</div>
          <el-input type="textarea" disabled :rows="4" v-model="bet_number"></el-input>
        </div>
      </div>
      <div class="content" v-else>
        <div class="table-detail">
          <table width="100%" class="table-detail">
            <tbody>
              <tr>
                <td width="30%" align="right">游戏：</td>
                <td>
                  <span class="value">{{currentLottery.cn_name}}</span>
                </td>
                <td align="right">追号编号：</td>
                <td>
                  <span class="value">{{detailData.project_serial_number}}</span>
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
                  <span class="value">{{detailData.finished_bonus}}</span>
                </td>
              </tr>

              <tr>
                <td align="right">追号状态：</td>
                <td>
                  <span class="value">{{detailData.status}}</span>
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
                  <span class="value">{{(this.$store.state.lottery.modeConfig)[detailData.mode]}}</span>
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
        <div style="text-align:center; margin-top:20px;"> 
          <el-button>终止追号</el-button>
        </div>
        <div class="trace-lists">
          <el-table :data="detailData.trace_lists" style="width: 50%;margin:30px auto">
            <el-table-column align="center" prop="issue" label="奖期" width="180"></el-table-column>
            <el-table-column align="center" label="投注内容" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.bet_number}}
              </template>
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
            <el-table-column align="center" prop="address" label="中奖	"></el-table-column>
            <el-table-column align="center" prop="address" label="操作	">
               <template slot-scope="scope">
                 <el-button type="text" size="mini">取消本期追号</el-button>
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
      openStatus: this.dialogVisible
    }
  },
  computed: {
    ...mapGetters(['currentLottery']),
    isTraces() {
      return this.detailData.win_stop !== undefined
    },
    bet_number() {
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
        this.detailData.method_group === 'Q3' ||
        this.detailData.method_group === 'Z3' ||
        this.detailData.method_group === 'H3'
      ) {
        return this.detailData.bet_number
          .replace(/&/g, ',')
          .replace(/(0)/g, '豹子')
          .replace(/(1)/g, '顺子')
          .replace(/(2)/g, '对子')
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
    handleClose() {
      this.$emit('close')
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
      background: #ff5656;
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


