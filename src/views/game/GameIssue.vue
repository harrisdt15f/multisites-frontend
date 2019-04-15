<template id="game-issue">
    <div class="main-lottery-top-msg">
        <div class="main-deadline">
            <div v-if="currentLottery.fast_open">
                <h5>第
                    <strong id="current_no" v-if="issueInfo[0] && issueInfo[0]['issues']">{{issueInfo[0]['issue_no']}}</strong>
                    <strong id="current_no" v-else></strong>
                    期剩余投注时间</h5>
                <div class="main-deadline-time" id="current_remainTime">00:00</div>
                <div class="main-deadline-txt">{{currentLottery.desc}}</div>
            </div>
            <div v-else>
                <div class="main-deadline-time">{{currentLottery.cn_name}}</div>
            </div>

        </div>
        <div v-bind:class="[currentLottery.series_id == 'pk10' ? 'main-lottery-num-pk' : 'main-lottery-num']">
            <h5>
                <span>{{currentLottery.cn_name}}</span>
                <i>
                    第 <i id="before_no" v-if="this.$store.state.currentIssue">{{this.$store.state.currentIssue['issue_no']}} </i> 期
                    <span id="before_desc"></span>
                </i>
            </h5>
            <ul id="before_opencode" v-if="currentLottery.series_id == 'kl3'">
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
            </ul>
            <ul id="before_opencode" v-else-if="currentLottery.series == 'pk10'">
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
            </ul>
            <ul id="before_opencode" v-else>
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
                <li class="open-num"></li>
            </ul>
        </div>

        <div v-bind:class="[ currentLottery.pattern == 'pk10' ? 'main-lottery-list-pk' : 'main-lottery-list' ]">
            <h5>最新开奖<i class="ico ico-new">new</i>  <a v-bind:href="currentLottery.trend" target="_blank">走势图</a></h5>
            <ul id="open-list">
                <li v-for="(issue, _issueKey) in issueHistory" :key="_issueKey">
                    <span class="main-lottery-issue">{{issue.issue_no}}</span>
                    <span class="main-lottery-issueNum">
                        {{issue.code}}
                    </span>
                </li>
            </ul>
        </div>
    </div>

</template>
<script>
export default {
    name: 'game-issue',
    template: '#game-issue',
    components: {
    },
    computed: {
        currentLottery: function () {

            return this.$store.state.currentLottery;
        },
        issueHistory: function () {
            return this.$store.state.issueHistory;
        }
    },
    data() {
        return {
            loading: false,
        };
    },

    created () {
    },

    destroyed: function () {
    },

    watch: {

    },
    methods: {
        // 刷新历史
        issueGetHistory() {
            this.Api.getIssueHistory(this.lotterySign).then(data => {
                if (data.isSuccess) {
                    this.issueHistory = data.data;
                }
            });


        }
    }
};
</script>

<style>

</style>