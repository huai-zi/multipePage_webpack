import Vue from 'vue'
import Vuex from 'vuex'
import index_page from './index_page'
import {
  getters
} from './common'
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    index_page,
  },
  getters
})
