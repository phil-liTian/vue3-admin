<!--
 * @Date: 2024-06-11 13:51:04
 * @LastEditors: phil_litian
-->
<template>
  <Select 
    v-bind="$attrs"
    :options="getOptions"
    v-model:value="state"
    @dropdown-visible-change="handleFetch">

    <template #notFoundContent>
      
    </template>

  </Select>
</template>
  
<script lang='ts' setup>
  import { PropType, ref, computed, unref, watch } from 'vue';
  import { Select } from 'ant-design-vue';
  import { get, isEqual } from 'lodash-es'
  import { isArray } from '@/utils/is';
  import { propTypes } from '@/utils/propTypes';
  import { useRuleFormItem } from '@h/component/useFormItem'

  type OptionsItem = { label?: string, value?: string }
  const props = defineProps({
    api: {
      type: Function as PropType<(arg?: any) => Promise<OptionsItem>>,
      default: null
    },
    options: {
      type: Array as PropType<OptionsItem[]>
    },
    params: propTypes.any.def({}),
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    resultField: propTypes.string.def(''),
    immediate: propTypes.bool.def(true),
    alwaysLoad: propTypes.bool.def(false),
  })

  const optionsRef = ref<OptionsItem[]>([])
  const loading = ref(false)
  const isFirstLoaded = ref(false)
  const [ state ] = useRuleFormItem({ props })



  const getOptions = computed(() => {
    const { labelField, valueField, options } = props
    let data = unref(optionsRef).reduce((pre, cur) => {
      if ( cur ) {
        pre.push({
          label: get(cur, [labelField]),
          value: get(cur, [valueField]),
          key: get(cur, [valueField])
        })
      }
      return pre
    }, [])

    return data?.length ? data : options
  })
  const fetch = async () => {
    const { api, params } = props
    if ( !api ) return

    try {
      loading.value = true
      const res = await api(params)
      console.log('res', res);
      isFirstLoaded.value = true
      if ( isArray(res)) {
        optionsRef.value = res as OptionsItem[]
      }
    } catch (error) {
      console.warn(error)
    } finally {
      loading.value = false
      isFirstLoaded.value = false
    }
  }

  const handleFetch = (visible: boolean)=> {
    if ( visible ) {
      // 每次visible为true时重新加载数据
      if ( props.alwaysLoad ) {
        fetch()
      } else if( !props.immediate && !isFirstLoaded.value ) {
        fetch()
      }
    }
  }

  watch(() => props.params, (oldVal, newVal) => {
    if ( isEqual(oldVal, newVal) ) return
    
    fetch()
  }, { immediate: props.immediate, deep: true })
</script>
  
<style lang='less' scoped>
  
</style>