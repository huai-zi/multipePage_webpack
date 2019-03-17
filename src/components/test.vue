<template>
  <div id="test">
    <iframe id="ifra" src="home.html" frameborder="0"></iframe>
  </div>
</template>

<script>
  export default {
    name: "test"
  }

</script>

<style lang='less' scoped>
  #test {
    width: 100%;
    height: 100%;

    #ifra {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }

</style>
