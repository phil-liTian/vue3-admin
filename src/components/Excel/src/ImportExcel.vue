<template>
  <div>
    <input 
      ref="inputRef"
      v-show="false"
      type="file" 
      accept=".xlsx, .xls"
      @change="handleInputClick" />
      <div @click="handleUpload">
        <slot></slot>
      </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { ref, unref } from 'vue'
  import * as XLSX from 'xlsx'
  import { ExcelData } from './typing';
  
  const props = defineProps({
    isReturnFile: {
      type: Boolean,
      default: false
    }
  })
  const { utils } = XLSX
  const emits = defineEmits(['success', 'error'])
  const inputRef = ref<HTMLInputElement | null>(null)

  const getHeaderRow = (sheet: XLSX.Sheet) => {
    if ( !sheet || !sheet['!ref'] ) return []
    let headers: string[] = []
    // { s: { c: 0, r: 0 }, e: { c: 6, r: 40 } }
    // 6列40行
    const range = utils.decode_range(sheet['!ref'])

    for ( let c = range.s.c; c <= range.e.c; ++c  ) {
      const cell = sheet[utils.encode_cell({ c, r: 0 })]
      let hdr = 'UNKNOWN' + c
      if ( cell && cell.t ) {
        hdr = cell.w || cell.v
      }
      headers.push(hdr)
    }

    return headers
  }

  const getExcelData = (workbook: XLSX.WorkBook) => {
    const excelData: ExcelData[] = []

    workbook.SheetNames.map(sheetName => {
      const worksheet = workbook.Sheets[sheetName]
      const header: string[] = getHeaderRow(worksheet)
      // dataList数据
      const results = utils.sheet_to_json(worksheet)

      excelData.push({
        header,
        results,
        meta: {
          sheetName
        }
      })
    })

    return excelData
  }

  
  const readerData = (rawFile: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          // 返回一个ArrayBuffer
          const data = e.target && e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const excelData = getExcelData(workbook)
          emits('success', excelData)
          resolve('')
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