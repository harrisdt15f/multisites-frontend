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
<!--                        <a href="javascript:;" class="txt-clean" id="project-empty" @click="clearOrderList()">清空选号</a>-->
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
                    <section class="tc chase">
                        <section class="pr chase-title">追号设置 <el-button size="mini" class="chase-clear">清楚追号计划并关闭窗口</el-button></section>
                        <ul class="fw chase-tabs">
<!--                            <li class="chase-tab" :class="{active: chaseTab === 0}" @click="chaseTabHan(0)">利润</li>-->
                            <li class="chase-tab" :class="{active: chaseTab === 1}"  @click="chaseTabHan(1)">同倍</li>
                            <li class="chase-tab" :class="{active: chaseTab === 2}"  @click="chaseTabHan(2)">翻倍</li>
                        </ul>
                        <ul class="fw tab-cons">
<!--                            <li class="tab-con" v-if="chaseTab === 0">-->
<!--                                <section class="tab-inputs">-->
<!--                                    最低收益率:<input type="text" v-model="chase.rateNum" :placeholder="chase.rateNum" class="tab-input">%  追号期数<input type="text" v-model="chase.rateIssue" :placeholder="chase.rateIssue" class="tab-input">-->
<!--                                </section>-->
<!--                                <el-button size="small" @click="chaseRateSubmit()">生成追号计划</el-button>-->
<!--                            </li>-->
                            <li class="tab-con" v-if="chaseTab === 1">
                                <section class="tab-inputs">
                                    起始倍数:<input type="text" v-model="chase.sameNum" :placeholder="chase.sameNum" class="tab-input">倍 追号期数<input type="text" v-model="chase.sameIssue" :placeholder="chase.sameIssue" class="tab-input">
                                </section>
                                <el-button size="small" @click="chaseSameSubmit()">生成追号计划</el-button>
                            </li>
                            <li class="tab-con" v-if="chaseTab === 2">
                                <section class="tab-inputs">
                                    起始倍数:<input type="text" v-model="chase.doubleNum" :placeholder="chase.doubleNum" class="tab-input">隔
                                    <input type="text" v-model="chase.doubleG" :placeholder="chase.doubleG" class="tab-input">期 倍x<input type="text" v-model="chase.doubleB" :placeholder="chase.doubleB" class="tab-input"> 期数:<input type="text" v-model="chase.doubleIssue" :placeholder="chase.doubleIssue" class="tab-input">
                                </section>
                                <el-button size="small" @click="chaseDoubleSubmit()">生成追号计划</el-button>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
            <div class="chase-table-container" v-if="chaseTab === 0">
                <table class="chase-table">
                    <tbody data-type="lirunlv">
                    <tr>
                        <th class="text-center">序号</th>
                        <th><input data-action="checkedAll" type="checkbox" checked="checked"> 追号期次</th>
                        <th>倍数</th>
                        <th>金额</th>
                        <th>奖金</th>
                        <th>盈利金额</th>
                        <th>盈利率</th>
                    </tr>
                        <tr v-for="(item, index) in chase.rateData" :key="index">
                            <td class="text-center">{{index + 1}}</td>
                            <td>
                                <input data-action="checkedRow" class="trace-row-checked" type="checkbox" checked="checked">
                                <span class="trace-row-number">
                                    {{item.issue_no}}
                                    <span class="icon-period-current"></span>
                                </span>
                            </td>
                            <td>
                                <input class="trace-row-multiple" value="1" type="text" style="width:30px;text-align:center;">
                            </td>
                            <td>
                                <span class="trace-row-money">2.00</span>
                            </td>
                            <td>
                                <span class="trace-row-userGroupMoney">1,800.00</span>
                            </td>
                            <td>
                                <span class="trace-row-winTotalAmount">1,798.00</span>
                            </td>
                            <td>
                                <span class="trace-row-yinglilv">89900.00</span>%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="chase-table-container" v-if="chaseTab === 1">
                <table class="chase-table">
                    <tbody data-type="lirunlv">
                    <tr>
                        <th class="text-center">序号</th>
                        <th><input @click="sameCheckedAll()" v-model="chase.sameChecked" type="checkbox"> 追号期次</th>
                        <th>倍数</th>
                        <th>金额</th>
                        <th>预计开奖时间</th>
                    </tr>
                        <tr v-for="(item, index) in chase.sameData" :key="index">
                            <td class="text-center">{{index + 1}}</td>
                            <td>
                                <input data-action="checkedRow" v-model="item.checked" class="trace-row-checked" type="checkbox" checked="checked">
                                <span class="trace-row-number">
                                    {{item.issue_no}}
                                    <span class="icon-period-current"></span>
                                </span>
                            </td>
                            <td>
                                <input class="trace-row-multiple" v-model="item.multiple" value="1" type="text" style="width:30px;text-align:center;">
                            </td>
                            <td>
                                <span class="trace-row-money">{{chase.sameMoney * item.multiple}}</span>
                            </td>
                            <td>
                                <span class="trace-row-userGroupMoney">{{item.time}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="chase-table-container" v-if="chaseTab === 2">
                <table class="chase-table">
                    <tbody data-type="lirunlv">
                    <tr>
                        <th class="text-center">序号</th>
                        <th><input @click="sameCheckedAll()" v-model="chase.doubleChecked" type="checkbox"> 追号期次</th>
                        <th>倍数</th>
                        <th>金额</th>
                        <th>预计开奖时间</th>
                    </tr>
                        <tr v-for="(item, index) in chase.doubleData" :key="index">
                            <td class="text-center">{{index + 1}}</td>
                            <td>
                                <input data-action="checkedRow" v-model="item.checked" class="trace-row-checked" type="checkbox" checked="checked">
                                <span class="trace-row-number">
                                    {{item.issue_no}}
                                    <span class="icon-period-current"></span>
                                </span>
                            </td>
                            <td>
                                <input class="trace-row-multiple" v-model="item.multiple" value="1" type="text" style="width:30px;text-align:center;">
                            </td>
                            <td>
                                <span class="trace-row-money">{{chase.doubleMoney * item.multiple}}</span>
                            </td>
                            <td>
                                <span class="trace-row-userGroupMoney">{{item.time}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="bet-future-set">
<!--                总金额 {{chase.sameMoneyAll}}-->
                总金额 {{chase.doubleMoneyAll}}
<!--                <a href="javascript:;" class="btn bet-future-num" id="trace-open">我&nbsp;&nbsp;要&nbsp;&nbsp;追&nbsp;&nbsp;号</a>-->
                <a href="javascript:;" class="btn main-btn-confirm" id="project-submit" @click="submitBet()">
                    <span class="ico-confirm"></span><span>确认投注</span>
                </a>
            </div>
        </div>
        <div class="list-full-history">
            <div class="title clearfix">
                <ul>
                    <li class="current">我的投注</li>
                    <li class="">我的追号</li>
                </ul>
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

            <div class="row-more">
                <a href="javascript:;" target="_blank">更多游戏记录...</a>
            </div>
        </div>
<!--        <msg></msg>-->
    </div>
</template>
<script>
import { mapState } from 'vuex'
import msg from '../../components/message'
export default {
    name: 'game-order',
    components: {
        msg
    },
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
            orderListSub: [],
            chaseTab: 1,
            tableData: [],
            chase: {
                maxIssue: 0,
                rateData: [],
                rateNum: 50,
                rateIssue: 10,
                sameData: [],
                sameChecked: true,
                sameMoneyAll: 0,
                sameMoney: 0,
                sameNum: 1,
                sameIssue: 10,
                doubleData: [],
                doubleChecked: true,
                doubleMoneyAll: 0,
                doubleMoney: 0,
                doubleNum: 1,
                doubleIssue: 10,
                doubleG: 1,
                doubleB: 2
            }
        }
    },
    computed: {
        ...mapState([
            'lotteryAll',
            'orderList',
            'currentOrderState',
            'totalCost',
            'currentLottery',
            'bet',
            'currentIssue',
            'issueInfo'
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
        'chase.doubleData': {
            handler (newVal) {
                // 检查同倍追号所有多选框是否选中
                let checked = newVal.every((item) => {
                    return item.checked
                })
                this.chase.doubleChecked = !!checked
                for (let i = 0; i < newVal.length; i++) {
                    if (Number(newVal[i].multiple) <= 0) {
                        newVal[i].checked = false
                    }
                }
                // 总金额
                let doubleAll = 0
                for (let i = 0; i < newVal.length; i++) {
                    if (newVal[i].checked) {
                        doubleAll += Number(newVal[i].multiple)
                    }
                }
                this.chase.doubleMoneyAll = doubleAll * this.chase.doubleMoney
            },
            deep: true
        },
        'chase.sameData': {
            handler (newVal) {
                // 检查同倍追号所有多选框是否选中
                let checked = newVal.every((item) => {
                    return item.checked
                })
                this.chase.sameChecked = !!checked
                for (let i = 0; i < newVal.length; i++) {
                    if (Number(newVal[i].multiple) <= 0) {
                        newVal[i].checked = false
                    }
                }
                // 总金额
                let doubleAll = 0
                for (let i = 0; i < newVal.length; i++) {
                    if (newVal[i].checked) {
                        doubleAll += Number(newVal[i].multiple)
                    }
                }
                this.chase.sameMoneyAll = doubleAll * this.chase.sameMoney
            },
            deep: true
        },
        'chase.rateIssue' (newVal) {
            if (Number(newVal) > this.chase.maxIssue) {
                this.chase.rateIssue = this.chase.maxIssue
            }
        },
        'chase.sameIssue' (newVal) {
            if (Number(newVal) > this.chase.maxIssue) {
                this.chase.sameIssue = this.chase.maxIssue
            }
        },
        'chase.doubleIssue' (newVal) {
            if (Number(newVal) > this.chase.maxIssue) {
                this.chase.doubleIssue = this.chase.maxIssue
            }
        },
        'totalSub.double': {
            handler () {
                // 计算翻倍后的金额
                this.totalSub.money = parseInt(this.totalSub.double) * Number(this.total.money)
            },
            deep: true
        }
    },
    created () {
        this.chase.maxIssue = this.lotteryAll[this.currentLottery.en_name].lottery.max_trace_number
    },
    methods: {
        // 生成翻倍追号
        chaseDoubleSubmit () {
            if (this.orderList.length === 0) {
                this.$alert('请至少选择一注投注号码', '提示', {
                    confirmButtonText: '确定'
                })
                return
            }
            this.chase.doubleData = []
            this.chase.doubleChecked = true
            this.chase.doubleMoneyAll = 0
            this.chase.doubleMoney = 0
            this.chase.doubleData = []
            for (let i = 0; i < this.orderList.length; i++) {
                this.chase.doubleMoney += this.orderList[i].cost
            }
            // 找出当前期 以及当前期 后面当期数
            let [ sameIssue = this.chase.doubleIssue ] = []
            let list = this.issueInfo.filter((item) => {
                return Number(item.issue_no) >= Number(this.currentIssue.issue_no)
            })
            // 如果已知期数 小于 用户生成的期数 重新获取所有已知期数
            if (Number(sameIssue) === Number(this.chase.maxIssue) && list.length < Number(this.chase.maxIssue)) {
                this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
                    if (res.isSuccess) {
                        this.$store.commit('issueInfo', res.data.issueInfo)
                        this.chaseSameSubmit()
                    }
                })
            }
            // 追号添加数据
            for (let i = 0; i < list.length; i++) {
                if (i < sameIssue) {
                    this.chase.doubleData.push(list[i])
                    list[i].time = this.Utils.formatTime(list[i].open_time * 1000, 'YYYY-MM-DD HH:MM:SS')
                    this.$set(this.chase.doubleData[i], 'checked', true)
                    if (i === 0) {
                        this.$set(this.chase.doubleData[0], 'multiple', 1)
                    } else {
                        this.$set(this.chase.doubleData[i], 'multiple', this.chase.doubleData[i - 1].multiple * 2)
                    }
                }
            }
        },
        // 同倍追号当全部选中
        sameCheckedAll () {
            this.chase.sameChecked = !this.chase.sameChecked
            let list = this.chase.sameData
            if (this.chase.sameChecked) {
                for (let i = 0; i < list.length; i++) {
                    list[i].checked = true
                }
            } else {
                for (let i = 0; i < list.length; i++) {
                    list[i].checked = false
                }
            }
        },
        // 生成同倍追号
        chaseSameSubmit () {
            if (this.orderList.length === 0) {
                this.$alert('请至少选择一注投注号码', '提示', {
                    confirmButtonText: '确定'
                })
                return
            }
            this.chase.sameData = []
            this.chase.sameChecked = true
            this.chase.sameMoneyAll = 0
            this.chase.sameMoney = 0
            this.chase.sameData = []
            for (let i = 0; i < this.orderList.length; i++) {
                this.chase.sameMoney += this.orderList[i].cost
            }
            // 找出当前期 以及当前期 后面当期数
            let [ sameIssue = this.chase.sameIssue ] = []
            let list = this.issueInfo.filter((item) => {
                return Number(item.issue_no) >= Number(this.currentIssue.issue_no)
            })
            // 如果已知期数 小于 用户生成的期数 重新获取所有已知期数
            if (Number(sameIssue) === Number(this.chase.maxIssue) && list.length < Number(this.chase.maxIssue)) {
                this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
                    if (res.isSuccess) {
                        this.$store.commit('issueInfo', res.data.issueInfo)
                        this.chaseSameSubmit()
                    }
                })
            }
            // 追号添加数据
            for (let i = 0; i < list.length; i++) {
                if (i < sameIssue) {
                    this.chase.sameData.push(list[i])
                    list[i].time = this.Utils.formatTime(list[i].open_time * 1000, 'YYYY-MM-DD HH:MM:SS')
                    this.$set(this.chase.sameData[i], 'checked', true)
                    this.$set(this.chase.sameData[i], 'multiple', this.chase.sameNum)
                }
            }
        },
        // 生成利率追号
        chaseRateSubmit () {
            let [ rateIssue = this.chase.rateIssue ] = []
            let list = this.issueInfo.filter((item) => {
                return Number(item.issue_no) >= Number(this.currentIssue.issue_no)
            })
            for (let i = 0; i < list.length; i++) {
                if (i < rateIssue) {
                    this.chase.rateData.push(list[i])
                }
            }
            console.log(this.chase.rateData[0])
        },
        // 追号tab 切换
        chaseTabHan (val) {
            this.chaseTab = val
        },
        // 确定投注
        submitBet () {
            let [
                currentIssus = this.currentIssue.issue_no,
                issus = {}
            ] = []
            issus[currentIssus] = true
            if (this.bet.doubleBeforeOrder.length === 0) {
                return
            }
            // 计算翻倍后的 金额 和倍数
            let [list = JSON.parse(this.bet.doubleBeforeOrder), money = null] = []
            if (list.length === 0) {
                return
            }
            for (let i = 0; i < list.length; i++) {
                list[i].cost = Number(list[i].cost) * Number(this.totalSub.double)
                list[i].count = Number(list[i].count) * Number(this.totalSub.double)
            }
            money = this.totalSub.double > 1 ? this.totalSub.money : this.totals.money
            this.Api.bet(this.currentLottery.en_name, issus, list, money).then((res) => {
                if (res.isSuccess) {
                    this.$store.commit('orderList', [])
                    this.bet.doubleBeforeOrder = JSON.stringify([])
                    this.$alert('投注成功, 您可以通过”游戏记录“查询您的投注记录！', '提示', {
                        confirmButtonText: '确定'
                    })
                }
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

<style scoped>
    .bet-pick-box{
        float:left;
        width:450px;
    }
    .chase{
        float:left;
        width:440px;
        height:172px;
    }
    .chase-title{
        height:40px;
        line-height:40px;
        background:#F9F9F9;
    }
    .chase-clear{
        position:absolute;
        right: 10px;
        top:7px;
    }
    .chase-tabs{
        background:#eeeff0;
    }
    .chase-tab{
        float:left;
        width:50%;
        height:29px;
        line-height:29px;
        background:#dee0e3;
    }
    .chase-tab.active {
        background:#eeeff0;
    }
    .tab-inputs{
        padding:15px 0 10px;
    }
    .tab-cons{
        padding-bottom:17px;
        background:#eeeff0;
    }
    .tab-input{
        margin:0 3px;
        text-align:center;
        width:40px;
        height:28px;
        border:1px solid #ccc;
    }
    .list-full-history .title{
        position:static;
    }
    .chase /deep/ .el-table td,
    .chase /deep/ .el-table th{
        padding:2px 0 ;
    }
    .chase /deep/ .el-table th>.cell {
        font-weight:normal;
    }
    .chase-table-container{
        padding: 15px 0;
        overflow: hidden;
        clear: both;
    }
</style>