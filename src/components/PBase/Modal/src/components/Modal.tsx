/*
 * @Date: 2024-04-12 16:15:41
 * @LastEditors: phil_litian
 */
import { defineComponent } from "vue";
import { Modal } from 'ant-design-vue'
import { basicProps } from "../props";

export default defineComponent({
  name: 'Modal',
  props: basicProps,
  setup(props) {
    return () => {
      const propsData = { ...props }
      return <Modal { ...propsData }><slot></slot></Modal>
    }
  }
})
