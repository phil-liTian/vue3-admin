/*
 * @Date: 2024-07-02 20:52:54
 * @LastEditors: phil_litian
 */
import { Card, Typography, Spin } from "ant-design-vue";
import { defineComponent, unref } from "vue";
import { useReqest } from '@phil/hooks'
import { imitateApi } from "./mock-api";
import { PageWrapper } from "@/components/page";

const TParagraph = Typography.Paragraph
const TText = Typography.Text

export default defineComponent({
  setup() {
    const { run, data, loading } = useReqest(imitateApi, { refreshOnWindowFocus: true })

    return () => (
      <PageWrapper>
        <Card title='屏幕聚焦重新请求'>
          <Typography>
            <TParagraph>
              通过设置 <TText code> options.refreshOnWindowFocus </TText>在浏览器窗口 <TText code>refocus</TText> 和 <TText>revisible</TText>时, 会重新发起请求。
            </TParagraph>

            <TParagraph>
              <TText code>{`const { run, data, loading } = useReqest(imitateApi, { refreshOnWindowFocus: true })`}</TText>
            </TParagraph>

            <TParagraph>
              你可以点击浏览器外部，再点击当前页面来体验效果（或者隐藏当前页面，重新展示）,如果和上一次请求间隔大于
              5000ms, 则会重新请求一次。
            </TParagraph>
          </Typography>

          <Spin spinning={loading.value}>
            <div>Username: { unref(data) }</div>
          </Spin>
        </Card>
      </PageWrapper>
    )
  }
})