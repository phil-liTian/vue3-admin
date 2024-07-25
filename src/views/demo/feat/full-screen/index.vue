<!--
 * @Date: 2024-07-25 13:17:48
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="全屏示例">
    <PCollapseContainer title="Window Full Screen">
      <PButton :disabled="isFullscreen" class="mr-2" @click="enter">Enter Window Full Screen</PButton>

      <PButton color="success" class="mr-2" @click="toggle">Toggle Window Full Screen</PButton>

      <PButton color="error" class="mr-2" @click="exit">Exit Window Full Screen</PButton>

      Current State: {{ isFullscreen }}
    </PCollapseContainer>

    <PCollapseContainer title="Dom Full Screen">
      <PButton @click="toggleDom">Enter Dom Full Screen</PButton>
    </PCollapseContainer>

    <div ref="domRef" class="w-1/2 h-64 bg-white flex items-center justify-center">
      <PButton type="primary" @click="toggleDom">{{ isFullscreenDom ? 'Exit Dom Full Screen' : 'Enter Dom Full Screen' }}</PButton>
    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { useFullscreen } from '@vueuse/core'
  const domRef = ref<Nullable<HTMLElement>>(null)

  const { toggle, isFullscreen, enter, exit } = useFullscreen()

  const { toggle: toggleDom, isFullscreen: isFullscreenDom } = useFullscreen(domRef)
</script>
  
<style lang='less' scoped>
  
</style>