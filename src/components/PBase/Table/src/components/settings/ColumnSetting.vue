<!--
 * @Date: 2024-05-07 11:29:20
 * @LastEditors: phil_litian
-->
<template>
  <Tooltip>
    <template #title>
      <span>{{ t('component.table.settingColumn') }}</span>
    </template>

    <Popover
      placement="bottomLeft"
      :overlayClassName="`${prefixCls}__column-list`"
      @openChange="onOpenChange"
      trigger="click">
      <template #title>
        <div :class="`${prefixCls}__popover-title`">
          <Checkbox
            @change="onColumnAllSelectChange"
            :indeterminate="true"
            v-model:checked="isColumnAllSelected">
            {{ t('component.table.settingColumnShow') }}
          </Checkbox>
          <Checkbox 
            @change="onIndexColumnShowChange"
            v-model:checked="isIndexColumnShow">
            {{ t('component.table.settingIndexColumnShow') }}
          </Checkbox>
          <Checkbox 
            v-model:checked="isRowSelectionShow">
            {{ t('component.table.settingSelectColumnShow') }}
          </Checkbox>
          <PButton @click="onReset" type="link" size="small">{{ t('common.resetText') }}</PButton>
        </div>
      </template>
      
      <template #content>
        <PScrollContainer>
          <CheckboxGroup v-model:value="columnCheckedOptions" ref="columnOptionsRef">
            <template v-for="item in columnOptions" :key="item.value">
              <div :class="`${prefixCls}__check-item`">
                <DragOutlined class="table-column-drag-move" />
                <Checkbox :value="item.value">
                  {{ item.label }}
                </Checkbox>

                <Tooltip>
                  <template #title>
                    <span>{{ t('component.table.settingFixedLeft') }}</span>
                  </template>
                  <PIcon 
                    @click="onColumnFixedChange(item, 'left')"
                    :class="`${prefixCls}__fixed-left`"
                    icon="icon-park-outline:to-left" />
                </Tooltip>

                <Tooltip>
                  <template #title>
                    <span>{{ t('component.table.settingFixedRight') }}</span>
                  </template>
                  <PIcon 
                    @click="onColumnFixedChange(item, 'right')"
                    :class="`${prefixCls}__fixed-right`"
                    icon="icon-park-outline:to-right" />
                </Tooltip>
              </div>
            </template>
          </CheckboxGroup>
        </PScrollContainer>
      </template>

      <SettingOutlined />
    </Popover>
  </Tooltip>
</template>
  
<script lang='ts' setup>
  import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
  import { Tooltip, Popover, Checkbox } from 'ant-design-vue'
  import { cloneDeep } from "lodash-es"
  import Sortable  from 'sortablejs'
  import { DragOutlined } from '@ant-design/icons-vue'
  import { SettingOutlined } from '@ant-design/icons-vue'
  import { CheckboxChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
  import { useI18n } from '@h/web/useI18n'
  import { useDesign } from '@h/web/useDesign'
  import { isNil } from '@/utils/is'
  import { useTableContext } from '../../hooks/useTableContext'
  import { BasicColumn, ColumnOptionsType } from '../../types/table'
  const CheckboxGroup = Checkbox.Group
  const { t } = useI18n()
  const { prefixCls } = useDesign('basic-column-setting')
  const table = useTableContext()
  // 可拖动排序实例
  const columnOptionsRef = ref(null)
  // 是否显示序号列
  const isIndexColumnShow = ref(true)
  // 是否全选
  const isColumnAllSelected = ref(false)
  // 是否显示选择列
  const isRowSelectionShow = ref(false)
  // 列可选项
  const columnOptions = ref<ColumnOptionsType[]>([])
  // 选中项
  const columnCheckedOptions = ref<(string | number)[]>([])
  let isInnerChange = false

  let defaultColumnOptions: ColumnOptionsType[] = []
  // 默认值
  let defaultIsIndexColumnShow: boolean = false
  // 是否默认展示选中列
  let defaultIsRowSelectionShow: boolean = false

  // 更新选中状态
  const formUpdate = () => {
    // 更新选中列的状态
    columnCheckedOptionsUpdate()
  }

  // 初始化操作
  function init() {
    const columns = getTableColumns()
    
    let options: ColumnOptionsType[] = []

    for (const col of columns) {
      options.push({
        label: col.title,
        value: col.dataIndex,
        column: {
          defaultHidden: false
        }
      })
    }

    defaultIsIndexColumnShow = table.getBindValues.value.showIndexColumn || false

    // 控制是否显示序号列
    isIndexColumnShow.value = defaultIsIndexColumnShow
    // 真实可设置列的columns
    columnOptions.value = cloneDeep(options)
    defaultColumnOptions = options

    formUpdate()
  }

  // 重置默认值
  const onReset = () => {
    // 展示index序号列
    isIndexColumnShow.value = defaultIsIndexColumnShow

    onIndexColumnShowChange({
      target: { checked: defaultIsIndexColumnShow }
    })

    columnOptions.value = cloneDeep(defaultColumnOptions)

    formUpdate()
  }

  // 沿用逻辑
  // const sortableFix = async () => {
  //   // Sortablejs存在bug，不知道在哪个步骤中会向el append了一个childNode，因此这里先清空childNode
  //   // 有可能复现上述问题的操作：拖拽一个元素，快速的上下移动，最后放到最后的位置中松手
  //   if (columnOptionsRef.value) {
  //     const el = (columnOptionsRef.value as InstanceType<typeof Checkbox.Group>).$el;
  //     Array.from(el.children).forEach((item) => el.removeChild(item));
  //   }
  //   await nextTick();
  // };

  // 筛选显示的的列
  const columnIsShow = (col) => {
    return true
  }

  // 获取表格中的列
  const getTableColumns = () => {
    return table.getColumns().filter(col => columnIsShow(col))
  }

  const getColumns = computed(() => {
    return table.getColumns()
  })

  // 初始化操作
  const once = async () => {
    // await sortableFix()
    init()
  }

  once()

  // 设置表格的列
  const tableColumnSet = (columns: BasicColumn[]) => {
    isInnerChange = true
    table?.setColumns(columns)
  }

  // 更新表格列排序(此时要根据原始的当前的columnOptions对原始table.getColumns()进行排序)
  // 控制列显示/隐藏
  const tableColumnsUpdate = () => {
    let columns = cloneDeep(table.getColumns())

    // 方法一: 给columns增加weight属性 然后根据weight进行排序 时间复杂度o(n^2)
    
    columns = columnOptions.value.reduce((pre, cur, index) => {
      const columnMatchItem = columns.find(v => v.dataIndex === cur.value)
      
      pre.push({
        ...columnMatchItem,
        defaultHidden: cur.column?.defaultHidden || false,
        weight: cur.fixed === 'left' ? -1 : index,
        fixed: cur.fixed
      })
      
      return pre
    }, [])
    columns.sort((a, b) => a.weight - b.weight)

    // 方法二: 边删除 边在队尾插入当前元素 时间复杂度也为O(n^2)
    // let count = columns.length
    // for (const opt of columnOptions.value) {
    //   const colIndex = columns.findIndex(v => v.dataIndex === opt.value)
      
    //   if ( colIndex > -1 ) {
    //     const target = columns[colIndex]
    //     columns.splice(colIndex, 1)
    //     columns.splice(count++, 0, target)
    //   }
    // }

    tableColumnSet(columns)
  }


  // 打开popover
  const onOpenChange = async () => {
    await nextTick()
    if ( columnOptionsRef.value ) {
      const el = columnOptionsRef.value.$el
      Sortable.create(unref(el), {
        animation: 500,
        // delay: 400,
        onEnd: evt => {
          const { oldIndex, newIndex } = evt
          if ( isNil(oldIndex) || isNil(newIndex) || oldIndex === newIndex ) return
          // 原来的顺序
          const options = cloneDeep(columnOptions.value)

          if( oldIndex < newIndex ) {
            // 排序拖到后面 在原数组的新位置的后面加一个当前拖动的元素 移除原来的元素
            options.splice(newIndex + 1, 0, options[oldIndex])
            options.splice(oldIndex, 1)
          } else {
            // 排序拖到前面 在原数组的新位置后面加一个当前元素 移除原来的元素
            options.splice(newIndex, 0, options[oldIndex])
            options.splice(oldIndex + 1, 1)
          }

          columnOptions.value = options

          tableColumnsUpdate()
        }
      })
    }
  }

  // 固定列 type可指定左侧固定或者右侧固定
  const onColumnFixedChange = (opt: ColumnOptionsType, type: 'left' | 'right') => {
    const { fixed } = opt
    if ( type === 'left' ) {
      if ( fixed === 'right' || !fixed ) {
        opt.fixed = 'left'
      } else {
        opt.fixed = undefined
      }
    } else {
      if ( fixed === 'left' || !fixed ) {
        opt.fixed = 'right'
      } else {
        opt.fixed = undefined
      }
    }

    tableColumnsUpdate()
  }

  const onColumnAllSelectChange = (e) => {
    if ( columnCheckedOptions?.value.length < columnOptions.value.length ) {
      // 全选
      columnCheckedOptions.value = columnOptions.value.map(v => v.value)
    } else {
      // 反选
      columnCheckedOptions.value = []
    }
  }

  function columnCheckedOptionsUpdate() {
    columnCheckedOptions.value = columnOptions.value.filter(v => !v.column.defaultHidden).map(col => col.value)
  }

  function showIndexColumnUpdate(showIndexColumn) {
    isInnerChange = true
    table.setProps({ showIndexColumn })
  }

  // 是否展示序号列
  function onIndexColumnShowChange(e) {
    showIndexColumnUpdate(e.target.checked)
  }
  
  // 监听选中项
  watch(columnCheckedOptions, (checkedOpts) => {
    
    columnOptions.value.map(item => {

      if ( checkedOpts.includes(item.value) ) {
        item.column.defaultHidden = false
      } else {
        item.column.defaultHidden = true
        item.fixed = undefined
      }
    })

    tableColumnsUpdate()
  })

  // 监听table.getColumns()发生变化时, columnOptions也随之发生变化
  watch([getColumns], () => {
    if ( !isInnerChange ) {
      init()
    }
  })
  // onMounted(() => {
    
  // })

</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-basic-column-setting';

  .@{prefix-cls} {
    &__column-list {
      max-width: 360px;
      svg {
        width: 1em !important;
        height: 1em !important;
      }
    }

    &__popover-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__check-item {
      display: flex;
      align-items: center;
      padding: 4px 16px 8px 0;
      min-width: 100%;

      .table-column-drag-move {
        margin: 0 6px;
        cursor: move;
      }

      .ant-checkbox-wrapper {
        width: 100%;
      }
    }

    &__fixed_left,
    &__fixed_right {
      color: rgb(0 0 0 / 45%);
      cursor: pointer;
    }

    &__fixed_left {
      margin-right: 4px;
    }
  }
</style>