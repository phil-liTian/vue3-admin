<!--
 * @Date: 2024-04-12 13:53:36
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="modal组件封装">

    <Alert message="内外同时控制显示隐藏" />
    <PButton type="primary" class="my-4" @click="openModal1(true)">打开弹窗</PButton>

    <Alert message="自适应高度" show-icon />
    <Space>
      <PButton type="primary" class="my-4" @click="openModal2">打开弹窗</PButton>
    </Space>   


    <Alert message="内外数据交互" show-icon />
    <PButton type="primary" class="my-4" @click="send">打开弹窗并传递数据</PButton>

    <Alert message="使用 useModal 进行弹窗操作，默认可以拖动，可以通过 draggable参数进行控制是否可以拖动/全屏，并演示了在Modal内动态加载内容并自动调整高度" />
    
    <PButton class="my-4" type="primary" @click="openModal4">打开弹窗,加载动态数据并自动调整高度(默认可以拖动/全屏)</PButton>

    <!-- <Alert message="使用函数方式创建prompt, 适合较简单的表单内容" />
    <PButton type="primary" class="my-4" @click="handleCreatePrompt">创建prompt</PButton> -->

    <Alert message="使用动态组件的方式在页面内创建弹窗" show-icon />
    <Space>
      <PButton type="primary" class="my-4" @click="handleOpenModal(1)">打开弹窗1</PButton>
      <PButton type="primary" class="my-4" @click="handleOpenModal(2)">打开弹窗2</PButton>
      <PButton type="primary" class="my-4" @click="handleOpenModal(3)">打开弹窗2</PButton>
      <PButton type="primary" class="my-4" @click="handleOpenModal(4)">打开弹窗2</PButton>
    </Space>

    <component 
      v-if="currentModal" 
      v-model:open="modalOpen"
      :is="currentModal" />

    <Modal1 @register="register1" />
    <Modal2 @register="register2" />
    <Modal3 @register="register3" />
    <Modal4 @register="register4" />
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ComponentOptions, ref } from 'vue'
  import { Alert, Space } from 'ant-design-vue'
  import { useModal } from '@c/PBase/Modal/index'
  import Modal1 from './Modal1.vue'
  import Modal2 from './Modal2.vue'
  import Modal3 from './Modal3.vue'
  import Modal4 from './Modal4.vue'

  const currentModal = ref<Nullable<ComponentOptions>>(null)
  const modalOpen = ref(false)
  const [ register1, { openModal: openModal1 } ] = useModal()
  const [ register2, { openModal: openModal2 } ] = useModal()
  const [ register3, { openModal: openModal3 } ] = useModal()
  const [ register4, { openModal: openModal4 } ] = useModal()

  const send = () => {
    openModal3(true, {
      data: 'content',
      info: 'info'
    })
  }

  const handleOpenModal = (value: number) => {
    switch(value) {
      case 1: 
        currentModal.value = Modal1 as ComponentOptions
        break
      case 2:
        currentModal.value = Modal2 as ComponentOptions
        break
      case 3: 
        currentModal.value = Modal3 as ComponentOptions
        break
      default:
        currentModal.value = Modal4 as ComponentOptions
        break
    }

    modalOpen.value = true
  }

  const handleCreatePrompt = () => {

  }
</script>
  
<style lang='less' scoped>
  
</style>