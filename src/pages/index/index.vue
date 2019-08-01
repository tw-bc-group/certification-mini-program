<template>
  <div>
    <div class='scan' @click='scan'>Scan Certificate</div>
    <button class='user-info-btn' open-type="getUserInfo" @getuserinfo='getUserInfo'>user-info-login</button>
    <div class='login' @click='login'>getCode</div>
    <div class='text'>{{ text }}</div>
    <view class="btn-area">
      <navigator url="../../redirect/redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">在当前页打开</navigator>
      <navigator url="/page/index/index" open-type="switchTab" hover-class="other-navigator-hover">切换 Tab</navigator>
      <navigator target="miniProgram" open-type="navigate" app-id="" path="" extra-data="" version="release">打开绑定的小程序</navigator>
    </view>
  </div>
</template>

<script>

export default {
  data: {
    text: ''
  },
  methods: {
    scan () {
      wx.scanCode({
        success: (res) => {
          this.jumpToCertDetailsPage(res.result)
        },
        fail: (error) => {
          console.log(error)
        }
      })
    },
    jumpToCertDetailsPage (qrCode) {
      wx.navigateTo({'url': `/pages/details/main?qrCode=${qrCode}`})
    },
    login () {
      const self = this
      wx.login({
        success (res) {
          if (res.code) {
            console.debug(res)
            self.text = JSON.stringify(res)
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    getUserInfo (e) {
      console.debug(e.target)
      this.text = JSON.stringify(e.target)
    }
  },
  onReady () {
    const scanParamFromRoot = this.$root.$mp.query.q
    if (scanParamFromRoot) {
      this.jumpToCertDetailsPage(scanParamFromRoot)
    }
  }
}
</script>

<style scoped>
  .scan {
    display: flex;
    padding: 10px;
    background-color: mediumseagreen;
    color: white;
  }
  .login {
    display: flex;
    padding: 10px;
    background-color: blue;
    color: white;
  }
  .user-info-btn {
    display: flex;
    padding: 10px;
    background-color: #00eeff;
    color: white;
  }
  .text {
    word-break: break-word;
  }
</style>
