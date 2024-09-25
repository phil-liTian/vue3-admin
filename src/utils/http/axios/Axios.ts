/*
 * @Date: 2024-03-02 17:12:53
 * @LastEditors: phil_litian
 */

import axios from 'axios';
import type {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosError,
	InternalAxiosRequestConfig,
} from 'axios';
import type { CreateAxiosOptions } from './axiosTransform';
import type { RequestOptions, UploadFileParams } from '#/axios';
import { isFunction } from '@u/is';
import { AxiosCancel } from './axiosCancel';
export class PAxios {
	readonly options: CreateAxiosOptions;
	axiosInstance: AxiosInstance;

	constructor(options: CreateAxiosOptions) {
		this.options = options;
		this.axiosInstance = axios.create(options);
		this.setupInterceptors();
	}

	// 转换数据结构
	private getTransform() {
		const { transform } = this.options;
		return transform;
	}

	// 设置请求拦截器和响应拦截器
	private setupInterceptors() {
		const { transform } = this.options;
		const {
			requestInterceptors,
			responseInterceptors,
			requestInterceptorsCatch,
			responseInterceptorsCatch,
		} = transform;

		const axiosCanceler = new AxiosCancel();

		// 请求拦截器
		this.axiosInstance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				const requestOptions =
					(config as any)?.requestOptions ?? this.options.requestOptions;

				const ignoreCancelToken = requestOptions.cancelToken;
				axiosCanceler.addPending(config);
				if (requestInterceptors && isFunction(requestInterceptors)) {
					config = requestInterceptors(config, this.options);
				}

				return config;
			},
			(error) => {
				// 请求拦截器异常处理
				if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
					requestInterceptorsCatch(error);
				}
			}
		);

		// 响应拦截器
		this.axiosInstance.interceptors.response.use(
			(response: AxiosResponse) => {
				axiosCanceler.removePending(response.config);

				if (responseInterceptors && isFunction(responseInterceptors)) {
					response = responseInterceptors(response);
				}

				return response;
			},
			(error) => {
				// 响应拦截器异常处理
				if (
					responseInterceptorsCatch &&
					isFunction(responseInterceptorsCatch)
				) {
					return responseInterceptorsCatch(this.axiosInstance, error);
				}
			}
		);
	}

	/**
	 * file upload
	 * @param config
	 * @param params
	 */
	uploadFile<T = any>(config: AxiosRequestConfig, params?: UploadFileParams) {
		const formData = new FormData();
		const customFilename = params.name || 'file';
		if (params.filename) {
			formData.append(customFilename, params.file, params.filename);
		} else {
			formData.append(customFilename, params.file);
		}

		if (params.data) {
			Object.keys(params.data).forEach((key) => {
				const value = params.data![key];
				if (Array.isArray(value)) {
					value.forEach((item) => {
						formData.append(`${key}[]`, item);
					});
					return;
				}

				formData.append(key, params.data![key]);
			});
		}

		return this.axiosInstance.request<T>({
			...config,
			method: 'POST',
			data: formData,
			headers: { 'Content-Type': 'multipart/form-data' },
			// ...(params || {})
		});
	}

	get<T = any>(
		config: AxiosRequestConfig,
		options?: RequestOptions
	): Promise<T> {
		return this.request({ ...config, method: 'GET' }, options);
	}

	post<T = any>(
		config: AxiosRequestConfig,
		options?: RequestOptions
	): Promise<T> {
		return this.request({ ...config, method: 'POST' }, options);
	}

	delete(config: AxiosRequestConfig, options?: RequestOptions) {
		return this.request({ ...config, method: 'DELETE' }, options);
	}

	put(config: AxiosRequestConfig, options?: RequestOptions) {
		return this.request({ ...config, method: 'PUT' }, options);
	}

	request<T = any>(
		config: AxiosRequestConfig,
		options?: RequestOptions
	): Promise<T> {
		const transform = this.getTransform();
		const { transformResponseHook, beforeRequestHook } = transform || {};
		const { requestOptions } = this.options;
		const opts = Object.assign({}, requestOptions, options);

		if (beforeRequestHook && isFunction(beforeRequestHook)) {
			config = beforeRequestHook(config, opts);
		}

		return new Promise((resolve, reject) => {
			this.axiosInstance
				.request(config)
				.then((res: AxiosResponse) => {
					// 用于处理是否需要转换
					if (transformResponseHook && isFunction(transformResponseHook)) {
						try {
							const data = transformResponseHook(res, opts);
							resolve(data);
						} catch (err) {
							reject(err || new Error('request Error!'));
						}
						return;
					}
					resolve(res.data);
				})
				.catch((err: Error) => {
					console.log('err', err);
				});
		});
	}
}
