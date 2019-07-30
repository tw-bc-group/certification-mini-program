<template>
  <div>
    <div class='scan' @click='scan'>Scan Certificate</div>
    <div>qrCode: {{ qrCode }}</div>
    <ul v-show="isShowCertDetail" class='cert-detail'>Certificate Detail
      <li class='cert-detail-item'>Subject: {{certDetail.subject}}</li>
      <li class='cert-detail-item'>Name:{{certDetail.lastName}}{{certDetail.firstName}}</li>
      <li class='cert-detail-item'>Issue Date:{{certDetail.issueDate}}</li>
      <li class='cert-detail-item'>Expire Date: {{certDetail.expireDate}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
      qrCode: '',
      certDetail: {}
    }
  },
  methods: {
    scan () {
      wx.scanCode({
        success: (res) => {
          this.qrCode = res.result
        },
        fail: (error) => {
          this.qrCode = error
        }
      })
    }
  },
  computed: {
    isShowCertDetail () {
      return Object.keys(this.certDetail).length !== 0
    }
  },
  watch: {
    qrCode (newQrCode) {
      const fragmentArray = newQrCode.split('/')
      const certId = fragmentArray[fragmentArray.length - 1]
      this.$http.get(`/certifications/${certId}`).then((res) => {
        this.certDetail = res
      }).catch((e) => {
        console.log(e)
      })
    }
  },
  onReady () {
    const scanParamFromRoot = this.$root.$mp.query.q
    if (scanParamFromRoot) {
      this.qrCode = decodeURIComponent(scanParamFromRoot)
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
  .cert-detail {
    margin-top: 16px;
  }
  .cert-detail-item {
    margin-left: 16px;
  }
</style>
