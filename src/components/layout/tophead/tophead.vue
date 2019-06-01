<template>
    <!-- 分为三个部分 -->
    <el-row>
        <el-col class="mycol" :span="4">
            <div class="grid-content bg-purple">
                <img src="../../../../static/logo.png" alt="">
            </div>
        </el-col>
        <el-col class="mycol" :span="16">
            <div class="grid-content bg-purple-light">
                <h1>电商后台管理系统</h1>
            </div>
        </el-col>
        <el-col class="mycol logout" :span="4">
            <div class="grid-content bg-purple">
                <a href="#">退出</a>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {

}
</script>

<style scoped>
.mycol {
  height: 60px;
}

.logout {
  text-align: right;
}
.logout a {
  text-decoration: none;
  color: green;
}
</style>
