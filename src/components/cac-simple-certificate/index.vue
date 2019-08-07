<template>
  <div class="simple-certificate-wrapper">
    <image class="simple-certificate-image" src="http://lc-Uukre5Ss.cn-n1.lcfile.com/e7111efc529070a88cb6.png"/>
    <image class="simple-certificate-verified" :src="verifiedImgPath"/>
  </div>
</template>

<script>
import verifiedImgPath from '../../assets/images/verified.png'

export default {
  data () {
    return {
      verifiedImgPath
    }
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
