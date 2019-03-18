export default {
  state: {
    fullLoading: false,
    notice: 3
  },
  mutations: {
    loading(state, val) {
      // 登陆数据
      state.fullLoading = val;
    },
    noticeLook(state, val) {
      // 通知数量
      state.notice = val;
    }
  },
  actions: {
    loading(state, val) {
      state.fullLoading = val;
      console.log(state)
    }
  }
}
