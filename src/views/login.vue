<template>
<div class="contain">
    <div class="box">

        <el-form ref="form1" :model="form" :rules="rules" >
            <el-form-item class="title">
            <img src="../assets/logo_index.png" alt="">
            </el-form-item>
        <el-form-item prop="mobile">
            <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item  >

            <el-checkbox v-model="form.agree" @click=" form.agree = !form.agree "  label="霸王条款您已阅读完毕，请同意！" name="type"></el-checkbox>

            </el-form-item>
        <el-form-item>
            <el-button style="width:100%;margin-bottom:15px;" type="primary" @click.prevent="onSubmit('form1')">立即创建</el-button>

        </el-form-item>
        </el-form>
    </div>

    <!-- 结尾div -->
</div>
</template>

<script>
import { getUserInfo } from '@/api/http.js'
import { setItem } from '@/utlis/localStorage.js'
export default {
  name: 'Name',
  data () {
    return {
      form: {
        mobile: '13911111111',
        code: '246810',
        agree: true
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { pattern: /^1\d{10}$/, message: '请输入正确手机号格式', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
          { pattern: /^\d{6}$/, message: '请输入正确验证码格式', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      if (!this.form.agree) {
        this.$message('请勾选跳框')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUserInfo(this.form).then(res => {
            setItem(res.data.data.token)
            this.$router.push('/')
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.contain{

    background-image: url('../assets/login_bg.jpg');
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      background-size: 100% 100%;
       .box{
            display: flex;
      justify-content: center;
            width: 400px;
            height: 340px;
            background-color: #ffffff;
            position: absolute;
            margin: auto;
            padding: 20px;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            .title{
                height: 60px;

            }
       }

}
</style>
