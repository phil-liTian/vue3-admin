/*
 * @Date: 2024-04-12 16:15:41
 * @LastEditors: phil_litian
 */
import { defineComponent, toRefs } from "vue";
import { Modal } from 'ant-design-vue'
import { basicProps } from "../props";
import { useDragMove } from "../hooks/useModalDrag";

export default defineComponent({
  name: 'Modal',
  props: basicProps,
  setup(props, { slots }) {
    const { open, destroyOnClose, draggable } = toRefs(props)
    useDragMove({
      open,
      destroyOnClose,
      draggable
    })

    return () => {
      const propsData = { ...props }
      
      return <Modal { ...propsData }>{ slots }</Modal>
    }
  }
})
