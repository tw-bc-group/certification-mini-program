<template>
  <div>
    <div v-if="hasCertificates">
      <div class="top-bar-wrapper" v-if="hasCertificates">
        <img class="top-bar-delete" :src="deleteImgPath" @click="showDeleteModal">
      </div>
      <swiper class="certificate-gallery-wrapper" previous-margin="32px" next-margin="32px" @change="onSwiperChange" :current="current">
        <block v-for="cert in certificateList" :key="getItemKey(cert)">
          <swiper-item class="certificate-gallery-item" @click="goToDownloadPage(cert)">
            <cac-simple-certificate :certId="cert">
            </cac-simple-certificate>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <cacErrorInfo v-else hint="还没有添加证书"></cacErrorInfo>
  </div>
</template>

<script>
import cacSimpleCertificate from '@/components/cac-simple-certificate'
import cacErrorInfo from '@/components/cac-error-info'
import {getAllCerts, getAllCollections, removeCert, removeCollection} from '@/model/user'
import deleteImgPath from '@/assets/images/delete.png'
import {fetchFullEditionPhotoUrl} from '@/model/photo'

export default {
  components: {
    cacSimpleCertificate,
    cacErrorInfo
  },
  data () {
    return {
      deleteImgPath,
      current: 0,
      certificateList: [],
      type: '',
      handlers: {
        'myCerts': {
          'remove': removeCert,
          'fetch': getAllCerts
        },
        'myCollections': {
          'remove': removeCollection,
          'fetch': getAllCollections
        }
      },
      title: {
        'myCerts': '我的证书',
        'myCollections': '我收藏的证书'
      }
    }
  },
  onLoad () {
    // reset data when load page because mpvue will have cache when enter this page again
    Object.assign(this.$data, this.$options.data())
  },
  async beforeMount () {
    this.type = this.$root.$mp.query.type || 'myCerts'
    this.certificateList = await this.handlers[this.type].fetch()
    console.log('certificateList:', this.certificateList)
    wx.setNavigationBarTitle({title: this.title[this.type]})
  },
  computed: {
    hasCertificates () {
      return this.certificateList.length > 0
    }
  },
  methods: {
    async goToDownloadPage (certId) {
      const url = await fetchFullEditionPhotoUrl(certId)
      wx.navigateTo({
        'url': `/pages/certificate-details/main?src=${url.replace('http', 'https')}`
      })
    },
    showDeleteModal () {
      wx.showModal({
        title: '',
        content: '确定要删除当前证书？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: res => {
          if (res.confirm) {
            console.log('用户点击确定', this.certificateList[this.current])
            this.deleteCurrentCert()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    async deleteCurrentCert () {
      const deleteIndex = this.current
      // if delete the last item, make the current second last one
      if (deleteIndex === this.certificateList.length - 1) this.current--
      const certId = this.certificateList[deleteIndex]

      await this.handlers[this.type].remove(certId)
      this.certificateList = this.certificateList.filter(cert => cert !== certId)
    },
    onSwiperChange (e) {
      this.current = e.target.current
    },
    getItemKey (certId) {
      certId.slice(2, -1)
    }
  }
}
</script>

<style lang="scss" scoped>
  $top-bar-height: 44px;

  .top-bar-wrapper {
    height: $top-bar-height;
    padding: 0 26px;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    .top-bar-delete {
      height: 20px;
      width: 20px;
    }
  }
  .certificate-gallery-wrapper {
    width: 100%;
    height: 375px;
    padding-top: 48px;
    white-space: nowrap;
  }
  .certificate-gallery-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>


