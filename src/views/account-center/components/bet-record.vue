<template>
  <div class="bet-record sub-account">
    <el-tabs v-model="activeName">
      <el-tab-pane label="游戏记录" name="game">
        <div class="container">
          <div class="filter-container">
            游戏时间：
            <el-date-picker
              v-model="gameTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
            <div class="bmn-search-button" style="margin-left:20px;">
              <input @click="searchGame" type="submit" value="搜 索" class="btn" />
            </div>
          </div>
          <div class="custom-table m-t-25">
            <el-table :data="gameList" v-loading="listLoading" style="width: 100%">
              <el-table-column align="center" label="用户名">
                <template slot-scope="scope">
                  <span>{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="游戏">
                <template slot-scope="scope">
                  <span>{{ scope.row.lottery_sign }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="注单编号">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleDetail(scope.row)"
                  >{{ scope.row.issue }}</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" label="奖期">
                <template slot-scope="scope">
                  <span>{{ scope.row.issue }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="玩法">
                <template slot-scope="scope">
                  <span>{{ scope.row.method_name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="200px"  show-overflow-tooltip label="投注内容">
                <template slot-scope="scope">
                  <template
                    v-if="scope.row.method_group === 'DXDS'"
                  >{{scope.row.bet_number.replace(/&/g,',').replace(/(0)/g,'小').replace(/(1)/g,'大').replace(/(2)/g,'双').replace(/(3)/g,'单')}}</template>
                  <template
                    v-else-if="scope.row.method_group === 'LH'"
                  >{{scope.row.bet_number.replace(/&/g,',').replace(/(0)/g,'龙').replace(/(1)/g,'虎').replace(/(2)/g,'和')}}</template>
                  <template
                    v-else-if="scope.row.method_sign === 'QTS3' || scope.row.method_sign === 'ZTS3' || scope.row.method_sign === 'HTS3'"
                  >{{scope.row.bet_number.replace(/&/g,',').replace(/(0)/g,'豹子').replace(/(1)/g,'顺子').replace(/(2)/g,'对子')}}</template>
                  <template v-else>
                    <span>{{scope.row.bet_number.replace(/&/g,',')}}</span>
                  </template>
                </template>
              </el-table-column>
              <el-table-column align="center" label="投注额">
                <template slot-scope="scope">
                  <span>{{ scope.row.total_cost }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="奖金">
                <template slot-scope="scope">
                  <span>{{ scope.row.bonus }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="奖金组-返点">
                <template slot-scope="scope">
                  <span>{{ scope.row.bet_prize_group }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 0">待开奖</span>
                  <span v-if="scope.row.status == 2">未中奖</span>
                  <span v-if="scope.row.status == 3">中奖</span>
                  <span v-if="scope.row.status == 4">已派奖</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-container">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="gameListQuery.page"
              :page-sizes="[10,20,30, 50]"
              :page-size="gameListQuery.count"
              layout="total, sizes, prev, pager, next"
              :total="gameListTotal"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="追号记录" name="traces">
        <div class="container">
          <div class="filter-container">
            游戏时间：
            <el-date-picker
              v-model="tracesTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <div class="bmn-search-button" style="margin-left:20px;">
              <input @click="searchTraces" type="submit" value="搜 索" class="btn" />
            </div>
          </div>
          <div class="custom-table m-t-25">
            <el-table :data="tracesList" v-loading="tracesListLoading" style="width: 100%">
              <el-table-column align="center" show-overflow-tooltip label="彩种">
                <template slot-scope="scope">
                  <span>{{ scope.row.lottery_sign }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="玩法">
                <template slot-scope="scope">
                  <span>{{ scope.row.method_name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="开始奖期">
                <template slot-scope="scope">
                  <span>{{ scope.row.start_issue }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="追号奖期">
                <template slot-scope="scope">
                  <span>{{ scope.row.issue_process }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="投注金额">
                <template slot-scope="scope">
                  <span>{{ scope.row.total_price }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="追中即停">
                <template slot-scope="scope">
                  <span v-if="scope.row.win_stop == 0">不停</span>
                  <span v-if="scope.row.win_stop == 1">停</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="中奖金额">
                <template slot-scope="scope">
                  <span>{{ scope.row.finished_bonus }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 0">正在追号</span>
                  <span v-if="scope.row.status == 1">追号完成</span>
                  <span v-if="scope.row.status == 2">玩家撤销</span>
                  <span v-if="scope.row.status == 3">系统撤销</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-container">
            <el-pagination
              background
              @size-change="handleTraceSizeChange"
              @current-change="handleTraceCurrentChange"
              :current-page="tracesListQuery.page"
              :page-sizes="[10,20,30, 50]"
              :page-size="tracesListQuery.count"
              layout="total, sizes, prev, pager, next"
              :total="tracesListTotal"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <record-details
      :detailData="detailData"
      @close="handleDetailClose"
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
    ></record-details>
  </div>
</template>

<script>
import recordDetails from '../../../components/public/record_details'

export default {
  inject: ['active'],
  components: {
    recordDetails
  },
  data() {
    const date = new Date()
    return {
      detailData: null,
      dialogVisible: false,
      activeName: 'game',
      gameList: [],
      listLoading: true,
      tracesListLoading: true,
      gameListTotal: null,
      gameListQuery: {
        count: 10,
        page: 1,
        lottery_sign: undefined,
        begin_time: undefined,
        end_time: undefined
      },
      tracesListTotal: null,
      tracesList: [],
      tracesListQuery: {
        count: 10,
        page: 1,
        lottery_sign: undefined,
        method_sign: undefined,
        start_time: undefined,
        end_time: undefined,
        project_id: undefined
      },
      gameTime: [
        new Date(date.setHours(0, 0, 0)),
        new Date(date.setHours(23, 59, 59))
      ],
      tracesTime: [
        new Date(date.setHours(0, 0, 0)),
        new Date(date.setHours(23, 59, 59))
      ]
    }
  },
  watch: {
    gameTime: {
      handler(newName) {
        this.gameListQuery.begin_time = this.Utils.formatTime(
          newName[0],
          'YYYY-MM-DD HH:MM:SS'
        )
        this.gameListQuery.end_time = this.Utils.formatTime(
          newName[1],
          'YYYY-MM-DD HH:MM:SS'
        )
      },
      immediate: true
    },
    tracesTime: {
      handler(newName) {
        this.tracesListQuery.begin_time = this.Utils.formatTime(
          newName[0],
          'YYYY-MM-DD HH:MM:SS'
        )
        this.tracesListQuery.end_time = this.Utils.formatTime(
          newName[1],
          'YYYY-MM-DD HH:MM:SS'
        )
      },
      immediate: true
    }
  },
  created() {
    this.activeName = this.active ? this.active : 'game'
    this.getGameList()
    this.getTraceList()
  },
  methods: {
    getGameList() {
      this.listLoading = true
      this.Api.getBetGameRecord(this.gameListQuery).then(res => {
        const { success, data } = res
        this.listLoading = false
        if (success) {
          this.gameList = data.data
          this.gameListTotal = data.total
        }
      })
    },
    getTraceList() {
      this.tracesListLoading = true
      this.Api.getBetTraceRecord(this.tracesListQuery).then(res => {
        const { success, data } = res
        this.tracesListLoading = false
        if (success) {
          this.tracesList = data.data
          this.tracesListTotal = data.total
        }
      })
    },
    searchGame() {
      this.gameListQuery.page = 1
      this.getGameList()
    },
    searchTraces() {
      this.tracesListQuery.page = 1
      this.getTraceList()
    },
    handleSizeChange(val) {
      this.gameListQuery.count = val
      this.getGameList()
    },
    handleCurrentChange(val) {
      this.gameListQuery.page = val
      this.getGameList()
    },
    handleTraceSizeChange(val) {
      this.tracesListQuery.count = val
      this.getTraceList()
    },
    handleTraceCurrentChange(val) {
      this.tracesListQuery.page = val
      this.getTraceList()
    },
    //投注记录详情
    handleDetail(row) {
      this.detailData = row
      this.dialogVisible = true
    },
    handleDetailClose() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.bet-record {
  .container {
    padding: 0 35px 35px;
  }
}
</style>
