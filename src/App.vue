<template>
  <router-view></router-view>
</template>
<script>
export default {
  name: 'app',
  created () {
    this.getIco()
  },
  methods: {
    getIco(){
      this.Api.getIco().then(({success, data}) => {
        if (success) {
          const href = `${process.env.VUE_APP_API_URL}${data}`,
                html = document.createElement('link'),
                domHead = document.getElementsByTagName('head')
          
          html.setAttribute('rel', 'icon')
          html.setAttribute('href', href)
          domHead[0].appendChild(html)
        }
      })
    }
  }
}
</script>
<style>
@import "./assets/css/base.css";
</style>
