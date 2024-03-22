<!--
 * @Date: 2024-03-03 11:27:03
 * @LastEditors: phil_litian
-->
<template>
  <page-wrapper>
    <template #headerContent>
      <workbench-header />
    </template>

    <div>
      <div>
        <ProjectCard />
        <DynamicInfo />
      </div>

      <div>
        <QuickNav />

        <Card>
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
import { PageWrapper } from '@c/page'
import WorkbenchHeader from './components/WorkbenchHeader.vue'
import ProjectCard from './components/ProjectCard.vue';
import DynamicInfo from './components/DynamicInfo.vue'
import QuickNav from './components/QuickNav.vue'
import SaleRadar from './components/SaleRadar.vue'
import { useI18n } from '@h/web/useI18n'
const { t } = useI18n('routes')

const loading = ref(true)

</script>
  
<style lang='less' scoped>
  
</style>