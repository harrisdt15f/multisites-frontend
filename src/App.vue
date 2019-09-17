<template>
  <router-view></router-view>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'app',
  computed: {
    ...mapGetters(['ico'])
  },
  created() {
    this.getIco();
  },
  methods: {
    //获取标签头部小图标
    getIco() {
      const href = this.ico,
        html = document.createElement('link'),
        domHead = document.getElementsByTagName('head');
      html.setAttribute('rel', 'icon');
      html.setAttribute('href', href);
      domHead[0].appendChild(html);
    }
  }
};
</script>
<style>
@import "./assets/css/base.scss";
</style>
