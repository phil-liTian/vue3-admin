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
