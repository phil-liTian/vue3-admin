<!--
 * @Date: 2024-05-07 18:00:50
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
  import { computed, defineComponent, unref } from "vue";
  import { PBasicHelp } from '@c/Basic/index'
  import EditTableHeadCell from "./EditTableHeadCell.vue";
  import { BasicColumn } from "../types/table";

  export default defineComponent({
    name: 'TableHeaderCell',
    props: {
      column: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props) {
      const getIsEdit = computed(() => (props.column as BasicColumn)?.edit);
      const getTitle = computed(() => {
        const column = props.column as BasicColumn
        if ( typeof column.customHeaderRender === 'function' ) {
          return column.customHeaderRender(column)
        }
        return column.title
      })
      const getHelpMessage = computed(() => (props.column as BasicColumn)?.helpMessage)

      return () => {
        return (
          <div>
            {
              getIsEdit.value ? (<EditTableHeadCell>{ getTitle.value }</EditTableHeadCell>) : (<span>{ getTitle.value }</span>)
            }
            {
              unref(getHelpMessage) && (<PBasicHelp text={getHelpMessage.value} />)
            }
          </div>
        )
      }
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>