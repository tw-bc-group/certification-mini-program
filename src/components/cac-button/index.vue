<template>
  <div :class="clazzName" @click="click()">
    <img v-show="showScanIcon" class="scan-icon" :src="scanImgPath" />
    {{ text }}
  </div>
</template>

<script>
import scanImgPath from '@/assets/images/scan.png'

export default {
  data () {
    return {
      scanImgPath
    }
  },
  props: {
    text: String,
    click: Function,
    clazz: String
  },
  computed: {
    clazzName () {
      return 'cac-button ' + (this.clazz || '')
    },
    showScanIcon () {
      return (this.clazz && this.clazz.includes('scan-btn')) || false
    }
  }
}
</script>

<style lang="scss" scoped>
  .cac-button {
    width: 287px;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    border-radius: 6px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    background-color: white;
    color: black;

    &.hide {
      display: none;
    }

    &:active {
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
    }

    &.scan-btn {
      margin: 0 auto 48px auto;
      
      .scan-icon {
        width: 35.2px;
        height: 35.2px;
      }
    }

    &.add-collection-btn {
      width: 136px;
    }

    &.add-my-cert-btn{
      width: 136px;
    }
  }
</style>


