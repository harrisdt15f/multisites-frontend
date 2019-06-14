<template>
  <div class="account">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="投注记录" name="bet-record">
       <bet-record></bet-record>
      </el-tab-pane>
      <el-tab-pane label="资金管理" name="fund-manage">
        <fund-manage></fund-manage>
      </el-tab-pane>
      <el-tab-pane label="账户管理" name="account-manage">
        <account-manage></account-manage>
      </el-tab-pane>
      <!-- <el-tab-pane label="消息中心" name="message-center">
        <message-center></message-center>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import betRecord from './components/bet-record'
import fundManage from './components/fund-manage'
import accountManage from './components/account-manage'
// import messageCenter from './components/message-center'

export default {
  name: 'Account',
  components: {
    betRecord,
    fundManage,
    accountManage
  },
  data () {
    return {
      activeName: 'bet-record'
    }
  }
}
</script>

<style lang="scss" scoped>
.account {
  width: 1200px;
  margin: 30px auto 55px;
  background: #fff;
  /deep/ {
    .el-tabs__active-bar{
      display: none;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
      color: #000;
    }
    .el-tabs__nav-scroll {
      background: #fff3e0;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      color: #000;
      background: #fffbf5;
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
    .el-tabs--border-card>.el-tabs__content{
      padding: 0;
    }
  }
}
</style>
<style lang="scss">
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
    cursor: pointer;
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
</style>

