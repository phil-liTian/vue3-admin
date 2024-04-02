<template>
  <div>
    <span>{{ title }}</span>
    <PSelect 
      :options="dataList" />
  </div>
</template>
  
<script lang='ts' setup>
  import { propTypes } from "@/utils/propTypes";
  import { PropType } from "vue";

  defineProps({
    title: propTypes.string.def(''),
    dataList: {
      type: Array as PropType<LabelValueOptions>,
      default: () => []
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>