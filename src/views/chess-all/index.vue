<template>
  <div class="chess-all">
    <div class="container">
      <div class="header-content">
        <div class="auto-item active">
          <img class="img" src="../../assets/images/chess/dggGame.png">
          ABC
        </div>
        <div class="auto-item">
          <img class="img" src="../../assets/images/chess/leg_logo4545455454.png">
          LEG
        </div>
        <div class="auto-item">
          <img class="img" src="../../assets/images/chess/201902131919146400.jpg">
          德胜
        </div>
        <div class="auto-item">
          <img class="img" src="../../assets/images/chess/201903091909355142.jpg">
          爱棋牌
        </div>
        <div class="auto-item">
          <img class="img" src="../../assets/images/chess/201905031646132603.jpg">
          天美
        </div>
      </div>
      <div class="thematic-content">
        <div class="hot-game">
          <p class="title">热门游戏</p>
          <div class="header_seach">
            <i class="el-icon-search"></i>
            <input class="input" type="text" placeholder="游戏搜索">
          </div>
        </div>
        <div class="content-ul-group">
          <div class="content-ul-item" v-for="item in 10" :key="item">
            <div class="content-game_img">
              <img src="../../assets/images/chess/longhudou.png" alt>
            </div>
            <p class="content_gamename">龙虎斗</p>
            <p class="content_explain">棋牌游戏</p>
          </div>
        </div>
      </div>
      <div class="page-ing">
         <el-pagination
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</template>x

<script>
export default {}
</script>

<style lang="scss" scoped>
.chess-all {
  width: 100%;
  background: #000 url("../../assets/images/qipai-bg.jpg") top no-repeat;
  padding-bottom: 50px;
  padding-top: 80px;
  min-height: 1000px;
  .container {
    width: 1200px;
    margin: 0 auto;
  }
  .header-content {
    width: 100%;
    margin: 40px 0;
    height: 80px;
    line-height: 80px;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5));
  }
}
.thematic-content {
  margin-bottom: 40px;
  .hot-game {
    overflow: hidden;
    height: auto;
    margin: 0 15px;
    .title {
      float: left;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
    }
    .header_seach {
      float: right;
    }
  }
}
.header_seach {
  border-radius: 18px;
  background: linear-gradient(
    90deg,
    rgba(169, 18, 142, 0.9),
    rgba(169, 18, 142, 0.5)
  );
  height: 38px;
  width: 300px;
  position: relative;
  .el-icon-search {
    position: absolute;
    color: #f4e1f1;
    left: 10px;
    top: 8px;
    font-size: 22px;
  }
  .input {
    border: none;
    width: 80%;
    margin-top: 3px;
    margin-left: 34px;
    height: 85%;
    outline: none;
    color: #fff;
    padding-left: 10px;
    font-size: 14px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    background: none;
    border: 0;
    &::-webkit-input-placeholder {
      color: #ccc;
    }
    &:-moz-placeholder {
      color: #ccc;
    }
    &:-ms-input-placeholder {
      color: #ccc;
    }
  }
}
.content-ul-group {
  display: block;
  box-sizing: border-box;
  padding-top: 50px;
  overflow: hidden;
  .content-ul-item {
    float: left;
    box-sizing: border-box;
    border: 3px solid rgba(169, 18, 142, 0.5);
    margin-left: 55px;
    width: 222px;
    height: 279px;
    margin-bottom: 12px;
    cursor: pointer;
    background: #504579;
    &:hover{
      img{
        transform: rotate(1turn);
        width: 115%;
        height: 115%;
      }
      p{
        color: #ff0;
      }
    }
    p{
      text-align: center;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #fff;
      font-size: 16px;
    }
    .content-game_img {
      width: 199px;
      height: 199px;
      margin: 8px auto;
      text-align: center;
      border-radius: 50%;
    }

    .content-game_img img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 20px;
      transition: All 0.4s ease-in-out;
    }

    .content_gamename {
      padding: 10px 0;
      margin-top: -15px;
      font-size: 17px;
      color: #fff;
      background-color: #914f8f;
    }

    .content_explain {
      line-height: 29px;
    }
  }
}
.header-content{
  font-size: 0;
  .auto-item{
    width: 20%;
    display: inline-block;
    text-decoration: none;
    color: #fff;
    font-size: 25px;
    height: 100%;
    .img{
      display: inline-block;
      vertical-align: middle;
      width: 100px;
      height: 35px;
      margin: 0 15px;
    }
    &:hover,&.active{
      background-color: #52437a;
      color: #fef1f0!important;
      border-bottom: 3px solid #a9128e;
    }
  }
}
</style>

<style>
.page-ing div {
    text-align: center!important
}

.page-ing .el-pagination .btn-next,.page-ing .el-pagination .btn-prev,.page-ing .el-pagination button:disabled {
    background-color: #000;
    color: #fff;
}

.page-ing .el-pager li {
    background: #000;
    color: #fff !important;
}

.page-ing .el-pager li.active {
    color: #ff0 !important;
}

.page-ing .el-pagination__jump {
    color: #fff;
}

.page-ing .el-pagination__editor {
    margin: 0 8px;
}

.page-ing .el-pagination__editor.el-input .el-input__inner {
    height: 24px;
}

.page-ing .el-input__inner {
    background: #000;
    color: #fff;
}

.page-ing .el-pager li:hover {
    color: #ff0;
}

.page-ing .el-input.is-active .el-input__inner,.page-ing .el-input__inner:focus {
    color: #ff0;
    border-color: #ff0;
}
</style>
