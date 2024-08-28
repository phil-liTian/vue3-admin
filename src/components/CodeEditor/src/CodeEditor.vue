<template>
  <div>
    <CodeMirrorEditor 
      v-model:value="getValue" />
  </div>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue';
  import CodeMirrorEditor from './codemirror/CodeMirror.vue';
  const emits = defineEmits(['update:value'])

  const props = defineProps({
    value: {
      type: String,
      default: ''
    }
  })

  // const getValue = computed(() => {
  //   const { value } = props
  //   return value
  // })

  const getValue = computed({
    get: () => {
      return props.value
    },
    set: (val) => {
      emits('update:value', val)
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>