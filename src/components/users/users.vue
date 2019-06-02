<template>
    <!-- 添加一个根组件 -->
    <el-card>
        <!-- 添加一个面包屑导航 -->
        <BreadNav :navone="'用户管理'" :navtow="'用户列表'" />
        <!-- 添加一个搜索框 -->
        <el-row class="myrow">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
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
                    <el-switch @change="chageStu(scope.row.id, scope.row.mg_state)" v-model="scope.row.mg_state" active-color="#0f0" inactive-color="#f00">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- slot-scope: 可以用来获取当前行的数据 -->
                    <!-- 两个按钮 -->
                    <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="getEdit(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="mydelete(scope.row.id)"></el-button>
                    <el-button type="success" icon="el-icon-check" plain size="mini" @click="check(scope.row.id)"></el-button>
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
        <!-- 修改的对话框 -->
        <el-dialog title="修改用户" :visible.sync="editDialog">
            <el-form :rules="rules" ref="addForm" :model="formObj">
                <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
                    <el-input :disabled="true" v-model="formObj.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="formObj.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="formObj.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="postEdit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 分配角色的对话框 -->
        <el-dialog title="分配角色" :visible.sync="checkDialog">
            <el-form ref="addForm" :model="formObj">
                <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
                    {{ formObj.username }}
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    {{ formObj.rid }}
                    <el-select v-model="formObj.rid" placeholder="请选择">
                        <!-- lable: 设置 Option 之间的文本 value: 设置 option 的 value 属性 -->
                        <el-option :value="-1" label="请选择"></el-option>
                        <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="checkDialog = false">取 消</el-button>
                <el-button type="primary" @click="postCheck">确 定</el-button>
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
            search: '', // 搜索框中的数据
            tableData: [],
            pagenum: 1, // 当前页
            pagesize: 20, // 页容量
            formObj: { // 表单元素中的数据(新增，修改，分配角色)
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            addDialog: false, // 控制新增对话框的显示和隐藏
            editDialog: false, // 控制修改对话框的显示和隐藏
            checkDialog: false, // 控制角色分配对话框的显示和隐藏
            formLabelWidth: '100px', // 文本的宽度
            rules: { // 添加验证规则
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            options: [], // 下拉框中的数据源
        }
    },
    methods: {
        // 获取所有的用户数据
        getUserList() {
            // 得到 token
            let token = window.localStorage.getItem('token')
            // 发送请求时需要在请求头中添加 token
            this.$http.get('users', {
                // headers: {
                //     // 添加 token
                //     Authorization: token
                // },
                params: {
                    pagenum: this.pagenum,
                    pagesize: this.pagesize,
                    query: this.search
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
                    this.$http.post('users', {
                        username: this.formObj.username,
                        password: this.formObj.password,
                        email: this.formObj.email,
                        mobile: this.formObj.mobile
                    }, {
                            // // token
                            // headers: {
                            //     Authorization: token
                            // }
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
        },
        // 搜索数据
        searchData() {
            this.getUserList()
        },
        // 打开修改面板&得到要修改的数据
        getEdit(id) {
            this.editDialog = true
            // 根据 id 去获取数据
            this.$http.get(`users/${id}`, {
                // headers: {
                //     Authorization: localStorage.getItem('token')
                // }
            }).then(res => {
                // 解构赋值
                let { meta, data } = res.data
                // 判断
                if (meta.status === 200) {
                    this.formObj = data
                }
            })
        },
        // 提交修改的数据
        postEdit() {
            // 提交数据
            this.$http.put(`users/${this.formObj.id}`, {
                email: this.formObj.email,
                mobile: this.formObj.mobile
            }, {
                    // headers: {
                    //     Authorization: localStorage.getItem('token')
                    // }
                }).then(res => {
                    let { meta } = res.data
                    if (meta.status === 200) {
                        this.editDialog = false
                        // 提示修改成功
                        this.$message({
                            type: 'success',
                            message: meta.msg
                        })
                        // 更新数据
                        this.getUserList()
                    } else {
                        this.editDialog = false
                        this.$message.error(meta.msg)
                    }
                })
        },
        // 删除数据
        mydelete(id) {
            this.$confirm('是否删除数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`users/${id}`, {
                    // headers: {
                    //     Authorization: localStorage.getItem('token')
                    // }
                }).then(res => {
                    let { meta } = res.data
                    if (meta.status === 200) {
                        this.$message({
                            type: 'success',
                            message: meta.msg
                        })
                        // 更新数据
                        this.getUserList()
                    } else {
                        this.$message.error(meta.msg)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        // 改变用户状态
        chageStu(id, state) {
            this.$http.put(`users/${id}/state/${state}`, {}, {
                // headers: {
                //     Authorization: localStorage.getItem('token')
                // }
            }).then(res => {
                let { meta } = res.data
                if (meta.status == 200) {
                    this.$message({
                        type: 'success',
                        message: meta.msg
                    })
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 得到下拉框中的数据
        getOpetions() {
            this.$http.get('roles', {
                // headers: {
                //     Authorization: localStorage.getItem('token')
                // }
            }).then(res => {
                this.options = res.data.data
            })
        },
        // 分配角色
        check(id) {
            // 打开分配角色面板
            this.checkDialog = true
            // 根据 id 获取用户信息
            this.$http.get(`users/${id}`, {
                // headers: {
                //     Authorization: localStorage.getItem('token')
                // }
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status == 200) {
                    this.formObj = data
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 提交分配角色
        postCheck() {
            // 获取参数
            this.$http.put(`users/${this.formObj.id}/role`, {
                rid: this.formObj.rid
            }, {
                    // headers: {
                    //     Authorization: localStorage.getItem('token')
                    // }
                }).then(res => {
                    let { meta } = res.data
                    if (meta.status === 200) {
                        this.$message({
                            type: 'success',
                            message: meta.msg
                        })
                        // 重新渲染
                        this.getUserList()
                    } else {
                        this.$message.error(meta.msg)
                    }
                    this.checkDialog = false
                })
        }
    },
    mounted() {
        // 获取 users 中的数据
        this.getUserList()
        // 获取下拉框中的数据
        this.getOpetions()
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
</style>
