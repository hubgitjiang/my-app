// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入 element-ui
import ElementUI from 'element-ui'
// 引入 element ui 的样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
// 引入 element-tree-grid
import TreeGrid from 'element-tree-grid'
// 引入 axios 
import myaxios from './assets/js/myaxios.js'
import mymoment from './assets/js/mymoment.js'
// 调用方法 use
Vue.use(myaxios)
Vue.use(mymoment)

// 定义一个全局组件 tree-grid
Vue.component(TreeGrid.name, TreeGrid)


// 引入全局样式
import './assets/css/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

var a = true
if (a === true) {
  console.log(123)
}

// 这是注释
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>' // 将 App 渲染到视图容器中
})
