<template>
  <div class="bet-record">
    <el-tabs v-model="activeName">
      <el-tab-pane label="游戏记录" name="game">
        <div class="container">
          <div class="filter-container">
            游戏时间：
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <div class="bmn-search-button" style="margin-left:20px;">
              <input type="submit" value="搜 索" class="btn">
            </div>
          </div>
          <div class="custom-table m-t-25">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column align="center" label="用户名">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="投注金额">
                <template slot-scope="scope">
                  <span>{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="有效投注">
                <template slot-scope="scope">
                  <span>{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="派奖总额">
                <template slot-scope="scope">
                  <span>{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="投注返点">
                <template slot-scope="scope">
                  <span>{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="游戏盈亏">
                <template slot-scope="scope">
                  <span>{{ scope.row.address }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="追号记录" name="traces">
        <div class="container"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'game',
      value1: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.bet-record {
  /deep/ {
    .el-tabs__nav-scroll {
      background: #fffbf5 !important;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      background-color: #fffbf5;
    }
    .el-tabs__item + .el-tabs__item {
      &::before {
        content: "";
        display: block;
        width: 1px;
        height: 18px;
        background: #e6d7c0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
      }
    }
    .el-tabs__item.is-active {
      color: #875c4e;
      &::after {
        content: "";
        display: block;
        width: 75px;
        height: 2px;
        background: #875c4e;
        position: absolute;
        left: 50%;
        bottom: 2px;
        transform: translateX(-50%);
      }
    }
    .el-tabs__item:hover {
      color: #875c4e;
    }
  }
  .container {
    padding: 0 35px 35px;
  }
}
</style>
