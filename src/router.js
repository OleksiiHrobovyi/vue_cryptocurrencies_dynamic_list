import Vue from 'vue'
import VueRouter from 'vue-router'
import CoinList from "@/views/CoinList";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
          path: '/',
          redirect: () => {
              return {name: 'coins'}
          }
        },
        {
            path: '/coins',
            name: 'coins',
            meta: {layout: 'main'},
            component: CoinList
        },
        {
            path: '/coins/:coinName/detail',
            name: 'coin-detail',
            meta: {layout: 'main'},
            component: () => import('./views/SingleCoin')
        },
        {
            path: '/top',
            meta: {layout: 'main'},
            component: () => import('./views/TopList')
        },
    ]
})

export default router
