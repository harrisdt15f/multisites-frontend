export default {
  //团队盈亏
  getUserProfits(data) {
    return this.get('/user-agent-center/user-profits', data).then(response =>  response)
  },
  //日工资
  getUserDaysalary(data) {
    return this.get('/user-agent-center/user-daysalary', data).then(response =>  response)
  }
}