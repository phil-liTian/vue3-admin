<template>
  <Transfer 
    :data-source="getDataSource" />
</template>
  
<script lang='ts' setup>
  import { Transfer } from 'ant-design-vue'
  import { computed, PropType } from 'vue';
  import { propTypes } from '@/utils/propTypes';

  const props = defineProps({
    api: Function as PropType<(args?: any) => Promise<any>>,
    async: propTypes.bool.def(false),
    immediate: propTypes.bool.def(true),
    params: propTypes.any.def({}),
  })

  const getDataSource = computed(() => {
    return []
  })
</script>
  
<style lang='less' scoped>
  
</style>