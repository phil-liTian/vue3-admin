<!--
 * @Date: 2024-04-01 21:48:12
 * @LastEditors: phil_litian
-->
<template>
  <div :class="prefixCls">
    <span>{{ title }}</span>
    <PSelect 
      :class="`${prefixCls}-select`"
      :options="dataList" 
      :disabled="disabled"
      @change="handleChange" />
  </div>
</template>
  
<script lang='ts' setup>
  import { propTypes } from "@/utils/propTypes";
  import { useDesign } from '@h/web/useDesign'
  import { PropType } from "vue";
  import { handler } from "../handler";
  import { HandlerEnums } from "../enums";

  const props = defineProps({
    title: propTypes.string.def(''),
    dataList: {
      type: Array as PropType<LabelValueOptions>,
      default: () => []
    },
    def: {
      type: [String, Number] as PropType<string | number>
    },
    event: {
      type: Number as PropType<HandlerEnums>
    },
    disabled: propTypes.bool.def(false)
  })

  const { prefixCls } = useDesign('setting-select-item')

  const handleChange = (value) => {
    props.event && handler(props.event, value)
  }
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-setting-select-item';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    justify-content: space-between;


    &-select {
      width: 126px;
    }
  }
</style>