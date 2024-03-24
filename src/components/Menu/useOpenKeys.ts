/*
 * @Date: 2024-03-23 10:27:44
 * @LastEditors: phil_litian
 */
import { computed, unref } from 'vue'
import { Key, MenuState } from './types';
import { Menu } from '@/router/types';


export const useOpenKeys = (menuState: MenuState, menus, mode, accordion) => {

  // 操作打开关闭
  const handleOpenChange = (openKeys: Key[]) => {
    // 只需要处理有children的菜单，叶子节点的菜单无需处理
    let rootMenuKeys = []
    unref(menus).map(menuItem => {
      if ( menuItem?.children.length > 0 ) {
        rootMenuKeys.push(menuItem.path)
      }
    })

    console.log('openKeys,rootMenuKeys', openKeys, rootMenuKeys);
    // 最新打开的菜单
    const latestOpenKey = openKeys.find(key => menuState.openKeys.indexOf(key) === -1)
    console.log('latestOpenKey', latestOpenKey);
    
    
    if ( rootMenuKeys.indexOf(latestOpenKey) !== -1 ) {
      menuState.openKeys = latestOpenKey ? [latestOpenKey] : []
    } else {
      menuState.openKeys = openKeys
    }

    
    console.log('menuState', menuState.openKeys);
    
    

  }

  // 设置openKeys
  const setOpenKeys = () => {
    
  }

  const getOpenKeys = computed(() => menuState.openKeys)

  return { setOpenKeys, getOpenKeys, handleOpenChange }
}
