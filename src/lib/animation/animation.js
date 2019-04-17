let animation = {
    move (obj,json, speed, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(() => {
            let mStop = true; /*当所有的值都到达*/
            for (let attr in json) {/*取当前值*/
                let com = 0;
                if (attr === 'opacity') {
                    com = parseInt(parseFloat(this.getStyle(obj, attr)) * 100);
                } else {
                    com = parseInt(this.getStyle(obj, attr))
                }/*计算速度*/
                let iSpeed = (json[attr] - com) / speed;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);/*检测*/
                if (com !== json[attr]) {
                    mStop = false
                }
                if (attr === 'opacity') {
                    obj.style.filter = 'alpha(opacity:' + (com + iSpeed) + ')';
                    obj.style.opacity = (com + iSpeed) / 100;
                } else {
                    obj.style[attr] = com + iSpeed + 'px';
                }
            }
            if (mStop) {
                clearInterval(obj.timer);
                if (fn) {
                    fn()
                }
            }
        }, 10)
    },
    /*
    * 获取属性兼容ie，current
    */
    getStyle (obj,attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr]
        } else {
            return getComputedStyle(obj, false)[attr]
        }
    },
    // 全屏幕宽
    screenWidth (obj) {
        obj.style.width =  document.body.clientWidth + 'px'
        obj.style.left = '-' + obj.getBoundingClientRect().left + 'px'
    }
}

export default animation