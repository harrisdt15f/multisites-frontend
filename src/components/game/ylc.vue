<template>
	<section class="w fw ylc-main">
<!--导航-->
		<nav class="ylc-nav">
			<a href="javascript:;"
			   class="ylc-list"
			   :class="{on: ylcListOn === index }"
			   @click="ylcListOn = index"
			   v-for="(item, index) in playList" :key="index"
			>{{item.name}}</a>
			<a href="javascript:;" class="ylc-kx" @click="kxInfo.show = true">快选金额</a>
		</nav>
		
<!--投注区-->
		<section class="ylc-content">
			<section class="ylc-content-left">
				<section class="fw ylc-content-top">
					<template v-if="pcdds">
						<section class="fl fw w16">
							<p class="ylc-title w100">第一球</p>
							<ul class="ylc-title w100 ntb">
								<li class="ylc-title-list">号码</li>
								<li class="ylc-title-list">赔率</li>
								<li class="ylc-title-list">金额</li>
							</ul>
							<ul class="ylc-bet w100">
								<li class="ylc-bet-list w100">
									<section class="w33 fl">
										<span class="ylc-bet-list-num">1</span>
									</section>
									<span class="fl w33 red ylc-bet-list-odds">9.0000</span>
									<section class="w33 fl">
										<input type="text" class="ylc-bet-list-money">
									</section>
								</li>
							</ul>
						</section>
						<section class="fl fw w16">
							<p class="ylc-title w100">第一球</p>
							<ul class="ylc-title w100 ntb">
								<li class="ylc-title-list">号码</li>
								<li class="ylc-title-list">赔率</li>
								<li class="ylc-title-list">金额</li>
							</ul>
							<ul class="ylc-bet w100">
								<li class="ylc-bet-list w100">
									<section class="w33 fl">
										<span class="ylc-bet-list-num">1</span>
									</section>
									<span class="fl w33 red ylc-bet-list-odds">9.0000</span>
									<section class="w33 fl">
										<input type="text" class="ylc-bet-list-money">
									</section>
								</li>
							</ul>
						</section>
						<section class="fl fw w16">
							<p class="ylc-title w100">第一球</p>
							<ul class="ylc-title w100 ntb">
								<li class="ylc-title-list">号码</li>
								<li class="ylc-title-list">赔率</li>
								<li class="ylc-title-list">金额</li>
							</ul>
							<ul class="ylc-bet w100">
								<li class="ylc-bet-list w100">
									<section class="w33 fl">
										<span class="ylc-bet-list-num">1</span>
									</section>
									<span class="fl w33 red ylc-bet-list-odds">9.0000</span>
									<section class="w33 fl">
										<input type="text" class="ylc-bet-list-money">
									</section>
								</li>
							</ul>
						</section>
						<section class="fl fw w16">
							<p class="ylc-title w100">第一球</p>
							<ul class="ylc-title w100 ntb">
								<li class="ylc-title-list">号码</li>
								<li class="ylc-title-list">赔率</li>
								<li class="ylc-title-list">金额</li>
							</ul>
							<ul class="ylc-bet w100">
								<li class="ylc-bet-list w100">
									<section class="w33 fl">
										<span class="ylc-bet-list-num">1</span>
									</section>
									<span class="fl w33 red ylc-bet-list-odds">9.0000</span>
									<section class="w33 fl">
										<input type="text" class="ylc-bet-list-money">
									</section>
								</li>
							</ul>
						</section>
						<section class="fl fw w16">
							<p class="ylc-title w100">第一球</p>
							<ul class="ylc-title w100 ntb">
								<li class="ylc-title-list">号码</li>
								<li class="ylc-title-list">赔率</li>
								<li class="ylc-title-list">金额</li>
							</ul>
							<ul class="ylc-bet w100">
								<li class="ylc-bet-list w100">
									<section class="w33 fl">
										<span class="ylc-bet-list-num">1</span>
									</section>
									<span class="fl w33 red ylc-bet-list-odds">9.0000</span>
									<section class="w33 fl">
										<input type="text" class="ylc-bet-list-money">
									</section>
								</li>
							</ul>
						</section>
						<section class="fl fw w16">
							<p class="ylc-title w100">第一球</p>
							<ul class="ylc-title w100 ntb">
								<li class="ylc-title-list">号码</li>
								<li class="ylc-title-list">赔率</li>
								<li class="ylc-title-list">金额</li>
							</ul>
							<ul class="ylc-bet w100">
								<li class="ylc-bet-list w100">
									<section class="w33 fl">
										<span class="ylc-bet-list-num">1</span>
									</section>
									<span class="fl w33 red ylc-bet-list-odds">9.0000</span>
									<section class="w33 fl">
										<input type="text" class="ylc-bet-list-money">
									</section>
								</li>
							</ul>
						</section>
					</template>
					<section v-if="pcdds" class="tc">
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
						<section class="dinv ylc-lhd-list">
							<h3 class="ylc-lhd-list-title">万千 第一球 vs 第二球</h3>
							<ul class="fw">
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
								<li class="ylc-lhd-list-q">
									<span class="ylc-lhd-list-q-y">龙</span>
									<span class="red">2.0688</span>
									<input type="text" class="ylc-bet-list-money">
								</li>
							</ul>
						</section>
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
									<span class="fl w33 red ylc-bet-list-odds" @click="listChecked(item)">{{item.odds}}</span>
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
		
		
<!--		快选金额设置-->
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
				<!--正特 特马-->
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
import Utils from "../../lib/utils/utils";
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
		        playList: null,
		        
		        // 导航 状态
            ylcListOn: 'T0',
            ylcRightTab: {
                show: 0
            },
		        
            //pc 蛋蛋
            pcdd: {
                allCodeList: [],
		            allBtnList: []
            },
		        
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
		        'currentIssue'
        ]),
		},
		watch: {
        
        // 快选输入金钱时
        'currentOrder.money': {
            handler (newVal) {
                if (isNaN(newVal)) {
                    newVal = 0
                }
                for (let i = 0; i < this.pcdd.allCodeList.length; i++) {
                    if (this.pcdd.allCodeList[i].flag) {
                        this.pcdd.allCodeList[i].money = newVal
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
                for (let i = 0; i < newVal.length; i++) {
                
                }
            },
            deep: true
        },
       
        // 金钱发生变化时
        'pcdd.allCodeList': {
            handler (newVal) {
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
        
        // 更新当前玩法
        let methodId = this.allMethods[0]['rows'][0]['methods'][0]['method_id']
        this.$store.commit('currentMethod', methods[this.currentLottery.series_id][methodId])
				this.playList = methods[this.currentLottery.series_id]
				console.log(this.currentMethod)
				
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
        
        // 清空订单状态
        chengePlay () {
            this.$store.commit('chengePlay', 'ylc')
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
		            let json = {
                    method_id: this.currentMethod.method,
                    method_name: this.currentMethod.name,
                    codes: String(list[i].code),
                    count: this.currentOrder.list.length,
                    times: 1,
                    cost: this.currentOrder.betMoney,
                    mode: this.currentOrder.currentMode,
                    prize_group: '',
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
        
        // pc蛋蛋整合列表
				pcddAllList () {
				    let [
                list = this.currentMethod.layout.codes,
						    tempList = []
				    ] = []
            for (let i = 0; i < Math.ceil(list.length / 4); i++) {
                tempList.push([])
            }
            // 处理数据
            for (let i = 0; i < list.length; i++) {
                let json = {}
                json.code = list[i]
		            json.money = 0
		            json.odds = 27.2222
		            json.flag = false
                tempList[i % Math.ceil(list.length / 4)].push(json)
            }
            for (let i = 0; i < tempList.length; i++) {
                this.pcdd.allCodeList = this.pcdd.allCodeList.concat(tempList[i])
            }
				},
				
				// pc蛋蛋 按钮 大小单双类
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
                    if (this.allMethods[j].name === '大小单双') {
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
                    if (this.allMethods[j].name === '波') {
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
                    if (this.allMethods[j].name === '豹子') {
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