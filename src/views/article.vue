<template>
  <div>
    <!-- 表单 -->
    <el-card class="box-card">
  <div slot="header" class="clearfix">
   <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <div class="text item">
    <el-form ref="form" :model="form" label-width="80px">
 <el-form-item label="状态">
    <el-radio-group v-model="form.resource">
      <el-radio label="全部"></el-radio>
      <el-radio label="草稿"></el-radio>
       <el-radio label="待审核"></el-radio>
      <el-radio label="审核通过"></el-radio>
       <el-radio label="审核失败"></el-radio>
      <el-radio label="已删除"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道">
    <el-select v-model="form.region" placeholder="请选择频道">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="日期">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
  </div>
</el-card>
<!-- 表格 -->
<el-card class="box-card mar">
  <div slot="header" class="clearfix">
    <span>根据筛选条件共查询到6666条数据</span>
  </div>
  <div  class="text item">
    <template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="封面"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态">
      </el-table-column>
       <el-table-column
        prop="address"
        label="发布时间">
      </el-table-column>
          <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" circle type="primary" icon="el-icon-edit" size="small"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle size="small"></el-button>
      </template>
    </el-table-column>
    </el-table>
  </template>

  </div>
</el-card>

    <!-- 容器 -->
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="less" scoped>
  .text {
    font-size: 14px;
  }

  // .item {
  //   margin-bottom: 18px;
  // }
  .mar {
    margin-top: 30px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    // width: 100%;
  }
</style>
