<!--
 * @Date: 2024-04-16 20:34:30
 * @LastEditors: phil_litian
-->
<template>
  <PBasicTitle :help-message="helpMessage">{{ title }}</PBasicTitle>
</template>
  
<script lang='ts' setup>
  import { propTypes } from '@/utils/propTypes';
  import { PBasicTitle } from '@c/Basic/index'
  import { PropType } from 'vue';
  defineOptions({ name: 'BasicModalHeader' })
  defineProps({
    title: propTypes.string.def(''),
    helpMessage: [String, Array] as PropType<string | string[]>
  })
</script>
  
<style lang='less' scoped>
  
</style>