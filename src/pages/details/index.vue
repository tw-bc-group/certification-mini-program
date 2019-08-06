<template>
  <div class="container">
    <!-- <p>qrCode: {{ qrCode }}</p> -->
    <div v-if="isShowCertDetail" class="simple-certificate-wrapper">
      <ul>Certificate Detail
        <li class='cert-detail-item'>Subject: {{certDetail.subject}}</li>
        <li class='cert-detail-item'>Name:{{certDetail.lastName}}{{certDetail.firstName}}</li>
        <li class='cert-detail-item'>Type: {{certDetail.additionalData.type}}</li>
        <li class='cert-detail-item'>Partner: {{certDetail.additionalData.partner}}</li>
        <li class='cert-detail-item'>Issuer: {{certDetail.additionalData.issuer}}</li>
        <li class='cert-detail-item'>Issue Date:{{certDetail.issueDate}}</li>
        <li class='cert-detail-item'>Expire Date: {{certDetail.expireDate}}</li>
      </ul>
    </div>
    <div v-if="isShowCertDetail" class="collect-button">
      <cac-button :click="isAdded ? goToMyCertificates : addToMyCertificates" :text="detailButtonText" />
    </div>
  </div>
</template>

<script>
import CacButton from '../../components/cac-button'

import { qrCodeReg } from '../../utils/constants'
import { formatTime } from '../../utils'

export default {
  components: {
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
  }
}
</script>

<style lang="scss" scoped>
  .cert-detail-item {
    margin-left: 16px;
  }
  .container {
    padding: 0 44px;

    .simple-certificate-wrapper {
      width: 100%;
      height: 365px;
      margin-top: 92px;

      border-radius: 6.3px;
      box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.2);
      background-color: #f39f54;
      color: white;
    }

    .collect-button {
      width: 100%;
      margin-top: 61px;
    }
  }
</style>

