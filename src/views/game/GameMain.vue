<template>
    <section v-if="mainShow">
        <game-issue></game-issue>
        <section class="w" style="padding-top:25px;">
            <section style="width:890px;float:left;">
<!--                <game-method></game-method>-->
<!--                <game-select></game-select>-->
<!--                <game-order></game-order>-->
            </section>
            <div class="main-right j-hide">
                <div class="list-historys" id="J-list-historys">
                    <div class="record">历史开奖记录</div>
                    <div class="cont" id="J-minitrend-cont">
                        <table width="100%" class="bet-table-trend" id="J-minitrend-trendtable-68" style="display: table;">
                            <thead>
                            <tr>
                                <th><span class="number">奖期</span></th>
                                <th><span class="balls">开奖</span></th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr :class="{first: index === historyIssueList.length - 1}" v-for="(item, index) in historyIssueList" :key="index">
                                    <td><span class="number">{{item.issue_no}} 期</span></td>
                                    <td>
                                        <span class="balls">
                                            <i class="curr" v-for="(num, numIndex) in item.code.split(',')" :key="numIndex">{{num}}</i>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="more">查看完整走势</div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
import GameSelect from './GameSelect'
import GameIssue from './GameIssue'
import GameOrder from './GameOrder'
import GameMethod from './GameMethod'
import { mapState } from 'vuex'
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
            mainShow: false,
            historyIssueList: []
        }
    },
    computed: {
        ...mapState([
            'currentLottery',
            'lotteryAll'
        ])
    },
    watch: {
        'lotteryAll' (newVal) {
            // 页面刷新重新获取
            let sign  = this.$route.params.lotterySign
            this.$store.commit('currentLottery', newVal[sign].lottery)
            this.issueGetHistory()
            this.getLotteryInfo()
            this.mainShow = true
        }
    },
    created () {
        // 页面刷新时不执行
        if (Object.keys(this.lotteryAll).length !== 0) {
            this.issueGetHistory()
            this.getLotteryInfo()
            this.mainShow = true
        }
    },
    mounted () {
    },
    methods: {
        getLotteryInfo() {
            let lottery = this.lotteryAll[this.currentLottery.en_name]
            this.$store.commit('defaultGroup', lottery.defaultGroup)
            this.$store.commit('defaultMethod', lottery.defaultMethod)
            this.$store.commit('allMethods', lottery.methodConfig)
        },
        // 历史奖期
        issueGetHistory () {
            this.Api.getIssueHistory(this.currentLottery.en_name).then(data => {
                if (data.isSuccess) {
                    this.historyIssueList = data.data
                }
            });
        }
    }
};
</script>

<style>
    @import "../../assets/css/index.css";
    @import "../../assets/css/shared.css";
    @import "../../assets/css/base.css";
    @import "../../assets/css/game.css";
    @import '../../assets/css/game-v2.css';
</style>