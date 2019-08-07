<template>
  <div class="container">
    <cac-simple-certificate v-if="isShowCertDetail">
    </cac-simple-certificate>
    <div v-if="isShowCertDetail" class="collect-button">
      <cac-button :click="isAdded ? goToMyCert : addToMyCert" :text="detailButtonText" />
    </div>
  </div>
</template>

<script>
import CacSimpleCertificate from '../../components/cac-simple-certificate'
import CacButton from '../../components/cac-button'
import api from '../../api'

import model from '../../model'
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
      certId: '',
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
      this.certId = newQrCode.replace(qrCodeReg, '')

      Promise.all([this.getCertDetail(), this.checkIsMyCert()])
    }
  },
  methods: {
    async getCertDetail () {
      const { issueDate, expireDate, ...others } = await api.getCertificationInfo(this.certId)
      this.certDetail = {
        ...others,
        issueDate: formatTime(issueDate),
        expireDate: formatTime(expireDate)
      }
    },
    async checkIsMyCert () {
      const isMyCert = await model.User.isMyCert(this.certId)
      if (isMyCert) this.isAdded = true
    },
    async addToMyCert () {
      await model.User.addCert(this.certId)
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
    goToMyCert () {
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

