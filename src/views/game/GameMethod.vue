<template id="game-method">
    <div class="bet-type-box">
                <div class="bet-type-crow">
                    <ul id="crowd-menu">
                        <li v-for="(_group, _index) in allMethods" :key="_index"  @click="selectGroup(_group.sign, _index)" v-bind:class="{'on':_group.sign == selectedGroup}">
                            <a href="javascript:;">
                                <span class="bet-type-crow-name">{{_group.name}}</span>
                                <span class="bet-type-group-name"></span>
                            </a>
                        </li>
                    </ul>
                    <div v-if="currentLottery.hasrx" class="bet-type-optional" id="rx"><span></span></div>
                </div>
                <div id="crowd-menu2" v-if="selectedGroup" >
                    <div  class="bet-type-group" v-if="selectedGroup">
                        <div class="bet-type-group-list"  v-for="(row, _rowIndex) in allMethods[selectedGroupIndex]['rows']" :key="_rowIndex">
                            <div class="group-name">{{row.name}}</div>
                            <ul>
                                <li v-for="(method, mkey) in row.methods" :key="mkey" v-bind:class="{'on':method.method_id == selectedMethodId}" @click="selectMethod(method.method_id)">
                                    <a href="javascript:;" class="btn-red"> {{method.method_name}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
</template>
<script>
    import methods from "../../lib//config/method"

    export default {
        name: 'game-method',
        template: '#game-method',
        components: {
        },
        computed: {
            currentLottery: function () {
                return this.$store.state.currentLottery;
            },

            allMethods: function () {
                return this.$store.state.allMethods;
            },

            defaultGroup: function () {
                return this.$store.state.defaultGroup;
            },

            defaultMethod: function () {
                return this.$store.state.defaultMethod;
            },

        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$store.state.defaultGroup': {
                handler() {
                    this.selectGroup(this.defaultGroup, 0);
                    this.selectMethod(this.defaultMethod);
                },
                deep: true
            }
        },
        data() {
            return {
                loading: false,
                selectedGroup: '',
                selectedGroupIndex: '',
                selectedMethodId: '',

            };
        },
        mounted() {
        },
        created () {
        },

        destroyed: function () {

        },

        methods: {
            // 选中玩法组
            selectGroup(groupSign, _index) {
                this.selectedGroup      = groupSign;
                this.selectedGroupIndex = _index;
                this.selectedMethodId   = "";
                this.$store.commit("currentMethod", {});
                this.selectMethod(this.allMethods[_index]['rows'][0]['methods'][0]['method_id']);
            },

            // 选中玩法
            selectMethod(methodId) {
                this.$store.commit("currentMethod", methods[this.currentLottery.series_id][methodId]);
                this.selectedMethodId = methodId;
            },
        }
    };
</script>

<style>

</style>