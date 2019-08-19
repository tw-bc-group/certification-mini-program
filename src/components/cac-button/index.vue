<template>
  <button :class="clazzName" @click="click()">
    {{ text }}
  </button>
  <!-- <img class="scan-icon" :src="scanImgPath /> -->
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
      return 'cac-button ' + this.clazz || ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .cac-button {
    width: 100%;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    border-radius: 6px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    background-color: white;
    color: black;

    &:active {
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
    }

    &.scan-btn {
      margin: 0 auto 48px auto;
      background-image: url('~@/assets/images/scan.png');
      background-repeat: no-repeat;
      background-size: 35.2px 35.2px;
      background-position-x: 92px;
      background-position-y: 3px;
    }
  }
</style>


