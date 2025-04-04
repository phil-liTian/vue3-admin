/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import {
	createRouter,
	createWebHistory,
	createWebHashHistory,
} from 'vue-router';
import { basicRoutes } from './routes';

export const router = createRouter({
	history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
	// history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
	routes: basicRoutes as RouteRecordRaw[],
	// 是否禁止尾部斜线。
	strict: true,
	// 当在页面之间导航时控制滚动的功能
	scrollBehavior: () => ({ top: 0, left: 0 }),
});

export function resetRouter() {
	router.getRoutes().map((route) => {
		const { name } = route;
		if (name) {
			router.hasRoute(name) && router.removeRoute(name);
		}
	});
}

export const setupRouter = (app: App) => {
	app.use(router);
};
