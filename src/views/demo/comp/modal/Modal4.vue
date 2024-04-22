<!--
 * @Date: 2024-04-22 09:15:18
 * @LastEditors: phil_litian
-->
<template>
  <PBasicModal
    draggable
    title="可自由拖拽的modal"
    :loading="loading"
    @open-change="handleShow">
    <ul v-if="!loading">
      <li v-for="index in lines" :key="index">加载数据{{ index }}</li>
    </ul>

    <template #insertFooter>
      <PButton danger :disabled="loading" type="primary" @click="update">点击我更新内容</PButton>
    </template>
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue';
  import { useModal } from '@/components/PBase/Modal/index'
  const [register, { setModalProps }] = useModal()
  const loading = ref(false)
  const lines = ref(10)
  const handleShow = (open: boolean) => {
    if ( open ) {
      loading.value = true
      setModalProps({ confirmLoading: true })
      setTimeout(() => {
        loading.value = false
        setModalProps({ confirmLoading: false })
      }, 1000);
    }
  }

  const update = () => {
    lines.value = Math.round(Math.random() * 30 + 5)
  }
</script>
  
<style lang='less' scoped>
  
</style>