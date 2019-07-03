<template>
  <div class="bank-manage" v-loading="loading">
    <div class="container" v-if="!haveBankCard">
      <div class="bank-manage">
        <div class="form-container">
          <div class="form-text">
            您还没有绑定银行卡：
            <button @click="handleOpenDialog" type="submit" class="form-button">立即绑定</button>
          </div>
        </div>
      </div>
    </div>
    <div class="show-manage-bank" v-if="showManageBank">
      <p>一个游戏账户最多绑定4张银行卡，您目前绑定了{{tableData.length}}张卡，还可以绑定{{4-tableData.length}}张。</p>
      <p>发起第一次提现后，系统会自动锁定银行卡。</p>
      <p>为了您的账户资金安全，银行卡“新增”和“修改”将在操作完成2小时0分后，新卡才能发起“向平台提现”。</p>
      <div class="custom-table" style="margin-top:15px;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="center" label="银行名称">
            <template slot-scope="scope">
              <span>{{ scope.row.bank_name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="卡号">
            <template slot-scope="scope">
              <span>{{ scope.row.card_number }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="绑定时间">
            <template slot-scope="scope">
              <span>{{ scope.row.created_at }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="更新时间">
            <template slot-scope="scope">
              <span>{{ scope.row.updated_at }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="银行卡状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">禁用</span>
              <span v-else>可用</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="delectBankCard(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="form-text">
        <button class="form-button" @click="handleAddCreate" style="margin-right:30px;">增加绑定</button>
        <button class="form-button">锁定银行卡</button>
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
                  :key="item.id"
                  :label="item.title"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户银行区域：" prop="province_id">
              <el-select
                style="margin-right:15px;width:285px"
                popper-class="single-price"
                v-model="cardForm.province_id"
                @change="handleChangeProvince"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in provinceOptions"
                  :key="item.region_id"
                  :label="item.region_name"
                  :value="item.region_id"
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
                  :key="item.region_id"
                  :label="item.region_name"
                  :value="item.region_id"
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
            <button @click="goToBankManage" type="submit" class="form-button">银行卡管理</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      haveBankCard: false,
      showCreateBank: false,
      showManageBank: false,
      cardOptions: [
        {
          value: 'icbc',
          label: '黄金糕'
        }
      ],
      createResult: 0,
      provinceOptions: [],
      cityOptions: [],
      cardForm: {
        bank_sign: '',
        province_id: undefined,
        city_id: undefined,
        card_number: '',
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
      this.getCardList()
      this.Api.bankLists().then(({ success, data }) => {
        if (success) {
          this.cardOptions = data
        }
      })
      this.Api.provinceLists().then(({ success, data }) => {
        if (success) {
          this.provinceOptions = data
        }
      })
    },
    fetchCardList() {
      return new Promise((resolve, reject) => {
        this.Api.getCardList().then(res => {
          const { success, data } = res
          if (success) {
            this.tableData = data
            resolve(res)
          }
        })
      })
    },
    getCardList() {
      this.loading = true
      this.fetchCardList().then(res => {
        this.loading = false
        const { success, data } = res
        if (success && data) {
          if (data.length) {
            this.haveBankCard = true
            this.showManageBank = true
          } else {
            this.haveBankCard = false
            this.showManageBank = false
            this.showCreateBank = false
          }
        }
      })
    },
    handleChangeProvince(id) {
      this.Api.cityLists({ region_parent_id: id }).then(({ success, data }) => {
        if (success) {
          this.cityOptions = data
        }
      })
    },
    restFrom() {
      this.cardForm = {
        bank_sign: '',
        province_id: undefined,
        city_id: undefined,
        card_number: '',
        branch: '',
        owner_name: ''
      }
    },
    handleOpenDialog() {
      this.restFrom()
      this.showCreateBank = true
      this.haveBankCard = true
    },
    handleAddCard() {
      this.$refs['cardForm'].validate(valid => {
        if (valid) {
          const sendData = Object.assign({}, this.cardForm)
          Object.assign(sendData, {
            bank_name: this.cardOptions.filter(
              v => v.code === this.cardForm.bank_sign
            )[0].title,
            province_id: this.provinceOptions.filter(
              v => v.region_id === this.cardForm.province_id
            )[0].id,
            city_id: this.cityOptions.filter(
              v => v.region_id === this.cardForm.city_id
            )[0].id
          })
          this.Api.addBank(sendData).then(({ success }) => {
            if (success) {
              this.createResult = 1
              this.fetchCardList()
            }
          })
          
        }
      })
    },
    handleAddCreate() {
      this.restFrom()
      this.showCreateBank = true
      this.showManageBank = false
      this.createResult = 0
    },
    goToBankManage() {
      this.showCreateBank = false
      this.showManageBank = true
      this.createResult = 0
    },
    delectBankCard(row) {
      this.$confirm('此操作将永久删除该银行卡, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.Api.deleteBank({ id: row.id }).then(({ success }) => {
            if (success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.fetchCardList().then(res => {
                const { success, data } = res
                if (success && data) {
                  if (data.length) {
                    this.haveBankCard = true
                    this.showManageBank = true
                  } else {
                    this.haveBankCard = false
                    this.showManageBank = false
                    this.showCreateBank = false
                  }
                }
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
  .form-text {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
