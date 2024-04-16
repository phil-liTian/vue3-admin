/*
 * @Date: 2024-04-12 17:00:37
 * @LastEditors: phil_litian
 */

import { ref } from "vue";
import { ModalMethods, ReturnMethods } from "../typing";

export function useModal(): any {

  const modal = ref(null)


  function register(modalMethods: ModalMethods) {
    console.log('register');

    modal.value = modalMethods
  }

  function getInstance() {
    let instance = modal.value

    if ( !instance ) {
      return
    }

    return instance
  }


  const methods: ReturnMethods = {
    openModal(open = true) {
      getInstance()?.setModalProps({ open })
    }
  }

  return [register, methods]
}
