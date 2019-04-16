<template id="home">
  <div class="home">
    <Header></Header>
    <GameMain></GameMain>
<!--    <Footer></Footer>-->
  </div>
</template>

<script>
import GameMain from './../views/game/GameMain'
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';

export default {
  name: 'Home',
  components: {
    GameMain,
    Header,
    Footer
  }
}
</script>
