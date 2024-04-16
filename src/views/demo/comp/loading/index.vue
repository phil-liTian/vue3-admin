<!--
 * @Date: 2024-04-14 20:36:40
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper v-loading="loadingRef" loading-tip="加载中..." title="Loading">
    <div ref="wrapRef">
      <Alert message="组件方式" />
      <PButton type="primary" class="my-4 mr-2" @click="openCompFullLoading">全屏loading</PButton>
      <PButton type="primary" class="my-4" @click="openCompAbsoluteLoading">容器内loading</PButton>
      <Loading 
        :loading="compState.loading"
        :tip="compState.tip"
        :background="compState.background"
        :absolute="compState.absolute"
        :theme="compState.theme" />

      <Alert message="函数方式" />

      <PButton type="primary" class="my-4 mr-2" @click="openFnFullLoading">全屏loading</PButton>
      <PButton type="primary" class="my-4" @click="openFnAbsoluteLoading">容器内loading</PButton>
    </div>
    
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { Alert } from 'ant-design-vue'
  import { Loading, useLoading } from '@c/Loading/index'
  import { ref, reactive } from 'vue';
  import { ThemeEnum } from '@/enums/appEnum';

  const loadingRef = ref(false)
  const wrapRef = ref<ElRef>(null)
  interface ICompState {
    absolute?: boolean,
    loading?: boolean,
    tip?: string,
    background?: string,
    theme?: ThemeEnum
  }
  
  const compState = reactive<ICompState>({
    absolute: false,
    loading: false,
    tip: '努力加载中...',
    background: 'rgba(111,111,111,.7)',
    theme: ThemeEnum.DARK
  })
  
  const [ openFullLoading, closeFullLoading ] = useLoading({ tip: '全屏加载中...', background: 'rgba(111,111,111,.7)', })
  const [ openCompLoading, closeCompLoading ] = useLoading({ target: wrapRef, props: { tip: '局部加载中...', absolute: true, background: 'rgba(111,111,111,.7)', } })


  function openLoading(absolute?: boolean) {
    compState.loading = true
    compState.absolute = absolute
    setTimeout(() => {
      compState.loading = false
    }, 2000);
  }

  // 组件方式打开loading
  const openCompFullLoading = () => {
    openLoading(false)
  }

  const openCompAbsoluteLoading = () => {
    openLoading(true)
  }

  // 函数方式打开loading
  const openFnFullLoading = () => {
    openFullLoading()
    

    setTimeout(() => {
      closeFullLoading()
    }, 1000);
  }

  const openFnAbsoluteLoading = () => {
    openCompLoading()

    setTimeout(() => {
      closeCompLoading()
    }, 1000);
  }

</script>
  
<style lang='less' scoped>
  
</style>