<template>
  <div class="withdrawal">
    <div class="container">
      <div class="acc-detail">
        <div class="fl">账号：{{userDetail.username}}</div>
        <div class="fl">
          余额：
          <span style="color:#d00000">{{userDetail.balance}}</span>
        </div>
        <div class="bmn-search-button">
          <input type="submit" value="交易记录" class="btn">
        </div>
      </div>
      <el-form class="withdrawal-form" label-width="90px">
        <el-form-item label="银行卡：" >
           <el-select style="width:260px" popper-class="single-price" v-model="bankCard" placeholder="请选择">
              <el-option
                v-for="item in cardList"
                :key="item.value"
                :label="`${item.owner_name} ${item.card_num} ${item.bank_name}`"
                :value="item">
                {{item.owner_name}} {{item.card_num}} {{item.bank_name}}
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="提现金额：">
          <el-input-number v-model="amount" controls-position="right" :min="20" :max="Number(userDetail.balance)"></el-input-number> &nbsp;&nbsp;元
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style="color:#d00000">*</span>
          最小金额为<span style="color:#d00000">20.00</span>元，请正确填写
        </el-form-item>
        <div class="submit-btn">
          <el-button @click="submitForm" :loading="btnLoading" class="form-button">提交提款订单</el-button>
        </div>
      </el-form>
    </div>
    <div class="tip">
      使用提示：
      <br>为确保您达资金安全，请填写您的提款银行资料，以免有心人士窃取，谢谢合作。
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      btnLoading:false,
      cardList: [],
      amount: null,
      bankCard: null
    }
  },
  computed: {
    ...mapGetters(['userDetail']),
  },
  created () {
    this.fetchCardList()
  },
  methods: {
    //获取银行卡列表
    fetchCardList() {
      return new Promise(() => {
        this.Api.getCardList().then(res => {
          const { success, data } = res
          if (success) {
            if(!data || !data.length){
              this.$alert(
                '还没有银行卡， 请先添加银行卡',
                '提示',
                {
                  confirmButtonText: '确定'
                }
              ).then(() => {
                this.$router.push('/account-center/account-manage/bank-manage')
              }).catch(() => {
                this.$router.push('/account-center/account-manage/bank-manage')
              })
            }else{
              this.cardList = data
              this.bankCard = data[0]
            }
          }
        })
      })
    },
    //提交
    submitForm(){
      const sendData = {
        amount: this.amount,
        bank_sign: this.bankCard.bank_sign,
        card_number: this.bankCard.card_num,
        card_username: this.bankCard.owner_name
      }
      this.btnLoading = true
      this.Api.postWithdraw(sendData).then(({success}) => {
        this.btnLoading = false
        if (success) {
          this.$alert(
            '提款成功！',
            '提示',
            {
              confirmButtonText: '确定'
            }
          )
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../../../../../assets/css/var.scss";
.withdrawal {
  padding: 0 30px 35px;
  /deep/ {
    .submit-btn {
      padding: 20px;
      text-align: left;
    }
    .form-button {
      cursor: pointer;
      width: 150px;
      height: 45px;
      text-align: center;
      box-sizing: border-box;
      color: white;
      font-size: 16px;
      border-radius: 3px;
      background: $primary-color;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
      border: 1px solid;
      border-image-slice: 1;
    }
  }
  .container {
    width: 600px;
  }
  .tip {
    margin-top: 15px;
    font-size: 14px;
    color: #6b3c00;
    background: #fff3e0;
    padding: 20px;
  }
  .acc-detail {
    overflow: hidden;
    background: #f6f6f6;
    padding: 35px;
    position: relative;
    .fl {
      margin-right: 30px;
    }
    .bmn-search-button {
      position: absolute;
      right: 30px;
      top: 28px;
    }
  }
  .withdrawal-form {
    margin-top: 30px;
  }
}
</style>
