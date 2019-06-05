<template>
    <!-- 侧边栏 -->
    <!-- 
                          el-menu: 菜单栏的管理标签
                            default-active：默认激活的菜单
                            open: 菜单栏展开的事件
                            close：菜单栏关闭的事件
                            background-color：背景颜色
                            text-color：文本颜色
                            active-text-color：激活文件颜色
                            unique-opened: 是否是展开一会子选项
                            router: 开启 vue-router 模式，允许将 index 作为跳转的路由
                          el-submenu：菜单栏的子选项
                            index: 当前子选项的下标
                            template: 结构的模板
                              slot：设置导航的一级菜单
                          el-menu-item-group：一级菜单下二级菜单的分组
                          el-menu-item： 二级菜单
                      -->
    <el-menu :router="true" :unique-opened="true" default-active="2" class="mymenu el-menu-vertical-demo" background-color="#fff" text-color="#444">
        <!-- 子选项 -->
        <el-submenu v-for="(item1, index1) in menusList" :key="index1" :index="item1.path">
            <!-- 子选项的标题 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item1.authName }}</span>
            </template>
            <!-- 子选项中的子选项：二级选项 -->
            <el-menu-item v-for="(item2, index2) in item1.children" :key="index2" :index="'/' + item2.path">
                <i class="el-icon-menu"></i>
                <span>{{ item2.authName }}</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            menusList: []
        }
    },
    // 动态生成侧边栏
    methods: {
        async getMenusList() {
            let res = await this.$http.get('menus')
            // 解构
            let { meta, data } = res.data
            // 判断
            if (meta.status === 200) {
                this.menusList = data
                console.log(this.menusList)
            } else {
                this.$message.error(meta.msg)
            }
        }
    },
    mounted() {
        this.getMenusList()
    }
}
</script>

<style>

</style>
