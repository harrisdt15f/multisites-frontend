<template>
  <div class="home">
    <Header></Header>
    <router-view></router-view>
<!--    <el-main>-->
<!--      <ProductList/>-->
<!--    </el-main>-->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/header'
import Footer from '../components/footer'

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  }
}
</script>
