<!--
 * @Date: 2024-03-03 11:27:03
 * @LastEditors: phil_litian
-->
<template>
  <page-wrapper>
    <template #headerContent>
      <workbench-header />
    </template>
    <div class="lg:flex">
      <div class="lg:w-7/10 w-full !mr-4 enter-x">
        <ProjectCard :loading="loading"/>
        <DynamicInfo :loading="loading" class="my-4" />
      </div>

      <div class="lg:w-3/10 w-full enter-x">
        <QuickNav :loading="loading"/>

        <Card class="my-4">
          <img src="../../../assets/svg/illustration.svg" />
        </Card>

        <SaleRadar />
      </div>
    </div>
  </page-wrapper>
</template>
  
<script lang='ts' setup>
import { ref } from 'vue'
import { Card } from 'ant-design-vue'
import WorkbenchHeader from './components/WorkbenchHeader.vue'
import ProjectCard from './components/ProjectCard.vue';
import DynamicInfo from './components/DynamicInfo.vue'
import QuickNav from './components/QuickNav.vue'
import SaleRadar from './components/SaleRadar.vue'
import { useI18n } from '@h/web/useI18n'
const { t } = useI18n('routes')

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 500);

</script>
  
<style lang='less' scoped>
  
</style>