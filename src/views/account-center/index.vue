<template>
  <div class="account">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="账户管理" :lazy="true" name="account-manage">
        <account-manage></account-manage>
      </el-tab-pane>
      <el-tab-pane label="投注记录" :lazy="true" name="bet-record">
        <bet-record></bet-record>
      </el-tab-pane>
      <el-tab-pane label="资金管理" :lazy="true" name="fund-manage">
        <fund-manage></fund-manage>
      </el-tab-pane>
      <el-tab-pane label="账变记录" :lazy="true" name="betchage-record">
        <fund-record></fund-record>
      </el-tab-pane>
      <!-- <el-tab-pane label="充值记录" :lazy="true" name="recharge-list">
        <recharge-list></recharge-list>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import betRecord from './components/bet-record'
import fundManage from './components/fund-manage/index'
import fundRecord from './components/fund-record'
// import rechargeList from './components/recharge-list'
import accountManage from './components/account-manage/index'

export default {
  name: 'Account',
  components: {
    betRecord,
    fundManage,
    fundRecord,
    accountManage,
    // rechargeList
  },
  data() {
    return {
      activeName: '',
      copyActiveName: '',
      showBulletin: false
    }
  },
  provide() {
    return {
      active: this.subtype
    }
  },
  props: ['type', 'subtype'],
  created() {
    this.activeName = this.type ? this.type : 'account-manage'
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.account {
  width: 1200px;
  margin: 15px auto 55px;
  background: #fff;
  /deep/ {
    .el-tabs__active-bar {
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
    .el-tabs--border-card > .el-tabs__content {
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
  height: 28px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.15),
    inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4);
  border-style: solid;
  border-width: 1px;
  border-image-slice: 1;
  border-radius: 3px;
  text-align: center;
  line-height: 28px;
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
.account .sub-account {
  /deep/ {
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      background-color: #fe9112;
      border-color: #fe9112;
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      box-shadow: -1px 0 0 0 #fe9112;
    }
    .el-tabs__nav-wrap::after {
      height: 1px;
    }
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
        width: 100%;
        height: 2px;
        background: #875c4e;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
    }
    .el-tabs__item:hover {
      color: #875c4e;
    }
  }
}
.pagination-container {
  margin-top: 15px;
  text-align: right;
  /deep/ {
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #ff8900;
    }
    .el-input--mini{
      margin-top: -4px !important;
    }
  }
}
</style>

