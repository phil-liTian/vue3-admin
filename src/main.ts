/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import 'uno.css';
import 'virtual:svg-icons-register';
import '@/design/index.less';
// 利用ant-design-vue基础样式设置
import 'ant-design-vue/dist/reset.css';

import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import { setupRouter, router } from '@/router';
import { registerGlobComps } from '@c/registerGlobComponents';
import { setupGlobDirectives } from '@d/index';
import { initAppConfig } from './logics/initAppConfig';
import { setupErrorHandle } from './logics/error-handle/index';
import { setUpI18n } from '@/locales/index';
import { setupRouterGuard } from '@/router/guard/index';

const bootstrap = async () => {
	const app = createApp(App);
	// 配置store
	setupStore(app);

	// 初始化全局性的配置
	initAppConfig();

	// 配置全局组件
	registerGlobComps(app);

	// 注册全局指令
	setupGlobDirectives(app);

	// 引入语言配置 实现国际化 await是很有必要的, 否则可能导致app.vue文件中useLocale()报错
	// 因为setUpI18n存在异步import语言配置相关文件
	await setUpI18n(app);

	// 配置路由
	setupRouter(app);

	// 配置导航守卫
	setupRouterGuard(router);

	// 错误处理
	setupErrorHandle(app);

	app.mount('#app');
};

bootstrap();
/**
 *  formDesign低代码实现, 使用codemirror实现代码编辑器, 配合vue3的jsx语法, 实现代码生成功能。与常见表单组件打通, 拖拽后样式可直接生成代码, 可大大提高生产实践中的工作效率
 *  request Hooks封装。用插件机制来丰富requestHooks中的功能，逻辑清晰、易拓展。
 *  使用unocss处理样式和purge-icons SVG 图标集来处理图标 在一定程度上提升了工作效率
 *  对ant-design-vue的组件进行二次封装, 比如Menu、Table、Modal、Form等组件的封装也是比较精彩的;
 *  对常见功能进行整理归纳, 方便移植。比如excel的导入、导出; upload的图片、文件资源的上传; 拷贝等功能的处理
 *  使用addRoute动态处理角色权限; listenRouterChange动态监听路由变化,优化传统方法使用watch监听; 数据持久化处理等
 *  TODO:使用react实现的感受及心得
 *
 */
