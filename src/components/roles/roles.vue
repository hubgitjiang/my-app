<template>
    <el-card>
        <!-- 面包屑导航 -->
        <BreadNav :navone="'权限管理'" :navtow="'角色列表'" />
        <!-- 添加角色 -->
        <el-row class="myrow">
            <el-col :span="8">
                <el-button plain>添加角色</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="rolesList" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <!-- 外层行 -->
                    <el-row v-for="(item1, index1) in scope.row.children" :key="index1">
                        <!-- 一级权限 -->
                        <el-col :span="4">
                            <el-tag @close="myclose(scope.row.id, item1.id, scope)" :disable-transitions="false" closable>{{ item1.authName }}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="(item2, index2) in item1.children" :key="index2">
                                <!-- 二级权限 -->
                                <el-col :span="5">
                                    <el-tag @close="myclose(scope.row.id, item2.id, scope)" :disable-transitions="false" closable type="success">{{ item2.authName }}</el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <!-- 三级权限 -->
                                <el-col :span="19">
                                    <el-tag @close="myclose(scope.row.id, item3.id, scope)" :disable-transitions="false" class="mytag3" type="warning" closable v-for="(item3, index3) in item2.children" :key="index3">{{ item3.authName }}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="180">
            </el-table-column>
            <el-table-column prop="roleDesc" label="角色描述" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                    <el-button type="success" @click="openroleDialog(scope)" icon="el-icon-check" plain size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 设置权限的对话框 -->
        <el-dialog title="权限分配" :visible.sync="roleDialog">
            <!-- 
                                    props: 用来指定数据源中显示的文本属性&子选项的属性
                                    show-checkbox: 显示多选框
                                    data: 绑定数据源
                                    default-expand-all: 展开所有项
                                    default-checked-keys：设置默认选中
                                    node-key：设置当前节点的唯一标识
                                -->
            <el-tree :data="rightsList" :props="props" ref="tree" node-key="id" :default-checked-keys="defaultcheck" show-checkbox default-expand-all>
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roleDialog = false">取 消</el-button>
                <el-button type="primary" @click="setRight">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
// 引入面包屑导航组件
import BreadNav from '../layout/breadnav/breadnav.vue'

export default {
    data() {
        return {
            rolesList: [], // 角色数据源
            roleDialog: false, // 分配角色对话框
            props: {
                label: 'authName',
                children: 'children'
            },
            rightsList: [], // 所有的权限数据
            defaultcheck: [], // 默认选中的数组
            rid: '' // 保存分配权限的角色 id
        }
    },
    methods: {
        // 获取所有角色数据
        async getRolesList() {
            let res = await this.$http.get('roles')
            // 解构
            let { meta, data } = res.data
            // 判断
            if (meta.status === 200) {
                this.rolesList = data
            } else {
                this.$message.error(meta.msg)
            }
        },
        // 删除角色权限
        //  roleId 要删除权限的角色 id
        //  rightId 要删除的权限 id
        //  scope 当前行的数据源
        async myclose(roleId, rightId, scope) {
            // 发送请求到服务器去删除角色对应的权限
            let res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
            // 解构
            let { meta, data } = res.data
            // 判断
            if (meta.status === 200) {
                // 更新权限（更新当前行的数据源）
                scope.row.children = data
            } else {
                this.$message.error(meta.msg)
            }
        },
        // 打开权限对话框
        //  scope: 当前行对应的数据源
        async openroleDialog(scope) {
            // 打开对话框时，要将角色 id 保存起来
            this.rid = scope.row.id
            // 每次打开分配权限对话框都要清空默认选中
            this.defaultcheck = []
            this.roleDialog = true
            // 以树形结构来获取权限数据
            let res = await this.$http.get('rights/tree')
            // 解构
            let { meta, data } = res.data
            // 判断
            if (meta.status === 200) {
                this.rightsList = data
                // 设置默认选中的权限
                // 得到所有的三级权限
                // 第一级权限
                scope.row.children.forEach(item1 => {
                    // 第二级权限 
                    item1.children.forEach(item2 => {
                        // 第三级权限
                        item2.children.forEach(item3 => {
                            // 得到所有三级权限的 id
                            this.defaultcheck.push(item3.id)
                        })
                    })
                })
                console.log(this.defaultcheck)
            } else {
                this.$message.error(meta.msg)
            }
        },
        // 设置权限
        async setRight() {
            // 获取当前树形结构中已经被选中的一级权限&二级权限&三级权限
            // getCheckedKeys: 得到全选节点的 key
            let allcheck = this.$refs.tree.getCheckedKeys()
            let half = this.$refs.tree.getHalfCheckedKeys()
            // 合并
            let arr = [...allcheck, ...half]
            // 转为字符串
            let rids = arr.join(',')
            console.log(rids)
            // 发送请求到服务器
            let res = await this.$http.post(`roles/${this.rid}/rights`, {
                rids: rids
            })
            // 解析
            let { meta } = res.data
            if (meta.status === 200) {
                this.$message({
                    type: 'success',
                    message: meta.msg
                })
                // 重新获取数据
                this.getRolesList()
            } else {
                this.$message.error(meta.msg)
            }
            // 关闭角色授权面板
            this.roleDialog = false
        }
    },
    mounted() {
        this.getRolesList()
    },
    components: {
        BreadNav
    }
}
</script>

<style scoped>
.myrow {
    margin-top: 20px;
}

.mytag3 {
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>
