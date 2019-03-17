import Vue from 'vue';
import Router from 'vue-router';
import test from '@/components/test';
// 页面路由
Vue.use(Router);

export default new Router({
    'routes': [{
        'path': '/333',
        'name': 'test',
        'component': test
    }]
});
