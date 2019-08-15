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
        <el-input @change="gameListInputChange" style="width:235px;margin:0 15px"  size="mini" placeholder="请输入内容" v-model="valueSelect" class="input-with-select">
          <el-select @change="gameListSelectChange" style="width:80px;" v-model="typeSelect" slot="prepend" placeholder="请选择">
            <el-option label="订单号" value="project_id"></el-option>
            <el-option label="奖期号" value="issue"></el-option>
          </el-select>
        </el-input>
        账变类型：
        <el-select size="mini"  v-model="gameListQuery.type_sign" placeholder="请选择">
          <el-option 
            label="所有" value=""></el-option>
          <el-option 
            v-for="(item, index) in changeTypeList" 
            :key="index"
            :label="item.name" 
            :value="item.sign"></el-option>
        </el-select>
        <br>
        彩种：
        <el-cascader
              size="mini" 
              :props="{ expandTrigger: 'hover' }"
              v-model="gameListQuery.lottery_id"
              :options="lotteryAllOptions"></el-cascader>
        <div class="bmn-search-button" style="margin-left:20px;">
          <input @click="searchGame" type="submit" value="搜 索" class="btn" />
        </div>
      </div>
      <div class="custom-table m-t-25">
        <el-table :data="gameList" v-loading="listLoading" style="width: 100%">
          <el-table-column align="center" label="编号">
            <template slot-scope="scope">
              <span>{{ scope.row.issue }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">
              {{Utils.formatTime(scope.row.process_time * 1000, 'YYYY-MM-DD HH:MM:SS')}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="账变类型">
            <template slot-scope="scope">
              <span>{{ scope.row.type_name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="游戏">
            <template slot-scope="scope">
              <span>{{ scope.row.game_methods['lottery_name'] }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="玩法">
            <template slot-scope="scope">
              <span>{{ scope.row.game_methods['method_name'] }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="变动金额">
            <template slot-scope="scope">
              <span>{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="余额">
            <template slot-scope="scope">
              <span>{{ scope.row.balance }}</span>
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
import { mapGetters } from 'vuex'

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
        type_sign: '',
        lottery_id: '',
        project_id: '',
        issue: ''
      },
      gameTime: [
        new Date(date.setHours(0, 0, 0)),
        new Date(date.setHours(23, 59, 59))
      ],
    }
  },
  computed: {
    ...mapGetters([
      'lotteryAll',
      'lotteryLists'
    ]),
     lotteryAllOptions(){
      if(!Object.keys(this.lotteryLists).length) return
      let list = []
      list.push({
        value: '',
        label: '所有游戏',
      })
      for(let i in this.lotteryLists) {
        const val = this.lotteryLists[i]
        const children = val.list.map(val => {
          return {
            value: val.id,
            label: val.name,
          }
        })
        list.push({
          value: val.sign,
          label: val.name,
          children: children
        })
      }
      return list
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
    this.getChangeTypeList()
    this.getGameList()
  },
  methods: {
    gameListInputChange(v){
      this.gameListQuery[this.typeSelect] = v
    },
    gameListSelectChange(v){
      if (v === 'serial_number'){
        this.gameListQuery.serial_number = this.valueSelect
        this.gameListQuery.issue = ''
      } else if (v === 'issue'){
        this.gameListQuery.issue = this.valueSelect
        this.gameListQuery.serial_number = ''
      }
    },
    getChangeTypeList(){
      this.Api.changeTypeList().then(({ success, data }) => {
        if (success) {
          this.changeTypeList = data
        }
      })
    },
    getGameList() {
      Object.assign(this.gameListQuery, {
        lottery_sign: this.gameListQuery.lottery_id && this.gameListQuery.lottery_id.length == 2 ? this.gameListQuery.lottery_id[1] : ''
      })
      for (var propName in this.gameListQuery) { 
        if (this.gameListQuery[propName] === '') {
          delete this.gameListQuery[propName]
        }
      }
      this.listLoading = true
      this.Api.getUserFund(this.gameListQuery).then(res => {
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
