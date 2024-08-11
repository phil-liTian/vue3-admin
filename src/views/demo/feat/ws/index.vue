<!--
 * @Date: 2024-07-23 10:12:34
 * @LastEditors: Please set LastEditors
-->
<template>
  <PageWrapper title="websocket">
    <div class="flex">
      <div class="w-1/3 bg-white p-4">
        <div class="flex items-center">
          <span class="mr-2">连接状态:</span>
          <Tag :color="getTagColor">{{ status }}</Tag>
        </div>

        <hr class="my-4" />
        
        <div class="flex">
          <Input disabled :value="state.server"></Input>
          <PButton @click="toggle" class="ml-2">{{ getIsOpen ? '关闭连接' : '开启连接' }}</PButton>
        </div>

        <p class="mt-4 text-lg font-medium">设置</p>
        <InputTextArea 
          v-model:value="state.sendValue"
          placeholder="需要发送到服务器的内容"
        />
        <PButton @click="handleSend" class="mt-4" block type="primary">发送</PButton>
      </div>
      
      <div class="w-2/3 bg-white p-4 ml-4">
        <span>消息记录：</span>

        <div>
          <ul>
            <li v-for="item in getList" :key="item.time">
              <div class="flex items-center">
                <span class="mr-2 text-primary mb-2">收到消息：</span>
                <span>{{ formateToDateTime(item.time) }}</span>
              </div>
              <div>
                {{ item.res }}
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { computed, reactive, watchEffect } from "vue";
  import { Tag, Input } from 'ant-design-vue'
  import { useWebSocket } from '@vueuse/core'
  import { formateToDateTime } from '@/utils/dateUtils'

  interface recordItem {
    id: number;
    time: number;
    res: string[]
  }
  const InputTextArea = Input.TextArea
  const state = reactive({
    server: 'ws://localhost:3000/test',
    recordList: [] as recordItem[],
    sendValue: ''
  })

  const { status, open, send, close, data } = useWebSocket(state.server, {
    heartbeat: true,
    autoReconnect: false
  })

  const getList = computed(() => {
    return [...state.recordList].reverse()
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