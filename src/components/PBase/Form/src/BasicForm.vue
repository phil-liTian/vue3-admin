<!--
 * @Date: 2024-04-12 16:24:12
 * @LastEditors: phil_litian
-->
<template>
  <Form
    :class="getFormClass">
    <Row v-bind="getRow">
      <slot name="formHeader"></slot>
      <template v-for="schema in getSchema" :key="schema.field">
        <FormItem :schema="schema">
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </FormItem>
      </template>
      <FormAction>
        <template #[item]="data" v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </FormAction>
      <slot name="formFooter"></slot>
    </Row>
  </Form>
</template>
  
<script lang='ts' setup>
  import { computed, unref } from 'vue';
  import { Form, Row } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { cloneDeep } from 'lodash-es'
  import FormItem from './components/FormItem.vue'
  import FormAction from './components/FormAction.vue'
  import { basicProps } from './props'

  defineOptions({ name: 'PBasicForm' })
  const props = defineProps(basicProps)
  const { prefixCls } = useDesign('basic-form')
  
  const getProps = computed(() => { return { ...props } })

  const getRow = computed(() => {
    const { rowProps } = unref(getProps)

    return {
      ...rowProps
    }
  })

  const getSchema = computed(() => {
    const schemas = unref(getProps).schemas;
    console.log('schemas', schemas);
    

    return cloneDeep(schemas)
  })
  
  const getFormClass = computed(() => {
    return [
      prefixCls
    ]
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-basic-form';

  .@{prefix-cls} {
    .ant-form-item {

      &.suffix-item {
        .suffix {
          display: inline-flex;
          align-items: center;
          margin-top: 1px;
          padding-left: 6px;
          line-height: 1;
        }
      }
    }
  }
</style>