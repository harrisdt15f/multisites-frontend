<template>
  <div class="home">
    <Header></Header>
    <router-view :key="$route.fullPath"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Header from '../components/header_new'
import Footer from '../components/footer_new'

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  created() {
    this.initData()
  },
  methods: {
    ...mapActions(['getBanner', 'getActivity', 'getLogo', 'getQrcode', 'getNotice', 'getPopularLotteries1', 'getPopularLotteries2']),
    initData() {
      this.Api.showHomepageModel().then(({success, data}) => {
        if (success && data) {
          data['logo'] ? this.getLogo() : null
          data['banner'] ? this.getBanner() : null
          data['qr.code'] ? this.getQrcode() : null
          data['customer.service'] ? '' : null
          data['winning.ranking'] ? '' : null
          data['notice'] ? this.getNotice() : null
          data['popularLotteries.one'] ? this.getPopularLotteries1() : null
          data['popularLotteries.two'] ? this.getPopularLotteries2() : null
          data['activity'] ? this.getActivity() : null
        }
      })
    }
  }
}
</script>
