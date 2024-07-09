/*
 * @Date: 2024-06-28 14:40:52
 * @LastEditors: phil_litian
 */
import { Card, Typography, Spin, Space, Input } from "ant-design-vue";
import { useReqest } from "@phil/hooks";
import { defineComponent, ref } from "vue";
import { imitateApi } from "./mock-api";
import PageWrapper from "@/components/page/src/pageWrapper.vue";
const TParagraph = Typography.Paragraph
const TText = Typography.Text
const Demo1 = defineComponent({
  setup() {
    const search = ref('')
    const { data, loading } = useReqest(imitateApi, {
      debounceWait: 1000,
      refreshDeps: [search]
    })
    
    return () => (
      <Card title='防抖'>
        <Typography>
          <TParagraph>
            通过设置 <TText type="danger">options.debounceWait</TText>, 进入防抖模式，此时如果频繁触发
            <TText code>run</TText>或者 <TText code>runAsync</TText>则会以防抖策略进行请求。
          </TParagraph>

          <TParagraph>
            如上示例代码频繁触发<TText code>run</TText>, 300ms执行一次
          </TParagraph>

          <TParagraph>你可以在下面 input 框中快速输入文本，体验效果</TParagraph>
        </Typography>

        <Spin spinning={loading.value}>
          <Space direction='vertical'>
            <Input v-model={[search.value, 'value']} placeholder='Please enter username'></Input>
            <div>UserName: { data.value }</div>
          </Space>
        </Spin>
      </Card>
    )   
  }
})


export default defineComponent({
  render() {
    return <PageWrapper>
      <Demo1 />
    </PageWrapper>
  }
})