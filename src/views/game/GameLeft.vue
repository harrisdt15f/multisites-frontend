<template id="gameLeft">
    <div id="nav-mobile" class="sidebar">
        <div class="sidebar-list-new ">
            <ul class="sidebar-list-new__ul">
                <li @click="logout()">退出</li>
                <li class="sidebar-list-new__li @if($cat == 'hot') selected__li @endif">
                    <span>热门彩种</span>
                    <i class="side-hot__i">火热
                    </i>
                    <div class="sidemenu-new">
                        <ul class="sidemenu-new__ul">
                            <li v-for="(_lottery, _sign) in lotteries" v-bind:key="_sign">
<!--                                <router-link :to="'/bet/' + _sign">{{_lottery.name}}</router-link>-->
                                <a href="javascript:;" @click="goLottery(_lottery, _sign)">{{_lottery.name}}</a>
                                <i class="side-hot__i" v-if="_lottery.hot">火热</i>
                                <i class="side-new__i" v-if="_lottery.new">新</i>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'gameLeft',
    template: '#game-left',
    components: {

    },
    props: {
        'lotteries': {}
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState([])
    },
    methods: {
        goLottery (item, path) {
            this.$router.push( '/bet/' + path)
            this.$store.commit('currentLotterySign', path)
        },
        logout () {
            this.Utils.storage.remove('current-user')
            this.$router.push('/login')
        }
    }
};
</script>

<style>

</style>