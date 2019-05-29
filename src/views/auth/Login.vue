<template>
  <section class="login">
    <section class="main">
      <div class="main-container">
        <div class="l">
          <img src="../../assets/images/login_bg_l.jpg" width="100%" height="100%">
        </div>
        <div class="r">
          <div class="title">
            <div class="title-l">
              LOGO
            </div>
            <div class="title-r">
              欢迎登录
            </div>
          </div>
          <el-form class="user-form" :model="user" :rules="userRules" ref="userForm" >
            <el-form-item prop="username">
              <el-input placeholder="用户名" v-model="user.username" type="text" required clearable>
                <template slot="prepend">
                  <i class="el-icon-user-solid"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="密码"
                v-model="user.password"
                type="password"
                required
                clearable>
              <template slot="prepend">
                  <i class="el-icon-lock"></i>
                </template>
              </el-input>
            </el-form-item>
            <!-- <el-form-item  label="是否记住密码">
                <el-checkbox v-model="isRemember.checked"></el-checkbox>
            </el-form-item>-->
            <el-form-item>
              <el-button class="login-btn" :loading="loading" type="primary" @click="submitForm('userForm')">登陆</el-button>
            </el-form-item>
            <p class="fw r-forget"><a class="fr cur r-forget-link">忘记密码</a></p>
          </el-form>
          <ul class="r-bottom">
            <li class="btn r-bottom-list">
              联系客服
              <span class="r-bottom-line">|</span>
            </li>
            <li class="btn r-bottom-list cur r-bottom-register">
              <span class="r-bottom-list-icon"><i class="fa fa-angle-right"></i></span>
              立即注册
            </li>
          </ul>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </section>
</template>


<script>
import Footer from '../../components/footer_new'

export default {
  name: 'login',
  components: {
    Footer
  },
  data() {
    return {
      loading: false,
      user: { username: '', password: '', confirm_password: '' },
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度在 3 个以上', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在 6 个以上', trigger: 'blur' }
        ]
      },
      isRemember: {
        password: {},
        checked: true
      }
    }
  },
  created() {
    let rememberPassword = this.Utils.storage.get('rememberPassword')
    if (rememberPassword) {
      this.user.username = rememberPassword.data.account
      this.user.password = rememberPassword.data.password
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store
        .dispatch('login', {
          username: this.user.username,
          password: this.user.password
        })
        .then(() => {
          this.loading = false
          if (this.isRemember.checked) {
            let rememberPassword = {
              account: this.user.username,
              password: this.user.password
            }
            this.Utils.storage.set('rememberPassword', rememberPassword)
          } else {
            let rememberPassword = this.Utils.storage.get('rememberPassword')
            if (rememberPassword) {
              this.Utils.storage.remove('rememberPassword')
            }
          }
          this.$router.push('/home')
        })
        .catch(() => {
          this.loading = false
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
  background: url("../../assets/images/login_bg.jpg") no-repeat center 96px #fefaf3;
  background-size: cover;
  padding: 142px 0;
  .main-container {
    width: 1200px;
    height: 450px;
    margin: 0 auto;
    overflow: hidden;
    .l {
      float: left;
      width: 780px;
      height: 450px;
    }
    .r {
      position:relative;
      float: right;
      height: 450px;
      width: 420px;
      overflow: hidden;
      box-sizing: border-box;
      padding: 30px;
      background: #fff;
      .title{
        overflow: hidden;
        height: auto;
        margin: 10px 0;
        font-weight: bold;
        .title-l{
          float: left;
          color: #d0b085;
          font-size: 42px;
          line-height: 1.5;
        }
        .title-r{
          float: right;
          font-size: 20px;
          vertical-align: bottom;
          margin-top: 20px;
          font-weight: 600;
        }
      }
      .r-bottom{
        position:absolute;
        bottom:0;
        left:0;
        width:calc(100% - 56px);
        padding:0 28px;
        height:55px;
        line-height:55px;
        text-align: right;
        background:#f6eadc;
      }
      .r-bottom-list{
        display:inline-block;
        padding:0 5px;
        color:#d3a977;
        cursor: pointer;
        transition:all .3s;
      }
      .r-bottom-list:hover{
        color:#403a38;
      }
      .r-bottom-list-icon{
        display:inline-block;
        margin-right:2px;
        width:17px;
        height:17px;
        line-height:16px;
        text-align:center;
        background:#d3a977;
        color:#fff;
        border-radius:50%;
        text-indent:1px;
      }
      .r-bottom-line{
        padding-left:5px;
        color:#d3a977;
      }
      .r-forget{
        margin: -10px 4px 7px 0;
        font-size: 13px;
      }
      .r-forget-link:hover{
        text-decoration: underline;
      }
    }
  }
}
.user-form{
  /deep/ {
    .el-form-item__content{
      line-height: 48px;
      .el-input-group{
        line-height: 48px;
      }
      .el-input__inner{
        height: 48px;
        line-height: 48px;
      }
    }
    .el-input-group__prepend{
      box-sizing: border-box;
      padding: 0;
      border: 0;
      width: 46px;
      text-align: center;
      border-radius: 0;
      background: #f3eadd;
      i{
        color: #ccaa7d;
        font-size: 18px;
      }
    }
    .login-btn{
      border-radius: 0;
      width: 100%;
      background-color: #dec4a4;
      border-color: #dec4a4;
      &:hover{
        background-color: #d6af7f;
        border-color: #d6af7f;
      }
    }
  }
}
</style>
