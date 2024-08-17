<template>
  <TreeSelect
    v-bind='getAttrs'
    :load-data="async ? onLoadData : null">
    
  </TreeSelect>
</template>
  
<script lang='ts' setup>
  import { propTypes } from '@/utils/propTypes';
  import { TreeSelect } from 'ant-design-vue'
  import { computed, onMounted, PropType, ref, unref } from 'vue';

  const props = defineProps({
    api: Function as PropType<(args?: any) => Promise<any>>,
    async: propTypes.bool.def(false),
    immediate: propTypes.bool.def(true),
    params: propTypes.any.def({}),
  })
  const loading = ref(false)
  const treeData = ref([])

  const getAttrs = computed(() => {
    return {
      treeData: unref(treeData)
    }
  })
  

  const onLoadData = (treeNode) => {
    return new Promise((resolve: (value: unknown) => void) => {
      if ( treeNode.children.length > 0 ) {
        resolve([])
        return
      }
    })
  }

  const fetch = async () => {
    const { api, params } = props
    if ( !api ) return
    loading.value = true
    try { 
      const res = await api(params)
      console.log('res', res);
      treeData.value = res.list
    } catch(error) {

    } finally {

    }
  }

  onMounted(() => {
    props.immediate && fetch()
  })

</script>
  
<style lang='less' scoped>
  
</style>