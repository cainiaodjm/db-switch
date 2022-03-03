import Vue from 'vue'
import Vuex from 'vuex'

// const keys = ['avatar', 'userCode', 'userName']

// let loginInfo

// try {
//     loginInfo = JSON.parse(localStorage.getItem('loginInfo')) || {}
// } catch (e) {
//     loginInfo = {}
// }

// keys.map((key) => {
//     state[key] = loginInfo[key] || ''
// })
import app from './app'

Vue.use(Vuex)
export default new Vuex.Store(app)
