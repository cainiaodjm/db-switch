import axios from 'axios'

import helper from './helper'

import { Spin, Message } from 'view-design'

import { baseURL } from './globalConstants'

/**
 * config
 * loading  设置成false则该xhr不加载loading
 * redirect 未登录情况下是否跳转登录
 * axios.get(url, { loading: false })
 * axios.post(url, data, { loading: false })
 */

/**
 *  @Author    hyj
 *  @DateTime  2020-04-10
 *  mask 统一处理loading 显示时间为第一个接口开始到最后一个接口完成
 *  从第一个xhr开始计数 显示loading
 *  进来一个xhr count自增一次
 *  出去一个xhr count自减一次
 *  当count减为0时取消loading
 */
const mask = {
    count: 0,
    add(xhr) {
        if (!this.loading) {
            // Spin.show()
            // this.loading = true
        }
        this.count++
        xhr.then(() => {
            this.remove()
        }).catch(() => {
            this.remove()
        })
    },
    remove() {
        this.count = this.count < 1 ? 0 : this.count - 1
        if (this.count === 0 && this.loading) {
            Spin.hide()
            this.loading = false
        }
    }
}

// api的base_url
axios.defaults.baseURL = baseURL

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

export function setToken(token) {
    localStorage.setItem('Authorization', token)
    axios.defaults.headers['Authorization'] = `JWT ${token}`
}

axios.defaults.headers['Authorization'] = `JWT ${localStorage.getItem('Authorization')}`

// request 接口开始前统一处理
axios.interceptors.request.use(
    (config) => {
        let method = config.method
        // 防止csrf攻击
        setCSRFToken(config)
        // 处理传递参数
        // 去除空参数
        // if (
        //     typeof config.data === 'object' &&
        //     !Array.isArray(config.data) &&
        //     !(config.data instanceof FormData)
        // ) {
        //     config.data = helper.objectTrim(config.data)
        // }
        // 参数加入到url里
        config.url = helper.renderText(config.url, config.data, (value, key) => {
            key && delete config.data[key]
        })
        method && (method = method.toLocaleLowerCase())
        // 参数接收调整
        if ((method === 'post' || method === 'put') && !config.headers['Content-Type']) {
            if (config.data instanceof FormData) {
                config.headers['Content-Type'] = 'multipart/form-data'
            } else {
                config.headers['Content-Type'] = 'application/json'
            }
        }
        const contentType = config.headers['Content-Type']
        if (contentType) {
            if (contentType.includes('application/json')) {
                // Request Payload
                // application/json JSON.stringify 处理格式 {...}
                if (typeof config.data === 'object') {
                    config.data = JSON.stringify(config.data)
                }
            }
            if (
                contentType.includes('application/x-www-form-urlencoded') ||
                contentType.includes('multipart/form-data')
            ) {
                // Form Data
                // 表单提交格式 ..=..&..=..
                // application/x-www-form-urlencoded|multipart/form-data
                if (!(config.data instanceof FormData)) {
                    config.data = helper.param(config.data)
                }
            }
        } else {
            // Query String Parameters
            // get delete 接口缓存
            config.data = helper.param(config.data)
            if (config.data) config.data += '&'
            config.data += '_=' + Date.now()
            config.url += (config.url.indexOf('?') === -1 ? '?' : '&') + config.data
            config.data = null
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// respone 接口返回统一处理
axios.interceptors.response.use(
    (response) => {
        getCSRFToken(response)
        if (response.data) {
            // 统一处理登录校验
            if (response.data.code === 403 && response.config.redirect !== false) {
                window.store.dispatch('logout', true)
            }
        }
        return response.status !== 200 ? new Error(response.status) : response.data
    },
    (error, response) => {
        console.log(error, response)
        if (!response) response = error.response
        getCSRFToken(response)
        if (error && error instanceof error.constructor && error.__CANCEL__) {
            return Promise.resolve(error)
        }
        return Promise.reject(error)
    }
)

const adapter = axios.defaults.adapter

axios.defaults.adapter = (config) => {
    const promise = adapter(config)
    // 是否加载loading
    if (config.loading !== false) {
        mask.add(promise)
    }
    return promise
}

// 是否开启CSRF
axios.CSRF = true

// 设置xhr Request Header里CSRF的key
axios.CSRF_TOKEN = 'X-CSRFToken'

function setCSRFToken(config) {
    if (axios.CSRF) {
        const token = localStorage.getItem(axios.CSRF_TOKEN)
        if (token) {
            config.headers[axios.CSRF_TOKEN] = token
        }
    }
}

function getCSRFToken() {
    if (axios.CSRF) {
        const token = getCookie('csrftoken')
        token && localStorage.setItem(axios.CSRF_TOKEN, token)
    }
}

function getCookie(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
    const value = document.cookie.match(reg)
    return value ? unescape(value[2]) : null
}

export default axios
