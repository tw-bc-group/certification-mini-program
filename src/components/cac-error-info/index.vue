<template>
  <div class="error-container">
    <img class="error-image" :src="sadImage">
    <div class="error-hint">{{ hint }}</div>
  </div>
</template>

<script>
import sadImage from '@/assets/images/sad.png'

export default {
  data () {
    return {
      sadImage
    }
  },
  props: {
    hint: String
  }
}
</script>

<style lang="scss" scoped>
  .error-container {
    .error-image {
      width: 140px;
      height: 140px;
      margin: 136px 117px 0 117px;
    }
    .error-hint {
      font-size: 14px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #acacac;
    }
  }
</style>


