<template>
    <!-- 添加一个根元素 -->
    <el-card>
        <!-- 面包屑导航 -->
        <BreadNav :navone="'权限管理'" :navtow="'权限列表'" />
        <!-- 表格 -->
        <el-table :data="rightsList" style="width: 100%" :border="true">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="authName" label="权限名称" width="180">
            </el-table-column>
            <el-table-column prop="path" label="路径" width="180">
            </el-table-column>
            <el-table-column label="层次">
                <template slot-scope="scope">
                    {{ scope.row.level === '0' ? '一级': (scope.row.level === '1' ? '二级': '三级') }}
                    <!-- <span v-if="scope.row.level == '0'">一级</span>
                        <span v-else-if="scope.row.level == '1'">二级</span>
                        <span v-else>三级</span> -->
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
// 引入面包屑导航组件
import BreadNav from '../layout/breadnav/breadnav.vue'
export default {
    data() {
        return {
            rightsList: []
        }
    },
    methods: {
        // 得到所有的权限数据
        async getAllRight() {
            let res = await this.$http.get(`rights/list`)
            // 解构
            let { meta, data } = res.data
            // 判断
            if (meta.status === 200) {
                this.rightsList = data
            } else {
                this.$message.error(meta.msg)
            }
        }
    },
    mounted() {
        this.getAllRight()
    },
    components: {
        BreadNav
    }
}
</script>

<style>

</style>
