<template>
  <RadioGroup v-bind="$attrs" v-model:value="state" button-style="solid">
    <template v-for="item in getOptions" :key="item.value">
      <RadioButton :value="item.value">{{ item.label }}</RadioButton>
    </template>
  </RadioGroup>
</template>
  
<script lang='ts' setup>
  import { computed, PropType } from 'vue';
  import { isString } from '@/utils/is';
  import { Radio } from 'ant-design-vue'
  import { useRuleFormItem } from '@h/component/useFormItem'
  type OptionsItem = { label: string, value: string }
  type RadioItem = string | OptionsItem
  const RadioGroup = Radio.Group
  const RadioButton = Radio.Button
  const props = defineProps({
    options: {
      type: Array as PropType<RadioItem[]>,
      default: () => []
    },
    value: {
      type: String
    }
  })

  const getOptions = computed(() => {
    const { options } = props
    if ( !options || !options.length ) return []
    const isStringArr = options.some(v => isString(v))
    if ( !isStringArr ) return options as OptionsItem[]

    return options.map(item => ({ label: item, value: item })) as OptionsItem[]
  })
  const [ state ] = useRuleFormItem({ props })
</script>
  
<style lang='less' scoped>
  
</style>