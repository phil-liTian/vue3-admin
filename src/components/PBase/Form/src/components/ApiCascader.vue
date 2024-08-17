<template>
  <Cascader
    :options="options">

  </Cascader>
</template>
  
<script lang='ts' setup>
  import { Cascader } from 'ant-design-vue'
  import { PropType, ref } from 'vue';
  interface Options {
    label: string;
    value: string;
    children: Options[];
  }

  const props = defineProps({
    api: {
      type: Function as PropType<(arg?: any) => Promise<Options>>,
      default: null
    },
  })

  const options = ref([])
</script>
  
<style lang='less' scoped>
  
</style>