<template>
   <Codemirror 
    :style="{ height: '600px' }"
    :extensions="extensions"
    placeholder="code here..."
    v-model:model-value="showValue" />
</template>
  
<script lang='ts' setup>
  import { computed, onMounted, ref } from 'vue'
  import { Codemirror } from 'vue-codemirror'
  import { javascript } from '@codemirror/lang-javascript'
  
  const emits = defineEmits(['update:value'])
  const props = defineProps({
    value: {
      type: String,
      default: ''
    }
  })

  // const showValue = computed(() => {
  //   return props.value
  // })


  const showValue = computed({
    get: () => {
      return props.value
    },
    set: (val) => {
      emits('update:value', val)
    }
  })

  const el = ref(null)
  const extensions = [ javascript() ]

  // const handleChange = (value) => {
  //   emits('update:value', value)
  // }

  onMounted(() => {})
</script>
  
<style lang='less' scoped>
  
</style>