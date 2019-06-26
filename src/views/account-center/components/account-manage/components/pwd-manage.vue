<template>
  <div class="container pwd-manage">
    <div class="custion-radio">
      <el-radio-group v-model="radio1">
        <el-radio-button label="account">修改账户密码</el-radio-button>
        <el-radio-button label="funds">修改资金密码</el-radio-button>
      </el-radio-group>
    </div>
      <div v-if="radio1 == 'account'">
      <el-form ref="form" :rules="rules" :model="form" label-width="90px">
        <el-form-item label="旧密码：" prop="oldPass">
          <el-input type="password" v-model="form.oldPass" autocomplete="off"></el-input>
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
        <button type="submit" @click="handleChangePass" class="form-button">提交修改</button>
      </div>
      <div class="bmn-time-content" v-if="!existFundPassword">
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
      <el-form ref="fundForm" :rules="fundRules" :model="fundForm" label-width="90px">
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
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateFundPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validateFundPass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      radio1: 'account',
      form: {
        oldPass: '',
        pass: '',
        checkPass: ''
      },
      fundForm: {
        oldPass: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        oldPass: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },
      fundRules: {
        oldPass: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        pass: [{ validator: validateFundPass, trigger: 'blur' }],
        checkPass: [{ validator: validateFundPass2, trigger: 'blur' }]
      }
    }
  },
  props: ['existFundPassword'],
  computed: {},
  methods: {
    handleSetFundPass() {
      this.$emit('showSetFund')
    },
    handleChangePass() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const sendData = {
            old_password: this.form.oldPass,
            new_password: this.form.pass,
            confirm_password: this.form.checkPass
          }
          this.Api.resetUserPassword(sendData).then(({ success, data }) => {
            if (success) {
              this.$alert('账户密码修改成功！', '提示', {
                confirmButtonText: '确定'
              })
              this.form = {}
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>


