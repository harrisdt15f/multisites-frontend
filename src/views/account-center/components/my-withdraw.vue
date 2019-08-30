<template>
  <div class="bet-record sub-account">
    <div class="container">
      <div class="filter-container">
        游戏时间：
        <!-- 今天 昨天 -->
        <el-date-picker
          style="width: 370px; margin-bottom:10px;"
          size="mini"
          v-model="gameTime"
          type="datetimerange"
          :picker-options="pickerOptions"
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
        <el-table :data="gameList" show-summary :summary-method="getSummaries" v-loading="listLoading" style="width: 100%">
          <el-table-column align="center" label="编号">
            <template slot-scope="scope">
              <span>{{ scope.row.serial_number }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">
              {{scope.row.created_at}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="账变类型">
            <template slot-scope="scope">
              {{scope.row.type_name}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="变动金额">
            <template slot-scope="scope">
              {{scope.row.amount}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="余额">
            <template slot-scope="scope">
              <span style="color:green">+{{ scope.row.balance }}</span>
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
          :page-size="gameListQuery.page_size"
          layout="total, sizes, prev, pager, next"
          :total="gameListTotal"
        ></el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    const date = new Date()
    return {
      typeSelect: 'project_id',
      valueSelect: '',
      changeTypeList: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      detailData: null,
      dialogVisible: false,
      activeName: 'game',
      gameList: [],
      listLoading: true,
      gameListTotal: null,
      gameListQuery: {
        page_size: 10,
        page: 1,
        time_condtions: [],
      },
      gameTime: [
        new Date(date.setHours(0, 0, 0)),
        new Date(date.setHours(23, 59, 59))
      ],
    }
  },
  watch: {
    gameTime: {
      handler(newName) {
        const time_condtions = []
        time_condtions.push([
          'created_at',
          '>=',
          this.Utils.formatTime(newName[0],'YYYY-MM-DD HH:MM:SS')
        ]) 
        time_condtions.push([
          'created_at',
          '<=',
          this.Utils.formatTime(newName[1],'YYYY-MM-DD HH:MM:SS')
        ]) 
        this.gameListQuery.time_condtions = JSON.stringify(time_condtions)
      },
      immediate: true
    }
  },
  created () {
    this.getGameList()
  },
  methods: {
    getGameList() {
      this.listLoading = true
      this.Api.realWithdrawList(this.gameListQuery).then(res => {
        const { success, data } = res
        this.listLoading = false
        if (success) {
          this.gameList = data.data
          this.gameListTotal = data.total
        }
      })
    },
    searchGame() {
      this.gameListQuery.page = 1
      this.getGameList()
    },
    handleSizeChange(val) {
      this.gameListQuery.page_size = val
      this.getGameList()
    },
    handleCurrentChange(val) {
      this.gameListQuery.page = val
      this.getGameList()
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '小结'
          return
        }
        if (index === 1) {
          sums[index] = '本页资金变动'
          return
        }
        if (index === 3) {
          const values = data.map(item => {
            return Number(item['amount'])
          })
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] =
            sums[index] > 0
              ? `+${sums[index].toFixed(4)}`
              : `${sums[index].toFixed(4)}`
        }
      })

      return sums
    }
  }
}
</script>
<style lang="scss" scoped>
.bet-record {
  .container {
    padding: 25px 35px 35px;
  }
  /deep/{
    .el-input--mini .el-input__inner{
      height: 28px;
    }
  }
}
</style>
