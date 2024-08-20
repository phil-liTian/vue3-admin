import { UploadFileParams } from "#/axios";
import { defHttp } from "@/utils/http/axios";
import { AxiosProgressEvent } from "axios";

export function uploadApi(params: UploadFileParams, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) {
  
  return defHttp.uploadFile({
    url: '/upload',
    onUploadProgress
  }, params)
}