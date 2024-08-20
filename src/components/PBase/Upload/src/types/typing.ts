import { BasicColumn } from "@/components/PBase/Table";


export interface FileBasicColumn extends Omit<BasicColumn, 'customRender'> {
  title: string,
  dataIndex: string,
  customRender?: Function
}

export interface FileItem {
  thumbUrl?: string; // 缩略图url
  name: string;
  file: File;
  type?: string;
  uuid?: string;
  status?: UploadResultStatus,
  percent?: number,
  response?: any
}

export enum UploadResultStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  UPLOADING = 'uploading',
  DONE = 'done'
}


