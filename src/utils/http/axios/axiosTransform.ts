/*
 * @Date: 2024-03-04 11:30:31
 * @LastEditors: phil_litian
 */
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { RequestOptions, Result } from '#/axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
	authenticationScheme?: string;
	requestOptions?: RequestOptions;
	transform?: AxiosTransform;
}

export abstract class AxiosTransform {
	/**
	 * @description: 处理响应数据
	 */
	transformResponseHook?: (
		res: AxiosResponse<Result>,
		options: RequestOptions
	) => any;

	/**
	 * @description: 请求之前的hook 可以用来修改请求的配置
	 */
	beforeRequestHook?: (
		config: AxiosRequestConfig,
		options: RequestOptions
	) => AxiosRequestConfig;

	/**
	 * @description: 请求拦截器
	 */
	requestInterceptors?: (
		config: InternalAxiosRequestConfig,
		options: CreateAxiosOptions
	) => InternalAxiosRequestConfig;

	/**
	 * @description: 请求拦截器异常处理
	 */
	requestInterceptorsCatch?: (error: Error) => any;

	/**
	 * @description: 响应拦截器
	 */
	responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

	/**
	 * @description: 响应拦截器异常处理
	 */
	responseInterceptorsCatch?: (instace: AxiosInstance, error) => any;
}
