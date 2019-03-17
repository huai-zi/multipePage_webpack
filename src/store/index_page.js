export default {
  state: {
    fullLoading: false
  },
  mutations: {
    loading(state, val) {
      // 登陆数据
      state.fullLoading = val;
    }
  },
  actions: {
    loading(state, val) {
      state.fullLoading = val;
      console.log(state)
    }
  }
}
