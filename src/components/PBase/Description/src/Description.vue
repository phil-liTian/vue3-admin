<!--
 * @Date: 2024-04-07 10:34:29
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
import { computed, defineComponent, PropType, ref, unref, useAttrs } from 'vue';
import type { MyDescriptionProps, DescInstance, DescItem } from './typing'
import { Descriptions } from 'ant-design-vue';
import { useDesign } from '@h/web/useDesign'
import { propTypes } from '@u/propTypes'
import { get } from 'lodash-es';
import { CollapseContainerOptions, PCollapseContainer } from '@c/PBase/Container/index';
  
const props = {
  title: propTypes.string.def(''),
  bordered: propTypes.bool.def(true),
  useCollapse: propTypes.bool.def(true),
  schema: {
    type: Array as PropType<DescItem[]>,
    default: () => []
  },
  data: {
    type: Object,
    default: () => ({})
  },
  collapseOptions: {
    type: Object as PropType<CollapseContainerOptions>,
    default: () => ({})
  },
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

    // 是否使用CollapseContainer 默认逻辑有title就使用collapseContainer
    const useWrapper = computed(() => !!unref(getMergeProps).title)

    const getProps = computed(() => {
      return {
        ...unref(getMergeProps),
        title: undefined,
      } as MyDescriptionProps
    })

    const getDescriptionProps = computed(() => {
      return {
        ...unref(attrs),
        ...unref(getProps)
      }
    })

    const getCollapseOptions = computed((): CollapseContainerOptions => {
      return {
        canExpand: false,
        ...unref(props.collapseOptions)
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

    function renderContainer() {
      // 如果useCollapse设置成false则不使用PCollapseContainer
      const content = props.useCollapse ? renderDesc() : <div>{ renderDesc() }</div>
      if ( !props.useCollapse ) {
        return content
      }
      const { title } = unref(getMergeProps)
      const { helpMessage } = unref(getCollapseOptions)

      return <PCollapseContainer title={title} helpMessage={helpMessage}>
          {{
            default: () => content
          }}
        </PCollapseContainer>
    }

    const methods:DescInstance = {
      setDescProps
    }

    emit('register', methods)

    return () => unref(useWrapper) ? renderContainer() : renderDesc()
  }
})
  
</script>
