<!--
 * @Date: 2024-03-29 14:43:10
 * @LastEditors: phil_litian
-->
## 递归处理当前simpleSubMenu组件(实现多级菜单嵌套)

### 思路如下
1.1 Menu组件是整个SimpleMenu的入口
1.2 SimpleSubMenu是每个菜单的内容(包含后代节点菜单) -> 用来递归的元素（可实现多级菜单）
1.3 MenuItem是真实渲染内容 折叠和展开处理两种不同的样式
1.4 subMenuItem 有子级的元素 带折叠交互的 这个组件比较精彩了 菜单展开时使用CollapseTransition实现折叠交互动画；collapsed时 使用Popover弹出展示（共用插槽）

### 实现
1.1 使用rootMenuEmitter来实现多级（跨级）组件之前通信 由于这里涉及到递归。其它组件通讯已无法满足需求了

比如说 在Menu组件中mitt上挂载on-menu-item-select方法, 但真实点击的元素是MenuItem 这时候可能存在2+级组件通讯
  如果使用emit实现则比较麻烦。此处采用的方法是结合mitt和provide&inject使用，来实现多层级、不确定层级间组件通讯

1.2 克服难点1
  1.2.1 在子组件SubMenu中挂载on-update-opened方法，想在父组件挂载时就触发。需指定watch的第三个参数{ flush: 'post' }, 作用在于可在侦听器回调中访问Vue更新后的DOM结构！！！
  1.2.2 