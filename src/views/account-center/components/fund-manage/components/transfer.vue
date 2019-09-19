<template>
  <div class="transfer">
    <div class="filter-container">
      平台转入：
      <el-select size="mini" v-model="value" style="width:140px; margin-right:15px;" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      平台转出：
      <el-select size="mini" v-model="value" style="width:140px; margin-right:15px;" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      额度转换：
      <el-input size="mini" v-model="input" style="width:140px; margin-right:15px;" placeholder="0"></el-input>
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
      tableData:'',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        input: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.transfer {
  padding: 0 30px 35px;
}
</style>

