/*
 * @Date: 2024-06-18 21:56:25
 * @LastEditors: phil_litian
 */
import type Fetch from "./Fetch";
export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>

export interface UseRequestOptions<TData, TParams extends any[]> {
  manual?: boolean, // 是否手动运行
  defaultParams?: TParams,
  cacheKey?: string | number;
  onSuccess?: (data: TData, params: TParams) => void;
  onBefore?: (params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (data: TData, params: TParams, e: Error) => void;

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

  onFinally?: (data: TData, params: TParams, e: Error) => void
}

export interface UseRequestPlugin<TData, TParams extends any[]> {
  (fetchInstance: Fetch<TData, TParams>, fetchOptions: UseRequestOptions<TData, TParams>): PluginReturn<TData, TParams>;
  onInit?: (options: UseRequestOptions<TData, TParams>) => Partial<FetchState<TData, TParams>>
}
