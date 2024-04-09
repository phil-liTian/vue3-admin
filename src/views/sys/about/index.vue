<!--
 * @Date: 2024-03-20 21:16:55
 * @LastEditors: phil_litian
-->
<template>
  <pageWrapper title="关于">
    <template #headerContent>
      <a :href="GITHUB_URL" target="_blank">phil-admin</a>
      是一个基于vue3 + vite + ant-design-vue + Typescript的可开箱即用的中大型后台解决方案。
      <ul :class="`${prefixCls}-ul`">
        <li>1.处理了多种导航栏模式, 侧边导航自主开发</li>
        <li>2.项目参数配置灵活, 可满足B端客户定制化需求</li>
        <li>3.对路由处理: 
            3.1 根据角色权限动态addRoute,可有效杜绝无权限直接通过url访问页面的问题
            3.2 在导航守卫处增加页面守卫createPageGuard,可实现在页面通过listenerRouteChange监听路由变化。效率更高,因为路由状态的变化受页面渲染时间的影响,而页面渲染时间会很慢
        </li>
      </ul>
    </template>

    <PDescription @register="infoRegister" class="enter-x" />
    <PDescription @register="register" class="my-4 enter-x" />
    <PDescription @register="registerDev" class="enter-x" />
  </pageWrapper>
</template>
  
<script lang='ts' setup>
  import { useData } from './data'
  import { useDesign } from '@h/web/useDesign'
  import { GITHUB_URL } from '@/settings/siteSetting'
  const { infoRegister, register, registerDev } = useData()
  const { prefixCls } = useDesign('about')
</script>
  
<style lang='less' scoped>
  @prefix-cls-ul: ~'@{namespace}-about-ul';
  .@{prefix-cls-ul} {
    padding-left: 0;
    list-style: none;
    margin-top: 10px;
  }

</style>