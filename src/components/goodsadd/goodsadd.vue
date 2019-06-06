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
            {{ cateSelect }}
            <el-cascader v-model="cateSelect" :options="catesList" :props="cateObj"></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">
        <div class="mydiv" v-for="(item, index1) in manyparams" :key="index1">
          <h4>{{ item.attr_name }}</h4>
          <div class="myitem">
            <el-checkbox v-model="check" border v-for="(val, index2) in item.attr_vals.split(',')" :key="index2">{{ val }}</el-checkbox>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="third">
        <div class="mydiv" v-for="(item, index) in onlyparams" :key="index">
          <h4>{{ item.attr_name }}</h4>
          <el-input v-model="item.attr_vals" placeholder="请输入内容"></el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">
        <!-- 图片上传框 -->
        <!-- file-list：上传文件列表集合 -->
        <el-upload class="upload-demo" :headers="uploadHead" action="http://localhost:8888/api/private/v1/upload" :file-list="fileList" list-type="picture" :on-success="uploadsuccess" :on-remove="remove" :on-preview="preview">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        {{ fileList }}
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="diwu">
        <el-button @click="addGoods">添加商品</el-button>
        <quill-editor v-model="content"></quill-editor>
      </el-tab-pane>
    </el-tabs>
    <!-- 点击图片预览时的对话框 -->
    <el-dialog title="图片预览" :visible.sync="dialogImg">
      <img ref="myimg">
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogImg = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// 引入导航组件
import MyBread from '../layout/breadnav/breadnav'
export default {
  data() {
    return {
      active: 0, // 步骤条的标识
      addObj: { // 添加对象的属性
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: ''
      },
      rules: {  // 验证规则
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
      },
      catesList: [], // 分类框中的数据源
      cateObj: { // 控制级联框显示的文本
        value: 'cat_id', // 当前选项对应的值
        label: 'cat_name', // 显示的文本
        expandTrigger: 'hover' // 触发下一层选项的方式
      },
      cateSelect: [], // 当前级联框选中的数据
      onlyparams: [], // 静态参数（商品属性）
      manyparams: [], // 动态参数（商品参数）
      check: true,
      fileList: [], // 文件上传列表的集合
      uploadHead: {
        Authorization: localStorage.getItem('token')
      }, // 上传的请求头
      dialogImg: false, // 图片对话框的控制条
      content: '我是富文本中的默认值'
    }
  },
  methods: {
    // 给 tab 选项卡添加事件
    tabclick(tab, event) {
      this.active = +tab.index
      // 判断是否点击了商品参数&商品分类
      if (tab.index === '1' || tab.index === '2') {
        // 判断分类中是否选择了数据：只需要判断它的数组长度
        if (this.cateSelect.length == 0) {
          this.$message.error('请选择器商品分类')
          return
        }
        // 获取分类的参数
        this.getCateParams(tab.index)
      }
    },
    // 得到所有的分类数据
    async getCateList() {
      let res = await this.$http.get(`categories?type=3`)
      // 解构
      let { meta, data } = res.data
      // 判断
      if (meta.status === 200) {
        this.catesList = data
        console.log(this.catesList)
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 封装一个方法用来获取分类的参数
    async getCateParams(index) {
      // 得到分类的 id
      let id = this.cateSelect[this.cateSelect.length - 1]
      // 设置一个参数用来判断当前点击的是商品参数还是商品属性：
      let sel = index === '1' ? 'many' : 'only'
      // 根据选中的参数分类去加载商品参数
      var res = await this.$http.get(`categories/${id}/attributes?sel=${sel}`)
      // 解构
      let { meta, data } = res.data
      // 判断
      if (meta.status === 200) {
        if (index === '1') {
          // 给商品参数赋值
          this.manyparams = data
        } else {
          this.onlyparams = data
        }
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 图片上传成功进执行的函数
    uploadsuccess(res, file, fileList) {
      // 将上传成功的图片保存到 fileList 中
      // res: 服务器响应回来的数据
      //  tmp_path: 生成的图片的名称
      //  url: 上传后图片所在的服务器的路径
      // file: 本次上传文件信息（包含了 res）
      // fileList: 上传的所有文件信息（包信了 file）
      this.fileList.push({
        name: res.data.tmp_path,
        url: res.data.url
      })
    },
    // 删除图片时触发
    remove(file, fileList) {
      // 通过 file 中的属性去删除 fileList中的数据
      for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].name === file.name) {
          this.fileList.splice(i, 1)
        }
      }
    },
    // 图片预览的方法
    preview(file) {
      this.dialogImg = true
      // 是通过 demo 去操作 vue 的页面（页面不会有响应式的效果）
      // 解决方法：1）将 src 中的图片数据放到 data 中
      //          2）等页面重新渲染时我们才执行这个 dome 操作
      this.$nextTick(function() {
        this.$refs.myimg.src = file.url
      })
    },
    // 提交新增的数据
    async addGoods() {
      // 准备要提交的数据
      let addObj = {
        goods_name: this.addObj.goods_name, // 商品名称
        goods_cat: this.cateSelect.join(','),// 商品分类（一级,二级,三级）
        goods_price: this.addObj.goods_price, // 商品价格
        goods_number: this.addObj.goods_number, // 商品数量
        goods_weight: this.addObj.goods_weight, // 商品重量
        goods_introduce: this.content // 商品介绍
      }
      // 发送请求到服务器
      let res = await this.$http.post('goods', addObj)
      // 解构
      let { meta } = res.data
      // 判断
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: meta.msg
        })
        // 成功后应该跳转回商品列表
        this.$router.push({ name: 'goods' })
      } else {
        this.$message.error(meta.msg)
      }
    }
  },
  mounted() {
    this.getCateList()
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

.mydiv {
  h4 {
    font-weight: 400;
    font-size: 14px;
  }
}

.ql-editor {
  height: 300px;
}
</style>
