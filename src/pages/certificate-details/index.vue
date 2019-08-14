<template>
  <div class="container">
    <img class="full-edition-img" :src="src" />
    <div class="download-wrapper">
      <cac-button :text="btnText" :click="downloadAndSaveToPhotosAlbum"></cac-button>
    </div>
  </div>
</template>

<script>
import CacButton from '@/components/cac-button'

export default {
  components: {
    CacButton
  },
  data () {
    return {
      btnText: '下载证书',
      src: ''
    }
  },
  methods: {
    downloadAndSaveToPhotosAlbum () {
      const self = this
      wx.downloadFile({
        url: self.src,
        success (res) {
          if (res.statusCode === 200) {
            console.log('start authorize')
            const downloadPath = res.tempFilePath
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success (res) {
                console.log('authorize success:', downloadPath)
                wx.saveImageToPhotosAlbum({
                  filePath: downloadPath,
                  success (res) {
                    self.downloadSuccess()
                  },
                  fail (res) {
                    console.log(res)
                    wx.showToast({
                      title: res.errMsg,
                      icon: 'success',
                      duration: 2000
                    })
                  }
                })
              },
              fail (res) {
                wx.showToast({
                  title: 'authorize failed',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          } else {
            self.downloadFailed()
          }
        },
        fail (res) {
          wx.showToast({
            title: 'downloadFile failed',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },
    downloadSuccess () {
      wx.showToast({
        title: '已下载',
        icon: 'success',
        duration: 2000
      })
    },
    downloadFailed () {
      wx.showToast({
        title: '下载失败',
        icon: 'none',
        duration: 2000
      })
    }
  },
  beforeMount () {
    this.src = this.$root.$mp.query.src
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding-top: 24px;
    .full-edition-img {
      width: 100%;
      height: 468.6px;
    }
    .download-wrapper {
      width: 100%;
      padding: 24px 50px 0 50px;
      box-sizing: border-box;
      margin-top: auto;
      margin-bottom: 48px;
    }
  }
</style>