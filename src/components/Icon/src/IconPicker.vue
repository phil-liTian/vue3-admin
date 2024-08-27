<template>
  <Input
    @click="triggerPopover"
    :class="prefixCls">
    <template #addonAfter>
      <Popover 
        placement="bottomLeft"
        trigger="click">
        <template #title>
          <div>
            <Input
              allowClear
              :placeholder="t('search')" />
          </div>
        </template>
        <template #content>
          
        </template>

        <div ref="triggerRef">
          <!-- <PIcon icon="ion:apps-outline"></PIcon> -->
        </div>
      </Popover>
    </template>
  </Input>
</template>
  
<script lang='ts' setup>
  import { computed, ref } from 'vue';
  import { Input, Popover } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  import iconsData from '../data/icons.data';
  const { prefixCls } = useDesign('icon-picker')
  const { t } = useI18n('component.icon')

  const props = defineProps({

  })

  const visible = ref(true)
  const getIcons = computed(() => {
    const prefix = iconsData.prefix
    return iconsData.icons.map(icon => `${prefix}:${icon}`)
  })

  const triggerRef = ref<Nullable<HTMLElement>>(null)

  const currentList = ref(getIcons)

  const triggerPopover = () => {
    if ( triggerRef.value ) {
      triggerRef.value.click()
    }
  }
</script>
  
<style lang='less' scoped>
  @prefixCls: ~'@{namespace}-icon-picker';

  .@{prefixCls} {

  }
</style>