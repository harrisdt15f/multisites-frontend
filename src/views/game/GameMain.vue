<template id="game-main">
    <div id='game-body'>
        <div class="main-center-con">
            <game-issue></game-issue>
            <game-method></game-method>
            <game-select></game-select>
            <game-order></game-order>
        </div>
    </div>
</template>
<script>

    import {API} from "../../API";
    import GameSelect from "./GameSelect";
    import GameIssue from "./GameIssue";
    import GameOrder from "./GameOrder";
    import GameMethod from "./GameMethod";

    export default {
        name: 'game-main',
        template: '#game-main',
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
            console.log(this.lotterySign);
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
                API.getLotteryInfo(this.lotterySign).then(data => {
                    this.loading = false;

                    this.$store.commit('currentIssue',      data.issueInfo);
                    this.$store.commit('currentLottery',    data.lottery);
                    this.$store.commit('issueHistory',      data.issueHistory);
                    this.$store.commit('defaultGroup',      data.defaultGroup);
                    this.$store.commit('defaultMethod',     data.defaultMethod);
                    this.$store.commit('allMethods',        data.methods);

                });
            },


            // 刷新历史
            issueGetHistory() {
                API.getIssueHistory(this.lotterySign, 10).then(function (response) {
                    self.refreshTimer       =   null;
                    self.open_list_first    =   true;

                    if (response.data.isSuccess) {
                        this.issueHistory = response.data.data;
                    } else {
                        consoel.log(response.data.msg);
                    }
                });


            }
        }
    };
</script>

<style>

</style>