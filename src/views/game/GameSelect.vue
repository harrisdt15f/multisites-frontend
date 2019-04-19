<template>
    <section>
        <div class="main-row-1">
            <div class="main-play-introduce">
                <div class="introduce-txt" id="method-desc">{{currentMethod.desc}}</div>
                <a href="javascript:;" class="ico-why">?<div class="tooltip1" v-html="currentMethod.help"></div><span></span></a>
                <a href="javascript:;" class="ico-case">例<div class="tooltip1" v-html="currentMethod.example"></div><span></span></a>
            </div>
        </div>
        <div class="main-ball-section fw">
<!--            <div class="main-ball-random"><a href="javascript:;" class=" btn-red" id="random1">机选一注</a><a href="javascript:;" class=" btn-red" id="random5">机选五注</a></div>-->
            <div class="main-ball-box" id="ball-multi" v-if="currentMethod.type === 'multi'">
                <div class="position">

                </div>
                <div class="ball">
                    <div class="main-ball-list"   v-for="(_number, _tabName, yIndex) in currentMethod.layout" :key="yIndex">
                        <div class="ball-list-name"><span>{{_tabName}}</span></div>
                        <ul class="main-ball-content">
                            <li v-for="(_code, xIndex) in _number" :key="xIndex" :class="{'ball-on': chooseNumber[yIndex][xIndex]}"  @click="selectCode(yIndex, xIndex)">
                                <a href="javascript:;" class="ball" :x="xIndex" :y="yIndex">{{_code}}</a>
                            </li>
                        </ul>
                        <ul class="main-ball-control">
                            <li v-for="(_btnText, bIndex) in  currentMethod.buttons" :key="bIndex" :class="{'ball-on': chooseButton[yIndex][bIndex] }"  @click="selectButton(yIndex, bIndex)" >
                                <a href="javascript:;" class="ball" :x="bIndex" :y="yIndex">{{_btnText}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="main-ball-box" id="ball-text" v-else>
                <div class="position">

                </div>
                <div class="ball">
                    <div class="main-single-entry">
                        <div class="main-balls-import">
                            <div id="singleUpload" class="btn btn-blue btn-ball-import">导入注单</div>
                            <div class="btn-tab-list import-clean-list">
                                <a href="javascript:;" class="btn-tab btn-red optimize" @click="inputClearRepeatOrder()">清理号码</a>
                                <a href="javascript:;" class="btn-tab btn-red optimize" @click="inputClearOrder()">清空选号</a>
                            </div>
                        </div>
                        <div class="balls-import-box">
                              <textarea @focus="inputAreaFocus()" @blur="inputAreaBlur()" class="balls-import-txt" id='ball-text-v' v-model="inputCodes"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bet-statistics w100">
            <div class="main-column-1 FL">
                <div class="bet-choose-total">共<span id="num" class="txt-red m-L m-R">{{currentOrder.currentCount}}</span>注，
                    <input type="button" value="-" class="bet-choose-ipt" id="times-reduce" @click="timeReduce()">
                    <input type="text" class="ipt ipt-muliple" value="1" id="times" v-model="currentOrder.currentTimes">
                    <input type="button" value="+" class="bet-choose-ipt" id="times-add" @click="timeAdd()">
                    倍
                </div>
                <div class="bet-play-mode fw"> <span class="play-mode-name">模式：</span>
                    <div class="btn-tab-list">
                        <a
                                v-for="(mode, modeIndex) in currentLottery.valid_modes"
                                href="javascript:;"
                                @click="selectMode(mode.val)"
                                :class="['btn-tab', 'btn-effect', 'btn-red', currentOrder.currentMode === mode.val ? 'tab-on' : '']" :key="modeIndex" :v="modeIndex">
                            {{mode.title}}
                        </a>
                    </div>

                </div>
                                    <div class="bet-rebate-mode">
                                        <div class="block"><el-slider v-model="currentOrder.currentGroup" v-bind:min=1700 v-bind:max=1980></el-slider></div>
                                    </div>
            </div>
            <div class="main-column-1 FR">
                <div class="bet-add-box">
                    <strong class="bet-total-money" id="cost">{{currentOrder.currentCost}}</strong>元
                    <a href="javascript:;" class="btn main-btn-fastadd  btn-effect" id="fast-add" @click="oneKeyBet()"><span class="ico-add"></span><span>一键投注</span></a>
                    <a href="javascript:;" class="btn main-btn-add btn-effect" id="add" @click="addOrder()"><span class="ico-add"></span><span>添加选号</span></a>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState } from 'vuex'
import { array_unique3 } from '../../lib/funs'
import algorithm from '../../lib/algorithm'
import pako from 'pako/index.js'

export default {
    name: 'game-select',
    template: '#game-select',
    components: {
    },
    data() {
        return {
            inputCodesInitText:"",
            inputCodes:{},
            chooseNumber:[ [false], [false], [false], [false], [false], [false], [false], [false] ],
            chooseButton:[ [false], [false], [false], [false], [false], [false], [false], [false] ],
            choosePosition:[],
            // 当前选中状态
            currentOrder:{
                currentMode:1,
                currentCost:0,
                currentCount:0,
                currentTimes:1,
                currentGroup:1950,
                currentCodes:{},
            },
            // 一键投注
            oneKeyList: {}
        }
    },
    computed: {
        ...mapState([
            'userConfig',
            'orderList',
            'totalCost',
            'currentLottery',
            'currentMethod',
            'currentLotterySign',
            'bet',
            'currentIssue'
        ]),

        // 模式配置
        modeConfig: function () {
            return this.currentLottery.valid_modes;
        },
        // 当前订单状态
        orderState: function () {
            return {
                input: this.inputCodes,
                choices: this.chooseNumber,
                position: this.choosePosition
            }
        }
    },
    watch: {
        'orderList' (newVal) {
            if (newVal.length === 0) {
                this.clearBtn()
            }
        },
        'oneKeyList' (newVal) {
            if (newVal.length === 0) {
                this.clearBtn()
            }
        },
        // 如果路由有变化，会再次执行该方法
        '$store.state.currentMethod': {
            handler() {
                this.initChoose()
            },
            deep: true
        }
    },
    created() {
        this.inputAreaInit()
    },
    methods: {
        // 投注成功 清除选中的按钮
        clearBtn () {
            for (let j = 0; j < this.chooseNumber.length; j++) {
                for (let i = 0; i < this.chooseNumber[j].length; i++) {
                    this.$set(this.chooseNumber[j], i, false)
                }
            }
        },
        // 添加投注单
        addOrder(oneKey) {
            if (this.currentMethod.type === 'multi') {
                let order = {
                    method_id: this.currentMethod.method,
                    method_name: this.currentMethod.name,
                    codes: this.convertCodes(),
                    count: this.currentOrder.currentCount,
                    times: this.currentOrder.currentTimes,
                    cost:           this.currentOrder.currentCost,
                    mode:           this.currentOrder.currentMode,
                    prize_group:    this.currentOrder.currentGroup,
                    price: 2
                }
                order._codes = this.formatInputCodes(order.codes)
                if (!this.currentOrder.currentCost || Number(this.currentOrder.currentCost) <= 0) {
                    this.$alert('选号不符合规则, 请按照规则选号', '提示', {
                        confirmButtonText: '确定'
                    });
                    return
                }
                if (oneKey) {
                    this.oneKeyList = order
                } else {
                    this.orderList.unshift(order)
                    // 初始化翻倍后的数据
                    let doubleBeforeOrder = []
                    if (!Array.isArray(this.bet.doubleBeforeOrder)) {
                        doubleBeforeOrder = JSON.parse(this.bet.doubleBeforeOrder)
                    }
                    doubleBeforeOrder.push(order)
                    this.bet.doubleBeforeOrder = JSON.stringify(doubleBeforeOrder)
                }
            } else {

                let _input = ''

                let tmp = (this.inputCodes || '').split(',')
                let temp = array_unique3(tmp)
                if ((tmp.length - temp.length) > 0) {
                    this.inputCodes = temp.join(',')
                    this.calculate( this.currentMethod, this.orderState)
                }

                this.input = this.inputCodes;

                //优化单式//需要压缩
                if (this.currentMethod.b64 && (temp.length > 10)) {
                    _input = new Uint8Array(temp);
                    _input = pako.gzip(_input, {gzip:true});
                } else {
                    _input = this.inputCodes;
                }

                let order = {
                    method_id: this.currentMethod.method,
                    method_name: this.currentMethod.name,
                    codes: _input,
                    count: this.currentOrder.currentCount,
                    times: this.currentOrder.currentTimes,
                    cost:  this.currentOrder.currentCost,
                    mode:  this.currentOrder.currentMode,
                    prize_group: this.currentOrder.currentGroup,
                    price: 2
                }
                if (oneKey) {
                    this.oneKeyList = order
                } else {
                    this.orderList.unshift(order)
                    // 初始化翻倍后的数据
                    let doubleBeforeOrder = []
                    if (!Array.isArray(this.bet.doubleBeforeOrder)) {
                        doubleBeforeOrder = JSON.parse(this.bet.doubleBeforeOrder)
                    }
                    doubleBeforeOrder.push(order)
                    this.bet.doubleBeforeOrder = JSON.stringify(doubleBeforeOrder)
                }
            }

        },

        // 计算注数
        calculate() {
            const method = this.currentMethod;
            let _cnt, _count = 0, _pcnt, item, k, ref, result, inputcodes, positionDesc;

            inputcodes      = '';
            positionDesc    = [];

            result = algorithm[method.method](method, this.orderState);

            if (method.rx && result[0]) {
                _count  = result[0];
                _cnt    = result[1];
                _pcnt   = 0;
                ref     = this.orderState.position;
                for (k in ref) {
                    item = ref[k];
                    if (item) {
                        _pcnt += 1;
                    }
                }
                positionDesc = [_pcnt, _cnt];
                if (result.length === 3) {
                    inputcodes = result[2];
                }
            } else if (result instanceof Array && result[0]) {
                _count      = result[0];
                inputcodes  = result[1];
            } else {
                _count = result;
            }

            this.currentOrder.currentCount      = _count;
            this.currentOrder.currentCost       = +_count * + this.currentOrder.currentMode * + this.userConfig.singlePrice * +this.currentOrder.currentTimes;
            this.currentOrder.inputcodes        = inputcodes;
            this.currentOrder.positionDesc      = positionDesc;

            return [_count, inputcodes, positionDesc];
        },

        // 倍数增加
        timeAdd() {
            this.currentOrder.currentTimes = +this.currentOrder.currentTimes + 1;
            this.calculate();
        },

        // 倍数减少
        timeReduce() {
            this.currentOrder.currentTimes > 1 ? this.currentOrder.currentTimes = +this.currentOrder.currentTimes - 1 : "";
            this.calculate();
        },

        // 选择模式
        selectMode(mode) {
            this.currentOrder.currentMode = +mode;
            this.calculate();
        },

        // 选择数字
        selectCode(y, x) {
            this.cleanChooseButton(y);
            // 限制号码个数
            if (this.currentMethod.limitSelectedCount && (this.chooseNumber[y] && this.chooseNumber[y][x] === false)) {
                let count = 0;
                for (let c = 0; c < this.chooseNumber[y].length; c++) {
                    const col1 = this.chooseNumber[y][c];
                    if (x !== c) {
                        if (col1) {
                            count++;
                        }
                        if ((count >= this.currentMethod.limitSelectedCount[y]) && col1) {
                            this.$set(this.chooseNumber[y], c, false);
                        }
                    }
                }
            }

            // 限制同位选择
            if (this.currentMethod.limitSelectedSomePosition) {
                for (let _row = 0; _row < this.chooseNumber.length; _row ++) {
                    if (_row !== y) {
                        if (this.chooseNumber[_row][x] === true) {
                            this.$set(this.chooseNumber[_row], x, false);
                        }
                    }
                }
            }

            this.$set(this.chooseNumber[y], x, !this.chooseNumber[y][x]);
            // 计算注数
            this.calculate();
        },

        // 选择按钮
        selectButton(y, b) {
            this.cleanChooseButton(y);
            this.cleanChooseNumber(y);
            this.$set(this.chooseButton[y], b, !this.chooseNumber[y][b]);

            let rowData = this.chooseNumber[y];

            if ((this.currentLottery.series_id === 'lotto') || (this.currentLottery.series_id === 'pk10')) {
                switch (this.currentMethod.buttons[b]) {
                    case '全':
                        for (let i = 0; i < rowData.length; i++) {
                            this.chooseNumber[y][i] = true;
                        }
                        break;
                    case '大':
                        for (let i = 0; i < rowData.length; i++) {
                            if (i >= (rowData.length / 2)) {
                                this.chooseNumber[y][i] = true;
                            }
                        }
                        break;
                    case '小':
                        for (let i = 0; i < rowData.length; i++) {
                            if (i < (rowData.length / 2)) {
                                this.chooseNumber[y][i] = true;
                            }
                        }
                        break;
                    case '奇':
                        for (let i = 0; i < rowData.length; i++) {
                            if (((i + 1) % 2) === 1) {
                                this.chooseNumber[y][i] = true;
                            }
                        }
                        break;
                    case '偶':
                        for (let i = 0; i < rowData.length; i++) {
                            if (((i + 1) % 2) === 0) {
                                this.chooseNumber[y][i] = true;
                            }
                        }
                        break;
                }
            } else {
                switch (this.currentMethod.buttons[b]) {
                    case '全':
                        for (let i = 0; i < rowData.length; i++) {
                            this.chooseNumber[y][i] = true;
                        }
                        break;
                    case '大':
                        for (let i = 0; i < rowData.length; i++) {
                            if (i >= (rowData.length / 2)) {
                                this.chooseNumber[y][i] = true;
                            }
                        }
                        break;
                    case '小':
                        for (let i = 0; i < rowData.length; i++) {
                            if (i < (rowData.length / 2)) {
                                this.chooseNumber[y][i] = true;
                            }
                        }
                        break;
                    case '奇':
                        for (let i = 0; i < rowData.length; i++) {
                            if (((i + 1) % 2) === 1) {
                                this.chooseNumber[y][i] = true;
                            }
                        }
                        break;
                    case '偶':
                        for (let i = 0; i < rowData.length; i++) {
                            if (((i + 1) % 2) === 0) {
                                this.chooseNumber[y][i] = true;
                            }
                        }
                        break;
                }
            }

            this.calculate();
        },

        // 初始化选号
        initChoose() {
            this.chooseNumber = []
            if (this.currentMethod.layout) {
                const iterable = Object.keys(this.currentMethod.layout);

                for (let i = 0; i < iterable.length; i++) {
                    let row = iterable[i];
                    this.chooseNumber[i] = [];
                    this.chooseButton[i] = [];
                    let _xData = [];
                    for (let j = 0; j < this.currentMethod.layout[row].length; j++) {
                        _xData[j] = false;

                    }
                    let _bData = [];
                    for (let k = 0; k < this.currentMethod.buttons; k++) {
                        _bData[k] = false;
                    }
                    this.$set(this.chooseButton, i, _bData);
                    this.$set(this.chooseNumber, i, _xData);
                }
            }
        },

        // 清空选号
        cleanChooseNumber(y) {
            for (let j = 0; j < this.chooseNumber[y].length; j++) {
                this.chooseNumber[y][j] = false;
            }
        },

        // 清空按钮
        cleanChooseButton(y) {
            for (let j = 0; j < this.chooseButton[y].length; j++) {
                this.chooseButton[y][j] = false;
            }
        },
        // 切换号码
        convertCodes() {
            const method = this.currentMethod;
            // 选球类型
            if (method.type === 'multi') {
                const codes = []
                const iterable = Object.keys(method.layout)
                for (let i = 0; i < iterable.length; i++) {
                    const name = iterable[i]
                    const layout = method.layout[name]
                    const col = []
                    for (let j = 0; j < layout.length; j++) {
                        const number = layout[j]
                        if (this.chooseNumber[i][j]) {
                            col.push(number);
                        }
                    }
                    codes.push(col.join('&'))
                }
                return codes.join('|')
            } else {
                // let [ codes = [] ] = []
                //
                // console.log(method)
                // console.log(this.Utils.removeAllSpace(this.inputCodes).replace(/,/g,'|'))
            }
        },

        // 格式化号码
        formatInputCodes(code) {
            if (this.currentMethod.type === 'multi') {
                if (
                    (this.currentLottery.series_id === 'ssc') ||
                    (this.currentLottery.series_id === 'digital3') ||
                    (this.currentLottery.series_id === 'p3p5')) {
                    if (Array.from(code).includes('|') || (this.currentMethod.method === 'DWD')) {
                        return code.replace(/&/g, '');
                    } else {
                        return code.replace(/&/g, ',');
                    }
                } else if (this.currentLottery.series_id === 'lotto') {
                    if (Array.from(code).includes('|') || (this.currentMethod.method === 'LTDWD')) {
                        return code.replace(/&/g, ' ');
                    } else {
                        return code.replace(/&/g, ',');
                    }
                } else if (this.currentLottery.series_id === 'pk10') {
                    if (Array.from(code).includes('|') || (this.currentMethod.method === 'PKDWD')) {
                        return code.replace(/&/g, ' ');
                    } else {
                        return code.replace(/&/g, ',');
                    }
                } else if (this.currentLottery.series_id === 'ks') {
                    if (Array.from(code).includes('|')) {
                        return code.replace(/&/g, '');
                    } else {
                        return code.replace(/&/g, ',');
                    }
                }
            }
            return code;
        },

        // 输入框初始化
        inputAreaInit() {
          this.inputCodesInitText = "说明：\n" +
              "1、每一注号码之间的间隔符支持 回车 逗号[,] 分号[;] 每注内间隔使用空格即可。\n" +
              "2、文件格式必须是.txt格式。\n" +
              "3、导入文本内容后将覆盖文本框中现有的内容";
          this.inputCodes = this.inputCodesInitText
        },
        // 单式输入框获取焦点
        inputAreaFocus() {
            this.inputCodes = ''
        },
        // 单式输入框失去焦点
        inputAreaBlur() {
            if (this.inputCodes && this.inputCodes !== this.inputCodesInitText) {
                return true
            }
            this.inputCodes = this.inputCodesInitText
        },
        // 清空直选单式文本
        inputClearOrder() {
            this.inputCodes = ''
        },
        // 清理重复项 和 错误项
        inputClearRepeatOrder() {
            let _input = ''
            let tmp = (this.inputCodes || '').split(',')
            let temp = array_unique3(tmp)
            if ((tmp.length - temp.length) > 0) {
                this.inputCodes = temp.join(',')
                this.calculate( this.currentMethod, this.orderState)
            }
    
            this.input = this.inputCodes;
    
            //优化单式//需要压缩
            if (this.currentMethod.b64 && (temp.length > 10)) {
                _input = new Uint8Array(temp)
                _input = pako.gzip(_input, {gzip:true})
            } else {
                _input = this.inputCodes
            }
        },
        // 一键投注
        oneKeyBet () {
            let currentIssus = this.currentIssue.issue_no
            let issus = {}
            issus[currentIssus] = true
            this.addOrder(true)
            if (JSON.stringify(this.oneKeyList) === '{}') {
                return false
            }
            this.Api.bet(this.currentLottery.en_name, issus, [this.oneKeyList], this.orderList.cost).then((res) => {
                if (res.isSuccess) {
                    this.oneKeyList = {}
                    this.$alert('投注成功, 您可以通过”游戏记录“查询您的投注记录！', '提示', {
                        confirmButtonText: '确定'
                    })
                    // 获取我的投注 我的追号记录
                    this.$store.dispatch('betHistory')
                    // 刷新余额
                    this.Api.getBalance().then((res) => {
                        if (res.isSuccess) {
                            let account = this.Utils.storage.get('current-user');
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
        }
    }
}
</script>

<style>

</style>