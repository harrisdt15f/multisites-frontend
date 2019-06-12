<template>
  <div class="accurate-create">
    <el-form class="create-form" ref="form" :model="form" label-width="100px">
      <el-form-item label="开户方式：">
        <el-radio-group v-model="form.resource">
          <el-radio border label="人工开户"></el-radio>
          <el-radio border label="链接开户"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="pass">
        <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="设置奖金组：" prop="num">
        <el-input-number v-model="form.num" :min="1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即开户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'accurate-create',
  data() {
    return {
      form: {
        name: '',
        pass: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.create-form {
  width: 520px;
  margin: 60px auto;
  /deep/ {
    .el-radio.is-bordered.is-checked {
      border-color: #ff8900;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #000;
    }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #ff8900;
      background: #ff8900;
    }
  }
}
</style>

