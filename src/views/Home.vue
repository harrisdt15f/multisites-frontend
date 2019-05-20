<template>
  <div class="home">
    <Header></Header>
    <router-view :key="$route.fullPath"></router-view>
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
