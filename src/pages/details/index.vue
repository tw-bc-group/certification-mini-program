<template>
  <div class="container">
    <cac-simple-certificate v-if="isShowCertDetail">
    </cac-simple-certificate>
    <div v-if="isShowCertDetail" class="collect-button">
      <cac-button :click="isAdded ? goToMyCertificates : addToMyCertificates" :text="detailButtonText" />
    </div>
  </div>
</template>

<script>
import CacSimpleCertificate from '../../components/cac-simple-certificate'
import CacButton from '../../components/cac-button'
import api from '../../api'

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
      api.getCertificationInfo().then((res) => {
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

