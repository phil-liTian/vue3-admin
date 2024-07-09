/*
 * @Date: 2024-07-02 20:54:57
 * @LastEditors: phil_litian
 */
import { PageWrapper } from "@/components/page";
import { Card, Typography, Spin, Input } from "ant-design-vue";
import { useReqest } from "@phil/hooks";
import { defineComponent, ref } from "vue";
import { imitateApi } from "./mock-api";

const TParagraph = Typography.Paragraph
const TText = Typography.Text

const Demo1 = defineComponent({
  setup() {
    const search = ref('')
    const { data, loading } = useReqest(imitateApi, { throttleWait: 2000, refreshDeps: [ search ] })

    return {
      search,
      loading,
      data
    }
  },
  render() {
    return <Card title='节流'>
      <Typography>
        <TParagraph>
          通过设置 <TText type="danger"> options.throttleWait </TText>，进入节流模式，此时如果频繁触发
          <TText code> run </TText>或者 <TText code> runAsync </TText>, 则会以节流策略进行请求。
        </TParagraph>

        <TParagraph>
          <TText code> {`const { data, loading } = useReqest(imitateApi, { throttleWait: 1000 })`} </TText>
        </TParagraph>

        <TParagraph>
          如上例代码，频繁触发 <TText code> run </TText> 1000ms触发一次
        </TParagraph>
      </Typography>

      <Spin spinning={this.loading}>
        <Input v-model={[this.search, 'value']}></Input>
        <div>Username: { this.data }</div>
      </Spin>
    </Card>
  }
})

export default defineComponent({
  setup() {
    return () => (
      <PageWrapper>
        <Demo1 />
      </PageWrapper>
    )
  }
})
