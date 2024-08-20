import { PropType } from "vue"

export const basicProps = {
  /**
   * 上传描述信息
   */
  helpText: {
    type: String,
    default: ''
  },

  /**
   * 文件最大MB
   */
  maxSize: {
    type: Number as PropType<number>,
    default: 2
  },

  /**
   * 最大文件数量
   */
  maxNumber: {
    type: Number as PropType<number>,
    default: 1
  },
  
  /**
   * 接受的文件类型
   */
  accept: {
    type: Array as PropType<string[]>,
    default: () => []
  },

  api: {
    type: Function,
    default: null,
    require: true
  },

  name: {
    type: String as PropType<string>,
    default: 'file'
  },

  filename: {
    type: String as PropType<string>,
    default: ''
  }

}

// uploadModal props
export const uploadContainerProps = {
  ...basicProps,
  emptyHidePreview: {
    typpe: Boolean,
    default: false
  },
}

// fileList Props
export const fileListProps = {
  columns: {
    type: Array,
    default: () => []
  },
  actionColumns: {
    type: Array,
    default: () => []
  },
  dataSource: {
    type: Array,
    default: () => []
  }
}


export const previewProps = {
  value: {
    type: Array as PropType<string[]>,
    default: () => []
  }
}
