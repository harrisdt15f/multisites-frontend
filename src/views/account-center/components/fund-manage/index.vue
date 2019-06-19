<template>
  <div class="bet-record sub-account">
    <el-tabs v-model="activeName">
      <el-tab-pane label="充值" name="recharge">
        <recharge></recharge>
      </el-tab-pane>
      <el-tab-pane label="提款" name="withdrawal">
        <withdrawal></withdrawal> 
      </el-tab-pane>
      <el-tab-pane label="额度转换" name="transfer">
        <transfer></transfer>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import recharge from './components/recharge'
import transfer from './components/transfer'
import withdrawal from './components/withdrawal'
export default {
  inject:['active'],
  data() {
    return {
      activeName: '',
      value1: ''
    }
  },
  components: {
    recharge, transfer, withdrawal
  },
  created () {
    this.activeName = this.active ? this.active : 'recharge'
  }
}
</script>
