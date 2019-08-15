<template>
  <div class="personal-info">
    <div class="container pwd-manage" style="padding-top:15px;">
      <div class="parsonal-info-head">
        <el-row>
          <el-col :span="12">
            <span class="tit">最近登录时间</span> 2019-06-15 11:46:15
          </el-col>
          <el-col :span="12">
            <span class="tit">注册时间</span> 2019-06-1 11:46:15
          </el-col>
          <el-col :span="12">
            <span class="tit">最近登陆地址</span> 菲律宾
          </el-col>
        </el-row>
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="90px">
        <div class="form-title">个人资料</div>
        <el-form-item label="用户名：" prop="username">
          <el-input type="text" disabled v-model="userDetail.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickname">
          <el-input type="text" :disabled="isDisabled" v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="realname" style="margin-bottom:40px;">
          <el-input type="text" :disabled="isDisabled" v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>
        <div class="form-title">联系方式</div>
        <el-form-item label="手机号码：" prop="mobile">
          <el-input type="text" v-model="form.mobile" :disabled="isDisabled" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="个人邮箱：" prop="email">
          <el-input type="text" v-model="form.email" :disabled="isDisabled" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱编码：" prop="zip_code">
          <el-input type="text" v-model="form.zip_code" :disabled="isDisabled" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input
            type="textarea"
            v-model="form.address"
            :disabled="isDisabled"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="submit-btn">
        <button @click="handleEdit" v-if="isBtn === 'edit'" type="submit" class="form-button">编辑</button>
        <button
          @click="handleSubmit"
          v-if="isBtn === 'submit'"
          type="submit"
          class="form-button">提交修改</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        nickname: '',
        realname: '',
        mobile: '',
        email: '',
        zip_code: '',
        address: ''
      },
      isDisabled: true, //是否修改
      isBtn: 'edit',
      rules: {
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userDetail'])
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.Api.userSpecificInfos().then(({ data, success }) => {
        if (success) {
          Object.assign(this.form, data)
        }
      })
    },
    // 编辑
    handleEdit() {
      this.isBtn = 'submit'
      this.isDisabled = false
    },
    // 提交修改
    handleSubmit() {
      this.Api.resetSpecificInfos(this.form).then(({ data, success }) => {
        if (success) {
          this.isBtn = 'edit'
          this.isDisabled = true
          this.initData()
        }
      })
      
    }
  }
}
</script>

<style lang="scss" scoped>
.parsonal-info-head {
  background: #f6f6f7;
  width: 600px;
  margin-bottom: 30px;
  padding: 5px 15px;
  line-height: 3;
  .tit {
    color: #ff8900;
    margin-right: 5px;
  }
}
.form-title {
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0;
  border-left: 3px solid #ff8900;
  padding-left: 10px;
}
.personal-info {
  /deep/ {
    .el-input.is-disabled .el-input__inner {
      padding: 5px 3px;
      background-color: #fff;
      border-color: #fff;
      color: #606266;
    }
    .el-textarea.is-disabled .el-textarea__inner {
      background-color: #fff;
      border-color: #fff;
      color: #606266;
    }
    .el-form-item__label{
      padding:0;
    }
    .el-textarea__inner{
      padding: 5px 3px;
    }
  }
}
</style>


