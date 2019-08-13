<template>
  <div>
    <div class="top-bar-wrapper">
      <img class="top-bar-logo" :src="logoImgPath" />
      <img class="top-bar-scan" :src="scanImgPath" @click="scan" />
    </div>
  </div>
</template>

<script>
import logoImgPath from '@/assets/images/logo.png'
import scanImgPath from '@/assets/images/scan.png'

export default {
  data () {
    return {
      logoImgPath,
      scanImgPath
    }
  },
  onReady () {
    const scanParamFromRoot = this.$root.$mp.query.q
    if (scanParamFromRoot) {
      this.jumpToCertDetailsPage(scanParamFromRoot)
    }
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
      wx.navigateTo({'url': `/pages/scanning-info/main?qrCode=${qrCode}`})
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
