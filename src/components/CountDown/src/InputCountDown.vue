<template>
  <Input :class="prefixCls" v-bind="$attrs" :size="size" :value="state">
    <template #addonAfter>
      <CountButton :count="count" :size="size" />
    </template>
  </Input>
</template>
  
<script lang='ts' setup>
  import { PropType } from 'vue'
  import { Input } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useRuleFormItem } from '@h/component/useFormItem'
  import CountButton from './CountButton.vue';
  const { prefixCls } = useDesign('countdown-input')
  defineOptions({ name: 'InputCountDown' })
  const props = defineProps({
    value: { type: String },
    size: {
      type: String,
      validator: (v: any) => {
        return ['small', 'default', 'large'].includes(v)
      },
      default: 'default'
    },
    count: { type: Number, default: 60 },
    sendCodeApi: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null
    }
  })

  const [ state ] = useRuleFormItem({ props })
</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-countdown-input';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding-right: 0;
      border: none;
      background-color: transparent;

      button {
        font-size: 14px;
      }
    }
  }
</style>
