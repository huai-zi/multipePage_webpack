import axios from 'axios';
import {
  store
} from '@/store/store'
import {
  Message
} from 'element-ui';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 添加headers到post请求中
  config.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  let userInfo = null;
  if (userInfo != null) {
    config.headers['sid'] = JSON.parse(userInfo).sid;
    config.headers['userNo'] = JSON.parse(userInfo).userNo;
  }
  console.log('store');
  store.commit('loading', true);
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  store.commit('loading', false);
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  store.commit('loading', false);

  const status = Number(res.status) || 200;
  if (status !== 200 || res.data.code === 1) {
    Message({
      'message': message,
      'type': 'error'
    });
  }

  return response;
}, function (error) {
  // 对响应错误做点什么
  store.commit('loading', false);
  return Promise.reject(error);
});


export const http = {
  get(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  delete(url, params) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(function (data) {
        resolve(data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then(function (data) {
        resolve(data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
