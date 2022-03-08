<!--
 * @Author: your name
 * @Date: 2022-02-16 16:46:25
 * @LastEditTime: 2022-03-04 10:58:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/views/main/main.vue
-->
<template>
    <Layout class="h-full bg-white">
        <Header class="flex main-header justify-between">
            <div class="logo">
                <i class="logo-icon"></i>
                <span>DB切换工具</span>
            </div>
            <!-- <div class="flex-1">
                <ul class="header-menu">
                    <li
                        v-for="item in headerList"
                        :key="item.id"
                        :class="headerActive === item.id ? 'active' : ''"
                        @click="headerClick(item)"
                    >
                        {{ item.name }}
                    </li>
                </ul>
            </div> -->
            <Dropdown placement="bottom" trigger="click" class="app-dropdown-skin">
                <span @click="handleClick" class="m-r-8">操作日志</span>
                <span>
                    <Avatar :src="avatar" class="m-r-8" />
                    <span class="user-name">{{ userName }}</span>
                    <Icon type="ios-arrow-down"></Icon>
                </span>
                <DropdownMenu slot="list">
                    <DropdownItem @click.native="logout">退出登录</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Header>
        <Layout>
            <!-- <Sider
                ref="side1"
                hide-trigger
                collapsible
                class="sider-menu flex-1"
                :collapsed-width="78"
                v-model="isCollapsed"
            >
                <div class="main-collapse">
                    <i
                        class="iconfont icon-collapse"
                        :class="{ collapsed: isCollapsed }"
                        @click="isCollapsed = !isCollapsed"
                    ></i>
                </div>
                <Menu
                    ref="menu"
                    :active-name="activeName"
                    :open-names="openNames"
                    width="auto"
                >
                    <div v-show="!isCollapsed">
                        <template v-for="item in menulist">
                            <Submenu :name="item.id" :key="item.id" v-if="item.children">
                                <template slot="title">
                                    <i class="main-icon" :class="item.class"></i>
                                    <span>{{ item.name }}</span>
                                </template>
                                <MenuItem
                                    v-for="items in item.children"
                                    :name="items.id"
                                    @click.native="open(items)"
                                    :key="items.id"
                                >
                                    <span>{{ items.name }}</span>
                                </MenuItem>
                            </Submenu>
                            <template v-else>
                                <MenuItem
                                    :name="item.id"
                                    :key="item.id"
                                    @click.native="open(item)"
                                >
                                    <i class="main-icon" :class="item.class"></i>
                                    <span>{{ item.name }}</span>
                                </MenuItem>
                            </template>
                        </template>
                    </div>
                    <div v-show="isCollapsed">
                        <MenuItem
                            :name="item.id"
                            @click.native="open(item)"
                            :key="item.id"
                            v-for="item in menulist"
                        >
                            <Dropdown
                                transfer
                                placement="right-start"
                                transfer-class-name="app-menu-dropdown"
                                v-if="item.children"
                            >
                                <i class="main-icon" :class="item.class"></i>
                                <DropdownMenu slot="list">
                                    <template v-for="child in item.children">
                                        <template>
                                            <DropdownItem
                                                :key="`drop-${child.id}`"
                                                :class="
                                                    child.id === activeName
                                                        ? 'active'
                                                        : ''
                                                "
                                                :name="child.name"
                                                @click.native="open(child)"
                                            >
                                                <span class="menu-title">{{
                                                    child.name
                                                }}</span>
                                            </DropdownItem>
                                        </template>
                                    </template>
                                </DropdownMenu>
                            </Dropdown>
                            <Tooltip
                                :content="item.name"
                                placement="right"
                                transfer
                                v-else
                            >
                                <i class="main-icon" :class="item.class"></i>
                            </Tooltip>
                        </MenuItem>
                    </div>
                </Menu>
            </Sider> -->
            <Content>
                <router-view></router-view>
            </Content>
        </Layout>
        <Drawer title="操作" :width="800" :closable="false" v-model="logTag">
            <Table :columns="logColumns" :data="logData" ref="logTable">
                <template slot="handle" slot-scope="{ row, index }">
                    <Button type="primary" size="small" @click="handleShowLog(row, index)"
                        >查看</Button
                    >
                </template>
            </Table>
        </Drawer>
    </Layout>
</template>

<script>
import { mapState } from 'vuex'
import { getPython } from '@/service/sysApi'
import getPermission from '@/utils/permission.js'
export default {
    data() {
        return {
            headerList: [],
            headerActive: '',
            isCollapsed: false,
            menulist: [],
            router: {},
            activeName: '',
            openNames: [],
            logTag: false,
            logData: [
                {
                    status: 1,
                    time: '2022-03-02 17:43:44',
                    primary: 'logxs',
                    standBy: 'djdd',
                    host: '192.168.32.1',
                    port: '8088'
                }
            ],
            logColumns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', 'xxxx')
                        ])
                    }
                },
                {
                    title: '状态',
                    key: 'status'
                },
                {
                    title: '操作时间',
                    key: 'time',
                    width: 200
                },
                {
                    title: '主数据库(别名)',
                    key: 'primary'
                },
                {
                    title: '从数据库(别名)',
                    key: 'standBy'
                },
                {
                    // type: 'expand',
                    title: ' ',
                    key: 'handle',
                    slot: 'handle'
                }
            ]
        }
    },
    mounted() {},

    watch: {
        '$route.path': {
            // eslint-disable-next-line space-before-function-paren
            handler: function (val) {
                console.log(val, '--------')
                this.resetActive()
            }
        }
    },
    computed: {
        ...mapState({
            avatar: (state) => state.avatar,
            userName: (state) => state.userName,
            userCode: (state) => state.userCode,
            mainUrl: (state) => state.mainUrl,
            identity: (state) => state.identity
        }),
        menuitemClasses() {
            return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
        },
        rotateIcon() {
            return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
        }
    },
    methods: {
        handleClick() {
            this.logTag = true
        },
        logout() {
            //
        },
        handleShowLog(row, index) {
            this.$refs.logTable.toggleExpand(index)
        },
        headerClick(item) {
            console.log(item)
            this.headerActive = item.id
            this.menulist = item.children || []
            if (item.url) {
                this.open(item)
            } else if (item.children) {
                this.openFirstChildren(item.children)
            }
        },
        open(item) {
            if (item.url && item.url !== this.$route.path) {
                this.$router.push(item.url)
            }
        },
        resetActive() {
            console.log(this.router, 'this.router')
            console.log(this.$route.path, 'this.$route.path')
            const route = this.router[this.$route.path]
            console.log(route, 'route')
            if (route) {
                this.activeName = route.id
                const openNames = []
                route.id.split('-').map((key) => {
                    if (openNames.length > 0) {
                        openNames.push(openNames[openNames.length - 1] + '-' + key)
                    } else {
                        openNames.push(key)
                    }
                })
                const headerActive = openNames.splice(0, 1)[0]
                if (headerActive !== this.headerActive) {
                    this.headerActive = headerActive
                    this.menulist = this.headerList[headerActive]?.children || []
                    this.openNames = openNames
                    this.$nextTick(() => {
                        const { menu } = this.$refs
                        if (menu) {
                            menu.updateOpened()
                            menu.updateActiveName()
                        }
                    })
                }
            } else {
                console.log('xxxxx')
                console.log(this.mainUrl[this.identity])
                this.$store.commit('go', this.mainUrl[this.identity])
            }
        },
        resetOpen(url) {
            const route = this.router[url || this.$route.path]
            if (route) {
                const openNames = []
                route.id.split('-').map((key) => {
                    if (openNames.length > 0) {
                        openNames.push(openNames[openNames.length - 1] + '-' + key)
                    } else {
                        openNames.push(key)
                    }
                })
                const headerActive = openNames.splice(0, 1)[0]
                this.activeName = route.id
                const menulist = this.headerList[headerActive]?.children || []
                menulist.map((item) => {
                    const { id } = item
                    if (openNames.indexOf(id) === -1) {
                        openNames.push(id)
                    }
                })
                this.openNames = openNames
                this.$nextTick(() => {
                    const { menu } = this.$refs
                    if (menu) {
                        menu.updateOpened()
                        menu.updateActiveName()
                    }
                })
                return headerActive
            }
        },
        openFirstChildren(items) {
            console.log(items)
            this.$helper.depthFirstSearch(items, (item) => {
                if (item.url) {
                    this.open(item)
                    this.resetOpen(item.url)
                    return false
                }
            })
        }
    },
    created() {
        const { menu, actions } = getPermission(this.userCode)
        this.router = {}
        this.$helper.depthFirstSearch(menu, (data, index, parent) => {
            this.$set(data, 'id', parent ? parent.id + '-' + index : '' + index)
            if (data.url) {
                this.router[data.url] = data
            }
            if (Array.isArray(data.include)) {
                data.include.map((url) => {
                    this.router[url] = data
                })
            }
        })

        this.headerList = menu
        if (this.$route.path === '/main') {
            this.openFirstChildren(this.headerList)
        } else {
            const headerActive = this.resetOpen()
            if (headerActive) {
                this.headerActive = headerActive
                this.menulist = this.headerList[headerActive]?.children || []
            }
        }
        // console.log(actions)
    }
}
</script>

<style lang="less" scoped>
/deep/ .ivu-layout-header {
    height: 48px;
    line-height: 48px;
    background-image: linear-gradient(-21deg, #192347 0%, #26376d 100%);
    padding: 0;
    position: relative;
    z-index: 1;
    color: #fff;
}
.logo {
    height: 48px;
    line-height: 48px;
    padding-left: 16px;
    font-size: 18px;
    font-weight: 600;
    width: 180px;
    overflow: hidden;
    letter-spacing: 2px;
    text-shadow: 0 3px 9px 0 #00172b;
    .logo-icon {
        display: inline-block;
        vertical-align: middle;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        background: url('../../assets/images/ewell-logo.png') no-repeat;
        background-size: 100% auto;
    }
}
.app-dropdown-skin {
    margin-right: 20px;
}
/deep/ .ivu-table {
    .ivu-table-cell-with-expand {
        display: none;
    }
}
/deep/ .ivu-layout-content {
    background: #fff;
    overflow: auto;
    height: 100%;
}
.sider-menu {
    overflow-y: auto;
    background: #fcfcfc;
    /deep/ .ivu-menu-light {
        background: #fcfcfc;
    }
    /deep/ .ivu-menu-light.ivu-menu-vertical {
        .ivu-menu-item {
            margin-bottom: 8px;
            &:last-child {
                margin-bottom: 4px;
            }
        }
        .ivu-menu-submenu-title {
            margin-bottom: 4px;
        }
        .ivu-menu-item,
        .ivu-menu-submenu-title {
            border-radius: 8px;
            height: 40px;
            line-height: 40px;
            overflow: hidden;
            padding: 0 8px 0 24px;
            margin-right: 16px;
            margin-left: 16px;
            transition: none;
            .ivu-menu-submenu-title-icon {
                right: 0;
            }
        }
        .ivu-menu-item:hover,
        .ivu-menu-submenu-title:hover {
            color: #3b62d4;
        }
        > div {
            > .ivu-menu-item,
            > .ivu-menu-submenu > .ivu-menu-submenu-title > span {
                font-weight: 600;
            }
        }
        .ivu-menu-item-active:not(.ivu-menu-submenu) {
            background: linear-gradient(270deg, #6448a1, #176faf);
            box-shadow: 0 4px 12px 0 rgba(0, 7, 119, 0.5);
            color: #fff;
            &::after {
                display: none;
            }
        }
        &::after {
            display: none;
        }
        .ivu-menu {
            background: #f2f3f6;
        }
        .ivu-menu-submenu > .ivu-menu {
            padding: 4px 0;
        }
    }
}
/deep/ .ivu-layout-sider-collapsed {
    .ivu-menu-item,
    .ivu-menu-submenu-title {
        margin: 0 !important;
        padding: 0 !important;
        text-align: center;
        border-radius: 0 !important;
    }
}
.main-collapse {
    height: 24px;
    line-height: 24px;
    background: #f2f3f6;
    text-align: center;
    margin-bottom: 8px;
    > i {
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &.collapsed {
            transform: rotate(180deg);
        }
    }
}
.main-icon {
    position: relative;
    display: inline-block;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    top: 4px;
}
.main-fwqgl {
    background-image: url('../../assets/images/fwqgl.png');
}
.ivu-menu-item-selected .main-fwqgl {
    background-image: url('../../assets/images/fwqgl_selected.png');
}
.main-sjkyw {
    background-image: url('../../assets/images/sjkyw.png');
}
.ivu-menu-item-selected .main-sjkyw {
    background-image: url('../../assets/images/sjkyw.png');
}
.main-qxgl {
    background-image: url('../../assets/images/qxgl.png');
}
.ivu-menu-item-selected .main-qxgl {
    background-image: url('../../assets/images/qxgl.png');
}
.main-aizsk {
    background-image: url('../../assets/images/aizsk.png');
}
.ivu-menu-item-selected .main-aizsk {
    background-image: url('../../assets/images/aizsk-selected.png');
}
.main-xszx {
    background-image: url('../../assets/images/xszx.png');
}
.ivu-menu-item-selected .main-xszx {
    background-image: url('../../assets/images/xszx.png');
}
.main-xjgj {
    background-image: url('../../assets/images/xjgj.png');
}
.ivu-menu-item-selected .main-xjgj {
    background-image: url('../../assets/images/xjgj.png');
}
.header-menu {
    overflow: hidden;
    height: 48px;
    li {
        display: inline-block;
        width: 100px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 8px;
        opacity: 0.7;
        cursor: pointer;
        margin-left: 68px;
        &.active {
            background: linear-gradient(270deg, #176faf, #176faf);
            box-shadow: 0 4px 12px 0 rgba(0, 34, 119, 0.5);
            opacity: 1;
        }
    }
}
.main-header {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1000;
}
</style>

<style lang="less">
.app-menu-dropdown {
    margin-left: 16px;
    .ivu-dropdown-item.active {
        background: #3b5cde;
        color: #fff;
    }
}
</style>
