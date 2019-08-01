<template>
  <div>
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
  computed: {
    isShowCertDetail () {
      return Object.keys(this.certDetail).length !== 0
    }
  },
  watch: {
    qrCode (newQrCode) {
      console.debug(newQrCode)
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
  beforeMount () {
    this.qrCode = this.$root.$mp.query.qrCode
  }
}
</script>

<style scoped>
  .cert-detail {
    margin-top: 16px;
  }
  .cert-detail-item {
    margin-left: 16px;
  }
</style>

