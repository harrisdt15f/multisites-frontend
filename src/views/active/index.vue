<template>
  <div class="active">
    <el-row class="active-group">
      <el-col :span="24">
        <el-card class="active-group-item" shadow="hover">
          <img class="img" src="../../assets/images/active1.jpg">
          <div class="head">
            <p class="public_color">晋升奖励</p>
            请点击进入活动详情页面
            <el-button class="btn" type="danger" @click="show = !show">查看详细</el-button>
          </div>
          <el-collapse-transition>
            <div v-if="show" class="collapse">
              <div style="height:20px;"></div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；<br>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-transition>
        </el-card>
        <el-card class="active-group-item" shadow="hover">
          <img class="img" src="../../assets/images/active1.jpg">
          <div class="head">
            <p class="public_color">晋升奖励</p>
            请点击进入活动详情页面
            <el-button class="btn" type="danger">查看详细</el-button>
          </div>
        </el-card>
        <el-card class="active-group-item" shadow="hover">
          <img class="img" src="../../assets/images/active1.jpg">
          <div class="head">
            <p class="public_color">晋升奖励</p>
            请点击进入活动详情页面
            <el-button class="btn" type="danger">查看详细</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show:false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/var.scss";
.active{
  width: 1200px;
  margin: 0 auto;
  .active-group{
    padding-top: 30px;
  }
  .active-group-item{
    margin-bottom: 30px;
  }
  /deep/ {
    .el-card{
      transition: none;
    }
    .el-card__body{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 18px 40px 18px 20px;
      background: #fdfdfd;
      border-radius: 4px;
      .img{
        width: 710px;
        height: 184px;
      }
    }
    .el-button--danger{
      background-color: $primary-color;
      border-color: $primary-color;
      
      span{
        font-size:18px;
      }
    }
    .head {
      position: relative;
      width: 390px;
      font-size: 17px;
      line-height: 25px;
      color: #999;
      .public_color {
        color:  $primary-color-hover;
        border-color: #fc1805;
      }
      p {
        margin-bottom: 10px;
        font-size: 20px;
        line-height: 50px;
      }
    }
    .btn{
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .collapse{
  }
}
</style>
