import { nextTick, ref, unref, watch } from "vue";
import { FormActionType, FormProps } from "../types/form";

type Props = Partial<FormProps>

export function useForm(props?: Props) {
  const formRef = ref<Nullable<FormActionType>>(null);

  async function getForm() {
    const form = unref(formRef)
    if ( !form ) {
      return
    }
    await nextTick()
    return form as FormActionType
  }

  function register(instance: FormActionType) {
    formRef.value = instance
    watch(() => props, () => {
      props && instance.setProps(props)
    }, { immediate: true, deep: true })
  }


  const methods: FormActionType = {
    submit: async () => {
      const form = await getForm()
      return form.submit()
    }
  }

  return [ register, methods ]
}
