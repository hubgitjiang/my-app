import Vue from 'vue'
import Router from 'vue-router'
// 引入 userElement 组件
var UserElement = () => import('../components/userElement.vue')
var Login = () => import('../components/login/login.vue')
var Home = () => import('../components/home/home.vue')
var Users = () => import('../components/users/users.vue')
var Rights = () => import('../components/rights/rights.vue')
var Roles = () => import('../components/roles/roles.vue')
var Categories = () => import('../components/categories/categories.vue')
var Goods = () => import('../components/goods/goods.vue')
var GoodsAdd = () => import('../components/goodsadd/goodsadd.vue')
var Orders = () => import('../components/orders/orders.vue')
var Reports = () => import('../components/reports/reports.vue')
// ctrl + 移动（左,右） 移动一个单词
// ctrl + D 选中下方相同的选项
// end 跳转到当前行的末尾
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
        { path: '/categories', name: 'categories', component: Categories }, // 添加一个 home 的子路由 分类
        { path: '/goods', name: 'goods', component: Goods }, // 商品列表路由
        { path: '/goods/add', name: 'goodsadd', component: GoodsAdd },
        { path: '/orders', name: 'orders', component: Orders },
        { path: '/reports', name: 'reports', component: Reports }
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
