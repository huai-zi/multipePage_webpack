<template>
  <div id="test">
    <iframe id="ifra" src="" ref='ifra' frameborder="0"></iframe>
  </div>
</template>

<script>
  export default {
    name: "test",
    data() {
      return {

      }
    },
    methods: {
      append(url) {
        this.$refs.ifra.src = url;
      }
    },
    mounted() {
      this.append('home.html');
    }
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
