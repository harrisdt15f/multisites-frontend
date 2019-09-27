<template>
  <div class="user-profits">
    <!-- 搜索 -->
    <div class="filter-container">
      <div class="filter-label">
        用户名:
        <el-input
          size="mini"
          v-model="listQuery.username"
          style="width: 200px; margin-bottom:10px"
          class="filter-item"
        ></el-input>
      </div>
      <div class="filter-label">
        时间:
        <el-date-picker
          style="margin-bottom:20px"
          size="mini"
          v-model="gameTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="bmn-search-button">
        <el-button @click="searchGame" :loading="searchLoading" class="btn">搜 索</el-button>
      </div>
    </div>
    <div class="custom-table">
      <el-table :data="[team_data]" v-if="team_data" style="width: 100%">
        <el-table-column align="center" show-overflow-tooltip label="团队新注册人数">
          <template >
            <span>{{ team_data.team_new }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="团队总人数">
          <template >
            <span>{{ team_data.team_num }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="团队下注人数">
          <template >
            <span>{{ team_data.team_bet_num }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="团队充值人数">
          <template >
            <span>{{ team_data.team_recharge_num }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="团队充值总额">
          <template >
            <span>{{ team_data.team_recharge }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="团队提现总额">
          <template >
            <span>{{ team_data.team_withdraw }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="团队提现总额">
          <template >
            <span>{{ team_data.team_withdraw }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="团队总余额">
          <template >
            <span>{{ team_data.team_balance }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="团队总下注金额">
          <template >
            <span>{{ team_data.team_bet_amount }}</span>
          </template>
        </el-table-column>
         <el-table-column align="center" show-overflow-tooltip label="团队派奖总额">
          <template >
            <span>{{ team_data.team_bonus_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="团队投注返点">
          <template >
            <span>{{ team_data.team_commission }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="团队盈亏">
          <template >
            <span>{{ team_data.team_profit }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-breadcrumb v-if="showBreadcrumb" separator="/" style="margin-top:15px">
      <el-breadcrumb-item @click.native="searchGame">{{userDetail.username}}</el-breadcrumb-item>
      <el-breadcrumb-item
        @click.native="handleBreadcrumb(item, index)"
        v-for="(item, index) in breadcrumbList"
        :key="index"
      >{{item.username}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="custom-table" style="margin-top:10px">
      <el-table :data="list" v-loading="listLoading" style="width: 100%">
        <el-table-column align="center" label="用户名">
          <template slot-scope="scope">
            <div @click="handleNextLink(scope.row)" class="next-link">
              <span>{{ scope.row.username }}</span>
              <i
                style="margin-left:2px;font-size:12px"
                class="fa fa-caret-right"
                aria-hidden="true"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户余额">
          <template slot-scope="scope">
            <span>{{ scope.row.user_balance }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户充值金额">
          <template slot-scope="scope">
            <span>{{ scope.row.user_recharge }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户提现金额">
          <template slot-scope="scope">
            <span>{{ scope.row.user_withdraw }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户下注金额">
          <template slot-scope="scope">
            <span>{{ scope.row.user_bet_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户派奖金额">
          <template slot-scope="scope">
            <span>{{ scope.row.user_bonus_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户投注返点">
          <template slot-scope="scope">
            <span>{{ scope.row.user_commission }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户游戏盈亏">
          <template slot-scope="scope">
            <span>{{ scope.row.user_profit }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p style="overflow:hidden">
      <span style="float:left">数据来源: 包网统计中心</span>
    </p>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.page_size"
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    const date = new Date()
    return {
      list: [],
      total: undefined,
      team_data: undefined,
      listLoading: false,
      searchLoading: false,
      showBreadcrumb: false,
      breadcrumbList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      tableData: [],
      peize: [],
      gameTime: [
        new Date(date.setHours(0, 0, 0)),
        new Date(date.setHours(23, 59, 59))
      ],
      listQuery: {
        page_size: 10,
        page: 1,
        time_condtions: [],
        parent_id: ''
      }
    };
  },
  computed: {
    ...mapGetters(['userDetail'])
  },
  watch: {
    gameTime: {
      handler(newName) {
        if (newName && newName.length) {
          const time_condtions = [];
          time_condtions.push([
            'created_at',
            '>=',
            this.Utils.formatTime(newName[0], 'YYYY-MM-DD HH:MM:SS')
          ]);
          time_condtions.push([
            'created_at',
            '<=',
            this.Utils.formatTime(newName[1], 'YYYY-MM-DD HH:MM:SS')
          ]);
          this.listQuery.time_condtions = JSON.stringify(time_condtions);
        } else {
          this.listQuery.time_condtions = [];
        }
      },
      immediate: true
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      for (var propName in this.listQuery) {
        if (this.listQuery[propName] == '' || this.listQuery[propName] == []) {
          delete this.listQuery[propName];
        }
      }
      this.listLoading = true;
      this.searchLoading = true;
      this.Api.getTeamReport(this.listQuery).then(res => {
        const { success, data } = res;
        const { team_data, user_data } = data;
        this.listLoading = false;
        this.searchLoading = false;
        if (success) {
          this.team_data = team_data;
          this.list = user_data.data;
          this.total = user_data.total;
        }
      });
    },
    searchGame() {
      this.listQuery.page = 1;
      this.listQuery.parent_id = '';
      this.showBreadcrumb = false;
      this.breadcrumbList = [];
      this.getList();
    },
    handleNextLink(row) {
      this.listQuery.page = 1;
      this.listQuery.parent_id = row.user_id;
      this.showBreadcrumb = true;
      this.breadcrumbList.push(row);
      this.getList();
    },
    handleBreadcrumb(item, index) {
      this.listQuery.page = 1;
      this.breadcrumbList = this.breadcrumbList.slice(0, index + 1);
      this.listQuery.parent_id = item.user_id;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.page_size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../assets/css/var.scss";
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
  /deep/ {
    .el-button {
      border: 0;
      border-radius: 0;
    }
  }
  .btn {
    width: 80px;
    height: 100%;
    background: $primary-color;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.15),
      inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4);
    border-width: 1px;
    color: white;
    padding: 0;
  }
}
.filter-container {
  .filter-label {
    display: inline-block;
    margin-right: 40px;
  }
}
.line-center {
  height: 45px;
  line-height: 45px;
  font-size: 13px;
  text-align: center;
  border-left: 1px solid #cfcfcf;
  border-right: 1px solid #cfcfcf;
}
.next-link {
  text-decoration: underline;
  cursor: pointer;
}
.el-breadcrumb {
  cursor: pointer;
}
</style>
