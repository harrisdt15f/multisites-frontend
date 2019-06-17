<template>
  <footer class="footer fw">
    <section class="w">
      <section class="fw foot-head">
        <section class="logo">
          <img
            :src="logoSrc ? logoSrc : require('../assets/images/new/logo.png')"
            class="footerlogo dinv"
          >
        </section>
        <section class="foot-nums">
          <p class="foot-nums-p dinv">
            ¥
            <strong class="st">
              <countTo :startVal="startVal" :endVal="endValMoney" :duration="3000"></countTo>
            </strong>
            今日已实现兑奖
          </p>
          <p class="foot-nums-p dinv">
            <strong class="st">
              <countTo :startVal="startVal" :endVal="endValPeople" :duration="3000"></countTo>
            </strong>
            在线人数
          </p>
        </section>
      </section>
      <div class="fw">
        <div class="fl">
          <nav class="fw">
            <a
              href="javascript:;"
              class="nav-list"
              v-for="(item, index) in linkList"
              :key="index"
            >{{item.title}}</a>
          </nav>
          <ul class="fw">
            <li
              class="cooperate-list"
              v-for="(item, index) in cooperateList"
              :key="index"
              :style="{background:item.src}"
            ></li>
          </ul>
          <section class="desc">
            ©2017包网彩票版权所有
            <span class="desc-flb">菲律宾政府PAGCOR博彩拍照认证</span>
            <br>春秋彩票郑重提示：彩票有风险，投注需谨慎，不向未满18周岁的青少年出售彩票
          </section>
        </div>
        <div class="fr">
          <div class="time-box">
            <div class="time-box-title">存款 到账平均时间</div>
            <span class="time-box-desc">
              <i class="i"></i>
              <span class="span">10</span>秒
            </span>
          </div>
          <div class="time-box">
            <div class="time-box-title">取款 到账平均时间</div>
            <div class="time-box-desc">
              <i class="withdrawal i"></i>
              <span class="span">50</span>秒
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>
<script>
import countTo from 'vue-count-to'
import { mapGetters } from 'vuex'
import { randomRange } from '@/utils'
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
        { title: 'PC 客户端' },
        { title: '仿劫持教程' }
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
      ]
    }
  },
  watch: {
    $route() {
      this.mockData()
    }
  },
  created() {
    this.mockData()
  },
  methods: {
    mockData() {
      this.endValMoney = 0
      this.endValPeople = 0
      let endVal = localStorage.getItem('endVal'),
          best = Date.now()

      if (endVal) {
        endVal = JSON.parse(endVal)
        if (new Date(best).getDate() != new Date(endVal.date).getDate()) {
          localStorage.removeItem('endVal')
        }else{
          const date = best - endVal.date
          if (date/1000 > 10) {
            endVal.date = best
            endVal.money += randomRange(1, 100)
            endVal.people += randomRange(1, 100)
            localStorage.setItem('endVal', JSON.stringify(endVal))
          }
        }
      } else {
        const money = randomRange(18888888, 29999999)
        const people = randomRange(1500, 3000)
        endVal = {
          date: best,
          money: money,
          people:people,
          expires: Date.now() + 1000*60*expired
        }
        localStorage.setItem('endVal', JSON.stringify(endVal))
      }

      this.$nextTick(() => {
        this.endValMoney = endVal.money
        this.endValPeople = endVal.people
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: #403a38;
  height: 298px;
  width: 100%;
}
.foot-head {
  height: 90px;
  line-height: 90px;
  border-bottom: 1px dashed #5e6571;
}
.logo {
  float: left;
  margin-right: 14px;
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  img {
    width: auto;
    height: 36px;
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
  font-size: 15px;
  color: #7d6f65;
  margin-top: 20px;
  .time-box-desc {
    color: #d1c2b7;
    .i {
      display: inline-block;
      border-radius: 5px;
      width: 250px;
      height: 10px;
      background: linear-gradient(90deg, #f2bd4c, #f17100);
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
</style>

