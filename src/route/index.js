import Vue from 'vue'
import Router from 'vue-router'

import { getToken } from '@/utils/auth'
import store from '@/store'
import { Message } from 'element-ui'

import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Home from '../views/Home'
import GameMain from '../views/game/GameMain'
import Index from '../components/index_new'
import Ylc from '../components/game/ylc'
import UserTrends from '../views/user-trends'
import AgentCenter from '../views/agent-center'
import Active from '../views/active'
import ChessAll from '../views/chess-all'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '', name: 'index', component: Index },
        {
          path: '/bet/:lotterySign',
          name: 'bet',
          component: GameMain,
          props: true
        },
        { path: 'ylc', name: 'ylc', component: Ylc, props: true },
        {
          path: '/user-trends',
          name: 'user-trends',
          component: UserTrends
        },
        {
          path: '/agent-center',
          name: 'agent-center',
          component: AgentCenter
        },
        {
          path: '/active',
          name: 'active',
          component: Active
        },
        {
          path: '/chess-all',
          name: 'chess-all',
          component: ChessAll
        },
      ]
    },
    { path: '*', redirect: '/home' }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else{
      if (store.getters.userDetail && store.getters.userDetail.user_id > 0) {
        next()
      }else {
        store.dispatch('getUserDetail').then(res => {
          const {success} = res
          if (success) {
            next({ ...to, replace: true })
          }
        }).catch(error => {
          Message.error(error || '请求出错！')
          next({path: '/login'})
        })
      }
		}
  } else {
    const whiteList =  ['/login', '/register','/about']
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      return next({path: '/login'})
    }
	}
})

export default router