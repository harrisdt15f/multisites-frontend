<template>
    <section v-if="mainShow">
    
<!--开奖区-->
        <game-issue></game-issue>
        
        
        <section class="w dn" style="padding-top:25px;">
            <section class="main-center">
                <game-method></game-method>
                <game-select></game-select>
                <game-order></game-order>
            </section>
            <section class="main-right">
                <section class="list-historys">
                    <section class="record">历史开奖记录</section>
                    <table width="100%" class="bet-table-trend">
                        <thead>
                        <tr>
                            <th class="th">奖期</th>
                            <th class="th">开奖</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :class="{first: index === bet.issueHistory.length - 1}" v-for="(item, index) in bet.issueHistory" :key="index">
                            <td class="td">{{item.issue_no}} 期</td>
                            <td class="td balls">
                                <i
                                    class="i"
                                    :class="{curr: numIndex < item.code.split(',').length - 2}"
                                    v-for="(num, numIndex) in item.code.split(',')"
                                    :key="numIndex"
                                >{{num}}</i>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <section class="cur more">查看完整走势</section>
                </section>
            </section>
        </section>
        
        
        <GameYlc></GameYlc>
    </section>
</template>
<script>
import GameSelect from './GameSelect'
import GameIssue from './GameIssue'
import GameOrder from './GameOrder'
import GameMethod from './GameMethod'
import GameYlc from '../../components/game/ylc'
import { mapState } from 'vuex'
export default {
    name: 'game-main',
    components: {
        GameMethod,
        GameOrder,
        GameIssue,
        GameSelect,
        GameYlc
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
            'lotteryAll',
            'bet'
        ])
    },
    watch: {
        'currentLottery' () {
            this.$store.dispatch('issueHistory')
            this.getLotteryInfo()
            this.mainShow = true
        },
        'lotteryAll' (newVal) {
            // 页面刷新重新获取
            let sign  = this.$route.params.lotterySign
            this.$store.commit('currentLottery', newVal[sign].lottery)
            console.log(this.currentLottery)
        }
    },
    created () {
        // 页面刷新时不执行
        if (Object.keys(this.lotteryAll).length !== 0) {
            this.$store.dispatch('issueHistory')
            this.getLotteryInfo()
            this.mainShow = true
        }
    },
    methods: {
        getLotteryInfo() {
            let lottery = this.lotteryAll[this.currentLottery.en_name]
            this.$store.commit('defaultGroup', lottery.defaultGroup)
            this.$store.commit('defaultMethod', lottery.defaultMethod)
            this.$store.commit('allMethods', lottery.methodConfig)
        }
    }
}
</script>

<style scoped>
    @import "../../assets/css/game.css";
</style>