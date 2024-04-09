/*
 * @Date: 2024-03-21 21:43:14
 * @LastEditors: phil_litian
 */

interface TreeHelperConfig {
  id: string,
  children: string,
  pid: string
}

// 默认配置
const DEFUALT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid'
}

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFUALT_CONFIG, config)

/**
 * 根据func过滤tree中数据
 * @param tree 
 * @param func 
 * @param config 
 * @returns 
 */
export function filter<T> (tree: T[], func: (n: T) => boolean, config: Partial<TreeHelperConfig> = {}): T[] {
  config = getConfig(config)
  const children = config.children
  // 根据func递归移除一二级内容(key2)
  function listFilter(list) {
    return list.filter(node => {
      // 如果有children则继续过滤children
      node[children] = node[children] && listFilter(node[children])
      return func(node) || (node[children]?.length)
    })
  }

  return listFilter(tree)
}

/**
 * 提取指定树结构
 * @param treeData 
 * @param opt 
 * @returns 
 */
export function treeMap<T> (treeData: T[], opt: { children?: string, conversion: Fn })  {
  return treeData.map(item => treeMapEach(item, opt))
}

const treeMapEach = (data: any, { children = 'children', conversion }: { children?: string, conversion: Fn  }) => {
  const hasChildren = Array.isArray(data[children]) && data[children]?.length
  const conversionData = conversion(data) || {}
  if ( hasChildren ) {
    return {
      ...conversionData,
      [children]: data[children].map(item => treeMapEach(item, { children, conversion }))
    }
  } else {
    return { ...conversionData }
  }
}

// 找当前节点的所有祖先节点 -> 第一反应用递归解决；这里用while循环效率更高
export function findPath<T>(treeData: T[], func: Fn, config: Partial<TreeHelperConfig> = {}) {
  let path = []
  config = getConfig(config)
  // 定义一个新数组 以防影响到传进来的treeData
  let list = [...treeData]
  let visitedSet = new Set()
  const { children } = config
  while(list.length) {
    const node = list[0]
    
    if ( visitedSet.has(node) ) {
      list.shift()
      path.pop()
    } else {
      // 如果有children的话 则添加到list中
      visitedSet.add(node)
      node[children] && list.unshift(...node[children])
      path.push(node)
      
      if ( func(node) ) {
        return path
      }
    }
  }

  return []
}

export function forEach<T = any>(tree: T[], func: Fn, config: Partial<TreeHelperConfig> = {}) {
  config = getConfig(config)
  const list = [...tree]
  const { children } = config

  for (let i = 0; i < list.length; i++) {
    if ( func(list[i]) ) return

    children && list[i][children] && list.splice(i + 1, 0, ...list[i][children])
  }
}
