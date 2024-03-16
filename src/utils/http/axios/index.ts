/*
 * @Date: 2024-03-02 17:12:35
 * @LastEditors: phil_litian
 */

import { PAxios } from './Axios'
import { AxiosResponse } from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { CreateAxiosOptions, AxiosTransform } from './axiosTransform'
import type { Result, RequestOptions } from '#/axios'
import { getToken } from '@u/auth/index'
import { useI18n } from '@h/web/useI18n'
import { useGlobalSetting } from '@h/setting/index'
import { ResultEnum } from '@/enums/httpEnum'
import { useMessage } from '@h/web/useMessage'
import { isString } from '@u/is'
import { setObjToUrlParams } from '@u/index'
import { RequestEnum } from '@e/httpEnum'
import { formatRequestDate, joinTimeStamp } from './helper'
import { checkStatus } from './checkStatus'

const { createErrorModal, createMessage } = useMessage()
const { urlPrefix, apiUrl } = useGlobalSetting()

const transform: AxiosTransform = {
  /**
   * 处理请求的配置信息
   */
  beforeRequestHook(config, options) {
    const { joinPrefix, apiUrl, joinTime, formatDate, joinParamsToUrl } = options

    // 添加前缀
    if ( joinPrefix ) {
      config.url = `${urlPrefix}${config.url}`
    }
    
    // 作用与axios里面的baseURL相同
    if ( apiUrl && isString(apiUrl) ) {
      config.url = `${apiUrl}${config.url}`
    }

    const params = config.params || {}
    let data = config.data || false
    data && formatDate && !isString(data) && formatRequestDate(data)
    if ( config.method?.toUpperCase() === RequestEnum.GET ) {
      if ( isString(params) ) {
        // 兼容restful
        config.url = `${config.url}${params}${joinTimeStamp(joinTime, true)}`
        config.params = undefined
      } else {
        // 是对象
        config.params = Object.assign({}, params, joinTimeStamp(joinTime, false))
      }
    } else {
      // 非GET
      if ( isString(params) ) {
        config.url = `${config.url}${params}`
        config.params = undefined
      } else {
        // data 有值 或者 是FormData的实例
        if ( config.data && (Reflect.ownKeys(config.data)?.length || config.data instanceof FormData) ) {
          config.data = data
          config.params = params
        } else {
          // 非get请求 如果没有传data 则将params视为data
          config.data = config.params
          config.params = undefined
        }

        if ( joinParamsToUrl ) {
          config.url = setObjToUrlParams(config.url, config.data)
        }
      }
    }
    return config
  },

  /**
   * 处理响应数据 如果不是预期的格式 直接抛出异常
   */
  transformResponseHook(res: AxiosResponse<Result>, options: RequestOptions ) {
    const { t } = useI18n('sys')
    const { isReturnNativeResponse, isTransformResponse } = options
    // 返回原生的数据类型
    if ( isReturnNativeResponse ) {
      return res
    }

    // 不进行任何额外处理 直接返回data 
    if ( !isTransformResponse ) {
      return res.data
    }
    
    // 出错时返回
    const { data } = res
    if ( !data ) {
      throw new Error(t('api.apiRequestFailed'))
    }
    // 这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, message, result } = data
    
    const successFlag = code === ResultEnum.SUCCESS
    
    // 请求成功
    if( successFlag ) {
      return result
    }

    // 对请求失败的处理
    let timeoutMsg = ''
    switch(code) {
      // 请求超时
      case ResultEnum.TIMEOUT: {
        timeoutMsg = t('api.timeoutMessage')
        // 请求超时 自动退出到登录页
        break
      }
      default: {
        if ( message ) {
          timeoutMsg = message
        }
      }
    }

    // 处理错误信息
    if ( options.errorMessageMode === 'modal' ) {
      createErrorModal({ title: t('api.timeoutMessage'), content: timeoutMsg })
    } else if ( options.errorMessageMode === 'message' ) {
      createMessage.error(timeoutMsg)
    }

    throw new Error(timeoutMsg || t('api.apiRequestFailed'))
  },

  // 请求拦截器 处理token
  requestInterceptors(config: InternalAxiosRequestConfig, options) {
    const token = getToken()
    if( token && options.requestOptions.withToken ) {
      config.headers.Authorization = options.authenticationScheme ? `${options.authenticationScheme}${token}` : token
    }
    return config
  },

  // 响应拦截器
  responseInterceptors(res: AxiosResponse) {
    return res
  },

  // 响应拦截器异常处理
  // 上报异常请求 可用于错误排查
  responseInterceptorsCatch: (instance: AxiosInstance, error: any) => {
    const { config: { requestOptions } } = error
    const { response, code, message, config } = error || {}
    const errorMessageMode = requestOptions?.errorMessageMode || 'none'
    const msg: string = ''

    // 校验状态
    checkStatus(response?.status, msg, errorMessageMode)

    // 针对GET请求 增加自动重试机制
    // const 

    return Promise.reject(error)
  },
}

// 创建一个请求的对象
const createAxios = (opt?: Partial<CreateAxiosOptions>) => {
  return new PAxios({
    // baseURL: "/basic-api",
    timeout: 10 * 1000, 
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    transform,
    // authenticationScheme: 'bearer ',
    authenticationScheme: '',
    requestOptions: {
      joinTime: true,
      joinPrefix: true,
      isReturnNativeResponse: false,
      isTransformResponse: true,
      withToken: true,
      // 错误提示是否使用弹窗 用于处理一些比较重要的错误提示
      errorMessageMode: 'message',
      // 用于拼接地址
      urlPrefix,
      // 格式化参数提交时间
      formatDate: true,
      // post请求时是否将params添加到url中
      joinParamsToUrl: false,
      // 接口地址
      apiUrl
    },
    ...opt
  })
}

export const defHttp = createAxios() 
