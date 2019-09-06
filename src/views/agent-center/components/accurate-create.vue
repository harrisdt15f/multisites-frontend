<template>
  <div class="accurate-create">
    <el-form class="create-form" label-width="100px">
      <el-form-item label="开户方式：">
        <el-radio-group v-model="resource" @change="tabChange">
          <el-radio border label="人工开户"></el-radio>
          <el-radio border label="链接开户"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!-- 人工开户 -->
    <template v-if="resource === '人工开户'">
      <el-form :rules="rules" class="create-form" label-width="100px" ref="form" :model="form">
        <el-form-item label="用户名：" prop="username">
          <el-input placeholder="请输入用户名" style="width:280px" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            placeholder="请输入密码"
            style="width:280px"
            type="password"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="设置奖金组：" prop="prize_group">
          <el-slider v-model="form.prize_group" :min="prizes.min" :max="prizes.max"></el-slider>
          {{form.prize_group}} / {{prizes.max}}
        </el-form-item>
        <!-- <el-form-item style="margin-bottom:5px;">
          预计平均返点率
          <span class="gold">{{rebateRate}}%</span>
        </el-form-item>
        <el-form-item class="custom-progress">
          <span
            class="current-num"
            :style="`color:#db0808;margin-left:${(form.prize_group-prizes.min)/(prizes.max-prizes.min) * 100 - 2}%`"
          >{{form.prize_group}}</span>
          <el-progress
            color="#d8c6b1"
            :stroke-width="15"
            :show-text="false"
            :percentage="(form.prize_group-prizes.min)/(prizes.max-prizes.min) * 100"
          ></el-progress>
          <div class="progress-bar">
            <span class="min">{{prizes.min}}</span>
            <span class="max">{{prizes.max}}</span>
          </div>
        </el-form-item> -->
      </el-form>
      <div class="submit-btn">
        <el-button :loading="submitLoading" size="medium" @click="onSubmit">立即开户</el-button>
      </div>
    </template>
    <!-- 链接开户 -->
    <template v-else>
      <el-form
        :rules="linkRules"
        class="create-form"
        label-width="100px"
        ref="linkForm"
        :model="linkForm">
        <el-form-item label="开户类型：" prop="is_agent">
          <el-radio-group v-model="linkForm.is_agent">
            <el-radio-button label=0>会员</el-radio-button>
            <el-radio-button label=1>代理</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="链接有效期：" prop="expire">
          <el-select v-model="linkForm.expire" placeholder="请选择">
            <el-option
              style="text-align:center"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广渠道：" prop="channel">
          <el-input style="width:250px" placeholder="如：QQ推广群" v-model="linkForm.channel"></el-input>
        </el-form-item>
        <el-form-item label="设置奖金组：" prop="prize_group">
          <el-slider v-model="linkForm.prize_group" :min="prizes.min" :max="prizes.max"></el-slider>
          {{linkForm.prize_group}} / {{prizes.max}}
        </el-form-item>
        <!-- <el-form-item style="margin-bottom:5px;">
          预计平均返点率
          <span class="gold">{{linkRebateRate}}%</span>
        </el-form-item>
        <el-form-item class="custom-progress">
          <span
            class="current-num"
            :style="`color:#db0808;margin-left:${(linkForm.prize_group-prizes.min)/(prizes.max-prizes.min) * 100 - 2}%`"
          >{{linkForm.prize_group}}</span>
          <el-progress
            color="#d8c6b1"
            :stroke-width="15"
            :show-text="false"
            :percentage="(linkForm.prize_group-prizes.min)/(prizes.max-prizes.min) * 100"
          ></el-progress>
          <div class="progress-bar">
            <span class="min">{{prizes.min}}</span>
            <span class="max">{{prizes.max}}</span>
          </div>
        </el-form-item> -->
      </el-form>
      <div class="submit-btn">
        <el-button :loading="submitLoading" size="medium" @click="onSubmitLink">立即开户</el-button>
      </div>
      <el-table
        v-show="links && links.length"
        :data="links"
        border
        style="width: 100%;margin:20px auto"
      >
        <el-table-column align="center" prop="channel" label="投放渠道"></el-table-column>
        <el-table-column align="center" prop="is_agent" label="开户类型">
          <template slot-scope="scope">
            <span v-if="scope.row.is_agent == 1">代理</span>
            <span v-else>会员</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="prize_group" label="奖金组"></el-table-column>
        <el-table-column align="center" prop="register_count" label="注册人数"></el-table-column>
        <el-table-column align="center" prop="issue" label="有效期">
          <template
            slot-scope="scope"
          >{{(options.filter(val => val.value == scope.row.valid_days)[0].label) }}</template>
        </el-table-column>
        <el-table-column width="340" align="center" label="复制链接">
          <template slot-scope="scope" show-overflow-tooltip>
            <span style="margin-right:4px;">{{ `${currentUrl}${scope.row.url}` }}</span>
            <el-button
              size="mini"
              v-clipboard:copy="`${currentUrl}${scope.row.url}`"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >复制</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" width="180" prop="created_at" label="生成时间"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="deleteLink(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
var validateUser = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    if (!(/^[a-zA-Z0-9_-]{4,18}$/).test(value)) {
      callback(new Error('请输入4-12位英文或者数字组成的用户名'))
    }
    callback()
  }
}
export default {
  name: 'accurate-create',
  data() {
    return {
      links: [],
      submitLoading: false,
      rebateRate: 0,
      linkRebateRate: 0,
      // 设置奖金组
      prizes: {
        min: null,
        max: null
      },
      resource: '人工开户',
      // 链接有效期
      options: [
        {
          value: 1,
          label: '1天'
        },
        {
          value: 7,
          label: '7天'
        },
        {
          value: 30,
          label: '30天'
        },
        {
          value: 90,
          label: '90天'
        },
        {
          value: 0,
          label: '永久有效'
        }
      ],
      // 人工开户
      form: {
        username: '',
        password: '',
        register_type: 1,
        prize_group: 0
      },
      // 链接开户
      linkForm: {
        expire: 0,
        is_agent: 0,
        channel: '',
        prize_group: 0
      },
      currentUrl: '',
      linkRules: {
        channel: [
          { required: true, message: '请输入推广渠道', trigger: 'blur' }
        ]
      },
      rules: {
        username: [
          { required: true, validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度应在 6-18 之间,', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 人工开户设置奖金组
    'form.prize_group'(newVal) {
      this.rebateRate = (
        ((this.prizes.max - newVal) / this.prizes.max) *
        100
      ).toFixed(2)
    },
     // 链接开户设置奖金组
    'linkForm.prize_group'(newVal) {
      this.linkRebateRate = (
        ((this.prizes.max - newVal) / this.prizes.max) *
        100
      ).toFixed(2)
    }
  },
  created() {
    this.initData()
    this.currentUrl = window.location.host
  },
  methods: {
    //清空验证
    tabChange(){
      this.$refs['form'] && this.$refs['form'].clearValidate()
      this.$refs['linkForm'] && this.$refs['linkForm'].clearValidate()
    },
    //获取开户链接信息
    initData() {
      this.Api.getRegisterableLink().then(({ success, data }) => {
        if (success) {
          const { links, max_user_prize_group, min_user_prize_group } = data
          // 最大奖金组
          this.prizes.min = parseInt(min_user_prize_group)
          // 最小奖金组
          this.prizes.max = parseInt(max_user_prize_group)
          this.links = links.data
        }
      })
    },
    //复制成功
    onCopy() {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    //复制失败
    onError() {
      this.$message.error('复制失败')
    },
    // 人工开户
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.submitLoading = true
          this.Api.register(this.form).then(({ success }) => {
            this.submitLoading = false
            if (success) {
              this.$alert('开户创建成功', {
                confirmButtonText: '确定'
              })
              this.form.username = ''
              this.form.password = ''
            }
          })
        }
      })
    },
    // 链接开户
    onSubmitLink() {
      this.$refs['linkForm'].validate(valid => {
        if (valid) {
          this.submitLoading = true
          this.Api.createRegisterLink(this.linkForm).then(({ success }) => {
            this.submitLoading = false
            if (success) {
              this.$alert('链接开户创建成功', {
                confirmButtonText: '确定'
              })
              this.initData()
            }
          })
        }
      })
    },
    //删除链接开户
    deleteLink(row) {
      this.Api.deleteRestisterLink({ id: row.id }).then(({ success }) => {
        if (success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.initData()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/var.scss";
.create-form {
  width: 520px;
  margin: 30px auto;
  /deep/ {
    .el-radio.is-bordered.is-checked {
      border-color: $primary-color;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #000;
    }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: $primary-color;
      background: $primary-color;
    }
    .el-slider {
      width: 70%;
      margin: 0;
      padding-right: 15px;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
      background-color: $primary-color;
      border-color: $primary-color;
      box-shadow: -1px 0 0 0 $primary-color;
    }
  }
}
.submit-btn {
  text-align: center;
  margin-top: 50px;
  /deep/ {
    .el-button--medium {
      padding: 15px 50px;
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

