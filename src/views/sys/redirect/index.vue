<!--
 * @Date: 2024-02-26 19:56:06
 * @LastEditors: phil_litian
-->
<template>
  <div>redirect</div>
</template>
  
<script lang='ts' setup>
  import { isArray } from '@/utils/is'
  import { unref } from 'vue'
  import { useRouter } from 'vue-router'
  const { currentRoute, replace } = useRouter()
  const { query, params } = unref(currentRoute)
  // 重定向类型_redirect_type可分为path(路径跳转), name(名称跳转)
  // query为跳转时所需的参数
  const { path, _redirect_type = 'path' } = params

  const _path: string = isArray(path) ? (path as any).join('/') : path

  if ( _redirect_type === 'name' ) {
    replace({
      name: _path,
      query
    })
  } else {
    replace({
      path: _path.startsWith('/') ? _path : `/${_path}`,
      query
    })
  }


  
</script>
  
<style lang='less' scoped>
  
</style>