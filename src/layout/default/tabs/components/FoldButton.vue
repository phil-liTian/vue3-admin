<!--
 * @Date: 2024-04-02 19:16:42
 * @LastEditors: phil_litian
 * 此处折叠的逻辑: 是否展示header和menu
-->
<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <PIcon :icon="getIcon"></PIcon>
  </span>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { ref, computed, unref } from 'vue'
  import { useMenuSetting } from '@h/setting/useMenuSetting'
  import { useHeaderSetting } from '@h/setting/useHeaderSetting'

  const { prefixCls } = useDesign('multiple-tabs-content')
  const { getShowMenu, setMenuSetting } = useMenuSetting()
  const { getShowHeader, setHeaderSetting } = useHeaderSetting()

  defineOptions({ name: 'FoldButton' });

  // 当前是否展开
  const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader) )
  const getIcon = computed(() => {
    return unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full'
  })

  const handleFold = () => {
    const isUnFold = unref(getIsUnFold)
    setMenuSetting({ show: isUnFold })
    setHeaderSetting({ show: isUnFold })
  }
</script>
  
<style lang='less' scoped>
  
</style>