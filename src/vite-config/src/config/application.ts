/*
 * @Date: 2024-03-06 17:10:03
 * @LastEditors: phil_litian
 */
import { resolve } from 'path';
import dayjs from 'dayjs';
import { defineConfig } from 'vite';
import { readPackageJSON } from 'pkg-types';
import { createPlugins } from '../plugins';
import { generateModifyVars } from '../utils/modifyVars';

// 自定义全局变量
async function createDefineData(root: string) {
	try {
		const pkgJson = await readPackageJSON(root);
		const { dependencies, name, version, devDependencies } = pkgJson;
		const __APP_INFO__ = {
			pkg: { dependencies, name, version, devDependencies },
			lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		};

		return {
			__APP_INFO__: JSON.stringify(__APP_INFO__),
		};
	} catch (error) {
		return {};
	}
}

export const defineApplicationConfig = async () => {
	// 用于获取当前工作目录的绝对路径
	const root = process.cwd();
	const plugins = createPlugins();
	const definData = await createDefineData(root);

	return defineConfig({
		base: './',
		server: {
			port: 8888,
			open: true,
			proxy: {
				// '/basic-api': {
				//   target: 'http://localhost:3000',
				//   changeOrigin: true,
				//   ws: true,
				//   // rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
				//   // only https
				//   // secure: false
				// },
				'/upload': {
					target: 'http://localhost:3000/upload',
					changeOrigin: true,
					rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
					// only https
					// secure: false
				},
			},
		},
		define: definData,
		plugins,
		resolve: {
			alias: {
				'@': resolve(root, 'src'),
				'@c': resolve(root, 'src/components'),
				'@v': resolve(root, 'src/views'),
				'@s': resolve(root, 'src/store'),
				'@h': resolve(root, 'src/hooks'),
				'@u': resolve(root, 'src/utils'),
				'@e': resolve(root, 'src/enums'),
				'@a': resolve(root, 'src/api'),
				'@d': resolve(root, 'src/directives'),
				'#': resolve(root, 'src/types'),
			},
		},
		css: {
			preprocessorOptions: {
				less: {
					modifyVars: {
						hack: `true; @import (reference) "${resolve(
							root,
							'src/design/index.less'
						)}";`,
						'primary-color': '#0960bd',
						...generateModifyVars(),
					},
					javascriptEnabled: true,
				},
			},
		},

		build: {
			rollupOptions: {
				output: {
					// 分包优化, 将第三方包放到指定文件中
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return 'vendors';
						}
					},
				},
			},
		},
	});
};
