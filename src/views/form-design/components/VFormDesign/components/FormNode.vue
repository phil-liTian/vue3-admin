<template>
  <div 
    :class="['drag-move-box', { active: schema.key === formConfig.currentItem?.key }]"
    @click.stop="handleSelectItem">
    <div class="form-item-box">
      <VFormItem :schema='schema' />
    </div>

    <div class="show-key-box">
      {{ schema.label + (schema.field ? `/${schema.field}` : '') }}
    </div>

    <!-- formItem的操作区域 删除和拷贝 -->
    <FormNodeOperate 
      :schema="schema"
      :currentItem="formConfig.currentItem" />
  </div>
</template>
  
<script lang='ts' setup>
  import { PropType } from 'vue';
  import VFormItem from '../../VFormItem/index.vue'
  import { IVFormComponent } from '../../../typings/v-form-component';
  import FormNodeOperate from './FormNodeOperate.vue'
  import { useFormDesignState } from '@/views/form-design/hooks/useFormDesignState';

  const props = defineProps({
    schema: {
      type: Object as PropType<IVFormComponent>,
      default: () => ({})
    }
  })

  const { formConfig, formDesignMethods } = useFormDesignState()

  // 选择当前编辑的组件
  const handleSelectItem = () => {
    console.log('handleSelectItem', props.schema);
    
    formDesignMethods.handleSetSelectItem(props.schema)
  }
</script>