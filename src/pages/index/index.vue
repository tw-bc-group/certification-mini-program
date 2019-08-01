<template>
  <div>
    <div class='scan' @click='scan'>Scan Certificate</div>
  </div>
</template>

<script>

export default {
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
</style>
