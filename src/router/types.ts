/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import type { RouteRecordRaw, RouteMeta } from 'vue-router';

export type Component<T = any> = () => Promise<T>;

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
	name?: string;
	component?: Component | string;
	meta?: RouteMeta;
	children?: AppRouteRecordRaw[];
	fullPath?: string;
}

export interface Menu {
	name?: string | unknown;
	icon?: string;
	img?: string;
	path?: string;
	children: Menu[];
	meta?: Partial<RouteMeta>;
}

export type AppRouteModule = AppRouteRecordRaw;
