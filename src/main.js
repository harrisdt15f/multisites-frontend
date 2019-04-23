import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
import { API } from './API'
import Utils from './lib/utils/utils'
import animation from './lib/animation/animation'
import _ from 'lodash'

import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.Api = API
Vue.prototype.Utils = Utils
Vue.prototype.Animation = animation
Vue.prototype._ = _
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
