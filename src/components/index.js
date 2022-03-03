/*
 * @Author: your name
 * @Date: 2022-02-23 22:11:10
 * @LastEditTime: 2022-02-24 01:22:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/components/index.js
 */
import collapse from './collapse/index'
import ellipsisPlus from './ellipsis-plus.vue'
const plugins = {
    install(Vue) {
        /* 扩展iview树组件 */
        Vue.component('app-collapse', collapse)
        Vue.component('app-panel', collapse.Panel)
        Vue.component('app-ellipsis', ellipsisPlus)
    }
}
export default plugins
