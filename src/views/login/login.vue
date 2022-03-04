<!--
 * @Author: your name
 * @Date: 2022-02-16 11:05:09
 * @LastEditTime: 2022-02-28 14:43:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/views/login/login.vue
-->
<template>
    <div class="app-login-bg">
        <div class="app-login">
            <div class="app-login-body-header">
                        <p class="font-bold font-24 text-white">DB切换</p>
                        <p class="font-400 font-16 text-white">浙江大学医学院附属第一医院</p>
                    </div>
            <div class="app-login-body">
                 <div class="text-primary-2 font-600 font-22 text-center m-t-50 m-b-30">
                     账号密码登录
                 </div>
                <Form ref="form" :model="form" :rules="rules">
                   
                    <FormItem prop="userCode">
                        <Input
                            type="text"
                            v-model="form.userCode"
                            placeholder="请输入账号"
                        >
                            <img src="@/assets/images/account.png" slot="prefix" />
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input
                            :type="locked ? 'password' : 'text'"
                            v-model="form.password"
                            placeholder="请输入密码"
                            @on-keyup.enter="login"
                        >
                            <img src="@/assets/images/password.png" slot="prefix" />
                            <Icon
                                :type="locked ? 'ios-eye' : 'ios-eye-off'"
                                slot="suffix"
                                @click="locked = !locked"
                            />
                        </Input>
                    </FormItem>
                </Form>
                <!-- <div class="flex m-b-24">
                    <Checkbox v-model="remember" @on-change="rememberUser" class="flex-1">
                        记住用户名
                    </Checkbox>
                    <a>忘记密码？</a>
                </div> -->
                <Button
                    class="login-btn"
                    type="primary"
                    :loading="loading"
                    @click="login"
                >
                    登 录
                </Button>
                <div class="text-second font-14 font-600 m-t-20 text-center m-b-28">忘记密码?</div>
                <button @click="test">测试</button>
            </div>
        </div>
    </div>
</template>

<script>
import {switchoverS2p} from '@/service/db'
import sha256 from 'crypto-js/sha256'
import { login } from '@/service/sysApi'
import { setToken } from '@/utils/request'
export default {
    data() {
        return {
            locked: true,
            form: {
                userCode: '',
                password: ''
            },
            remember: localStorage.getItem('remember') === 'true',
            loading: false,
            rules: {
                userCode: {
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                },
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        min: 6,
                        message: '密码不能少于6位',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        async login() {
            const valid = await this.$refs.form.validate()
            if (!valid) {
                return false
            }
            const { userCode, password } = this.form
            this.loading = true
            const res = await login({
                userCode,
                password: sha256(password).toString()
            })
            this.loading = false
            const { code, data } = res
            if (code === 200) {
                const { userInfo, token } = data
                const { loginInfo } = userInfo
                setToken(token)
                this.$store.commit('login', {
                    data: loginInfo,
                    redirect: true
                })
            }
        },
        rememberUser() {
            localStorage.setItem('remember', this.remember)
        },
        async test() {
            const res = await switchoverS2p({
                's_db_user': 'dbmaint',
                's_db_pass': 'dbmaint123',
                's_db_host': '192.168.10.96',
                's_db_port': '1521',
                's_db_sername': 'glhis',
                's_os_host': '192.168.10.96',
                's_os_user': 'root',
                's_os_port': '22',
                's_os_password': 'Hello1234'
            })
            console.log(res)
        },
    }
}
</script>

<style lang="less" scoped>
.app-login-bg {
    position: relative;
    height: 100%;
    width: 100%;
    background-image: url('../../assets/images/bg.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.app-login {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 57%;
    top: 45%;
    margin-top: -181.5px;
    width: 400px;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 20px;
    box-shadow: 0 12px 14px 0 rgba(20, 36, 87, 0.36);
    // overflow: hidden;
}
.app-login-body-header{
    background: #1A6EAF;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
.app-login-title {
    background: #216aad;
    color: #fff;
    height: 95px;
    img {
        width: 38px;
        height: 38px;
        margin-left: 63px;
        margin-right: 14px;
    }
    > div {
        p:first-child {
            font-size: 20px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 2px;
            text-shadow: 0 3px 9px rgba(0, 23, 43, 0.3);
        }
        p:last-child {
            margin-top: 3px;
            line-height: 20px;
        }
    }
}
.app-login-img {
    width: 480px;
    flex-shrink: 0;
}
.app-login-body {
    padding: 0px 40px 40px;
    width: 100%;
    /deep/ .ivu-input {
        height: 48px;
        border: 0;
        padding-right: 48px;
        padding-left: 48px;
    }
    /deep/ .ivu-input-prefix {
        width: 48px;
        line-height: 48px;
    }
    /deep/ .ivu-input-suffix {
        width: 48px;
        .ivu-icon {
            font-size: 24px;
            line-height: 48px;
        }
    }
}
.login-btn {
    width: 100%;
    height: 40px;
    background: linear-gradient(270deg, #6448a1, #176faf);
    border-radius: 8px;
    box-shadow: 0 4px 12px 0 rgba(0, 7, 119, 0.5);
    font-size: 18px;
    font-weight: 600;
    color: #f9f9f9;
    line-height: 25px;
}
</style>
