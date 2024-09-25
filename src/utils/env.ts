/*
 * @Date: 2024-02-23 21:35:27
 * @LastEditors: phil_litian
 */
import { GlobalEnvConfig } from '#/config';

export const getAppEnvConfig = () => {
	// const ENV_NAME = getVariableName(import.meta.env.VITE_GLOB_APP_TITLE);
	// 测试环境直接使用env
	const DEV = import.meta.env.DEV
		? (import.meta.env as unknown as GlobalEnvConfig)
		: (import.meta.env as unknown as GlobalEnvConfig);

	const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL_PREFIX, VITE_GLOB_API_URL } =
		DEV;

	return {
		VITE_GLOB_APP_TITLE,
		VITE_GLOB_API_URL_PREFIX,
		VITE_GLOB_API_URL,
	};
};

export const getEnv = () => {
	return import.meta.env.MODE;
};

export const getCommonStoragePrefix = () => {
	const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();
	return `${VITE_GLOB_APP_TITLE?.replace(
		/\s/g,
		'_'
	)}__${getEnv()}`.toUpperCase();
};

export const getStorageShortName = () => {
	return `${getCommonStoragePrefix()}__`.toUpperCase();
};
