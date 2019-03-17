<template>
  <div id="app" :element-loading-text="loadingTitle" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)" v-loading.fullscreen.lock="loading">
    <router-view></router-view>
  </div>
</template>
<script>
  import config from '@/util/config';
  export default {
    name: "App",
    data() {
      return {
        fullscreenLoading: true,
        loadingTitle: config.loadingTitle
      }
    },
    mounted() {},
    computed: {
      loading() {
        return this.$store.state.index_page.fullLoading
      }
    }
  };

</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100%;
    min-width: 1100px;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  }

</style>
