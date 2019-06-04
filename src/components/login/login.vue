<template>
    <div class="loginbox">
        <!-- 
                                                    el-form: 这个组件中的内容都是表单元素
                                                        model: 绑定属性
                                                        status-icon：状态图标
                                                        :rules: 添加验证规则
                                                        ref: 在 vue 中可以通过 this.$refs 来操作 dom 元素
                                                        abel-width：文本的宽度
                                                        label-positio: 设置表单元素的描述文件顶部对齐
                                                    el-form-item: 表单中的表单元素
                                                        label: 当前元素显示的文本
                                                        prop: 设置验证规则
                                                    el-input：input 元素
                                                        type：类型
                                                        v-model：双向绑定的数据
                                                        autocomplete：自动补全 （h5）
                                                 -->
        <el-form label-position="top" :rules="rules" :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <h3>用户登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="mybtn" type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 用户对象
            ruleForm: {
                username: '',
                password: ''
            },
            // 验证规则
            rules: {
                username: [
                    // 这个属性是必须的，如果没有提示 message， 当失去焦点时触发
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        login() {
            // 判断 form 中的元素是否满足验证条件
            this.$refs.ruleForm.validate(async valid => {
                // valid boole 值，如果通过返回 true， 否则返回 false
                if (valid) {
                    // 发送登录请求
                    let res = await this.$http.post('login', this.ruleForm)
                    let { data, meta } = res.data
                    // 判断登录状态
                    if (meta.status === 200) {
                        // 提示登录成功
                        this.$message({
                            message: meta.msg,
                            type: 'success'
                        });
                        // 将 登录 中的 token 保存到浏览器中的 localstorage 中
                        localStorage.setItem('token', res.data.data.token)
                        // 路由的跳转，跳转到首页
                        this.$router.push('/home')
                    } else {
                        this.$message.error(meta.msg)
                    }
                } else {
                    this.$message.error('请输入正确的用户名和密码');
                    return false
                }
            })
        }
        // login() {
        //     // 判断 form 中的元素是否满足验证条件
        //     this.$refs.ruleForm.validate((valid) => {
        //         // valid boole 值，如果通过返回 true， 否则返回 false
        //         if (valid) {
        //             // 发送登录请求
        //             this.$http.post('login', this.ruleForm)
        //                 .then(res => {
        //                     // 解构参数
        //                     console.log(res)
        //                     let { data, meta } = res.data
        //                     // 判断登录状态
        //                     if (meta.status === 200) {
        //                         // 提示登录成功
        //                         this.$message({
        //                             message: meta.msg,
        //                             type: 'success'
        //                         });
        //                         // 跳转到首页
        //                         this.$router.push('/home')
        //                         // 将 登录 中的 token 保存到浏览器中的 localstorage 中
        //                         localStorage.setItem('token', res.data.data.token)
        //                     } else {
        //                         this.$message.error(meta.msg)
        //                     }
        //                 })
        //         } else {
        //             this.$message.error('请输入正确的用户名和密码');
        //             return false
        //         }
        //     })
        // }
    }
}
</script>

<style scoped>
.loginbox {
    padding: 40px;
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
}

.loginbox .mybtn {
    width: 100%;
}
</style>
