import { defHttp } from "@/utils/http/axios";

enum Api {
  OPTIONS_LIST = '/tree/getDemoOptions'
}

export const treeOptionsListApi = (params) => {
  return defHttp.get({ url: Api.OPTIONS_LIST }, params)
}