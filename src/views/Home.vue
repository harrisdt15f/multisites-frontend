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
import GameMain from './../views/game/GameMain'
import Header from '../components/header'
import Footer from '../components/footer'

export default {
  name: 'Home',
  components: {
    GameMain,
    Header,
    Footer
  }
}
</script>
