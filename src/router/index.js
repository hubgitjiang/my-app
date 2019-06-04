import Vue from 'vue'
import Router from 'vue-router'
// 引入 userElement 组件
import UserElement from '../components/userElement.vue'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Rights from '../components/rights/rights.vue'
import Roles from '../components/roles/roles.vue'
import Categories from '../components/categories/categories.vue'
// 引入 message
import { Message } from 'element-ui'

Vue.use(Router)

var router = new Router({
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
        { path: '/categories', name: 'categories', component: Categories }
      ]
    } // home 的路由
  ]
})

// 添加一个路由守卫
router.beforeEach((to, from, next) => {
  // 完成登录逻辑
  // 只要请求的路由不是 login 就需要进行登录验证
  if (to.path != '/login') {
    // 判断是否存在  token
    if (!window.localStorage.getItem('token')) {
      console.log(window.localStorage.getItem('token'))
      Message({
        type: 'error',
        message: '您还没有登录'
      })
      router.push('/login')
      return
    } 
  }
  next()
})

export default router
