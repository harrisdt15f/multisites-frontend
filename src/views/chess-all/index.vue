<template>
  <div class="chess-all">
    <div class="container">
      <div class="header-content">
        <div class="auto-item">
          <a href="">
            <img src="" alt="">
          </a>
        </div>
      </div>
      <div class="thematic-content">
        <div class="hot-game">
          <p class="title">热门游戏</p>
          <div class="header_seach">
            <input type="text" placeholder="游戏搜索">
          </div>
        </div>  
      </div>
    </div>
  </div>
</template>x

<script>
export default {

}
</script>

<style lang="scss" scoped>
.chess-all{
  width: 100%;
  background: #000 url('../../assets/images/qipai-bg.jpg') top no-repeat;
  padding-bottom: 50px;
  padding-top: 80px;
  min-height: 1000px;
  .container{
    width: 1200px;
    margin: 0 auto;
  }
  .header-content{
    width: 100%;
    text-align: center;
    height: 80px;
    line-height: 80px;
    background: linear-gradient(90deg,rgba(0,0,0,.9),rgba(0,0,0,.5));
  }
} 
.thematic-content{
  .hot-game{
    .title{

    }
    .header_seach{
      
    }
  }
}
</style>