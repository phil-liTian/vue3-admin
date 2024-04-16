/*
 * @Date: 2024-04-15 11:15:49
 * @LastEditors: phil_litian
 */
import { dateUtil } from '@u/dateUtils'
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core'
import { reactive, toRefs } from 'vue'


export function useNow(immediate = true) {
  let timer: IntervalHandler;
  const state = reactive({
    year: 0,
    month: 0,
    day: 0,
    hour: '',
    minute: '',
    second: '',
    meridiem: '',
    week: ''
  })

  const update = () => {
    const now = dateUtil()

    const hour = now.format('HH')
    const minute = now.format('mm')
    const second = now.format('ss')
    console.log('day', now.get('day'));
    
    state.year = now.get('y')
    state.month = now.get('M') + 1
    state.day = now.get('date')
    state.week = `星期${['日', '一', '二', '三', '四', '五', '六'][now.get('day')]}`
    state.hour = hour
    state.minute = minute
    state.second = second

    state.meridiem = now.format('A')
  }

  const start = () => {
    update()
    clearInterval(timer)
    timer = setInterval(() => update(), 1000);
  }

  const stop = () => {
    clearInterval(timer)
  }

  tryOnMounted(() => {
    immediate && start()
  })

  tryOnUnmounted(() => {
    stop()
  })


  return {
    ...toRefs(state),
    start,
    stop
  }
}
