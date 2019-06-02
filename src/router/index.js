import Vue from 'vue'
import Router from 'vue-router'
// 引入 userElement 组件
import UserElement from '../components/userElement.vue'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Rights from '../components/rights/rights.vue'
import Roles from '../components/roles/roles.vue'

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
        { path: '/users', name: 'users', component: Users }, // 添加一个 home 的子路由 userss
        { path: '/rights', name: 'rights', component: Rights }, // 添加一个 home 的子路由 rights
        { path: '/roles', name: 'roles', component: Roles }, // 添加一个 home 的子路由 roles
      ]
    } // home 的路由
  ]
})
