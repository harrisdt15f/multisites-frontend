<template>
  <div class="recharge">
    <div class="recharge-group">
      <div class="recharge-item" v-for="item in 7" :key="item" @click="currentIndex = item" :class="{on: item === currentIndex}">
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
       <div class="p-r fl">中商银行</div>
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
       <div class="p-l fl">收款通道：</div>
       <div class="p-r fl">中商银行</div>
     </div>

     
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.recharge {
  padding: 0 30px 35px;
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
.recharge-content{
  padding: 20px 0;
  .title{
    color: #000;
    font-size: 16px;
    padding: 10px 0;
    .sub-title{
      font-size: 14px;
    }
    .num{
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
  .p{
    overflow: hidden;
    padding: 15px 0;
    margin-left: 25px;
    .p-r{
      color: #d00000;
    }
  }
}
</style>

