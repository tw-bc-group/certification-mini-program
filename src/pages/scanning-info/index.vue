<template>
  <div class="wrapper">
    <div class="container" v-if="isValidQRCode">
      <cac-simple-certificate :certId="certId"></cac-simple-certificate>
      <div class="collect-button">
        <cac-button :clazz="goToMyCertClass" :click="goToMyCert" :text="detailButtonText" />
        <cac-button :clazz="collectionBtnClass" :click="addToMyCollection" text="添加到我的收藏" />
        <cac-button :clazz="myCertBtnClass" :click="addToMyCert" text="添加到我的证书" />
      </div>
    </div>
    <CacErrorInfo v-else hint="未扫描到有效证书"></CacErrorInfo>
  </div>
</template>

<script>
import CacSimpleCertificate from '@/components/cac-simple-certificate'
import CacButton from '@/components/cac-button'
import CacErrorInfo from '@/components/cac-error-info'

import model from '@/model'
import { qrCodeReg } from '@/utils/constants'

export default {
  components: {
    CacSimpleCertificate,
    CacButton,
    CacErrorInfo
  },
  data () {
    return {
      qrCode: '',
      certId: '',
      isAddedCert: false,
      isAddedCollection: false,
      isValidQRCode: false
    }
  },
  onLoad () {
    // reset data when load page because mpvue will have cache when enter this page again
    Object.assign(this.$data, this.$options.data())
  },
  beforeMount () {
    this.qrCode = this.$root.$mp.query.qrCode
    console.log(this.qrCode)
    if (qrCodeReg.test(this.qrCode)) {
      this.isValidQRCode = true
      this.certId = this.qrCode.replace(qrCodeReg, '')
      Promise.all([this.checkIsMyCert()])
    }
  },
  computed: {
    detailButtonText () {
      return this.isAddedCert ? '前往我的证书查看' : '前往我的收藏查看'
    },
    goToMyCertClass () {
      return this.isAddedCert || this.isAddedCollection ? '' : 'hide'
    },
    collectionBtnClass () {
      return this.isAddedCert || this.isAddedCollection ? 'add-collection-btn hide' : 'add-collection-btn'
    },
    myCertBtnClass () {
      return this.isAddedCert || this.isAddedCollection ? 'add-my-cert-btn hide' : 'add-my-cert-btn'
    }
  },
  onShow () {
    console.debug('onShow:', this.certId)
    this.checkIsMyCert()
  },
  methods: {
    async checkIsMyCert () {
      console.debug('checkIsMyCert:', this.certId)
      this.isAddedCert = await model.User.isMyCert(this.certId)
      this.isAddedCollection = await model.User.isMyCollection(this.certId)
      console.debug('isAddedCert: ', this.isAddedCert)
      console.debug('isAddedCollection: ', this.isAddedCollection)
    },
    async addToMyCert () {
      await model.User.addCert(this.certId)
      wx.showToast({
        title: '已添加',
        icon: 'success',
        duration: 1000,
        mask: true,
        success: res => {
          this.isAddedCert = true
        }
      })
    },
    async addToMyCollection () {
      await model.User.addToMyCollections(this.certId)
      wx.showToast({
        title: '已添加',
        icon: 'success',
        duration: 1000,
        mask: true,
        success: res => {
          this.isAddedCollection = true
        }
      })
    },
    goToMyCert (e) {
      console.log('goToMyCert:', e)
      let type = 'myCerts'
      console.log('goToMyCert', this.isAddedCollection)
      if (this.isAddedCollection) {
        type = 'myCollections'
      }
      console.log(type)
      wx.navigateTo({ url: `../my-certificates/main?type=${type}` })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100%;
  }
  .cert-detail-item {
    margin-left: 16px;
  }
  .container {
    padding: 92px 44px 0 44px;

    .collect-button {
      width: 100%;
      margin-top: auto;
      margin-bottom: 48px;
      display: flex;
      justify-content: space-between;
      .cac-button {
        width: 137px;
      }
    }
  }
</style>

