<template>
  <div class='copy-delete-box'>
    <a class='copy' :class="activeClass" @click.stop="handleCopy">
      <PIcon icon='ph:copy-bold' /> 
    </a>

    <a class='delete' :class="activeClass" @click.stop="handleDelete">
      <PIcon icon='fluent:delete-32-filled' />
    </a>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, PropType } from 'vue'
  import { IVFormComponent } from '@/views/form-design/typings/v-form-component';
  import { useFormDesignState } from '../../../hooks/useFormDesignState'
  import { remove } from '../../../utils/index'
  const props = defineProps({
    currentItem: {
      type: Object,
      default: () => ({})
    },
    schema: {
      type: Object as PropType<IVFormComponent>,
      default: () => ({})
    }
  })

  const { formDesignMethods, formConfig } = useFormDesignState()
  // 拷贝当前项
  const handleCopy = () => {
    formDesignMethods.handleCopy()
  }

  const activeClass = computed(() => props.schema.key === props.currentItem.key ? 'active' : 'unactivated')

  // 删除当前项
  const handleDelete = () => {
    const { key } = props.currentItem
    const traverse = (schemas: IVFormComponent[]) => {
      schemas.map((schema: IVFormComponent, index: number) => {
        
        if ( key === schema.key ) {
          remove(schemas, index)

          // 如果只有一个则是清空操作了；大于一个，则删除的不是最后一个，则选中的数据往后挪一个，否则向前挪一个
          let params: IVFormComponent = schemas.length === 1 ? { component: '' } : index > schemas.length - 1 ? schemas[index - 1] : schemas[index + 1]
          
          formDesignMethods.handleSetSelectItem(params)
        }
      })
    }

    if ( formConfig.value?.schemas ) {
      traverse(formConfig.value?.schemas)
    }
  }
</script>