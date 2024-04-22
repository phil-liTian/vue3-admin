/*
 * @Date: 2024-04-12 17:00:37
 * @LastEditors: phil_litian
 */

import { nextTick, reactive, ref, toRaw, unref, watchEffect } from "vue";
import { ModalMethods, ReturnMethods } from "../typing";
import { isFunction } from "@/utils/is";
// 可从父组件直接传递数据到子组件
const dataTransfer = reactive<any>({})

export function useModal(): any {

  const modal = ref(null)
  const uid = ref<number>(0)

  function register(modalMethods: ModalMethods, uuid: number) {
    modal.value = modalMethods
    
    uid.value = uuid
  }

  function getInstance() {
    let instance = modal.value

    if ( !instance ) {
      return
    }

    return instance
  }

  const methods: ReturnMethods = {
    setModalProps(props) {
      getInstance()?.setModalProps(props)
    },

    openModal<T>(open = true, data?: T, openOnSet = true) {
      getInstance()?.setModalProps({ open })
      if ( !data ) return
      const id = unref(uid)
      if ( openOnSet ) {
        dataTransfer[id] = toRaw(data)
      }
    },

    // 关闭modal
    closeModal() {
      getInstance()?.setModalProps({ open: false })
    }
  }

  return [register, methods]
}

export function useModalInner(callbackFn?: Fn) {
  const uidRef = ref<number>(0)
  const modalInstanceRef = ref<Nullable<ModalMethods>>(null)


  function register(modalInstance: ModalMethods, uuid: number) {
    uidRef.value = uuid
    modalInstanceRef.value = modalInstance
  }

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)]
    if ( !data ) return
    if ( !callbackFn || !isFunction(callbackFn) ) return
    callbackFn(data)
  })

  return [register]
}
