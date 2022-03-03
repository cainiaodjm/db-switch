<!--
 * @Author: your name
 * @Date: 2022-02-24 00:04:00
 * @LastEditTime: 2022-02-24 09:29:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/components/foldContainer/panel.vue
-->
<template>
    <div @click="toggle">
        <slot></slot>
    </div>
</template>
<script>
export default {
    methods: {
        toggle() {
            this.$parent.toggle()
        }
    }
}
</script>
