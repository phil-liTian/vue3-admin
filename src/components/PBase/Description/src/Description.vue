<!--
 * @Date: 2024-04-07 10:34:29
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
import { computed, defineComponent, ref, unref, useAttrs } from 'vue';
import type { MyDescriptionProps, DescInstance, DescItem } from './typing'
import { Descriptions } from 'ant-design-vue';
import { useDesign } from '@h/web/useDesign'
import { propTypes } from '@u/propTypes'
import { get } from 'lodash-es';
  
const props = {
  bordered: propTypes.bool.def(true)
}

export default defineComponent({
  name: 'PDescription',
  emits: [ 'register' ],
  props,
  setup(props, { slots, emit }) {
    const propsRef = ref<Nullable<Partial<MyDescriptionProps>>>(null)
    const DescriptionsItem = Descriptions.Item
    const attrs = useAttrs()
    const { prefixCls } = useDesign('description')
    const getMergeProps = computed(() => {
      return {
        ...props,
        ...(unref(propsRef) as any)
      } as MyDescriptionProps
    })

    const getProps = computed(() => {
      return {
        ...unref(getMergeProps),
        // title: undefined
      } as MyDescriptionProps
    })

    const getDescriptionProps = computed(() => {
      return {
        ...unref(attrs),
        ...unref(getProps)
      }
    })

    const setDescProps = (descProps: Partial<MyDescriptionProps>): void => {
      propsRef.value = {
        ...(unref(propsRef) as Record<string, any>),
        ...descProps
      } as Record<string, any>
    }

    function renderLabel({ field, label }: DescItem) {
      return <div>{ label }</div>
    }

    function renderItem() {
      const { schema, data } = unref(getProps)

      // <DescriptionsItem></DescriptionsItem>
      return unref(schema).map(item => {
        const { render, field } = item
        function getContent() {
          const _data = unref(getProps)?.data
          const getField = get(_data, field)

          return getField
        }

        return <DescriptionsItem label={renderLabel(item)}>
          {() => (<div>{ getContent() }</div>)}  
        </DescriptionsItem>
      })
    }

    const renderDesc = () => {
      return (
        <Descriptions class={prefixCls} { ...unref(getDescriptionProps) as MyDescriptionProps }>
          { renderItem() }
        </Descriptions>
      )
    }

    const methods:DescInstance = {
      setDescProps
    }

    emit('register', methods)

    return () => renderDesc()
  }
})
  
</script>
