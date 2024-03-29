<!--
 * @Date: 2024-03-01 15:08:40
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
  import { defineComponent, h } from "vue";
  import { InfoCircleOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'PBasicHelp',
    setup(props, { slots }) {
      return () => {
        return <InfoCircleOutlined />
      }
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>