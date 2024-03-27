<!--
 * @Date: 2024-03-26 22:25:05
 * @LastEditors: phil_litian
-->
<template>
  <div :class="getBreadClass">
    <Breadcrumb :routes="routes">
      <template #itemRender="{ route, routes: routesMatched, paths }">
        <p-icon v-if="getIcon(route)" :icon="getIcon(route)"></p-icon>
        <!-- 当前展示的路由 -->
        <span v-if="!hasRedirect(routesMatched, route)">
          {{ t( route.name || route.meta.title) }}
        </span>

        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ t(route.meta.title) }}
        </router-link>
      </template>
    </Breadcrumb>
  </div>
</template>
  
<script lang='ts' setup>
  import { type RouteLocationMatched, useRouter } from 'vue-router'
  import { computed, ref, watchEffect, watch } from 'vue'
  import { Breadcrumb } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  import { useGo } from '@h/web/usePage'
  import { propTypes } from '@u/propTypes'
  import { getAllParentPath } from '@/router/helper/menuHelper'
  import { getMenus } from '@/router/routes/menus'
  import { Menu } from '@/router/types'
  import { filter } from '@/utils/helper/treeHelper'

  const props = defineProps({
    theme: propTypes.oneOf(['light', 'dark']).def('light')
  })

  const { prefixCls } = useDesign('layout-breadcrumb')
  const { currentRoute } = useRouter()
  const { t } = useI18n()
  const { go } = useGo()
  const routes = ref<RouteLocationMatched[]>([])

  const getBreadClass = computed(() => {
    return [
      prefixCls,
      `${prefixCls}-${props.theme}`
    ]
  })

  function getMatched(menus: Menu[], parent: string[]) {
    let matched = []
    menus.forEach(item => {
      if ( parent.includes(item.path) ) {
        matched.push({
          ...item,
          name: item.meta?.title || item.name
        })
      }

      if ( item.children?.length ) {
        matched.push(...getMatched(item.children, parent))
      }
    })

    return matched
  }

  const getIcon = (route) => route.icon || route.meta.icon

  const hasRedirect = (routes: RouteLocationMatched[], route: RouteLocationMatched) => {
    return routes.indexOf(route) !== routes.length - 1;
  }
  
  const handleClick = (route, path, e: Event) => {
    e.preventDefault()
    const { meta, redirect, children } = route

    // 点击父节点且没有重定向 则无需跳转路由
    if ( children?.length && !redirect ) {
      e.stopPropagation()
      return
    }

    go(route.path)
  }

  // 监听currentRoute变化, 重新计算routes
  watch( ()=> currentRoute.value.path, async () => {
    const menus = await getMenus()
    let path = currentRoute.value.path
    // 返回所有祖先节点的path数组
    const parent = getAllParentPath(menus, path)
    // 找到一级路由
    const filterMenus = menus.filter(item => item.path === parent[0])
    // 处理一级路由匹配的children
    const matched = getMatched(filterMenus, parent)
    if ( !matched || !matched.length ) return

    let breadcrumbList = filterItem(matched)

    routes.value = breadcrumbList
  }, { immediate: true })
  

  function filterItem(list: RouteLocationMatched[]) {
    return filter(list, item => {
      const { meta } = item

      const { hideMenu } = meta

      if ( hideMenu ) {
        return false
      }

      return true
    })
  }
</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-layout-breadcrumb';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding: 0 8px;

    .ant-breadcrumb-link {
      .anticon {
        margin-right: 4px;
        margin-bottom: 2px;
      }
    }


    &-dark {
      .ant-breadcrumb-link {
        // color: rgb(255 255 255 / 60%);

        // a {
        //   color: rgb(255 255 255 / 80%);
        // }
      }
    }

    &-light {
      .ant-breadcrumb-link {
        color: @breadcrumb-item-normal-color;

        a {
          color: rgb(0 0 0 / 65%);
          &:hover {
            color: @primary-color;
          }
        }
      }

      .ant-breadcrumb-separator {
        color: @breadcrumb-item-normal-color;
      }
    }
  }
</style>