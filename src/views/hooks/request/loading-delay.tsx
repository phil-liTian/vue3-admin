/*
 * @Date: 2024-07-02 20:47:40
 * @LastEditors: phil_litian
 */
import { defineComponent, unref } from "vue";
import { Card, Typography, Space, Button } from 'ant-design-vue'
import { PageWrapper } from "@/components/page";
import { useReqest } from '@phil/hooks'
import { imitateApi } from './mock-api'

const TText = Typography.Text
const TLink = Typography.Link
const TParagraph = Typography.Paragraph

export default defineComponent({
  setup() {
    const { run, loading, data } = useReqest(imitateApi);

    const { run: withLoadingDelayRun, loading: withLoadingDelayLoading, data: withLoadingDelayData } = useReqest(imitateApi, {
      loadingDelay: 3000
    })

    const trigger = () => {
      run('phil');
      withLoadingDelayRun('phil')
    }
    return () => (
      <PageWrapper>
        <Card title='Loading Delay'>
          <Typography>
            <TParagraph>
              通过设置 <TText code> options.loadingDelay </TText> 可以延迟 <TText code> loading </TText> 变成 <TText code> true </TText>的时候， 有效防止闪烁
            </TParagraph>

            <TParagraph>
              <TText code>{`const { run: withLoadingDelayRun } = useReqest(imitateApi, { loadingDelay: 3000 })`} </TText>
            </TParagraph>

            <TParagraph>
              
            </TParagraph>
          </Typography>

          <Space direction='vertical'>
            <Button onClick={trigger}>Run</Button>
            <div>Username: { unref(loading) ? 'Loading...' : unref(data) }</div>

            <div>Username: Username: { unref(withLoadingDelayLoading) ? 'Loading...' : unref(withLoadingDelayData) }</div>
          </Space>
        </Card>
      </PageWrapper>
    )
  }
})