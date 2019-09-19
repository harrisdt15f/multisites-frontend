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
        余额范围:
        <el-input
          type="number"
          v-model="listQuery.min_team_balance"
          placeholder="最小团队余额"
          size="mini"
          style="width: 105px;"
          class="filter-item"
        ></el-input> -
        <el-input
          type="number"
          v-model="listQuery.max_team_balance"
          placeholder="最大团队余额"
          size="mini"
          style="width: 105px;"
          class="filter-item"
        ></el-input>
      </div>
      <div class="filter-label">
        奖金组范围:
        <el-input
          type="number"
          v-model="peize[0]"
          placeholder="最小奖金组"
          size="mini"
          style="width: 105px;"
          class="filter-item"
        ></el-input> -
        <el-input
          type="number"
          v-model="peize[1]"
          placeholder="最大奖金组"
          size="mini"
          style="width: 105px;"
          class="filter-item"
        ></el-input>
      </div>
      <br />
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" label="用户名">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="层级">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="奖金组">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="团队人数">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="注册日期">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="最新登录">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="团队余额">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: '',
      username: '',
      listLoading: false,
      searchLoading: false,
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
      gameTime: [],
      listQuery: {
        page_size: 10,
        page: 1,
        time_condtions: [],
        price_group_condtions: [],
        min_team_balance: '',
        max_team_balance: '',
        parent_id: ''
      }
    };
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
    },
    peize: {
      handler(newName) {
        if (newName && newName.length === 2) {
          const price_group_condtions = [];
          price_group_condtions.push(['prize_group', '>=', newName[0]]);
          price_group_condtions.push(['prize_group', '<=', newName[1]]);
          this.listQuery.price_group_condtions = JSON.stringify(
            price_group_condtions
          );
        } else {
          this.listQuery.price_group_condtions = [];
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
      this.Api.getTeamManagement(this.listQuery).then(res => {
        const { success, data } = res;
        this.listLoading = false;
        this.searchLoading = false;

        if (success) {
          this.gameList = data.data;
          this.gameListTotal = data.total;
        }
      });
    },
    searchGame() {
      this.listQuery.page = 1;
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
</style>
