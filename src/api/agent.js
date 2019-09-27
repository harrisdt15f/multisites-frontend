export default {
  //团队盈亏
  getUserProfits(data) {
    return this.get('/user-agent-center/user-profits', data).then(response =>  response)
  },
  //日工资
  getUserDaysalary(data) {
    return this.get('/user-agent-center/user-daysalary', data).then(response =>  response)
  },
  //团队管理
  getTeamManagement(data) {
    return this.get('/user-agent-center/team-management', data).then(response =>  response)
  },
  //团队报表
  getTeamReport(data) {
    return this.get('/user-agent-center/team-report', data).then(response =>  response)
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
    return this.post('/user-agent-center/register-link', data).then(response =>  response)
  },
  //删除开户链接
  deleteRestisterLink(data) {
    return this.post('/user-agent-center/link-del', data).then(response =>  response)
  },
  transferToChild(data) {
    return this.post('/user-agent-center/transfer-to-child', data).then(response =>  response)
  },
}