/*
 * @Date: 2024-07-02 20:54:51
 * @LastEditors: phil_litian
 */
import { Card, message, Typography, Space, Input, Button } from "ant-design-vue";
import { useReqest } from '@phil/hooks'
import { defineComponent, ref } from "vue";
import { imitateApi } from "./mock-api";
import { PageWrapper } from "@/components/page";

const TParagraph = Typography.Paragraph
const TText = Typography.Text

const Demo1 = defineComponent({
  setup() {
    const count = ref(1)
    const search = ref('')
    const { run, data, loading } = useReqest(imitateApi, {
      retryCount: 3,
      onError: (error)  => {
        message.error(`${error.message}: count: ${count.value++}`)
      }
    })
    return () => 
      <Card title='错误重试'>
        <Typography>
          <TParagraph>
            通过设置
            <Typography.Text type="danger"> options.retryCount </Typography.Text>
            ，指定错误重试次数，则 useRequest 在失败后会进行重试。
          </TParagraph>
          <TText code>
            {`const { data, run } = useRequest(imitateApi, { retryCount: 3 });`}
          </TText>
        </Typography>

        <Space class="mt-4">
          <Input v-model={[search.value, 'value']} placeholder="Please enter username" />
          <Button type="primary" disabled={loading.value} onClick={() => run(search.value, false)}>
            {loading.value ? 'Loading' : 'Edit'}
          </Button>
        </Space>
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