/*
 * @Date: 2024-05-07 09:29:15
 * @LastEditors: phil_litian
 */
import { Input } from 'ant-design-vue'
import { BasicColumn } from '@c/PBase/Table/index'
import { ref } from 'vue'

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ]
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 150,
      sorter: true
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 200,
      sorter: true
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 200,
      sorter: true
    },
  ]
}

export function getBasicShortColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 80,
    },
  ]
}

export function getBasicData() {
  return (() => {
    const arr: any = []
    for (let i = 0; i < 40; i++) {
      arr.push({
        id: i + 1,
        name: 'phil Li',
        address: '上海市 闵行区(Shang Hai)',
        no: i + 10,
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString()
      })      
    }

    return arr
  })()
}

export function getTreeTableData() {
  return (() => {
    let arr = []
    for (let i = 0; i < 40; i++) {
      arr.push({
        id: `${i + 1}`,
        name: 'phil Li',
        address: '上海市 闵行区(Shang Hai)',
        no: i + 10,
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
        children: [
          {
            id: `l2-${i + 1}-1`,
            name: 'phil Li',
            address: '上海市 闵行区(Shang Hai)',
            no: i + 10,
            width: 200,
            beginTime: new Date().toLocaleString(),
            endTime: new Date().toLocaleString(),
            children: [
              {
                id: `l3-${i + 1}-1`,
                name: 'phil Li',
                address: '上海市 闵行区(Shang Hai)',
                no: i + 10,
                width: 200,
                beginTime: new Date().toLocaleString(),
                endTime: new Date().toLocaleString(),
              },
              {
                id: `l3-${i + 1}-2`,
                name: 'phil Li',
                address: '上海市 闵行区(Shang Hai)',
                no: i + 10,
                width: 200,
                beginTime: new Date().toLocaleString(),
                endTime: new Date().toLocaleString(),
              }
            ]
          },
          {
            id: `l2-${i + 1}-2`,
            name: 'phil Li',
            address: '上海市 闵行区(Shang Hai)',
            no: i + 10,
            width: 200,
            beginTime: new Date().toLocaleString(),
            endTime: new Date().toLocaleString(),
            children: [
              {
                id: `l3-${i + 1}-1`,
                name: 'phil Li',
                address: '上海市 闵行区(Shang Hai)',
                no: i + 10,
                width: 200,
                beginTime: new Date().toLocaleString(),
                endTime: new Date().toLocaleString(),
              },
              {
                id: `l3-${i + 1}-2`,
                name: 'phil Li',
                address: '上海市 闵行区(Shang Hai)',
                no: i + 10,
                width: 200,
                beginTime: new Date().toLocaleString(),
                endTime: new Date().toLocaleString(),
              }
            ]
          }
        ]
      })   
    }

    return arr
  })()
}

export function getMultipleHeaderColumns(): BasicColumn[] {
  const testRef = ref('姓名')
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 200,
      customHeaderRender(column) {
        return <Input placeholder='输入值 更新自定义title' size='small' v-model:value={ testRef.value } />
      }
    },
    {
      title: '地址',
      dataIndex: 'address',
      children: [
        {
          title: '编号',
          dataIndex: 'no',
          customHeaderRender(column) {
            return <div>
              _ <span style="background: #f00; color: #fff">{ testRef.value }</span>
            </div>
          }
        },
        {
          title: '编号',
          dataIndex: 'no',
          width: 120
        },
        {
          title: '开始时间',
          dataIndex: 'beginTime',
          width: 120
        },
        {
          title: '结束时间',
          dataIndex: 'endTime',
          width: 120
        }
      ]
    }
  ]
}

const cellContent = (_, index) => ({
  colSpan: index === 9 ? 0 : 1
})

export function getMergeHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 300,
      customCell: (_, index) => ({
        colSpan: index === 9 ? 6 : 1,
      }),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 300,
      customCell: cellContent,
    },
    {
      title: '地址',
      dataIndex: 'address',
      colSpan: 2,
      width: 120,
      sorter: true,
      customCell: (_, index) => ({
        rowSpan: index === 2 ? 2 : 1,
        colSpan: index === 3 || index === 9 ? 0 : 1,
      }),
    },
    {
      title: '编号',
      dataIndex: 'no',
      colSpan: 0,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
      customCell: cellContent,
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 200,
      customCell: cellContent,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 200,
      customCell: cellContent,
    },
  ]
}

export const vxeTableColumns = [
  {
    title: '序号',
    type: 'seq'
  },
  {
    title: '固定列',
    type: 'name'
  },
  {
    title: '自适应列',
    field: 'address'
  }
]
