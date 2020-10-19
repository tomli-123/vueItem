<template>
<div class="con">
  <el-container>
    <el-aside :width="!isCollapse ? '200px' : '80px'">
    <el-row class="tac">
    <el-col :span="24">

    <el-menu
    :router="true"
    :collapse-transition="false"
     :collapse="isCollapse"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b">

      <el-menu-item index="1" >
        <img v-show="!isCollapse" src="../assets/logo_admin.png" alt="">
        <img  v-show="isCollapse" src="../assets/logo_admin_01.png" alt="">

      </el-menu-item>
      <el-menu-item index="/home" >
        <i class="el-icon-document"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-menu"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="3" >
        <i class="el-icon-document"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
          <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
          <el-menu-item index="/fans">
        <i class="el-icon-setting"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
          <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>

    </el-aside>
   <el-container>
      <el-header>
        <div class="title" @click="isCollapse = !isCollapse">
        <i :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
        江苏传智播客科技教育有限公司
        </div>
        <div class="titleRight">
        <img :src="userInfo.photo" alt="">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="quit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
        </el-header>
      <el-main>
        <router-view></router-view>
        </el-main>
   </el-container>
</el-container>
</div>
</template>

<script>
import { getUserInitInfo } from '@/api/http.js'
import { removeItem } from '@/utlis/localStorage.js'
export default {
  name: 'Home',
  data () {
    return {
      isCollapse: true,
      userInfo: {
        name: '',
        photo: ''
      }

    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    quit () {
      removeItem()
      this.$router.push('/login')
    }
  },
  created () {
    getUserInitInfo().then(res => {
      this.userInfo = res.data.data
    })
  }

}
</script>

<style lang="less" scoped>
.el-menu{
  border-right: 0;
}
.con {
  // position: fixed;
  position: relative;
  width: 100%;
  // height: 100%;
}
  .el-header {
    // background-color: #B3C0D1;
    color: #002033;
    // text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #002033;
    color: #002033;
    //text-align: center;
    // line-height: 200px;
    min-height:100vh;

  }
  .el-header{
     position: relative;
     .title {
       position:absolute;
       left: 10px;
    }
    .titleRight {
      position:absolute;
       right: 10px;
       img{
         width: 35px;
         height: 35px;
         border-radius:50%;
         vertical-align:middle;
         margin-right: 5px;
       }
    }

  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    // text-align: center;

  }

</style>
