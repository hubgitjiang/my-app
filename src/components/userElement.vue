<template>
    <!-- 有来使用 element -->
    <div>
        <h1>这个组件用来帮助我们使用 element-ui</h1>
        <h3>使用 element-ui 中的按钮组件</h3>
        <el-button type="primary" round>主要按钮</el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <h3>使用 element-ui 中的多选框</h3>
        <el-checkbox>备选项</el-checkbox>
        <el-checkbox>备选项</el-checkbox>
        <el-checkbox>备选项</el-checkbox>
        <h3>使用面包屑导航</h3>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
