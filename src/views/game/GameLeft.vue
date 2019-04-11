<template id="gameLeft">
    <div id="nav-mobile" class="sidebar">
        <div class="sidebar-list-new ">
            <ul class="sidebar-list-new__ul">
                <li class="sidebar-list-new__li @if($cat == 'hot') selected__li @endif">
                    <span>热门彩种</span>
                    <i class="side-hot__i">火热
                    </i>
                    <div class="sidemenu-new">
                        <ul class="sidemenu-new__ul">
                            <li v-for="(_lottery, _sign) in lotteries" v-bind:key="_sign">
                                <router-link :to="'/bet/' + _sign">{{_lottery.name}}</router-link>
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
    };
</script>

<style>

</style>