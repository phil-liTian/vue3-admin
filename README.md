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

2.在import ts文件时还是会保存, 需要在tsconfig.json中添加如下配置

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