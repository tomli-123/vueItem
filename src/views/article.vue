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
    <el-radio-group v-model="form.status">
      <el-radio :label="null">全部</el-radio>
      <el-radio :label="0">草稿</el-radio>
       <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">审核通过</el-radio>
       <el-radio :label="3">审核失败</el-radio>
      <el-radio :label="4">已删除</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道">
    <el-select clearable v-model="form.channel_id" placeholder="请选择频道">
      <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="日期">
      <div class="block">
        <el-date-picker
        format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
     </div>
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
    <span>根据筛选条件共查询到{{total_count}}条数据 现在是第{{formCopy.page}}页</span>
  </div>
  <div  class="text item">
    <template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="cover"
        label="封面"
        >
    <template slot-scope="scope">
<div>
            <el-image
            style="width: 150px; height: 100px"
            :src="scope.row.cover.images[0]"
            fit="cover">
           <div slot="error" class="image-slot">
        <img  style="width: 150px; height: 100px" src="../assets/error.gif" alt="">
      </div>
            </el-image>
            </div>
     </template>

      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <div>
            <p v-if="scope.row.status === 0">草稿</p>
            <p v-if="scope.row.status === 1">待审核</p>
            <p v-if="scope.row.status === 2">审核通过</p>
            <p v-if="scope.row.status === 3">审核失败</p>
            <p v-if="scope.row.status === 4">已删除</p>
            </div>
        </template>
      </el-table-column>
       <el-table-column
        prop="pubdate"
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
 <div class="pag">
    <el-pagination
    :current-page="formCopy.page"
    @current-change="changePage"
  background
  :page-size="formCopy.per_page"
  layout="prev, pager, next"
  :total="total_count">
</el-pagination>
 </div>
</el-card>

    <!-- 容器 -->
  </div>
</template>

<script>
import { getActicleList, getArticleChannels } from '@/api/http.js'
export default {
  name: 'Article',
  data () {
    return {
      form: {
        channel_id: null,
        date: null,
        status: null,
        page: 1,
        per_page: 10
      },
      tableData: [],
      total_count: 0,
      channels: [],
      formCopy: {
        channel_id: null,
        date: null,
        status: null,
        page: 1,
        per_page: 10,
        total_count: 0
      }
    }
  },
  methods: {
    onSubmit () {
      this.formCopy.page = 1
      this.formCopy = { ...this.form }
      this.localGetArticle()
    },
    async changePage (index) {
      this.formCopy.page = index
      // this.localGetArticle()
      const [begin_pubdate, end_pubdate] = this.formCopy.date || []
      try {
        const res = await getActicleList({
          end_pubdate: end_pubdate,
          begin_pubdate: begin_pubdate,
          status: this.formCopy.status,
          channel_id: this.formCopy.channel_id || null,
          page: this.formCopy.page,
          per_page: this.formCopy.per_page
        })

        this.tableData = res.data.data.results
        this.formCopy.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    async  localGetArticle () {
      const [begin_pubdate, end_pubdate] = this.form.date || []
      try {
        const res = await getActicleList({
          end_pubdate: end_pubdate,
          begin_pubdate: begin_pubdate,
          status: this.form.status,
          channel_id: this.form.channel_id || null,
          page: this.form.page,
          per_page: this.form.per_page
        })

        this.tableData = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    }

  },
  async created () {
    this.localGetArticle()
    try {
      const res = await getArticleChannels()
      this.channels = res.data.data.channels
    } catch (err) {
      console.log(err)
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
  .pag{
    margin-top: 30px;
  }
</style>
