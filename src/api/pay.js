export default {
  //  获取充值渠道网关信息
  getRechargeChannel() {
    return this.get('/pay/v2.0/get-recharge-channel').then(response =>  response)
  },
  //   发起充值申请  
  postRecharge(data) {
    return this.post('/pay/v2.0/recharge', data).then(response =>  response)
  },
  // 发起提现申请 
  postWithdraw(data) {
    return this.post('/pay/withdraw', data).then(response =>  response)
  },
  //用户充值到账列表
  realRechargeList(data) {
    return this.post('/pay/realRechargeList', data).then(response =>  response)
  },
  //用户提现到账列表
  realWithdrawList(data) {
    return this.post('/pay/realWithdrawList', data).then(response =>  response)
  },
  //用户充值申请列表
  rechargeList(data) {
    return this.post('/pay/rechargeList', data).then(response =>  response)
  },
  // 用户提现申请列表
  withdrawList(data) {
    return this.post('/pay/withdrawList', data).then(response =>  response)
  },
}
