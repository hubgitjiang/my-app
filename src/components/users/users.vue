<template>
    <!-- 添加一个根组件 -->
    <el-card>
        <!-- 添加一个面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加一个搜索框 -->
        <el-row class="myrow">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="16">
                &nbsp;
                <el-button type="success" plain @click="showAdd">添加用户</el-button>
            </el-col>
        </el-row>
        <!-- 添加一个表格 -->
        <el-table :border="true" :data="tableData" style="width: 100%">
            <!-- 
                                                el-table 会自动遍历数据源：  
                                                    border: 设置边框
                                                el-table-column：表格的列
                                                    prop: 当前列表显示的字段
                                                    label：当前列的表头
                                                    width: 当前列的宽度
                                                    注意点：
                                                        1)列中无法显示 bool 值
                                                        2)如果要在列中显示自己的内容，应该添加 template
                                                        3)slot-scope="scope"中的 scope.row 就是当前行对应的数据源
                                                -->
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <!-- {{ scope.row }} -->
                    <el-switch v-model="scope.row.mg_state" active-color="#0f0" inactive-color="#f00">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- 两个按钮 -->
                    <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                    <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 新增的对话框 -->
        <!-- 
                                            el-dialog: 对话框
                                            visible.sync：控制当前对话框的显示和隐藏
                                         -->
        <el-dialog title="添加用户" :visible.sync="addDialog">
            <el-form :rules="rules" ref="addForm" :model="formObj">
                <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="formObj.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="formObj.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="formObj.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="formObj.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="postAdd">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            tableData: [],
            pagenum: 1, // 当前页
            pagesize: 20, // 页容量
            formObj: { // 表单元素中的数据
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            addDialog: false, // 控制对话框的显示和隐藏
            formLabelWidth: '100px', // 文本的宽度
            rules: { // 添加验证规则
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 获取所有的用户数据
        getUserList() {
            // 得到 token
            let token = window.localStorage.getItem('token')
            // 发送请求时需要在请求头中添加 token
            this.$http.get('users', {
                headers: {
                    // 添加 token
                    Authorization: token
                },
                params: {
                    pagenum: this.pagenum,
                    pagesize: this.pagesize
                }
            }).then(res => {
                // 接收参数
                let { data, meta } = res.data
                if (meta.status === 200) {
                    // 将数据保存到
                    this.tableData = data.users
                }
            })
        },
        // 显示新增对话框
        showAdd() {
            this.addDialog = true
        },
        // 提交新增数据
        postAdd() {
            let token = window.localStorage.getItem('token')
            // 1.0 验证数据是否合法
            this.$refs.addForm.validate(vali => {
                if (vali) {
                    // 2.0 将数据提交到服务器
                    this.$http.post('users', this.formObj, {
                        // token
                        headers: {
                            Authorization: token
                        }
                    }).then(res => {
                        // 3.0 接收结果，重新渲染
                        let { meta } = res.data
                        if (meta.status === 201) {
                            this.$message({
                                type: 'success',
                                message: meta.msg
                            })
                            this.getUserList()
                            // 关闭面板
                            this.addDialog = false
                            // 清空数据
                            this.formObj.username = ''
                            this.formObj.password = ''
                            this.formObj.email = ''
                            this.formObj.mobile = ''
                        } else {
                            this.$message.error(meta.msg)
                        }
                    })
                } else {
                    this.$message.error('参数不合法')
                }
            })
        }
    },
    mounted() {
        // 获取 users 中的数据
        this.getUserList()
    }
}
</script>

<style scoped>
.myrow {
    margin-top: 20px;
}
</style>
