<!--
 * @Date: 2024-05-07 11:29:47
 * @LastEditors: phil_litian
-->
<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ t('table.settingDens') }}</span>
    </template>
    <PDropdown 
      :selectedKeys="selectedKeysRef" 
      :dropMenuList="settingMenuList" 
      @menuEvent="handleMenuClick">
        <ColumnHeightOutlined />
    </PDropdown>
  </Tooltip>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { Tooltip } from 'ant-design-vue'
  import { ColumnHeightOutlined } from '@ant-design/icons-vue'
  import { useI18n } from '@h/web/useI18n'
  import { useDesign } from '@h/web/useDesign'
  import { useTableSettingStore } from '@s/modules/tableSetting'
  import { useTableContext } from '../../hooks/useTableContext'
  import { SizeType } from '../../types/table'
  defineOptions({ name: 'SizeSetting' })
  const { } = useDesign('')
  const { t } = useI18n('component')
  const table = useTableContext()
  const { setTableSetting }  = useTableSettingStore()
  const selectedKeysRef = ref<SizeType[]>([table.getSize()])
  const settingMenuList = [
    { text: t('table.settingDensDefault'), event: 'default' },
    { text: t('table.settingDensMiddle'), event: 'middle' },
    { text: t('table.settingDensSmall'), event: 'small' },
  ]

  const handleMenuClick = (item) => {
    selectedKeysRef.value = [item.event]
    setTableSetting(item.event)
    table.setProps({ size: item.event })
  }
</script>
  
<style lang='less' scoped>
  
</style>