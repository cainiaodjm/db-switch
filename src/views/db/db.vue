<!--
 * @Author: your name
 * @Date: 2022-02-23 09:41:09
 * @LastEditTime: 2022-03-02 16:10:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/views/db/db.vue
-->
<template>
    <div class="app-bg-primary c-h-48">
<div class="flex-col m-t-48 ">
       
        <div class="flex justify-center m-t-40 ">
            <Card class="w-360 m-r-40 db-card app-bg-frame app-bg-confirm">
                <div class="flex justify-center text-white">
                    <div class="db-icon">P</div>
                    <div class="font-18 font-bold">主数据库</div>
                </div>
                <Form
                    ref="primaryForm"
                    :rules="rules"
                   
                    :label-width="80"
                    :model="primary"
                >
                    <div>主数据库</div>
                    <FormItem label="数据库IP" prop="ip" >
                        <Input v-model="primary.ip" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="数据库名"  prop="databaseName">
                        <Input
                            v-model="primary.databaseName"
                            placeholder="请输入"
                        ></Input>
                    </FormItem>
                    <FormItem label="端口号"  prop="port">
                        <Input v-model="primary.port" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="账号"  prop="account">
                        <Input v-model="primary.account" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="密码"  prop="password">
                        <Input v-model="primary.password" placeholder="请输入"></Input>
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
            <Card class="w-360  db-card app-bg-frame app-bg-confirm">
                <Form
                    ref="slaveForm"
                    :rules="rules"
                      
                    :label-width="80"
                    :model="slave"
                >
                    <div>从数据库</div>
                    <FormItem label="数据库IP" prop="ip">
                        <Input v-model="slave.ip" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="数据库名" prop="databaseName">
                        <Input v-model="slave.databaseName" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="端口号" prop="port">
                        <Input v-model="slave.port" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="账号" prop="account">
                        <Input v-model="slave.account" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input v-model="slave.password" placeholder="请输入"></Input>
                    </FormItem>

                    <div
                        class="msg-warning l-h-32 justify-center flex"
                        v-show="slave.errorMsg"
                    >
                        {{ slave.errorMsg }}
                    </div>
                    <div class="flex justify-center">
                        <Tag color="success" size="large" v-show="slave.validStatus"
                            >校验成功</Tag
                        >
                    </div>
                </Form>
            </Card>
        </div>
        <div class="flex justify-center m-t-40 ">
            <Button
                type="primary"
                @click="handleToDetail"
                :loading="loading || nextLoading"
                >下一步</Button
            >
        </div>
    </div>
    </div>
    
</template>
<script>
import { dbLogin } from '@/service/db'
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
            nextLoading: false,
            primary: {
                ip: '192.168.10.90',
                port: '1521',
                databaseName: 'glhis',
                account: 'dbmaint',
                password: 'dbmaint123',
                errorMsg: '',
                validStatus: false
            },
            slave: {
                ip: '192.168.10.100',
                port: '1521',
                databaseName: 'glhis',
                account: 'dbmaint',
                password: 'dbmaint123',
                errorMsg: '',
                validStatus: false
            },
            rules: {
                ip: [
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
                databaseName: [
                    {
                        required: true,
                        message: '请输入数据库名',
                        trigger: 'blur'
                    }
                ],
                account: [
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
            }
        }
    },
    methods: {
        async primaryLogin() {
            const res = await dbLogin({
                dbuser: this.primary.account,
                dbpass: this.primary.password,
                dbhost: this.primary.ip,
                dbport: this.primary.port,
                dbsername: this.primary.databaseName
            })
            if (parseInt(res.code) === 200) {
                this.primary.validStatus = true
                this.primary.errorMsg = ''

                return true
            } else {
                this.$Message.error({
                    background: true,
                    content: `主数据库` + res.msg
                })
                this.primary.errorMsg = res.data || ''
                this.primary.validStatus = false
                return false
            }
        },
        async standByLogin() {
            const res = await dbLogin({
                dbuser: this.slave.account,
                dbpass: this.slave.password,
                dbhost: this.slave.ip,
                dbport: this.slave.port,
                dbsername: this.slave.databaseName
            })

            if (parseInt(res.code) === 200) {
                this.slave.validStatus = true
                this.slave.errorMsg = ''
                return true
            } else {
                this.$Message.error({
                    background: true,
                    content: `从数据库` + res.msg
                })
                this.slave.errorMsg = res.data || ''
                this.slave.validStatus = false
                return false
            }
        },
        async handleToDetail() {
            const { primaryForm, slaveForm } = this.$refs
            const validPrimary = await primaryForm.validate()
            const validStand = await slaveForm.validate()
            if (validPrimary && validStand) {
                this.loading = true
                const primaryRes = await this.primaryLogin()

                const standByRes = await this.standByLogin()
                this.loading = false
                if (primaryRes && standByRes) {
                    this.nextLoading = true
                    // 存储数据库服务信息到本地
                    localStorage.setItem('primary', JSON.stringify(this.primary))
                    localStorage.setItem('standBy', JSON.stringify(this.slave))
                    // 下一步
                    setTimeout(() => {
                        this.nextLoading = false
                        this.$router.push(`/main/dbdetail`)
                    }, 2000)
                } else {
                    this.loading = false
                }
            } else {
                return false
            }
            // this.$router.push(`/main/dbdetail`)
        }
    }
}
</script>
<style lang="less" scoped>
.db-form{
    padding: 30px 33px 0px 31px;
}
.db-card{
    /deep/ .ivu-card-body{
        padding: 30px 33px 0px 31px;
    }
}
.db-icon{
    background: #fff;
}
</style>
