
export enum ExceptionEnum {
  PAGE_NOT_FOUND = 404,
  PAGE_NOT_ACCESS = 403,
  PAGE_ERROR = 500,
  PAGE_REDIRECT = 301,
  PAGE_FALLBACK = 404,
  PAGE_SUCCESS = 200,
  PAGE_TIMEOUT = 401,
  PAGE_NETWORK = 500,
  NET_WORK_ERROR = 10000,
  PAGE_NOT_REQUEST = 404,
  PAGE_NOT_RESPONSE = 10100,
}

export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  RESOURCE = 'resource',
  AJAX = 'ajax',
  PROMISE = 'promise'
}

