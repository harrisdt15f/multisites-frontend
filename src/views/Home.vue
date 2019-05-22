<template>
  <div class="home">
    <Header></Header>
    <router-view :key="$route.fullPath"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Header from "../components/header_new";
import Footer from "../components/footer_new";

export default {
  name: "Home",
  components: {
    Header,
    Footer
  },
  created() {
    this.initData();
  },
  methods: {
    ...mapActions(["getBanner", "getQrcode"]),
    initData() {
      this.getBanner();
      this.getQrcode();
    }
  }
};
</script>
