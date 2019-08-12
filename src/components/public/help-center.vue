<template>
  <div class="help-center">
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="help-box">
          <div class="help-tit">
            <a onclick="__openWin('home2','/pc/helpCenter/helpInfo.html')" class="orange fr">更多</a>网上投注
          </div>
          <div class="help-list">
            <ul>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-57')"
                >1、如何查询追号记录？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-46')"
                >2、我从来没买过彩票，这些彩种都怎么玩？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-47')"
                >3、什么是标准投注？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-48')"
                >4、什么是单式投注？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-49')"
                >5、什么是复式投注？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-50')"
                >6、什么是机选投注？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-51')"
                >7、什么是直选投注？</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="help-box">
          <div class="help-tit">
            <a onclick="__openWin('home2','/pc/helpCenter/helpInfo.html')" class="orange fr">更多</a>常见问题
          </div>
          <div class="help-list">
            <ul>
              <li>
                <a onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-1')">1、如何注册？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-2')"
                >2、在彩票注册要收费吗？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-3')"
                >3、忘记了登录密码怎么办？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-4')"
                >4、有银行卡就可以在本站充值了吗？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-5')"
                >5、如何开通网上支付？</a>
              </li>
              <li>
                <a onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-6')">6、如何在本站充值？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-7')"
                >7、在本站充值要手续费吗？</a>
              </li>
              <li>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-8')"
                >8、如何查看是否中奖？</a>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="help-box" style="padding-bottom:20px">
          <div class="help-tit">电脑投注流程中奖5步走</div>
          <div class="help-info" >
            <div class="help-line"></div>
            <div class="help-cent">
              <div class="helpetin-left">
                <div class="help-icon">1</div>
                <span>注册</span>
              </div>
              <div class="helpetin-right">
                <a
                  onclick="jumpToLoginModule('/pc/register/index.html');"
                  target="_self"
                  class="orange"
                >免费注册</a>彩票账号
              </div>
            </div>
            <div class="help-cent">
              <div class="helpetin-left">
                <div class="help-icon">2</div>
                <span>充值</span>
              </div>
              <div class="helpetin-right">
                <router-link tag="a" :to="`/login`" class="orange">登录</router-link>后选择支付
                <a
                  @click="preInto('/account-center/fund-manage/recharge')"
                  href="javascript:;"
                  class="orange"
                >充值彩金</a>
              </div>
            </div>
            <div class="help-cent">
              <div class="helpetin-left">
                <div class="help-icon">3</div>
                <span>购彩</span>
              </div>
              <div class="helpetin-right">
                进入彩票购彩大厅，
                <a
                  onclick="__openWin('lottery_hall','/pc/mall/common.html');"
                  class="orange"
                >马上投注</a>
              </div>
            </div>
            <div class="help-cent">
              <div class="helpetin-left">
                <div class="help-icon">4</div>
                <span>中奖</span>
              </div>
              <div class="helpetin-right">
                中奖后，奖金将派发到
                <a
                  onclick="jumpToUserCenter('/pc/userCenter/accountDetail.html');"
                  class="orange"
                >彩金账户</a>
              </div>
            </div>
            <div class="help-cent">
              <div class="helpetin-left">
                <div class="help-icon">5</div>
                <span>提款</span>
              </div>
              <div class="helpetin-right">
                <a onclick="jumpToUserCenter('/pc/userCenter/bindbank.html');" class="orange">申请提款</a>，资金转至银行卡
              </div>
            </div>
          </div>
        </div>
        <div class="help-box">
          <div class="help-tit">
            新手指引
          </div>
          <div class="help-list">
            <ul>
              <li>
                <span class="orange f16">Q</span>
                <router-link to="/help-info">如何注册成为会员？</router-link>
              </li>
              <li>
                <span class="orange f16">Q</span>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-46')"
                >我从未买过彩票，这些彩种怎么玩？</a>
              </li>
              <li>
                <span class="orange f16">Q</span>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-tit3')"
                >本站支持哪些充值方式？</a>
              </li>
              <li>
                <span class="orange f16">Q</span>
                <a onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-7')">本站充值要手续费吗？</a>
              </li>
              <li>
                <span class="orange f16">Q</span>
                <a onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-8')">如何查看是否中奖？</a>
              </li>
              <li>
                <span class="orange f16">Q</span>
                <a onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-10')">中奖后如何兑奖？</a>
              </li>
              <li>
                <span class="orange f16">Q</span>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-23')"
                >注册时为什么需要完善个人信息？</a>
              </li>
              <li>
                <span class="orange f16">Q</span>
                <a onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-44')">提款不成功怎么办？</a>
              </li>
              <li>
                <span class="orange f16">Q</span>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-37')"
                >如何修改绑定的联系电话？</a>
              </li>
              <li>
                <span class="orange f16">Q</span>
                <a
                  onclick="__openWin('home_help','/pc/helpCenter/helpInfo.html#help-33')"
                >用户为保证账户资金安全应注意哪些事项？</a>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    this.initData()
  },
  methods: {
    preInto(route) {
      if (!this.isLogin) {
        this.$router.push('/login')
      } else {
        this.$router.push(route)
      }
    },
    initData() {
      this.Api.getUserHelp().then(({ success, data }) => {
        if (success) {
          console.log(data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
a{
  cursor: pointer;
}
.orange {
  color: #d81e06;
}
.help-center {
  width: 1200px;
  margin: 0 auto;
}
.help-box {
  background: #fff;
  border: 1px solid #ececec;
  overflow: hidden;
  margin: 10px 0;
  .help-tit {
    height: 47px;
    line-height: 47px;
    color: #333;
    background: #fff3e0;
    border-bottom: 1px solid #ececec;
    padding: 0 15px;
    font-size: 16px;
    overflow: hidden;
    .fr {
      font-size: 12px;
    }
  }
  .help-list ul li {
    line-height: 40px;
    border-bottom: 1px solid #ececec;
    padding-left: 20px;
    .f16 {
      font-size: 16px;
      margin-right: 10px;
    }
  }
  .help-info {
    padding: 20px;
    position: relative;
    .help-line {
      background: #ddd;
      width: 5px;
      height: 90%;
      position: absolute;
      left: 38px;
      top: 18px;
      bottom: 10px;
    }
    .help-cent {
      position: relative;
    }
    .help-icon {
      background: #fc9721;
      color: #fff;
      width: 22px;
      height: 22px;
      border: 2px solid #fff;
      border-radius: 50%;
      text-align: center;
      display: block;
      position: absolute;
      top: 10px;
      left: 7px;
    }
    .helpetin-left span {
      font-size: 14px;
      position: absolute;
      left: 40px;
      top: 12px;
      color: #333;
    }
    .helpetin-right {
      margin: 4px 0 0 72px;
      padding: 12px 0 0 5px;
    }
  }
}
</style>
