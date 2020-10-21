<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <MyBread>素材管理</MyBread>
  </div>
  <div class="text item">
   <div class="mar">
    <el-radio-group @change="cli" v-model="formData.collect">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
    </el-radio-group>
  </div>
  <el-row :gutter="10">
  <el-col v-for="item in picList" :key="item.id" :xs="12" :sm="8" :md="6" :lg="4" :xl="3"><div class="grid-content bg-purple">
      <div class="demo-image">
  <div class="block">
            <el-image
            style="width: 100%; height: 100px"
            :src="item.url"
            fit="cover">
             <div slot="placeholder" class="image-slot">
                 <img  style="width: 100%; height: 100px"  src="../assets/error.gif" alt="">
            </div>
            </el-image>
        </div>
  </div>
      </div></el-col>-
      <el-pagination
      @current-change="changePage"
  background
  :page-size='formData.per_page'
  layout="prev, pager, next"
  :total="total_count">
</el-pagination>
</el-row>
  </div>
</el-card>
</template>

<script>
import { getUserPictures } from '@/api/pictures.js'
export default {
  data () {
    return {
      radio1: '',
      formData: {
        collect: false,
        page: 1,
        per_page: 12
      },
      picList: [],
      total_count: 0
    }
  },
  created () {
    this.loadgetUserPictures()
  },
  methods: {
    async loadgetUserPictures () {
      try {
        const res = await getUserPictures({
          collect: this.formData.collect,
          page: this.formData.page,
          per_page: this.formData.per_page
        })
        this.picList = res.data.data.results
        this.total_count = res.data.data.total_count
        console.log(res.data.data.total_count)
      } catch (err) {
        console.log(new Error(err))
      }
    },
    changePage (index) {
      this.formData.page = index
      this.loadgetUserPictures()
    },
    cli () {
      this.formData.page = 1
      this.loadgetUserPictures()
    }
  }

}
</script>

<style lang='less' scoped>
// .block{
// margin-top:30px
// }
.mar {
    margin-bottom: 20px;
}
</style>
