<!--
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
-->
## vue3 + vite  + ts + pinia + vue-router + less + ant-design-vue

## 文件目录说明
1. views 页面级单文件
2. components 全局组件
3. hooks 全局钩子函数
  3.1 core
  3.2 web
4. router 路由相关配置
5. store 状态管理
6. utils 工具类
7. assets 存放一些静态资源 eg:图片
8. locales 语言配置

## 引入文件定义别名
1.在vite.config.js中添加如下配置

```js
resolve: {
  alias: {
    '@': resolve(__dirname, 'src'),
    '@c': resolve(__dirname, 'src/components'),
    '@v': resolve(__dirname, 'src/views'),
    '@s': resolve(__dirname, 'src/store'),
    '@h': resolve(__dirname, 'src/hooks'),
    '#': resolve(__dirname, 'src/types'),
  }
},
```

2.在import ts文件时还是会报错, 需要在tsconfig.json中添加如下配置

```json
"compilerOptions": {
  "baseUrl": "./",
  "paths": {
    "@/*": ["src/*"],
    "@c/*": ["src/components/*"],
    "@s/*": ["src/store/*"],
    "@h/*": ["src/hooks/*"],
    "#/*": ["types/*"]
  }
},
```

## 在单文件中使用less全局定义的变量, 需要在vite.config.js中增加如下配置

```js
css: {
  preprocessorOptions: {
    less: {
      modifyVars: {
        hack: `true; @import (reference) "${resolve(__dirname, 'src/design/index.less')}";`,
        'primary-color': '#0960bd'
      },
      javascriptEnabled: true,
    }
  }
}
```

## 引入unocss可快速开发样式

在vite.config.js中进行如下配置
```js
import UnoCss from 'unocss/vite'
plugins: [UnoCss()],
```
在main.ts中引入样式即可
```js
import 'uno.css'
```


## 使用vue-i18n库实现国际化

```js
const createI18nOptions = async () => {
  const locale = getLocale
  const defaultLocale = await import(`./lang/${locale}.ts`)
  const messages = defaultLocale?.default?.message ?? {}
  
  return {
    locale, // 当前语言类型
    fallbackLocale: locale, // 后备的语言类型
    messages: { // 不同语言环境下消息转换的对象
      [locale]: messages
    }, 
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    missingWarn: false
  }
}

// 国际化设置
export const setUpI18n = async (app: App) => {
  const options = await createI18nOptions()
  const i18n = createI18n(options)
  app.use(i18n)
}
```

### 创建hooks useI18n; 可以在系统中直接使用useI18n暴露出的t方法实现多语言切换功能
```js
export const useI18n = (namespace?: string) => {
  // 兼容一下没有i18n的场景
  const normalFn = {
    t: (key: string) => {
      return getKey(namespace, key)
    }
  }

  if ( !i18n ) {
    return normalFn
  }

  const { t, methods } = i18n.global
  
  // 可简化t的传参
  const tFn = ( key: string, ...arg: any[] ) => {
    return (t as (arg0: string, ...arg: I18nTranslationParameters ) => string)( getKey(namespace, key), ...(arg as I18nTranslationParameters) )
  }
  
  return {
    t: tFn,
    ...methods
  }
}
```

## vue-router

```js
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes as RouteRecordRaw[],
  // 是否禁止尾部斜线。
  strict: true,
  // 当在页面之间导航时控制滚动的功能
  scrollBehavior: () => ({ top: 0, left: 0 }),
})


export const setupRouter = (app: App) => {
  app.use(router)
}

```
### 路由守卫处理？？？

### 重定向
```js
  path: '/redirect/:path(.*)/:_redirect_type(.*)?/:_origin_params(.*)?', 
```

## 在当前工作区中分包处理

1. 在当前工作区中创建packages文件夹

2. 创建pnpm-workspace.yaml文件, 进行如下配置

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

3. package.json文件中增加如下配置, 这时在执行`pnpm i`的时候就会先在当前工作区中查找并安装@phil/hooks包

```json
"dependencies": {
  "@phil/hooks": "workspace:*"
},
```

这种处理方式的好处在于: 可以确保在多个包之间共享的依赖项能够被正确地安装和管理，同时也可以提高构建速度和效率。

### 使用 `vite-plugin-mock` mock请求后端接口的过程

### 注意mock文件夹需要建在根目录下

1.单独抽出@vite-config文件 分开管理

### axios封装思路
1. requestInterceptors 请求拦截器处理token
2. responseInterceptors 响应拦截器（暂未处理逻辑）
3. responseInterceptorsCatch 响应异常处理（404， 500 等错误状态处理）
4. beforeRequestHook 处理request config信息
5. transformResponseHook 


### cache缓存思路

#### 当前系统分别用localStorage 和 sessionStorage做了缓存处理, 可通过参数灵活控制
1. 通过Memory class将数据缓存到计算机的内存中 使用Cache变量存储 为Cache设置了增删改查等基本方法
2. 同时将数据缓存到storage中, 但当前获取数据并未直接使用storage中的数据，而是存内存中获取
  2.1 当前缓存的数据量并不大,切不会频繁更新 放到内存中存取效率会远远高于storage中的存取效率（因为像getToken这种方法是频繁调用的, 故放到内存中较合适）
  2.2 使用createStorage可达到持久化存储的目的
3. 每次刷新都执行initPersistentMemory方法 可实现将storage中缓存的数据 放到内存中 方便存取, 效率高



