<template>
  <div>
    <div class='scan' @click='scan'>Scan Certificate</div>
    <div>Certificate Result: {{ qrcode }}</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      qrcode: ''
    }
  },
  methods: {
    scan () {
      wx.scanCode({
        success: (res) => {
          this.qrcode = res.result
        },
        fail: (error) => {
          this.qrcode = error
        }
      })
    }
  },
  created () {}
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
