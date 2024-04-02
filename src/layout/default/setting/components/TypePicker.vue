<!--
 * @Date: 2024-03-30 22:23:43
 * @LastEditors: phil_litian
-->
<template>
  <div :class="prefixCls">
    <template v-for="item in menuTypeList || []" :key="item.key">
      <Tooltip :title="item.title" placement="bottom">
        <div
          :class="[
            `${prefixCls}__item`,
            `${prefixCls}__item--${item.type}`,
            {
              [`${prefixCls}__item--active`]: item.type === def
            }
          ]">
          <div class="mix-sidebar"></div>
        </div>
      </Tooltip>
    </template>
  </div>
</template>
  
<script lang='ts' setup>
  import { PropType } from 'vue'
  import { Tooltip } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { MenuTypeEnum } from '@/enums/menuEnum'
  const { prefixCls } = useDesign('setting-menu-type-picker')
  defineOptions({ name: 'MenuTypePicker' })

  defineProps({
    menuTypeList: {
      type: Array as PropType<any[]>,
      default: () => ([])
    },
    def: {
      type: String as PropType<MenuTypeEnum>,
      default: ''
    }
  })

</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-setting-menu-type-picker';

  .@{prefix-cls} {
    display: flex;
    padding-left: 20px;
    &__item {
      position: relative;
      width: 56px;
      height: 48px;
      margin-right: 16px;
      background-color: #f0f2f5;
      box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
      cursor: pointer;
      overflow: hidden;

      &::before,
      &::after {
        content: '';
        position: absolute;
      }

      &--sidebar {
        &::before {
          z-index: 1;
          width: 33%;
          height: 100%;
          border-radius: 4px 0 0 4px;
          background-color: #273352;
        }

        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }
      }

      &--mix_sidebar {
        &::before {
          width: 33%;
          height: 100%;
          border-radius: 4px 0 0 4px;
          background-color: #273352;
        }

        &::after {
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }

        .mix-sidebar {
          position: absolute;
          left: 25%;
          width: 15%;
          height: 100%;
          background-color: #fff;
        }
      }

      &--mix {
        &::before {
          width: 33%;
          height: 100%;
          border-radius: 4px 0 0 4px;
          background-color: #fff;
        }

        &::after {
          width: 100%;
          height: 25%;
          border-radius: 4px 4px 0 0;
          background-color: #273352;
        }
      }

      &--top_menu {
        &::after {
          height: 25%;
          width: 100%;
          border-radius: 4px 4px 0 0;
          background-color: #273352;
        }
      }

      &:hover,
      &--active {
        border: 2px solid @primary-color;
        border-radius: 4px;
      }
    }
  }
</style>