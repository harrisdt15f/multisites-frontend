<template>
  <div class="user-profits">
    <div class="filter-container">
      <div class="filter-label">
        用户名:
        <el-input v-model="listQuery.username" size="small" style="width: 200px;" class="filter-item"></el-input>
      </div>
      <div class="filter-label">
        时间:
        <el-date-picker
          size="small"
          v-model="gameTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="bmn-search-button">
        <input @click="searchData" type="submit" value="搜 索" class="btn">
      </div>
    </div>
    <div class="custom-table m-t-25">
      <el-table :data="[userProfits.sum]" style="width: 100%">
        <el-table-column align="center" label="区间合计 >" width="188px">
          <template>
            <span>所以区间合计 ></span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="充值总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_deposit }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="提现总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_withdrawal }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="投注总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_turnover }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="派奖总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_prize }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="投注返点">
          <template slot-scope="scope">
            <span>{{ scope.row.team_bet_commission }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="游戏盈亏">
          <template slot-scope="scope">
            <span>{{ scope.row.team_profit }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="下级返点">
          <template slot-scope="scope">
            <span>{{ scope.row.team_commission }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="促销红利">
          <template slot-scope="scope">
            <span>{{ scope.row.team_dividend }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="净盈亏">
          <template slot-scope="scope">
            <span>{{ scope.row.team_profit }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="custom-table m-t-25">
     <el-table :data="[userProfits.self]" style="width: 100%">
         <el-table-column align="center" label="用户名" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户属性">
          <template>
            <span>自己 ></span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="充值总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_deposit }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="提现总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_withdrawal }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="投注总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_turnover }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="派奖总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_prize }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="投注返点">
          <template slot-scope="scope">
            <span>{{ scope.row.team_bet_commission }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="游戏盈亏">
          <template slot-scope="scope">
            <span>{{ scope.row.team_profit }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="下级返点">
          <template slot-scope="scope">
            <span>{{ scope.row.team_commission }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="促销红利">
          <template slot-scope="scope">
            <span>{{ scope.row.team_dividend }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="净盈亏">
          <template slot-scope="scope">
            <span>{{ scope.row.team_profit }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="line-center">直属下级盈亏明细</div>
    <div class="custom-table">
      <el-table :data="userProfits.child.data" style="width: 100%">
        <el-table-column align="center" label="用户名">
          <template>
            <span>{{userDetail.username}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="充值总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_deposit }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="提现总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_withdrawal }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="投注总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_turnover }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="派奖总额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_prize }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="投注返点">
          <template slot-scope="scope">
            <span>{{ scope.row.team_bet_commission }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="游戏盈亏">
          <template slot-scope="scope">
            <span>{{ scope.row.team_profit }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="下级返点">
          <template slot-scope="scope">
            <span>{{ scope.row.team_commission }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="促销红利">
          <template slot-scope="scope">
            <span>{{ scope.row.team_dividend }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="净盈亏">
          <template slot-scope="scope">
            <span>{{ scope.row.team_profit }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userProfits.child.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="userProfits.child.page_size"
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserProfits',
  data() {
    const date1 = new Date()
      date1.setDate(1)
      date1.setHours(0,0,0)
    const date2 = new Date()
      date2.setHours(23, 59, 59)
    return {
      userProfits:{
        child:{},
        self:{},
        sum:{}
      },
      total: undefined,
      listQuery: {
        page_size: 10,
        page: 1,
        username: undefined,
        date_from: undefined,
        date_to: undefined
      },
      gameTime: [
        new Date(date1),
        new Date(date2)
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '0.0000',
          address: '0.0000'
        }
      ]
    }
  },
  watch: {
    gameTime: {
      handler(newName) {
        this.listQuery.date_from = this.Utils.formatTime(
          newName[0],
          'YYYY-MM-DD HH:MM:SS'
        )
        this.listQuery.date_to = this.Utils.formatTime(
          newName[1],
          'YYYY-MM-DD HH:MM:SS'
        )
      },
      immediate: true
    },
  },
  computed: {
    ...mapGetters(['userDetail'])
  },
  created () {
    this.initData()
  },
  methods: {
    initData(){
      this.Api.getUserProfits(this.listQuery).then(({success, data}) => {
        if (success) {
          Object.assign(this.userProfits, data) 
          this.total = data.child.total
        }
      })
    },
    searchData(){
      this.listQuery.page = 1
      this.initData()
    },
    handleSizeChange(val) {
      this.gameListQuery.page_size = val
      this.getGameList()
    },
    handleCurrentChange(val) {
      this.gameListQuery.page = val
      this.getGameList()
    },
  }
}
</script>


<style lang="scss" scoped>
.bmn-search-button {
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  width: 80px;
  height: 36px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.15),
    inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4);
  border-style: solid;
  border-width: 1px;
  border-image-slice: 1;
  border-radius: 3px;
  text-align: center;
  line-height: 34px;
  color: white;
  margin-right: 8px;
  input {
    width: 80px;
    height: 100%;
    background-image: linear-gradient(0deg, #ff8400 0%, #ffa200 100%),
      linear-gradient(#d8cdb6, #d8cdb6);
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.15),
      inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4);

    border-width: 1px;
    border-image-source: linear-gradient(0deg, #d78700 0%, #e58f00 100%);
    color: white;
    padding: 0;
  }
}
.filter-container {
  .filter-label {
    display: inline-block;
    margin-right: 20px;
  }
}
.line-center{
  height: 45px;
  line-height: 45px;
  font-size: 13px;
  text-align: center;
  border-left: 1px solid #cfcfcf;
  border-right: 1px solid #cfcfcf;
}
</style>
