/*
 * @Date: 2024-07-02 20:50:11
 * @LastEditors: phil_litian
 */
import { PageWrapper } from "@/components/page";
import { Card, Typography, Space, Button } from "ant-design-vue";
import { useReqest } from "@phil/hooks";
import { defineComponent } from "vue";
import { imitateApi } from "./mock-api";
const TParagraph = Typography.Paragraph
const TText = Typography.Text
const Demo1 = defineComponent({
  setup() {
    const { loading, data } = useReqest(imitateApi, { pollingInterval: 2000 })

    return () => (
      <Card title='基本用法'>
        <Typography>
          <TParagraph>通过设置
            <TText type="danger"> options.pollingInterval </TText>,
            进入轮询模式， useRequest会定时触发service执行
          </TParagraph>
          <TParagraph>
            <TText code>{`const { loading, data } = useReqest(imitateApi, { pollingInterval: 2000 })`}</TText>
          </TParagraph>
        </Typography>

        <div>
          <div>username: { loading.value ? 'Loading' : data.value }</div>
          <Space>
            <Button>start</Button>
            <Button type='dashed'>stop</Button>
          </Space>
        </div>
      </Card>
    )
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