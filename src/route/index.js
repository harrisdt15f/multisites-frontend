import Vue from 'vue'
import Router from 'vue-router'

import { getToken, getIsCryptData } from '@/utils/auth'
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
import FishGame from '../views/fish-game'
import Account from '../views/account-center'
import P404 from '../components/public/403-404-500.vue'
import Download from '../components/public/download.vue'
import HelpCenter from '../components/public/help-center.vue'
import HelpPlay from '../components/public/help-play.vue'
import HelpInfo from '../components/public/help-info.vue'
import PreventHijack from '../components/public/preventHijack.vue'
import bigWheel from '../views/active/components/big-wheel.vue';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '', name: 'index', component: Index },
        { path: '/login', name: 'login', component: Login },
        { path: '/register/:code?', name: 'register', component: Register, props: true },
        {
          path: '/bet/:lotterySign?',
          name: 'bet',
          component: GameMain,
          props: true
        },
        { path: 'ylc', name: 'ylc', component: Ylc, props: true },
        {
          path: '/user-trends/:lotterySign?',
          name: 'user-trends',
          component: UserTrends,
          props: true
        },
        {
          path: '/agent-center/:tabName?',
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
        {
          path: '/fish-game',
          name: 'fish-game',
          component: FishGame
        },
        {
          path: '/account-center/:type?/:subtype?',
          name: 'account-center',
          component: Account,
          props: true
        },
        {
          path: '/download',
          name: 'download',
          component: Download,
        },
        {
          path: '/help-play',
          name: 'help-play',
          component: HelpPlay,
        },
        {
          path: '/help-center',
          name: 'help-center',
          component: HelpCenter,
        },
        {
          path: '/help-info/:pageId?',
          name: 'help-info',
          component: HelpInfo,
          props: true
        },
        {
          path: '/page403',
          name: 'page403',
          component: P404
        },
        {
          path: '/page404',
          name: 'page404',
          component: P404
        },
        {
          path: '/page500',
          name: 'page500',
          component: P404
        },
        // 防劫持
        {
          path: '/preventHijack',
          name: 'preventHijack',
          component: PreventHijack
        },
        // 大转盘
        {
          path: '/big-wheel',
          name: 'big-wheel',
          component: bigWheel
        }
      ]
    },
    { path: '*', redirect: '/page404' }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const hasToken = getToken()
  const hasIsCryptData = getIsCryptData()
  if (hasIsCryptData != null) {
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
      next()
    }
  } else {
    store.dispatch('getIsCryptData').then(res => {
      const {success} = res
      if (success) {
        next({ ...to, replace: true })
      }
    }).catch(error => {
      Message.error(error || '请求出错！')
    })
  }
})

export default router