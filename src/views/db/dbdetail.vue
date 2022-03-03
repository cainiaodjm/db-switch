<template>
    <div>
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size="24" class="app-loading"></Icon>
        </Spin>
        <div class="p-t-14 p-r-16 p-b-14 p-l-16 b-b fixed-header">
            <span class="app-back" @click="back">
                <Icon type="ios-arrow-back" />
                <span>返回</span>
            </span>
            <Divider type="vertical" class="m-r-16 m-l-16" />
            <span class="app-back-title">详情</span>
        </div>
        <!-- DB状态内容 -->
        <div class="p-t-16 m-t-100">
            <div class="flex justify-center">
                <Card style="width: 400px">
                    <app-collapse
                        :height="87"
                        ref="collapseLeft"
                        @change="handleChangeCollapse"
                    >
                        <app-panel>
                            <Form :label-width="120">
                                <FormItem
                                    v-for="item in Object.keys(primaryCurrentForm)"
                                    :key="item"
                                    :label="item"
                                >
                                    {{ primaryCurrentForm[item] }}
                                </FormItem>
                            </Form>
                        </app-panel>
                    </app-collapse>
                </Card>
                <div class="p-s">
                    <div class="icon">P</div>
                    <div class="icon">-></div>
                    <div class="icon">S</div>
                </div>
                <Card style="width: 400px">
                    <app-collapse
                        :height="87"
                        ref="collapseRight"
                        @change="handleChangeLeftCollapse"
                    >
                        <app-panel>
                            <Form :label-width="120">
                                <FormItem
                                    v-for="item in Object.keys(standByCurrentForm)"
                                    :key="item"
                                    :label="item"
                                >
                                    {{ standByCurrentForm[item] }}
                                </FormItem>
                            </Form>
                        </app-panel>
                    </app-collapse>
                </Card>
            </div>
        </div>
        <!-- DB状态内容 -->
        <!-- DB同步时间内容 -->
        <div class="p-t-16 flex justify-center">
            <Card style="width: 80%">
                <p slot="title">DB同步状态</p>
                <div class="p-l-48 p-r-48">
                    <Form class="app-descriptions" :label-width="120">
                        <FormItem label="延时(即时)">
                            {{ formatDelay(standByCurrentForm.delay) }}
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
        <!-- DB同步时间内容 -->

        <!-- DB切换参数内容 -->
        <div class="p-t-16 flex justify-center">
            <Card style="width: 80%">
                <p slot="title">DB切换参数</p>

                <app-collapse :height="142">
                    <app-panel>
                        <div class="flex justify-between p-r-48 p-l-48">
                            <Form class="app-descriptions w-540" :label-width="200">
                                <div class="">主数据库</div>

                                <FormItem
                                    :label="item"
                                    v-for="item in Object.keys(primarySwitchForm)"
                                    :key="item"
                                >
                                    <Poptip
                                        trigger="hover"
                                        word-wrap
                                        placement="left-start"
                                        width="200"
                                        class="ellipsis"
                                        :content="primarySwitchForm[item]"
                                    >
                                        {{ primarySwitchForm[item] }}
                                    </Poptip>
                                </FormItem>
                            </Form>
                            <Form class="app-descriptions w-540" :label-width="200">
                                <div class="">从数据库</div>
                                <FormItem
                                    :label="item"
                                    v-for="item in Object.keys(standBySwitchForm)"
                                    :key="item"
                                >
                                    <Poptip
                                        trigger="hover"
                                        word-wrap
                                        placement="left-start"
                                        width="200"
                                        :content="standBySwitchForm[item]"
                                    >
                                        {{ standBySwitchForm[item] }}
                                    </Poptip>
                                </FormItem>
                            </Form>
                        </div>
                    </app-panel>
                </app-collapse>
            </Card>
        </div>
        <!-- DB切换参数内容 -->
        <!-- 切换完成后 会显示互换IP的内容 -->
        <div class="p-t-16 flex justify-center">
            <Card style="width: 80%; margin-bottom: 84px">
                <p slot="title">Scan IP</p>
                <div class="flex justify-between p-r-48 p-l-48">
                    <Form class="app-descriptions w-540" :label-width="120">
                        <FormItem label="主数据库"> 192.168.1.101</FormItem>
                    </Form>
                    <Button shape="circle" @click="handleScanIp">
                        <Icon type="ios-swap" />
                    </Button>
                    <Form class="app-descriptions w-540" :label-width="120">
                        <FormItem label="从数据库"> 192.168.1.102</FormItem>
                    </Form>
                </div>
            </Card>
        </div>
        <!-- 切换完成后 会显示互换IP的内容 -->
        <!-- 点击数据库切换 抽屉内容 -->
        <Drawer
            height="450"
            placement="bottom"
            :transfer="false"
            closable
            v-model="bottomTag"
        >
            <div class="flex justify-center flex-center">
                <Steps style="width: 40%" :current="current">
                    <Step title="输入服务器信息"></Step>
                    <Step title="确认切换"></Step>
                </Steps>
            </div>

            <div class="flex justify-center flex-center m-t-24" v-show="current === 0">
                <Card class="w-360 m-r-40">
                    <Form
                        ref="primaryForm"
                        :label-width="120"
                        :model="primary"
                        :rules="rules"
                    >
                        <FormItem label="服务器IP" prop="host" class="m-r-16">
                            <Input v-model="primary.host" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="端口号" class="m-r-16" prop="port">
                            <Input v-model="primary.port" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="服务器账号" class="m-r-16" prop="user">
                            <Input v-model="primary.user" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="服务器密码" class="m-r-16" prop="password">
                            <Input
                                v-model="primary.password"
                                placeholder="请输入"
                            ></Input>
                        </FormItem>
                        <div
                            class="msg-warning l-h-32 justify-center flex"
                            v-show="primary.errorMsg"
                        >
                            {{ primary.errorMsg }}
                        </div>
                        <div class="flex justify-center">
                            <Tag color="success" size="large" v-show="primary.validStatus"
                                >校验成功</Tag
                            >
                        </div>
                    </Form>
                </Card>
                <Card class="w-360">
                    <Form
                        :label-width="120"
                        ref="standByForm"
                        :model="standBy"
                        :rules="rules"
                    >
                        <FormItem label="服务器IP" prop="host" class="m-r-16">
                            <Input v-model="standBy.host" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="端口号" class="m-r-16" prop="port">
                            <Input v-model="standBy.port" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="服务器账号" class="m-r-16" prop="user">
                            <Input v-model="standBy.user" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="服务器密码" class="m-r-16" prop="password">
                            <Input
                                v-model="standBy.password"
                                placeholder="请输入"
                            ></Input>
                        </FormItem>
                        <div
                            class="msg-warning l-h-32 justify-center flex"
                            v-show="standBy.errorMsg"
                        >
                            {{ standBy.errorMsg }}
                        </div>
                        <div class="flex justify-center">
                            <Tag color="success" size="large" v-show="standBy.validStatus"
                                >校验成功</Tag
                            >
                        </div>
                    </Form>
                </Card>
            </div>

            <div class="flex justify-center flex-center m-t-24" v-show="current === 0">
                <Button
                    type="primary"
                    @click="handleOsLogin"
                    :loading="osLoading"
                    class="m-r-16"
                    >确定</Button
                >
                <Button @click="handleCancelBottom">取消</Button>
            </div>
            <div class="flex justify-center flex-center m-t-24" v-show="current === 1">
                <Card style="width: 400px">
                    <Form :label-width="80">
                        <FormItem label="库名"> XXXX </FormItem>
                        <FormItem label="IP地址"> XXXX </FormItem>
                        <FormItem label="端口号"> XXXX </FormItem>
                        <FormItem label="类型"> XXXX </FormItem>
                    </Form>
                </Card>
                <div class="p-s">
                    <div class="icon">P</div>
                    <div class="icon">-></div>
                    <div class="icon">S</div>
                </div>
                <Card style="width: 400px">
                    <Form :label-width="80">
                        <FormItem label="库名"> XXXX </FormItem>
                        <FormItem label="IP地址"> XXXX </FormItem>
                        <FormItem label="端口号"> XXXX </FormItem>
                        <FormItem label="类型"> XXXX </FormItem>
                    </Form>
                </Card>
            </div>
            <div class="flex justify-center flex-center m-t-24" v-show="current === 1">
                <Button type="primary" class="m-r-16" @click="handleConfimSwitch"
                    >确认开始</Button
                >
                <Button @click="handleCancelBottom">取消</Button>
            </div>
        </Drawer>
        <!-- 点击数据库切换 抽屉内容 -->
        <!-- 点击IP互换按钮 Modal内容 -->
        <Modal v-model="scanModalVisible" title="IP互换提醒">
            <p class="flex flex-center justify-center m-b-16">
                确定将主、从数据库IP互换?
            </p>
            <Form
                :model="scanForm"
                :rules="scanRules"
                inline
                class="flex justify-center flex-center"
            >
                <FormItem prop="primaryIp">
                    <Input v-model="scanForm.primaryIp" placeholder="请输入">
                        <span slot="prepend">P</span>
                    </Input>
                </FormItem>
                <Icon type="ios-swap" class="m-b-24 m-r-10" />
                <FormItem prop="standByIp">
                    <Input v-model="scanForm.standByIp" placeholder="请输入">
                        <span slot="prepend">S</span></Input
                    >
                </FormItem>
            </Form>
            <div slot="footer">
                <div class="flex flex-center justify-center">
                    <Button type="primary">确定</Button>
                    <Button @click="handleModalCancel">取消</Button>
                </div>
            </div>
        </Modal>
        <!-- 点击IP互换按钮 Modal内容 -->
        <!-- 底部固定Footer内容 -->
        <div class="app-fixed-footer flex justify-center flex-center">
            <!-- :disabled="switchBtnDisabled" -->
            <div class="p-t-24 p-b-24">
                <Button type="primary" @click="handleBottom" v-if="!switchLoading"
                    >数据库切换</Button
                >
            </div>

            <Steps :current="1" v-if="switchLoading">
                <Step title="主数据库到从数据库" content="已完成"></Step>
                <Step title="从数据库到主数据库" content="进行中"></Step>
                <Step title="完成"></Step>
            </Steps>
        </div>
        <!-- 底部固定Footer内容 -->
    </div>
</template>
<script>
import { checkAdgConfig, checkAdgStatus, osLogin } from '@/service/db'
import { camelCase } from '@/utils/globalConstants'
export default {
    data() {
        const validateIp = (rule, value, callback) => {
            const regex =
                /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
            if (!value) {
                callback(new Error('请输入IP地址'))
            } else {
                if (regex.test(value)) {
                    callback()
                } else {
                    callback(new Error('IP地址格式不正确'))
                }
            }
        }
        return {
            loading: false,
            switchLoading: false,
            scanModalVisible: false,
            osLoading: false,
            switchBtnDisabled: true,
            current: 0,
            primary: {
                host: '192.168.10.90',
                user: 'root',
                port: '1521',
                password: 'Hello123456',
                validStatus: false,
                errorMsg: ''
            },
            standBy: {
                host: '192.168.10.100',
                user: 'root',
                port: '1521',
                password: 'Hello123456',
                validStatus: false,
                errorMsg: ''
            },
            rules: {
                host: [
                    {
                        validator: validateIp,
                        trigger: 'blur',
                        required: true
                    }
                ],
                port: [
                    {
                        required: true,
                        message: '请输入端口号',
                        trigger: 'blur'
                    }
                ],

                user: [
                    {
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ]
            },
            timer: null,
            bottomTag: false,
            primarySwitchForm: {},
            standBySwitchForm: {},
            primaryCurrentForm: {},
            standByCurrentForm: {},
            delay: {
                day: 0,
                hour: 0,
                minute: 0,
                second: 0
            },
            scanForm: {
                primaryIp: '',
                standByIp: ''
            },
            scanRules: {
                primaryIp: [
                    {
                        validator: validateIp,
                        trigger: 'blur',
                        required: true
                    }
                ],
                standByIp: [
                    {
                        validator: validateIp,
                        trigger: 'blur',
                        required: true
                    }
                ]
            }
        }
    },
    async created() {
        await this.getCurrentStatus()
        await this.getSwitchStatus()
    },
    mounted() {},
    beforeDestroy() {
        this.stopSetInterval()
    },

    methods: {
        // 获取主数据库切换信息状态
        async getPrimarySwitchStatus() {
            const primary = JSON.parse(localStorage.getItem('primary'))
            const primarySwitchStatus = {
                data: null,
                result: false
            }
            if (primary) {
                const res = await checkAdgConfig({
                    dbuser: primary.account,
                    dbpass: primary.password,
                    dbhost: primary.ip,
                    dbport: primary.port,
                    dbsername: primary.databaseName
                })
                if (parseInt(res?.code) === 200) {
                    let data = null
                    if (Array.isArray(res.data)) {
                        data = {}
                        res.data.forEach((item) => {
                            this.$set(
                                this.primarySwitchForm,

                                item[0],
                                item[1]
                            )
                            data[item[0]] = item[1]
                        })
                    }

                    primarySwitchStatus.data = data
                    primarySwitchStatus.result = true
                }

                return primarySwitchStatus
            }
            return primarySwitchStatus
        },
        // 获取从数据库切换信息状态
        async getStandBySwitchStatus() {
            const standBy = JSON.parse(localStorage.getItem('standBy'))
            const standBySwitchStatus = {
                data: null,
                result: false
            }
            if (standBy) {
                const res = await checkAdgConfig({
                    dbuser: standBy.account,
                    dbpass: standBy.password,
                    dbhost: standBy.ip,
                    dbport: standBy.port,
                    dbsername: standBy.databaseName
                })
                if (parseInt(res?.code) === 200) {
                    let data = null
                    if (Array.isArray(res.data)) {
                        data = {}
                        res.data.forEach((item) => {
                            this.$set(this.standBySwitchForm, item[0], item[1])
                            data[item[0]] = item[1]
                        })
                    }

                    standBySwitchStatus.data = data

                    standBySwitchStatus.result = true
                    return standBySwitchStatus
                }
                return standBySwitchStatus
            }
            return standBySwitchStatus
        },
        // 初始化调用切换接口 并判断切换按钮是否可用
        async getSwitchStatus() {
            const primaryRes = await this.getPrimarySwitchStatus()
            const standByRes = await this.getStandBySwitchStatus()

            if (primaryRes.result && standByRes.result) {
                this.switchBtnDisabled = false
            }
        },
        // 获取主数据库当前状态
        async getPrimaryCurrentStatus() {
            const primary = JSON.parse(localStorage.getItem('primary'))
            const primaryCurrentStatus = {
                data: null,
                result: false
            }
            if (primary) {
                const res = await checkAdgStatus({
                    dbuser: primary.account,
                    dbpass: primary.password,
                    dbhost: primary.ip,
                    dbport: primary.port,
                    dbsername: primary.databaseName
                })
                if (parseInt(res?.code) === 200) {
                    const data = JSON.parse(res.data.replace('/', ''))
                    primaryCurrentStatus.data = data

                    Object.keys(primaryCurrentStatus.data).forEach((item) => {
                        if (item !== 'code') {
                            this.primaryCurrentForm[item] =
                                primaryCurrentStatus.data[item]
                        }
                    })
                    primaryCurrentStatus.result = true
                    return primaryCurrentStatus
                }
                return primaryCurrentStatus
            }
            return primaryCurrentStatus
        },
        // 获取从数据库当前状态
        async getStandByCurrentStatus() {
            const standBy = JSON.parse(localStorage.getItem('standBy'))
            const standByCurrentStatus = {
                data: null,
                result: false
            }
            if (standBy) {
                const res = await checkAdgStatus({
                    dbuser: standBy.account,
                    dbpass: standBy.password,
                    dbhost: standBy.ip,
                    dbport: standBy.port,
                    dbsername: standBy.databaseName
                })
                if (parseInt(res?.code) === 200) {
                    const data = JSON.parse(res.data.replace('/', ''))
                    standByCurrentStatus.data = data

                    Object.keys(standByCurrentStatus.data).forEach((item) => {
                        if (item !== 'code') {
                            this.standByCurrentForm[item] =
                                standByCurrentStatus.data[item]
                        }
                    })
                    standByCurrentStatus.result = true
                    return standByCurrentStatus
                }
                return standByCurrentStatus
            }
            return standByCurrentStatus
        },
        // 初始化调用当前状态接口
        async getCurrentStatus() {
            await this.getPrimaryCurrentStatus()
            await this.getStandByCurrentStatus()
        },
        //
        handleScanIp() {
            this.scanModalVisible = true
        },
        handleBottom() {
            this.osLoading = false
            this.current = 0
            this.primary.errorMsg = ''
            this.primary.validStatus = false
            this.standBy.errorMsg = ''
            this.standBy.validStatus = false
            const { primaryForm, standByForm } = this.$refs
            primaryForm.resetFields()
            standByForm.resetFields()
            // const primary = JSON.parse(localStorage.getItem('primary'))
            // const standBy = JSON.parse(localStorage.getItem('standBy'))

            // this.primary.host = primary.ip
            // this.primary.port = primary.port
            // this.primary.user = primary.account
            // this.primary.password = primary.password
            // this.standBy.host = standBy.ip
            // this.standBy.port = standBy.port
            // this.standBy.user = standBy.account
            // this.standBy.password = standBy.password
            this.bottomTag = true
        },
        handleCancelBottom() {
            this.bottomTag = false
        },

        createSetInterval(callback, time = 1000) {
            this.stopSetInterval()
            this.timer = setInterval(() => {
                callback()
            }, time)
        },
        stopSetInterval() {
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
        },
        async handleOsLogin() {
            const { primaryForm, standByForm } = this.$refs
            const validPrimary = await primaryForm.validate()
            const validStand = await standByForm.validate()

            if (validPrimary && validStand) {
                this.osLoading = true
                const primaryRes = await this.primaryLogin()

                const standByRes = await this.standByLogin()

                this.osLoading = false
                if (primaryRes.result && standByRes.res) {
                    this.current += 1
                }
            }
        },
        async primaryLogin() {
            const res = await osLogin({
                user: this.primary.user,
                password: this.primary.password,
                host: this.primary.host,
                port: this.primary.port
            })
            if (parseInt(res.code) === 200) {
                this.primary.validStatus = true
                this.primary.errorMsg = ''

                return true
            } else {
                this.$Message.error({
                    background: true,
                    content: `主服务器` + res.msg
                })
                this.primary.errorMsg = res.data || ''
                this.primary.validStatus = false
                return false
            }
        },
        async standByLogin() {
            const res = await osLogin({
                user: this.standBy.user,
                password: this.standBy.password,
                host: this.standBy.host,
                port: this.standBy.port
            })

            if (parseInt(res.code) === 200) {
                this.standBy.validStatus = true
                this.standBy.errorMsg = ''
                return true
            } else {
                this.$Message.error({
                    background: true,
                    content: `从服务器` + res.msg
                })
                this.standBy.errorMsg = res.data || ''
                this.standBy.validStatus = false
                return false
            }
        },
        back() {
            this.$router.back()
        },
        handleChangeCollapse(isActive) {
            this.$refs.collapseRight.isActive = isActive
            //
        },
        handleChangeLeftCollapse(isActive) {
            this.$refs.collapseLeft.isActive = isActive
        },
        handleModalCancel() {
            this.scanModalVisible = false
        },
        handleConfimSwitch() {
            this.bottomTag = false
            this.switchLoading = true
            //
        },
        formatDelay(time) {
            console.log(time)
            if (time) {
                const _time = time.split(' ')
                console.log(_time)
                const day = parseInt(_time[0].split('+')[1])
                const _hms = _time[1].split(':')
                console.log(_hms)
                const hour = parseInt(_hms[0])
                const minute = parseInt(_hms[1])
                const second = parseInt(_hms[2])
                return `${day}天 ${hour}时 ${minute}分 ${second}秒`
            } else {
                return ``
            }
        }
    }
}
</script>
<style lang="less" scoped>
.fixed-header {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 100;
    background: #fff;
    top: 48px;
}
.p-s {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
        font-size: 40px;
    }
}
.app-descriptions {
    /deep/ .ivu-poptip {
        width: 100%;
        .ivu-poptip-rel {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            width: 100%;
            display: inherit;
            align-items: center;
        }
    }
}
</style>
