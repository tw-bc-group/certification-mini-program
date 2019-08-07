<template>
  <div class="container">
    <!-- <p>qrCode: {{ qrCode }}</p> -->
    <cac-simple-certificate v-if="isShowCertDetail">
      <ul>Certificate Detail
        <li class='cert-detail-item'>Subject: {{certDetail.subject}}</li>
        <li class='cert-detail-item'>Name:{{certDetail.lastName}}{{certDetail.firstName}}</li>
        <li class='cert-detail-item'>Type: {{certDetail.additionalData.type}}</li>
        <li class='cert-detail-item'>Partner: {{certDetail.additionalData.partner}}</li>
        <li class='cert-detail-item'>Issuer: {{certDetail.additionalData.issuer}}</li>
        <li class='cert-detail-item'>Issue Date:{{certDetail.issueDate}}</li>
        <li class='cert-detail-item'>Expire Date: {{certDetail.expireDate}}</li>
      </ul>
    </cac-simple-certificate>
    <div v-if="isShowCertDetail" class="collect-button">
      <cac-button :click="isAdded ? goToMyCertificates : addToMyCertificates" :text="detailButtonText" />
    </div>
  </div>
</template>

<script>
import CacSimpleCertificate from '../../components/cac-simple-certificate'
import CacButton from '../../components/cac-button'

import { qrCodeReg } from '../../utils/constants'
import { formatTime } from '../../utils'

export default {
  components: {
    CacSimpleCertificate,
    CacButton
  },
  data () {
    return {
      qrCode: '',
      certDetail: {},
      isAdded: false
    }
  },
  computed: {
    isShowCertDetail () {
      return Object.keys(this.certDetail).length !== 0
    },
    detailButtonText () {
      return this.isAdded ? '前往我的证书查看' : '添加到我的证书'
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
  methods: {
    addToMyCertificates () {
      wx.showToast({
        title: '已添加',
        icon: 'success',
        duration: 1000,
        mask: true,
        success: res => {
          this.isAdded = true
        }
      })
    },
    goToMyCertificates () {
      wx.navigateTo({ url: '../my-certificates/main' })
    }
  },
  beforeMount () {
    this.qrCode = this.$root.$mp.query.qrCode
  },
  onLoad () {
    // reset data when load page because mpvue will have cache when enter this page again
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
  .cert-detail-item {
    margin-left: 16px;
  }
  .container {
    padding: 92px 44px 0 44px;

    .collect-button {
      width: 100%;
      margin-top: 61px;
    }
  }
</style>

