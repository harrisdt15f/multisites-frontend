<template>
  <section class="fw w100">
    <section
      v-if="currentLottery.en_name !== 'bjxy28' && chengeYlcPlays.name === 'official'" class="w">
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
        <div class="main-center-wrap clearfix">
          <div class="main-left">
            <div class="bet-type-group" v-if="selectedGroup" :style="{minHeight: typeGroup}">
              <div class="bet-type-group-warp">
                <div class="method-current-prize">
                  <template v-if="!Array.isArray(countPrizes())">
                    单注奖金: <span style="color:#FF5656;">{{countPrizes()}}</span> 元
                  </template>
                  
                  <template v-else>
                    单注奖金:
                    <el-select style="width:150px;" v-model="prizeSelect" :placeholder="prizeSelect">
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
                </div>
              </div>
            </div>
            <game-select></game-select>
          </div>
          <section class="main-right">
            <section class="list-historys">
              <section class="record"></section>
              <table width="100%" class="bet-table-trend">
                <thead>
                  <tr>
                    <th class="th">奖期</th>
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
                          v-for="(num, numIndex) in item.code.split(',')"
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
        </div>
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
      'currentMethodGroup',
      'userConfig'
    ])
  },

  data() {
    return {
      loading: false,
      selectedGroup: '',
      selectedGroupIndex: '',
      selectedMethodId: '',
      typeGroup: '',
      // 彩种id
      gameId: [
        [1, 2, 3, 4, 5], //ssc
        [6, 7, 8, 9, 10, 11], //11x5
        [12, 13, 14, 15, 16], //k3
        [21, 22, 23], //pk10
        [17, 18], //f3d
        [19], //ssl
        [20], //pl35
        [24] //lhc
      ],
      prizeSelect: '一等奖'
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
    this.selectGroup(this.defaultGroup)
  },
  methods: {
    
    //奖金计算
    countPrizes () {
      let [
        prize = prizes[this.currentLottery.series_id]['official'][this.currentMethod.method],
        count = 0,
        arr = []
      ] = []
  
  
      for (const k of this.gameId) {
  
        for (const i of k) {
    
          if (this.currentLottery.id === i) {
      
            // 单个奖金时
            if (!Array.isArray(prize.count)) {
              
              // if (i === 1) {
              //   count = this.userConfig.mode * this.userConfig.singlePrice / (prize.count / prize.total) * (this.lottery.countPrize - 20) / 1980 + .00000001
              // }else
  
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
                
                
                // if (i === 1) {
                //   count = this.userConfig.mode * this.userConfig.singlePrice / (prize.count[j] / prize.total) * (this.lottery.countPrize - 20) / 1980 + .00000001
                // }else
                //
                 if (i === 17 || i === 20) {
                  count = this.userConfig.mode * this.userConfig.singlePrice / (prize.count[j] / prize.total) * (this.lottery.countPrize - 30) / 2000 + .00000001
                }
                
                else {
                  count = this.userConfig.mode * this.userConfig.singlePrice / (prize.count[j] / prize.total) * this.lottery.countPrize / 2000 + .00000001
                }
  
                json.value = j
                json.label = (+j + 1) + ' 等奖 ' + this.Utils.toFixed(String(count)) + ' 元'
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
    selectGroup(groupSign, _index = 0, group) {
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

</style>
