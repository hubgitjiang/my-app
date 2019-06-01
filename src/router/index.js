import Vue from 'vue'
import Router from 'vue-router'
// 引入 userElement 组件
import UserElement from '../components/userElement.vue'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // 当请求 根目录 重定向到 /home 中
    // { path: '/', redirect:  '/home'}, // 重定向
    { path: '/', redirect: { name: 'home' } },
    { path: '/userelement', component: UserElement }, // 使用 elementui 的路由
    { path: '/login', name: 'login', component: Login }, // 登录的路由
    // 给 home 添加子路由
    {
      path: '/home', name: 'home', component: Home,
      children: [
        { path: '/users', name: 'users', component: Users } // 添加一个 home 的子路由 userss
      ]
    } // home 的路由
  ]
})
