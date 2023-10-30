<template>
  <div class="login_container">
    <el-row>
      <!-- xs: 屏幕设备小于768 -->
      <el-col :span="12" :xs="0"> </el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到小林甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { User, Lock } from "@element-plus/icons-vue"
import { useRouter } from "vue-router"
import useUserStore from "@/store/module/user"
import { ElNotification } from "element-plus"
import { getTime } from "@/utils/time"

const $router = useRouter()
const userStore = useUserStore()

const loginForm = reactive({ username: "admin", password: "111111" })

const loginForms = ref()
const loading = ref(false)
const login = async () => {
  // 通知仓库发登陆请求
  // 请求成功 -> 展示数据的地方
  // 请求失败 -> 弹出登陆失败信息
  await loginForms.value.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    $router.push("/")
    ElNotification({
      type: "success",
      message: "欢迎回来",
      title: `HI,${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    ElNotification({
      type: "error",
      message: (error as Error).message,
    })
    loading.value = false
  }
}

const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error("账号长度至少五位"))
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error("密码长度至少六位"))
  }
}

const rules = {
  //规则对象属性:
  //required,代表这个字段务必要校验的
  //min:文本长度至少多少位
  //max:文本长度最多多少位
  //message:错误的提示信息
  //trigger:触发校验表单的时机 change->文本发生变化触发校验,blur:失去焦点的时候触发校验规则
  username: [
    // { required: true, min: 6, max: 10, message: '账号长度至少六位', trigger: 'change' }
    { trigger: "change", validator: validatorUserName },
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' }
    { trigger: "change", validator: validatorPassword },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
