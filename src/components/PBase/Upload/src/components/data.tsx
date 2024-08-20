
import { Tag, Progress } from 'ant-design-vue'
import { useI18n } from '@h/web/useI18n'
import { FileBasicColumn, UploadResultStatus } from '../types/typing'
import ThumbUrl from './ThumbUrl.vue'
import TableAction from '@/components/PBase/Table/src/components/TableAction.vue'
export const createTableColumns = (): FileBasicColumn[] => {
  const { t } = useI18n('component.upload')
  return [
    {
      dataIndex: 'thumbUrl',
      width: 100,
      title: t('legend'),
      customRender: ({ record }) => {
        return record.thumbUrl && <ThumbUrl fileUrl={record.thumbUrl} />
      }
    },
    {
      title: t('fileName'),
      dataIndex: 'name',
      align: 'left',
      customRender: ({ text, record }) => {
        const { percent } = record
        return <div>
          <p>{ text }</p>
          <Progress percent={percent} />
        </div>
      }
    },
    {
      dataIndex: 'size',
      width: 100,
      title: t('size'),
      customRender: ({ text = 0 }) => {
        return text && `${(text / 1024).toFixed(2)}KB`
      }
    },
    {
      dataIndex: 'status',
      width: 100,
      title: t('fileStatus'),
      customRender: ({ text }) => {
        if ( text === UploadResultStatus.SUCCESS ) {
          return <Tag color='green'>{ t('uploadSuccess') }</Tag>
        } else if ( text === UploadResultStatus.ERROR ) {
          return <Tag color='red'>{ t('uploadFail') }</Tag>
        } else if ( text === UploadResultStatus.UPLOADING ) {
          return <Tag color='blue'>{ t('pending') }</Tag>
        }
        return text || t('pending')
      }
    }
  ]
}

export const createActionColumns = ( handleRemove ): FileBasicColumn[] => {
  const { t } = useI18n('component.upload')
  return [
    {
      width: 120,
      dataIndex: 'action',
      title: t('action'),
      customRender: ({ record }) => {
        const actions = [ 
          {
            label: t('del'),
            color: 'red',
            onClick: handleRemove.bind(null, record)
          }
        ]

        return <TableAction actions={ actions } />
      }
    }
  ]
}

export const createPreviewColumns = (): FileBasicColumn[] => {
  const { t } = useI18n('component.upload')
  return [
    {
      dataIndex: 'thumbUrl',
      width: 100,
      title: t('legend'),
      customRender: ({ record }) => {
        return record.thumbUrl && <ThumbUrl fileUrl={record.thumbUrl} />
      }
    },
    {
      title: t('fileName'),
      dataIndex: 'name',
      align: 'left'
    }
  ]
}

export const createPreviewActionColumns = ({ handleRemove, handleDownload }): FileBasicColumn[] => {
  const { t } = useI18n('component.upload')
  return [
    {
      width: 160,
      dataIndex: 'action',
      title: t('action'),
      customRender: ({ record }) => {
        const actions = [ 
          {
            label: t('del'),
            color: 'error',
            onClick: handleRemove.bind(null, record)
          },
          {
            label: t('download'),
            color: 'green',
            onClick: handleDownload.bind(null, record)
          }
        ]
        return <TableAction actions={actions} />
      }
    }
  ]
}
