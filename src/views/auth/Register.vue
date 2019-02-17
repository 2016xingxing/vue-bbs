<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">


       <!-- 验证码发送 -->
      <Modal :show.sync="showCaptcha" class="modal-sm text-center">
        <div slot="title">
          请输入图形验证码
        </div>
        <div slot="body">

          <div class="row">
            <div class="col-md-3">
            </div>
            <div class="col-md-6 text-center">
              点击图片重新获取验证码
              <div class="thumbnail" title="点击图片重新获取验证码" @click="getCaptcha">

                <img class="captcha vcenter" :src="captcha_image_content"></img>
             
              </div>
            
              <input v-model.trim="captcha_code" v-validator.required="{ title: '图片验证码' }" type="text" class="form-control" placeholder="请填写验证码">

            </div>
            <div class="col-md-3">
            </div>
          </div>      
        </div>
        <div slot="footer">

           <button type="button" class="btn btn-primary" @click.self="getVerification">发送验证码</button>
        </div>
      </Modal>
       <!-- 消息组件 -->
      <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>

        <div class="panel-body" data-validator-form>
           <div class="form-group">
            <label class="control-label">用户名</label>
            <input v-model.trim="username" v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" type="text" class="form-control" placeholder="请填写用户名">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input id="password" v-model.trim="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码">
          </div>
          <div class="form-group">
            <label class="control-label">确认密码</label>
            <input v-model.trim="cpassword" v-validator.required="{ target: '#password' }" type="password" class="form-control" placeholder="请填写确认密码">
          </div>           
          <div class="form-group">
            <label class="control-label">手机号码</label>
            <input v-model.trim="phone" v-validator:input.required="{ regex: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, error: '请正确输入手机号码' }" type="text" class="form-control" placeholder="请填写手机号码" @blur.prevent="getCaptcha()">
          </div>
          <div class="form-group">
            <label class="control-label">手机验证码</label>
            <input v-model.trim="verification_code" v-validator:input.required="{ regex: /^\d{4}$/, error: '请正确输入手机验证码' }" type="text" class="form-control" placeholder="请填写手机验证码" >
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
            <i class="fa fa-btn fa-sign-in"></i> 注册
          </button>
        </div>
      </div>
    </div>
  </div>

 
  

</template>

<script>
// 创建验证码
import createCaptcha from '@/utils/createCaptcha'
import ls from '@/utils/localStorage'

export default {
  name: 'Register',
  data() {
    return {
      captcha_image_content: '', // 验证码模板
      username: '', // 用户名
      password: '', // 密码
      cpassword: '', // 确认密码
      phone:'',
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false, // 是否显示消息，默认不显示

      showCaptcha: false,
      captcha_key:'',
      captcha_code:'',
      //
      verification_key:'',
      verification_code:''
    }
  },

  created() {
    // this.getCaptcha()

  },
  methods: {
    getCaptcha() { 
      // 判断是否是手机号码
      if(this.phone.length==11)
      {
        
        var thatSwal = this.$swal
       
        this.$axios.post('/apis/captchas',{
            
              phone: this.phone
            
        })
        .then((response) => {
          this.showCaptcha = true
          this.captcha_image_content = response.data.captcha_image_content,
          this.captcha_key           = response.data.captcha_key
          
        })
        .catch(function (error) {
          
          if(error.response!=null)
          {
              thatSwal({
                text: error.response.data.errors.phone[0],
                confirmButtonText: '我知道了',
                showCancelButton: false
              })
          }
          
        });


      }


      // 这是本地测试用生成的

      // const { tpl, captcha } = createCaptcha(6)
    
      // this.captchaTpl = tpl
      // this.localCaptcha = captcha
    },
    getVerification(){

        
        var thatSwal = this.$swal
        this.$axios.post('/apis/verificationCodes',{
            
              phone: this.phone,
              captcha_key:this.captcha_key,
              captcha_code:this.captcha_code
            
        })
        .then((response) => {
          this.showCaptcha = false
          console.log(response)
          this.verification_key = response.data.key
          thatSwal({
            text: '验证码发送成功，请耐心等待',
            type: "success",
            confirmButtonText: '我知道了',
            showCancelButton: false
          })

        })
        .catch(function (error) {
          console.log(error.response.data.message)
         if(error.response!=null)
          {
              thatSwal({
                text: error.response.data.message,
                confirmButtonText: '我知道了',
                showCancelButton: false
              })
          }
          
        });

    },

    register(e) {
      this.$nextTick(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement

        if (target.canSubmit) {
          this.submit()
        }
      })
    },
    // 向 localStorage 提交数据
    submit() {
      // 检查验证码是否匹配
      // if (this.captcha.toUpperCase() !== this.localCaptcha) {
      //   this.showMsg('验证码不正确', 'success')
      //   // 重新获取验证码
      //   this.getCaptcha()
      // } else {
        // 表单里的用户信息
        
        // 从仓库获取用户信息
        // const localUser = this.$store.state.user

        // if (localUser) {
        //   // 检查是否重名
        //   if (localUser.name === user.name) {
        //     this.showMsg('用户名已存在')
        //   } else {
        //     this.login(user)
        //   }
        // } else {
        //   this.login(user)
        // }
      // }
        var thatSwal = this.$swal
        this.$axios.post('/apis/users',{
            verification_key  : this.verification_key,
            verification_code : this.verification_code,
            name              : this.username,
            password          : this.password
            
        })
        .then((response) => {
          console.log(response.data)
          this.login(response.data)
          
        })
        .catch(function (error) {
          console.log(error.response)
          if(error.response!=null)
          {
              thatSwal({
                text: error.response.data.errors.name[0],
                confirmButtonText: '我知道了',
                showCancelButton: false
              })
          }
          
        });


    },
    // 登陆
    login(user) {
      // 分发 login 事件，以保存用户信息和登录

      this.$store.dispatch('login', user)
      localStorage.setItem('authorization', user.meta)
      this.showMsg('注册成功', 'success')
    },
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}
</script>

<style scoped>
.thumbnail { width: 170px; margin-top: 10px; cursor: pointer;margin:0 auto}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
.captcha { font-size: 24px; font-weight: bold; user-select: none; text-align:center}
</style>