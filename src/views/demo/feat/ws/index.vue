<!--
 * @Date: 2024-07-23 10:12:34
 * @LastEditors: Please set LastEditors
-->
<template>
  <PageWrapper title="websocket">
    <div class="flex">
      <div class="w-1/3 bg-white p-4">
        <div class="flex">
          <span>连接状态</span>
          <Tag :color="getTagColor">{{ status }}</Tag>
        </div>

        <div class="flex">
          <Input disabled :value="state.server"></Input>
          <PButton>{{ getIsOpen ? '关闭连接' : '开启连接' }}</PButton>
        </div>
      </div>
      
      <div class="w-2/3 bg-white p-4">
        
      </div>

    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { computed, reactive, watchEffect } from "vue";
  import { Tag, Input } from 'ant-design-vue'
  import { useWebSocket } from '@vueuse/core'

  interface recordItem {
    id: number;
    time: number;
    res: string[]
  }

  const state = reactive({
    server: 'ws://localhost:3000',
    recordList: [] as recordItem[],
    sendValue: ''
  })

  const { status, open, send, close, data } = useWebSocket(state.server, {
    heartbeat: true
  })


  watchEffect(() => {
    if ( data.value ) {
      try{
        const res = JSON.parse(data.value)
        state.recordList.push(res)
      } catch(error) {
        state.recordList.push({
          id: Math.ceil(Math.random() * 1000000),
          time: new Date().getTime(),
          res: data.value
        })
      }
    }
  })

  const getIsOpen = computed(() => status.value === 'OPEN')
  const getTagColor = computed(() => getIsOpen.value ? 'success' : 'red')

  const handleSend = () => {
    send(state.sendValue)
    state.sendValue = ''
  }

  const toggle = () => {
    if (getIsOpen.value) {
      close()
    } else {
      open()
    }
  }
</script>
  
<style lang='less' scoped>
  
</style>