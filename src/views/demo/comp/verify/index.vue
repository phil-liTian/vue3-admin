<!--
 * @Date: 2024-04-30 14:48:57
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="拖动校验示例">
    <div class="flex p-4 bg-gray-700 items-center justify-center">
      <BasicDragVerify ref="el1" @success="handleSuccess" />
      <PButton class="ml-2" type="primary" @click="handleBtnClick(el1)">还原</PButton>
    </div>

    <div class="flex p-4 bg-gray-700 items-center justify-center">
      <BasicDragVerify ref="el2" @success="handleSuccess" circle />
      <PButton class="ml-2" type="primary" @click="handleBtnClick(el2)">还原</PButton>
    </div>

    <div class="flex p-4 bg-gray-700 items-center justify-center">
      <BasicDragVerify 
        ref="el3" 
        @success="handleSuccess" 
        text="拖动以进行校验" 
        success-text="校验成功"
        :bar-style="{
          backgroundColor: 'red'
        }" />
      <PButton class="ml-2" type="primary" @click="handleBtnClick(el3)">还原</PButton>
    </div>

    <!-- 自定义text -->
    <div class="flex p-4 bg-gray-700 items-center justify-center">
      <BasicDragVerify ref="el4">
        <template #text="{ isPassing }">
          <div v-if="isPassing">成功<RightOutlined /></div>
          <div v-else>拖动<BugOutlined /></div>
        </template>
      </BasicDragVerify>

      <PButton class="ml-2" type="primary" @click="handleBtnClick(el4)">还原</PButton>
    </div>

    <!-- 自定义actionIcon -->
    <div class="flex p-4 bg-gray-700 items-center justify-center">
      <BasicDragVerify ref="el5" @success="handleSuccess">
        <template #actionIcon="{ isPassing }">
          <BugOutlined v-if="isPassing" />
          <RightOutlined v-else />
        </template>
      </BasicDragVerify>
      <PButton class="ml-2" type="primary" @click="handleBtnClick(el5)">还原</PButton>
    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { BugOutlined, RightOutlined } from '@ant-design/icons-vue'
  import { useMessage } from '@h/web/useMessage'
  import { BasicDragVerify, DragVerifyActionType } from '@c/Verify/index'
  const el1 = ref(null)
  const el2 = ref(null)
  const el3 = ref(null)
  const el4 = ref(null)
  const el5 = ref(null)
  const { createSuccessModal } = useMessage()
  const handleSuccess = ({ time } ) => {
    createSuccessModal({ title: '温馨提示', content: `校验成功！耗时${time}s` })
  }

  const handleBtnClick = (elRef: Nullable<DragVerifyActionType>) => {
    if ( !elRef ) return
    elRef.resume()
  }
</script>
  
<style lang='less' scoped>
  
</style>