<!--
 * @Date: 2024-04-02 16:23:09
 * @LastEditors: phil_litian
-->
<template>
  <Select
    :class="prefixCls"
    v-bind="getBindValue"
    @change="handleChange">
  </Select>
</template>
  
<script lang='ts' setup>
  import { computed, useAttrs } from 'vue'
  import { Select } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  const emits = defineEmits(['change'])
  defineOptions({ name: 'PSelect' })
  const { prefixCls } = useDesign('basic-select')
  const attrs = useAttrs()

  const getBindValue = computed(() => {
    return attrs
  })

  const handleChange = (value) => {
    emits('change', value)
  }
</script>
  
<style lang='less' scoped>
  
</style>