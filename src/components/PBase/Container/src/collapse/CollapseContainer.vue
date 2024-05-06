<!--
 * @Date: 2024-04-26 13:48:43
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
  import { defineComponent, ref, unref } from "vue";
  import { Skeleton } from 'ant-design-vue'
  import { CollapseTransition } from '@c/Transition/index'
  import CollapseHeader from './CollapseHeader.vue'
  import { getSlot } from '@/utils/helper/tsxHelper'
  import { propTypes } from "@/utils/propTypes";
  import { useDesign } from '@h/web/useDesign'
  import { isNil } from "@/utils/is";

  const props = {
    loading: propTypes.bool.def(false),
    canExpan: propTypes.bool.def(true),
    title: propTypes.string.def(''),
    helpMessage: propTypes.oneOfType([propTypes.string, propTypes.array])
  }
  export default defineComponent({
    name: 'PCollapseContainer',
    props,
    setup(props, { slots, expose }) {
      const { prefixCls } = useDesign('collapse-container')
      const show = ref(true)
      function handleExpand(val: boolean) {
        show.value = isNil(val) ? !show.value : val
      }
      expose({ handleExpand })
      return () => (
        <div class={unref(prefixCls)}>
          <CollapseHeader 
            {...props} 
            prefixCls={unref(prefixCls)}
            show={show.value} 
            onExpand={handleExpand} 
            v-slots={{
              title: slots.title
            }}/>
          <div class='p2'>
            <CollapseTransition enable={false}>
              {
                props.loading ? (<Skeleton active={props.loading} />) : (<div v-show={unref(show)}>
                  { getSlot(slots, 'default') }
                </div>)
              }
            </CollapseTransition>
          </div>
        </div>
      )
    }
  })
</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-collapse-container';

  .@{prefix-cls} {
    border-radius: 2px;
    background-color: @component-background;
    transition: all .3s ease-in-out;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;
      border-bottom: 1px solid @border-color-light;
    }

    &__action {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      text-align: right;
    }
  }
</style>