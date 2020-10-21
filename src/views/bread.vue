<template name="bread">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><slot></slot></el-breadcrumb-item>
</el-breadcrumb>
</template>
