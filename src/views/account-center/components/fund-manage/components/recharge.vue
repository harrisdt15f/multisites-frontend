<template>
  <div class="recharge">
    <div class="recharge-group">
      <div
        class="recharge-item"
        v-for="item in 7"
        :key="item"
        @click="currentIndex = item"
        :class="{on: item === currentIndex}"
      >
        <img class="img" src="@/assets/images/center/recharge_bank.png">
        银行入款
      </div>
    </div>
    <div class="recharge-content">
      <p class="title">
        <span class="num">1</span>
        请转账到一下账户：
        <span class="sub-title">单比最低10元，最高200000元</span>
      </p>
      <div class="p">
        <div class="p-l fl">收款通道：</div>
        <div class="p-r fl">
          <div class="recharge-redio">
            <el-radio-group v-model="radio" size="small">
              <el-radio label="1" border>
                中国工商银行
                <div class="b-r">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </div>
              </el-radio>
              <el-radio label="2" border>
                中国工商银行
                <div class="b-r">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </div>
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="p">
        <div class="p-l fl">收款银行：</div>
        <div class="p-r fl">中国中商银行</div>
      </div>
      <div class="p">
        <div class="p-l fl">收款户名：</div>
        <div class="p-r fl">陈子慧</div>
      </div>
      <div class="p">
        <div class="p-l fl">收款账号：</div>
        <div class="p-r fl">6222082353243338960</div>
      </div>
      <div class="p">
        <div class="p-l fl">开户支行：</div>
        <div class="p-r fl">中国工商银行建瓯支行营业部</div>
      </div>
      <p class="title">
        <span class="num">2</span>
        请认真填写您的转账信息：
        <span class="sub-title">请务必转账后再提交订单，否则无法及时查到您的款项！</span>
      </p>
      <div class="p">
        <div class="p-input fl">
          充值金额：
          <el-input style="width:186px" v-model="input" placeholder="请输入充值金额"></el-input>
        </div>
        <div class="p-input fl">
          银行姓名：
          <el-input style="width:186px" v-model="input" placeholder="请输入充值金额"></el-input>
        </div>
      </div>
      <div class="submit-btn">
        <button type="submit" class="form-button">提交充值订单</button>
      </div>
      <div class="tip">
        温馨提示：
        <br>1.请转账完成后再提交充值订单。
        <br>2.请正确填写您的户名和充值金额。
        <br>3.转账1笔提交1次，请勿重复提交订单。
        <br>4.转账完成后请保留单据作为核对证明。
        <br>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 1,
      radio: 1,
      input: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.recharge {
  padding: 0 30px 35px;
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
      background-image: linear-gradient(0deg, #ff8400 0%, #ffa200 100%),
        linear-gradient(#ff9700, #ff9700);
      background-blend-mode: normal, normal;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
      border: 1px solid;
      border-image-source: linear-gradient(0deg, #d78700 0%, #e58f00 100%);
      border-image-slice: 1;
    }
  }
  .tip {
    margin-top: 30px;
    font-size: 14px;
    color: #6b3c00;
    background: #fff3e0;
    padding: 20px;
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
    margin-right: 8px;
    border-radius: 5px;
    &.on {
      border-color: #ff8900;
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

