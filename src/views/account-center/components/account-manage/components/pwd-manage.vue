<template>
  <div class="container pwd-manage">
    <div class="custion-radio">
      <el-radio-group v-model="radio1">
        <el-radio-button label="account">修改账户密码</el-radio-button>
        <el-radio-button label="funds">修改资金密码</el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="radio1 == 'account'">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="旧密码：" prop="pass">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="pass" class="new-pwd">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
          <span class="pwd-info">6-16位字符，需使用字母或数字</span>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="submit-btn">
        <button type="submit" class="form-button">提交修改</button>
      </div>
      <div class="bmn-time-content">
        <span class="bmn-time-text">
          <span class="bmn-form-icon-tips"></span>为了保证您的资金安全，请立即设置您的资金密码 &nbsp;&nbsp;
          <a
            @click="handleSetFundPass"
            class="btn"
            href="javascript:;"
          >立即设置</a>
        </span>
      </div>
    </div>
    <div v-else>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="旧密码：" prop="pass">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="pass" class="new-pwd">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
          <span class="pwd-info">6-16位字符，需使用字母或数字</span>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="submit-btn">
        <button type="submit" class="form-button">提交修改</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio1: 'account',
      form: {}
    }
  },
  methods: {
    handleSetFundPass(){
      this.$emit('showSetFund')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


