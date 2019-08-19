<template>
  <div class="help-info">
    <div class="wrapper">
      <div v-for="(items, index) in helpList" :key="index" class="help-wrap">
        <h3 id="help-tit1">{{items.menu}}</h3>
        <div v-for="(item, index) in items.children" :key="index">
          <div class="help-wrap-tit" :id="item.id">{{item.menu}}</div>
          <div v-html="item.content" style="word-break:break-word;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  props: ['pageId'],
  computed: {
    ...mapGetters(['helpList'])
  },
  mounted () {
    // 定位到指定id 
    if(!this.helpList || !this.helpList.length) this.$router.push('/help-center')
    const anchor = document.getElementById(this.pageId)
    if (anchor) {
      this.$nextTick(() => {
        anchor.scrollIntoView()
      })
     
    }
  }
}
</script>

<style lang="scss" scoped>
.help-info {
  width: 1000px;
  margin: 0 auto;
  .wrapper {
    margin: 0 auto;
    width: 1000px;
    min-height: 10px;
  }
}
.help-wrap {
  background: #fff;
  margin: 10px 0;
  padding: 10px 30px;
  line-height: 24px;
  overflow: hidden;
}
.help-wrap h3 {
  font-size: 18px;
  color: #fc9721;
}
.help-wrap-tit {
  color: #333;
  font-weight: bold;
  font-size: 14px;
  margin: 15px 0 0;
}
</style>

