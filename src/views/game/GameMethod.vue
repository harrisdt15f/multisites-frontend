<template>
  <section class="fw">
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
                @click="selectGroup(_group.sign, _index)"
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
          <div class="main-left">
            <div class="bet-type-group" v-if="selectedGroup">
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
              <section class="cur more">查看完整走势</section>
            </section>
          </section>
        </div>
        <game-order></game-order>
      </section>
    </section>
    <GameYlc v-if="chengeYlcPlays.name === 'casino'"></GameYlc>
  </section>
</template> 
<script>
import methods from "../../lib/config/method";
import GameSelect from "./GameSelect";
import GameOrder from "./GameOrder";
import GameYlc from "../../components/game/ylc";
import { mapGetters } from "vuex";

export default {
  name: "game-method",
  computed: {
    ...mapGetters([
      "lotteryAll",
      "currentLottery",
      "allMethods",
      "defaultGroup",
      "defaultMethod",
      "currentMethod",
      "bet",
      "chengeYlcPlays"
    ])
  },

  data() {
    return {
      loading: false,
      selectedGroup: "",
      selectedGroupIndex: "",
      selectedMethodId: ""
    };
  },
  watch: {
    // 官方彩 和 娱乐城的切换
    chengeYlcPlays(newVal) {
      let lottery = this.lotteryAll[this.currentLottery.en_name];
      if (newVal.name === "official") {
        this.$store.commit("allMethods", lottery.methodConfig);
      } else if (newVal.name === "casino") {
        this.$store.commit("allMethods", lottery.methodConfig2);
      }
      this.selectGroup(this.defaultGroup, newVal.index);
    }
  },
  created() {
    this.selectGroup(this.defaultGroup);
    this.selectMethod(this.defaultMethod);
  },
  methods: {
    //切换娱乐城玩法
    chengePlay() {
      let json = {
        name: "casino",
        index: 0
      };
      this.$store.commit("chengeYlcPlays", json);
    },
    // 选中玩法组
    selectGroup(groupSign, _index = 0) {
      this.selectedGroup = groupSign;
      this.selectedGroupIndex = _index;
      this.selectedMethodId = "";
      this.$store.commit("currentMethod", {});
      this.selectMethod(
        this.allMethods[_index]["rows"][0]["methods"][0]["method_id"]
      );
      this.$store.commit("methodsTab");
    },
    // 选中玩法
    selectMethod(methodId) {
      let [play = null] = [];
      if (this.chengeYlcPlays.name === "official") {
        play = methods[this.currentLottery.series_id].official[methodId];
      } else {
        play = methods[this.currentLottery.series_id].casino[methodId];
      }
      this.$store.commit("currentMethod", play);
      this.selectedMethodId = methodId;
      this.$store.commit("methodsTab");
    }
  },
  components: {
    GameOrder,
    GameSelect,
    GameYlc
  }
};
</script>

<style lang="scss" scoped>

</style>
