/*
 * @Date: 2024-04-09 13:38:19
 * @LastEditors: phil_litian
 */
import { onBeforeMount, ref, unref } from 'vue'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'
import { ChangeEvent } from "ant-design-vue/es/_util/EventInterface"
import { Menu } from '@/router/types'
import { getMenus } from '@/router/routes/menus'
import { filter, forEach } from '@/utils/helper/treeHelper'
import { useI18n } from '@h/web/useI18n'
import { useGo } from '@h/web/usePage'
import { isArray } from '@/utils/is'

export interface SearchResult {
  name: string | unknown,
  path: string,
  icon: string
}

function transform(c: string) {
  // 特殊符号 需转义
  const codes: string[] = ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '{', '}', '|', '^']

  return codes.includes(c) ? `\\${c}`: c
}

function createSearchReg(key: string) {
  const keys = [...key].map(item => transform(item))
  const str = ['', ...keys, ''].join('.*')
  return new RegExp(str)
}

export function useMenuSearch(emits) {
  const searchResult = ref<SearchResult[]>([])
  const keyword = ref('')
  const activeIndex = ref(-1)
  let menuList: Menu[] = []

  const { t } = useI18n()
  const { go } = useGo()

  onBeforeMount(async () => {
    const list = await getMenus()
    menuList = cloneDeep(list)
    forEach(menuList, (item) => {
      item.name = t(item.name)
    })
  })

  const handleSearch = useDebounceFn(search, 200)

  function search(e?: ChangeEvent) {
    const key = e.target.value
    keyword.value = key.trim()
    if ( !key ) {
      searchResult.value = []
      return
    }

    const reg = createSearchReg(unref(keyword))
    const filterMenu = filter(menuList, item => {
      return reg.test(item.name as string)
    })
    
    searchResult.value = handleSearchResult(filterMenu, reg)
    activeIndex.value = 0
  }

  // 处理搜索结果数据结构
  function handleSearchResult(filterMenu: Menu[], reg: RegExp, parent?: Menu) {
    let ret: SearchResult[] = []
    filterMenu.forEach(item => {
      const { name, meta, children, path, icon } = item

      if ( !children.length ) {
        ret.push({
          name: parent ? `${parent.name} > ${name}` : name,
          path,
          icon
        })
      } 

      if ( children.length && isArray(children) ) {
        ret.push(...handleSearchResult(children, reg, item))
      }
    })

    
    return ret
  }

  function handleMouseEnter(e) {
    const index = e.target.dataset.index
    activeIndex.value = Number(index)
  }

  // 回车跳转路由
  function handleEnter() {
    if ( !searchResult.value.length ) return
    const index = unref(activeIndex)
    const result = unref(searchResult)

    const to = result[index]
    handleClose()
    go(to.path)
  }

  // 向下
  function handleDown() {
    if ( !searchResult.value.length ) return
    activeIndex.value++
    if ( activeIndex.value > searchResult.value.length - 1 ) {
      activeIndex.value = 0
    }

    // TODO: 滚动到指定位置
  }

  // 向上
  function handleUp() {
    if ( !searchResult.value.length ) return
    activeIndex.value--
    if ( activeIndex.value < 0 ) {
      activeIndex.value = searchResult.value.length - 1
    }

    // TODO: 滚动到指定位置
  }

  function handleClose() {
    searchResult.value = []
    emits('close')
  }

  // 键盘事件
  // esc close
  onKeyStroke('Escape', handleClose)
  // enter
  onKeyStroke('Enter', handleEnter)
  // arrowUp
  onKeyStroke('ArrowUp', handleUp)
  onKeyStroke('ArrowDown', handleDown)

  return { handleSearch, searchResult, activeIndex, handleEnter, handleMouseEnter }
}
