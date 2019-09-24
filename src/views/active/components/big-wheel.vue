<template>
  <section class="container fw">
  
<!--    转盘-->
    <section class="lucky-wheel">
      <section class="lucky-title"></section>
      <section class="wheel-main">
        <section class="wheel-pointer-box">
          <section class="wheel-pointer" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></section>
        </section>
        <section class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
          <section class="prize-list">
            <section class="prize-item" v-for="(item,index) in prize_list" :key="index">
              <section class="prize-pic">
                <img :src="item.icon" class="prize-pic-img">
              </section>
              <section class="prize-count" v-if="item.count">
                {{item.count}}
              </section>
              <section class="prize-type">
                {{item.name}}
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  
<!--    活动规则-->
    
    <section class="main">
      <section class="main-bg"></section>
      <section class="content">
        今日抽奖次数： {{ lottery_ticket}}
      </section>
      <section class="tip">
        <section class="tip-title">活动规则</section>
        <section class="tip-content">
          1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废<br>
          2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会<br>
          3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品
        </section>
      </section>
    </section>
    <section class="toast" v-show="toast_control">
      <section class="toast-container">
        <img :src="toast_pictrue" class="toast-picture">
        <section class="close" @click="close_toast()"></section>
        <section class="toast-title">
          {{toast_title}}
        </section>
        <section class="toast-btn">
          <section class="toast-cancel"  @click="close_toast">关闭</section>
        </section>
      </section>
    </section>
    <section class="toast-mask" v-show="toast_control"></section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      easejoy_bean: 0, //金豆
      lottery_ticket: 0, //抽奖次数
      prize_list: [
        {
          icon: require('../../../assets/images/activity/bean_500.png'), // 奖品图片
          count: 1, // 奖品数量
          name: '元', // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          icon: require('../../../assets/images/activity/bean_five.png'),
          count: 2,
          name: '元',
          isPrize: 1
        },
        {
          icon: require('../../../assets/images/activity/bean_one.png'),
          count: 3,
          name: '元',
          isPrize: 1
        },
        {
          icon: require('../../../assets/images/activity/point_five.png'),
          count: 4,
          name: '元',
          isPrize: 1
        },
        {
          icon: require('../../../assets/images/activity/point_ten.png'),
          count: 5,
          name: '元',
          isPrize: 1
        },
        {
          icon: require('../../../assets/images/activity/bean_500.png'),
          count: 6,
          name: '元',
          isPrize: 1
        },
        {
          icon: require('../../../assets/images/activity/give_up.png'),
          count: 7,
          name: '元',
          isPrize: 0
        },
        {
          icon: require('../../../assets/images/activity/bean_500.png'),
          count: 8,
          name: '元',
          isPrize: 1
        }
      ], //奖品列表
      toast_control: false, //抽奖结果弹出框控制器
      hasPrize: false, //是否中奖
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度
      start_rotating_degree_pointer: 0, //指针初始旋转角度
      rotate_angle_pointer: 0, //指针将要旋转的度数
      rotate_transition: 'transform 6s ease-in-out', //初始化选中的过度属性控制
      rotate_transition_pointer: 'transform 12s ease-in-out', //初始化指针过度属性控制
      click_flag: true, //是否可以旋转抽奖
      index: 0
    };
  },
  created() {
    this.init_prize_list();
  },
  computed: {
    toast_title() {
      return this.hasPrize
        ? '恭喜您，获得' +this.prize_list[this.index].count + ' ' + this.prize_list[this.index].name
        : '未中奖';
    },
    toast_pictrue() {
      return this.hasPrize
        ? require('../../../assets/images/activity/congratulation.png')
        : require('../../../assets/images/activity/sorry.png');
    }
  },
  methods: {
    //此方法为处理奖品数据
    init_prize_list(list) {},
    rotate_handle() {
      this.index = 3; //指定每次旋转到的奖品下标
      this.rotating();
    },
    rotating() {
      if (!this.click_flag) return;
      let type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      let during_time = 5; // 默认为1s
      let random = Math.floor(Math.random() * 7);
      let result_index = this.index - 1; // 最终要旋转到哪一块，对应prize_list的下标
      let result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
      let rand_circle = 6; // 附加多转几圈，2-3
      this.click_flag = false; // 旋转结束前，不允许再次触发
      if (type === 0) {
        // 转动盘子
        let rotate_angle =
          this.start_rotating_degree +
          rand_circle * 360 +
          result_angle[result_index] -
          this.start_rotating_degree % 360;
        this.start_rotating_degree = rotate_angle;
        this.rotate_angle = 'rotate(' + rotate_angle + 'deg)';
        // // //转动指针
        // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
        // this.start_rotating_degree_pointer =360*rand_circle;
        let that = this;
        // 旋转结束后，允许再次触发
        setTimeout(function() {
          that.click_flag = true;
          that.game_over();
        }, during_time * 1000 + 1500); // 延时，保证转盘转完
      }
    },
    game_over() {
      this.toast_control = true;
      this.hasPrize = this.prize_list[this.index].isPrize
    },
    //关闭弹窗
    close_toast() {
      this.toast_control = false;
    }
  }
}
</script>
<style scoped>
  .lucky-wheel {
    padding-top:.5rem;
    height: 11rem;
    background: rgb(252, 207, 133) url(../../../assets/images/activity/color_pillar.png) no-repeat center bottom;
    background-size: 100%;
  }
  .lucky-title {
    height: 3rem;
    background: url(../../../assets/images/activity/lucky_title.png) no-repeat center top;
    background-size: 100%;
  }
  .wheel-main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .wheel-bg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 6.5rem;
    height: 6.5rem;
    background: url(../../../assets/images/activity/draw_wheel.png) no-repeat center top;
    background-size: 100%;
    color: #fff;
    font-weight: 500;
    transition: transform 3s ease;
    transform: rotate(20deg);
  }
  .wheel-pointer-box {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    width: 2rem;
    height: 2rem;
    transform: translate(-50%, -60%);
  }
  .wheel-pointer {
    width: 2rem;
    height: 2rem;
    background: url(../../../assets/images/activity/draw_btn.png) no-repeat center top;
    background-size: 100%;
    transform-origin: center 60%;
  }
  .prize-list {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .prize-list .prize-item {
    position: absolute;
    z-index: 2;
    text-align:center;
  }
  .prize-list .prize-item:first-child {
    top: .6rem;
    left: 1.95rem;
    transform: rotate(-19deg);
  }
  .prize-list .prize-item:nth-child(2) {
    top: .5rem;
    left: 3.43rem;
    transform: rotate(33deg);
  }
  .prize-list .prize-item:nth-child(3) {
    top: 1.55rem;
    left: 4.4rem;
    transform: rotate(72deg);
  }
  .prize-list .prize-item:nth-child(4) {
    top: 2.92rem;
    left: 4.3rem;
    transform: rotate(111deg);
  }
  .prize-list .prize-item:nth-child(5) {
    top: 4rem;
    left: 3.32rem;
    transform: rotate(159deg);;
  }
  .prize-list .prize-item:nth-child(6) {
    top: 3.9rem;
    left: 1.99rem;
    transform: rotate(196deg);
  }
  .prize-list .prize-item:nth-child(7) {
    top: 2.9rem;
    left: 1rem;
    transform: rotate(247deg);
  }
  .prize-list .prize-item:nth-child(8) {
    top: 1.65rem;
    left: 1rem;
    transform: rotate(286deg);
  }
  .prize-item {
    height: 2rem;
  }
  .prize-pic-img {
    width: 1.3rem;
  }
  .prize-count {
    font-size: .24rem;
  }
  .prize-type {
    font-size: .2rem;
  }
  .main {
    position: relative;
    z-index: 2;
    background: rgb(243, 109, 86);
    padding-bottom: .8rem;
  }
  .main-bg {
    width: 100%;
    height: 6.5625rem;
    position: absolute;
    z-index: -1;
    top: -1rem;
    left: 0;
    background: url(../../../assets/images/activity/luck_bg.png) no-repeat center top;
    background-size: 100%;
  }
  .content {
    top: 0.175rem;
    left: 0;
    padding-top:.2rem;
    height: 1rem;
    background: rgb(243, 113, 88);
    color: #ffeb39;
    text-align:center;
  }
  .tip {
    position: relative;
    border: .02rem solid #fbc27f;
  }
  .tip-title {
    position: absolute;
    top: -.49rem;
    left: 50%;
    padding: .3rem .6rem;
    transform: translate(-50%, 0);
    font-size: .3rem;
    color: #fccc6e;
    background: rgb(243, 112, 88);
  }
  .tip-content {
    padding: .4rem .3rem;
    line-height: 1.5;
    font-size: .3rem;
    color: #fff8c5;
  }
  .toast-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20000;
    padding: 0.3125rem;
    width: 6rem;
    transform: translate(-50%, -50%);
    border-radius: .3rem;
    background-color: rgb(252, 244, 224);
  }
  .toast-container {
    position: relative;
    border: .02rem dotted #fccc6e;
  }
  .toast-picture {
    position: absolute;
    top: -1.4rem;
    left: 0;
    right:0;
    margin: 0 auto;
    width: 6rem;
  }
  .toast-title {
    padding: .8rem 0 .3rem;
    font-size: 18px;
    color: #fc7939;
    text-align: center;
  }
  .toast-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: .3rem;
  }
  .toast-btn .toast-cancel {
    background-image: -moz-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );
    background-image: -ms-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );
    background-image: -webkit-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );
    box-shadow: 0 .02rem 0 0 rgba(174, 34, 5, 0.7);
    width: 3rem;
    height: .8rem;
    border-radius: .8rem;
    text-align: center;
    line-height: .85rem;
    color: #fff;
    font-size:.3rem;
  }
  .close {
    position: absolute;
    top: -.5rem;
    right: -.5rem;
    width: .6rem;
    height: .6rem;
    background: url(../../../assets/images/activity/close_store.png) no-repeat center top;
    background-size: 100%;
  }
</style>
