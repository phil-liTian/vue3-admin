<!--
 * @Date: 2024-04-12 16:25:22
 * @LastEditors: phil_litian
-->
<script lang="tsx">
  import { PropType, computed, defineComponent, unref, toRefs } from "vue";
  import { Col, Divider, Form, message } from 'ant-design-vue'
  import { FormSchemaInner as FormSchema } from "../types/form";
  import { ComponentMap } from "../componentMap";
  import { isBoolean, isFunction } from "@/utils/is";
  import { getSlot } from "@/utils/helper/tsxHelper";
  import { isIncludeSimpleComponents } from "../helper";
  import { useItemLabelWidth } from '../hooks/useLabelWidth'
import { trigger } from "packages/hooks/src/useRequest/utils/cacheSubscribe";

  export default defineComponent({
    props: {
      schema: {
        type: Object as PropType<FormSchema>,
        default: () => ({})
      },
      allDefaultValues: {
        type: Object,
        default: () => ({})
      },
      formProps: {
        type: Object,
        default: () => ({})
      },
      formModel: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props, { slots }) {
      const { baseColProps } = props.formProps
      const { colProps } = props.schema

      const realColProps = { ...baseColProps, ...colProps }

      function getShow(): { isShow: boolean; isIfShow: boolean } {
        const { show, ifShow } = props.schema
        let isShow = true
        let isIfShow = true
        if ( isBoolean(show) ) {
          isShow = show
        }

        if ( isBoolean(ifShow) ) {
          isIfShow = ifShow
        }

        return { isShow, isIfShow }
      }


      function handleRules() {
        const { required } = props.schema
        function validator( value ) {
          if ( value === '' ) {
            return Promise.reject('error')
          }

          return Promise.reject('111')
        }
        let rules = [
          // { required, trigger: 'blur', validator, message: '12221' }
        ]
        console.log('rules', rules);
        
        return rules
      }

      const getValues = computed(() => {
        const { allDefaultValues, schema } = props
        return {
          field: schema.field,
          value: {
            ...allDefaultValues
          }
        }
      })

      const getDisable = computed(() => {
        const { disabled: globalDisabled } = props.formProps
        return globalDisabled
      })

      const getReadonly = computed(() => {
        const { readonly: globalReadonly } = props.formProps
        return globalReadonly
      })

      const getComponentProps = computed(() => {
        let { componentProps = {}, component, field } = props.schema

        if ( isFunction(componentProps) ) {
          componentProps = componentProps({}) || {}
        }

        if ( isIncludeSimpleComponents(component) ) {
          // Divider、BasicTitle
        }

        // let componentProps = {
        //   // orientation: "left",
        //   plain: true
        // }
        
        return componentProps
      })

      function renderComponent() {
        const { component, field } = props.schema
        const { size } = props.formProps
        const Comp = ComponentMap.get(component) as ReturnType<typeof defineComponent>

        const propsData = {
          size,
          readonly: unref(getReadonly),
          disabled: unref(getDisable),
          ...unref(getComponentProps)
        }

        // propsData.codeField = field
        // propsData.formValues = unref(getValues)

        // 给默认值
        const bindValue: Recordable<any> = {
          value: props.formModel[field]
        }

        const compAttr: Recordable<any> = {
          ...propsData,
          ...bindValue
        }

        return <Comp { ...compAttr } />
      }

      const { schema, formProps } = toRefs(props)
      const itemLabelWidthProps = useItemLabelWidth(schema, formProps)

      function renderLabelHelpMessage() {
        const { label } = props.schema
        const getLabel = isFunction(label) ? label() : label
        
        return <span>{ getLabel }</span>
      }

      function renderItem() {
        const { component, slot, suffix, field } = props.schema
        const { labelCol } = unref(itemLabelWidthProps)
        
        if ( component === 'Divider' ) {
          return <Col span={24}>
            <Divider {...unref(getComponentProps)}>{ renderLabelHelpMessage() }</Divider>
          </Col>
        } else if ( component === 'BasicTitle' ) {
          
        } else {
          const getContent = () => {
            return slot ? getSlot(slots, slot, unref(getValues)) : renderComponent()
          }
          const showSuffix = !!suffix
          const getSuffix = isFunction(suffix) ? suffix() : suffix;
          // const validator = val => {
          //   console.log('val', val);
            
          // }
            // rules={handleRules()}
          return (<Form.Item 
            name={ field }
            labelCol={labelCol}
            class={{ 'suffix-item': showSuffix }} 
            rules={handleRules()}
            label={renderLabelHelpMessage()}>
            <div style='display: flex'>
              <div>{ getContent() }</div>
              { showSuffix && <span class='suffix'>{ getSuffix }</span> }
            </div>
          </Form.Item>)
        }
      }

      const getContent = () => {
        return renderItem()
      }
      
      return {
        getShow,
        realColProps,
        getContent
      }
    },

    render() {
      const { isShow } = this.getShow()
      return <Col { ...this.realColProps } v-show={isShow}>
        { this.getContent() }
      </Col>
    }
  })
</script>