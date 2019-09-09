<template>
  <div class="wrapper">
    <div class="container" v-if="isValidQRCode">
      <cac-simple-certificate :certId="certId"></cac-simple-certificate>
      <div class="collect-button">
        <cac-button :clazz="goToMyCertClass" :click="goToMyCert" :text="detailButtonText" />
        <cac-button :clazz="collectionBtnClass" :click="() => addCertTo('myCollections')" text="添加到我的收藏" />
        <cac-button :clazz="myCertBtnClass" :click="() => addCertTo('myCerts')" text="添加到我的证书" />
      </div>
    </div>
    <CacErrorInfo v-else hint="未扫描到有效证书"></CacErrorInfo>
  </div>
</template>

<script>
import CacSimpleCertificate from '@/components/cac-simple-certificate'
import CacButton from '@/components/cac-button'
import CacErrorInfo from '@/components/cac-error-info'

import {addCert, addToMyCollections, isMyCert, isMyCollection} from '@/model/user'
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
      isValidQRCode: false,
      flags: {
        'myCerts': {
          isAdded: false
        },
        'myCollections': {
          isAdded: false
        }
      },
      handlers: {
        'myCerts': {
          add: addCert,
          isAdded: isMyCert
        },
        'myCollections': {
          add: addToMyCollections,
          isAdded: isMyCollection
        }
      },
      goToBtnText: {
        'myCerts': '前往我的证书查看',
        'myCollections': '前往我的收藏查看'
      }
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
    goToWhichType () {
      const {myCerts} = this.flags
      return myCerts.isAdded ? 'myCerts' : 'myCollections'
    },
    showGoToBtn () {
      const {myCerts, myCollections} = this.flags
      return myCerts.isAdded || myCollections.isAdded
    },
    detailButtonText () {
      return this.goToBtnText[this.goToWhichType]
    },
    goToMyCertClass () {
      return {
        true: '',
        false: 'hide'
      }[this.showGoToBtn]
    },
    collectionBtnClass () {
      return {
        true: 'add-collection-btn hide',
        false: 'add-collection-btn'
      }[this.showGoToBtn]
    },
    myCertBtnClass () {
      return {
        true: 'add-my-cert-btn hide',
        false: 'add-my-cert-btn'
      }[this.showGoToBtn]
    }
  },
  onShow () {
    console.debug('onShow:', this.certId)
    this.checkIsMyCert()
  },
  methods: {
    async checkIsMyCert () {
      this.flags = {
        'myCerts': {isAdded: await this.handlers['myCerts'].isAdded(this.certId)},
        'myCollections': {isAdded: await this.handlers['myCollections'].isAdded(this.certId)}
      }
      console.debug('this.flags: ', JSON.stringify(this.flags))
    },
    async addCertTo (type) {
      await this.handlers[type].add(this.certId)
      wx.showToast({
        title: '已添加',
        icon: 'success',
        duration: 1000,
        mask: true,
        success: res => {
          this.flags[type].isAdded = true
        }
      })
    },
    goToMyCert () {
      wx.navigateTo({ url: `../my-certificates/main?type=${this.goToWhichType}` })
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

