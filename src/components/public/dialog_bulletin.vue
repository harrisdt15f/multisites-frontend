<template>
  <div class="dialog-bulletin">
    <el-dialog :visible.sync="dialogVisible" @closed="$emit('close')" width="765px">
      <div class="close" @click="$emit('close')">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      <div class="head">
        <el-row>
          <el-col
            @click.native="handleCurrentIndex(0)"
            :span="12"
            class="head-tab"
            :class="{on : currentIndex == 0}"
          >平台公告</el-col>
          <el-col
            @click.native="handleCurrentIndex(1)"
            :span="12"
            class="head-tab"
            :class="{on : currentIndex == 1}"
          >站内信</el-col>
        </el-row>
      </div>
      <div class="content" v-loading="loading" >
        <div class="banner" v-if="currentIndex == 0">
          <img src="../../assets/images/bulletin_img.jpg" />
        </div>
        <el-row class="nr" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-col :span="6" class="nr-l">
            <template v-if="list && list.length">
              <div
                class="nr-l-item"
                @click="handleTabBulletin(item.id)"
                v-for="item in list"
                :key="item.id">
                <div class="title">{{item.title}}{{item.id}}</div>
                <div class="date">2019-05-17 18:05:10</div>
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
            <div class="title">{{currentBullrtin.title}}</div>
            <div class="text-centent" v-html="currentBullrtin.content"></div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      count: 5,
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
    initData() {
      this.loading = true
      if(this.currentIndex == 0){
        this.Api.getNotice({ type: 1, count: this.count, page: this.page }).then(({ success, data }) => {
          this.loading = false
          if (success) {
            this.total = data.total
            this.list = data.data
            this.currentBullrtin = this.currentBulletinIndex ? (this.list.filter(val => val.id === this.currentBulletinIndex))[0] : this.list[0]
          }
        })
      } else {
        this.Api.getNotice({ type: 2, count: this.count, page: this.page }).then(({ success, data }) => {
          this.loading = false
          if (success) {
            this.total = data['message'].total
            this.list = data['message'].data
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
    handleTabBulletin(id) {
      if (this.currentIndex == 0) {
        this.currentBullrtin = this.list.filter(val => val.id === id)[0]
      }else{
        this.currentBullrtin = this.list.filter(val => val.id === id)[0]['message_content']
      }
      
    },
    handleSizeChange(val) {
      this.count = val
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
      margin-top: 5vh !important;
    }
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
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
    text-align: center;
    font-size: 18px;
    color: #fff;
    .head-tab {
      height: 45px;
      line-height: 45px;
      cursor: pointer;
      background: #292624;
      &.on {
        background: #febb57;
        color: #000;
      }
    }
  }
  .content {
    min-height: 450px;
    .banner {
      width: 100%;
      height: 145px;
      overflow: hidden;
    }
    .nr {
      color: #000;
      .nr-l {
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
        padding: 0 30px 30px;
        .title {
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          line-height: 70px;
          border-bottom: 1px dotted #dadada;
        }

        .text-centent {
          p {
            padding-bottom: 15px;
            text-indent: 2em;
          }
        }
      }
    }
  }
}
</style>
