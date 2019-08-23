<template>
  <div class="download">
    <div class="nr">
      <img class="img" src="../../assets/images/new/download_nr_bg.png" alt="">
      <img class="qr-img" :src="qrSrc" alt="二维码">
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'download',
  computed: {
    ...mapGetters(['qrSrc'])
  }
}
</script>

<style lang="scss" scoped>
.download{
  height: 969px;
  background: url('../../assets/images/new/download_bg.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
  .nr{
    position: absolute;
    width: 1230px;
    height: 511px;
    display: block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .img{
      width: 100%;
      height: 100%;
    }
    .qr-img{
      display: block;
      position: absolute;
      width: 144px;
      height: 144px;
      right: 367px;
      bottom: 59px;
    }
  }
}
</style>
