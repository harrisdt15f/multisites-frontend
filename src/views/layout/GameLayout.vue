<template id="home">
    <div class="warp">
    <div  class="main-center">
        <game-left :lotteries="lotteries" v-on:select-lottery="onSelectLottery"></game-left>
        <router-view></router-view>
    </div>
    </div>
</template>

<script>
    import GameLeft from "../game/GameLeft";
    import { API } from "../../API";

    export default {
        name: 'GameLayout',
        template: '#game-layout',
        components: {
            GameLeft,
        },

        created() {
            this.getAllLotteries();
            this.getIssueInfo();
        },

        data() {
            return {
                lotteries: {},
                currentLotterySign:'cqssc',
                currentLottery:{},
                issueInfo:{}
            };
        },

        methods: {
            getAllLotteries() {
                API.getAllLotteries().then(data => {
                    this.lotteries = data;
                    this.currentLottery = this.lotteries[this.currentLotterySign];
                });
            },
            getIssueInfo() {
                API.getIssueInfo(this.currentLotterySign).then(data => {
                    this.issueInfo = data;
                });
            },

            onSelectLottery(sign) {
                this.currentLotterySign = sign;
                this.getIssueInfo();
            }
        }
    };
</script>
<style>
    @import "../../assets/css/index.css";
    @import "../../assets/css/shared.css";
    @import "../../assets/css/base.css";
    @import "../../assets/css/game.css";
</style>