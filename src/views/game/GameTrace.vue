<template id="gameMain">
    <div id='game-body'>
        <div class="main-center-con">
            <div class="main-lottery-top-msg">
                <div class="main-deadline">
                    <div v-if="lottery.fast_open">
                        <h5>第
                            <strong id="current_no" v-if="issueInfo[0]['issues']">{{issueInfo[0]['issue_no']}}</strong>
                            <strong id="current_no" v-else></strong>
                            期剩余投注时间</h5>
                        <div class="main-deadline-time" id="current_remainTime">00:00</div>
                        <div class="main-deadline-txt">{{lottery.desc}}</div>
                    </div>
                    <div v-else>
                        <div class="main-deadline-time">{{lottery.cn_name}}</div>
                    </div>

                </div>
                <div v-bind:class="[lottery.series_id == 'pk10' ? 'main-lottery-num-pk' : 'main-lottery-num']">
                    <h5>
                        <span>{{lottery.cn_name}}</span>
                        <i>
                            第 <i id="before_no" v-if="issueInfo['0']">{{issueInfo['0']['issue_no']}} </i> 期
                            <span id="before_desc"></span>
                        </i>
                    </h5>
                    <ul id="before_opencode" v-if="lottery.series_id == 'kl3'">
                        <li class="open-num"></li>
                        <li class="open-num"></li>
                        <li class="open-num"></li>
                    </ul>
                    <ul id="before_opencode" v-else-if="lottery.series == 'pk10'">
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

                <div v-bind:class="[ lottery.pattern == 'pk10' ? 'main-lottery-list-pk' : 'main-lottery-list' ]">
                    <h5>最新开奖<i class="ico ico-new">new</i>  <a v-bind:href="lottery.trend" target="_blank">走势图</a></h5>
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
            <div class="bet-type-box">
                <div class="bet-type-crow">
                    <ul id="crowd-menu">
                        <li v-for="(_group, _index) in methodConfig" :key="_index"  @click="selectGroup(_group.sign, _index)" v-bind:class="{'on':_group.sign == selectedGroup}">
                            <a href="javascript:;">
                                <span class="bet-type-crow-name">{{_group.name}}</span>
                                <span class="bet-type-group-name"></span>
                            </a>
                        </li>
                    </ul>
                    <div v-if="lottery.hasrx" class="bet-type-optional" id="rx"><span></span></div>
                </div>
                <div id="crowd-menu2" v-if="selectedGroup" >
                    <div  class="bet-type-group" v-if="selectedGroup">
                        <div class="bet-type-group-list"  v-for="(row, _rowIndex) in methodConfig[selectedGroupIndex]['rows']" :key="_rowIndex">
                            <div class="group-name">{{row.name}}</div>
                            <ul>
                                <li v-for="(method, mkey) in row.methods" :key="mkey" v-bind:class="{'on':method.method_id == selectedMethodId}" @click="selectMethod(method.method_id)">
                                    <a href="javascript:;" class="btn-red"> {{method.method_name}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <game-select v-bind:lottery="lottery"></game-select>
        </div>
    </div>
</template>
<script>

    import {API} from "../../API";
    import methods from "../../lib//config/method"
    import GameSelect from "./GameSelect";

    export default {
        name: 'gameBet',
        template: '#game-bet',
        components: {
            GameSelect
        },
        props: {
            'lotterySign': String,
        },
        data() {
            return {
                loading: false,
                defaultGroup:"",
                defaultMethod:"",
                lottery: {},
                methodConfig: {},
                issueInfo: {},
                selectedGroup: '',
                selectedGroupIndex: '',
                selectedMethodId: '',
                currentMethod: {},

                // 定时器
                issueHistoryTimer: null,
                // 奖期相关
                issueCurrent:{},
                issueBefore:{},
                issueNext:{},
                issueHistory:{}
            };
        },

        created () {
            clearInterval(this.issueHistoryTimer);
            this.issueHistoryTimer = null;

            this.getLotteryInfo();
        },

        destroyed: function () {
            clearInterval(this.issueHistoryTimer);
            this.issueHistoryTimer = null;
        },

        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'getLotteryInfo'
        },

        methods: {
            getLotteryInfo() {
                this.loading = true;
                API.getLotteryInfo(this.lotterySign).then(data => {
                    this.loading = false;
                    this.issueInfo      = data.issueInfo;
                    this.issueHistory   = data.issueHistory;
                    this.lottery        = data.lottery;
                    this.methodConfig   = data.methods;
                    this.defaultGroup   = data.defaultGroup;
                    this.defaultMethod  = data.defaultMethod;

                    this.selectGroup(this.defaultGroup, 0);
                    this.selectMethod(this.defaultMethod);
                });
            },

            // 选中玩法组
            selectGroup(groupSign, _index) {
                this.selectedGroup      = groupSign;
                this.selectedGroupIndex = _index;
                this.selectedMethodId = "";
                this.$store.state.currentMethod = {};
                this.selectMethod(this.methodConfig[_index]['rows'][0]['methods'][0]['method_id']);
            },

            // 选中玩法
            selectMethod(methodId) {
                this.$store.state.currentMethod = methods[this.lottery.series_id][methodId];
                this.selectedMethodId = methodId;
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