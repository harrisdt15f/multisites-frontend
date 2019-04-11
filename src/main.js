import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'

import {Slider,Form,FormItem,Dialog, Button, Input, InputNumber} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Slider);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Input);
Vue.use(InputNumber);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
