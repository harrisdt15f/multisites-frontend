<template id="game-order">
    <div class="main-bottom">
        <div class="main-bottom-con" id="project">
            <div class="tabs-box-menu m-B">
                <div class="tabs-r-txt" id="project-bar">
                    <p>当前总共<strong class="txt-red" id="project-num">{{totals.number}}</strong>注，
                        我要翻 <input type="text" placeholder="1" class="ipt ipt-muliple" id="project-times" v-model="totalSub.double"/>
                        倍，总金额<strong class="txt-red" id="project-cost"> {{totalSub.double > 1 ? totalSub.money : totals.money}} </strong>元。</p>
                </div>
                <ul class="tabs-ul">
                    <li><a href="javascript:;" id="project-current">当前投注</a></li>
                </ul>
            </div>

            <div class="bet-count-confirm" id="project-project">
                <div class="bet-msg-pick-bd">
                    <div class="bet-pick-box">
                        <a href="javascript:;" class="txt-clean" id="project-empty" @click="clearOrderList()">清空选号</a>
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
                                    <td width="5"><i><a href="javascript:;" class="del" @click="deleteOrderList(order, _orderIndex)">删除</a></i></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div>
                    <div class="bet-future-set" v-if="!currentLottery.fast_open">
                        <a href="javascript:;" class="btn bet-future-num" id="trace-open">我&nbsp;&nbsp;要&nbsp;&nbsp;追&nbsp;&nbsp;号</a>
<!--                        <p>&nbsp;</p>-->
<!--                        <p class="bet-future-select-box">-->
<!--                            <select class="ipt bet-future-select" id="issues">-->
<!--                            </select>-->
<!--                        </p>-->
                    </div>
                </div>
                <div class="main-btn-confirm-box">
                    <a href="javascript:;" class="btn main-btn-confirm" id="project-submit" @click="submitBet()"><span class="ico-confirm"></span><span>确认投注</span></a>
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
        <div class="list-full-history" id="J-list-history-panel">
            <div class="title clearfix">
                <ul>
                    <li class="current">我的投注</li>
                    <li class="">我的追号</li>
                    <iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></ul>
            </div>
            <div class="content panel-current">
                <table width="100%">
                    <thead>
                    <tr>
                        <th>
                            <div class="th-line">游戏</div>
                        </th>
                        <th>
                            <div class="th-line">玩法</div>
                        </th>
                        <th>
                            <div class="th-line">期号</div>
                        </th>
                        <th width="150">
                            <div class="th-line">开奖号</div>
                        </th>
                        <th>
                            <div class="th-line">投注内容</div>
                        </th>
                        <th>
                            <div class="th-line">投注金额</div>
                        </th>
                        <th width="120">
                            <div class="th-line">奖金</div>
                        </th>
                        <th>
                            <div class="th-line">奖金组-返点</div>
                        </th>
                        <th>
                            <div class="th-line">状态</div>
                        </th>
                        <th>
                            <div class="th-line">操作</div>
                        </th>
                    </tr>

                    </thead>
                    <tbody id="J-tbody-historys-bets">
                    <tr class="row-data-49383596 row-status-2">
                        <td><span class="cls-gamename">重庆时时彩</span></td>
                        <td><span class="cls-method">五星直选单式</span></td>
                        <td><span class="cls-number">190415040</span></td>
                        <td><span class="cls-prizeballs">35443</span></td>
                        <td><span class="cls-balls">11111|2222...</span></td>
                        <td><span class="cls-money">0.10</span></td>
                        <td><span class="cls-prize">0.00</span></td>
                        <td><span class="cls-commission">1800-0.00%</span></td>
                        <td><span class="cls-status">未中奖</span></td>
                        <td><a target="_blank" href="javascript:;">详情</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="content" style="display:none">
                <table width="100%">
                    <thead>
                    <tr>
                        <th><div class="th-line">游戏</div></th>
                        <th><div class="th-line">玩法</div></th>
                        <th><div class="th-line">起始奖期</div></th>
                        <th><div class="th-line">追号进度</div></th>
                        <th><div class="th-line">总追号金额</div></th>
                        <th><div class="th-line">已中奖金额</div></th>
                        <th>
                            <div class="th-line">追中即停</div>
                        </th>
                        <th>
                            <div class="th-line">状态</div>
                        </th>
                        <th>
                            <div class="th-line">操作</div>
                        </th>
                    </tr>

                    </thead>
                    <tbody id="J-tbody-historys-traces">
                        <tr class="row-data-369489">
                            <td><span class="cls-gamename">重庆时时彩</span></td>
                            <td><span class="cls-method">后二大小单双</span></td>
                            <td><span class="cls-startnumber">190108088</span></td>
                            <td><span class="cls-progress">2/10</span></td>
                            <td><span class="cls-amount">0.20</span></td>
                            <td><span class="cls-balls">0.07</span></td>
                            <td><span class="cls-iswinstop">是</span></td>
                            <td><span class="cls-status">系统终止</span></td>
                            <td><a target="_blank" href="https://chunqiucp5.com/traces/view/369489">详情</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row-more">
                <a href="javascript:;" target="_blank">更多游戏记录...</a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'game-order',
    data() {
        return {
            total: {
                number: 0,
                money: 0
            },
            totalSub: {
                number: 0,
                double: 1,
                money: 0
            },
            orderListSub: []
        }
    },
    computed: {
        ...mapState([
            'orderList',
            'currentOrderState',
            'totalCost',
            'currentLottery',
            'bet'
        ]),
        // 翻倍
        totals () {
            this.total = {
                number: 0,
                money: 0
            }
            for (let i = 0; i < this.orderList.length; i++) {
                this.total.number += this.orderList[i].count
                this.total.money += this.orderList[i].cost
            }
            this.totalSub.money = parseInt(this.totalSub.double) * Number(this.total.money)
            return this.total
        }
    },
    watch: {
        'totalSub.double': {
            handler () {
                // 计算翻倍后的金额
                this.totalSub.money = parseInt(this.totalSub.double) * Number(this.total.money)
            },
            deep: true
        }
    },
    created () {
    },
    methods: {
        submitBet () {
            let issus = {
                20180405001: true
            }
            // 计算翻倍后的 金额 和倍数
            let [list = JSON.parse(this.bet.doubleBeforeOrder), money = null] = []
            if (list.length === 0) {
                return false
            }
            for (let i = 0; i < list.length; i++) {
                list[i].cost = Number(list[i].cost) * Number(this.totalSub.double)
                list[i].count = Number(list[i].count) * Number(this.totalSub.double)
            }
            money = this.totalSub.double > 1 ? this.totalSub.money : this.totals.money
            this.Api.bet(this.currentLottery.en_name, issus, list, money).then((res) => {
                console.log(res)
            })
        },
        // 删除当前投注
        deleteOrderList (item, index) {
            this.orderList.splice(index, 1)
            this.bet.doubleBeforeOrder = JSON.stringify(this.orderList)
            this.totalSub.money -= Number(item.cost) * Number(this.totalSub.double)
            if (this.orderList.length === 0) {
                this.total ={
                    number: 0,
                    money: 0
                }
                this.totalSub = {
                    number: 0,
                    double: 1,
                    money: 0
                }
            }
        },
        // 清空当前投注
        clearOrderList () {
            this.$store.commit('orderList', [])
            this.bet.doubleBeforeOrder = JSON.stringify([])
            this.total ={
                number: 0,
                money: 0
            }
            this.totalSub = {
                number: 0,
                double: 1,
                money: 0
            }
        }
    }
}
</script>

<style>

</style>