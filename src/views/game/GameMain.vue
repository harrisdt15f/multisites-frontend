<template id="game-main">
    <div id='game-body'>
        <div class="main-center-con">
            <game-issue></game-issue>
            <game-method></game-method>
<!--            <game-select></game-select>-->
<!--            <game-order></game-order>-->
        </div>
    </div>
</template>
<script>
import GameSelect from './GameSelect'
import GameIssue from './GameIssue'
import GameOrder from './GameOrder'
import GameMethod from './GameMethod'

export default {
    name: 'game-main',
    components: {
        GameMethod,
        GameOrder,
        GameIssue,
        GameSelect
    },
    props: {
        'lotterySign': String,
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {

    },
    mounted () {

        this.getLotteryInfo();
    },

    destroyed: function () {

    },
    watch: {
        '$route': 'getLotteryInfo'
    },
    methods: {
        getLotteryInfo() {
            this.loading = true;
            this.Api.getLotteryInfo(this.lotterySign).then(data => {
                if (data.isSuccess) {
                    this.loading = false;
                    this.$store.commit('currentIssue',      data.data.issueInfo);
                    this.$store.commit('currentLottery',    data.data.lottery);
                    this.$store.commit('issueHistory',      data.data.issueHistory);
                    this.$store.commit('defaultGroup',      data.data.defaultGroup);
                    this.$store.commit('defaultMethod',     data.data.defaultMethod);
                    this.$store.commit('allMethods',        data.data.methods);
                }
            });
        },
        // 刷新历史
        issueGetHistory () {
            this.Api.getIssueHistory(this.lotterySign).then(data => {
                self.refreshTimer = null;
                self.open_list_first = true;
                if (data.isSuccess) {
                    this.issueHistory = response.data.data;
                }
            });
        }
    }
};
</script>

<style>
    @import '../../assets/css/game-v2.css';
</style>