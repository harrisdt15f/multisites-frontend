<template>
  <footer class="fw">
    <section class="w">
      <section class="fw foot-head">
        <section class="logo">
          <img src="../assets/images/index/banner1.jpg" alt="footerlogo" title="footerlogo" class="footerlogo dinv">
          包网彩票
        </section>
        <section class="foot-nums">
          <p class="foot-nums-p dinv"> ¥ <strong class="st">26,686,686</strong> 今日已实现兑奖</p>
          <p class="foot-nums-p dinv"> ¥ <strong class="st">6,686</strong> 今日已实现兑奖</p>
        </section>
      </section>
      <nav class="fw">
        <a href="javascript:;" class="nav-list"  v-for="(item, index) in linkList" :key="index">
          {{item.title}}
        </a>
      </nav>
      <ul class="fw">
        <li class="cooperate-list"
            v-for="(item, index) in cooperateList" :key="index"
            :style="{background:item.src}">
        </li>
      </ul>
      <section class="desc">
        ©2017包网彩票版权所有<span class="desc-flb">菲律宾政府PAGCOR博彩拍照认证</span><br>
        春秋彩票郑重提示：彩票有风险，投注需谨慎，不向未满18周岁的青少年出售彩票
      </section>
    </section>
  </footer>
</template>
<script>
export default {
  name: 'Foote',
  data () {
    return {
      linkList: [
        {title: '包网品牌'},
        {title: '帮助中心'},
        {title: '手机客户端'},
        {title: 'PC 客户端'},
        {title: '仿劫持教程'},
      ],
      cooperateList: [
        {src: 'url(' + require('../assets/images/hj.png') + ') no-repeat #6e747f -64px 6px'},
        {src: 'url(' + require('../assets/images/hj.png') + ') no-repeat #6e747f -91px 6px'},
        {src: 'url(' + require('../assets/images/hj.png') + ') no-repeat #6e747f -124px 8px'},
        {src: 'url(' + require('../assets/images/hj.png') + ') no-repeat #6e747f -156px 5px'},
        {src: 'url(' + require('../assets/images/hj.png') + ') no-repeat #6e747f -191px 7px'},
        {src: 'url(' + require('../assets/images/hj.png') + ') no-repeat #6e747f -228px 6px'}
      ]
    }
  }
}
</script>
<style scoped>
  footer {
    margin-top:35px;
    background:#353c47;
  }
  .foot-head{
    padding:37px 0 21px;
    border-bottom:1px dashed #5e6571;
  }
  .logo{
    float:left;
    margin-right:14px;
    color:#fff;
    font-size:21px;
    font-weight:bold;
  }
  .footerlogo{
    width:180px;
    height:80px;
  }
  .foot-nums{
    float: right;
    line-height:66px;
    font-size:15px;
    color:#6e747f;
  }
  .foot-nums .st {
    color:#fff;
    font-size:35px;
  }
  .foot-nums-p:nth-of-type(1){
    margin-right:45px;
  }
  .nav-list{
    margin:25px 0;
    padding:0 9px;
    float:left;
    height:15px;
    color:#a6a8ab;
    border-right:1px solid;
    line-height:15px;
  }
  .nav-list:nth-of-type(1){
    padding-left:0;
  }
  .nav-list:last-of-type{
    border-right:none;
  }
  .nav-list:hover{
    color:#fefefe;
  }
  .cooperate-list{
    float:left;
    margin-left:12px;
    width:31px;
    height:31px;
    border-radius:50%;
  }
  .cooperate-list:nth-of-type(1){
    margin-left:0;
  }
  .desc{
    padding:33px 0 30px;
    color:#626872;
  }
  .desc-flb{
    color:#fefefe;
  }
</style>
