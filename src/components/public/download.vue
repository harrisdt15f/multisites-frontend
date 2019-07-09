<template>
  <div class="download">
    <img class="img" src="../../assets/images/new/download_nr_bg.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'download'
}
</script>

<style lang="scss" scoped>
.download{
  height: 969px;
  background: url('../../assets/images/new/download_bg.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
  .img{
    position: absolute;
    width: 1230px;
    height: 511px;
    display: block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
