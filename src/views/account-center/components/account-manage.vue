<template>
  <div class="bet-record">
    <el-tabs v-model="activeName">
      <el-tab-pane label="密码管理" name="pwd-manage">
        <div class="container pwd-manage">
          <h1 class="h1">修改登陆密码</h1>
          <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="旧密码：" prop="pass">
              <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="pass" class="new-pwd">
              <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
              <span class="pwd-info">6-16位字符，需使用字母或数字</span>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
              <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="submit-btn">
            <button type="submit" class="form-button">提交修改</button>
          </div>
          <div class="bmn-time-content">
            <span class="bmn-time-text">
              <span class="bmn-form-icon-tips"></span>为了保证您的资金安全，请立即设置您的资金密码 &nbsp;&nbsp;
              <a
                class="btn"
                href="/users/safe-reset-fund-password"
              >立即设置</a>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="银行卡管理" name="bank-manage">
        <div class="container bank-manage">
          <div class="form-container">
            <div class="form-text">
              您还没有绑定银行卡：
              <button type="submit" class="form-button">立即绑定</button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="个人资料" name="personal-info">
        <div class="container pwd-manage" style="padding-top:40px;">
          <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="用户名：" prop="pass">
              <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称：" prop="pass">
              <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名：" prop="pass">
              <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="pass">
              <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="个人邮箱：" prop="pass">
              <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱编码：" prop="pass">
              <el-input type="text" v-model="form.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细地址：" prop="pass">
              <el-input type="textarea" v-model="form.pass" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="submit-btn">
            <button type="submit" class="form-button">提交修改</button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'pwd-manage',
      form: {},
      value1: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.bet-record {
  /deep/ {
    .el-tabs__nav-wrap::after{
      height: 1px;
    }
    .el-tabs__nav-scroll {
      background: #fffbf5 !important;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      background-color: #fffbf5;
    }
    .el-tabs__item + .el-tabs__item {
      &::before {
        content: "";
        display: block;
        width: 1px;
        height: 18px;
        background: #e6d7c0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
      }
    }
    .el-tabs__item.is-active {
      color: #875c4e;
      &::after {
        content: "";
        display: block;
        width: 75px;
        height: 2px;
        background: #875c4e;
        position: absolute;
        left: 50%;
        bottom: 1px;
        transform: translateX(-50%);
      }
    }
    .el-tabs__item:hover {
      color: #875c4e;
    }
  }
  .container {
    padding: 0 35px 35px;
  }
}
.bet-record {
  .pwd-manage {
    /deep/ {
      .el-input, .el-textarea {
        width: 300px;
      }
    }
    .h1 {
      color: #ff8900;
      font-size: 16px;
      font-weight: 400;
      margin: 20px 0;
    }
    .pwd-info {
      padding-left: 15px;
      font-size: 14px;
      color: #9b9b9b;
    }
  }
  .submit-btn {
    padding: 20px 95px;
    text-align: left;
  }
  .form-button {
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
.bmn-time-content {
  color: #999999;
  margin-left: 40px;
  margin-top: 30px;
  .btn {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    border: none;
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    border-radius: 2px;
    outline: none;
    padding-bottom: 2px;
    font-family: microsoft yahei;
    background-image: linear-gradient(to top, #ff8400, #ff8400);
    background-color: #ff8400;
    border: 1px solid #ccc;
    color: #fff;
    box-shadow: none;
  }
}
.bank-manage {
  margin-top: 40px;
  .form-container {
    text-align: center;
    padding: 20px 95px;
    position: relative;
    font-size: 14px;
    color: #222222;
    line-height: 20px;
    margin-left: 16px;
  }
}
</style>
