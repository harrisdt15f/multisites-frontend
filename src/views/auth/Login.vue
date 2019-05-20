<template>
  <section class="login">
    <section class="main">
      <el-form :model="user" :rules="userRules" ref="userForm" label-width="150px">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="user.username" type="text" required clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="user.password" type="password" required clearable></el-input>
        </el-form-item>
        <el-form-item  label="是否记住密码">
          <el-checkbox v-model="isRemember.checked"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="submitForm('userForm')">登陆</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>&nbsp;&nbsp;
          <a class="btn btn-default">
            <router-link to="/register">没有账户？去注册</router-link>
          </a>
        </el-form-item>
      </el-form>
    </section>
  </section>
</template>


<script>

export default {
  name: 'login',
  components: {},
  data() {
    return {
      loading: false,
      user: { username: '', password: '', confirm_password: '' },
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度在 3 个以上', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在 6 个以上', trigger: 'blur' },
        ],
      },
      isRemember: {
        password:{},
        checked: true
      }
    };
  },
  created () {
    let rememberPassword = this.Utils.storage.get('rememberPassword');
    if (rememberPassword) {
      this.user.username = rememberPassword.data.account
      this.user.password = rememberPassword.data.password
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('login', {username: this.user.username, password: this.user.password})
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
        }).catch(() => {
          this.loading = false
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
  .main{
    margin:100px auto 0;
    width:500px;
  }
</style>
