<!--
 * @Date: 2024-04-26 15:42:55
 * @LastEditors: phil_litian
-->
  
<script lang='tsx'>
  import { computed, defineComponent, unref } from "vue";
  import { propTypes } from "@/utils/propTypes";
  import { PBasicTitle, PBasicArrow } from '@c/Basic/index'
  import { useDesign } from "@h/web/useDesign";
  const props = {
    title: propTypes.string.def(''),
    prefixCls: propTypes.string.def(''),
    show: propTypes.bool.def(true),
    helpMessage: propTypes.oneOfType([propTypes.string, propTypes.array])
  }
  export default defineComponent({
    props,
    emits: ['expand'],
    setup(props, { emit, slots }) {
      const { prefixCls } = useDesign('collapse-container')
      const _prefixCls = computed(() => props.prefixCls || unref(prefixCls))
      return () => (
        <div class={[`${unref(_prefixCls)}__header`, 'px-2', 'py-5']}>
          <PBasicTitle helpMessage={props.helpMessage}>
            { slots.title?.() || props.title }
          </PBasicTitle>

          <div class={`${unref(_prefixCls)}__action`}>
            <PBasicArrow director={props.show ? 'up' : 'down'} onClick={() => emit('expand')} />
          </div>
        </div>

      )
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>