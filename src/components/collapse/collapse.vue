<!--
 * @Author: your name
 * @Date: 2022-02-24 00:03:34
 * @LastEditTime: 2022-02-24 10:30:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/components/floldContainer/foldContainer.vue
-->
<template>
    <div ref="collapse" :class="classes" :style="styles">
        <slot></slot>
        <div v-show="isActive" class="ellipsis">...</div>
    </div>
</template>
<script>
export default {
    props: {
        height: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        toggle(active) {
            console.log(this.isActive)
            const { collapse } = this.$refs

            const { clientWidth, clientHeight } = collapse
            if (active !== undefined) {
                this.isActive = active
            } else {
                this.isActive = !this.isActive
            }

            this.$emit('change', this.isActive)
        }
    },
    computed: {
        classes() {
            return [
                `app-collapse`
                // {
                //     [`app-collapse-active`]: this.isActive
                // }
            ]
        },
        styles() {
            if (!this.height || !this.isActive) {
                return null
            }
            return {
                maxHeight: `${this.height}px`
            }
        }
    }
}
</script>
<style lang="less" scoped>
.app-collapse {
    transition: all ease-out 0.2s;
    overflow: hidden;
    position: relative;
}

.ellipsis {
    position: absolute;
    bottom: -6px;
    left: 0px;
    font-weight: bolder;
}
</style>
