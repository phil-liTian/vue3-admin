<template>
  <PButton v-bind="$attrs" :disabled="isStart" :loading="loading" @click="handleStart">{{ getButtonText }}</PButton>
</template>
  
<script lang='ts' setup>
  import { useI18n } from '@h/web/useI18n'
  import { computed, ref, unref } from 'vue';
  import { useCountdown } from './useCountDown'
  const { t } = useI18n('component.countdown')
  const props = defineProps({
    count: {
      type: Number,
    }
  })
  const loading = ref(false)
  const { start, isStart, currentCount } = useCountdown(props.count)

  const getButtonText = computed(() => {
    return unref(isStart) ? t('sendText', [currentCount.value]) :  t('normalText')
  })

  const handleStart = () => {
    start()
  }
</script>
  
<style lang='less' scoped>
  
</style>