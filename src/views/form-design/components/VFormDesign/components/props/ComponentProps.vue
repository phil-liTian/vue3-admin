<!-- 
  @Description: 组件属性
-->
<template>
  <div class='properties-content'>
    <div class="properties-body">
      <Empty description="未选择组件" v-if='!formConfig.currentItem.key'/>

      <Form>  
        <!-- 可以设置自定义属性 -->
        <div v-if="formConfig.currentItem && formConfig.currentItem.componentProps">
          <FormItem v-for="item in inputOptions" :key="item.name" :label="item.label">
            <component :is="item.component" />
          </FormItem>

          <FormItem label="控制属性">
            <Col v-for="item in controlOptions" :key="item.name">
              <Checkbox>
                {{ item.label }}
              </Checkbox>
            </Col>
          </FormItem>
        </div>
        

        <FormItem label='关联字段'>
          <Select 
            mode="multiple" />
        </FormItem>
        

        <!-- 选项 -->
        <FormItem label="选项">
          
        </FormItem>
      </Form>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, ref, watch } from 'vue'
  import { Form, FormItem, Select, Empty, Col, Checkbox } from 'ant-design-vue'
  import { IBaseFormAttrs } from '../../config/formItemPropsConfig';
  import { useFormDesignState } from '../../../../hooks/useFormDesignState'
  import { 
    baseComponentControlAttrs, 
    baseComponentCommonAttrs } from '../../config/componentPropsConfig';

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

    console.log('allOptions', allOptions);
  })

  // 控制选项
  const controlOptions = computed(() => allOptions.value.filter(v => v.category === 'control'))

  // input配置项
  const inputOptions = computed(() => allOptions.value.filter(v => v.category === 'input'))

</script>
  
<style lang='less' scoped>
  
</style>