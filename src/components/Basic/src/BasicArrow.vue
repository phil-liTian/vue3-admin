<!--
 * @Date: 2024-03-01 15:08:29
 * @LastEditors: phil_litian
-->
<template>
  <span :class="getClass">
    <PIcon icon="ion:chevron-forward"></PIcon>
  </span>
</template>
  
<script lang='ts' setup>
  import { computed } from "vue";
  import { useDesign } from '@h/web/useDesign'
  const { prefixCls } = useDesign('basic-arrow')

  const props = defineProps({
    director: {
      type: String,
      default: 'up',
      validator: (val: string) => {
        return ['up', 'down'].includes(val)
      }
    }
  })

  const getClass = computed(() => {
    return [
      prefixCls,
      props.director
    ]
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-basic-arrow';

  .@{prefix-cls} {
    display: inline-block;
    transform: rotate(0deg);
    transition: all .3s ease .1s;

    &.up {
      transform: rotate(-90deg);
    }

    &.down {
      transform: rotate(90deg);
    }
  }
</style>