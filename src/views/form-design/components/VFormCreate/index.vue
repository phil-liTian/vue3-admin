<template>
  <div>
    <Form>
      <Row>
        <FormRender 
          :schema="schema"
          v-for="(schema, index) in noHiddenList" :key="schema.key">

        </FormRender>
      </Row>
    </Form>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue';
  import { Form, Row } from 'ant-design-vue'
  import FormRender from './components/FormRender.vue';
  import { useFormDesignState } from '../../hooks/useFormDesignState'
  const { formConfig } = useFormDesignState()

  const noHiddenList = computed(() => {
    return formConfig.value.schemas.filter(item => !item.hidden)
  })
</script>
  
<style lang='less' scoped>
  
</style>