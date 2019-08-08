<template>
  <div>
    <div class="top-bar-wrapper">
      <img class="top-bar-delete" :src="deleteImgPath" @click="showDeleteModal">
    </div>
    <swiper v-show="hasCertificates" class="certificate-gallery-wrapper" previous-margin="32px" next-margin="32px" @change="onSwiperChange" :current="current">
      <block v-for="cert in certificateList" :key="cert">
        <swiper-item class="certificate-gallery-item" @click="test(cert)">
          <cac-simple-certificate>
          </cac-simple-certificate>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
import cacSimpleCertificate from '@/components/cac-simple-certificate'
import model from '@/model'
import deleteImgPath from '@/assets/images/delete.png'

export default {
  components: {
    cacSimpleCertificate
  },
  data () {
    return {
      deleteImgPath,
      current: 0,
      certificateList: []
    }
  },
  onLoad () {
    // reset data when load page because mpvue will have cache when enter this page again
    Object.assign(this.$data, this.$options.data())

    this.getAllMyCerts()
  },
  computed: {
    hasCertificates () {
      return this.certificateList.length > 0
    }
  },
  methods: {
    test (e) {
      console.log('click', e)
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
    async getAllMyCerts () {
      const certs = await model.User.getAllCerts()
      console.log(certs)
      this.certificateList = ['cert1', 'cert2', 'cert3']
    },
    deleteCurrentCert () {
      const deleteIndex = this.current
      // if delete the last item, make the current second last one
      if (deleteIndex === this.certificateList.length - 1) this.current--
      this.certificateList = this.certificateList.filter(cert => cert !== this.certificateList[deleteIndex])
    },
    onSwiperChange (e) {
      this.current = e.target.current
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


