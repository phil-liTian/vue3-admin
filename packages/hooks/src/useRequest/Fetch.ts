/*
 * @Date: 2024-06-19 13:26:54
 * @LastEditors: phil_litian
 */
import { reactive } from 'vue'
import { FetchState, Service, UseRequestOptions, PluginReturn } from "./types"

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[] = []
  // 记录运行次数
  count: number = 0

  state: FetchState<TData, TParams> = reactive({
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined
  })

  constructor(
    public serviceRef: Service<TData, TParams>,
    public options: UseRequestOptions<TData, TParams>,
    public initState: Partial<FetchState<TData, TParams>> = {}
  ) {
    this.setState({ loading: !options.manual, ...initState })
  }

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    Object.assign(this.state, s)
  }

  runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...rest: any[]) {
    // @ts-ignore
    const r = this.pluginImpls.map(i => i[event]?.(...rest)).filter(Boolean)
    
    return Object.assign({}, ...r)
  }

  async runAsync(...params: TParams) {
    this.count += 1
    const currentCount = this.count
    const { stopNow = false, returnNow = false, ...state } = this.runPluginHandler('onBefore', params);

    if ( stopNow ) {
      return new Promise(() => {})
    }
    this.setState({
      loading: true,
      params,
      ...state
    })

    if ( returnNow ) {
      return Promise.resolve(state.data)
    }

    // 请求前的钩子函数
    this.options.onBefore?.(params)

    try {
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef, params);
      
      // 替补方案(当没有cacheKey的时候 运行当前方法)
      if ( !servicePromise ) {
        servicePromise = this.serviceRef(...params)
      }

      const res = await servicePromise
      // 只有直接执行run的时候, 才会执行后续逻辑, 比如说在此之前执行了cancel
      if ( this.count !== currentCount ) {
        return new Promise(() => {})
      }

      this.setState({ data: res, error: undefined, loading: false });
      // options中可配置onSuccess方法

      this.options?.onSuccess?.(res, params);

      this.runPluginHandler('onSuccess', res, params)

      this.options?.onFinally?.(undefined, params, res)

      if ( this.count === currentCount ) {
        this.runPluginHandler('onFinally', )
      }

      return res
    } catch(error) {
      // 抛出异常
      this.options?.onError?.(error, params)
      this.runPluginHandler('onError', error, params)
      
      this.options?.onFinally?.(undefined, params, error)

      
      throw error
    }
  }

  run(...params: TParams) {
    this.runAsync(...params)
  }

  cancel() {
    this.count += 1
    this.setState({ loading: false })
  }

  refresh() {
    // @ts-ignore
    this.run(...(this.state.params || []))
  }

  refreshAsync() {

  }

  mutate() {
    
  }
}
