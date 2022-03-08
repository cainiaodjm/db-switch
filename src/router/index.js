import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        meta: {
            loggedIn: false
        },
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
    },
    {
        path: '/404',

        component: () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
    },
    {
        path: '/main',
        component: () => import(/* webpackChunkName: "main" */ '@/views/main/main.vue'),
        children: [
            {
                path: 'db',
                component: () => import(/* webpackChunkName: "db" */ '@/views/db/db.vue')
            },
            {
                path: 'dbdetail',
                component: () =>
                    import(/* webpackChunkName: "dbdetail" */ '@/views/db/dbdetail.vue')
            }
        ]
    },
    {
        path: '*',
        component: () => import(/* webpackChunkName: "404" */ '@/views/404/404.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.onReady((to) => {
    console.log(to)
    const { state } = store

    if (to.path === '/') {
        if (state.loggedIn) {
            store.commit('go', state.mainUrl[state.identity])
        } else {
            store.commit('go', state.loginUrl[state.identity])
        }
    }
})
export default router
