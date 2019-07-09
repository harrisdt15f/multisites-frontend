<template>
  <div class="help-center">help-center</div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData(){
      this.Api.getUserHelp().then(({success, data}) => {
        if (success) {
          console.log(data)
        }
      })
    }
  }
}
</script>

<style>

</style>
