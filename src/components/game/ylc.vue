<template>
  <section class="w fw ylc-main">
    <!--娱乐城导航-->
    <section class="ylc-navs">
      <section class="ylc-nav-box">
        <nav class="ylc-nav" ref="ylcNav">
          <a
            href="javascript:;"
            class="ylc-list"
            ref="ylclist"
            v-if="currentLottery.series_id !== 'pcdd'"
            :class="{on: ylcListOn === item.sign}"
            @click="checkedPlay(item, index)"
            v-for="(item, index) in allMethods"
            :key="index"
          >{{item.name}}</a>

          <!--pc蛋蛋导航-->
          <a
            href="javascript:;"
            class="ylc-list on"
            ref="ylclist"
            v-if="currentLottery.series_id === 'pcdd'"
          >整合</a>
        </nav>
      </section>
      <section class="bet-plays">
        <a href="javascript:;" class="ylc-kx" @click="kxInfo.show = true">快选金额</a>
        <div class="bet-play" @click="chengePlay()">官方</div>
        <div class="bet-play active">娱乐城</div>
      </section>
    </section>

    <!--投注区-->
    <section class="fw ylc-content">
      <section class="ylc-content-left">
        <section
          class="fw ylc-content-top"
          :class="{'ylc-content-top-ylc': currentMethod.type === 'ylc'}"
        >
          <!--娱乐城-->
          <section
            v-if="
							currentMethod.type === 'ylc' &&
							currentMethod.method === 'ZH' ||
							currentMethod.method === 'LMP'"
            class="fl fw w16"
            :class="{'ylc-content-line': index !== pcdd.allCodeList.length - 1}"
            v-for="(list, index) in pcdd.allCodeList"
            :key="index">
            <p class="ylc-title w100">{{list.name}}</p>
            <ul class="ylc-title w100 ntb">
              <li class="ylc-title-list">号码</li>
              <li class="ylc-title-list">赔率</li>
              <li class="ylc-title-list">金额</li>
            </ul>
            <ul class="ylc-bet w100">
              <li
                class="ylc-bet-list ylc-c-bet-list w100"
                :class="{active: item.flag}"
                v-for="(item, lLndex) in list.code"
                :key="lLndex"
              >
                <section class="w33 fl" @click="listChecked(item)">
                  <span
                    class="ylc-bet-list-num"
                    :class="{'ylc-bet-list-num-number': !isNaN(item.code)}"
                  >{{item.code}}</span>
                </section>
                <span
                  class="fl red ylc-bet-list-odds"
                  style="width:35.999%;"
                  @click="listChecked(item)"
                >{{Utils.toFixed(String(item.odds), 4)}}</span>
                <section class="w33 fl">
                  <input type="text" class="ylc-bet-list-money" v-model="item.money">
                </section>
              </li>
              <li
                class="ylc-bet-list ylc-c-bet-list w100"
                v-if="currentMethod.method === 'ZH'"
                v-for="cc in (14 - list.code.length)"
              ></li>
            </ul>
          </section>

          <!--龙虎斗-->

          <section class="tc" v-if="currentMethod.type === 'ylc' && currentMethod.method === 'LHD'">
            <section
              class="dinv ylc-lhd-list"
              v-for="(list, index) in pcdd.allCodeList.w"
              :key="index"
            >
              <h3 class="ylc-lhd-list-title">{{list.name}}</h3>
              <ul class="fw">
                <li
                  class="ylc-lhd-list-q"
                  :class="{active: item.flag}"
                  v-for="(item, iIndex) in list.code"
                  :key="iIndex"
                >
                  <section class="ylc-lhd-list-q-box" @click="listChecked(item)">
                    <span
                      class="ylc-lhd-list-q-y"
                      :class="{
									      'ylc-lhd-list-q-y-red': item.code === '龙',
									      'ylc-lhd-list-q-y-green': item.code === '和',
									      'ylc-lhd-list-q-y-blue': item.code === '虎'
									      }"
                    >{{item.code}}</span>
                  </section>
                  <span class="dl red" @click="listChecked(item)">{{Utils.toFixed(String(item.odds), 4)}}</span>
                  <input type="text" class="ylc-bet-list-money" v-model="item.money">
                </li>
              </ul>
            </section>

            <section class="dinv ylc-lhd-list" v-for="list in pcdd.allCodeList.q">
              <h3 class="ylc-lhd-list-title">{{list.name}}</h3>
              <ul class="fw">
                <li
                  class="ylc-lhd-list-q"
                  :class="{active: item.flag}"
                  v-for="(item, iIndex) in list.code"
                  :key="iIndex"
                >
                  <section class="ylc-lhd-list-q-box" @click="listChecked(item)">
                    <span
                      class="ylc-lhd-list-q-y"
                      :class="{
									      'ylc-lhd-list-q-y-red': item.code === '龙',
									      'ylc-lhd-list-q-y-green': item.code === '和',
									      'ylc-lhd-list-q-y-blue': item.code === '虎'
									      }"
                    >{{item.code}}</span>
                  </section>
                  <span class="dl red" @click="listChecked(item)">{{Utils.toFixed(String(item.odds), 4)}}</span>
                  <input type="text" class="ylc-bet-list-money" v-model="item.money">
                </li>
              </ul>
            </section>

            <br v-if="pcdd.allCodeList.b">
            <section class="dinv ylc-lhd-list" v-for="list in pcdd.allCodeList.b">
              <h3 class="ylc-lhd-list-title">{{list.name}}</h3>
              <ul class="fw">
                <li
                  class="ylc-lhd-list-q"
                  :class="{active: item.flag}"
                  v-for="(item, iIndex) in list.code"
                  :key="iIndex"
                >
                  <section class="ylc-lhd-list-q-box" @click="listChecked(item)">
                    <span
                      class="ylc-lhd-list-q-y"
                      :class="{
									      'ylc-lhd-list-q-y-red': item.code === '龙',
									      'ylc-lhd-list-q-y-green': item.code === '和',
									      'ylc-lhd-list-q-y-blue': item.code === '虎'
									      }"
                    >{{item.code}}</span>
                  </section>
                  <span class="dl red" @click="listChecked(item)">{{Utils.toFixed(String(item.odds), 4)}}</span>
                  <input type="text" class="ylc-bet-list-money" v-model="item.money">
                </li>
              </ul>
            </section>

            <br v-if="pcdd.allCodeList.s">
            <section class="dinv ylc-lhd-list" v-for="list in pcdd.allCodeList.s">
              <h3 class="ylc-lhd-list-title">{{list.name}}</h3>
              <ul class="fw">
                <li
                  class="ylc-lhd-list-q"
                  :class="{active: item.flag}"
                  v-for="(item, iIndex) in list.code"
                  :key="iIndex"
                >
                  <section class="ylc-lhd-list-q-box" @click="listChecked(item)">
                    <span
                      class="ylc-lhd-list-q-y"
                      :class="{
									      'ylc-lhd-list-q-y-red': item.code === '龙',
									      'ylc-lhd-list-q-y-green': item.code === '和',
									      'ylc-lhd-list-q-y-blue': item.code === '虎'
									      }"
                    >{{item.code}}</span>
                  </section>
                  <span class="dl red" @click="listChecked(item)">{{Utils.toFixed(String(item.odds), 4)}}</span>
                  <input type="text" class="ylc-bet-list-money" v-model="item.money">
                </li>
              </ul>
            </section>
          </section>

          <!--第一球 到 第五球-->

          <section
            class="fw ylc-dwq"
            v-if="
					         currentMethod.type === 'ylc' &&
					         currentMethod.method === 'DYQ' ||
					         currentMethod.method === 'DEQ' ||
					         currentMethod.method === 'DSQ' ||
					         currentMethod.method === 'DSIQ' ||
					         currentMethod.method === 'DWQ' ||
					         currentMethod.method === 'QWZY'
                 "
          >
            <section class="fw">
              <ul class="fw ylc-title w20" v-for="c in 5">
                <li class="ylc-title-list">号码</li>
                <li class="ylc-title-list">赔率</li>
                <li class="ylc-title-list">金额</li>
              </ul>
            </section>
            <ul class="ylc-bet w100">
              <li
                class="ylc-bet-list ylc-c-bet-list w20 fl nrb"
                style="overflow: initial;"
                :class="{active: item.flag, 'clear': item.code === '总大', nbb: index >= pcdd.allCodeList.length - 5}"
                v-for="(item, index) in pcdd.allCodeList"
                :key="index"
              >
                <section class="w33 fl" @click="listChecked(item)">
                  <span
                    class="ylc-bet-list-num"
                    :class="{'ylc-bet-list-num-number': !isNaN(item.code)}"
                  >{{item.code}}</span>
                </section>
                <span
                  class="fl red ylc-bet-list-odds"
                  style="width:35.999%;"
                  @click="listChecked(item)"
                >{{Utils.toFixed(String(item.odds), 4)}}</span>
                <section class="w33 fl">
                  <input type="text" class="ylc-bet-list-money" v-model="item.money">
                </section>
              </li>
            </ul>
          </section>

          <!--pc蛋蛋-->
          <template v-if="currentMethod.type === 'pcdd'">
            <section class="fw">
              <ul
                class="ylc-title"
                :class="{nrb: index === 3}"
                v-for="(item, index) in 4"
                :key="index"
              >
                <li class="ylc-title-list">号码</li>
                <li class="ylc-title-list">赔率</li>
                <li class="ylc-title-list">金额</li>
              </ul>
            </section>
            <section class="fw">
              <ul class="ylc-bet w100">
                <li
                  class="ylc-bet-list w25"
                  :class="{nrb: (index + 1) % 4 === 0, active: item.flag}"
                  v-for="(item, index) in pcdd.allCodeList"
                  :key="index"
                >
                  <section class="w33 fl" @click="listChecked(item)">
                    <span class="ylc-bet-list-num" :class="pcddAllIcon(item)">{{item.code}}</span>
                  </section>
                  <span
                    class="fl w33 red ylc-bet-list-odds"
                    @click="listChecked(item)"
                  >{{Utils.toFixed(String(item.odds), 4)}}</span>
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
              <ul
                class="ylc-bet ylc-bet-line w25"
                v-if="list.length > 0"
                v-for="(list, index) in pcdd.allBtnList"
                :key="index"
              >
                <li class="fw">
                  <span class="ylc-title-list">号码</span>
                  <span class="ylc-title-list">赔率</span>
                  <span class="ylc-title-list" :class="{nrb: index === 3}">金额</span>
                </li>
                <li
                  class="ylc-bet-list"
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
                <li
                  class="ylc-bet-list"
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
            <a
              href="javascript:;"
              class="ylc-right-title"
              :class="{active: ylcRightTab.show === 0}"
              @click="ylcRightTab.show = 0"
            >出码排行</a>
            <a
              href="javascript:;"
              class="ylc-right-title"
              :class="{active: ylcRightTab.show === 1}"
              @click="ylcRightTab.show = 1"
            >遗漏排行</a>
          </nav>
          <section v-if="ylcRightTab.show === 0" class="ylc-right-tab-cons clear">
            <section class="fw ylc-right-tab-title">
              期数：
              <el-dropdown class="ylc-right-tab-dropdown" trigger="click">
                <span class="el-dropdown-link">
                  <span class="red">菜单</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </section>
            <ul class="fw">
              <li class="ylc-right-tab-con">
                <p class="ylc-right-tab-con-p wzfw">和值11</p>
                <span class="red">@27</span>2115期
              </li>
              <li class="ylc-right-tab-con">
                <p class="ylc-right-tab-con-p wzfw">和值</p>
                <span class="red">@27</span>5期
              </li>
            </ul>
          </section>
          <section v-if="ylcRightTab.show === 1" class="ylc-right-tab-cons clear">
            <section class="fw ylc-right-tab-title">
              期数：
              <el-dropdown class="ylc-right-tab-dropdown" trigger="click">
                <span class="el-dropdown-link">
                  <span class="red">菜单</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </section>
            <ul class="fw">
              <li class="ylc-right-tab-con">
                <p class="ylc-right-tab-con-p wzfw">和值22</p>
                <span class="red">@27</span>2115期
              </li>
              <li class="ylc-right-tab-con">
                <p class="ylc-right-tab-con-p wzfw">和值</p>
                <span class="red">@27</span>5期
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
          <input
            type="text"
            min="0"
            max="10000"
            maxlength="5"
            class="ylc-kx-info-text"
            v-model="kxInfo.blue"
            value="10"
            placeholder="未设置"
          >
          <span class="ylc-kx-info-clear" @click="kxInfo.blue = 0">清空</span>
        </section>
        <section class="fw ylc-kx-info-list">
          <input
            type="text"
            min="0"
            max="10000"
            maxlength="5"
            class="ylc-kx-info-text"
            v-model="kxInfo.red"
            value="10"
            placeholder="未设置"
          >
          <span class="ylc-kx-info-clear" @click="kxInfo.red = 0">清空</span>
        </section>
        <section class="fw ylc-kx-info-list">
          <input
            type="text"
            min="0"
            max="10000"
            maxlength="5"
            class="ylc-kx-info-text"
            v-model="kxInfo.green"
            value="10"
            placeholder="未设置"
          >
          <span class="ylc-kx-info-clear" @click="kxInfo.green = 0">清空</span>
        </section>
        <section class="fw ylc-kx-info-list">
          <input
            type="text"
            min="0"
            max="10000"
            maxlength="5"
            class="ylc-kx-info-text"
            v-model="kxInfo.violet"
            value="10"
            placeholder="未设置"
          >
          <span class="ylc-kx-info-clear" @click="kxInfo.violet = 0">清空</span>
        </section>
        <section class="fw ylc-kx-info-list">
          <input
            type="text"
            min="0"
            max="10000"
            maxlength="5"
            class="ylc-kx-info-text"
            v-model="kxInfo.drakBlue"
            value="10"
            placeholder="未设置"
          >
          <span class="ylc-kx-info-clear" @click="kxInfo.drakBlue = 0">清空</span>
        </section>

        <section class="ylc-kx-info-btns">
          <span class="ylc-kx-info-btn" @click="kxInfo.show = false">取消</span>
          <span class="ylc-kx-info-btn" @click="kxInfoSave()">保存</span>
        </section>
      </section>
    </section>

    <!--投注弹出框-->
    <el-dialog title="下注清单" :visible.sync="submitDialog" class="ylc-submit" width="30%">
      <ul class="fw ylc-bet-titles">
        <li class="ylc-bet-title">号码</li>
        <li class="ylc-bet-title">赔率</li>
        <li class="ylc-bet-title">单注金额</li>
      </ul>
      <ul class="fw ylc-bet-contents">
        <li class="ylc-bet-content" v-for="(item, index) in currentOrder.list" :key="index">
          <p class="ylc-bet-content-l">
            {{item.name}}
            <span class="red">@{{item.code}}</span>
          </p>
          <p class="ylc-bet-content-c">{{item.odds}}</p>
          <p class="ylc-bet-content-r">{{Utils.toFixed(String(item.money))}}</p>
        </li>
      </ul>
      <section class="fw ylc-bet-count red">
        总计：
        <span
          class="fr"
        >{{currentOrder.list.length}}注 / {{Utils.toFixed(String(currentOrder.betMoney))}}元</span>
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
        <ul class="dinv">
          <li class="ylc-kx-footer-moneys-list" @click="kxInfoSelect(kxInfo.blue2, $event)">{{kxInfo.blue2}}</li>
          <li class="ylc-kx-footer-moneys-list" @click="kxInfoSelect(kxInfo.red2, $event)">{{kxInfo.red2}}</li>
          <li
            class="ylc-kx-footer-moneys-list"
            @click="kxInfoSelect(kxInfo.green2, $event)"
          >{{kxInfo.green2}}</li>
          <li
            class="ylc-kx-footer-moneys-list"
            @click="kxInfoSelect(kxInfo.violet2, $event)"
          >{{kxInfo.violet2}}</li>
          <li
            class="ylc-kx-footer-moneys-list"
            @click="kxInfoSelect(kxInfo.drakBlue2, $event)"
          >{{kxInfo.drakBlue2}}</li>
        </ul>
        <span class="ylc-kx-footer-moneys-much">金额:</span>
        <input type="text" class="ylc-kx-footer-moneys-text" v-model="currentOrder.money">
        <span class="ylc-kx-footer-confirm" @click="confirm()">确认投注</span>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import methods from '../../lib/config/method'
import prizes from '../../lib/config/prizes'
import Utils from '../../lib/utils/utils'
export default {
  name: 'ylc',
  data() {
    return {
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
    ...mapGetters([
      'allMethods',
      'currentLottery',
      'currentMethod',
      'currentIssue',
      'account',
      'chengeYlcPlays',
      'userConfig',
      'userDetail'
    ])
  },
  watch: {
    // 切换 娱乐城彩种时
    currentMethod() {
      this.pcddAllList()
    },

    // 快选输入金钱时
    'currentOrder.money': {
      handler(newVal) {
        let [codeList = this.pcdd.allCodeList] = []
        if (isNaN(newVal)) {
          newVal = 0
        }
        // 娱乐城龙虎斗
        if (this.currentMethod.method === 'LHD') {
          for (const k of Object.keys(codeList)) {
            for (const i of codeList[k]) {
              for (const j of i.code) {
                if (j.flag) {
                  j.money = newVal
                }
              }
            }
          }
          return
        }
        // 娱乐城整合
        if (
          this.currentMethod.method === 'ZH' ||
          this.currentMethod.method === 'LMP'
        ) {
          for (const k of codeList) {
            for (const i of k.code) {
              if (i.flag) {
                i.money = newVal
              }
            }
          }
          return
        }

        for (const k of codeList) {
          if (k.flag) {
            k.money = newVal
          }
        }

        for (const k of this.pcdd.allBtnList) {
          for (const i of k) {
            if (i.flag) {
              i.money = newVal
            }
          }
        }
      },
      deep: true
    },

    // 金钱发生变化时
    'pcdd.allBtnList': {
      handler(newVal) {
        for (const k of newVal) {
          for (const i of k) {
            if (isNaN(i.money)) {
              i.money = 0
            } else if (i.money) {
              if (Number(i.money) < 1) {
                i.money = 0
              }
              if (Number(i.money) > 1000000) {
                i.money = 1000000
              }
            }
          }
        }
      },
      deep: true
    },

    // 金钱发生变化时
    'pcdd.allCodeList': {
      handler(newVal) {
        // 娱乐城龙虎斗
        if (this.currentMethod.method === 'LHD') {
          for (const k of Object.keys(newVal)) {
            for (const i of newVal[k]) {
              for (const j of i.code) {
                if (isNaN(j.money)) {
                  j.money = 0
                } else if (j.money) {
                  if (Number(j.money) < 1) {
                    j.money = 0
                  }
                  if (Number(j.money) > 1000000) {
                    j.money = 1000000
                  }
                }
              }
            }
          }

          return
        }

        // 娱乐城整合
        if (this.currentMethod.method === 'ZH') {
          for (const k of newVal) {
            for (const i of k.code) {
              if (isNaN(i.money)) {
                i.money = 0
              } else if (i.money) {
                if (Number(i.money) < 1) {
                  i.money = 0
                }
                if (Number(i.money) > 1000000) {
                  i.money = 1000000
                }
              }
            }
          }

          return
        }

        for (const k of newVal) {
          if (isNaN(k.money)) {
            k.money = 0
          } else if (k.money) {
            if (Number(k.money) < 1) {
              k.money = 0
            }
            if (Number(k.money) > 1000000) {
              k.money = 1000000
            }
          }
        }
      },
      deep: true
    }
  },
  created() {
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
  mounted() {
    let [ylcList = this.$refs.ylclist, width = 0] = []

    for (const k of ylcList) {
      width += k.clientWidth
    }

    this.$refs.ylcNav.style.width = width + 'px'
  },
  methods: {
    // 切换 官方 和 娱乐城 玩法
    chengePlay() {
      let json = {
        name: 'official',
        index: 0
      }
      this.$store.commit('chengeYlcPlays', json)
    },

    //切换娱乐城 小玩法
    checkedPlay(item, index) {
      let json = {
        name: 'casino',
        index: index
      }
      this.$store.commit('chengeYlcPlays', json)
      this.ylcListOn = item.sign
    },

    //取消提交
    submitClose() {
      this.submitDialog = false
    },

    //提交
    confirm() {
      let [
        allCodeList = this.pcdd.allCodeList,
        allBtnList = this.pcdd.allBtnList,
        list = [],
        money = 0
      ] = []
      this.currentOrder.betMoney = 0

      // 娱乐城整合
      if (
        this.currentMethod.method === 'ZH' ||
        this.currentMethod.method === 'LMP'
      ) {
        for (const k of allCodeList) {
          for (const i of k.code) {
            if (i.flag) {
              if (Number(i.money) <= 0) {
                this.$alert('你还未投注 或 投注错误', '提示', {
                  confirmButtonText: '确定'
                })
                return false
              }
              money += Number(i.money)
              i.type = k.sign
              i.name = k.name
              list.push(i)
            }
          }
        }
      }

      // 娱乐城龙虎斗
      else if (this.currentMethod.method === 'LHD') {
        for (const k of Object.keys(allCodeList)) {
          for (const i of allCodeList[k]) {
            for (const j of i.code) {
              if (Number(j.flag)) {
                if (Number(j.money) <= 0) {
                  this.$alert('你还未投注 或 投注错误', '提示', {
                    confirmButtonText: '确定'
                  })
                  return false
                }
                money += Number(j.money)
                j.type = i.sign
                j.name = i.name.substr(0, 2)
                list.push(j)
              }
            }
          }
        }
      } else {
        let [name = ''] = []

        for (const k of this.allMethods) {
          if (k.sign === this.currentMethod.method) {
            name = k.name
          }
        }

        for (const k of allCodeList) {
          if (k.flag) {
            if (+k.money <= 0) {
              this.$alert('你还未投注 或 投注错误', '提示', {
                confirmButtonText: '确定'
              })
              return false
            }
            money += +k.money
            k.name = name
            list.push(k)
          }
        }

        // PC 蛋蛋 大小 类

        for (const k of allBtnList) {
          for (const i of k) {
            if (i.flag) {
              if (+i.money <= 0) {
                this.$alert('你还未投注 或 投注错误', '提示', {
                  confirmButtonText: '确定'
                })
                return false
              }
              money += +i.money
              i.name = name
              list.push(i)
            }
          }
        }
      }

      if (list.length < 1) {
        this.$alert('你还未投注 或 投注错误', '提示', {
          confirmButtonText: '确定'
        })
        return
      }

      this.currentOrder.list = list
      this.currentOrder.betMoney = money
      this.submitDialog = true
    },

    //投注
    bet() {
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
          codes: isNaN(list[i].code) ? list[i].upload : list[i].code + '',
          count: this.currentOrder.list.length,
          times: 1,
          cost: this.currentOrder.betMoney,
          mode: 1,
          prize_group: this.account.prize_group,
          price: 2
        }
        order.push(json)
      }

      issus[currentIssus] = true

      if (
        parseInt(this.currentOrder.betMoney) <= 0 ||
        this.currentOrder.list.length === 0
      ) {
        this.$alert('你还未投注 或 投注错误', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }

      this.Api.bet(
        this.currentLottery.en_name,
        issus,
        order,
        this.currentOrder.betMoney
      ).then(res => {
        if (res.isSuccess) {
          this.$alert(
            '投注成功, 您可以通过”游戏记录“查询您的投注记录！',
            '提示',
            {
              confirmButtonText: '确定'
            }
          )
          // 添加完选号 清空选中号码
          this.clearCode()

          // 获取我的投注 我的追号记录
          this.$store.dispatch('betHistory')
          // 刷新余额
          this.Api.getBalance().then(res => {
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
    kxInfoSelect(item, e) {
      let [
        allCodeList = this.pcdd.allCodeList,
        allBtnList = this.pcdd.allBtnList
      ] = []
      this.currentOrder.money = Number(item) + Number(this.currentOrder.money)
      
  
      e.target.className += ' active'
      setTimeout( () => {
        e.target.className = 'ylc-kx-footer-moneys-list'
      }, 350)
      // 娱乐城龙虎斗
      if (this.currentMethod.method === 'LHD') {
        for (const k of Object.keys(allCodeList)) {
          for (const i of allCodeList[k]) {
            for (const j of i.code) {
              if (j.flag) {
                j.money = this.currentOrder.money
              }
            }
          }
        }

        return
      }

      for (const k of allCodeList) {
        if (k.flag) {
          k.money = this.currentOrder.money
        }
      }

      for (const k of allBtnList) {
        for (const i of k) {
          if (i.flag) {
            i.money = this.currentOrder.money
          }
        }
      }
    },

    // 快选金额设置
    kxInfoSave() {
      if (isNaN(this.kxInfo.blue)) {
        this.kxInfo.blue = 0
      }
      if (isNaN(this.kxInfo.red)) {
        this.kxInfo.red = 0
      }
      if (isNaN(this.kxInfo.green)) {
        this.kxInfo.green = 0
      }
      if (isNaN(this.kxInfo.violet)) {
        this.kxInfo.violet = 0
      }
      if (isNaN(this.kxInfo.drakBlue)) {
        this.kxInfo.drakBlue = 0
      }
      this.kxInfo.blue2 = this.kxInfo.blue
      this.kxInfo.red2 = this.kxInfo.red
      this.kxInfo.green2 = this.kxInfo.green
      this.kxInfo.violet2 = this.kxInfo.violet
      this.kxInfo.drakBlue2 = this.kxInfo.drakBlue
      this.kxInfo.show = false
      Utils.storage.set('kxInfo', this.kxInfo)
    },

    // 选中的列表项
    listChecked(item) {
      if (!item.flag) {
        item.flag = true
        item.money = this.currentOrder.money
      } else {
        item.money = 0
        item.flag = false
      }
    },

    // pc蛋蛋 娱乐城 渲染列表
    pcddAllList() {
      let [
        list = this.currentMethod.layout.codes,
        all = this.allMethods,
        prize = prizes[this.currentLottery.series_id]['casino'][this.currentMethod.method],
      ] = []
      this.pcdd.allCodeList = []

      // pc蛋蛋
      if (this.currentMethod.type === 'pcdd') {
        let [
          tempList = [],
          temList = [],
        ] = []
        for (let i = 0; i < Math.ceil(list.length / 4); i++) {
          tempList.push([])
        }

        // 处理数据
        for (const k of Object.keys(list)) {
          let json = {}
          json.code = list[k]
          json.money = 0
          json.flag = false
          json.odds = 80.0
          tempList[Number(k) % Math.ceil(list.length / 4)].push(json)
        }

        for (const k of tempList) {
          temList = temList.concat(k)
        }
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

        for (const k of all) {
          
          // 第一球
          if (k.sign === 'DYQ') {
            let json = {}
            json.sign = k.sign
            json.name = '第一球'
            json.code = []
            for (const i of casino.DYQ.layout.codes) {
              // 两面盘
              if (this.currentMethod.method === 'LMP' && isNaN(i)) {
                let codeJson = {}
                codeJson.code = i
                codeJson.money = 0
                codeJson.flag = false
                codeJson.odds = 80.0
                json.code.push(codeJson)
              }
              // 整合
              else if (this.currentMethod.method === 'ZH') {
                let codeJson = {}
                codeJson.code = i
                codeJson.money = 0
                codeJson.flag = false
                codeJson.odds = 80.0
                
                json.code.push(codeJson)
              }
            }

            temp.push(json)
          }
          
          // 第二球
          else if (k.sign === 'DEQ') {
            let json = {}
            json.sign = k.sign
            json.name = '第二球'
            json.code = []
            for (const i of casino.DEQ.layout.codes) {
              // 两面盘
              if (this.currentMethod.method === 'LMP' && isNaN(i)) {
                let codeJson = {}
                codeJson.code = i
                codeJson.money = 0
                codeJson.flag = false
                codeJson.odds = 80.0
                json.code.push(codeJson)
              }
              // 整合
              else if (this.currentMethod.method === 'ZH') {
                let codeJson = {}
                codeJson.code = i
                codeJson.money = 0
                codeJson.flag = false
                codeJson.odds = 80.0
                json.code.push(codeJson)
              }
            }

            temp.push(json)
          }

          // 第三球
          else if (k.sign === 'DSQ') {
            let json = {}
            json.sign = k.sign
            json.name = '第三球'
            json.code = []
            for (const i of casino.DSQ.layout.codes) {
              // 两面盘
              if (this.currentMethod.method === 'LMP' && isNaN(i)) {
                let codeJson = {}
                codeJson.code = i
                codeJson.money = 0
                codeJson.flag = false
                codeJson.odds = 80.0
                json.code.push(codeJson)
              }
              // 整合
              else if (this.currentMethod.method === 'ZH') {
                let codeJson = {}
                codeJson.code = i
                codeJson.money = 0
                codeJson.flag = false
                codeJson.odds = 80.0
                json.code.push(codeJson)
              }
            }

            temp.push(json)
          }
          
          // 第四球
          else if (k.sign === 'DSIQ') {
            let json = {}
            json.sign = k.sign
            json.name = '第四球'
            json.code = []
            for (const i of casino.DSIQ.layout.codes) {
              // 两面盘
              if (this.currentMethod.method === 'LMP' && isNaN(i)) {
                let codeJson = {}
                codeJson.code = i
                codeJson.money = 0
                codeJson.flag = false
                codeJson.odds = 80.0
                json.code.push(codeJson)
              }
              // 整合
              else if (this.currentMethod.method === 'ZH') {
                let codeJson = {}
                codeJson.code = i
                codeJson.money = 0
                codeJson.flag = false
                codeJson.odds = 80.0
                json.code.push(codeJson)
              }
            }

            temp.push(json)
          }

          // 第五球
          else if (k.sign === 'DWQ') {
            let json = {}
            json.sign = k.sign
            json.name = '第五球'
            json.code = []
            for (const i of casino.DWQ.layout.codes) {
              // 两面盘
              if (this.currentMethod.method === 'LMP' && isNaN(i)) {
                let codeJson = {}
                codeJson.code = i
                codeJson.money = 0
                codeJson.flag = false
                codeJson.odds = 80.0
                json.code.push(codeJson)
              }
              // 整合
              else if (this.currentMethod.method === 'ZH') {
                let codeJson = {}
                codeJson.code = i
                codeJson.money = 0
                codeJson.flag = false
                codeJson.odds = 80.0
                json.code.push(codeJson)
              }
            }

            temp.push(json)
          }
        }

        // 球数总和
        let json = {}
        json.sign = 'all'
        json.name = '总和'
        json.code = [
          { code: '总大', money: 0, flag: false, odds: 80 },
          { code: '总小', money: 0, flag: false, odds: 80 },
          { code: '总单', money: 0, flag: false, odds: 80 },
          { code: '总双', money: 0, flag: false, odds: 80 }
        ]
        temp.push(json)
        
        for (const k of temp) {
   
          for (const i of Object.keys(prize)) {
            if (k.sign === i) {
              
              for (const j of k.code) {
  
                for (const l of Object.keys(prize[i])) {
                  
                  if (String(j.code) === l) {
  
                    j.odds = 2 / (prize[i][l].count / prize[i][l].total) * this.userDetail.prize_group / 2000 + .00000001
                    
                  }
                }
              }
            }
          }
        }
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
        let [tempList = [], temp = [], tempa = [], allCodeList = []] = []

        for (const k of Object.keys(list)) {
          if (+k < 4) {
            temp.push(list[k])
          } else {
            tempa.push(list[k])
          }
        }

        tempList = tempList.concat(tempa, temp)

        for (const k of tempList) {
          let json = {}
          json.code = k
          json.money = 0
          json.flag = false
          json.odds = 80.0
          allCodeList.push(json)
        }
  
        for (const k of allCodeList) {
          
          for (const i of Object.keys(prize)) {
            
            if (String(k.code) === i) {
  
              k.odds = 2 / (prize[i].count / prize[i].total) * this.userDetail.prize_group / 2000 + .00000001
              
            }
          }
        }
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

        for (const k of all) {
          if (k.sign === 'LHD') {
            for (const i of Object.keys(list)) {
              for (const j of Object.keys(temp)) {
                if (i === j) {
                  for (const m of list[i]) {
                    let json = {}
                    switch (m) {
                      case 'wq':
                        json.name = '万千 第一球 vs 第二球'
                        json.code = [
                          { code: '龙', odds: 2.8, flag: false, money: 0 },
                          { code: '和', odds: 2.8, flag: false, money: 0 },
                          { code: '虎', odds: 2.8, flag: false, money: 0 }
                        ]
                        break
                      case 'wb':
                        json.name = '万百 第一球 vs 第三球'
                        json.code = [
                          { code: '龙', odds: 2.8, flag: false, money: 0 },
                          { code: '和', odds: 2.8, flag: false, money: 0 },
                          { code: '虎', odds: 2.8, flag: false, money: 0 }
                        ]
                        break
                      case 'ws':
                        json.name = '万十 第一球 vs 第四球'
                        json.code = [
                          { code: '龙', odds: 2.8, flag: false, money: 0 },
                          { code: '和', odds: 2.8, flag: false, money: 0 },
                          { code: '虎', odds: 2.8, flag: false, money: 0 }
                        ]
                        break
                      case 'wg':
                        json.name = '万个 第一球 vs 第五球'
                        json.code = [
                          { code: '龙', odds: 2.8, flag: false, money: 0 },
                          { code: '和', odds: 2.8, flag: false, money: 0 },
                          { code: '虎', odds: 2.8, flag: false, money: 0 }
                        ]
                        break
                      case 'qb':
                        json.name = '千百 第二球 vs 第三球'
                        json.code = [
                          { code: '龙', odds: 2.8, flag: false, money: 0 },
                          { code: '和', odds: 2.8, flag: false, money: 0 },
                          { code: '虎', odds: 2.8, flag: false, money: 0 }
                        ]
                        break
                      case 'qs':
                        json.name = '千十 第二球 vs 第四球'
                        json.code = [
                          { code: '龙', odds: 2.8, flag: false, money: 0 },
                          { code: '和', odds: 2.8, flag: false, money: 0 },
                          { code: '虎', odds: 2.8, flag: false, money: 0 }
                        ]
                        break
                      case 'qg':
                        json.name = '千个 第二球 vs 第五球'
                        json.code = [
                          { code: '龙', odds: 2.8, flag: false, money: 0 },
                          { code: '和', odds: 2.8, flag: false, money: 0 },
                          { code: '虎', odds: 2.8, flag: false, money: 0 }
                        ]
                        break
                      case 'bs':
                        json.name = '百十 第三球 vs 第四球'
                        json.code = [
                          { code: '龙', odds: 2.8, flag: false, money: 0 },
                          { code: '和', odds: 2.8, flag: false, money: 0 },
                          { code: '虎', odds: 2.8, flag: false, money: 0 }
                        ]
                        break
                      case 'bg':
                        json.name = '百个 第三球 vs 第五球'
                        json.code = [
                          { code: '龙', odds: 2.8, flag: false, money: 0 },
                          { code: '和', odds: 2.8, flag: false, money: 0 },
                          { code: '虎', odds: 2.8, flag: false, money: 0 }
                        ]
                        break
                      case 'sg':
                        json.name = '十个 第四球 vs 第五球'
                        json.code = [
                          { code: '龙', odds: 2.8, flag: false, money: 0 },
                          { code: '和', odds: 2.8, flag: false, money: 0 },
                          { code: '虎', odds: 2.8, flag: false, money: 0 }
                        ]
                        break
                    }
                    json.sign = m
                    temp[j].push(json)
                  }
                }
              }
            }
          }
        }
        
        for (const k of Object.keys(temp)) {
  
          for (const i of temp[k]) {
  
            for (const j of Object.keys(prize)) {
              
              if (i.sign === j) {
             
                for (const p of i.code) {
                  
                  for (const l of Object.keys(prize[j])) {
                    
                    if (p.code === l) {
                      
                      p.odds = 2 / (prize[j][l].count / prize[j][l].total) * this.userDetail.prize_group / 2000 + .00000001
                    }
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
        for (const k of all) {
          if (k.sign === 'QWZY') {
            for (const i of list) {
              let json = {}
              json.code = i
              json.money = 0
              json.flag = false
              for (const j of Object.keys(prize)) {
                if (String(i) === j) {
  
                  json.odds = 2 / (prize[i].count / prize[i].total) * this.userDetail.prize_group / 2000 + .00000001

                }
              }
              this.pcdd.allCodeList.push(json)
            }
          }
        }
      }
    },

    // pc蛋蛋 大小单双类
    pcddAllbtn() {
      let [list = this.currentMethod.buttons, tempList = []] = []

      for (let i = 0; i < Math.ceil(list.length / 4); i++) {
        tempList.push([])
      }

      for (const k of this.allMethods) {
        for (const i of list) {
          let json = {}
          json.code = i
          json.flag = false
          json.money = 0
          json.odds = 27.2222

          if (k.sign === 'DXDS') {
            if (i === '大' || i === '小' || i === '单' || i === '双') {
              tempList[0].push(json)
            }
            if (i === '大单' || i === '大双' || i === '小单' || i === '小双') {
              tempList[1].push(json)
            }
            if (i === '极大' || i === '极小') {
              tempList[2].push(json)
            }
          }

          if (k.sign === 'BO') {
            if (i === '红波' || i === '蓝波' || i === '绿波') {
              if (i === '红波') {
                json.class = 'ylc-red'
              } else if (i === '蓝波') {
                json.class = 'ylc-blue'
              } else if (i === '绿波') {
                json.class = 'ylc-green'
              }

              tempList[3].push(json)
            }
          }
          if (k.sign === 'BZ') {
            if (i === '豹子') {
              tempList[3].push(json)
            }
          }
        }
      }
      this.pcdd.allBtnList = tempList
    },

    // pc蛋蛋整合  号码背景图
    pcddAllIcon(item) {
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
    clearCode() {
      let [codeList = this.pcdd.allCodeList] = []

      // 娱乐城龙虎斗
      if (this.currentMethod.method === 'LHD') {
        for (const k of Object.keys(codeList)) {
          for (const i of codeList[k]) {
            for (const j of i.code) {
              j.flag = false
              j.money = 0
            }
          }
        }

        return
      }

      // 娱乐城整合
      if (
        this.currentMethod.method === 'ZH' ||
        this.currentMethod.method === 'LMP'
      ) {
        for (const k of codeList) {
          for (const i of k.code) {
            i.flag = false
            i.money = 0
          }
        }
        return
      }

      for (const k of codeList) {
        k.flag = false
        k.money = 0
      }

      for (const k of this.pcdd.allBtnList) {
        for (const i of k) {
          i.flag = false
          i.money = 0
        }
      }
    }
  }
}
</script>
