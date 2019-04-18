<template>
	<section class="body">
		<section class="msg-bg" v-if="bg"></section>
		<section class="toal-msg">
			{{toal.msg}}
		</section>
	</section>
</template>

<script>
export default {
    name: 'message',
    props: ['bgs', 'toals'],
    data () {
        return {
            bg: true,
            toal: {
		            msg: '恭喜你，投注成功！！！'
            }
        }
    },
		created() {
        if (this.toals) {
            if (this.toals.width) {
                this.toal.width = this.toals.width
            }
            if (this.toals.height) {
                this.toal.height = this.toals.height
            }
            if (this.toals.msg) {
                this.toal.msg = this.toals.msg
            }
        }
        if (this.bgs) {
            this.bg = this.bgs
        }
    }
}
</script>

<style scoped>
	.body{
		position:fixed;
		left:0;
		top:0;
		width:100%;
		height:100%;
		text-align:center;
		font-size:0;
	}
	.body:before{
		content:'';
		display:inline-block;
		vertical-align:middle;
		height:100%;
		width:0;
	}
	.msg-bg{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		z-index: 99999;
		/*background:rgba(0,0,0, .5);*/
	}
	.toal-msg{
		padding:5px 15px;
		position: relative;
		z-index: 100000;
		display:inline-block;
		vertical-align: middle;
		background:rgba(0,0,0, .5);
		border-radius:5px;
		font-size:14px;
		color:#fff;
	}
</style>