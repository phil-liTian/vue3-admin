/*
 * @Date: 2024-06-07 15:46:41
 * @LastEditors: phil_litian
 */
import { computed, defineComponent } from "vue";
import { Grid } from 'vxe-table'
import { omit } from 'lodash-es'
import { ignorePropKeys } from './const'
import { extendSlots } from "@/utils/helper/tsxHelper";


export default defineComponent({
  setup(props, { attrs }) {
    const getBindValues = computed(() => {
      return {
        ...attrs,
        ...props
      }
    })

    const getGridBindValues = computed(() => {
      const omitProps = omit(getBindValues.value, ignorePropKeys)

      return {
        ...omitProps
      }
    })

    return {
      getGridBindValues
    }
  },
  render() {
    return (<Grid { ...this.getGridBindValues }>
      { extendSlots(this.$slots) }
    </Grid>)
  }
})
