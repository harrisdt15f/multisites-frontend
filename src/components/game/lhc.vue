<template>
	<section class="pr lhc">
		<section v-if="currentMethod.method === 'TM' || currentMethod.method.indexOf('ZT') > -1" class="fl">
			<ul class="fw ball-titles BB-titles">
				<li class="ball-title">号码</li>
				<li class="ball-title">金额</li>
				<li class="ball-title">号码</li>
				<li class="ball-title">金额</li>
				<li class="ball-title">号码</li>
				<li class="ball-title">金额</li>
				<li class="ball-title">号码</li>
				<li class="ball-title">金额</li>
				<li class="ball-title">号码</li>
				<li class="ball-title">金额</li>
			</ul>
			<ul class="fw lhc-tm-lists">
				<li class="lhc-tm-list" :class="{on: item.flag}" v-for="(item, index) in newCodes" :key="index">
					<span class="fl lhc-tm-list-q" :class="ballColor(item)">{{item.code}}</span>
					<span class="fl multiple">x 44.10</span>
					<input type="text" v-model="item.money" maxlength="8" class="lhc-tm-list-text">
		  	</li>
			</ul>
			<section class="fw tc submit">
				总金额 {{Utils.toFixed(String(currentOrder.money))}}
				<a href="javascript:;" class="silde-submit" @click="submit()">立即下注</a>
				<a href="javascript:;" class="silde-reset" @click="clearNumber()"><i class="fa fa-refresh"></i>重置</a>
			</section>
		</section>
		<section v-else-if="currentMethod.method === 'BB'" style="background:#fff;">
			<section class="ball-titles">
				<section class="fw fl lhc-bb ft0">
					<ul class="fw ball-titles">
						<li class="ball-title">号码</li>
						<li class="ball-title">金额</li>
					</ul>
					<ul class="fw lhc-tm-lists">
						<li class="lhc-tm-list" :class="{on: item.flag}" v-if="index < 9" v-for="(item, index) in newCodes" :key="index">
							<span class="lhc-bb-ball-name">{{item.name}}</span><span class="lhc-bb-ball-name">x 6.17</span>
							<ul class="fw lhc-bb-balls">
								<li class="lhc-bb-ball ft14" :class="ballColor(item)" v-for="(cd, cdIndex) in item.code" :key="cdIndex">
									{{cd}}
								</li>
							</ul>
							<input type="text" class="lhc-bb-ball-money ft14" v-model="item.money">
						</li>
					</ul>
				</section>
				<section class="fw fl lhc-bb ft0">
					<ul class="fw ball-titles">
						<li class="ball-title">号码</li>
						<li class="ball-title">金额</li>
					</ul>
					<ul class="fw lhc-tm-lists">
						<li class="lhc-tm-list" :class="{on: item.flag}" v-if="index > 8" v-for="(item, index) in newCodes" :key="index">
							<span class="lhc-bb-ball-name">{{item.name}}</span><span class="lhc-bb-ball-name">x 6.17</span>
							<ul class="fw lhc-bb-balls">
								<li class="lhc-bb-ball ft14" :class="ballColor(item)" v-for="(cd, cdIndex) in item.code" :key="cdIndex">
									{{cd}}
								</li>
							</ul>
							<input type="text" class="lhc-bb-ball-money ft14" v-model="item.money">
						</li>
					</ul>
				</section>
			</section>
	
		</section>
		<section v-else-if="currentMethod.method === 'TX'" style="background:#fff;">
			<section class="ball-titles">
				<section class="fw fl lhc-bb ft0">
					<ul class="fw ball-titles">
						<li class="ball-title">号码</li>
						<li class="ball-title">金额</li>
					</ul>
					<ul class="fw lhc-tm-lists">
						<li class="lhc-tm-list" :class="{on: item.flag}" v-if="index < 9" v-for="(item, index) in newCodes" :key="index">
							<span class="lhc-bb-ball-name">{{item.name}}</span><span class="lhc-bb-ball-name">x 6.17</span>
							<ul class="fw lhc-bb-balls">
								<li class="lhc-bb-ball ft14" :class="ballColor(item)" v-for="(cd, cdIndex) in item.code" :key="cdIndex">
									{{cd}}
								</li>
							</ul>
							<input type="text" class="lhc-bb-ball-money ft14" v-model="item.money">
						</li>
					</ul>
				</section>
			</section>
		</section>
		<section class="silde">
			<section class="fw">
				<p class="fw">金额(元)：<input type="text" v-model="currentOrder.betMoney" maxlength="8" class="silde-money-text"></p>
				<a href="javascript:;" class="silde-reset" @click="clearNumber()"><i class="fa fa-refresh"></i>重置</a>
				<a href="javascript:;" class="silde-submit" @click="submit()">立即下注</a>
			</section>
			<section class="silde-plays">
				<template v-if="currentMethod.method === 'TM' || currentMethod.method.indexOf('ZT') > -1">
					<section class="fw silde-play red">
						<span @click="selectNumberSub(item)" v-for="(item, index) in currentMethod.buttons.red" :key="index">
							<el-radio v-model="playValue"
							          :label="index"
							>
								{{item}}
							</el-radio>
						</span>
					</section>
					<section class="fw silde-play green">
						<span @click="selectNumberSub(item)" v-for="(item, index) in currentMethod.buttons.green" :key="index">
						<el-radio v-model="playValue"
						          :label="index + currentMethod.buttons.red.length"
						>
							{{item}}
						</el-radio>
					</span>
					</section>
					<section class="fw silde-play blue">
						<span @click="selectNumberSub(item)" v-for="(item, index) in currentMethod.buttons.blue" :key="index">
						<el-radio v-model="playValue"
						          :label="index + currentMethod.buttons.red.length + currentMethod.buttons.green.length"
						>
							{{item}}
						</el-radio>
					</span>
					</section>
					<ul class="fw plays">
						<li class="play"
						    :class="{
						    red: item.code === '大' || item.code === '小' || item.code === '单' || item.code === '双',
						    on: item.flag
						    }"
						    v-for="(item, index) in plays"
						    :key="index"
						    @click="selectNumber(item)"
						>{{item.code}}</li>
					</ul>
				</template>
				<template v-if="currentMethod.method === 'BB'">
					<section class="fw silde-play">
						<span @click="selectNumberSub(item)" v-for="(item, index) in currentMethod.buttons.wave" :key="index">
							<el-radio v-model="playValue"
							          :label="index"
							>
								{{item}}
							</el-radio>
						</span>
					</section>
					<ul class="fw plays">
						<li class="play"
						    :class="{
						    red: item.code === '大' || item.code === '小' || item.code === '单' || item.code === '双',
						    on: item.flag,
						    w50: index === plays.length -1 || index === plays.length - 2}"
						    v-for="(item, index) in plays"
						    :key="index"
						    @click="selectNumber(item)"
						>{{item.code}}</li>
					</ul>
				</template>
			</section>
		</section>
		<el-dialog
						title="下注清单"
						:visible.sync="submitDialog"
						width="30%">
			<section class="bet-header">
				共计：￥ {{currentOrder.list.length}} 注, 你确定要下注吗?
			</section>
			<ul class="fw bet-lists">
				<li class="bet-list"
				    v-if="currentMethod.method === 'TM' || currentMethod.method.indexOf('ZT') > -1"
				    v-for="(item, index) in currentOrder.list"
				    :key="index"
				>
					{{currentMethod.name}}({{item.code}}) 44.10 x {{item.money}}
				</li>
				<li class="bet-list"
				    v-if="currentMethod.method === 'BB'"
				    v-for="(item, index) in currentOrder.list"
				    :key="index"
				>
					{{currentMethod.name}}({{item.name}}) 6.17 x {{parseInt(item.money)}}
				</li>
			</ul>
			<span slot="footer" class="dialog-footer">
    <el-button @click="submitClose()" size="small">取 消</el-button>
    <el-button type="primary" @click="confirmSubmit()" size="small">确 定</el-button>
  </span>
		</el-dialog>
	</section>
</template>

<script>
import { mapState } from 'vuex'
import method from "../../lib/config/method";
export default {
    name: 'lhc',
		data () {
        return {
            // 整理后的currentMethod.layout.codes
		        newCodes: [],
            // 红球
            redBall: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46],
		        // 蓝球
            blueBall: [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41 ,42, 47, 48],
		        // 绿球
            greenBall: [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49],
		        playValue: '1',
		        plays: [],
            play: {
		            clear: true
            },
            currentOrder:{
		            money: 0,
                betMoney: 0,
                currentMode:1,
                currentCost:0,
                currentCount:0,
                currentTimes:1,
                currentGroup:1950,
                currentCodes:{},
		            list: []
            },
            submitDialog: false
        }
		},
    computed: {
        ...mapState([
            'currentMethod',
		        'bet',
		        'currentLottery'
        ])
    },
		watch: {
        'currentMethod' (newVal) {
            // 将号码顺序转换 和 初始渲染数据处理
            this.ballSort()
        },
        'bet.methodsTab' () {
            this.clearNumber()
        },
        // 输入金额时
				'currentOrder.betMoney' (newVal) {
				    if (Number(newVal) > 0) {
                for (let i = 0; i < this.newCodes.length; i++) {
                    if (this.newCodes[i].flag) {
                        this.newCodes[i].money = Number(newVal)
                    }
                }
            }
				    if (Number(newVal) < 1) {
						    this.currentOrder.betMoney = 0
            } else if (Number(newVal) > 1000000) {
                this.currentOrder.betMoney = 1000000
				    }
				},
        // 金钱发生变化时
        'newCodes': {
            handler (newVal) {
                // 计算总投注额
                this.currentOrder.money = 0
                for (let i = 0; i < newVal.length; i++) {
                    if (isNaN(newVal[i].money)) {
                        newVal[i].money = 0
                        newVal[i].flag = false
                    } else if (newVal[i].money) {
                        if (Number(newVal[i].money) < 1) {
                            newVal[i].money = 0
                        } if (Number(newVal[i].money) > 1000000) {
                            newVal[i].money = 1000000
		                    }
                        newVal[i].flag = Number(newVal[i].money) > 0
                        this.currentOrder.money += Number(newVal[i].money)
                    }
                }
            },
            deep: true
        }
		},
    created () {
        // 将号码顺序转换 和 初始渲染数据处理
		    this.ballSort()
    },
		methods: {
        // 确认下注
				confirmSubmit () {
            let order = {
                method_id: this.currentMethod.method,
                method_name: this.currentMethod.name,
                codes: this.currentOrder.list,
                count: this.currentOrder.list.length,
                times: 1,
                cost:  this.Utils.toFixed(String(this.currentOrder.money)),
                mode: 1,
                prize_group: this.currentOrder.currentGroup,
                price: 2
            }
            let issus = '000'
            this.Api.bet(this.currentLottery.en_name, issus, [order], order.cost).then((res) => {
                if (res.isSuccess) {
                    this.submitDialog = false
                    this.$alert('投注成功, 您可以通过”游戏记录“查询您的投注记录！', '提示', {
                        confirmButtonText: '确定'
                    })
		                // 清空号码
		                this.clearNumber()
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
				},
				// 取消下注
        submitClose() {
            this.submitDialog = false
        },
        // 立即下注
				submit () {
            this.currentOrder.list = []
            for (let j = 0; j < this.newCodes.length; j++) {
                if (this.newCodes[j].flag) {
                    this.currentOrder.list.push(this.newCodes[j])
		                if (!this.newCodes[j].money) {
                        this.$alert('你还未投注 或 投注错误', '提示', {
                            confirmButtonText: '确定'
                        })
                        return false
		                }
                }
            }
            if (this.currentOrder.list.length < 1) {
                this.$alert('你还未投注 或 投注错误', '提示', {
                    confirmButtonText: '确定'
                })
                return false
            }
            this.submitDialog = true
				},
        // 清空 重置 已选
				clearNumber () {
            for (let j = 0; j < this.newCodes.length; j++) {
                this.$set(this.newCodes[j], 'flag', false)
                this.$set(this.newCodes[j], 'money', 0)
            }
            for (let i = 0; i < this.plays.length; i++) {
                this.$set(this.plays[i], 'flag', false)
            }
            this.playValue = -1
            this.currentOrder.betMoney = 0
				},
        // 特马 正特 大小 生肖 选择号码  半波 大小单双 合单 合双选择器
        selectNumber (item) {
            let [
                temp = []
            ] = []
            console.log(item)
           if (this.currentMethod.method === 'TM' || this.currentMethod.method.indexOf('ZT') > -1) {
               if (item.code === '大' || item.code === '小' || item.code === '单' || item.code === '双') {
                   this.play.clear = true
                   switch (item.code) {
                       case '大':
                           temp = this.newCodes.filter((i) => {
                               return i.code > 24
                           })
                           break
                       case '小':
                           temp = this.newCodes.filter((i) => {
                               return i.code <= 24
                           })
                           break
                       case '单':
                           temp = this.newCodes.filter((i) => {
                               return i.code % 2 !== 0
                           })
                           break
                       case '双':
                           temp = this.newCodes.filter((i) => {
                               return i.code % 2 === 0
                           })
                           break

                   }
                   // 选中和取消选中
                   if (!item.flag) {
                       this.clearNumber()
                       for (let i = 0; i < temp.length; i++) {
                           for (let j = 0; j < this.newCodes.length; j++) {
                               if(parseInt(temp[i].code) === parseInt(this.newCodes[j].code)) {
                                   this.$set(this.newCodes[j], 'flag', true)
                               }
                           }
                       }
                       item.flag = true
                   } else {
                       this.clearNumber()
                       item.flag = false
                   }
               } else {
                   // 如果第一次点击生肖，清空已选号
                   if (this.play.clear) {
                       this.clearNumber()
                   }
                   this.play.clear = false
                   switch (item.code) {
                       case '鼠':
                           temp = [12, 24, 36 , 48]
                           break
                       case '牛':
                           temp = [11, 23, 35, 47]
                           break
                       case '虎':
                           temp = [10, 22, 34, 46]
                           break
                       case '兔':
                           temp = [9, 21, 33, 45]
                           break
                       case '龙':
                           temp = [8, 20, 32, 44]
                           break
                       case '蛇':
                           temp = [7, 19, 31, 43]
                           break
                       case '马':
                           temp = [6, 18, 30, 42]
                           break
                       case '羊':
                           temp = [5, 17, 29, 41]
                           break
                       case '猴':
                           temp = [4, 16, 28, 40]
                           break
                       case '鸡':
                           temp = [3, 15, 27, 39]
                           break
                       case '狗':
                           temp = [2, 14, 26, 38]
                           break
                       case '猪':
                           temp = [1, 13, 25, 37, 49]
                           break
                   }
                   // 选中和取消选中
                   if (!item.flag) {
                       for (let i = 0; i < temp.length; i++) {
                           for (let j = 0; j < this.newCodes.length; j++) {
                               if(parseInt(temp[i]) === parseInt(this.newCodes[j].code)) {
                                   this.$set(this.newCodes[j], 'flag', true)
                               }
                           }
                       }
                       item.flag = true
                   } else {
                       item.flag = false
                       for (let i = 0; i < temp.length; i++) {
                           for (let j = 0; j < this.newCodes.length; j++) {
                               if(parseInt(temp[i]) === parseInt(this.newCodes[j].code)) {
                                   this.$set(this.newCodes[j], 'flag', false)
                               }
                           }
                       }
                   }
               }
           } else if (this.currentMethod.method === 'BB') {
		           // 半波
		           if(item.code === '大') {
		               temp = this.newCodes.filter(i => {
		                   return i.name.indexOf('大') > -1
		               })
		           } else if(item.code === '小') {
                   temp = this.newCodes.filter(i => {
                       return i.name.indexOf('小') > -1
                   })
               } else if(item.code === '单') {
                   temp = this.newCodes.filter(i => {
                       return i.name.indexOf('红单') > -1 || i.name.indexOf('蓝单') > -1 || i.name.indexOf('绿单') > -1
                   })
               } else if(item.code === '双') {
                   temp = this.newCodes.filter(i => {
                       return i.name.indexOf('红双') > -1 || i.name.indexOf('蓝双') > -1 || i.name.indexOf('绿双') > -1
                   })
               } else if(item.code === '合单') {
                   temp = this.newCodes.filter(i => {
                       return i.name.indexOf('合单') > -1
                   })
               } else if(item.code === '合双') {
                   temp = this.newCodes.filter(i => {
                       return i.name.indexOf('合双') > -1
                   })
               }
               this.clearNumber()
		           item.flag = true
               for (let i = 0; i < temp.length; i++) {
                   for (let j = 0; j < this.newCodes.length; j++) {
                       if(temp[i].name === this.newCodes[j].name) {
                           this.$set(this.newCodes[j], 'flag', true)
                       }
                   }
               }
           }
         
        },
        // 特马 正特 分颜色 选择号码
				selectNumberSub (item) {
				    let [
                temp = []
				    ] = []
            // 特马 正特
            if (this.currentMethod.method === 'TM' || this.currentMethod.method.indexOf('ZT') > -1) {
                let obj = []
                this.play.clear = true
                if (item.indexOf('合') === -1) {
                    if (item.indexOf('红') > -1) {

                        obj = this.redBall

                    } else if (item.indexOf('蓝') > -1) {

                        obj = this.blueBall

                    } else if (item.indexOf('绿') > -1) {

                        obj = this.greenBall

                    }
                    if (item.indexOf('大') > -1) {
                        temp = obj.filter((i) => {
                            return i > 24
                        })

                    } else if (item.indexOf('小') > -1) {
                        temp = obj.filter((i) => {
                            return i <= 24
                        })

                    } else if (item.indexOf('单') > -1) {
                        temp = obj.filter((i) => {
                            return i % 2 !== 0
                        })

                    } else if (item.indexOf('双') > -1) {
                        temp = obj.filter((i) => {
                            return i % 2 === 0
                        })

                    }
                } else {
                    if (item.indexOf('红合单') > -1) {

                        temp = [1, 7, 12, 18, 23, 29, 30, 34, 45]

                    } else if (item.indexOf('红合双') > -1) {

                        temp = [2, 8, 13, 19, 24, 35, 40, 46]

                    } else if (item.indexOf('绿合单') > -1) {

                        temp = [5, 16, 21, 27, 32, 38, 43]

                    } else if (item.indexOf('绿合双') > -1) {

                        temp = [6, 11, 17, 22, 28, 33, 39, 44]

                    } else if (item.indexOf('蓝合单') > -1) {

                        temp = [3, 9, 10, 14, 25, 36, 41, 47]

                    } else if (item.indexOf('蓝合双') > -1) {

                        temp = [4, 15, 20, 26, 31, 37,42, 48]

                    }
                }
                this.clearNumber()
                for (let i = 0; i < temp.length; i++) {
                    for (let j = 0; j < this.newCodes.length; j++) {
                        if(temp[i] === parseInt(this.newCodes[j].code)) {
                            this.$set(this.newCodes[j], 'flag', true)
                        }
                    }
                }
            } else if (this.currentMethod.method === 'BB') {
                // 半波
                if (item.indexOf('红波') > -1) {
                    temp = this.newCodes.filter(i => {
                        return i.name.indexOf('红大') > -1 || i.name.indexOf('红小') > -1
                    })
                } else if (item.indexOf('绿波') > -1) {
                    temp = this.newCodes.filter(i => {
                        return i.name.indexOf('绿大') > -1 || i.name.indexOf('绿小') > -1
                    })
                } else if (item.indexOf('蓝波') > -1) {
                    temp = this.newCodes.filter(i => {
                        return i.name.indexOf('蓝大') > -1 || i.name.indexOf('蓝小') > -1
                    })
                }
                this.clearNumber()
                for (let i = 0; i < temp.length; i++) {
                    for (let j = 0; j < this.newCodes.length; j++) {
                        if(temp[i].name === this.newCodes[j].name) {
                            this.$set(this.newCodes[j], 'flag', true)
                        }
                    }
                }
            }
				},
        // 将号码顺序转换 和 初始渲染数据处理
				ballSort () {
            this.newCodes = []
            this.plays = []
				    // 特马 正特
						if (this.currentMethod.method === 'TM' || this.currentMethod.method.indexOf('ZT') > -1) {
                let sub = this.currentMethod.buttons.sub
                for (let i = 0; i < sub.length; i++) {
                    let json = {}
                    json.code = sub[i]
                    json.flag = false
                    this.plays.push(json)
                }
                // 大小生肖选择数据处理
                let [
                    codes = this.currentMethod.layout.codes,
                    tempCode = [],
                    newCodes = []
                ] = []
                for (let i = 0; i < Math.ceil(codes.length / 5); i++) {
                    tempCode.push([])
                }
                for (let i = 0; i < codes.length; i++) {
                    if (i < 9 && String(codes[i]).substr(0, 1) !== '0') {
                        codes[i] = '0' + codes[i]
                    }
                    tempCode[i % Math.ceil(codes.length / 5)].push(codes[i])
                }
                for (let i = 0; i < tempCode.length; i++) {
                    newCodes = newCodes.concat(tempCode[i])
                }
                for (let i = 0; i < newCodes.length; i++) {
                    let json = {}
                    json.flag = false
                    json.code = newCodes[i]
                    json.money = 0
                    this.newCodes.push(json)
                }
						} else if (this.currentMethod.method === 'BB') {
                // 半波
                let [
                    codes = this.currentMethod.layout.codes,
                    obj = []
                ] = []
                let sub = this.currentMethod.buttons.sub
                for (let i = 0; i < sub.length; i++) {
                    let json = {}
                    json.code = sub[i]
                    json.flag = false
                    this.plays.push(json)
                }
                for (let i = 0; i < codes.length; i++) {
                    let json = {}
                    if (codes[i].indexOf('合') === -1) {

                        if (codes[i].indexOf('红') > -1) {

                            obj = this.redBall
                            json.name = '红'

                        } else if (codes[i].indexOf('蓝') > -1) {

                            obj = this.blueBall
                            json.name = '蓝'

                        } else if (codes[i].indexOf('绿') > -1) {

                            obj = this.greenBall
                            json.name = '绿'

                        }
                        if (codes[i].indexOf('大') > -1) {
                            json.name = json.name + '大'
                            json.code = obj.filter((i) => {
                                return i > 24
                            })

                        } else if (codes[i].indexOf('小') > -1) {
                            json.name = json.name + '小'
                            json.code = obj.filter((i) => {
                                return i <= 24
                            })

                        } else if (codes[i].indexOf('单') > -1) {
                            json.name = json.name + '单'
                            json.code = obj.filter((i) => {
                                return i % 2 !== 0
                            })

                        } else if (codes[i].indexOf('双') > -1) {
                            json.name = json.name + '双'
                            json.code = obj.filter((i) => {
                                return i % 2 === 0
                            })
                        }
                        this.newCodes.push(json)
                    } else {
                        if (codes[i].indexOf('红合单') > -1) {
                            json.name = '红合单'
                            json.code = [1, 7, 12, 18, 23, 29, 30, 34, 45]

                        } else if (codes[i].indexOf('红合双') > -1) {
                            json.name = '红合双'
                            json.code = [2, 8, 13, 19, 24, 35, 40, 46]

                        } else if (codes[i].indexOf('绿合单') > -1) {
                            
                            json.name = '绿合单'
                            json.code = [5, 16, 21, 27, 32, 38, 43]

                        } else if (codes[i].indexOf('绿合双') > -1) {
                            json.name = '绿合双'
                            json.code = [6, 11, 17, 22, 28, 33, 39, 44]

                        } else if (codes[i].indexOf('蓝合单') > -1) {
                            
                            json.name = '蓝合单'
                            json.code = [3, 9, 10, 14, 25, 36, 41, 47]

                        } else if (codes[i].indexOf('蓝合双') > -1) {
                            
                            json.name = '蓝合双'
                            json.code = [4, 15, 20, 26, 31, 37, 42, 48]

                        }
                        this.newCodes.push(json)
                    }
                }
						}
      
				},
        // 计算 球 背景色
        ballColor(item) {
            if (this.redBall.includes(parseInt(item.code))) {
                return 'lhc-tm-list-q-red'
            } else if (this.blueBall.includes(parseInt(item.code))) {
                return 'lhc-tm-list-q-blue'
            } else if (this.greenBall.includes(parseInt(item.code))) {
                return 'lhc-tm-list-q-green'
            }
        }
    },
    mounted () {
        let [
            mainRight = document.getElementsByClassName('main-right')[0],
            gameHeaderL = document.getElementsByClassName('game-header-l')[0],
            gameHeaderR = document.getElementsByClassName('game-header-r')[0],
            mainCenter = document.getElementsByClassName('main-center')[0]
        ] = []
        mainRight.style.display = 'none'
        mainCenter.style.width = '990px'
        gameHeaderL.style.width = '990px'
        gameHeaderR.style.width = '200px'
    },
    destroyed () {
        let [
            mainRight = document.getElementsByClassName('main-right')[0],
            gameHeaderL = document.getElementsByClassName('game-header-l')[0],
            gameHeaderR = document.getElementsByClassName('game-header-r')[0],
            mainCenter = document.getElementsByClassName('main-center')[0]
        ] = []
        mainRight.style.display = 'block'
        mainCenter.style.width = '890px'
        gameHeaderL.style.width = '890px'
        gameHeaderR.style.width = '300px'
    }
}
</script>

<style scoped>

	/*	右侧*/
	.silde{
		position:absolute;
		top: -119px;
		right: -210px;
		padding:20px 8px;
		width:184px;
		background:#fff;
	}
	.silde-money-text{
		margin-left: 5px;
		width: 102px;
		height:27px;
		text-align: center;
		border:2px solid #cfd2d8;
		border-radius:3px;
	}
	.silde-reset,
	.silde-submit{
		display:inline-block;
		margin:10px 0 0 12px;
		width:40%;
		height:28px;
		line-height:28px;
		border:1px solid #cfd2d8;
		border-radius:3px;
		text-align:center;
		color:#333;
	}
	.silde-submit{
		margin-left:8px;
		background:red;
		border-color:red;
		font-size:12px;
		color:#fff;
	}
	.silde-reset:hover{
		background:#cfd2d8;
	}
	.silde-submit:hover{
		background:#d48888;
		border-color:#d48888;
	}
	.silde-reset .fa-refresh{
		padding-right:3px;
	}
	.silde-plays{
		margin-top:25px;
		padding-bottom:15px;
		left: 9px;
		border: 1px solid #D9D9D9;
		overflow: hidden;
		background: #ffffff;
	}
	.silde-play{
		padding-top:15px;
	}
	.el-radio {
		position:relative;
		margin-right: 0;
		width:75px;
		padding-left:12px;
		color: inherit;
	}
	.silde-play /deep/ .el-radio__label{
		padding-left:3px;
	}
	.red{
		color: #d7414b !important;
	}
	.green{
		color: #32AB87 !important;
	}
	.blue{
		color: #3458D7 !important;
	}
	.radioi:checked + .radio-label:before {
		background-clip: content-box;
	}
	.red /deep/ .el-radio__input.is-checked .el-radio__inner{
		border-color: #d7414b;
		background-color: #d7414b;
	}
	.red /deep/ .el-radio__input.is-checked+.el-radio__label {
		color: #d7414b;
	}
	.green /deep/ .el-radio__input.is-checked .el-radio__inner{
		 border-color: #32AB87;
		 background-color: #32AB87;
	}
	.green /deep/ .el-radio__input.is-checked+.el-radio__label {
		color: #32AB87;
	}
	.blue /deep/ .el-radio__input.is-checked .el-radio__inner{
		border-color: #3458D7;
		background-color: #3458D7;
	}
	.blue /deep/ .el-radio__input.is-checked+.el-radio__label {
		color: #3458D7;
	}
	.plays{
		margin:18px auto 0;
		width:160px;
		border-left: 1px solid #E0E0E0;
		border-top: 1px solid #E0E0E0;
	}
	.play{
		float:left;
		width: 40px;
		height: 30px;
		border-right: 1px solid #E0E0E0;
		border-bottom: 1px solid #E0E0E0;
		box-sizing:border-box;
		line-height: 30px;
		text-align: center;
		font-size: 14px;
		color: #7D7D7D;
		cursor: pointer;
	}
	.play.on{
		background:#fff9b8;
	}
	/*六合彩*/
	.ball-titles{
		height:38px;
		line-height: 38px;
		background: #ebebeb\0;
		background-image: linear-gradient(-180deg, #fafafa , #d9d9d9);
		border-top: 1px solid #d9d9d9;
	}
	.ball-title{
		float:left;
		width:95px;
		text-align:center;
	}
	.ball-title:nth-of-type(1){
		padding-left:10px;
	}
	.BB-titles .ball-title{
		width:25%;
	}
	.lhc-tm-lists{
		padding:15px 0 15px 10px;
		background:#fff;
	}
	.lhc-tm-list{
		float:left;
		margin:0 0 8px 2px;
		width:190px;
		text-align: center;
		color: #6D7288;
		line-height:42px;
	}
	.lhc-tm-list.on{
		background:#fff9b8;
	}
	.multiple{
		text-align:center;
		width:67px;
	}
	.lhc-tm-list-q,
	.lhc-bb-ball {
		margin: 6px 0 0 11px;
		width: 32px;
		height:32px;
		line-height:32px;
		color: #fff;
		font-size:15px;
	}
	.lhc-tm-list-q-red{
		background:url(../../assets/images/hj.png) no-repeat -104px -44px;
	}
	.lhc-tm-list-q-green{
		background:url(../../assets/images/hj.png) no-repeat -51px -44px;
	}
	.lhc-tm-list-q-blue{
		background:url(../../assets/images/hj.png) no-repeat 0 -44px;
	}
	.lhc-tm-list-text,
	.lhc-bb-ball-money{
		float: right;
		margin:6px 7px 0 0;
		width: 72px;
		height: 32px;
		border:1px solid #e8e8e8;
		background:#ededed;
		font-size: 14px;
		text-align: center;
		border-radius:3px;
		box-shadow:1px 1px 2px #e8e8e8 inset;
		color:#999;
	}
	.submit .silde-reset,
	.submit .silde-submit{
		margin-bottom:20px;
		width:160px;
		height:50px;
		line-height:50px;
		font-size:22px;
	}
	.submit .silde-submit{
		margin-right:13px;
	}
	/*投注弹窗*/
	.bet-header{
		padding:0 0 9px 4%;
		font-size: 16px;
		text-align: left;
		border-bottom: 1px solid #C6C6C6;
	}
	.lhc /deep/ .el-dialog__footer{
		padding-bottom:10px;
	}
	.lhc /deep/ .el-dialog__body{
		padding: 10px 3px;
	}
	.lhc /deep/ .el-dialog__header{
		padding:15px 10px 10px;
	}
	.lhc /deep/ .el-dialog__headerbtn{
		top: 10px;
	}
	.bet-lists{
		text-align: left;
		font-size: 15px;
		margin-top: 10px;
		padding-left: 3%;
	}
	.bet-list{
		float:left;
		margin-top:2px;
		width: 49%;
	}
	 /*半波*/
	.lhc-bb{
		width:50%;
	}
	.lhc-bb .lhc-tm-lists{
		padding-left:0;
	}
	.lhc-bb .lhc-tm-list{
		padding-left:12px;
		width:482px;
		text-align:left;
	}
	.lhc-bb .ball-titles{
		border-top:none;
	}
	.lhc-bb .ball-title{
		width:50%;
	}
	.lhc-bb .ball-title:nth-of-type(2){
		text-indent:150px;
	}
	.lhc-bb .ball-title:nth-of-type(1){
		padding-left:0;
	}
	.lhc-bb-ball{
		display:inline-block;
		vertical-align:middle;
		margin:0;
		width:31px;
		text-align:center;
	}
	.lhc-bb-balls{
		display:inline-block;
		vertical-align:middle;
		width:311px;
	}
	.lhc-bb-ball-name{
		display:inline-block;
		vertical-align: middle;
		width:44px;
		font-size:13px;
	}
	.lhc-bb-ball-money{
		display:inline-block;
		vertical-align: middle;
	}
</style>