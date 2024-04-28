<!--
 * @Date: 2024-04-26 11:31:08
 * @LastEditors: phil_litian
-->
<template>
  <span>{{ date }}</span>
</template>
  
<script lang='ts' setup>
  import { ref, watch } from 'vue'
  import { isObject, useIntervalFn } from '@vueuse/core'
  import { useI18n } from '@h/web/useI18n'
  import { propTypes } from '@/utils/propTypes'
  import { isNumber, isString } from '@/utils/is'
  import { dateUtil, formateToDateTime, formatToDate } from '@/utils/dateUtils'

  const props = defineProps({
    value: propTypes.oneOfType([propTypes.number, propTypes.instanceOf(Date), propTypes.string]),
    mode: propTypes.oneOf(['date', 'dateTime', 'relative']).def('relative'),
    step: propTypes.number.def(60) // 定时更新
  })

  const ONE_SECONDS = 1000
  const ONE_MINUTES = ONE_SECONDS * 60
  const ONE_HOURS = ONE_MINUTES * 60
  const ONE_DAY = ONE_HOURS * 24

  const date = ref('')
  const { t } = useI18n('component')
  watch(() => props.value, () => setTime(), { immediate: true })
  // 定时刷新时间
  useIntervalFn(setTime, props.step * ONE_SECONDS)

  // 支持传时间戳 Date 或者string
  function getTime() {
    const { value } = props
    let time = 0
    if( isNumber(value) ) {
      // 时间戳
      const timeStamp = value.toString().length > 10 ? value : (value as number) * 1000
      time = new Date(timeStamp).getTime()
    } else if ( isString(value) ) {
      time = new Date(value).getTime()
    } else if ( value instanceof Date ) {
      time = value.getTime()
    }

    return time
  }

  function setTime() {
    const time = getTime()
    if ( props.mode === 'relative' ) {
      date.value = getRelativeTime(time)
    } else if ( props.mode === 'date' ) {
      date.value = formatToDate(time)
    } else if ( props.mode === 'dateTime' ) {
      date.value = formateToDateTime(time)
    }
  }

  function getRelativeTime(timeStamp: number) {
    const currentTime = Date.now()
    
    const diff = Math.abs(currentTime - timeStamp)
    const isBefore = dateUtil(timeStamp).isBefore(currentTime)

    let resStr = ''
    const disStr = isBefore ? t('time.before') : t('time.after')
    if ( diff < ONE_SECONDS ) {
      // 1s 内
      resStr = t('time.just')
    } else if ( diff < ONE_MINUTES ) {
      // 1分钟内
      resStr = parseInt(diff / ONE_SECONDS + '') + t('time.seconds') + disStr
    } else if ( diff < ONE_HOURS ) {
      // 1小时内
      resStr = parseInt(diff / ONE_MINUTES + '') + t('time.minutes')  + disStr
    } else if ( diff < ONE_DAY ) {
      // 1天内
      resStr = parseInt(diff / ONE_HOURS + '') + t('time.hours') + disStr
    } else if ( diff >= 2623860000 && diff <= 31567860000 ) {
      // 大于29天 59分 59秒 小于364天23小时59分59秒
      resStr = dateUtil(timeStamp).format('MM-DD-HH-mm');
    } else {
      resStr = dateUtil(timeStamp).format('YYYY')
    }
    console.log('resStr', resStr);
    

    return resStr
  }
</script>
  
<style lang='less' scoped>
  
</style>