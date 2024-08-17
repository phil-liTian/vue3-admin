<template>
  <RadioGroup v-bind='$attrs' v-model:value='state'  button-style='solid'>
    <template v-for="item in getOptions" :key="item.key">
      <RadioButton :value="item.value">{{ item.label }}</RadioButton>
    </template>
  </RadioGroup>
</template>
  
<script lang='ts' setup>
  import { isEqual } from 'lodash-es'
  import { isArray } from '@/utils/is';
  import { propTypes } from '@/utils/propTypes';
  import { useRuleFormItem } from '@h/component/useFormItem'
  import { Radio } from 'ant-design-vue'
  import { computed, PropType, ref, unref, watch } from 'vue';
  const RadioGroup = Radio.Group
  const RadioButton = Radio.Button

  type OptionsItem = {
    label: string;
    value: string | number;
  }

  const props = defineProps({
    api: {
      type: Function as PropType<(arg?: any) => Promise<OptionsItem[]>>,
      default: null
    },
    value: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>
    },
    params: propTypes.any.def({}),
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    resultField: propTypes.string.def(''),
    immediate: propTypes.bool.def(true)
  })
  const [ state ] = useRuleFormItem({ props })
  const loading = ref(false)
  const optionsRef = ref<OptionsItem[]>([])
  const getOptions = computed(() => {
    return unref(optionsRef) as OptionsItem[]
  })

  watch(() => props.params, (oldVal, newVal) => {
    if ( isEqual(oldVal, newVal) ) return
    
    fetch()
  }, { immediate: props.immediate, deep: true })  

  async function fetch() {
    const { api, params } = props
    if ( !api ) return

    try {
      loading.value = true
      const res = await api(params)
      console.log('res', res);
      
      if ( isArray(res)) {
        optionsRef.value = res as OptionsItem[]
      }
    } catch (error) {
      console.warn(error)
    } finally {
      loading.value = false
    }
  }
</script>
  
<style lang='less' scoped>
  
</style>