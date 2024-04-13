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

    <p-button color="warning" @click="handleResetSetting" block class="my-3">
      <RedoOutlined class="mr-2" />
      {{ t('common.resetText') }}
    </p-button>

    <p-button block @click="handleClearAndRedo">
      <RedoOutlined class="mr-2" />
      {{ t('layout.setting.clearBtn') }}
    </p-button>
  </div>
</template>
  
<script lang='ts' setup>
  import { CopyOutlined, RedoOutlined } from '@ant-design/icons-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  import { useMessage } from '@h/web/useMessage'
  import { copyText } from '@u/copyText'
  import { useAppStore } from '@s/modules/app'
  import defaultSetting from '@/settings/projectSetting'
  import { unref } from 'vue'
  defineOptions({ name: 'SettingFooter' })
  const { prefixCls } = useDesign('drawer-settting-footer')
  const { t } = useI18n()
  const appStore  = useAppStore()
  const { createMessage, createSuccessModal } = useMessage()
  
  const handleCopy = () => {
    copyText(JSON.stringify(unref(appStore.getProjectConfig), null, 2), null).then(() => {
      createSuccessModal({
        title: t('setting.operatingTitle'),
        content: t('setting.operatingContent')
      })
    })
  }

  // 重置当前设置
  const handleResetSetting = () => {
    try {
      appStore.setProjectConfig(defaultSetting)
      createMessage.success(t('setting.resetSuccess'))
    } catch (error) {
      createMessage.error(error)
    }
  }

  // 清空缓存并返回登录页
  const handleClearAndRedo = () => {
    
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