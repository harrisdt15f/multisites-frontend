<template>
  <div class="bank-manage">
    <div class="container" v-if="!haveCard">
      <div class="bank-manage">
        <div class="form-container">
          <div class="form-text">
            您还没有绑定银行卡：
            <button @click="handleOpenDialog" type="submit" class="form-button">立即绑定</button>
          </div>
        </div>
      </div>
    </div>
    <div class="create-bank" v-if="showCreateBank">
      <el-row class="title">
        <el-col :span="12" :class="{on : !this.createResult}">1.输入银行卡信息</el-col>
        <el-col :span="12" :class="{on : this.createResult}">2.绑定结果</el-col>
      </el-row>
      <div class="content">
        <div v-if="!createResult">
          <el-form
            :model="cardForm"
            :rules="rules"
            ref="cardForm"
            label-width="120px"
            class="card-form"
          >
            <el-form-item label="开户银行：" prop="bank_sign">
              <el-select
                style="width:285px"
                popper-class="single-price"
                v-model="cardForm.bank_sign"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in cardOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户银行区域：" prop="province_id">
              <el-select
                style="margin-right:15px;width:285px"
                popper-class="single-price"
                v-model="cardForm.province_id"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in provinceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                style="width:285px"
                popper-class="single-price"
                v-model="cardForm.city_id"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in cityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户支行名称：" prop="branch">
              <el-input style="width:285px" v-model="cardForm.branch"></el-input>
            </el-form-item>
            <el-form-item label="持卡人姓名：" prop="owner_name">
              <el-input style="width:285px" v-model="cardForm.owner_name"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号：" prop="card_number">
              <el-input style="width:285px" v-model="cardForm.card_number"></el-input>
            </el-form-item>
            <el-form-item>
              <div @click="handleAddCard" type="submit" class="form-button">确认提交</div>
            </el-form-item>
          </el-form>
        </div>
        <div v-else class="create-success">
          <h3>恭喜您，银行卡绑定成功</h3>
          <p>新的银行卡将在2小时0分钟后可以发起“平台体现”</p>
          <div class="form-text">
            您现在可以：
            <button @click="handleManageBank" type="submit" class="form-button">银行卡管理</button>
          </div>
        </div>
      </div>
    </div>
    <div class="show-manage-bank" v-if="showManageBank">
      <p>一个游戏账户最多绑定4张银行卡，您目前绑定了1张卡，还可以绑定3张。</p>
      <p>发起第一次提现后，系统会自动锁定银行卡。</p>
      <p>为了您的账户资金安全，银行卡“新增”和“修改”将在操作完成2小时0分后，新卡才能发起“向平台提现”。</p>
      <div class="custom-table" style="margin-top:15px;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="center" label="银行卡号">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="卡号">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="绑定时间">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="更新时间">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="银行卡状态">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="form-text">
        <button class="form-button" style="margin-right:30px;">增加绑定</button>
        <button class="form-button">锁定银行卡</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '中国工商银行'
        }
      ],
      haveCard: false,
      showCreateBank: false,
      showManageBank: false,
      cardOptions: [
        {
          value: 'icbc',
          label: '黄金糕'
        }
      ],
      createResult: 1,
      provinceOptions: [
        {
          value: 'icbc',
          label: '黄金糕'
        }
      ],
      cityOptions: [
        {
          value: 'icbc',
          label: '黄金糕'
        }
      ],
      cardForm: {
        bank_sign: '',
        province_id: 1,
        city_id: 12,
        card_number: '',
        fund_password: '',
        branch: '',
        owner_name: ''
      },
      rules: {
        bank_sign: [
          { required: true, message: '请选择开户银行', trigger: 'blur' }
        ],
        province_id: [
          { required: true, message: '请选择开户银行区域', trigger: 'blur' }
        ],
        branch: [
          { required: true, message: '请填写开户支行名称', trigger: 'blur' }
        ],
        owner_name: [
          { required: true, message: '请填写持卡人姓名', trigger: 'blur' }
        ],
        card_number: [
          { required: true, message: '请填写银行卡号', trigger: 'blur' }
        ]
      },
      cardIndex: 0
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.Api.getCardList().then(res => {
        const { status, data } = res
        if (status && data) {
          data.length > 0 ? (this.haveCard = true) : (this.haveCard = false)
        }
      })
    },
    handleOpenDialog() {
      this.showCreateBank = true
      this.haveCard = true
    },
    handleAddCard() {
      this.$refs['cardForm'].validate(valid => {
        if (valid) {
          this.Api.bindCard(this.cardForm).then(res => {
            console.log(res)
          })
        }
      })
    },
    handleManageBank() {
      this.showCreateBank = false
      this.showManageBank = true
    }
  }
}
</script>

<style lang="scss" scoped>
.create-bank {
  .title {
    text-align: center;
    .on {
      color: #ff8900;
    }
  }
  .card-form {
    margin-left: 240px;
    margin-top: 30px;
  }
  .create-success {
    font-size: 16px;
    text-align: center;
    margin: 80px auto 100px;
    p {
      margin: 15px auto 30px;
    }
  }
}
.show-manage-bank {
  margin: 0 35px 35px;
  & > p {
    margin-bottom: 5px;
  }
  .form-text{
    text-align: center;
    margin-top: 30px;
  }
}
</style>
