/*
 * @Date: 2024-03-06 21:39:45
 * @LastEditors: phil_litian
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
const modules = import.meta.glob('./**/*.ts', { eager: true });

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
	if (key.includes('/_')) {
		return;
	}
	console.log('modules[key].default', modules[key].default);
	if (modules[key].default) {
		mockModules.push(...(modules[key].default || {}));
	}
});

export const setupProdMockServer = () => {
	createProdMockServer(mockModules);
};
