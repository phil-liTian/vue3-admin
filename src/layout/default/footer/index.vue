<!--
 * @Date: 2024-03-03 10:28:36
 * @LastEditors: phil_litian
-->
<template>
  <Layout.Footer v-if='getShowLayoutFooter' ref='footerRef' :class='prefixCls'>
    <div>Copyright 2024 phil Admin</div>
  </Layout.Footer>
</template>
  
<script lang='ts' setup>
  import { Layout } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { computed, ref, unref } from 'vue';
  import { useRootSetting } from '@h/setting/useRootSetting';
  import { useLayoutHeight } from '../content/useContentViewHeight'
  defineOptions({ name: 'LayoutFooter' })

  const { prefixCls } = useDesign('layout-footer')
  const footerRef = ref(null)
  const { getShowFooter } = useRootSetting()

  const { setFooterHeight } = useLayoutHeight()

  const getShowLayoutFooter = computed(() => {
    if ( unref(getShowFooter) ) {
      const footerEl = unref(footerRef)?.$el;
      setFooterHeight(footerEl?.offsetHeight || 0)
    } else {
      setFooterHeight(0)
    }

    return unref(getShowFooter)
  })
</script>
  
<style lang='less' scoped>
  @prefixCls: ~'@{namespace}-layout-footer';

  @normal-color: rgba(0, 0, 0, 0.45);

  .@{prefixCls} {
    height: 75px;
    text-align: center;
    color: @normal-color;
  }
</style>