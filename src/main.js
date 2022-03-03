import Vue from 'vue'
import App from './App.vue'
import '@/utils/iview.js'
import router from './router'
import store from './store'
import helper from './utils/helper'
import '@/assets/styles/index.less'
import '@/utils/request'
import plugins from '@/components'
Vue.config.productionTip = false
helper.go = helper.assistRouter(router)
Vue.prototype.$helper = helper
// 注册项目公用组件
Vue.use(plugins)
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
