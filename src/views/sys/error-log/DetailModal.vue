<template>
  <PBasicModal :title="t('errorLog.tableActionDesc')" v-bind="$attrs">
    <!-- <PDescription @register="register"></PDescription> -->
  </PBasicModal> 
</template>
  
<script lang='ts' setup>
  import { PropType } from 'vue'
  import { useI18n } from '@h/web/useI18n'
  import { ErrorLogInfo } from '#/store'
  import { useDescription } from '@c/PBase/Description/index'
  import { getDescSchema } from './data'
  const { t } = useI18n('sys')

  const props = defineProps({
    info: {
      type: Object as PropType<ErrorLogInfo>,
      default: () => ({})
    }
  })

  const [ register ] = useDescription({
    // schema: getDescSchema()
  })


</script>
  
<style lang='less' scoped>
  
</style>