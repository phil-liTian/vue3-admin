<!--
 * @Date: 2024-04-02 17:24:53
 * @LastEditors: phil_litian
 刷新
-->
<template>
  <span :class="`${prefixCls}__extra-redo`" @click="handleRedo">
    <RedoOutlined :spin="loading" />
  </span>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { RedoOutlined } from '@ant-design/icons-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useTabs } from '@h/web/useTabs'
  const { prefixCls } = useDesign('multiple-tabs-content')
  defineOptions({ name: 'TabRedo' })
  const { refreshPage } = useTabs()

  const loading = ref(false)

  // 刷新当前页面
  const handleRedo = async () => {
    loading.value = true
    await refreshPage()
    setTimeout(() => {
      loading.value = false
    }, 1000);
  }
</script>
  
<style lang='less' scoped>
  
</style>