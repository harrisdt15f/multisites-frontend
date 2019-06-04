<template>
  <section class="main-bottom">
    <section class="main-bottom-con" v-if="currentMethod.type !== 'lhc'">
      <section class="bet-count-confirm">
        <section class="play-footer clearfix">
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
                  <span class="name">
                    {{order.method_name}}
                  </span>
                  <span class="number">
                    {{order.codes}}
                    <el-tooltip effect="dark" content="order.codes" placement="top">
                      12312
                    </el-tooltip>
                  </span>
                  <el-tooltip placement="top">
                    <div slot="content">多行信息<br/>第二行信息</div>
                    <el-button>Top center</el-button>
                  </el-tooltip>
                  <span class="bet">{{order.count}}</span>
                  <span class="multiple">{{order.times}}</span>
                  <span class="price">{{Utils.toFixed(String(order.cost))}}</span>
                  <a @click="deleteOrderList(order, _orderIndex)" href="javascript:void(0);" title="删除" class="delete"></a>
                </li>
              </ul>
            </div>
          </section>
          <section class="panel-trace">
            <ul class="chase-tabs">
              <li class="chase-tab" :class="{active: chaseTab === 1}" @click="chaseTabHan(1)">同倍追号</li>
              <li class="chase-tab" :class="{active: chaseTab === 2}" @click="chaseTabHan(2)">翻倍追号</li>
            </ul>
            <ul class="fw tab-cons">
              <li class="tab-con" v-if="chaseTab === 1">
                <section class="tab-inputs">
                  <label class="param">
                    起始倍数:
                    <input
                      type="text"
                      v-model="chase.sameNum"
                      :placeholder="chase.sameNum"
                      class="tab-input">倍
                  </label>
                  <label class="param">
                    追号期数
                    <input
                    type="text"
                    v-model="chase.sameIssue"
                    :placeholder="chase.sameIssue"
                    class="tab-input">
                  </label>
                  <el-button size="small" @click="chaseSameSubmit()">生成追号计划</el-button>
                </section>
              </li>
              <li class="tab-con" v-if="chaseTab === 2">
                <section class="tab-inputs">
                  <label class="param">
                  起始倍数:
                    <input
                      type="text"
                      v-model="chase.doubleNum"
                      disabled
                      :placeholder="chase.doubleNum"
                      class="tab-input">
                  </label>
                  <label class="param">
                    隔
                    <input
                      type="text"
                      v-model="chase.doubleG"
                      :placeholder="chase.doubleG"
                      class="tab-input">
                  </label>
                  <label class="param">
                    期 倍x
                    <input
                      type="text"
                      v-model="chase.doubleB"
                      :placeholder="chase.doubleB"
                      class="tab-input">
                  </label>
                  <label class="param">
                    期数:
                    <input
                      type="text"
                      v-model="chase.doubleIssue"
                      :placeholder="chase.doubleIssue"
                      class="tab-input">
                  </label>
                  <el-button size="small" @click="chaseDoubleSubmit()">生成追号计划</el-button>
                </section>
              </li>
            </ul>
          </section>
        </section>
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
          <div class="bmn-confir-icon"><img src="../../assets/images/lottery/icon_money.png"></div>
          确认投注信息
        </div>
        <span class="bmn-confirm-text">
          总金额
          <span style="font-size: 22px;">
            <template v-if="chase.sameCon">{{Utils.toFixed(String(chase.sameMoneyAll))}}</template>
            <template v-else-if="chase.doubleCon">{{Utils.toFixed(String(chase.doubleMoneyAll))}}</template>
            <template v-else>{{Utils.toFixed(String(totals.money))}}</template>
          </span>
        </span>
        
        <a
          href="javascript:;"
          class="btn main-btn-confirm"
          id="project-submit"
          @click="submitBet()">
          <i class="fa fa-check-circle ft20"></i>确认投注
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
      <table v-if="betHistory.tab === 0" class="w100">
        <thead>
          <tr>
            <th>游戏</th>
            <th>玩法</th>
            <th>期号</th>
            <th>开奖号</th>
            <th>投注内容</th>
            <th>投注金额</th>
            <th>奖金</th>
            <th>奖金组-返点</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in bet.betHistory.myBetList">
            <td>{{item.name}}</td>
            <td>{{item.method_name}}</td>
            <td>{{item.issue}}</td>
            <td>{{item.open_codes}}</td>
            <td style="display:inline-block;width:170px;" class="wzfw">{{item.bet_codes}}</td>
            <td>{{item.total_cost}}</td>
            <td>0.00</td>
            <td>{{item.prize_group}}</td>
            <td>{{item.status}}</td>
            <td class="cur">详情</td>
          </tr>
        </tbody>
      </table>
      <table v-if="betHistory.tab === 1" class="w100">
        <thead>
          <tr>
            <th>游戏</th>
            <th>玩法</th>
            <th>期号</th>
            <th>开奖号</th>
            <th>投注内容</th>
            <th>投注金额</th>
            <th>奖金</th>
            <th>奖金组-返点</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <!--                    <tr>-->
          <!--                        <td>重庆时时彩</td>-->
          <!--                        <td>五星直选单式</td>-->
          <!--                        <td>190415040</td>-->
          <!--                        <td>190415040</td>-->
          <!--                        <td style="display:inline-block;width:170px;" class="wzfw">1</td>-->
          <!--                        <td>1</td>-->
          <!--                        <td>2</td>-->
          <!--                        <td>未中奖</td>-->
          <!--                        <td>0</td>-->
          <!--                        <td class="cur">详情</td>-->
          <!--                    </tr>-->
        </tbody>
      </table>
      <section class="row-more">更多游戏记录...</section>
    </section>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
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
      orderListSub: [],
      chaseTab: 1,
      tableData: [],
      chase: {
        maxIssue: 0,
        rateData: [],
        rateNum: 50,
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
      }
    }
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
      'issueInfo'
    ]),
    // 翻倍
    totals() {
      this.total = {
        number: 0,
        money: 0
      }
      for (let i = 0; i < this.orderList.length; i++) {
        this.total.number += this.orderList[i].count
        this.total.money += this.orderList[i].cost
      }
      this.totalSub.money =
        parseInt(this.totalSub.double) * Number(this.total.money)
      return this.total
    }
  },
  watch: {
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
    }
  },
  created() {
    // 获取我的投注 我的追号记录
    // this.$store.dispatch("betHistory");
    this.chase.maxIssue = this.lotteryAll[
      this.currentLottery.en_name
    ].lottery.max_trace_number
  },
  methods: {
    // 清除追号 关闭窗口
    clearChase() {
      this.chase.sameCon = false
      this.chase.sameData = []
      this.chase.doubleCon = false
      this.chase.doubleData = []
    },
    // 翻倍追号当全部选中
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
    // 生成翻倍追号
    chaseDoubleSubmit() {
      if (this.orderList.length === 0) {
        this.$alert('请至少选择一注投注号码', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.chase.doubleCon = true
      this.chase.sameCon = false
      this.chase.doubleData = []
      this.chase.doubleChecked = true
      this.chase.doubleMoneyAll = 0
      this.chase.doubleMoney = 0
      for (let i = 0; i < this.orderList.length; i++) {
        this.chase.doubleMoney += this.orderList[i].cost
      }
      // 找出当前期 以及当前期 后面当期数
      let [sameIssue = this.chase.doubleIssue] = []
      let list = this.issueInfo.filter(item => {
        return Number(item.issue_no) >= Number(this.currentIssue.issue_no)
      })
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
    // 生成同倍追号
    chaseSameSubmit() {
      if (this.orderList.length === 0) {
        this.$alert('请至少选择一注投注号码', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.chase.sameCon = true
      this.chase.doubleCon = false
      this.chase.sameData = []
      this.chase.sameChecked = true
      this.chase.sameMoneyAll = 0
      this.chase.sameMoney = 0
      for (let i = 0; i < this.orderList.length; i++) {
        this.chase.sameMoney += this.orderList[i].cost
      }
      // 找出当前期 以及当前期 后面当期数
      let [sameIssue = this.chase.sameIssue] = []
      let list = this.issueInfo.filter(item => {
        return Number(item.issue_no) >= Number(this.currentIssue.issue_no)
      })
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
    // 追号tab 切换
    chaseTabHan(val) {
      this.chaseTab = val
      if (val === 1) {
        if (this.chase.sameData.length > 0) {
          this.chase.sameCon = true
          this.chase.doubleCon = false
        } else {
          this.chase.sameCon = false
          this.chase.doubleCon = false
        }
      } else if (val === 2) {
        if (this.chase.doubleData.length > 0) {
          this.chase.sameCon = false
          this.chase.doubleCon = true
        } else {
          this.chase.sameCon = false
          this.chase.doubleCon = false
        }
      }
    },
    // 确定投注
    submitBet() {
      if (this.bet.doubleBeforeOrder.length === 0) {
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
      if (this.chase.sameCon) {
        // 如果打开同倍追奖
        chaseData = this.chase.sameData
        for (let i = 0; i < chaseData.length; i++) {
          issus[chaseData[i].issue_no] = true
        }
        money = this.chase.sameMoneyAll
      } else if (this.chase.doubleCon) {
        // 如果打开翻倍
        chaseData = this.chase.doubleData
        for (let i = 0; i < chaseData.length; i++) {
          issus[chaseData[i].issue_no] = true
        }
        money = this.chase.doubleMoneyAll
      } else {
        // 同倍和翻倍追奖 都没有打开
        issus[currentIssus] = true
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
        list[i].cost = Number(list[i].cost) * Number(this.totalSub.double)
        list[i].count = Number(list[i].count) * Number(this.totalSub.double)
      }
      this.Api.bet(this.currentLottery.en_name, issus, list, money).then(
        res => {
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
            // this.$store.dispatch("betHistory");
            // 刷新余额
            this.Api.getBalance().then(res => {
              if (res.success) {
                let account = this.Utils.storage.get('current-user')
                if (account && account.data) {
                  account.data.balance = res.data.balance
                  account.data.frozen = res.data.frozen
                  this.$store.commit('account', account.data)
                  this.Utils.storage.set('current-user', account.data)
                }
              }
            })
          }
        }
      )
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
    }
  }
}
</script>