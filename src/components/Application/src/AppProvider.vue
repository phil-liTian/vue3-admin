<!--
 * @Date: 2024-02-22 19:34:36
 * @LastEditors: phil_litian
-->
<script lang='ts'>
import { defineComponent } from '@vue/runtime-core';
import { toRefs } from 'vue'
import { prefixCls as defaultPrefixCls } from '@/settings/designSetting'
import { createAppProviderContext } from './useAppContext'
const props = { prefixCls: { type: String, default: defaultPrefixCls } }

export default defineComponent({
  name: 'AppProvider',
  props,
  setup(props, { slots }) {
    const { prefixCls } = toRefs(props)

    // 提供一个class的前缀
    createAppProviderContext({ prefixCls })

    return () => slots.default?.()
  }
  
})
</script>
  
<style lang='scss'>
  
</style>