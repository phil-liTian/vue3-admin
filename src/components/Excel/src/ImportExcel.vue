<template>
  <div>
    <input 
      ref="inputRef"
      v-show="false"
      type="file" 
      accept=".xlsx, .xls"
      @change="handleInputClick" />
    <div @click="handleUpload"></div>
  </div>
</template>
  
<script lang='ts' setup>
  import { ref, unref } from 'vue'
  import * as XLSX from 'xlsx'
  
  const props = defineProps({
    isReturnFile: {
      type: Boolean,
      default: false
    }
  })
  const emits = defineEmits(['success', 'error'])
  const inputRef = ref<HTMLInputElement | null>(null)
  const readerData = (rawFile: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {

        } catch (error) {
          reject(error)
          emits('error')
        } finally {
          
        }
      }

      reader.readAsArrayBuffer(rawFile)
    })
  }

  const upload = (rawFile: File) => {

    readerData(rawFile)
  }

  const handleInputClick = (e: Event) => {
    const target = e && (e.target as HTMLInputElement)
    const files = target.files
    const rawFile = files && files[0]
    if ( !rawFile ) return

    if ( props.isReturnFile ) {
      emits('success', rawFile)
      return
    }

    upload(rawFile)
  }
  
  const handleUpload = () => {
    const inputRefDom = unref(inputRef)
    if ( inputRefDom ) {
      inputRefDom.click()
    }
  }
</script>
  
<style lang='less' scoped>
  
</style>