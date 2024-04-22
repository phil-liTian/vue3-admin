<!--
 * @Date: 2024-04-16 20:44:42
 * @LastEditors: phil_litian
-->
<template>
  <div 
    :class="getClass">
    <!-- 全屏和退出全屏 -->
    <template v-if="canFullScreen">
      <Tooltip v-if="fullScreen" :title="t('component.modal.restore')" placement="bottom">
        <FullscreenExitOutlined @click="handleFullScreen"/>
      </Tooltip>

      <Tooltip v-else :title="t('component.modal.maximize')" placement="bottom">
        <FullscreenOutlined @click="handleFullScreen" />
      </Tooltip>
    </template>
    <Tooltip :title="t('component.modal.close')" placement="bottom">
      <CloseOutlined @click="handleCancel" />
    </Tooltip>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue'
  import { Tooltip } from 'ant-design-vue'
  import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  import { propTypes } from '@/utils/propTypes'

  defineOptions({ name: 'ModalClose' })
  const emits = defineEmits(['cancel', 'fullscreen'])
  defineProps({
    canFullScreen: propTypes.bool.def(true),
    fullScreen: propTypes.bool.def(false)
  })
  const { prefixCls } = useDesign('basic-modal-close')
  const { t } = useI18n()

  const getClass = computed(() => {
    return [
      prefixCls
    ]
  })

  const handleFullScreen = (e: Event) => {
    emits('fullscreen')
  }

  const handleCancel = () => {
    emits('cancel')
  }
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-basic-modal-close';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
  }
</style>