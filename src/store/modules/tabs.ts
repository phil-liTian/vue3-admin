/*
 * @Date: 2024-04-03 13:50:42
 * @LastEditors: phil_litian
 */
import type { RouteLocationNormalized, Router } from 'vue-router'
import { defineStore } from "pinia";
import { useRedo, useGo } from '@h/web/usePage'
import { useAppStore } from '@s/modules/app'
import { getRawRoute } from '@/utils';
import { REDIRECT_ROUTE } from '@/router/routes/basic'
import { toRaw, unref } from 'vue';
import { PageEnum } from '@/enums/pageEnum';

const { getMultipleSetting } = useAppStore()
export interface MultipleTabState {
  tabList: RouteLocationNormalized[],
  cacheTabList: Set<String>
}
const { cache } = getMultipleSetting
const getToTarget = (tabItem: RouteLocationNormalized) => {
  const { path, query, params } = tabItem

  return {
    path,
    query: query || {},
    params: params || {}
  }
}

const goToPage = (router: Router) => {
  const { go } = useGo(router)
  go(unref(router.currentRoute).fullPath)
}

export const useTabs = defineStore({
  id: 'app-multiple-tab',

  state: (): MultipleTabState => {
    return {
      cacheTabList: new Set(),
      tabList: cache ? [] : [],
    }
  },

  getters: {
    getTabList(state): RouteLocationNormalized[] {
      return state.tabList
    }
  },

  actions: {
    updateCacheTab() {
      const cacheMap: Set<string> = new Set()
      for (const tab of this.tabList) {
        console.log('tab', tab);
      }

      this.cacheTabList = cacheMap
    },

    clearCacheTab() {
      this.cacheTabList = new Set()
    },

    bulkCloseTab(pathList: string[]) {
      this.tabList = this.tabList.filter(v => !pathList.includes(v.fullPath))
      console.log('this.tabList', this.tabList);
      
    },

    // add Tab
    addTab(route) {
      const { path, fullPath, name, query, params, meta } = getRawRoute(route)
      // 404 页面无需添加到tabList
      // 重定向页面无需添加到tabList
      // || [REDIRECT_ROUTE.name].includes(name as string)
      if ( path === PageEnum.BASIC_LOGIN || PageEnum.ERROR_PAGE === path || !name ) {
        return
      }

      let updateIndex = -1
      const tabHasExits = this.tabList.some((tab, tabIndex) => {
        updateIndex = tabIndex
        return (tab.fullPath || tab.path) === (fullPath || path)
      })
      if ( tabHasExits ) {
        // 已存在 则更新
        // toRaw: 将proxy对象转换成原始类型
        const curTab = toRaw(this.tabList)[updateIndex]
        if ( !curTab ) return 
        curTab.path = path || curTab.path
        curTab.fullPath = fullPath || curTab.fullPath
        curTab.query = query || curTab.query
        // 替换
        this.tabList.splice(updateIndex, 1, curTab)
      } else {
        // TODO: 控制动态路由打开数
        this.tabList.push(route)
      }
    },

    // close Tab
    closeTab(tab: RouteLocationNormalized, router: Router) {
      const close = (route: RouteLocationNormalized) => {
        const { fullPath } = route

        const index = this.tabList.findIndex(v => v.fullPath === fullPath)
        index !== -1 && this.tabList.splice(index, 1)
      }
      const { currentRoute, replace } = router
      const { path } = unref(currentRoute)
      
      if ( path !== tab.path ) {
        // 删除的不是当前激活的tab的时候，则移除当前点击的tab
        close(tab)
        return
      }

      close(currentRoute.value)
    },

    // 通过key关闭tab(关闭后需要切换到tabList中其他路由)
    async closeTabByKey(key: string, router: Router) {
      const index = toRaw(this.tabList).findIndex(v => ((v.fullPath || v.path) === key))
      if ( index !== -1 ) {
        await this.closeTab(this.tabList[index], router)
        const { currentRoute, replace } = router
        // 检查当前路由是否在tabList中
        const isActivated = this.tabList.findIndex(item => item.fullPath === currentRoute.value.fullPath)
        // 不在tabList中（移除后基本都不在当前的tabList中）切换其他路由
        if ( isActivated === -1 ) {
          let pageIndex = -1
          if ( index > 0 ) {
            pageIndex = index - 1 // 往前移动一个身位
          } else if (index === 0 ) {
            pageIndex = 0
          }

          if ( pageIndex >= 0 ) {
            const _route = this.tabList[pageIndex]
            const toTarget = getToTarget(_route)
            await replace(toTarget)
          }
        }
      }
    },

    // 关闭左侧
    closeLeftTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex(v => v.fullPath === route.fullPath)
      
      if ( index > 0 ) {
        const leftTabs = this.tabList.slice(0, index)
        let pathList: string[] = []
        for (const tabItem of leftTabs) {
          pathList.push(tabItem.fullPath)          
        }
        // 关闭pathList中的tab
        this.bulkCloseTab(pathList)
      }

      goToPage(router)
    },

    // 关闭右侧
    closeRightTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex(v => v.fullPath === route.fullPath)
      // 
      const len = this.tabList.length - 1
      if(index > 0 && index < len) {
        const rightTabs = this.tabList.slice(index, len)
        let pathList: string[] = []
        for (const tabItem of rightTabs) {
          pathList.push(tabItem.fullPath)
        }
        // 关闭右侧的tab
        this.bulkCloseTab(pathList)

      }

      goToPage(router)
    },

    // close Others
    closeOtherTabs(route: RouteLocationNormalized, router: Router) {
      const closeTabList = this.tabList.filter(v => v.fullPath !== route.fullPath)
      let pathList: string[] = []

      for (const tabItem of closeTabList) {
        pathList.push(tabItem.fullPath)
      }

      this.bulkCloseTab(pathList)
      goToPage(router)
    },

    // 全部关闭
    closeAllTab() {
      this.tabList = this.tabList.filter(item => item.meta?.affix ?? false )
      this.clearCacheTab()
    },

    async refreshPage(route: Router) {
      const redo = useRedo(route)
      await redo()
    }
  }
})