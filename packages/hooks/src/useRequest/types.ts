/*
 * @Date: 2024-06-18 21:56:25
 * @LastEditors: phil_litian
 */
import { WatchSource } from "vue";
import type Fetch from "./Fetch";
export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>

export interface UseRequestOptions<TData, TParams extends any[]> {
  manual?: boolean, // 是否手动运行
  defaultParams?: TParams,
  cacheKey?: string | number;
  ready?: boolean;
  
  onSuccess?: (data: TData, params: TParams) => void;
  onBefore?: (params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (data: TData, params: TParams, e: Error) => void;

  // debounce 防抖
  debounceWait?: number; // 防抖等待时间 单位为毫秒
  debounceLeading?: boolean; // 在延迟开始前执行调用
  debounceMaxWait?: number; // 设置 func 允许被延迟的最大值
  debounceTrailing?: boolean; // 指定在延迟结束后调用

  // throttle 节流
  throttleWait?: number; 
  throttleLeading?: boolean; // 指定调用在节流开始前
  throttleTrailing?: boolean; // 指定调用在节流结束后

  // refreshDeps
  refreshDeps?: WatchSource<any>[];
  refreshDepsAction?: () => void;

  // 轮询
  pollingInterval?: number; // 轮询的时间间隔
  pollingErrorRetryCount?: number; // 轮询重试的次数
  pollingWhenHidden?: boolean; // 页面隐藏时是否继续轮询

  // loading delay
  loadingDelay?: number;

  // 屏幕聚焦时 重新请求
  refreshOnWindowFocus?: boolean;
  focusTimespan?: number; // 重新请求 间隔时间

  staleTime?: number; // 过期时间
  cacheTime?: number;
  setCache?: (data) => void;
  getCache?: (data) => undefined
}

export interface FetchState<TData, TParams extends any[]> {
  loading: boolean;
  params?: TParams;
  data?: TData;
  error?: Error
}

export interface PluginReturn<TData, TParams extends any[]> {
  onRequest?: (
    service: Service<TData, TParams>, 
    params: TParams
  ) => { servicePromise?: Promise<TData> };

  onSuccess?: (data: TData, params: TParams) => void;

  onBefore?: (params: TParams) => void | ({ stopNow?: boolean; returnNow?: boolean } & Partial<FetchState<TData, TParams>> );

  onError?: (e: Error, params: TParams) => void;

  onFinally?: (data: TData, params: TParams, e: Error) => void;

  onCancel?: () => void
}

export interface UseRequestPlugin<TData, TParams extends any[]> {
  (fetchInstance: Fetch<TData, TParams>, fetchOptions: UseRequestOptions<TData, TParams>): PluginReturn<TData, TParams>;
  onInit?: (options: UseRequestOptions<TData, TParams>) => Partial<FetchState<TData, TParams>>
}

export type UseRequestTimeout = ReturnType<typeof setTimeout>
