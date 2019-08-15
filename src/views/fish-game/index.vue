<template>
  <div class="fish_nr" ref="fish_nr">
    <div class="fish-detail ">
      <section class="fish-detail-item"
               ref="fishItem"
               v-for="(item, index) in fishList"
               :key="index">
        <img :src="item.bg" alt="fish" class="fish-detail-img">
        <div class="wrapper">
          <div class="fish_txt" ref="fishTxt">
            <h2 class="fish-title" ref="fishTitle">
              {{item.title}}
              <img :src="item.icon" alt="icon" class="fish-title-icon">
            </h2>
            <p class="cont_txt" style="padding-top: 0; padding-bottom: 0;">{{item.content}}</p>
            <p class="fish-link" ref="fishLink">
              进入游戏
              <span class="glyphicon glyphicon glyphicon-menu-right"></span>
            </p>
          </div>
          <img :src="item.fish" alt="fish" class="fish-detail-img-right" ref="fishImgRight"/>
        </div>
      </section>
      
      
      
      <section  class="gallery-thumbs" @mouseenter="claearFish()" @mouseleave="autoFish()">
  
        <section class="gallery-thumbs-warp">
          <section class="gallery-thumbs-box" ref="galleryBox">
            <section class="fish-detail-thumb"
                     :class="{active: index === 0}"
                     ref="fishBtn"
                     v-for="(item, index) in btnList"
                     :key="index"
                     @click="changeFish(index)">
              <div class="fish-img">
                <img class="img" :src="item.icon">
              </div>
              <div class="text">{{item.en_name}}</div>
              <div class="text">{{item.zn_name}}</div>
            </section>
          </section>
          
        </section>
      
        <div class="swiper-button-prev" @click="prevs()"></div>
        <div class="swiper-button-next" @click="nexts()"></div>
      </section>
    </div>
  </div>
</template>

<script>
import { init, leave } from '@/utils/three'

export default {
  name: 'fish-game',
  data() {
    return {
      num: 0,
      time: null,
      
      // 上一个  下一个
      whishOne: 0,
      
      fishList: [
        {
          title: '捕鱼王',
          icon: require('../../assets/images/fishGame/fish2/logo_1180.png'),
          bg: require('../../assets/images/fishGame/fish2/bg_1180.jpg'),
          fish: require('../../assets/images/fishGame/fish2/pic_1180.png'),
          content: '3D画面及场景上更加逼真、更高之外，弹无虚发、百发百中等全新玩法更是吸引了众多线上平台玩家的目光。新的海底地图、新boss大金龙，以及100倍游戏场等给力玩法，吸引着各平台新玩家源源不断地加入到捕鱼的行列中来。而与其他用户一同狩猎深海BOSS、开启神秘宝箱、触发梦幻转盘的快感，让每位体验过AG《捕鱼王》的用户都感觉热血沸腾。'
        }, {
          title: '深海大赢家',
          icon: require('../../assets/images/fishGame/fish2/logo_20022.png'),
          bg: require('../../assets/images/fishGame/fish2/bg_20022.jpg'),
          fish: require('../../assets/images/fishGame/fish2/pic_20022.png'),
          content: '功能齐全，启用自动和目标锁定发射；立体光影渲染，以及感官逼真的动物形象，各个细节方面都给玩家们带来切身的真实体验。在音效方面动静结合，静谧地流水声、加上游鱼撩动水花的叮咚声，使得每一个玩家都瞬间化身为深海的渔夫，各种鱼儿统统都进入囊中。'
        }, {
          title: '捕鱼达人',
          icon: require('../../assets/images/fishGame/fish2/logo_23381.png'),
          bg: require('../../assets/images/fishGame/fish2/bg_23381.jpg'),
          fish: require('../../assets/images/fishGame/fish2/pic_23381.png'),
          content: '多款道具(召唤、冰冻、锁定、狂暴)任由搭配，各出奇招，无视小鱼乘胜追击，爱怎么打就怎么打，连嬴大奖不是梦。其中还有击杀闪电鱼、隐藏版鳄鱼，弹无虚发任你打，金币喷发超有感！'
        }, {
          title: '捕鱼大师',
          icon: require('../../assets/images/fishGame/fish2/logo_23382.png'),
          bg: require('../../assets/images/fishGame/fish2/bg_23382.jpg'),
          fish: require('../../assets/images/fishGame/fish2/pic_23382.png'),
          content: '考验玩家的运气之余，更讲求超凡技巧，便利的自动捕鱼加上特殊武器，花式捕鱼爽快爆金。谁能以渐少子弹捕获得渐多高价大鱼，便成达人称雄霸榜呢？！超乎你的想象。'
        }, {
          title: '皇金渔场2',
          icon: require('../../assets/images/fishGame/fish2/logo_23968.png'),
          bg: require('../../assets/images/fishGame/fish2/bg_23968.jpg'),
          fish: require('../../assets/images/fishGame/fish2/pic_23968.png'),
          content: '考皇金渔场--「海底总动员」，是一部经典的动画片巨作，也是许多人的童年记忆。而为了向这部电影致敬，游戏公司CQ9最近也推出新游戏「皇金渔场」，与广大的影迷一同庆祝「海底总动员」15周年的到来。\n' +
                  '本游戏中有许多不同的鱼种，像是小丑鱼、蓝倒吊、镰鱼、鲨鱼、海星等，让影迷在庆祝「海底总动员」15周年之余，也能与游戏公司CQ9一起进入「皇金渔场」的精采世界，来一场惊险刺激的冒险旅程!'
        }, {
          title: '空战世纪',
          icon: require('../../assets/images/fishGame/fish2/logo_22600.png'),
          bg: require('../../assets/images/fishGame/fish2/bg_22600.jpg'),
          fish: require('../../assets/images/fishGame/fish2/pic_22600.png'),
          content: '空战世纪是一款以空战作为题材的全概率射击游戏，游戏获得英国菠菜监管委员会（UKGC）认可，在游戏中从古今中外共提供了83款战机，并收录从第一次世界大战至今共计超过100款的真实战机资料和历史说明；而玩法方面则设有不同倍数场的6款战场背景丶5款不同等级的航炮丶自动与锁定射击功能丶累积Jackpot大奖等等，全新概率射击游戏结合拟真的战机与动画设计，让千万军事迷沉醉於翱翔空中的射击快感！精彩刺激的世纪之战现已上线，您准备好了吗？'
        },
        {
          title: '财神捕鱼',
          icon: require('../../assets/images/fishGame/fish2/logo_24162.png'),
          bg: require('../../assets/images/fishGame/fish2/bg_24162.jpg'),
          fish: require('../../assets/images/fishGame/fish2/pic_24162.png'),
          content: '游戏拥有23款鱼种，最高赔率达到1,000倍，同时支援4人联机同场游玩 3种注额场供会员选择入场，注额越高越有机会赢得丰厚奖励 免费奖励  机关炮：免费子弹最多可累积999发 钻头炮：提升击杀鱼群速度 财神：随机赔率最高可达300倍 财神发发发：随机赔率最高可达1000倍'
        }, {
          title: '龙王捕鱼',
          icon: require('../../assets/images/fishGame/fish2/logo_22829.png'),
          bg: require('../../assets/images/fishGame/fish2/bg_22829.jpg'),
          fish: require('../../assets/images/fishGame/fish2/pic_22829.png'),
          content: '蕴藏在深海中的传说宝藏与龙珠，在龙宫仙女、金龙、海洋生物的守护下，等待各位来猎取! 召集您好友，快点加入JDB捕鱼行列中，使用威力强大的龙王炮，获得30颗免费炮弹，更容易捕获海底生物与满满财宝，实现您一夜致富的梦想。'
        }
      ],
      
      btnList: [
        {icon: require('../../assets/images/fishGame/fish_item0.png'), en_name: 'AG', zn_name: '捕鱼王2'},
        {icon: require('../../assets/images/fishGame/fish_item0.png'), en_name: 'PT2', zn_name: '深海大赢家'},
        {icon: require('../../assets/images/fishGame/fish_item0.png'), en_name: 'BBIN', zn_name: '捕鱼达人'},
        {icon: require('../../assets/images/fishGame/fish_item0.png'), en_name: 'BBIN', zn_name: '捕鱼大师'},
        {icon: require('../../assets/images/fishGame/fish_item0.png'), en_name: 'CQ9', zn_name: '皇金渔场2'},
        {icon: require('../../assets/images/fishGame/fish_item0.png'), en_name: 'ALLBET', zn_name: '空战世纪'},
        {icon: require('../../assets/images/fishGame/fish_item0.png'), en_name: 'JDB168', zn_name: '财神捕鱼'},
        {icon: require('../../assets/images/fishGame/fish_item0.png'), en_name: 'JDB168', zn_name: '龙王捕鱼'}
      ]
    }
  },
  mounted() {
    const [
      DOM = this.$refs.fish_nr,
      fishItem = this.$refs.fishItem,
      fishTxt = this.$refs.fishTxt,
      fishImgRight = this.$refs.fishImgRight,
      galleryBox = this.$refs.galleryBox
    ] = []
    
    this.$nextTick(() => {
      this.Animation.move(fishItem[0], {'opacity': 100}, 20)
      this.Animation.move(fishTxt[0], {'top': 66, 'opacity': 100}, 15)
      this.Animation.move(fishImgRight[0], {'right': 0, 'opacity': 100}, 30)
      init(DOM)
    })
    
    this.autoFish()
    galleryBox.style.width = this.btnList.length * 204 + 'px'
  },
  methods: {
    
    prevs () {
      const galleryBox = this.$refs.galleryBox
      // 第一张
      if (this.whishOne !== 0) {
        this.whishOne --
      }
      else {
        // this.$alert('这已经是第一个啦', '提示', {
        //   confirmButtonText: '确定',
        //   callback: () => {}
        // })
      }
      this.Animation.move(galleryBox, {'left': this.whishOne * -176}, 30)
    },
    nexts () {
      const [
        galleryBox = this.$refs.galleryBox,
        num = this.btnList.length - 6
      ] = []
      // 最后一张
      if (num > this.whishOne) {
        this.whishOne ++
      }
      else {
        // this.$alert('这已经是最后一个啦', '提示', {
        //   confirmButtonText: '确定',
        //   callback: () => {}
        // })
      }
      
      this.Animation.move(galleryBox, {'left': this.whishOne * -176}, 30)
    },
    
    claearFish () {
      clearInterval(this.time)
    },
    
    // 点击切换
    changeFish (index) {
      
/*      if (index === this.num) {
        return
      }*/
      const [
        fishItem = this.$refs.fishItem,
        fishTxt = this.$refs.fishTxt,
        fishImgRight = this.$refs.fishImgRight,
        fishTitle = this.$refs.fishTitle,
        fishLink = this.$refs.fishLink,
        fishBtn = this.$refs.fishBtn
      ] = []
      
      for (let i = 0; i < fishItem.length; i++) {
        this.Animation.move(fishItem[i], {'opacity': 0}, 40)
        this.Animation.move(fishTxt[i], {'top': 800, 'opacity': 0}, 120)
        this.Animation.move(fishImgRight[i], {'right': 120, 'opacity': 100}, 20)
        let haveClass = fishBtn[i].className.indexOf('active')
        if (haveClass > -1) {
          fishBtn[i].className = fishBtn[i].className.substring(0, haveClass - 1)
        }
      }
  
      fishBtn[index].className += ' active'
      fishTxt[index].style['top'] = '66px'
      fishTxt[index].style['opacity'] = '1'
      fishTitle[index].style['top'] = '-60px'
      fishLink[index].style['bottom'] = '-60px'
      this.Animation.move(fishItem[index], {'opacity': 100}, 30)
      this.Animation.move(fishTxt[index], {'top': 66, 'opacity': 100}, 25)
      this.Animation.move(fishImgRight[index], {'right': 0, 'opacity': 100}, 20)
      this.Animation.move(fishTitle[index], {'top': 0}, 30)
      this.Animation.move(fishLink[index], {'bottom': 0}, 30)
      this.num = index
    },
    
    // 自动播放
    autoFish () {
      const fishItem = this.$refs.fishItem
      this.time = setInterval( () => {

        if (this.num < fishItem.length - 1) {
          this.num ++
        }
        else {
          this.num = 0
        }
        
        this.changeFish(this.num)
      }, 3000)
    }
  },
  destroyed () {
    this.claearFish()
    leave()
  }
}
</script>

<style lang="scss" scoped>
.fish_nr {
  position: relative;
  height: 700px;
  overflow: hidden;
  clear: both;
  .fish-detail {
    position:relative;
    height: 100%;
  }
  /deep/{
    canvas{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1
    }
    .swiper-container{
      z-index: 5;
    }
    .swiper-button-prev, .swiper-button-next{
      opacity: 1;
      width: 44px;
      cursor: pointer;
      background-size: 44px 44px;
    }
    .swiper-button-prev, .swiper-container-rtl .swiper-button-next{
      background-image: url('../../assets/images/fishGame/button-prev.png');
      
    }
    .swiper-button-next, .swiper-container-rtl .swiper-button-prev{
      background-image: url('../../assets/images/fishGame/button-next.png');
    }
  }
}
.fish-detail-thumb {
  background-size: cover;
  background-position: center;
}
.gallery-top {
  height: 100%;
  width: 100%;
}
.gallery-thumbs {
  bottom: 40px;
  padding: 0 68px;
  position: absolute;
  z-index: 5;
  width: 1200px;
  height:205px;
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
}
.gallery-thumbs .fish-detail-thumb {
  width: 176PX;
  height: 204PX;
  float:left;
  cursor:pointer;
  background: url('../../assets/images/fishGame/thumbs_bg.png') no-repeat;
}
.gallery-thumbs .fish-detail-thumb.active,
.gallery-thumbs .fish-detail-thumb:hover{
  background: url('../../assets/images/fishGame/thumbs_bg_hover.png') no-repeat;
}

.fish-detail-item {
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  opacity:0;
  .fish-detail-img{
    position:absolute;
    left:0;
    right:0;
    margin:0 auto;
    height:100%;
    z-index: -1;
  }
  .fish-detail-img-right{
    position:absolute;
    top:100px;
    right:120px;
    opacity: 0;
  }
  .wrapper {
    width: 1050px;
    height:100%;
    margin: 0 auto;
    position: relative;
    .fish_txt {
      color: rgb(255, 255, 255);
      text-shadow: rgba(48, 51, 54, 0.5) 1px 1px;
      position: absolute;
      left: 10px;
      top: 100%;
      width: 450px;
      z-index: 5;
      font-size: 15px;
      opacity: 0;
      .fish-title {
        margin: 0;
        position: relative;
        text-shadow: rgba(48, 51, 54, 0.5) 1px 1px;
        font: 36px/60px Microsoft YaHei;
        letter-spacing: 3px;
      }
      .fish-title-icon{
        display:inline-block;
        vertical-align: sub;
      }
      .fish-link{
        position:relative;
        cursor: pointer;
      }
      .cont_txt {
        position: relative;
        z-index: -1;
        text-shadow: rgb(0, 0, 0) 1px 1px 2px;
        margin: 10px 0;
        font-size: 16px;
        line-height: 1.5;
      }
      .fish-link {
        color: rgb(255, 255, 255);
        text-decoration-color: initial;
        text-shadow: none;
        background-image: linear-gradient(to top, #f83600 0%, #f9d423 100%);
        display: block;
        font-weight: normal;
        padding: 10px 20px;
        font-size: 25px;
        border-radius: 30px;
        text-align: center;
        margin-top: 20px;
        text-decoration: none;
        &:hover{
          background-image: linear-gradient(to top, #ff0000 0%, #ff6b6b 100%);
        }
      }
    }   
  }
}
.fish-detail-thumb{
  text-align: center;
  color: #fff;
  font-size: 16px;
  .fish-img{
    /*margin: 0 auto;*/
    /*width:85px;*/
    /*height:80px;*/
    /*border:5px solid #4fc8fe;*/
    /*border-radius:10px;*/
    /*overflow:hidden;*/
    .img{
      display: inline-block;
      margin-top: 28px;
      width:90px;
    }
  }
}


.gallery-thumbs-warp{
  position: relative;
  width:1055px;
  height:202px;
  overflow:hidden;
}
  .gallery-thumbs-box{
    position:absolute;
    left:0;
    top:0;
    overflow:hidden;
  }
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  width: 27px;
  height: 44px;
  margin-top: -22px;
  z-index: 10;
  cursor: pointer;
  background-size: 27px 44px;
  background-position: center;
  background-repeat: no-repeat;
}
.swiper-button-prev{
  left: 10px;
  right: auto;
}
.swiper-button-next{
  right: 10px;
  left: auto;
}
</style>

