<template>
    <section>
        <section class="game-header w fw">
            <section class="game-header-l">
                <div class="game-header-w">
                    <div class="game-header-s">
                        <div class="logo-lottery">
                            <div class="text">重庆时时彩</div>
                            <iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></div>
                        <div class="win-issue">
                            <div class="win-issue-s" id="betsvoice"><span class="open"></span></div>
                            <div class="text">第 <span id="J-header-currentNumber">190416041</span> 期</div>
                        </div>
                        <div class="deadline">
                            <div class="deadline-text">投注截止：</div>
                        </div>
                    </div>
                    <div class="game-lottery">
                        <div class="lottery-text">
                            <span class="prev-win">上期开奖号码</span>
                            <span class="prev-date">第<span class="num" id="J-header-newnum">190416035</span>期</span>
                            <span class="official-win" lottery-id="1" style="visibility: visible;">官方开奖</span>
                        </div>
                        <input type="hidden" value="0,4,5,1,2" id="J-input-hidden-lastballs">
                        <div class="lottery-number-w">
                            <div id="J-lottery-balls-lasttime" class="lottery-number"><em class="">0</em><em class="">4</em><em class="">5</em><em class="">1</em><em class="">2</em></div>
                        </div>
                        <div class="lottery-tip">提示：当天 <span class="col">00</span> 点至 <span class="col">23</span> 点 &nbsp; 当日共有
                            <span class="col">59</span> 期
                        </div>
                    </div>
                    <div class="trend-info">
                        <a href="https://chunqiucp5.com/user-trends/trend-view/1" target="_blank" class="trend"><span>开奖趋势</span></a>
                        <a class="trend info" target="_blank" href="/help/6#50"><span>开奖说明</span></a>
                    </div>
                </div>
                <div class="game-header-inform">
                    <a href="javascript:void(0)" class="a">尊敬的玩家：您好应广大玩家强烈要求，平台隆重推出《腾讯5分彩》以及《腾讯时时彩》，开奖号码完全依据官方春秋娱乐平台运营部</a>
                </div>
            </section>
            <section class="game-header-r j-hide">
                <div class="game-header-r-t clearfix">
                    <span class="span">彩种公告</span>
                    <a href="javascript:void(0)" class="a">更多&gt;&gt;</a>
                </div>
                <ul class="game-header-r-c">
                    <li data-id="412">
                        <span class="dot"></span>
                        <a href="javascript:void(0)" class="a">【春秋娱乐】腾讯新彩种火爆上线</a>
                        <span class="date">2019-04-12</span>
                    </li>
                    <li data-id="408">
                        <span class="dot"></span>
                        <a href="javascript:void(0)" class="a">【春秋娱乐】重庆时时彩更名通知</a>
                        <span class="date">2019-03-29</span>
                    </li>
                    <li data-id="378">
                        <span class="dot"></span>
                        <a href="javascript:void(0)" class="a">【春秋娱乐】请广大玩家警惕不法网站</a>
                        <span class="date">2018-12-03</span>
                    </li>
                    <li data-id="359">
                        <span class="dot"></span>
                        <a href="javascript:void(0)" class="a">【春秋彩票】时时彩龙虎和玩法奖金限额调整</a>
                        <span class="date">2018-10-20</span>
                    </li>
                    <li data-id="342">
                        <span class="dot"></span>
                        <a href="javascript:void(0)" class="a">【春秋娱乐】经营理念</a>
                        <span class="date">2018-08-02</span>
                   </li>
                </ul>
            </section>
        </section>
<!--        <div class="main-deadline">-->
<!--            <div v-if="currentLottery.fast_open">-->
<!--                <h5>第-->
<!--                    <strong id="current_no" v-if="issueInfo[0] && issueInfo[0]['issues']">{{issueInfo[0]['issue_no']}}</strong>-->
<!--                    <strong id="current_no" v-else></strong>-->
<!--                    期剩余投注时间</h5>-->
<!--                <div class="main-deadline-time" id="current_remainTime">00:00</div>-->
<!--                <div class="main-deadline-txt">{{currentLottery.desc}}</div>-->
<!--            </div>-->
<!--            <div v-else>-->
<!--                <div class="main-deadline-time">{{currentLottery.cn_name}}</div>-->
<!--            </div>-->

<!--        </div>-->
<!--        <div v-bind:class="[currentLottery.series_id == 'pk10' ? 'main-lottery-num-pk' : 'main-lottery-num']">-->
<!--            <h5>-->
<!--                <span>{{currentLottery.cn_name}}</span>-->
<!--                <i>-->
<!--                    第 <i id="before_no" v-if="this.$store.state.currentIssue">{{this.$store.state.currentIssue['issue_no']}} </i> 期-->
<!--                    <span id="before_desc"></span>-->
<!--                </i>-->
<!--            </h5>-->
<!--            <ul id="before_opencode" v-if="currentLottery.series_id == 'kl3'">-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--            </ul>-->
<!--            <ul id="before_opencode" v-else-if="currentLottery.series == 'pk10'">-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--            </ul>-->
<!--            <ul id="before_opencode" v-else>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--                <li class="open-num"></li>-->
<!--            </ul>-->
<!--        </div>-->

<!--        <div v-bind:class="[ currentLottery.pattern == 'pk10' ? 'main-lottery-list-pk' : 'main-lottery-list' ]">-->
<!--            <h5>最新开奖<i class="ico ico-new">new</i>  <a v-bind:href="currentLottery.trend" target="_blank">走势图</a></h5>-->
<!--            <ul id="open-list">-->
<!--                <li v-for="(issue, _issueKey) in issueHistory" :key="_issueKey">-->
<!--                    <span class="main-lottery-issue">{{issue.issue_no}}</span>-->
<!--                    <span class="main-lottery-issueNum">-->
<!--                        {{issue.code}}-->
<!--                    </span>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->
    </section>

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

<style scoped>

</style>