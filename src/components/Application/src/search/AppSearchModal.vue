<!--
 * @Date: 2024-04-08 16:45:14
 * @LastEditors: phil_litian
-->
<template>
  <Teleport to="body">
    <transition name="zoom-fade" mode="out-in">
      <div :class="getSearchClass" v-if="visible" >
        <div :class="`${prefixCls}-content`" v-click-outside="handleClose">
          <div :class="`${prefixCls}-input__wrapper`">
            <Input 
              allow-clear
              :class="`${prefixCls}-input`"
              :placeholder="t('common.searchText')"
              @change="handleSearch">
              <template #prefix>
                <SearchOutlined />
              </template>
            </Input>
          </div>

          <div :class="`${prefixCls}-no-data`" v-if="getIsNotData">
            {{ t('component.app.searchNotData') }}
          </div>

          <ul :class="`${prefixCls}-list`" v-else>
            <li 
              v-for="(item, index) in searchResult" 
              :key="item.path"
              :data-index="index"
              @mouseenter="handleMouseEnter"
              @click="handleEnter"
              :class="[
                `${prefixCls}-list__item`, 
                { 
                  [`${prefixCls}-list__item--active`]: index === activeIndex 
                }
              ]">
              <div :class="`${prefixCls}-list__item-icon`">
                <PIcon :icon="item.icon || 'mdi:form-select'" :size="20"></PIcon>
              </div>
              <div :class="`${prefixCls}-list__item-text`">{{ item.name }}</div>
              <div :class="`${prefixCls}-list__item-enter`">
                <PIcon icon="ant-design:enter-outlined" :size="20"></PIcon>
              </div>
            </li>
          </ul>

          <AppSearchFooter />
        </div>
      </div>
    </transition>
  </Teleport>
</template>
  
<script lang='ts' setup>
  import { computed, ref } from 'vue';
  import { Input } from 'ant-design-vue'
  import { SearchOutlined } from '@ant-design/icons-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  import vClickOutside from '@d/clickOutside'
  import { propTypes } from '@/utils/propTypes';
  import AppSearchFooter from './AppSearchFooter.vue'
  import { useMenuSearch } from './useMenuSearch'
  const emits = defineEmits(['close'])
  defineProps({
    visible: propTypes.bool.def(false)
  })
  const { prefixCls } = useDesign('app-search-modal');
  const { activeIndex, handleSearch, handleEnter, searchResult, handleMouseEnter } = useMenuSearch(emits)
  const { t } = useI18n()
  const getSearchClass = computed(() => {
    return [
      prefixCls
    ]
  })

  const getIsNotData = computed(() => !searchResult.value.length)

  const handleClose = () => {
    emits('close')
  }
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-app-search-modal';

  .@{prefix-cls} {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    background-color: rgba(0, 0, 0, .25);
    &-content {
      position: relative;
      flex-direction: column;
      border-radius: 16px;
      width: 632px;
      height: fit-content;
      max-height: 660px;
      background-color: @component-background;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
    }

    &-input__wrapper {
      padding: 14px 14px 0;
    }

    &-input {
      height: 48px;
      border-radius: 6px;
      color: #1c1e21;
      font-size: 1.5em;
    }

    &-no-data {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100px;
      color: rgb(150 159 175);
    }

    &-list {
      max-height: 472px;
      overflow-y: auto;
      padding: 0 14px;
      &__item {
        display: flex;
        align-items: center;
        height: 56px;
        width: 100%;
        border-radius: 4px;
        background-color: @component-background;
        margin-top: 8px;
        padding-bottom: 4px;
        padding-left: 14px;
        box-shadow: 0 1px 3px 0 #d4d9e1;
        font-size: 14px;
        cursor: pointer;

        &--active {
          background-color: @primary-color;
          color: #fff;

          .@{prefix-cls}-list__item-enter {
            opacity: 1;
          }
        }

        &-icon {
          width: 30px;
        }

        &-text {
          flex: 1;
        }

        &-enter {
          width: 30px;
          opacity: 0;
        }
      }
    }
  }
</style>