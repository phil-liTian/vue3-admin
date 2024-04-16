/*
 * @Date: 2024-02-26 15:41:04
 * @LastEditors: phil_litian
 */
export {}
declare global {

  type Recordable<T = any> = Record<string, T>
  
  type Nullable<T> = T | null

  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }

  type IntervalHandler = ReturnType<typeof setInterval>

  type LabelValueOptions = {
    label: string,
    value: any,
    [key: string]: string | number | boolean
  }[]
}

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string,
      version: string,
      devDependencies: Recordable<string>,
      dependencies: Recordable<string>
    },
    lastBuildTime: string
  }
}