/*
 * @Author: your name
 * @Date: 2022-02-16 14:38:16
 * @LastEditTime: 2022-02-23 11:03:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/store/app.js
 */
import helper from '@/utils/helper'
// 用户身份，不同角色的登录页和首页不同时让角色配置到对应的页面
const identity = ['identity']
let _identity = localStorage.getItem('identity')

if (identity.indexOf(_identity) === -1) {
    _identity = identity[0]
}
const state = {
    /* 是否登录 */
    loggedIn: localStorage.getItem('logged-in') === 'true',
    identity: _identity,
    /* 是否前端缓存登录 */
    cookieOut: false,
    /* 前端缓存登录失效时间 */
    cookieOutTimer: 60000,
    mainUrl: {
        identity: '/main/db'
        // identity: function() {
        //     return state.projectId ? '/main/overview' : '/main'
        // }
    },
    /* 不同用户身份的登录页 String | Function */
    loginUrl: {
        identity: '/login'
        // identity: function() {
        //     return state.ssoLoginUrl + '?redirectUrl=' + helper.getOrigin()
        // }
    }
}
const keys = ['avatar', 'userCode', 'userName']

let loginInfo

try {
    loginInfo = JSON.parse(localStorage.getItem('loginInfo')) || {}
} catch (e) {
    loginInfo = {}
}

keys.map((key) => {
    state[key] = loginInfo[key] || ''
})
const mutations = {
    login(state, option) {
        const { data, redirect } = option
        localStorage.setItem('loginInfo', JSON.stringify(data))
        keys.map((key) => {
            state[key] = data[key]
        })
        if (state.loggedIn !== true) {
            state.loggedIn = true
            localStorage.setItem('logged-in', true)
            localStorage.setItem('logged-time', new Date().getTime())
        }
        console.log(helper.filterHash())
        if (helper.filterHash() || redirect) {
            mutations.go(state.mainUrl[state.identity])
        }
    },
    go(state, url) {
        if (typeof state === 'string') {
            url = state
        } else if (typeof state === 'function') {
            url = state()
        }
        if (typeof url === 'function') {
            url = url()
        }
        url && helper.go(url)
    }
}
export default {
    state,
    mutations
}
