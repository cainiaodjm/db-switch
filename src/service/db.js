/*
 * @Author: your name
 * @Date: 2022-02-25 09:14:23
 * @LastEditTime: 2022-03-07 13:08:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/service/db.js
 */
import axios from 'axios'

/**
 * DB 切换参数
 */
export function checkAdgConfig(data) {
    return axios.post('/check_adg_config', data)
}
/**
 * DB 当前状态
 */
export function checkAdgStatus(data) {
    return axios.post('/check_adg_status', data)
}

/** 数据库登录 */
export function dbLogin(data) {
    return axios.post('/dblogin', data)
}

/** 服务器登录 */
export function osLogin(data) {
    return axios.post('/oslogin', data)
}
/** 主切换到备**/
export function switchoverP2s(data) {
    return axios.post('/switchover_p2s', data)
}
/** 备切换到主**/
export function switchoverS2p(data) {
    return axios.post('/switchover_s2p', data)
}
/** 切换日志 */
export function dblog(data) {
    /**
     * {
"db_user": "dbmaint",
"db_pass": "dbmaint123",
"db_host": "192.168.10.96",
"db_port": "1521",
"db_sername": "glhis",
"os_host": "192.168.10.96",
"os_user": "root",
"os_port":  "22",
"os_password": "Hello1234"
}
     */
    return axios.post('/dblog', data)
}
