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
  }
}