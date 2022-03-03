const ORIGINEXT = /^(http:\/\/|https:\/\/)?[^/\+]+\//g

const RENDEREXT = /{[^}]+}/g
const helper = {
    // 路由公用方法
    assistRouter(router) {
        this.filterHash = (url) => {
            if (router && router.options && router.options.mode === 'history') {
                if (!url) url = location.pathname
                return url === '' || url === '/'
            } else {
                if (!url) url = location.hash
                return url === '' || url === '#/'
            }
        }
        return (url) => {
            const origin = helper.getOrigin(url)
            // this.getOrigin(url)
            console.log(origin)
            if (origin) {
                //
            } else {
                if (router && router.mode === 'history') {
                    if (router.app) {
                        router.push(url)
                        // router.push(url).catch(error => error)
                    } else if (location.pathname !== url) {
                        /* 未实例化前直接修改url */
                        location.href = this.getOrigin() + url
                    }
                } else {
                    /* 路由模式直接改href */
                    location.href = '#' + url
                }
            }
        }
    },
    getOrigin(url) {
        if (url) {
            url = url.match(ORIGINEXT)
            return url ? url[0] : ''
        } else {
            if (location.origin) {
                return location.origin
            } else {
                url = location.port ? ':' + location.port : ''
                return location.protocol + '//' + location.hostname + url
            }
        }
    },
    // 深度优先遍历树
    depthFirstSearch(items, children, callback, parent) {
        if (!Array.isArray(items)) {
            items = [items]
        }
        if (typeof children === 'function') {
            parent = callback
            callback = children
            children = 'children'
        }
        let k = 0
        let item
        const len = items.length
        while (k < len) {
            item = items[k]

            if (callback(item, k, parent) === false) {
                return false
            }

            if (item[children] && item[children].length > 0) {
                if (
                    this.depthFirstSearch(item[children], children, callback, item) ===
                    false
                ) {
                    return false
                }
            }
            k++
        }
    },
    renderText(temp, data, callback) {
        var me = this,
            str = typeof temp === 'string' ? temp.match(RENDEREXT) : []
        if (typeof callback !== 'function') {
            callback = () => {
                return true
            }
        }
        if (str && str.length > 0) {
            str.map((value) => {
                var expre = value.replace('{', '').replace('}', ''),
                    field = me.getForJSON(expre, data)
                if (callback.call(data, field, expre) !== false) {
                    temp = temp.replace(new RegExp(value), field)
                }
            })
        }
        return temp
    }
}
window.helper = helper
export default helper
