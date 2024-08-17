<script lang='tsx'>
import { defineComponent, PropType, ref, unref } from 'vue';
import { Result } from 'ant-design-vue'
import networkErrorSvg from '@/assets/svg/net-error.svg'
import noDataSvg from '@/assets/svg/no-data.svg'
import { ExceptionEnum } from '@/enums/exceptionEnum';
import { useI18n } from '@h/web/useI18n'
import { useDesign } from '@h/web/useDesign'
import { PButton } from '@/components/Button';
import { useGo, useRedo } from '@/hooks/web/usePage';
  interface MapValue {
    title: string;
    subTitle: string;
    btnText?: string;
    icon?: string;
    status?: ExceptionEnum;
    handler?: any
  }

  export default defineComponent({

    props: {
      status: {
        type: Number as PropType<ExceptionEnum>,
        default: ExceptionEnum.PAGE_FALLBACK
      }
    },

    setup(props) {
      const { prefixCls } = useDesign('app-exception-page');
      const { t } = useI18n('sys.exception')
      const { t: ct } = useI18n()
      const { go } = useGo()
      const redo = useRedo()
      const backLogin = t('backLogin')
      const statusMapRef = ref(new Map<string | number, MapValue>())

      // 404
      unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
        title: '404',
        status: ExceptionEnum.PAGE_NOT_FOUND,
        subTitle: t('subTitle404'),
        btnText: backLogin,
        handler: () => go()
      })

      // 403
      unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
        title: '403',
        status: ExceptionEnum.PAGE_NOT_ACCESS,
        subTitle: t('subTitle403'),
        btnText: backLogin,
        handler: () => go()
      })

      // 500
      unref(statusMapRef).set(ExceptionEnum.PAGE_ERROR, {
        title: '500',
        status: ExceptionEnum.PAGE_ERROR,
        subTitle: t('subTitle500'),
        btnText: backLogin,
        handler: () => go()
      })

      // 网络错误
      unref(statusMapRef).set(ExceptionEnum.NET_WORK_ERROR, {
        title: t('networkErrorTitle'),
        status: ExceptionEnum.NET_WORK_ERROR,
        subTitle: t('networkErrorSubTitle'),
        icon: networkErrorSvg,
        btnText: ct('common.redo'),
        handler: () => redo()
      })

      // 暂无数据
      unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_RESPONSE, {
        title: t('noDataTitle'),
        subTitle: '',
        icon: noDataSvg,
        btnText: ct('common.redo'),
        handler: () => redo()
      })

      return () => {
        const { title, status, subTitle, btnText, handler, icon } = unref(statusMapRef).get(props.status)
        return (<Result 
          class={prefixCls} 
          title={title}
          subTitle={subTitle}
          status={status}>
          {{
            extra: () => {
              return <PButton onclick={handler} type='primary'>{ btnText }</PButton>
            },
            icon: () => {
              return icon ? <img src={icon} alt="" /> : null
            }
          }}
        </Result>)
      }
    }
  })
</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-app-exception-page';

  .@{prefix-cls} {
    .ant-result-icon {
      img {
        max-width: 400px;
        max-height: 300px;
      }
    }
  }
  
</style>