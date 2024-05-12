<!--
 * @Date: 2024-05-07 18:00:50
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
  import { computed, defineComponent } from "vue";

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

      return () => <div>{ getTitle.value }</div>
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>