<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off"
        placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password"
        auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="16">
          <el-input size="small" @keyup.enter.native="
                    " :maxlength="code.len" v-model="loginForm.code"
            auto-complete="off" placeholder="请输入验证码">
            <i slot="prefix" class="icon-yanzhengma"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <span class="login-code-img" @click="refreshCode" v-if="code.type == 'text'">{{code.value}}</span>
            <img :src="code.src" class="login-code-img" @click="refreshCode" v-else />
            <!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
          </div>
        </el-col>
      </el-row>

    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "userlogin",
    data() {

      return {
        socialForm: {
          code: '',
          state: ''
        },
        loginForm: {
          username: "admin",
          password: "123456",
          code: "",
          redomStr: ""
        },
        checked: false,
        code: {
          src: "/code",
          value: "",
          len: 4,
          type: "image"
        },
        loginRules: {
          username: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }],
          password: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            },
            {
              min: 6,
              message: "密码长度最少为6位",
              trigger: "blur"
            }
          ],
          code: [{
              required: true,
              message: "请输入验证码",
              trigger: "blur"
            },
            {
              min: 4,
              max: 4,
              message: "验证码长度为4位",
              trigger: "blur"
            }
          ]
        },
        passwordType: "password"
      };
    },
    watch: {
      $route() {
        const params = this.$route.query
        this.socialForm.state = params.state
        this.socialForm.code = params.code
        if (!validatenull(this.socialForm.state)) {
          const loading = this.$loading({
            lock: true,
            text: `登录中,请稍后。。。`,
            spinner: 'el-icon-loading'
          })
          setTimeout(() => {
            loading.close()
          }, 2000)
          this.handleSocialLogin()
        }
      }
    },
    created() {
      this.refreshCode();
    },
    mounted() {},
    props: [],
    methods: {
      refreshCode() {
        // 验证码获取
        this.loginForm.code = ''
      },
      showPassword() {
        this.passwordType == '' ?
          (this.passwordType = 'password') :
          (this.passwordType = '')
      },
      handleSocialLogin() {
      
      },
      handleLogin() {
        // 登录数据提交
        
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            console.log(this.loginForm);
          }
        });
      }
    }
  };

</script>

<style>
</style>
