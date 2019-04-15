import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
import { API } from './API'
import Utils   from './lib/utils/utils'

import ElementUI  from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.Api = API
Vue.prototype.Utils = Utils
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
