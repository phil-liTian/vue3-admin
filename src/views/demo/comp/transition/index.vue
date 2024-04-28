<!--
 * @Date: 2024-04-25 10:20:24
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="动画组件示例">
    <div>
      <Select 
        v-model:value="value"
        :options="options"
        :style="{ width: '150px' }"/>
      <PButton type="primary" class="ml-4" @click="onStart">start</PButton>
    </div>
    
    <component :is="transitionMap[value]">
      <div class="box" v-show="show"></div>
    </component>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { Select } from 'ant-design-vue'
  import { 
    FadeTransition, 
    ScaleTransition, 
    SlideYTransition,
    SlideYReverseTransition,
    SlideXTransition,
    SlideXReverseTransition,
    ScrollYTransition,
    ScrollYReverseTransition,
    ScrollXTransition,
    ScrollXReverseTransition,
    ScaleRotateTransition,
    ExpandTransition,
    ExpandXTransition
  } from '@c/Transition/index'

  const show = ref(true)
  const transitionMap = {
    FadeTransition,
    SlideYTransition,
    SlideYReverseTransition,
    SlideXTransition,
    SlideXReverseTransition,
    ScrollYTransition,
    ScrollYReverseTransition,
    ScrollXTransition,
    ScrollXReverseTransition,
    ScaleTransition,
    ScaleRotateTransition,
    // ExpandTransition,
    // ExpandXTransition
  }

  const value = ref('FadeTransition')

  const options = Object.keys(transitionMap).map(item => {
    const label = item.replace('Transition', '')
    return {
      label,
      value: item,
      key: item
    }
  })

  const onStart = () => {
    show.value = false
    setTimeout(() => {
      show.value = true
    }, 300);
  }
</script>
  
<style lang='less' scoped>
  .box {
    width: 150px;
    height: 150px;
    margin-top: 20px;
    background-color: rgb(126 170 236);
  }
</style>