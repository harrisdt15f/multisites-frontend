<template>
	<section class="w fw ylc-main">
	
	
<!--娱乐城导航-->
		<nav class="ylc-nav">
			<a href="javascript:;"
			   class="ylc-list"
			   v-if="currentLottery.series_id !== 'pcdd'"
			   :class="{on: ylcListOn === item.sign}"
			   @click="checkedPlay(item, index)"
			   v-for="(item, index) in allMethods" :key="index"
			>{{item.name}}</a>
			
			
<!--pc蛋蛋导航-->
			<a href="javascript:;"
			   class="ylc-list on"
			   v-if="currentLottery.series_id === 'pcdd'"
			   >
				整合
			</a>
			<a href="javascript:;" class="ylc-kx" @click="kxInfo.show = true">快选金额</a>
			<section class="bet-plays">
				<div class="bet-play">官方</div><div class="bet-play" @click="chengePlay()">娱乐城</div>
			</section>
		</nav>
		
<!--投注区-->
		<section class="ylc-content">
			<section class="ylc-content-left">
				<section class="fw ylc-content-top">
				
<!--娱乐城-->
					<section v-if="
							currentMethod.type === 'ylc' &&
							currentMethod.method === 'ZH' ||
							currentMethod.method === 'LMP'"
			        class="fl fw w16"
			        v-for="(list, index) in pcdd.allCodeList"
			        :key="index">
						<p class="ylc-title w100">{{list.name}}</p>
						<ul class="ylc-title w100 ntb">
							<li class="ylc-title-list">号码</li>
							<li class="ylc-title-list">赔率</li>
							<li class="ylc-title-list">金额</li>
						</ul>
						<ul class="ylc-bet w100">
							<li class="ylc-bet-list ylc-c-bet-list w100"
							    :class="{active: item.flag}"
							    @click="listChecked(item)"
							    v-for="(item, lLndex) in list.code"
							    :key="lLndex"
							>
								<section class="w33 fl">
									<span class="ylc-bet-list-num" :class="{'ylc-bet-list-num-number': !isNaN(item.code)}">{{item.code}}</span>
								</section>
								<span class="fl w33 red ylc-bet-list-odds">{{Utils.toFixed(String(item.odds), 4)}}</span>
								<section class="w33 fl">
									<input type="text" class="ylc-bet-list-money" v-model="item.money">
								</section>
							</li>
							<li class="ylc-bet-list ylc-c-bet-list w100" v-if="currentMethod.method === 'ZH'" v-for="cc in (14 - list.code.length)"></li>
						</ul>
					</section>
					
<!--龙虎斗-->
					
					<section class="tc" v-if="currentMethod.type === 'ylc' && currentMethod.method === 'LHD'">
						<section class="dinv ylc-lhd-list"  v-for="(list, index) in pcdd.allCodeList.w" :key="index">
							<h3 class="ylc-lhd-list-title">{{list.name}}</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q"
								    @click="listChecked(item)"
								    :class="{active: item.flag}"
								    v-for="(item, iIndex) in list.code"
								    :key="iIndex">
									<span class="ylc-lhd-list-q-y"
									      :class="{
									      'ylc-lhd-list-q-y-red': item.name === '龙',
									      'ylc-lhd-list-q-y-green': item.name === '和',
									      'ylc-lhd-list-q-y-blue': item.name === '虎'
									      }"
									>{{item.name}}</span>
									<span class="red">{{item.odds}}</span>
									<input type="text" class="ylc-bet-list-money" v-model="item.money">
								</li>
							</ul>
						</section>
						
						<section class="dinv ylc-lhd-list"  v-for="list in pcdd.allCodeList.q">
							<h3 class="ylc-lhd-list-title">{{list.name}}</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q"
								    @click="listChecked(item)"
								    :class="{active: item.flag}"
								    v-for="(item, iIndex) in list.code"
								    :key="iIndex">
									<span class="ylc-lhd-list-q-y"
									      :class="{
									      'ylc-lhd-list-q-y-red': item.name === '龙',
									      'ylc-lhd-list-q-y-green': item.name === '和',
									      'ylc-lhd-list-q-y-blue': item.name === '虎'
									      }"
									>{{item.name}}</span>
									<span class="red">{{item.odds}}</span>
									<input type="text" class="ylc-bet-list-money" v-model="item.money">
								</li>
							</ul>
						</section>
						
						<br v-if="pcdd.allCodeList.b">
						<section class="dinv ylc-lhd-list"  v-for="list in pcdd.allCodeList.b">
							<h3 class="ylc-lhd-list-title">{{list.name}}</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q"
								    @click="listChecked(item)"
								    :class="{active: item.flag}"
								    v-for="(item, iIndex) in list.code"
								    :key="iIndex">
									<span class="ylc-lhd-list-q-y"
									      :class="{
									      'ylc-lhd-list-q-y-red': item.name === '龙',
									      'ylc-lhd-list-q-y-green': item.name === '和',
									      'ylc-lhd-list-q-y-blue': item.name === '虎'
									      }"
									>{{item.name}}</span>
									<span class="red">{{item.odds}}</span>
									<input type="text" class="ylc-bet-list-money" v-model="item.money">
								</li>
							</ul>
						</section>
						
						<br v-if="pcdd.allCodeList.s">
						<section class="dinv ylc-lhd-list"  v-for="list in pcdd.allCodeList.s">
							<h3 class="ylc-lhd-list-title">{{list.name}}</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q"
								    @click="listChecked(item)"
								    :class="{active: item.flag}"
								    v-for="(item, iIndex) in list.code"
								    :key="iIndex">
									<span class="ylc-lhd-list-q-y"
									      :class="{
									      'ylc-lhd-list-q-y-red': item.name === '龙',
									      'ylc-lhd-list-q-y-green': item.name === '和',
									      'ylc-lhd-list-q-y-blue': item.name === '虎'
									      }"
									>{{item.name}}</span>
									<span class="red">{{item.odds}}</span>
									<input type="text" class="ylc-bet-list-money" v-model="item.money">
								</li>
							</ul>
						</section>
					</section>
					
					
					
<!--第一球 到 第五球-->
					
					<section class="fw"
					         v-if="
					         currentMethod.type === 'ylc' &&
					         currentMethod.method === 'DYQ' ||
					         currentMethod.method === 'DEQ' ||
					         currentMethod.method === 'DSQ' ||
					         currentMethod.method === 'DSIQ' ||
					         currentMethod.method === 'DWQ' ||
					         currentMethod.method === 'QWZY'
                 ">
						<section class="fw">
							<ul class="fw ylc-title w20"  v-for="c in 5">
								<li class="ylc-title-list">号码</li>
								<li class="ylc-title-list">赔率</li>
								<li class="ylc-title-list">金额</li>
							</ul>
						</section>
						<ul class="ylc-bet w100">
							<li class="ylc-bet-list ylc-c-bet-list w20 fl nrb"
							    style="overflow: initial;"
							    :class="{active: item.flag, 'clear': item.code === '总大'}"
							    @click="listChecked(item)"
							    v-for="(item, index) in pcdd.allCodeList"
							    :key="index"
							>
								<section class="w33 fl">
									<span class="ylc-bet-list-num" :class="{'ylc-bet-list-num-number': !isNaN(item.code)}">{{item.code}}</span>
								</section>
								<span class="fl w33 red ylc-bet-list-odds">{{Utils.toFixed(String(item.odds), 4)}}</span>
								<section class="w33 fl">
									<input type="text" class="ylc-bet-list-money" v-model="item.money">
								</section>
							</li>
						</ul>
					</section>
					
					
					
<!--pc蛋蛋-->
					<template v-if="currentMethod.type === 'pcdd'">
						<section class="fw">
							<ul class="ylc-title" :class="{nrb: index === 3}" v-for="(item, index) in 4" :key="index">
								<li class="ylc-title-list">号码</li>
								<li class="ylc-title-list">赔率</li>
								<li class="ylc-title-list">金额</li>
							</ul>
						</section>
						<section class="fw">
							<ul class="ylc-bet w100">
								<li class="ylc-bet-list w25"
								    :class="{nrb: (index + 1) % 4 === 0, active: item.flag}"
								    v-for="(item, index) in pcdd.allCodeList"
								    :key="index"
								>
									<section class="w33 fl" @click="listChecked(item)">
										<span class="ylc-bet-list-num" :class="pcddAllIcon(item)">{{item.code}}</span>
									</section>
									<span class="fl w33 red ylc-bet-list-odds" @click="listChecked(item)">{{Utils.toFixed(String(item.odds), 4)}}</span>
									<section class="w33 fl">
										<input type="text" class="ylc-bet-list-money" v-model="item.money">
									</section>
								</li>
							</ul>
						</section>
	
						
						
	<!--特码包三-->
				<!--		<ul class="ylc-title w100 ntb">
							<li class="ylc-title-list">号码</li>
							<li class="ylc-title-list">赔率</li>
							<li class="ylc-title-list">金额</li>
						</ul>
						<ul class="ylc-bet w100 clear ylc-tmb3">
							<li class="ylc-bet-list w33 tc">
								<span class="dinv red ft12 ylc-tmb3-title">特码包三</span>
								<el-dropdown trigger="click">
									<el-button>
										<span>1</span><i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
									</el-button>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>黄金糕</el-dropdown-item>
										<el-dropdown-item>狮子头</el-dropdown-item>
										<el-dropdown-item>螺蛳粉</el-dropdown-item>
										<el-dropdown-item>双皮奶</el-dropdown-item>
										<el-dropdown-item>蚵仔煎</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
								<el-dropdown style="margin:0 10px;" trigger="click">
									<el-button>
										<span>1</span><i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
									</el-button>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>黄金糕</el-dropdown-item>
										<el-dropdown-item>狮子头</el-dropdown-item>
										<el-dropdown-item>螺蛳粉</el-dropdown-item>
										<el-dropdown-item>双皮奶</el-dropdown-item>
										<el-dropdown-item>蚵仔煎</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
								<el-dropdown trigger="click">
									<el-button>
										<span>1</span><i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
									</el-button>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>黄金糕</el-dropdown-item>
										<el-dropdown-item>狮子头</el-dropdown-item>
										<el-dropdown-item>螺蛳粉</el-dropdown-item>
										<el-dropdown-item>双皮奶</el-dropdown-item>
										<el-dropdown-item>蚵仔煎</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</li>
							<li class="ylc-bet-list w33">
								<span class="red ylc-bet-list-odds">980.0000</span>
							</li>
							<li class="ylc-bet-list w33 nrb">
								<input type="text" class="ylc-bet-list-money">
							</li>
						</ul>-->
						
						
<!--						<section class="fw clear">-->
<!--							<ul class="ylc-title ntb" :class="{nrb: index === 3}" v-for="(item, index) in 4" :key="index">-->
<!--								<li class="ylc-title-list">号码</li>-->
<!--								<li class="ylc-title-list">赔率</li>-->
<!--								<li class="ylc-title-list">金额</li>-->
<!--							</ul>-->
<!--						</section>-->
						<section class="fw">
							<ul class="ylc-bet ylc-bet-line w25"
							    v-if="list.length > 0"
							    v-for="(list, index) in pcdd.allBtnList"
							    :key="index"
							>
								<li class="fw">
									<span class="ylc-title-list">号码</span>
									<span class="ylc-title-list">赔率</span>
									<span class="ylc-title-list" :class="{nrb: index === 3}">金额</span>
								</li>
								<li class="ylc-bet-list"
								    :class="{active: item.flag, nrb: index === 3}"
								    @click="listChecked(item)"
								    v-for="(item, lIndex) in list"
								    :key="lIndex"
								>
									<span class="w33 fl" :class="item.class">{{item.code}}</span>
									<span class="fl w33 red ylc-bet-list-odds">{{item.odds}}</span>
									<section class="w33 fl">
										<input type="text" class="ylc-bet-list-money" v-model="item.money">
									</section>
								</li>
								<li class="ylc-bet-list"
								    :class="{nrb: index === 3}"
								    v-for="cc in (4 - list.length)"
								></li>
							</ul>
						</section>
					</template>
				</section>
			</section>
			
			
<!--右侧排行榜-->
			<section class="ylc-content-rights">
				<section class="ylc-content-right">
					<nav class="ylc-right-titles">
						<a href="javascript:;" class="ylc-right-title" :class="{active: ylcRightTab.show === 0}" @click="ylcRightTab.show = 0">出码排行</a>
						<a href="javascript:;" class="ylc-right-title" :class="{active: ylcRightTab.show === 1}" @click="ylcRightTab.show = 1">遗漏排行</a>
					</nav>
					<section v-if="ylcRightTab.show === 0" class="ylc-right-tab-cons clear">
						<section class="fw ylc-right-tab-title">
							期数：
							<el-dropdown class="ylc-right-tab-dropdown" trigger="click">
			      <span class="el-dropdown-link">
			        <span class="red">菜单</span><i class="el-icon-arrow-down el-icon--right"></i>
			      </span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>黄金糕</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</section>
						<ul class="fw">
							<li class="ylc-right-tab-con">
								<p class="ylc-right-tab-con-p wzfw">和值11</p> <span class="red">@27</span>2115期
							</li>
							<li class="ylc-right-tab-con">
								<p class="ylc-right-tab-con-p wzfw">和值</p> <span class="red">@27</span>5期
							</li>
						</ul>
					</section>
					<section v-if="ylcRightTab.show === 1" class="ylc-right-tab-cons clear">
						<section class="fw ylc-right-tab-title">
							期数：
							<el-dropdown class="ylc-right-tab-dropdown" trigger="click">
			      <span class="el-dropdown-link">
			        <span class="red">菜单</span><i class="el-icon-arrow-down el-icon--right"></i>
			      </span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>黄金糕</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</section>
						<ul class="fw">
							<li class="ylc-right-tab-con">
								<p class="ylc-right-tab-con-p wzfw">和值22</p> <span class="red">@27</span>2115期
							</li>
							<li class="ylc-right-tab-con">
								<p class="ylc-right-tab-con-p wzfw">和值</p> <span class="red">@27</span>5期
							</li>
						</ul>
					</section>
				</section>
			</section>
		</section>
		
		
<!--快选金额设置-->
		<section class="ylc-kx-warp" v-if="kxInfo.show">
			<section class="ylc-kx-box">
				<section class="ylc-kx-info-header">快选金额</section>
				<p class="ylc-kx-explain">注意：设置只保存在您的电脑，清空浏览器缓存或更换电脑会显示默认值。</p>
				
				<section class="fw ylc-kx-info-list">
					<input type="text" min="0" max="10000" maxlength="5" class="ylc-kx-info-text" v-model="kxInfo.blue" value="10" placeholder="未设置">
					<span class="ylc-kx-info-clear" @click="kxInfo.blue = 0">清空</span>
				</section>
				<section class="fw ylc-kx-info-list">
					<input type="text" min="0" max="10000" maxlength="5" class="ylc-kx-info-text" v-model="kxInfo.red" value="10" placeholder="未设置">
					<span class="ylc-kx-info-clear" @click="kxInfo.red = 0">清空</span>
				</section>
				<section class="fw ylc-kx-info-list">
					<input type="text" min="0" max="10000" maxlength="5" class="ylc-kx-info-text" v-model="kxInfo.green" value="10" placeholder="未设置">
					<span class="ylc-kx-info-clear" @click="kxInfo.green = 0">清空</span>
				</section>
				<section class="fw ylc-kx-info-list">
					<input type="text" min="0" max="10000" maxlength="5" class="ylc-kx-info-text" v-model="kxInfo.violet" value="10" placeholder="未设置">
					<span class="ylc-kx-info-clear" @click="kxInfo.violet = 0">清空</span>
				</section>
				<section class="fw ylc-kx-info-list">
					<input type="text" min="0" max="10000" maxlength="5" class="ylc-kx-info-text" v-model="kxInfo.drakBlue" value="10" placeholder="未设置">
					<span class="ylc-kx-info-clear" @click="kxInfo.drakBlue = 0">清空</span>
				</section>
				
				<section class="ylc-kx-info-btns">
					<span class="ylc-kx-info-btn" @click="kxInfo.show = false">取消</span>
					<span class="ylc-kx-info-btn" @click="kxInfoSave()">保存</span>
				</section>
			</section>
		</section>
		
		
<!--投注弹出框-->
		<el-dialog
						title="下注清单"
						:visible.sync="submitDialog"
						class="ylc-submit"
						width="30%">
			<ul class="fw ylc-bet-titles">
				<li class="ylc-bet-title">号码</li>
				<li class="ylc-bet-title">赔率</li>
				<li class="ylc-bet-title">单注金额</li>
			</ul>
			<ul class="fw ylc-bet-contents">
				<li class="ylc-bet-content"
				    v-for="(item, index) in currentOrder.list"
				    :key="index"
				>
					<p class="ylc-bet-content-l">合值 <span class="red">@{{item.code}}</span></p>
					<p class="ylc-bet-content-c">{{item.odds}}</p>
					<p class="ylc-bet-content-r">{{Utils.toFixed(String(item.money))}}</p>
				</li>
			</ul>
			<section class="fw ylc-bet-count red">
				总计：
				<span class="fr">{{currentOrder.list.length}}注 / {{Utils.toFixed(String(currentOrder.betMoney))}}元</span>
			</section>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="submitClose()" size="small">取 消</el-button>
		    <el-button type="primary" @click="bet()" size="small">确 定</el-button>
      </span>
		</el-dialog>
		
		
<!--		底部-->
		<section class="w ylc-kx-footer">
			<span class="dinv ylc-kx-footer-clear active" @click="clearCode()">清除选号</span>
			<section class="ylc-kx-footer-moneys">
				<span class="ylc-kx-footer-moneys-sp">快选金额</span>
				<ul class="dinv fw">
					<li class="ylc-kx-footer-moneys-list" @click="kxInfoSelect(kxInfo.blue2)">{{kxInfo.blue2}}</li>
					<li class="ylc-kx-footer-moneys-list" @click="kxInfoSelect(kxInfo.red2)">{{kxInfo.red2}}</li>
					<li class="ylc-kx-footer-moneys-list" @click="kxInfoSelect(kxInfo.green2)">{{kxInfo.green2}}</li>
					<li class="ylc-kx-footer-moneys-list" @click="kxInfoSelect(kxInfo.violet2)">{{kxInfo.violet2}}</li>
					<li class="ylc-kx-footer-moneys-list" @click="kxInfoSelect(kxInfo.drakBlue2)">{{kxInfo.drakBlue2}}</li>
				</ul>
				<span class="ylc-kx-footer-moneys-much">金额: </span>
				<input type="text" class="ylc-kx-footer-moneys-text" v-model="currentOrder.money">
				<span class="ylc-kx-footer-confirm" @click="confirm()">确认投注</span>
			</section>
		</section>
	</section>
</template>

<script>
import { mapState } from 'vuex'
import methods from '../../lib/config/method'
import prizes from '../../lib/config/prizes'
import Utils from "../../lib/utils/utils"
export default {
    name: 'ylc',
		data () {
        return {
		        
            // 娱乐城 和 pc蛋蛋
		        ylc: true,
		        pcdds: false,
		        
		        bq: {
                gray: [0, 13, 14, 27],
                green: [1, 4, 7, 10, 16, 19, 22, 25],
                blue: [2, 5, 8, 11, 17, 20, 23, 26],
                red: [3, 6, 9, 12, 15, 18, 21, 24]
		        },
		        
		        // 快选设置
            kxInfo: {
		            show: false,
		            blue: 10,
		            red: 50,
		            green: 100,
                violet: 200,
		            drakBlue: 500,
                blue2: 10,
                red2: 50,
                green2: 100,
                violet2: 200,
                drakBlue2: 500
            },
		        
		        // 导航 状态
            ylcListOn: 'ZH',
            ylcRightTab: {
                show: 0
            },
		        
            //pc 蛋蛋
            pcdd: {
                allCodeList: [],
		            allBtnList: []
            },
		        
		        // 是否开启龙虎斗
		        lhdisShow: false,
		        
		        // 当前订单
            currentOrder: {
                money: 0,
		            betMoney: 0,
		            list: []
		        },
            submitDialog: false
        }
		},
		computed: {
        ...mapState([
            'allMethods',
            'currentLottery',
            'currentMethod',
		        'currentIssue',
		        'account',
		        'chengeYlcPlays'
        ]),
		},
		watch: {
        
        // 切换 娱乐城彩种时
        'currentMethod' () {
		        this.pcddAllList()
        },
        
        // 快选输入金钱时
        'currentOrder.money': {
            handler (newVal) {
                let [
                    codeList = this.pcdd.allCodeList
                ] = []
                if (isNaN(newVal)) {
                    newVal = 0
                }
                if (this.currentMethod.method === 'LHD') {
                    for (let k in codeList) {

                        for (let i = 0; i < codeList[k].length; i++) {

                            for (let j = 0; j < codeList[k][i].code.length; j++) {

                                if (codeList[k][i].code[j].flag) {

                                    codeList[k][i].code[j].money = newVal
                                }
                            }
                        }
                    }

                    return
                }
                
                
                for (let i = 0; i < codeList.length; i++) {
                    if (codeList[i].flag) {
                        codeList[i].money = newVal
                    }
                }
                for (let i = 0; i < this.pcdd.allBtnList.length; i++) {
                    for (let j = 0; j < this.pcdd.allBtnList[i].length; j++) {
                        if (this.pcdd.allBtnList[i][j].flag) {
                            this.pcdd.allBtnList[i][j].money = newVal
                        }
                    }
                }
            },
            deep: true
        },

        // 金钱发生变化时
        'pcdd.allBtnList': {
            handler (newVal) {
                for (let i = 0; i < newVal.length; i++) {
                    for (let j = 0; j < newVal[i].length; j++) {
                        if (isNaN(newVal[i][j].money)) {
                            newVal[i][j].money = 0
                        } else if (newVal[i][j].money) {
                            if (Number(newVal[i].money) < 1) {
                                newVal[i][j].money = 0
                            } if (Number(newVal[i][j].money) > 1000000) {
                                newVal[i][j].money = 1000000
                            }
                        }
                    }
                }
            },
            deep: true
        },
       
        // 金钱发生变化时
        'pcdd.allCodeList': {
            handler (newVal) {
		            if (this.currentMethod.method === 'LHD') {
		                for (let k in newVal) {
		                    
                        for (let i = 0; i < newVal[k].length; i++) {
                            
                            for (let j = 0; j < newVal[k][i].code.length; j++) {
                                
                                if (isNaN(newVal[k][i].code[j].money)) {
                                    
                                    newVal[k][i].code[j].money = 0
		                                
                                } else if (newVal[k][i].code[j].money) {
                                    
                                    if (Number(newVal[k][i].code[j].money) < 1) {
                                        
                                        newVal[k][i].code[j].money = 0
		                                    
                                    } if (Number(newVal[k][i].code[j].money) > 1000000) {
                                        
                                        newVal[k][i].code[j].money = 1000000
                                    }
                                }
                            }
                        }
		                }
		                
		                return
		            }
                for (let i = 0; i < newVal.length; i++) {
                    if (isNaN(newVal[i].money)) {
                        newVal[i].money = 0
                    } else if (newVal[i].money) {
                        if (Number(newVal[i].money) < 1) {
                            newVal[i].money = 0
                        } if (Number(newVal[i].money) > 1000000) {
                            newVal[i].money = 1000000
                        }
                    }
                }
            },
            deep: true
        }
		},
		created () {
				
				// pc蛋蛋整合列表
				this.pcddAllList()

        // pc蛋蛋 按钮
        this.pcddAllbtn()

        // 获取快选本地设置
				let kxInfo = Utils.storage.get('kxInfo')
				if (kxInfo) {
            this.kxInfo = kxInfo.data
				}
		},
		methods: {

        //切换娱乐城玩法
        chengePlay () {
            let json = {
                name: 'official',
                index: 0
            }
            this.$store.commit('chengeYlcPlays', json)
        },
        
        // 切换玩法
        checkedPlay (item, index) {
            let json = {
                name: 'casino',
		            index: index
            }
		        this.$store.commit('chengeYlcPlays', json)
            this.ylcListOn = item.sign
        },
				
        //取消提交
        submitClose () {
            this.submitDialog = false
        },
				
        //提交
				confirm () {
            let [
                allCodeList = this.pcdd.allCodeList,
                allBtnList = this.pcdd.allBtnList,
		            list = [],
		            money = 0
            ] = []
            this.currentOrder.betMoney = 0
            for (let i = 0; i < allCodeList.length; i++) {
                if (allCodeList[i].flag) {
                    if (Number(allCodeList[i].money) <= 0) {
                        this.$alert('你还未投注 或 投注错误', '提示', {
                            confirmButtonText: '确定'
                        })
                        return false
                    }
                    money += Number(allCodeList[i].money)
                    list.push(allCodeList[i])
                }
            }
            for (let i = 0; i < allBtnList.length; i++) {
                for (let j = 0; j < allBtnList[i].length; j++) {
                    if (allBtnList[i][j].flag) {
                        if (Number(allBtnList[i][j].money) <= 0) {
                            this.$alert('你还未投注 或 投注错误', '提示', {
                                confirmButtonText: '确定'
                            })
                            return false
                        }
                        money += allBtnList[i][j].money
                        list.push(allBtnList[i][j])
                    }
                }
            }
            this.currentOrder.list = list
            this.currentOrder.betMoney = money
            this.submitDialog = true
				},
        
        //投注
				bet () {
            let [
                currentIssus = this.currentIssue.issue_no,
                list = this.currentOrder.list,
                issus = {},
                order = []
            ] = []
						
            for (let i = 0; i < list.length; i++) {
                if (isNaN(list[i].code)) {
		              switch (list[i].code) {
				              case '大':
                          list[i].upload = 'b'
				                  break
                      case '小':
                          list[i].upload = 's'
                          break
                      case '单':
                          list[i].upload = 'o'
                          break
                      case '双':
                          list[i].upload = 'e'
                          break
                      case '大单':
                          list[i].upload = 'bo'
                          break
                      case '大双':
                          list[i].upload = 'be'
                          break
                      case '小单':
                          list[i].upload = 'so'
                          break
                      case '小双':
                          list[i].upload = 'se'
                          break
                      case '极大':
                          list[i].upload = 'sb'
                          break
                      case '极小':
                          list[i].upload = 'ss'
                          break
                      case '豹子':
                          list[i].upload = 'b'
                          break
                      case '红波':
                          list[i].upload = 'red'
                          break
                      case '蓝波':
                          list[i].upload = 'blue'
                          break
                      case '绿波':
                          list[i].upload = 'green'
                          break
		              }
                }
		            let json = {
                    method_id: this.currentMethod.method,
                    method_name: this.currentMethod.name,
                    codes: isNaN(list[i].code) ? list[i].upload : list[i].code,
                    count: this.currentOrder.list.length,
                    times: 1,
                    cost: this.currentOrder.betMoney,
                    mode: 1,
                    prize_group: 1950,
                    price: 2
		            }
		            order.push(json)
            }
            issus[currentIssus] = true
            if (parseInt(this.currentOrder.betMoney) <= 0 || this.currentOrder.list.length === 0) {
                this.$alert('你还未投注 或 投注错误', '提示', {
                    confirmButtonText: '确定'
                })
                return false
            }
            this.Api.bet(this.currentLottery.en_name, issus, order, this.currentOrder.betMoney).then((res) => {
                if (res.isSuccess) {
                    this.$alert('投注成功, 您可以通过”游戏记录“查询您的投注记录！', '提示', {
                        confirmButtonText: '确定'
                    })
                    // 添加完选号 清空选中号码
		                this.clearCode()
		                
                    // 获取我的投注 我的追号记录
                    // this.$store.dispatch('betHistory')
                    // 刷新余额
                    this.Api.getBalance().then((res) => {
                        if (res.isSuccess) {
                            let account = this.Utils.storage.get('current-user')
                            if (account && account.data) {
                                account.data.balance = res.data.balance
                                account.data.frozen = res.data.frozen
                                this.$store.commit('account', account.data)
                                this.Utils.storage.set('current-user', account.data)
                            }
                        }
                    })
                    this.submitDialog = false
                }
            })
				},
        
        // 快选金额选择
        kxInfoSelect (item) {
            let [
                allCodeList = this.pcdd.allCodeList,
                allBtnList = this.pcdd.allBtnList
            ] = []
            this.currentOrder.money = Number(item) + Number(this.currentOrder.money)
            for (let i = 0; i < allCodeList.length; i++) {
                if (allCodeList[i].flag) {
                    allCodeList[i].money = this.currentOrder.money
                }
            }
            for (let i = 0; i < allBtnList.length; i++) {
                for (let j = 0; j < allBtnList[i].length; j++) {
                    if (allBtnList[i][j].flag) {
                        allBtnList[i][j].money = this.currentOrder.money
                    }
                }
            }
        },
				
        // 快选金额设置
				kxInfoSave () {
				    if (isNaN(this.kxInfo.blue)) { this.kxInfo.blue = 0 }
				    if (isNaN(this.kxInfo.red)) { this.kxInfo.red = 0 }
				    if (isNaN(this.kxInfo.green)) { this.kxInfo.green = 0 }
				    if (isNaN(this.kxInfo.violet)) { this.kxInfo.violet = 0 }
				    if (isNaN(this.kxInfo.drakBlue)) { this.kxInfo.drakBlue = 0 }
				    this.kxInfo.blue2 = this.kxInfo.blue
				    this.kxInfo.red2 = this.kxInfo.red
				    this.kxInfo.green2 = this.kxInfo.green
				    this.kxInfo.violet2 = this.kxInfo.violet
				    this.kxInfo.drakBlue2 = this.kxInfo.drakBlue
						this.kxInfo.show = false
						Utils.storage.set('kxInfo', this.kxInfo)
				},
        
        // 选中的列表项
        listChecked (item) {
            if (!item.flag) {
                item.flag = true
                item.money = this.currentOrder.money
            } else {
                item.money = 0
                item.flag = false
            }
        },
        
        // pc蛋蛋 娱乐城 列表
				pcddAllList () {
            let [
                list = this.currentMethod.layout.codes,
                all = this.allMethods
            ] = []

            this.pcdd.allCodeList = []
						
						// pc蛋蛋
						if (this.currentMethod.type === 'pcdd') {
                let [
                    tempList = [],
                    temList = [],
                    TM = prizes[this.currentLottery.series_id].TM
                ] = []
                for (let i = 0; i < Math.ceil(list.length / 4); i++) {
                    tempList.push([])
                }

                // 处理数据
                for (let i = 0; i < list.length; i++) {
                    let json = {}
                    json.code = list[i]
                    json.money = 0
                    json.flag = false
                    json.odds = 80.0000
                    tempList[i % Math.ceil(list.length / 4)].push(json)
                }
                for (let i = 0; i < tempList.length; i++) {
                    temList = temList.concat(tempList[i])
                }

                // for (let key in TM) {
                //     for (let i = 0; i < temList.length; i++) {
                //         if (temList[i].code === Number(key)) {
                //             temList[i].odds = TM[key].prize
                //         }
                //     }
                // }
                // 赔率未计算
                // console.log(this.account.prize_group)
                // console.log(temList)
                this.pcdd.allCodeList = temList
						}

            // 娱乐城 整合 和 两面盘列表
						else if (
						    this.currentMethod.method === 'ZH' ||
								this.currentMethod.method === 'LMP'
						) {
						    let [
								    temp = [],
								    casino = methods[this.currentLottery.series_id].casino
						    ] = []
                for (let i = 0; i < all.length; i++) {
		                if (all[i].sign === 'DYQ') {
		                    
		                    let json = {}
		                    json.sign = all[i].sign
		                    json.name = '第一球'
                        json.code = []
                        for (let j = 0; j < casino.DYQ.layout.codes.length; j++) {
                            
                            // 两面盘
                            if (this.currentMethod.method === 'LMP' && isNaN(casino.DYQ.layout.codes[j])) {
                                let codeJson = {}
                                codeJson.code = casino.DYQ.layout.codes[j]
                                codeJson.money = 0
                                codeJson.flag = false
                                codeJson.odds = 80.0000
                                json.code.push(codeJson)
		                            
                            }
                            // 整合
                            else if (this.currentMethod.method === 'ZH') {
                                let codeJson = {}
                                codeJson.code = casino.DYQ.layout.codes[j]
                                codeJson.money = 0
                                codeJson.flag = false
                                codeJson.odds = 80.0000
                                json.code.push(codeJson)
                              
                            }
                        }
                        temp.push(json)
				                
		                }
		                
		                else if (all[i].sign === 'DEQ') {

                        let json = {}
                        json.sign = all[i].sign
                        json.name = '第二球'
                        json.code = []
                        for (let j = 0; j < casino.DEQ.layout.codes.length; j++) {
		                        
                            // 两面盘
                            if (this.currentMethod.method === 'LMP' && isNaN(casino.DEQ.layout.codes[j])) {
                                let codeJson = {}
                                codeJson.code = casino.DEQ.layout.codes[j]
                                codeJson.money = 0
                                codeJson.flag = false
                                codeJson.odds = 80.0000
                                json.code.push(codeJson)

                            }
                            // 整合
                            else if (this.currentMethod.method === 'ZH') {
                                let codeJson = {}
                                codeJson.code = casino.DEQ.layout.codes[j]
                                codeJson.money = 0
                                codeJson.flag = false
                                codeJson.odds = 80.0000
                                json.code.push(codeJson)

                            }
                        }
                        temp.push(json)
				                
		                }
		                
		                else if (all[i].sign === 'DSQ') {

                        let json = {}
                        json.sign = all[i].sign
                        json.name = '第三球'
                        json.code = []
                        for (let j = 0; j < casino.DSQ.layout.codes.length; j++) {
                            
                            // 两面盘
                            if (this.currentMethod.method === 'LMP' && isNaN(casino.DSQ.layout.codes[j])) {
                                let codeJson = {}
                                codeJson.code = casino.DSQ.layout.codes[j]
                                codeJson.money = 0
                                codeJson.flag = false
                                codeJson.odds = 80.0000
                                json.code.push(codeJson)

                            }
                            // 整合
                            else if (this.currentMethod.method === 'ZH') {
                                let codeJson = {}
                                codeJson.code = casino.DSQ.layout.codes[j]
                                codeJson.money = 0
                                codeJson.flag = false
                                codeJson.odds = 80.0000
                                json.code.push(codeJson)

                            }
                        }
                        temp.push(json)
				                
                    }
		                
		                else if (all[i].sign === 'DSIQ') {

                        let json = {}
                        json.sign = all[i].sign
                        json.name = '第四球'
                        json.code = []
                        for (let j = 0; j < casino.DSIQ.layout.codes.length; j++) {

                            // 两面盘
                            if (this.currentMethod.method === 'LMP' && isNaN(casino.DSIQ.layout.codes[j])) {
                                let codeJson = {}
                                codeJson.code = casino.DSIQ.layout.codes[j]
                                codeJson.money = 0
                                codeJson.flag = false
                                codeJson.odds = 80.0000
                                json.code.push(codeJson)

                            }
                            // 整合
                            else if (this.currentMethod.method === 'ZH') {
                                let codeJson = {}
                                codeJson.code = casino.DSIQ.layout.codes[j]
                                codeJson.money = 0
                                codeJson.flag = false
                                codeJson.odds = 80.0000
                                json.code.push(codeJson)

                            }
                        }
                        temp.push(json)
				                
                    }
		                
		                else if (all[i].sign === 'DWQ') {

                        let json = {}
                        json.sign = all[i].sign
                        json.name = '第五球'
                        json.code = []
                        for (let j = 0; j < casino.DWQ.layout.codes.length; j++) {

                            // 两面盘
                            if (this.currentMethod.method === 'LMP' && isNaN(casino.DWQ.layout.codes[j])) {
                                let codeJson = {}
                                codeJson.code = casino.DWQ.layout.codes[j]
                                codeJson.money = 0
                                codeJson.flag = false
                                codeJson.odds = 80.0000
                                json.code.push(codeJson)

                            }
                            // 整合
                            else if (this.currentMethod.method === 'ZH') {
                                let codeJson = {}
                                codeJson.code = casino.DWQ.layout.codes[j]
                                codeJson.money = 0
                                codeJson.flag = false
                                codeJson.odds = 80.0000
                                json.code.push(codeJson)

                            }
                        }
                        temp.push(json)
				                
                    }
		                
		                else if (all[i].sign === 'LHD') {
		                  
				                this.lhdisShow = true

                    }
								}
								
								// 球数总和 和 龙虎斗
                let json = {}
                json.sign = 'all'
                json.name = '总和'
								if (this.currentMethod.method === 'ZH' || this.currentMethod.method === 'LMP') {
								    
                    json.code = [
                        { code: '总大', money: 0, flag: false, odds: 80},
                        { code: '总小', money: 0, flag: false, odds: 80},
                        { code: '总单', money: 0, flag: false, odds: 80},
                        { code: '总双', money: 0, flag: false, odds: 80}
                    ]
								}
								if (this.lhdisShow && this.currentMethod.method !== 'LMP') {
                    json.code = [
                        { code: '总大', money: 0, flag: false, odds: 80},
                        { code: '总小', money: 0, flag: false, odds: 80},
                        { code: '总单', money: 0, flag: false, odds: 80},
                        { code: '总双', money: 0, flag: false, odds: 80},
                        { code: '龙', money: 0, flag: false, odds: 80},
                        { code: '和', money: 0, flag: false, odds: 80},
                        { code: '虎', money: 0, flag: false, odds: 80}
                    ]
                  
								}
                temp.push(json)
                this.pcdd.allCodeList = temp
						}
						
						
						// 第一球到 第五球
            else if (
                this.currentMethod.method === 'DYQ' ||
								this.currentMethod.method === 'DEQ' ||
								this.currentMethod.method === 'DSQ' ||
								this.currentMethod.method === 'DSIQ' ||
								this.currentMethod.method === 'DWQ'
						) {

                let [
                    tempList = [],
		                temp = [],
		                tempa = [],
                    allCodeList = []
                ] = []

                for (let i = 0; i < list.length; i++) {
                    if (i < 4) {
                        temp.push(list[i])
                    } else {
                        tempa.push(list[i])
                    }
                }
                tempList = tempList.concat(tempa, temp)
                for (let i = 0; i < tempList.length; i++) {
                    let json = {}
                    json.code = tempList[i]
                    json.money = 0
                    json.flag = false
                    json.odds = 80.0000
                    allCodeList.push(json)
               
                }
                allCodeList.push({ code: '总大', money: 0, flag: false, odds: 80})
                allCodeList.push({ code: '总小', money: 0, flag: false, odds: 80})
                allCodeList.push({ code: '总单', money: 0, flag: false, odds: 80})
                allCodeList.push({ code: '总双', money: 0, flag: false, odds: 80})
                this.pcdd.allCodeList = allCodeList
						}
            
            // 龙虎斗
            else if (this.currentMethod.method === 'LHD') {
                let [
                    temp = {
                    w: [],
		                q: [],
		                b: [],
		                s: []
                    }
                ] = []
                
                
                for (let i = 0; i < all.length; i++) {
                    if (all[i].sign === 'LHD') {
                        
                        for (let key in list) {
                            
                            for (let tempk in temp) {
                                
                                if (key === tempk) {
                                    
                                    for (let i = 0; i < list[key].length; i++) {
                                        let json = {}
                                        switch (list[key][i]) {
		                                        case 'wq':
                                                json.name = '万千 第一球 vs 第二球'
                                                json.code = [
		                                                {name: '龙', odds: 2.8, flag: false, money: 0},
		                                                {name: '和', odds: 2.8, flag: false, money: 0},
		                                                {name: '虎', odds: 2.8, flag: false, money: 0}
                                                ]
		                                            break
                                            case 'wb':
                                                json.name = '万百 第一球 vs 第三球'
                                                json.code = [
                                                    {name: '龙', odds: 2.8, flag: false, money: 0},
                                                    {name: '和', odds: 2.8, flag: false, money: 0},
                                                    {name: '虎', odds: 2.8, flag: false, money: 0}
                                                ]
                                                break
                                            case 'ws':
                                                json.name = '万十 第一球 vs 第四球'
                                                json.code = [
                                                    {name: '龙', odds: 2.8, flag: false, money: 0},
                                                    {name: '和', odds: 2.8, flag: false, money: 0},
                                                    {name: '虎', odds: 2.8, flag: false, money: 0}
                                                ]
                                                break
                                            case 'wg':
                                                json.name = '万个 第一球 vs 第五球'
                                                json.code = [
                                                    {name: '龙', odds: 2.8, flag: false, money: 0},
                                                    {name: '和', odds: 2.8, flag: false, money: 0},
                                                    {name: '虎', odds: 2.8, flag: false, money: 0}
                                                ]
                                                break
                                            case 'qb':
                                                json.name = '千百 第二球 vs 第三球'
                                                json.code = [
                                                    {name: '龙', odds: 2.8, flag: false, money: 0},
                                                    {name: '和', odds: 2.8, flag: false, money: 0},
                                                    {name: '虎', odds: 2.8, flag: false, money: 0}
                                                ]
                                                break
                                            case 'qs':
                                                json.name = '千十 第二球 vs 第四球'
                                                json.code = [
                                                    {name: '龙', odds: 2.8, flag: false, money: 0},
                                                    {name: '和', odds: 2.8, flag: false, money: 0},
                                                    {name: '虎', odds: 2.8, flag: false, money: 0}
                                                ]
                                                break
                                            case 'qg':
                                                json.name = '千个 第二球 vs 第五球'
                                                json.code = [
                                                    {name: '龙', odds: 2.8, flag: false, money: 0},
                                                    {name: '和', odds: 2.8, flag: false, money: 0},
                                                    {name: '虎', odds: 2.8, flag: false, money: 0}
                                                ]
                                                break
                                            case 'bs':
                                                json.name = '百十 第三球 vs 第四球'
                                                json.code = [
                                                    {name: '龙', odds: 2.8, flag: false, money: 0},
                                                    {name: '和', odds: 2.8, flag: false, money: 0},
                                                    {name: '虎', odds: 2.8, flag: false, money: 0}
                                                ]
                                                break
                                            case 'bg':
                                                json.name = '百个 第三球 vs 第五球'
                                                json.code = [
                                                    {name: '龙', odds: 2.8, flag: false, money: 0},
                                                    {name: '和', odds: 2.8, flag: false, money: 0},
                                                    {name: '虎', odds: 2.8, flag: false, money: 0}
                                                ]
                                                break
                                            case 'sg':
                                                json.name = '十个 第四球 vs 第五球'
                                                json.code = [
                                                    {name: '龙', odds: 2.8, flag: false, money: 0},
                                                    {name: '和', odds: 2.8, flag: false, money: 0},
                                                    {name: '虎', odds: 2.8, flag: false, money: 0}
                                                ]
                                                break
                                        }
                                        json.sign = list[key][i]
                                        temp[tempk].push(json)
		                                    
                                    }
                                }
                            }
                        }
                    }
                }
                this.pcdd.allCodeList = temp
            }
								
            // 全五中一
						else if (this.currentMethod.method === 'QWZY') {
						    
                for (let i = 0; i < all.length; i++) {
                    if (all[i].sign === 'QWZY') {
                        for (let i = 0; i < list.length; i++) {
                            let json = {}
                            json.code = list[i]
                            json.money = 0
                            json.flag = false
                            json.odds = 80.0000
                            this.pcdd.allCodeList.push(json)
                        }
                    }
                }
						}
				},
				
				// pc蛋蛋 大小单双类
				pcddAllbtn () {
            let [
                list = this.currentMethod.buttons,
                tempList = []
            ] = []
            for (let i = 0; i < Math.ceil(list.length / 4); i++) {
                tempList.push([])
            }
            for (let j = 0; j < this.allMethods.length; j++) {
                for (let i = 0; i < list.length; i++) {
                    let json = {}
                    json.code = list[i]
                    json.flag = false
                    json.money = 0
                    json.odds = 27.2222
                    if (this.allMethods[j].sign === 'DXDS') {
                        if (list[i] === '大' || list[i] === '小' || list[i] === '单' || list[i] === '双') {
                            tempList[0].push(json)
                        }
                        if (list[i] === '大单' || list[i] === '大双' || list[i] === '小单' || list[i] === '小双') {
                            tempList[1].push(json)
                        }
                        if (list[i] === '极大' || list[i] === '极小') {
                            tempList[2].push(json)
                        }
                    }
                    if (this.allMethods[j].sign === 'BO') {
                        if (list[i] === '红波' || list[i] === '蓝波' || list[i] === '绿波') {
                            if (list[i] === '红波') {
                                json.class = 'ylc-red'
                            } else if (list[i] === '蓝波') {
                                json.class = 'ylc-blue'
                            } else if (list[i] === '绿波') {
                                json.class = 'ylc-green'
                            }
                            tempList[3].push(json)
                        }
                    }
                    if (this.allMethods[j].sign === 'BZ') {
                        if (list[i] === '豹子') {
                            tempList[3].push(json)
                        }
                    }
                }
            }
            this.pcdd.allBtnList = tempList
				},
				
        // pc蛋蛋整合  号码背景图
				pcddAllIcon (item) {
						if (this.bq.gray.includes(item.code)) {
						    return 'ylc-bet-list-gray'
						} else if (this.bq.green.includes(item.code)) {
                return 'ylc-bet-list-green'
            } else if (this.bq.blue.includes(item.code)) {
                return 'ylc-bet-list-blue'
            } else if (this.bq.red.includes(item.code)) {
                return 'ylc-bet-list-red'
            }
        },
        
        // 底部清除选号
				clearCode () {
            for (let i = 0; i < this.pcdd.allCodeList.length; i++) {
                this.pcdd.allCodeList[i].flag = false
                this.pcdd.allCodeList[i].money = 0
            }
            for (let i = 0; i < this.pcdd.allBtnList.length; i++) {
                for (let j = 0; j < this.pcdd.allBtnList[i].length; j++) {
                    this.pcdd.allBtnList[i][j].flag = false
                    this.pcdd.allBtnList[i][j].money = 0
                }
            }
				}
		}
}
</script>