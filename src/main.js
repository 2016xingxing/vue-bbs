// 引入 vue.js 的默认值
import Vue from 'vue'
// 引入 App.vue 的默认值
import App from './App'
// 引入 route.vue 的默认值
import router from './router'
//
import './directives'
//
import './components'
// 引入 store/index.js 的默认值
import store from './store'
// 引入弹窗插件
import VueSweetalert2 from './plugins/vue-sweetalert2'
// 引入消息弹窗
import Message from './plugins/message'
// 引入过滤
import './filters'
import { mockArticles } from './mock/data'
import ls from './utils/localStorage'
// 运行 ./mock/index.js
import './mock'
// 引入 axios 的默认值
import axios from 'axios'



axios.interceptors.request.use(
  config => {
    let authorization = JSON.parse(localStorage.getItem("authorization"));
    
    if (authorization) {  
      
      let Authorization= authorization.token_type + ' '+ authorization.access_token;
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      // console.log(Authorization)
      config.headers.Authorization= `${Authorization}`;
    }
   
    return config;
  },
  err => {
    return Promise.reject(err);

});
// 将 axios 添加到 Vue.prototype 上，使其在实例内部的所有组件中可用
Vue.prototype.$axios = axios

// 使用插件
Vue.use(VueSweetalert2)
// 使用插件
Vue.use(Message)

// 设置 false 以阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false


// 测试数据
const AddMockData = (() => {
  // 是否加入测试数据
  const isAddMockData = false
  // 用户数据
  let userArticles = ls.getItem('articles')

  if (Array.isArray(userArticles)) {
    userArticles = userArticles.filter(article => parseInt(article.uid) === 1)
  } else {
    userArticles = []
  }

  if (isAddMockData) {
    // 合并用户数据和测试数据，使用合并值作为所有文章
    store.commit('UPDATE_ARTICLES', [...userArticles, ...mockArticles(60)])
  } else {
    // 使用用户数据作为所有文章
    store.commit('UPDATE_ARTICLES', userArticles)
  }
})()





// eslint 配置，允许 new 一个实例后不赋值，我们没有使用 eslint，如果有，则下一行注释不可缺少
/* eslint-disable no-new */
// 创建一个新的 Vue 实例
new Vue({
  el: '#app',
  router,
  // 注入 store
  store,
  components: { App },
  template: '<App/>'
 
})