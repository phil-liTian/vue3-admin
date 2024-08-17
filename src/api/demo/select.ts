import { defHttp } from "@/utils/http/axios";

enum Api {
  OPTION_LIST = '/select/getDemoOptions'
}

export const getOptionsApi = (params) => defHttp.get({ url: Api.OPTION_LIST, params })
