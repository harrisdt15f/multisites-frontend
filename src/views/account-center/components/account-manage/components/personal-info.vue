<template>
  <div class="personal-info">
    <div class="container pwd-manage" style="padding-top:15px;">
      <div class="parsonal-info-head">
        <el-row>
          <el-col :span="12"><span class="tit">最近登录时间</span> 2019-06-15 11:46:15</el-col>
          <el-col :span="12"><span class="tit">注册时间</span> 2019-06-1 11:46:15</el-col>
          <el-col :span="12"><span class="tit">最近登陆地址</span> 菲律宾</el-col>
        </el-row>
      </div>
      <el-form ref="form" :model="form" label-width="90px">
        <div class="form-title">个人资料</div>
        <el-form-item label="用户名：" prop="pass">
          <el-input type="text" disabled v-model="userDetail.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="pass">
          <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="pass">
          <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <div class="form-title">联系方式</div>
        <el-form-item label="手机号码：" prop="pass">
          <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="个人邮箱：" prop="pass">
          <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱编码：" prop="pass">
          <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址：" prop="pass">
          <el-input type="textarea" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="submit-btn">                                                                                                                                                                                                                                                                                              
        <button type="submit" class="form-button">提交修改</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {}
    }
  },
  computed: {
    ...mapGetters(['userDetail'])
  },
  created() {      <div class="item">最近登录时间</div>

    
    this.initData()
  },
  methods: {
    initData(){
      this.Api.userSpecificInfos().then(({data, success}) => {
        if (success) {
          console.log(data)
        }
      })
      Object.assign(this.form, this.userDetail)
    }
  }
}
</script>

<style lang="scss" scoped>
.parsonal-info-head{
  background: #f6f6f7;
  width: 600px;
  margin-bottom: 30px;
  padding: 5px 15px;
  line-height: 3.0;
  .tit{
    color: #ff8900;
    margin-right: 5px;
  }
}
.form-title{
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0;
  border-left: 3px solid #ff8900;
  padding-left: 10px;
}
</style>


