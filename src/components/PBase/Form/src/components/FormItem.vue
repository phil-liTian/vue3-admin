<!--
 * @Date: 2024-04-12 16:25:22
 * @LastEditors: phil_litian
-->
<script lang="tsx">
  import { PropType, computed, defineComponent, unref, toRefs, VNode, readonly } from "vue";
  import { Col, Divider, Form, message } from 'ant-design-vue'
  import { cloneDeep, upperFirst } from 'lodash-es'
  import { FormActionType, FormSchemaInner as FormSchema, RenderCallbackParams, RenderOpts } from "../types/form";
  import { ComponentMap } from "../componentMap";
  import { isBoolean, isFunction, isNull } from "@/utils/is";
  import { getSlot } from "@/utils/helper/tsxHelper";
  import { createPlaceholderMessage, isIncludeSimpleComponents } from "../helper";
  import { useItemLabelWidth } from '../hooks/useLabelWidth'
  import { PBasicHelp, PBasicTitle } from "@/components/Basic";

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
      },
      formActionType: {
        type: Object as PropType<FormActionType>
      },
      setFormModel: {
        type: Function as PropType<(key: string, value: any) => void>
      },
      isAdvanced: {
        type: Boolean,
      }
    },
    setup(props, { slots }) {
      const { baseColProps } = props.formProps
      const { colProps, renderColContent, colSlot } = props.schema

      const realColProps = { ...baseColProps, ...colProps }

      function getShow(): { isShow: boolean; isIfShow: boolean } {
        const { showAdvancedButton } = props.formProps
        const { show, ifShow } = props.schema
        // 标识当前item是否展示(true 展示; false 隐藏)
        const itemIsAdvanced = showAdvancedButton ? isBoolean(props.isAdvanced) ? props.isAdvanced : true : true
        let isShow = true
        let isIfShow = true
        if ( isBoolean(show) ) {
          isShow = show
        }

        if ( isBoolean(ifShow) ) {
          isIfShow = ifShow
        }
        
        isShow = isShow && itemIsAdvanced
        return { isShow, isIfShow }
      }

      /**
       * 当前rules可传的值有：
       * required: 是否必填
       * type: string | number 验证类型
       * min, max: 验证最大最小值
       * pattern: 正则校验
       * validator: 自定义校验的函数
       */
      function handleRules() {
        const { required, rules: defRules = [], component, label, rulesMessageJoinLabel } = props.schema
        let rules = cloneDeep(defRules)
        const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props.formProps
        const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel') ? rulesMessageJoinLabel : globalRulesMessageJoinLabel
        const assertLabel = joinLabel ? label : ''
        const defaultMsg = component ? createPlaceholderMessage(component) + assertLabel : assertLabel

        function validator( rule, value ) {
          const msg = rule.message || defaultMsg
          if ( value === undefined || isNull(value) ) {
            return Promise.reject(msg)
          }

          return Promise.resolve()
        }

        const getRequired = isFunction(required) ? (required as ((renderCallbackParams?: RenderCallbackParams) => void))() : required

        if ( getRequired ) {
          if ( !rules || !rules.length ) {
            const trigger = 'blur'
            rules = [{ required: getRequired, trigger, validator }]
          } else {

          }
        }
        
        return rules
      }

      const getValues = computed(() => {
        const { allDefaultValues, schema, formModel } = props
        return {
          field: schema.field,
          model: formModel,
          schema: schema,
          values: {
            ...allDefaultValues
          }
        } as unknown as RenderCallbackParams
      })

      const getDisable = computed(() => {
        const { dynamicDisabled } = props.schema
        const { disabled: globalDisabled } = props.formProps
        let disabled = globalDisabled
        if ( isFunction(dynamicDisabled) ) {
          disabled = ((dynamicDisabled as any)(getValues.value))
        }

        if ( isBoolean(dynamicDisabled) ) {
          disabled = dynamicDisabled
        }

        return disabled
      })

      const getReadonly = computed(() => {
        const { readonly: globalReadonly } = props.formProps
        return globalReadonly
      })

      const getComponentProps = computed(() => {
        const { formActionType, formModel } = props
        
        let { componentProps = {}, component, field } = props.schema

        if ( isFunction(componentProps) ) {
          componentProps = componentProps({ formActionType, formModel }) || {}
        }

        if ( isIncludeSimpleComponents(component) ) {
          // Divider、BasicTitle
          componentProps = Object.assign({
            plain: true,
            orientation: 'left'
          }, componentProps)
        }

        // let componentProps = {
        //   // orientation: "left",
        //   plain: true
        // }
        
        return componentProps
      })

      function renderComponent() {
        const { component, field, changeEvent = 'change', renderComponentContent } = props.schema
        const { size, autoSetPlaceholder } = props.formProps
        const Comp = ComponentMap.get(component) as ReturnType<typeof defineComponent>
        const eventKey = `on${upperFirst(changeEvent)}`
        
        const propsData = {
          allowClear: true,
          size,
          readonly: unref(getReadonly),
          disabled: unref(getDisable),
          ...unref(getComponentProps)
        }
        const isCheck = component && ['Switch'].includes(component)
        const on = {
          [eventKey]: (e) => {
            
            const target = e ? e.target : null
            const value = target ? (isCheck ? target.check : target.value) : e
            
            props.setFormModel(field, value)
            // 如果componentProps中有eventKey，则执行
            if ( propsData[eventKey] ) {
              propsData[eventKey](e)
            }
          }
        }

        const isCreatePlaceholder = !propsData.disabled && autoSetPlaceholder
        if ( isCreatePlaceholder ) {
          propsData.placeholder = unref(getComponentProps).placeholder || createPlaceholderMessage(component)
        }

        // propsData.codeField = field
        // propsData.formValues = unref(getValues)

        // 给默认值
        const bindValue: Recordable<any> = {
          [isCheck ? 'checked' : 'value']: props.formModel[field]
        }

        const compAttr: Recordable<any> = {
          ...propsData,
          ...bindValue,
          ...on
        }

        if ( !renderComponentContent ) {
          return <Comp { ...compAttr } />
        }


        // 渲染组件插槽
        const compSlot = isFunction(renderComponentContent) ?
          {
            ...(renderComponentContent as (enderCallbackParams: RenderCallbackParams, opts: RenderOpts) => any)(unref(getValues), { disabled: unref(getDisable), readonly: unref(getReadonly) })
          } : {
            default: () => renderComponentContent
          }
          
          return <Comp { ...compAttr }>{ compSlot }</Comp>
      }

      const { schema, formProps } = toRefs(props)
      const itemLabelWidthProps = useItemLabelWidth(schema, formProps)
  
      function renderLabelHelpMessage() {
        const { label, helpMessage } = props.schema
        const getLabel = isFunction(label) ? (label as (() => string | VNode))() : label

        const renderLabel = getLabel

        const getHelpMessage = isFunction(helpMessage) ? (helpMessage as (( renderCallbackParams?: RenderCallbackParams ) => string | string[]))(unref(getValues)) : helpMessage

        if ( !getHelpMessage ) {
          return renderLabel
        }
        
        return <span>
          { renderLabel }
          <PBasicHelp placement='top' class='mx-1' text={getHelpMessage}></PBasicHelp>
        </span>
      }

      function renderItem() {
        const { component, slot, suffix, field, render } = props.schema
        const { labelCol } = unref(itemLabelWidthProps)
        const opts = { disabled: getDisable.value, readonly: getReadonly.value }
        if ( component === 'Divider' ) {
          return <Col span={24}>
            <Divider {...unref(getComponentProps)}>{ renderLabelHelpMessage() }</Divider>
          </Col>
        } else if ( component === 'BasicTitle' ) {
          return <PBasicTitle>{ renderLabelHelpMessage() }</PBasicTitle>
        } else {
          const getContent = () => {
            return slot ? getSlot(slots, slot, { ...unref(getValues), ...opts }) : render ? render(unref(getValues), opts) : renderComponent()
          }
          const showSuffix = !!suffix
          const getSuffix = isFunction(suffix) ? (suffix as (() => string | VNode))() : suffix;
          return (<Form.Item
            name={ field }
            labelCol={labelCol}
            class={{ 'suffix-item': showSuffix }} 
            rules={handleRules()}
            label={renderLabelHelpMessage()}>
            <div style='display: flex'>
              <div style='flex: 1'>{ getContent() }</div>
              { showSuffix && <span class='suffix'>{ getSuffix }</span> }
            </div>
          </Form.Item>)
        }
      }

      const getContent = () => {
        const opts = { disabled: getDisable.value, readonly: getReadonly.value }
        return colSlot ? getSlot(slots, colSlot, { ...unref(getValues), ...opts }) :
          renderColContent ? renderColContent(unref(getValues), opts) : renderItem()
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