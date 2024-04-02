<!--
 * @Date: 2024-04-01 16:29:36
 * @LastEditors: phil_litian
-->
<template>
  <div :class="prefixCls">
    <p-button block type="primary" @click="handleCopy">
      <CopyOutlined class="mr-2"/>
      {{ t('layout.setting.copyBtn') }}
    </p-button>

    <p-button block class="my-3">
      <RedoOutlined class="mr-2" />
      {{ t('common.resetText') }}
    </p-button>

    <p-button block>
      <RedoOutlined class="mr-2" />
      {{ t('layout.setting.clearBtn') }}
    </p-button>
  </div>
</template>
  
<script lang='ts' setup>
  import { CopyOutlined, RedoOutlined } from '@ant-design/icons-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  import { copyText } from '@u/copyText'
  import { useAppStore } from '@s/modules/app'
  import { unref } from 'vue'
  defineOptions({ name: 'SettingFooter' })
  const { prefixCls } = useDesign('drawer-settting-footer')
  const { t } = useI18n()
  const appStore  = useAppStore()
  
  const handleCopy = () => {
    copyText(JSON.stringify(unref(appStore.getProjectConfig), null, 2), null).then(() => {
      
    })
  }
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-drawer-settting-footer';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>