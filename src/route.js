import Vue from 'vue'
import Router from 'vue-router'

import { API } from './API'
import Utils  from './lib/utils/utils'

import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import Home from './views/Home'
import GameMain from './views/game/GameMain'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/login', name: 'login', component: Login},
        { path: '/register', name: 'register', component: Register },
        { path: '/home', name: 'home', component: Home,
            children: [
                { path: '/bet/:lotterySign', component: GameMain, props: true }
            ]
        }
    ]
});


router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPageNames = ['login', 'register','about']
    const authRequired = !publicPageNames.includes(to.name)
    const currentUser = Utils.storage.get('current-user')
    if (authRequired && (!currentUser || currentUser.data.user_id <= 0)) {
        return next('/login')
    }
    next()
});

export default router