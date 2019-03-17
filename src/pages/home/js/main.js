/**
 * 2019年3月15日14:33:13
 * @version 1.0.0
 * 嵌入的home页面
 */
import Vue from 'vue';
import tables from '@/pages/home/index.vue';
import router from './index';

import '../../../assets/css/base.css'
import '../../../assets/css/common.less'
import '../../../assets/iconfont/iconfont.css'
//按需引入数据
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/theme-chalk/index.css';

Vue.use(Avue);
Vue.use(ElementUI);

import {
  http
} from '@/api';
// 数据请求全局化
Vue.prototype.$http = http;

Vue.config.productionTip = false;
new Vue({
  'el': '#newPages',
  router,
  'render': h => h(tables)
});
