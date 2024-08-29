<!-- 
  @Description: 组件属性
-->
<template>
  <div class='properties-content'>
    <div class="properties-body">
      <Empty description="未选择组件" v-if='!formConfig.currentItem.key'/>

      <Form layout="vertical">  
        <!-- 可以设置自定义属性 -->
        <div v-if="formConfig.currentItem && formConfig.currentItem.componentProps">
          <FormItem v-for="item in inputOptions" :key="item.name" :label="item.label">
            <component 
              v-if="item.component"
              v-bind="item.componentProps"
              v-model:value="formConfig.currentItem.componentProps[item.name]"
              :is="item.component" />
          </FormItem>

          <FormItem label="控制属性">
            <Col v-for="item in controlOptions" :key="item.name">
              <Checkbox 
                v-model:checked="formConfig.currentItem.componentProps[item.name]">
                {{ item.label }}
              </Checkbox>
            </Col>
          </FormItem>
        </div>
        
        <FormItem label='关联字段'>
          <Select
            :options="linkOptions"
            mode="multiple" />
        </FormItem>
        
        <!-- 选项 -->
        <FormItem label="选项" v-if="showFormOptions">
          <FormOptions />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, ref, watch } from 'vue'
  import { Form, FormItem, Select, Empty, Col, Checkbox, RadioGroup, Input, InputNumber } from 'ant-design-vue'
  import { IBaseFormAttrs } from '../../config/formItemPropsConfig';
  import { useFormDesignState } from '../../../../hooks/useFormDesignState'
  import { 
    baseComponentControlAttrs, 
    baseComponentCommonAttrs,
    baseComponentAttrs } from '../../config/componentPropsConfig';
  import FormOptions from './FormOptions.vue';

  const { formConfig } = useFormDesignState()
  const allOptions = ref([] as IBaseFormAttrs[])

  // 监听当前选中的组件，动态设置当前组件的属性
  watch(() => formConfig.value.currentItem && formConfig.value.currentItem.component, () => {
    allOptions.value = []
    const { component } = formConfig.value.currentItem

    baseComponentControlAttrs.map(item => {
      item.category = 'control';
      if ( !item.includes ) {
        allOptions.value.push(item)
      } else if( item.includes.includes(component) ){
        allOptions.value.push(item)
      }
    })
    
    baseComponentCommonAttrs.map(item => {
      item.category = 'input'
      if ( item.includes ) {
        if ( item.includes.includes(component) ) {
          allOptions.value.push(item)
        }
      } else if ( item.excludes ) {
        if ( !item.excludes.includes(component) ) {
          allOptions.value.push(item)
        }
      } else {
        allOptions.value.push(item)
      }
    })

    if ( baseComponentAttrs[component] ) {
      baseComponentAttrs[component].map(item => {
        if ( [ 'Checkbox', 'Radio', 'Switch' ].includes(item.component as string) ) {
          item.category = 'control'
          allOptions.value.push(item)
        } else {
          item.category = 'input'
          allOptions.value.push(item)
        }
      })
    }
    
  }, { immediate: true, deep: true })
  // 可设置选项
  const showFormOptions = computed(() => ['Select', 'CheckboxGroup', 'RadioGroup', 'TreeSelect', 'Cascader', 'AutoComplete'].includes(formConfig.value.currentItem.component))

  // 控制选项
  const controlOptions = computed(() => allOptions.value.filter(v => v.category === 'control'))

  // input配置项
  const inputOptions = computed(() => allOptions.value.filter(v => v.category === 'input'))

  // 关联选项
  const linkOptions = computed(() => {
    const { schemas, currentItem } = formConfig.value
    return schemas.filter(item => item.key !== currentItem.key).map(item => {
      return { label: item.label, value: item.key }
    })
  })

</script>
  
<style lang='less' scoped>
  
</style>