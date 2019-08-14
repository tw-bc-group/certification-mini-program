<template>
  <div class="simple-certificate-wrapper">
    <image class="simple-certificate-image" :src="certUrl"/>
    <image class="simple-certificate-verified" :src="verifiedImgPath"/>
  </div>
</template>

<script>
import verifiedImgPath from '@/assets/images/verified.png'
import {fetchSimplePhotoUrl} from '@/model/photo'

export default {
  data () {
    return {
      verifiedImgPath,
      certUrl: ''
    }
  },
  props: {
    certId: String
  },
  watch: {
    async certId (newCertId) {
      this.certUrl = await fetchSimplePhotoUrl(this.certId)
    }
  },
  async beforeMount () {
    this.certUrl = await fetchSimplePhotoUrl(this.certId)
  }
}
</script>

<style lang="scss" scoped>
  .simple-certificate-wrapper {
    position: relative;

    .simple-certificate-image {
      width: 287px;
      height: 365px;
      border-radius: 6.3px;
      box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.2);
    }
    .simple-certificate-verified {
      width: 67px;
      height: 67px;
      position: absolute;
      bottom: 13px;
      right: 12px;
    }
  }
</style>
