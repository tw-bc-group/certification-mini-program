<template>
  <div>
    <div class="top-bar-wrapper">
      <img class="top-bar-logo" :src="logoImgPath" />
      <img class="top-bar-scan" :src="scanImgPath" @click="scan" />
    </div>
    <div class='scan' @click='scan'>Scan Certificate</div>
    <button class='user-info-btn' open-type="getUserInfo" @getuserinfo='getUserInfo'>user-info-login</button>
    <div class='login' @click='login'>getCode</div>
    <div class='text'>{{ text }}</div>
  </div>
</template>

<script>
import logoImgPath from '../../../static/images/logo.png'
import scanImgPath from '../../../static/images/scan.png'

export default {
  data: {
    text: '',
    logoImgPath,
    scanImgPath
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

<style lang="scss" scoped>
  $top-bar-height: 44px;

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
  .top-bar-wrapper {
    height: $top-bar-height;
    display: flex;
    justify-content: space-between;
    padding: 0 11px 0 18px;

    .top-bar-logo, .top-bar-scan {
      height: $top-bar-height;
      width: $top-bar-height;
    }
  }
</style>
