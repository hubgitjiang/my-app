<template>
  <el-card>
    <!-- 页面屑导航 -->
    <MyBread :navone="'商品管理'" :navtow="'商品列表'" />
    <!-- 消息提示框 -->
    <el-alert class="myalter" title="添加商品信息" type="info" center show-icon>
    </el-alert>
    <!-- 完成步骤条 -->
    <el-steps class="mysteps" :active="active" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tabs 标签切换 -->
    <el-tabs class="mytabs" tabPosition="left" @tab-click="tabclick">
      <el-tab-pane label="基本信息" name="first">
        <!-- 基本信息 -->
        <el-form :label-position="'top'" :rules="rules" label-width="80px" :model="addObj">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addObj.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="addObj.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="addObj.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数据" prop="goods_number">
            <el-input v-model="addObj.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-input v-model="addObj.name"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">
        配置管理
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="third">
        角色管理
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">
        定时任务补偿
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="diwu">
        商品内容
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
// 引入导航组件
import MyBread from '../layout/breadnav/breadnav'
export default {
  data() {
    return {
      active: 0,
      addObj: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: ''
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 给 tab 选项卡添加事件
    tabclick(tab, event) {
      this.active = +tab.index
    }
  },
  components: {
    MyBread
  }
}
</script>

<style lang="scss">
$height: 20px;
.myalter,
.mysteps,
.mytabs {
  margin-top: $height;
}

.el-step__title {
  font-size: 12px !important;
}
</style>
