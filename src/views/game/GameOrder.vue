<template>
  <section class="main-bottom">
    <section class="main-bottom-con" v-if="currentMethod.type !== 'lhc'">
      <section class="bet-count-confirm">
        <section class="play-footer clearfix fw">
          <section class="panel-section">
            <div class="pannel-title">
              <a
                href="javascript:;"
                class="btn close"
                id="project-empty"
                @click="clearOrderList()">清空</a>
              购彩篮
            </div>
            <div class="panel-select-title clearfix">
              <span class="name">玩法</span>
              <span class="number">号码</span>
              <span class="bet">注</span>
              <span class="multiple">倍</span>
              <span class="price">金额</span>
              <span class="operation">操作</span>
            </div>
            <div class="panel-order-list-cont">
              <ul class="order-container">
                <li v-for="(order, _orderIndex) in orderList" :key="_orderIndex">
                  <span class="name">{{order.method_name}}</span>
                  <span class="number" :title="order.codes">{{order.codes}}</span>
                  <span class="bet">{{order.count}}</span>
                  <span class="multiple">{{order.times}}</span>
                  <span class="price">{{Utils.toFixed(String(order.cost))}}</span>
                  <a
                    @click="deleteOrderList(order, _orderIndex)"
                    href="javascript:void(0);"
                    title="删除"
                    class="delete"
                  ></a>
                </li>

                <li class="no-data" v-if="orderList.length < 1">
                  暂无订单！！！
                  <br>无限大奖等着您，赶紧购彩去~
                </li>
              </ul>
            </div>
          </section>
          <section class="panel-trace">
            <ul class="chase-tabs">
              <li class="chase-tab" :class="{active: chaseTab === 0}" @click="chaseTabHan(0)">利润率追号</li>
              <li class="chase-tab" :class="{active: chaseTab === 1}" @click="chaseTabHan(1)">同倍追号</li>
              <li class="chase-tab" :class="{active: chaseTab === 2}" @click="chaseTabHan(2)">翻倍追号</li>
            </ul>
            <ul class="fw tab-cons">
              <div style="text-align:right">
                <el-button
                  class="tab-cons-btn"
                  type="warning"
                  plain
                  size="mini"
                  @click="clearChase"
                >清除追号</el-button>
              </div>
              <li class="tab-con" v-if="chaseTab === 0">
                <section class="tab-inputs">
                  <label class="param">
                    最低收益率:
                    <input
                      type="text"
                      v-model="chase.rateLowNum"
                      :placeholder="chase.rateLowNum"
                      class="tab-input"
                    >%
                  </label>
                  <label class="param">
                    追号期数
                    <input
                      type="text"
                      v-model="chase.rateIssue"
                      :placeholder="chase.rateIssue"
                      class="tab-input"
                    >
                  </label>
                  <el-button size="small" @click="chaseRateSubmit()">生成追号计划</el-button>
                </section>
              </li>
              <li class="tab-con" v-if="chaseTab === 1">
                <section class="tab-inputs">
                  <label class="param">
                    起始倍数:
                    <input
                      type="text"
                      v-model="chase.sameNum"
                      :placeholder="chase.sameNum"
                      class="tab-input"
                    >倍
                  </label>
                  <label class="param">
                    追号期数
                    <input
                      type="text"
                      v-model="chase.sameIssue"
                      :placeholder="chase.sameIssue"
                      class="tab-input"
                    >
                  </label>
                  <el-button size="small" @click="chaseSameSubmit()">生成追号计划</el-button>
                </section>
              </li>
              <li class="tab-con" v-if="chaseTab === 2">
                <section class="tab-inputs">
                  <!--               <label class="param">
                    起始倍数:
                    <input
                      type="text"
                      v-model="chase.doubleNum"
                      disabled
                      :placeholder="chase.doubleNum"
                      class="tab-input"
                    >
                  </label>-->
                  <label class="param">
                    每隔
                    <input
                      type="text"
                      v-model="chase.doubleG"
                      :placeholder="chase.doubleG"
                      class="tab-input"
                    >
                  </label>
                  <label class="param">
                    期 倍 x
                    <input
                      type="text"
                      v-model="chase.doubleB"
                      :placeholder="chase.doubleB"
                      class="tab-input"
                    >
                  </label>
                  <label class="param">
                    期数:
                    <input
                      type="text"
                      v-model="chase.doubleIssue"
                      :placeholder="chase.doubleIssue"
                      class="tab-input"
                    >
                  </label>
                  <el-button size="small" @click="chaseDoubleSubmit()">生成追号计划</el-button>
                </section>
              </li>
            </ul>
          </section>
        </section>
      </section>
      <section class="chase-table-container" v-if="chase.rateCon">
        <table class="chase-table">
          <tbody data-type="lirunlv">
            <tr>
              <th class="text-center">序号</th>
              <th>
                <input @click="rateCheckedAll()" v-model="chase.rateChecked" type="checkbox"> 追号期次
              </th>
              <th>倍数</th>
              <th>金额</th>
              <th>奖金</th>
              <th>盈利金额</th>
              <th>盈利率</th>
            </tr>
            <tr v-for="(item, index) in chase.rateData" :key="index">
              <td class="text-center">{{index + 1}}</td>
              <td>
                <input
                  data-action="checkedRow"
                  v-model="item.checked"
                  class="trace-row-checked"
                  type="checkbox"
                  checked="checked"
                >
                <span class="trace-row-number">
                  {{item.issue_no}}
                  <span class="icon-period-current"></span>
                </span>
              </td>
              <td>
                <input
                  class="trace-row-multiple"
                  @input="rateInputChange(item, index)"
                  v-model="item.multiple"
                  value="1"
                  type="text"
                  style="width:60px;text-align:center;"
                >
              </td>
              <td>
                <span class="trace-row-money">{{Utils.toFixed(String(item.value))}}</span>
              </td>
              <td>
                <span class="trace-row-userGroupMoney">{{Utils.toFixed(String(item.prize))}}</span>
              </td>
              <td>
                <span class="trace-row-userGroupMoney">{{Utils.toFixed(String(item.profit))}}</span>
              </td>
              <td>
                <span class="trace-row-userGroupMoney">{{Utils.toFixed(String(item.percentage))}}%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="chase-table-container" v-if="chase.sameCon">
        <table class="chase-table">
          <tbody data-type="lirunlv">
            <tr>
              <th class="text-center">序号</th>
              <th>
                <input @click="sameCheckedAll()" v-model="chase.sameChecked" type="checkbox"> 追号期次
              </th>
              <th>倍数</th>
              <th>金额</th>
              <th>预计开奖时间</th>
            </tr>
            <tr v-for="(item, index) in chase.sameData" :key="index">
              <td class="text-center">{{index + 1}}</td>
              <td>
                <input
                  data-action="checkedRow"
                  v-model="item.checked"
                  class="trace-row-checked"
                  type="checkbox"
                  checked="checked"
                >
                <span class="trace-row-number">
                  {{item.issue_no}}
                  <span class="icon-period-current"></span>
                </span>
              </td>
              <td>
                <input
                  class="trace-row-multiple"
                  @input="item.multiple = Utils.number(item.multiple)"
                  v-model="item.multiple"
                  value="1"
                  type="text"
                  style="width:60px;text-align:center;"
                >
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
      </section>
      <section class="chase-table-container" v-if="chase.doubleCon">
        <table class="chase-table">
          <tbody data-type="lirunlv">
            <tr>
              <th class="text-center">序号</th>
              <th>
                <input @click="doubleCheckedAll()" v-model="chase.doubleChecked" type="checkbox"> 追号期次
              </th>
              <th>倍数</th>
              <th>金额</th>
              <th>预计开奖时间</th>
            </tr>
            <tr v-for="(item, index) in chase.doubleData" :key="index">
              <td class="text-center">{{index + 1}}</td>
              <td>
                <input
                  data-action="checkedRow"
                  v-model="item.checked"
                  class="trace-row-checked"
                  type="checkbox"
                  checked="checked"
                >
                <span class="trace-row-number">
                  {{item.issue_no}}
                  <span class="icon-period-current"></span>
                </span>
              </td>
              <td>
                <input
                  class="trace-row-multiple"
                  @input="item.multiple = Utils.number(item.multiple)"
                  v-model="item.multiple"
                  value="1"
                  type="text"
                  style="width:60px;text-align:center;"
                >
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
      </section>
      <section class="bet-future-set">
        <div class="bmn-confirm-title">
          <div class="bmn-confir-icon">
            <img src="../../assets/images/lottery/icon_money.png">
          </div>确认投注信息
        </div>
        <section class="bmn-confirm-text">
          <ul class="bmn-confirm-infos">
            <li class="bmn-confirm-info">
              当前奖金组
              <span class="corigin">{{countPrize}}</span>
            </li>
            <li class="bmn-confirm-info">
              当前模式
              <span class="corigin">
                {{userConfig.singlePrice}}元 -
                <span v-if="userConfig.mode == 1">元</span>
                <span v-else-if="userConfig.mode == .1">角</span>
                <span v-else-if="userConfig.mode == .01">分</span>
                <span v-else>厘</span>
              </span> 模式
            </li>
            <li class="bmn-confirm-info">
              总倍数
              <span class="corigin">{{current.times}}</span>倍
            </li>
            <li class="bmn-confirm-info">
              总注数
              <span class="corigin">{{current.count}}</span>注
            </li>
          </ul>总金额
          <span style="font-size: 22px;" class="corigin">
            <template v-if="chase.rateCon">{{Utils.toFixed(String(chase.rateMoneyAll))}}</template>
            <template v-else-if="chase.sameCon">{{Utils.toFixed(String(chase.sameMoneyAll))}}</template>
            <template v-else-if="chase.doubleCon">{{Utils.toFixed(String(chase.doubleMoneyAll))}}</template>
            <template v-else>{{Utils.toFixed(String(totals.money))}}</template>
          </span>
        </section>

        <a
          href="javascript:;"
          class="btn main-btn-confirm"
          id="project-submit"
          @click="submitBet()"
        >
          <el-button type="primary" :loading="betLoading">
            <i class="fa fa-check-circle ft20" v-if="!betLoading"></i>确认投注
          </el-button>
        </a>
      </section>
    </section>
    <section class="list-full-history">
      <ul>
        <li
          class="title-list"
          :class="{current: betHistory.tab === 0}"
          @click="betHistory.tab = 0"
        >我的投注</li>
        <li
          class="title-list"
          :class="{current: betHistory.tab === 1}"
          @click="betHistory.tab = 1"
        >我的追号</li>
      </ul>
      <template v-if="betHistory.tab === 0">
        <el-table :key="1" :data="bet.betHistory.myBetList" style="width: 100%">
          <el-table-column align="center" prop="name" label="游戏">
            <template>
              <span>{{currentLottery.cn_name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="method_name" label="玩法"></el-table-column>
          <el-table-column align="center" prop="issue" label="期号"></el-table-column>
          <el-table-column align="center" prop="open_codes" label="开奖号" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" label="投注内容" show-overflow-tooltip>
            <template slot-scope="scope">
              <template v-if="scope.row.method_group === 'DXDS'">
                {{scope.row.bet_codes.replace(/(0)/g,'小').replace(/(1)/g,'大').replace(/(2)/g,'双').replace(/(3)/g,'单')}} 
              </template>
              <template v-else-if="scope.row.method_group === 'LH'">
                {{scope.row.bet_codes.replace(/(0)/g,'龙').replace(/(1)/g,'虎').replace(/(2)/g,'和')}} 
              </template>
              <template v-else-if="scope.row.method_sign === 'QTS3' || scope.row.method_sign === 'ZTS3' || scope.row.method_sign === 'HTS3'">
                {{scope.row.bet_codes.replace(/(0)/g,'豹子').replace(/(1)/g,'顺子').replace(/(2)/g,'对子')}} 
              </template>
              <template v-else>
                <span>{{scope.row.bet_codes}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="total_cost" label="投注金额"></el-table-column>
          <el-table-column align="center" prop="bonus" label="奖金"></el-table-column>
          <el-table-column align="center" prop="prize_group" label="奖金组-返点"></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">待开奖</span>
              <span v-if="scope.row.status == 2">未中奖</span>
              <span v-if="scope.row.status == 3">中奖</span>
              <span v-if="scope.row.status == 4">已派奖</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
               <el-button type="text" size="mini" @click="handleDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <router-link tag="section" class="row-more" to="/account-center/bet-record">更多游戏记录...</router-link>
      </template>
      <template v-if="betHistory.tab === 1">
        <el-table :key="2" :data="bet.betHistory.myChaseList" style="width: 100%">
          <el-table-column align="center" prop="name" label="彩种" show-overflow-tooltip>
            <template>
              <span>{{currentLottery.cn_name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="method_name" label="玩法" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="start_issue" label="起始奖期" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="process" label="追号奖期" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="total_price" label="投注金额" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="is_win_stop" label="追中即停" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.is_win_stop == 0">不停</span>
              <span v-if="scope.row.is_win_stop == 1">停</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="finished_bonus" label="中奖金额" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">正在追号 </span>
              <span v-if="scope.row.status == 1">追号完成</span>
              <span v-if="scope.row.status == 2">玩家撤销 </span>
              <span v-if="scope.row.status == 3">系统撤销</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
               <el-button type="text" size="mini" @click="handleDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <router-link tag="section" class="row-more" to="/account-center/bet-record/traces">更多游戏记录...</router-link>
      </template>
    </section>
    <record-details :detailData="detailData" @close="handleDetailClose" v-if="dialogVisible" :dialogVisible="dialogVisible"></record-details>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import recordDetails from '../../components/public/record_details'

export default {
  name: 'game-order',
  data() {
    return {
      total: {
        number: 0,
        money: 0
      },
      dialogVisible: false,
      totalSub: {
        number: 0,
        double: 1,
        money: 0
      },
      detailData: null,
      orderListSub: [],
      chaseTab: 0,
      tableData: [],
      chase: {
        maxIssue: 0,
        rateCon: false,
        rateChecked: true,
        rateMoneyAll: 0,
        rateMoney: 0,
        rateData: [],
        rateLowNum: 50,
        rateNum: 1,
        rateIssue: 10,
        sameData: [],
        sameCon: false,
        sameChecked: true,
        sameMoneyAll: 0,
        sameMoney: 0,
        sameNum: 1,
        sameIssue: 10,
        doubleData: [],
        doubleCon: false,
        doubleChecked: true,
        doubleMoneyAll: 0,
        doubleMoney: 0,
        doubleNum: 1,
        doubleIssue: 10,
        doubleG: 1,
        doubleB: 2
      },
      betHistory: {
        tab: 0
      },
      // 投注loading
      betLoading: false,

      // 当前注数 和 当前倍数
      current: {
        count: 0,
        times: 0
      },
      isTrace: 0
    }
  },
  props: ['countPrizes'],
  components: {
    recordDetails
  },
  computed: {
    ...mapGetters([
      'lotteryAll',
      'orderList',
      'currentOrderState',
      'totalCost',
      'currentLottery',
      'currentMethod',
      'bet',
      'currentIssue',
      'issueInfo',
      'countPrize',
      'userConfig'
    ]),
    // 翻倍
    totals() {
      this.total = {
        number: 0,
        money: 0
      }
      for (let i = 0; i < this.orderList.length; i++) {
        this.total.number += Number(this.orderList[i].count)
        this.total.money += Number(this.orderList[i].cost)
      }
      this.totalSub.money =
        parseInt(this.totalSub.double) * Number(this.total.money)
      return this.total
    },
    //当前奖金
    currentCountPrizes() {
      if (Array.isArray(this.countPrizes)) {
        return this.countPrizes[0].prize
      } else {
        return this.countPrizes
      }
    }
  },
  watch: {
    'chase.rateData': {
      handler(newVal) {
        // 检查同倍追号所有多选框是否选中
        let checked = newVal.every(item => {
          return item.checked
        })
        this.chase.rateChecked = !!checked
        for (let i = 0; i < newVal.length; i++) {
          if (Number(newVal[i].multiple) <= 0) {
            newVal[i].checked = false
          }
        }
        // 总金额
        let rateAll = 0
        for (let i = 0; i < newVal.length; i++) {
          if (newVal[i].checked) {
            rateAll += Number(newVal[i].multiple)
          }
        }
        this.current.count = (newVal.filter(val => val.checked === true)).length * this.orderList.length
        this.current.times = rateAll
        this.chase.rateMoneyAll = rateAll * this.chase.rateMoney
      },
      deep: true
    },
    'chase.doubleData': {
      handler(newVal) {
        // 检查同倍追号所有多选框是否选中
        let checked = newVal.every(item => {
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
        this.current.count = (newVal.filter(val => val.checked === true)).length * this.orderList.length
        this.current.times = doubleAll
        this.chase.doubleMoneyAll = doubleAll * this.chase.doubleMoney
      },
      deep: true
    },
    'chase.sameData': {
      handler(newVal) {
        // 检查同倍追号所有多选框是否选中
        let checked = newVal.every(item => {
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

        this.current.count = (newVal.filter(val => val.checked === true)).length * this.orderList.length
        this.current.times = doubleAll
        this.chase.sameMoneyAll = doubleAll * this.chase.sameMoney
      },
      deep: true
    },
    'chase.rateIssue'(newVal) {
      if (Number(newVal) > this.chase.maxIssue) {
        this.chase.rateIssue = this.chase.maxIssue
      }
    },
    'chase.sameIssue'(newVal) {
      if (Number(newVal) > this.chase.maxIssue) {
        this.chase.sameIssue = this.chase.maxIssue
      }
    },
    'chase.doubleIssue'(newVal) {
      if (Number(newVal) > this.chase.maxIssue) {
        this.chase.doubleIssue = this.chase.maxIssue
      }
    },
    'totalSub.double': {
      handler() {
        // 计算翻倍后的金额
        this.totalSub.money =
          parseInt(this.totalSub.double) * Number(this.total.money)
      },
      deep: true
    },
    orderList: {
      handler() {
        // 计算总倍数 和 总注数
        this.current.times = 0
        this.current.count = 0
        for (let i = 0; i < this.orderList.length; i++) {
          this.current.times += Number(this.orderList[i].times)
          this.current.count += Number(this.orderList[i].count)
        }
      },
      deep: true
    }
  },
  created() {
    // 获取我的投注 我的追号记录
    this.$store.dispatch('betHistory')
    this.clearOrderList()
    this.chase.maxIssue = this.lotteryAll[
      this.currentLottery.en_name
    ].lottery.max_trace_number
  },
  methods: {
    // 清除追号 关闭窗口
    clearChase() {
      this.isTrace = 0
      this.chase.sameCon = false
      this.chase.sameData = []
      this.chase.rateCon = false
      this.chase.rateData = []
      this.chase.doubleCon = false
      this.chase.doubleData = []
    },
    // 翻倍追号当全部选中fw tab-cons
    doubleCheckedAll() {
      this.chase.doubleChecked = !this.chase.doubleChecked
      let list = this.chase.doubleData
      if (this.chase.doubleChecked) {
        for (let i = 0; i < list.length; i++) {
          list[i].checked = true
        }
      } else {
        for (let i = 0; i < list.length; i++) {
          list[i].checked = false
        }
      }
    },
    // 同倍追号当全部选中
    sameCheckedAll() {
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
    // 利润率追号当全部选中
    rateCheckedAll() {
      this.chase.rateChecked = !this.chase.rateChecked
      let list = this.chase.rateData
      if (this.chase.rateChecked) {
        for (let i = 0; i < list.length; i++) {
          list[i].checked = true
        }
      } else {
        for (let i = 0; i < list.length; i++) {
          list[i].checked = false
        }
      }
    },
    // 生成翻倍追号
    chaseDoubleSubmit() {
      if (this.orderList.length === 0) {
        this.$alert('请至少选择一注投注号码', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.isTrace = 1
      this.chase.doubleCon = true
      this.chase.sameCon = false
      this.chase.rateCon = false
      this.chase.doubleData = []
      this.chase.doubleChecked = true
      this.chase.doubleMoneyAll = 0
      this.chase.doubleMoney = 0
      for (let i = 0; i < this.orderList.length; i++) {
        this.chase.doubleMoney += Number(this.orderList[i].cost)
      }
      // 找出当前期 以及当前期 后面当期数
      let [sameIssue = this.chase.doubleIssue] = []
      const list = [].concat(
        JSON.parse(
          JSON.stringify(
            this.issueInfo.filter(item => {
              return (
                Number(item.issue_no) >= Number(this.currentIssue.issue_no)
              )
            })
          )
        )
      )
      // 如果已知期数 小于 用户生成的期数 重新获取所有已知期数
      if (
        Number(sameIssue) === Number(this.chase.maxIssue) &&
        list.length < Number(this.chase.maxIssue)
      ) {
        this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
          if (res.success) {
            this.$store.commit('issueInfo', res.data.issueInfo)
            this.chaseSameSubmit()
          }
        })
      }
      // 追号添加数据
      for (let i = 0; i < list.length; i++) {
        if (i < sameIssue) {
          list[i].time = this.Utils.formatTime(
            list[i].open_time * 1000,
            'YYYY-MM-DD HH:MM:SS'
          )
          this.chase.doubleData.push(list[i])
          this.$set(this.chase.doubleData[i], 'checked', true)
          if (i === 0) {
            this.$set(
              this.chase.doubleData[0],
              'multiple',
              this.chase.doubleNum
            )
          } else {
            this.$set(
              this.chase.doubleData[i],
              'multiple',
              Math.pow(this.chase.doubleB, parseInt(i / this.chase.doubleG))
            )
          }
        }
      }
    },
    // 生成同倍追号
    chaseSameSubmit() {
      if (this.orderList.length === 0) {
        this.$alert('请至少选择一注投注号码', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.isTrace = 1
      this.chase.sameCon = true
      this.chase.doubleCon = false
      this.chase.rateCon = false
      this.chase.sameData = []
      this.chase.sameChecked = true
      this.chase.sameMoneyAll = 0
      this.chase.sameMoney = 0
      for (let i = 0; i < this.orderList.length; i++) {
        this.chase.sameMoney += Number(this.orderList[i].cost)
      }
      // 找出当前期 以及当前期 后面当期数
      let [sameIssue = this.chase.sameIssue] = []
      const list = [].concat(
        JSON.parse(
          JSON.stringify(
            this.issueInfo.filter(item => {
              return (
                Number(item.issue_no) >= Number(this.currentIssue.issue_no)
              )
            })
          )
        )
      )
      // 如果已知期数 小于 用户生成的期数 重新获取所有已知期数
      if (
        Number(sameIssue) === Number(this.chase.maxIssue) &&
        list.length < Number(this.chase.maxIssue)
      ) {
        this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
          if (res.success) {
            this.$store.commit('issueInfo', res.data.issueInfo)
            this.chaseSameSubmit()
          }
        })
      }
      // 追号添加数据
      for (let i = 0; i < list.length; i++) {
        if (i < sameIssue) {
          this.chase.sameData.push(list[i])
          list[i].time = this.Utils.formatTime(
            list[i].open_time * 1000,
            'YYYY-MM-DD HH:MM:SS'
          )
          this.$set(this.chase.sameData[i], 'checked', true)
          this.$set(this.chase.sameData[i], 'multiple', this.chase.sameNum)
        }
      }
    },
    // 生成利润率追号
    chaseRateSubmit() {
      if (this.orderList.length === 0) {
        this.$alert('请至少选择一注投注号码', '提示', {
          confirmButtonText: '确定'
        })
        this.chase.rateCon = false
        return
      }
      this.isTrace = 1
      this.chase.rateCon = true
      this.chase.sameCon = false
      this.chase.doubleCon = false
      this.chase.doubleCon = false
      this.chase.rateData = []
      this.chase.rateChecked = true
      this.chase.rateMoneyAll = 0
      this.chase.rateMoney = 0
      //盈利/盈利率追号不支持混投
      let type = '',
        mode = ''
      for (let i = 0; i < this.orderList.length; i++) {
        if (type !== '' && mode !== '') {
          if (
            type !== this.orderList[i].method_id ||
            mode !== this.orderList[i].mode
          ) {
            this.$alert(
              '利润率追号不支持混投，请确保您的投注都为同一玩法类型，且元角模式一致。',
              '提示',
              {
                confirmButtonText: '确定'
              }
            )
            this.chase.rateCon = false
            return false
          }
        } else {
          type = this.orderList[i].method_id
          mode = this.orderList[i].mode
        }
        this.chase.rateMoney += Number(this.orderList[i].cost)
      }
      // 找出当前期 以及当前期 后面当期数
      let [rateIssue = this.chase.rateIssue] = []
      const list = [].concat(
        JSON.parse(
          JSON.stringify(
            this.issueInfo.filter(item => {
              return (
                Number(item.issue_no) >= Number(this.currentIssue.issue_no)
              )
            })
          )
        )
      )
      // 如果已知期数 小于 用户生成的期数 重新获取所有已知期数
      if (
        Number(rateIssue) === Number(this.chase.maxIssue) &&
        list.length < Number(this.chase.maxIssue)
      ) {
        this.Api.getOpenAward(this.currentLottery.en_name).then(res => {
          if (res.success) {
            this.$store.commit('issueInfo', res.data.issueInfo)
            this.chaseRateSubmit()
          }
        })
      }
      let alertSign = true
      // 追号添加数据
      for (let i = 0; i < list.length; i++) {
        if (i < rateIssue) {
          let row_data = {}

          this.chase.rateData.push(list[i])

          row_data.id = i + 1
          row_data.multiple = this.chase.rateNum

          row_data.value = this.chase.rateMoney * row_data.multiple
          // 奖金 countPrizes 单注奖金
          row_data.prize =
            this.currentCountPrizes * this.orderList.length * row_data.multiple
          //盈利金额
          row_data.profit = row_data.prize - row_data.value * row_data.id

          let p = (row_data.profit / (row_data.value * row_data.id)) * 100
          if (i === 0 && p <= 0) {
            alert('您设置的参数无法达到盈利，请重新设置')
            this.clearChase()
            return
          }

          // 低于利率加倍
          while (p < this.chase.rateLowNum) {
            // 计算当前成本值
            let v = 0
            this.chase.rateData.forEach(item => {
              if (item.value) v += item.value
            })
            // 限制最大倍数
            let max_multiple = 1000
            if (row_data.multiple >= max_multiple) {
              if (alertSign) {
                alert(
                  '过了系统最大允许设置的倍数，将自动调整为系统最大可设置倍数'
                )
                alertSign = false
              }
              row_data.multiple = max_multiple
              row_data.value = this.chase.rateMoney * row_data.multiple
              row_data.prize =
                this.currentCountPrizes *
                this.orderList.length *
                row_data.multiple
              row_data.profit = row_data.prize - row_data.value - v
              p = (row_data.profit / (row_data.value + v)) * 100
              break
            }

            row_data.multiple += 1
            row_data.value = this.chase.rateMoney * row_data.multiple
            row_data.prize =
              this.currentCountPrizes *
              this.orderList.length *
              row_data.multiple
            row_data.profit = row_data.prize - row_data.value - v
            p = (row_data.profit / (row_data.value + v)) * 100

            if (p > this.chase.rateLowNum) {
              break
            }
          }

          row_data.percentage = p

          this.$set(this.chase.rateData[i], 'checked', true)
          this.$set(this.chase.rateData[i], 'multiple', row_data.multiple)
          this.$set(this.chase.rateData[i], 'value', row_data.value)
          this.$set(this.chase.rateData[i], 'prize', row_data.prize)
          this.$set(this.chase.rateData[i], 'profit', row_data.profit)
          this.$set(this.chase.rateData[i], 'percentage', row_data.percentage)
        }
      }
    },
    // 追号tab 切换
    chaseTabHan(val) {
      this.chaseTab = val
      if (val === 0) {
        if (this.chase.rateData.length > 0) {
          this.chase.rateCon = true
          this.chase.sameCon = false
          this.chase.doubleCon = false
        } else {
          this.chase.rateCon = false
          this.chase.sameCon = false
          this.chase.doubleCon = false
        }
      } else if (val === 1) {
        if (this.chase.sameData.length > 0) {
          this.chase.sameCon = true
          this.chase.doubleCon = false
          this.chase.rateCon = false
        } else {
          this.chase.rateCon = false
          this.chase.sameCon = false
          this.chase.doubleCon = false
        }
      } else if (val === 2) {
        if (this.chase.doubleData.length > 0) {
          this.chase.sameCon = false
          this.chase.doubleCon = true
          this.chase.rateCon = false
        } else {
          this.chase.rateCon = false
          this.chase.sameCon = false
          this.chase.doubleCon = false
        }
      }
    },
    // 确定投注
    submitBet() {
      if (this.betLoading) {
        return 
      }
      if (
        this.bet.doubleBeforeOrder.length === 0 ||
        this.bet.doubleBeforeOrder === '[]'
      ) {
        this.$alert('请至少选择一注投注号码', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      let [
        currentIssus = this.currentIssue.issue_no,
        issus = {},
        money = 0,
        chaseData = []
      ] = []
      this.betLoading = true
      if (this.chase.rateCon) {
        chaseData = this.chase.rateData
        for (let i = 0; i < chaseData.length; i++) {
          Object.assign(issus, {[chaseData[i].issue_no]: chaseData[i].multiple}) 
        }
        money = this.chase.rateMoneyAll
      } else if (this.chase.sameCon) {
        // 如果打开同倍追奖
        chaseData = this.chase.sameData
        for (let i = 0; i < chaseData.length; i++) {
          Object.assign(issus, {[chaseData[i].issue_no]: chaseData[i].multiple})
        }
        money = this.chase.sameMoneyAll
      } else if (this.chase.doubleCon) {
        // 如果打开翻倍
        chaseData = this.chase.doubleData

        for (let i = 0; i < chaseData.length; i++) {
          Object.assign(issus, {[chaseData[i].issue_no]: chaseData[i].multiple})
        }
        money = this.chase.doubleMoneyAll
      } else {
        // 同倍和翻倍追奖 都没有打开
        issus = {[currentIssus]: 1}
        money =
          this.totalSub.double > 1 ? this.totalSub.money : this.totals.money
      }
      // 计算翻倍后的 金额 和倍数
      let [list = JSON.parse(this.bet.doubleBeforeOrder)] = []
      if (list.length === 0) {
        this.$alert('请至少选择一注投注号码', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      for (let i = 0; i < list.length; i++) {
        list[i].cost = (Number(list[i].cost) * Number(this.totalSub.double)).toFixed(3)
        list[i].count = Number(list[i].count) * Number(this.totalSub.double)
        delete list[i]._codes
      }
      this.Api.bet(
        this.currentLottery.en_name,
        issus,
        list,
        money.toFixed(3),
        this.isTrace
      ).then(res => {
        this.betLoading = false
        if (res.success) {
          this.$store.commit('orderList', [])
          this.bet.doubleBeforeOrder = JSON.stringify([])
          this.$alert(
            '投注成功, 您可以通过”游戏记录“查询您的投注记录！',
            '提示',
            {
              confirmButtonText: '确定'
            }
          )
          // 获取我的投注 我的追号记录
          this.$store.dispatch('betHistory')
          // 刷新余额
          this.$store.dispatch('getUserDetail')
          this.clearOrderList()
        }
      })
    },
    // 删除当前投注
    deleteOrderList(item, index) {
      this.orderList.splice(index, 1)
      this.bet.doubleBeforeOrder = JSON.stringify(this.orderList)
      this.totalSub.money -= Number(item.cost) * Number(this.totalSub.double)
      if (this.orderList.length === 0) {
        this.total = {
          number: 0,
          money: 0
        }
        this.totalSub = {
          number: 0,
          double: 1,
          money: 0
        }
      }
      this.clearChase()
    },
    // 清空当前投注
    clearOrderList() {
      this.$store.commit('orderList', [])
      this.bet.doubleBeforeOrder = JSON.stringify([])
      this.total = {
        number: 0,
        money: 0
      }
      this.totalSub = {
        number: 0,
        double: 1,
        money: 0
      }
      this.clearChase()
    },
    rateInputChange(item, index) {
      const money = this.chase.rateMoney,
        multiple = this.Utils.number(item.multiple)
      if (multiple === '' || multiple === 0) {
        return
      }
      this.$set(item, 'value', money * multiple)
      this.$set(
        item,
        'prize',
        this.currentCountPrizes * this.orderList.length * multiple
      )
      this.$set(item, 'profit', item.prize - item.value * (index + 1))
      this.$set(
        item,
        'percentage',
        (item.profit / (item.value * (index + 1))) * 100
      )
    },
    //投注记录详情
    handleDetail(row){
      this.detailData = row
      this.dialogVisible = true
    },
    handleDetailClose(){
      this.dialogVisible = false
    }
  }
}
</script>
