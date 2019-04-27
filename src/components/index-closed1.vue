<template>
	<section>
		<ul class="fw banner" @mouseenter="cleatBannerTimer()" @mouseleave="setBannerTimer()">
			<li
					v-for="(item, index) in banner.img"
					:key="index"
		      class="transition-box"
					:style="{background:'url(' + item.src + ') no-repeat top center', opacity: item.opacity}"
			></li>
			<li class="bannery">
				<span
							@click="slideChenge(index)"
							class="focus"
							:class="{on: banner.num - 1 === index}"
							v-for="(item, index) in banner.img"
							:key="index"
				></span>
			</li>
		</ul>
		<section class="w warp">
			<ul class="fw lottery-lists">
				<li class="lottery-list"
				    v-for="(item, index) in hotLottery.list"
				    :key="index"
				    :style="{background: 'url(' + item.bg + ') no-repeat'}"
				>
					<img
							:src="item.name"
							alt="lottery"
							title="lottery"
							class="lotter-list-name"
							:style="{ width: item.width + 'px', top: item.top + 'px'}"
					>
					<p class="tc ft16 lotter-list-desc" v-html="item.desc"></p>
					<a href="javascript:;"
					   :style="{background: 'url(' + item.btn + ') no-repeat'}"
					   class="tc dl mr ft22 lotter-list-btn"
					   
					>立即投注</a>
				</li>
			</ul>
			<section class="fw lottery-info">
				<section class="lottery-notice">
					<section class="lottery-title">
						<i class="fa fa-file-text ft18"></i>网站公告
					</section>
					<ul class="fw lottery-notice-lists lottery-notices">
						<li class="lottery-notice-list wzfw">[彩云追星]七星彩第19033期分析:七位胆码4956七星彩第19033期分析七星彩第19033期分析</li>
						<li class="lottery-notice-list wzfw">七星彩第19033期分析七星彩第19033期分析七星彩第19033期分析七星彩第19033期分析</li>
						<li class="lottery-notice-list wzfw">七星彩第19033期分析七星彩第19033期分析七星彩第19033期分析</li>
						<li class="lottery-notice-list wzfw">七星彩第19033期分析七星彩第19033期分析七星彩第19033期分析</li>
						<li class="cur more">查看更多 ></li>
					</ul>
				</section>
				<section class="lottery-notice lottery-hot">
					<section class="lottery-title lottery-title-hot">
						热门彩种
					</section>
					<ul class="fw lottery-notice-lists">
						<li class="lottery-notice-list">
							<section class="fw">
								<strong class="fl">重庆时时彩<span class="c51313">20190318</span></strong>
								<p class="fr"><span class="c51313">12</span>时<span class="c51313">23</span>分<span class="c51313">15</span>秒截止</p>
							</section>
							<section class="lottery-hot-bets">
								<ul class="fw">
									<li class="lottery-hot-bet-num">1</li>
									<li class="lottery-hot-bet-num yellow">2</li>
									<li class="lottery-hot-bet-num">3</li>
								</ul>
								<section class="tc lottery-hot-multiples">
									<span class="lottery-hot-multiples-reduce dinv" @click="multiplesReduce()">-</span>
									<input v-model="bet.multiple" class="lottery-hot-multiples-input"/>
									<span class="lottery-hot-multiples-add dinv" @click="multiplesAdd()">+</span> 倍， 共 <span class="c51313"></span> 元
								</section>
							</section>
							<ul class="fw">
								<li class="lottery-hot-bets-select"><i class="fa fa-refresh"></i>换一注</li>
								<li class="lottery-hot-bets-select">手动选号</li>
								<li class="lottery-hot-bets-select">立即投注</li>
							</ul>
						</li>
					</ul>
				</section>
			</section>
			<section class="fw lottery-right">
				<section class="lottery-right-code">
					<img src="../assets/images/index/right-title.png" alt="微信二维码" title="微信二维码" class="lottery-right-code-title">
					<img src="../assets/images/index/right-code.jpg" alt="微信二维码" title="微信二维码" class="lottery-right-code-img">
				</section>
				<section class="lottery-wins">
					<img src="../assets/images/index/right-win.png" alt="中奖排行榜" title="中奖排行榜" class="lottery-right-win-img">
					<section class="fw lottery-wins-boxs" id="lottery-wins-boxs">
						<ul class="lottery-wins-lists" id="lottery-wins-lists">
							<li class="lottery-wins-list">
								<span class="lottery-hot-bet-num">1</span>
								<span class="lottery-wins-list-name fl wzfw">张三22222222</span>
								<span class="lottery-wins-list-moeny fl wzfw">222222222222222222</span>
							</li>
							<li class="lottery-wins-list">
								<span class="lottery-hot-bet-num">1</span>
								<span class="lottery-wins-list-name fl wzfw">张三22222222</span>
								<span class="lottery-wins-list-moeny fl wzfw">222222222222222222</span>
							</li>
							<li class="lottery-wins-list">
								<span class="lottery-hot-bet-num">1</span>
								<span class="lottery-wins-list-name fl wzfw">张三22222222</span>
								<span class="lottery-wins-list-moeny fl wzfw">222222222222222222</span>
							</li>
							<li class="lottery-wins-list">
								<span class="lottery-hot-bet-num active">1</span>
								<span class="lottery-wins-list-name fl wzfw">张三22222222</span>
								<span class="lottery-wins-list-moeny fl wzfw">222222222222222222</span>
							</li>
							<li class="lottery-wins-list">
								<span class="lottery-hot-bet-num">1</span>
								<span class="lottery-wins-list-name fl wzfw">张三22222222</span>
								<span class="lottery-wins-list-moeny fl wzfw">222222222222222222</span>
							</li>
						</ul>
					</section>
				</section>
			</section>
		</section>
		<ul class="fw w game">
			<li class="game-list"
			    v-for="(item, index) in games.list"
			    :key="index"
			    :style="{background:'url(' + item.src + ') no-repeat'}"
			    @mouseenter="gameEnter(item)"
			    @mouseleave="gameLeave(item)"
			>
				<div class="game-list-bg" v-if="item.show"></div>
				<el-collapse-transition>
					<a href="javascript:;" class="game-list-go" v-if="item.show">开始游戏</a>
				</el-collapse-transition>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
    name: 'index',
		data () {
        return {
            banner: {
                img: [
                    {src: require('../assets/images/index/banner1.jpg'), opacity: 1},
                    {src: require('../assets/images/index/banner2.jpg'), opacity: 0},
                    {src: require('../assets/images/index/banner4.jpg'), opacity: 0},
                    {src: require('../assets/images/index/banner3.jpg'), opacity: 0},
                    {src: require('../assets/images/index/banner5.jpg'), opacity: 0},
                    {src: require('../assets/images/index/banner6.jpg'), opacity: 0}
                ],
		            timer: null,
		            num: 1
            },
		        hotLottery: {
                list: [
                    {
                        bg: require('../assets/images/index/lottery1.jpg'),
		                    name: require('../assets/images/index/lotter-name1.png'),
		                    btn: require('../assets/images/index/lottery-btn1.png'),
		                    desc: '<span>20</span> 分钟 / 期 全天共 <span>1</span> 期'
                    },
                    {
                        bg: require('../assets/images/index/lottery2.jpg'),
                        name: require('../assets/images/index/lotter-name1.png'),
                        btn: require('../assets/images/index/lottery-btn2.png'),
                        desc: '<span>20</span> 分钟 / 期 全天共 <span>1</span> 期'
                    },
                    {
                        bg: require('../assets/images/index/lottery3.jpg'),
                        name: require('../assets/images/index/lotter-name1.png'),
                        btn: require('../assets/images/index/lottery-btn3.png'),
                        desc: '<span>20</span> 分钟 / 期 全天共 <span>1</span> 期'
                    },
                    {
                        bg: require('../assets/images/index/lottery4.jpg'),
                        name: require('../assets/images/index/lotter-name1.png'),
                        btn: require('../assets/images/index/lottery-btn4.png'),
                        desc: '<span>20</span> 分钟 / 期 全天共 <span>1</span> 期'
                    }
                ],
		        },
		        bet: {
                multiple: 1
		        },
		        games: {
                list: [
                    {src: require('../assets/images/index/game1.png'), show: false},
                    {src: require('../assets/images/index/game2.png'), show: false},
                    {src: require('../assets/images/index/game3.png'), show: false},
                    {src: require('../assets/images/index/game4.png'), show: false}
                ]
		        }
        }
		},
		mounted () {
        clearInterval(this.banner.timer)
				this.setBannerTimer()
				this.Animation.ranking('lottery-wins-boxs', 'lottery-wins-lists', -1)
		},
		watch: {
        'bet.multiple' (newVal) {
            if (newVal <= 1) {
                this.bet.multiple = 1
            } else if (newVal > 1000) {
                this.bet.multiple = 1000
            }
        }
		},
		methods: {
        // 清除轮播
        cleatBannerTimer () {
            clearInterval(this.banner.timer)
        },
        // 恢复轮播
        setBannerTimer () {
            if (this.banner.img.length > 1) {
                this.banner.timer = setInterval(() => {
                    this.slide()
                }, 3000)
            }
        },
        // 轮播淡入淡出
        slide () {
            if(this.banner.num === this.banner.img.length) {
                this.banner.num = 0
            }
            for (let i = 0; i < this.banner.img.length; i++) {
                this.banner.img[i].opacity = 0
            }
            this.banner.img[this.banner.num].opacity = 1
            this.banner.num++
        },
        // 轮播按钮点击
        slideChenge (index) {
            this.banner.num = index
            this.slide()
        },
				// 四个游戏移入
        gameEnter (item) {
            item.show = true
        },
        // 四个游戏移出
        gameLeave (item) {
            item.show = false
        },
        // 热门彩种立即投注 减
        multiplesReduce () {
            if (this.bet.multiple <= 1) {
                return
            }
            this.bet.multiple--
        },
        // 热门彩种立即投注 加
        multiplesAdd () {
            if (this.bet.multiple > 1000) {
                return
            }
            this.bet.multiple++
        }
		},
		destroyed () {
        this.cleatBannerTimer()
    }
}
</script>

<style scoped>
	/*轮播*/
	.banner{
		position:relative;
		height:635px;
	}
	.banner .transition-box{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		transition: all 3s;
	}
	.bannery{
		position:absolute;
		bottom:50px;
		left:48%;
		z-index:1;
	}
	.bannery .focus {
		float:left;
		width:12px;
		height:12px;
		margin-left:6px;
		border-radius:50%;
		background:#666;
		cursor:pointer;
	}
	.bannery .focus.on{
		background:#fff;
	}
	/*center*/
	.warp{
		padding-top:18px;
	}
	.lottery-lists{
		float:left;
		width:535px;
	}
	.lottery-list{
		position:relative;
		float:left;
		width:262px;
		height:340px;
	}
	.lottery-list:nth-of-type(1){
		margin:0 8px 8px 0;
	}
	.lottery-list:nth-of-type(2){
		margin-bottom:8px;
	}
	.lottery-list:nth-of-type(3){
		margin-right:8px;
	}
	.lotter-list-name{
		position:absolute;
		top:37px;
		left:0;
		right:0;
		margin:0 auto;
		width:197px;
		transition:all .15s;
	}
	.lotter-list-desc{
		padding:200px 0 35px;
		font-weight:bold;
		color:#fff;
	}
	.lotter-list-desc span{
		position:relative;
		top:1px;
		color:#fde785 !important;
		font-size:20px;
		text-shadow:-1px 1px 0 #000;
	}
	.lotter-list-btn{
		width:206px;
		height:64px;
		color:#fff;
		line-height:53px;
		font-weight:bold;
		text-shadow:-1px 1px 0 #000;
	}
	.lottery-list:hover .lotter-list-name{
		top:34px;
	}
	.lottery-list:hover .lotter-list-btn{
		margin-top:3px;
	}
  /*公告 和 热门彩种*/
	.lottery-info{
		padding-left:6px;
		float:left;
		width:405px;
	}
	.lottery-notice .lottery-title{
		position:relative;
		height:43px;
		line-height:43px;
		background:#ff5656;
		color:#fff;
		font-size:16px;
	}
	.lottery-notice .fa-file-text{
		padding:0 7px 0 18px;
	}
	.lottery-notice-lists{
		border:1px solid #e2e2e2;
		box-sizing:border-box;
		background:#fff;
	}
	.lottery-notice-list{
		padding:12px 20px 10px 10px;
		cursor: pointer;
		border-bottom:dashed #e2e2e2 1px;
	}
	.lottery-notices .lottery-notice-list:hover{
		background:#e2e2e2;
	}
	.lottery-notice .more{
		height:42px;
		line-height:42px;
		padding-right:20px;
		text-align: right;
	}
	.lottery-title-hot:before{
		content:'';
		display:inline-block;
		vertical-align:sub;
		margin:0 1px 0 17px;
		width:22px;
		height:22px;
		background:url(../assets/images/hj.png) no-repeat -37px 0;
	}
	.lottery-hot{
		margin-top:11px;
	}
	.lottery-hot .lottery-notice-list{
		padding:15px 10px;
	}
	.lottery-hot-bets{
		margin-top:4px;
		padding:11px 5px;
		background:#f7f7f7;
	}
	.lottery-hot-bet-num{
		float:left;
		margin:0 0 4px 4px;
		width:24px;
		height:24px;
		border-radius:50%;
		line-height:24px;
		color:#fff;
		text-align:center;
		background:#c51313;
	}
	.lottery-hot-bet-num.yellow{
		background:#fb9f46;
	}
	.lottery-hot-multiples{
		padding-top:10px;
	}
	.lottery-hot-multiples-reduce,
	.lottery-hot-multiples-add{
		width:23px;
		height:23px;
		line-height:23px;
		border-radius:3px;
		background:#c51313;
		color:#fff;
	}
	.lottery-hot-multiples-input{
		margin:0 5px;
		width:65px;
		height:24px;
		border:1px solid #e2e2e2;
		box-sizing:border-box;
		text-align:center;
	}
	.lottery-hot-bets-select{
		float:left;
		margin-top:6px;
		width:125px;
		height:28px;
		border:1px solid #e2e2e2;
		box-sizing: border-box;
		text-align:center;
		line-height:28px;
	}
	.lottery-hot-bets-select .fa-refresh{
		margin-right:4px;
	}
	.lottery-hot-bets-select:nth-of-type(2) {
		margin:6px 4px 0;
	}
	.lottery-hot-bets-select:nth-of-type(3){
		color:#c51313;
		border-color:#c51313;
	}
	/*下载手机端 和 排行榜*/
	.lottery-right{
		float:left;
		width:245px;
		padding-left:8px;
	}
	.lottery-right-code{
		height:272px;
		border:1px solid #e2e2e2;
		background:#fff;
	}
	.lottery-right-code-title{
		margin:35px auto 17px;
	}
	.lottery-right-code-img{
		padding:9px;
		width:125px;
		height:125px;
		margin: 0 auto;
		border:1px solid #e2e2e2;
		border-radius:4px;
	}
	.lottery-wins{
		margin-top:11px;
		border:1px solid #e2e2e2;
		background:#fff;
	}
	.lottery-right-win-img{
		position:relative;
		top:-4px;
		width:243px;
		height:204px;
	}
	.lottery-wins-boxs{
		position:relative;
		margin-top:-15px;
		height:211px;
	}
	.lottery-wins-lists{
		position:absolute;
		top:0;
		left:0;
	}
	.lottery-wins-list{
		padding:0 8px;
		height:46px;
		line-height:46px;
		border-bottom:1px dashed #e2e2e2;
	}
	.lottery-wins-list .lottery-hot-bet-num{
		margin:12px 7px 0;
	}
	.lottery-wins-list .lottery-hot-bet-num.active{
		background:#ff5656;
	}
	.lottery-wins-list-name{
		width:70px;
		padding-right:7px;
	}
	.lottery-wins-list-moeny{
		width:112px;
	}
	/*底部游戏*/
	.transition-box {
		margin-bottom: 10px;
		width: 200px;
		height: 100px;
		background-color: #409EFF;
		text-align: center;
		color: #fff;
		padding: 40px 20px;
		box-sizing: border-box;
		margin-right: 20px;
	}
	.game-list{
		position:relative;
		float:left;
		margin-top:17px;
		width:300px;
		height:389px;
	}
	.game-list-go{
		position:absolute;
		z-index: 2;
		left:0;
		right:0;
		top:46%;
		margin:auto;
		width:60%;
		height:35px;
		line-height:35px;
		text-align:center;
		font-size:16px;
		color: #fefefe;
		border:1px solid;
	}
	.game-list-bg{
		position:absolute;
		left:0;
		top:0;
		width:100%;
		height:100%;
		background:rgba(0,0,0,.6);
		z-index: 1;
	}
</style>