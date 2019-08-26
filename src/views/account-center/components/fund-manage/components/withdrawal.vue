<template>
  <div class="withdrawal">
    <div class="container">
      <div class="acc-detail">
        <div class="fl">账号：252525</div>
        <div class="fl">
          余额：
          <span style="color:#d00000">￥6589.00</span>
        </div>
        <div class="bmn-search-button">
          <input type="submit" value="交易记录" class="btn">
        </div>
      </div>
      <el-form class="withdrawal-form" ref="form" :model="form" label-width="90px">
        <el-form-item label="银行卡：">
          <el-input v-model="form.name" placeholder="银行卡名称：工商银行      卡号：6222063562773547890      姓名：张子惠"></el-input>
        </el-form-item>
        <el-form-item label="消费比例：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="消费金额：">
          <el-input v-model="form.name" style="width:200px"></el-input>&nbsp;&nbsp;元
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style="color:#d00000">*</span>最小金额为<span style="color:#d00000">10</span>元，请正确填写
        </el-form-item>
        <el-form-item label="取款密码：">
          <el-input v-model="form.name" style="width:200px"></el-input>
        </el-form-item>
        <div class="submit-btn">
          <button type="submit" class="form-button">提交提款订单</button>
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
export default {
  data() {
    return {
      form: {}
    }
  }
}
</script>


<style lang="scss" scoped>
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
