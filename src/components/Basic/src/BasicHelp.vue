<!--
 * @Date: 2024-03-01 15:08:40
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
  import { defineComponent, h, PropType } from "vue";
  import { Tooltip } from 'ant-design-vue'
  import { InfoCircleOutlined } from '@ant-design/icons-vue'
  import { isArray, isString } from "@/utils/is";
  import { propTypes } from "@/utils/propTypes";

  const props = {
    showIndex: propTypes.bool.def(false),
    text: [String, Array] as PropType<string[] | string>
  }

  export default defineComponent({
    name: 'PBasicHelp',
    props,
    setup(props, { slots }) {
      function renderTitle() {
        const textList = props.text

        if ( isString(textList) ) {
          return <p>{textList}</p>
        }

        if ( isArray(textList) ) {
          return (textList as Array<string>).map((text, index) => {
            return <p key={text}>
                { props.showIndex ? `${index + 1}.` : '' } { text }
              </p>
          })
        }
      }

      return () => {
        return <Tooltip title={renderTitle()}>
          <InfoCircleOutlined />
        </Tooltip>
      }
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>