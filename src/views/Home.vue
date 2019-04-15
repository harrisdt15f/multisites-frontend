<template id="home">
  <div class="home">
    <Header></Header>
<!--    <el-main>-->
<!--      <ProductList/>-->
<!--    </el-main>-->
<!--    <Footer></Footer>-->
  </div>
</template>

<script>
import ProductList from './../components/ProductList.vue';
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';

export default {
  name: 'Home',
  template: '#home',
  components: {
    ProductList,
    Header,
    Footer,
  },
};
</script>
