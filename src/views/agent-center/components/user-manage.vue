<template>
  <div class="user-profits">
    <div class="filter-container">
      <div class="filter-label">
        用户名:
        <el-input style="width: 200px;" class="filter-item"></el-input>
      </div>
      <div class="filter-label">
        用户属性:
        <el-input style="width: 200px;" class="filter-item"></el-input>
      </div>
      <div class="filter-label">
        时间:
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="bmn-search-button">
        <input type="submit" value="搜 索" class="btn">
      </div>
    </div>
    <div class="custom-table m-t-25">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" label="区间合计 >" width="188px">
          <template>
            <span>所以区间合计 ></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="充值总额">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="提现总额">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="投注总额">
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
        <el-table-column align="center" label="下级返点">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="促销红利">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="净盈亏">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="custom-table m-t-25">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" label="区间合计 >" width="188px">
          <template>
            <span>所以区间合计 ></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="充值总额">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="提现总额">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="投注总额">
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
        <el-table-column align="center" label="下级返点">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="促销红利">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="净盈亏">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="line-center">直属下级盈亏明细</div>
    <div class="custom-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" label="区间合计 >" width="188px">
          <template>
            <span>所以区间合计 ></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="充值总额">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="提现总额">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="投注总额">
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
        <el-table-column align="center" label="下级返点">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="促销红利">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="净盈亏">
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
      tableData: [
        {
          date: '2016-05-02',
          name: '0.0000',
          address: '0.0000'
        }
      ]
    }
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
