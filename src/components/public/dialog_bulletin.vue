<template>
  <div class="dialog-bulletin">
    <el-dialog :class="{mail: currentIndex == 1}" :visible.sync="dialogVisible" @closed="$emit('close')" width="765px">
      <div class="close" @click="$emit('close')">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      <div class="head">
        <el-row>
          <el-col
            :span="24"
            class="head-tab on"
          >{{currentIndex == 1 ? '站内信' : '平台公告'}}</el-col>
        </el-row>
      </div>
      <div class="content" v-loading="loading" >
<!--        <div class="banner" v-if="currentIndex == 0">-->
<!--          <img src="../../assets/images/bulletin_img.jpg" class="img"/>-->
<!--        </div>-->
        <el-row class="nr" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-col :span="6" class="nr-l">
            <template v-if="list && list.length">
              <div
                class="nr-l-item"
                @click="handleTabBulletin(item, item.id)"
                v-for="item in list"
                :key="item.id">
                <div v-if="currentIndex == 1 && !item.status" class="message-circle"></div>
                <div class="title wzfw">{{currentIndex == 1 ? item['message_content']['title'] : item['title']}}</div>
                <div class="date">{{item['created_at']}}</div>
              </div>
            </template>
            <div class="pagination">
              <el-pagination
                :small="true"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :total="total"
                layout="prev, pager, next"
              ></el-pagination>
            </div>
          </el-col>
          <el-col v-if="currentBullrtin" :span="18" class="nr-r">
            <div class="title">{{ currentBullrtin.title}}</div>
            <div class="text-centent" v-html="currentBullrtin['content']"></div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'dialog_bulletin',
  data() {
    return {
      currentIndex: this.index,
      dialogVisible: this.showBulletin,
      currentBullrtin: null,
      list: [],
      total: 0,
      page: 1,
      page_size: 5,
      loading: false
    }
  },
  props: ['showBulletin', 'index', 'currentBulletinIndex'],
  computed: {
    ...mapGetters(['notice'])
  },
  created() {
    this.initData()
  },
  methods: {
    ...mapActions(['getPopularLotteries2']),
    initData() {
      this.loading = true
      if(this.currentIndex == 0){
        this.Api.getNotice({ type: 1, page_size: this.page_size, page: this.page }).then(({ success, data }) => {
          this.loading = false
          if (success) {
            this.total = data.total
            for (const k of data['data']) {
              k['content'] = this.Utils.setImg(k['content'], 'add')
            }
            this.list = data.data
            this.currentBullrtin = this.currentBulletinIndex ? (this['list'].filter(val => val.id === this.currentBulletinIndex))[0] : this.list[0]
          }
        })
      } else {
        this.Api.getNotice({ type: 2, page_size: this.page_size, page: this.page }).then(({ success, data }) => {
          this.loading = false
          if (success) {
            this.total = data.total
            for (const k of data['data']) {
              k['message_content']['content'] = this.Utils.setImg(k['message_content']['content'], 'add')
            }
            this.list = data.data
            this.currentBullrtin = this.list[0]['message_content']
          }
        })
      }
    },
    handleCurrentIndex(num){
      this.list = []
      this.currentBullrtin = null
      this.currentIndex = num
      this.initData()
    },
    handleTabBulletin(item, id) {
      if (this.currentIndex == 1) {
        if (!item.status) {
          this.Api.lotteryRedMessage({id: id}).then(({success}) => {
            if (success) {
              item.status = 1
            }
          })
        }
        this.currentBullrtin = this.list.filter(val => val.id === id)[0]['message_content']
      }else{
        this.currentBullrtin = this.list.filter(val => val.id === id)[0]
      }
    },
    handleSizeChange(val) {
      this.page_size = val
      this.initData()
    },
    handleCurrentChange(val) {
      this.page = val
      this.initData()
    },
  }
}
</script>

<style lang="scss" scoped>
.dialog-bulletin {
  /deep/ {
    .el-dialog {
      position:absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      margin: auto !important;
      width:800px !important;
      height:515px;
      border-radius: 5px;
      overflow: auto;
    }
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
    .mail{
      .el-dialog {
        height:515px;
      }
    }
  }
  position: relative;
  .close {
    position: absolute;
    cursor: pointer;
    z-index: 9;
    top: 9px;
    color: #fff;
    right: 15px;
    font-size: 26px;
    transition: transform 0.2s ease-out;
    &:hover {
      transform: rotate(90deg);
    }
  }
  .head {
    background: #000;
    text-align: center;
    font-size: 18px;
    color: #fff;
    .head-tab {
      height: 45px;
      line-height: 45px;
      cursor: pointer;
      background: #292624;
      &.on {
        background: #ff9b00;
        color: #000;
      }
    }
  }
  .content {
    .banner {
      width: 100%;
      height: 135px;
      overflow: hidden;
      .img{
        width: 100%;
        height: 135px;
      }
    }
    .nr {
      color: #000;
      .nr-l {
        height: 470px;
        font-size: 14px;
        border-right: 1px solid #dadada;
        .pagination {
          text-align: center;
          padding: 10px 0;
        }
      }
      .nr-l-item {
        cursor: pointer;
        line-height: 1.5;
        padding: 10px 15px;
        border-bottom: 1px dotted #dadada;
        position: relative;
        .message-circle{
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #C82834;
          position: absolute;
          left: 3px;
          top: 8px;
        }
        &:hover {
          background: #f0f2f3;
        }
        .date {
          margin-top: 5px;
          font-size: 12px;
          color: #666666;
        }
      }
      .nr-r {
        padding: 0 10px;
        height: 460px;
        overflow: auto;
        .title {
          font-size: 18px;
          font-weight: 500;
          text-align: center;
          line-height: 70px;
          border-bottom: 1px dotted #dadada;
        }

        .text-centent {
          p {
            padding-bottom: 15px;
            text-indent: 2em;
          }
          /deep/ img{
            width:auto !important;
            max-width:95%;
          }
        }
      }
    }
  }
}
</style>
