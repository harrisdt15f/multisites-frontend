export default {
  // 登录
  login(username, password) {
    let data = {
        'username': username,
        'password': password,
    }
    return this.post('/login', data).then(response =>  response)
  },
  //获取用户信息 
  getUserDetail(data) {
    return this.post('/user/detail', data).then(response =>  response)
  },
  //登出接口 
  logout(data) {
    return this.get('/user/logout', data).then(response =>  response)
  },
  //是否设置了资金密码 
  existFundPassword(){
    return this.get('/user/exist-fund-password').then(response =>  response)
  },
  //修改登录密码 
  resetUserPassword(data) {
    return this.post('/user/reset-user-password', data).then(response =>  response)
  },
  //修改资金密码 
  resetFundPassword(data) {
    return this.post('/user/reset-fund-password', data).then(response =>  response)
  },
  //添加绑定银行卡 
  addBank(data) {
    return this.post('/user-bank-card/add', data).then(response =>  response)
  },
  //删除绑定银行卡  
  deleteBank(data) {
    return this.post('/user-bank-card/delete', data).then(response =>  response)
  },
  //添加银行卡时选择的银行列表   
  bankLists() {
    return this.get('/user-bank-card/bank-lists').then(response =>  response)
  },
  //添加银行卡时选择的省份列表 
  provinceLists(){
    return this.get('/user-bank-card/province-lists').then(response =>  response)
  },
  // 玩家-银行卡列表
  getCardList(data) {
    return this.get('/user-bank-card/lists', data).then(response =>  response)
  },
  //添加银行卡时选择的城市列表 
  cityLists(data) {
    return this.post('/user-bank-card/city-lists', data).then(response =>  response)
  },
  resetSpecificInfos(data) {
    return this.post('/user/reset-specific-infos', data).then(response =>  response)
  },
  //设置资金密码
  setFundPassword(data) {
    return this.post('/user/set-fund-password', data).then(response =>  response)
  },
  //个人资料列表 
  userSpecificInfos(){
    return this.get('/user/user-specific-infos').then(response =>  response)
  }
}