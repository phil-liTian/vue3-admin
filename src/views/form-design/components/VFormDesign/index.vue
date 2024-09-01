<template>
  <Layout :style="{ height: '100%' }">
    <!-- 控件 -->
    <LayoutSider
      width="270"
      :class="`${prefixCls}-sider`">

      <PCollapseContainer title='基础控件'>
        <CollapseItem 
          :list="baseComponent"
          :listDragPush="handleListPushDrag"
          @handle-list-push='handleListPush' />
      </PCollapseContainer>

      <PCollapseContainer title='自定义控件'>
        <CollapseItem />
      </PCollapseContainer>

      <PCollapseContainer title='布局控件'>
        <CollapseItem 
          :list="layoutComponents"
          :listDragPush="handleListPushDrag"
          @handle-list-push='handleListPush' />
      </PCollapseContainer>
    </LayoutSider>
    
    <!-- 设计样式 -->
    <LayoutContent>
      <Toolbar 
        @handle-preview="handleOpenModal(previewModal)"
        @handle-preview2="handleOpenModal(previewModal2)"
        @handle-open-json-modal="handleOpenModal(jsonModal)"
        @handle-open-code-modal="handleOpenModal(codeModal)"
        @handle-open-import-json-modal= handleOpenModal(importJsonModal)
        @handle-clear-form-items='handleClearFormItems' />
      <FormComponentPanel 
        @handle-set-select-item="handleSetSelectItem" />
    </LayoutContent>

    <!-- 控件样式自定义 -->
    <LayoutSider
      width="270"
      :class="`${prefixCls}-sider`">
      <PropsPanel>

      </PropsPanel>
    </LayoutSider>

    <JsonModal ref="jsonModal" />
    <ImportJsonModal ref='importJsonModal' />
    <VFormPreview ref='previewModal' />
    <VFormPreview2 ref="previewModal2" />
    <CodeModal ref="codeModal" />
  </Layout>
</template>
  
<script lang='ts' setup>
  import { ref, provide, Ref } from 'vue'
  import { cloneDeep } from 'lodash-es'
  import { useRefHistory, UseRefHistoryReturn } from '@vueuse/core'
  import { Layout, LayoutSider, LayoutContent } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'

  // modal
  import JsonModal from './components/modals/JsonModal.vue'
  import ImportJsonModal from './components/modals/ImportJsonModal.vue'
  import VFormPreview from '../VFormPreview/index.vue'
  import VFormPreview2 from '../VFormPreview/useForm.vue'
  import CodeModal from './components/modals/CodeModal.vue'

  // 主页面分布组件
  import CollapseItem from './modules/CollapseItem.vue'
  import PropsPanel from './modules/PropsPanel.vue'
  import FormComponentPanel from './modules/FormComponentPanel.vue'
  import Toolbar from './modules/Toolbar.vue'
  
  import { IFormConfig, IVFormComponent } from '../../typings/v-form-component'
  import { IFormDesignMethods } from '../../typings/form-type'
  import baseComponent, { layoutComponents } from '../../core/formItemConfig'
  import { generateKey } from '../../utils/index'
  import { globalConfigState } from '../../components/VFormDesign/config/formItemPropsConfig'

  const { prefixCls } = useDesign('form-design')

  const jsonModal = ref('')
  const importJsonModal = ref('')
  const previewModal = ref('')
  const previewModal2 = ref('')
  const codeModal = ref('')
  const formModel = ref({})
  const formConfig = ref<IFormConfig>({
    /**
     * @description 当前激活的表单组件属性设置面板
     */
    activeKey: 1,

    /**
     * @description 表单配置项
     */
    schemas: [],

    /**
     * @description 当前激活的表单组件
     */
    currentItem: {
      component: '',
      label: '',
      itemProps: {}
    },

    // 整体form布局
    layout: 'horizontal',

    // 标签布局
    labelLayout: 'flex',

    // label宽度
    labelWidth: 100,

    colon: true
  })

  const setGlobalConfigState = (item: IVFormComponent) => {
    item.itemProps = item.itemProps || {}
    item.colProps.span = globalConfigState.span
  }

  const historyReturn = useRefHistory(formConfig, {
    deep: true
  })

  // 设置fromConfig的值
  const setFormConfig = (config: IFormConfig) => {
    config.schemas = config.schemas || [];
    
    config.schemas.map(item => {
      item.colProps = item.colProps || {}
      item.componentProps = item.componentProps || {}
      item.itemProps = item.itemProps || {}
    })
    formConfig.value = config
  }

  // 设置当前选中项
  const handleSetSelectItem = (schema: IVFormComponent) => {
    formConfig.value.currentItem = schema
  }

  // 添加到表单中
  const handleBeforeColAdd = (newIndex: number, schemas: IVFormComponent[], isCopy = false) => {
    const item = schemas[newIndex]
    isCopy && generateKey(item)
    handleSetSelectItem(item)
  }

  /**
   * 添加组件
   * @param element 
   */
  const handleListPush = (element: IVFormComponent) => {
    
    const formItem = cloneDeep(element)
    generateKey(formItem)
    // 设置全局上下文属性
    setGlobalConfigState(formItem)
    
    if ( !formConfig.value.currentItem?.key ) {
      handleSetSelectItem(formItem)
      formConfig.value.schemas && formConfig.value.schemas.push(formItem)
      return
    }
    
    handleCopy(formItem, false)
  }

  const handleListPushDrag = (element: IVFormComponent) => {
    const formItem = cloneDeep(element)
    generateKey(formItem)
    // 设置全局上下文属性
    setGlobalConfigState(formItem)

    return formItem
  }

  const copyFormItem = (formItem: IVFormComponent) => {
    return cloneDeep(formItem)
  }

  // 拷贝
  const handleCopy = (item: IVFormComponent = formConfig.value.currentItem, isCopy = true) => {
    const key = formConfig.value.currentItem?.key
    const traverse = (schemas: IVFormComponent[]) => {
      schemas.forEach((formItem: IVFormComponent, index: number) => {
        if ( formItem.key === key ) {
          // 是拷贝:则直接在当前位置后面加一个相同的formItem;否则不是拷贝则在当前选中项的后面加一个新的formItem
          isCopy ? schemas.splice(index, 0, copyFormItem(formItem)) : schemas.splice(index + 1, 0, item)

          handleBeforeColAdd(index + 1, schemas, isCopy)
        }

        if ( ['Grid'].includes(formItem.component)) {
          formItem.columns.forEach(item => traverse(item.children))
        }
      })
    }

    if ( formConfig.value.schemas ) {
      traverse(formConfig.value.schemas)
    }
  }
  // 展示modal
  const handleOpenModal = (Modal) => {
    const config = cloneDeep(formConfig.value)
    Modal?.showModal(config)
  }

  const handleClearFormItems = () => {
    formConfig.value.schemas = []
    handleSetSelectItem({ component: '' })
  }

  const setFormModel = (key, value) => {
    formModel.value[key] = value
    console.log('formModel--->', formModel);

  }
  

  /**
   * 表单数据
   */
  provide('formModel', formModel)
  /**
   * 往外抛出设置表单数据方法
   */
  provide<(key: string, value: any) => void>('setFormModelMethod', setFormModel)

  /**
   * 将表单配置项传递到子组件中, 在子组件中可以用inject接受
   */
  // @ts-ignore
  provide<Ref<IFormConfig>>('formConfig', formConfig)

  /**
   * 注入历史记录
   */
  provide<UseRefHistoryReturn<any, any>>('historyReturn', historyReturn)

  /**
   * 注入全局的方法
   */
  provide<IFormDesignMethods>('formDesignMethods', {
    handleCopy,
    handleSetSelectItem,
    setFormConfig
  })
  
  // 跟baseForm组件打通(测试环节)
</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-form-design';

  [data-theme='dark'] {
    .@{prefix-cls}-sider {
      background-color: #1f1f1f;
    }
  }

  [data-theme='light'] {
    .@{prefix-cls}-sider {
      background-color: #fff;
    }
  }
</style>
