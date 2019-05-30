import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({ // 路由对象
  routes: [ // 路由选项
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
