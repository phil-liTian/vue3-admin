<!--
 * @Date: 2024-04-12 16:25:22
 * @LastEditors: phil_litian
-->
<script lang="tsx">
  import { PropType, defineComponent } from "vue";
  import { Col, Divider, Form } from 'ant-design-vue'
  import { FormSchemaInner as FormSchema } from "../types/form";
  import { ComponentMap } from "../componentMap";
  import { isFunction } from "@/utils/is";
  import { getSlot } from "@/utils/helper/tsxHelper";

  export default defineComponent({
    props: {
      schema: {
        type: Object as PropType<FormSchema>,
        default: () => ({})
      }
    },
    setup(props, { slots }) {
      function getShow(): { isShow: boolean; isIfShow: boolean } {
        let isShow = true
        let isIfShow = true

        return { isShow, isIfShow }
      }

      function renderComponent() {
        const { component } = props.schema
        const Comp = ComponentMap.get(component) as ReturnType<typeof defineComponent>

        return <Comp />
      }

      function renderLabelHelpMessage() {
        const { label } = props.schema
        const getLabel = isFunction(label) ? label() : label

        return <span>{ getLabel }</span>
      }

      function renderItem() {
        const { component, slot, suffix } = props.schema
        if ( component === 'Divider' ) {
          return <Col span={24}>
            <Divider>{ renderLabelHelpMessage() }</Divider>
          </Col>
        } else if ( component === 'BasicTitle' ) {

        } else {
          const getContent = () => {
            return slot ? getSlot(slots, slot) : renderComponent()
          }
          const showSuffix = !!suffix
          const getSuffix = isFunction(suffix) ? suffix() : suffix;
          return (<Form.Item 
            class={{ 'suffix-item': showSuffix }} 
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
        getContent
      }
    },

    render() {
      return <Col>
        { this.getContent() }
      </Col>
    }
  })
</script>