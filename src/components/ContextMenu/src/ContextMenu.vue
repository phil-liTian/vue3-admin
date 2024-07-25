<!--
 * @Date: 2024-07-23 13:46:33
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
import { defineComponent, ref, unref, onMounted, nextTick, computed, CSSProperties } from 'vue';
import { Menu, Divider } from 'ant-design-vue'
import { PropType } from 'vue';
import { Axis, ContextMenuItem } from './typing'
import { propTypes } from '@/utils/propTypes';
import { PIcon } from '@/components/Icon';

const props = {
  width: propTypes.number.def(156),
  items: {
    type: Array as PropType<ContextMenuItem[]>,
    default: () => []
  },
  axis: {
    type: Object as PropType<Axis>,
    default() {
      return { x: 0, y: 0 }
    }
  }
}
  
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const prefixCls = 'context-menu'
const ItemContent = (props) => {
  const { item } = props
  return (
    <span>
      { item.icon && <PIcon class='mr-2' icon={item.icon} /> }
      <span>{ item.label }</span>  
    </span>
  )
}
export default defineComponent({
  name: "ContextMenu",
  props,
  setup(props, { slots, emit }) {
    const showRef = ref(false)
    const wrapRef = ref(null)

    const getStyle = computed((): CSSProperties => {
      const { axis, width, items } = props
      const { x, y } = axis || { x: 0, y: 0 }
      const body = document.body
      const menuWidth = width
      const menuHeight = (items || []).length * 40
      // 计算menu的位置
      const left = body.clientWidth < x + menuWidth ? x - menuWidth : x;
      const top = body.clientHeight < y + menuHeight ? y - menuHeight : y;
      return {
        position: "absolute",
        width: `${width}px`,
        left: `${left}px`,
        top: `${top}px`
      }
    })
    
    function renderMenuItem(items: ContextMenuItem[]) {
      return items.map(item => {
        const { children, divider } = item
        const contentProps = {
          item
        }

        // 没有二级菜单
        if ( !children || children.length === 0  ) {
          return <>
            <MenuItem>
              <ItemContent { ...contentProps } />
            </MenuItem>
            { divider && <Divider /> }
          </>
        }

        return (
          <SubMenu>
            {{ 
              title: () => <ItemContent { ...contentProps } />,
              default: () => renderMenuItem(children) 
            }}  
          </SubMenu>
        )
      })
    }

    onMounted(() => {
      nextTick(() => showRef.value = true)
    })

    return () => {
      if ( !unref(showRef) ) {
        return null
      }
      const { items } = props
      return (
        <Menu
          inlineIndent={12}
          style={ unref(getStyle) }
          class={prefixCls}>
          { renderMenuItem(items) }
        </Menu>
      )
    }
  }
})
  
</script>

<style lang='less'>
  .context-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 156px;
    border-radius: 8px;
    border: 1px solid rgb(0 0 0 / 8%);

    .ant-divider {
      margin: 0;
    }
  }
</style>
