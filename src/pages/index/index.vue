<template>
  <div>
    <div class='scan' @click='scan'>Scan Certificate</div>
    <div>qrCode: {{ qrCode }}</div>
    <ul v-if="isShowCertDetail" class='cert-detail'>Certificate Detail
      <li class='cert-detail-item'>Subject: {{certDetail.subject}}</li>
      <li class='cert-detail-item'>Name:{{certDetail.lastName}}{{certDetail.firstName}}</li>
      <li class='cert-detail-item'>Type: {{certDetail.additionalData.type}}</li>
      <li class='cert-detail-item'>Partner: {{certDetail.additionalData.partner}}</li>
      <li class='cert-detail-item'>Issuer: {{certDetail.additionalData.issuer}}</li>
      <li class='cert-detail-item'>Issue Date:{{certDetail.issueDate}}</li>
      <li class='cert-detail-item'>Expire Date: {{certDetail.expireDate}}</li>
    </ul>
  </div>
</template>

<script>

import { qrCodeReg } from '../../utils/constants'
import { formatTime } from '../../utils'

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
      if (!qrCodeReg.test(newQrCode)) return
      const certId = newQrCode.replace(qrCodeReg, '')
      this.$http.get(`/certifications/${certId}`).then((res) => {
        const { issueDate, expireDate, ...others } = res
        this.certDetail = {
          ...others,
          issueDate: formatTime(issueDate),
          expireDate: formatTime(expireDate)
        }
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
