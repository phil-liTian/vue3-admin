<!--
 * @Date: 2024-02-29 13:14:32
 * @LastEditors: phil_litian
-->
<script lang='ts'>
  import { computed, defineComponent, h, unref, useAttrs } from "vue";
  import { Popconfirm } from 'ant-design-vue'
  import BasicButton from './BasicButton.vue'
  import { useI18n } from '@h/web/useI18n'

  const props = {
    enable: {
      type: Boolean,
      default: true
    }
  }

  export default defineComponent({
    name: 'PopButton',
    props,
    setup(props, { slots }) {
      const { t } = useI18n()
      const attrs = useAttrs()

      const getBindValues = computed(() => {
        return {
          okText: t('comm.okText'),
          cancelText: t('comm.cancelText'),
          ...props,
          ...attrs
        }
      })
      
      return () => {
        const bindValues = unref(getBindValues)
        const btnValues = unref(getBindValues)

        const Button = h(BasicButton, btnValues, slots)

        if ( !props.enable ) {
          return Button
        }

        return h(Popconfirm, bindValues, { default: () => Button })
      }
    }
  })
</script>
  