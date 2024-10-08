/*
 * @Date: 2024-03-21 10:14:26
 * @LastEditors: phil_litian
 */
import { cloneDeep } from 'lodash-es'
import { AppRouteModule, AppRouteRecordRaw, Menu } from "../types";
import { treeMap, findPath } from '@u/helper/treeHelper'


// 根据path返回当前menu节点上所有父节点path
export function getAllParentPath<T>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path)
  return menuList.map(item => item.path)
}


// const about: AppRouteRecordRaw = {
//   name: 'About',
//   path: '/about',
//   component: LAYOUT,
//   redirect: '/about/index',
//   meta: {
//     title: t('routes.dashBoard.about'),
//     orderNo: 1000
//   },
//   children: [
//     {
//       name: 'AboutPage',
//       path: 'index',
//       component: () => import('@/views/sys/about/index.vue'),
//       meta: {
//         title: t('routes.dashBoard.about')
//       }
//     }
//   ]
// }
// 由于路由结构如上 在children里面元素的path都不带父节点的path, 所以此处对路由的path进行凭借处理
const joinParentPath = (list: Menu[], parentPath = '') => {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if( !item.path.startsWith('/') ) {
      item.path = parentPath + `/${item.path}`
    }

    if ( item.children?.length ) {
      joinParentPath(item.children, item.path)
    }
  }
}

/**
 * 将定义的路由结构转换成菜单的结构
 * @param routeModList 
 * @param routerMapping 
 * @returns 
 */
export const transformRouteToMenu = (routeModList: AppRouteModule[], routerMapping: boolean = false) => {
  const cloneRouteModList = cloneDeep(routeModList)
  
  let routeList: AppRouteRecordRaw[] = []
  
  cloneRouteModList.forEach(item => {
    
    if( routerMapping && item.meta?.hideChildrenInMenu && typeof item.redirect === 'string' ) {
      item.path = item.redirect
    }

    routeList.push(item)
  })

  // 提取指定树结构
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu, icon }, path } = node

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        path,
        hideMenu
      }
    }
  })
  
  joinParentPath(list)
  
  return cloneDeep(list)
}
