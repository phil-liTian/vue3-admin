<!--
 * @Date: 2024-04-16 11:31:08
 * @LastEditors: phil_litian
-->

<template>
  <Section 
    :style="[background ? `background-color: ${background}` : '']"
    class="full-loading"
    :class="[absolute && 'absolute']"
    v-show="loading">
    <Spin v-bind="$attrs" :tip="tip" :size="size" :spinning="loading" />
  </Section>
</template>
  
<script lang='ts' setup>
  import { SizeEnum } from '@e/sizeEnum';
  import { propTypes } from '@/utils/propTypes';
  import { Spin } from 'ant-design-vue'
  import { PropType } from 'vue';
  defineOptions({ name: 'Loading' })

  defineProps({
    tip: propTypes.string.def(''),
    loading: propTypes.bool.def(false),
    size: {
      type: String as PropType<SizeEnum>,
      default: SizeEnum.LARGE,
      validator: (val: SizeEnum) => {
        return [SizeEnum.LARGE, SizeEnum.DEFAULT, SizeEnum.SMALL].includes(val)
      }
    },
    background: propTypes.string.def(''),
    absolute: propTypes.bool.def(false)
  })
</script>
  
<style lang='less' scoped>
  .full-loading {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(240 242 245 / 40%);
    z-index: 200;

    &.absolute {
      position: absolute;
      z-index: 300;
      top: 0;
      left: 0;
    }
  }
</style>