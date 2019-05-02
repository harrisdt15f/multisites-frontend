<template>
	<section class="fw">
		<template v-if="chengePlay !== 'ylc'">
			<div class="bet-type-crow">
				<ul>
					<li class="bet-type-crow-li" v-for="(_group, _index) in allMethods" :key="_index"  @click="selectGroup(_group.sign, _index)" v-bind:class="{'on':_group.sign === selectedGroup}">
						<span class="bet-type-crow-name">{{_group.name}}</span>
						<span class="bet-type-group-name"></span>
					</li>
				</ul>
				<div v-if="currentLottery.hasrx" class="bet-type-optional"><span></span></div>
				<section class="bet-plays">
					<div class="bet-play">官方</div><div class="bet-play" @click="chengePlay()">娱乐城</div>
				</section>
			</div>
			<div  class="bet-type-group" v-if="selectedGroup">
				<div class="bet-type-group-list"  v-for="(row, _rowIndex) in allMethods[selectedGroupIndex]['rows']" :key="_rowIndex">
					<template v-if="row.methods.length > 1">
						<div class="group-name">{{row.name}}</div>
						<ul>
							<li class="bet-type-group-list-li" v-for="(method, mkey) in row.methods" :key="mkey" v-bind:class="{'on':method.method_id === selectedMethodId}" @click="selectMethod(method.method_id)">
								{{method.method_name}}
							</li>
						</ul>
					</template>
				</div>
			</div>
			<game-select></game-select>
			<game-order></game-order>
		</template>
	</section>
</template>
<script>
import methods from '../../lib/config/method'
import GameSelect from './GameSelect'
import GameOrder from './GameOrder'
import { mapState } from 'vuex'

export default {
    name: 'game-method',
    computed: {
      ...mapState([
          'lotteryAll',
          'currentLottery',
          'allMethods',
          'defaultGroup',
          'defaultMethod'
      ])
    },
   
    data() {
      return {
        loading: false,
        selectedGroup: '',
        selectedGroupIndex: '',
        selectedMethodId: ''
      }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        'currentLottery': {
            handler() {
                this.selectGroup(this.defaultGroup, 0)
                this.selectMethod(this.defaultMethod)
            },
            deep: true
        }
    },
		created () {
        this.selectGroup(this.defaultGroup)
        this.selectMethod(this.defaultMethod)
		},
    methods: {
        
        //切换玩法
		    chengePlay () {
            // this.$router.push('/bet/ylc')
            // this.$store.commit('issueDesc', lottery.desc)
            // this.$store.commit('currentLottery', this.lotteryAll[lottery.id].lottery)
            this.$store.commit('chengePlay', 'ylc')
		    },
       
	      // 选中玩法组
	      selectGroup(groupSign, _index = 0) {
	          this.selectedGroup = groupSign
	          this.selectedGroupIndex = _index
	          this.selectedMethodId = ''
	          this.$store.commit('currentMethod', {})
	          this.selectMethod(this.allMethods[_index]['rows'][0]['methods'][0]['method_id'])
			      this.$store.commit('methodsTab')
	      },
	
	      // 选中玩法
	      selectMethod(methodId) {
	          this.$store.commit('currentMethod', methods[this.currentLottery.series_id][methodId])
	          this.selectedMethodId = methodId
	          this.$store.commit('methodsTab')
	      }
    },
		components: {
        GameOrder,
        GameSelect,
		}
}
</script>