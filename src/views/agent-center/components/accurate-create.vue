<template>
  <div class="accurate-create">
    <el-form class="create-form" ref="form" :model="form" label-width="100px">
      <el-form-item label="开户方式：">
        <el-radio-group @change="resourceChange" v-model="form.resource">
          <el-radio border label="人工开户"></el-radio>
          <el-radio border label="链接开户"></el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="form.resource === '人工开户'">
        <el-form-item label="用户名：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pass">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设置奖金组：" prop="num">
          <el-slider v-model="form.countPrize" :min="prizes.min" :max="prizes.max"></el-slider>
          {{form.countPrize}} / {{prizes.max}}
        </el-form-item>
        <el-form-item>
          预计平均返点率
          <span class="gold">8.00%</span>奖金详情
        </el-form-item>
        <el-form-item class="custom-progress">
          <span class="current-num" :style="`color:#db0808;margin-left:${97 - 8}%`">1900</span>
          <el-progress
            color="#d8c6b1"
            :text-inside="true"
            :stroke-width="15"
            :percentage="97"
            status="exception"
          ></el-progress>
          <div class="progress-bar">
            <span class="min">1800</span>
            <span class="max">1960</span>
          </div>
        </el-form-item>
        <div class="submit-btn">
          <el-button size="medium" @click="onSubmit">立即开户</el-button>
        </div>
      </template>
      <template v-else>
        <el-form-item label="链接有效期：">
          <el-select v-model="value"  placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广渠道：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="设置奖金组：" prop="num">
          <el-slider v-model="form.countPrize" :min="prizes.min" :max="prizes.max"></el-slider>
          {{form.countPrize}} / {{prizes.max}}
        </el-form-item>
        <el-form-item>
          预计平均返点率
          <span class="gold">8.00%</span>奖金详情
        </el-form-item>
        <el-form-item class="custom-progress">
          <span class="current-num" :style="`color:#db0808;margin-left:${97 - 8}%`">1900</span>
          <el-progress
            color="#d8c6b1"
            :text-inside="true"
            :stroke-width="15"
            :percentage="97"
            status="exception"
          ></el-progress>
          <div class="progress-bar">
            <span class="min">1800</span>
            <span class="max">1960</span>
          </div>
        </el-form-item>
        <div class="submit-btn">
          <el-button size="medium" @click="onSubmit">立即开户</el-button>
        </div>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'accurate-create',
  data() {
    return {
      prizes: {
        min: 1800,
        max: 1960
      },
      form: {
        resource: '人工开户',
        name: '',
        pass: '',
        num: 1800,
        countPrize: 1920,
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        desc: ''
      }
    }
  },
  methods: {
    resourceChange(v) {
      if (v === '链接开户') {
      }
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.create-form {
  width: 520px;
  margin: 30px auto;
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
    .el-slider {
      width: 70%;
      margin: 0;
      padding-right: 15px;
    }
  }
}
.submit-btn {
  text-align: center;
  margin-top: 50px;
  /deep/ {
    .el-button--medium {
      padding: 20px 50px;
    }
  }
}
.progress-bar {
  overflow: hidden;
  .max {
    float: right;
  }
  .min {
    float: left;
  }
}
.custom-progress {
  .el-form-item__content {
    line-height: 1;
  }
}
</style>

