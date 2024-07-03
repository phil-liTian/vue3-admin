/*
 * @Date: 2024-07-02 20:47:40
 * @LastEditors: phil_litian
 */
import { defineComponent } from "vue";
import { Card } from 'ant-design-vue'
import { PageWrapper } from "@/components/page";

export default defineComponent({
  setup() {
    return () => (
      <PageWrapper>
        <Card title='Loading Delay'></Card>
      </PageWrapper>
    )
  }
})