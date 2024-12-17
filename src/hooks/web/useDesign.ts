/*
 * @Date: 2024-02-21 21:57:42
 * @LastEditors: phil_litian
 * 用于处理样式类
 */

import { useAppProviderContext } from '@/components/Application';

export const useDesign = (scope: string) => {
	const value = useAppProviderContext();

	return {
		prefixCls: `${value.prefixCls}-${scope}`,
		prefixVar: value.prefixCls,
	};
};
