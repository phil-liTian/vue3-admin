<template>
  <div>
    <div v-if="['Grid'].includes(formConfig.currentItem.component)">grid</div>

    <div v-else>
      <div v-for="(item, index) in formConfig.currentItem.componentProps[key]" :key="index">
        <div class="options-box">
          <Input v-model:value="item.label" />
          <Input v-model:value="item.value" class="options-value" />
          <a class="options-delete" @click="removeOptions(index)">
            <PIcon icon="ant-design:delete-outlined" />
          </a>
        </div>
      </div>
      <a @click="addOptions">
        <PIcon icon="ant-design:file-add-outlined" />添加选项
      </a>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { Input } from 'ant-design-vue'
  import { useFormDesignState } from '../../../../hooks/useFormDesignState'
  import { remove } from '../../../../utils/index'

  const { formConfig } = useFormDesignState()
  const key = formConfig.value.currentItem.component === 'TreeSelect' ? 'treeData' : 'options'

  const addOptions = () => {
    if ( !formConfig.value.currentItem.componentProps[key] ) {
      formConfig.value.currentItem.componentProps[key] = []
    }
    const len = formConfig.value.currentItem.componentProps[key].length + 1
    formConfig.value.currentItem.componentProps[key].push({
      label: `选项${len}`,
      value: `${len}`
    })
  }

  const removeOptions = (index: number) => {
    remove(formConfig.value.currentItem.componentProps[key], index)
  }
</script>
  
<style lang='less' scoped>
  .options-box {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    .options-value {
      margin: 0 5px;
    }
    .options-delete {
      flex-shrink: 0; // 不参与收缩
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #f5f5f5;
      text-align: center;
      line-height: 30px;
      color: #666;
      &:hover {
        color: #ff4d4f;
      }
    }
  }
</style>