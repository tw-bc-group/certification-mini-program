<template>
  <div>
    <div class="top-bar-wrapper">
      <img class="top-bar-logo" :src="logoImgPath" />
      <img class="top-bar-scan" :src="scanImgPath" @click="scan" />
    </div>
    <div class='scan' @click='scan'>Scan Certificate</div>
    <button class='user-info-btn' open-type="getUserInfo" @getuserinfo='getUserInfo'>user-info-login</button>
    <div class='login' @click='login'>wechat login</div>
    <div class='login' @click='addCert'>addCert</div>
    <div class='login' @click='removeCert'>removeCert</div>
    <div class='login' @click='getAllCerts'>getAllCerts</div>
    <div class='login' @click='isMyCert'>isMyCert</div>
    <div class='text'>{{ text }}</div>
  </div>
</template>

<script>
import model from '../../model'
import logoImgPath from '../../../static/images/logo.png'
import scanImgPath from '../../../static/images/scan.png'

const User = new model.User()

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
    async login () {
      const user = await User.login()
      console.log(user)
    },
    async addCert () {
      const user = await User.addCert('11111')
      console.log(user)
    },
    async isMyCert () {
      const isMyCert = await User.isMyCert('11111')
      console.log(isMyCert)
    },
    async getAllCerts () {
      const certs = await User.getAllCerts()
      console.log(certs)
    },
    async removeCert () {
      const user = await User.removeCert('11111')
      console.log(user)
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
    padding: 0 11px 0 18px;

    display: flex;
    justify-content: space-between;

    .top-bar-logo, .top-bar-scan {
      height: $top-bar-height;
      width: $top-bar-height;
    }
  }
</style>
