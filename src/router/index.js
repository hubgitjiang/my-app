import Vue from 'vue'
import Router from 'vue-router'
// 引入 userElement 组件
import UserElement from '../components/userElement.vue'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // 当请求 根目录 重定向到 /home 中
    // { path: '/', redirect:  '/home'}, // 重定向
    { path: '/', redirect: { name: 'home' } },
    { path: '/userelement', component: UserElement }, // 使用 elementui 的路由
    { path: '/login', name: 'login', component: Login }, // 登录的路由
    { path: '/home', name: 'home', component: Home } // home 的路由
  ]
})
