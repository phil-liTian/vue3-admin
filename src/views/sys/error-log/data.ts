import { useI18n } from '@h/web/useI18n'
import { BasicColumn } from '@c/PBase/Table/index'

const { t } = useI18n()

export function getColumns(): BasicColumn[] {
  return [
    {
      title: t('sys.errorLog.tableColumnType'),
      dataIndex: "type",
      width: 80
    },
    {
      title: 'URL',
      dataIndex: "url",
      width: 200
    },
    {
      title: t('sys.errorLog.tableColumnDate'),
      dataIndex: "date",
      width: 200
    },
    {
      title: t('sys.errorLog.tableColumnFile'),
      dataIndex: "file",
      width: 200
    },
    {
      title: "Name",
      dataIndex: 'name',
      width: 160
    },
    {
      title: t('sys.errorLog.tableColumnMsg'),
      dataIndex: 'message',
      width: 300
    },
    {
      title: t('sys.errorLog.tableColumnStackMsg'),
      dataIndex: 'stack'
    }
  ]
}

export function getDescSchema() {
  return getColumns().map(column => {
    return {
      label: column.title,
      key: column.dataIndex,
    }
  })
}
