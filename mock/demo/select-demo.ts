import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "../_utils";

const demoList = (keyword, count = 20) => {
  let result = {
    list: [] as any[]
  }

  for (let i = 0; i < count; i++) {
    result.list.push({
      label: `选项${i}`,
      value: i
    })
  }

  return result.list
}


export default [
  {
    url: '/basic-api/select/getDemoOptions',
    method: 'get',
    response: ({ body, query }) => {
      console.log('body, query', body, query);
      
      const { keyword, count } = query
      
      return resultSuccess(demoList(keyword, count))
    }
  }
] as MockMethod[]