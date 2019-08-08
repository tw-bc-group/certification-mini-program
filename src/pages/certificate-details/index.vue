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
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success (res) {
                self.downloadSuccess()
              },
              fail (res) {
                self.downloadFailed()
              }
            })
          } else {
            self.downloadFailed()
          }
        },
        fail (res) {
          self.downloadFailed()
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
    }
  }
</style>