<template>
  <div class="fund-manage">
    <div class="filter-container">
      
      账变类型:
      <el-select v-model="value" placeholder="请选择" style="margin-right:30px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>查询时间：
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
</template>

<script>
export default {
  data () {
    return {
      radio1: '充值'
    }
  }
}
</script>

<style lang="scss">
.fund-manage {
  padding: 20px 35px;
}
</style>



