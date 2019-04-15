let Utils = {
    // 设置缓存
    storage: {
        set (key, value, expiration = 0) {
            let obj = {}
            obj.data = value
            obj.setTime = new Date().getTime()
            if (expiration) {
                obj.expiration = 60 * 60 * (24 * expiration)
            }
            localStorage.setItem(key, JSON.stringify(obj))
        },
        get (key) {
            let [item = JSON.parse(localStorage.getItem(key)), exp = null, nowTime = new Date().getTime()] = []
            if (item) {
                if (item.data && item.data.expires_in) {
                    exp = item.data.expires_in
                } else if (item.expiration) {
                    exp = item.expiration
                }
                if (exp && nowTime - item.setTime > exp * 1000) {
                    localStorage.removeItem(key)
                    return false
                }
            }
            return item
        },
        remove(key) {
            localStorage.removeItem(key)
        }
    },
    // 去除字符串中所有空格
    removeAllSpace (str) {
        return str.replace(/\s+/g, '')
    },
    // 去除字符串换行
    removeLineFeed (str) {
        return str.replace(/[\n]/g, '')
    },
    // 去除字符串回车
    removeEnter (str) {
        return str.replace(/[\r]/g, "")
    }
}
export default Utils