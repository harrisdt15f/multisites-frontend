import request from '@/utils/request'

import Site from './site'
import User from './user'
import Lottery from './lottery'
import Player from './player'

export const API = {
    get(url, data) {
        return new Promise((resolve, reject) => {
            request.get(url, {params: data}).then((res) => {
                resolve(res)
            }). catch((error) => {
                reject(error)
            })
        })
    },
    post(url, json) {
        return new Promise((resolve, reject) => {
            request.post(url, json).then((res) => {
                resolve(res)
            }). catch((error) => {
                reject(error)
            })
        })
    },
    /**  ============================== 接口 =============================== **/
    ...Site,
    ...User,
    ...Lottery,
    ...Player
}
