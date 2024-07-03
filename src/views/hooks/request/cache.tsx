/*
 * @Date: 2024-06-28 14:39:48
 * @LastEditors: phil_litian
 */
import { defineComponent, ref, unref } from "vue";
import { Typography, Card, Button } from 'ant-design-vue'
import { PageWrapper } from '@c/page/index'
import { useReqest } from '@phil/hooks'
import { imitateApi } from "./mock-api";

const TParagraph = Typography.Paragraph
const TLink = Typography.Link
const TText = Typography.Text

const Article1 = defineComponent({
  props: {
    cacheKey: {
      type: String,
      default: 'cacheKey-demo'
    }
  },

  setup(props) {
    const { loading, data } = useReqest(imitateApi, { cacheKey: props.cacheKey })
    return () => (
      <>
        <p>loading: { loading.value ? 'true' : 'false' }</p>
        <p>{ unref(data) }</p>
      </>
    )
  }
})

const Demo1 = defineComponent({
  setup() {
    const state = ref(false)
    const toggle = (bool?: boolean) => {
      state.value = bool ?? !state.value
    }
    return () => (
      <Card title='SWR'>
        <Typography>
          <TParagraph>
            下面的示例，我设置了 <TText type="danger">cacheKey</TText>, 在组件第二次加载时，会优先返回缓存的内容，然后在背后重新发起.你可以通过点击按钮来体验效果
          </TParagraph>
        </Typography>

        {/* SWR */}
        <div class='mt-4'>
          <Button onClick={() => toggle()}>
            { state.value ? 'hidden' : 'show' }
          </Button>
          { state.value && <Article1 /> }
        </div>
      </Card>
    )
  }
})

export default defineComponent({
  // setup() {
  //   return {

  //   }
  // },

  render() {
    return <PageWrapper>
      <Demo1 />
    </PageWrapper>
  }
})
