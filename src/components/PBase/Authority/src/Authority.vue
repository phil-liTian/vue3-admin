<script lang='ts'>
  import { defineComponent, PropType } from 'vue';
  import { RoleEnum } from '@/enums/roleEnum';
  import { getSlot } from '@/utils/helper/tsxHelper';
  import { usePermissions } from '@h/web/usePermissions'

  export default defineComponent({
    name: 'PAuthority',
    props: {
      values: {
        type: [Number, String, Array] as PropType<string | string[] | RoleEnum[] | RoleEnum>,
        default: ''
      }
    },
    setup(props, { slots }) {
      const { hasPermission } = usePermissions()
      const renderSlot = () => {
        const { values } = props
        // 没传values默认有权限
        if ( !values ) {
          return getSlot(slots)
        }

        return hasPermission(values as any) ? getSlot(slots) : null
      }

      return () => {
        return renderSlot()
      }
    }
  })
</script>
