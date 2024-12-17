/*
 * @Date: 2024-04-18 19:10:33
 * @LastEditors: phil_litian
 */

export default {
	scrollbar: {
		// 开启后会将modal的弹出式滚动条更改成本地滚动条
		native: false,
	},

	table: {
		defaultSize: 'middle',

		fetchSetting: {
			pageField: 'page',

			sizeField: 'pageSize',

			listField: 'items',

			totalField: 'total',
		},

		defaultPageSize: 10,

		pageSizeOptions: ['10', '50', '80', '100'],
	},
};
