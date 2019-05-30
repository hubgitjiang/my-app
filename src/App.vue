<template>
  <div id="app">
    <!-- 内容渲染的容器 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
