<template>
  <div>
    <VFormItem
      :schema="schema">

    </VFormItem>
  </div>
</template>
  
<script lang='ts' setup>
  import { IVFormComponent } from '@/views/form-design/typings/v-form-component';
  import { PropType } from 'vue';
  import VFormItem from '../../VFormItem/index.vue'


  const props = defineProps({
    schema: {
      type: Object as PropType<IVFormComponent>,
      default: () => ({})
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>