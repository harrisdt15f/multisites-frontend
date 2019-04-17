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
    },
    /*
    * 显示小数点后面几位
    * str 字符串
    * num 显示几个小数点
    */
    toFixed (str, num = 2) {
        if (str.indexOf('.') > -1) {
            return str.substr(0, str.lastIndexOf('.') + num + 1)
        } else {
            let zeo = ''
            for (let i = 0; i < num; i++) {
                zeo += '0'
            }
            return str + '.' + zeo
        }
    },
    // obj 传入时间  返回 yyyy-mm-dd
    formatTime (obj, format = 'YYYY-MM-DD') {
    let date = new Date(obj);
    let date2 = date.toLocaleDateString().split('/');
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (date2[1] < 10) {
        date2[1] = '0' + date2[1]
    }
    if (date2[2] < 10) {
        date2[2] = '0' + date2[2]
    }
    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    let dateDay = date2.join('-')
    if (format === 'YYYY-MM-DD') {
        return dateDay
    } else if (format === 'HH:MM:SS') {
        return hours + ":" + minutes + ':' + seconds
    } else if (format === 'YYYY-MM-DD HH:MM:SS') {
        return dateDay + ' ' + hours + ":" + minutes + ':' + seconds
    }
}
}
export default Utils