<template>
  <div class="bet-record sub-account">
    <el-tabs v-model="activeName">
      <el-tab-pane 
        v-for="(item, index) in lotteryLists" :key="index" 
        :label="item.name" 
        :name="item.sign">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeName: 'game',
    }
  },
  computed: {
    ...mapGetters([
      'lotteryAll',
      'lotteryLists'
    ])
  },
  created () {
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.bet-record {
  .container {
    padding: 0 35px 35px;
  }
  /deep/{
    .el-input--mini .el-input__inner{
      height: 28px;
    }
  }
}
</style>
