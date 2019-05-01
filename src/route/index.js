import Vue from 'vue'
import Router from 'vue-router'

import Utils  from '../lib/utils/utils'

import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Home from '../views/Home'
import GameMain from '../views/game/GameMain'
import Index from '../components/index-closed1'
import Ylc from '../components/game/ylc'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/login', name: 'login', component: Login},
        { path: '/register', name: 'register', component: Register },
        { path: '/home', name: 'home', component: Home,
            children: [
                { path: '', name: 'index-closed1', component: Index},
                { path: '/bet/:lotterySign', name: 'bet', component: GameMain, props: true },
                { path: 'ylc', name: 'ylc', component: Ylc, props: true },
            ]
        },
        { path: '*', redirect: '/home'}
    ]
});


router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPageNames = ['login', 'register','about']
    const authRequired = !publicPageNames.includes(to.name)
    const currentUser = Utils.storage.get('current-user')
    if (authRequired && (!currentUser || currentUser.data.user_id <= 0)) {
        // return next('/login')
    }
    next()
});

export default router