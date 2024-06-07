<!--
 * @Date: 2024-06-04 13:31:28
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
  import { PropType, computed, defineComponent, ref, unref, watchEffect } from "vue";
  import { Spin } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { CellComponent } from './CellComponent'
  import { BasicColumn } from "../../types/table";
  import { isBoolean, isFunction } from "@/utils/is";
  import { useTableContext } from "../../hooks/useTableContext";

  export default defineComponent({
    name: 'EditableCell',
    props: {
      value: {
        type: [String] as PropType<string>,
        default: ''
      },
      column: {
        type: Object as PropType<BasicColumn>,
        default: () => ({})
      },
      record: {
        type: Object as any
      }
    },
    setup(props) {
      const { prefixCls } = useDesign('editable-cell')
      const table = useTableContext()
      const currentValueRef = ref<any>(props.value)
      const isEdit = ref(false)
      const ruleVisible = ref(false)
      const ruleMessage = ref('')
      const spinning = ref<boolean>(false)
      const getComponent = computed(() => props.column?.editComponent || 'Input')
      const getRule = computed(() => !!props.column?.editRule);
      
      const getRuleVisible = computed(() => {
        return unref(ruleMessage)
      })

      const getComponentProps = computed(() => {
        let compProps = props.column?.editComponentProps ?? ({} as any)
        if ( isFunction(compProps) ) {
          compProps = compProps()
        }

        return {
          size: 'small',
          ...compProps
        }
      })

      const getValues = computed(() => {
        const value = unref(currentValueRef)

        const component = getComponent.value
        if ( !['Select', 'Radio'].includes(component) ) {
          return value
        }
        return '1223'
      })

      // 校验规则
      const handleSubmitRule = async () => {
        const { column } = props
        const { editRule } = column
        const currentValue = unref(currentValueRef)
        if ( editRule ) {
          if( isFunction(editRule) ) {
            const res = await editRule(currentValue);
            console.log('res', res);
            if ( res ) {
              ruleMessage.value = res
              ruleVisible.value = true
              return false
            } else {
              ruleMessage.value = ''
              ruleVisible.value = false
              return true
            }
          }
        }
      }

      const handleChange = (e: any) => {
        if ( e?.target && Reflect.has(e.target, 'value') ) {
          currentValueRef.value = e.target.value
        }

        handleSubmitRule()
      }

      // 提交 => 校验格式
      const handleSubmit = async () => {
        const pass = await handleSubmitRule()
        if ( !pass ) return false

        table.emits?.('edit-end')
      }

      // 回车
      const handleEnter = () => {
        handleSubmit()
      }

      const getRowEditable = computed(() => {
        const { editable } = props.record || {}
        return !!editable
      })

      watchEffect(() => {
        const { editable } = props.column
        if ( isBoolean(editable) || isBoolean(unref(getRowEditable)) ) {
          isEdit.value = !!editable || unref(getRowEditable)
        }
      })

      return {
        getComponentProps,
        isEdit,
        ruleMessage,
        getRule,
        getRuleVisible,
        spinning,
        prefixCls,
        currentValueRef,
        getValues,
        getComponent,
        handleChange,
        handleEnter
      }
    },
    render() {
      // { this.currentValueRef }
      return (
        <div class={this.prefixCls}>
          <div v-show={!this.isEdit}>
            <div class='cell-content'>
              { this.getValues }
            </div>
          </div>
          { this.isEdit && (
              <Spin spinning={this.spinning}>
                <div class={`${this.prefixCls}__wrapper`}>
                  <CellComponent
                    { ...this.getComponentProps }
                    rule={this.getRule}
                    popoverVisible={this.getRuleVisible}
                    ruleMessage={this.ruleMessage}
                    onChange={this.handleChange}
                    onPressEnter={this.handleEnter}
                    component={this.getComponent}>
                  </CellComponent>  
                </div>
              </Spin>
            )
          }
        </div>
      )
    }
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-editable-cell';

  .@{prefix-cls} {
    &__wrapper {
      .ant-select {
        min-width: calc(100% - 50px);
      }
    }
  }
</style>