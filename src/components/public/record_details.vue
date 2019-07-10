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
        <div class="openball-result" v-if="detailData.open_codes && detailData.open_codes.length">
          <span class="item" v-for="(item, index) in detailData.open_codes.split('')" :key="index">{{item}}</span>
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
                  <span class="value"></span>
                </td>
              </tr>
              <tr>
                <td align="right">玩法：</td>
                <td>
                  <span class="value">{{detailData.method_name}}</span>
                </td>
                <td align="right">投注时间：</td>
                <td>
                  <span class="value">{{detailData.bet_time}}</span>
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
                  <span class="value">{{(this.$store.state.lottery.modeConfig)[detailData.mode]}}</span>
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
          <el-input type="textarea" :rows="4" v-model="detailData.bet_codes"></el-input>
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
                  <span class="value"></span>
                </td>
              </tr>
              <tr>
                <td align="right">玩法：</td>
                <td>
                  <span class="value">{{detailData.method_name}}</span>
                </td>
                <td align="right">追号时间：</td>
                <td>
                  <span class="value">{{detailData.bet_time}}</span>
                </td>
              </tr>
              <tr>
                <td align="right">开始期号：</td>
                <td>
                  <span class="value">{{detailData.start_issue}}</span>
                </td>
                <td align="right">追号期数：</td>
                <td>
                  <span class="value">{{detailData.start_issue}}</span>
                </td>
              </tr>

              <tr>
                <td align="right">完成期数：</td>
                <td>
                  <span class="value">{{(this.$store.state.lottery.modeConfig)[detailData.mode]}}</span>
                </td>
                <td align="right">取消期数：</td>
                <td>
                  <span class="value">{{detailData.total_cost}}</span>
                </td>
              </tr>

              <tr>
                <td align="right">追号金额：</td>
                <td>
                  <span class="value">{{(this.$store.state.lottery.modeConfig)[detailData.mode]}}</span>
                </td>
                <td align="right">完成金额：</td>
                <td>
                  <span class="value">{{detailData.total_cost}}</span>
                </td>
              </tr>

              <tr>
                <td align="right">取消金额：</td>
                <td>
                  <span class="value">{{(this.$store.state.lottery.modeConfig)[detailData.mode]}}</span>
                </td>
                <td align="right">中奖金额：</td>
                <td>
                  <span class="value">{{detailData.total_cost}}</span>
                </td>
              </tr>

              <tr>
                <td align="right">追号状态：</td>
                <td>
                  <span class="value">{{(this.$store.state.lottery.modeConfig)[detailData.mode]}}</span>
                </td>
                <td align="right">模式：</td>
                <td>
                  <span class="value">{{detailData.total_cost}}</span>
                </td>
              </tr>

              <tr>
                <td align="right">追号奖金组：</td>
                <td>
                  <span class="value">{{(this.$store.state.lottery.modeConfig)[detailData.mode]}}</span>
                </td>
                <td align="right">中奖后终止任务：</td>
                <td>
                  <span class="value">{{detailData.total_cost}}</span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        <div class="detail-row-cont">
          <div class="title">投注内容：</div>
          <el-input type="textarea" :rows="4" v-model="detailData.bet_codes"></el-input>
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
      return this.detailData.is_win_stop !== undefined
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


