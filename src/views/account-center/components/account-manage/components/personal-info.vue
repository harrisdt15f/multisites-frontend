<template>
  <div class="personal-info">
    <div class="container pwd-manage" style="padding-top:40px;">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="用户名：" prop="pass">
          <el-input type="text" disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="pass">
          <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="pass">
          <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
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
  created() {
    Object.assign(this.form, this.userDetail)
  }
}
</script>

<style lang="scss" scoped>
</style>


