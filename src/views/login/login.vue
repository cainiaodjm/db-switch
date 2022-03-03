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
            <div class="app-login-img">//</div>
            <div class="app-login-body">
                <Form ref="form" :model="form" :rules="rules">
                    <div>
                        <p>DB切换</p>
                        <p>XXXXXX医院</p>
                    </div>
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
                <div class="flex m-b-24">
                    <Checkbox v-model="remember" @on-change="rememberUser" class="flex-1">
                        记住用户名
                    </Checkbox>
                    <a>忘记密码？</a>
                </div>
                <Button
                    class="login-btn"
                    type="primary"
                    :loading="loading"
                    @click="login"
                >
                    登 录
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
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
        }
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
    left: 30%;
    top: 50%;
    margin-top: -181.5px;
    width: 815px;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 20px;
    box-shadow: 0 12px 14px 0 rgba(20, 36, 87, 0.36);
    // overflow: hidden;
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
    padding: 33px 40px 40px;
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
    width: 280px;
    height: 48px;
    background: linear-gradient(270deg, #6448a1, #176faf);
    border-radius: 8px;
    box-shadow: 0 4px 12px 0 rgba(0, 7, 119, 0.5);
    font-size: 18px;
    font-weight: 600;
    color: #f9f9f9;
    line-height: 25px;
}
</style>
