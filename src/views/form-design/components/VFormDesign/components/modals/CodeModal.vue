<template>
  <PBasicModal
    title="代码"
    :width="800"
    @close="handleCancel"
    :open="visible">

    <PreviewCode :editorJson="editorJson" />
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { computed, ref } from 'vue';
  import { IFormConfig } from '@/views/form-design/typings/v-form-component';
  // import { PCodeEditor } from '@c/CodeEditor/index'
  import PreviewCode from './PreviewCode.vue';

  const codeVueFront = `<template>
  <div>
    <v-form-create
      :formConfig="formConfig"
      :formData="formData"
      v-model="fApi"
    />
    <PButton @click="submit">提交</PButton>
  </div>
</template>
<script lang='ts' setup>
  import { ref } from 'vue'
  defineOptions({ name: 'demo' })

  const fApi = ref({})
  const formData = ref({})
  const formConfig = ref(`
  
  /* eslint-disable */
  let codeVueLast = `
  );
  async submit() {
    const data = await fApi.submit()
    console.log(data)
  }
}
<\/script>`;

  const visible = ref(false)
  const jsonData = ref({})


  const editorJson = computed(() => {
    // return '11'
    return codeVueFront + JSON.stringify(jsonData.value, null, '\t\t') + codeVueLast
  })

  const showModal = (formConfig: IFormConfig) => {
    jsonData.value = formConfig
    visible.value = true
  }

  const handleCancel = () => {
    visible.value = false
  }

  defineExpose({ showModal })
</script>
  
<style lang='less' scoped>
  
</style>