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
  import { RedoOutlined } from '@ant-design/icons-vue'
  import { useDesign } from '@h/web/useDesign'
  import { ref } from 'vue'
  const { prefixCls } = useDesign('multiple-tab-content')
  defineOptions({ name: 'TabRedo' })

  const loading = ref(false)

  const handleRedo = () => {
    loading.value = true
  }
</script>
  
<style lang='less' scoped>
  
</style>