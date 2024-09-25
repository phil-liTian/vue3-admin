/*
 * @Date: 2024-03-02 17:11:02
 * @LastEditors: phil_litian
 */

import { defHttp } from '@u/http/axios/index';
import {
	LoginResultModel,
	LoginParams,
	GetUserInfoModel,
} from './models/userModel';

enum Api {
	Login = '/login',
	Logout = '/logout',
	GetUserInfo = '/getUserInfo',
}

// 登录
export const loginApi = (params?: LoginParams) => {
	return defHttp.post<LoginResultModel>({
		url: Api.Login,
		params,
	});
};

// 退出登录
export const doLogout = () => {
	return defHttp.get({ url: Api.Logout });
};

// 获取用户信息
export const getUserInfo = () => {
	return defHttp.get<GetUserInfoModel>({
		url: Api.GetUserInfo,
	});
};
