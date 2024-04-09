/*
 * @Date: 2024-04-07 11:19:31
 * @LastEditors: phil_litian
 */
import { useDescription } from '@c/PBase/Description/src/useDescription'
import { GITHUB_URL } from '@/settings/siteSetting'
import type { DescItem } from '@c/PBase/Description/src/typing'

export function useData() {

  const infoSchema: DescItem[] = [
    { label: '版本', field: 'version' },
    { label: '最后编译时间', field: 'lastBuildTime' },
    // { label: '文档地址', field: 'doc' },
    // { label: '预览地址', field: 'preview' },
    { label: 'GitHub', field: 'github' },
  ]
  
  const { pkg, lastBuildTime } = __APP_INFO__
  const { name, version, dependencies, devDependencies } = pkg
  const infoData = {
    version,
    name,
    lastBuildTime,
    github: GITHUB_URL
  }

  let devSchema: DescItem[] = []
  Reflect.ownKeys(devDependencies).map((item: string) => {
    devSchema.push({ field: item, label: item })
  })

  let schema: DescItem[] = []
  Reflect.ownKeys(dependencies).map((item: string) => {
    schema.push({ field: item, label: item })
  })


  const [ infoRegister ] = useDescription({
    title: '项目信息',
    schema: infoSchema,
    data: infoData
  })

  const [ register ] = useDescription({
    title: '生产环境依赖',
    schema,
    data: dependencies
  })

  const [ registerDev ] = useDescription({
    title: '开发环境依赖',
    schema: devSchema,
    data: devDependencies
  })

  return {
    infoRegister,
    register,
    registerDev
  }
}