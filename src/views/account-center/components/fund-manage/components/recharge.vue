<template>
  <div class="recharge">
    <div class="recharge-group">
      <div
        class="recharge-item"
        v-for="(item, index) in channelList"
        :key="index"
        @click="changeChannel(item)"
        :class="{on: item.channel_sign === currentIndex}"
      >
        <img class="img" src="@/assets/images/center/recharge_bank.png">
        {{item.channel_name}}
        <div class="on-r">
          <i class="fa fa-check" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="recharge-content" v-if="channelList.length">
      <template v-if="currentIndex === 'transfer'">
        <div class="tip">
          <p> 重要提醒：平台不定期更换收款卡，每次充值务必获取最新的收款卡信息</p>
          <p>1. 平台支持手机网银、任何跨行、支付宝、微信等转账方式</p>
          <p>2. 务必记得填写正确附言以及申请金额与实际支付金额保持一致</p>
          <p> 3. 充值到平台已更换的银行卡中导致的资金损失，平台概不负责</p>
          <p> 4. 支付宝、微信转账务必选择2小时内到账，转账后联系客服上分</p>
        </div>
      </template>
      <template v-else-if="currentIndex === 'zfb'">
        <div class="tip">
          请在新弹出的支付宝收银台页面，进行充值操作。
          如果您的浏览器未弹出新的支付页面，请取消浏览器对弹出页面的<br>阻拦，并选择允许（信任）。
        </div>
      </template>
      <div class="p">
        <div class="p-input fl">
          充值金额：
          <el-input-number v-model="amount" controls-position="right" :min="prizes.min" :max="prizes.max"></el-input-number>
          <span style="color:red">*</span> 元
        </div>
        <p class="p-input-line">
          最低 <span>{{prizes.min}}</span> 元， 
          最高 <span>{{prizes.max}}</span> 元
        </p> 
      </div>
      <div class="submit-btn">
        <el-button @click="submitForm" :loading="btnLoading" class="form-button">提交充值订单</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnLoading: false,
      // 最大最小额度
      prizes: {
        min: null,
        max: null
      },
      channelList:[],
      currentIndex: null,
      radio: 1,
      amount: null
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData(){
      this.Api.getRechargeChannel().then(({success, data}) => {
        if (success && data.length) {
          this.currentIndex = data[0].channel_sign
          this.prizes.max = parseInt(data[0].max)
          this.prizes.min = parseInt(data[0].min)
          this.channelList = data
        }
      })
    },
    // 切换支付渠道
    changeChannel(item) {
      this.amount = null
      this.currentIndex = item.channel_sign
      this.prizes.max = parseInt(item.max)
      this.prizes.min = parseInt(item.min)
    },
    //提交
    submitForm(){
      const sendData = {
        amount: this.amount,
        channel: this.currentIndex
      }
      this.btnLoading = true
      this.Api.postRecharge(sendData).then(({success, data}) => {
        this.btnLoading = false
        if (success) {
          this.$alert(
            data.msg,
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
.recharge {
  padding: 0 30px 35px;
  min-height: 500px;
  /deep/ {
    .submit-btn {
      padding: 20px 95px;
      text-align: left;
    }
    .form-button {
      width: 150px;
      height: 45px;
      cursor: pointer;
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
  .tip {
    border: none;
    padding-left: 32px;
    background: url('../../../../../assets/images/recharge-hint.png') no-repeat;
    color: #C4A17C;
    font-size: 14px;
    margin-bottom: 15px;
  }
}
.recharge-group {
  font-size: 0;
  margin-top: 15px;
  .recharge-item {
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
    border: 1px solid;
    border-color: #cfcfcf;
    padding: 5px 10px;
    margin-right: 15px;
    border-radius: 5px;
    .on-r{
      display: none;
    }
    &.on {
      border-color: #ff8900;
      border-color: #d00000;
      position: relative;
      .on-r {
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 0;
        border-bottom: 20px solid red;
        border-left: 20px solid transparent;
        i{
          font-size: 12px;
          position: absolute;
          left: -12px;
          top: 7px;
          color: #fff;
        }
      }
    }
    .img {
      display: inline-block;
      height: 22px;
      width: auto;
      vertical-align: -5px;
    }
  }
}
.recharge-content {
  padding: 20px 0;
  .title {
    color: #000;
    font-size: 16px;
    padding: 10px 0;
    .sub-title {
      font-size: 14px;
    }
    .num {
      display: inline-block;
      margin-right: 10px;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      background: #000;
      border-radius: 50%;
      color: #fff;
    }
  }
  .p {
    overflow: hidden;
    padding: 15px 0;
    margin-left: 25px;
    .p-r {
      color: #d00000;
    }
    .p-input {
      margin-right: 25px;
    }
  }
}
     
.p-input-line{
  font-size: 12px;
  margin-top: 16px;
  span{
    color: red;
  }
}
.recharge-redio {
  margin-top: -3px;
  /deep/ {
    .el-radio {
      margin-right: 10px;
    }
    .el-radio__input {
      display: none;
    }
    .b-r {
      display: none;
    }
    .el-radio.is-bordered.is-checked {
      border-color: #d00000;
      position: relative;
      .b-r {
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 0;
        border-bottom: 25px solid red;
        border-left: 25px solid transparent;
        i{
          font-size: 12px;
          position: absolute;
          left: -14px;
          top: 10px;
          color: #fff;
        }
      }
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #000;
    }
  }
}
</style>

