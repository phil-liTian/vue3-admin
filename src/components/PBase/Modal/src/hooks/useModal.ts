/*
 * @Date: 2024-04-12 17:00:37
 * @LastEditors: phil_litian
 */

import { ModalMethods, ReturnMethods } from "../typing";

export function useModal() {

  function register(modalMethods: ModalMethods) {
    console.log('register');
  }

  const methods: ReturnMethods = {
    openModal() {

    }
  }

  return [register, methods]
}
