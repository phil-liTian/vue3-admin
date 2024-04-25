<!--
 * @Date: 2024-04-22 21:54:27
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="滚动组件函数示例">
    <div class="scroll-wrap">
      <PScrollContainer ref="scrollRef">
        <ul class="p-3">
          <template v-for="index in 100" :key="index">
            <li class="p-2" :style="{ border: '1px solid #eee' }">{{ index }}</li>
          </template>
        </ul>
      </PScrollContainer>
    </div>

    <div class="my-4">
      <PButton class="mr-2" type="primary" @click="scrollTop(100)">滚动到100px位置</PButton>
      <PButton class="mr-2" type="primary" @click="scrollTop(800)">滚动到800px位置</PButton>
      <PButton class="mr-2" type="primary" @click="scrollTop(0)">滚动到顶部</PButton>
      <PButton class="mr-2" type="primary" @click="scrollBottom">滚动到底部</PButton>
    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ref, unref } from "vue";

  const scrollRef = ref(null)

  const getScroll = () => {
    const scroll = unref(scrollRef)
    if ( !scroll ) {
      throw new Error('sroll is null')
    }
    return scroll
  }

  function scrollTop(top: number) {
    getScroll().scrollTo(top)
  }

  function scrollBottom() {
    getScroll().scrollBottom()
  }

  
</script>
  
<style lang='less' scoped>

  .scroll-wrap {
    width: 50%;
    height: 300px;
    background-color: @component-background;

    li {
      list-style: none;
    }
  }
</style>