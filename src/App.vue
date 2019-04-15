<template>
      <router-view></router-view>
</template>
<script>
  export default {
    name: 'app',
    created: function() {},
    mounted: function() {},
    destroyed: function() {},
    components: {},
  };
</script>
<style>
.w {
      width: 990px;
      margin: 0 auto;
      position: relative;
}
.w:after {
      content: "";
      display: block;
      clear: both;
}
a, button {
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
}
@media (min-width: 1280px){
      .w {
            width: 1200px;
      }
}
</style>