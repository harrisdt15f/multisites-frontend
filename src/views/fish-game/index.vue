<template>
  <div class="fish_nr" ref="fish_nr">
    <div class="fish-detail">
      <swiper class="gallery-top" ref="swiperTop">
        <swiper-slide class="fish-detail-item">
          <div class="wrapper" >
            <div class="fish_txt" style="top: 50px; opacity: 1;">
              <h2>捕鱼王</h2>
              <p
                class="cont_txt"
                style="padding-top: 0px; padding-bottom: 0px;"
              >继承了千炮主流经典捕鱼模式，四名玩家能够同屏捕鱼，多人联网，万人在线。更增加了大量神秘BOSS，各不相同的道具和技能。同时游戏中增加了比赛模式，不仅有大奖赛，还有全民赛，让在捕鱼之余可以体验刺激的竞技体验。《捕鱼游戏王》中创新性加入水族箱系统，玩家可不仅以喂养不同的鱼儿，更可访问好友的水族箱帮助好友喂食鱼儿获得经验。</p>
              <a
                onclick="entereleGame(this)"
                livecode="ag"
                gametype="6"
                gamekind="XIN"
                style="cursor: pointer;"
              >
                进入游戏
                <span class="glyphicon glyphicon glyphicon-menu-right" aria-hidden="true"></span>
              </a>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="fish-detail-item"></swiper-slide>
        <swiper-slide class="fish-detail-item"></swiper-slide>
        <swiper-slide class="fish-detail-item"></swiper-slide>
        <swiper-slide class="fish-detail-item"></swiper-slide>
      </swiper>
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide v-for="item in 10" :key="item" class="fish-detail-thumb">
          
        </swiper-slide>

        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Three from '@/utils/three'

export default {
  name: 'fish-game',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  mounted() {
    const DOM = this.$refs.fish_nr
    this.$nextTick(() => {
      Three(DOM)
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.fish_nr {
  position: relative;
  height: 720px;
  overflow: hidden;
  clear: both;
  .fish-detail {
    height: 100%;
  }
  /deep/{
    canvas{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1
    }
  }
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}
.gallery-top {
  height: 100%;
  width: 100%;
}
.gallery-thumbs {
  bottom: 30px;
  position: absolute;
  z-index: 5;
  width: 1200px;
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  padding: 0 68px;
  /deep/ .swiper-wrapper{
    overflow: hidden;
  }
}
.gallery-thumbs .swiper-slide {
  width: 176PX;
  height: 204PX;
  background: url('../../assets/images/fishGame/thumbs_bg.png') no-repeat;
  
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
.fish-detail-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-image: url('../../assets/images/fishGame/bg_1180.jpg');
  .wrapper {
    width: 980px;
    margin: 0 auto;
    position: relative;
    .fish_txt {
      color: rgb(255, 255, 255);
      text-shadow: rgba(48, 51, 54, 0.5) 1px 1px;
      position: absolute;
      left: 10px;
      width: 450px;
      z-index: 5;
      font-size: 15px;
      h2 {
        text-shadow: rgba(48, 51, 54, 0.5) 1px 1px;
        font: 36px/60px Microsoft YaHei;
        letter-spacing: 3px;
        margin: 0;
      }
      .cont_txt {
        text-shadow: rgb(0, 0, 0) 1px 1px 2px;
        margin: 10px 0;
        font-size: 16px;
        line-height: 1.5;
      }
      a {
        color: rgb(255, 255, 255);
        text-decoration-color: initial;
        text-shadow: none;
        background-image: linear-gradient(
          to top,
          rgb(204, 44, 0) 0%,
          rgb(178, 148, 5) 100%
        );
        display: block;
        font-weight: normal;
        padding: 10px 20px;
        font-size: 25px;
        border-radius: 30px;
        text-align: center;
        margin-top: 20px;
        text-decoration: none;
      }
    }   
  }
}
</style>

