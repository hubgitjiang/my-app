<template>
  <div class="mycon">
    <el-container>
      <!-- 头部区域 -->
      <el-header>
       <TopHead />
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <!-- 内容区域 -->
        <el-main>
          <!-- 添加一个路由： -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入头部组件
import TopHead from '../layout/tophead/tophead.vue'
// 引入侧边栏组件
import Aside from '../layout/aside/aside.vue'

export default {
  // 进入一个组件执行的代码
  mounted() {
    // 判断是否存在 token
    var token = window.localStorage.getItem('token')
    // 判断
    if (!token) {
      // 说明没有登录，需要重新跳转回 login
      // this.$router.push({ name: 'login'})
      this.$router.push('/login')
    }
  },
  components: {
    TopHead,
    Aside
  }
}
</script>

<style scoped>
  .mycon {
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  .el-container {
    height: 100%;
  }

  .mymenu {
    height: 100%;
  }
</style>
