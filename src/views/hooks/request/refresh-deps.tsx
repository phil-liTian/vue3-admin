
/*
 * @Date: 2024-07-02 20:52:54
 * @LastEditors: phil_litian
 */
import { Card } from "ant-design-vue";
import { defineComponent } from "vue";


export default defineComponent({
  setup() {
    return () => (
      <Card title='Ref 依赖刷新'></Card>
    )
  }
})