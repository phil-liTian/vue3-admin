/*
 * @Date: 2024-07-27 16:30:43
 * @LastEditors: phil_litian
 */
import type { Directive } from 'vue'


const RippleDirective: Directive = {
  beforeMount(el: HTMLElement, binding: any) {
    console.log('beforeMount');
  },

  updated() {
    console.log('updated');
  },
}

export default RippleDirective