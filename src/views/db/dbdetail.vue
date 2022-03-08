<template>
    <div class="app-bg-primary">
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size="24" class="app-loading"></Icon>
        </Spin>
        <div class="p-t-14 p-r-16 p-b-14 p-l-16 fixed-header">
            <span class="app-back" @click="back">
                <Icon type="ios-arrow-back" />
                <span>返回</span>
            </span>
            <Divider type="vertical" class="m-r-16 m-l-16" />
            <span class="app-back-title">详情</span>
        </div>
        <!-- DB状态内容 -->
        <div class="p-t-116">
            <div class="flex justify-center">
                <Card
                    style="width: 360px; height: 300px"
                    class="app-bg-status app-bg-frame"
                >
                    <div class="flex m-t-14">
                        <div class="flex-col">
                            <div class="app-icon-db"></div>
                            <div class="m-t-10 font-bold font-17 text-white text-center">
                                ORACLE_01
                            </div>
                        </div>
                        <Row class="app-desc m-l-10">
                            <Col
                                class="desc-item"
                                span="24"
                                v-for="item in Object.keys(primaryCurrentForm)"
                                :key="item"
                                :label="item"
                            >
                                <div class="desc-label">{{ item }}:</div>
                                <div class="desc-content">
                                    <Poptip
                                        trigger="hover"
                                        word-wrap
                                        placement="left-start"
                                        width="200"
                                        :content="primaryCurrentForm[item]"
                                    >
                                        {{ primaryCurrentForm[item] }}
                                    </Poptip>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>
                <div class="p-s">
                    <div class="db">P</div>
                    <div class="arrow">
                        <div class="app-icon-arrow-success"></div>
                        <div class="app-icon-arrow-success m-t-12"></div>
                    </div>
                    <div class="db">S</div>
                </div>
                <Card
                    style="width: 360px; height: 300px"
                    class="app-bg-status app-bg-frame"
                >
                    <div class="flex m-t-14">
                        <div class="flex-col">
                            <div class="app-icon-db"></div>
                            <div class="m-t-10 font-bold font-17 text-white text-center">
                                ORACLE_01
                            </div>
                        </div>
                        <Row class="app-desc m-l-10">
                            <Col
                                class="desc-item"
                                span="24"
                                v-for="item in Object.keys(standByCurrentForm)"
                                :key="item"
                                :label="item"
                            >
                                <div class="desc-label">{{ item }}:</div>
                                <div class="desc-content">
                                    <Poptip
                                        trigger="hover"
                                        word-wrap
                                        placement="left-start"
                                        width="200"
                                        :content="standByCurrentForm[item]"
                                    >
                                        {{ standByCurrentForm[item] }}
                                    </Poptip>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <!-- <Form :label-width="120">
                        <FormItem
                            v-for="item in Object.keys(standByCurrentForm)"
                            :key="item"
                            :label="item"
                        >
                            {{ standByCurrentForm[item] }}
                        </FormItem>
                    </Form> -->
                    <!-- </app-panel>
                    </app-collapse> -->
                </Card>
            </div>
        </div>
        <!-- DB状态内容 -->
        <!-- DB同步时间内容 -->
        <div class="flex justify-center">
            <Card style="width: 950px" class="app-bg-delay app-bg-frame frame-card">
                <p slot="title" style="padding: 11px 0px 23px">DB同步状态</p>
                <div class="p-l-34 p-r-34">
                    <Form class="app-descriptions" :label-width="120">
                        <FormItem label="延时(即时)" class="delay-left">
                            {{ formatDelay(standByCurrentForm.delay) }}
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
        <!-- DB同步时间内容 -->

        <!-- DB切换参数内容 -->
        <div class="p-t-16 flex justify-center">
            <Card style="width: 950px" class="app-bg-switch app-bg-frame frame-card">
                <p slot="title" style="padding: 7px 0px 23px 0px">DB切换参数</p>

                <app-collapse :height="142">
                    <app-panel>
                        <div class="flex justify-between p-r-30 p-l-30">
                            <Form class="app-descriptions w-420" :label-width="200">
                                <div class="switch-title">
                                    <span>[P] 主数据库</span>
                                </div>

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
                            <Form class="app-descriptions w-420" :label-width="200">
                                <div class="switch-title">
                                    <span>[S] 从数据库</span>
                                </div>

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
        <!-- <div class="p-t-16 flex justify-center">
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
        </div> -->
        <!-- 切换完成后 会显示互换IP的内容 -->
        <!-- 点击数据库切换 抽屉内容 -->
        <Drawer
            height="520"
            placement="bottom"
            class="app-drawer"
            :transfer="false"
            :mask-closable="false"
            closable
            v-model="bottomTag"
        >
            <div class="flex justify-center flex-center m-t-30">
                <Steps style="width: 406px" :current="current" class="app-step">
                    <Step title="输入服务器信息"></Step>
                    <Step title="确认切换"></Step>
                </Steps>
            </div>

            <div class="flex justify-center flex-center m-t-24" v-show="current === 0">
                <Card
                    class="w-360 m-r-40 app-bg-frame app-bg-osLogin os-login-form"
                    style="height: 330px"
                >
                    <div class="text-white font-bold font-18 m-b-20">主服务器</div>
                    <Form
                        ref="primaryOs"
                        :label-width="100"
                        :model="primaryOs"
                        :rules="rules"
                    >
                        <FormItem label="服务器IP" prop="host">
                            <Input v-model="primaryOs.host" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="端口号" prop="port">
                            <Input v-model="primaryOs.port" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="服务器账号" prop="user">
                            <Input v-model="primaryOs.user" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="服务器密码" class="m-b-0" prop="password">
                            <Input
                                v-model="primaryOs.password"
                                placeholder="请输入"
                            ></Input>
                        </FormItem>
                        <div
                            class="error-tip l-h-32 m-t-10 justify-center flex"
                            v-show="primaryOs.errorMsg"
                        >
                            {{ primaryOs.errorMsg }}
                        </div>
                        <div class="flex justify-center m-t-10">
                            <Tag
                                color="success"
                                size="large"
                                v-show="primaryOs.validStatus"
                                >校验成功</Tag
                            >
                        </div>
                    </Form>
                </Card>
                <Card
                    class="w-360 app-bg-frame app-bg-osLogin os-login-form"
                    style="height: 330px"
                >
                    <div class="text-white font-bold font-18 m-b-20">从服务器</div>
                    <Form
                        :label-width="100"
                        ref="standByOs"
                        :model="standByOs"
                        :rules="rules"
                    >
                        <FormItem label="服务器IP" prop="host">
                            <Input v-model="standByOs.host" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="端口号" prop="port">
                            <Input v-model="standByOs.port" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="服务器账号" prop="user">
                            <Input v-model="standByOs.user" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="服务器密码" class="m-b-0" prop="password">
                            <Input
                                v-model="standByOs.password"
                                placeholder="请输入"
                            ></Input>
                        </FormItem>
                        <div
                            class="error-tip l-h-32 m-t-10 justify-center flex"
                            v-show="standByOs.errorMsg"
                        >
                            {{ standByOs.errorMsg }}
                        </div>
                        <div class="flex m-t-10 justify-center">
                            <Tag
                                color="success"
                                size="large"
                                v-show="standByOs.validStatus"
                                >校验成功</Tag
                            >
                        </div>
                    </Form>
                </Card>
            </div>

            <div
                class="flex justify-center flex-center m-t-24 app-drawer-footer"
                v-show="current === 0"
            >
                <Button
                    type="primary"
                    @click="handleOsLogin"
                    :loading="osLoading"
                    class="m-r-16"
                    >确定</Button
                >
                <Button @click="handleCancelBottom">取消</Button>
            </div>

            <div v-show="current === 1">
                <div class="flex flex-center justify-center m-t-24">
                    <Card
                        style="width: 360px; height: 300px"
                        class="app-bg-status app-bg-frame"
                    >
                        <div class="flex m-t-14">
                            <div class="flex-col">
                                <div class="app-icon-db"></div>
                                <div
                                    class="m-t-10 font-bold font-17 text-white text-center"
                                >
                                    ORACLE_01
                                </div>
                            </div>
                            <Row class="app-desc m-l-10">
                                <Col
                                    class="desc-item"
                                    span="24"
                                    v-for="item in Object.keys(primaryCurrentForm)"
                                    :key="item"
                                    :label="item"
                                >
                                    <div class="desc-label">{{ item }}:</div>
                                    <div class="desc-content">
                                        <Poptip
                                            trigger="hover"
                                            word-wrap
                                            placement="left-start"
                                            width="200"
                                            :content="primaryCurrentForm[item]"
                                        >
                                            {{ primaryCurrentForm[item] }}
                                        </Poptip>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    <div class="p-s">
                        <div class="db">P</div>
                        <div class="arrow">
                            <div class="app-icon-arrow-success"></div>
                            <div class="app-icon-arrow-success m-t-12"></div>
                        </div>
                        <div class="db">S</div>
                    </div>
                    <Card
                        style="width: 360px; height: 300px"
                        class="app-bg-status app-bg-frame"
                    >
                        <div class="flex m-t-14">
                            <div class="flex-col">
                                <div class="app-icon-db"></div>
                                <div
                                    class="m-t-10 font-bold font-17 text-white text-center"
                                >
                                    ORACLE_01
                                </div>
                            </div>
                            <Row class="app-desc m-l-10">
                                <Col
                                    class="desc-item"
                                    span="24"
                                    v-for="item in Object.keys(standByCurrentForm)"
                                    :key="item"
                                    :label="item"
                                >
                                    <div class="desc-label">{{ item }}:</div>
                                    <div class="desc-content">
                                        <Poptip
                                            trigger="hover"
                                            word-wrap
                                            placement="left-start"
                                            width="200"
                                            :content="standByCurrentForm[item]"
                                        >
                                            {{ standByCurrentForm[item] }}
                                        </Poptip>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </div>
                <p
                    class="flex flex-center justify-center text-white m-t-30 m-b-30 font-16"
                >
                    提示:完成整个切换过程,会耗时5分钟左右
                </p>
            </div>
            <div
                class="flex justify-center flex-center m-t-24 app-drawer-footer"
                v-show="current === 1"
            >
                <Button type="primary" class="m-r-16" @click="handleConfimSwitch"
                    >确认开始</Button
                >
                <Button @click="handleCancelBottom">取消</Button>
            </div>
        </Drawer>
        <!-- 点击数据库切换 抽屉内容 -->
        <!-- 日志详情抽屉 -->
        <Drawer
            :closable="true"
            :height="logHeight"
            v-model="logDrawer"
            class="app-drawer"
            placement="bottom"
        >
            <p
                class="text-center font-18 font-bold text-white p-t-20 p-b-20 flex flex-col"
            >
                <span> 日志详情 </span>
                <Icon
                    :type="arrowTag ? 'ios-arrow-down' : 'ios-arrow-up'"
                    @click="handleArrow"
                    style="font-size: 26px"
                />
            </p>

            <div class="log-container" :style="logContanerStyle">
                <div>
                    {{ switchLogData.primary[0] ? switchLogData.primary[0] : '' }}
                    {{ switchLogData.standBy[0] ? switchLogData.standBy[0] : '' }}
                    {{ switchLogData.log }}
                </div>
            </div>
            <div class="flex justify-center flex-center m-t-24 app-drawer-footer">
                <Button type="primary" @click="handleOsLogin" :loading="osLoading"
                    >更新数据库信息</Button
                >
            </div>
        </Drawer>
        <!-- 日志详情抽屉 -->
        <!-- 切换主备数据抽屉 -->
        <Drawer
            :closable="false"
            v-model="switchLoading"
            :mask-closable="false"
            height="160px"
            placement="bottom"
        >
            <div class="drawer-inner">
                <div class="flex justify-center flex-center p-t-50 p-b-50">
                    <!--  -->
                    <Steps :current="switchStep" class="app-step" style="width: 740px">
                        <Step
                            title="主数据库>从数据库"
                            :status="switchError.ps.tag ? 'error' : 'finish'"
                        >
                            <div slot="content">
                                <div
                                    v-if="!switchError.ps.tag"
                                    :class="
                                        pSswitchLoading ? 'going-text' : 'finish-text'
                                    "
                                >
                                    {{
                                        switchStep >= 0
                                            ? pSswitchLoading
                                                ? '正在进行中...'
                                                : '已完成'
                                            : ''
                                    }}
                                </div>
                                <div v-else>
                                    <span class="error-text">{{
                                        switchError.ps.text
                                    }}</span>
                                </div>
                            </div>
                        </Step>

                        <Step
                            title="从数据库>主数据库"
                            :status="switchError.sp.tag ? 'error' : 'finish'"
                        >
                            <div slot="content">
                                <div
                                    v-if="!switchError.sp.tag"
                                    :class="
                                        sPswitchLoading ? 'going-text' : 'finish-text'
                                    "
                                >
                                    {{
                                        switchStep >= 1
                                            ? sPswitchLoading
                                                ? '正在进行中...'
                                                : '已完成'
                                            : ''
                                    }}
                                </div>
                                <div v-else class="error-text">
                                    {{ switchError.sp.text }}
                                </div>
                            </div>
                        </Step>
                        <Step title="完成">
                            <div slot="content">
                                <div class="going-text">
                                    {{ switchStep >= 2 ? '日志获取中...' : '' }}
                                </div>
                            </div>
                        </Step>
                    </Steps>

                    <!-- <Button type="primary" class="m-l-16" style="margin-top: -24px"
                    >查看切换日志</Button
                > -->
                </div>
            </div>
        </Drawer>
        <!-- 切换主备数据抽屉 -->

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
        </div>
        <!-- 底部固定Footer内容 -->
    </div>
</template>
<script>
import {
    checkAdgConfig,
    checkAdgStatus,
    osLogin,
    switchoverS2p,
    switchoverP2s,
    dblog
} from '@/service/db'
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
            // 切换报错标记
            switchError: {
                ps: {
                    tag: false,
                    text: ''
                },
                sp: {
                    tag: false,
                    text: ''
                }
            },
            // 切换步骤计数
            switchStep: 0,
            // 主备切换的完成标记
            switchLoading: false,
            // 主切换到备的标记
            pSswitchLoading: false,
            // 备切换到主的标记
            sPswitchLoading: false,
            switchLogData: {
                primary: [],
                standBy: [],
                log: ''
            },
            scanModalVisible: false,
            osLoading: false,
            switchBtnDisabled: true,
            current: 1,
            // 主服务器
            primaryOs: {
                host: '192.168.10.96',
                user: 'root',
                port: '22',
                password: 'Hello1234',
                validStatus: false,
                errorMsg: ''
            },
            // 备服务器
            standByOs: {
                host: '192.168.10.86',
                user: 'root',
                port: '22',
                password: 'Hello1234',
                validStatus: false,
                errorMsg: ''
            },
            // 日志详情Drawer
            logDrawer: false,
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
            },

            // logHeight: 300,
            arrowTag: false
        }
    },
    async created() {
        await this.getCurrentStatus()
        await this.getSwitchStatus()
    },
    computed: {
        logHeight() {
            return this.arrowTag ? 80 : 300
        },
        logContanerStyle() {
            return {
                height: this.arrowTag ? 'calc(100% - 179px)' : '110px'
            }
        }
    },
    mounted() {},
    beforeDestroy() {
        this.stopSetInterval()
    },

    methods: {
        // 获取切换日志
        async getSwitchLog() {
            const primary = JSON.parse(localStorage.getItem('primary'))
            const res = await dblog({
                db_user: primary.account,
                db_pass: primary.password,
                db_host: primary.ip,
                db_port: primary.port,
                db_sername: primary.databaseName,
                os_host: this.primaryOs.host,
                os_user: this.primaryOs.user,
                os_port: this.primaryOs.port,
                os_password: this.primaryOs.password
            })
            this.switchLogData.log = res.data || ''
        },
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

                    Object.keys(primaryCurrentStatus.data).forEach((item, index) => {
                        if (item !== 'code') {
                            if (index <= 8) {
                                this.primaryCurrentForm[item] =
                                    primaryCurrentStatus.data[item]
                            }
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

                    Object.keys(standByCurrentStatus.data).forEach((item, index) => {
                        if (item !== 'code') {
                            if (index <= 8) {
                                this.standByCurrentForm[item] =
                                    standByCurrentStatus.data[item]
                            }
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
        // 打开数据库切换按钮
        handleBottom() {
            this.osLoading = false
            this.current = 1
            this.switchStep = 0
            this.primaryOs.errorMsg = ''
            this.primaryOs.validStatus = false
            this.standByOs.errorMsg = ''
            this.standByOs.validStatus = false
            const { primaryOs, standByOs } = this.$refs
            primaryOs.resetFields()
            standByOs.resetFields()
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
        // 关闭数据库切换按钮
        handleCancelBottom() {
            this.bottomTag = false
        },
        // 切换完成后 的初始化

        // 主数据库切换到备份数据库
        async handleSwitchoverP2s() {
            this.pSswitchLoading = true
            const primaryDb = JSON.parse(localStorage.getItem('primary'))
            try {
                const res = await switchoverP2s({
                    p_db_user: primaryDb.account,
                    p_db_pass: primaryDb.password,

                    // p_db_host: '192.172.10.88',
                    p_db_host: primaryDb.ip,
                    p_db_port: primaryDb.port,
                    p_db_sername: primaryDb.databaseName,
                    p_os_host: this.primaryOs.host,
                    p_os_user: this.primaryOs.user,
                    p_os_port: this.primaryOs.port,
                    p_os_password: this.primaryOs.password
                })

                if (parseInt(res?.code) === 200) {
                    //
                    this.switchLogData.primary.push(res.data)
                } else {
                    this.switchError.ps.tag = true
                    this.switchError.ps.text = '切换异常,请重试'
                }
            } catch (error) {
                this.switchError.ps.tag = true
            } finally {
                this.pSswitchLoading = false
                this.switchStep += 1
            }
        },
        // 备份数据库切换到主数据库
        async handleSwitchoverS2p() {
            this.sPswitchLoading = true
            const standByDb = JSON.parse(localStorage.getItem('standBy'))
            try {
                const res = await switchoverS2p({
                    s_db_user: standByDb.account,
                    s_db_pass: standByDb.password,
                    s_db_host: standByDb.ip,
                    s_db_port: standByDb.port,
                    s_db_sername: standByDb.databaseName,
                    s_os_host: this.standByOs.host,
                    s_os_user: this.standByOs.user,
                    s_os_port: this.standByOs.port,
                    s_os_password: this.standByOs.password
                })
                if (parseInt(res?.code) === 200) {
                    //
                    this.switchLogData.standBy.push(res.data)
                } else {
                    this.switchError.sp.tag = true
                    this.switchError.sp.text = '切换异常,请重试'
                }
            } catch (error) {
                this.switchError.sp.tag = true
            } finally {
                this.sPswitchLoading = false
                this.switchStep += 1
            }
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

        // 服务器登录
        async handleOsLogin() {
            const { primaryOs, standByOs } = this.$refs
            const validPrimary = await primaryOs.validate()
            const validStand = await standByOs.validate()

            if (validPrimary && validStand) {
                this.osLoading = true
                const primaryRes = await this.primaryLogin()

                const standByRes = await this.standByLogin()

                this.osLoading = false
                if (primaryRes && standByRes) {
                    this.current += 1
                }
            }
        },
        async primaryLogin() {
            const res = await osLogin({
                user: this.primaryOs.user,
                password: this.primaryOs.password,
                host: this.primaryOs.host,
                port: this.primaryOs.port
            })
            if (parseInt(res.code) === 200) {
                this.primaryOs.validStatus = true
                this.primaryOs.errorMsg = ''

                return true
            } else {
                this.$Message.error({
                    background: true,
                    content: `主服务器` + res.msg
                })
                this.primaryOs.errorMsg = res.data || ''
                this.primaryOs.validStatus = false
                return false
            }
        },
        async standByLogin() {
            const res = await osLogin({
                user: this.standByOs.user,
                password: this.standByOs.password,
                host: this.standByOs.host,
                port: this.standByOs.port
            })

            if (parseInt(res.code) === 200) {
                this.standByOs.validStatus = true
                this.standByOs.errorMsg = ''
                return true
            } else {
                this.$Message.error({
                    background: true,
                    content: `从服务器` + res.msg
                })
                this.standByOs.errorMsg = res.data || ''
                this.standByOs.validStatus = false
                return false
            }
        },
        back() {
            this.$router.back()
        },

        handleModalCancel() {
            this.scanModalVisible = false
        },
        // 确认开始数据库切换按钮
        async handleConfimSwitch() {
            this.bottomTag = false
            this.switchLoading = true
            await this.handleSwitchoverP2s()
            // if (!this.switchError.ps.tag) {

            // }
            await this.handleSwitchoverS2p()
            await this.getSwitchLog()
            setTimeout(async () => {
                this.switchLoading = false

                this.logDrawer = true
            }, 1000)

            //
        },
        formatDelay(time) {
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
                return `0天 0时 0分 0秒`
            }
        },
        // 处理日志详情的箭头
        handleArrow() {
            this.arrowTag = !this.arrowTag
            // this.logHeight = 80
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
    background: rgba(15, 40, 94, 0.44);
    top: 48px;
}
.p-s {
    // width: 200px;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    .arrow {
        margin: 0 8px 0px 10px;
    }
    .db {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        font-size: 36px;
        width: 50px;
        height: 120px;
        background-image: linear-gradient(270deg, #3b62d4 0%, #3b7dd4 100%);
        border-radius: 8px;
    }
}
.switch-title {
    text-align: center;
    margin-bottom: 10px;
    margin-top: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 8px;
    background: #3b62d4;
    color: #fff;
}
.frame-card {
    /deep/ .ivu-card-head {
        border: none;
        padding: 0px;
        p {
            text-align: center;
            color: #fff;
            font-weight: bold;
            font-size: 21px;
        }
    }
    /deep/ .ivu-card-body {
        padding: 0px 0px 20px 0px;
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
.delay-left {
    /deep/ .ivu-form-item-label {
        background: #3b62d4;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
    }
    /deep/ .ivu-form-item-content {
        font-size: 16px;
        color: #fff;
        width: 100% !important;
    }
}
.os-login-form {
    /deep/ .ivu-card-body {
        padding: 20px 27px 28px 20px;
    }
    /deep/ .ivu-form-item {
        margin-bottom: 20px;
    }
    /deep/ .ivu-form {
        .ivu-form-item:last-child {
            margin-bottom: 0px;
        }
    }
}
// 已完成状态颜色
.finish-text {
    color: #00d3a7;
    font-size: 18px;
}
//正在进行中完成状态颜色
.going-text {
    color: #22e0ff;
    font-size: 18px;
}
.error-text {
    color: #ff7873;
    font-size: 18px;
}
.drawer-inner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #172e5e;
}
.log-container {
    width: 950px;
    height: 110px;
    padding: 20px 20px 30px 20px;
    // box-sizing: border-box;
    font-size: 14px;
    letter-spacing: 0;
    color: #111111;
    background: #fff5f5;
    border: 1px solid rgba(204, 0, 0, 0.5);
    border-radius: 8px;
    margin: 0 auto;
    overflow-y: auto;
}
.text-shrink {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
}
</style>
