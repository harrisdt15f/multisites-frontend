<template>
  <section class="login">
    <section class="main">
      <div class="main-container">
        <div class="r">
          <div class="r-t">
            <div class="title">
              <div class="title-l">用户注册</div>
            </div>
            <el-form
              class="user-form"
              status-icon
              :model="userForm"
              :rules="userRules"
              label-width="100px"
              ref="userForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  style="width:250px"
                  placeholder="用户名"
                  v-model="userForm.username"
                  type="text"
                  required
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  style="width:250px"
                  placeholder="密码"
                  v-model="userForm.password"
                  type="password"
                  required
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  style="width:250px"
                  placeholder="确认密码"
                  v-model="userForm.checkPass"
                  type="password"
                  required
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button
                  class="login-btn"
                  :loading="loading"
                  type="primary"
                  @click="submitForm('userForm')"
                >注册</el-button>
                <el-button
                  class="login-btn"
                  :loading="loading"
                  style="margin-left: 30px;"
                  @click="submitForm('userForm')"
                >重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'register',
  props: ['code'],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userForm.checkPass !== '') {
          this.$refs.userForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      userForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    console.log(this.code)
  },
  methods: {
    login() {
      this.loading = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const sendData = {
            username: this.userForm.username,
            password: this.userForm.password,
            register_type: 2
          }
          if(this.code) sendData.keyword = this.code
          this.Api.register(sendData).then(({ success }) => {
           if (success) {
            this.$alert('用户注册成功', {
              confirmButtonText: '确定'
            })
            this.$store.dispatch('login', {
              username: this.userForm.username,
              password: this.userForm.password
            }).then(() => {
              this.$router.push('/home')
            })
           }
         })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  .main {
    .main-container {
      box-sizing: border-box;
      width: 1200px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      background: #fff;
      overflow: hidden;
      .l {
        float: left;
        width: 780px;
        height: 450px;
      }
      .r {
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        box-sizing: border-box;
        background: #fff;
        position: relative;
        .r-t {
          .title {
            padding: 10px 0 15px;
            border-bottom: 1px dashed #ccc;
            overflow: hidden;
            height: auto;
            font-weight: bold;
            .title-l {
              float: left;
              color: #ff7800;
              font-weight: 400;
              border-bottom: 1px solid #ff7800;
              font-size: 18px;
              line-height: 1.5;
            }
            .title-r {
              float: right;
              a {
                color: #58b3f6;
              }
              cursor: pointer;
              font-size: 18px;
              font-weight: 400;
            }
          }
        }
        .r-b {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 70px;
          padding: 0 30px;
          box-sizing: border-box;
          font-size: 16px;
          background: #f3eadd;
          text-align: right;
          line-height: 70px;
          .register {
            color: #b98f59;
            i {
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              text-align: center;
              line-height: 20px;
              background: #b98f59;
              color: #fff;
            }
          }
        }
      }
      .r-forget {
        margin: -10px 4px 7px 0;
        font-size: 13px;
      }
      .r-forget-link:hover {
        text-decoration: underline;
      }
    }
  }
}
.user-form {
  min-height: 400px;
  padding: 48px 0 15px 150px;
  /deep/ {
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #ff7800;
      border-color: #ff7800;
    }
    .el-button--primary {
      background-color: #ff7800;
      border-color: #ff7800;
    }
    .el-button--primary:focus,
    .el-button--primary:hover {
      background: #ff7800;
      border-color: #ff7800;
      color: #fff;
    }
  }
}
</style>
