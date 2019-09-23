<template>
  <div class="active">
    <el-row class="active-group">
      <el-col :span="24">
        <el-card v-for="(item, index) in list" :key="index"  class="active-group-item" shadow="hover">
          <img class="img" :src="`${rootUrl}/${item.preview_pic_path}`" />
          <div class="head">
            <p class="public_color">{{item.title}}</p>{{item.updated_at}}
            <el-button class="btn" type="danger" @click="item.show = !item.show">查看详细</el-button>
          </div>
          <el-collapse-transition>
            <div v-if="item.show" class="collapse">
             <div v-html="item.content"></div>
            </div>
          </el-collapse-transition>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: null,
      rootUrl: process.env.VUE_APP_API_URL,
      show: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.Api.activityList().then(({ success, data }) => {
        if (success) {
          this.list = data.data
          this.list.map(v => {
            this.$set(v, 'show', false)
          })
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var.scss";
.active {
  width: 1200px;
  min-height: 600px;
  margin: 0 auto;
  .active-group {
    padding-top: 30px;
  }
  .active-group-item {
    margin-bottom: 30px;
  }
  /deep/ {
    .el-card {
      transition: none;
    }
    .el-card__body {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 18px 40px 18px 20px;
      background: #fdfdfd;
      border-radius: 4px;
      .img {
        width: 710px;
        height: 184px;
      }
    }
    .el-button--danger {
      background-color: $primary-color;
      border-color: $primary-color;

      span {
        font-size: 18px;
      }
    }
    .head {
      position: relative;
      width: 390px;
      font-size: 17px;
      line-height: 25px;
      color: #999;
      .public_color {
        color: $primary-color-hover;
        border-color: #fc1805;
      }
      p {
        margin-bottom: 10px;
        font-size: 20px;
        line-height: 50px;
      }
    }
    .btn {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .collapse {
    clear: both;
    width: 100%;
  }
}
</style>
