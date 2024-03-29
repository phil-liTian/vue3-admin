<!--
 * @Date: 2024-03-28 19:12:53
 * @LastEditors: phil_litian
-->
<template>
  <div :class="prefixCls">
    <template v-for="color in colorList || []" :key="color">
      <span 
        @click="handleClick(color)"
        :class="[
          'flex', 
          'justify-center', 
          `${prefixCls}__item`,
          { [`${prefixCls}__active`]: checkColor === color }
        ]"
        :style="{ background: color }">

        <CheckOutlined />
      </span>
    </template>
  </div>
</template>
  
<script lang='ts' setup>
  import { PropType } from 'vue';
  import { CheckOutlined } from '@ant-design/icons-vue'
  import { useDesign } from '@h/web/useDesign';
  import { HandlerEnums } from '../enums'
  import { baseHandler } from '../handler'

  defineOptions({ name: 'ThemeColorPicker' })
  const props = defineProps({
    colorList: {
      type: Array as PropType<string[]>,
      default: ''
    },
    event: {
      type: Number as PropType<HandlerEnums>
    },
    checkColor: String
  })

  const { prefixCls } = useDesign('theme-color-picker')

  const handleClick = (color: string) => {
    props.event && baseHandler(props.event, color)
  }
  
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-theme-color-picker';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 16px 0;

    &__item {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      border: 1px solid #ddd;
      cursor: pointer;

      svg {
        display: none;
      }
    }

    &__active {
      // svg {
      //   display: inline-block;
      // }
    }
  }
</style>