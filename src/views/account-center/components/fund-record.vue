<template>
  <div class="fund-record">
    <div class="container">
      <div class="filter-container">
        游戏时间：
        <el-date-picker
          size="mini"
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-input size="mini" placeholder="请输入内容" v-model="input3" class="input-with-select" style="width:320px;margin-left:15px;">
          <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:100px;">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
        </el-input>
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
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.fund-record {
  padding: 20px 35px 35px;
}
</style>

