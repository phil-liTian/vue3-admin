<!--
 * @Date: 2024-03-28 10:34:47
 * @LastEditors: phil_litian
-->
<template>
  <pBasicTitle v-if="!isDetail">
    {{ $slots.title ? '' : title }}
  </pBasicTitle>
  <div :class="getClass" v-else>
    <span :class="`${prefixCls}__twrap`">
      <span @click="handleClose">
        <ArrowLeftOutlined :class="`${prefixCls}__back`" />
      </span>
      <span v-if="title">{{ title }}</span>
    </span>

    <span :class="`${prefixCls}__toolbar`">
      <slot name="titleToolbar"></slot>
    </span>
  </div>
</template>
  
<script lang='ts' setup>
  import { propTypes } from '@u/propTypes'
  import { useDesign } from '@h/web/useDesign'
  import { computed } from 'vue'
  import { ArrowLeftOutlined } from '@ant-design/icons-vue'
  const { prefixCls } = useDesign('basic-drawer-header')
  defineOptions({ name: 'BasicDrawerHeader' })
  const emits = defineEmits(['close'])
  defineProps({
    isDetail: propTypes.bool.def(false),
    title: propTypes.string
  })

  const getClass = computed(() => {
    return [
      prefixCls,
      `${prefixCls}--detail`
    ]
  })

  const handleClose = () => {
    emits('close')
  }
</script>
  
<style lang='less' scoped>
  @prefix-cls:  ~'@{namespace}-basic-drawer-header';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    height: 100%;

    &__back {
      padding: 0 12px;
      cursor: pointer;

      &:hover {
        color: @primary-color;
      }
    }

    &__twrap {
      flex: 1;
    }

    &__toolbar {
      padding-right: 50px;
    }
  }
</style>