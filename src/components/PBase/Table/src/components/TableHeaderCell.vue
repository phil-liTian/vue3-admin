<!--
 * @Date: 2024-05-07 18:00:50
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
  import { computed, defineComponent, unref } from "vue";
  import { PBasicHelp } from '@c/Basic/index'
  import { BasicColumn } from "../types/table";

  export default defineComponent({
    props: {
      column: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props) {
      const getTitle = computed(() => {
        const column = props.column
        return column.title
      })
      const getHelpMessage = computed(() => (props.column as BasicColumn)?.helpMessage)
      console.log('getHelpMessage', getHelpMessage);

      return () => {
        return (
          <div>
            <span>{ getTitle.value }</span>
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