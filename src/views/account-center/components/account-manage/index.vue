<template>
  <div class="bet-record sub-account">
    <el-tabs v-model="activeName">
      <el-tab-pane :lazy="true" label="个人资料" name="personal-info">
        <personal-info></personal-info>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="密码管理" name="pwd-manage">
        <pwd-manage :existFundPassword="existFundPassword" @showSetFund="handleshowFundPwd"></pwd-manage>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="银行卡管理" name="bank-manage">
        <bank-manage></bank-manage>
      </el-tab-pane>
    </el-tabs>
    <el-dialog class="dialog-create-pass" title="创建资金密码" :visible.sync="showSetFund">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password">
          <el-input type="password" v-model="ruleForm.confirm_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import pwdManage from './components/pwd-manage'
import bankManage from './components/bank-manage'
import personalInfo from './components/personal-info'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.confirm_password !== '') {
          this.$refs.ruleForm.validateField('confirm_password')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'personal-info',
      showSetFund: false,
      ruleForm: {
        password: '',
        confirm_password: ''
      },
      existFundPassword: undefined,
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        confirm_password: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  components: {
    pwdManage,
    bankManage,
    personalInfo
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.Api.existFundPassword().then(({ data, success }) => {
        if (success) {
          this.existFundPassword = data
        }
      })
    },
    handleshowFundPwd() {
      this.ruleForm = {
        password: '',
        confirm_password: ''
      }
      this.showSetFund = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.Api.setFundPassword(this.ruleForm).then(({ success }) => {
            this.showSetFund = false
            if (success) {
              this.initData()
              this.$alert('设置资金密码成功成功！', '提示', {
                confirmButtonText: '确定'
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.bet-record {
  .container {
    padding: 0 35px 35px;
  }
  .pwd-manage {
    /deep/ {
      .el-input,
      .el-textarea {
        width: 300px;
      }
    }
    .h1 {
      color: #ff8900;
      font-size: 16px;
      font-weight: 400;
      margin: 20px 0;
    }
    .pwd-info {
      padding-left: 15px;
      font-size: 14px;
      color: #9b9b9b;
    }
  }
  .submit-btn {
    padding: 20px 95px;
    text-align: left;
  }
  .form-button {
    width: 150px;
    height: 45px;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    color: white;
    font-size: 16px;
    border-radius: 3px;
    background-image: linear-gradient(0deg, #ff8400 0%, #ffa200 100%),
      linear-gradient(#ff9700, #ff9700);
    background-blend-mode: normal, normal;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
    border: 1px solid;
    border-image-source: linear-gradient(0deg, #d78700 0%, #e58f00 100%);
    border-image-slice: 1;
  }
}
.bmn-time-content {
  color: #999999;
  margin-left: 40px;
  margin-top: 30px;
  .btn {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    border: none;
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    border-radius: 2px;
    outline: none;
    padding-bottom: 2px;
    font-family: microsoft yahei;
    background-image: linear-gradient(to top, #ff8400, #ff8400);
    background-color: #ff8400;
    border: 1px solid #ccc;
    color: #fff;
    box-shadow: none;
  }
}
.bank-manage {
  .form-container {
    text-align: center;
    padding: 50px 95px;
    position: relative;
    font-size: 14px;
    color: #222222;
    line-height: 20px;
    margin-left: 16px;
  }
}
.custion-radio {
  margin-bottom: 30px;
}
.dialog-create-pass {
  /deep/ {
    .el-button--primary {
      background-color: #ff8900;
      border-color: #ff8900;
    }
  }
}
</style>
