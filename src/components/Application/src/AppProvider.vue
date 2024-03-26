<!--
 * @Date: 2024-02-22 19:34:36
 * @LastEditors: phil_litian
-->
<script lang='ts'>
import { defineComponent, onMounted } from '@vue/runtime-core';
import { toRefs } from 'vue'
import { useAppStore } from '@s/modules/app'
import { prefixCls as defaultPrefixCls } from '@/settings/designSetting'
import { createBreakpointListen } from '@h/event/useBreakPoint'
import { createAppProviderContext } from './useAppContext'
import { MenuModeEnum } from '@/enums/menuEnum';
import { ThemeEnum } from '@/enums/appEnum';
const props = { prefixCls: { type: String, default: defaultPrefixCls } }

export default defineComponent({
  name: 'AppProvider',
  props,
  setup(props, { slots }) {
    const { prefixCls } = toRefs(props)
    const appStore = useAppStore()

    // 提供一个class的前缀
    createAppProviderContext({ prefixCls })

    const handleRestoreState = () => {
      appStore.setProjectConfig({
        menuSetting: {
          mode: MenuModeEnum.VERTICAL,
          accordion: false,
          theme: ThemeEnum.DARK
        }
      })
    }

    // 监听屏幕断点变化(正常情况下)
    createBreakpointListen(() => {
      
    })

    onMounted(() => {
      handleRestoreState()
    })

    return () => slots.default?.()
  }
  
})
</script>
  
<style lang='scss'>
  
</style>