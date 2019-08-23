<template>
  <section class="w100">
    <section
      v-if="currentLottery.en_name !== 'bjxy28' && chengeYlcPlays.name === 'official'" class="w">
      <!-- 选号区 -->
      <section class="main-center">
        <div class="bet-type-crow">
          <section class="bet-type-crows">
            <ul>
              <li
                class="bet-type-crow-li"
                v-for="(_group, _index) in allMethods"
                :key="_index"
                @click="selectGroup(_group.sign, _index, _group)"
                v-bind:class="{'on':_group.sign === selectedGroup}">
                <span class="bet-type-crow-name">{{_group.name}}</span>
                <span class="bet-type-group-name"></span>
              </li>
            </ul>
            <div v-if="currentLottery.hasrx" class="bet-type-optional">
              <span></span>
            </div>
          </section>
          <section class="bet-plays" v-if="currentLottery.series_id === 'ssc'">
            <div class="bet-play active">官方</div>
            <div class="bet-play" @click="chengePlay()">娱乐城</div>
          </section>
        </div>
        <div class="main-center-wrap">
          <div v-if="currentLottery.series_id !== 'lhc'" class="right-collapse" @click="handleCollapseRight">
            {{this.collapseRight ? '收起开奖记录' : '展开开奖记录'}}</div>
          <div class="main-left">
            <div class="bet-type-group" v-if="selectedGroup" :style="{minHeight: typeGroup}">
              <div class="bet-type-group-warp">
                <div class="method-current-prize">
                  <template v-if="!Array.isArray(countPrizes())">
                    单注奖金: <span style="color:#FF5656;">{{countPrizes()}}</span> 元
                  </template>
                  
                  <template v-else>
                    单注奖金:
                    <el-select style="width:165px;" v-model="prizeSelect" :placeholder="prizeSelect">
                      <el-option
                              v-for="(item, index) in countPrizes()"
                              :key="index"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                  
                </div>
                <div
                  class="bet-type-group-list"
                  v-for="(row, _rowIndex) in allMethods[selectedGroupIndex]['rows']"
                  :key="_rowIndex">
                  <template v-if="row.methods.length > 1">
                    <div class="group-name">{{row.name}}</div>
                    <ul>
                      <li
                        class="bet-type-group-list-li"
                        v-for="(method, mkey) in row.methods"
                        :key="mkey"
                        v-bind:class="{'on':method.method_id === selectedMethodId}"
                        @click="selectMethod(method.method_id)"
                      >{{method.method_name}}</li>
                    </ul>
                  </template>
                  <template v-if="row.methods[0].method_id === 'LTBDW'">
                    <div class="group-name">{{row.name}}</div>
                    <ul>
                      <li
                        class="bet-type-group-list-li"
                        v-for="(method, mkey) in row.methods"
                        :key="mkey"
                        v-bind:class="{'on':method.method_id === selectedMethodId}"
                        @click="selectMethod(method.method_id)"
                      >前三不定位</li>
                    </ul>
                  </template>
                </div>
              </div>
            </div>
            <game-select @countPrizes="countPrizes" :countPrizes="countPrizes()"></game-select>
          </div>
          <transition name="el-zoom-in-center">
            <section class="main-right" v-show="collapseRight">
              <section class="list-historys">
                <section class="record"></section>
                <table v-if="bet.issueHistory" width="100%" class="bet-table-trend">
                  <thead>
                    <tr>
                      <th class="th" style="width:124px">奖期</th>
                      <th class="th">开奖</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      :class="{first: index === 0}"
                      v-for="(item, index) in bet.issueHistory"
                      :key="index">
                      <td class="td"><span class="number">{{item.issue_no}} 期</span></td>
                      <td class="td">
                        <span class="balls">
                            <i
                            class="i curr"
                            v-for="(num, numIndex) in item.code.split(lotteryLists[currentLottery.series_id]['encode_splitter'] || '')"
                            :key="numIndex">{{num}}</i>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <router-link class="cur more" tag="section" to="/user-trends" >
                  查看完整走势
                </router-link>
              </section>
            </section>
          </transition>
        </div>
        <!-- 投注区 -->
        <game-order :countPrizes="countPrizes()"></game-order>
      </section>
    </section>
    <GameYlc v-if="chengeYlcPlays.name === 'casino'"></GameYlc>
  </section>
</template> 
<script>
import methods from '../../lib/config/method'
import prizes from '../../lib/config/prizes'
import GameSelect from './GameSelect'
import GameOrder from './GameOrder'
import GameYlc from '../../components/game/ylc'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'game-method',
  computed: {
    ...mapState([
      'lottery'
    ]),
    ...mapGetters([
      'lotteryAll',
      'currentLottery',
      'allMethods',
      'defaultGroup',
      'defaultMethod',
      'currentMethod',
      'bet',
      'chengeYlcPlays',
      'userDetail',
      'lotteryLists',
      'currentMethodGroup',
      'userConfig'
    ]),
    //获取每个彩种id
    gameId() {
      const gameIdArr = []
      for (const key in this.lotteryLists) {
        const listArr = []
        if (this.lotteryLists.hasOwnProperty(key)) {
          const element = this.lotteryLists[key]
          element.list.forEach(val => {
            listArr.push(val.number_id)
          })
        }
        gameIdArr.push(listArr)
      }
      return gameIdArr
    }
  },
  data() {
    return {
      selectedGroup: '',
      selectedGroupIndex: '',
      selectedMethodId: '',
      collapseRight: true,
      typeGroup: '',
      prizeSelect: '一等奖' //单注奖金
    }
  },
  watch: {
    // 官方彩 和 娱乐城的切换
    chengeYlcPlays(newVal) {
      let lottery = this.lotteryAll[this.currentLottery.en_name]
      if (newVal.name === 'official') {
        this.$store.commit('allMethods', lottery.methodConfig)
      } else if (newVal.name === 'casino') {
        this.$store.commit('allMethods', lottery.methodConfig2)
      }
      this.selectGroup(this.defaultGroup, newVal.index)
    }
  },
  created() {
    //初始化选择玩法
    this.selectGroup(this.defaultGroup)
  },
  methods: {
    //奖金计算
    countPrizes () {
      let [
        prize = prizes[this.currentLottery.series_id] && prizes[this.currentLottery.series_id]['official'][this.currentMethod.method],
        count = 0,
        arr = []
      ] = []
      for (const k of this.gameId) {
        for (const i of k) {
          if(!prize) return
          if (this.currentLottery.id === i) {
            // 单个奖金时
            if (!Array.isArray(prize.count)) {
              
               if (i === 17 || i === 20) {
                count = this.userConfig.mode * this.userConfig.singlePrice / (prize.count / prize.total) * (this.lottery.countPrize - 30) / 2000 + .00000001
              }
  
              else {
                count = this.userConfig.mode * this.userConfig.singlePrice / (prize.count / prize.total) * this.lottery.countPrize / 2000 + .00000001
              }
              
              this.typeGroup = 'auto'
              return this.Utils.toFixed(String(count))
            }

            // 奖金为多个奖级时  数组
            else {
              for (const j of Object.keys(prize.count)) {
                let json = {}
                
                //
                 if (i === 17 || i === 20) {
                  count = this.userConfig.mode * this.userConfig.singlePrice / (prize.count[j] / prize.total) * (this.lottery.countPrize - 30) / 2000 + .00000001
                }
                
                else {
                  count = this.userConfig.mode * this.userConfig.singlePrice / (prize.count[j] / prize.total) * this.lottery.countPrize / 2000 + .00000001
                }
  
                json.value = j
                if (this.currentMethodGroup === 'LH') {
                  if (+j === 0) {
                    json.label = '和 ' + this.Utils.toFixed(String(count)) + ' 元'
                  } else if (+j === 1) {
                    json.label = '龙虎 ' + this.Utils.toFixed(String(count)) + ' 元'
                  }
                } else {
                  json.label = (+j + 1) + ' 等奖 ' + this.Utils.toFixed(String(count)) + ' 元'
                }
                json.prize = count
                arr.push(json)
              }
              this.typeGroup = '78px'
              this.prizeSelect = arr[0].label
              return arr
            }
          }
        }
      }
      // 2÷(1÷165)×1936÷1980
      // 重庆时时彩 1 -20
      // 福彩3d 17 -30
      // 排列35 20 -30
    },
    
    //切换娱乐城玩法
    chengePlay() {
      let json = {
        name: 'casino',
        index: 0
      }
      this.$store.commit('chengeYlcPlays', json)
    },
    // 选中玩法组
    selectGroup(groupSign, _index = 0) {
      this.selectedGroup = groupSign
      this.selectedGroupIndex = _index
      this.selectedMethodId = ''
      this.$store.commit('currentMethod', {})
      this.selectMethod(
        this.allMethods[_index]['rows'][0]['methods'][0]['method_id']
      )
      
      this.$store.commit('currentMethodGroup', this.allMethods[_index]['rows'][0]['methods'][0]['method_group'])
      
      this.$store.commit('methodsTab')
    },
    // 选中玩法
    selectMethod(methodId) {
      let [play = null] = []
      if (this.chengeYlcPlays.name === 'official') {
        play = methods[this.currentLottery.series_id].official[methodId]
      } else {
        play = methods[this.currentLottery.series_id].casino[methodId]
      }
      this.$store.commit('currentMethod', play)
      this.selectedMethodId = methodId
      this.$store.commit('methodsTab')
    },
    //展开历史
    handleCollapseRight(){
      this.collapseRight = !this.collapseRight
    }
  },
  components: {
    GameOrder,
    GameSelect,
    GameYlc
  }
}
</script>

<style lang="scss" scoped>
.bet-type-group-warp{
  position: relative;
  padding-top: 20px;
  min-height: 25px;
}
.method-current-prize{
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 2;
  font-size: 14px;
  box-sizing: border-box;
  text-align: right;
}
.bet-type-group-list:first-child{
  padding-top:20px;
}
.main-center-wrap{
  position: relative;
  .right-collapse{
    cursor: pointer;
    font-size: 12px;
    line-height: 1.5;
    top: 0;
    right: -23px;
    position: absolute;
    width: 23px;
    text-align: center;
    padding: 8px 0;
    background: #ff8800;
    color: #fff;
  }
}

</style>
