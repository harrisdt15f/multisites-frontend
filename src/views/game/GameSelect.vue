<template>
  <section style="border-right: 1px solid #eaeaea;">
    <div class="main-play-introduce ft12">
      {{currentMethod.desc}}
      <a href="javascript:;" class="ico-why" v-if="currentMethod && currentMethod.help">
        ?
        <div class="tooltip1" v-html="currentMethod.help"></div>
      </a>
<!--      <a href="javascript:;" class="ico-case" v-if="currentMethod && currentMethod.example">-->
<!--        例-->
<!--        <div class="tooltip1" v-html="currentMethod.example"></div>-->
<!--      </a>-->
      <div class="lhc-end ab" v-if="currentMethod.type === 'lhc'">
        <el-tooltip content="1800 - 0.00%" placement="bottom">
          <input type="button" class="input high curr" value="A面">
        </el-tooltip>
        <el-tooltip content="1800 - 0.00%" placement="bottom">
          <input type="button" class="input low" value="B面">
        </el-tooltip>
      </div>
    </div>

    <div class="main-ball-box ball" v-if="currentMethod.type === 'multi'">
      <div
        class="main-ball-list"
        v-for="(_number, _tabName, yIndex) in currentMethod.layout"
        :key="yIndex">
        <div class="ball-list-name">{{_tabName}}</div>
<!--        选号区域  非龙虎选号-->
        <ul class="main-ball-content"
            v-if="currentMethod.method.indexOf('LH') < 0">
          <li
            class="main-ball-content-li"
            v-for="(_code, xIndex) in _number"
            :key="xIndex"
            :class="{'ball-on': chooseNumber[yIndex][xIndex], 'active': chooseNumber[yIndex][xIndex]}"
            @click="selectCode(yIndex, xIndex)">
            <a 
              href="javascript:;"
              :class="{
                'ball-number-long' :
                currentMethod.method === 'QTS3' ||
                currentMethod.method === 'ZTS3' ||
                currentMethod.method === 'HTS3' ||
                currentMethod.method === 'LTDDS'}"
              class="ball" 
              :x="xIndex" 
              :y="yIndex">{{_code}}</a>
          </li>
        </ul>
<!--        龙虎选号-->
        <ul
            v-if="
            currentLottery.series_id === 'ssc' &&
            currentMethod.method.indexOf('LH') > -1">
          <li
            class="main-ball-content-lh"
            v-for="(_code, xIndex) in _number"
            :key="xIndex"
            :class="{
            'ball-on': chooseNumber[yIndex][xIndex],
            'main-ball-content-lh-tiger': _code === '虎',
            'main-ball-content-lh-he': _code === '和',
            'active': chooseNumber[yIndex][xIndex]}"
            @click="selectCode(yIndex, xIndex)">
          </li>
        </ul>
<!--       辅助选号按钮-->
        <ul class="main-ball-control"
            v-if="currentMethod.buttons.length > 0"
            :class="{'series' : series === 'lotto'}">
          <li
            class="main-ball-control-li"
            v-for="(_btnText, bIndex) in  currentMethod.buttons"
            :key="bIndex"
            :class="{'ball-on': chooseButton[yIndex][bIndex] }"
            @click="selectButton(yIndex, bIndex)">
            <a href="javascript:;" class="ball" :x="bIndex" :y="yIndex">{{_btnText}}</a>
          </li>
        </ul>
      </div>
    </div>

    <!--快三-->
    <section
      v-else-if="currentMethod.type === 'k3'"
      class="ball-k3"
      v-for="(_number, _tabName, yIndex) in currentMethod.layout"
      :key="yIndex">
      <ul
        class="k3-dxds-lists k3-sbth-lists"
        v-if="currentMethod.method !== 'KSHZDXDS' && currentMethod.method !== 'KSHZ'"
        :class="{
          'k3-sth-lists': currentMethod.method === 'STH' || currentMethod.method === 'ETH',
          'k3-ebth-lists': currentMethod.method === 'EBTH',
          'k3-dtys-lists': currentMethod.method === 'DTYS'}">
        <li
          class="k3-dxds-list"
          v-for="(_code, xIndex) in _number"
          :key="xIndex"
          @click="selectCode(yIndex, xIndex)"
          :class="{'active': chooseNumber[yIndex][xIndex]}">
          <a
            href="javascript:;"
            class="k3-sbth-dxds-lk"
            :class="'k3-sbth-' + _code_sub"
            :x="xIndex"
            :y="yIndex"
            v-for="(_code_sub, index) in String(_code).split('')"
            :key="index"></a>
        </li>
      </ul>

      <!-- 合值 大小单双-->
      <ul class="k3-dxds-lists" v-else>
        <li
          class="k3-dxds-list"
          v-for="(_code, xIndex) in _number"
          :key="xIndex"
          @click="selectCode(yIndex, xIndex)">
          <a
            href="javascript:;"
            class="k3-dxds-lk"
            :class="{'active': chooseNumber[yIndex][xIndex]}"
            :x="xIndex"
            :y="yIndex">{{_code}}</a>
        </li>
      </ul>
    </section>

    <!--六合彩-->
    <Lhc v-else-if="currentMethod.type === 'lhc'"></Lhc>

    <!--直选-->
    <div class="main-ball-box" v-else>
      <div class="main-single-entry">
        <div class="main-balls-import">
          <el-upload
            action="/import/bet"
            :show-file-list="false"
            :http-request="uploadSectionFile"
            accept=".txt">
            <div class="btn btn-blue btn-ball-import" >导入注单</div>
          </el-upload>  
        </div>
        <div class="balls-import-box">
          <textarea
            @focus="inputAreaFocus()"
            @blur="inputAreaBlur()"
            class="balls-import-txt"
            v-model="inputCodes"></textarea>
        </div>
        <div class="btn-tab-list import-clean-list">
          <a  
            href="javascript:;"
            class="panel-btn-a"
            @click="inputClearRepeatOrder()"
          >清理重复和错误号码</a>
          <a href="javascript:;" class="panel-btn-a" @click="inputClearOrder()">清空选号</a>
        </div>
      </div>
    </div>

    <div class="bet-statistics" v-if="currentMethod.type !== 'lhc'">
      <div class="main-column-1 fl">
        <el-select v-model="userConfig.singlePrice" popper-class="single-price" placeholder="二元模式">
          <el-option
                  v-for="(item, index) in singlePrice"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <div class="bet-play-mode fw">
          <a
            v-for="(mode, modeIndex) in currentLottery.valid_modes"
            href="javascript:;"
            @click="selectMode(mode.val)"
            :class="['btn-tab', 'btn-effect', 'btn-red', currentOrder.currentMode === mode.val ? 'tab-on' : '']"
            :key="modeIndex"
            :v="modeIndex"
          >{{mode.title}}</a>
        </div>
        <div class="bet-choose-total">
          <a href="javascript:;" class="bet-choose-ipt" @click="timeReduce()"> - </a>
          <input type="text" class="ipt ipt-muliple" value="1" v-model="currentOrder.currentTimes">
          <a href="javascript:;" class="bet-choose-ipt" @click="timeAdd()"> + </a>
          <span style="margin-left: 10px;line-height: 34px;color: #a7a7a7;">倍</span> 
        </div>
      </div>
      <div class="bet-add-box fr">
        奖金:
        <el-slider v-model="lottery.countPrize"  :min="prizes.min" :max="prizes.max"></el-slider>
        {{lottery.countPrize}} / {{prizes.max}}
      </div>
    </div>
    <div class="submit-btn" v-if="currentMethod.type !== 'lhc'">
      <div class="bet-choose-total bet-choose-total-money">
        已选 <span class="bet-choose-total-money-count">{{currentOrder.currentCount}}</span> 注，
        共<strong class="bet-total-money" id="cost">{{Utils.toFixed(String(currentOrder.currentCost))}}</strong>元
      </div>
      <a href="javascript:;" class="btn main-btn-fastadd btn-effect" @click="oneKeyBet()">一键投注</a>
        <a href="javascript:;" class="btn main-btn-add btn-effect" @click="addOrder()">
          <i class="fa fa-download ft20"></i> 添加选号
        </a>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import algorithm from '../../lib/algorithm'
import pako from 'pako/index.js'

import { isRepeat } from '@/utils'

import Lhc from '@/components/game/lhc' 

export default {
  name: 'game-select',
  data() {
    return {
      inputCodesInitText: '',
      inputCodes: {},
      inputCodesSingle: 0,
      chooseNumber: [
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false]
      ],
      chooseButton: [
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false]
      ],
      choosePosition: [],
      // 当前选中状态
      currentOrder: {
        currentMode: 1,
        currentCost: 0,
        currentCount: 0,
        currentTimes: 1,
        currentGroup: 1950,
        currentCodes: {}
      },
      // 一键投注
      oneKeyList: {},
      dsTimer: null,
      series: '',
      // 奖金计算
      prizes: {
        min: 1800,
        max: 2000,
      },
      
      // 游戏模式
      singlePrice: [
        {value: 1, label: '一元模式'},
        {value: 2, label: '二元模式'}
      ]
    }
  },
  components: {
    Lhc
  },
  computed: {
    ...mapState([
      'lottery'
    ]),
    ...mapGetters([
      'userConfig',
      'orderList',
      'totalCost',
      'currentLottery',
      'currentMethod',
      'currentLotterySign',
      'bet',
      'currentIssue',
      'allMethods',
      'userDetail'
    ]),

    // 模式配置
    modeConfig: function() {
      return this.currentLottery.valid_modes
    },
    // 当前订单状态
    orderState: function() {
      return {
        input: this.inputCodes,
        choices: this.chooseNumber,
        position: this.choosePosition
      }
    }
  },
  watch: {
    // 更改一元两元模式
    'userConfig.singlePrice'() {
      this.calculate()
    },
    
    // 切换玩法时
    'bet.methodsTab'() {
      this.currentOrder.currentCost = 0
      this.currentOrder.currentCount = 0
      this.currentOrder.currentTimes = 1
      this.inputCodes = '说明：\n 1、每一注号码之间的间隔符支持 逗号[,] 每注内间隔使用空格即可。\n 2、文件格式必须是.txt格式。\n 3、导入文本内容后将覆盖文本框中现有的内容'
    },
    // 号码被清空时 清空注单
    // 'currentOrder.currentCost'(newVal) {},
    orderList(newVal) {
      if (newVal.length === 0) {
        this.clearBtn()
      }
    },
    oneKeyList(newVal) {
      if (JSON.stringify(newVal) === '{}') {
        this.clearBtn()
      }
    },
    // 更新玩法时
    currentMethod: {
      handler() {
        this.initChoose()
      },
      deep: true
    }
  },
  created() {
    // 当前奖金组
    this.lottery.countPrize = this.userDetail.prize_group
    
    this.inputAreaInit()
    this.series = this.currentLottery && this.currentLottery.series_id
  },
  methods: {
    // 投注成功 清除选中的数字
    clearBtn() {
      for (let j = 0; j < this.chooseNumber.length; j++) {
        for (let i = 0; i < this.chooseNumber[j].length; i++) {
          this.$set(this.chooseNumber[j], i, false)
        }
      }
      for (let j = 0; j < this.chooseButton.length; j++) {
        for (let i = 0; i < this.chooseButton[j].length; i++) {
          this.$set(this.chooseButton[j], i, false)
        }
      }
      // 清空注单值
      this.currentOrder.currentCost = 0
      this.currentOrder.currentCount = 0
      this.currentOrder.currentTimes = 1
    },
    // 添加投注单
    addOrder(oneKey) {
      let order = null
      if (
        this.currentMethod.type === 'multi' ||
        this.currentMethod.type === 'k3'
      ) {
        order = {
          method_id: this.currentMethod.method,
          method_name: this.currentMethod.name,
          codes: this.convertCodes(),
          count: this.currentOrder.currentCount,
          times: this.currentOrder.currentTimes,
          cost: this.currentOrder.currentCost,
          mode: this.currentOrder.currentMode,
          prize_group: this.currentOrder.currentGroup,
          price: 2
        }
        order._codes = this.formatInputCodes(order.codes)
        if (
          !this.currentOrder.currentCost ||
          Number(this.currentOrder.currentCost) <= 0
        ) {
          this.$alert('选号不符合规则, 请按照规则选号', '提示', {
            confirmButtonText: '确定'
          })
          return
        } 
        if (oneKey) {
          this.oneKeyList = order
        } else {
          let index = this.orderList.findIndex(item => {
            return order.codes === item.codes
          })
          // 如果订单存在相同号码  不添加订单 在原有订单基础上累加倍数
          if (index > -1) {
            this.$alert(
              '您选择的号码在号码篮已存在，将直接进行倍数累加，返点以第一单为准',
              '提示',
              {
                confirmButtonText: '确定',
                callback: () => {
                  this.$set(
                    this.orderList[index],
                    'times',
                    this.orderList[index].times + order.times
                  )
                  this.$set(
                    this.orderList[index],
                    'cost',
                    Number(this.orderList[index].cost) + Number(order.cost)
                  )
                }
              }
            )
          } else {
            this.orderList.unshift(order)
          }
          // 初始化翻倍后的数据
          let doubleBeforeOrder = []
          if (!Array.isArray(this.bet.doubleBeforeOrder)) {
            doubleBeforeOrder = JSON.parse(this.bet.doubleBeforeOrder)
          }
          doubleBeforeOrder.push(order)
          this.bet.doubleBeforeOrder = JSON.stringify(doubleBeforeOrder)
          // 清空注单值
          this.currentOrder.currentCost = 0
          this.currentOrder.currentCount = 0
          this.currentOrder.currentTimes = 1
          // 添加完选号 清空选中号码
          this.clearBtn()
        }
      }else {
        let _input = ''
        let tmp = (this.inputCodes || '').split(',').map(item => {
          return this.Utils.trim(item)
        })
        for (let i = tmp.length; i >= 0; i--) {
          // 去除非数字项
          if (isNaN(tmp[i])) {
            tmp.splice(i, 1)
          }
          // 去除 小于 或者 大于规定长度
          if (
            (this.currentMethod &&
              String(tmp[i]).length < this.currentMethod.b64) ||
            String(tmp[i]).length > this.currentMethod.b64
          ) {
            tmp.splice(i, 1)
          }
        }
        // 去重
        let temp = Array.from(new Set(tmp))
        this.inputCodes = temp.join(',')
        this.calculate(this.currentMethod, this.orderState)
        this.input = this.inputCodes
        if (isNaN(temp[0])) {
          this.$alert('请输入正确的投注号码！', '提示', {
            confirmButtonText: '确定'
          })
          return
        }
        _input = this.inputCodes
        order = {
          method_id: this.currentMethod.method,
          method_name: this.currentMethod.name,
          codes: _input,
          count: this.currentOrder.currentCount,
          times: this.currentOrder.currentTimes,
          cost: this.currentOrder.currentCost,
          mode: this.currentOrder.currentMode,
          prize_group: this.currentOrder.currentGroup,
          price: 2
        }
        if (oneKey) {
          this.oneKeyList = order
        } else {
          this.oneKeyList = {}
          this.orderList.unshift(order)
          // 初始化翻倍后的数据
          let doubleBeforeOrder = []
          if (!Array.isArray(this.bet.doubleBeforeOrder)) {
            doubleBeforeOrder = JSON.parse(this.bet.doubleBeforeOrder)
          }
          doubleBeforeOrder.push(order)
          this.bet.doubleBeforeOrder = JSON.stringify(doubleBeforeOrder)
        }
        // 清空注单值
        // this.currentOrder.currentCost = 0
        // this.currentOrder.currentCount = 0
        // this.currentOrder.currentTimes = 1
        // this.inputCodesSingle = 0
        // this.inputCodes = ''
      }
    },
    // 计算注数
    calculate() {
      if (
        this.currentMethod.type === 'multi' ||
        this.currentMethod.type === 'k3'
      ) {
        const method = this.currentMethod
        let _cnt,
          _count = 0,
          _pcnt,
          item,
          k,
          ref,
          result,
          inputcodes,
          positionDesc
        inputcodes = ''
        positionDesc = []

        result = algorithm[method.method](method, this.orderState)
        if (method.rx && result[0]) {
          _count = result[0]
          _cnt = result[1]
          _pcnt = 0
          ref = this.orderState.position
          for (k in ref) {
            item = ref[k]
            if (item) {
              _pcnt += 1
            }
          }
          positionDesc = [_pcnt, _cnt]
          if (result.length === 3) {
            inputcodes = result[2]
          }
        } else if (result instanceof Array && result[0]) {
          _count = result[0]
          inputcodes = result[1]
        } else {
          _count = result
        }
        this.currentOrder.currentCount = _count
        this.currentOrder.currentCost =
          +_count *
          +this.currentOrder.currentMode *
          +this.userConfig.singlePrice *
          +this.currentOrder.currentTimes
        this.currentOrder.inputcodes = inputcodes
        this.currentOrder.positionDesc = positionDesc

        return [_count, inputcodes, positionDesc]
      } else {
        this.currentOrder.currentCost =
          this.inputCodesSingle *
          +this.userConfig.singlePrice *
          this.currentOrder.currentTimes *
          this.currentOrder.currentMode
        this.currentOrder.currentCount = this.inputCodesSingle
      }
    },
    // 倍数增加
    timeAdd() {
      this.currentOrder.currentTimes = +this.currentOrder.currentTimes + 1
      this.calculate()
    },
    // 倍数减少
    timeReduce() {
      this.currentOrder.currentTimes > 1
        ? (this.currentOrder.currentTimes = +this.currentOrder.currentTimes - 1)
        : ''
      this.calculate()
    },
    // 选择模式
    selectMode(mode) {
      this.currentOrder.currentMode = +mode
      this.calculate()
    },
    // 选择数字
    selectCode(y, x) {
      this.cleanChooseButton(y)
      // 限制号码个数
      if (
        this.currentMethod.limitSelectedCount &&
        (this.chooseNumber[y] && this.chooseNumber[y][x] === false)
      ) {
        let count = 0
        for (let c = 0; c < this.chooseNumber[y].length; c++) {
          const col1 = this.chooseNumber[y][c]
          if (x !== c) {
            if (col1) {
              count++
            }
            if (count >= this.currentMethod.limitSelectedCount[y] && col1) {
              this.$set(this.chooseNumber[y], c, false)
            }
          }
        }
      }

      // 限制同位选择
      if (this.currentMethod.limitSelectedSomePosition) {
        for (let _row = 0; _row < this.chooseNumber.length; _row++) {
          if (_row !== y) {
            if (this.chooseNumber[_row][x] === true) {
              this.$set(this.chooseNumber[_row], x, false)
            }
          }
        }
      }

      this.$set(this.chooseNumber[y], x, !this.chooseNumber[y][x])
      // 计算注数
      this.calculate()
    },
    // 选择按钮
    selectButton(y, b) {
      this.cleanChooseButton(y)
      this.cleanChooseNumber(y)
  
      this.$set(this.chooseButton[y], b, !this.chooseNumber[y][b])
      
      let rowData = this.chooseNumber[y]
      if (
        this.currentLottery.series_id === 'lotto' ||
        this.currentLottery.series_id === 'pk10'
      ) {
        switch (this.currentMethod.buttons[b]) {
          case '全':
            for (let i = 0; i < rowData.length; i++) {
              this.chooseNumber[y][i] = true
            }
            break
          case '大':
            for (let i = 0; i < rowData.length; i++) {
              if (i >= rowData.length / 2) {
                this.chooseNumber[y][i] = true
              }
            }
            break
          case '小':
            for (let i = 0; i < rowData.length; i++) {
              if (i < rowData.length / 2) {
                this.chooseNumber[y][i] = true
              }
            }
            break
          case '偶':
            for (let i = 0; i < rowData.length; i++) {
              if (i % 2 === 1) {
                this.chooseNumber[y][i] = true
              }
            }
            break
          case '奇':
            for (let i = 0; i < rowData.length; i++) {
              if (i % 2 === 0) {
                this.chooseNumber[y][i] = true
              }
            }
            break
          case '清':
            this.chooseButton[y][b] = false
            break
        }
      }
      
      else {
        switch (this.currentMethod.buttons[b]) {
          case '全':
            for (let i = 0; i < rowData.length; i++) {
              this.chooseNumber[y][i] = true
            }
            break
          case '大':
            for (let i = 0; i < rowData.length; i++) {
              if (i >= rowData.length / 2) {
                this.chooseNumber[y][i] = true
              }
            }
            break
          case '小':
            for (let i = 0; i < rowData.length; i++) {
              if (i < rowData.length / 2) {
                this.chooseNumber[y][i] = true
              }
            }
            break
          case '偶':
            for (let i = 0; i < rowData.length; i++) {
              if ((i + 1) % 2 === 1) {
                this.chooseNumber[y][i] = true
              }
            }
            break
          case '奇':
            for (let i = 0; i < rowData.length; i++) {
              if ((i + 1) % 2 === 0) {
                this.chooseNumber[y][i] = true
              }
            }
            break
          case '清':
            this.chooseButton[y][b] = false
            break
        }
      }
      this.calculate()
    },
    // 初始化选号
    initChoose() {
      this.chooseNumber = []
      if (this.currentMethod.layout) {
        const iterable = Object.keys(this.currentMethod.layout)
        for (let i = 0; i < iterable.length; i++) {
          let row = iterable[i]
          this.chooseNumber[i] = []
          this.chooseButton[i] = []
          let _xData = []
          for (let j = 0; j < this.currentMethod.layout[row].length; j++) {
            _xData[j] = false
          }
          let _bData = []
          for (let k = 0; k < this.currentMethod.buttons; k++) {
            _bData[k] = false
          }
          this.$set(this.chooseButton, i, _bData)
          this.$set(this.chooseNumber, i, _xData)
        }
      }
    },
    // 清空选号
    cleanChooseNumber(y) {
      for (let j = 0; j < this.chooseNumber[y].length; j++) {
        this.chooseNumber[y][j] = false
      }
    },
    // 清空按钮
    cleanChooseButton(y) {
      for (let j = 0; j < this.chooseButton[y].length; j++) {
        this.chooseButton[y][j] = false
      }
    },
    // 切换号码
    convertCodes() {
      const method = this.currentMethod
      // 选球类型
      if (method.type === 'multi' || method.type === 'k3') {
        const codes = []
        const iterable = Object.keys(method.layout)
        for (let i = 0; i < iterable.length; i++) {
          const name = iterable[i]
          const layout = method.layout[name]
          const col = []
          for (let j = 0; j < layout.length; j++) {
            const number = layout[j]
            if (this.chooseNumber[i][j]) {
              col.push(number)
            }
          }
          codes.push(col.join('&'))
        }
        return codes.join('|')
      } else {
        // let [ codes = [] ] = []
        //
        // console.log(method)
      }
    },
    // 格式化号码
    formatInputCodes(code) {
      if (
        this.currentMethod.type === 'multi' ||
        this.currentMethod.type === 'k3'
      ) {
        if (
          this.currentLottery.series_id === 'ssc' ||
          this.currentLottery.series_id === 'digital3' ||
          this.currentLottery.series_id === 'p3p5'
        ) {
          if (
            Array.from(code).includes('|') ||
            this.currentMethod.method === 'DWD'
          ) {
            return code.replace(/&/g, '')
          } else {
            return code.replace(/&/g, ',')
          }
        } else if (this.currentLottery.series_id === 'lotto') {
          if (
            Array.from(code).includes('|') ||
            this.currentMethod.method === 'LTDWD'
          ) {
            return code.replace(/&/g, ' ')
          } else {
            return code.replace(/&/g, ',')
          }
        } else if (this.currentLottery.series_id === 'pk10') {
          if (
            Array.from(code).includes('|') ||
            this.currentMethod.method === 'PKDWD'
          ) {
            return code.replace(/&/g, ' ')
          } else {
            return code.replace(/&/g, ',')
          }
        } else if (this.currentLottery.series_id === 'ks') {
          if (Array.from(code).includes('|')) {
            return code.replace(/&/g, '')
          } else {
            return code.replace(/&/g, ',')
          }
        }
      }
      return code
    },
    // 输入框初始化
    inputAreaInit() {
      this.inputCodesInitText = '说明：\n 1、每一注号码之间的间隔符支持 逗号[,] 每注内间隔使用空格即可。\n 2、文件格式必须是.txt格式。\n 3、导入文本内容后将覆盖文本框中现有的内容'
      this.inputCodes = this.inputCodesInitText
    },
    // 单式输入框获取焦点
    inputAreaFocus() {
      if (this.inputCodes === this.inputCodesInitText) {
        this.inputCodes = ''
        return true
      }
    },
    // 单式输入框 变化时
    inputAreaChange() {
      clearInterval(this.dsTimer)
      this.dsTimer = setTimeout(() => {
        this.inputClearRepeatOrder()
      }, 500)
    },
    // 单式输入框失去焦点
    inputAreaBlur() {
      if (!this.inputCodes) {
        this.inputCodes = this.inputCodesInitText
      }
    },
    // 清空直选单式文本
    inputClearOrder() {
      this.inputCodes = ''
    },
    // 清理重复项 和 错误项
    inputClearRepeatOrder() {
      let [
        tmp = new Set(
          (this.inputCodes || '').split(/[\s\n,]+/).map(item => {
            return this.Utils.trim(item)
          })
        )
      ] = []
      // 任选单式
      if (this.currentMethod.mType && this.currentMethod.mType === 'rxds') {
        for (const k of tmp) {
          let temp = k.split(' ')
          for (const i of temp) {
            if (
              isNaN(i) ||
              parseInt(i) > 11 ||
              parseInt(i) < 0 ||
              i.length !== this.currentMethod.number ||
              temp.length !== this.currentMethod.b64
            ) {
              tmp.delete(k)
            }
          }
        }
      } else {
        // 直选单式
        if (this.currentLottery.series_id === 'lotto') {
          tmp = new Set((this.inputCodes || '').split(/,|，/).map(item => {
            return this.Utils.trim(item)
          }))
          for (const i of tmp) {
            // 去除重复的组
            const arr = i.split(/[\s\n]+/)

            if(isRepeat(arr) || arr.length != this.currentMethod.b64
            || arr.some(val => Number(val) > 11)){
              tmp.delete(i)
            }
          }
        } else {
          for (const i of tmp) {
            // 去除非数字项
            if (isNaN(i)) {
              tmp.delete(i)
            }
            // 去除 小于 或者 大于规定长度
            if (
              (this.currentMethod && String(i).length < this.currentMethod.b64) ||
              String(i).length > this.currentMethod.b64
            ) {
              tmp.delete(i)
            }
          }
        }
      }

      this.inputCodes = [...tmp].join(',')

      if (!this.inputCodes) {
        this.inputCodesSingle = 0
      } else {
        this.inputCodesSingle = this.inputCodes.split(',').length
      }
      this.calculate()
    },
    // 一键投注
    oneKeyBet() {
      let currentIssus = this.currentIssue.issue_no
      let issus = [currentIssus]
      // issus[currentIssus] = true
      this.addOrder(true)
      if (
        parseInt(this.currentOrder.currentCost) <= 0 ||
        JSON.stringify(this.oneKeyList) === '{}'
      ) {
        this.$alert('请输入正确的投注号码！', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      this.Api.bet(
        this.currentLottery.en_name,
        issus,
        [this.oneKeyList],
        this.orderList.cost
      ).then(res => {
        if (res.success) {
          this.oneKeyList = {}
          this.$alert(
            '投注成功, 您可以通过”游戏记录“查询您的投注记录！',
            '提示',
            {
              confirmButtonText: '确定'
            }
          )
          // 添加完选号 清空选中号码
          this.clearBtn()
          
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
      })
    },
    uploadSectionFile(param){
     const _this = this,
           fileReader = new FileReader(),
           file       = param.file
           
      fileReader.readAsText(file, 'gb2312')
      fileReader.onload = e => {
        let fileText = e.target.result
        if(fileText.trim() != ''){
          _this.inputCodes = fileText
          this.inputAreaChange()
        }
      }
      return 
    }
  }
}
</script>

<style lang="scss" scoped>
.bet-add-box{
  right:15px;
  font-size: 14px;
}
.main-column-1{
  /deep/{
    .el-select{
      margin-right: 10px;
      width: 108px;
      float: left;
    }
  }
}
</style>
