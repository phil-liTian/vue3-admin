<template>
  <Tree v-bind='getAttrs' v-model:value="state" :treeData="treeData">

  </Tree>
</template>
  
<script lang='ts' setup>
  import { computed, onMounted, PropType, ref, unref } from 'vue';
  import { Tree } from 'ant-design-vue'
  import { DataNode } from 'ant-design-vue/es/tree';
  import { propTypes } from '@/utils/propTypes';
  import { useRuleFormItem } from '@h/component/useFormItem'

  const props = defineProps({
    api: Function as PropType<(args?: any) => Promise<any>>,
    params: propTypes.any.def({}),
  })
  const loading = ref(false)
  const treeData = ref<DataNode[]>([])
  const [ state ] = useRuleFormItem({ props })
  const getAttrs = computed(() => {
    return {
      treeData: unref(treeData)
    }
  })

  const fetch = async () => {
    const { api, params } = props
    
    if ( !api ) return
    loading.value = true
    try { 
      const res = await api(params)
      console.log('res--->', res);

      treeData.value = res.list
    } catch(error) {

    } finally {

    }
  }

  onMounted(() => {
    fetch()
  })
</script>
  
<style lang='less' scoped>
  
</style>