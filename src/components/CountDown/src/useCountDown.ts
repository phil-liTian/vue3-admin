import { ref, unref } from "vue"

export function useCountdown(count: number) {
  const currentCount = ref(count)
  const isStart = ref(false)
  let timerId: ReturnType<typeof setInterval> | null
  function clear() {
    timerId && clearInterval(timerId)
  }

  function stop() {
    isStart.value = false
    clear()
    timerId = null
  }

  function start() {
    if ( unref(isStart) || !!timerId ) {
      return
    }

    isStart.value = true
    
    timerId = setInterval(() => {
      if ( currentCount.value === 1 ) {
        stop()
        currentCount.value = count
      } else {
        currentCount.value -= 1
      }
      console.log('currentCount-->', currentCount.value);
      
    }, 1000);
  }

  function reset() {
    currentCount.value = count
    stop()
  }


  return { start, reset, stop, isStart, currentCount }
}
