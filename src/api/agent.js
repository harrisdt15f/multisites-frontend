export default {
  //团队盈亏
  getUserProfits(data) {
    return this.get('/user-agent-center/user-profits', data).then(response =>  response)
  },
  //日工资
  getUserDaysalary(data) {
    return this.get('/user-agent-center/user-daysalary', data).then(response =>  response)
  },
  //日工资
  getUserBonus(data) {
    return this.get('/user-agent-center/user-bonus', data).then(response =>  response)
  },
  //开户链接信息
  getRegisterableLink(data) {
    return this.get('/user-agent-center/registerable-link', data).then(response =>  response)
  },
  //生成开户链接 
  createRegisterLink(data) {
    return this.get('/user-agent-center/register-link', data).then(response =>  response)
  },
}