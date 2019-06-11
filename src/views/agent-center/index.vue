<template>
  <div class="agent-center">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="团队盈亏" name="user-profits">
        <user-profits></user-profits>
      </el-tab-pane>
      <el-tab-pane label="团队管理" name="user-manage">
        <user-manage></user-manage>
      </el-tab-pane>
      <el-tab-pane label="下级开户" name="third">
        <accurate-create></accurate-create>
      </el-tab-pane>
      <el-tab-pane label="代理消息" name="fourth">代理消息</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import userProfits from './components/user-profits'
import userManage from './components/user-manage'
import accurateCreate from './components/accurate-create'
export default {
  name: 'agentCenter',
  components: {
    userProfits,
    userManage,
    accurateCreate
  },
  data() {
    return {
      activeName: 'user-profits'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.agent-center {
  width: 1200px;
  margin: 30px auto 55px;
  background: #fff;
  /deep/ {
    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
      color: #000;
    }
    .el-tabs__nav-scroll {
      background: #fff3e0;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      color: #000;
      position: relative;
      &::before {
        position: absolute;
        content: " ";
        width: 100%;
        height: 2px;
        top: 0;
        left: 0;
        background: #ff9707;
      }
    }
    .el-tabs--border-card
      > .el-tabs__header
      .el-tabs__item:not(.is-disabled):hover {
      color: #ff9707;
    }
    .el-tabs__item {
      height: 50px;
      line-height: 50px;
      padding: 0 30px !important;
    }
  }
}
</style>

<style lang="scss">
.custom-table {
  border-top: 1px solid #cfcfcf;
  border-left: 1px solid #cfcfcf;
  border-right: 1px solid #cfcfcf;
  .el-table{
    font-size: 12px;
  }

  .el-table::before {
    background-color: #cfcfcf;
  }
  .el-table thead tr,
  .el-table thead th {
    background: #fffbf5 !important;
  }
  .el-table thead th + th {
    .cell {
      border-left: 1px solid #b7a383;
    }
  }
  .el-table thead th{
    color: #000;
    font-weight: 400;
    font-size: 14px;
  }
}
</style>
