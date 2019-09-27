<template>
  <div class="recharge" v-loading="showLoading">
    <div class="recharge-group">
      <div
        class="recharge-item"
        v-for="(item, index) in channelList"
        :key="index"
        @click="changeChannel(item)"
        :class="{on: item[0].payment_type_sign === currentIndex}"
      >
        <img class="img" :src="item[0].payment_ico" />
        {{item[0].payment_type_name}}
        <div class="on-r">
          <i class="fa fa-check" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="recharge-content" v-if="Object.keys(channelList).length">
      <div class="channel-box">
        <div class="channel-title">充值渠道：</div>
        <div class="channel-group">
          <div class="channel-item">
            <el-radio-group v-model="channel">
              <el-radio
                :label="item"
                v-for="(item, index) in channelList[currentIndex]"
                :key="index"
              >
                {{item.front_name}}
                <div style="text-indent: 30px;color: #7f7f7f; margin-top:6px">
                  最低：
                  <span style="color:red">{{Number(item.min).toFixed(2)}}</span>&nbsp;元 &nbsp; &nbsp;
                  最高：
                  <span
                    style="color:red"
                  >{{Number(item.max).toFixed(2)}}</span> 元
                </div>
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="p" v-if="channel['banks_code'] && channel['banks_code'].length">
        <div class="p-input fl">
          银行名称：
          <el-select v-model="banks_code" placeholder="请选择银行名称">
            <el-option
              v-for="item in channel['banks_code']"
              :key="item.payment_type_sign"
              :label="item.payment_type_name"
              :value="item.payment_type_sign"
            ></el-option>
          </el-select>
          <span style="color:red">&nbsp;*</span>
        </div>
      </div>
      <div class="p">
        <div class="p-input fl">
          充值金额：
          <el-input-number
            style="width:120px"
            v-model="amount"
            controls-position="right"
            :min="Number(channel.min)"
            :max="Number(channel.max)"
          ></el-input-number>
          <span style="color:red">&nbsp;*</span> 元
          <br />
          <span class="tip" id="J-money-tip-row">
            充值额度限定：最低
            <span id="J-money-min-union-scan">100.00</span> 元,最高
            <span id="J-money-max-union-scan">4850.00</span> 元
            <br />
            {{channel.front_remark}}
          </span>
        </div>
      </div>
      <div class="submit-btn">
        <el-button @click="submitForm" :loading="btnLoading" class="form-button">提交充值订单</el-button>
      </div>
    </div>
    <form style="display:none" id="pureForm" :action="formUrl" method="post" target="_blank">
      <input name="Authorization" v-model= "Token" />
      <input v-model="amount" name="amount" />
      <input v-if="channel" v-model="channel.payment_sign" name="channel" />
      <input v-if="channel && channel['banks_code'] && channel['banks_code'].length" v-model="banks_code" name="bank_code" />
    </form>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import axios from 'axios'
import qs from 'qs'

export default {
  data() {
    return {
      btnLoading: false,
      showLoading: false,
      // 最大最小额度
      prizes: {
        min: null,
        max: null
      },
      channelList: {},
      currentIndex: null,
      radio: 1,
      channel: null,
      banks_code: null,
      amount: null,
      formUrl: null,
      Token: 'Bearer ' + getToken(),
      form: {
        amount: '',
        channel: ''
      }
    };
  },
  created() {
    this.initData();
    this.formUrl = `${process.env.VUE_APP_API_URL}/web-api/pay/v2.0/recharge`
  },
  methods: {
    initData() {
      this.showLoading = true;
      this.Api.getRechargeChannel().then(({ success, data }) => {
        this.showLoading = false;
        if (success && data.length) {
          this.currentIndex = data[0].payment_type_sign;
          this.channelList = this._.groupBy(
            data,
            item => item.payment_type_sign
          );
          this.currentChannel();
        }
      });
    },
    // 切换支付渠道
    changeChannel(item) {
      this.amount = null;
      this.currentIndex = item[0].payment_type_sign;
      this.currentChannel();
    },
    //提交
    submitForm() {
      const sendData = {
        amount: this.amount,
        channel: this.channel.payment_sign
      };
      if (this.channel['banks_code'] && this.channel['banks_code'].length) {
        if (this.banks_code) {
          Object.assign(sendData, {
            bank_code: this.banks_code
          });
        } else {
          this.$alert('请选择银行名称', '提示', {
            confirmButtonText: '确定'
          });
          return;
        }
      }
      this.btnLoading = true;
      if (this.channel.request_mode == 1) {
        this.Api.postRecharge(sendData).then(({ success, data }) => {
          this.btnLoading = false;
          if (success) {
            this.$alert(data.msg, '提示', {
              confirmButtonText: '确定'
            });
          } 
        })
      }else {
        this.btnLoading = false;
        // document.getElementById('pureForm').submit();
        axios.post('http://192.168.0.117/web-api/pay/v2.0/recharge',
          qs.stringify(sendData), { 
          headers: { 
            'Content-Type':'application/x-www-form-urlencoded' ,
            'Authorization':  'Bearer ' + getToken()
        }}
        ).then((result) => {
          console.log(result)
        }).catch(err => {
          console.log(err)
        })
      }
      
    },
    currentChannel() {
      const arr = this.channelList[this.currentIndex];
      if (arr && arr.length) {
        this.channel = arr[0];
      }
    }
  }
};
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
    .el-radio__input.is-checked + .el-radio__label {
      color: $primary-color;
    }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: $primary-color;
      background: $primary-color;
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
    .el-input-number.is-controls-right .el-input-number__decrease,
    .el-input-number.is-controls-right .el-input-number__increase {
      display: none;
    }
    .el-input-number.is-controls-right .el-input__inner {
      padding-right: 15px;
    }
  }
  .tip {
    border: none;
    padding-left: 32px;
    background: url("../../../../../assets/images/recharge-hint.png") no-repeat;
    color: #c4a17c;
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
    .on-r {
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
        i {
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

.p-input-line {
  font-size: 12px;
  margin-top: 16px;
  span {
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
        i {
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
.channel-box {
  margin: 15px 25px 30px;
  display: flex;
  .channel-title {
    flex: 0 0 78px;
  }
}
.front-remark {
}
</style>

