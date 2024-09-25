/*
 * @Date: 2024-07-02 20:50:11
 * @LastEditors: phil_litian
 */
import { PageWrapper } from "@/components/page";
import { Card, Typography, Space, Button, message } from "ant-design-vue";
import { useReqest } from "@phil/hooks";
import { defineComponent } from "vue";
import { imitateApi } from "./mock-api";
const TParagraph = Typography.Paragraph
const TText = Typography.Text
const Demo1 = defineComponent({
  setup() {
    const { loading, data, run, cancel } = useReqest(imitateApi, { pollingInterval: 2000 })

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
            <Button onClick={() => run()}>start</Button>
            <Button type='dashed' onClick={cancel}>stop</Button>
          </Space>
        </div>
      </Card>
    )
  }
})

const Demo2 = defineComponent({
  setup() {
    const { loading, run, data, cancel } = useReqest(imitateApi, 
      { 
        pollingInterval: 3000, 
        pollingErrorRetryCount: 3, // 错误重试？
        onError: (error) => {
          message.error(error.message)
        }
      }
    )

    return () => <Card title="轮询错误重试" class="mt-2">
      <Typography>
        <TParagraph>
          通过
          <TText type="danger"> options.pollingErrorRetryCount </TText>
          轮询错误重试次数。
        </TParagraph>
        <TParagraph>
          <TText code>
            {`const { data, run, cancel } = useRequest(imitateApi, { pollingInterval: 3000,  pollingErrorRetryCount: 3 });`}
          </TText>
        </TParagraph>
      </Typography>

      <div>
        <div>Username: {loading.value ? 'Loading' : data.value}</div>
        <Space>
          <Button onClick={() => run('lutz', false)}>start</Button>
          <Button type="dashed" onClick={cancel}>
            stop
          </Button>
        </Space>
      </div>
    </Card>
  }
})


export default defineComponent({
  setup() {
    return () => (
      <PageWrapper>
        <Demo1 />
        <Demo2 />
      </PageWrapper>
    )
  }
})