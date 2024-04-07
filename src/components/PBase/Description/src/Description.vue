<!--
 * @Date: 2024-04-07 10:34:29
 * @LastEditors: phil_litian
-->
<script lang='tsx'>

import { defineComponent, ref, unref } from 'vue';
import type { MyDescriptionProps, DescInstance } from './typing'
  
export default defineComponent({
  name: 'PDescription',
  emits: [ 'register' ],
  setup(props, { slots, emit }) {
    const propsRef = ref<Nullable<Partial<MyDescriptionProps>>>(null)

    const setDescProps = (descProps: Partial<MyDescriptionProps>): void => {
      propsRef.value = {
        ...(unref(propsRef) as Record<string, any>),
        ...descProps
      } as Record<string, any>
    }

    const methods:DescInstance = {
      setDescProps
    }

    emit('register', methods)

    return 'PDescription'
  }
})
  
</script>