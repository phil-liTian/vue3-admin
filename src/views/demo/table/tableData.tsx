/*
 * @Date: 2024-05-07 09:29:15
 * @LastEditors: phil_litian
 */
import { BasicColumn } from '@c/PBase/Table/index'

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

