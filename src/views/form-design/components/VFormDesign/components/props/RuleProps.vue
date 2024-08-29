<template>
  <div class="rule-props-content">
    <Form v-if="formConfig.currentItem.componentProps['rules']" layout="horizontal">
      <div 
        v-for="(item, index) in formConfig.currentItem.componentProps['rules']" 
        :key="index"
        class="rule-props-item">
        <PIcon 
          class="rule-props-item-close"
          @click="removeRule(index)"
          icon="ant-design:close-circle-filled" />
        <FormItem label="正则" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <AutoComplete v-model:value="item.pattern" placeholder="请输入正则表达式" />
        </FormItem>
        <FormItem label="文案" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <Input v-model:value="item.message" placeholder="请输入提示文案" />
        </FormItem>
      </div>
    </Form>

    <a @click="addRules">
      <PIcon icon="ant-design:file-add-outlined" />添加正则
    </a>
  </div>
</template>
  
<script lang='ts' setup>
  import { Form, FormItem, Input, AutoComplete } from 'ant-design-vue'
  import { useFormDesignState } from '../../../../hooks/useFormDesignState'
  import { remove } from '../../../../utils/index'
  const { formConfig } = useFormDesignState()
  const addRules = () => {
    if ( !formConfig.value.currentItem.componentProps['rules'] ){
      formConfig.value.currentItem.componentProps['rules'] = []
    }
    formConfig.value.currentItem.componentProps['rules'].push({ message: '', pattern: '' })
  }

  const removeRule = index => {
    remove(formConfig.value.currentItem.componentProps['rules'], index)
    if ( formConfig.value.currentItem.componentProps['rules'].length === 0 ) {
      delete formConfig.value.currentItem.componentProps['rules']
    }
  }
</script>
  
<style lang='less' scoped>
  .rule-props-content {
    .rule-props-item {
      position: relative;
      margin-bottom: 5px;
      padding: 3px 2px;
      border-radius: 5px;
      background-color: #f0eded;
      :deep(.ant-form-item) {
        margin-bottom: 0;
        line-height: 32px;

        .ant-form-item-row {
          flex-direction: row;
        }
      }

      &-close {
        position: absolute;
        top: -2px;
        right: -2px;
        color: #ccc;
        cursor: pointer;
        &:hover {
          color: #00c;
        }
      }
    }
  }
</style>
