import { resultSuccess } from "../_utils";


const demoTreeList = (keyword) => {
  const result = {
    list: [] as any[]
  }

  for (let i = 0; i < 5; i++) {
    const children = [] as any[]
    for (let j = 0; j < 3; j++) {
      children.push({
        title: `选项${i}-${j}`,
        key: `${i}-${j}`,
        value: `${i}-${j}`
      })
    }
    result.list.push({
      title: `选项${i}`,
      key: i,
      value: i,
      children
    })
  }
  return result
}
export default [
  {
    url: '/basic-api/tree/getDemoOptions',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      console.log('query', query);
      return resultSuccess(demoTreeList)
    }
  }
]