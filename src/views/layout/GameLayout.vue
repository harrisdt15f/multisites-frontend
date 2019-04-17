<template>
    <section>
        <router-view></router-view>
    </section>
</template>

<script>

export default {
    name: 'GameLayout',
    created() {
        this.getLotteryList()
        this.getIssueInfo()
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
        getLotteryList() {
            this.Api.getLotteryList().then(data => {
                if (data.isSuccess) {
                    this.lotteries = data.data;
                    this.currentLottery = this.lotteries[this.currentLotterySign];
                }
            })
        },
        getIssueInfo() {
            let data = {
                lottery_sign: this.currentLotterySign
            }
            this.Api.getIssueInfo(data).then(data => {
                if (data.isSuccess) {
                    this.issueInfo = data.data;
                }
            });
        },
        onSelectLottery(sign) {
            this.currentLotterySign = sign;
            this.getIssueInfo();
        }
    }
}
</script>
<style>
    @import "../../assets/css/index.css";
    @import "../../assets/css/shared.css";
    @import "../../assets/css/base.css";
    @import "../../assets/css/game.css";
</style>