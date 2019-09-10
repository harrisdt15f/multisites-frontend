<template>
  <footer class="footer fw">
    <el-row class="w" style="margin-bottom:35px;">
      <el-col :span="6" class="technical-support">
        <section class="fw foot-head">
          <section class="logo">
            <img
              :src="logoSrc ? logoSrc : require('../assets/images/new/logo.png')"
              class="footerlogo dinv"
            />
          </section>
        </section>
      </el-col>
      <el-col :span="12" class="technical-support service-experience">
        服务体验
        <span>Service Experience</span>
        <div>
          <div class="time-box">
            <div class="time-box-title">存款 到账平均时间</div>
            <span class="time-box-desc">
              <i class="i"></i>

              <span class="span">
                <countTo
                  :startVal="depositTime.startVal"
                  :endVal="depositTime.endVal"
                  :duration="5000"
                ></countTo>
              </span> 秒
            </span>
          </div>
          <div class="time-box">
            <div class="time-box-title">取款 到账平均时间</div>
            <div class="time-box-desc">
              <i class="withdrawal i"></i>
              <span class="span">
                <countTo
                  :startVal="withdrawalTime.startVal"
                  :endVal="withdrawalTime.endVal"
                  :duration="5000"
                ></countTo>
              </span>秒
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="payment-method">
        充值方式
        <span>payment method</span>
        <div class="w">
          <div class="pay-logo wechatpay-logo"></div>
          <div class="pay-logo alipay-logo"></div>
          <div class="pay-logo unionpay-logo"></div>
        </div>
      </el-col>
    </el-row>
    <div class="footer-row qualification-info-row">
      <div class="row-content">
        <div class="footer-text">
          <ul class="footer-list">
            <li>
              <a>包网品牌</a>
            </li>
            <li>
              <router-link tag="a" :to="`/help-center`">帮助中心</router-link>
            </li>
            <li>
              <router-link tag="a" :to="`/download`">手机客户端 </router-link>
            </li>
            <li>
              <router-link tag="a" :to="`/preventHijack`">防劫持教程</router-link>
            </li>
          </ul>
          <span>建议游戏分辨率为：1280x760</span>
          <p>包网彩票站郑重提示：彩票有风险，投注需谨慎！不向未满18周岁的青少年出售彩票</p>
          <img src="../assets/images/new/index/footer-photo.png" alt />
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import countTo from 'vue-count-to';
import { mapGetters } from 'vuex';
import { randomRange } from '@/utils';
export default {
  name: 'Foote',
  components: {
    countTo
  },
  computed: {
    ...mapGetters(['logoSrc'])
  },
  data() {
    return {
      startVal: 1000,
      endValMoney: 0,
      endValPeople: 0,
      linkList: [
        { title: '包网品牌' },
        { title: '帮助中心' },
        { title: '手机客户端' },
        { title: '防劫持教程' }
      ],
      cooperateList: [
        {
          src:
            'url(' +
            require('../assets/images/new/header/_0003_facebook.png') +
            ') no-repeat'
        },
        {
          src:
            'url(' +
            require('../assets/images/new/header/_0005_googleplus.png') +
            ') no-repeat'
        },
        {
          src:
            'url(' +
            require('../assets/images/new/header/_0004_birdxiaoniao.png') +
            ') no-repeat'
        },
        {
          src:
            'url(' +
            require('../assets/images/new/header/_0002_pinterest-p.png') +
            ') no-repeat'
        },
        {
          src:
            'url(' +
            require('../assets/images/new/header/_0001_vimeo.png') +
            ') no-repeat'
        },
        {
          src:
            'url(' +
            require('../assets/images/new/header/_0000_weixin.png') +
            ') no-repeat '
        }
      ],
      withdrawalTime: {
        startVal: 0,
        endVal: 50
      },
      depositTime: {
        startVal: 0,
        endVal: 10
      }
    };
  },
  watch: {
    // $route() {
    //   this.mockData()
    // }
  },
  created() {
    // this.mockData()
  },
  methods: {
    // 滚动效果
    mockData() {
      this.endValMoney = 0;
      this.endValPeople = 0;
      let endVal = localStorage.getItem('endVal'),
        best = Date.now();

      if (endVal) {
        endVal = JSON.parse(endVal);
        if (new Date(best).getDate() != new Date(endVal.date).getDate()) {
          localStorage.removeItem('endVal');
        } else {
          const date = best - endVal.date;
          if (date / 1000 > 10) {
            endVal.date = best;
            endVal.money += randomRange(1, 10);
            endVal.people += randomRange(1, 10);
            localStorage.setItem('endVal', JSON.stringify(endVal));
          }
        }
      } else {
        const money = randomRange(18888888, 29999999);
        const people = randomRange(1500, 3000);
        endVal = {
          date: best,
          money: money,
          people: people,
          expires: Date.now() + 1000 * 60
        };
        localStorage.setItem('endVal', JSON.stringify(endVal));
      }

      this.$nextTick(() => {
        this.endValMoney = endVal.money;
        this.endValPeople = endVal.people;
      });
    },
    goToPage(item) {
      if (item.title === '手机客户端') this.$router.push('/download');
      if (item.title === '帮助中心') this.$router.push('/help-center');
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  padding-top: 40px;
  background: #fff;
  width: 100%;
  border-top: 1px solid #e6e6e6;
}
.logo {
  margin-right: 14px;
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  img {
    width: auto;
    height: 65px;
    display: flex;
  }
}
.foot-nums {
  float: right;
  font-size: 15px;
  color: #7d6f65;
}
.foot-nums .st {
  color: #d2c1b7;
  font-size: 35px;
}
.foot-nums-p:nth-of-type(1) {
  margin-right: 45px;
}
.nav-list {
  margin: 25px 0;
  padding: 0 9px;
  float: left;
  height: 15px;
  color: #d1c2b7;
  border-right: 1px solid;
  line-height: 15px;
}
.nav-list:nth-of-type(1) {
  padding-left: 0;
}
.nav-list:last-of-type {
  border-right: none;
}
.nav-list:hover {
  color: #fefefe;
}
.cooperate-list {
  float: left;
  margin-left: 12px;
  width: 31px;
  height: 31px;
  border-radius: 50%;
}
.cooperate-list:nth-of-type(1) {
  margin-left: 0;
}
.desc {
  padding: 33px 0 30px;
  color: #7d6f65;
}
.desc-flb {
  color: #d1c2b7;
}
.time-box {
  font-size: 12px;
  color: #7d6f65;
  overflow: hidden;
  height: 40px;
  line-height: 40px;
  .time-box-title {
    float: left;
    margin-right: 10px;
  }
  .time-box-desc {
    float: left;
    color: #d1c2b7;
    .i {
      display: inline-block;
      border-radius: 5px;
      width: 250px;
      height: 10px;
      background: linear-gradient(90deg, #67c23a73, #67c23a);
      &.withdrawal {
        background: linear-gradient(90deg, #905ae0, #5449aa);
      }
    }
    .span {
      font-size: 25px;
      font-weight: bold;
      margin-left: 8px;
      margin-right: 2px;
    }
  }
}
.technical-support {
  font-size: 20px;
  & > span {
    font-size: 14px;
  }
}
.service-experience {
  border-left: 1px solid #424242;
  border-right: 1px solid #424242;
  padding-left: 20px;
}
.payment-method {
  font-size: 20px;
  padding-left: 20px;
  & > span {
    font-size: 14px;
  }
  .w {
    width: 100%;
  }
  .pay-logo {
    float: left;
    width: 60px;
    height: 60px;
    background: #ccc;
    margin-top: 10px;
    margin-right: 20px;
  }
  .wechatpay-logo {
    background: url("../assets/images/new/index/wechatpay.png") center center
      no-repeat;
    background-size: contain;
  }

  .alipay-logo {
    background: url("../assets/images/new/index/alipay.png") center center
      no-repeat;
    background-size: contain;
  }

  .unionpay-logo {
    background: url("../assets/images/new/index/unionpay.png") center center
      no-repeat;
    background-size: contain;
  }
}
.qualification-info-row {
  padding-bottom: 30px;
  .footer-list {
    width: 960px;
    padding: 15px 0px 15px 40px;
    margin-bottom: 12px;
    text-align: center;
    li {
      display: inline-block;
      padding: 0 25px;
      a {
        color: #484848;
        cursor: pointer;
        text-decoration: none;
        cursor: pointer;
        &:hover {
          color: #ff6c00;
        }
      }
    }
  }
  .footer-text {
    width: 1000px;
    margin: auto;
    text-align: center;
    p {
      width: 100%;
      text-align: center;
      margin: 17px 0px 12px 0px;
      font-weight: bold;
    }
    img {
      width: 600px;
      height: 40px;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>

