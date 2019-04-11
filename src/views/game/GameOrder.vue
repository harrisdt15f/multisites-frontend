<template id="game-order">
    <div class="main-bottom">
        <div class="main-bottom-con"  id="project">
            <div class="tabs-box-menu m-B">
                <div class="tabs-r-txt" id="project-bar">
                    <p>当前总共<strong class="txt-red" id="project-num">{{currentOrderState.count}}</strong>注，
                        我要翻 <input type="text" class="ipt ipt-muliple" id="project-times" v-model="currentOrderState.times">
                        倍，总金额<strong class="txt-red" id="project-cost"> {{totalCost}} </strong>元。</p>
                </div>
                <ul class="tabs-ul">
                    <li v-bind:class="{'on' : orderTab == 'order'}" @click="chooseTab('order')"><a href="javascript:;" id="project-current">当前投注</a></li>
                    <li v-bind:class="{'on' : orderTab == 'history'}"  @click="chooseTab('history')"><a href="javascript:;" id="project-history">投注历史</a></li>
                </ul>
            </div>

            <div class="bet-count-confirm" id="project-project" v-if="orderTab == 'order'">
                <div class="bet-msg-pick-bd">
                    <div class="bet-pick-box">
                        <a href="javascript:;" class="txt-clean" id="project-empty">清空选号</a>
                        <div class="iptbox bet-pick-ipt-box">
                            <table width="100%">
                                <thead>
                                <tr>
                                    <th><i>玩法</i></th>
                                    <th><i>号码</i></th>
                                    <th><i>注数</i></th>
                                    <th><i>倍数</i></th>
                                    <th><i>模式</i></th>
                                    <th><i>总额(元)</i></th>
                                    <th><i>操作</i></th>
                                </tr>
                                </thead>

                                <tbody id="project-data">
                                <tr v-for="(order, _orderIndex) in orderList" :key="_orderIndex">
                                    <td><i>{{order.method_name}}</i></td>
                                    <td><i>{{order.codes}}</i></td>
                                    <td><i>{{order.count}}</i></td>
                                    <td><i>{{order.times}}</i></td>
                                    <td><i>{{order.mode}}</i></td>
                                    <td><i>{{order.cost}}</i></td>
                                    <td width="5"><i><a href="javascript:;" class="del">删除</a></i></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div class="">
                    <div class="bet-future-set" v-if="!currentLottery.fast_open">
                        <a href="javascript:;" class="btn bet-future-num" id="trace-open">我&nbsp;&nbsp;要&nbsp;&nbsp;追&nbsp;&nbsp;号</a>
                        <p>&nbsp;</p>
                        <p class="bet-future-select-box">
                            <select class="ipt bet-future-select" id="issues">
                            </select>
                        </p>
                    </div>
                </div>
                <div class="main-btn-confirm-box">
                    <a href="javascript:;" class="btn main-btn-confirm" id="project-submit"><span class="ico-confirm"></span><span>确认投注</span></a>
                </div>
            </div>

            <div class="bet-count-confirm"  id="project-order" v-if="orderTab == 'history'">
                <div class="bet-pick-his-box">
                    <div class="iptbox bet-history-box">
                        <table width="100%">
                            <thead>
                            <tr>
                                <th><i>编号</i></th>
                                <th><i>奖期</i></th>
                                <th><i>时间</i></th>
                                <th><i>玩法</i></th>
                                <th><i>号码</i></th>
                                <th><i>总额(元)</i></th>
                                <th><i>奖金</i></th>
                                <th><i>模式</i></th>
                                <th><i>倍数</i></th>
                                <th><i>状态</i></th>
                            </tr>
                            </thead>
                            <tbody style="cursor: pointer;" id="order-data">
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>

        <div id="trace" class="main-bottom-con" style="display:none">
            <div class="bet-count-confirm">
                <div class="tabs-box pop-tabs-box">
                    <div class="cancel-future">
                        <label><input type="checkbox" id="trace-stop">中奖后停止追号</label>
                        <label class="tooltipped" data-tooltip="若为选中状态，则在出现官方未开、跳开或其他异常情况时，系统自动停止追号计划."><input type="checkbox" id="trace-except">异常后停止追号</label>
                    </div>
                    <div class="tabs-box-menu">
                        <ul class="tabs-ul">
                            <li><a href="javascript:;" id="trace-type0">同倍追号</a></li>
                            <li><a href="javascript:;" id="trace-type1">翻倍追号</a></li>
                            <li><a href="javascript:;" id="trace-type2">利润率追号</a></li>
                        </ul></div>
                    <div class="tabs-detail">
                        <div class="form-row-1 pop-row-1">
                            <div class="form-column-1">
                                <span class="form-column-2">连续追：</span>
                                <div class="btn-tab-list form-column-2">
                                    <a href="javascript:;" class="btn-tab btn-red trace-scount" v="5">5</a>
                                    <a href="javascript:;" class="btn-tab btn-red trace-scount" v="10">10</a>
                                    <a href="javascript:;" class="btn-tab btn-red trace-scount" v="15">15</a>
                                    <a href="javascript:;" class="btn-tab btn-red trace-scount" v="20">20</a>
                                </div>
                                <span class="form-column-2 m-L"><input type="text" value="1" class="ipt ipt30" id="trace-count"></span>
                                <span class="form-column-2">期</span>
                                <span class="form-column-2">起始倍数：</span>
                                <span class="form-column-2 m-L"><input type="text" class="ipt ipt30" id="trace-first"> 倍</span>
                            </div>

                            <div class="form-column-1">
                                <span class="form-column-2 m-L" style="display:none">每隔<input type="text" value="1" class="ipt ipt30" id="trace-range"> 期</span>
                                <span class="form-column-2 m-L" style="display:none">倍X <input type="text" value="2" class="ipt ipt30"  id="trace-duplicate"></span>
                                <span class="form-column-2 m-L" style="display:none">最低收益率：<input type="text" value="50" class="ipt ipt30" id="trace-profit">%</span>
                            </div>

                            <div class="form-column-1">
                                <a href="javascript:;" class="btn btn-green" id="trace-gen">生成追号</a>
                            </div>
                        </div>
                        <div class="form-row-1">
                            <div class="form-column-1">
                                <p class="pop-confirm-txt">
                                    共追号<strong class="txt-red" id="trace-total-count"></strong> 期，
                                    共<strong class="txt-red" id="trace-total-num">10</strong>个投注项，
                                    追号总金额<strong class="txt-red" id="trace-total-cost"> 20.00</strong> 元
                                </p>
                            </div>
                            <div class="form-column-3">
                                <a href="javascript:;" class="btn main-btn-cancel" id="trace-close"><span>正常投注</span></a>
                                <a href="javascript:;" class="btn main-btn-confirm" id="trace-submit"><span class="ico-confirm"></span><span>追号投注</span></a>
                            </div>
                        </div>
                        <div class="pop-row-2">
                            <div class="table-box">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table-body">
                                    <tr>
                                        <td class="table-th" >序号</td>

                                        <td class="table-th">追号期号</td>

                                        <td class="table-th">倍数</td>

                                        <td class="table-th">金额（元）</td>

                                        <td class="table-th">预计开奖时间</td>
                                    </tr>
                                    <tbody id="trace-data">

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'game-order',
        template: '#game-order',
        computed: {
            orderList: function () {
                return this.$store.state.orderList;
            },
            currentOrderState: function () {
                return this.$store.state.currentOrderState;
            },
            totalCost: function () {
                return this.$store.state.totalCost;
            },
            currentLottery: function () {
                return this.$store.state.currentLottery;
            },
        },
        data() {
            return {
                orderTab:'order',
            };
        },

        created () {

        },

        destroyed: function () {

        },

        watch: {
        },

        methods: {
            chooseTab(tab) {
                this.orderTab = tab;
            }
        }
    };
</script>

<style>

</style>